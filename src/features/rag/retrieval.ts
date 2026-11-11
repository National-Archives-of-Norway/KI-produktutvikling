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
    "mine",
    "min",
    "din",
    "du",
    "oss",
    "mye",
    "noe",
    "seg",
  ].map(normalize),
);
// Avgrenset norsk suffiksregel, ikke en full lemmatiserer. Behold -het/-itet.
// Fjern genitiv-s etter bøyning, én endelse og eventuell avsluttende e.
// Minst tre tegn beholdes; -te krever fire for ikke å gjøre teste til tes.
export function stemNorwegian(word: string): string {
  let stem = normalize(word);
  if (stem.length > 3 && /(en|et|ene)s$/.test(stem)) stem = stem.slice(0, -1);
  if (/(het|itet)$/.test(stem)) return stem;
  for (const suffix of ["ene", "en", "et", "er", "te"]) {
    if (
      stem.endsWith(suffix) &&
      stem.length - suffix.length >= (suffix === "te" ? 4 : 3)
    ) {
      stem = stem.slice(0, -suffix.length);
      break;
    }
  }
  return stem.endsWith("e") && stem.length >= 4 ? stem.slice(0, -1) : stem;
}
type Term = { word: string; stem: string };
function terms(text: string): Term[] {
  return (normalize(text).match(/[\p{L}\p{N}]{3,}/gu) ?? [])
    .filter((word) => !stopWords.has(word))
    .map((word) => ({ word, stem: stemNorwegian(word) }));
}

// Generelle handlinger beskriver hva brukeren vil gjøre, ikke emnet alene.
const actionTerms = new Set(
  terms(
    "test teste tester testing del dele deler skriv skrive finn finne lag lage kartlegg utforsk gjennomfør installer avklar sammenlign lagre lagrer lagres lagret inneholde inneholder",
  ).map((term) => term.stem),
);
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
  titleMatches: number;
  primaryTitleMatches?: number;
  coverage: number;
  lineStartMatches: number;
  body: string[];
  index: number;
};
export function compareSources(a: RankedSource, b: RankedSource): number {
  return (
    b.score - a.score ||
    b.titleMatches - a.titleMatches ||
    (b.primaryTitleMatches ?? 0) - (a.primaryTitleMatches ?? 0) ||
    b.coverage - a.coverage ||
    b.lineStartMatches - a.lineStartMatches ||
    a.body.length - b.body.length ||
    a.index - b.index
  );
}

export function retrieve(question: string): RagSource[] {
  const query = [
    ...new Map(
      terms(question)
        .filter((term) => !actionTerms.has(term.stem))
        .map((term) => [term.stem, term]),
    ).values(),
  ];
  if (!query.length) return [];
  const documents = corpus.map((source, index) => {
    const bodyTerms = terms(source.text);
    return {
      source,
      index,
      // Ressursens stabile navn er også et eksplisitt emnenavn, ikke prosa.
      title: terms(source.title + " " + source.id),
      body: bodyTerms.map((term) => term.stem),
      bodyTerms,
      lead: terms(source.text.split(/\r?\n/, 1)[0]),
      lineStarts: source.text
        .split(/\r?\n/)
        .map((line) => terms(line)[0])
        .filter((term) => term !== undefined),
    };
  });
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
        titleMatches = 0,
        matchedTerms = 0,
        lineStartMatches = 0;
      let primaryTitleMatches = 0;
      let strongMatch = false;
      for (const q of query) {
        const inTitle = match(q, doc.title, true);
        const inBody = match(q, doc.bodyTerms);
        if (!inTitle && !inBody) continue;
        const proportion = frequency.get(q.stem)! / documents.length;
        const inLead = match(q, doc.lead);
        const atStart = match(q, doc.lineStarts);
        // Første ord i den faktiske sidetittelen er et sterkere hovedemne enn
        // en senere tittelomtale eller et ord i det stabile ressursnavnet.
        const primaryTitle = terms(doc.source.title)[0]?.stem === q.stem;
        primaryTitleMatches += Number(primaryTitle);
        const points = inTitle === 2 ? 5 : inTitle || inLead ? 3 : 2;
        score +=
          points *
          (1 + Math.log((documents.length + 1) / (frequency.get(q.stem)! + 1)));
        titleMatches += Number(Boolean(inTitle));
        matchedTerms++;
        lineStartMatches += Number(Boolean(atStart));
        strongMatch ||=
          proportion <= 0.5 &&
          Boolean(inTitle || (q.stem.length >= 8 && proportion <= 1 / 3));
      }
      const coverage = matchedTerms / query.length;
      return {
        ...doc,
        score,
        titleMatches,
        primaryTitleMatches,
        matchedTerms,
        lineStartMatches,
        coverage,
        strongMatch,
      };
    })
    .filter(
      (result) =>
        result.coverage >= minimumCoverage &&
        (query.length === 1
          ? result.strongMatch ||
            (query[0].stem.length >= 4 &&
              frequency.get(query[0].stem)! / documents.length <= 1 / 3)
          : result.matchedTerms > 1 || result.strongMatch),
    )
    .sort(compareSources)
    .slice(0, 3)
    .map((result) => result.source);
}
