# KI-Produktutvikling

Lokal Next.js-prototype for kunnskap, veiledninger og verktøy for KI i produktutvikling.

## Start lokalt

Forutsetninger: Node.js 22 eller nyere og pnpm. Installer avhengighetene én gang:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Åpne http://127.0.0.1:3000. Serveren bindes bare til lokal maskin.

På denne maskinen kan Codex sin medfølgende runtime brukes uten en global Node-installasjon:

```sh
sh scripts/dev.sh
```

Dette forutsetter at avhengighetene allerede er installert. Skriptet bruker vanlig Node.js og pnpm hvis de finnes, ellers runtime-en fra Codex. Det installerer ikke verktøy på maskinen.

## Kontroller og bygg

```sh
pnpm format:check
pnpm typecheck
pnpm build
pnpm build:pages
```

`pnpm format` formaterer kildefiler og dokumentasjon. `pnpm check` kjører formatkontroll, typekontroll og vanlig bygg etter hverandre.

Pages-byggingen lager statiske filer i `out/`, inkludert `.nojekyll`. Ved senere publisering på en prosjektsti settes `PAGES_BASE_PATH` til for eksempel `/ki-produktutvikling`:

```sh
PAGES_BASE_PATH=/ki-produktutvikling pnpm build:pages
```

Etter bytte av byggvariant kan utviklingsserveren startes på nytt. Ingen utrulling til GitHub Pages er konfigurert ennå.

## Struktur

| Sti                 | Innhold                                                            |
| ------------------- | ------------------------------------------------------------------ |
| `src/app/`          | Sider, ruting og metadata                                          |
| `src/components/`   | Felles navigasjon, logo og katalog                                 |
| `src/features/rag/` | Chatkomponenter, tilstand, API-klient, kontrakter og offentlig søk |
| `src/server/rag/`   | HTTP, konfigurasjon, svarflyt og modelladapter                     |
| `src/styles/`       | Grunnstiler og sidelayouter                                        |
| `src/theme/`        | MUI-tema og felles designverdier                                   |
| `scripts/`          | Lokal oppstart og bygg                                             |
| `tests/`            | Tester av søk, chattilstand og RAG-integrasjon                     |

Se [arkitekturbeskrivelsen](ARCHITECTURE.md) for modulgrenser og hvor ulike endringer hører hjemme.

## Design og innhold

Portalen bruker `@digitalarkivet/mui-theme` 5.1.0 og MUI 9.5.0. `src/theme/portal-theme.ts` bruker bibliotekets profilfarger, typografi og komponentstiler som grunnlag, med egne mørke blågrønne flater. Knapper, søkefelt, filtre, kort og kategorimerker er MUI-komponenter. Next.js-integrasjonen samler Emotion-stiler ved serverrendering.

Portalens egne former, dekorasjoner og responsive layout ligger i eget komponent- og CSS-lag. Lyse grønne aksenter hentes fra temaets sekundærfarge. Suisse-skriftfilene følger ikke med pakken og er ikke lastet inn; temaets reserveskrift brukes inntil godkjente skriftfiler er tilgjengelige. Portalens valgte arkillustrasjon er gjenskapt som ren SVG og vises ved siden av navnet i toppmenyen. Den følger aksentfargen #9DF1AD. Nedlastbar logo ligger i `public/brand/logo.svg`; favicon som SVG/ICO og Apple-ikon ligger i `src/app/`. Dette er portalens eget symbol, ikke Nasjonalarkivets offisielle virksomhetslogo. Pakken installeres fra npm uten tilgang til organisasjonens GitHub-repoer.

Alt innhold er offentlig eksempelinnhold lagret i kildekoden. Markdown-basert publisering, faktiske skills og installasjon kommer senere. Eksempelkortene har egne detaljsider med bruksveiledning og eksempeltekst. Dette er ikke ferdige installasjonspakker.

## Tilgang og sikkerhet

- Ingen GitHub-app, token eller innlogging er konfigurert.
- Prosjektet utfører ingen operasjoner mot organisasjonens andre repoer.
- Ikke legg internt innhold eller hemmeligheter i denne prototypen eller `public/`.
- Lokale `.env`-filer ignoreres av Git; faktiske hemmeligheter skal aldri committes.
- Intern tilgang skal implementeres og testes på serveren i en senere fase.
- Et statisk Pages-bygg er ikke et miljø for beskyttet innhold.

Se [utviklingsplanen](UTVIKLINGSPLAN.md) for videre arbeid.

## RAG: Spør kunnskapsbasen

Åpne chatboten med «Spør KI»-knappen nederst til høyre på forsiden, eller bruk `/spor/` for en egen side. Chatvinduet har tastaturfokus, lukking med Escape, samtalehistorikk og utfellbare kilder. Historikken beholdes mens vinduet lukkes og åpnes på forsiden, men lagres ikke etter sideoppdatering. Hvert spørsmål behandles separat av API-et; tidligere meldinger sendes ikke til modellen. `pnpm dev` / `sh scripts/dev.sh` starter både Next.js (127.0.0.1:3000) og RAG-tjenesten (127.0.0.1:3001). Nettleseren bruker `/api/rag` på portalens adresse, og Next.js videresender lokalt til tjenesten.

Første versjon har en eksplisitt offentlig kunnskapsbase fra `src/content/resources.ts`, med tre eksempelressurser. Hentingen bruker enkel nøkkelordrangering og prefiksmatching, ikke embeddings eller en vektordatabase. Titteltreff vektes høyere. Opptil tre relevante kilder sendes til modellen. Kilder uten treff fører ikke til modellkall.

Uten konfigurert modell vises bare kildeutdrag. Det fremstilles ikke som et generert svar. For faktisk RAG-generering må en lokal Ollama-tjeneste med en allerede installert modell være tilgjengelig. Kopier `.env.example` til `.env.local` og sett `OLLAMA_MODEL` til det nøyaktige navnet på den installerte modellen. Start lokalmiljøet på nytt. Modellen installeres eller lastes ikke ned av portalen.

```text
OLLAMA_MODEL=navnet-på-din-installerte-modell
OLLAMA_URL=http://127.0.0.1:11434
RAG_PORT=3001
```

Adapteren bruker Ollamas `/api/chat`. Kun lokale loopback-adresser tillates; videresendinger følges ikke. Ingen skytilkobling eller GitHub-tilgang er konfigurert. Kildeutdrag og spørsmålet sendes til den lokale modellen. Spørsmål lagres ikke av appen, men modellserverens egen logging må vurderes separat.

Svar vises som ren tekst. Kildelisten viser hentet grunnlag, ikke bevis for at alle genererte påstander er riktige. Ingen automatiske verktøykall eller kjøring av kildeinstruksjoner er aktivert.

I Pages-bygg er modellkall deaktivert. Offentlig kildesøk kjører da i nettleseren. Ikke legg private data i denne listen: den inngår i den statiske klienten.

I serverproduksjon må både Next.js og `pnpm rag:start` kjøres, med korrekt intern ruting. Versjonen er laget for lokal utprøving. Før offentlig produksjon trengs tilgangskontroll, ratebegrensning, driftsoppsett og godkjent modellvalg. Interne kilder krever autorisering før henting, egne indekser og kontrollert mellomlagring; de støttes ikke nå.

Kontroller:

```sh
pnpm test:rag
# Når lokal RAG-tjeneste kjører på standardporten:
node scripts/check-rag-api.mjs
```

Testene dekker rangering, manglende treff, spørsmålsvalidering, offentlig kildeliste, samtaletilstand, API-kontrakt og modelladapterens feiltilfeller. Modelladapteren testes med simulert transport uten eksterne kall. API-kontrollen dekker henting og avvisning av ugyldig JSON/fremmed opprinnelse. Live modellgenerering er ikke verifisert uten konfigurert modell.
