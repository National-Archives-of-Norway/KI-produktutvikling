import {
  isResult,
  isSources,
  type RagRequest,
  type RagResult,
} from "./contracts.ts";
import { RAG_TIMEOUTS } from "../../config/rag.ts";

export type AnswerOutcome = { result?: RagResult; error?: string };
export async function requestAnswer(
  question: string,
  options: { demo: boolean; fetcher?: typeof fetch; signal?: AbortSignal },
): Promise<AnswerOutcome> {
  if (options.demo) {
    // Next erstatter dette med en byggkonstant. Serverbygget skal ikke engang
    // sende demoens retrieval-chunk; Node-testene uten byggvariabel kan prøve demo.
    try {
      if (process.env.NEXT_PUBLIC_STATIC_DEMO !== "false") {
        const { retrieve } = await import("./retrieval.ts");
        return {
          result: {
            mode: "sources",
            sources: retrieve(question),
            answer: null,
            reason: "static_demo",
          },
        };
      }
      return { error: "Statisk demo er ikke aktivert i dette bygget." };
    } catch {
      return {
        error: "Demokildene kunne ikke lastes. Prøv å laste siden på nytt.",
      };
    }
  }

  try {
    const body: RagRequest = { question };
    const response = await (options.fetcher ?? fetch)("/api/rag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.any([
        AbortSignal.timeout(RAG_TIMEOUTS.clientMs),
        ...(options.signal ? [options.signal] : []),
      ]),
    });
    let data;
    try {
      data = await response.json();
    } catch (error) {
      if (
        options.signal?.aborted ||
        (error instanceof Error &&
          ["AbortError", "TimeoutError"].includes(error.name))
      )
        throw error;
      return {
        error:
          "Tjenesten eller mellomtjeneren returnerte et uventet svarformat (forventet JSON). Prøv igjen om litt.",
      };
    }
    const fallback = isSources(data?.sources)
      ? {
          result: {
            mode: "sources",
            sources: data.sources,
            answer: null,
          } as RagResult,
        }
      : {};
    if (!response.ok)
      return {
        error:
          typeof data?.error === "string"
            ? data.error
            : "Tjenesten kunne ikke svare.",
        ...fallback,
      };
    if (!isResult(data))
      return {
        error: "Tjenesten returnerte et uventet svarformat.",
        ...fallback,
      };
    return { result: data };
  } catch (error) {
    if (options.signal?.aborted) return { error: "Forespørselen ble avbrutt." };
    if (error instanceof Error && error.name === "TimeoutError")
      return {
        error: "Kunnskapstjenesten brukte for lang tid. Prøv igjen om litt.",
      };
    return {
      error:
        "Kunnskapstjenesten er utilgjengelig akkurat nå. Prøv igjen om litt.",
    };
  }
}
