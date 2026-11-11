import { modelSignal, runWithSignal } from "./model.ts";
import type { ModelAdapter } from "./model.ts";
import { createModelMessages } from "./messages.ts";

export function createOllamaAdapter(
  config: { model: string; endpoint: URL; timeoutMs?: number },
  fetcher: typeof fetch = fetch,
): ModelAdapter {
  return {
    async generate(question, sources, signal) {
      const effectiveSignal = modelSignal(signal, config.timeoutMs);
      return runWithSignal(effectiveSignal, async () => {
        const response = await fetcher(new URL("/api/chat", config.endpoint), {
          method: "POST",
          redirect: "error",
          headers: { "Content-Type": "application/json" },
          signal: effectiveSignal,
          body: JSON.stringify({
            model: config.model,
            stream: false,
            options: { temperature: 0.1, num_predict: 700 },
            messages: createModelMessages(question, sources),
          }),
        });
        if (!response.ok) throw new Error("model_error");
        const result = await response.json();
        const answer = result?.message?.content;
        if (typeof answer !== "string" || !answer.trim())
          throw new Error("empty_answer");
        return answer.trim().slice(0, 12000);
      });
    },
  };
}
