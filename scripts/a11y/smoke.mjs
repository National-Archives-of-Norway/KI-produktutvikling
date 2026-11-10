/** Real-engine negative test; deliberate fixture errors are not portal findings. */
import { createRequire } from "node:module";
import { mkdtemp, writeFile, readFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname, relative } from "node:path";
import { randomUUID } from "node:crypto";
import {
  root,
  serveExport,
  execute,
  chromePath,
  validateAxe,
  validateVnu,
} from "./native.mjs";
const require = createRequire(import.meta.url);
const directory = await mkdtemp(join(tmpdir(), "portal-a11y-fixture-"));
const output = join(
  root,
  "docs/tilgjengelighet",
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Oslo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()),
  "tools-smoke-" + randomUUID().slice(0, 8),
);
await mkdir(output, { recursive: true });
const html =
  '<!doctype html><html lang="nb"><head><meta charset="utf-8"><title>Kun verktøytest</title></head><body><main><h1>Kun syntetiske testdata</h1><img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22%3E%3C/svg%3E"></main></body></html>';
await writeFile(join(directory, "index.html"), html);
await writeFile(join(output, "fixture.html"), html);
let server;
const result = {
  fixture: true,
  scope: "Deliberately invalid synthetic HTML, not the portal",
  tested_at: new Date().toISOString(),
  status: "error",
};
try {
  const served = await serveExport(directory);
  server = served.server;
  const url = served.baseUrl + "/";
  const cli = join(
    dirname(require.resolve("@axe-core/cli/package.json")),
    "dist/src/bin/cli.js",
  );
  const axeRequire = createRequire(
    require.resolve("@axe-core/cli/package.json"),
  );
  const axe = await execute(
    process.execPath,
    [
      cli,
      url,
      "--save",
      "axe.json",
      "--dir",
      output,
      "--no-reporter",
      "--exit",
      "--chrome-path",
      await chromePath(),
      "--chromedriver-path",
      require("chromedriver").path,
      "--axe-source",
      axeRequire.resolve("axe-core/axe.js"),
    ],
    join(output, "axe"),
  );
  const axeResults = validateAxe(
    JSON.parse(await readFile(join(output, "axe.json"), "utf8")),
    [url],
  );
  if (
    axe.code !== 1 ||
    !axeResults[0].violations.some((v) => v.id === "image-alt")
  )
    throw Error("Axe failed to detect the deliberate missing alt attribute.");
  const vnu = await execute(
    process.execPath,
    [
      require.resolve("vnu-jar"),
      "--format",
      "json",
      join(directory, "index.html"),
    ],
    join(output, "vnu"),
  );
  const validator = validateVnu(vnu.stderr || vnu.stdout, vnu.code);
  if (
    vnu.code !== 1 ||
    !validator.messages.some(
      (m) => m.type === "error" && m.message.includes("alt"),
    )
  )
    throw Error("Nu failed to detect the deliberate missing alt attribute.");
  result.status = "passed";
  result.axe_image_alt_detected = true;
  result.vnu_missing_alt_detected = true;
} catch (error) {
  result.error = String(error);
  process.exitCode = 2;
} finally {
  if (server) await new Promise((ok) => server.close(ok));
  await rm(directory, { recursive: true, force: true });
  await writeFile(
    join(output, "smoke-result.json"),
    JSON.stringify(result, null, 2) + "\n",
  );
}
console.log(JSON.stringify({ ...result, output: relative(root, output) }));
