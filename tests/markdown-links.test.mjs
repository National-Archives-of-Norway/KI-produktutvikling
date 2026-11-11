import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import {
  checkMarkdownLinks,
  markdownTargets,
} from "../scripts/check-markdown-links.mjs";

test("Markdown-mål støtter titler, bilder, referanser og parenteser uten kodeeksempler", () => {
  assert.deepEqual(
    markdownTargets(
      '[A](docs/a.md "Tittel") ![B](<docs/med rom.md>) [C](docs/fil(1).md)\n[ref]: docs/ref.md\n`[kode](mangler.md)`\n```md\n[x](ikke.md)\n```\n<!-- [x](kommentar.md) -->',
    ),
    ["docs/a.md", "docs/med rom.md", "docs/fil(1).md", "docs/ref.md"],
  );
});

test("lenkekontroll finner manglende relative filer i rot og docs, uten å skanne bevis", async () => {
  const root = await mkdtemp(join(tmpdir(), "ki-md-links-"));
  try {
    await mkdir(join(root, "docs/bevis"), { recursive: true });
    await writeFile(
      join(root, "README.md"),
      "[OK](docs/med%20rom.md#anker) [borte](borte.md) [web](https://example.no) [side](/spor/) [lokal](#x) [ref][f]\n[f]: docs/finnes.md\n",
    );
    await writeFile(join(root, "docs/med rom.md"), "[tilbake](../README.md)");
    await writeFile(join(root, "docs/finnes.md"), "[mangler](mangler.md)");
    await writeFile(join(root, "docs/bevis/rapport.md"), "[urørt](gammelt.md)");
    const result = await checkMarkdownLinks(root);
    assert.equal(result.files, 3);
    assert.equal(result.checked, 5);
    assert.deepEqual(result.errors, [
      "README.md: mangler borte.md",
      "docs/finnes.md: mangler mangler.md",
    ]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
