import { test } from "node:test";
import assert from "node:assert/strict";
import { createRagService } from "../src/server/rag/service.ts";
import { createOllamaAdapter } from "../src/server/rag/ollama.ts";
import { loadRagConfig } from "../src/server/rag/config.ts";
import { requestAnswer } from "../src/features/rag/client.ts";
import { corpus } from "../src/features/rag/retrieval.ts";

const question = "kodeendring tester";

test("avbrutt modellforespørsel sender signal og frigjør kapasitet", async () => {
  let observed: AbortSignal | undefined;
  let finish!: (value: string) => void;
  let calls = 0;
  const service = createRagService({
    model: {
      generate: (_q, _sources, signal) => {
        if (calls === 0) observed = signal;
        return ++calls === 1
          ? new Promise<string>((resolve) => {
              finish = resolve;
            })
          : Promise.resolve("neste svar");
      },
    },
  });
  const controller = new AbortController();
  const first = service.ask(question, controller.signal);
  controller.abort();
  await new Promise((resolve) => setImmediate(resolve));
  const second = await service.ask(question);
  finish("sent svar");
  await first;
  assert.ok(observed?.aborted);
  assert.equal(second.status, 200);
});

test("konfigurert kapasitet tillater to brukere og avviser den tredje med kilder", async () => {
  const releases: ((value: string) => void)[] = [];
  const service = createRagService({
    maxConcurrent: 2,
    model: {
      generate: () => new Promise<string>((resolve) => releases.push(resolve)),
    },
  });
  const first = service.ask(question),
    second = service.ask(question);
  const third = await service.ask(question);
  const count = releases.length;
  releases.forEach((release) => release("svar"));
  const results = await Promise.all([first, second]);
  assert.equal(count, 2);
  assert.ok(results.every((result) => result.status === 200));
  assert.equal(third.status, 429);
  assert.ok("sources" in third.body && third.body.sources?.length);
});

test("ren tekst fra proxy gir forståelig formatfeil uten å vise råsvaret", async () => {
  const outcome = await requestAnswer(question, {
    demo: false,
    fetcher: async () =>
      new Response("Internal Server Error secret", { status: 500 }),
  });
  assert.match(outcome.error!, /JSON|svarformat/);
  assert.doesNotMatch(outcome.error!, /secret|Internal Server Error/);
});

test("Ollama avviser sti eksplisitt i konfigurasjonen", () => {
  assert.throws(
    () =>
      loadRagConfig({
        MODEL_PROVIDER: "ollama",
        OLLAMA_MODEL: "test",
        OLLAMA_URL: "http://localhost:11434/prefix",
      }),
    /OLLAMA_URL|sti/,
  );
});

test("Ollama trimmer modellsvaret", async () => {
  const adapter = createOllamaAdapter(
    { model: "test", endpoint: new URL("http://localhost:11434") },
    async () => Response.json({ message: { content: "  svar  " } }),
  );
  assert.equal(await adapter.generate(question, corpus), "svar");
});

test("modellens tidsgrense gir 502 med kilder for begge adaptere", async () => {
  const { createExternalAdapter } =
    await import("../src/server/rag/external.ts");
  for (const provider of ["ollama", "external"]) {
    let aborted = false;
    const fetcher: typeof fetch = async (_url, init) =>
      new Promise((resolve, reject) => {
        const timer = setTimeout(() => resolve(Response.json({})), 1000);
        const onAbort = () => {
          aborted = true;
          clearTimeout(timer);
          reject(init!.signal!.reason);
        };
        init!.signal!.addEventListener("abort", onAbort, { once: true });
      });
    const adapter =
      provider === "ollama"
        ? createOllamaAdapter(
            {
              model: "test",
              endpoint: new URL("http://localhost:11434"),
              timeoutMs: 20,
            },
            fetcher,
          )
        : createExternalAdapter(
            {
              model: "test",
              endpoint: new URL("https://model.example.test"),
              apiKey: "fake-only",
              timeoutMs: 20,
            },
            fetcher,
          );
    const result = await createRagService({ model: adapter }).ask(question);
    assert.equal(result.status, 502);
    assert.ok("sources" in result.body && result.body.sources?.length);
    assert.ok(aborted);
    assert.doesNotMatch(
      JSON.stringify(result.body),
      /TimeoutError|fake-only|model.example/,
    );
  }
});

test("tjenestens tidsgrense frigjør kapasitet også om en adapter ignorerer signalet", async () => {
  let finish!: (value: string) => void;
  const keepAlive = setTimeout(() => {}, 2000);
  try {
    let calls = 0;
    const service = createRagService({
      modelTimeoutMs: 20,
      model: {
        generate: () =>
          ++calls === 1
            ? new Promise((resolve) => {
                finish = resolve;
              })
            : Promise.resolve("neste"),
      },
    });
    const first = await service.ask(question);
    assert.equal(first.status, 502);
    assert.equal((await service.ask(question)).status, 200);
    finish("sent");
  } finally {
    clearTimeout(keepAlive);
  }
});

test("klienten bevarer validerte kilder også ved uventet JSON-svarformat", async () => {
  const result = await requestAnswer(question, {
    demo: false,
    fetcher: async () => Response.json({ mode: "ukjent", sources: corpus }),
  });
  assert.match(result.error!, /svarformat/);
  assert.equal(result.result?.mode, "sources");
  assert.deepEqual(result.result?.sources, corpus);
});

test("forhåndsavbrutt signal starter ikke modellen og bruker ikke kapasitet", async () => {
  let calls = 0;
  const service = createRagService({
    model: {
      generate: async () => {
        calls++;
        return "svar";
      },
    },
  });
  await service.ask(question, AbortSignal.abort());
  assert.equal(calls, 0);
  assert.equal((await service.ask(question)).status, 200);
});

test("tidskjeden er felles, og ugyldig samtidighetsgrense avvises ved oppstart", async () => {
  const { RAG_TIMEOUTS } = await import("../src/server/rag/config.ts");
  assert.ok(
    RAG_TIMEOUTS.modelMs < RAG_TIMEOUTS.proxyMs &&
      RAG_TIMEOUTS.proxyMs < RAG_TIMEOUTS.clientMs,
  );
  assert.equal(loadRagConfig({}).maxConcurrent, 1);
  assert.equal(loadRagConfig({ RAG_MAX_CONCURRENT: "2" }).maxConcurrent, 2);
  for (const value of ["", "0", "9", "1.5", "abc"])
    assert.throws(
      () => loadRagConfig({ RAG_MAX_CONCURRENT: value }),
      /RAG_MAX_CONCURRENT/,
    );
});
