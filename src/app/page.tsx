import { PortalButton } from "@/components/portal-button";
import { Catalog } from "@/components/catalog";
import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { Chatbot } from "@/features/rag/components/chatbot";
import { homeContent, getRecommendedResource } from "@/content/home";

export default function Home() {
  const recommended = getRecommendedResource();
  return (
    <>
      <Chatbot />
      <section className="hero">
        <div className="eyebrow">
          <span className="dot" /> KUNNSKAP SOM BLIR TIL PRAKSIS
        </div>
        <h1>
          Utvikle ideer.
          <br />
          <span>Bygg med KI.</span>
        </h1>
        <p>
          Et felles sted for kunnskap, metoder og verktøy. Utforsk hvordan
          kunstig intelligens kan støtte god produktutvikling.
        </p>
        <div className="actions">
          <PortalButton variant="contained" href="/kom-i-gang/">
            Kom i gang <span aria-hidden="true">↗</span>
          </PortalButton>
          <PortalButton href="#ressurser">
            Utforsk verktøyene <span aria-hidden="true">↓</span>
          </PortalButton>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-ring hero-art-ring-inner" />
          <div className="hero-art-ring hero-art-ring-cross" />
          <div className="hero-art-ring hero-art-ring-diagonal" />
          <div className="hero-art-halo" />
          <i className="hero-art-node hero-art-node-one" />
          <i className="hero-art-node hero-art-node-two" />
          <LogoMark />
        </div>
      </section>
      <section id="ressurser" className="resources">
        <div className="eyebrow">VERKTØYKATALOG</div>
        <h2>Fra inspirasjon til handling</h2>
        <p className="section-description">
          Finn skills, instrukser og prompter. Eksempelressurser er merket.
        </p>
        <Catalog />
      </section>
      <nav className="quick-links" aria-label="Lær, prøv og del">
        {homeContent.quickLinks.map((link) => (
          <Link key={link.label} href={link.href}>
            <span className="number">{link.label}</span>
            <strong>
              {link.title} <span aria-hidden="true">→</span>
            </strong>
          </Link>
        ))}
      </nav>
      <section className="reading" aria-labelledby="recommended-task-title">
        <div>
          <div className="eyebrow">{homeContent.recommendation.label}</div>
          <h2 id="recommended-task-title">{recommended.title}</h2>
          <p>{recommended.description}</p>
        </div>
        <PortalButton href={`/ressurser/${recommended.slug}/`}>
          {homeContent.recommendation.action} <span aria-hidden="true">→</span>
        </PortalButton>
      </section>
    </>
  );
}
