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
  frequency: "aldri alltid ofte sjelden ganske veldig noen ganger",
  qualifiers:
    "god godt gode bra bedre best beste mye mer mest mange litt annen annet andre egen eget egne her der dette denne hjelp ikke",
};
const stopWords = new Set(
  Object.values(stopWordGroups)
    .flatMap((group) => group.split(" "))
    .map(normalize),
);

// Korte ord og substantiv der -ing er del av ordet, ikke en verbalavledning.
// Substantivendelsene -het/-itet/-sikt/-ment beskyttes separat. Dette er en heuristikk, ikke en lemmatiserer.
const protectedWords = new Set([
  "ting",
  "ring",
  "kring",
  "mening",
  "regning",
  "test",
  "kom",
]);
const suffixes = [
  "ingene",
  "ingen",
  "inger",
  "ing",
  "ende",
  "ene",
  "ert",
  "et",
  "es",
  "er",
  "en",
  "te",
  "t",
].sort((a, b) => b.length - a.length);

export function stemNorwegian(word: string): string {
  let stem = normalize(word);
  if (protectedWords.has(stem) || /(het|itet|sikt|ment)$/.test(stem))
    return stem;
  if (stem.length > 3 && /(en|et|ene)s$/.test(stem)) stem = stem.slice(0, -1);
  for (const suffix of suffixes) {
    if (!stem.endsWith(suffix)) continue;
    // Behold -er i -ert-partisipper, slik at -ere/-erer/-eres/-ert/-ering
    // normaliseres likt. Å fjerne hele -ert ville gitt to forskjellige røtter.
    const remove = suffix === "ert" ? "t" : suffix;
    const base = stem.slice(0, -remove.length);
    const derivedIng = suffix.startsWith("ing");
    const minimum = derivedIng || suffix === "te" || suffix === "t" ? 4 : 3;
    // Kort l-stamme trengs for blant annet dele/delt/deling. Øvrige korte
    // -t/-ing-stammer avvises; ingen spørsmål eller kilde-ID-er inngår her.
    const shortL =
      (derivedIng || suffix === "t") && base.length === 3 && base.endsWith("l");
    if (base.length < minimum && !shortL) continue;
    stem = base;
    break;
  }
  if (stem.endsWith("e") && stem.length >= 4) stem = stem.slice(0, -1);
  // Behold minst fire tegn ved dobbelkonsonantforenkling, så komm ikke blir
  // identisk med kom. Lengre stammer som slett/historikk får felles rot.
  return stem.length >= 5
    ? stem.replace(/(tt|ll|mm|nn|ss|kk|pp)$/, (pair) => pair[0])
    : stem;
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
    "test teste tester testing del dele deler skriv skrive finn finne finner vis vise viser lag lage kartlegg utforsk gjennomfør kontroller kontrollere installer avklar sammenlign endre oppdatere slette lagre lagrer lagres lagret inneholde inneholder bruke bruker",
  ).map((term) => term.stem),
);
export const actionWeight = 0.25;

// Valider nye side-/seksjonsaliaser som forfatterdata. Duplikater sammenlignes
// før stamming: lagret og lagring er legitime ordvarianter av samme tema.
export function validateSearchKeywords(
  keywords: readonly string[] | undefined,
  title: string,
  label: string,
): void {
  const seen = new Set<string>();
  const titleWords = new Set(normalize(title).match(/[\p{L}\p{N}]+/gu) ?? []);
  for (const keyword of keywords ?? []) {
    const normalized = normalize(keyword.trim());
    if (!normalized || !terms(keyword).length)
      throw new Error(`Ugyldig nøkkelord (tomt eller stoppord): ${label}`);
    if (seen.has(normalized))
      throw new Error(`Duplikat nøkkelord: ${label}/${keyword}`);
    if (titleWords.has(normalized))
      throw new Error(`Unødvendig nøkkelord fra tittelen: ${label}/${keyword}`);
    seen.add(normalized);
  }
}
