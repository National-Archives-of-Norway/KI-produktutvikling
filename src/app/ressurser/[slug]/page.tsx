import Link from "next/link";
import { notFound } from "next/navigation";
import { resources } from "@/content/resources";

export function generateStaticParams() {
  return resources.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);
  return { title: resource?.title ?? "Ressurs" };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);
  if (!resource) notFound();
  return (
    <article className="article">
      <Link href="/#ressurser">← Til verktøykatalogen</Link>
      <div className="eyebrow">
        {resource.type.toLocaleUpperCase("nb")} · EKSEMPEL
      </div>
      <h1>{resource.title}</h1>
      <p className="lead">{resource.description}</p>
      <h2>Når passer dette?</h2>
      <p>{resource.usage}</p>
      <h2>Slik prøver du det</h2>
      <ol>
        {resource.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <h2>Eksempeltekst</h2>
      <pre className="example-text">
        <code>{resource.example}</code>
      </pre>
      <aside>
        Dette er eksempelinnhold til utprøving, ikke en ferdig
        installasjonspakke eller vedtatt føring. Bruk bare verktøy og data
        virksomheten har godkjent.
      </aside>
    </article>
  );
}
