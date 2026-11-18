# Utviklingsplan

Denne planen viser hva vi vil gjøre videre med KI-Produktutvikling, hva som må avklares og hvordan retningen har endret seg. Gjennomførte endringer står i [versjonsloggen](VERSJONSLOGG-OFFENTLIG.md). Se [funksjonalitetsoversikten](/funksjonalitet/) for hva som finnes nå.

**Sist oppdatert: 18. november 2026. Status: lokal prototype under utvikling.** Nettstedet skal være offentlig uten innlogging. Offentlig lansering og lanseringsdato er ikke bekreftet. Planpunktene nedenfor er ikke ferdig godkjent; tidligere lokale tester gjelder sine dokumenterte revisjoner.

## Første prioritet – offentlig lansering

| Krav                                     | Neste leveranse og ferdigkriterium                                                                                                            | Status og avhengighet                                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| P1 – Omfang og drift                     | Velge plattform, nettadresse, offentlig innholdsutvalg og navngitte eiere for drift og innhold.                                               | Avventer beslutninger. Offentlig tilgang uten innlogging er valgt.                                                  |
| P2 – Offentlig innholdsgrense            | Kontrollere sider, vedlegg, RAG-kilder og byggutdata slik at bare offentlig godkjent innhold følger med.                                      | Gjennomgang gjenstår. Det tidligere innloggingskravet er trukket tilbake, ikke implementert.                        |
| P3 – Kjøremiljø                          | Etablere HTTPS, intern tjenestekobling, helsesjekker og utrulling fra samme revisjon.                                                         | Lokal kjøring finnes; faktisk offentlig miljø gjenstår. Modellgenerering trenger serverdrift utover statiske sider. |
| P4 – Kontroll og utrulling               | Få automatisk kvalitetskontroll til å bestå i delt miljø og verifisere review, rettigheter og utrulling.                                      | Lokale tester og bygg er utført. Avklaring av kjøreoppsettet og faktisk CI-verifisering gjenstår.                   |
| P5 – Modellvalg                          | Beslutte modell og databehandling, eller åpne med kildebasert veiledning uten generering. Prøve faktisk svar- og feiloppførsel i valgt miljø. | Lokal modell er prøvd; godkjenning og offentlig driftsoppsett er ikke avklart.                                      |
| P6 – Misbruksvern                        | Avklare kapasitet, innføre rate-/kostnadsgrenser for anonyme besøkende og teste overbelastning og nøkkelbeskyttelse.                          | Samtidighetskontroll er lokalt testet; den erstatter ikke vern for en åpen tjeneste.                                |
| P7 – Innholdsansvar                      | Gjennomgå innhold, skills, vedlegg og profilrettigheter og utpeke ansvarlige for vedlikehold.                                                 | Faglig gjennomgang og nødvendige rettighetsavklaringer gjenstår.                                                    |
| P8 – Tilgjengelighet                     | Fullføre aktuelle manuelle tester, reteste nyere endringer og oppdatere erklæring med endelig omfang og nettadresse.                          | Samlet samsvar er ikke ferdig vurdert. Automatiske og avgrensede lokale prøver er delgrunnlag.                      |
| P9 – Sikkerhet og personvern             | Verifisere faktisk logging, lagring/sletting, informasjon til brukerne, overvåking, hendelseshåndtering og tilbakeføring.                     | Lokale sikkerhetsrettinger er utført; godkjenning av faktisk offentlig miljø gjenstår.                              |
| P10 – Brukertest og lanseringsbeslutning | Gjennomføre representative oppgaver med brukere, rette prioriterte funn og dokumentere beslutning om offentlig åpning.                        | Brukertest og samlet lanseringsgodkjenning gjenstår.                                                                |

## Arbeid som kan gjøres lokalt nå

- Forberede testmatriser for anonyme besøkende, direkte sider/vedlegg og Spør KI, inkludert kapasitetsfeil og grensen mot intern modellserver.
- Gjennomgå offentlig innholdsutvalg med relevante spørsmål til kildesøket og kontroll av faktainnhold og forbehold.
- Gjennomføre tilgjengelige manuelle tilgjengelighetskontroller, og dokumentere behov for hjelpemidler og tester som fortsatt ikke kan utføres.
- Forberede oppskrift for utrulling, overvåking og tilbakeføring, og holde den automatiske kontrollrekken oppdatert.
- Lage brukertestoppgaver og kriterier for hva som må fungere før åpning.

## Beslutninger som krever ansvarlige

- Plattform/drift må avklare nettadresse, sertifikater, ressurser, intern ruting og driftsansvar.
- Repo-/kjøremiljøansvarlige må avklare kjøreoppsett, rettigheter og faktisk automatisk kontroll.
- Fag- og innholdseiere må godkjenne offentlig materiale og videre vedlikehold.
- Modell-, sikkerhets- og personvernansvarlige må avklare modellbruk, databehandling og informasjon til brukerne.
- Tilgjengelighetsansvarlig og prosjekteier må følge opp testrestene og godkjenne lanseringsgrunnlaget.

Ingen personer, frister eller godkjenninger er fastsatt gjennom denne planen. Offentlig tilgang gjør ikke interne modeller, serverhemmeligheter eller administrasjonsgrensesnitt offentlige.

## Neste prioritet – forbedre nytten

- Prioritere ressurser og eksempler etter reelle arbeidsoppgaver og tilbakemeldinger.
- Tydeliggjøre ansvar, review og modenhet for innhold og skills.
- Videreutvikle søk og kildebaserte svar fra dokumenterte funn, uten å tilpasse søket til menneskeforvaltede blindsett.
- Forbedre språk, navigering og tilgjengelighet etter brukertest og retest.

## Senere utvidelser som må prioriteres

- Modelloversikt er et planlagt tema; innhold, omfang og leveringstidspunkt er ikke besluttet.
- Forbruks- og kostnadsoversikt krever avklart datatilgang og behandling. Faktiske forbruksdata vises ikke i dagens løsning.
- Enklere distribusjon av skills vurderes etter behov, review og avklart distribusjonssted.
- Flere innholdskilder eller mer avansert søketeknologi vurderes bare hvis dokumenterte behov tilsier det. Ingen overgang til embeddings er besluttet.

## Datert beslutningshistorikk

- **30. oktober 2026:** Arbeidet startet med åtte faser og fire MVP-er. Lokal utvikling, designprofil, ressurser og RAG ble valgt som første grunnlag. Pages-demonstrasjon og senere beskyttet innhold inngikk i den daværende planen.
- **6.–7. november 2026:** Tilgjengelighetsarbeid og et separat lokalt Skills-bibliotek ble del av videreutviklingen. Kontrollgrunnlag og faktisk ferdig funksjon ble skilt fra åpne produksjonskrav.
- **9. november 2026:** Planen ble avstemt med implementasjonen, og P1–P10 ble konkretisert. Første delte miljø ble da planlagt som lukket pilot med innlogging. Dette er en historisk beslutning.
- **11.–16. november 2026:** Lokal modellutprøving, automatiske kvalitetskontroller og verifisering av driftsoppskriften ble prioritert. CI-støtten ble samlet på Node 24 den 16. november.
- **17. november 2026:** En konkret pilotsjekkliste ble først laget. Senere samme dag besluttet brukeren offentlig nettsted uten autentisering. Innlogging og medlemskontroll ble tatt ut av omfanget; P2 gjelder nå offentlig innholdsgrense og P6 misbruksvern for anonyme brukere. Krav til review, drift og databehandling består.
- **18. november 2026:** Dokumentene er fordelt etter formål: endringer i versjonsloggen, fremtid og beslutningshistorikk i planen, dagens funksjoner i funksjonalitetsoversikten. Dette endrer ikke lanseringsgodkjenning eller innebærer publisering.

## Slik holdes planen oppdatert

Planen oppdateres ved endrede prioriteringer, leveranser, avhengigheter eller beslutninger. En fullført leveranse beskrives kort med dato i versjonsloggen; funksjonsregisteret oppdateres hvis dagens tilbud endres. Historiske valg beholdes datert og erstatter ikke gjeldende retning. Vi skiller mellom implementert, lokalt testet, kontrollert i delt miljø og faktisk publisert.
