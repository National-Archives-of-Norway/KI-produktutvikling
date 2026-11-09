import { Fragment } from "react";
import Link from "next/link";
import type { RagSource } from "../contracts";

// Render a small, safe text format. Model output never becomes HTML or an arbitrary URL.
export function AnswerContent({
  text,
  sources,
}: {
  text: string;
  sources: RagSource[];
}) {
  function inline(value: string) {
    return value.split(/(\[\d+\]|\*\*[^*]+\*\*)/g).map((part, index) => {
      const match = part.match(/^\[(\d+)\]$/);
      const source = match ? sources[Number(match[1]) - 1] : undefined;
      if (source)
        return (
          <Link
            key={index}
            href={source.href}
            aria-label={`Kilde ${match![1]}: ${source.title}`}
          >
            {part}
          </Link>
        );
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      return <Fragment key={index}>{part}</Fragment>;
    });
  }
  return (
    <div className="chat-answer">
      {text
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((block, index) => {
          const lines = block.trim().split("\n");
          if (lines.every((line) => /^\d+[.)]\s+/.test(line)))
            return (
              <ol key={index}>
                {lines.map((line, i) => (
                  <li key={i}>{inline(line.replace(/^\d+[.)]\s+/, ""))}</li>
                ))}
              </ol>
            );
          if (lines.every((line) => /^[-*]\s+/.test(line)))
            return (
              <ul key={index}>
                {lines.map((line, i) => (
                  <li key={i}>{inline(line.replace(/^[-*]\s+/, ""))}</li>
                ))}
              </ul>
            );
          return <p key={index}>{inline(block.replace(/^#{1,6}\s+/gm, ""))}</p>;
        })}
    </div>
  );
}
