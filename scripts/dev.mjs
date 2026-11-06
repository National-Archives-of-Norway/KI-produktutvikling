import { spawn } from "node:child_process";
import { startRagServer } from "./rag-server.mjs";

const rag = startRagServer();
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
rag.on("error", (error) => {
  console.error("Kunne ikke starte RAG-tjenesten:", error.message);
  next.kill();
  process.exitCode = 1;
});
function shutdown() {
  next.kill("SIGTERM");
  rag.close();
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
next.on("exit", (code) => {
  rag.close();
  process.exitCode = code ?? 0;
});
