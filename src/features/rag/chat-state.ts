import type { RagResult } from "./contracts.ts";
export type ChatTurn = {
  id: number;
  question: string;
  result?: RagResult;
  error?: string;
};
export type ChatState = { turns: ChatTurn[]; busy: boolean };
export const initialChatState: ChatState = { turns: [], busy: false };
export type ChatAction =
  | { type: "start"; id: number; question: string }
  | { type: "complete"; id: number; result?: RagResult; error?: string }
  | { type: "clear" };
export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "start":
      return state.busy
        ? state
        : {
            busy: true,
            turns: [
              ...state.turns.slice(-9),
              { id: action.id, question: action.question },
            ],
          };
    case "complete":
      return state.turns.some((turn) => turn.id === action.id)
        ? {
            busy: false,
            turns: state.turns.map((turn) =>
              turn.id === action.id
                ? { ...turn, result: action.result, error: action.error }
                : turn,
            ),
          }
        : state;
    case "clear":
      return state.busy ? state : initialChatState;
  }
}
