import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

// Denne appen inneholder foreløpig bare offentlig eksempelinnhold.
// Privat innhold skal aldri importeres av denne byggvarianten.
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  {
    stdio: "inherit",
    env: { ...process.env, BUILD_TARGET: "pages" },
  },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
writeFileSync("out/.nojekyll", "");
