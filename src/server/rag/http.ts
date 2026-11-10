import { createServer } from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import {
  QUESTION_ERROR,
  validateQuestion,
} from "../../features/rag/contracts.ts";
import { DEFAULT_ALLOWED_ORIGINS } from "./config.ts";
import type { RagConfig } from "./config.ts";
import type { RagService } from "./service.ts";

const MAX_BODY = 8192;
type HttpConfig = Pick<RagConfig, "allowedOrigins">;
const defaultHttpConfig: HttpConfig = {
  allowedOrigins: DEFAULT_ALLOWED_ORIGINS,
};
function json(status: number, body: unknown) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...(status === 413 ? { Connection: "close" } : {}),
    },
  });
}
function tooLarge() {
  return json(413, { error: "Forespørselen er for stor." });
}
function internalError() {
  return json(500, { error: "Tjenesten kunne ikke svare akkurat nå." });
}
function exceedsLimit(contentLength: string | null | undefined) {
  return Boolean(
    contentLength &&
    /^\d+$/.test(contentLength) &&
    Number(contentLength) > MAX_BODY,
  );
}

// Web Request-grensen kan testes uten å åpne nettverksporter.
export async function handleRagRequest(
  req: Request,
  service: RagService,
  config: HttpConfig = defaultHttpConfig,
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
  if (origin && !config.allowedOrigins.includes(origin))
    return json(403, { error: "Opprinnelsen er ikke tillatt." });
  const mediaType = req.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();
  if (mediaType !== "application/json")
    return json(415, { error: "Forventer JSON." });
  if (exceedsLimit(req.headers.get("content-length"))) return tooLarge();
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return json(400, { error: "Forespørselen kunne ikke leses." });
  }
  if (Buffer.byteLength(raw) > MAX_BODY) return tooLarge();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return json(400, { error: "Ugyldig JSON." });
  }
  const question = validateQuestion(data?.question);
  if (!question) return json(400, { error: QUESTION_ERROR });
  try {
    const result = await service.ask(question);
    return json(result.status, result.body);
  } catch {
    return internalError();
  }
}

class BodyError extends Error {
  status: 400 | 413;
  constructor(status: 400 | 413) {
    super("Request body rejected");
    this.status = status;
  }
}

async function readBody(req: IncomingMessage): Promise<Buffer> {
  if (exceedsLimit(req.headers["content-length"])) throw new BodyError(413);
  let size = 0;
  const chunks: Buffer[] = [];
  try {
    // Vanlig for-await ødelegger strømmen ved tidlig retur. Her beholdes
    // forbindelsen til 413-svaret er sendt med Connection: close.
    for await (const chunk of req.iterator({ destroyOnReturn: false })) {
      size += chunk.length;
      if (size > MAX_BODY) throw new BodyError(413);
      chunks.push(chunk);
    }
  } catch (error) {
    if (error instanceof BodyError) throw error;
    throw new BodyError(400);
  }
  return Buffer.concat(chunks);
}

async function rejectTooLarge(
  req: IncomingMessage,
  res: ServerResponse,
  response: Response,
) {
  const payload = await response.text();
  res.shouldKeepAlive = false;
  res.writeHead(413, {
    ...Object.fromEntries(response.headers),
    "Content-Length": Buffer.byteLength(payload),
  });
  // Send avvisningen nå, men la pågående opplasting bli lest og forkastet
  // før Node lukker socketen. Umiddelbar end/destroy kan gi EPIPE/reset.
  res.write(payload);
  if (req.readableEnded || req.destroyed) {
    res.end();
    return;
  }
  const finish = () => {
    clearTimeout(deadline);
    req.off("end", finish);
    req.off("close", finish);
    res.off("close", finish);
    res.end();
  };
  // Ikke la en ufullstendig/endeløs opplasting holde forbindelsen åpen.
  const deadline = setTimeout(finish, 1000);
  deadline.unref();
  req.once("end", finish);
  req.once("close", finish);
  res.once("close", finish);
  req.on("error", () => {});
  req.resume();
}

export function createRagHttpServer(
  service: RagService,
  config: HttpConfig = defaultHttpConfig,
) {
  const server = createServer(async (req, res) => {
    let response: Response;
    try {
      const body = await readBody(req);
      const headers = new Headers();
      for (const name of ["origin", "content-type"]) {
        const value = req.headers[name];
        if (typeof value === "string") headers.set(name, value);
      }
      const method = req.method || "GET";
      let request: Request;
      try {
        request = new Request(`http://127.0.0.1${req.url || "/"}`, {
          method,
          headers,
          ...(!["GET", "HEAD"].includes(method)
            ? { body: body.toString("utf8") }
            : {}),
        });
      } catch {
        throw new BodyError(400);
      }
      response = await handleRagRequest(request, service, config);
    } catch (error) {
      response =
        error instanceof BodyError
          ? error.status === 413
            ? tooLarge()
            : json(400, { error: "Forespørselen kunne ikke leses." })
          : internalError();
    }
    if (res.destroyed) return;
    if (response.status === 413) {
      await rejectTooLarge(req, res, response);
      return;
    }
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.text());
  });
  server.headersTimeout = 10000;
  server.requestTimeout = 15000;
  return server;
}
