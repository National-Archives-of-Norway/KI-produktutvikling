import type { ContentPage } from "../page-content.ts";
export const mcpOverview = {
  id: "godkjente-mcper",
  href: "/oversikt/godkjente-mcper/",
  navTitle: "Godkjente MCP-er",
  title: "Godkjente MCP-er",
  eyebrow: "OVERSIKT · MCP-STATUS",
  lead: "Følg arbeidet med vurdering og godkjenning av MCP-integrasjoner i Nasjonalarkivet. Atlassian MCP er under ROS-analyse, og Slack MCP er planlagt vurdert. Ingen av disse er oppført som godkjent ennå.",
  blocks: [
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
        "Godkjent: Bruk er bekreftet godkjent innenfor angitte rammer. Ingen integrasjoner har denne statusen i oversikten nå.",
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
      text: "Statusene er oppgitt for portalen 9. november 2026. Oppdater oversikten når vurderinger eller godkjenninger endres.",
    },
  ],
} satisfies ContentPage;
