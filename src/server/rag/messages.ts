import type { RagSource } from "../../features/rag/contracts.ts";
import { modelSources } from "./context.ts";
import { SYSTEM_PROMPT } from "./prompt.ts";

export function createModelMessages(question: string, sources: RagSource[]) {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: JSON.stringify({
        question,
        sources: modelSources(question, sources),
      }),
    },
  ];
}
