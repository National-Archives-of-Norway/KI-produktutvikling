import { catalogContent } from "./catalog.ts";
import { contentPages, buildPageSources } from "./knowledge.ts";
import { overview } from "./overview.ts";
import { pricingOverview } from "./pricing/index.ts";
import { resources } from "./resources.ts";
import { getRecommendedResource } from "./home.ts";
import type { RagSource } from "../features/rag/contracts.ts";

export const featureOverview = {
  title: "Funksjonalitetsoversikt",
  lead: "Dagens funksjoner i portalen, hva du kan bruke dem til, modenhet og kjente begrensninger.",
  note: "Oversikten beskriver denne utviklingsutgaven, ikke bekreftet offentlig publisering. Statusene gjelder funksjonenes modenhet og behov for oppsett, ikke om en ekstern tjeneste er tilgjengelig akkurat nå. Fremtidige leveranser står i utviklingsplanen.",
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
      description: `En felles inngang til veiledninger, verktøy og kunnskapsassistenten, med snarveier til å lære, prøve og dele. Forsideillustrasjonen har rolig bevegelse som kan pauses/startes ved klikk på illustrasjonen eller med tastatur, og slås av ved redusert bevegelse. På smale skjermer står illustrasjonen til høyre for overskriften og har samme høyde som de to tekstlinjene. Anbefalt prøveoppgave: ${recommended.title}.`,
      status: "available",
      href: "/",
      routes: ["/"],
      sitemapLabel: "Forsiden",
    },
    {
      id: "katalog",
      title: catalogContent.title,
      description: `${catalogContent.description} Søk og filtrer blant ${resources.length} ressurser, inkludert ${resources.filter((resource) => resource.type === "Skill").length} skills. Valgt ressurstype markeres med en gang. Hver ressurs har en egen side med brukssteg og eksempel, inkludert en instruks for friksjonslogg og triage i AGENTS.md. Skill-kortene har en Beta-etikett. Status og begrensninger beskrives på detaljsiden.`,
      status: "beta",
      href: "/#ressurser",
      routes: ["/ressurser/[slug]/"],
      sitemapLabel: catalogContent.title,
    },
    {
      id: "spor",
      title: "Spør KI",
      description:
        "Still spørsmål om portalens innhold. Få veiledning med konkrete steg, kilder og forslag til nye spørsmål. En samlet skill-oversikt hentes fra ressurskatalogen, med skille mellom registrerte pakker og eksempler. Kildesøket prioriterer relevante emnetreff og gjenkjenner flere norske bøyninger og bruker vedlikeholdte søkeord for å finne relevant veiledning. Ved spørsmål om to ulike temaer kan det finne en kilde til hvert tema når begge har tydelig støtte i innholdet. Det kan returnere uten treff når grunnlaget er for svakt. Chatten finnes på en egen side og fra forsiden. Modellfeil og kapasitetsavvisning beholder tilgjengelige kilder. Uventet svarformat gir en forståelig feilmelding. Modellsvar viser fortløpende nummerering ved gjentatte listemarkører og beholder tydelige nummerhopp og kildehenvisninger også i fet tekst. Spørsmål kan inneholde 3–1000 brukeropplevde tegn, inkludert sammensatte emoji. Feltet varsler når teksten kuttes og viser en teller nær grensen. Send-knappen beholder fokus under venting og sperrer gjentatt innsending; en egen Avbryt-knapp lar deg avbryte og sende et nytt spørsmål med en gang. Etter svar eller avbrudd går fokus tilbake til spørsmålsfeltet hvis det står på Send eller har falt bort, uten å flytte fokus fra en annen valgt kontroll eller rulle ned til feltet. Visningen ruller til starten av det nyeste svaret. Datoer og årstall i svar vises som avsnitt fremfor nummererte lister. Spørsmål behandles separat, og historikken lagres ikke etter sideoppdatering.",
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
        "Modellkoblingen støtter lokal Ollama og eksternt OpenAI-kompatibelt Chat Completions-API. Generering krever valgt modell og serverkonfigurasjon. API-nøkkelen håndteres på serveren. Uten modell brukes veiledning fra innholdet, også i statisk demo. Compose-oppsettet kan kjøre Qwen3:4b lokalt i en separat Ollama-tjeneste, med modellfiler i et eget Docker-volum. Lokale Qwen-svar med kildehenvisninger er prøvd gjennom portalens API. Modellen får avgrensede, spørsmålsrelevante kildeutdrag med bevarte forbehold og kildenumre; fulle kilder er fortsatt tilgjengelige i svaret. CPU-kjøringen i Docker har en avgrenset, justerbar profil for å unngå treg generering ved automatisk trådvalg. Eksternt modell-API er fortsatt bare testet med simulert transport; lokal utprøving er ikke en godkjenning for delt drift.",
      status: "beta",
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
    {
      id: "priser",
      title: pricingOverview.title,
      description:
        pricingOverview.lead +
        " Kilder og kontrolltidspunkt vises per tabell. Ved kildefeil beholdes forrige kontrollerte priser. Varsel om gamle prisdata vurderes når siden åpnes eller prisgrunnlaget endres. Daglig GitHub-jobb er klargjort for oppdateringsforslag ved endret prisgrunnlag eller kildestatus, men krever GitHub-repo, Actions og utrulling. Endrede kontrolltidspunkter alene utløser ikke et oppdateringsforslag.",
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
        "Følg nye funksjoner, forbedringer og rettinger i en offentlig, brukerrettet versjonslogg. Utviklet og publisert status skilles tydelig.",
      status: "available",
      href: "/versjonslogg/",
      routes: ["/versjonslogg/"],
      sitemapLabel: "Versjonslogg",
    },
    {
      id: "utviklingsplan",
      title: "Utviklingsplan",
      description:
        "Se prioriteringer, åpne lanseringskrav og datert beslutningshistorikk. Den offentlige planen viser fremtidig arbeid uten interne driftsnotater; dagens funksjoner vises i funksjonalitetsoversikten.",
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
