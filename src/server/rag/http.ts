import { createServer } from "node:http";
import {
  QUESTION_ERROR,
  validateQuestion,
} from "../../features/rag/contracts.ts";
import type { RagService } from "./service.ts";

const MAX_BODY = 8192;
const allowedOrigins = new Set([
  "http://127.0.0.1:3000",
  "http://localhost:3000",
]);
function json(status: number, body: unknown) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

// Web Request-grensen kan testes uten å åpne nettverksporter.
export async function handleRagRequest(
  req: Request,
  service: RagService,
): Promise<Response> {
  const path = new URL(req.url).pathname;
  if (path === "/health" && req.method === "GET")
    return json(200, {
      status: "ok",
      generationEnabled: service.generationEnabled,
    });
  if (path !== "/api/rag" || req.method !== "POST")
    return json(404, { error: "Ikke funnet." });
  const origin = req.headers.get("origin");
  if (origin && !allowedOrigins.has(origin))
    return json(403, { error: "Opprinnelsen er ikke tillatt." });
  if (!req.headers.get("content-type")?.startsWith("application/json"))
    return json(415, { error: "Forventer JSON." });
  try {
    const raw = await req.text();
    if (Buffer.byteLength(raw) > MAX_BODY)
      return json(413, { error: "Forespørselen er for stor." });
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return json(400, { error: "Ugyldig JSON." });
    }
    const question = validateQuestion(data?.question);
    if (!question) return json(400, { error: QUESTION_ERROR });
    const result = await service.ask(question);
    return json(result.status, result.body);
  } catch {
    return json(400, { error: "Forespørselen kunne ikke leses." });
  }
}

export function createRagHttpServer(service: RagService) {
  const server = createServer(async (req, res) => {
    try {
      let size = 0;
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        size += chunk.length;
        if (size > MAX_BODY) {
          res.writeHead(413, {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          });
          res.end(JSON.stringify({ error: "Forespørselen er for stor." }));
          return;
        }
        chunks.push(chunk);
      }
      const headers = new Headers();
      for (const name of ["origin", "content-type"]) {
        const value = req.headers[name];
        if (typeof value === "string") headers.set(name, value);
      }
      const method = req.method || "GET";
      const request = new Request(`http://127.0.0.1${req.url || "/"}`, {
        method,
        headers,
        ...(!["GET", "HEAD"].includes(method)
          ? { body: Buffer.concat(chunks).toString("utf8") }
          : {}),
      });
      const response = await handleRagRequest(request, service);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(await response.text());
    } catch {
      if (!res.headersSent) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forespørselen kunne ikke leses." }));
      }
    }
  });
  server.headersTimeout = 10000;
  server.requestTimeout = 15000;
  return server;
}
