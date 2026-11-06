import { pathToFileURL } from "node:url";
import { loadRagConfig } from "../src/server/rag/config.ts";
import { createOllamaAdapter } from "../src/server/rag/ollama.ts";
import { createRagService } from "../src/server/rag/service.ts";
import { createRagHttpServer } from "../src/server/rag/http.ts";

export function startRagServer() {
  const config = loadRagConfig();
  const service = createRagService({
    model: config.model
      ? createOllamaAdapter({ model: config.model, endpoint: config.endpoint })
      : undefined,
  });
  const server = createRagHttpServer(service);
  server.listen(config.port, "127.0.0.1", () =>
    console.log(
      `RAG: http://127.0.0.1:${config.port} (${config.model ? "lokal modell konfigurert" : "kildesøk uten modell"})`,
    ),
  );
  return server;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  startRagServer();
