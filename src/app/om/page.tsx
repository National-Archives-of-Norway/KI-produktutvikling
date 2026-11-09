import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Om portalen",
  description:
    "Formålet med KI-Produktutvikling og AI enablement-teamets foreslåtte bidrag.",
};

export default function About() {
  return (
    <article className="article">
      <Link href="/">← Til forsiden</Link>
      <div className="eyebrow">OM PORTALEN</div>
      <h1>Kunnskap som hjelper i praksis</h1>
      <p className="lead">
        KI-Produktutvikling skal gjøre det enklere å finne, prøve og dele
        nyttige arbeidsmåter for produktutvikling med KI i Nasjonalarkivet.
      </p>
      <h2>Et felles sted for læring og verktøy</h2>
      <p>
        Her samler vi veiledninger, konkrete eksempler, erfaringer og
        gjenbrukbare byggesteiner som skills, instrukser og prompter. Innholdet
        skal hjelpe deg med oppgavene du står i, enten du vil komme i gang eller
        forbedre en arbeidsmåte du allerede bruker.
      </p>
      <p>
        Målet er god produktutvikling. Bruk av KI skal vurderes ut fra nytten
        det gir, og erfaringer med begrensninger og forsøk som ikke fungerte er
        også verdifulle.
      </p>
      <h2>AI enablement-teamet</h2>
      <p>
        Mandatforslaget beskriver et team som skal bidra til at
        utviklingsteamene bruker KI på en god måte. De foreslåtte fokusområdene
        er kompetanse og erfaringsdeling, oppsett og guardrails, og innspill til
        retningslinjer og policy.
      </p>
      <p>
        Teamets rolle er å gi råd, koble erfaringer og legge til rette for
        læring. Forslaget legger ikke opp til at teamet skal bestemme policy,
        avgjøre enkeltsaker eller være førstelinje for lisenser og verktøyfeil.
        Ansvarlige team etablerer tjenester og tekniske miljøer.
      </p>
      <p>
        Portalen skal være en ressurs for brukerne på tvers av team. Innholdet
        prioriteres etter praktisk nytte, og er ikke begrenset til
        enablement-teamets aktiviteter.
      </p>
      <aside>
        Omtalen av AI enablement-teamet bygger på et mandatforslag. Den
        beskriver foreslått ansvar og arbeidsmåte, ikke et bekreftet vedtak.
      </aside>
      <p>
        <Link
          href="/vedlegg/mandatforslag-ai-enablement-team.pdf"
          prefetch={false}
        >
          Vedlegg: Mandatforslag for AI enablement-teamet (PDF, 95 kB)
        </Link>
      </p>
      <h2 id="ki-prat">KI-prat</h2>
      <p>
        KI-prat er et forum for alle som jobber med produktutvikling i
        Nasjonalarkivet, der vi deler erfaringer, tanker og refleksjoner om bruk
        av KI i utviklingsarbeidet. Ta med noe du har prøvd, et spørsmål eller
        et tema du vil utforske sammen med andre.
      </p>
      <p>
        Vi møtes på Teams annenhver torsdag i opptil én time. Møtene har
        hovedsakelig åpen mikrofon, og vi avslutter tidligere hvis ingen har mer
        de vil ta opp.
      </p>
      <p>
        I Teams-kanalen «KI-prat» kan du fortsette diskusjonen etter møtet og
        foreslå temaer til neste gang. Kanalen er et sted for erfaringsdeling
        også mellom møtene.
      </p>
      <h2 id="bidra">Del det dere lærer</h2>
      <p>
        En nyttig erfaring beskriver oppgaven, hva dere prøvde, hvordan dere
        vurderte resultatet og hva andre kan lære av forsøket. Ta gjerne med det
        som ikke fungerte. Fjern interne og sensitive opplysninger før noe deles
        offentlig. En felles bidragskanal er foreløpig ikke etablert.
      </p>
      <h2>Finn en god start</h2>
      <p>
        Les <Link href="/kom-i-gang/">veiledningen for å komme i gang</Link>{" "}
        eller utforsk <Link href="/#ressurser">verktøykatalogen</Link>. Den
        lokale prototypen inneholder foreløpig eksempelressurser.
      </p>
    </article>
  );
}
