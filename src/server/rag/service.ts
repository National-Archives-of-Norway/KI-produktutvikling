import type { RagResponse, RagSource } from "../../features/rag/contracts.ts";
import { retrieve } from "../../features/rag/retrieval.ts";
import type { ModelAdapter } from "./model.ts";

export interface RagService {
  generationEnabled: boolean;
  ask(question: string): Promise<RagResponse>;
}
export function createRagService(
  options: {
    model?: ModelAdapter;
    search?: (question: string) => RagSource[];
  } = {},
): RagService {
  let busy = false;
  const search = options.search ?? retrieve;
  return {
    generationEnabled: Boolean(options.model),
    async ask(question) {
      const sources = search(question);
      if (!sources.length || !options.model)
        return {
          status: 200,
          body: {
            mode: "sources",
            sources,
            answer: null,
            reason: !sources.length ? "no_sources" : "no_model",
          },
        };
      if (busy)
        return {
          status: 429,
          body: {
            error: "Tjenesten svarer på et annet spørsmål. Prøv igjen om litt.",
          },
        };
      busy = true;
      try {
        return {
          status: 200,
          body: {
            mode: "generated",
            answer: await options.model.generate(question, sources),
            sources,
          },
        };
      } catch {
        return {
          status: 502,
          body: {
            error:
              "Modellen kunne ikke svare. Kontroller at Ollama kjører og at valgt modell er installert.",
            sources,
          },
        };
      } finally {
        busy = false;
      }
    },
  };
}
