import test from "node:test";
import assert from "node:assert/strict";
import {
  toolEnvironment,
  within,
  validateAxe,
  validateVnu,
  routes,
} from "../scripts/a11y/native.mjs";

const result = (url) => ({
  url,
  timestamp: "2026-11-10T08:00:00Z",
  testEngine: { name: "axe-core", version: "fixture" },
  passes: [{ id: "document-title" }],
  violations: [],
  incomplete: [],
  inapplicable: [],
});
test("axe requires a real result for every requested page, without duplicates", () => {
  const urls = ["http://127.0.0.1:1234/", "http://127.0.0.1:1234/om/"];
  assert.equal(validateAxe(urls.map(result), urls).length, 2);
  assert.throws(() => validateAxe([result(urls[0])], urls));
  assert.throws(() => validateAxe([result(urls[0]), result(urls[0])], urls));
  assert.throws(() =>
    validateAxe([{ ...result(urls[0]), passes: [] }], [urls[0]]),
  );
  assert.throws(() =>
    validateAxe(
      [{ ...result(urls[0]), testEngine: { name: "other" } }],
      [urls[0]],
    ),
  );
});
test("Nu distinguishes warnings, HTML errors, invalid output and failed execution", () => {
  assert.equal(validateVnu('{"messages":[]}', 0).messages.length, 0);
  assert.equal(
    validateVnu('{"messages":[{"type":"info","subType":"warning"}]}', 0)
      .messages.length,
    1,
  );
  assert.equal(
    validateVnu('{"messages":[{"type":"error"}]}', 1).messages.length,
    1,
  );
  assert.throws(() => validateVnu("not JSON", 0));
  assert.throws(() => validateVnu('{"messages":[]}', 1));
  assert.throws(() => validateVnu('{"messages":[{"type":"error"}]}', 0));
  assert.throws(() =>
    validateVnu('{"messages":[{"type":"non-document-error"}]}', 1),
  );
});
test("export scope remains inside its root and includes registered resources and fallback", () => {
  assert(within("/project/out", "/project/out/index.html"));
  assert(!within("/project/out", "/project/.env.local"));
  assert(!within("/project/out", "/project/outside/secret"));
  assert.equal(routes().length, new Set(routes()).size);
  assert(routes().includes("/404/"));
  assert(routes().includes("/ressurser/tilgjengelighetserklaering/"));
  assert(
    routes().every((route) => route.startsWith("/") && !route.includes("://")),
  );
});

test("tool child processes cannot inherit a remote Selenium target or implicit browser", () => {
  const source = {
    PATH: "/tools",
    SELENIUM_REMOTE_URL: "https://example.invalid/grid",
    SELENIUM_SERVER_JAR: "/other/server.jar",
    SELENIUM_BROWSER: "firefox",
    CHROME_TEST_PATH: "/other/chrome",
  };
  const actual = toolEnvironment(source);
  assert.equal(actual.PATH, "/tools");
  for (const key of [
    "SELENIUM_REMOTE_URL",
    "SELENIUM_SERVER_JAR",
    "SELENIUM_BROWSER",
    "CHROME_TEST_PATH",
    "CHROMEDRIVER_TEST_PATH",
  ])
    assert.equal(actual[key], "");
  assert.equal(source.SELENIUM_BROWSER, "firefox");
});
