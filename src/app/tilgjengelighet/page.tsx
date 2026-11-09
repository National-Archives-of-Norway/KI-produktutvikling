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
        Samlet samsvar er ikke ferdig vurdert. Det tidligere språkavviket på
        prissiden er rettet og retestet. De to PDF-avvikene er rettet og
        struktur-/metadataretestet. Den formelle erklæringen er ikke opprettet i
        uustatus.no.
      </aside>
      <h2>Nettsted og ansvarlig virksomhet</h2>
      <p>
        Utkastet gjelder KI-Produktutvikling, som utvikles i Nasjonalarkivet.
        Endelig nettadresse, virksomhetens juridiske registreringsopplysninger
        og ansvarlig godkjenner er ikke bekreftet.
      </p>
      <p>
        Kontrollgrunnlaget omfatter 20 nettsider i den lokale prototypen:
        forsiden, fem ressursdetaljsider, Kom i gang, retningslinjer, Om, Spør
        KI, Oversikt, Godkjente KI-assistenter, Godkjente MCP-er, priser,
        personvern, nettstedskart, funksjonalitetsoversikt, utviklingsplan,
        versjonslogg og denne siden. Det lenkede PDF-vedleggets syv sider er
        også undersøkt med hensyn til struktur, metadata og tekst. Full
        hjelpemiddeltest av dokumentet gjenstår.
      </p>
      <p>
        Innlogging, internt innhold og svar fra en faktisk modellleverandør
        inngår ikke i testresultatene. De må vurderes før de tas i bruk.
      </p>
      <h2>Status for universell utforming</h2>
      <p>
        Samlet samsvar er ikke ferdig vurdert. Vi kan derfor foreløpig ikke
        erklære at nettstedet er fullt eller delvis i samsvar. Arbeidsgrunnlaget
        omfatter de{" "}
        <a href="https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86">
          48 WCAG-kravene Uu-tilsynet oppgir for offentlig sektor
        </a>
        . Delkontroller uten funn er ikke det samme som dokumentert etterlevelse
        av alle krav.
      </p>
      <h2>Rettede PDF-avvik</h2>
      <p>
        <Link
          href="/vedlegg/mandatforslag-ai-enablement-team.pdf"
          prefetch={false}
        >
          Mandatforslaget for AI enablement-team
        </Link>{" "}
        er rettet og retestet 9. november 2026:
      </p>
      <ul>
        <li>
          De kartlagte overskriftene på side 1–7 har nå 27 kodede
          overskriftsroller (H1/H2/H3). Tilknytningen til eksisterende tekst er
          strukturkontrollert. Det konkrete avviket knyttet til krav 1.3.1 er
          rettet; faktisk skjermlesernavigasjon gjenstår.
        </li>
        <li>
          Dokumenttittelen er nå «Mandatforslag – AI enablement-team i
          Nasjonalarkivet» i begge metadatafeltene (krav 2.4.2). Innstillingen
          for å vise dokumenttittel er beholdt.
        </li>
      </ul>
      <p>
        Alle syv sider er rendret og sammenlignet med originalen uten visuelle
        endringer. Struktur- og metadataretesten er bestått. Full PDF-vurdering
        med skjermleser, leserekkefølge, lister og diagramalternativer gjenstår.
        Be om hjelp eller annet tilgjengelig format via{" "}
        <a href="#kontakt">kontaktkanalen nedenfor</a>.
      </p>
      <h2>Rettet språkavvik i prisvilkår</h2>
      <p>
        Det tidligere avviket på{" "}
        <Link href="/priser/#codex-subscription">prissiden</Link> er rettet og
        retestet 9. november 2026. Vilkårsnotene vises nå på norsk. Alle seks
        vilkårsseksjoner er kontrollert etter en ny prisoppdatering. Dette
        lukker det dokumenterte avviket knyttet til{" "}
        <a href="https://www.uutilsynet.no/wcag-standarden/312-sprak-pa-deler-av-innhold-niva-aa/111">
          krav 3.1.2, språk på deler av innhold
        </a>
        , i det kontrollerte innholdet.
      </p>
      <p>
        Nye tester kontrollerer at norsk tekst bevares ved gjentatt oppdatering,
        og at ukjente vilkårsformater ikke erstatter tidligere kontrollert
        tekst. Samlet samsvar er fortsatt uavklart; dette er ikke en full ny
        kontroll av nettstedet eller faktisk opplesing med skjermleser.
      </p>
      <h2>Styring av animasjonen</h2>
      <p>
        Illustrasjonen på forsiden beveger seg automatisk. Klikk på
        illustrasjonen for å pause eller starte igjen. Med tastatur kan du bruke
        Tab for å velge illustrasjonen og mellomrom eller Enter for å pause og
        starte. Dette er kontrollert i lokal nettleser. Koden støtter redusert
        bevegelse, men samspillet med den faktiske systeminnstillingen må
        fortsatt testes.
      </p>
      <h2>Test og vurdering</h2>
      <p>
        Sist undersøkt: <time dateTime="2026-11-09">9. november 2026</time>, av
        Codex (OpenAI) med tilgjengelighetsskillen. Testene gjelder lokal
        utvikling, ikke en verifisert produksjonstjeneste. Kjøringsreferanse:
        201443-73cb0a3e52e0 (bred kontroll), supplert med målrettet retest
        203914-cf2e80bc00f7, lokal oppfølging 205326-389241d1fd6e og PDF-retest
        210420-07c855b7770e.
      </p>
      <ul>
        <li>
          HTML-grunnkontroll av 23 eksportfiler, inkludert genererte feilsider,
          uten kandidater i de avgrensede kontrollene.
        </li>
        <li>
          20 sider kontrollert ved 320, 844 og 1280 piksler, inkludert liggende
          visning, uten sidebredde-overflyt.
        </li>
        <li>
          Økt tekstavstand prøvd på 20 sider ved to bredder. Ingen
          sidebredde-overflyt ble funnet, men ikke alle dynamiske tilstander er
          visuelt vurdert.
        </li>
        <li>
          Tastaturkontroll av animasjon, hoppelenke, katalogsøk og filtre,
          pristabell og utfellbare vilkår, chatvalidering og dialog.
        </li>
        <li>
          Utvalgte fargepar er kontrastberegnet, senest filtre, chatfeil og to
          PDF-fargepar. De valgte tersklene ble oppfylt. Alle gradienter, flater
          og kontrolltilstander er ikke undersøkt.
        </li>
        <li>
          PDF-ens syv sider er rendret og struktur, metadata og tekst undersøkt.
          Tastaturflyt på fire sider og fokusløkken i chat er supplert med nye
          tester.
        </li>
      </ul>
      <p>
        DOM og tilgjengelighetstre er undersøkt som støttebevis. Dette er ikke
        testing med skjermleser eller en full automatisk WCAG-skanning. Ingen
        automatisk samsvarsprosent er beregnet.
      </p>
      <h2>Hva gjenstår?</h2>
      <ul>
        <li>
          Faktisk skjermlesertest av navigasjon, tabeller, søkeresultater, feil
          og chatmeldinger.
        </li>
        <li>
          Faktisk 200 % tekstforstørring og 400 % nettleserzoom, samt mobil med
          skjermtastatur.
        </li>
        <li>
          Faktisk skjermlesernavigasjon i den rettede PDF-en, kontroll av
          gjenstående PDF-alternativer og leserekkefølge, alle relevante
          kontrast-/fokustilstander, redusert bevegelse og flere nettlesere.
        </li>
        <li>
          Videre vurdering av utestede dynamiske tilstander og av faktisk
          utrullingsmiljø.
        </li>
      </ul>
      <p>
        Ingen åpne bekreftede brudd står igjen i arbeidsgrunnlaget. 12
        vurderinger er fortsatt uavklart. Krav 1.3.1 inngår blant disse fordi
        øvrig PDF-semantikk ikke er ferdig vurdert, selv om det konkrete
        overskriftsavviket er rettet. Manglende testing betyr uavklart status,
        ikke automatisk et brudd eller et unntak. Eldre resultater er bevart med
        sine opprinnelige datoer. Ingen unntak basert på uforholdsmessig byrde
        er vurdert.
      </p>
      <h2>Alternativer og hjelp</h2>
      <p>
        Ressursene kan leses fra{" "}
        <Link href="/nettstedskart/">nettstedskartet</Link> eller{" "}
        <Link href="/#ressurser">ressurskatalogen</Link> uten chatten. Be om
        hjelp eller et annet tilgjengelig format hvis du ikke får brukt
        innholdet.
      </p>
      <h2 id="kontakt">Meld fra om tilgjengelighetsproblemer</h2>
      <p>
        Send e-post til{" "}
        <a href="mailto:khadah@nasjonalarkivet.no">khadah@nasjonalarkivet.no</a>
        . Oppgi hvilken side det gjelder, hva du forsøkte å gjøre og hva som
        ikke fungerte. Unngå sensitive opplysninger.
      </p>
      <p>
        Du kan også be om innhold i et annet tilgjengelig format.{" "}
        <a href="https://www.uutilsynet.no/tilgjengelighetserklaering/hva-betyr-det-brukeren/1129">
          Uu-tilsynets veiledning
        </a>{" "}
        sier at tilbakemeldinger skal besvares så snart som mulig, vanligvis
        innen tre uker. Kontaktadressen er bekreftet for prosjektet;
        virksomheten må avklare ansvar for oppfølging, fraværsdekning og
        alternative formater før lansering.
      </p>
      <h2>Klage</h2>
      <p>
        Hvis du ikke kan bruke innholdet, ikke får svar eller er misfornøyd med
        svaret, kan du klage. Les{" "}
        <a href="https://www.diskrimineringsnemnda.no/klage">
          hvordan du klager til Diskrimineringsnemnda
        </a>
        .
      </p>
      <h2>Grunnlag og oppdatering</h2>
      <p>
        Første utkast og kontroll er fra{" "}
        <time dateTime="2026-11-06">6. november 2026</time>. Ny kontroll,
        kildegjennomgang og tekstoppdatering er fra{" "}
        <time dateTime="2026-11-09">9. november 2026</time>. Den formelle
        erklæringen er ikke publisert. Følg{" "}
        <a href="https://www.uutilsynet.no/tilgjengelighetserklaering/korleis-lage-og-oppdatere-tilgjengelegheitserklaering/1131">
          Uu-tilsynets fremgangsmåte
        </a>{" "}
        ved ferdigstilling og oppdatering. Virksomheten må utpeke godkjenner og
        vedlikeholdsansvarlig før registrering.
      </p>
    </article>
  );
}
