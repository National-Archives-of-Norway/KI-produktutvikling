import { test } from "node:test";
import assert from "node:assert/strict";
import {
  shouldIgnoreSend,
  focusTargetAfterRequest,
  restoreFocusAfterRequest,
} from "../src/features/rag/composer-focus.ts";
import {
  beginRequest,
  cancelRequest,
  type RequestSlot,
} from "../src/features/rag/request-control.ts";

const elements = { send: {}, body: {}, input: {} };
test("fokus på Send eller body returnerer til feltet etter avslutning", () => {
  assert.equal(
    focusTargetAfterRequest(elements.send, elements),
    elements.input,
  );
  assert.equal(
    focusTargetAfterRequest(elements.body, elements),
    elements.input,
  );
});
test("fokus stjeles ikke fra felt, Avbryt eller annen kontroll", () => {
  for (const active of [elements.input, {}, null])
    assert.equal(focusTargetAfterRequest(active, elements), null);
});
test("manglende Send-/feltreferanse gir ingen utilsiktet fokusflytting", () => {
  assert.equal(
    focusTargetAfterRequest(null, { ...elements, send: null }),
    null,
  );
  assert.equal(
    focusTargetAfterRequest(elements.body, { ...elements, input: null }),
    null,
  );
});
for (const interaction of ["dobbel Enter", "dobbeltklikk"]) {
  test(`${interaction} ignoreres under venting og avbryter ikke`, () => {
    const slot: RequestSlot = { current: null };
    assert.equal(shouldIgnoreSend(false), false);
    const request = beginRequest(slot, 1)!;
    let prevented = 0;
    for (let click = 0; click < 2; click++) {
      if (shouldIgnoreSend(true)) {
        prevented++;
        continue;
      }
      // Samme reservesperre som useChat.ask, selv før busy har rendret.
      beginRequest(slot, 2);
    }
    assert.equal(prevented, 2);
    assert.equal(slot.current, request);
    assert.equal(request.controller.signal.aborted, false);
    assert.equal(beginRequest(slot, 3), null);
    assert.equal(cancelRequest(slot), 1);
    assert.equal(request.controller.signal.aborted, true);
    assert.equal(shouldIgnoreSend(false), false);
    assert.ok(beginRequest(slot, 4));
  });
}

test("avslutning fra Send/body gir fokus uten rulling til tekstfeltet", () => {
  const calls: unknown[] = [];
  const input = {
    focus(options?: { preventScroll?: boolean }) {
      calls.push(options);
    },
  };
  const controls = { send: {}, body: {}, input };
  restoreFocusAfterRequest(controls.send, controls);
  restoreFocusAfterRequest(controls.body, controls);
  assert.deepEqual(calls, [{ preventScroll: true }, { preventScroll: true }]);
  restoreFocusAfterRequest(input, controls);
  restoreFocusAfterRequest({}, controls);
  restoreFocusAfterRequest(null, controls);
  assert.equal(
    calls.length,
    2,
    "annen valgt kontroll og eksisterende feltfokus beholdes",
  );
  assert.doesNotThrow(() =>
    restoreFocusAfterRequest(controls.body, { ...controls, input: null }),
  );
});
