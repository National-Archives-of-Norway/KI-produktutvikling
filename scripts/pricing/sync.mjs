import { readFile, writeFile, rename, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomUUID } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
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
// Kontrolltidspunkter er bevis for kjøringen, ikke en endring i prisinnholdet.
// Kildemetadata, rader, status og feil inngår i sammenligningen.
export function hasMeaningfulChanges(previous, next) {
  const comparable = (snapshot) => {
    const { groups = [], ...metadata } = snapshot ?? {};
    return {
      ...metadata,
      groups: groups.map(({ checkedAt, attemptedAt, ...content }) => content),
    };
  };
  return !isDeepStrictEqual(comparable(previous), comparable(next));
}

export function addLogEntry(body, now) {
  const heading = /^## Ikke utgitt[ \t]*\r?$/m.exec(body);
  if (!heading)
    throw new Error(
      "Mangler innsettingspunkt i versjonsloggen: ## Ikke utgitt",
    );
  const at = heading.index + heading[0].length;
  const date = new Date(now).toLocaleDateString("nb-NO", {
    timeZone: "Europe/Oslo",
  });
  const entry = `\n\n### ${date} – oppdaterte prisdata og kildestatus\n\n- Endret lagret prisgrunnlag, kildestatus eller feilmelding etter kontroll av offisielle kilder. Mislykkede kilder beholder forrige kontrollerte rader; kilder og kontrolltidspunkt følger hver gruppe.\n- **Utførende agent/person:** Prisoppdateringsskriptet (pricing:sync).\n- **Kontroller og begrensninger:** Automatisk henting/parsing; ingen faglig godkjenning eller avtalekontroll. Se kildestatus. Ingen publisering eller commit bekreftet av skriptet.\n`;
  const rest = body.slice(at).replace(/^(?:[ \t]*\r?\n)+/, "");
  return body.slice(0, at) + entry.trimEnd() + (rest ? "\n\n" + rest : "\n");
}

export async function main({
  snapshotPath = target,
  logPath = new URL("../../VERSJONSLOGG.md", import.meta.url),
  fetcher = fetch,
  now = new Date().toISOString(),
  logger = console.log,
} = {}) {
  const previous = JSON.parse(
    await readFile(snapshotPath, "utf8").catch((error) => {
      if (error.code === "ENOENT") return '{"groups":[]}';
      throw error;
    }),
  );
  const next = await refresh(previous, fetcher, now);
  const changed = hasMeaningfulChanges(previous, next);
  // Les og valider loggen før snapshot eller midlertidige filer skrives.
  const logBody = changed
    ? addLogEntry(await readFile(logPath, "utf8"), now)
    : null;
  const path = (value) => (value instanceof URL ? fileURLToPath(value) : value);
  const tempSnapshot = path(snapshotPath) + `.${randomUUID()}.tmp`;
  const tempLog = path(logPath) + `.${randomUUID()}.tmp`;
  try {
    if (changed) await writeFile(tempLog, logBody);
    await writeFile(tempSnapshot, JSON.stringify(next, null, 2) + "\n");
    if (changed) await rename(tempLog, logPath);
    await rename(tempSnapshot, snapshotPath);
  } finally {
    await Promise.all(
      [tempSnapshot, tempLog].map((file) => rm(file, { force: true })),
    );
  }
  for (const group of next.groups)
    logger(`${group.id}: ${group.status}, ${group.rows.length} rader`);
  return { changed, failed: next.groups.some((g) => g.status !== "ok") };
}
if (
  process.argv[1] &&
  pathToFileURL(process.argv[1]).href === import.meta.url
) {
  const result = await main();
  if (result.failed) process.exitCode = 1;
}
