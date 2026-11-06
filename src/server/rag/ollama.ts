import type { ModelAdapter } from "./model.ts";
import { SYSTEM_PROMPT } from "./prompt.ts";

export function createOllamaAdapter(
  config: { model: string; endpoint: URL },
  fetcher: typeof fetch = fetch,
): ModelAdapter {
  return {
    async generate(question, sources) {
      const response = await fetcher(new URL("/api/chat", config.endpoint), {
        method: "POST",
        redirect: "error",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(60000),
        body: JSON.stringify({
          model: config.model,
          stream: false,
          options: { temperature: 0.1, num_predict: 700 },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: JSON.stringify({
                question,
                sources: sources.map((s, i) => ({
                  number: i + 1,
                  title: s.title,
                  excerpt: s.text,
                })),
              }),
            },
          ],
        }),
      });
      if (!response.ok) throw new Error("model_error");
      const result = await response.json();
      const answer = result?.message?.content;
      if (typeof answer !== "string" || !answer.trim())
        throw new Error("empty_answer");
      return answer.slice(0, 12000);
    },
  };
}
