/** Local axe CLI + Nu Html Checker. Only serves the built export on loopback. */
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import {
  access,
  mkdir,
  readFile,
  realpath,
  stat,
  writeFile,
} from "node:fs/promises";
import { join, resolve, relative, extname, dirname } from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { getFeatures } from "../../src/content/features.ts";
import { resources } from "../../src/content/resources.ts";

const require = createRequire(import.meta.url);
export const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};
export function within(parent, child) {
  const r = relative(parent, child);
  return (
    r !== "" &&
    !r.startsWith("..") &&
    !r.startsWith("/") &&
    !/^[A-Za-z]:/.test(r)
  );
}
export function routes() {
  return [
    ...new Set(
      getFeatures()
        .flatMap((f) => f.routes || [])
        .flatMap((r) =>
          r.includes("[slug]")
            ? resources.map((s) => r.replace("[slug]", s.slug))
            : r,
        )
        .concat("/404/"),
    ),
  ];
}
export function validateAxe(data, expectedUrls) {
  if (!Array.isArray(data) || data.length !== expectedUrls.length)
    throw Error("Axe result count does not match requested pages.");
  const urls = new Set();
  for (const result of data) {
    if (
      result?.testEngine?.name !== "axe-core" ||
      !result.testEngine.version ||
      !result.timestamp ||
      !expectedUrls.includes(result.url) ||
      urls.has(result.url) ||
      ["violations", "incomplete", "passes", "inapplicable"].some(
        (k) => !Array.isArray(result[k]),
      )
    )
      throw Error("Invalid, duplicate or missing original axe result.");
    if (
      result.passes.length +
        result.violations.length +
        result.inapplicable.length ===
      0
    )
      throw Error("Axe did not report any executed rules.");
    urls.add(result.url);
  }
  return data;
}
export function validateVnu(text, exitCode) {
  const data = JSON.parse(text);
  if (!Array.isArray(data.messages) || ![0, 1].includes(exitCode))
    throw Error("Invalid vnu response/exit code.");
  if (exitCode === 0 && data.messages.some((m) => m.type === "error"))
    throw Error("Validator success contradicts error messages.");
  if (exitCode === 1 && !data.messages.some((m) => m.type === "error"))
    throw Error("Validator failed without HTML error messages.");
  if (data.messages.some((m) => m.type === "non-document-error"))
    throw Error("Validator could not read/validate the document.");
  return data;
}
export async function serveExport(exportRoot) {
  const base = await realpath(exportRoot);
  const server = createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let target = resolve(base, "." + path);
      if (target !== base && !within(base, target)) {
        res.writeHead(403).end();
        return;
      }
      let code = 200;
      try {
        if ((await stat(target)).isDirectory())
          target = join(target, "index.html");
        await access(target);
      } catch {
        target = join(base, "404.html");
        code = 404;
      }
      target = await realpath(target);
      if (!within(base, target)) {
        res.writeHead(403).end();
        return;
      }
      const contents = await readFile(target);
      res
        .writeHead(code, {
          "Content-Type": mime[extname(target)] || "application/octet-stream",
          "Cache-Control": "no-store",
        })
        .end(contents);
    } catch {
      res.writeHead(400).end();
    }
  });
  await new Promise((ok, fail) => {
    server.once("error", fail);
    server.listen(0, "127.0.0.1", ok);
  });
  return { server, baseUrl: `http://127.0.0.1:${server.address().port}` };
}
// The requested scan must remain local even if a shell has remote Selenium settings.
export function toolEnvironment(source = process.env) {
  return {
    ...source,
    CHROME_TEST_PATH: "",
    CHROMEDRIVER_TEST_PATH: "",
    SELENIUM_REMOTE_URL: "",
    SELENIUM_SERVER_JAR: "",
    SELENIUM_BROWSER: "",
  };
}

export async function execute(
  command,
  args,
  prefix,
  cwd = root,
  timeout = 240000,
) {
  let stdout = "",
    stderr = "";
  let timedOut = false;
  const child = spawn(command, args, {
    cwd,
    env: toolEnvironment(),
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
  });
  child.stdout.on("data", (chunk) => {
    stdout += chunk;
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk;
  });
  const timer = setTimeout(() => {
    timedOut = true;
    child.kill("SIGTERM");
  }, timeout);
  let result;
  try {
    result = await new Promise((ok, fail) => {
      child.once("error", fail);
      child.once("close", (code, signal) => ok({ code, signal }));
    });
  } finally {
    clearTimeout(timer);
  }
  await writeFile(prefix + ".stdout.txt", stdout);
  await writeFile(prefix + ".stderr.txt", stderr);
  if (timedOut || result.code === null)
    throw Error(`Tool failed or timed out: ${command}`);
  return { ...result, stdout, stderr, command, args };
}
export async function chromePath() {
  const choices = [
    process.env.A11Y_CHROME_PATH,
    ...(process.platform === "darwin"
      ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
      : process.platform === "win32"
        ? [
            join(
              process.env.PROGRAMFILES || "C:/Program Files",
              "Google/Chrome/Application/chrome.exe",
            ),
          ]
        : [
            "/usr/bin/google-chrome",
            "/usr/bin/chromium",
            "/usr/bin/chromium-browser",
          ]),
  ].filter(Boolean);
  for (const path of choices) {
    try {
      await access(path);
      return path;
    } catch {}
  }
  throw Error(
    "Chrome is missing. Set A11Y_CHROME_PATH to an installed Chrome/Chromium executable.",
  );
}
async function main() {
  const args = process.argv.slice(2);
  if (
    args.some((v, i) => i % 2 === 0 && v !== "--output-dir") ||
    args.length % 2
  )
    throw Error(
      "Usage: node scripts/a11y/native.mjs [--output-dir project-relative-directory]",
    );
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Oslo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .split(" ");
  const output = resolve(
    root,
    args[1] ||
      `docs/tilgjengelighet/${parts[0]}/${parts[1].replaceAll(":", "")}-native-${randomUUID().slice(0, 8)}`,
  );
  if (!within(root, output))
    throw Error("Output must be a new directory inside this project.");
  await mkdir(dirname(output), { recursive: true });
  await mkdir(output);
  await mkdir(join(output, "raw"));
  const summary = {
    schema_version: 1,
    versions: {
      node: process.version,
      axe_cli: require("@axe-core/cli/package.json").version,
      chromedriver_package: require("chromedriver/package.json").version,
      vnu_package: require("vnu-jar/package.json").version,
    },
    started_at: new Date().toISOString(),
    overall_conformance: "not_assessed",
    environment:
      "Local static export, default headless Chrome viewport; original axe testEnvironment is retained.",
    output: relative(root, output),
    checks: [],
    status: "error",
  };
  let server;
  try {
    const exported = join(root, "out");
    await access(join(exported, "index.html"));
    const served = await serveExport(exported);
    server = served.server;
    const targetRoutes = routes();
    const urls = targetRoutes.map((r) => served.baseUrl + r);
    try {
      const cli = join(
        dirname(require.resolve("@axe-core/cli/package.json")),
        "dist/src/bin/cli.js",
      );
      const axeRequire = createRequire(
        require.resolve("@axe-core/cli/package.json"),
      );
      const axeSource = axeRequire.resolve("axe-core/axe.js");
      const driver = require("chromedriver").path;
      const chrome = await chromePath();
      // Fresh, isolated browser profile provided by ChromeDriver. No app API calls: Pages export only.
      const axe = await execute(
        process.execPath,
        [
          cli,
          ...urls,
          "--save",
          "axe.json",
          "--dir",
          join(output, "raw"),
          "--no-reporter",
          "--exit",
          "--chrome-path",
          chrome,
          "--chromedriver-path",
          driver,
          "--axe-source",
          axeSource,
          "--chrome-options",
          "disable-background-networking,disable-component-update,disable-sync,no-first-run,no-default-browser-check",
          "--load-delay",
          "300",
          "--timeout",
          "60",
        ],
        join(output, "raw/axe"),
      );
      if (![0, 1].includes(axe.code))
        throw Error(
          `Axe CLI failed with exit ${axe.code}; inspect raw/axe.stderr.txt.`,
        );
      const axeResults = validateAxe(
        JSON.parse(await readFile(join(output, "raw/axe.json"), "utf8")),
        urls,
      );
      // Each entry remains an unmodified original axe Result, not a fabricated aggregate.
      for (let i = 0; i < axeResults.length; i++)
        await writeFile(
          join(output, `raw/axe-${String(i + 1).padStart(2, "0")}.json`),
          JSON.stringify(axeResults[i], null, 2) + "\n",
        );
      summary.checks.push({
        tool: "axe",
        version: axeResults[0].testEngine.version,
        exit_code: axe.code,
        routes: targetRoutes,
        result: "raw/axe.json",
        violations: axeResults.reduce((n, r) => n + r.violations.length, 0),
        incomplete: axeResults.reduce((n, r) => n + r.incomplete.length, 0),
      });
    } catch (error) {
      summary.checks.push({
        tool: "axe",
        status: "error",
        error: String(error),
      });
    }
    try {
      const vnu = await execute(
        process.execPath,
        [
          require.resolve("vnu-jar"),
          "--format",
          "json",
          "--skip-non-html",
          exported,
        ],
        join(output, "raw/vnu"),
      );
      const vnuResult = validateVnu(vnu.stderr || vnu.stdout, vnu.code);
      await writeFile(
        join(output, "raw/vnu.json"),
        JSON.stringify(vnuResult, null, 2) + "\n",
      );
      summary.checks.push({
        tool: "vnu",
        version: require("vnu-jar/package.json").version,
        exit_code: vnu.code,
        result: "raw/vnu.json",
        messages: vnuResult.messages.length,
      });
    } catch (error) {
      summary.checks.push({
        tool: "vnu",
        status: "error",
        error: String(error),
      });
    }
    summary.status = summary.checks.some((c) => c.status === "error")
      ? "error"
      : summary.checks.some(
            (c) =>
              c.exit_code === 1 ||
              c.violations > 0 ||
              c.messages > 0 ||
              c.incomplete > 0,
          )
        ? "needs_review"
        : "completed_in_scope";
    summary.note =
      "Axe incomplete and all validator messages require review. No automatic WCAG K/I/B or conformance decision.";
  } catch (error) {
    summary.error = String(error);
  } finally {
    if (server) await new Promise((ok) => server.close(ok));
    summary.finished_at = new Date().toISOString();
    await writeFile(
      join(output, "native-manifest.json"),
      JSON.stringify(summary, null, 2) + "\n",
    );
  }
  console.log(JSON.stringify(summary));
  process.exitCode =
    summary.status === "error" ? 2 : summary.status === "needs_review" ? 1 : 0;
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main().catch((error) => {
    console.error(String(error));
    process.exitCode = 2;
  });
