import { readdirSync } from "node:fs";
import { join } from "node:path";
import { getFeatures, type Feature } from "../../content/features.ts";

export function findPageRoutes(
  directory: string,
  segments: string[] = [],
): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      if (entry.name.startsWith("_") || entry.name.startsWith("@")) return [];
      const next = entry.name.startsWith("(")
        ? segments
        : [...segments, entry.name];
      return findPageRoutes(join(directory, entry.name), next);
    }
    return /^page\.(tsx|ts|jsx|js|mdx)$/.test(entry.name)
      ? [segments.length ? `/${segments.join("/")}/` : "/"]
      : [];
  });
}

export function validateFeatures(
  routes: string[],
  features: Feature[] = getFeatures(),
) {
  const errors: string[] = [];
  const registered = features.flatMap((feature) => feature.routes ?? []);
  if (new Set(features.map((feature) => feature.id)).size !== features.length)
    errors.push("Duplisert funksjons-ID.");
  if (new Set(registered).size !== registered.length)
    errors.push("En side er registrert på flere funksjoner.");
  for (const route of routes)
    if (!registered.includes(route))
      errors.push(`Side mangler i funksjonsregisteret: ${route}`);
  for (const route of registered)
    if (!routes.includes(route))
      errors.push(`Registrert side finnes ikke: ${route}`);
  for (const feature of features) {
    if (feature.status === "planned" && feature.routes?.length)
      errors.push(`Ikke implementert funksjon har sider: ${feature.id}`);
    if (feature.href) {
      const path = feature.href.split("#")[0];
      if (!routes.includes(path))
        errors.push(`Funksjonslenke peker til ukjent side: ${feature.id}`);
    }
  }
  if (errors.length)
    throw new Error(
      `Funksjonalitetsoversikten må oppdateres:\n${errors.join("\n")}`,
    );
}
