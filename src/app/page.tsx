import { PortalButton } from "@/components/portal-button";
import { Catalog } from "@/components/catalog";
import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { Chatbot } from "@/features/rag/components/chatbot";

export default function Home() {
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
          Utforsk eksempelressursene i den første prototypen.
        </p>
        <Catalog />
      </section>
      <nav className="quick-links" aria-label="Lær, prøv og del">
        <Link href="/kom-i-gang/">
          <span className="number">01 / LÆR</span>
          <strong>
            Finn en god start <span aria-hidden="true">→</span>
          </strong>
        </Link>
        <Link href="/ressurser/kodegjennomgang/">
          <span className="number">02 / PRØV</span>
          <strong>
            Prøv en eksempelressurs <span aria-hidden="true">→</span>
          </strong>
        </Link>
        <Link href="/om/#bidra">
          <span className="number">03 / DEL</span>
          <strong>
            Del det dere lærer <span aria-hidden="true">→</span>
          </strong>
        </Link>
      </nav>
      <section className="reading">
        <div>
          <div className="eyebrow">FØRSTE STEG</div>
          <h2>Start med en avgrenset oppgave.</h2>
          <p>
            Velg noe dere kjenner godt. Beskriv ønsket resultat, undersøk
            forslagene og del det dere lærer.
          </p>
        </div>
        <PortalButton href="/kom-i-gang/">Les veiledningen ↗</PortalButton>
      </section>
    </>
  );
}
