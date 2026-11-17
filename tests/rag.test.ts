import { test } from "node:test";
import assert from "node:assert/strict";
import {
  retrieve,
  corpus,
  stemNorwegian,
  compareSources,
  createRetriever,
} from "../src/features/rag/retrieval.ts";
import { validateQuestion, isSources } from "../src/features/rag/contracts.ts";
import { chatSuggestions } from "../src/features/rag/suggestions.ts";
import { resources } from "../src/content/resources.ts";

test("relevant kodekilde rangeres først", () => {
  assert.equal(retrieve("kodeendring tester")[0]?.id, "kodegjennomgang");
});
test("irrelevante spørsmål gir ikke tilfeldige kilder", () => {
  assert.deepEqual(retrieve("værmelding bananer"), []);
  assert.deepEqual(retrieve("Hva er KI?"), []);
});
test("offentlig liste inneholder bare kjente interne lenker", () => {
  assert.deepEqual(
    corpus
      .filter((source) => source.href.startsWith("/ressurser/"))
      .map((source) => source.id),
    resources.map((resource) => resource.slug),
  );
  assert.ok(isSources(corpus));
});
test("vanlige spørsmål finner riktig veiledning med konkrete steg og status", () => {
  for (const [question, id] of [
    ["Hvordan tester jeg tilgjengeligheten?", "tilgjengelighetserklaering"],
    ["Hva er KI-prat?", "ki-prat"],
    ["Hvordan kommer jeg i gang med KI?", "kom-i-gang"],
    ["Hvilke retningslinjer gjelder for KI?", "retningslinjer"],
    ["Hvilke verktøy er godkjent?", "retningslinjer"],
  ]) {
    const source = retrieve(question)[0];
    assert.equal(source?.id, id, question);
    assert.ok(source.guide?.summary);
    assert.ok(source.guide?.steps.length);
  }
  assert.match(retrieve("tilgjengelighet")[0].guide!.note!, /Beta/);
  assert.match(retrieve("retningslinjer")[0].guide!.summary, /arbeidsutkast/);
});
test("API-kilder avviser eksterne lenker og ugyldig veiledning", () => {
  assert.equal(
    isSources([{ ...corpus[0], href: "https://example.com" }]),
    false,
  );
  assert.equal(
    isSources([{ ...corpus[0], guide: { summary: "Tekst", steps: [7] } }]),
    false,
  );
  assert.equal(
    isSources([
      { ...corpus[0], guide: { summary: "Tekst", steps: [], note: {} } },
    ]),
    false,
  );
});
test("tilgjengelighetsskillen kan finnes i kildesøket", () => {
  assert.equal(
    retrieve("tilgjengelighetserklæring")[0]?.id,
    "tilgjengelighetserklaering",
  );
});
test("ugyldige forespørsler avvises", () => {
  for (const value of [null, {}, 7, "  ", "aa", "x".repeat(1001)])
    assert.equal(validateQuestion(value), null);
  assert.equal(validateQuestion("  brukerbehov  "), "brukerbehov");
});
test("personvernspørsmål finner riktig skill med egne begrensninger", () => {
  const source = retrieve("personvernerklæring GDPR")[0];
  assert.equal(source.id, "personvernerklaering");
  assert.match(source.text, /ingen automatisk juridisk godkjenning/);
  assert.match(source.guide!.note!, /Beta/);
  assert.ok(!source.text.includes("uustatus.no"));
});

test("cookie-informasjon kan leveres som RAG-kilde uten å åpne for ukjente ruter", () => {
  const source = corpus.find((item) => item.id === "informasjonskapsler")!;
  assert.ok(source);
  assert.ok(isSources([source]));
  assert.equal(
    retrieve("Trenger portalen et samtykkebanner?")[0]?.id,
    "informasjonskapsler",
  );
  assert.equal(
    retrieve("Bruker portalen cookies?")[0]?.id,
    "informasjonskapsler",
  );
  assert.match(source.guide!.summary, /lokale/);
  assert.ok(
    corpus.some((item) => item.id === "informasjonskapsler-og-samtykke"),
  );
  assert.equal(
    isSources([{ ...source, href: "/informasjonskapsler-ukjent/" }]),
    false,
  );
});

// Utviklingssett: kjente spørsmål, inkludert bøyninger og søkenøkkelord.
export const developmentEvaluation: {
  question: string;
  expectedId: string | null;
  maxRank?: number;
  additionalIds?: string[];
}[] = [
  { question: "Hvilke skills har vi?", expectedId: "skills" },
  { question: "Vis meg skills i ressurskatalogen", expectedId: "skills" },
  {
    question: "Hvordan skriver jeg en god prompt?",
    expectedId: "tydelig-kontekst",
  },
  {
    question: "Hvordan skriver jeg gode instrukser?",
    expectedId: "tydelig-kontekst",
  },
  { question: "Lagrer dere det jeg skriver?", expectedId: "personvern" },
  { question: "Hvordan tømmer jeg chatten?", expectedId: "personvern" },
  { question: "Blir samtalen lagret?", expectedId: "personvern" },
  { question: "Hvem er statsministeren?", expectedId: null },
  { question: "Hva er været i Oslo i morgen?", expectedId: null },
  { question: "Hva koster Claude?", expectedId: "priser" },
  {
    question: "Når kommer modelloversikten?",
    expectedId: "oversikt",
    maxRank: 1,
  },
  { question: "kodeendring tester", expectedId: "kodegjennomgang" },
  { question: "værmelding bananer", expectedId: null },
  { question: "Hva er KI?", expectedId: null },
  {
    question: "Hvordan tester jeg tilgjengeligheten?",
    expectedId: "tilgjengelighetserklaering",
  },
  { question: "Hva er KI-prat?", expectedId: "ki-prat" },
  { question: "Hvordan kommer jeg i gang med KI?", expectedId: "kom-i-gang" },
  {
    question: "Hvilke retningslinjer gjelder for KI?",
    expectedId: "retningslinjer",
  },
  { question: "Hvilke verktøy er godkjent?", expectedId: "retningslinjer" },
  { question: "tilgjengelighet", expectedId: "tilgjengelighetserklaering" },
  { question: "retningslinjer", expectedId: "retningslinjer" },
  {
    question: "tilgjengelighetserklæring",
    expectedId: "tilgjengelighetserklaering",
  },
  { question: "personvernerklæring GDPR", expectedId: "personvernerklaering" },
  {
    question: "Trenger portalen et samtykkebanner?",
    expectedId: "informasjonskapsler",
  },
  { question: "Bruker portalen cookies?", expectedId: "informasjonskapsler" },
  { question: "Hvordan blir jeg med på KI-prat?", expectedId: "ki-prat" },
  {
    question: "Hva er status for Atlassian MCP?",
    expectedId: "godkjente-mcper",
  },
  { question: "Hva koster Copilot-abonnement?", expectedId: "priser" },
  { question: "Hvordan utforsker jeg brukerbehov?", expectedId: "brukerbehov" },
  {
    question: "Hvor finner jeg versjonsloggen?",
    expectedId: "funksjonalitet",
    maxRank: 3,
  },
  {
    question: "Hvordan behandles spørsmålene mine og personopplysninger?",
    expectedId: "personvern",
  },
  {
    question: "Hvordan installerer jeg tilgjengelighetsskillen?",
    expectedId: "tilgjengelighetserklaering",
  },
  { question: "Kan du anbefale en restaurant i Bergen?", expectedId: null },
  { question: "Kan jeg slette historikken?", expectedId: "personvern" },
  { question: "Hvor ofte oppdateres prisene?", expectedId: "priser" },
  {
    question: "Kan jeg bruke KI på arkivmateriale med personopplysninger?",
    expectedId: "retningslinjer",
    maxRank: 3,
    additionalIds: ["personvern"],
  },
];

// Historisk navn: dette er 20 kjente regresjoner, ikke et blindt testsett.
// Ekte blindsett holdes utenfor repoet og brukes ikke til utvikling.
export const heldOutEvaluation: typeof developmentEvaluation = [
  { question: "Hvor mye koster en pizza i Oslo?", expectedId: null },
  { question: "Hva er Nasjonalarkivet?", expectedId: null },
  { question: "Skriv et dikt om arkiv", expectedId: null },
  { question: "Hva er prisen?", expectedId: "priser" },
  { question: "Hvordan tester jeg koden min?", expectedId: "kodegjennomgang" },
  { question: "Kan jeg dele kode med KI?", expectedId: "kodegjennomgang" },
  { question: "Hva koster det?", expectedId: "priser" },
  { question: "Hva koster togbilletten til Bergen?", expectedId: null },
  { question: "Hvordan tester jeg pizzadeigen?", expectedId: null },
  { question: "Hvem vant fotballkampen i går?", expectedId: null },
  { question: "Hvor ligger nærmeste bibliotek?", expectedId: null },
  { question: "Hva bør jeg lage til middag?", expectedId: null },
  { question: "Hvor er prisene?", expectedId: "priser" },
  { question: "Hva sier retningslinjene?", expectedId: "retningslinjer" },
  {
    question: "Hvordan gjennomfører jeg kodegjennomgangen?",
    expectedId: "kodegjennomgang",
  },
  {
    question: "Hvilke informasjonskapsler lagres?",
    expectedId: "informasjonskapsler",
  },
  {
    question: "Hvordan finner jeg personvernerklæringen?",
    expectedId: "personvern",
  },
  {
    question: "Hvordan avklarer jeg samtykket?",
    expectedId: "informasjonskapsler-og-samtykke",
  },
  { question: "Hva skjer på KI-praten?", expectedId: "ki-prat" },
  { question: "Hva inneholder modelloversikten?", expectedId: "oversikt" },
];

// Valgfri avgrensning av de to kjente settene ved lokal diagnostikk.
for (const [set, evaluation] of [
  ["development", developmentEvaluation],
  ["held-out", heldOutEvaluation],
] as const) {
  if (process.env.RAG_EVAL_SET && process.env.RAG_EVAL_SET !== set) continue;
  for (const {
    question,
    expectedId,
    maxRank = 1,
    additionalIds = [],
  } of evaluation) {
    test(`kildeevaluering (${set}): ${question}`, () => {
      const ids = retrieve(question).map((source) => source.id);
      if (expectedId === null) assert.deepEqual(ids, [], question);
      else {
        for (const expected of [expectedId, ...additionalIds]) {
          const rank = ids.indexOf(expected) + 1;
          assert.ok(
            rank > 0 && rank <= maxRank,
            `${question}: forventet ${expected} blant de ${maxRank} første, fikk ${JSON.stringify(ids)}`,
          );
        }
      }
    });
  }
}

function withSources(
  sources: typeof corpus,
  run: (
    retrieve: typeof import("../src/features/rag/retrieval.ts").retrieve,
  ) => void,
) {
  run(createRetriever([...corpus, ...sources]));
}

test("bøyninger treffer i brødtekst mens korte og ufullstendige prefikser avvises", () => {
  const source = {
    id: "prefiks-proeve",
    title: "Avgrenset prøve",
    href: "/kom-i-gang/",
    text: "kom være referansedokument",
  };
  withSources([source], (retrieve) => {
    assert.equal(retrieve("referansedokumentet")[0]?.id, source.id);
    for (const question of ["referanse", "kommentar", "været"]) {
      assert.ok(!retrieve(question).some((item) => item.id === source.id));
    }
  });
});

test("ett svakt brødtekstprefiks blir ikke relevant ved å gjenta spørsmålsordet", () => {
  const source = {
    id: "terskel-proeve",
    title: "Avgrenset prøve",
    href: "/kom-i-gang/",
    text: "indeks",
  };
  withSources([source], (retrieve) => {
    for (const question of [
      "indeksering",
      "indeksering indeksering indeksering",
    ]) {
      assert.ok(!retrieve(question).some((item) => item.id === source.id));
    }
    assert.equal(retrieve("indeks")[0]?.id, source.id);
  });
});

test("ved lik score foretrekkes hovedemnet i faktisk tittel, deretter corpus", () => {
  const mention = { score: 5, primaryTitleMatches: 0, index: 0 };
  const topic = { score: 5, primaryTitleMatches: 1, index: 1 };
  assert.ok(compareSources(topic, mention) < 0);
  assert.ok(compareSources(mention, { ...mention, index: 1 }) < 0);
});

test("stamming normaliserer bøyninger symmetrisk uten å slå korte ord sammen", () => {
  for (const forms of [
    ["pris", "prisen", "priser", "prisene", "prisens"],
    ["kode", "koden", "koder", "kodene", "kodens"],
    ["test", "tester", "testet", "testene", "teste"],
    ["samtykke", "samtykket", "samtykkene"],
    ["tilgjengelighet", "tilgjengeligheten", "tilgjengelighetens"],
    ["avklar", "avklarte"],
  ])
    assert.equal(new Set(forms.map(stemNorwegian)).size, 1, forms.join(", "));
  assert.notEqual(stemNorwegian("kom"), stemNorwegian("kommer"));
  for (const word of ["ens", "ets", "testene", "koden"])
    assert.ok(stemNorwegian(word).length >= 3);
});

test("flere treffende ord avgjør når poengsum og titteltreff er like", () => {
  const narrow = {
    id: "ett-temaord",
    title: "alfanøkkel",
    href: "/kom-i-gang/",
    text: "",
  };
  const broad = {
    id: "to-temaord",
    title: "indeks",
    href: "/kom-i-gang/",
    text: "alfanøkkel",
  };
  withSources([narrow, broad], (retrieve) => {
    assert.equal(retrieve("alfanøkkel indeksen")[0]?.id, broad.id);
  });
});

test("direkte emneangivelse ved linjestart slår tilfeldig omtale ved ellers like treff", () => {
  const mention = {
    id: "tilfeldig-omtale",
    title: "Avgrenset prøve",
    href: "/kom-i-gang/",
    text: "Denne veiledningen nevner versjonsnøkkelen i en annen sammenheng.",
  };
  const topic = {
    id: "direkte-emne",
    title: "Avgrenset prøve",
    href: "/kom-i-gang/",
    text: "Versjonsnøkkel: informasjon om emnet.",
  };
  withSources([mention, topic], (retrieve) => {
    const first = retrieve("versjonsnøkkelen").map((item) => item.id);
    assert.equal(first[0], topic.id);
    assert.deepEqual(
      retrieve("versjonsnøkkelen").map((item) => item.id),
      first,
    );
  });
});

test("aksenter, Unicode-form og store bokstaver normaliseres også i stoppord", () => {
  assert.deepEqual(retrieve("HVA ER KÍ-PRÁT?"), retrieve("Hva er KI-prat?"));
  assert.deepEqual(
    retrieve("Na\u030ar kommer modelloversikten?"),
    retrieve("Når kommer modelloversikten?"),
  );
  assert.deepEqual(retrieve("HVEM NÅR HVORFOR IKKE"), []);
  assert.deepEqual(retrieve("KI og en et er på av om"), []);
});

export const knownQuestionEvaluation = [
  {
    question: "Hvordan gir jeg KI god kontekst?",
    expectedId: "tydelig-kontekst",
  },
  { question: "Hvordan gir jeg KI kontekst?", expectedId: "tydelig-kontekst" },
  {
    question: "Hvordan gir jeg god kontekst til en KI-assistent?",
    expectedId: "tydelig-kontekst",
  },
  { question: "Hvor lagres spørsmålene mine?", expectedId: "personvern" },
  {
    question: "Hva gjør dere med spørsmålene etter at jeg har sendt dem?",
    expectedId: "personvern",
  },
];
for (const { question, expectedId } of [
  ...Object.values(chatSuggestions).flat(),
  ...knownQuestionEvaluation,
]) {
  test(`forslag/regresjon: ${question}`, () =>
    assert.equal(retrieve(question)[0]?.id, expectedId));
}

test("kildeord beregnes ved indeksbygging, ikke ved hvert spørsmål", () => {
  let textReads = 0;
  const source = {
    id: "cached",
    title: "Indeksnøkkel",
    href: "/kom-i-gang/",
    get text() {
      textReads++;
      return "Indeksnøkkel: avgrenset emne.";
    },
  };
  const search = createRetriever([source]);
  const reads = textReads;
  assert.ok(reads > 0);
  search("indeksnøkkel");
  search("indeksnøkkelen");
  assert.equal(textReads, reads);
});

test("handlingsord gir ikke treff alene, men skiller mellom kilder med samme emne", () => {
  for (const question of ["teste", "dele", "lagres", "vis"])
    assert.deepEqual(retrieve(question), []);
  const make = (id: string, text: string) => ({
    id,
    title: "Datasamling",
    href: "/kom-i-gang/",
    text,
  });
  const search = createRetriever([
    make("deles", "Datasamling deles."),
    make("lagres", "Datasamling lagres."),
  ]);
  assert.equal(search("datasamling lagres")[0]?.id, "lagres");
});

test("reserveløpet krever to støttede temaer og returnerer én kilde per tema", () => {
  const search = createRetriever([
    {
      id: "n1",
      title: "Første dokument",
      href: "/kom-i-gang/",
      text: "Generell innledning.\nDetaljert forklaring om alfatematikk.",
    },
    {
      id: "n2",
      title: "Andre dokument",
      href: "/kom-i-gang/",
      text: "Generell innledning.\nDetaljert forklaring om betatematikk.",
    },
  ]);
  assert.deepEqual(
    new Set(search("alfatematikk betatematikk").map((s) => s.id)),
    new Set(["n1", "n2"]),
  );
  assert.deepEqual(search("alfatematikk ukjenttema"), []);
});

test("vanlige ord kan ikke utløse en reservekilde alene", () => {
  const search = createRetriever(
    Array.from({ length: 6 }, (_, index) => ({
      id: `dokument-${index}`,
      title: "Dokument",
      href: "/kom-i-gang/",
      text: "Beskrivelse av fellesstoff og øvrige forhold.",
    })),
  );
  assert.deepEqual(search("fellesstoff ukjenttema"), []);
});

test("reserveprioritering bruker konkret omtale, ikke bare kort dokumentlengde", () => {
  const search = createRetriever([
    {
      id: "kort",
      title: "Dokument",
      href: "/kom-i-gang/",
      text: "Innledning.\nUnngå alfatematikk.",
    },
    {
      id: "omtale",
      title: "Dokument",
      href: "/kom-i-gang/",
      text: `Innledning.\nDetaljert omtale av alfatematikk og alfatematikk. ${"Fyllstoff. ".repeat(60)}`,
    },
    {
      id: "annet",
      title: "Dokument",
      href: "/kom-i-gang/",
      text: "Innledning.\nDetaljert omtale av betatematikk.",
    },
  ]);
  const ids = search("alfatematikk betatematikk").map((s) => s.id);
  assert.ok(ids.includes("omtale"));
  assert.ok(ids.includes("annet"));
  assert.ok(!ids.includes("kort"));
});

test("korte brødtekstord uten feltstøtte tas ikke med i reserven", () => {
  const search = createRetriever([
    {
      id: "kortord",
      title: "Dokument",
      href: "/kom-i-gang/",
      text: "Innledning.\nDetaljert omtale av kode.",
    },
    {
      id: "langtord",
      title: "Dokument",
      href: "/kom-i-gang/",
      text: "Innledning.\nDetaljert omtale av betatematikk.",
    },
  ]);
  assert.deepEqual(search("kode betatematikk"), []);
});

test("reservekilder avdupliseres og begrenses til tre", () => {
  const words = [
    "alfatematikk",
    "betatematikk",
    "gammatematikk",
    "deltatematikk",
    "epsilontematikk",
    "zetatematikk",
    "etatematikk",
    "thetatematikk",
  ];
  const search = createRetriever(
    words.map((word, index) => ({
      id: `tema-${index}`,
      title: "Dokument",
      href: "/kom-i-gang/",
      text: `Innledning.\nDetaljert omtale av ${word}.`,
    })),
  );
  const result = search(words.join(" "));
  assert.equal(result.length, 3);
  assert.equal(new Set(result.map((s) => s.id)).size, 3);
  const joint = createRetriever([
    {
      id: "samlet",
      title: "Dokument",
      href: "/kom-i-gang/",
      text: "Innledning.\nDetaljert omtale av alfatematikk og betatematikk.",
    },
  ]);
  assert.equal(
    joint("alfatematikk betatematikk ukjenttema utestoff annettema").length,
    1,
  );
});

test("responsiv forsideillustrasjon kan forklares fra funksjonsregisteret", () => {
  const source = retrieve(
    "Hvor plasseres forsideillustrasjonen på smale skjermer?",
  )[0];
  assert.equal(source?.id, "funksjonalitet");
  assert.match(source.text, /illustrasjonen til høyre for overskriften/);
  assert.match(source.text, /samme høyde som de to tekstlinjene/);
});
