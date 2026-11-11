import { test } from "node:test";
import assert from "node:assert/strict";
import { parseAnswer } from "../src/features/rag/parse-answer.ts";
import {
  validateQuestion,
  questionLength,
  limitQuestion,
  QUESTION_LIMIT,
} from "../src/features/rag/contracts.ts";

const text = (value: string) => [{ type: "text", text: value }];
test("nummerert liste slås sammen over tomme linjer", () => {
  assert.deepEqual(parseAnswer("1. A\n\n2. B"), [
    {
      type: "ordered-list",
      start: 1,
      items: [
        { number: 1, children: text("A") },
        { number: 2, children: text("B") },
      ],
    },
  ]);
});
test("listens start og eksplisitte nummerhopp bevares", () => {
  const [list] = parseAnswer("3) Tre\n\n7. Sju");
  assert.equal(list.type, "ordered-list");
  if (list.type !== "ordered-list") return;
  assert.equal(list.start, 3);
  assert.deepEqual(
    list.items.map((item) => item.number),
    [3, 7],
  );
});
test("innrykkede fortsettelseslinjer tilhører listepunktet", () => {
  assert.deepEqual(
    parseAnswer("1. A\n   med fortsettelse\n\n2. **B [1]**\n  videre", 1),
    [
      {
        type: "ordered-list",
        start: 1,
        items: [
          { number: 1, children: text("A med fortsettelse") },
          {
            number: 2,
            children: [
              {
                type: "strong",
                children: [
                  { type: "text", text: "B " },
                  { type: "citation", number: 1 },
                ],
              },
              { type: "text", text: " videre" },
            ],
          },
        ],
      },
    ],
  );
});
test("avsnitt avslutter lister, og ulike listetyper blandes ikke", () => {
  const blocks = parseAnswer(
    "Innledning\n\n1. A\n2. B\n\nEt avsnitt\n\n- X\n\n* Y\n\n3. C",
  );
  assert.deepEqual(
    blocks.map((block) => block.type),
    [
      "paragraph",
      "ordered-list",
      "paragraph",
      "unordered-list",
      "ordered-list",
    ],
  );
});
test("kildehenvisning tolkes også inne i fet tekst", () => {
  assert.deepEqual(parseAnswer("**viktig [1]**", 1), [
    {
      type: "paragraph",
      children: [
        {
          type: "strong",
          children: [
            { type: "text", text: "viktig " },
            { type: "citation", number: 1 },
          ],
        },
      ],
    },
  ]);
});
test("kildenummer utenfor området blir tekst, også i fet skrift", () => {
  const result = parseAnswer("[0] [2] **[99999999999999999999]**", 1);
  assert.doesNotMatch(JSON.stringify(result), /"type":"citation"/);
  assert.match(JSON.stringify(result), /\[0\]/);
  assert.match(JSON.stringify(result), /\[99999999999999999999\]/);
});
test("modellens HTML og URL-er er bare tekst", () => {
  const value =
    "<img src=x onerror=alert(1)> https://example.test [klikk](javascript:alert(1))";
  assert.deepEqual(parseAnswer(value, 1), [
    { type: "paragraph", children: text(value) },
  ]);
});
test("CRLF, overskrift og uavsluttet fet tekst håndteres som tekstformat", () => {
  assert.deepEqual(parseAnswer("## Tittel\r\n\r\n**uferdig"), [
    { type: "paragraph", children: text("Tittel") },
    { type: "paragraph", children: text("**uferdig") },
  ]);
});

test("spørsmålsvalidering teller grafemer for emoji, flagg og sammensatte tegn", () => {
  for (const grapheme of ["😀", "🇳🇴", "👨‍👩‍👧‍👦", "e\u0301", "👍🏽"]) {
    assert.equal(questionLength(grapheme), 1, grapheme);
    assert.equal(validateQuestion(grapheme.repeat(2)), null);
    assert.equal(validateQuestion(grapheme.repeat(3)), grapheme.repeat(3));
    assert.equal(
      validateQuestion(grapheme.repeat(QUESTION_LIMIT)),
      grapheme.repeat(QUESTION_LIMIT),
    );
    assert.equal(validateQuestion(grapheme.repeat(QUESTION_LIMIT + 1)), null);
  }
});
test("feltgrensen kutter på samme grafemgrense som servervalideringen", () => {
  const family = "👨‍👩‍👧‍👦";
  const value = family.repeat(QUESTION_LIMIT) + "e\u0301";
  const limited = limitQuestion(value);
  assert.equal(limited, family.repeat(QUESTION_LIMIT));
  assert.equal(validateQuestion(limited), limited);
  assert.equal(limitQuestion("e\u0301😀", 1), "e\u0301");
  assert.equal(validateQuestion("  😀😀😀  "), "😀😀😀");
});

test("gjentatt eller synkende nummerering blir fortløpende fra første nummer", () => {
  for (const [input, expected] of [
    ["1. A\n1. B\n1. C", [1, 2, 3]],
    ["4. A\n2. B\n2. C", [4, 5, 6]],
    ["1. A\n2. B", [1, 2]],
  ] as const) {
    const [list] = parseAnswer(input);
    assert.equal(list.type, "ordered-list");
    if (list.type === "ordered-list")
      assert.deepEqual(
        list.items.map((item) => item.number),
        expected,
      );
  }
});

test("ny liste etter et avsnitt beholder sin egen start og normaliseres separat", () => {
  const blocks = parseAnswer("1. A\n1. B\n\nEt avsnitt\n\n5. C\n5. D");
  assert.equal(blocks[1].type, "paragraph");
  const lists = blocks.filter((block) => block.type === "ordered-list");
  assert.deepEqual(
    lists.map((list) => list.start),
    [1, 5],
  );
  assert.deepEqual(
    lists.map((list) => list.items.map((item) => item.number)),
    [
      [1, 2],
      [5, 6],
    ],
  );
});

for (const value of ["10. november 2026 ble …", "2026. Det året …"]) {
  test(`dato/årstall blir avsnitt: ${value}`, () => {
    assert.deepEqual(parseAnswer(value), [
      { type: "paragraph", children: text(value) },
    ]);
  });
}

test("norske månedsnavn og forkortelser etter nummer er datoer", () => {
  for (const month of [
    "januar",
    "februar",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "desember",
    "jan.",
    "feb.",
    "mar.",
    "apr.",
    "jun.",
    "jul.",
    "aug.",
    "sep.",
    "sept.",
    "okt.",
    "nov.",
    "des.",
    "NOV",
  ])
    assert.equal(parseAnswer(`10. ${month} 2026`)[0].type, "paragraph", month);
});

test("vanlige listenumre og tall opptil tre siffer beholdes", () => {
  for (const [number, value] of [
    [1, "Velg …"],
    [3, "Gjør …"],
    [10, "Kontroller …"],
    [999, "Siste punkt"],
  ] as const) {
    const [list] = parseAnswer(`${number}. ${value}`);
    assert.equal(list.type, "ordered-list");
    if (list.type === "ordered-list") assert.equal(list.start, number);
  }
});
