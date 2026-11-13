import assert from "node:assert/strict";
import { RAG_TIMEOUTS } from "../src/config/rag.ts";

// Eksplisitt integrasjonsprøve mot faktisk modell, aldri del av pnpm test/CI.
const base = process.argv[2] ?? "http://127.0.0.1:3005";
const origin = new URL(base).origin;
for (const [question, expectedId] of [
  ["Hvordan skriver jeg en god prompt?", "tydelig-kontekst"],
  ["Hvordan utforsker jeg brukerbehov?", "brukerbehov"],
  ["Hvem er statsministeren?", null],
]) {
  const start = performance.now();
  const response = await fetch(new URL("/api/rag", base), {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify({ question }),
    signal: AbortSignal.timeout(RAG_TIMEOUTS.clientMs),
  });
  const data = await response.json();
  assert.equal(
    response.status,
    200,
    `HTTP ${response.status}: ${JSON.stringify(data)}`,
  );
  if (expectedId) {
    assert.equal(data.mode, "generated");
    assert.equal(data.sources[0]?.id, expectedId);
    assert.ok(data.answer?.trim().length > 20);
    assert.doesNotMatch(
      data.answer,
      /<\/?think>/i,
      "Tenketekst skal ikke vises",
    );
    assert.match(data.answer, /\[1\]/, "Svaret må vise kildehenvisning");
  } else {
    assert.equal(data.mode, "sources");
    assert.deepEqual(data.sources, []);
    assert.equal(data.reason, "no_sources");
  }
  console.log(
    JSON.stringify({
      question,
      elapsedMs: Math.round(performance.now() - start),
      mode: data.mode,
      sources: data.sources.map((s) => s.id),
      answer: data.answer,
    }),
  );
}
console.log(
  "Bestått: faktiske modellsvar med kilder og irrelevant spørsmål uten generering.",
);
