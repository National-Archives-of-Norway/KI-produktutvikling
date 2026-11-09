import { Fragment } from "react";
import Link from "next/link";

const documentRoutes: Record<string, string> = {
  "VERSJONSLOGG.md": "/versjonslogg/",
  "UTVIKLINGSPLAN.md": "/utviklingsplan/",
};

function inline(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("`") && part.endsWith("`"))
        return <code key={i}>{part.slice(1, -1)}</code>;
      const reference = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (reference) {
        const [, label, href] = reference;
        if (documentRoutes[href])
          return (
            <Link key={i} href={documentRoutes[href]}>
              {label}
            </Link>
          );
        if (href.startsWith("https://"))
          return (
            <a key={i} href={href}>
              {label}
            </a>
          );
        return (
          <Fragment key={i}>
            {label} (<code>{href}</code>)
          </Fragment>
        );
      }
      return <Fragment key={i}>{part}</Fragment>;
    });
}

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

// Render the Markdown subset used by repository documents, without executing HTML.
export function RepositoryDocument({
  title,
  eyebrow,
  markdown,
}: {
  title: string;
  eyebrow: string;
  markdown: string;
}) {
  const blocks = markdown
    .trim()
    .split(/\n\s*\n/)
    .filter((block) => !block.startsWith("# "));
  return (
    <article className="article">
      <Link href="/">← Til forsiden</Link>
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {blocks.map((block, i) => {
        if (block.startsWith("### "))
          return <h3 key={i}>{inline(block.slice(4))}</h3>;
        if (block.startsWith("## "))
          return <h2 key={i}>{inline(block.slice(3))}</h2>;
        const lines = block.split("\n");
        if (
          lines.length > 1 &&
          lines[0].startsWith("|") &&
          cells(lines[1]).every((cell) => /^:?-{3,}:?$/.test(cell))
        ) {
          const headers = cells(lines[0]);
          return (
            <div
              key={i}
              className="document-table"
              role="region"
              aria-label={`${title}: ${headers[0]}`}
              tabIndex={0}
            >
              <table>
                <thead>
                  <tr>
                    {headers.map((header, j) => (
                      <th key={j} scope="col">
                        {inline(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lines.slice(2).map((line, j) => (
                    <tr key={j}>
                      {cells(line).map((cell, k) => (
                        <td key={k}>{inline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (lines.every((line) => line.startsWith("- ")))
          return (
            <ul key={i}>
              {lines.map((line, j) => {
                const task = line.match(/^- \[([x ])\] (.*)$/i);
                return (
                  <li key={j}>
                    {task ? (
                      <>
                        <strong>
                          {task[1].toLowerCase() === "x"
                            ? "Utført"
                            : "Gjenstår"}
                          :{" "}
                        </strong>
                        {inline(task[2])}
                      </>
                    ) : (
                      inline(line.slice(2))
                    )}
                  </li>
                );
              })}
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
