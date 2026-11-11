export type AnswerInline =
  | { type: "text"; text: string }
  | { type: "strong"; children: AnswerInline[] }
  | { type: "citation"; number: number };
export type AnswerBlock =
  | { type: "paragraph"; children: AnswerInline[] }
  | {
      type: "ordered-list";
      start: number;
      items: { number: number; children: AnswerInline[] }[];
    }
  | { type: "unordered-list"; items: { children: AnswerInline[] }[] };

function inline(
  text: string,
  sourceCount: number,
  strong = true,
): AnswerInline[] {
  return text
    .split(strong ? /(\*\*[^*]+\*\*|\[\d+\])/g : /(\[\d+\])/g)
    .filter(Boolean)
    .map((part): AnswerInline => {
      if (strong && part.startsWith("**") && part.endsWith("**"))
        return {
          type: "strong",
          children: inline(part.slice(2, -2), sourceCount, false),
        };
      const match = /^\[(\d+)\]$/.exec(part);
      const number = match ? Number(match[1]) : 0;
      if (
        match &&
        Number.isSafeInteger(number) &&
        number >= 1 &&
        number <= sourceCount
      )
        return { type: "citation", number };
      return { type: "text", text: part };
    });
}

// Avgrenset tekstformat, ikke HTML/Markdown-motor. URL-er blir vanlig tekst.
export function parseAnswer(text: string, sourceCount = 0): AnswerBlock[] {
  const blocks: AnswerBlock[] = [];
  let list:
    | {
        kind: "ordered" | "unordered";
        items: { number: number; text: string }[];
      }
    | undefined;
  let paragraph: string[] = [];
  function flushParagraph() {
    if (paragraph.length)
      blocks.push({
        type: "paragraph",
        children: inline(paragraph.join(" "), sourceCount),
      });
    paragraph = [];
  }
  function flushList() {
    if (!list) return;
    const items = list.items.map((item) => ({
      number: item.number,
      children: inline(item.text, sourceCount),
    }));
    blocks.push(
      list.kind === "ordered"
        ? { type: "ordered-list", start: items[0].number, items }
        : {
            type: "unordered-list",
            items: items.map(({ children }) => ({ children })),
          },
    );
    list = undefined;
  }
  for (const line of text.replace(/\r\n?/g, "\n").split("\n")) {
    if (!line.trim()) {
      flushParagraph();
      continue;
    }
    const marker = /^ {0,3}(?:(\d{1,9})[.)]|[-*])\s+(.*)$/.exec(line);
    if (marker) {
      flushParagraph();
      const kind = marker[1] === undefined ? "unordered" : "ordered";
      if (list && list.kind !== kind) flushList();
      list ??= { kind, items: [] };
      list.items.push({ number: Number(marker[1] ?? 0), text: marker[2] });
    } else if (list && /^\s+\S/.test(line)) {
      list.items[list.items.length - 1].text += " " + line.trim();
    } else {
      flushList();
      paragraph.push(line.trim().replace(/^#{1,6}\s+/, ""));
    }
  }
  flushList();
  flushParagraph();
  return blocks;
}
