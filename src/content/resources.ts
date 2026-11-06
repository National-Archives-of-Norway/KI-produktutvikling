// Kun offentlig eksempelinnhold. Ingen interne opplysninger eller instruksjoner.
export const resources = [
  {
    slug: "kodegjennomgang",
    type: "Skill",
    action: "Se skill",
    title: "Gjennomgå en kodeendring",
    description:
      "Et utgangspunkt for strukturert gjennomgang av kvalitet, feilscenarier og tester.",
    usage:
      "Bruk eksemplet når du vil få innspill til en kodeendring du selv kan forstå og kvalitetssikre.",
    steps: [
      "Beskriv hensikten med endringen og forventet oppførsel.",
      "Be om konkrete feilscenarier og manglende tester, med henvisning til relevant kode.",
      "Vurder hvert forslag selv og kjør prosjektets relevante kontroller.",
    ],
    example:
      "Gå gjennom denne kodeendringen. Se etter feilscenarier, utilsiktet oppførsel og manglende tester. Forklar funnene med konkrete eksempler. Skill mellom sikre funn og antakelser.",
  },
  {
    slug: "tydelig-kontekst",
    type: "Instruks",
    action: "Les instruksen",
    title: "Gi KI tydelig kontekst",
    description:
      "Beskriv mål, rammer og forventet resultat før du starter en oppgave.",
    usage:
      "Bruk denne sjekklisten når du formulerer en oppgave til et KI-verktøy.",
    steps: [
      "Beskriv målet og hvem resultatet er til for.",
      "Oppgi relevante rammer, begrensninger og hvilke kilder som skal brukes.",
      "Beskriv hvordan resultatet skal vurderes, og be om at usikkerhet synliggjøres.",
    ],
    example:
      "Mål: …\nMålgruppe: …\nRelevant kontekst: …\nRammer: …\nØnsket resultat: …\nSpør hvis nødvendig informasjon mangler, og gjør antakelser tydelige.",
  },
  {
    slug: "brukerbehov",
    type: "Prompt",
    action: "Se prompten",
    title: "Utforsk et brukerbehov",
    description:
      "Still bedre spørsmål og synliggjør antakelser tidlig i produktarbeidet.",
    usage:
      "Bruk eksemplet til å forberede utforsking. KI-forslag erstatter ikke undersøkelser med faktiske brukere.",
    steps: [
      "Beskriv situasjonen uten personopplysninger.",
      "Be om åpne spørsmål og alternative forklaringer.",
      "Test antakelsene gjennom samtaler eller observasjon med brukere.",
    ],
    example:
      "Vi utforsker følgende situasjon: …\nForeslå fem åpne spørsmål til et brukerintervju. Pek på antakelsene i beskrivelsen vår, og skill mellom det vi vet og det vi må undersøke.",
  },
];
