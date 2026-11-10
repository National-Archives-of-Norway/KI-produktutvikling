import { test } from "node:test";
import assert from "node:assert/strict";
import { retrieve, corpus } from "../src/features/rag/retrieval.ts";
import { validateQuestion, isSources } from "../src/features/rag/contracts.ts";
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

// Atferdsevaluering: forventningene fastsettes før rangeringen endres.
// maxRank=3 tillater andre relevante kilder foran den etterspurte oversikten.
export const retrievalEvaluation: {
  question: string;
  expectedId: string | null;
  maxRank?: number;
}[] = [
  { question: "Hvem er statsministeren?", expectedId: null },
  { question: "Hva er været i Oslo i morgen?", expectedId: null },
  { question: "Hva koster Claude?", expectedId: "priser" },
  {
    question: "Når kommer modelloversikten?",
    expectedId: "oversikt",
    maxRank: 3,
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
];

for (const { question, expectedId, maxRank = 1 } of retrievalEvaluation) {
  test(`kildeevaluering: ${question}`, () => {
    const ids = retrieve(question).map((source) => source.id);
    if (expectedId === null) {
      assert.deepEqual(ids, [], question);
    } else {
      const rank = ids.indexOf(expectedId) + 1;
      assert.ok(
        rank > 0 && rank <= maxRank,
        `${question}: forventet ${expectedId} blant de ${maxRank} første, fikk ${JSON.stringify(ids)}`,
      );
    }
  });
}

function withSources(sources: typeof corpus, run: () => void) {
  const originalLength = corpus.length;
  corpus.push(...sources);
  try {
    run();
  } finally {
    corpus.splice(originalLength);
  }
}

test("prefiks krever langt kildeord og går bare fra spørsmålsord til kildeord", () => {
  const source = {
    id: "prefiks-proeve",
    title: "Avgrenset prøve",
    href: "/kom-i-gang/",
    text: "kom være referansedokument",
  };
  withSources([source], () => {
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
  withSources([source], () => {
    for (const question of [
      "indeksering",
      "indeksering indeksering indeksering",
    ]) {
      assert.ok(!retrieve(question).some((item) => item.id === source.id));
    }
    assert.equal(retrieve("indeks")[0]?.id, source.id);
  });
});

test("titteltreff avgjør lik poengsum før antall ord og plass i korpuset", () => {
  const body = {
    id: "lik-score-broedtekst",
    title: "Avgrenset prøve",
    href: "/kom-i-gang/",
    text: "alfanøkkel indeks gammaverdi",
  };
  const title = {
    id: "lik-score-tittel",
    title: "alfanøkkel",
    href: "/kom-i-gang/",
    text: "",
  };
  withSources([body, title], () => {
    assert.equal(retrieve("alfanøkkel indeksen gammaverdi")[0]?.id, title.id);
  });
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
  withSources([narrow, broad], () => {
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
  withSources([mention, topic], () => {
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
