// Kjør fra prosjektroten med Node 22. Ingen modell eller eksterne kall.
import { once } from "node:events";
import { writeFileSync } from "node:fs";
import { createRagHttpServer } from "../../../../src/server/rag/http.ts";
import { createRagService } from "../../../../src/server/rag/service.ts";

const output = process.argv[2];
if (!output) throw new Error("Oppgi resultatfil som første argument.");
const report = {
  testedCommit: "2e5411a",
  node: process.version,
  undici: process.versions.undici,
  platform: process.platform,
  arch: process.arch,
  bodyBytes: 2 * 1024 * 1024,
  repetitionsPerServerAndMode: 50,
  followingCallsPerRejection: 4,
  servers: [],
  errors: [],
};
const question = JSON.stringify({ question: "kodeendring tester" });
const large = "x".repeat(report.bodyBytes);

async function send(url, body, streaming = false) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    ...(streaming ? { duplex: "half" } : {}),
    signal: AbortSignal.timeout(5000),
  });
  const data = await response.json();
  return { response, data };
}
function errorDetail(error) {
  return {
    message: error.message,
    code: error.code,
    cause: error.cause && errorDetail(error.cause),
  };
}

for (let trial = 0; trial < 3; trial++) {
  const server = createRagHttpServer(createRagService());
  const sockets = new Set();
  const result = {
    trial: trial + 1,
    acceptedConnections: 0,
    closedAfterCleanup: false,
    modes: [],
  };
  server.on("connection", (socket) => {
    result.acceptedConnections++;
    sockets.add(socket);
    socket.once("close", () => sockets.delete(socket));
  });
  try {
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const url = `http://127.0.0.1:${server.address().port}/api/rag`;
    for (const mode of ["content-length", "chunked"]) {
      const counters = {
        mode,
        warmup200: 0,
        rejected413: 0,
        connectionClose: 0,
        following200: 0,
      };
      result.modes.push(counters);
      for (let cycle = 0; cycle < report.repetitionsPerServerAndMode; cycle++) {
        let stage = "warmup";
        try {
          const warmup = await send(url, question);
          if (
            warmup.response.status !== 200 ||
            warmup.data.sources?.[0]?.id !== "kodegjennomgang"
          )
            throw new Error("Unexpected warmup response");
          counters.warmup200++;
          stage = "2MB rejection";
          // AsyncIterable gir fetch en strøm uten kjent Content-Length.
          const body =
            mode === "chunked"
              ? (async function* () {
                  for (let i = 0; i < large.length; i += 65536)
                    yield large.slice(i, i + 65536);
                })()
              : large;
          const { response, data } = await send(url, body, mode === "chunked");
          if (
            response.status !== 413 ||
            data.error !== "Forespørselen er for stor."
          )
            throw new Error(
              `Unexpected large-body response ${response.status}`,
            );
          counters.rejected413++;
          if (response.headers.get("connection") !== "close")
            throw new Error("Missing Connection: close");
          counters.connectionClose++;
          for (let i = 0; i < report.followingCallsPerRejection; i++) {
            stage = `following call ${i + 1}`;
            const next = await send(url, question);
            if (
              next.response.status !== 200 ||
              next.data.sources?.[0]?.id !== "kodegjennomgang"
            )
              throw new Error("Unexpected following response");
            counters.following200++;
          }
        } catch (error) {
          report.errors.push({
            trial: trial + 1,
            mode,
            cycle: cycle + 1,
            stage,
            ...errorDetail(error),
          });
          if (report.errors.length >= 10)
            throw new Error("Stopped after ten failures");
        }
      }
    }
  } finally {
    const closed = once(server, "close");
    server.closeAllConnections();
    server.close();
    await closed;
    // closeAllConnections ødelegger socketene synkront; close-events kan komme senere.
    result.closedAfterCleanup =
      !server.listening && [...sockets].every((socket) => socket.destroyed);
    report.servers.push(result);
    writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
  }
}
report.passed =
  report.errors.length === 0 &&
  report.servers.every(
    (server) =>
      server.closedAfterCleanup &&
      server.modes.length === 2 &&
      server.modes.every(
        (mode) =>
          mode.warmup200 === 50 &&
          mode.rejected413 === 50 &&
          mode.connectionClose === 50 &&
          mode.following200 === 200,
      ),
  );
writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
