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
      const messages = createModelMessages(question, sources);
      // Den publiserte Qwen3-templaten ga tenketekst med think=false.
      // Strukturerte svar avgrenser innholdet; bare validert answer vises.
      const structured = /^qwen3(?::|$)/i.test(config.model);
      if (structured)
        messages[0].content +=
          " Returner bare JSON med feltet answer. answer skal være det ferdige norske svaret, uten analyse eller arbeidsnotater. Ta alltid med minst én henvisning til vedlagte kildenummer i answer, for eksempel [1].";
      return runWithSignal(effectiveSignal, async () => {
        const response = await fetcher(new URL("/api/chat", config.endpoint), {
          method: "POST",
          redirect: "error",
          headers: { "Content-Type": "application/json" },
          signal: effectiveSignal,
          body: JSON.stringify({
            model: config.model,
            stream: false,
            // Kildebasert kortsvar: Qwen3 skal bruke tokenbudsjettet på svaret,
            // ikke en separat tenkestrøm som ikke vises i portalen.
            think: false,
            ...(structured
              ? {
                  format: {
                    type: "object",
                    properties: {
                      answer: {
                        type: "string",
                        description:
                          "Ferdig norsk svar med kildereferanser [1], uten analyse.",
                      },
                    },
                    required: ["answer"],
                    additionalProperties: false,
                  },
                }
              : {}),
            options: { temperature: 0.1, num_predict: 700, num_ctx: 8192 },
            messages,
          }),
        });
        if (!response.ok) throw new Error("model_error");
        const result = await response.json();
        if (result?.done_reason === "length")
          throw new Error("incomplete_answer");
        let answer = result?.message?.content;
        if (structured) {
          const parsed = JSON.parse(answer);
          if (
            !parsed ||
            Array.isArray(parsed) ||
            Object.keys(parsed).length !== 1
          )
            throw new Error("invalid_answer");
          answer = parsed.answer;
        }
        if (typeof answer !== "string" || !answer.trim())
          throw new Error("empty_answer");
        return answer.trim().slice(0, 12000);
      });
    },
  };
}
