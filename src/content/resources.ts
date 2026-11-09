export type Resource = {
  slug: string;
  type: "Skill" | "Instruks" | "Prompt";
  action: string;
  title: string;
  description: string;
  usage: string;
  steps: string[];
  example: string;
  keywords?: string[];
  skill?: {
    name: string;
    version: string;
    repository: string;
    path: string;
    capabilities: string;
    limitations: string;
  };
};

// Kun offentlig beskrivende innhold. Private skill-filer importeres ikke i portalen.
export const resources: Resource[] = [
  {
    slug: "tilgjengelighetserklaering",
    type: "Skill",
    action: "Se skill",
    title: "Test tilgjengelighet og utform erklæring",
    description:
      "Test tilgjengeligheten, lagre resultatene i prosjektet og få oppdaterte rapporter, rettingsforslag og tilgjengelighetserklæring basert på funnene.",
    usage:
      "Bruk skillen når du vil undersøke tilgjengeligheten i et nettsted eller en app, få konkrete forslag til rettinger og utforme eller oppdatere tilgjengelighetserklæringen. Testene tilpasses verktøyene og tilgangen som faktisk finnes.",
    steps: [
      "Hent hele mappen tilgjengelighetserklaering fra Skills-biblioteket, inkludert SKILL.md, arbeidsmal og referanser.",
      "Legg skill-mappen i skill-katalogen til kodeassistenten du bruker. Følg assistentens installasjonsveiledning, og kontroller at skillen er tilgjengelig før du starter.",
      "Oppgi nettadresse eller testmiljø, viktige brukeroppgaver, eventuelle tidligere testresultater og bekreftet kontaktkanal. Be assistenten teste tilgjengeligheten med eksemplet nedenfor.",
      "Gå gjennom testrapporten med funn, konsekvenser og prioriterte rettingsforslag. Tester som ikke kunne gjennomføres, skal stå som uavklart. Be særskilt om kodeendringer hvis du ønsker at forslagene skal implementeres.",
      "Lagre hver gjennomgang i en egen datert mappe under docs/tilgjengelighet/ i prosjektet som testes. Behold råresultater, testmetadata og eventuell manuell evidens, og oppdater prosjektets rapporter og lokale erklæring med henvisning til gjennomgangen.",
      "Test rettinger på nytt før et funn lukkes. Utform erklæringen fra siste verifiserte resultater, og fullfør gjenstående manuelle kontroller. Virksomheten må godkjenne og registrere den formelle erklæringen i uustatus.no.",
    ],
    example:
      "Bruk $tilgjengelighetserklaering til å teste tilgjengeligheten for [nettadresse] i prosjektet [prosjektmappe]. Lagre resultatene i en datert mappe, dokumenter funn og rettingsforslag, og oppdater prosjektets rapporter, README, versjonslogg og lokale tilgjengelighetserklæring. Behold manglende tester som uavklart. Ikke endre nettstedets funksjonskode i denne gjennomgangen.",
    keywords: [
      "tilgjengelighet",
      "tilgjengelighetserklaering",
      "universell utforming",
      "WCAG",
      "UU",
      "Uu-tilsynet",
      "uustatus",
      "tilgjengelighetserklæring",
      "tilgjengelighetstest",
      "kontrast",
      "tastatur",
      "rettingsforslag",
    ],
    skill: {
      name: "tilgjengelighetserklaering",
      version: "0.3.0",
      repository: "Skills",
      path: "skills/tilgjengelighetserklaering",
      capabilities:
        "Skillen har testveiledning, lokale kontrollskript for HTML og kontrast, en rapportmal og en erklæringsmal. Den dokumenterer funn og foreslår rettinger før erklæringen utformes. Hva som faktisk kan testes, avhenger av tilgjengelige verktøy; resultatet er ikke en automatisk godkjenning av nettstedet.",
      limitations:
        "Skillen kan teste med tilgjengelige verktøy og foreslå rettinger. Skjermleser og andre manuelle kontroller må utføres når de er relevante. Kode endres bare når det er del av oppdraget, og den formelle erklæringen må godkjennes av virksomheten.",
    },
  },
  {
    slug: "personvernerklaering",
    type: "Skill",
    action: "Se skill",
    title: "Kartlegg personvern og utform erklæring",
    description:
      "Kartlegg faktisk databehandling, lagre vurderingsgrunnlaget i prosjektet og opprett eller oppdater personvernerklæringen med tydelige uavklarte forhold.",
    usage:
      "Bruk skillen ved en ny personvernerklæring eller når innlogging, logging, informasjonskapsler, leverandører eller KI-tjenester endrer databehandlingen. Teksten skal bygge på bekreftede opplysninger om den aktuelle tjenesten og miljøet.",
    steps: [
      "Hent hele mappen personvernerklaering fra Skills-biblioteket, inkludert SKILL.md, arbeidsmaler, referanser og skript.",
      "Legg mappen i skill-katalogen til kodeassistenten du bruker, og kontroller at skillen er tilgjengelig.",
      "Oppgi prosjektmappe, nettadresse/miljø, eksisterende erklæring og bekreftede opplysninger om ansvar og databehandling. Oppgi ingen API-nøkler eller rå personopplysninger.",
      "Be assistenten kartlegge relevante dataflyter og markere hva som er observert, bekreftet eller uavklart. Behandlingsgrunnlag, leverandørpraksis og lagring skal ikke oppfinnes.",
      "Lagre gjennomgangen i en unik datert mappe under docs/personvern/ i målprosjektet. Bevar historikken og oppdater prosjektets rapporter, erklæring, README og versjonslogg fra det vurderte grunnlaget.",
      "Gå gjennom vesentlige mangler med virksomhetens ansvarlige før teksten brukes som ferdig informasjon. Tekstoppdatering innebærer ikke automatisk publisering eller retting av nettstedets kode.",
    ],
    example:
      "Bruk $personvernerklaering til å kartlegge databehandlingen for [nettadresse/miljø] i [prosjektmappe]. Lagre grunnlaget i en datert mappe og opprett eller oppdater personvernerklæringen, rapportene, README og versjonsloggen. Merk ubekreftede fakta som uavklart og skill faktisk behandling fra planlagte funksjoner. Ikke endre funksjonskode eller publiser i denne gjennomgangen.",
    keywords: [
      "personvern",
      "personvernerklæring",
      "personvernerklaering",
      "GDPR",
      "databehandling",
      "behandlingsgrunnlag",
      "informasjonskapsler",
      "cookies",
      "logging",
      "Datatilsynet",
      "Digdir",
      "lagring",
      "databehandler",
      "KI-tjenester",
    ],
    skill: {
      name: "personvernerklaering",
      version: "0.1.0",
      repository: "Skills",
      path: "skills/personvernerklaering",
      capabilities:
        "Skillen har en kartleggingsveiledning, egne rapport- og erklæringsmaler, faglige referanser og et skript som oppretter en datert arbeidsmappe. Oppsettet er inspirert av Digdirs eksempel, med Datatilsynets veiledning som faglig grunnlag. Kartlegging og vurdering utføres av assistenten med tilgjengelige verktøy; skriptet utfører ingen skanning eller juridisk kontroll.",
      limitations:
        "Uavklarte opplysninger skal stå synlig i utkastet. Skillen kan foreslå tiltak, men gir ingen automatisk juridisk godkjenning og erstatter ikke virksomhetens vurderinger. Publisering og kodeendringer må inngå i oppdraget.",
    },
  },
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
      "Beskriv en situasjon du vil forstå bedre. Få forslag til åpne intervjuspørsmål, og vurder hvilke dere vil prøve med brukere.",
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
