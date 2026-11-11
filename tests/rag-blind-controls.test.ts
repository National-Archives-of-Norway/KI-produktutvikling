import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { test, type TestContext } from "node:test";
import { reportBlindEvaluation } from "./rag-blind-report.ts";
import { evaluateSearch, readBlindCases } from "./rag-evaluation.ts";
import { nodeTestFiles } from "../scripts/test-node.mjs";

// Alle data under test er laget her; ingen ekte ekstern blindfil undersøkes.
const syntheticCases = [
  { question: "SYNTETISK ALFA", expectedId: "fake-alpha" },
  { question: "SYNTETISK BETA", expectedId: "fake-beta" },
  { question: "SYNTETISK GAMMA", expectedId: null },
  { question: "SYNTETISK DELTA", expectedId: null },
];
const syntheticSearch = (question: string) => {
  if (question === "SYNTETISK ALFA") return [{ id: "fake-alpha" }];
  if (question === "SYNTETISK BETA") return [{ id: "fake-wrong" }];
  if (question === "SYNTETISK DELTA") return [{ id: "fake-false-positive" }];
  return [];
};
const data = JSON.stringify({
  schemaVersion: 1,
  blindEvaluation: syntheticCases,
});
async function fixture(t: TestContext) {
  const dir = await mkdtemp(join(tmpdir(), "ki-blind-synthetic-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const repo = join(dir, "repo");
  await mkdir(repo);
  const outside = join(dir, "synthetic.json");
  await writeFile(outside, data);
  return { dir, repo, outside };
}
async function report(repoRoot: string, file?: string, verbose = false) {
  const messages: string[] = [];
  let calls = 0;
  await reportBlindEvaluation({
    file,
    repoRoot,
    verbose,
    search: (question) => {
      calls++;
      return syntheticSearch(question);
    },
    diagnostic: (message) => messages.push(message),
  });
  return { messages, calls, text: messages.join("\n") };
}

test("manglende variabel gir eksakt ikke-målt-melding uten søk", async (t) => {
  const { repo } = await fixture(t);
  const result = await report(repo);
  assert.deepEqual(result.messages, [
    "blindEvaluation: ikke målt (RAG_BLIND_FILE er ikke satt)",
  ]);
  assert.equal(result.calls, 0);
});

test("fil inne i repoet avvises før måling", async (t) => {
  const { repo } = await fixture(t);
  const inside = join(repo, "synthetic.json");
  await writeFile(inside, data);
  const result = await report(repo, inside);
  assert.match(result.text, /ikke målt.*sti i repoet er avvist/);
  assert.equal(result.calls, 0);
});

test("ekstern symbolsk lenke til en repofil kan ikke omgå kontrollen", async (t) => {
  const { dir, repo } = await fixture(t);
  const inside = join(repo, "synthetic.json");
  await writeFile(inside, data);
  const alias = join(dir, "outside-alias.json");
  await symlink(inside, alias);
  const result = await report(repo, alias);
  assert.match(result.text, /ikke målt.*sti i repoet er avvist/);
  assert.equal(result.calls, 0);
});

test("sti i repoet avvises også når den peker til en ekstern fil", async (t) => {
  const { repo, outside } = await fixture(t);
  const alias = join(repo, "alias.json");
  await symlink(outside, alias);
  const result = await report(repo, alias);
  assert.match(result.text, /ikke målt.*sti i repoet er avvist/);
  assert.equal(result.calls, 0);
});

test("søskenkatalog med samme navneprefiks er utenfor repoet", async (t) => {
  const { dir, repo } = await fixture(t);
  const sibling = join(dir, "repo-other");
  await mkdir(sibling);
  const file = join(sibling, "synthetic.json");
  await writeFile(file, data);
  assert.equal((await report(repo, file)).calls, 4);
});

test("standardrapport viser bare samlet treffsikkerhet og to feilkategorier", async (t) => {
  const { repo, outside } = await fixture(t);
  const result = await report(repo, outside);
  assert.deepEqual(result.messages, [
    "blindEvaluation: 2/4 riktige, 50.0 %; bom med forventet kilde: 1; falske treff uten forventet kilde: 1",
  ]);
  for (const row of syntheticCases) {
    assert.ok(!result.text.includes(row.question));
    if (row.expectedId) assert.ok(!result.text.includes(row.expectedId));
  }
  assert.ok(!result.text.includes("fake-wrong"));
  assert.ok(!result.text.includes("fake-false-positive"));
});

test("detaljer krever eksplisitt verbose og inkluderer da syntetiske rader", async (t) => {
  const { repo, outside } = await fixture(t);
  const result = await report(repo, outside, true);
  assert.equal(result.messages.length, 5);
  for (const row of syntheticCases)
    assert.ok(result.text.includes(row.question));
  assert.ok(result.text.includes("fake-false-positive"));
});

test("tomme, uleselige og ugyldige filer gir ikke målt uten råinnhold", async (t) => {
  const { dir, repo } = await fixture(t);
  const file = join(dir, "invalid.json");
  await writeFile(file, '{"RAW-SYNTHETIC-NOT-FOR-LOGS":');
  let result = await report(repo, file);
  assert.match(result.text, /ikke målt.*ugyldig filformat/);
  assert.ok(!result.text.includes("RAW-SYNTHETIC-NOT-FOR-LOGS"));
  await writeFile(
    file,
    JSON.stringify({ schemaVersion: 1, blindEvaluation: [] }),
  );
  result = await report(repo, file);
  assert.match(result.text, /ikke målt.*tomt sett/);
  result = await report(repo, join(dir, "does-not-exist.json"));
  assert.match(result.text, /ikke målt.*filen kunne ikke leses/);
  assert.ok(!result.text.includes("does-not-exist"));
});

function runReport(file?: string, verbose?: string) {
  // Fjern alltid eventuelle virkelige filvalg fra det arvede miljøet.
  const env = { ...process.env };
  delete env.RAG_BLIND_FILE;
  delete env.RAG_BLIND_VERBOSE;
  // Underprosessen er en ny, selvstendig Node-testkjøring.
  delete env.NODE_TEST_CONTEXT;
  if (file !== undefined) env.RAG_BLIND_FILE = file;
  if (verbose !== undefined) env.RAG_BLIND_VERBOSE = verbose;
  const child = spawnSync(
    process.execPath,
    ["--test", fileURLToPath(new URL("./rag-blind.test.ts", import.meta.url))],
    { env, encoding: "utf8" },
  );
  assert.equal(child.status, 0);
  return child.stdout + child.stderr;
}

test("rapportkommandoen uten fil måler ikke, og fil i ekte reporot avvises", () => {
  assert.match(
    runReport(),
    /blindEvaluation: ikke målt \(RAG_BLIND_FILE er ikke satt\)/,
  );
  assert.match(
    runReport(
      fileURLToPath(new URL("./fixtures/rag-blind.json", import.meta.url)),
    ),
    /sti i repoet er avvist/,
  );
});

test("rapportkommandoens standardutskrift røper ingen syntetiske spørsmål eller ID-er", async (t) => {
  const { outside } = await fixture(t);
  const output = runReport(outside);
  assert.match(output, /blindEvaluation: \d\/4 riktige/);
  for (const row of syntheticCases) {
    assert.ok(!output.includes(row.question));
    if (row.expectedId) assert.ok(!output.includes(row.expectedId));
  }
  assert.ok(!runReport(outside, "true").includes("SYNTETISK ALFA"));
  assert.ok(runReport(outside, "1").includes("SYNTETISK ALFA"));
});

test("ordinær Node-pakke utelater rapporten, men inkluderer de syntetiske kontrollene", async () => {
  const files = (
    await nodeTestFiles(fileURLToPath(new URL(".", import.meta.url)))
  ).map((file) => basename(file));
  assert.ok(!files.includes("rag-blind.test.ts"));
  assert.ok(files.includes("rag-blind-controls.test.ts"));
  const pkg = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  assert.equal(
    pkg.scripts["test:blind"],
    "node --test tests/rag-blind.test.ts",
  );
  assert.equal(pkg.scripts["test:node"], "node scripts/test-node.mjs");
});

test("blindrapport viser null ved bom, mens tomt sett ikke er målt", () => {
  assert.equal(
    evaluateSearch(() => [], [{ question: "syntetisk", expectedId: "fake" }])
      .accuracy,
    0,
  );
  assert.equal(evaluateSearch(() => [], []).accuracy, null);
  assert.equal(
    evaluateSearch(() => [], [{ question: "syntetisk", expectedId: null }])
      .passed,
    1,
  );
});

test("blindfilens formatfeil rapporteres uten å kaste", () => {
  assert.equal(readBlindCases("{").errors.length, 1);
  const result = readBlindCases(
    JSON.stringify({
      schemaVersion: 1,
      blindEvaluation: [
        { question: "", expectedId: null },
        { question: "syntetisk", expectedId: "fake", maxRank: 4 },
        { question: "gyldig syntetisk", expectedId: null },
      ],
    }),
  );
  assert.equal(result.cases.length, 1);
  assert.equal(result.errors.length, 2);
});
