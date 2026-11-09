import { test } from "node:test";
import assert from "node:assert/strict";
import { contentPages, buildPageSources } from "../src/content/knowledge.ts";
import { blockText } from "../src/content/page-content.ts";
import { isSources } from "../src/features/rag/contracts.ts";

test("alle avsnitt på innholdssidene inngår i kunnskapsgrunnlaget", () => {
  const sources = buildPageSources();
  assert.ok(isSources(sources));
  for (const page of contentPages) {
    assert.equal(
      new Set(page.blocks.map((block) => block.id)).size,
      page.blocks.length,
    );
    const source = sources.find((item) => item.id === page.id)!;
    assert.ok(source.text.includes(page.lead));
    for (const block of page.blocks) {
      assert.ok(
        source.text.includes(blockText(block)),
        `${page.id}/${block.id}`,
      );
    }
  }
});

test("endret sidetekst oppdaterer RAG-tekst, introduksjon og steg uten egne utdrag", () => {
  const pages = structuredClone(contentPages);
  const page = pages.find((item) => item.id === "om")!;
  for (const id of ["ki-prat-1", "ki-prat-2", "ki-prat-3"]) {
    const block = page.blocks.find((item) => item.id === id)!;
    if (block.type === "list") throw new Error("Forventet tekstavsnitt");
    block.text = `Oppdatert innhold fra siden: ${id}`;
  }
  const source = buildPageSources(pages).find((item) => item.id === "ki-prat")!;
  assert.equal(source.guide?.summary, "Oppdatert innhold fra siden: ki-prat-1");
  assert.deepEqual(source.guide?.steps, [
    "Oppdatert innhold fra siden: ki-prat-2",
    "Oppdatert innhold fra siden: ki-prat-3",
  ]);
  assert.ok(source.text.includes(source.guide.summary));
  assert.ok(!source.text.includes("annenhver torsdag"));
  assert.ok(!source.text.includes("Mandatforslaget"));
});

test("endret forbehold følger med og slettede innholdsreferanser gir feil", () => {
  const pages = structuredClone(contentPages);
  const page = pages.find((item) => item.id === "retningslinjer")!;
  const note = page.blocks.find((block) => block.id === "intro-1")!;
  if (note.type === "list") throw new Error("Forventet forbehold");
  note.text = "Oppdatert forbehold som også vises på siden.";
  const source = buildPageSources(pages).find((item) => item.id === page.id)!;
  assert.equal(source.guide?.summary, note.text);
  assert.ok(source.text.includes(note.text));
  page.blocks = page.blocks.filter((block) => block.id !== "intro-1");
  assert.throws(() => buildPageSources(pages), /Ugyldig innholdsreferanse/);
});
