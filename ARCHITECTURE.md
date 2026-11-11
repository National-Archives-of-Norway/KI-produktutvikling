# Kodestruktur

Portalen er én Next.js-applikasjon med en separat lokal RAG-prosess. Oppdelingen følger ansvar, ikke egne pakker eller mikrotjenester. Offentlig eksempelinnhold er tilgjengelig for statisk bygg; servermoduler importeres aldri av klientkomponenter.

## Hvor endrer jeg hva?

| Behov                                     | Modul                                                 |
| ----------------------------------------- | ----------------------------------------------------- |
| Sider, metadata og ruting                 | `src/app/`                                            |
| Offentlige eksempelressurser              | `src/content/resources.ts`                            |
| Profilfarger, flater og effekter          | `src/theme/`                                          |
| Grunnstiler og sidelayouter               | `src/styles/`                                         |
| Katalogens stil og visning                | `src/components/catalog.css` og `catalog.tsx`         |
| Ren svarparser og grafemvalidering        | `src/features/rag/parse-answer.ts` og `contracts.ts`  |
| Chatvindu, meldinger og skjema            | `src/features/rag/components/`                        |
| Chattilstand og brukerhandlinger          | `src/features/rag/use-chat.ts` og `chat-state.ts`     |
| Avbrudd og eierskap til aktiv forespørsel | `src/features/rag/request-control.ts`                 |
| Grafembasert feltgrense og tilbakemelding | `src/features/rag/question-input.ts`                  |
| Nettleserens RAG-forespørsler             | `src/features/rag/client.ts`                          |
| Felles API-typer og validering            | `src/features/rag/contracts.ts`                       |
| Offentlig kildehenting                    | `src/features/rag/retrieval.ts`                       |
| Modelluavhengig svarflyt                  | `src/server/rag/service.ts`                           |
| Modelladapter og instruksjoner            | `src/server/rag/ollama.ts`, `model.ts` og `prompt.ts` |
| HTTP, grenser og opprinnelseskontroll     | `src/server/rag/http.ts`                              |
| Miljøkonfigurasjon                        | `src/server/rag/config.ts`                            |
| Oppstart, bygg og manuell API-kontroll    | `scripts/`                                            |

## RAG-flyt

```text
Chatvisning → useChat → requestAnswer → /api/rag
                                        ↓
                           HTTP og spørsmålsvalidering
                                        ↓
                             RAG-tjeneste → kildehenting
                                        ↓
                        Valgfri ModelAdapter → lokal Ollama
```

`RagResult` skiller mellom kildeutdrag og genererte svar. `RagError` kan beholde kilder når modellen feiler. Klienten validerer formatet før det brukes i visningen.

`ModelAdapter` tilbyr `generate(question, sources, signal?)`. HTTP-grensen kobler klient-/proxyavbrudd til et AbortSignal, som tjenesten videresender til adapterens fetch sammen med modellfristen via `AbortSignal.any`. Ventingen avgrenses også hvis en adapter ignorerer signalet. Modellplass frigjøres i finally; kildeutdrag bevares i JSON 502/429. Kapasiteten settes med RAG_MAX_CONCURRENT (1–8, standard 1), per prosess, uten kø. Lokal Ollama og eksternt OpenAI-kompatibelt Chat Completions-API er støttet; en ny integrasjon krever egen konfigurasjon og tilgangsvurdering.

I Pages-modus lastes offentlig kildehenting dynamisk i demogrenen, uten nettverkskall til en modell. Den eksplisitte byggkonstanten NEXT_PUBLIC_STATIC_DEMO lar serverbygget fjerne demo-importen helt fra klient-JavaScript. Katalogens egne offentlige ressursdata påvirkes ikke. Ikke legg private kilder i `retrieval.ts` eller andre klientimporterte moduler. Interne kilder krever en separat autorisert serverflyt.

`loadRagConfig` bruker standarder bare når RAG-variabelen er usatt; eksplisitt tom/blank port, samtidighetsgrense eller origin-liste avvises. Den miljøfrie `parseRagPort` i `src/config/rag-port.ts` brukes av både Next-konfigurasjonen og RAG-serveren: standard 3001 bare når usatt, trimming før talltolking og identiske feilmeldinger. Miljøport må være 1–65535. Statisk Pages-bygg har ingen RAG-rewrite og trenger ikke porten. Isolerte oppstartstester kan injisere en ferdig konfigurasjon med port 0 i startRagServer, slik at operativsystemet velger port uten å tillate 0 i driftsmiljøet.

HTTP-grensen får tillatte origins fra den validerte serverkonfigurasjonen (`RAG_ALLOWED_ORIGINS`). Oppstartsskriptet sender konfigurasjonen til HTTP-serveren; klienten leser ikke variabelen. En konfigurert liste erstatter loopback-standardene. Origin-kontroll erstatter ikke autorisering. HTTP-lesefeil/ugyldig input skilles fra uventede søke-/tjenestefeil. For store forespørsler avvises med 413 og eksplisitt lukking etter et begrenset tidsrom for å forkaste gjenværende opplasting uten buffering.

Tidsbudsjettet defineres én gang i den miljøfrie `src/config/rag.ts` og reeksporteres fra serverkonfigurasjonen: modell 60 s, proxy 65 s, klient 70 s. Den offentlige klienten importerer bare denne sikre verdifilen. Nexts experimental.proxyTimeout er kontrollert mot installert 16.4.3-kode/schema og satt eksplisitt. Rewrites lagres i byggmanifestet: RAG_PORT ved bygg må samsvare med tjenestens port ved kjøring; endret miljø ved next start er ikke en runtime-endring av destinasjonen. Lokal produksjonsprøve med to simulerte backender er dokumentert i `docs/rag/2026-11-10/lifecycle.md`.

## Leksikalsk kildesøk

`retrieval.ts` bygger en indeks av offentlige kilder én gang ved modulinnlasting. `search-language.ts` samler begrunnede bokmåls-småord, normalisering og norsk suffiksstamming. Handlingsord beholdes med vekt 0,25; de teller i orddekningen og scoren, men kan ikke gi treff uten et emneord. Kildeord, tittel, innledning, linjestart, ordantall og termfrekvens beregnes ved indeksbygging, ikke per spørsmål.

Scoren skiller tittel/innledning/brødtekst og bruker dokumentfrekvens, dempet termfrekvens og lengdenormalisering. Orddekning må være minst halvparten; et enkelt brødteksttreff trenger strengere støtte. Lik score avgjøres bare av hovedemne i faktisk tittel og deretter corpusrekkefølge. Ingen embeddings eller modell brukes til rangeringen, og HTTP-kontrakten er uendret.

`createRetriever` lar tester lage egne indekser uten å mutere standardkorpuset. Innholdsendring i utvikling starter RAG-prosessen på nytt via watch, og bygger da en ny indeks. I drift må RAG og nettstedet fortsatt utrulles fra samme revisjon.

`chatSuggestions` i `src/features/rag/suggestions.ts` er felles kilde til spørsmål og forventet ressurs i ChatWelcome, ChatTranscript og regresjonstestene. Ingen av disse koblingene brukes som unntak i rangeringen.

[Evaluering og ablasjoner](docs/rag/2026-11-11/retrieval-suggestions.md) dokumenterer forenklingene. Utviklingssettet og historisk heldOutEvaluation er begge kjente regresjoner. Bare `tests/fixtures/rag-blind.json` skal fylles av et menneske som ikke justerer søket. Den leses kun av en rapporttest: treffsikkerhet, manglende fil og formatfeil rapporteres uten bygggrense. Tomt sett betyr ikke målt, og brukes ikke til tuning. Norsk stamming er fortsatt en heuristikk.

## Chatkontroller og svarvisning

Den rene request-control-modulen holder én aktiv AbortController. Brukeravbrudd frigjør den med en gang, og identitetskontroll hindrer at et gammelt svar eller finally rydder bort en nyere forespørsel. Reduceren kontrollerer også aktiv tur-ID før complete/cancel. Avbryt bruker samme signal som allerede går til HTTP-/modellflyten; dette garanterer ikke at ekstern leverandør stanser beregning/fakturering.

Composer beholder Send som egen submit-knapp og deaktiverer den under venting. En separat tastaturbetjent Avbryt-knapp bruker samme AbortController og flytter fokus tilbake til spørsmålsfeltet. Et ekstra klikk/Enter på Send kan dermed ikke skifte betydning og avbryte. Ingen tidsbasert sperre eller automatisk fokusflytting til Avbryt brukes. Skjemaet eksponerer aria-busy mens forespørselen pågår; samtaleloggen og den generelle ventestatusen ligger utenfor skjemaet. En permanent polite-status i feltets helpertekst varsler om kutting og viser grafemteller fra 90 % av grensen. IME begrenses etter avsluttet komposisjon. Meldingen og grenseberegningen samt forespørselseierskap kan testes uten React-testavhengigheter.

Parseren gjenkjenner bare ordnede markører med opptil tre siffer og avviser dem når neste ord er et norsk månedsnavn eller en vanlig forkortelse. Datoer og årstall blir dermed avsnitt. Parseren normaliserer hele listen fra første nummer hvis markørene ikke er strengt stigende. Strengt stigende markører beholder hopp. Renderer bruker ol start for startverdien og li value bare ved faktiske hopp; avsnitt starter en separat liste med egen start.

## Stilstruktur

`src/app/globals.css` inneholder bare importrekkefølgen. Grunnstiler, layout, forside, katalog, artikler og chat har egne stilfiler. Eksisterende klassenavn beholdes, og filer importeres sentralt slik at dialogens portal også får stilene.

`portal-theme.ts` bygger på Digitalarkivets MUI-tema. `effects.ts` samler portalens egne farger og effekter for MUI. Felles CSS-variabler eksponeres via temaleverandøren og `tokens.css`. Bruk `accentTint()` i MUI og `color-mix(...var(--accent)...)` i CSS fremfor å gjenta profilens RGB-verdi.

## Kontroller

- `pnpm test:node`: alle Node-tester, også priser, innhold, lenkeparser og isolert RAG-oppstart. `test:rag` beholdes som alias for bakoverkompatibilitet.
- `pnpm test:python`: unittest-discover for HTML-tittelregresjonene.
- `pnpm test:content-sync`: reell watch-omlasting i midlertidig prosjektkopi. Kopieringsfunksjonen tar med `src/` unntatt `src/app/`; samme funksjon prøves uten watch i Node-pakken.
- `pnpm test:links`: eksisterende relative filmål i rot-Markdown og direkte `docs/*.md`. Daterte bevismapper skannes ikke rekursivt, og URL-er, portalruter og fragmenter valideres ikke. Skriptet gjør ingen nettverkskall.
- `pnpm test`: Node, Python, innholdssynk og lenkekontroll i rekkefølge; `pnpm check`: format, typer, test og serverbygg.
- `pnpm build:pages`: statisk eksport, separat etter serverbygget.
- `node scripts/check-rag-api.mjs`: kontroll mot en kjørende lokal tjeneste.

HTTP-testene åpner og lukker midlertidige loopback-servere. Modell- og pristester bruker simulert transport/fixtures, ikke ekte leverandører. Python 3 må finnes på PATH. Visuell kontroll, faktiske hjelpemidler og leverandør-/driftsverifisering er separate kontroller.

`.github/workflows/ci.yml` kjører format, typer, samlet test, serverbygg og Pages-bygg ved push/PR eller manuell kjøring. Hele kontrollrekken kjøres i to matrisejobber: Node 22.18.0 (eksakt minsteversjon i engines.node) og Node 24 (nyeste tilgjengelige utgave med check-latest), med fail-fast=false. Prisjobben bruker samme 24-linje og samme SHA-låste checkout/setup-node. pnpm velges fra packageManager; låsefilinstallasjon bruker frozen-lockfile. Alle eksterne actions er låst til verifiserte fullstendige commit-SHA-er med versjonskommentar. Dependabot foreslår github-actions-oppdateringer ukentlig, uten automatisk fletting. Bare contents:read og ingen prosjektsecrets brukes. Prisinnhenting tilhører fortsatt den separate prisjobben. CI er klargjort i kode, ikke verifisert på GitHub; manuell kjøring på botens prisgren og statuskontroll før sammenslåing er forklart i [README](README.md) og [første-push-sjekklisten](docs/FORSTE-PUSH.md). [Lokal kontroll](docs/CI-KONTROLL.md) skiller syntaks-/fixture-testing fra faktisk Actions-kjøring.

Den tidligere README-en er bevart i [historikken](docs/HISTORIKK.md), med relative lenker tilpasset den nye plasseringen. Historiske testresultater er ikke nåværende godkjenning. Forslag til bevislagring ligger i [eget beslutningsgrunnlag](docs/BEVISLAGRING.md); eksisterende bevis er urørt.
