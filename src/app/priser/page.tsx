import Link from "next/link";
import {
  pricing,
  pricingOverview,
  usd,
  type PricingGroup,
} from "@/content/pricing";
import { PricingFreshness } from "@/components/pricing-freshness";
import "./pricing.css";
export const metadata = {
  title: pricingOverview.title,
  description: pricingOverview.lead,
};
function date(value: string | null) {
  return value
    ? new Intl.DateTimeFormat("nb-NO", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Europe/Oslo",
      }).format(new Date(value))
    : "Ingen vellykket kontroll";
}
function Group({ group }: { group: PricingGroup }) {
  const subscription = group.kind === "subscription";
  return (
    <section className="price-group" aria-labelledby={group.id}>
      <div className="price-group-heading">
        <div>
          <p className="eyebrow">{group.product}</p>
          <h3 id={group.id}>{group.label}</h3>
        </div>
        <a href={group.url}>Offisiell prisliste ↗</a>
      </div>
      <p className="price-date">
        Sist kontrollert:{" "}
        <time dateTime={group.checkedAt ?? undefined}>
          {date(group.checkedAt)}
        </time>
      </p>
      {group.status === "error" && (
        <p className="price-warning">
          {group.error} Siste forsøk: {date(group.attemptedAt)}.
        </p>
      )}
      <PricingFreshness checkedAt={group.checkedAt} />
      {!group.rows.length ? (
        <p>
          Ingen kontrollerte priser tilgjengelig. Bruk den offisielle
          prislisten.
        </p>
      ) : (
        <div
          className="document-table"
          tabIndex={0}
          role="region"
          aria-label={`${group.label}, rullbar pristabell`}
        >
          <table>
            <caption>
              {subscription
                ? "USD per bruker eller sete per måned"
                : "USD per én million tokens"}
            </caption>
            <thead>
              <tr>
                <th scope="col">
                  {subscription ? "Plan" : "Modell og kontekst"}
                </th>
                {subscription ? (
                  <>
                    <th scope="col">Månedsbetaling</th>
                    <th scope="col">Årsbetaling, per måned</th>
                  </>
                ) : (
                  <>
                    <th scope="col">Input</th>
                    <th scope="col">Output</th>
                    <th scope="col">Cache-lesing</th>
                    <th scope="col">Cache-skriving*</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <tr key={row.name}>
                  <th scope="row">
                    {row.name}
                    {"context" in row && <small>{row.context}</small>}
                  </th>
                  {"monthly" in row ? (
                    <>
                      <td>
                        {row.note.startsWith("Fra-pris.") ? "Fra " : ""}
                        {usd(row.monthly)}
                        <small>per {row.unit}</small>
                      </td>
                      <td>{usd(row.annualMonthly)}</td>
                    </>
                  ) : (
                    <>
                      <td>{usd(row.input)}</td>
                      <td>{usd(row.output)}</td>
                      <td>{usd(row.cached)}</td>
                      <td>
                        {usd(row.write)}
                        {row.writeLong !== null && (
                          <small>Lang varighet: {usd(row.writeLong)}</small>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {group.kind !== "subscription" && (
        <p className="price-date">
          * Claude API: 5 min / 1 time. OpenAI API: 30 min / 12 timer. Copilot
          følger GitHubs vilkår. «Ikke oppgitt» betyr at tabellen ikke oppgir en
          separat sats; det betyr ikke nødvendigvis gratis.
        </p>
      )}
      <details>
        <summary>Vilkår og avgrensninger</summary>
        <ul>
          {group.rows.map((row) => (
            <li key={row.name}>
              <strong>{row.name}:</strong> {row.note}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
export default function Page() {
  return (
    <article className="article pricing-page">
      <nav aria-label="Brødsmulesti">
        <Link href="/oversikt/">Oversikt</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Priser og abonnement</span>
      </nav>
      <p className="eyebrow">PRISER OG BRUK</p>
      <h1>{pricingOverview.title}</h1>
      <p className="lead">{pricingOverview.lead}</p>
      <p>{pricingOverview.note}</p>
      <nav className="price-jumps" aria-label="På prissiden">
        <a href="#abonnement">01 / Abonnement</a>
        <a href="#tokenpriser">02 / API og tokenpriser</a>
        <a href="#oppdatering">03 / Kilder og oppdatering</a>
      </nav>
      <section aria-labelledby="abonnement">
        <h2 id="abonnement">Abonnement</h2>
        <p>
          Pris per bruker og periode. Inkludert bruk, tilgang og tillegg følger
          den enkelte planen. Årsbetaling kan kreve forskuddsbetaling og flere
          seter. Gratisplaner, særordninger og avtalebaserte Enterprise-priser
          er ikke med i utvalget.
        </p>
        {pricing.groups
          .filter((g) => g.kind === "subscription")
          .map((g) => (
            <Group key={g.id} group={g} />
          ))}
      </section>
      <section aria-labelledby="tokenpriser">
        <h2 id="tokenpriser">API og tokenpriser</h2>
        <p>
          API betales etter forbruk. Input er det modellen leser, output er det
          den skriver. Cache betyr gjenbruk av kontekst. Dette utvalget viser
          standard satser; terskler, hastighet, region og verktøy kan gi andre
          kostnader.
        </p>
        <p>
          Copilot-tabellen viser tokenpriser inne i Copilot. De er ikke et eget
          API-tilbud. Direkte Claude- og OpenAI-API faktureres etter egne
          vilkår, og er adskilt fra abonnementets inkluderte bruk.
        </p>
        {pricing.groups
          .filter((g) => g.kind !== "subscription")
          .map((g) => (
            <Group key={g.id} group={g} />
          ))}
      </section>
      <section aria-labelledby="oppdatering">
        <h2 id="oppdatering">Kilder og automatisk oppdatering</h2>
        <p>
          Hver tabell har lenke til kilden og tidspunktet da prisene sist ble
          hentet og formatkontrollert. Dette er automatisk kontroll, ikke
          bekreftelse på en inngått avtale eller godkjenning av et verktøy.
        </p>
        <p>
          Automatisk oppdatering er klargjort, men er ennå ikke aktivert.
          Prisene vises fra et lagret øyeblikksbilde. Oppdateringer må
          gjennomgås før de tas inn på nettsiden. Kontrolltidspunktet viser når
          vi hentet og formatkontrollerte prisene, ikke når leverandøren sist
          endret dem.
        </p>
        <p>
          Hvis en kilde feiler, beholdes forrige kontrollerte pris og feilen
          vises. Gamle data merkes etter sju dager når siden åpnes. Utvalget av
          planer og modeller vedlikeholdes separat; en helt ny modell blir ikke
          automatisk lagt til. Se også{" "}
          <Link href="/retningslinjer/">retningslinjene</Link> før bruk.
        </p>
      </section>
    </article>
  );
}
