import assert from "node:assert/strict";
import { test } from "node:test";
import { spawn } from "node:child_process";
import { once } from "node:events";
import {
  access,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as pause } from "node:timers/promises";
import {
  searchTestArgs,
  searchTestFiles,
} from "../scripts/rag-search-tests.mjs";
import { copyContentSyncFixture } from "../scripts/lib/content-sync-fixture.mjs";

const repo = fileURLToPath(new URL("..", import.meta.url));
test("søketestkommandoen dekker språk, metadata, kjente spørsmål og Copilot uten blindsett", async () => {
  for (const file of searchTestFiles) {
    await access(join(repo, file));
    assert.ok(!file.includes("blind"));
  }
  assert.deepEqual(searchTestArgs(), ["--test", ...searchTestFiles]);
  assert.ok(searchTestArgs(true).includes("--watch"));
});

test(
  "søkevakt fanger innholdsendring og blir grønn igjen etter retting",
  { timeout: 25000 },
  async () => {
    const fixture = await mkdtemp(join(tmpdir(), "ki-search-watch-"));
    let child;
    let output = "";
    try {
      await copyContentSyncFixture(repo, fixture);
      await mkdir(join(fixture, "tests"));
      await cp(
        join(repo, "scripts/rag-search-tests.mjs"),
        join(fixture, "scripts/rag-search-tests.mjs"),
      );
      // En reell kilde gjennom retrieve(), men bare syntetiske feil i prosjektkopien.
      await writeFile(
        join(fixture, "tests/probe.test.ts"),
        `
      import {test} from 'node:test';
      import assert from 'node:assert/strict';
      import {retrieve} from '../src/features/rag/retrieval.ts';
      test('innholdet i Copilot-testkilden', () => {
        const first = retrieve('Må jeg kontrollere tester som Copilot lager?')[0];
        assert.equal(first?.id, 'github-copilot');
        assert.match(first.text, /Testene må alltid sjekkes manuelt/);
      });
    `,
      );
      child = spawn(
        process.execPath,
        [
          "--input-type=module",
          "--eval",
          `
      import {searchTestArgs} from './scripts/rag-search-tests.mjs';
      import {spawn} from 'node:child_process';
      const args = searchTestArgs(true, ['tests/probe.test.ts']);
      args.splice(1, 0, '--test-reporter=tap');
      const child = spawn(process.execPath, args, {stdio:'inherit'});
      process.on('SIGTERM', () => child.kill('SIGTERM'));
      child.on('exit', code => process.exitCode = code ?? 1);
    `,
        ],
        {
          cwd: fixture,
          env: { PATH: process.env.PATH, MODEL_PROVIDER: "none" },
          stdio: ["ignore", "pipe", "pipe"],
        },
      );
      child.stdout.on("data", (data) => (output += data));
      child.stderr.on("data", (data) => (output += data));
      child.on("error", (error) => (output += error.message));
      async function waitFor(failures, offset = 0) {
        const deadline = Date.now() + 7000;
        while (Date.now() < deadline) {
          const latest = output.slice(offset);
          if (
            latest.includes(`# fail ${failures}\n`) &&
            latest.includes("# duration_ms")
          )
            return;
          await pause(50);
        }
        assert.fail(
          `Søkevakt ga ikke forventet resultat (${failures} feil): ${output}`,
        );
      }
      await waitFor(0);
      const file = join(fixture, "src/content/pages/github-copilot.ts");
      const original = await readFile(file, "utf8");
      const changed = original.replace(
        "Testene må alltid sjekkes manuelt",
        "Syntetisk innholdsregresjon",
      );
      assert.notEqual(original, changed);
      let offset = output.length;
      await writeFile(file, changed);
      await waitFor(1, offset);
      offset = output.length;
      await writeFile(file, original);
      await waitFor(0, offset);
    } finally {
      if (child && child.exitCode === null) {
        const closed = once(child, "close");
        child.kill("SIGTERM");
        await closed;
      }
      await rm(fixture, { recursive: true, force: true });
    }
  },
);
