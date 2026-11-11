// Test-/rapportkode; importerer verken korpus eller blindfil i klienten.
export type EvaluationCase = {
  question: string;
  expectedId: string | null;
  maxRank?: number;
};
export function readBlindCases(text: string): {
  cases: EvaluationCase[];
  errors: string[];
} {
  try {
    const data = JSON.parse(text);
    if (data?.schemaVersion !== 1 || !Array.isArray(data.blindEvaluation))
      return {
        cases: [],
        errors: ["Forventer schemaVersion 1 og blindEvaluation som array."],
      };
    const cases: EvaluationCase[] = [],
      errors: string[] = [];
    data.blindEvaluation.forEach((row: unknown, index: number) => {
      if (!row || typeof row !== "object") {
        errors.push(`Ugyldig rad ${index + 1}`);
        return;
      }
      const r = row as Record<string, unknown>;
      if (
        typeof r.question !== "string" ||
        !r.question.trim() ||
        !(
          r.expectedId === null ||
          (typeof r.expectedId === "string" && r.expectedId.trim())
        ) ||
        (r.maxRank !== undefined &&
          (!Number.isInteger(r.maxRank) ||
            Number(r.maxRank) < 1 ||
            Number(r.maxRank) > 3)) ||
        Object.keys(r).some(
          (key) => !["question", "expectedId", "maxRank"].includes(key),
        )
      ) {
        errors.push(`Ugyldig rad ${index + 1}`);
        return;
      }
      cases.push(r as EvaluationCase);
    });
    return { cases, errors };
  } catch {
    return { cases: [], errors: ["Blindfilen kunne ikke leses som JSON."] };
  }
}
export function evaluateSearch(
  search: (question: string) => { id: string }[],
  cases: readonly EvaluationCase[],
) {
  const rows = cases.map((row) => {
    try {
      const ids = search(row.question).map((source) => source.id);
      const passed =
        row.expectedId === null
          ? ids.length === 0
          : ids.slice(0, row.maxRank ?? 1).includes(row.expectedId);
      return { ...row, ids, passed };
    } catch {
      return { ...row, ids: [], passed: false };
    }
  });
  const passed = rows.filter((row) => row.passed).length;
  return {
    total: rows.length,
    passed,
    accuracy: rows.length ? passed / rows.length : null,
    rows,
  };
}
