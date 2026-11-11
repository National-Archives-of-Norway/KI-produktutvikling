import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { retrieve } from "../src/features/rag/retrieval.ts";
import { readBlindCases, evaluateSearch } from "./rag-evaluation.ts";

test("blindEvaluation rapporterer treffsikkerhet uten en bygggrense", async (t) => {
  try {
    const { cases, errors } = readBlindCases(
      await readFile(
        new URL("./fixtures/rag-blind.json", import.meta.url),
        "utf8",
      ),
    );
    for (const error of errors) t.diagnostic(error);
    if (!cases.length) {
      t.diagnostic("blindEvaluation: tomt sett – treffsikkerhet er ikke målt.");
      return;
    }
    const result = evaluateSearch(retrieve, cases);
    t.diagnostic(
      `blindEvaluation: ${result.passed}/${result.total}, ${(100 * result.accuracy!).toFixed(1)} %; rapport, ingen bygggrense.`,
    );
    for (const row of result.rows.filter((row) => !row.passed))
      t.diagnostic(JSON.stringify(row));
  } catch {
    t.diagnostic(
      "blindEvaluation kunne ikke lastes; rapportdelen er ikke utført.",
    );
  }
});

test("blindrapport viser null treffsikkerhet ved bom, og tomt sett er ikke målt", () => {
  assert.equal(
    evaluateSearch(() => [], [{ question: "test", expectedId: "forventet" }])
      .accuracy,
    0,
  );
  assert.equal(evaluateSearch(() => [], []).accuracy, null);
  assert.equal(
    evaluateSearch(() => [], [{ question: "test", expectedId: null }]).passed,
    1,
  );
});

test("blindfilens formatfeil rapporteres uten å kaste", () => {
  assert.equal(readBlindCases("{").errors.length, 1);
  const result = readBlindCases(
    JSON.stringify({
      schemaVersion: 1,
      blindEvaluation: [
        { question: "", expectedId: null },
        { question: "test", expectedId: "id", maxRank: 4 },
        { question: "gyldig", expectedId: null },
      ],
    }),
  );
  assert.equal(result.cases.length, 1);
  assert.equal(result.errors.length, 2);
});
