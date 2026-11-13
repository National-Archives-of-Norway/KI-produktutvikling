import { resources, type Resource } from "./resources.ts";
import type { SearchSource } from "../features/rag/search-source.ts";

export const catalogContent = {
  title: "Ressurskatalog",
  heading: "Finn en ressurs",
  description:
    "Skills, instruksjoner og prompter som hjelper deg å bruke KI i produktutviklingen.",
};

// Samme ressursdata som kortene. Ingen egen, manuelt vedlikeholdt skill-liste.
export function getSkillCatalogSource(
  items: readonly Resource[] = resources,
): SearchSource {
  const skills = items.filter((item) => item.type === "Skill");
  const packages = skills.filter((item) => item.skill).length;
  const summary = `${catalogContent.title}: ${skills.length} Skill-ressurser, ${packages} med registrert skill-pakke og ${skills.length - packages} eksempler uten registrert pakke.`;
  const entries = skills.map(
    (item) =>
      `${item.title}${item.skill ? ` (${item.skill.name})` : ""}: ${item.description} Status: Beta; ${item.skill ? "registrert skill-pakke" : "eksempel uten registrert skill-pakke"}.`,
  );
  return {
    id: "skills",
    title: "Skills i ressurskatalogen",
    href: "/#ressurser",
    keywords: ["skill"],
    text: [summary, ...entries].join("\n"),
    guide: { summary, steps: entries },
  };
}
