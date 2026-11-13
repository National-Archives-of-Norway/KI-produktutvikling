import { spawn } from "node:child_process";

// Begge prosesser deler container/loopback; modellserveren er en egen tjeneste.
const children = [
  spawn(process.execPath, ["scripts/rag-server.mjs"], { stdio: "inherit" }),
  spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "0.0.0.0",
      "--port",
      "3000",
    ],
    { stdio: "inherit" },
  ),
];
let stopping = false;
function stop() {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill("SIGTERM");
}
for (const child of children) {
  child.on("error", () => {
    console.error("Portalprosessen kunne ikke starte.");
    process.exitCode = 1;
    stop();
  });
  child.on("exit", (code) => {
    if (!stopping) {
      process.exitCode = code || 1;
      stop();
    }
  });
}
process.on("SIGTERM", stop);
process.on("SIGINT", stop);
