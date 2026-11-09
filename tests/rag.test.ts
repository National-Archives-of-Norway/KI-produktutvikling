import { test } from "node:test";
import assert from "node:assert/strict";
import { retrieve, corpus } from "../src/features/rag/retrieval.ts";
import { validateQuestion } from "../src/features/rag/contracts.ts";
import { resources } from "../src/content/resources.ts";

test("relevant kodekilde rangeres først", () => {
  assert.equal(retrieve("kodeendring tester")[0]?.id, "kodegjennomgang");
});
test("irrelevante spørsmål gir ikke tilfeldige kilder", () => {
  assert.deepEqual(retrieve("værmelding bananer"), []);
  assert.deepEqual(retrieve("Hva er KI?"), []);
});
test("offentlig liste inneholder bare kjente interne lenker", () => {
  assert.deepEqual(
    corpus.map((source) => source.id),
    resources.map((resource) => resource.slug),
  );
  for (const source of corpus)
    assert.match(source.href, /^\/ressurser\/[a-z-]+\/$/);
});
test("tilgjengelighetsskillen kan finnes i kildesøket", () => {
  assert.equal(
    retrieve("tilgjengelighetserklæring")[0]?.id,
    "tilgjengelighetserklaering",
  );
});
test("ugyldige forespørsler avvises", () => {
  for (const value of [null, {}, 7, "  ", "aa", "x".repeat(1001)])
    assert.equal(validateQuestion(value), null);
  assert.equal(validateQuestion("  brukerbehov  "), "brukerbehov");
});
