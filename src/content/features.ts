import { catalogContent } from "./catalog.ts";
import { contentPages, buildPageSources } from "./knowledge.ts";
import { overview } from "./overview.ts";
import { pricingOverview } from "./pricing/index.ts";
import { resources } from "./resources.ts";
import { getRecommendedResource } from "./home.ts";
import type { RagSource } from "../features/rag/contracts.ts";

export const featureOverview = {
  title: "Funksjonalitetsoversikt",
  lead: "En oversikt over funksjonene som finnes, hva du kan prøve og hva som gjenstår.",
  note: "Statusene beskriver funksjonenes modenhet og behov for oppsett, ikke om en ekstern tjeneste er tilgjengelig akkurat nå.",
};

export type FeatureStatus =
  "available" | "beta" | "draft" | "setup" | "planned";
export const featureStatuses: Record<FeatureStatus, string> = {
  available: "Tilgjengelig",
  beta: "Beta",
  draft: "Utkast",
  setup: "Krever oppsett",
  planned: "Ikke implementert",
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  href?: string;
  // Page patterns used by Next.js; each page belongs to one feature.
  routes?: string[];
  sitemapLabel?: string;
};

// Register capabilities once. The overview and site map are derived from this list.
export function getFeatures(): Feature[] {
  const kiPrat = buildPageSources().find((source) => source.id === "ki-prat")!;
  const recommended = getRecommendedResource();
  return [
    {
      id: "forside",
      title: "Forside",
      description: `En felles inngang til veiledninger, verktøy og kunnskapsassistenten, med snarveier til å lære, prøve og dele. Forsideillustrasjonen har rolig bevegelse som kan pauses/startes ved klikk på illustrasjonen eller med tastatur, og slås av ved redusert bevegelse. Anbefalt prøveoppgave: ${recommended.title}.`,
      status: "available",
      href: "/",
      routes: ["/"],
      sitemapLabel: "Forsiden",
    },
    {
      id: "katalog",
      title: catalogContent.title,
      description: `${catalogContent.description} Søk og filtrer blant ${resources.length} ressurser, inkludert ${resources.filter((resource) => resource.type === "Skill").length} skills. Valgt ressurstype markeres med en gang. Hver ressurs har en egen side med brukssteg og eksempel. Skills er merket Beta og er ennå ikke gjennomgått av et menneske.`,
      status: "beta",
      href: "/#ressurser",
      routes: ["/ressurser/[slug]/"],
      sitemapLabel: catalogContent.title,
    },
    {
      id: "spor",
      title: "Spør KI",
      description:
        "Still spørsmål om portalens innhold. Få veiledning med konkrete steg, kilder og forslag til nye spørsmål. Kildesøket prioriterer direkte emnetreff og kan returnere uten treff når grunnlaget er for svakt. Chatten finnes på en egen side og fra forsiden. Uventede tjenestefeil gir en nøytral feilmelding. Spørsmål behandles separat, og historikken lagres ikke etter sideoppdatering.",
      status: "beta",
      href: "/spor/",
      routes: ["/spor/"],
      sitemapLabel: "Spør kunnskapsbasen",
    },
    {
      id: "ki-prat",
      title: kiPrat.title,
      description: kiPrat.guide!.summary,
      status: "available",
      href: kiPrat.href,
    },
    ...contentPages.map((page): Feature => ({
      id: page.id,
      title: page.navTitle,
      description: page.lead,
      status: page.status ?? "available",
      href: page.href,
      routes: [page.href],
      sitemapLabel: page.navTitle,
    })),
    {
      id: "modell",
      title: "Modellgenererte svar",
      description:
        "Modellkoblingen støtter lokal Ollama og eksternt OpenAI-kompatibelt Chat Completions-API. Generering krever valgt modell og serverkonfigurasjon. API-nøkkelen håndteres på serveren. Uten modell brukes veiledning fra innholdet.",
      status: "setup",
      href: "/spor/",
    },
    {
      id: "oversikt",
      title: overview.title,
      description: overview.lead,
      status: "beta",
      href: "/oversikt/",
      routes: ["/oversikt/"],
      sitemapLabel: overview.title,
    },
    ...overview.planned.map((item): Feature => ({
      id: item.id,
      title: item.title,
      description: item.description,
      status: "planned",
    })),
    {
      id: "priser",
      title: pricingOverview.title,
      description:
        pricingOverview.lead +
        " Kilder og kontrolltidspunkt vises per tabell. Varsel om gamle prisdata vurderes når siden åpnes eller prisgrunnlaget endres. Daglig GitHub-jobb er klargjort for oppdateringsforslag ved endret prisgrunnlag eller kildestatus, men krever GitHub-repo, Actions og utrulling.",
      status: "beta",
      href: "/priser/",
      routes: ["/priser/"],
      sitemapLabel: "Priser",
    },
    {
      // not-found.tsx håndterer ukjente adresser og er ingen ordinær siderute.
      id: "feilside",
      title: "Feilside for ukjent adresse",
      description:
        "En norsk feilside med beskrivende sidetittel og lenker til forsiden og nettstedskartet hjelper deg videre når en adresse ikke finnes.",
      status: "available",
    },
    {
      id: "tilgjengelighet",
      title: "Tilgjengelighetserklæring",
      description:
        "Les om kjente brudd, hvilke krav som ikke er ferdig vurdert, og hvordan du melder tilgjengelighetsproblemer eller ber om et annet format. Erklæringen er et lokalt utkast; samlet samsvar er ikke ferdig vurdert.",
      status: "draft",
      href: "/tilgjengelighet/",
      routes: ["/tilgjengelighet/"],
      sitemapLabel: "Tilgjengelighetserklæring",
    },
    {
      id: "nettstedskart",
      title: "Nettstedskart",
      description: "Finn sidene og ressursene gjennom en samlet lenkeoversikt.",
      status: "available",
      href: "/nettstedskart/",
      routes: ["/nettstedskart/"],
      sitemapLabel: "Nettstedskart",
    },
    {
      id: "versjonslogg",
      title: "Versjonslogg",
      description:
        "Les endringer, utførende agent og dokumenterte kontroller. Siden bygges fra prosjektets versjonslogg.",
      status: "available",
      href: "/versjonslogg/",
      routes: ["/versjonslogg/"],
      sitemapLabel: "Versjonslogg",
    },
    {
      id: "utviklingsplan",
      title: "Utviklingsplan",
      description:
        "Se leverte funksjoner, faseoversikt og krav som gjenstår før produksjonssetting. Siden bygges direkte fra prosjektets utviklingsplan.",
      status: "available",
      href: "/utviklingsplan/",
      routes: ["/utviklingsplan/"],
      sitemapLabel: "Utviklingsplan",
    },
    {
      id: "funksjonalitet",
      title: "Funksjonalitetsoversikt",
      description:
        "Se hva portalen tilbyr, hva som er under utprøving og hva som krever mer oppsett. Oversikten og nettstedskartet oppdateres fra det samme funksjonsregisteret.",
      status: "available",
      href: "/funksjonalitet/",
      routes: ["/funksjonalitet/"],
      sitemapLabel: "Funksjonalitetsoversikt",
    },
    {
      id: "tilgang",
      title: "Innlogging og internt innhold",
      description:
        "Tilgangsstyring for interne brukere og beskyttede ressurser er ikke implementert. At kildekoderepoet er privat, beskytter ikke i seg selv nettstedets innhold.",
      status: "planned",
    },
  ];
}

export function getSiteLinks() {
  return getFeatures().flatMap((feature) =>
    feature.href && feature.sitemapLabel
      ? [{ href: feature.href, label: feature.sitemapLabel }]
      : [],
  );
}

export function getFeatureSource(): RagSource {
  const features = getFeatures();
  return {
    id: "funksjonalitet",
    title: featureOverview.title,
    href: "/funksjonalitet/",
    text: [
      featureOverview.lead,
      ...features.map(
        (feature) =>
          `${feature.title} (${featureStatuses[feature.status]}): ${feature.description}`,
      ),
      featureOverview.note,
    ].join("\n"),
    guide: {
      summary: featureOverview.lead,
      steps: features.map(
        (feature) => `${feature.title} (${featureStatuses[feature.status]})`,
      ),
      note: featureOverview.note,
    },
  };
}
