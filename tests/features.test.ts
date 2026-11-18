import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  getFeatures,
  getSiteLinks,
  getFeatureSource,
} from "../src/content/features.ts";
import { contentPages } from "../src/content/knowledge.ts";
import { resources } from "../src/content/resources.ts";
import {
  findPageRoutes,
  validateFeatures,
} from "../src/server/features/validate.ts";
import { retrieve } from "../src/features/rag/retrieval.ts";
import { isSources } from "../src/features/rag/contracts.ts";

test("alle eksisterende sider er registrert og lenkene i nettstedskartet er unike", () => {
  assert.doesNotThrow(() =>
    validateFeatures(findPageRoutes(join(process.cwd(), "src/app"))),
  );
  const links = getSiteLinks();
  assert.equal(new Set(links.map((link) => link.href)).size, links.length);
  assert.ok(links.some((link) => link.href === "/funksjonalitet/"));
});

test("nye og slettede sider samt feilaktige funksjonslenker stopper kontrollen", () => {
  const routes = findPageRoutes(join(process.cwd(), "src/app"));
  assert.throws(
    () => validateFeatures([...routes, "/ny-side/"]),
    /Side mangler i funksjonsregisteret/,
  );
  assert.throws(
    () => validateFeatures(routes.filter((route) => route !== "/om/")),
    /Registrert side finnes ikke/,
  );
  const features = getFeatures();
  assert.throws(
    () =>
      validateFeatures(routes, [
        ...features,
        {
          id: "ny",
          title: "Ny",
          description: "",
          status: "available",
          href: "/finnes-ikke/",
        },
      ]),
    /ukjent side/,
  );
  assert.throws(
    () => validateFeatures(routes, [...features, features[0]]),
    /Duplisert funksjons-ID/,
  );
});

test("sideoppdagelse håndterer rot, grupper og dynamiske ressurssider", () => {
  const fixture = mkdtempSync(join(tmpdir(), "ki-feature-routes-"));
  try {
    for (const file of [
      "page.tsx",
      "(gruppe)/om/page.tsx",
      "ressurser/[slug]/page.tsx",
      "_privat/test/page.tsx",
    ]) {
      const path = join(fixture, file);
      mkdirSync(join(path, ".."), { recursive: true });
      writeFileSync(path, "");
    }
    assert.deepEqual(
      findPageRoutes(fixture).sort(),
      ["/", "/om/", "/ressurser/[slug]/"].sort(),
    );
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test("ressursantall og sidebeskrivelser avledes av gjeldende innhold", () => {
  const before = resources.length;
  resources.push({ ...resources[0], slug: "test-ny-ressurs", title: "Test" });
  try {
    assert.ok(
      getFeatures()
        .find((feature) => feature.id === "katalog")!
        .description.includes(`${before + 1} ressurser`),
    );
  } finally {
    resources.pop();
  }
  for (const page of contentPages)
    assert.equal(
      getFeatures().find((feature) => feature.id === page.id)!.description,
      page.lead,
    );
});

test("Spør KI og oversikten bruker samme funksjoner og forbehold", () => {
  const source = getFeatureSource();
  assert.ok(isSources([source]));
  for (const feature of getFeatures()) {
    assert.ok(source.text.includes(feature.title));
    assert.ok(source.text.includes(feature.description));
  }
  assert.equal(retrieve("funksjonalitetsoversikt")[0]?.id, "funksjonalitet");
  // Offentlig nettsted uten innlogging er valgt; tidligere planlagt auth er trukket.
  assert.equal(
    getFeatures().some((feature) => feature.id === "tilgang"),
    false,
  );
  const changelog = getFeatures().find(
    (feature) => feature.id === "versjonslogg",
  )!;
  const plan = getFeatures().find(
    (feature) => feature.id === "utviklingsplan",
  )!;
  assert.match(changelog.description, /offentlig, brukerrettet versjonslogg/);
  assert.match(plan.description, /offentlige planen/);
  // Nå faktisk prøvd lokalt med Qwen; dette godkjenner ikke ekstern/delt drift.
  const model = getFeatures().find((feature) => feature.id === "modell")!;
  assert.equal(model.status, "beta");
  assert.match(
    model.description,
    /Lokale Qwen-svar med kildehenvisninger er prøvd/,
  );
  assert.match(
    model.description,
    /Eksternt modell-API er fortsatt bare testet med simulert transport/,
  );
});

test("personvernets utkaststatus og bekreftede kontakt følger felles kilde til RAG", () => {
  const feature = getFeatures().find((item) => item.id === "personvern")!;
  assert.equal(feature.status, "draft");
  assert.equal(feature.href, "/personvern/");
  const source = retrieve("personvern i portalen spørsmål lagring chat").find(
    (item) => item.id === "personvern",
  );
  assert.ok(source);
  assert.match(source.guide!.summary, /Utkast/);
  assert.match(source.guide!.note!, /khadah@nasjonalarkivet.no/);
  assert.match(source.text, /Dette sletter ikke eventuelle server-/);
});

test("prissiden og Spør KI bruker samme kontrollerte prisgrunnlag", async () => {
  const { pricing, getPricingSource, usd } =
    await import("../src/content/pricing/index.ts");
  const source = getPricingSource();
  assert.ok(isSources([source]));
  assert.equal(
    getFeatures().find((item) => item.id === "priser")?.href,
    "/priser/",
  );
  for (const group of pricing.groups) {
    assert.ok(source.text.includes(group.url));
    assert.ok(source.text.includes(group.checkedAt!));
    for (const row of group.rows)
      assert.ok(
        source.text.includes(usd("monthly" in row ? row.monthly : row.input)),
      );
  }
  assert.ok(
    retrieve("abonnement Copilot Claude Codex priser").some(
      (s) => s.id === "priser",
    ),
  );
});

type Entry = {
  id: string;
  sourceTitle: string;
  sourceSha256: string;
  date: string;
  destination: string;
  summary: string;
};
const inventory = JSON.parse(
  readFileSync("docs/historikk/kartlegging-2026-11-18.json", "utf8"),
) as {
  logEntries: Entry[];
  planSections: { id: string; sourceTitle: string; destination: string }[];
  commits: { commit: string; sourceEntries: string[] }[];
};

test("alle kartlagte loggposter er bevart i opprinnelig rekkefølge og med uendret innhold", () => {
  const log = readFileSync("VERSJONSLOGG.md", "utf8");
  const headings = [...log.matchAll(/^#{2,3} (.+(?:2026|2026[^\n]*))$/gm)];
  const hashes = headings.map((heading, i) =>
    createHash("sha256")
      .update(log.slice(heading.index, headings[i + 1]?.index).trim())
      .digest("hex"),
  );
  let previous = -1;
  for (const entry of inventory.logEntries) {
    const next = hashes.indexOf(entry.sourceSha256, previous + 1);
    assert.ok(next > previous, `Mistet eller endret kildepost: ${entry.id}`);
    previous = next;
  }
  assert.equal(inventory.logEntries.length, 138);
  assert.equal(
    new Set(inventory.logEntries.map((entry) => entry.id)).size,
    138,
  );
});

test("offentlig logg dekker hvert redaksjonelt sammendrag og skiller driftsbevis fra produktendringer", () => {
  const publicLog = readFileSync("VERSJONSLOGG-OFFENTLIG.md", "utf8");
  for (const entry of inventory.logEntries) {
    assert.ok(["changelog", "technical"].includes(entry.destination));
    if (entry.destination === "changelog")
      assert.ok(publicLog.includes(entry.summary), `Mangler ${entry.id}`);
  }
  assert.equal(
    inventory.logEntries.filter((entry) => entry.destination === "changelog")
      .length,
    122,
  );
  assert.match(publicLog, /30\. oktober 2026/);
  assert.match(publicLog, /ikke bekreftede publiseringsdatoer/);
  assert.match(publicLog, /Teknisk drift:/);
});

test("alle 75 commits har kildekobling og alle planseksjoner har hovedplassering", () => {
  const sourceIds = new Set(inventory.logEntries.map((entry) => entry.id));
  assert.equal(inventory.commits.length, 75);
  assert.equal(
    new Set(inventory.commits.map((entry) => entry.commit)).size,
    75,
  );
  for (const commit of inventory.commits) {
    assert.match(commit.commit, /^[a-f\d]{40}$/);
    assert.ok(commit.sourceEntries.length);
    for (const id of commit.sourceEntries) assert.ok(sourceIds.has(id));
  }
  assert.equal(inventory.planSections.length, 48);
  const currentPlanSections = [
    ...readFileSync("UTVIKLINGSPLAN.md", "utf8").matchAll(/^#{2,3} (.+)$/gm),
  ].map((match) => match[1]);
  let previousSection = -1;
  for (const section of inventory.planSections) {
    const next = currentPlanSections.indexOf(
      section.sourceTitle,
      previousSection + 1,
    );
    assert.ok(next > previousSection, `Mistet planseksjon: ${section.id}`);
    previousSection = next;
  }

  for (const section of inventory.planSections)
    assert.ok(["plan", "historical-plan"].includes(section.destination));
});

test("dagens funksjonsregister overlater fremtidige oversikter til planen", () => {
  const ids = new Set(getFeatures().map((feature) => feature.id));
  assert.equal(ids.has("modelloversikt"), false);
  assert.equal(ids.has("forbruk"), false);
  assert.equal(
    getFeatures().some((feature) => feature.status === "planned"),
    false,
  );
  assert.ok(ids.has("oversikt"));
  assert.ok(ids.has("spor"));
  const plan = readFileSync("UTVIKLINGSPLAN-OFFENTLIG.md", "utf8");
  for (let i = 1; i <= 10; i++) assert.ok(plan.includes(`P${i} –`));
  assert.match(plan, /Datert beslutningshistorikk/);
  assert.match(plan, /Modelloversikt er et planlagt tema/);
  assert.doesNotMatch(plan, /## Dette er utviklet og prøvd lokalt/);
});
