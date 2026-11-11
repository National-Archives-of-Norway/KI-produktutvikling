import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { Server } from "node:http";
import { createRequire } from "node:module";
import { parse } from "node:url";
import { createRagHttpServer } from "../src/server/rag/http.ts";
import { createRagService } from "../src/server/rag/service.ts";
import { requestAnswer } from "../src/features/rag/client.ts";

const { proxyRequest } = createRequire(import.meta.url)(
  "next/dist/server/lib/router-utils/proxy-request.js",
);
const question = "kodeendring tester";
async function withProxy(
  modelTimeoutMs: number,
  proxyMs: number,
  generate: (
    q: string,
    sources: unknown,
    signal?: AbortSignal,
  ) => Promise<string>,
  run: (url: string) => Promise<void>,
) {
  const servers: Server[] = [];
  async function listen(server: Server) {
    servers.push(server);
    await new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    return `http://127.0.0.1:${address.port}/api/rag`;
  }
  try {
    const target = await listen(
      createRagHttpServer(
        createRagService({ modelTimeoutMs, model: { generate } }),
      ),
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
            proxyMs,
          );
        } catch {
          /* Next håndterer proxy-feilen og avslutter responsen selv. */
        }
      }),
    );
    await run(url);
  } finally {
    await Promise.all(
      servers.map(
        (server) =>
          new Promise<void>((resolve) => {
            server.closeAllConnections();
            server.close(() => resolve());
          }),
      ),
    );
  }
}
const ask = (url: string) =>
  requestAnswer(question, {
    demo: false,
    fetcher: (_input, init) => fetch(url, init),
  });

test("treg simulert modell svarer gjennom faktisk Next-proxy før lengre proxygrense", async () => {
  await withProxy(
    500,
    1000,
    () =>
      new Promise((resolve) => setTimeout(() => resolve("simulert svar"), 30)),
    async (url) => {
      const result = await ask(url);
      assert.equal(result.error, undefined);
      assert.equal(result.result?.answer, "simulert svar");
    },
  );
});

test("modelltimeout gir JSON 502 med kilder før Next-proxyen gir opp", async () => {
  await withProxy(
    20,
    500,
    () => new Promise(() => {}),
    async (url) => {
      const result = await ask(url);
      assert.match(result.error!, /Modelltjenesten/);
      assert.equal(result.result?.mode, "sources");
      assert.ok(result.result?.sources.length);
    },
  );
});

test("faktisk Next-proxytimeout gir tekstfeil og avbryter nedstrøms modell", async (t) => {
  t.mock.method(console, "error", () => {});
  let cancelled = false;
  await withProxy(
    500,
    20,
    (_q, _sources, signal) => {
      signal!.addEventListener(
        "abort",
        () => {
          cancelled = true;
        },
        { once: true },
      );
      return new Promise(() => {});
    },
    async (url) => {
      const result = await ask(url);
      assert.match(result.error!, /svarformat.*JSON/);
      // Socket-close og tjenestens finally behandles i neste event-loop-runde.
      for (let i = 0; i < 20 && !cancelled; i++)
        await new Promise((resolve) => setTimeout(resolve, 5));
      assert.equal(cancelled, true);
    },
  );
});
