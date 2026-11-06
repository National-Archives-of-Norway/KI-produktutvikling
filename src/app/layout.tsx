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
    <html lang="nb">
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
          <main id="innhold">{children}</main>
          <footer>
            <span>KI-Produktutvikling</span>
            <span>Lokal prototype · eksempelinnhold</span>
          </footer>
        </PortalThemeProvider>
      </body>
    </html>
  );
}
