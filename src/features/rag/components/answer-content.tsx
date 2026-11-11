import { Fragment } from "react";
import Link from "next/link";
import type { RagSource } from "../contracts";
import { parseAnswer, type AnswerInline } from "../parse-answer";

// Bare kjente kilder gir lenker; modelltekst blir aldri HTML eller URL-er.
export function AnswerContent({
  text,
  sources,
}: {
  text: string;
  sources: RagSource[];
}) {
  function inline(parts: AnswerInline[]) {
    return parts.map((part, index) => {
      if (part.type === "strong")
        return <strong key={index}>{inline(part.children)}</strong>;
      if (part.type === "citation") {
        const source = sources[part.number - 1];
        return (
          <Link
            key={index}
            href={source.href}
            aria-label={`Kilde ${part.number}: ${source.title}`}
          >
            [{part.number}]
          </Link>
        );
      }
      return <Fragment key={index}>{part.text}</Fragment>;
    });
  }
  return (
    <div className="chat-answer">
      {parseAnswer(text, sources.length).map((block, index) => {
        if (block.type === "ordered-list")
          return (
            <ol key={index} start={block.start}>
              {block.items.map((item, i) => (
                <li
                  key={i}
                  value={
                    i > 0 && item.number !== block.items[i - 1].number + 1
                      ? item.number
                      : undefined
                  }
                >
                  {inline(item.children)}
                </li>
              ))}
            </ol>
          );
        if (block.type === "unordered-list")
          return (
            <ul key={index}>
              {block.items.map((item, i) => (
                <li key={i}>{inline(item.children)}</li>
              ))}
            </ul>
          );
        return <p key={index}>{inline(block.children)}</p>;
      })}
    </div>
  );
}
