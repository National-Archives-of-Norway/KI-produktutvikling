import { modelSignal, runWithSignal } from "./model.ts";
import type { ModelAdapter } from "./model.ts";
import { createModelMessages } from "./messages.ts";

// Imported only by the standalone RAG server, never by a client component.
export function createExternalAdapter(
  config: { endpoint: URL; model: string; apiKey: string; timeoutMs?: number },
  fetcher: typeof fetch = fetch,
): ModelAdapter {
  return {
    async generate(question, sources, signal) {
      try {
        const effectiveSignal = modelSignal(signal, config.timeoutMs);
        return await runWithSignal(effectiveSignal, async () => {
          const response = await fetcher(config.endpoint, {
            method: "POST",
            redirect: "error",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${config.apiKey}`,
            },
            signal: effectiveSignal,
            body: JSON.stringify({
              model: config.model,
              stream: false,
              messages: createModelMessages(question, sources),
            }),
          });
          // Never forward provider error bodies, headers or transport errors.
          if (!response.ok) throw new Error("model_error");
          const result = await response.json();
          const answer = result?.choices?.[0]?.message?.content;
          if (typeof answer !== "string" || !answer.trim())
            throw new Error("empty_answer");
          return answer.trim().slice(0, 12000);
        });
      } catch {
        throw new Error("model_error");
      }
    },
  };
}
