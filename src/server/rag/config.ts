import { env as serverEnv } from "node:process";
import { parseRagPort } from "../../config/rag-port.ts";

export { RAG_TIMEOUTS } from "../../config/rag.ts";

export function validateConcurrency(value: number): number {
  if (!Number.isInteger(value) || value < 1 || value > 8)
    throw new Error("RAG_MAX_CONCURRENT må være et heltall fra 1 til 8.");
  return value;
}

export const DEFAULT_ALLOWED_ORIGINS = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
] as const;

function loadAllowedOrigins(value: string | undefined): string[] {
  if (value === undefined) return [...DEFAULT_ALLOWED_ORIGINS];
  return [
    ...new Set(
      value.split(",").map((entry) => {
        const origin = entry.trim();
        try {
          const url = new URL(origin);
          if (
            !/^https?:\/\/[^/?#\\]+\/?$/i.test(origin) ||
            /[\s*]/.test(origin) ||
            url.username ||
            url.password ||
            url.pathname !== "/" ||
            url.search ||
            url.hash
          )
            throw new Error();
          return url.origin;
        } catch {
          throw new Error(
            "Ugyldig RAG_ALLOWED_ORIGINS: forventer kommaseparerte HTTP(S)-origins uten sti, query, fragment, wildcard eller påloggingsinformasjon.",
          );
        }
      }),
    ),
  ];
}

export type RagConfig = {
  port: number;
  allowedOrigins: readonly string[];
  maxConcurrent: number;
} & (
  | { provider: "none" }
  | { provider: "ollama"; model: string; endpoint: URL; numThread?: number }
  | {
      provider: "openai-compatible";
      model: string;
      endpoint: URL;
      apiKey: string;
    }
);

function configuredValue(env: Record<string, string | undefined>, key: string) {
  const value = env[key];
  if (value !== undefined && !value.trim())
    throw new Error(
      `Ugyldig ${key}: verdien kan ikke være tom. Utelat variabelen for standardverdi.`,
    );
  return value;
}

export function loadRagConfig(
  env: Record<string, string | undefined> = serverEnv,
): RagConfig {
  const port = parseRagPort(env.RAG_PORT);
  const allowedOrigins = loadAllowedOrigins(
    configuredValue(env, "RAG_ALLOWED_ORIGINS"),
  );
  const maxConcurrent = validateConcurrency(
    Number(configuredValue(env, "RAG_MAX_CONCURRENT") ?? 1),
  );
  const provider =
    env.MODEL_PROVIDER?.trim() ||
    (env.OLLAMA_MODEL?.trim() ? "ollama" : "none");
  if (provider === "none")
    return { port, allowedOrigins, maxConcurrent, provider };
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
    return {
      port,
      allowedOrigins,
      maxConcurrent,
      provider,
      model,
      endpoint,
      apiKey,
    };
  }
  if (provider !== "ollama")
    throw new Error(
      "MODEL_PROVIDER må være none, ollama eller openai-compatible.",
    );
  const model = env.OLLAMA_MODEL?.trim();
  if (!model) throw new Error("Ollama krever OLLAMA_MODEL.");
  const rawThreads = configuredValue(env, "OLLAMA_NUM_THREAD");
  const numThread = rawThreads === undefined ? undefined : Number(rawThreads);
  if (
    numThread !== undefined &&
    (!Number.isInteger(numThread) || numThread < 1 || numThread > 64)
  )
    throw new Error(
      "Ugyldig OLLAMA_NUM_THREAD: forventer et heltall fra 1 til 64.",
    );
  let endpoint: URL;
  try {
    endpoint = new URL(env.OLLAMA_URL || "http://127.0.0.1:11434");
  } catch {
    throw new Error("Ugyldig OLLAMA_URL.");
  }
  const loopback = ["127.0.0.1", "localhost", "[::1]"].includes(
    endpoint.hostname,
  );
  // Kun den faste interne Compose-tjenesten. Ikke åpne for vilkårlige verter.
  const composeService =
    endpoint.hostname === "ollama" && endpoint.port === "11434";
  if (
    !(loopback || composeService) ||
    endpoint.protocol !== "http:" ||
    endpoint.username ||
    endpoint.password ||
    endpoint.pathname !== "/" ||
    endpoint.search ||
    endpoint.hash
  )
    throw new Error(
      "OLLAMA_URL må være en HTTP-loopback-adresse eller http://ollama:11434 uten sti, query, fragment eller påloggingsinformasjon.",
    );
  return {
    port,
    allowedOrigins,
    maxConcurrent,
    provider,
    endpoint,
    model,
    ...(numThread === undefined ? {} : { numThread }),
  };
}
