import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parsers, money, tables } from "../scripts/pricing/parse.mjs";
import { sources } from "../scripts/pricing/sources.mjs";
import {
  refresh,
  main,
  hasMeaningfulChanges,
} from "../scripts/pricing/sync.mjs";
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

test("money avviser løse ekstratall og feil tusenskille", () => {
  for (const value of [
    "$3 2",
    "$1 500",
    "$1,50",
    "$1,,500",
    "$1 500 / MTok",
    "$3 / MTok 500",
  ]) {
    assert.throws(() => money(value), /prisformat/, value);
  }
  assert.equal(money("$1,500.25"), 1500.25);
});

test("tables beholder siste rad uten sluttlinjeskift og støtter CRLF", () => {
  const text = "| Model | Price |\n| --- | --- |\n| Example | $3 |";
  for (const input of [text, text + "\n", text.replaceAll("\n", "\r\n")]) {
    assert.deepEqual(tables(input), [
      { headers: ["Model", "Price"], rows: [["Example", "$3"]] },
    ]);
  }
});

test("tables skiller escapede pipes fra cellegrenser", () => {
  const text = String.raw`| Model | Price |
| --- | --- |
| A \| B | $3 |`;
  assert.deepEqual(tables(text + "\n"), [
    { headers: ["Model", "Price"], rows: [["A | B", "$3"]] },
  ]);
});

test("bare kjent Claude-fotnote 2 i cache-kolonnen tillates", () => {
  assert.equal(parsers.claudeTokens(fixtures.claudeTokens)[0].cached, 0.2);
  assert.throws(() => money("$0.20 / MTok 2"));
  assert.throws(() =>
    parsers.claudeTokens(
      fixtures.claudeTokens.replace("$0.20 / MTok 2", "$0.20 / MTok 3"),
    ),
  );
  assert.throws(() =>
    parsers.claudeTokens(
      fixtures.claudeTokens.replace("$0.20 / MTok 2", "$1 500 / MTok 2"),
    ),
  );
});

test("alle fixture-tabeller beholder rader uten avsluttende linjeskift", () => {
  for (const [name, parse] of Object.entries(parsers))
    assert.deepEqual(
      parse(fixtures[name].trimEnd()),
      parse(fixtures[name]),
      name,
    );
  assert.throws(
    () => tables("| A | B |\n| --- | --- |\n| bare en celle |"),
    /antall celler/,
  );
});

test("meningsfull endring ignorerer bare tider, ikke priser, status, feil eller kildemetadata", async () => {
  const previous = await refresh(null, fetcher, "2026-11-08T06:00:00Z");
  const next = await refresh(previous, fetcher, "2026-11-09T06:00:00Z");
  assert.notDeepEqual(next, previous);
  assert.equal(hasMeaningfulChanges(previous, next), false);
  for (const change of [
    (s) => {
      s.groups[0].rows[0].monthly += 1;
    },
    (s) => {
      s.groups[0].status = "error";
    },
    (s) => {
      s.groups[0].error = "Nøytral feil";
    },
    (s) => {
      s.groups[0].url = "https://example.test/new";
    },
    (s) => {
      s.currency = "NOK";
    },
  ]) {
    const changed = structuredClone(next);
    change(changed);
    assert.equal(hasMeaningfulChanges(previous, changed), true);
  }
});

const initialLog =
  "# Versjonslogg\n\n## Ikke utgitt\n\n### Manuell endring\n\nBehold dette.\n\n## 0.1\n\nHistorikk.\n";
const changedFetcher = async (url) => ({
  ok: true,
  text: async () =>
    (await (await fetcher(url)).text()).replace(
      "$10 USD per month",
      "$11 USD per month",
    ),
});
async function withFiles(run, log = initialLog) {
  const directory = await mkdtemp(join(tmpdir(), "pricing-main-"));
  const snapshotPath = join(directory, "snapshot.json"),
    logPath = join(directory, "VERSJONSLOGG.md");
  const previous = await refresh(null, fetcher, "2026-11-08T06:00:00Z");
  await writeFile(snapshotPath, JSON.stringify(previous, null, 2) + "\n");
  await writeFile(logPath, log);
  const options = {
    snapshotPath,
    logPath,
    fetcher,
    now: "2026-11-09T06:00:00Z",
    logger: () => {},
  };
  try {
    await run({ options, previous, directory });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test("main registrerer ny kontrolltid uten endring i versjonsloggen ved uendrede priser", async () => {
  await withFiles(async ({ options }) => {
    assert.deepEqual(await main(options), { changed: false, failed: false });
    assert.equal(await readFile(options.logPath, "utf8"), initialLog);
    const saved = JSON.parse(await readFile(options.snapshotPath, "utf8"));
    assert.ok(
      saved.groups.every(
        (g) => g.checkedAt === options.now && g.attemptedAt === options.now,
      ),
    );
  });
});

test("main legger nøyaktig én prisoppføring under eksisterende Ikke utgitt og er idempotent", async () => {
  await withFiles(async ({ options }) => {
    const changedOptions = { ...options, fetcher: changedFetcher };
    assert.deepEqual(await main(changedOptions), {
      changed: true,
      failed: false,
    });
    const body = await readFile(options.logPath, "utf8");
    assert.equal((body.match(/^## Ikke utgitt$/gm) ?? []).length, 1);
    assert.equal((body.match(/^### .*oppdaterte prisdata/gm) ?? []).length, 1);
    assert.ok(
      body.indexOf("oppdaterte prisdata") > body.indexOf("## Ikke utgitt"),
    );
    assert.match(body, /Utførende agent\/person/);
    assert.match(body, /Kontroller og begrensninger/);
    assert.match(body, /Behold dette\./);
    assert.ok(body.endsWith("## 0.1\n\nHistorikk.\n"));
    assert.equal(
      JSON.parse(await readFile(options.snapshotPath, "utf8")).groups[0].rows[0]
        .monthly,
      11,
    );
    assert.deepEqual(
      await main({ ...changedOptions, now: "2026-11-10T06:00:00Z" }),
      { changed: false, failed: false },
    );
    assert.equal(await readFile(options.logPath, "utf8"), body);
    await main({ ...options, now: "2026-11-11T06:00:00Z" });
    const reverted = await readFile(options.logPath, "utf8");
    assert.equal((reverted.match(/^## Ikke utgitt$/gm) ?? []).length, 1);
    assert.equal(
      (reverted.match(/^### .*oppdaterte prisdata/gm) ?? []).length,
      2,
    );
  });
});

test("main avviser manglende innsettingspunkt før snapshot eller tempfiler skrives", async () => {
  await withFiles(async ({ options, directory }) => {
    const before = await readFile(options.snapshotPath, "utf8");
    await assert.rejects(
      main({ ...options, fetcher: changedFetcher }),
      /Mangler innsettingspunkt/,
    );
    assert.equal(await readFile(options.snapshotPath, "utf8"), before);
    assert.equal(
      await readFile(options.logPath, "utf8"),
      "# Logg\n\n## Utgitt\n",
    );
    assert.deepEqual((await readdir(directory)).sort(), [
      "VERSJONSLOGG.md",
      "snapshot.json",
    ]);
  }, "# Logg\n\n## Utgitt\n");
});

test("main fører statusfeil og gjenoppretting én gang, og gjentar ikke feiloppføringer bare for ny dato", async () => {
  await withFiles(async ({ options, previous }) => {
    const fail = {
      ...options,
      fetcher: async () => {
        throw new Error("Secret vendor response");
      },
    };
    assert.deepEqual(await main(fail), { changed: true, failed: true });
    const failed = JSON.parse(await readFile(options.snapshotPath, "utf8"));
    assert.deepEqual(
      failed.groups.map((g) => g.rows),
      previous.groups.map((g) => g.rows),
    );
    assert.ok(
      failed.groups.every((g) => g.checkedAt === previous.groups[0].checkedAt),
    );
    const log = await readFile(options.logPath, "utf8");
    assert.doesNotMatch(log + JSON.stringify(failed), /Secret vendor/);
    assert.deepEqual(await main({ ...fail, now: "2026-11-10T06:00:00Z" }), {
      changed: false,
      failed: true,
    });
    assert.equal(await readFile(options.logPath, "utf8"), log);
    assert.deepEqual(await main({ ...options, now: "2026-11-11T06:00:00Z" }), {
      changed: true,
      failed: false,
    });
    assert.equal(
      (
        (await readFile(options.logPath, "utf8")).match(
          /^### .*oppdaterte prisdata/gm,
        ) ?? []
      ).length,
      2,
    );
  });
});

// Workflowens faktiske shell kjøres mot et lokalt bare-repo og en gh-stub.
// Verken fetcher, git-remote eller GitHub-klient bruker nettverket i testen.
test("workflow oppdaterer samme pris-PR, ignorerer bare nye tider og lukker foreldet forslag", async () => {
  const { spawnSync } = await import("node:child_process");
  const { mkdir, chmod } = await import("node:fs/promises");
  const directory = await mkdtemp(join(tmpdir(), "pricing-workflow-"));
  const work = join(directory, "work"),
    remote = join(directory, "remote.git"),
    bin = join(directory, "bin");
  const command = (cmd, args, options = {}) => {
    const result = spawnSync(cmd, args, {
      cwd: work,
      encoding: "utf8",
      ...options,
    });
    assert.equal(result.status, 0, `${cmd}: ${result.stderr ?? result.error}`);
    return result.stdout.trim();
  };
  const git = (...args) => command("git", args);
  try {
    await mkdir(work);
    await mkdir(bin);
    await mkdir(join(work, "src/content/pricing"), { recursive: true });
    await mkdir(join(work, "scripts/pricing"), { recursive: true });
    for (const file of ["sync.mjs", "parse.mjs", "sources.mjs"])
      await writeFile(
        join(work, "scripts/pricing", file),
        await readFile(new URL("../scripts/pricing/" + file, import.meta.url)),
      );
    const previous = await refresh(null, fetcher, "2026-11-08T06:00:00Z");
    const snapshotPath = join(work, "src/content/pricing/snapshot.json"),
      logPath = join(work, "VERSJONSLOGG.md");
    await writeFile(snapshotPath, JSON.stringify(previous));
    await writeFile(logPath, initialLog);
    git("init", "--bare", remote);
    git("init", "-b", "main");
    git("config", "user.name", "Pricing Test");
    git("config", "user.email", "pricing-test@example.invalid");
    git("config", "commit.gpgsign", "false");
    git("config", "core.hooksPath", "/dev/null");
    git("add", ".");
    git("commit", "-m", "fixture");
    git("remote", "add", "origin", remote);
    git("push", "origin", "main");
    const fakeGh = join(bin, "gh");
    await writeFile(
      fakeGh,
      `#!/bin/sh
set -eu
case "$1 $2" in
  "pr list") if [ -f "$FAKE_GH_STATE/open" ]; then cat "$FAKE_GH_STATE/open"; fi ;;
  "auth setup-git") : ;;
  "pr create") echo 1 > "$FAKE_GH_STATE/open"; echo create >> "$FAKE_GH_STATE/operations" ;;
  "pr edit") test "$3" = 1; echo edit >> "$FAKE_GH_STATE/operations" ;;
  "pr close") test "$3" = 1; rm "$FAKE_GH_STATE/open"; echo close >> "$FAKE_GH_STATE/operations" ;;
  *) echo "Unexpected gh operation" >&2; exit 1 ;;
esac
`,
    );
    await chmod(fakeGh, 0o755);
    const yaml = await readFile(
      new URL("../.github/workflows/pricing-sync.yml", import.meta.url),
      "utf8",
    );
    const step = yaml
      .split(
        "      - name: Opprett eller oppdater én pris-PR ved reell endring\n",
      )[1]
      .split("      - name:")[0];
    assert.ok(step);
    const script = step
      .split("        run: |\n")[1]
      .split("\n")
      .map((line) => (line.startsWith("          ") ? line.slice(10) : line))
      .join("\n");
    const env = {
      ...process.env,
      PATH: bin + ":" + process.env.PATH,
      FAKE_GH_STATE: directory,
      DEFAULT_BRANCH: "main",
      RUNNER_TEMP: directory,
      GH_TOKEN: "fake-only",
      GH_REPO: "fixture/pricing",
    };
    const run = async (price, date) => {
      const result = await main({
        snapshotPath,
        logPath,
        now: date,
        logger: () => {},
        fetcher: async (url) => ({
          ok: true,
          text: async () =>
            (await (await fetcher(url)).text()).replace(
              "$10 USD per month",
              `$${price} USD per month`,
            ),
        }),
      });
      command("bash", ["-n"], { input: script });
      command("bash", ["-c", script], {
        env: { ...env, CHANGED: String(result.changed) },
      });
    };
    const reset = () => {
      git("switch", "main");
      git("branch", "-D", "codex/pricing-sync");
    };
    await run(11, "2026-11-09T06:00:00Z");
    const firstHead = git("rev-parse", "origin/codex/pricing-sync");
    assert.equal(
      JSON.parse(
        git(
          "show",
          "origin/codex/pricing-sync:src/content/pricing/snapshot.json",
        ),
      ).groups[0].rows[0].monthly,
      11,
    );
    assert.deepEqual(
      git("diff", "--name-only", "main", "origin/codex/pricing-sync")
        .split("\n")
        .sort(),
      ["VERSJONSLOGG.md", "src/content/pricing/snapshot.json"],
    );
    reset();
    await run(11, "2026-11-10T06:00:00Z");
    assert.equal(git("rev-parse", "origin/codex/pricing-sync"), firstHead);
    git("restore", "VERSJONSLOGG.md", "src/content/pricing/snapshot.json");
    await run(12, "2026-11-11T06:00:00Z");
    assert.notEqual(git("rev-parse", "origin/codex/pricing-sync"), firstHead);
    assert.equal(
      JSON.parse(
        git(
          "show",
          "origin/codex/pricing-sync:src/content/pricing/snapshot.json",
        ),
      ).groups[0].rows[0].monthly,
      12,
    );
    reset();
    await run(10, "2026-11-12T06:00:00Z");
    await assert.rejects(readFile(join(directory, "open")), { code: "ENOENT" });
    assert.equal(
      await readFile(join(directory, "operations"), "utf8"),
      "create\nedit\nclose\n",
    );
    assert.equal(
      git("show", "main:src/content/pricing/snapshot.json"),
      JSON.stringify(previous),
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
