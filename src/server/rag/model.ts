import type { RagSource } from "../../features/rag/contracts.ts";
import { RAG_TIMEOUTS } from "../../config/rag.ts";

export interface ModelAdapter {
  generate(
    question: string,
    sources: RagSource[],
    signal?: AbortSignal,
  ): Promise<string>;
}
export function modelSignal(
  signal?: AbortSignal,
  timeoutMs: number = RAG_TIMEOUTS.modelMs,
) {
  const deadline = AbortSignal.timeout(timeoutMs);
  return AbortSignal.any(signal ? [signal, deadline] : [deadline]);
}

// Avgrens også ventingen dersom en defekt adapter/transport ignorerer signalet.
// Begge Promise-grener observeres, slik at et sent svar/avslag ikke lekker.
export function runWithSignal<T>(
  signal: AbortSignal,
  run: () => Promise<T>,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const cleanup = () => signal.removeEventListener("abort", abort);
    const abort = () => {
      cleanup();
      reject(signal.reason);
    };
    if (signal.aborted) {
      abort();
      return;
    }
    signal.addEventListener("abort", abort, { once: true });
    try {
      run().then(
        (value) => {
          cleanup();
          resolve(value);
        },
        (error) => {
          cleanup();
          reject(error);
        },
      );
    } catch (error) {
      cleanup();
      reject(error);
    }
  });
}
