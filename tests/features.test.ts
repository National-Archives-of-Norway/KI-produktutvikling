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
  assert.equal(
    getFeatures().find((feature) => feature.id === "tilgang")!.status,
    "planned",
  );
  assert.equal(
    getFeatures().find((feature) => feature.id === "modell")!.status,
    "setup",
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
