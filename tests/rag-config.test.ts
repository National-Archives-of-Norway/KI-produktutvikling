import assert from "node:assert/strict";
import { test } from "node:test";
import { loadRagConfig } from "../src/server/rag/config.ts";

test("usatte RAG-variabler gir standarder, eksplisitt tomme verdier avvises likt", () => {
  const config = loadRagConfig({});
  assert.equal(config.port, 3001);
  assert.equal(config.maxConcurrent, 1);
  for (const key of ["RAG_PORT", "RAG_MAX_CONCURRENT", "RAG_ALLOWED_ORIGINS"]) {
    for (const value of ["", " \t "]) {
      assert.throws(
        () => loadRagConfig({ [key]: value }),
        new RegExp(key),
        `${key}=${JSON.stringify(value)}`,
      );
    }
  }
});

test("RAG_PORT fra miljøet må være 1–65535, ikke testport 0", () => {
  for (const value of ["0", "-1", "65536", "abc"])
    assert.throws(() => loadRagConfig({ RAG_PORT: value }), /RAG_PORT/, value);
  for (const port of [1, 3001, 65535])
    assert.equal(loadRagConfig({ RAG_PORT: String(port) }).port, port);
});

test("Ollama tillater bare eksakt Compose-tjeneste i tillegg til loopback", () => {
  const base = { MODEL_PROVIDER: "ollama", OLLAMA_MODEL: "qwen3:4b" };
  for (const OLLAMA_URL of ["http://ollama:11434", "http://ollama:11434/"])
    assert.equal(loadRagConfig({ ...base, OLLAMA_URL }).provider, "ollama");
  for (const OLLAMA_URL of [
    "http://ollama",
    "http://ollama:11435",
    "https://ollama:11434",
    "http://ollama.example:11434",
    "http://ollama.:11434",
    "http://host.docker.internal:11434",
    "http://10.0.0.2:11434",
    "http://ollama:11434/api/chat",
    "http://ollama:11434?key=x",
    "http://ollama:11434/#fragment",
    "http://user:pass@ollama:11434",
  ])
    assert.throws(() => loadRagConfig({ ...base, OLLAMA_URL }), /OLLAMA_URL/);
});

test("Ollama CPU-tråder er valgfrie, trimmes og avviser ugyldige verdier", () => {
  const base = { MODEL_PROVIDER: "ollama", OLLAMA_MODEL: "qwen3:4b" };
  const automatic = loadRagConfig(base);
  assert.equal(automatic.provider, "ollama");
  if (automatic.provider === "ollama")
    assert.equal(automatic.numThread, undefined);
  for (const value of ["1", " 4 ", "64"]) {
    const config = loadRagConfig({ ...base, OLLAMA_NUM_THREAD: value });
    assert.equal(config.provider, "ollama");
    if (config.provider === "ollama")
      assert.equal(config.numThread, Number(value));
  }
  for (const value of ["", " \t", "0", "-1", "1.5", "abc", "65", "Infinity"])
    assert.throws(
      () => loadRagConfig({ ...base, OLLAMA_NUM_THREAD: value }),
      /OLLAMA_NUM_THREAD/,
    );
});
