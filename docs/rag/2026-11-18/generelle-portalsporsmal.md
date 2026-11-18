# Generelle spørsmål om portalen – 18. november 2026

Utførende agent: Codex (OpenAI), uten underagenter. Arbeidskopi basert på 94882e9; tidligere ukommiterte driftsnotater er bevart. Ingen eksterne blindsett er lest eller kjørt; heldOutEvaluation og søketerskler er uendret.

## Bekreftet før retting

Brukerens spørsmål «hva inneholder denne siden?» ga bare informasjonskapsler. Tokenene var inneholder (lavvektet handling) og siden → sid (ordinært emneord). En tilfeldig sidereferanse i cookie-innholdet ble derfor nok til å velge denne kilden.

Brukeren bekreftet http://127.0.0.1:3000. Direkte kontroll av utviklingsserveren ga HTTP 200, mode=sources, reason=no_model og informasjonskapsler. RAG-health på 3001 ga generationEnabled=false. Teksten «uten språkmodell» var dermed korrekt for dette miljøet, ikke en modellfeil eller nettverksfallback. Utviklingens modelloppsett er ikke endret.

## Retting

Side, nettside og nettsted med bøyninger er nå en samlet gruppe med lavt signal, adskilt fra konkrete emneord. De får samme lave vekt som generelle handlinger når de står sammen med et tema. Generelle spørsmål uten et spesifikt tema må ha et eksplisitt søkealias for å velge en kilde; tilfeldig brødtekst får ikke emnestatus. Funksjonsoversikten har slike metadataaliaser og avleder fortsatt teksten fra registeret. Ingen spørsmålsstrenger eller kilde-ID-er er lagt inn som unntak i rangeringen.

Svargrunnlaget presiserer at oversikten gjelder portalen som helhet, og ber om et konkret tema ved spørsmål om en underside. Nåværende sideadresse sendes ikke i API-et, så løsningen påstår ikke å kjenne hvilken underside brukeren mener. Søkealiasene inngår ikke i API-svar eller modellens kildeprosa. Visningen uten modell bruker «Hovedpunkter fra kilden» og «Åpne kilden» fremfor å kalle en liste over innhold en fremgangsmåte.

## Kildevalg før og etter

Tre nye forventninger feilet før endring, og tre kontrollspørsmål bestod allerede. Alle seks er lagt i utviklingssettet før retting; forventningene er ikke endret etter rangeringen.

| Spørsmål                                  | Før: kilder i rekkefølge                                     | Etter: kilder i rekkefølge                                   |
| ----------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| hva inneholder denne siden?               | informasjonskapsler                                          | funksjonalitet                                               |
| Hva finnes på nettsiden?                  | Ingen                                                        | funksjonalitet                                               |
| Hva er dette nettstedet?                  | tilgjengelighetserklaering, personvernerklaering, personvern | funksjonalitet                                               |
| Hva inneholder cookie-siden?              | informasjonskapsler, funksjonalitet, personvern              | informasjonskapsler, informasjonskapsler-og-samtykke, skills |
| Hva inneholder denne siden om personvern? | personvern, retningslinjer, github-copilot                   | personvern, personvernerklaering, github-copilot             |
| Hva inneholder denne pizzamenyen?         | Ingen                                                        | Ingen                                                        |

Søketestpakken bestod 131/134 med de seks nye forventningene før retting (tre feil). Etter retting bestod 136/136, inkludert de seks spørsmålene, en syntetisk test av generelle ord mot gjentatt brødtekst og en språkgruppetest. Eksisterende negative spørsmål og øvrige kjente evalueringer består. Tjenestetestene prøver samme spørsmål både uten modell og med simulert modelltransport, inkludert korrekt kilderekkefølge og fravær av søkemetadata i resultatet.

## Faktisk miljø og lokal modellprøve

- Etter automatisk omlasting gir brukerens API på 3000 HTTP 200, mode=sources, reason=no_model og bare funksjonalitet. Note-feltet forklarer portalomfanget.
- Nettleserprøve på 3000 er gjennomført på /spor og i forsidens chatbot. Begge viser funksjonalitetsoversikten, riktig kilde og «Hovedpunkter fra kilden». Ingen faktisk skjermleserprøve eller ny full tilgjengelighetsrevisjon.
- En separat midlertidig Docker-testcontainer brukte eksisterende Qwen3:4b med fire tråder og oppdaterte src-filer montert skrivebeskyttet. Modellserveren var bare på internt modellnett. Ingen modellnedlasting, nye vertsporter, containeromstart eller endring av brukerens modellkonfigurasjon. Prøven gikk gjennom tjenesten og den virkelige adapteren til Ollama, ikke gjennom nettleser/Next-proxy med modell aktivert.
- Faktisk Qwen-resultat: HTTP-lignende tjenestestatus 200, mode=generated, funksjonalitet som eneste kilde, 50.21 sekunder. Dette er én prøve, ikke garanti for kapasitet eller svartid.

Modellens faktiske svar:

Denne siden inneholder en funksjonalitetsoversikt over KI-Produktutvikling i Nasjonalarkivet, inkludert tilgjengelige funksjoner som Forside, Ressurskatalog (Beta), Spør KI (Beta), KI-prat, bruk av GitHub Copilot, godkjente MCP-er og KI-assistenter. [1]

## Begrensninger og videreføring

Ingen autentisering, API-kontrakt, modellvalg eller tidsgrense er endret. Modellen er fortsatt deaktivert i brukerens utviklingsmiljø. Kjørende Docker-portal på 3005 er ikke bygd om med denne rettingen; den separate modellen ble brukt til transportprøven. Ingen commit, push eller offentlig publisering. Sluttkontroll: pnpm check bestod med 307 Node-tester, tre Python-tester, faktisk innholdssynk, lenkekontroll, formatering, typekontroll og serverbygg. Pages-bygg bestod også. Avhengigheter og låsefil er uendret.

## Oppfølging 18. november – kjørende Docker fra c6daf22

Den tidligere begrensningen om at Docker-portalen ikke er bygd om gjelder før denne oppfølgingen. Portalen på 3005 er nå bygd fra ren commit c6daf2237ebab5e7b396ab8abae21d692a7b0763 og har fem samsvarende kilde-/dokumentkontrollsummer. Kjørende bilde: sha256:e07773bcdc17c3fbe6a605071725b48d690eb43ec01a32f4c0d7dfd4f8c87ad5. Bare portalcontaineren ble gjenskapt; eksisterende Ollama-container, modellvolum og modellmanifest er bevart.

Faktisk POST til http://127.0.0.1:3005/api/rag med korrekt Origin gikk gjennom Next-proxy og RAG til Qwen3:4b med fire tråder. Resultat: HTTP 200, mode=generated, bare funksjonalitet som kilde, gyldig [1] og 14,17 s. Svaret beskriver portalens funksjonalitet og ressurser fremfor å svare som om spørsmålet gjaldt cookies. Dette er én faktisk API-prøve, ikke en ny nettleser-/skjermleserprøve, kapasitetsmåling eller offentlig modellgodkjenning.

Kildesøk i kjørende container beholder informasjonskapsler først for cookie-siden og personvern først for «denne siden om personvern». Forside, Spør KI og de tre dokument-/oversiktssidene svarte HTTP 200; portal healthy og RAG status=ok/generationEnabled=true. Utviklingsmiljøet på 3000 er ikke rekonfigurert. Ingen ny modellnedlasting, volumfjerning, full testpakke, Pages-bygg, commit, push eller offentlig publisering.

Modellens faktiske svar fra portal-API-et:

Denne siden inneholder en funksjonalitetsoversikt over KI-Produktutvikling i Nasjonalarkivet, inkludert tilgjengelige funksjoner som Forside, Ressurskatalog (Beta), Spør KI (Beta), KI-prat, Bruk av GitHub Copilot, Godkjente MCP-er, Godkjente KI-assistenter, Kom i gang, Om portalen, Retningslinjer (utkast), Personvernerklæring (utkast), Informasjonskapsler (utkast), Oversikt (Beta), Priser for KI-verktøy (Beta), Feilside for ukjent adresse, Tilgjengelighetserklæring (utkast), Nettstedskart og Versjonslogg. [1]
