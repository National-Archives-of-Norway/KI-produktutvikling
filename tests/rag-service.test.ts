import { test } from "node:test";
import assert from "node:assert/strict";
import { createRagService } from "../src/server/rag/service.ts";
import { createOllamaAdapter } from "../src/server/rag/ollama.ts";
import { loadRagConfig } from "../src/server/rag/config.ts";
import { handleRagRequest, MAX_BODY } from "../src/server/rag/http.ts";
import { corpus } from "../src/features/rag/retrieval.ts";
import { isResult } from "../src/features/rag/contracts.ts";

test("uten modell gir tjenesten kildeutdrag i delt API-format", async () => {
  const response = await createRagService().ask("kodeendring tester");
  assert.equal(response.status, 200);
  assert.ok(isResult(response.body));
  assert.equal(response.body.mode, "sources");
});
test("spørsmål uten kilder utløser aldri generering", async () => {
  const service = createRagService({
    model: {
      generate: async () => {
        throw new Error("skal ikke kalles");
      },
    },
  });
  const response = await service.ask("bananer værmelding");
  assert.equal(response.status, 200);
  assert.ok("reason" in response.body && response.body.reason === "no_sources");
});
test("samtidighet avvises og modellen frigjøres etter feil", async () => {
  let reject!: (error: Error) => void;
  const service = createRagService({
    model: {
      generate: () =>
        new Promise<string>((_, no) => {
          reject = no;
        }),
    },
  });
  const first = service.ask("kodeendring tester");
  assert.equal((await service.ask("kodeendring tester")).status, 429);
  reject(new Error("modellen feilet"));
  const failed = await first;
  assert.equal(failed.status, 502);
  assert.ok("sources" in failed.body && failed.body.sources?.length);
  const next = service.ask("kodeendring tester");
  reject(new Error("ny feil"));
  assert.equal((await next).status, 502);
});
test("Ollama-adapteren sender nummererte kilder og blokkerer videresending", async () => {
  const adapter = createOllamaAdapter(
    { model: "test-model", endpoint: new URL("http://127.0.0.1:11434") },
    async (url, init) => {
      assert.equal(String(url), "http://127.0.0.1:11434/api/chat");
      assert.equal(init?.redirect, "error");
      const payload = JSON.parse(String(init?.body));
      assert.equal(payload.model, "test-model");
      assert.equal(payload.think, false);
      assert.equal(payload.stream, false);
      assert.equal(payload.options.num_ctx, 8192);
      assert.equal("num_thread" in payload.options, false);
      assert.equal(
        JSON.parse(payload.messages[1].content).sources[0].number,
        1,
      );
      return Response.json({ message: { content: "Svar [1]" } });
    },
  );
  assert.equal(await adapter.generate("tester", corpus), "Svar [1]");
});
test("Ollama-adapteren avviser tomt svar og HTTP-feil", async () => {
  for (const fetcher of [
    async () => Response.json({ message: { content: " " } }),
    async () => new Response(null, { status: 503 }),
  ]) {
    await assert.rejects(() =>
      createOllamaAdapter(
        { model: "test", endpoint: new URL("http://localhost:11434") },
        fetcher,
      ).generate("tester", corpus),
    );
  }
});
test("konfigurasjon avviser ekstern modelladresse og credentials", () => {
  for (const OLLAMA_URL of [
    "https://example.com",
    "http://user:pass@localhost:11434",
    "http://192.168.1.1:11434",
  ])
    assert.throws(() =>
      loadRagConfig({
        MODEL_PROVIDER: "ollama",
        OLLAMA_MODEL: "test",
        OLLAMA_URL,
      }),
    );
  assert.throws(() => loadRagConfig({ RAG_PORT: "NaN" }));
});
test("HTTP-grensen håndterer kontrakt, ugyldig JSON, størrelse og origin", async () => {
  const service = createRagService();
  const request = (
    body: string,
    headers: Record<string, string> = { "Content-Type": "application/json" },
  ) =>
    new Request("http://localhost/api/rag", { method: "POST", headers, body });
  const ok = await handleRagRequest(
    request(JSON.stringify({ question: "tester kodeendring" })),
    service,
  );
  assert.equal(ok.status, 200);
  assert.ok(isResult(await ok.json()));
  assert.equal(ok.headers.get("cache-control"), "no-store");
  assert.equal((await handleRagRequest(request("{"), service)).status, 400);
  assert.equal(
    (
      await handleRagRequest(
        request('"' + "x".repeat(MAX_BODY + 1) + '"'),
        service,
      )
    ).status,
    413,
  );
  assert.equal(
    (
      await handleRagRequest(
        request("{}", { "Content-Type": "text/plain" }),
        service,
      )
    ).status,
    415,
  );
  assert.equal(
    (
      await handleRagRequest(
        request("{}", {
          "Content-Type": "application/json",
          Origin: "https://example.com",
        }),
        service,
      )
    ).status,
    403,
  );
});

test("Ollama avviser avkuttet svar i stedet for å vise halvferdig tekst", async () => {
  await assert.rejects(() =>
    createOllamaAdapter(
      { model: "qwen3:4b", endpoint: new URL("http://ollama:11434") },
      async () =>
        Response.json({
          message: { content: "Uferdig tekst" },
          done_reason: "length",
        }),
    ).generate("tester", corpus),
  );
});

test("Qwen3 får strukturert svar uten å endre kilde-JSON", async () => {
  const adapter = createOllamaAdapter(
    { model: "qwen3:4b", endpoint: new URL("http://ollama:11434") },
    async (_url, init) => {
      const payload = JSON.parse(String(init?.body));
      assert.equal(payload.format.type, "object");
      assert.deepEqual(payload.format.required, ["answer"]);
      assert.equal(payload.format.additionalProperties, false);
      assert.match(payload.messages[0].content, /bare JSON med feltet answer/);
      assert.match(
        payload.messages[0].content,
        /alltid med minst én henvisning/,
      );
      assert.equal(JSON.parse(payload.messages[1].content).question, "tester");
      return Response.json({
        message: { content: JSON.stringify({ answer: "Svar [1]" }) },
        done_reason: "stop",
      });
    },
  );
  assert.equal(await adapter.generate("tester", corpus), "Svar [1]");
});

test("Qwen3 avviser ugyldige strukturerte svar", async () => {
  for (const content of [
    "ikke JSON",
    "null",
    "[]",
    "{}",
    '{"answer":7}',
    '{"answer":" "}',
    '{"answer":"svar","analysis":"skal ikke vises"}',
  ])
    await assert.rejects(() =>
      createOllamaAdapter(
        { model: "qwen3:4b", endpoint: new URL("http://ollama:11434") },
        async () => Response.json({ message: { content } }),
      ).generate("tester", corpus),
    );
});

test("serverens Ollama-trådvalg sendes til modelltransporten", async () => {
  const { createConfiguredModel } =
    await import("../src/server/rag/provider.ts");
  const model = createConfiguredModel(
    loadRagConfig({
      MODEL_PROVIDER: "ollama",
      OLLAMA_MODEL: "qwen3:4b",
      OLLAMA_URL: "http://ollama:11434",
      OLLAMA_NUM_THREAD: "4",
    }),
    async (_url, init) => {
      const payload = JSON.parse(String(init?.body));
      assert.equal(payload.options.num_thread, 4);
      assert.equal(payload.options.num_ctx, 8192);
      assert.equal(payload.options.num_predict, 700);
      return Response.json({
        message: { content: JSON.stringify({ answer: "Svar [1]" }) },
        done_reason: "stop",
      });
    },
  );
  assert.equal(await model!.generate("tester", corpus), "Svar [1]");
});
