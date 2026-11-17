import { spawn } from "node:child_process";
// Node follows imported content files and restarts RAG when they change.
const rag = spawn(
  process.execPath,
  ["--watch", "--env-file-if-exists=.env.local", "scripts/rag-server.mjs"],
  { stdio: "inherit", env: process.env },
);
const next = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "dev",
    "--hostname",
    "127.0.0.1",
    ...process.argv.slice(2),
  ],
  { stdio: "inherit", env: process.env },
);
// Rene søketester følger importerte innholdsmoduler uten modellgenerering.
const searchTests = spawn(
  process.execPath,
  ["scripts/rag-search-tests.mjs", "--watch"],
  { stdio: "inherit", env: process.env },
);
let stopping = false;
function shutdown() {
  if (stopping) return;
  stopping = true;
  next.kill("SIGTERM");
  rag.kill("SIGTERM");
  searchTests.kill("SIGTERM");
}
for (const child of [rag, next, searchTests]) {
  child.on("error", (error) => {
    console.error("Kunne ikke starte lokalmiljøet:", error.message);
    process.exitCode = 1;
    shutdown();
  });
  child.on("exit", (code) => {
    if (!stopping) {
      process.exitCode = code ?? 1;
      shutdown();
    }
  });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
