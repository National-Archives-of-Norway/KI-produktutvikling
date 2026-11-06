import { test } from "node:test";
import assert from "node:assert/strict";
import { retrieve, corpus } from "../src/features/rag/retrieval.ts";
import { validateQuestion } from "../src/features/rag/contracts.ts";

test("relevant kodekilde rangeres først", () => {
  assert.equal(retrieve("kodeendring tester")[0]?.id, "kodegjennomgang");
});
test("irrelevante spørsmål gir ikke tilfeldige kilder", () => {
  assert.deepEqual(retrieve("værmelding bananer"), []);
  assert.deepEqual(retrieve("Hva er KI?"), []);
});
test("offentlig liste inneholder bare kjente interne lenker", () => {
  assert.equal(corpus.length, 3);
  for (const source of corpus)
    assert.match(source.href, /^\/ressurser\/[a-z-]+\/$/);
});
test("ugyldige forespørsler avvises", () => {
  for (const value of [null, {}, 7, "  ", "aa", "x".repeat(1001)])
    assert.equal(validateQuestion(value), null);
  assert.equal(validateQuestion("  brukerbehov  "), "brukerbehov");
});
