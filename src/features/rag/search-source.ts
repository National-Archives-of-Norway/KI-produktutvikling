import type { RagSource } from "./contracts.ts";

// Interne indeksmetadata. Returneres aldri i RAG-svaret eller modellgrunnlaget.
export type SearchSource = RagSource & { keywords?: string[] };
