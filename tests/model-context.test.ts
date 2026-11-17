import { test } from "node:test";
import assert from "node:assert/strict";
import {
  modelSources,
  sourceExcerpt,
  CONTEXT_CHAR_LIMIT,
} from "../src/server/rag/context.ts";
import type { RagSource } from "../src/features/rag/contracts.ts";

const source: RagSource = {
  id: "eksempel",
  title: "Eksempel",
  href: "/om/",
  text:
    "Innledning.\n" +
    "Urelatert bakgrunn.\n".repeat(250) +
    "Tester må kontrolleres manuelt.\nEn egen forklaring.",
  guide: {
    summary: "Innledning.",
    steps: [],
    note: "Arbeidsutkast; ikke godkjent policy.",
  },
};
test("utdrag velger relevante hele linjer og beholder forbehold og rekkefølge", () => {
  const excerpt = sourceExcerpt("Kontrollere tester", source, 300);
  assert.ok(excerpt.length <= 300);
  assert.match(excerpt, /Tester må kontrolleres manuelt\./);
  assert.match(excerpt, /Arbeidsutkast; ikke godkjent policy\./);
  assert.match(excerpt, /deler av kilden er utelatt/);
  assert.ok(source.text.length > 300);
});
test("korte kilder sendes uendret og kildeobjektene muteres ikke", () => {
  const short = { ...source, text: "Kort tekst.", guide: undefined };
  const before = structuredClone(short);
  assert.equal(sourceExcerpt("test", short, 300), short.text);
  assert.deepEqual(short, before);
});
test("budsjettet omfatter alle utdrag, også med mange kilder, uten å endre kildenumre", () => {
  for (const count of [0, 1, 2, 3, 12]) {
    const sources = Array.from({ length: count }, () =>
      structuredClone(source),
    );
    const excerpts = modelSources("kontrollere tester", sources);
    assert.ok(
      excerpts.reduce((n, s) => n + s.excerpt.length, 0) <= CONTEXT_CHAR_LIMIT,
    );
    assert.deepEqual(
      excerpts.map((s) => s.number),
      sources.map((_, i) => i + 1),
    );
    for (const s of excerpts) assert.match(s.excerpt, /Arbeidsutkast/);
  }
});
test("en lang linje deles bare ved setningsgrenser og urommelige forbehold avvises", () => {
  const long = {
    ...source,
    text:
      "Bakgrunn. ".repeat(200) +
      "Tester må sjekkes manuelt. " +
      "Mer bakgrunn. ".repeat(200),
  };
  assert.match(
    sourceExcerpt("tester", long, 250),
    /Tester må sjekkes manuelt\./,
  );
  assert.throws(
    () => sourceExcerpt("test", source, 10),
    /context_note_too_long/,
  );
});
