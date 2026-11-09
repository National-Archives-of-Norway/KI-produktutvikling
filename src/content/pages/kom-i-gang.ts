import type { ContentPage } from "../page-content.ts";

export const gettingStarted = {
  id: "kom-i-gang",
  href: "/kom-i-gang/",
  navTitle: "Kom i gang",
  title: "Kom i gang med KI i produktutvikling",
  eyebrow: "VEILEDNING · EKSEMPELINNHOLD",
  lead: "Begynn med én oppgave, et tydelig mål og tid til å vurdere resultatet.",
  blocks: [
    {
      id: "for-du-begynner",
      type: "note",
      text: "Før du begynner: Les [retningslinjene for bruk av KI](/retningslinjer/) og avklar hvilke verktøy og data du kan bruke. Retningslinjesiden er et arbeidsutkast; virksomhetens gjeldende regler og godkjenninger gjelder.",
    },
    {
      id: "1-velg-en-avgrenset-oppgave",
      type: "heading",
      text: "1. Velg en avgrenset oppgave",
    },
    {
      id: "1-velg-en-avgrenset-oppgave-1",
      type: "paragraph",
      text: "Prøv for eksempel å utforske et brukerbehov, forbedre en tekst eller foreslå testtilfeller for kode du kjenner. Bruk verktøy og data virksomheten har godkjent.",
    },
    {
      id: "2-beskriv-konteksten",
      type: "heading",
      text: "2. Beskriv konteksten",
    },
    {
      id: "2-beskriv-konteksten-1",
      type: "paragraph",
      text: "Forklar hva dere vil oppnå, hvilke rammer som gjelder og hvordan et godt resultat ser ut. Del bare informasjon verktøyet har lov til å behandle.",
    },
    {
      id: "3-vurder-forslagene",
      type: "heading",
      text: "3. Vurder forslagene",
    },
    {
      id: "3-vurder-forslagene-1",
      type: "paragraph",
      text: "Sjekk fakta, antakelser og kode. Den som bruker forslaget, har ansvar for å forstå og kvalitetssikre det.",
    },
    {
      id: "4-del-erfaringene",
      type: "heading",
      text: "4. Del erfaringene",
    },
    {
      id: "4-del-erfaringene-1",
      type: "paragraph",
      text: "Dokumenter hva som hjalp og hva dere måtte endre. Gode arbeidsmåter kan etter hvert bli til felles skills, instrukser og prompter.",
    },
    {
      id: "4-del-erfaringene-2",
      type: "note",
      text: "Ressursene i denne lokale prototypen er eksempler. Innlogging, interne ressurser og installasjon kommer i senere faser.",
    },
  ],
} satisfies ContentPage;
