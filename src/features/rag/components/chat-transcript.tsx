import Link from "next/link";
import type { ChatTurn } from "../chat-state";
export function ChatTranscript({ turns }: { turns: ChatTurn[] }) {
  return (
    <div
      className="chat-transcript"
      role="log"
      aria-label="Spørsmål og svar"
      aria-live="polite"
      aria-relevant="additions text"
    >
      {turns.map((turn) => (
        <div className="chat-turn" key={turn.id}>
          <div className="chat-question">
            <span>Du</span>
            <p>{turn.question}</p>
          </div>
          <div className="chat-response">
            <span>Kunnskapsassistenten</span>
            {!turn.result && !turn.error && <p>Henter kilder …</p>}
            {turn.error && <p role="alert">{turn.error}</p>}
            {turn.result && (
              <>
                {turn.result.mode === "generated" ? (
                  <>
                    <p className="chat-mode">KI-generert svar</p>
                    <p className="rag-answer">{turn.result.answer}</p>
                    <small>
                      Kontroller svaret mot kildene. Hentede kilder er ikke en
                      automatisk faktasjekk.
                    </small>
                  </>
                ) : (
                  <>
                    <p className="chat-mode">Kildesøk · uten generert svar</p>
                    <p>
                      {turn.result.sources.length
                        ? "Her er relevante utdrag fra kunnskapsbasen:"
                        : "Jeg fant ikke relevante kilder. Prøv et spørsmål om kodegjennomgang, kontekst eller brukerbehov."}
                    </p>
                  </>
                )}
                {turn.result.sources.map((source, index) => (
                  <details className="chat-source" key={source.id}>
                    <summary>
                      [{index + 1}] {source.title}
                    </summary>
                    <p>{source.text}</p>
                    <Link href={source.href}>Åpne ressursen →</Link>
                  </details>
                ))}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
