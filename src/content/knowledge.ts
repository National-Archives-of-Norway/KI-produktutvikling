import { copilotGuidelines } from "./pages/github-copilot.ts";
import { mcpOverview } from "./pages/godkjente-mcper.ts";
import { approvedAssistants } from "./pages/godkjente-ki-assistenter.ts";
import { cookieInformation } from "./pages/informasjonskapsler.ts";
import { privacy } from "./pages/personvern.ts";
import { about } from "./pages/om.ts";
import { gettingStarted } from "./pages/kom-i-gang.ts";
import { guidelines } from "./pages/retningslinjer.ts";
import { blockText, plainContent, type ContentPage } from "./page-content.ts";
import type { SearchSource } from "../features/rag/search-source.ts";
import { validateSearchKeywords } from "../features/rag/search-language.ts";

export const contentPages: ContentPage[] = [
  copilotGuidelines,
  mcpOverview,
  approvedAssistants,
  gettingStarted,
  about,
  guidelines,
  privacy,
  cookieInformation,
];

export type SourceSelection = {
  keywords?: string[];
  pageId: string;
  section?: string;
  summary: string;
  steps: string[];
  note?: string;
};

// Prose lives in page files. Selections contain references and optional search aliases only.
const selections: SourceSelection[] = [
  {
    pageId: "github-copilot",
    summary: "lead",
    steps: [
      "sikkerhet-tekst",
      "personvern-tekst",
      "kvalitet-liste",
      "innstillinger-liste",
      "autocomplete-liste",
      "feilsoking-tekst",
      "tester-tekst",
      "dokumentasjon-tekst",
    ],
  },
  {
    pageId: "informasjonskapsler",
    summary: "beslutning",
    steps: ["funn", "begrensning"],
    note: "status",
  },
  {
    pageId: "godkjente-mcper",
    summary: "lead",
    steps: [
      "logorama-status",
      "prometheus-status",
      "atlassian-status",
      "slack-status",
    ],
    note: "rammer",
  },
  {
    pageId: "godkjente-ki-assistenter",
    summary: "lead",
    steps: ["assistentliste", "rammer-1"],
    note: "rammer-2",
  },
  {
    pageId: "personvern",
    summary: "status",
    steps: ["katalog", "spor-ki", "lagring"],
    note: "kontakt",
  },
  {
    pageId: "kom-i-gang",
    summary: "lead",
    steps: [
      "1-velg-en-avgrenset-oppgave-1",
      "2-beskriv-konteksten-1",
      "3-vurder-forslagene-1",
      "4-del-erfaringene-1",
    ],
    note: "4-del-erfaringene-2",
  },
  {
    pageId: "om",
    summary: "lead",
    steps: ["et-felles-sted-for-lering-og-verktoy-1", "bidra-1"],
    note: "ai-enablement-teamet-4",
  },
  {
    pageId: "om",
    section: "ki-prat",
    summary: "ki-prat-1",
    steps: ["ki-prat-2", "ki-prat-3"],
    note: "ki-prat-4",
  },
  {
    pageId: "retningslinjer",
    summary: "intro-1",
    steps: [
      "analogt-og-digitalt-arkivmateriale-1",
      "kvalitet-og-menneskelig-gjennomgang-1",
      "agenter-skills-og-integrasjoner-1",
    ],
    note: "verktoy-og-tilgang-1",
  },
];

export function buildPageSources(
  pages: ContentPage[] = contentPages,
  sourceSelections: SourceSelection[] = selections,
): SearchSource[] {
  for (const page of pages)
    validateSearchKeywords(
      page.keywords,
      `${page.navTitle} ${page.title}`,
      page.id,
    );
  return sourceSelections.map((selection) => {
    const page = pages.find((item) => item.id === selection.pageId);
    if (!page) throw new Error(`Mangler innholdsside: ${selection.pageId}`);
    const text = (id: string) => {
      if (id === "lead") return plainContent(page.lead);
      const block = page.blocks.find((item) => item.id === id);
      if (!block)
        throw new Error(`Ugyldig innholdsreferanse: ${page.id}/${id}`);
      return blockText(block);
    };
    const start = selection.section
      ? page.blocks.findIndex(
          (block) => block.id === selection.section && block.type === "heading",
        )
      : 0;
    if (start < 0) throw new Error(`Mangler seksjon: ${selection.section}`);
    const end = selection.section
      ? page.blocks.findIndex(
          (block, i) => i > start && block.type === "heading",
        )
      : -1;
    const blocks = page.blocks.slice(start, end < 0 ? undefined : end);
    const firstHeading = blocks.find((block) => block.type === "heading");
    const title =
      selection.section && firstHeading
        ? blockText(firstHeading)
        : `${page.navTitle}: ${firstHeading ? blockText(firstHeading) : page.title}`;
    const keywords = selection.section
      ? selection.keywords
      : [...(page.keywords ?? []), ...(selection.keywords ?? [])];
    validateSearchKeywords(keywords, title, selection.section ?? page.id);
    return {
      ...(keywords?.length ? { keywords } : {}),
      id: selection.section ?? page.id,
      href: page.href + (selection.section ? `#${selection.section}` : ""),
      title,
      text: [
        page.title,
        page.eyebrow,
        ...(selection.section ? [] : [page.lead]),
        ...blocks.map(blockText),
      ]
        .map(plainContent)
        .join("\n"),
      guide: {
        summary: text(selection.summary),
        steps: selection.steps.map(text),
        ...(selection.note ? { note: text(selection.note) } : {}),
      },
    };
  });
}
