import type { RagConfig } from "./config.ts";
import type { ModelAdapter } from "./model.ts";
import { createExternalAdapter } from "./external.ts";
import { createOllamaAdapter } from "./ollama.ts";

export function createConfiguredModel(
  config: RagConfig,
  fetcher: typeof fetch = fetch,
): ModelAdapter | undefined {
  if (config.provider === "none") return undefined;
  return config.provider === "ollama"
    ? createOllamaAdapter(config, fetcher)
    : createExternalAdapter(config, fetcher);
}
