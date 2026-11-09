import type { RagSource } from "../../features/rag/contracts.ts";
import { SYSTEM_PROMPT } from "./prompt.ts";

export function createModelMessages(question: string, sources: RagSource[]) {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: JSON.stringify({
        question,
        sources: sources.map((source, index) => ({
          number: index + 1,
          title: source.title,
          excerpt: source.text,
        })),
      }),
    },
  ];
}
