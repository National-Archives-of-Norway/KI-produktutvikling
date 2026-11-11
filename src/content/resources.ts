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
      "Kjør automatiske tilgjengelighetskontroller, se hva som gjenstår manuelt for alle 48 krav, og få rapporter, rettingsforslag og tilgjengelighetserklæring fra vurderte resultater.",
    usage:
      "Bruk skillen når du vil undersøke tilgjengeligheten i et nettsted eller en app, få konkrete forslag til rettinger og utforme eller oppdatere tilgjengelighetserklæringen. Testene tilpasses verktøyene og tilgangen som faktisk finnes.",
    steps: [
      "Hent hele mappen tilgjengelighetserklaering fra Skills-biblioteket, inkludert SKILL.md, arbeidsmal og referanser.",
      "Legg skill-mappen i skill-katalogen til kodeassistenten du bruker. Følg assistentens installasjonsveiledning, og kontroller at skillen er tilgjengelig før du starter.",
      "Oppgi nettadresse eller testmiljø, viktige brukeroppgaver, eventuelle tidligere testresultater og bekreftet kontaktkanal. Be assistenten teste tilgjengeligheten med eksemplet nedenfor.",
      "La assistenten kjøre tilgjengelige automatiske deltester. Gå gjennom rapporten og den kravvise oversikten over gjenstående manuelle kontroller. Manglende verktøy og tester skal stå som uavklart. Be særskilt om kodeendringer hvis du ønsker at forslagene skal implementeres.",
      "Lagre hver gjennomgang i en egen datert mappe under docs/tilgjengelighet/ i prosjektet som testes. Behold råresultater, testmetadata og eventuell manuell evidens, og oppdater rapportene med henvisning til gjennomgangen og skriv en brukerrettet erklæring med kjente brudd og en egen liste over krav som ikke er ferdig vurdert, uten intern arbeidshistorikk.",
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
      version: "0.6.0",
      repository: "Skills",
      path: "skills/tilgjengelighetserklaering",
      capabilities:
        "Skillen har testprosedyrer for alle 48 krav og kjører tilgjengelige automatiske deltester for HTML, PDF, rendret innhold, beregnbar tekstkontrast, omflyting, fokus og konfigurerte brukerforløp. Den samler eventuell lokal validering og faktiske axe-resultater. Hver datert kjøring får en oversikt over automatisk deldekning, funn, blokkeringer og konkrete manuelle teststeg for alle 48 krav. Vurderte resultater brukes til rettingsforslag og en brukerrettet erklæring med separate deler for kjente brudd og krav som ikke er ferdig vurdert.",
      limitations:
        "Automatiske deltester gir ingen samlet godkjenning av de 48 kravene. Alle krav trenger fortsatt vurdering av innhold, utvalg eller brukbarhet. Manglende verktøy rapporteres som blokkert. Faktisk skjermleser, zoom og øvrige manuelle tester må følges opp. Kode endres bare når det er del av oppdraget, og den formelle erklæringen må godkjennes av virksomheten.",
    },
  },
  {
    slug: "informasjonskapsler-og-samtykke",
    type: "Skill",
    action: "Se skill",
    title: "Kartlegg informasjonskapsler og samtykke",
    description:
      "Undersøk cookies, annen nettleserlagring og sporing, avklar behovet for samtykke og utform cookie-informasjon fra faktiske funn.",
    usage:
      "Bruk skillen selvstendig ved oppstart eller endringer i drift, innlogging, analyse og innebygget innhold. Ingen andre skills eller tidligere rapporter er nødvendige.",
    steps: [
      "Hent hele mappen informasjonskapsler-og-samtykke fra Skills-biblioteket, og installer den i assistentens skill-katalog.",
      "Oppgi prosjektmappe, faktisk nettadresse, miljø og relevante brukerforløp. Ikke oppgi nøkler eller lagringsverdier.",
      "Be assistenten undersøke kildekode, HTTP og nettlesermetadata med tilgjengelige, tillatte verktøy. Manglende innsyn skal dokumenteres.",
      "Lagre redigerte metadata og vurdering i en egen datert mappe under docs/informasjonskapsler/ i målprosjektet.",
      "Avklar samtykkebehov før et banner implementeres. Oppdater cookie-informasjon, README og versjonslogg fra faktisk grunnlag.",
    ],
    example:
      "Bruk $informasjonskapsler-og-samtykke til å kartlegge [prosjektmappe] på [URL/miljø], lagre resultatene og oppdatere cookie-informasjonen. Vurder behovet for samtykkebanner før implementering. Skillen skal kunne kjøres uten andre skills.",
    keywords: [
      "cookies",
      "informasjonskapsler",
      "samtykke",
      "cookie-banner",
      "sporing",
      "localStorage",
      "sessionStorage",
      "IndexedDB",
      "nettleserlagring",
      "Nkom",
      "Datatilsynet",
    ],
    skill: {
      name: "informasjonskapsler-og-samtykke",
      version: "0.1.0",
      repository: "Skills",
      path: "skills/informasjonskapsler-og-samtykke",
      capabilities:
        "Selvstendig kartlegging med egne kilder, testveiledning og mal. Et Python-verktøy undersøker kildeindikatorer og anonyme HTTP-responser, importerer redigerte nettlesermetadata og lagrer daterte resultater. Assistenten vurderer bannerbehov og oppdaterer cookie-informasjonen.",
      limitations:
        "Krever ingen andre skills. En skann avgjør ikke alene nødvendighet eller juridisk samsvar. HttpOnly, tredjeparter, innlogging og faktisk produksjon kan kreve ytterligere tilgang eller manuell kontroll. Samtykke implementeres bare når det er bestilt og behovet er avklart.",
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
