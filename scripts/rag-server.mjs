import { pathToFileURL } from "node:url";
import { loadRagConfig } from "../src/server/rag/config.ts";
import { createConfiguredModel } from "../src/server/rag/provider.ts";
import { createRagService } from "../src/server/rag/service.ts";
import { createRagHttpServer } from "../src/server/rag/http.ts";

// Injisert konfigurasjon brukes av isolerte tester (port 0), aldri via miljøet.
export function startRagServer(config = loadRagConfig()) {
  const service = createRagService({
    model: createConfiguredModel(config),
    maxConcurrent: config.maxConcurrent,
  });
  const server = createRagHttpServer(service, config);
  server.listen(config.port, "127.0.0.1", () =>
    console.log(`RAG: http://127.0.0.1:${config.port} (${config.provider})`),
  );
  return server;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  startRagServer();
