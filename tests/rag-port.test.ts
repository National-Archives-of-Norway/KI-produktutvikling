import assert from "node:assert/strict";
import { test } from "node:test";
import { loadRagConfig } from "../src/server/rag/config.ts";

let configRead = 0;
async function nextPort(value: string | undefined) {
  const previous = process.env.RAG_PORT;
  const target = process.env.BUILD_TARGET;
  try {
    if (value === undefined) delete process.env.RAG_PORT;
    else process.env.RAG_PORT = value;
    delete process.env.BUILD_TARGET;
    const { default: config } = await import(
      `../next.config.ts?port-test=${++configRead}`
    );
    const routes = await config.rewrites();
    return new URL(routes[0].destination).port || "80";
  } finally {
    if (previous === undefined) delete process.env.RAG_PORT;
    else process.env.RAG_PORT = previous;
    if (target === undefined) delete process.env.BUILD_TARGET;
    else process.env.BUILD_TARGET = target;
  }
}
for (const value of [
  undefined,
  "3002",
  " 3002",
  "3002 \t",
  "1",
  "65535",
  "",
  " \t ",
  "0",
  "-1",
  "65536",
  "NaN",
  "3002/sti",
]) {
  test(`Next og RAG tolker samme port likt: ${JSON.stringify(value)}`, async () => {
    let port: number;
    try {
      port = loadRagConfig({ RAG_PORT: value }).port;
    } catch (error) {
      await assert.rejects(() => nextPort(value), {
        message: (error as Error).message,
      });
      return;
    }
    assert.equal(await nextPort(value), String(port));
  });
}
