import { test } from "node:test";
import assert from "node:assert/strict";
import {
  chatReducer,
  initialChatState,
} from "../src/features/rag/chat-state.ts";
import { requestAnswer } from "../src/features/rag/client.ts";
import { corpus } from "../src/features/rag/retrieval.ts";

test("samtalen blokkerer doble innsendinger og bevarer historikk", () => {
  const started = chatReducer(initialChatState, {
    type: "start",
    id: 1,
    question: "tester",
  });
  assert.equal(
    chatReducer(started, { type: "start", id: 2, question: "duplikat" }),
    started,
  );
  assert.equal(chatReducer(started, { type: "clear" }), started);
  const done = chatReducer(started, {
    type: "complete",
    id: 1,
    error: "Modellfeil",
  });
  assert.equal(done.busy, false);
  assert.equal(done.turns[0].question, "tester");
  assert.equal(done.turns[0].error, "Modellfeil");
  assert.deepEqual(chatReducer(done, { type: "clear" }), initialChatState);
});
test("historikken begrenses til ti og ukjente svar endrer ikke tilstanden", () => {
  let state = initialChatState;
  for (let id = 1; id <= 12; id++) {
    state = chatReducer(state, {
      type: "start",
      id,
      question: `spørsmål ${id}`,
    });
    state = chatReducer(state, { type: "complete", id });
  }
  assert.equal(state.turns.length, 10);
  assert.equal(state.turns[0].id, 3);
  assert.equal(
    chatReducer(state, { type: "complete", id: 99, error: "sent svar" }),
    state,
  );
});
test("Pages-demo sender aldri spørsmål til et API", async () => {
  const result = await requestAnswer("kodeendring tester", {
    demo: true,
    fetcher: async () => {
      throw new Error("skal ikke kalles");
    },
  });
  assert.equal(result.result?.mode, "sources");
  assert.equal(result.result?.sources[0].id, "kodegjennomgang");
});
test("modellfeil bevarer kildeutdrag", async () => {
  const outcome = await requestAnswer("tester", {
    demo: false,
    fetcher: async () =>
      Response.json({ error: "Modellfeil", sources: corpus }, { status: 502 }),
  });
  assert.equal(outcome.error, "Modellfeil");
  assert.equal(outcome.result?.mode, "sources");
});
test("nettverksfeil og ugyldig API-format vises som feil, ikke svar", async () => {
  for (const fetcher of [
    async () => {
      throw new Error("fetch failed");
    },
    async () => Response.json({ mode: "generated", answer: "uten kilder" }),
  ]) {
    const outcome = await requestAnswer("tester", { demo: false, fetcher });
    assert.ok(outcome.error);
    assert.equal(outcome.result, undefined);
  }
});
