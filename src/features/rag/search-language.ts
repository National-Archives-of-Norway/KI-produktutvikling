// Samme aksentnormalisering som katalogsøket; æ/ø beholdes.
export function normalize(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("nb");
}

// Bare generelle bokmålsord: spørsmål/pronomen, hjelpeverb, relasjoner og
// vurderende småord. Ingen portalemner eller enkeltspørsmål ligger i listen.
// Ord under tre tegn ignoreres allerede av tokeniseringen.
const stopWordGroups = {
  questions: "hva hvordan hvor hvem når hvorfor hvilke hvilken hvilket",
  pronouns:
    "jeg meg min mitt mine din ditt dine dere deres dem den det dette denne disse man oss seg sin sitt sine hans henne hennes selv noen noe hver alle",
  auxiliaries:
    "har hadde kan kunne skal skulle vil ville måtte var være vært blir ble blitt gjør gjøre gjort gir gitt får fikk fått ønsker ønske trenger trenge send sende sender sendt",
  relations:
    "med som til for fra ved hos mot etter før over under mellom gjennom uten innen utenfor blant rundt",
  conjunctions:
    "eller men fordi dersom hvis mens også samt slik enn både enten verken",
  qualifiers:
    "god godt gode bra bedre best beste mye mer mest mange litt annen annet andre egen eget egne her der dette denne hjelp ikke",
};
const stopWords = new Set(
  Object.values(stopWordGroups)
    .flatMap((group) => group.split(" "))
    .map(normalize),
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
export type Term = { word: string; stem: string };
export function terms(text: string): Term[] {
  return (normalize(text).match(/[\p{L}\p{N}]{3,}/gu) ?? [])
    .filter((word) => !stopWords.has(word))
    .map((word) => ({ word, stem: stemNorwegian(word) }));
}

// Handlinger beholder en svak stemme: «lagres» kan beskrive lagringstemaet.
export const actionTerms = new Set(
  terms(
    "test teste tester testing del dele deler skriv skrive finn finne finner lag lage kartlegg utforsk gjennomfør installer avklar sammenlign lagre lagrer lagres lagret inneholde inneholder bruke bruker",
  ).map((term) => term.stem),
);
export const actionWeight = 0.25;
