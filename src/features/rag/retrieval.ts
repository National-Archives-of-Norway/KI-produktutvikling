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

// Samme aksentnormalisering som katalogsøket. Æ/ø forblir egne bokstaver.
function normalize(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("nb");
}

const stopWords = new Set(
  [
    "hva",
    "hvordan",
    "hvor",
    "hvem",
    "når",
    "hvorfor",
    "hvilke",
    "hvilken",
    "hvilket",
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
    "ikke",
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
    "finner",
    "finne",
    "blir",
    "kommer",
    "mine",
  ].map(normalize),
);
function terms(text: string) {
  return (normalize(text).match(/[\p{L}\p{N}]{3,}/gu) ?? []).filter(
    (term) => !stopWords.has(term),
  );
}

const minimumPrefixLength = 5;
const strongBodyPrefixLength = 8;
const minimumScore = 2;

// Bare spørsmålets ord kan være en utvidelse av kildeordet, ikke omvendt.
// F.eks. tilgjengeligheten → tilgjengelighet, aldri kommer → kom.
function prefixLength(query: string, sourceTerms: string[]) {
  return sourceTerms.reduce(
    (length, term) =>
      term.length >= minimumPrefixLength && query.startsWith(term)
        ? Math.max(length, term.length)
        : length,
    0,
  );
}

export function retrieve(question: string): RagSource[] {
  const query = [...new Set(terms(question))];
  if (!query.length) return [];
  return (
    corpus
      .map((source, index) => {
        const title = terms(source.title);
        const body = terms(source.text);
        // Kildeteksten har én innholdsdel per linje. En emneangivelse i
        // starten av linjen er mer direkte enn en omtale langt inne i teksten.
        const lineStarts = source.text
          .split(/\r?\n/)
          .map((line) => terms(line)[0])
          .filter((term) => term !== undefined);
        let score = 0;
        let titleMatches = 0;
        let matchedTerms = 0;
        let lineStartMatches = 0;
        for (const q of query) {
          const exactTitle = title.includes(q);
          const titlePrefix = prefixLength(q, title);
          const exactBody = body.includes(q);
          const bodyPrefix = prefixLength(q, body);
          const points = exactTitle
            ? 5
            : titlePrefix
              ? 3
              : exactBody
                ? 2
                : bodyPrefix >= strongBodyPrefixLength
                  ? 2
                  : bodyPrefix
                    ? 1
                    : 0;
          score += points;
          if (exactTitle || titlePrefix) titleMatches += 1;
          if (points) matchedTerms += 1;
          if (lineStarts.includes(q) || prefixLength(q, lineStarts)) {
            lineStartMatches += 1;
          }
        }
        return {
          source,
          index,
          score,
          titleMatches,
          matchedTerms,
          lineStartMatches,
        };
      })
      // Ett kort prefikstreff i brødtekst er ikke nok. Et langt, presist
      // kildeord kan fortsatt finne f.eks. «modelloversikt» alene.
      .filter((result) => result.score >= minimumScore)
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.titleMatches - a.titleMatches ||
          b.matchedTerms - a.matchedTerms ||
          b.lineStartMatches - a.lineStartMatches ||
          a.index - b.index,
      )
      .slice(0, 3)
      .map((result) => result.source)
  );
}
