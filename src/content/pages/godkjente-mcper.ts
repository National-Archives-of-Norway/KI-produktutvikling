import type { ContentPage } from "../page-content.ts";
export const mcpOverview = {
  id: "godkjente-mcper",
  href: "/oversikt/godkjente-mcper/",
  navTitle: "Godkjente MCP-er",
  title: "Godkjente MCP-er",
  eyebrow: "OVERSIKT · MCP-STATUS",
  lead: "Se status for MCP-integrasjoner i Nasjonalarkivet. Logorama MCP og Prometheus MCP er godkjent. Atlassian MCP er under ROS-analyse, og Slack MCP er planlagt vurdert.",
  blocks: [
    { id: "logorama", type: "heading", text: "Logorama MCP" },
    {
      id: "logorama-status",
      type: "paragraph",
      text: "Status: Godkjent. Logorama MCP er godkjent for bruk i Nasjonalarkivet.",
    },
    { id: "prometheus", type: "heading", text: "Prometheus MCP" },
    {
      id: "prometheus-status",
      type: "paragraph",
      text: "Status: Godkjent. Prometheus MCP er godkjent for bruk i Nasjonalarkivet.",
    },
    { id: "atlassian", type: "heading", text: "Atlassian MCP" },
    {
      id: "atlassian-status",
      type: "paragraph",
      text: "Status: ROS-analyse pågår. Ikke godkjent ennå.",
    },
    { id: "slack", type: "heading", text: "Slack MCP" },
    {
      id: "slack-status",
      type: "paragraph",
      text: "Status: Planlagt. ROS-analyse er planlagt; integrasjonen er ikke godkjent ennå.",
    },
    { id: "statusforklaring", type: "heading", text: "Hva betyr statusene?" },
    {
      id: "statuser",
      type: "list",
      items: [
        "Planlagt: Vurderingen er planlagt, men er ikke oppgitt som startet.",
        "ROS-analyse pågår: Risiko- og sårbarhetsanalysen er under arbeid. Dette innebærer ikke godkjenning.",
        "Godkjent: Bruk er bekreftet godkjent innenfor virksomhetens gjeldende rammer.",
      ],
    },
    {
      id: "rammer",
      type: "paragraph",
      text: "Godkjenning av en KI-assistent innebærer ikke automatisk godkjenning av MCP-integrasjoner. Følg virksomhetens gjeldende regler for bruk og tilgang. Denne oversikten oppretter ingen tilkoblinger eller rettigheter.",
    },
    {
      id: "videre",
      type: "paragraph",
      text: "Se [retningslinjene](/retningslinjer/) og [Godkjente KI-assistenter](/oversikt/godkjente-ki-assistenter/), eller gå tilbake til [Oversikt](/oversikt/).",
    },
    {
      id: "oppdatert",
      type: "paragraph",
      text: "Oversikten er sist oppdatert 16. november 2026. Oppdater oversikten når vurderinger eller godkjenninger endres.",
    },
  ],
} satisfies ContentPage;
