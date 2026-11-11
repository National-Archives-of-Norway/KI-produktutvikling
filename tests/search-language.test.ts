import assert from "node:assert/strict";
import { test } from "node:test";
import {
  actionTerms,
  stemNorwegian,
  terms,
} from "../src/features/rag/search-language.ts";

const groups = [
  ["slette", "sletter", "slettet", "sletting"],
  ["oppdatere", "oppdaterer", "oppdateres", "oppdatert", "oppdatering"],
  ["lagre", "lagrer", "lagres", "lagret", "lagring"],
  ["dele", "deler", "deles", "delt", "deling"],
  ["bruke", "bruker", "brukes", "brukt"],
  ["teste", "tester", "testes", "testet", "testing"],
  ["kode", "koden", "kodene"],
  ["pris", "prisen", "prisene"],
  ["tilgjengelighet", "tilgjengeligheten"],
  ["personvern", "personvernet"],
  ["samtale", "samtalen"],
  ["historikk", "historikken"],
  ["oversikt", "oversikten"],
  ["modelloversikt", "modelloversikten"],
  ["dokument", "dokumentet"],
];
for (const forms of groups) {
  test(`samme stamme: ${forms.join(" / ")}`, () => {
    assert.equal(
      new Set(forms.map(stemNorwegian)).size,
      1,
      JSON.stringify(forms.map((word) => [word, stemNorwegian(word)])),
    );
  });
}

test("korte ord og beskyttede endelser stammes ikke for hardt", () => {
  for (const word of [
    "ting",
    "ring",
    "kring",
    "mening",
    "regning",
    "test",
    "kom",
    "het",
    "identitet",
    "tilgjengelighet",
  ])
    assert.equal(stemNorwegian(word), word);
  assert.notEqual(stemNorwegian("test"), "tes");
  assert.notEqual(stemNorwegian("kom"), stemNorwegian("kommer"));
});

test("frekvensord filtreres før stamming", () => {
  assert.deepEqual(
    terms("aldri alltid ofte sjelden ganske veldig noen ganger"),
    [],
  );
  assert.deepEqual(terms("OFTE ganske"), []);
});

test("handlingsord bruker samme nye stammer som alle bøyningene", () => {
  for (const forms of groups.slice(0, 6))
    for (const word of forms)
      assert.ok(actionTerms.has(stemNorwegian(word)), word);
});
