import { RagAssistant } from "@/features/rag/components/rag-assistant";
export const metadata = { title: "Spør kunnskapsbasen" };
export default function AskPage() {
  return (
    <article className="article">
      <div className="eyebrow">KUNNSKAPSASSISTENT · UTPRØVING</div>
      <h1>Spør kunnskapsbasen</h1>
      <p className="lead">
        Finn svar med utgangspunkt i portalens innhold og følg kildene tilbake
        til originalen.
      </p>
      <RagAssistant />
    </article>
  );
}
