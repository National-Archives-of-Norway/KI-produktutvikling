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

`ModelAdapter` inneholder bare `generate(question, sources)`. En fremtidig modellintegrasjon kan implementere dette grensesnittet uten å endre chatten eller HTTP-håndteringen. En slik integrasjon må få egen konfigurasjon og tilgangsvurdering; dagens adapter tillater bare lokal Ollama.

I Pages-modus bruker klienten offentlig kildehenting direkte, uten nettverkskall til en modell. Ikke legg private kilder i `retrieval.ts` eller andre klientimporterte moduler. Interne kilder krever en separat autorisert serverflyt.

## Stilstruktur

`src/app/globals.css` inneholder bare importrekkefølgen. Grunnstiler, layout, forside, katalog, artikler og chat har egne stilfiler. Eksisterende klassenavn beholdes, og filer importeres sentralt slik at dialogens portal også får stilene.

`portal-theme.ts` bygger på Digitalarkivets MUI-tema. `effects.ts` samler portalens egne farger og effekter for MUI. Felles CSS-variabler eksponeres via temaleverandøren og `tokens.css`. Bruk `accentTint()` i MUI og `color-mix(...var(--accent)...)` i CSS fremfor å gjenta profilens RGB-verdi.

## Kontroller

- `pnpm test:rag`: kildehenting, API-kontrakt, chattilstand, modelladapter og feiltilfeller. Ingen modell eller nettverksporter kreves.
- `pnpm typecheck`: TypeScript i klient, server og tester.
- `pnpm build`: vanlig Next.js-bygg.
- `pnpm build:pages`: statisk eksport.
- `node scripts/check-rag-api.mjs`: kontroll mot en kjørende lokal tjeneste.

Modelltestene bruker simulert transport og verifiserer integrasjonsformatet, ikke kvaliteten på en faktisk modell. Visuell kontroll er fortsatt nødvendig ved designendringer.
