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

`loadRagConfig` bruker standarder bare når RAG-variabelen er usatt; eksplisitt tom/blank port, samtidighetsgrense eller origin-liste avvises. Miljøport må være 1–65535. Isolerte oppstartstester kan injisere en ferdig konfigurasjon med port 0 i startRagServer, slik at operativsystemet velger port uten å tillate 0 i driftsmiljøet.

HTTP-grensen får tillatte origins fra den validerte serverkonfigurasjonen (`RAG_ALLOWED_ORIGINS`). Oppstartsskriptet sender konfigurasjonen til HTTP-serveren; klienten leser ikke variabelen. En konfigurert liste erstatter loopback-standardene. Origin-kontroll erstatter ikke autorisering. HTTP-lesefeil/ugyldig input skilles fra uventede søke-/tjenestefeil. For store forespørsler avvises med 413 og eksplisitt lukking etter et begrenset tidsrom for å forkaste gjenværende opplasting uten buffering.

Tidsbudsjettet defineres én gang i den miljøfrie `src/config/rag.ts` og reeksporteres fra serverkonfigurasjonen: modell 60 s, proxy 65 s, klient 70 s. Den offentlige klienten importerer bare denne sikre verdifilen. Nexts experimental.proxyTimeout er kontrollert mot installert 16.4.3-kode/schema og satt eksplisitt. Rewrites lagres i byggmanifestet: RAG_PORT ved bygg må samsvare med tjenestens port ved kjøring; endret miljø ved next start er ikke en runtime-endring av destinasjonen. Lokal produksjonsprøve med to simulerte backender er dokumentert i `docs/rag/2026-11-10/lifecycle.md`.

## Leksikalsk kildesøk

Spørsmål og offentlige kilder får samme aksentnormalisering og avgrensede norske suffiksstamming. Generelle handlinger tas ut av emneordene. Brødtekst matches på stammer; tittel og ressursnavn kan også gi avgrensede sammensetningstreff. Minst halvparten av de ulike emnestammene må treffe, med sterkere krav ved ett treff. Score skiller tittel/innledning/brødtekst og vekter sjeldne ord. Lik score avgjøres av tittel, dekning, linjestart og kildefokus før corpusrekkefølge. Ingen embeddings eller modell brukes til rangeringen.

[Evaluering og eksakte regler](docs/rag/2026-11-11/relevans-boyninger.md) beskriver terskelvalget, forventningene og begrensningen ved gjenbruk av testsettet. Norsk stamming er en heuristikk; API-kontrakten er uendret.

## Chatkontroller og svarvisning

Den rene request-control-modulen holder én aktiv AbortController. Brukeravbrudd frigjør den med en gang, og identitetskontroll hindrer at et gammelt svar eller finally rydder bort en nyere forespørsel. Reduceren kontrollerer også aktiv tur-ID før complete/cancel. Avbryt bruker samme signal som allerede går til HTTP-/modellflyten; dette garanterer ikke at ekstern leverandør stanser beregning/fakturering.

Composer flytter fokus til spørsmålsfeltet etter avbrudd og har en tastaturbetjent Avbryt-knapp mens forespørselen pågår. En permanent polite-status i feltets helpertekst varsler om kutting og viser grafemteller fra 90 % av grensen. IME begrenses etter avsluttet komposisjon. Meldingen og grenseberegningen samt forespørselseierskap kan testes uten React-testavhengigheter.

Parseren normaliserer hele listen fra første nummer hvis markørene ikke er strengt stigende. Strengt stigende markører beholder hopp. Renderer bruker ol start for startverdien og li value bare ved faktiske hopp; avsnitt starter en separat liste med egen start.

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

`.github/workflows/ci.yml` kjører format, typer, samlet test, serverbygg og Pages-bygg ved push/PR eller manuell kjøring. Node velges fra package.json sine engines og pnpm fra packageManager; låsefilinstallasjon bruker frozen-lockfile. Bare contents:read og ingen prosjektsecrets brukes. Prisinnhenting tilhører fortsatt den separate prisjobben. CI er klargjort i kode, ikke verifisert på GitHub; manuell kjøring på botens prisgren og statuskontroll før sammenslåing er forklart i [README](README.md).

Den tidligere README-en er bevart i [historikken](docs/HISTORIKK.md), med relative lenker tilpasset den nye plasseringen. Historiske testresultater er ikke nåværende godkjenning. Forslag til bevislagring ligger i [eget beslutningsgrunnlag](docs/BEVISLAGRING.md); eksisterende bevis er urørt.
