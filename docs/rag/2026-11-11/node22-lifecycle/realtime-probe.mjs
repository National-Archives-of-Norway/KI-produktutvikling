import { createServer } from "node:http";
import { once } from "node:events";
import { createRequire } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { writeFileSync } from "node:fs";
const root = process.cwd();
const local = (file) => import(pathToFileURL(join(root, file)));
const { createRagHttpServer } = await local("src/server/rag/http.ts");
const { createRagService } = await local("src/server/rag/service.ts");
const { createOllamaAdapter } = await local("src/server/rag/ollama.ts");
const { createExternalAdapter } = await local("src/server/rag/external.ts");
const { requestAnswer } = await local("src/features/rag/client.ts");
const { RAG_TIMEOUTS } = await local("src/config/rag.ts");
const { proxyRequest } = createRequire(join(root, "package.json"))(
  "next/dist/server/lib/router-utils/proxy-request.js",
);
const { parse } = await import("node:url");
async function runCase(kind, delayMs) {
  const servers = [];
  let calls = 0,
    transportAborted = false;
  const response = (answer) =>
    kind === "success"
      ? Response.json({ message: { content: `  ${answer}  ` } })
      : Response.json({ choices: [{ message: { content: answer } }] });
  const fetcher = async (_url, init) => {
    if (++calls > 1) return response("etterprøve");
    return new Promise((resolve, reject) => {
      const onAbort = () => {
        clearTimeout(timer);
        init.signal.removeEventListener("abort", onAbort);
        transportAborted = true;
        reject(init.signal.reason);
      };
      const timer = setTimeout(() => {
        init.signal.removeEventListener("abort", onAbort);
        resolve(response("simulert svar"));
      }, delayMs);
      init.signal.addEventListener("abort", onAbort, { once: true });
    });
  };
  async function listen(server) {
    servers.push(server);
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    return `http://127.0.0.1:${server.address().port}/api/rag`;
  }
  try {
    const model =
      kind === "success"
        ? createOllamaAdapter(
            {
              model: "fake-model",
              endpoint: new URL("http://localhost:11434"),
            },
            fetcher,
          )
        : createExternalAdapter(
            {
              model: "fake-model",
              endpoint: new URL("https://model.example.test/chat"),
              apiKey: "fake-test-only",
            },
            fetcher,
          );
    const target = await listen(
      createRagHttpServer(createRagService({ model })),
    );
    const url = await listen(
      createServer(async (req, res) => {
        try {
          await proxyRequest(
            req,
            res,
            parse(target),
            undefined,
            undefined,
            RAG_TIMEOUTS.proxyMs,
          );
        } catch {}
      }),
    );
    async function ask() {
      let status;
      const outcome = await requestAnswer("kodeendring tester", {
        demo: false,
        fetcher: async (_input, init) => {
          const r = await fetch(url, init);
          status = r.status;
          return r;
        },
      });
      return {
        status,
        mode: outcome.result?.mode,
        answer: outcome.result?.answer,
        error: outcome.error,
        sourceCount: outcome.result?.sources.length ?? 0,
      };
    }
    const started = performance.now();
    const first = await ask();
    const elapsedMs = Math.round(performance.now() - started);
    const next = await ask();
    return {
      kind,
      provider: kind === "success" ? "ollama" : "openai-compatible",
      simulatedDelayMs: delayMs,
      elapsedMs,
      first,
      transportAborted,
      next,
      passed:
        next.status === 200 &&
        next.answer === "etterprøve" &&
        (kind === "success"
          ? first.status === 200 &&
            first.answer === "simulert svar" &&
            elapsedMs > 30000 &&
            elapsedMs < RAG_TIMEOUTS.proxyMs
          : first.status === 502 &&
            first.mode === "sources" &&
            first.sourceCount > 0 &&
            transportAborted &&
            elapsedMs >= 59000 &&
            elapsedMs < RAG_TIMEOUTS.proxyMs),
    };
  } finally {
    await Promise.all(
      servers.map(
        (server) =>
          new Promise((resolve) => {
            server.closeAllConnections();
            server.close(resolve);
          }),
      ),
    );
  }
}
const cases = await Promise.all([
  runCase("success", 35000),
  runCase("timeout", 90000),
]);
const result = {
  node: process.version,
  platform: process.platform,
  arch: process.arch,
  timeoutsMs: RAG_TIMEOUTS,
  realProviderRequests: false,
  cases,
  passed: cases.every((c) => c.passed),
};
writeFileSync(process.argv[2], JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
