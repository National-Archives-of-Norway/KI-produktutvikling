import { buildPageSources } from "../../content/knowledge.ts";
import { getFeatureSource } from "../../content/features.ts";
import { getOverviewSource } from "../../content/overview.ts";
import { getPricingSource } from "../../content/pricing/index.ts";
import { resources } from "../../content/resources.ts";

import type { RagSource } from "./contracts.ts";
// Eksplisitt liste med offentlige kilder. Ingen filsystem- eller GitHub-tilgang.
export const corpus: RagSource[] = [
  ...resources.map((r) => ({
    id: r.slug,
    title: r.title,
    href: `/ressurser/${r.slug}/`,
    text: [
      r.description,
      r.usage,
      ...r.steps,
      r.example,
      ...(r.skill ? [r.skill.capabilities, r.skill.limitations] : []),
      ...(r.keywords ?? []),
      ...(r.type === "Skill"
        ? ["Beta: Skillen er ennå ikke gjennomgått av et menneske."]
        : []),
    ].join("\n"),
    guide: {
      summary: r.usage,
      steps: r.steps,
      note:
        r.type === "Skill"
          ? "Beta: Skillen er ennå ikke gjennomgått av et menneske."
          : "Dette er eksempelinnhold til utprøving.",
    },
  })),
  ...buildPageSources(),
  getFeatureSource(),
  getPricingSource(),
  getOverviewSource(),
];

const stopWords = new Set([
  "hva",
  "hvordan",
  "hvor",
  "hvilke",
  "hvilken",
  "kan",
  "jeg",
  "med",
  "som",
  "det",
  "den",
  "til",
  "for",
  "skal",
  "vil",
  "har",
  "og",
  "en",
  "et",
  "er",
  "på",
  "av",
  "om",
  "ki",
  "dere",
  "man",
  "gjør",
  "gjøre",
  "bruker",
  "bruke",
  "hjelp",
  "ønsker",
  "trenger",
  "dette",
  "denne",
  "mitt",
  "meg",
]);
function terms(text: string) {
  return [
    ...new Set(text.toLocaleLowerCase("nb").match(/[\p{L}\p{N}]{3,}/gu) ?? []),
  ].filter((t) => !stopWords.has(t));
}

export function retrieve(question: string): RagSource[] {
  const query = terms(question);
  if (!query.length) return [];
  return corpus
    .map((source) => {
      const title = terms(source.title);
      const body = terms(source.text);
      const score = query.reduce(
        (total, q) =>
          total +
          (title.includes(q)
            ? 5
            : title.some((t) => t.startsWith(q) || q.startsWith(t))
              ? 3
              : body.includes(q)
                ? 2
                : body.some((t) => t.startsWith(q) || q.startsWith(t))
                  ? 1
                  : 0),
        0,
      );
      return { source, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.source);
}
