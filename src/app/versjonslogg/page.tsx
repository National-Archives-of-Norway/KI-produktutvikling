import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Fragment } from "react";
import Link from "next/link";

export const metadata = { title: "Versjonslogg" };
export const dynamic = "force-static";

function inline(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("`") && part.endsWith("`"))
        return <code key={i}>{part.slice(1, -1)}</code>;
      const reference = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      // Repository document references are shown as filenames, not broken web links.
      if (reference)
        return (
          <Fragment key={i}>
            {reference[1]} (<code>{reference[2]}</code>)
          </Fragment>
        );
      return <Fragment key={i}>{part}</Fragment>;
    });
}

export default async function ChangelogPage() {
  const markdown = await readFile(
    join(process.cwd(), "VERSJONSLOGG.md"),
    "utf8",
  );
  const blocks = markdown
    .trim()
    .split(/\n\s*\n/)
    .filter((block) => block !== "# Versjonslogg");
  return (
    <article className="article">
      <Link href="/">← Til forsiden</Link>
      <div className="eyebrow">UTVIKLING OG ENDRINGER</div>
      <h1>Versjonslogg</h1>
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) return <h3 key={i}>{block.slice(4)}</h3>;
        if (block.startsWith("## ")) return <h2 key={i}>{block.slice(3)}</h2>;
        const lines = block.split("\n");
        if (lines.every((line) => line.startsWith("- ")))
          return (
            <ul key={i}>
              {lines.map((line, j) => (
                <li key={j}>{inline(line.slice(2))}</li>
              ))}
            </ul>
          );
        if (lines.every((line) => /^\d+\. /.test(line)))
          return (
            <ol key={i}>
              {lines.map((line, j) => (
                <li key={j}>{inline(line.replace(/^\d+\. /, ""))}</li>
              ))}
            </ol>
          );
        return <p key={i}>{inline(block)}</p>;
      })}
    </article>
  );
}
