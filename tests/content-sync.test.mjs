import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { access, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { setTimeout as pause } from "node:timers/promises";
import { test } from "node:test";
import { copyContentSyncFixture } from "../scripts/lib/content-sync-fixture.mjs";

const repo = fileURLToPath(new URL("..", import.meta.url));
test(
  "innholdssynkens prosjektkopi starter RAG uten watch og svarer på health",
  { timeout: 10000 },
  async () => {
    const fixture = await mkdtemp(join(tmpdir(), "ki-content-start-"));
    let child;
    let output = "";
    try {
      await copyContentSyncFixture(repo, fixture);
      await assert.rejects(access(join(fixture, "src/app")), {
        code: "ENOENT",
      });
      const entry = pathToFileURL(join(fixture, "scripts/rag-server.mjs")).href;
      child = spawn(
        process.execPath,
        [
          "--input-type=module",
          "--eval",
          `
      import { startRagServer } from ${JSON.stringify(entry)};
      const { loadRagConfig } = await import(new URL("../src/server/rag/config.ts", ${JSON.stringify(entry)}));
      const server = startRagServer({ ...loadRagConfig(), port: 0 });
      server.on("listening", () => console.log("HEALTH_PORT=" + server.address().port));
    `,
        ],
        {
          cwd: fixture,
          // Ingen modell, nettverkskilder eller arvede serverinnstillinger/secrets.
          env: {
            PATH: process.env.PATH,
            MODEL_PROVIDER: "none",
          },
          stdio: ["ignore", "pipe", "pipe"],
        },
      );
      let spawnError;
      child.on("error", (error) => {
        spawnError = error;
      });
      child.stdout.on("data", (data) => {
        output += data;
      });
      child.stderr.on("data", (data) => {
        output += data;
      });
      const deadline = Date.now() + 5000;
      let port;
      while (Date.now() < deadline) {
        if (spawnError) throw spawnError;
        const match = /HEALTH_PORT=(\d+)/.exec(output);
        if (match) {
          port = Number(match[1]);
          break;
        }
        assert.equal(
          child.exitCode,
          null,
          "RAG-kopien feilet ved oppstart:\n" + output,
        );
        await pause(25);
      }
      assert.ok(port, "Ingen oppstart fra RAG-kopien:\n" + output);
      const response = await fetch(`http://127.0.0.1:${port}/health`, {
        signal: AbortSignal.timeout(1000),
      });
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), {
        status: "ok",
        generationEnabled: false,
      });
    } finally {
      if (child && child.exitCode === null && child.signalCode === null) {
        const exited = once(child, "exit");
        child.kill("SIGTERM");
        await exited;
      }
      await rm(fixture, { recursive: true, force: true });
    }
  },
);
