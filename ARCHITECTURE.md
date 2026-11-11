# Kodestruktur

Portalen er én Next.js-applikasjon med en separat lokal RAG-prosess. Oppdelingen følger ansvar, ikke egne pakker eller mikrotjenester. Offentlig eksempelinnhold er tilgjengelig for statisk bygg; servermoduler importeres aldri av klientkomponenter.

## Hvor endrer jeg hva?

| Behov                                  | Modul                                                 |
| -------------------------------------- | ----------------------------------------------------- |
| Sider, metadata og ruting              | `src/app/`                                            |
| Offentlige eksempelressurser           | `src/content/resources.ts`                            |
| Profilfarger, flater og effekter       | `src/theme/`                                          |
| Grunnstiler og sidelayouter            | `src/styles/`                                         |
| Katalogens stil og visning             | `src/components/catalog.css` og `catalog.tsx`         |
| Chatvindu, meldinger og skjema         | `src/features/rag/components/`                        |
| Chattilstand og brukerhandlinger       | `src/features/rag/use-chat.ts` og `chat-state.ts`     |
| Nettleserens RAG-forespørsler          | `src/features/rag/client.ts`                          |
| Felles API-typer og validering         | `src/features/rag/contracts.ts`                       |
| Offentlig kildehenting                 | `src/features/rag/retrieval.ts`                       |
| Modelluavhengig svarflyt               | `src/server/rag/service.ts`                           |
| Modelladapter og instruksjoner         | `src/server/rag/ollama.ts`, `model.ts` og `prompt.ts` |
| HTTP, grenser og opprinnelseskontroll  | `src/server/rag/http.ts`                              |
| Miljøkonfigurasjon                     | `src/server/rag/config.ts`                            |
| Oppstart, bygg og manuell API-kontroll | `scripts/`                                            |

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

I Pages-modus bruker klienten offentlig kildehenting direkte, uten nettverkskall til en modell. Ikke legg private kilder i `retrieval.ts` eller andre klientimporterte moduler. Interne kilder krever en separat autorisert serverflyt.

HTTP-grensen får tillatte origins fra den validerte serverkonfigurasjonen (`RAG_ALLOWED_ORIGINS`). Oppstartsskriptet sender konfigurasjonen til HTTP-serveren; klienten leser ikke variabelen. En konfigurert liste erstatter loopback-standardene. Origin-kontroll erstatter ikke autorisering. HTTP-lesefeil/ugyldig input skilles fra uventede søke-/tjenestefeil. For store forespørsler avvises med 413 og eksplisitt lukking etter et begrenset tidsrom for å forkaste gjenværende opplasting uten buffering.

Tidsbudsjettet defineres én gang i den miljøfrie `src/config/rag.ts` og reeksporteres fra serverkonfigurasjonen: modell 60 s, proxy 65 s, klient 70 s. Den offentlige klienten importerer bare denne sikre verdifilen. Nexts experimental.proxyTimeout er kontrollert mot installert 16.4.3-kode/schema og satt eksplisitt. Rewrites lagres i byggmanifestet: RAG_PORT ved bygg må samsvare med tjenestens port ved kjøring; endret miljø ved next start er ikke en runtime-endring av destinasjonen. Lokal produksjonsprøve med to simulerte backender er dokumentert i `docs/rag/2026-11-10/lifecycle.md`.

## Stilstruktur

`src/app/globals.css` inneholder bare importrekkefølgen. Grunnstiler, layout, forside, katalog, artikler og chat har egne stilfiler. Eksisterende klassenavn beholdes, og filer importeres sentralt slik at dialogens portal også får stilene.

`portal-theme.ts` bygger på Digitalarkivets MUI-tema. `effects.ts` samler portalens egne farger og effekter for MUI. Felles CSS-variabler eksponeres via temaleverandøren og `tokens.css`. Bruk `accentTint()` i MUI og `color-mix(...var(--accent)...)` i CSS fremfor å gjenta profilens RGB-verdi.

## Kontroller

- `pnpm test:rag`: kildehenting, API-kontrakt, chattilstand, modelladapter og feiltilfeller. Ingen modell kreves. HTTP-integrasjonstestene åpner midlertidige loopback-porter med `listen(0, "127.0.0.1")` og lukker serverne etterpå.
- `pnpm typecheck`: TypeScript i klient, server og tester.
- `pnpm build`: vanlig Next.js-bygg.
- `pnpm build:pages`: statisk eksport.
- `node scripts/check-rag-api.mjs`: kontroll mot en kjørende lokal tjeneste.

Modelltestene bruker simulert transport og verifiserer integrasjonsformatet, ikke kvaliteten på en faktisk modell. Visuell kontroll er fortsatt nødvendig ved designendringer.
