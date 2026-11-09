import snapshot from "./snapshot.json" with { type: "json" };
import type { RagSource } from "../../features/rag/contracts.ts";
export type SubscriptionPrice = {
  name: string;
  monthly: number;
  annualMonthly: number | null;
  unit: string;
  note: string;
};
export type TokenPrice = {
  name: string;
  context: string;
  input: number;
  output: number;
  cached: number | null;
  write: number | null;
  writeLong: number | null;
  note: string;
};
type GroupBase = {
  id: string;
  product: string;
  label: string;
  url: string;
  checkedAt: string | null;
  attemptedAt: string;
  status: "ok" | "error";
  error: string | null;
};
export type PricingGroup = GroupBase &
  (
    | { kind: "subscription"; rows: SubscriptionPrice[] }
    | { kind: "api" | "tokens"; rows: TokenPrice[] }
  );
export const pricing = snapshot as {
  schemaVersion: number;
  currency: string;
  groups: PricingGroup[];
};
export const pricingOverview = {
  title: "Priser for KI-verktøy",
  lead: "Sammenlign abonnement for Copilot, Claude og Codex, og se hva modellbruk koster. Velg prisgrunnlaget som passer måten dere bruker verktøyet på.",
  note: "Utvalg av offentlige listepriser i USD. Dette er ikke en oversikt over Nasjonalarkivets avtaler eller godkjente verktøy. Skatter, valutakurs, rabatter og tillegg er ikke beregnet. Kontroller gjeldende vilkår hos leverandøren før kjøp.",
};
export function usd(value: number | null) {
  return value === null
    ? "Ikke oppgitt"
    : new Intl.NumberFormat("nb-NO", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 3,
      }).format(value);
}
export function getPricingSource(): RagSource {
  return {
    id: "priser",
    title: pricingOverview.title,
    href: "/priser/",
    text: [
      pricingOverview.lead,
      pricingOverview.note,
      ...pricing.groups.flatMap((group) => [
        `${group.label}. ${group.kind === "subscription" ? "Abonnement" : "Tokenpriser"}. Kilde: ${group.url}. Sist kontrollert: ${group.checkedAt ?? "ikke kontrollert"}. Status: ${group.status}.`,
        ...(group.status === "error" ? [group.error!] : []),
        ...group.rows.map((row) =>
          group.kind === "subscription" && "monthly" in row
            ? `${row.name}: ${usd(row.monthly)} per ${row.unit}, årsbetaling per måned: ${usd(row.annualMonthly)}. ${row.note}`
            : "input" in row
              ? `${row.name}, ${row.context}: input ${usd(row.input)}, output ${usd(row.output)}, cache-lesing ${usd(row.cached)}, cache-skriving ${usd(row.write)} / ${usd(row.writeLong)} per million tokens. ${row.note}`
              : "",
        ),
      ]),
    ].join("\n"),
    guide: {
      summary: pricingOverview.lead,
      steps: [
        "Velg abonnement for pris per bruker og periode.",
        "Se direkte API-priser for bruk med API-nøkkel. Copilot-tokenpriser gjelder inne i Copilot.",
        "Kontroller kilde, sist kontrollert dato, kontekst og cache-vilkår på prissiden.",
      ],
      note: pricingOverview.note,
    },
  };
}
