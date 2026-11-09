import type { ContentPage } from "../page-content.ts";

export const guidelines = {
  id: "retningslinjer",
  href: "/retningslinjer/",
  navTitle: "Retningslinjer",
  title: "Trygge rammer for å jobbe med KI",
  eyebrow: "RETNINGSLINJER · UTKAST",
  lead: "For deg som jobber med produktutvikling i Nasjonalarkivet og vil bruke KI til å utforske, lære og løse oppgaver.",
  blocks: [
    {
      id: "intro-1",
      type: "note",
      text: "Dette er et arbeidsutkast til veiledning, ikke vedtatte retningslinjer for Nasjonalarkivet. Virksomhetens gjeldende regler og godkjenninger gjelder. Verktøy, databruk og ansvar må avklares før denne siden kan brukes som en autoritativ føring.",
    },
    {
      id: "verktoy-og-tilgang",
      type: "heading",
      text: "Verktøy og tilgang",
    },
    {
      id: "verktoy-og-tilgang-1",
      type: "paragraph",
      text: "Avklar hvilket verktøy og hvilken konto som er godkjent for oppgaven. At et verktøy finnes i portalen, betyr ikke at det er godkjent for intern informasjon. Siden gir foreløpig ingen oversikt over godkjente produkter, modeller eller lisenser.",
    },
    {
      id: "analogt-og-digitalt-arkivmateriale",
      type: "heading",
      text: "Analogt og digitalt arkivmateriale",
    },
    {
      id: "analogt-og-digitalt-arkivmateriale-1",
      type: "paragraph",
      text: "Vurder innholdet før du bruker arkivmateriale i en KI-tjeneste. Det gjelder også skannede dokumenter, bilder, metadata og tekst fra OCR. Avklar hvilken informasjon tjenesten kan behandle, og bruk syntetiske eksempler når reelt materiale ikke er avklart.",
    },
    {
      id: "kvalitet-og-menneskelig-gjennomgang",
      type: "heading",
      text: "Kvalitet og menneskelig gjennomgang",
    },
    {
      id: "kvalitet-og-menneskelig-gjennomgang-1",
      type: "paragraph",
      text: "Kontroller fakta, kode og antakelser før forslag tas i bruk. Velg relevante tester og la en annen fagperson gjennomgå viktige endringer. KI-forslag trenger samme kvalitetssikring som annet arbeid.",
    },
    {
      id: "agenter-skills-og-integrasjoner",
      type: "heading",
      text: "Agenter, skills og integrasjoner",
    },
    {
      id: "agenter-skills-og-integrasjoner-1",
      type: "paragraph",
      text: "Undersøk hvilke filer, tjenester og handlinger en agent får tilgang til. Gi bare tilgangen oppgaven krever, og gjennomgå endringer før sammenslåing eller publisering. Skills merket «Beta» i portalen er ennå ikke gjennomgått av et menneske.",
    },
    {
      id: "avklaringer-for-ferdigstilling",
      type: "heading",
      text: "Avklaringer før ferdigstilling",
    },
    {
      id: "avklaringer-for-ferdigstilling-1",
      type: "list",
      items: [
        "Hvem eier og godkjenner retningslinjene?",
        "Hvilke verktøy og datakategorier er godkjent, og til hvilke oppgaver?",
        "Hvor meldes spørsmål, avvik og behov for tilgang?",
        "Når skal innholdet gjennomgås på nytt?",
      ],
    },
    {
      id: "del-erfaringer-og-sporsmal",
      type: "heading",
      text: "Del erfaringer og spørsmål",
    },
    {
      id: "del-erfaringer-og-sporsmal-1",
      type: "paragraph",
      text: "Bruk [KI-prat](/om/#ki-prat) til erfaringsdeling og diskusjon. Forumet erstatter ikke virksomhetens godkjenningsprosesser. Se også [Kom i gang](/kom-i-gang/) for en praktisk introduksjon.",
    },
    {
      id: "inspirasjon-og-status",
      type: "heading",
      text: "Inspirasjon og status",
    },
    {
      id: "inspirasjon-og-status-1",
      type: "paragraph",
      text: "Oppbygningen er inspirert av [NAVs retningslinjeside](https://ki-utvikling.nav.no/retningslinjer). NAVs verktøygodkjenninger og abonnementsregler gjelder ikke automatisk hos oss. Utkastet er sist oppdatert 9. november 2026.",
    },
  ],
} satisfies ContentPage;
