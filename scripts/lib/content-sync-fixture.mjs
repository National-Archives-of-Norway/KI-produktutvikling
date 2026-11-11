import { cp, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Samme kopieringsflyt brukes av watch-kontrollen og oppstartsregresjonen.
export async function copyContentSyncFixture(repo, fixture) {
  // Hele kildetreet følger med når delte moduler flyttes eller legges til.
  // Next-rutene trengs ikke for den selvstendige RAG-prosessen.
  await cp(join(repo, "src"), join(fixture, "src"), {
    recursive: true,
    filter: (source) => source !== join(repo, "src/app"),
  });
  await mkdir(join(fixture, "scripts"), { recursive: true });
  await cp(
    join(repo, "scripts/rag-server.mjs"),
    join(fixture, "scripts/rag-server.mjs"),
  );
  await writeFile(join(fixture, "package.json"), '{"type":"module"}');
}
