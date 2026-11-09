import { test } from "node:test";
import assert from "node:assert/strict";
import { loadRagConfig } from "../src/server/rag/config.ts";
import { createConfiguredModel } from "../src/server/rag/provider.ts";
import { createRagService } from "../src/server/rag/service.ts";
import { handleRagRequest } from "../src/server/rag/http.ts";
import { corpus } from "../src/features/rag/retrieval.ts";

// Deliberately fake credentials; tests never make external requests.
const environment = {
  MODEL_PROVIDER: "openai-compatible",
  MODEL_API_URL: "https://model.example.test/gateway/v1/chat/completions",
  MODEL_NAME: "test-model",
  MODEL_API_KEY: "fake-test-key-only",
};

test("modellvalg er eksplisitt, med støtte for eksisterende Ollama-oppsett", () => {
  assert.equal(loadRagConfig({}).provider, "none");
  assert.equal(loadRagConfig({ OLLAMA_MODEL: "test" }).provider, "ollama");
  assert.equal(
    loadRagConfig({ MODEL_PROVIDER: "none", OLLAMA_MODEL: "test" }).provider,
    "none",
  );
  assert.equal(createConfiguredModel(loadRagConfig({})), undefined);
  assert.throws(() => loadRagConfig({ MODEL_PROVIDER: "ukjent" }));
  assert.throws(() => loadRagConfig({ MODEL_PROVIDER: "ollama" }));
});

test("eksternt API krever komplett oppsett uten å røpe verdiene i feil", () => {
  for (const field of ["MODEL_API_URL", "MODEL_NAME", "MODEL_API_KEY"]) {
    assert.throws(
      () => loadRagConfig({ ...environment, [field]: " " }),
      /krever MODEL_API_URL/,
    );
  }
  for (const url of [
    "not-a-url",
    "http://model.example.test/chat",
    "https://user:secret@model.example.test/chat",
    "https://model.example.test/chat?key=secret",
    "https://model.example.test/chat#secret",
  ]) {
    assert.throws(
      () => loadRagConfig({ ...environment, MODEL_API_URL: url }),
      (error: Error) => {
        assert.ok(!error.message.includes("secret"));
        assert.ok(!error.message.includes(url));
        return true;
      },
    );
  }
  assert.throws(() =>
    loadRagConfig({ ...environment, MODEL_API_KEY: "key\r\nInjected: header" }),
  );
});

test("adapteren bruker nøyaktig endepunkt, Bearer-header og nummererte kilder", async () => {
  const model = createConfiguredModel(
    loadRagConfig(environment),
    async (url, init) => {
      assert.equal(String(url), environment.MODEL_API_URL);
      assert.equal(init?.method, "POST");
      assert.equal(init?.redirect, "error");
      assert.ok(init?.signal instanceof AbortSignal);
      const headers = new Headers(init?.headers);
      assert.equal(
        headers.get("Authorization"),
        `Bearer ${environment.MODEL_API_KEY}`,
      );
      const body = JSON.parse(String(init?.body));
      assert.equal(body.model, environment.MODEL_NAME);
      assert.equal(body.stream, false);
      assert.equal(body.messages[0].role, "system");
      const input = JSON.parse(body.messages[1].content);
      assert.equal(input.question, "Hva kan jeg gjøre?");
      assert.deepEqual(
        input.sources.map((source: { number: number }) => source.number),
        corpus.map((_, i) => i + 1),
      );
      assert.ok(!String(init?.body).includes(environment.MODEL_API_KEY));
      return Response.json({
        choices: [{ message: { content: "  Et svar [1]  " } }],
      });
    },
  )!;
  assert.equal(
    await model.generate("Hva kan jeg gjøre?", corpus),
    "Et svar [1]",
  );
});

test("HTTP-feil, ugyldige svar, nettverksfeil og timeout får nøytral feil", async () => {
  for (const fetcher of [
    async () => new Response(environment.MODEL_API_KEY, { status: 401 }),
    async () => new Response("rate limit", { status: 429 }),
    async () => new Response("<html>feil</html>"),
    async () => Response.json({ choices: [] }),
    async () => Response.json({ choices: [{ message: { content: " " } }] }),
    async () =>
      Response.json({
        choices: [{ message: { content: [{ text: "unexpected" }] } }],
      }),
    async () => {
      throw new Error(`transport: ${environment.MODEL_API_KEY}`);
    },
    async () => {
      throw new DOMException("Timed out", "TimeoutError");
    },
  ]) {
    const model = createConfiguredModel(loadRagConfig(environment), fetcher)!;
    await assert.rejects(() => model.generate("tester", corpus), {
      message: "model_error",
    });
  }
});

test("nettleseren får svar og kilder, aldri nøkkel, URL eller rå leverandørfeil", async () => {
  for (const status of [200, 401]) {
    const model = createConfiguredModel(loadRagConfig(environment), async () =>
      status === 200
        ? Response.json({
            choices: [{ message: { content: "Svar med kilde [1]" } }],
          })
        : new Response(environment.MODEL_API_KEY, { status }),
    )!;
    const service = createRagService({ model });
    const response = await handleRagRequest(
      new Request("http://localhost/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: "kodeendring tester",
          MODEL_API_URL: "https://attacker.test",
          MODEL_API_KEY: "ignored",
        }),
      }),
      service,
    );
    assert.equal(response.status, status === 200 ? 200 : 502);
    const text = await response.text();
    assert.ok(!text.includes(environment.MODEL_API_KEY));
    assert.ok(!text.includes(environment.MODEL_API_URL));
    const result = JSON.parse(text);
    assert.ok(result.sources.length);
    assert.ok(status === 200 ? result.mode === "generated" : result.error);
    const health = await handleRagRequest(
      new Request("http://localhost/health"),
      service,
    );
    assert.deepEqual(await health.json(), {
      status: "ok",
      generationEnabled: true,
    });
  }
});
