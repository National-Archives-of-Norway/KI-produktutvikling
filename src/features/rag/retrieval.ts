import { buildPageSources } from "../../content/knowledge.ts";
import { getFeatureSource } from "../../content/features.ts";
import { getOverviewSource } from "../../content/overview.ts";
import { getPricingSource } from "../../content/pricing/index.ts";
import { resources } from "../../content/resources.ts";

import type { RagSource } from "./contracts.ts";
import type { SearchSource } from "./search-source.ts";
// Eksplisitt liste med offentlige kilder. Ingen filsystem- eller GitHub-tilgang.
const indexedCorpus: SearchSource[] = [
  ...resources.map((r) => ({
    id: r.slug,
    title: r.title,
    keywords: r.keywords,
    href: `/ressurser/${r.slug}/`,
    text: [
      r.description,
      r.usage,
      ...r.steps,
      r.example,
      ...(r.skill ? [r.skill.capabilities, r.skill.limitations] : []),
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

// Bare synlig innhold eksporteres til API, demo og modell.
export const corpus: RagSource[] = indexedCorpus.map(
  ({ keywords: _keywords, ...source }) => source,
);

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

export function createRetriever(sources: readonly SearchSource[]) {
  // En indeks per modulinnlasting. Watch starter prosessen på nytt ved endret
  // felles innhold, og bygger dermed indeksen på nytt uten duplisert innhold.
  const documents = sources.map(({ keywords, ...source }, index) => {
    const sourceText = source.text;
    const sourceTitle = source.title;
    const lines = sourceText.split(/\r?\n/).map(terms);
    const title = terms(sourceTitle);
    const bodyTerms = lines.flat();
    return {
      source,
      keywords: terms((keywords ?? []).join(" ")),
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
  const weight = (q: Term) => (actionTerms.has(q.stem) ? actionWeight : 1);
  function score(
    query: Term[],
    frequency: Map<string, number>,
    normalizeBody = true,
    keywordIntent = false,
  ) {
    const contentTerms = query.filter((term) => !actionTerms.has(term.stem));
    const totalWeight = query.reduce((sum, q) => sum + weight(q), 0);
    return documents.map((doc) => {
      let score = 0,
        primaryTitleMatches = 0,
        matchedContent = 0,
        matchedWeight = 0;
      let strongMatch = false;
      for (const q of query) {
        const inTitle = match(q, doc.title, true),
          inBody = match(q, doc.bodyTerms),
          inKeywords = match(q, doc.keywords);
        if (!inTitle && !inBody && !inKeywords) continue;
        const weak = actionTerms.has(q.stem) && !(keywordIntent && inKeywords);
        const atStart = match(q, doc.lineStarts);
        const inLead = match(q, doc.lead);
        const points =
          inTitle === 2 && !weak
            ? 5 + Number(doc.primary === q.stem)
            : !weak && (inTitle || inLead)
              ? 3
              : 2;
        const inverseFrequency =
          1 + Math.log((documents.length + 1) / (frequency.get(q.stem)! + 1));
        const length =
          inTitle || !normalizeBody
            ? 1
            : 0.75 + (0.25 * doc.body.length) / Math.max(meanLength, 1);
        const occurrence = inTitle
          ? 0
          : 0.5 * Math.log2(1 + (doc.counts.get(q.stem) ?? 0));
        // Linjestart er et emnesignal uavhengig av hele sidens lengde, men
        // erstatter ikke normalisering av den øvrige brødteksten.
        const topic = !inTitle && !weak && atStart ? 1 : 0;
        score +=
          weight(q) *
          inverseFrequency *
          Math.max((points + occurrence) / length + topic, inKeywords ? 3 : 0);
        primaryTitleMatches += Number(doc.primary === q.stem && !weak);
        matchedContent += Number(!weak);
        matchedWeight += weight(q);
        strongMatch ||= !weak && Boolean(inTitle || atStart || inKeywords);
      }
      return {
        ...doc,
        score: (score * matchedContent) / Math.max(contentTerms.length, 1),
        primaryTitleMatches,
        matchedContent,
        strongMatch,
        coverage: matchedWeight / totalWeight,
      };
    });
  }
  return function search(question: string): RagSource[] {
    const query = [
      ...new Map(terms(question).map((term) => [term.stem, term])).values(),
    ];
    const contentTerms = query.filter((term) => !actionTerms.has(term.stem));
    // Spørsmål uten andre temaord kan bruke et eksplisitt handlingsalias.
    // Ett isolert handlingsord er fortsatt for uklart; bare aliasfeltet får
    // emnestatus, aldri tilfeldige forekomster av handlingen i brødtekst.
    const keywordIntent = !contentTerms.length && query.length > 1;
    if (!contentTerms.length && !keywordIntent) return [];
    const frequency = new Map(
      query.map((q) => [
        q.stem,
        documents.filter(
          (doc) =>
            match(q, doc.title, true) ||
            match(q, doc.bodyTerms) ||
            match(q, doc.keywords),
        ).length,
      ]),
    );
    // Den vanlige terskelen prøves først, uten å fylle på med svakere treff.
    const primary = score(query, frequency, true, keywordIntent)
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
      .slice(0, 3);
    if (primary.length || contentTerms.length < 2)
      return primary.map((result) => result.source);

    // To temaer kan være dokumentert på hver sin side. Bare sjeldne emneord
    // får en reserveprøve, og hvert ord må ha et sterkt, konkret kildefeste.
    const themes = contentTerms.flatMap((q) => {
      const df = frequency.get(q.stem)!;
      // Avrund til hele dokumenter i små korpus.
      if (!df || !(df <= 2 || df <= Math.ceil(documents.length / 6))) return [];
      // Ved enkeltordsreserven velges den tydeligste omtalen, uten å
      // belønne en kort advarsel mer enn en lengre forklaring av samme tema.
      const best = score([q], frequency, false)
        .filter(
          (doc) =>
            match(q, doc.title, true) ||
            match(q, doc.lead) ||
            match(q, doc.keywords) ||
            match(q, doc.lineStarts) ||
            (q.stem.length >= 6 && doc.counts.has(q.stem)),
        )
        .sort(compareSources)[0];
      return best ? [best] : [];
    });
    // Reserven skal dekke minst to faktiske temaer. Ett treff pluss ukjente
    // ord (for eksempel en prisforespørsel om noe utenfor portalen) er ikke nok.
    if (themes.length < 2) return [];
    const unique = new Map<number, (typeof themes)[number]>();
    for (const result of themes) {
      const previous = unique.get(result.index);
      if (!previous || compareSources(result, previous) < 0)
        unique.set(result.index, result);
    }
    return [...unique.values()]
      .sort(compareSources)
      .slice(0, 3)
      .map((result) => result.source);
  };
}

const searchCorpus = createRetriever(indexedCorpus);
export function retrieve(question: string): RagSource[] {
  return searchCorpus(question);
}
