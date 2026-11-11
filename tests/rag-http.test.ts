import assert from "node:assert/strict";
import { test } from "node:test";
import { request } from "node:http";
import { createRagHttpServer } from "../src/server/rag/http.ts";
import { createRagService } from "../src/server/rag/service.ts";
import { loadRagConfig } from "../src/server/rag/config.ts";
import type { RagService } from "../src/server/rag/service.ts";

async function withServer(
  run: (url: string) => Promise<void>,
  service: RagService = createRagService(),
  config = loadRagConfig({}),
) {
  const server = createRagHttpServer(service, config);
  try {
    await new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    await run(`http://127.0.0.1:${address.port}/api/rag`);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) =>
      server.close((error) =>
        error &&
        (error as NodeJS.ErrnoException).code !== "ERR_SERVER_NOT_RUNNING"
          ? reject(error)
          : resolve(),
      ),
    );
  }
}

const question = JSON.stringify({ question: "kodeendring tester" });
async function post(
  url: string,
  headers: Record<string, string> = {},
  body = question,
) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body,
    signal: AbortSignal.timeout(5000),
  });
}

test("HTTP-serveren bruker konfigurerte origins for annen devport og delt vert", async () => {
  const config = loadRagConfig({
    RAG_ALLOWED_ORIGINS: "http://127.0.0.1:3005,https://pilot.example.test",
  });
  await withServer(
    async (url) => {
      const statuses = [];
      for (const origin of [
        "http://127.0.0.1:3005",
        "https://pilot.example.test",
      ]) {
        const response = await post(url, { Origin: origin });
        statuses.push({ origin, status: response.status });
        await response.arrayBuffer();
      }
      assert.deepEqual(statuses, [
        { origin: "http://127.0.0.1:3005", status: 200 },
        { origin: "https://pilot.example.test", status: 200 },
      ]);
      for (const origin of [
        "http://localhost:3000",
        "https://other.example.test",
        "null",
      ]) {
        const response = await post(url, { Origin: origin });
        assert.equal(response.status, 403, origin);
        await response.arrayBuffer();
      }
    },
    createRagService(),
    config,
  );
});

test("HTTP-serveren leser JSON-medietype uten hensyn til bokstavstørrelse og parametre", async () => {
  await withServer(async (url) => {
    for (const type of [
      "Application/JSON",
      "APPLICATION/JSON; charset=UTF-8",
      "application/json; charset=utf-8",
    ]) {
      const response = await post(url, { "Content-Type": type });
      assert.equal(response.status, 200, type);
      await response.arrayBuffer();
    }
    for (const type of ["text/plain", "application/jsonx"]) {
      const response = await post(url, { "Content-Type": type });
      assert.equal(response.status, 415, type);
      await response.arrayBuffer();
    }
  });
});

test(
  "HTTP-serveren lukker 413-forbindelsen kontrollert og tåler etterfølgende fetch",
  { timeout: 20000 },
  async () => {
    await withServer(async (url) => {
      const observations: {
        status?: number;
        connection?: string | null;
        error?: string;
      }[] = [];
      for (let trial = 0; trial < 3; trial++) {
        const warmup = await post(url);
        assert.equal(warmup.status, 200);
        await warmup.arrayBuffer();
        const large = await post(url, {}, "x".repeat(2 * 1024 * 1024));
        assert.equal(large.status, 413);
        const connection = large.headers.get("connection");
        await large.arrayBuffer();
        observations.push({ status: 413, connection });
        for (let i = 0; i < 4; i++) {
          try {
            const response = await post(url);
            await response.arrayBuffer();
            observations.push({ status: response.status });
          } catch (error) {
            observations.push({
              error: String(
                (error as Error & { cause?: Error }).cause ?? error,
              ),
            });
          }
        }
      }
      assert.deepEqual(
        observations,
        Array.from({ length: 3 }, () => [
          { status: 413, connection: "close" },
          ...Array.from({ length: 4 }, () => ({ status: 200 })),
        ]).flat(),
      );
    });
  },
);

test("HTTP-serveren returnerer nøytral 500 ved feil i søket eller ask", async () => {
  const statuses: { status: number; body: unknown }[] = [];
  for (const service of [
    createRagService({
      search() {
        throw new Error("hemmelig søkefeil");
      },
    }),
    {
      generationEnabled: false,
      async ask() {
        throw new Error("hemmelig tjenestefeil");
      },
    },
  ]) {
    await withServer(async (url) => {
      const response = await post(url);
      statuses.push({ status: response.status, body: await response.json() });
    }, service);
  }
  assert.deepEqual(
    statuses,
    Array.from({ length: 2 }, () => ({
      status: 500,
      body: { error: "Tjenesten kunne ikke svare akkurat nå." },
    })),
  );
});

test("origin-konfigurasjon har dagens standarder og normaliserer bare eksplisitte origins", () => {
  assert.deepEqual(loadRagConfig({}).allowedOrigins, [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
  ]);
  assert.deepEqual(
    loadRagConfig({
      RAG_ALLOWED_ORIGINS:
        " https://PILOT.example.test:443/ ,http://127.0.0.1:3005,https://pilot.example.test ",
    }).allowedOrigins,
    ["https://pilot.example.test", "http://127.0.0.1:3005"],
  );
});

test("ugyldige origins stopper konfigurasjonen før oppstart, uansett modellvalg", () => {
  for (const value of [
    "",
    " ",
    "null",
    "*",
    "https://*.example.test",
    "localhost:3005",
    "ftp://example.test",
    "https://example.test/path",
    "https://example.test?x=1",
    "https://example.test#x",
    "https://user:secret@example.test",
    "https://example.test,",
    "https://example.test,,http://localhost:3005",
    "https://exam\nple.test",
    "https://example.test\\path",
    "https://example.test:99999",
  ]) {
    for (const provider of [
      {},
      { MODEL_PROVIDER: "ollama", OLLAMA_MODEL: "test" },
      {
        MODEL_PROVIDER: "openai-compatible",
        MODEL_API_URL: "https://model.example.test/chat",
        MODEL_NAME: "test",
        MODEL_API_KEY: "fake-key",
      },
    ]) {
      assert.throws(
        () => loadRagConfig({ ...provider, RAG_ALLOWED_ORIGINS: value }),
        (error: Error) => {
          assert.match(error.message, /Ugyldig RAG_ALLOWED_ORIGINS/);
          assert.ok(!error.message.includes("secret"));
          return true;
        },
      );
    }
  }
});

test("Content-Length over grensen avvises før klienten sender kroppen", async () => {
  await withServer(async (url) => {
    const response = await rawPost(url, {
      "Content-Length": String(2 * 1024 * 1024),
    });
    assert.equal(response.status, 413);
    assert.equal(response.connection, "close");
    assert.deepEqual(JSON.parse(response.body), {
      error: "Forespørselen er for stor.",
    });
    const next = await post(url);
    assert.equal(next.status, 200);
    await next.arrayBuffer();
  });
});

test("chunked kropp over grensen gir 413 og neste forespørsel lykkes", async () => {
  await withServer(async (url) => {
    const response = await rawPost(
      url,
      { "Transfer-Encoding": "chunked" },
      "x".repeat(2 * 1024 * 1024),
    );
    assert.equal(response.status, 413);
    assert.equal(response.connection, "close");
    assert.deepEqual(JSON.parse(response.body), {
      error: "Forespørselen er for stor.",
    });
    const next = await post(url);
    assert.equal(next.status, 200);
    await next.arrayBuffer();
  });
});

test("klientfeil beholder 400/415 og gyldig kropp på nøyaktig grensen godtas", async () => {
  await withServer(async (url) => {
    for (const [body, status] of [
      ["{", 400],
      ["{}", 400],
      [question.padEnd(8192, " "), 200],
    ] as const) {
      const response = await post(url, {}, body);
      assert.equal(response.status, status);
      await response.arrayBuffer();
    }
    const response = await post(url, { "Content-Type": "text/plain" });
    assert.equal(response.status, 415);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    await response.arrayBuffer();
  });
});

function rawPost(url: string, headers: Record<string, string>, body?: string) {
  return new Promise<{
    status: number | undefined;
    connection: string | undefined;
    body: string;
  }>((resolve, reject) => {
    const req = request(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        signal: AbortSignal.timeout(5000),
      },
      (res) => {
        let text = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          text += chunk;
        });
        res.once("error", reject);
        res.once("end", () => {
          resolve({
            status: res.statusCode,
            connection: res.headers.connection,
            body: text,
          });
          req.destroy();
        });
      },
    );
    req.on("error", reject);
    // Uten kropp sendes bare headers, for å prøve tidlig avvisning.
    if (body === undefined) req.flushHeaders();
    else req.end(body);
  });
}

test(
  "lukket klientforbindelse avbryter modelltransport og frigjør kapasitet",
  { timeout: 5000 },
  async () => {
    const { createOllamaAdapter } = await import("../src/server/rag/ollama.ts");
    let entered!: () => void, cancelled!: () => void;
    const started = new Promise<void>((resolve) => {
      entered = resolve;
    });
    const aborted = new Promise<void>((resolve) => {
      cancelled = resolve;
    });
    let calls = 0;
    const adapter = createOllamaAdapter(
      { model: "test", endpoint: new URL("http://localhost:11434") },
      async (_url, init) => {
        if (++calls !== 1)
          return Response.json({ message: { content: "  neste svar  " } });
        entered();
        return new Promise((_resolve, reject) => {
          init!.signal!.addEventListener(
            "abort",
            () => {
              cancelled();
              reject(init!.signal!.reason);
            },
            { once: true },
          );
        });
      },
    );
    await withServer(
      async (url) => {
        const controller = new AbortController();
        const first = fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: question,
          signal: controller.signal,
        });
        await started;
        controller.abort();
        await assert.rejects(first);
        await aborted;
        await new Promise((resolve) => setImmediate(resolve));
        const next = await post(url);
        assert.equal(next.status, 200);
        assert.equal((await next.json()).answer, "neste svar");
      },
      createRagService({ model: adapter }),
    );
  },
);
