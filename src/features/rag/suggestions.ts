// Kilde-ID følger spørsmålet slik at UI og regresjonstester bruker samme innhold.
export const chatSuggestions = {
  welcome: [
    {
      question: "Hvordan gjennomgår jeg en kodeendring?",
      expectedId: "kodegjennomgang",
    },
    {
      question: "Hvordan gir jeg KI god kontekst?",
      expectedId: "tydelig-kontekst",
    },
    {
      question: "Hvordan utforsker jeg brukerbehov?",
      expectedId: "brukerbehov",
    },
  ],
  followUp: [
    {
      question: "Hvordan tester jeg tilgjengeligheten?",
      expectedId: "tilgjengelighetserklaering",
    },
    { question: "Hva er KI-prat?", expectedId: "ki-prat" },
    {
      question: "Hvilke retningslinjer gjelder for KI?",
      expectedId: "retningslinjer",
    },
  ],
} as const;
