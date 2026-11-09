import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { RepositoryDocument } from "@/components/repository-document";

export const metadata = { title: "Versjonslogg" };
export const dynamic = "force-static";

export default async function ChangelogPage() {
  const markdown = await readFile(
    join(process.cwd(), "VERSJONSLOGG.md"),
    "utf8",
  );
  return (
    <RepositoryDocument
      title="Versjonslogg"
      eyebrow="UTVIKLING OG ENDRINGER"
      markdown={markdown}
    />
  );
}
