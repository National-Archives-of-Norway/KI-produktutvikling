import type { RagSource } from "../../features/rag/contracts.ts";
import {
  terms,
  actionTerms,
  actionWeight,
} from "../../features/rag/search-language.ts";

// Tegnbudsjett, ikke en påstått tokenteller. Målt mot lokal CPU-generering.
// API-et beholder fulle kilder; bare modellens utdrag avgrenses.
export const CONTEXT_CHAR_LIMIT = 6000;
const omission = "[Utdrag: deler av kilden er utelatt.]";

export function sourceExcerpt(
  question: string,
  source: RagSource,
  limit: number,
): string {
  const note = source.guide?.note ?? "";
  const full =
    note && !source.text.includes(note)
      ? `${note}\n${source.text}`
      : source.text;
  if (full.length <= limit) return full;
  // Ikke fjern eller kutt kildens uttrykkelige forbehold for å få plass.
  if (note.length + omission.length + 2 > limit)
    throw new Error("context_note_too_long");
  const query = new Set(terms(question).map((t) => t.stem));
  const lines = source.text
    .split(/\r?\n/)
    .flatMap((line) =>
      line.length > limit ? line.split(/(?<=[.!?])\s+/u) : [line],
    )
    .map((text, index) => ({
      text,
      index,
      score: [...new Set(terms(text).map((t) => t.stem))].reduce(
        (sum, stem) =>
          sum +
          (query.has(stem) ? (actionTerms.has(stem) ? actionWeight : 1) : 0),
        0,
      ),
    }));
  let remaining = limit - omission.length - note.length - 2;
  const selected = lines
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .filter((line) => {
      if (
        !line.text.trim() ||
        line.text === note ||
        line.text.length + 1 > remaining
      )
        return false;
      remaining -= line.text.length + 1;
      return true;
    })
    .sort((a, b) => a.index - b.index)
    .map((line) => line.text);
  return [note, ...selected, omission].filter(Boolean).join("\n");
}

export function modelSources(question: string, sources: RagSource[]) {
  const minimums = sources.map(
    (source) => (source.guide?.note?.length ?? 0) + omission.length + 2,
  );
  let remaining = CONTEXT_CHAR_LIMIT;
  return sources.map((source, index) => {
    const reserved = minimums.slice(index + 1).reduce((a, b) => a + b, 0);
    const budget =
      index === 0 && sources.length > 1
        ? Math.min(3600, remaining - reserved)
        : minimums[index] +
          Math.floor(
            (remaining - reserved - minimums[index]) / (sources.length - index),
          );
    const excerpt = sourceExcerpt(question, source, budget);
    remaining -= excerpt.length;
    return { number: index + 1, title: source.title, excerpt };
  });
}
