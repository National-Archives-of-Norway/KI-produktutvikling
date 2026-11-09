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
        {resource.type.toLocaleUpperCase("nb")} ·{" "}
        {resource.type === "Skill" ? "BETA" : "EKSEMPEL"}
      </div>
      <h1>{resource.title}</h1>
      <p className="lead">{resource.description}</p>
      {resource.type === "Skill" && (
        <p>Beta: Denne skillen er ennå ikke gjennomgått av et menneske.</p>
      )}
      {resource.skill && (
        <section aria-labelledby="skill-source-title">
          <h2 id="skill-source-title">Om skillen</h2>
          <p>
            Versjon {resource.skill.version}. Skill-bibliotek:{" "}
            <strong>{resource.skill.repository}</strong>, i mappen{" "}
            <code>{resource.skill.path}</code>. Distribusjon via GitHub eller
            nedlasting fra portalen er foreløpig ikke satt opp.
          </p>
          <p>
            Skillen har testveiledning, lokale kontrollskript for HTML og
            kontrast, en rapportmal og en erklæringsmal. Den dokumenterer funn
            og foreslår rettinger før erklæringen utformes. Hva som faktisk kan
            testes, avhenger av tilgjengelige verktøy; resultatet er ikke en
            automatisk godkjenning av nettstedet.
          </p>
        </section>
      )}
      <h2>Når passer dette?</h2>
      <p>{resource.usage}</p>
      <h2>Slik prøver du det</h2>
      <ol>
        {resource.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <h2>{resource.skill ? "Eksempel på bruk" : "Eksempeltekst"}</h2>
      <pre className="example-text">
        <code>{resource.example}</code>
      </pre>
      <aside>
        {resource.skill
          ? "Skillen kan teste med tilgjengelige verktøy og foreslå rettinger. Skjermleser og andre manuelle kontroller må utføres når de er relevante. Kode endres bare når det er del av oppdraget, og den formelle erklæringen må godkjennes av virksomheten."
          : "Dette er eksempelinnhold til utprøving, ikke en ferdig installasjonspakke eller vedtatt føring."}{" "}
        Bruk bare verktøy og data virksomheten har godkjent.
      </aside>
    </article>
  );
}
