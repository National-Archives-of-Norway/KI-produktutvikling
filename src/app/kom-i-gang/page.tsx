import Link from "next/link";
export const metadata = { title: "Kom i gang" };
export default function GettingStarted() {
  return (
    <article className="article">
      <Link href="/">← Til forsiden</Link>
      <div className="eyebrow">VEILEDNING · EKSEMPELINNHOLD</div>
      <h1>Kom i gang med KI i produktutvikling</h1>
      <p className="lead">
        Begynn med én oppgave, et tydelig mål og tid til å vurdere resultatet.
      </p>
      <h2>1. Velg en avgrenset oppgave</h2>
      <p>
        Prøv for eksempel å utforske et brukerbehov, forbedre en tekst eller
        foreslå testtilfeller for kode du kjenner. Bruk verktøy og data
        virksomheten har godkjent.
      </p>
      <h2>2. Beskriv konteksten</h2>
      <p>
        Forklar hva dere vil oppnå, hvilke rammer som gjelder og hvordan et godt
        resultat ser ut. Del bare informasjon verktøyet har lov til å behandle.
      </p>
      <h2>3. Vurder forslagene</h2>
      <p>
        Sjekk fakta, antakelser og kode. Den som bruker forslaget, har ansvar
        for å forstå og kvalitetssikre det.
      </p>
      <h2>4. Del erfaringene</h2>
      <p>
        Dokumenter hva som hjalp og hva dere måtte endre. Gode arbeidsmåter kan
        etter hvert bli til felles skills, instrukser og prompter.
      </p>
      <aside>
        Ressursene i denne lokale prototypen er eksempler. Innlogging, interne
        ressurser og installasjon kommer i senere faser.
      </aside>
    </article>
  );
}
