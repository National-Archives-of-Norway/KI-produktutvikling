import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { copyContentSyncFixture } from "./lib/content-sync-fixture.mjs";
const repo = fileURLToPath(new URL("..", import.meta.url));
const fixture = await mkdtemp(join(tmpdir(), "ki-content-watch-"));
const reserve = createServer();
await new Promise((resolve) => reserve.listen(0, "127.0.0.1", resolve));
const port = reserve.address().port;
await new Promise((resolve) => reserve.close(resolve));
let child;
let output = "";
const pause = () => new Promise((resolve) => setTimeout(resolve, 150));
try {
  await copyContentSyncFixture(repo, fixture);
  child = spawn(process.execPath, ["--watch", "scripts/rag-server.mjs"], {
    cwd: fixture,
    env: {
      ...process.env,
      RAG_PORT: String(port),
      MODEL_PROVIDER: "none",
      OLLAMA_MODEL: "",
      MODEL_API_KEY: "",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.on("data", (data) => {
    output += data;
  });
  child.stderr.on("data", (data) => {
    output += data;
  });
  async function waitForAnswer(check, question = "Hva er KI-prat?") {
    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
      try {
        const result = await fetch(`http://127.0.0.1:${port}/api/rag`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
          signal: AbortSignal.timeout(1000),
        });
        const data = await result.json();
        if (check(data)) return data;
      } catch {}
      await pause();
    }
    throw new Error(
      "Ingen forventet oppdatering fra watch-tjenesten. " + output,
    );
  }
  await waitForAnswer((data) =>
    data.sources
      ?.find((source) => source.id === "ki-prat")
      ?.text.includes("annenhver torsdag"),
  );
  const file = join(fixture, "src/content/pages/om.ts");
  const before = await readFile(file, "utf8");
  const after = before.replace(
    "Vi møtes på Teams annenhver torsdag",
    "Synkkontroll: Vi møtes på Teams hver fredag",
  );
  assert.notEqual(before, after);
  await writeFile(file, after);
  const updated = await waitForAnswer((data) =>
    data.sources
      ?.find((source) => source.id === "ki-prat")
      ?.guide.steps.some((step) => step.includes("Synkkontroll:")),
  );
  assert.ok(
    !updated.sources
      .find((source) => source.id === "ki-prat")
      .text.includes("annenhver torsdag"),
  );
  // Metadata må utløse samme omlasting som prosa, uten å bli kildeinnhold.
  const alias = "synkmetadataord";
  await waitForAnswer((data) => data.sources?.length === 0, alias);
  const privacyFile = join(fixture, "src/content/pages/personvern.ts");
  const privacyBefore = await readFile(privacyFile, "utf8");
  const privacyAfter = privacyBefore.replace(
    "keywords: [",
    `keywords: ["${alias}",`,
  );
  assert.notEqual(privacyBefore, privacyAfter);
  await writeFile(privacyFile, privacyAfter);
  const keywordUpdated = await waitForAnswer(
    (data) => data.sources?.[0]?.id === "personvern",
    alias,
  );
  assert.ok(!JSON.stringify(keywordUpdated).includes(alias));
  await writeFile(privacyFile, privacyBefore);
  await waitForAnswer((data) => data.sources?.length === 0, alias);
  console.log(
    "Bestått: endring i en felles innholdsfil lastes automatisk inn i RAG-API-et med oppdatert tekst og veiledning. Tilføyde og fjernede søkenøkkelord lastes også inn på nytt, uten metadata i API-svaret. Testen brukte en isolert midlertidig prosjektkopi.",
  );
} finally {
  if (child && child.exitCode === null) {
    const exited = new Promise((resolve) => child.once("exit", resolve));
    child.kill("SIGTERM");
    await exited;
  }
  await rm(fixture, { recursive: true, force: true });
}
