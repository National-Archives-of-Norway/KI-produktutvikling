"use client";
import { useReducer, useRef, useState } from "react";
import { chatReducer, initialChatState } from "./chat-state";
import { QUESTION_ERROR, validateQuestion } from "./contracts";
import { requestAnswer } from "./client";

export function useChat() {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const [question, setQuestion] = useState("");
  const [validation, setValidation] = useState("");
  const pending = useRef(false);
  const nextId = useRef(0);
  const demo = process.env.NEXT_PUBLIC_STATIC_DEMO === "true";
  async function ask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const text = validateQuestion(question);
    if (!text) {
      setValidation(QUESTION_ERROR);
      return;
    }
    pending.current = true;
    setValidation("");
    setQuestion("");
    const id = ++nextId.current;
    dispatch({ type: "start", id, question: text });
    try {
      dispatch({
        type: "complete",
        id,
        ...(await requestAnswer(text, { demo })),
      });
    } finally {
      pending.current = false;
    }
  }
  function clear() {
    if (!pending.current) {
      dispatch({ type: "clear" });
      setValidation("");
    }
  }
  return { ...state, question, setQuestion, validation, demo, ask, clear };
}
