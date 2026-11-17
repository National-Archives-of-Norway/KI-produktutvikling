import type { ContentPage } from "../page-content.ts";

export const copilotGuidelines = {
  id: "github-copilot",
  href: "/retningslinjer/github-copilot/",
  navTitle: "Bruk av GitHub Copilot",
  title: "GitHub Copilot i Nasjonalarkivet",
  eyebrow: "RETNINGSLINJER · GITHUB COPILOT",
  lead: "Retningslinjer og praktiske råd for deg som bruker GitHub Copilot i utviklingsarbeidet i Nasjonalarkivet.",
  blocks: [
    { id: "sikkerhet", type: "heading", text: "Sikkerhet" },
    {
      id: "sikkerhet-tekst",
      type: "paragraph",
      text: "Copilot er et hjelpemiddel for å øke produktiviteten. Sikkerhetskritisk kode bør alltid gjennomgås grundig av eksperter.",
    },
    { id: "personvern", type: "heading", text: "Personvern" },
    {
      id: "personvern-tekst",
      type: "paragraph",
      text: "Copilot har tilgang til kode som brukes som kontekst, og sender deler av denne til tjenesten utenfor virksomheten. Unngå å åpne sensitive datafiler i VS Code når Copilot er slått på. Dette gjelder for eksempel testdata fra produksjonsdatabaser som inneholder sensitive personopplysninger.",
    },
    { id: "kvalitet", type: "heading", text: "Kvalitet og standarder" },
    {
      id: "kvalitet-liste",
      type: "list",
      items: [
        "Copilot kan generere upresis eller usikker kode som ikke følger beste praksis eller bransjestandarder. Gjennomgå forslagene før de tas i bruk.",
        "Bruk prosjektets EditorConfig og formateringsverktøy, og sett opp automatisk formatering ved lagring slik at kodestilen følges.",
        "Copilot kjenner ikke nødvendigvis de nyeste verktøyene eller versjonene, for eksempel siste versjon av Next.js. Kontroller forslag mot dokumentasjonen for versjonen prosjektet bruker.",
      ],
    },
    {
      id: "innstillinger",
      type: "heading",
      text: "Innstillinger og oppdateringer",
    },
    {
      id: "innstillinger-liste",
      type: "list",
      items: [
        "Tilpass Copilot-innstillingene etter teamets preferanser og virksomhetens rammer. Beskriv aktuelle biblioteker, rammeverk og versjoner i prosjektets instruksjoner og kontekst. Der editoren støtter det, juster hvor påtrengende kodeforslagene skal være.",
        "Hold Copilot og tilhørende verktøy oppdatert for å få forbedringer og feilrettinger.",
      ],
    },
    {
      id: "autocomplete",
      type: "heading",
      text: "Bruksområde: Autocomplete og kodefullføring",
    },
    {
      id: "autocomplete-liste",
      type: "list",
      items: [
        "Bruk kodefullføring til repetitiv kode og kjente mønstre. Forslag kan bygge på kontekst fra den lokale kodebasen og mønstre fra modellens treningsdata.",
        "Forslag kan oppleves påtrengende. Trykk Esc for å avvise et forslag, eller fortsett å skrive som normalt.",
        "I VS Code kan du godta neste ord med Cmd + høyrepil på macOS eller Ctrl + høyrepil på Windows/Linux. Hurtigtaster kan være endret i ditt oppsett.",
        "Forslag må alltid gjennomgås før de godtas. Vær særlig oppmerksom på variabelnavn og andre navn; forslagene kan være misvisende eller passe dårlig i koden.",
      ],
    },
    {
      id: "feilsoking",
      type: "heading",
      text: "Bruksområde: Feilsøking og refaktorering",
    },
    {
      id: "feilsoking-tekst",
      type: "paragraph",
      text: "Marker den relevante koden og bruk Copilot-handlingene i høyreklikkmenyen eller chatten til å be om vurdering av koden eller feilen. Kontroller forklaringen og endringsforslagene før du bruker dem.",
    },
    { id: "tester", type: "heading", text: "Bruksområde: Generere tester" },
    {
      id: "tester-tekst",
      type: "paragraph",
      text: "Be Copilot foreslå tester med utgangspunkt i koden og konteksten i prosjektet. Testene må alltid sjekkes manuelt: Tester de det som faktisk må testes?",
    },
    {
      id: "dokumentasjon",
      type: "heading",
      text: "Bruksområde: Generere dokumentasjon",
    },
    {
      id: "dokumentasjon-tekst",
      type: "paragraph",
      text: "Bruk Copilot til å lage utkast til dokumentasjon. Kontroller at beskrivelsene stemmer med koden og hvordan løsningen faktisk brukes.",
    },
    {
      id: "praktisk-dokumentasjon",
      type: "heading",
      text: "Dokumentasjon for praktisk bruk",
    },
    {
      id: "praktisk-dokumentasjon-tekst",
      type: "paragraph",
      text: "Se [kodeforslag og hurtigtaster i VS Code](https://code.visualstudio.com/docs/editing/ai-powered-suggestions), [instruksjoner for GitHub Copilot](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions) og [innstillinger for hvor ofte VS Code foreslår endringer](https://code.visualstudio.com/blogs/2026/10/27/configurable-eagerness/). De tekniske veiledningene erstatter ikke Nasjonalarkivets retningslinjer.",
    },
    {
      id: "oppdatert",
      type: "paragraph",
      text: "Basert på retningslinjene oppgitt for Nasjonalarkivet. Sist oppdatert 16. november 2026.",
    },
    {
      id: "videre",
      type: "paragraph",
      text: "Tilbake til [Retningslinjer](/retningslinjer/) eller se [Godkjente KI-assistenter](/oversikt/godkjente-ki-assistenter/).",
    },
  ],
} satisfies ContentPage;
