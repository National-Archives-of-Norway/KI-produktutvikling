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
        Her finner du informasjon om tilgjengeligheten i KI-Produktutvikling og
        hvordan du får hjelp hvis noe ikke fungerer.
      </p>
      <aside>
        Dette er et utkast for portalen under utvikling. Samlet samsvar er ikke
        ferdig vurdert. Den formelle erklæringen er ikke publisert i
        uustatus.no.
      </aside>
      <h2>Om nettstedet</h2>
      <p>
        KI-Produktutvikling utvikles i Nasjonalarkivet. Erklæringen gjelder
        nettsidene og PDF-vedlegget i den lokale utviklingsversjonen av
        portalen.
      </p>
      <h2>Samsvar med kravene til universell utforming</h2>
      <p>
        Vurderingen av tilgjengelighet er ikke fullført. Vi kan derfor ennå ikke
        fastslå i hvilken grad nettstedet er i samsvar med kravene. Vurderingen
        tar utgangspunkt i{" "}
        <a href="https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86">
          Uu-tilsynets kravoversikt for offentlig sektor
        </a>
        .
      </p>
      <h2>Kjente tilgjengelighetsproblemer</h2>
      <p>
        Det er for tiden ingen bekreftede, åpne brudd i det undersøkte utvalget.
        Samlet samsvar er fortsatt uavklart fordi vurderingen ikke er fullført.
      </p>
      <p>
        Du kan be om hjelp eller innhold i et annet format gjennom{" "}
        <a href="#kontakt">kontaktkanalen nedenfor</a>.
      </p>
      <h2>Begrensninger i vurderingen</h2>
      <p>
        Det er foreløpig ikke bekreftet hvordan alle deler av nettstedet
        fungerer med skjermleser, forstørring og innstillinger for redusert
        bevegelse. PDF-vedleggets leserekkefølge, språk og diagramalternativer
        er heller ikke ferdig vurdert. Dette er usikkerhet i
        vurderingsgrunnlaget, ikke bekreftede problemer i alle disse
        funksjonene.
      </p>
      <p>
        Du kan lese ressursene gjennom{" "}
        <Link href="/#ressurser">ressurskatalogen</Link> eller{" "}
        <Link href="/nettstedskart/">nettstedskartet</Link> uten å bruke
        chatten. Animasjonen på forsiden kan pauses ved å klikke på
        illustrasjonen, eller ved å velge den med Tab og trykke mellomrom eller
        Enter.
      </p>
      <h2 id="kontakt">
        Meld fra om problemer eller be om tilgjengelig innhold
      </h2>
      <p>
        Send e-post til{" "}
        <a href="mailto:khadah@nasjonalarkivet.no">khadah@nasjonalarkivet.no</a>{" "}
        hvis du opplever problemer eller trenger innhold i et annet format.
        Oppgi hvilken side eller funksjon det gjelder, og hva du forsøkte å
        gjøre. Unngå sensitive opplysninger.
      </p>
      <p>
        <a href="https://www.uutilsynet.no/tilgjengelighetserklaering/hva-betyr-det-brukeren/1129">
          Uu-tilsynets veiledning
        </a>{" "}
        sier at tilbakemeldinger skal besvares så snart som mulig, vanligvis
        innen tre uker.
      </p>
      <h2>Klage</h2>
      <p>
        Hvis du ikke får svar, er misfornøyd med svaret eller ikke kan bruke
        nettstedet på grunn av manglende universell utforming, kan du lese{" "}
        <a href="https://www.diskrimineringsnemnda.no/klage">
          hvordan du klager til Diskrimineringsnemnda
        </a>
        .
      </p>
      <h2>Vurdering og oppdatering</h2>
      <p>
        Tilgjengeligheten ble sist vurdert{" "}
        <time dateTime="2026-11-10">10. november 2026</time>. Grunnlaget
        omfatter automatiske deltester av nettsidene, lokale tastaturkontroller
        og målrettet retest av feilsiden og PDF-ens listestruktur og
        tekstkontrast. Tidligere undersøkelser av øvrig PDF-innhold inngår også
        i grunnlaget. Faktisk skjermleserbruk er ikke testet.
      </p>
      <p>
        Teksten ble sist oppdatert{" "}
        <time dateTime="2026-11-10">10. november 2026</time>.
      </p>
    </article>
  );
}
