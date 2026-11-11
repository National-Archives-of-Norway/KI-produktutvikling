import assert from "node:assert/strict";
import { test } from "node:test";
import {
  beginRequest,
  finishRequest,
  cancelRequest,
  type RequestSlot,
} from "../src/features/rag/request-control.ts";
import {
  prepareQuestionInput,
  questionInputFeedback,
} from "../src/features/rag/question-input.ts";

test("aktiv AbortController avbrytes og en gammel finally frigjør ikke den nye", () => {
  const slot: RequestSlot = { current: null };
  const first = beginRequest(slot, 1)!;
  assert.equal(beginRequest(slot, 2), null);
  assert.equal(cancelRequest(slot), 1);
  assert.equal(first.controller.signal.aborted, true);
  assert.equal(cancelRequest(slot), null);
  const next = beginRequest(slot, 2)!;
  assert.equal(finishRequest(slot, first), false);
  assert.equal(slot.current, next);
  assert.equal(next.controller.signal.aborted, false);
  assert.equal(finishRequest(slot, next), true);
  assert.equal(slot.current, null);
});

test("kuttet innliming får melding og teller, uten å splitte grafemer", () => {
  const emoji = "👨‍👩‍👧‍👦";
  const edit = prepareQuestionInput(emoji.repeat(1001));
  assert.equal(edit.value, emoji.repeat(1000));
  assert.equal(edit.truncated, true);
  assert.match(
    questionInputFeedback(edit.value, edit.truncated),
    /ble kuttet til 1000 tegn/,
  );
  assert.match(
    questionInputFeedback(edit.value, edit.truncated),
    /1000 av 1000/,
  );
  assert.equal(prepareQuestionInput(emoji.repeat(1000)).truncated, false);
});

test("teller kommer ved 90 prosent, og gammel kuttemelding skjules når feltet tømmes", () => {
  assert.equal(questionInputFeedback("x".repeat(899), false), "");
  assert.equal(
    questionInputFeedback("x".repeat(900), false),
    "900 av 1000 tegn.",
  );
  assert.equal(
    questionInputFeedback("x".repeat(999), true),
    "999 av 1000 tegn.",
  );
  assert.equal(questionInputFeedback("", true), "");
});
