import { test } from "node:test";
import assert from "node:assert/strict";
import { buildPageSources, contentPages } from "../src/content/knowledge.ts";
import { resources } from "../src/content/resources.ts";
import { validateSearchKeywords } from "../src/features/rag/search-language.ts";
import { createRetriever } from "../src/features/rag/retrieval.ts";

for (const [label, keywords] of [
  ["tomt", [" "]],
  ["duplikat", ["logg", "LOGG"]],
  ["stoppord", ["hvordan"]],
  ["tittelord", ["personvern"]],
] as const) {
  test(`ugyldig sidenøkkelord avvises: ${label}`, () => {
    const pages = structuredClone(contentPages);
    Object.assign(
      pages.find((page) => page.id === "personvern")!,
      {
        keywords: [...keywords],
      },
    );
    assert.throws(() => buildPageSources(pages), /nøkkelord/i);
  });
}

test("nøkkelord er separat søkefelt, ikke synlig kildetekst", () => {
  const pages = structuredClone(contentPages);
  Object.assign(
    pages.find((page) => page.id === "personvern")!,
    {
      keywords: ["syntetiskalias"],
    },
  );
  const indexed = buildPageSources(pages);
  const source = indexed.find((source) => source.id === "personvern")!;
  assert.deepEqual(source.keywords, ["syntetiskalias"]);
  assert.ok(!source.text.includes("syntetiskalias"));
  const result = createRetriever(indexed)("syntetiskalias")[0];
  assert.equal(result?.id, "personvern");
  assert.ok(!JSON.stringify(result).includes("syntetiskalias"));
  assert.ok(!("keywords" in result));
});

test("seksjonsnøkkelord gjelder bare valgt seksjon og valideres", () => {
  const selection = {
    pageId: "om",
    section: "ki-prat",
    summary: "ki-prat-1",
    steps: ["ki-prat-2"],
    keywords: ["syntetiskalias"],
  };
  const indexed = buildPageSources(contentPages, [selection]);
  assert.equal(createRetriever(indexed)("syntetiskalias")[0]?.id, "ki-prat");
  assert.ok(!indexed[0].text.includes("syntetiskalias"));
  for (const keywords of [[""], ["logg", "logg"], ["ofte"], ["prat"]])
    assert.throws(
      () => buildPageSources(contentPages, [{ ...selection, keywords }]),
      /nøkkelord/i,
    );
});

test("nøkkelord rangeres mellom tittel og brødtekst og normaliseres likt", () => {
  const search = createRetriever([
    {
      id: "a",
      title: "Dokument",
      href: "/om/",
      text: "Innledning.\nDetaljert omtale av emnealias.",
    },
    {
      id: "b",
      title: "Dokument",
      href: "/om/",
      text: "Innledning.",
      keywords: ["émnealias"],
    },
    { id: "c", title: "Emnealias", href: "/om/", text: "Innledning." },
    ...Array.from({ length: 6 }, (_, index) => ({
      id: `f-${index}`,
      title: "Dokument",
      href: "/om/",
      text: "Innledning. Detaljert omtale av annetstoff.",
    })),
  ]);
  assert.deepEqual(
    search("emnealias").map((source) => source.id),
    ["c", "b", "a"],
  );
});

test("eksplisitt nøkkelord kan gjøre en handling til tema uten å vise metadata", () => {
  const search = createRetriever([
    {
      id: "a",
      title: "Dokument",
      href: "/om/",
      text: "Innledning.",
      keywords: ["lagring"],
    },
  ]);
  assert.equal(search("Lagrer dere det jeg skriver?")[0]?.id, "a");
});

test("nye ressursaliaser følger samme forfatterregler som sidealiaser", () => {
  const resource = resources.find(
    (resource) => resource.slug === "tydelig-kontekst",
  )!;
  assert.ok(resource.keywords?.length);
  assert.doesNotThrow(() =>
    validateSearchKeywords(resource.keywords, resource.title, resource.slug),
  );
});

test("sidealias arves ikke av seksjonsutdrag", () => {
  const pages = structuredClone(contentPages);
  Object.assign(
    pages.find((page) => page.id === "om")!,
    { keywords: ["sidealias"] },
  );
  const sources = buildPageSources(pages);
  assert.deepEqual(sources.find((source) => source.id === "om")?.keywords, [
    "sidealias",
  ]);
  assert.equal(
    sources.find((source) => source.id === "ki-prat")?.keywords,
    undefined,
  );
});

test("kombinert side- og valgalias avviser duplikat", () => {
  const pages = structuredClone(contentPages);
  Object.assign(
    pages.find((page) => page.id === "om")!,
    { keywords: ["sidealias"] },
  );
  assert.throws(
    () =>
      buildPageSources(pages, [
        { pageId: "om", summary: "lead", steps: [], keywords: ["SIDEALIAS"] },
      ]),
    /Duplikat nøkkelord/,
  );
});
