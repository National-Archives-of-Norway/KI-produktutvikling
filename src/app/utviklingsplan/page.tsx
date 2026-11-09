import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { RepositoryDocument } from "@/components/repository-document";

export const metadata = { title: "Utviklingsplan" };
export const dynamic = "force-static";

export default async function DevelopmentPlanPage() {
  const markdown = await readFile(
    join(process.cwd(), "UTVIKLINGSPLAN.md"),
    "utf8",
  );
  return (
    <RepositoryDocument
      title="Utviklingsplan"
      eyebrow="FREMDRIFT OG PRODUKSJONSKRAV"
      markdown={markdown}
    />
  );
}
