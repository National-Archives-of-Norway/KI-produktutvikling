"use client";
import { chatSuggestions } from "../suggestions";
import Button from "@mui/material/Button";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
export function ChatWelcome({
  showSuggestions,
  onSelect,
}: {
  showSuggestions: boolean;
  onSelect: (question: string) => void;
}) {
  return (
    <>
      <div className="chat-welcome">
        <span className="chat-eyebrow">UTFORSK KUNNSKAPEN</span>
        <strong>Hei! Hva vil du utforske?</strong>
        <p>
          Få hjelp til tilgjengelighet, kodegjennomgang og gode KI-instrukser.
          Jeg finner også informasjon om KI-prat og utkastet til retningslinjer.
        </p>
        <small>
          Du får konkrete steg og lenker til kildene. Hvert spørsmål behandles
          separat.
        </small>
      </div>
      {showSuggestions && (
        <div
          className="chat-suggestions"
          role="group"
          aria-label="Forslag til spørsmål"
        >
          {chatSuggestions.welcome.map(({ question }) => (
            <Button
              key={question}
              type="button"
              onClick={() => {
                onSelect(question);
              }}
              endIcon={<ArrowOutwardRounded />}
              sx={{
                justifyContent: "space-between",
                textAlign: "left",
                textTransform: "none",
                minHeight: 44,
                fontSize: 14,
              }}
            >
              {question}
            </Button>
          ))}
        </div>
      )}
    </>
  );
}
