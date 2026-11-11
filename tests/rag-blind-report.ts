import { readFile, realpath } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { evaluateSearch, readBlindCases } from "./rag-evaluation.ts";

type BlindReportOptions = {
  file?: string;
  repoRoot: string;
  verbose?: boolean;
  search: Parameters<typeof evaluateSearch>[0];
  diagnostic: (message: string) => void;
};

function within(root: string, path: string) {
  const part = relative(root, path);
  return (
    part === "" ||
    (!isAbsolute(part) && part !== ".." && !part.startsWith(`..${sep}`))
  );
}

// Ingen miljølesing eller automatisk rapport ved import. Vanlige tester bruker
// bare egne syntetiske filer. Filsti/lesefeil skal ikke røpe innhold i logger.
export async function reportBlindEvaluation({
  file,
  repoRoot,
  verbose = false,
  search,
  diagnostic,
}: BlindReportOptions): Promise<void> {
  if (!file) {
    diagnostic("blindEvaluation: ikke målt (RAG_BLIND_FILE er ikke satt)");
    return;
  }
  try {
    const root = await realpath(repoRoot);
    const input = resolve(file);
    const rejectInside = () =>
      diagnostic(
        "blindEvaluation: ikke målt (RAG_BLIND_FILE må peke utenfor repoet; sti i repoet er avvist)",
      );
    // Avvis også en sti i repoet som er en lenke til en fil utenfor repoet.
    if (within(resolve(repoRoot), input) || within(root, input)) {
      rejectInside();
      return;
    }
    const target = await realpath(input);
    if (within(root, target)) {
      rejectInside();
      return;
    }
    const { cases, errors } = readBlindCases(await readFile(target, "utf8"));
    if (errors.length) {
      diagnostic("blindEvaluation: ikke målt (ugyldig filformat)");
      return;
    }
    if (!cases.length) {
      diagnostic("blindEvaluation: ikke målt (tomt sett)");
      return;
    }
    const result = evaluateSearch(search, cases);
    const misses = result.rows.filter(
      (row) => row.expectedId !== null && !row.passed,
    ).length;
    const falseHits = result.rows.filter(
      (row) => row.expectedId === null && row.ids.length > 0,
    ).length;
    diagnostic(
      `blindEvaluation: ${result.passed}/${result.total} riktige, ${(100 * result.accuracy!).toFixed(1)} %; bom med forventet kilde: ${misses}; falske treff uten forventet kilde: ${falseHits}`,
    );
    // Eksplisitt menneskevalg. Ikke bruk detaljene til justering av søket.
    if (verbose) for (const row of result.rows) diagnostic(JSON.stringify(row));
  } catch {
    diagnostic("blindEvaluation: ikke målt (filen kunne ikke leses)");
  }
}
