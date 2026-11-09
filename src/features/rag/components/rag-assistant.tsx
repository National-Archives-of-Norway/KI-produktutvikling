"use client";
import { useId } from "react";
import { useChat } from "../use-chat";
import { ChatComposer } from "./chat-composer";
import { ChatTranscript } from "./chat-transcript";
import { ChatWelcome } from "./chat-welcome";

export function RagAssistant({ compact = false }: { compact?: boolean }) {
  const inputId = useId();
  const chat = useChat();
  return (
    <div className={compact ? "rag-chat rag-chat-compact" : "rag-chat"}>
      <ChatWelcome
        showSuggestions={chat.turns.length === 0}
        onSelect={(question) => {
          chat.setQuestion(question);
          document.getElementById(inputId)?.focus();
        }}
      />
      <ChatTranscript
        turns={chat.turns}
        onSelect={(question) => {
          chat.setQuestion(question);
          document.getElementById(inputId)?.focus();
        }}
      />
      <p className="rag-status" role="status">
        {chat.busy
          ? "Arbeider med spørsmålet ditt."
          : chat.demo
            ? "Veiledning fra portalens innhold. Ingen spørsmål sendes til en modell."
            : "Bruk kildene til å kontrollere veiledningen. Hvert spørsmål behandles separat."}
      </p>
      <ChatComposer
        inputId={inputId}
        question={chat.question}
        busy={chat.busy}
        validation={chat.validation}
        hasTurns={chat.turns.length > 0}
        onSubmit={chat.ask}
        onQuestionChange={chat.setQuestion}
        onClear={chat.clear}
      />
    </div>
  );
}
