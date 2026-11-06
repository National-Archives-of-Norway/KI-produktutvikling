"use client";
import { useEffect, useId, useRef } from "react";
import { useChat } from "../use-chat";
import { ChatComposer } from "./chat-composer";
import { ChatTranscript } from "./chat-transcript";
import { ChatWelcome } from "./chat-welcome";

export function RagAssistant({ compact = false }: { compact?: boolean }) {
  const inputId = useId();
  const chat = useChat();
  const latest = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chat.turns.length) latest.current?.scrollIntoView({ block: "nearest" });
  }, [chat.turns]);
  return (
    <div className={compact ? "rag-chat rag-chat-compact" : "rag-chat"}>
      <ChatWelcome
        showSuggestions={chat.turns.length === 0}
        onSelect={(question) => {
          chat.setQuestion(question);
          document.getElementById(inputId)?.focus();
        }}
      />
      <ChatTranscript turns={chat.turns} />
      <div ref={latest} />
      <p className="rag-status" role="status">
        {chat.busy
          ? "Arbeider med spørsmålet ditt."
          : chat.demo
            ? "Demo: kildesøk. Genererte svar krever servermiljø."
            : "Genererte svar krever en konfigurert lokal modell."}
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
