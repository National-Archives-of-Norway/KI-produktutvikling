import { readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

export async function nodeTestFiles(directory) {
  return (await readdir(directory))
    .filter(
      (name) =>
        /\.test\.(?:ts|mjs)$/.test(name) && name !== "rag-blind.test.ts",
    )
    .sort()
    .map((name) => join(directory, name));
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const files = await nodeTestFiles(
    fileURLToPath(new URL("../tests/", import.meta.url)),
  );
  const result = spawnSync(process.execPath, ["--test", ...files], {
    stdio: "inherit",
  });
  if (result.error) console.error("Node-testene kunne ikke startes.");
  process.exitCode = result.status ?? 1;
}
