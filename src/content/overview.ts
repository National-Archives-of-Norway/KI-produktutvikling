import { mcpOverview } from "./pages/godkjente-mcper.ts";
import { approvedAssistants } from "./pages/godkjente-ki-assistenter.ts";
import type { RagSource } from "../features/rag/contracts.ts";
export const overview = {
  title: "Oversikt",
  lead: "Få oversikt over KI-verktøy, abonnement og kostnader. Se assistenter, MCP-status og priser, og finn detaljene som passer måten dere jobber på.",
  pricing: {
    title: "Priser og abonnement",
    description:
      "Sammenlign abonnement for Copilot, Claude og Codex. Se direkte API-priser og tokenpriser i Copilot, med kilde og sist kontrollert dato.",
    href: "/priser/",
  },
  assistants: {
    title: approvedAssistants.navTitle,
    description: approvedAssistants.lead,
    href: approvedAssistants.href,
  },
  mcps: {
    title: mcpOverview.navTitle,
    description: mcpOverview.lead,
    href: mcpOverview.href,
  },
  planned: [
    {
      id: "modelloversikt",
      title: "Modelloversikt",
      description:
        "En samlet oversikt over modellenes egenskaper og bruksområder. Dette er planlagt og er ikke tilgjengelig ennå.",
    },
    {
      id: "forbruk",
      title: "Forbruk og kostnader",
      description:
        "Innsikt i faktisk bruk og kostnader. Dette er planlagt og krever avklart tilgang til bruksdata før det kan vises.",
    },
  ],
};
export function getOverviewSource(): RagSource {
  return {
    id: "oversikt",
    title: overview.title,
    href: "/oversikt/",
    text: [
      overview.lead,
      overview.pricing.title,
      overview.pricing.description,
      overview.assistants.title,
      overview.assistants.description,
      overview.mcps.title,
      overview.mcps.description,
      ...overview.planned.map(
        (item) => `${item.title} (Planlagt): ${item.description}`,
      ),
    ].join("\n"),
    guide: {
      summary: overview.lead,
      steps: [
        overview.pricing.description,
        overview.assistants.description,
        overview.mcps.description,
      ],
      note: "Modelloversikt og faktisk forbruk er planlagt. Oversikten viser foreløpig ingen bruksdata eller virksomhetens faktiske kostnader.",
    },
  };
}
