import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tilgjengelighetserklæring",
  description:
    "Tilgjengelighet i KI-Produktutvikling og hvordan du melder fra om problemer.",
};

export default function AccessibilityPage() {
  return (
    <article className="article">
      <Link href="/">← Til forsiden</Link>
      <div className="eyebrow">TILGJENGELIGHET · UTKAST</div>
      <h1>Tilgjengelighetserklæring</h1>
      <p className="lead">
        KI-Produktutvikling skal være mulig å bruke uavhengig av funksjonsevne.
        Her finner du status for tilgjengelighet og hvordan du kan melde fra om
        problemer.
      </p>
      <aside>
        Dette er et lokalt utkast for portalen som utvikles i Nasjonalarkivet.
        Den formelle erklæringen er ikke opprettet i uustatus.no. Endelig
        nettadresse, ansvarlig godkjenner og samlet samsvarsvurdering må
        avklares før erklæringen ferdigstilles.
      </aside>
      <h2>Nettsted og ansvarlig virksomhet</h2>
      <p>
        Utkastet gjelder KI-Produktutvikling, som utvikles i Nasjonalarkivet.
        Det omfatter den lokale prototypens ni sider: forsiden, Kom i gang, Om,
        Spør kunnskapsbasen, tre eksempelressurser, nettstedskartet og denne
        tilgjengelighetssiden. Endelig nettadresse og virksomhetens juridiske
        registreringsopplysninger er ikke bekreftet.
      </p>
      <p>
        Testgrunnlaget omfatter ikke innlogging, internt innhold eller faktisk
        modellgenerering. Disse funksjonene må vurderes før de tas i bruk.
      </p>
      <h2>Status for universell utforming</h2>
      <p>
        Vurderingen er ikke ferdig. Vi kan derfor foreløpig ikke erklære at
        nettstedet er fullt eller delvis i samsvar med kravene. Vi vurderer
        løsningen mot de 48 WCAG-kravene som Uu-tilsynet oppgir for offentlig
        sektor, innenfor forskriftens rammeverk EN 301 549 V3.2.1.
      </p>
      <h2>Test og vurdering</h2>
      <p>
        Vi har kontrollert den lokale prototypens sider, katalogsøk, filtre og
        chat med kildeutdrag. Testingen omfatter tastatur, sidetitler,
        skjemaetiketter, fokus, mobilvisning og utvalgte kontrastkombinasjoner.
        Sist undersøkt:
        <time dateTime="2026-11-06"> 6. november 2026</time>.
      </p>
      <p>
        Testgrunnlaget er intern kodegjennomgang, tastaturtesting og kontroll av
        sidene i den integrerte nettleseren, med Codex som kodeassistent.
        Tilgjengelighetstreet og automatiske grunnkontroller er undersøkt; dette
        erstatter ikke testing med skjermleser eller en full manuell vurdering.
      </p>
      <h2>Innhold og funksjoner som fortsatt vurderes</h2>
      <p>
        Arbeidslisten har åtte uavklarte kriterier. De gjelder blant annet
        skjermleserstøtte, kontrast, forstørring og tastaturfokus. Resultater
        fra avgrensede kontroller er ikke registrert som bekreftet etterlevelse
        i uustatus.no.
      </p>
      <p>
        Den svake kanten rundt chatfeltet er rettet og kontrollert med en
        beregnet kontrasttest. Øvrige tilstander og brukerforløp må vurderes
        videre før vi kan gi en samlet oversikt over eventuelle brudd og
        konsekvenser. Ingen unntak begrunnet med uforholdsmessig byrde er gjort.
      </p>
      <h2>Hva gjenstår?</h2>
      <ul>
        <li>Skjermlesertest av navigasjon, søkeresultater og chatmeldinger.</li>
        <li>
          Verifisert nettleserzoom og kontroll på faktisk mobil med
          skjermtastatur.
        </li>
        <li>
          Kontroll i flere nettlesere og full vurdering av alle relevante krav.
        </li>
        <li>
          Kontroll av innlogging og andre funksjoner når de blir implementert.
        </li>
      </ul>
      <p>
        Manglende test betyr at status er uavklart. Det er ikke i seg selv et
        dokumentert brudd. Faktiske avvik, konsekvenser, alternativer og tiltak
        skal beskrives i den formelle erklæringen når vurderingen er fullført.
      </p>
      <h2>Alternativer og hjelp</h2>
      <p>
        Eksempelressursene kan leses direkte fra{" "}
        <Link href="/nettstedskart/">nettstedskartet</Link> eller{" "}
        <Link href="/#ressurser">verktøykatalogen</Link> uten å bruke chatten.
        Hvis du ikke får brukt innholdet, kan du be om hjelp eller et annet
        format via kontaktadressen nedenfor.
      </p>
      <h2 id="kontakt">Meld fra om tilgjengelighetsproblemer</h2>
      <p>
        Opplever du feil, trenger du et tilgjengelig alternativ til innhold,
        eller har du forslag til forbedringer? Send e-post til{" "}
        <a href="mailto:khadah@nasjonalarkivet.no">khadah@nasjonalarkivet.no</a>
        . Oppgi gjerne hvilken side det gjelder, hva du forsøkte å gjøre og hva
        som ikke fungerte. Unngå å sende sensitive opplysninger.
      </p>
      <p>
        Du kan også be om innholdet i et annet tilgjengelig format. Uu-tilsynet
        opplyser at tilbakemeldinger skal besvares så snart som mulig, vanligvis
        innen tre uker.
      </p>
      <p>
        Kontaktadressen er bekreftet for dette prosjektet. Før lansering må
        virksomheten avklare ansvar for oppfølging, fraværsdekning og levering
        av alternative formater.
      </p>
      <h2>Klage</h2>
      <p>
        Hvis du ikke får svar, er misfornøyd med svaret eller opplever manglende
        universell utforming, kan du klage til Diskrimineringsnemnda. Les{" "}
        <a href="https://www.diskrimineringsnemnda.no/klage">
          hvordan du klager til Diskrimineringsnemnda
        </a>
        .
      </p>
      <h2>Grunnlag og oppdatering</h2>
      <p>
        Utkastet ble opprettet{" "}
        <time dateTime="2026-11-06">6. november 2026</time> og sist oppdatert{" "}
        <time dateTime="2026-11-07">7. november 2026</time>. Testresultatene er
        fra 6. november; tekstoppdateringen er ikke en ny
        tilgjengelighetsrevisjon.
      </p>
      <p>
        Veiledningen og kravoversikten hos Uu-tilsynet ble kontrollert{" "}
        <time dateTime="2026-11-07">7. november 2026</time>. Den formelle
        erklæringen er ikke publisert. Ansvar for minst årlig oppdatering og
        gjennomgang ved større endringer må tildeles før lansering.
      </p>
      <ul>
        <li>
          <a href="https://www.uutilsynet.no/tilgjengelighetserklaering/sporsmal-i-tilgjengelegheitserklaeringa/1005">
            Uu-tilsynets spørsmål og begrunnelser per krav
          </a>
        </li>
        <li>
          <a href="https://lovdata.no/forskrift/2013-06-21-732/§4e">
            Forskriftens krav til erklæring og tilbakemeldingsfunksjon
          </a>
        </li>
        <li>
          <a href="https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86">
            Uu-tilsynets oversikt over WCAG-krav
          </a>
        </li>
        <li>
          <a href="https://www.uutilsynet.no/tilgjengelighetserklaering/korleis-lage-og-oppdatere-tilgjengelegheitserklaering/1131">
            Veiledning til den formelle erklæringen i uustatus.no
          </a>
        </li>
      </ul>
    </article>
  );
}
