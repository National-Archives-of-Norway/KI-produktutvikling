import Link from "next/link";
import { overview } from "@/content/overview";
import "./overview.css";
export const metadata = { title: overview.title, description: overview.lead };
export default function Page() {
  return (
    <article className="article overview-page">
      <Link href="/">← Til forsiden</Link>
      <p className="eyebrow">VERKTØY OG KOSTNADER</p>
      <h1>{overview.title}</h1>
      <p className="lead">{overview.lead}</p>
      <section
        className="overview-pricing"
        aria-labelledby="priser-og-abonnement"
      >
        <p className="eyebrow">01 / UTFORSK PRISER</p>
        <h2 id="priser-og-abonnement">{overview.pricing.title}</h2>
        <p>{overview.pricing.description}</p>
        <div className="overview-price-types">
          <span>Abonnement per bruker</span>
          <span>API og tokenbruk</span>
        </div>
        <Link className="overview-primary" href={overview.pricing.href}>
          Se priser og abonnement <span aria-hidden="true">→</span>
        </Link>
        <p className="overview-pricing-note">
          Offentlige listepriser. Se kildestatus og vilkår på prissiden.
        </p>
      </section>
      <section
        className="overview-pricing"
        aria-labelledby="godkjente-assistenter"
      >
        <p className="eyebrow">02 / GODKJENTE ASSISTENTER</p>
        <h2 id="godkjente-assistenter">{overview.assistants.title}</h2>
        <p>{overview.assistants.description}</p>
        <Link className="overview-primary" href={overview.assistants.href}>
          Se godkjente KI-assistenter <span aria-hidden="true">→</span>
        </Link>
      </section>
      <section className="overview-pricing" aria-labelledby="godkjente-mcper">
        <p className="eyebrow">03 / MCP-STATUS</p>
        <h2 id="godkjente-mcper">{overview.mcps.title}</h2>
        <p>{overview.mcps.description}</p>
        <Link className="overview-primary" href={overview.mcps.href}>
          Se MCP-status <span aria-hidden="true">→</span>
        </Link>
      </section>
      <section className="overview-future" aria-labelledby="videre-utvidelser">
        <h2 id="videre-utvidelser">Videre utvidelser</h2>
        <div className="overview-planned">
          {overview.planned.map((item) => (
            <section key={item.id} aria-labelledby={item.id}>
              <p className="eyebrow">PLANLAGT</p>
              <h3 id={item.id}>{item.title}</h3>
              <p>{item.description}</p>
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}
