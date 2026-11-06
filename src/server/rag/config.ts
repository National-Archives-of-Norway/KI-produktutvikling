export function loadRagConfig(
  env: Record<string, string | undefined> = process.env,
) {
  const port = Number(env.RAG_PORT || 3001);
  const endpoint = new URL(env.OLLAMA_URL || "http://127.0.0.1:11434");
  if (
    !["127.0.0.1", "localhost", "[::1]"].includes(endpoint.hostname) ||
    endpoint.protocol !== "http:" ||
    endpoint.username ||
    endpoint.password
  )
    throw new Error(
      "Denne versjonen tillater bare Ollama på lokal loopback-adresse.",
    );
  if (!Number.isInteger(port) || port < 0 || port > 65535)
    throw new Error("Ugyldig RAG-port.");
  return { port, endpoint, model: env.OLLAMA_MODEL || undefined };
}
