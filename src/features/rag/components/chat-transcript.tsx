"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { REQUEST_CANCELLED } from "../contracts";
import type { ChatTurn } from "../chat-state";
import { chatSuggestions } from "../suggestions";
import { AnswerContent } from "./answer-content";
export function ChatTranscript({
  turns,
  onSelect,
}: {
  turns: ChatTurn[];
  onSelect: (question: string) => void;
}) {
  const latest = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      latest.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [turns]);
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
          <div
            className="chat-response"
            ref={turn.id === turns.at(-1)?.id ? latest : undefined}
          >
            <span>Kunnskapsassistenten</span>
            {!turn.result && !turn.error && <p>Finner relevant veiledning …</p>}
            {turn.error && (
              <p role={turn.error === REQUEST_CANCELLED ? "status" : "alert"}>
                {turn.error}
              </p>
            )}
            {turn.result && (
              <>
                {turn.result.mode === "generated" ? (
                  <>
                    <p className="chat-mode">KI-generert svar</p>
                    <AnswerContent
                      text={turn.result.answer}
                      sources={turn.result.sources}
                    />
                    <small>
                      Kontroller svaret mot kildene. Hentede kilder er ikke en
                      automatisk faktasjekk.
                    </small>
                  </>
                ) : (
                  <>
                    <p className="chat-mode">
                      Veiledning fra portalen · uten språkmodell
                    </p>
                    {turn.result.sources.length ? (
                      <>
                        <p className="chat-answer-title">
                          {turn.result.sources[0].title}
                        </p>
                        <p>
                          {turn.result.sources[0].guide?.summary ??
                            turn.result.sources[0].text.split("\n")[0]}
                        </p>
                        {!!turn.result.sources[0].guide?.steps.length && (
                          <>
                            <p>
                              <strong>Slik går du frem</strong>
                            </p>
                            <ol className="chat-steps">
                              {turn.result.sources[0].guide.steps.map(
                                (step) => (
                                  <li key={step}>{step}</li>
                                ),
                              )}
                            </ol>
                          </>
                        )}
                        {turn.result.sources[0].guide?.note && (
                          <p className="chat-note">
                            {turn.result.sources[0].guide.note}
                          </p>
                        )}
                        <Link
                          className="chat-primary-source"
                          href={turn.result.sources[0].href}
                        >
                          Les hele veiledningen →
                        </Link>
                        <small className="chat-answer-note">
                          Dette er hentet fra den mest relevante siden, ikke et
                          fritt formulert svar på spørsmålet ditt.
                        </small>
                      </>
                    ) : (
                      <>
                        <p>
                          Jeg finner ikke grunnlag for å svare på dette i
                          portalen ennå.
                        </p>
                        <p>
                          Prøv et av temaene nedenfor, eller skriv mer konkret
                          hva du ønsker hjelp med.
                        </p>
                      </>
                    )}
                  </>
                )}
                {turn.result.sources.length > 0 && (
                  <p className="chat-sources-label">
                    {turn.result.mode === "generated"
                      ? "Kilder til svaret"
                      : "Kilder og mer lesing"}
                  </p>
                )}
                {turn.result.sources.map((source, index) => (
                  <details className="chat-source" key={source.id}>
                    <summary>
                      [{index + 1}] {source.title}
                    </summary>
                    <p>{source.guide?.summary ?? source.text.split("\n")[0]}</p>
                    <Link href={source.href}>Åpne kilden →</Link>
                  </details>
                ))}
                {turn.id === turns.at(-1)?.id && (
                  <div
                    className="chat-next-topics"
                    role="group"
                    aria-label="Utforsk et nytt spørsmål"
                  >
                    <p>Du kan også spørre om</p>
                    {chatSuggestions.followUp
                      .filter(({ question }) => question !== turn.question)
                      .map(({ question }) => (
                        <button
                          key={question}
                          type="button"
                          onClick={() => onSelect(question)}
                        >
                          {question}
                        </button>
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
