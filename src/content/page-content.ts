export type ContentBlock =
  | { id: string; type: "heading" | "paragraph" | "note"; text: string }
  | { id: string; type: "list"; items: string[] };

export type ContentPage = {
  id: string;
  href: string;
  navTitle: string;
  title: string;
  eyebrow: string;
  lead: string;
  blocks: ContentBlock[];
};

// The only inline markup in authored content is [label](URL).
export function plainContent(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

export function blockText(block: ContentBlock): string {
  return block.type === "list"
    ? block.items.map(plainContent).join("\n")
    : plainContent(block.text);
}
