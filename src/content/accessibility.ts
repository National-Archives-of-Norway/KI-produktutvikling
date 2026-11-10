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
        id: "1.4.3",
        title: "Kontrast (minimum)",
        description:
          "Tekst over gradienter er undersøkt i normaltilstand og på utvalgte kontroller med tastaturfokus. Øvrige interaktive tilstander og overlappende effekter, samt deler av PDF-vedlegget, er ikke ferdig vurdert.",
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
      {
        id: "1.4.11",
        title: "Kontrast for ikke-tekstlig innhold",
        description:
          "Kontrasten for nødvendige kontrollmarkeringer og meningsbærende grafikk, inkludert i PDF-vedlegget, er ikke ferdig vurdert.",
      },
    ],
  },
  {
    title: "Prinsipp 2: Mulig å betjene",
    requirements: [
      {
        id: "2.2.2",
        title: "Pause, stopp, skjul",
        description:
          "Animasjonens pause- og startfunksjon er undersøkt. Det er ikke avklart om det tidsstyrte varselet om eldre priskontroll trenger en mulighet for pause eller skjuling. Virkningen av innstillingen for redusert bevegelse er heller ikke bekreftet.",
      },
      {
        id: "2.4.3",
        title: "Fokusrekkefølge",
        description:
          "Rekkefølgen ved tastaturnavigasjon er ikke ferdig vurdert med faktisk forstørring og hjelpemidler, særlig når innhold endres.",
      },
      {
        id: "2.4.7",
        title: "Synlig fokus",
        description:
          "Det er ikke ferdig vurdert om fokusmarkeringen er synlig på representative kontroller og bakgrunner ved faktisk forstørring.",
      },
    ],
  },
  {
    title: "Prinsipp 3: Forståelig",
    requirements: [
      {
        id: "3.1.1",
        title: "Språk på siden",
        description:
          "Det er ikke bekreftet at PDF-vedlegget leses opp med riktig hovedspråk.",
      },
      {
        id: "3.1.2",
        title: "Språk på deler av innhold",
        description:
          "Språkbytter og faktisk opplesing i PDF-vedlegget er ikke ferdig vurdert. Modellgenererte svar og feilsiden i et publisert miljø er heller ikke undersøkt.",
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
          "Det er ikke bekreftet at søkeresultater, feil, venting og chatsvar blir formidlet med skjermleser uten at brukeren må flytte fokus. Dette gjelder også prisaldervarselet dersom det skal formidles på denne måten.",
      },
    ],
  },
];
