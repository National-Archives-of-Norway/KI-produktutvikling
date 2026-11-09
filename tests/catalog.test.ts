import { test } from "node:test";
import assert from "node:assert/strict";
import { findResources } from "../src/content/resource-search.ts";

test("tilgjengelighetsskillen finnes med navn, tema og relevante fagord", () => {
  for (const query of [
    "tilgjengelighet",
    "tilgjengelighetserklaering",
    "WCAG",
    "uustatus",
    "universell utforming",
    "  TILGJENGELIGHETSERKLÆRING  ",
  ]) {
    assert.ok(
      findResources(query, "Skill").some(
        (r) => r.skill?.name === "tilgjengelighetserklaering",
      ),
      query,
    );
  }
});
test("søk og typefilter virker sammen uten å vise feil ressurstype", () => {
  assert.deepEqual(findResources("WCAG", "Prompt"), []);
  assert.deepEqual(findResources("et helt ukjent tema"), []);
  assert.ok(
    findResources("", "Skill").every((resource) => resource.type === "Skill"),
  );
  assert.equal(findResources("kodeendring")[0]?.slug, "kodegjennomgang");
});
test("personvernskillen finnes med navn, tema og relevante fagord", () => {
  for (const query of [
    "personvern",
    "personvernerklaering",
    "GDPR",
    "cookies",
    "Datatilsynet",
    "behandlingsgrunnlag",
  ]) {
    assert.ok(
      findResources(query, "Skill").some(
        (resource) => resource.skill?.name === "personvernerklaering",
      ),
      query,
    );
  }
});
