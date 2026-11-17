import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

// Samme avgrensede sett brukes ved enkeltkjøring og automatisk utviklingsvakt.
// Bare kjente regresjoner; aldri den eksterne blindmålingen eller modellkall.
export const searchTestFiles = [
  "tests/rag.test.ts",
  "tests/search-language.test.ts",
  "tests/search-keywords.test.ts",
  "tests/copilot-rag.test.ts",
];
export function searchTestArgs(watch = false, files = searchTestFiles) {
  return [
    "--test",
    ...(watch ? ["--watch", "--watch-preserve-output"] : []),
    ...files,
  ];
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const args = process.argv.slice(2);
  if (args.some((arg) => arg !== "--watch")) {
    console.error("Bruk: node scripts/rag-search-tests.mjs [--watch]");
    process.exitCode = 1;
  } else {
    const child = spawn(
      process.execPath,
      searchTestArgs(args.includes("--watch")),
      {
        stdio: "inherit",
        env: {
          ...process.env,
          MODEL_PROVIDER: "none",
          RAG_BLIND_FILE: undefined,
          RAG_BLIND_VERBOSE: undefined,
        },
      },
    );
    child.on("error", () => {
      console.error("Kunne ikke starte RAG-søketestene.");
      process.exitCode = 1;
    });
    child.on("exit", (code) => {
      process.exitCode = code ?? 1;
    });
    for (const signal of ["SIGINT", "SIGTERM"])
      process.on(signal, () => child.kill(signal));
  }
}
