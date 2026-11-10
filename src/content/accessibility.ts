// Brukerrettet sammendrag av vurdert grunnlag fra 10. november 2026.
// Avstem med nyeste vurderte kravmatrise ved senere oppdateringer.
export const unresolvedAccessibilityRequirements = [
  {
    title: "Prinsipp 1: Mulig å oppfatte",
    requirements: [
      {
        id: "1.1.1",
        title: "Ikke-tekstlig innhold",
        description:
          "Det er ikke ferdig vurdert om grafikken og diagrammet i PDF-vedlegget formidles tilstrekkelig gjennom tekstalternativer og skjermleser.",
      },
      {
        id: "1.3.1",
        title: "Informasjon og relasjoner",
        description:
          "PDF-vedleggets lister, grupperinger og øvrige struktur er ikke ferdig undersøkt med skjermleser.",
      },
      {
        id: "1.3.2",
        title: "Meningsfylt rekkefølge",
        description:
          "Leserekkefølgen i PDF-vedlegget, særlig på side 6–7, er ikke ferdig vurdert med hjelpemidler.",
      },
      {
        id: "1.3.4",
        title: "Visningsretning",
        description:
          "Det er ikke bekreftet at innhold og funksjoner fungerer i både stående og liggende retning på fysisk mobil eller nettbrett.",
      },
      {
        id: "1.4.4",
        title: "Endring av tekststørrelse",
        description:
          "Det er ikke bekreftet at alt innhold og alle nødvendige funksjoner kan brukes ved faktisk 200 prosent forstørring.",
      },
      {
        id: "1.4.10",
        title: "Dynamisk tilpasning (Reflow)",
        description:
          "Det er ikke bekreftet at innholdet tilpasser seg og nødvendige oppgaver kan utføres ved faktisk 400 prosent nettleserzoom.",
      },
    ],
  },

  {
    title: "Prinsipp 4: Robust",
    requirements: [
      {
        id: "4.1.2",
        title: "Navn, rolle, verdi",
        description:
          "Det er ikke bekreftet at skjermlesere formidler kontrollenes navn, rolle, verdi og tilstand riktig gjennom de aktuelle brukerforløpene.",
      },
      {
        id: "4.1.3",
        title: "Statusbeskjeder",
        description:
          "Det er ikke bekreftet at søkeresultater, feil, venting og chatsvar blir formidlet med skjermleser uten at brukeren må flytte fokus.",
      },
    ],
  },
];

export const knownAccessibilityBreaches: Array<{
  title: string;
  requirements: Array<{
    id: string;
    title: string;
    description: string;
    alternative: string;
  }>;
}> = [];
