import type { ContentPage } from "../page-content.ts";
export const approvedAssistants = {
  id: "godkjente-ki-assistenter",
  href: "/oversikt/godkjente-ki-assistenter/",
  navTitle: "Godkjente KI-assistenter",
  title: "Godkjente KI-assistenter",
  eyebrow: "OVERSIKT · GODKJENTE ASSISTENTER",
  lead: "Copilot, Claude AI og Codex er godkjente KI-utviklingsassistenter for dem som jobber med produktutvikling og utvikling av løsninger i Nasjonalarkivet.",
  blocks: [
    { id: "assistenter", type: "heading", text: "Assistenter du kan bruke" },
    {
      id: "assistentliste",
      type: "list",
      items: [
        "GitHub Copilot – Godkjent.",
        "Claude AI – Godkjent.",
        "Codex – Godkjent.",
      ],
    },
    { id: "rammer", type: "heading", text: "Rammer for bruk" },
    {
      id: "rammer-1",
      type: "paragraph",
      text: "Bruk assistentene i tråd med virksomhetens gjeldende regler. Godkjenningen her gjelder assistentene; hvilke kontoer, abonnement, modeller, integrasjoner og datatyper som kan brukes, må følge de rammene som gjelder for oppgaven.",
    },
    {
      id: "rammer-2",
      type: "paragraph",
      text: "Oversikten angir foreløpig ikke tillatte datakategorier eller hvilke kontoer og lisenser som skal brukes. Avklar dette før du tar i bruk intern informasjon. Se [retningslinjene](/retningslinjer/) for veiledning om databruk og kvalitetssikring.",
    },
    { id: "videre", type: "heading", text: "Priser og videre oversikt" },
    {
      id: "videre-1",
      type: "paragraph",
      text: "Se [priser og abonnement](/priser/) for offentlige listepriser. Prislisten viser ikke hvilke avtaler eller lisenser Nasjonalarkivet har. Gå tilbake til [Oversikt](/oversikt/) for flere temaer.",
    },
    {
      id: "oppdatert",
      type: "paragraph",
      text: "Godkjenningsstatus er oppgitt for portalen 9. november 2026. Siden er sist oppdatert samme dato.",
    },
  ],
} satisfies ContentPage;
