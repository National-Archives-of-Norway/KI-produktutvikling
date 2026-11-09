import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retningslinjer",
  description:
    "Arbeidsutkast til rammer for KI i produktutvikling i Nasjonalarkivet.",
};

export default function Guidelines() {
  return (
    <article className="article">
      <Link href="/">← Til forsiden</Link>
      <div className="eyebrow">RETNINGSLINJER · UTKAST</div>
      <h1>Trygge rammer for å jobbe med KI</h1>
      <p className="lead">
        For deg som jobber med produktutvikling i Nasjonalarkivet og vil bruke
        KI til å utforske, lære og løse oppgaver.
      </p>
      <aside>
        Dette er et arbeidsutkast til veiledning, ikke vedtatte retningslinjer
        for Nasjonalarkivet. Virksomhetens gjeldende regler og godkjenninger
        gjelder. Verktøy, databruk og ansvar må avklares før denne siden kan
        brukes som en autoritativ føring.
      </aside>
      <h2>Verktøy og tilgang</h2>
      <p>
        Avklar hvilket verktøy og hvilken konto som er godkjent for oppgaven. At
        et verktøy finnes i portalen, betyr ikke at det er godkjent for intern
        informasjon. Siden gir foreløpig ingen oversikt over godkjente
        produkter, modeller eller lisenser.
      </p>
      <h2>Analogt og digitalt arkivmateriale</h2>
      <p>
        Vurder innholdet før du bruker arkivmateriale i en KI-tjeneste. Det
        gjelder også skannede dokumenter, bilder, metadata og tekst fra OCR.
        Avklar hvilken informasjon tjenesten kan behandle, og bruk syntetiske
        eksempler når reelt materiale ikke er avklart.
      </p>
      <h2>Kvalitet og menneskelig gjennomgang</h2>
      <p>
        Kontroller fakta, kode og antakelser før forslag tas i bruk. Velg
        relevante tester og la en annen fagperson gjennomgå viktige endringer.
        KI-forslag trenger samme kvalitetssikring som annet arbeid.
      </p>
      <h2>Agenter, skills og integrasjoner</h2>
      <p>
        Undersøk hvilke filer, tjenester og handlinger en agent får tilgang til.
        Gi bare tilgangen oppgaven krever, og gjennomgå endringer før
        sammenslåing eller publisering. Skills merket «Beta» i portalen er ennå
        ikke gjennomgått av et menneske.
      </p>
      <h2>Avklaringer før ferdigstilling</h2>
      <ul>
        <li>Hvem eier og godkjenner retningslinjene?</li>
        <li>
          Hvilke verktøy og datakategorier er godkjent, og til hvilke oppgaver?
        </li>
        <li>Hvor meldes spørsmål, avvik og behov for tilgang?</li>
        <li>Når skal innholdet gjennomgås på nytt?</li>
      </ul>
      <h2>Del erfaringer og spørsmål</h2>
      <p>
        Bruk <Link href="/om/#ki-prat">KI-prat</Link> til erfaringsdeling og
        diskusjon. Forumet erstatter ikke virksomhetens godkjenningsprosesser.
        Se også <Link href="/kom-i-gang/">Kom i gang</Link> for en praktisk
        introduksjon.
      </p>
      <h2>Inspirasjon og status</h2>
      <p>
        Oppbygningen er inspirert av{" "}
        <a href="https://ki-utvikling.nav.no/retningslinjer">
          NAVs retningslinjeside
        </a>
        . NAVs verktøygodkjenninger og abonnementsregler gjelder ikke automatisk
        hos oss. Utkastet er sist oppdatert 9. november 2026.
      </p>
    </article>
  );
}
