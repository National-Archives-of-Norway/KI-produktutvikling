import { REQUEST_CANCELLED } from "./contracts.ts";
import type { RagResult } from "./contracts.ts";
export type ChatTurn = {
  id: number;
  question: string;
  result?: RagResult;
  error?: string;
};
export type ChatState = {
  turns: ChatTurn[];
  busy: boolean;
  activeId: number | null;
};
export const initialChatState: ChatState = {
  turns: [],
  busy: false,
  activeId: null,
};
export type ChatAction =
  | { type: "start"; id: number; question: string }
  | { type: "complete"; id: number; result?: RagResult; error?: string }
  | { type: "cancel"; id: number }
  | { type: "clear" };
export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "start":
      return state.busy
        ? state
        : {
            busy: true,
            activeId: action.id,
            turns: [
              ...state.turns.slice(-9),
              { id: action.id, question: action.question },
            ],
          };
    case "complete":
      return state.busy && state.activeId === action.id
        ? {
            busy: false,
            activeId: null,
            turns: state.turns.map((turn) =>
              turn.id === action.id
                ? { ...turn, result: action.result, error: action.error }
                : turn,
            ),
          }
        : state;
    case "cancel":
      return state.busy && state.activeId === action.id
        ? {
            ...state,
            busy: false,
            activeId: null,
            turns: state.turns.map((turn) =>
              turn.id === action.id
                ? { ...turn, result: undefined, error: REQUEST_CANCELLED }
                : turn,
            ),
          }
        : state;
    case "clear":
      return state.busy ? state : initialChatState;
  }
}
