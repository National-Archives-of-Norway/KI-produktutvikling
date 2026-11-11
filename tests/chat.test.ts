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

test("serverbygg med demo deaktivert laster ikke demo og gjør ikke feil API-kall", async () => {
  const previous = process.env.NEXT_PUBLIC_STATIC_DEMO;
  process.env.NEXT_PUBLIC_STATIC_DEMO = "false";
  try {
    const result = await requestAnswer("test", {
      demo: true,
      fetcher: async () => {
        throw new Error("skal ikke kalles");
      },
    });
    assert.match(result.error!, /ikke aktivert/);
    assert.equal(result.result, undefined);
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_STATIC_DEMO;
    else process.env.NEXT_PUBLIC_STATIC_DEMO = previous;
  }
});

test("avbrudd frigjør turen, og sent svar kan ikke overskrive ny innsending", () => {
  let state = chatReducer(initialChatState, {
    type: "start",
    id: 1,
    question: "første",
  });
  state = chatReducer(state, { type: "cancel", id: 1 });
  assert.equal(state.busy, false);
  assert.equal(state.activeId, null);
  assert.equal(state.turns[0].error, "Forespørselen ble avbrutt.");
  assert.equal(chatReducer(state, { type: "complete", id: 1 }), state);
  state = chatReducer(state, {
    type: "start",
    id: 2,
    question: "nytt spørsmål",
  });
  assert.equal(state.busy, true);
  assert.equal(state.activeId, 2);
  assert.equal(chatReducer(state, { type: "cancel", id: 1 }), state);
  assert.equal(
    chatReducer(state, { type: "complete", id: 1, error: "gammel feil" }),
    state,
  );
  state = chatReducer(state, {
    type: "complete",
    id: 2,
    result: { mode: "sources", sources: [], answer: null },
  });
  assert.equal(state.busy, false);
  assert.ok(state.turns[1].result);
  assert.equal(state.turns[0].error, "Forespørselen ble avbrutt.");
});

test("klientavbrudd gir riktig melding og et nytt signal kan sende igjen", async () => {
  const controller = new AbortController();
  let observed: AbortSignal | null = null;
  const pending = requestAnswer("første", {
    demo: false,
    signal: controller.signal,
    fetcher: async (_url, init) =>
      new Promise((_resolve, reject) => {
        observed = init!.signal as AbortSignal;
        observed.addEventListener("abort", () => reject(observed!.reason), {
          once: true,
        });
      }),
  });
  controller.abort();
  assert.equal((observed as AbortSignal | null)?.aborted, true);
  assert.deepEqual(await pending, { error: "Forespørselen ble avbrutt." });
  const next = await requestAnswer("neste", {
    demo: false,
    signal: new AbortController().signal,
    fetcher: async () =>
      Response.json({ mode: "sources", sources: [], answer: null }),
  });
  assert.equal(next.error, undefined);
  assert.equal(next.result?.mode, "sources");
});

test("allerede avbrutt klient gjør ikke fetch, og sen transport kan ikke gi et svar", async () => {
  const controller = new AbortController();
  controller.abort();
  let fetchCalls = 0;
  assert.deepEqual(
    await requestAnswer("test", {
      demo: false,
      signal: controller.signal,
      fetcher: async () => {
        fetchCalls++;
        throw new Error("skal ikke kalles");
      },
    }),
    { error: "Forespørselen ble avbrutt." },
  );
  assert.equal(fetchCalls, 0);
  const during = new AbortController();
  const late = await requestAnswer("test", {
    demo: false,
    signal: during.signal,
    fetcher: async () => {
      during.abort();
      return Response.json({ mode: "sources", sources: [], answer: null });
    },
  });
  assert.deepEqual(late, { error: "Forespørselen ble avbrutt." });
});
