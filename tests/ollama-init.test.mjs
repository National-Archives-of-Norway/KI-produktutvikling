import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

for (const { title, present, force, pulls } of [
  {
    title: "gjenbruker modell uten ny nedlasting",
    present: true,
    force: false,
    pulls: 0,
  },
  {
    title: "laster ned modell når volumet er tomt",
    present: false,
    force: false,
    pulls: 1,
  },
  {
    title: "oppdaterer bare etter eksplisitt valg",
    present: true,
    force: true,
    pulls: 1,
  },
]) {
  test(`modell-init ${title}`, () => {
    const dir = mkdtempSync(join(tmpdir(), "ki-model-init-"));
    try {
      writeFileSync(
        join(dir, "ollama"),
        `#!/bin/sh
case "$1" in
  serve) exec sleep 60 ;;
  list) exit 0 ;;
  show) test -f "$MODEL_FILE" ;;
  pull) echo pull >> "$CALLS_FILE"; touch "$MODEL_FILE" ;;
  *) exit 1 ;;
esac
`,
        { mode: 0o700 },
      );
      const model = join(dir, "model");
      const calls = join(dir, "calls");
      writeFileSync(calls, "");
      if (present) writeFileSync(model, "fixture");
      const result = spawnSync(
        "sh",
        [fileURLToPath(new URL("../scripts/ollama-pull.sh", import.meta.url))],
        {
          env: {
            PATH: `${dir}:${process.env.PATH}`,
            MODEL_FILE: model,
            CALLS_FILE: calls,
            OLLAMA_FORCE_PULL: force ? "1" : "0",
          },
          encoding: "utf8",
          timeout: 5000,
        },
      );
      assert.equal(result.status, 0, result.stderr);
      assert.equal(
        readFileSync(calls, "utf8").trim().split("\n").filter(Boolean).length,
        pulls,
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
