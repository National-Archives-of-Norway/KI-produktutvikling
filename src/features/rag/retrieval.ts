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

import {
  terms,
  actionTerms,
  actionWeight,
  type Term,
} from "./search-language.ts";
export { stemNorwegian } from "./search-language.ts";
const minimumCoverage = 0.5;

function match(query: Term, words: Term[], title = false): number {
  if (words.some((word) => word.stem === query.stem)) return 2;
  // Bare titler/ressursnavn får sammensetningstreff. Kontroller råordets lengde
  // før stemming, slik at kode ikke blir for kort mens kom fortsatt avvises.
  return title &&
    words.some(
      (word) =>
        Math.min(word.word.length, query.word.length) >= 4 &&
        Math.abs(word.stem.length - query.stem.length) >= 4 &&
        (query.stem.startsWith(word.stem) || word.stem.startsWith(query.stem)),
    )
    ? 1
    : 0;
}

type RankedSource = {
  score: number;
  primaryTitleMatches?: number;
  index: number;
};
export function compareSources(a: RankedSource, b: RankedSource): number {
  return (
    b.score - a.score ||
    (b.primaryTitleMatches ?? 0) - (a.primaryTitleMatches ?? 0) ||
    a.index - b.index
  );
}

export function createRetriever(sources: readonly RagSource[]) {
  // En indeks per modulinnlasting. Watch starter prosessen på nytt ved endret
  // felles innhold, og bygger dermed indeksen på nytt uten duplisert innhold.
  const documents = sources.map((source, index) => {
    const sourceText = source.text;
    const sourceTitle = source.title;
    const lines = sourceText.split(/\r?\n/).map(terms);
    const title = terms(sourceTitle);
    const bodyTerms = lines.flat();
    return {
      source,
      index,
      title: [...title, ...terms(source.id)],
      primary: title[0]?.stem,
      body: bodyTerms.map((term) => term.stem),
      bodyTerms,
      counts: bodyTerms.reduce(
        (counts, term) =>
          counts.set(term.stem, (counts.get(term.stem) ?? 0) + 1),
        new Map<string, number>(),
      ),
      lead: lines[0] ?? [],
      lineStarts: lines.flatMap((line) => (line[0] ? [line[0]] : [])),
    };
  });
  const meanLength =
    documents.reduce((sum, doc) => sum + doc.body.length, 0) /
    Math.max(documents.length, 1);
  return function search(question: string): RagSource[] {
    const query = [
      ...new Map(terms(question).map((term) => [term.stem, term])).values(),
    ];
    const contentTerms = query.filter((term) => !actionTerms.has(term.stem));
    if (!contentTerms.length) return [];
    const weight = (q: Term) => (actionTerms.has(q.stem) ? actionWeight : 1);
    const totalWeight = query.reduce((sum, q) => sum + weight(q), 0);
    const frequency = new Map(
      query.map((q) => [
        q.stem,
        documents.filter(
          (doc) => match(q, doc.title, true) || match(q, doc.bodyTerms),
        ).length,
      ]),
    );
    return documents
      .map((doc) => {
        let score = 0,
          primaryTitleMatches = 0,
          matchedContent = 0,
          matchedWeight = 0;
        let strongMatch = false;
        for (const q of query) {
          const inTitle = match(q, doc.title, true),
            inBody = match(q, doc.bodyTerms);
          if (!inTitle && !inBody) continue;
          const weak = actionTerms.has(q.stem);
          const atStart = match(q, doc.lineStarts);
          const inLead = match(q, doc.lead);
          const points =
            inTitle === 2 && !weak ? 5 : !weak && (inTitle || inLead) ? 3 : 2;
          score +=
            (weight(q) *
              (points +
                (inTitle
                  ? 0
                  : 0.5 * Math.log2(1 + (doc.counts.get(q.stem) ?? 0)))) *
              (1 +
                Math.log(
                  (documents.length + 1) / (frequency.get(q.stem)! + 1),
                ))) /
            (inTitle
              ? 1
              : 0.75 + (0.25 * doc.body.length) / Math.max(meanLength, 1));
          primaryTitleMatches += Number(doc.primary === q.stem && !weak);
          matchedContent += Number(!weak);
          matchedWeight += weight(q);
          strongMatch ||= !weak && Boolean(inTitle || atStart);
        }
        return {
          ...doc,
          score: (score * matchedContent) / contentTerms.length,
          primaryTitleMatches,
          matchedContent,
          strongMatch,
          coverage: matchedWeight / totalWeight,
        };
      })
      .filter(
        (result) =>
          result.coverage >= minimumCoverage &&
          result.matchedContent > 0 &&
          (result.matchedContent > 1 ||
            result.strongMatch ||
            (contentTerms.length === 1 &&
              contentTerms[0].stem.length >= 4 &&
              frequency.get(contentTerms[0].stem)! / documents.length <=
                1 / 3)),
      )
      .sort(compareSources)
      .slice(0, 3)
      .map((result) => result.source);
  };
}

const searchCorpus = createRetriever(corpus);
export function retrieve(question: string): RagSource[] {
  return searchCorpus(question);
}
