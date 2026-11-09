export type RagSource = {
  id: string;
  title: string;
  href: string;
  text: string;
  guide?: {
    summary: string;
    steps: string[];
    note?: string;
  };
};
export type RagResult =
  | {
      mode: "sources";
      sources: RagSource[];
      answer: null;
      reason?: "no_sources" | "no_model" | "static_demo";
    }
  | { mode: "generated"; sources: RagSource[]; answer: string };
export type RagError = { error: string; sources?: RagSource[] };
export type RagResponse = { status: number; body: RagResult | RagError };
export type RagRequest = { question: string };
export const QUESTION_LIMIT = 1000;
export const QUESTION_ERROR = "Skriv et spørsmål på 3–1000 tegn.";

export function validateQuestion(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length >= 3 && text.length <= QUESTION_LIMIT ? text : null;
}

export function isSources(value: unknown): value is RagSource[] {
  return (
    Array.isArray(value) &&
    value.every(
      (source) =>
        source &&
        typeof source.id === "string" &&
        typeof source.title === "string" &&
        typeof source.text === "string" &&
        typeof source.href === "string" &&
        (/^\/ressurser\/[a-z-]+\/$/.test(source.href) ||
          [
            "/om/",
            "/om/#ki-prat",
            "/retningslinjer/",
            "/kom-i-gang/",
            "/funksjonalitet/",
          ].includes(source.href)) &&
        (source.guide === undefined ||
          (typeof source.guide?.summary === "string" &&
            Array.isArray(source.guide.steps) &&
            source.guide.steps.every(
              (step: unknown) => typeof step === "string",
            ) &&
            (source.guide.note === undefined ||
              typeof source.guide.note === "string"))),
    )
  );
}
export function isResult(value: unknown): value is RagResult {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return (
    isSources(data.sources) &&
    ((data.mode === "sources" && data.answer === null) ||
      (data.mode === "generated" && typeof data.answer === "string"))
  );
}
