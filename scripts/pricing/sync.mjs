import { readFile, writeFile, rename } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { sources } from "./sources.mjs";
import { parsers } from "./parse.mjs";
const target = new URL(
  "../../src/content/pricing/snapshot.json",
  import.meta.url,
);
export async function refresh(
  previous,
  fetcher = fetch,
  now = new Date().toISOString(),
) {
  const groups = await Promise.all(
    sources.map(async (source) => {
      const old = previous?.groups?.find((g) => g.id === source.id);
      try {
        const response = await fetcher(source.fetchUrl, {
          signal: AbortSignal.timeout(25000),
          redirect: "error",
          headers: { Accept: "text/markdown, text/html;q=0.9" },
        });
        if (!response.ok) throw new Error("HTTP-kontroll feilet");
        const text = await response.text();
        if (text.length > 4000000) throw new Error("Kilden er for stor");
        const rows = parsers[source.parser](text);
        if (old?.rows?.length && rows.length < old.rows.length / 2)
          throw new Error("For mange rader forsvant");
        return {
          ...source,
          rows,
          checkedAt: now,
          attemptedAt: now,
          status: "ok",
          error: null,
        };
      } catch {
        // Do not store remote response bodies, headers or errors, which may contain arbitrary text.
        return {
          ...source,
          rows: old?.rows ?? [],
          checkedAt: old?.checkedAt ?? null,
          attemptedAt: now,
          status: "error",
          error:
            "Kilden kunne ikke hentes eller prisformatet er endret. Forrige kontrollerte priser beholdes.",
        };
      }
    }),
  );
  return { schemaVersion: 1, currency: "USD", groups };
}
async function main() {
  const previous = JSON.parse(
    await readFile(target, "utf8").catch(() => '{"groups":[]}'),
  );
  const next = await refresh(previous);
  const temp = fileURLToPath(target) + ".tmp";
  await writeFile(temp, JSON.stringify(next, null, 2) + "\n");
  await rename(temp, target);
  const changed =
    JSON.stringify(previous.groups?.map((g) => g.rows)) !==
    JSON.stringify(next.groups.map((g) => g.rows));
  if (changed) {
    const log = new URL("../../VERSJONSLOGG.md", import.meta.url);
    const body = await readFile(log, "utf8");
    const at = body.indexOf("## Ikke utgitt");
    if (at < 0) throw new Error("Mangler innsettingspunkt i versjonsloggen");
    const date = new Date().toLocaleDateString("nb-NO", {
      timeZone: "Europe/Oslo",
    });
    const entry = `## Ikke utgitt – oppdaterte prisdata – ${date}\n\n**Utførende:** Prisoppdateringsskriptet (pricing:sync).\n\n- Oppdatert lagrede prisrader fra offisielle kilder; kilde og tidspunkt følger hver gruppe. Mislykkede kilder beholder forrige kontrollerte rader.\n- Automatisk parsing er utført, ikke faglig godkjenning eller kontroll av en virksomhetsavtale. Se kildestatus på prissiden.\n\n`;
    await writeFile(log, body.slice(0, at) + entry + body.slice(at));
  }
  for (const group of next.groups)
    console.log(`${group.id}: ${group.status}, ${group.rows.length} rader`);
  if (next.groups.some((g) => g.status !== "ok")) process.exitCode = 1;
}
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url)
  await main();
