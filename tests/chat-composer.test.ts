import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

// Bruk prosjektets eksisterende TypeScript/React til å prøve den faktiske
// komponenten uten et nytt React-testbibliotek eller en kopiert visningsmodell.
const sourceUrl = new URL(
  "../src/features/rag/components/chat-composer.tsx",
  import.meta.url,
);
const compiled = ts
  .transpileModule(readFileSync(sourceUrl, "utf8"), {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  })
  .outputText.replace(/from "([^"]+)"/g, (_match, specifier: string) => {
    let target: string;
    if (specifier.startsWith(".") || specifier.startsWith("@/")) {
      const base = specifier.startsWith("@/")
        ? new URL(`../src/${specifier.slice(2)}`, import.meta.url)
        : new URL(specifier, sourceUrl);
      target = ["", ".ts", ".tsx"]
        .map((ext) => new URL(base.href + ext))
        .find((url) => existsSync(url))!.href;
    } else target = import.meta.resolve(specifier);
    return `from ${JSON.stringify(target)}`;
  });
const { ChatComposer } = (await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
)) as typeof import("../src/features/rag/components/chat-composer");
function render(busy: boolean) {
  return renderToStaticMarkup(
    createElement(ChatComposer, {
      inputId: "test-question",
      question: "tester",
      busy,
      validation: "",
      hasTurns: true,
      onSubmit() {},
      onQuestionChange() {},
      onClear() {},
      onCancel() {},
    }),
  );
}
function buttons(html: string) {
  return [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)].map(
    (match) => ({
      attributes: match[1],
      label: match[2]
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "")
        .replace(/<[^>]*>/g, "")
        .trim(),
    }),
  );
}
test("Send er fokuserbar med aria-disabled mens separat Avbryt er tilgjengelig", () => {
  const idle = buttons(render(false)),
    busy = buttons(render(true));
  assert.ok(
    idle.some(
      (button) =>
        button.label === "Send spørsmål" &&
        /type="submit"/.test(button.attributes),
    ),
  );
  const send = busy.find((button) => button.label === "Send spørsmål");
  assert.ok(send, "Send skal ikke byttes ut med Avbryt ved neste klikk");
  assert.match(send.attributes, /aria-disabled="true"/);
  assert.doesNotMatch(send.attributes, /(?:^|\s)disabled(?:[=\s]|$)/);
  assert.match(send.attributes, /type="submit"/);
  const cancel = busy.find((button) => button.label === "Avbryt");
  assert.ok(cancel);
  assert.match(cancel.attributes, /type="button"/);
  assert.doesNotMatch(cancel.attributes, /disabled/);
  assert.ok(busy.indexOf(cancel) > busy.indexOf(send));
  assert.ok(!idle.some((button) => button.label === "Avbryt"));
});
test("skjemaet eksponerer aria-busy under forespørsel", () => {
  assert.match(render(true), /<form\b[^>]*aria-busy="true"/);
  assert.doesNotMatch(render(false), /<form\b[^>]*aria-busy="true"/);
});
