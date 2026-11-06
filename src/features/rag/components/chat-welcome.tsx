"use client";
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
          Jeg finner innhold om kodegjennomgang, gode instrukser og brukerbehov.
        </p>
        <small>
          Foreløpig brukes tre offentlige eksempelressurser. Hvert spørsmål
          søkes separat.
        </small>
      </div>
      {showSuggestions && (
        <div
          className="chat-suggestions"
          role="group"
          aria-label="Forslag til spørsmål"
        >
          {[
            "Hvordan gjennomgår jeg en kodeendring?",
            "Hvordan gir jeg KI god kontekst?",
            "Hvordan utforsker jeg brukerbehov?",
          ].map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              onClick={() => {
                onSelect(suggestion);
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
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </>
  );
}
