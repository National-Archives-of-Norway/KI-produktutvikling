import { env as serverEnv } from "node:process";

export type RagConfig = { port: number } & (
  | { provider: "none" }
  | { provider: "ollama"; model: string; endpoint: URL }
  | {
      provider: "openai-compatible";
      model: string;
      endpoint: URL;
      apiKey: string;
    }
);

export function loadRagConfig(
  env: Record<string, string | undefined> = serverEnv,
): RagConfig {
  const port = Number(env.RAG_PORT || 3001);
  if (!Number.isInteger(port) || port < 0 || port > 65535)
    throw new Error("Ugyldig RAG-port.");
  const provider =
    env.MODEL_PROVIDER?.trim() ||
    (env.OLLAMA_MODEL?.trim() ? "ollama" : "none");
  if (provider === "none") return { port, provider };
  if (provider === "openai-compatible") {
    const model = env.MODEL_NAME?.trim();
    const apiKey = env.MODEL_API_KEY?.trim();
    if (!env.MODEL_API_URL?.trim() || !model || !apiKey)
      throw new Error(
        "Eksternt modell-API krever MODEL_API_URL, MODEL_NAME og MODEL_API_KEY på serveren.",
      );
    let endpoint: URL;
    try {
      endpoint = new URL(env.MODEL_API_URL.trim());
    } catch {
      throw new Error("Ugyldig MODEL_API_URL.");
    }
    if (
      endpoint.protocol !== "https:" ||
      endpoint.username ||
      endpoint.password ||
      endpoint.hash ||
      endpoint.search
    )
      throw new Error(
        "MODEL_API_URL må være en HTTPS-adresse uten brukernavn, passord, query eller fragment. Bruk MODEL_API_KEY for nøkkelen.",
      );
    if (/[\r\n]/.test(apiKey)) throw new Error("Ugyldig MODEL_API_KEY.");
    return { port, provider, model, endpoint, apiKey };
  }
  if (provider !== "ollama")
    throw new Error(
      "MODEL_PROVIDER må være none, ollama eller openai-compatible.",
    );
  const model = env.OLLAMA_MODEL?.trim();
  if (!model) throw new Error("Ollama krever OLLAMA_MODEL.");
  let endpoint: URL;
  try {
    endpoint = new URL(env.OLLAMA_URL || "http://127.0.0.1:11434");
  } catch {
    throw new Error("Ugyldig OLLAMA_URL.");
  }
  if (
    !["127.0.0.1", "localhost", "[::1]"].includes(endpoint.hostname) ||
    endpoint.protocol !== "http:" ||
    endpoint.username ||
    endpoint.password
  )
    throw new Error(
      "Denne versjonen tillater bare Ollama på lokal loopback-adresse.",
    );
  return { port, provider, endpoint, model };
}
