import { test } from "node:test";
import assert from "node:assert/strict";
import { retrieve, corpus } from "../src/features/rag/retrieval.ts";
import { validateQuestion, isSources } from "../src/features/rag/contracts.ts";
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
    corpus
      .filter((source) => source.href.startsWith("/ressurser/"))
      .map((source) => source.id),
    resources.map((resource) => resource.slug),
  );
  assert.ok(isSources(corpus));
});
test("vanlige spørsmål finner riktig veiledning med konkrete steg og status", () => {
  for (const [question, id] of [
    ["Hvordan tester jeg tilgjengeligheten?", "tilgjengelighetserklaering"],
    ["Hva er KI-prat?", "ki-prat"],
    ["Hvordan kommer jeg i gang med KI?", "kom-i-gang"],
    ["Hvilke retningslinjer gjelder for KI?", "retningslinjer"],
    ["Hvilke verktøy er godkjent?", "retningslinjer"],
  ]) {
    const source = retrieve(question)[0];
    assert.equal(source?.id, id, question);
    assert.ok(source.guide?.summary);
    assert.ok(source.guide?.steps.length);
  }
  assert.match(retrieve("tilgjengelighet")[0].guide!.note!, /Beta/);
  assert.match(retrieve("retningslinjer")[0].guide!.summary, /arbeidsutkast/);
});
test("API-kilder avviser eksterne lenker og ugyldig veiledning", () => {
  assert.equal(
    isSources([{ ...corpus[0], href: "https://example.com" }]),
    false,
  );
  assert.equal(
    isSources([{ ...corpus[0], guide: { summary: "Tekst", steps: [7] } }]),
    false,
  );
  assert.equal(
    isSources([
      { ...corpus[0], guide: { summary: "Tekst", steps: [], note: {} } },
    ]),
    false,
  );
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
test("personvernspørsmål finner riktig skill med egne begrensninger", () => {
  const source = retrieve("personvernerklæring GDPR")[0];
  assert.equal(source.id, "personvernerklaering");
  assert.match(source.text, /ingen automatisk juridisk godkjenning/);
  assert.match(source.guide!.note!, /Beta/);
  assert.ok(!source.text.includes("uustatus.no"));
});

test("cookie-informasjon kan leveres som RAG-kilde uten å åpne for ukjente ruter", () => {
  const source = corpus.find((item) => item.id === "informasjonskapsler")!;
  assert.ok(source);
  assert.ok(isSources([source]));
  assert.equal(
    retrieve("Trenger portalen et samtykkebanner?")[0]?.id,
    "informasjonskapsler",
  );
  assert.equal(
    retrieve("Bruker portalen cookies?")[0]?.id,
    "informasjonskapsler",
  );
  assert.match(source.guide!.summary, /lokale/);
  assert.ok(
    corpus.some((item) => item.id === "informasjonskapsler-og-samtykke"),
  );
  assert.equal(
    isSources([{ ...source, href: "/informasjonskapsler-ukjent/" }]),
    false,
  );
});
