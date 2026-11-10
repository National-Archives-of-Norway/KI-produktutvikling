import type { Metadata } from "next";
import Link from "next/link";
import { PortalThemeProvider } from "@/theme/provider";
import { Navigation } from "@/components/navigation";
import { LogoMark } from "@/components/logo-mark";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KI-Produktutvikling",
    template: "%s | KI-Produktutvikling",
  },
  description:
    "Kunnskap, metoder og verktøy for produktutvikling med kunstig intelligens.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb" data-scroll-behavior="smooth">
      <body>
        <PortalThemeProvider>
          <a className="skip-link" href="#innhold">
            Hopp til innhold
          </a>
          <header className="header">
            <Link className="brand" href="/">
              <LogoMark />
              KI-Produktutvikling
            </Link>
            <Navigation />
          </header>
          <main id="innhold" tabIndex={-1}>
            {children}
          </main>
          <footer>
            <div>
              <span>KI-Produktutvikling</span>
              <nav
                className="footer-links"
                aria-label="Informasjon om nettstedet"
              >
                <Link href="/oversikt/">Oversikt</Link>
                <Link href="/personvern/">Personvernerklæring</Link>
                <Link href="/tilgjengelighet/">Tilgjengelighetserklæring</Link>
                <Link href="/nettstedskart/">Nettstedskart</Link>
                <Link href="/versjonslogg/">Versjonslogg</Link>
                <Link href="/utviklingsplan/">Utviklingsplan</Link>
                <Link href="/funksjonalitet/">Funksjonalitetsoversikt</Link>
              </nav>
            </div>
          </footer>
        </PortalThemeProvider>
      </body>
    </html>
  );
}
