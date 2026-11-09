import { resources } from "./resources.ts";

export const homeContent = {
  quickLinks: [
    { label: "01 / LÆR", title: "Kom i gang med KI", href: "/kom-i-gang/" },
    {
      label: "02 / PRØV",
      title: "Finn en ressurs til oppgaven",
      href: "/#ressurser",
    },
    {
      label: "03 / DEL",
      title: "Del erfaringer i KI-prat",
      href: "/om/#ki-prat",
    },
  ],
  recommendation: {
    slug: "brukerbehov",
    label: "PRØV I PRAKSIS",
    action: "Se oppgaven",
  },
};

// Only the editorial choice lives here; title and description stay in resources.ts.
export function getRecommendedResource() {
  const resource = resources.find(
    (item) => item.slug === homeContent.recommendation.slug,
  );
  if (!resource)
    throw new Error(
      "Forsidens anbefalte ressurs finnes ikke i ressurskatalogen.",
    );
  return resource;
}
