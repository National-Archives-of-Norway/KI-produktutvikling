import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parsers, money } from "../scripts/pricing/parse.mjs";
import { sources } from "../scripts/pricing/sources.mjs";
import { refresh } from "../scripts/pricing/sync.mjs";
const names = {
  copilotPlans: "copilot-plans.md",
  claudePlans: "claude-plans.html",
  codexPlans: "codex-plans.md",
  copilotTokens: "copilot-tokens.md",
  claudeTokens: "claude-tokens.md",
  codexTokens: "codex-tokens.md",
};
const fixtures = Object.fromEntries(
  await Promise.all(
    Object.entries(names).map(async ([key, file]) => [
      key,
      await readFile(
        new URL("./fixtures/pricing/" + file, import.meta.url),
        "utf8",
      ),
    ]),
  ),
);
const fetcher = async (url) => ({
  ok: true,
  text: async () => fixtures[sources.find((s) => s.fetchUrl === url).parser],
});
test("alle seks offisielle prisstrukturer gir rader med riktige enheter", () => {
  for (const [name, parse] of Object.entries(parsers))
    assert.ok(parse(fixtures[name]).length >= 3, name);
  const business = parsers
    .codexPlans(fixtures.codexPlans)
    .find((r) => r.name.includes("Business"));
  assert.equal(business.monthly, 25);
  assert.equal(business.annualMonthly, 20);
  const pro = parsers.claudePlans(fixtures.claudePlans)[0];
  assert.equal(pro.monthly, 20);
  assert.equal(pro.annualMonthly, 17);
});
test("API-utvalg skiller kontekst, cache-varighet og standard fra andre hastigheter", () => {
  const rows = parsers.codexTokens(fixtures.codexTokens);
  assert.equal(rows.find((r) => r.name === "gpt-6.1-sol · Short").input, 2);
  assert.equal(rows.find((r) => r.name === "gpt-6.1-sol · Long").input, 4);
  assert.equal(rows.find((r) => r.name === "gpt-5.3-codex").output, 14);
  const claude = parsers.claudeTokens(fixtures.claudeTokens)[0];
  assert.equal(claude.cached, 0.2);
  assert.equal(claude.write, 5);
  assert.equal(claude.writeLong, 8);
});
test("endrede kolonner, manglende modeller og tvetydige planpriser avvises", () => {
  assert.throws(() =>
    parsers.copilotTokens(
      fixtures.copilotTokens.replaceAll("Cache write", "Changed"),
    ),
  );
  assert.throws(() =>
    parsers.codexTokens(
      fixtures.codexTokens.replaceAll("gpt-6.1-sol", "missing"),
    ),
  );
  assert.throws(() =>
    parsers.claudePlans(
      fixtures.claudePlans + '<span data-plan="pro_monthly">$999</span>',
    ),
  );
  assert.throws(() => money("ukjent"));
  assert.throws(() => money("$5 or $10"));
});
test("kildesvikt bevarer pris og vellykket dato, men registrerer mislykket forsøk", async () => {
  const old = await refresh(null, fetcher, "2026-11-08T06:00:00Z");
  assert.ok(old.groups.every((g) => g.status === "ok"));
  const next = await refresh(
    old,
    async (url) => {
      if (url === sources[0].fetchUrl)
        throw new Error("Secret response must not leak");
      return fetcher(url);
    },
    "2026-11-09T06:00:00Z",
  );
  const g = next.groups[0];
  assert.equal(g.status, "error");
  assert.equal(g.checkedAt, old.groups[0].checkedAt);
  assert.deepEqual(g.rows, old.groups[0].rows);
  assert.equal(g.attemptedAt, "2026-11-09T06:00:00Z");
  assert.ok(!JSON.stringify(next).includes("Secret response"));
  assert.equal(next.groups[1].checkedAt, "2026-11-09T06:00:00Z");
});
test("førstegangssvikt gir tomt grunnlag, aldri gratispriser eller falsk kontrolldato", async () => {
  const next = await refresh(
    null,
    async () => ({ ok: false }),
    "2026-11-09T06:00:00Z",
  );
  assert.ok(
    next.groups.every(
      (g) =>
        g.checkedAt === null && g.rows.length === 0 && g.status === "error",
    ),
  );
});
