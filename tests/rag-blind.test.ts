import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { retrieve } from "../src/features/rag/retrieval.ts";
import { reportBlindEvaluation } from "./rag-blind-report.ts";

// Kun eksplisitt test:blind. Aldri importert/kjørt av ordinær testpakke/CI.
test("blindEvaluation rapporterer uten en bygggrense", async (t) => {
  await reportBlindEvaluation({
    file: process.env.RAG_BLIND_FILE,
    repoRoot: fileURLToPath(new URL("..", import.meta.url)),
    verbose: process.env.RAG_BLIND_VERBOSE === "1",
    search: retrieve,
    diagnostic: (message) => t.diagnostic(message),
  });
});
