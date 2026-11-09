import { Fragment } from "react";
import Link from "next/link";
import type { ContentPage } from "@/content/page-content";

function InlineContent({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!link) return <Fragment key={index}>{part}</Fragment>;
    const [, label, href] = link;
    if (href.startsWith("/") && !href.startsWith("//")) {
      return (
        <Link key={index} href={href} prefetch={false}>
          {label}
        </Link>
      );
    }
    if (href.startsWith("https://"))
      return (
        <a key={index} href={href}>
          {label}
        </a>
      );
    return <Fragment key={index}>{label}</Fragment>;
  });
}

export function ContentArticle({ page }: { page: ContentPage }) {
  return (
    <article className="article">
      <Link href="/">← Til forsiden</Link>
      <div className="eyebrow">{page.eyebrow}</div>
      <h1>{page.title}</h1>
      <p className="lead">{page.lead}</p>
      {page.blocks.map((block) => {
        if (block.type === "list")
          return (
            <ul key={block.id}>
              {block.items.map((item) => (
                <li key={item}>
                  <InlineContent text={item} />
                </li>
              ))}
            </ul>
          );
        if (block.type === "heading")
          return (
            <h2 key={block.id} id={block.id}>
              {block.text}
            </h2>
          );
        if (block.type === "note")
          return (
            <aside key={block.id}>
              <InlineContent text={block.text} />
            </aside>
          );
        return (
          <p key={block.id}>
            <InlineContent text={block.text} />
          </p>
        );
      })}
    </article>
  );
}
