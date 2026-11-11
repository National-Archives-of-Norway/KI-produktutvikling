"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import { chatReducer, initialChatState } from "./chat-state";
import { QUESTION_ERROR, validateQuestion } from "./contracts";
import { requestAnswer } from "./client";
import {
  beginRequest,
  finishRequest,
  cancelRequest,
  type PendingRequest,
} from "./request-control";

export function useChat() {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const [question, setQuestion] = useState("");
  const [validation, setValidation] = useState("");
  const nextId = useRef(0);
  const controller = useRef<PendingRequest | null>(null);
  useEffect(
    () => () => {
      cancelRequest(controller);
    },
    [],
  );
  const demo = process.env.NEXT_PUBLIC_STATIC_DEMO === "true";
  async function ask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (controller.current) return;
    const text = validateQuestion(question);
    if (!text) {
      setValidation(QUESTION_ERROR);
      return;
    }
    const id = ++nextId.current;
    const request = beginRequest(controller, id);
    if (!request) return;
    setValidation("");
    setQuestion("");
    dispatch({ type: "start", id, question: text });
    try {
      const outcome = await requestAnswer(text, {
        demo,
        signal: request.controller.signal,
      });
      if (finishRequest(controller, request))
        dispatch({ type: "complete", id, ...outcome });
    } finally {
      finishRequest(controller, request);
    }
  }
  function cancel() {
    const id = cancelRequest(controller);
    if (id !== null) dispatch({ type: "cancel", id });
  }

  function clear() {
    if (!controller.current) {
      dispatch({ type: "clear" });
      setValidation("");
    }
  }
  return {
    ...state,
    question,
    setQuestion,
    validation,
    demo,
    ask,
    clear,
    cancel,
  };
}
