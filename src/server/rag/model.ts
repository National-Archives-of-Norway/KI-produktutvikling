import type { RagSource } from "../../features/rag/contracts.ts";
export interface ModelAdapter {
  generate(question: string, sources: RagSource[]): Promise<string>;
}
