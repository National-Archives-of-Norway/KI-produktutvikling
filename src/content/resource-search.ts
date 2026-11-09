import { resources, type Resource } from "./resources.ts";

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("nb")
    .trim();
}

export function findResources(query: string, type = "Alle"): Resource[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return resources.filter((resource) => {
    const searchable = normalize(
      [
        resource.title,
        resource.description,
        resource.type,
        ...(resource.keywords ?? []),
        resource.skill?.name ?? "",
      ].join(" "),
    );
    return (
      (type === "Alle" || resource.type === type) &&
      terms.every((term) => searchable.includes(term))
    );
  });
}
