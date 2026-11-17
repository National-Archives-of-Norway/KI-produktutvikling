import { test } from "node:test";
import assert from "node:assert/strict";
import { retrieve } from "../src/features/rag/retrieval.ts";
import { createModelMessages } from "../src/server/rag/messages.ts";

export const copilotQuestions = [
  "Kan jeg åpne sensitive testdata fra produksjon i VS Code når Copilot er på?",
  "Kan Copilot alene godkjenne sikkerhetskritisk kode?",
  "Må jeg kontrollere tester som Copilot lager?",
  "Kan jeg stole på at Copilot kjenner den nyeste versjonen av Next.js?",
  "Hvordan godtar jeg ett ord om gangen i et Copilot-forslag i VS Code?",
];
for (const question of copilotQuestions) {
  test(`Copilot-retningslinjer først: ${question}`, () => {
    assert.equal(retrieve(question)[0]?.id, "github-copilot");
  });
}
test("modellkontekst er avgrenset også for tre lange kilder", () => {
  for (const question of copilotQuestions) {
    const messages = createModelMessages(question, retrieve(question));
    const data = JSON.parse(messages[1].content);
    assert.ok(
      data.sources.reduce(
        (n: number, s: { excerpt: string }) => n + s.excerpt.length,
        0,
      ) <= 6000,
    );
  }
});
