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

test("automatisk prisoppdatering og JSON-lagring bevarer norske vilkår", async () => {
  const first = await refresh(null, fetcher, "2026-11-09T20:00:00Z");
  const next = JSON.parse(
    JSON.stringify(
      await refresh(
        JSON.parse(JSON.stringify(first)),
        fetcher,
        "2026-11-09T21:00:00Z",
      ),
    ),
  );
  assert.ok(next.groups.every((g) => g.status === "ok"));
  for (const group of next.groups) {
    for (const row of group.rows) {
      assert.doesNotMatch(
        row.note,
        /billed annually|when billed monthly|Compare Pro plans|USD per month|free for some users|Total per user per month|Base:/i,
      );
    }
  }
  const business = next.groups
    .find((g) => g.id === "codex-subscription")
    .rows.find((r) => r.name.includes("Business"));
  assert.match(
    business.note,
    /Minst 2 brukere\. Årsprisen gjelder ved årsbetaling\./,
  );
  const copilot = next.groups
    .find((g) => g.id === "copilot-subscription")
    .rows.find((r) => r.name === "Copilot Pro");
  assert.match(copilot.note, /Gratis for enkelte brukere/);
  assert.match(
    copilot.note,
    /Inkludert: 1\s000 AI-kreditter per bruker per måned/,
  );
});

test("endret brukerkrav og månedspris oppdaterer norsk tekst fra kildefeltene", async () => {
  const next = await refresh(null, async (url) => ({
    ok: true,
    text: async () =>
      url === sources.find((s) => s.id === "codex-subscription").fetchUrl
        ? fixtures.codexPlans.replace(
            "*2+ users, billed annually. $25",
            "*5+ users, billed annually. $27",
          )
        : await (await fetcher(url)).text(),
  }));
  const group = next.groups.find((g) => g.id === "codex-subscription");
  assert.equal(group.status, "ok");
  const business = group.rows.find((r) => r.name.includes("Business"));
  assert.equal(business.monthly, 27);
  assert.match(business.note, /Minst 5 brukere/);
  assert.doesNotMatch(business.note, /Minst 2|billed/);
});

test("ukjente engelske tilleggsvilkår gir feil og bevarer tidligere norsk tekst", async () => {
  const old = await refresh(null, fetcher, "2026-11-09T20:00:00Z");
  const badFetcher = async (url) => ({
    ok: true,
    text: async () =>
      (await (await fetcher(url)).text())
        .replace(
          "Compare Pro plans and usage limits.",
          "Only available for selected customers.",
        )
        .replace(
          "$10 USD per month (free for some users)",
          "$10 USD per month (additional restrictions apply)",
        ),
  });
  const next = await refresh(old, badFetcher, "2026-11-09T21:00:00Z");
  for (const id of ["copilot-subscription", "codex-subscription"]) {
    const group = next.groups.find((g) => g.id === id),
      previous = old.groups.find((g) => g.id === id);
    assert.equal(group.status, "error");
    assert.deepEqual(group.rows, previous.rows);
    assert.equal(group.checkedAt, previous.checkedAt);
    assert.doesNotMatch(
      JSON.stringify(group.rows),
      /selected customers|additional restrictions/,
    );
  }
});
