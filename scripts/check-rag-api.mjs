import assert from "node:assert/strict";
const endpoint = "http://127.0.0.1:3001/api/rag";
const request = (body, headers = {}) =>
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body,
  });
const result = await request(
  JSON.stringify({ question: "kodeendring tester" }),
);
assert.equal(result.status, 200);
assert.equal((await result.json()).sources[0]?.id, "kodegjennomgang");
assert.equal((await request("{")).status, 400);
assert.equal(
  (
    await request(JSON.stringify({ question: "tester" }), {
      Origin: "https://example.com",
    })
  ).status,
  403,
);
console.log(
  "API-kontroll bestått: kildehenting, ugyldig JSON og opprinnelseskontroll.",
);
