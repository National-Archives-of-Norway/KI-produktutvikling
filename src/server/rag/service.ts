import type { RagResponse, RagSource } from "../../features/rag/contracts.ts";
import { retrieve } from "../../features/rag/retrieval.ts";
import { modelSignal, runWithSignal } from "./model.ts";
import type { ModelAdapter } from "./model.ts";
import { validateConcurrency } from "./config.ts";

export interface RagService {
  generationEnabled: boolean;
  ask(question: string, signal?: AbortSignal): Promise<RagResponse>;
}
export function createRagService(
  options: {
    model?: ModelAdapter;
    maxConcurrent?: number;
    modelTimeoutMs?: number;
    search?: (question: string) => RagSource[];
  } = {},
): RagService {
  const maxConcurrent = validateConcurrency(options.maxConcurrent ?? 1);
  let active = 0;
  const search = options.search ?? retrieve;
  return {
    generationEnabled: Boolean(options.model),
    async ask(question, signal) {
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
      if (active >= maxConcurrent)
        return {
          status: 429,
          body: {
            error: "Tjenesten har nådd kapasitetsgrensen. Prøv igjen om litt.",
            sources,
          },
        };
      const effectiveSignal = modelSignal(signal, options.modelTimeoutMs);
      active += 1;
      try {
        return {
          status: 200,
          body: {
            mode: "generated",
            answer: await runWithSignal(effectiveSignal, () =>
              options.model!.generate(question, sources, effectiveSignal),
            ),
            sources,
          },
        };
      } catch {
        return {
          status: 502,
          body: {
            error:
              "Modelltjenesten kunne ikke svare akkurat nå. Du kan fortsatt lese veiledningen og kildene nedenfor.",
            sources,
          },
        };
      } finally {
        active -= 1;
      }
    },
  };
}
