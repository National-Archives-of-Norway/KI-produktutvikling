# Dokumentasjonsoversikt

Avstemt **11. november 2026** av **Codex (OpenAI)**, uten underagenter. Denne oversikten viser hvilke dokumenter som brukes til hva. Den er ikke en ny test, lovvurdering eller produksjonsgodkjenning.

## Gjeldende innganger

| Dokument                                                                   | Bruk og avgrensning                                                                                                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [README](../README.md)                                                     | Oppstart, konfigurasjon, kontroller og utrullingens begrensninger.                                                                               |
| [Arkitektur](../ARCHITECTURE.md)                                           | Modulgrenser, RAG-flyt, indeksert søk, chatkontroller og server-/klientansvar.                                                                   |
| [Utviklingsplan](../UTVIKLINGSPLAN.md)                                     | Gjeldende fremdrift, kildeavgrensede testresultater og åpne produksjonskrav P1–P10. Eldre daterte resultater er historikk.                       |
| [Kvalitetskontroll](../KVALITETSKONTROLL.md)                               | Samlet inngang til teknisk kontroll og siste vurderte tilgjengelighetsgrunnlag, med eldre kontrollhistorikk.                                     |
| [CI-kontroll](CI-KONTROLL.md)                                              | Verifiserte action-SHA-er, lokal kontroll og Docker/Linux-matrisen for c22f1dc. GitHub Actions er fortsatt ikke kjørt.                           |
| [Første push](FORSTE-PUSH.md)                                              | Menneskets sjekkliste for repo, bevislagring, rettigheter, branch protection og manuelle workflow-kjøringer. Oppgavene på GitHub er ikke utført. |
| [Pristestrapport](priser/TESTRAPPORT.md)                                   | Parser-/fixture-/workflow-simulering og datert Linux-historikk. Dette bekrefter ikke levende prisformater eller tilbud/avtaler.                  |
| [WCAG-kontroll](tilgjengelighet/WCAG-KONTROLL.md)                          | Gjeldende peker, siste vurderte 48-kravsmatrise og gjenstående manuelle kontroller. Nyere chatrettinger trenger relevant retest.                 |
| [Tilgjengelighetserklæring](tilgjengelighet/TILGJENGELIGHETSERKLAERING.md) | Lokalt erklæringsutkast basert på vurderingen 10. november. Åtte krav er uavklart; ingen formell publisering/godkjenning.                        |
| [Personvernkartlegging](personvern/PERSONVERN-KARTLEGGING.md)              | Utkast, rapportpekere og uavklart behandling/drift. Siste fulle kartlegging er 9. november; cookie-delkartlegging 10. november.                  |
| [Informasjonskapsler](informasjonskapsler/INFORMASJONSKAPSLER.md)          | Faktisk lokalt utvalg fra 10. november og avgrenset bannerbeslutning. Ikke en vurdering av framtidig produksjon.                                 |
| [Versjonslogg](../VERSJONSLOGG.md)                                         | Hva som er endret, hvorfor, utførende agent/person og faktisk kontrollgrunnlag. En oppføring betyr ikke publisering.                             |
| [Arbeidsinstruksjoner](../AGENTS.md)                                       | Regler for kodearbeid, versjonslogg, funksjonsregister og utviklingsplan. Gjennomgått; eksisterende regler videreføres.                          |
| [Bevislagringsforslag](BEVISLAGRING.md)                                    | Beslutningsgrunnlag, ikke vedtatt lagringsregel. De opprinnelige størrelsesmålingene er daterte og beholdes.                                     |
| [Arkivert README](HISTORIKK.md)                                            | Bevarte historiske beskrivelser. Bruk gjeldende innganger ovenfor til oppstart og dagens status.                                                 |
| Denne oversikten                                                           | Veiviser og avgrensning av dokumentasjonsvedlikeholdet.                                                                                          |

## Innhold og dokumentasjon har ulike kilder

Portalens brukerrettede funksjonsoversikt kommer fra [funksjonsregisteret](../src/content/features.ts); den skal ikke vedlikeholdes som en separat funksjonsliste i Markdown. Sider, ressurser og Spør KI bruker felles innhold i [src/content](../src/content/). Denne dokumentasjonsrunden endrer ikke funksjonsstatus eller innhold i erklæringssidene.

Siste komplette tekniske kontroll gjelder **c22f1dc**, ikke framtidige revisjoner. Lokal Docker/Linux arm64 er prøvd med Node 22.18.0 og 24.22.2, med frossen installasjon, format, typer, tester og begge bygg. Se CI-kontrollen for tall og avvik. Faktisk GitHub Actions, innlogging/delt drift, modellleverandør, faglig godkjenning og produksjonssetting gjenstår. Første delte miljø er fortsatt en lukket pilot.

## Hva er gjennomgått og hva bevares?

Kartleggingen omfattet 186 eksisterende Markdown-filer. Med denne nye oversikten er det 187: 16 dokumentasjonsinnganger i tabellen, 166 daterte rapport-/bevisfiler og fem prisfixtures. Tallene beskriver denne daterte gjennomgangen, ikke en automatisk oppdatert filoversikt.

- Gjeldende beskrivelser er avstemt mot kode, siste kontroller og kjente begrensninger. Dokumenter som allerede var riktige er beholdt.
- Daterte rapporter, tidligere råutkast og prisfixtures er ikke omskrevet for å passe dagens løsning. Gamle funn og avvik er fortsatt historiske bevis, ikke dagens feilstatus.
- AGENTS, arkivert README, bevislagringsforslaget og selve tilgjengelighetserklæringen er beholdt. Sammen med daterte filer og fixtures utgjør dette 175 Markdown-filer som kontrolleres uendret med SHA-256.
- Testdatoer, samtykke-/personvernkonklusjoner og tilgjengelighetsstatus endres bare ved nytt faktisk grunnlag. Dokumentasjonsavstemming er ikke en slik kontroll.

Ved senere vesentlige endringer brukes eksisterende vedlikeholdsregler i AGENTS. Oppdater relevante gjeldende dokumenter og pek til datert kontrollgrunnlag; bevar de eldre resultatene. Ingen ny periodisk jobb eller generell lagringsregel er innført her.
