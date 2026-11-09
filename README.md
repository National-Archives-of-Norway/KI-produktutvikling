# KI-Produktutvikling

Lokal Next.js-prototype for kunnskap, veiledninger og verktøy for KI i produktutvikling.

Se [versjonsloggen](VERSJONSLOGG.md) for endringer, kontroller og utførende agent. Tilgjengelighet er dokumentert i [WCAG-kontrollen](docs/tilgjengelighet/WCAG-KONTROLL.md) og [erklæringsgrunnlaget](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md). Lokale sider: `/tilgjengelighet/` og `/nettstedskart/`. Den formelle erklæringen i uustatus.no er ikke opprettet.

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

Portalen viser tre eksempelressurser og en beskrivelse av tilgjengelighetsskillen i det separate lokale `Skills`-repoet. Eksempelressurser er merket; skillen har egen detaljside med brukseksempel, versjon og plassering. Selve skill-pakken importeres ikke i portalen eller publiseres gjennom statisk bygg. Automatisk synkronisering og installasjon er ikke implementert.

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

Første versjon har en eksplisitt offentlig kunnskapsbase fra `src/content/resources.ts`, med tre eksempelressurser og en godkjent beskrivelse av tilgjengelighetsskillen. Hentingen bruker enkel nøkkelordrangering og prefiksmatching, ikke embeddings eller en vektordatabase. Titteltreff vektes høyere. Opptil tre relevante kilder sendes til modellen. Kilder uten treff fører ikke til modellkall.

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

## Tilgjengelighetskontroller

`pnpm test:rag` kjører alle eksisterende tester, også to tester av grunnkontraster. Etter statisk bygg kan Python 3 kjøre en avgrenset kontroll av eksportert HTML:

```sh
pnpm build:pages
python3 scripts/check-accessibility.py
# Med prosjektsti, hvis bygget ble laget med PAGES_BASE_PATH:
python3 scripts/check-accessibility.py --base-path /ki-produktutvikling
```

Kontrollen erstatter ikke skjermleser, manuell WCAG-vurdering eller kontroll av det publiserte nettstedet.

## Lokalt Skills-bibliotek

Et separat Git-repo ligger på denne maskinen i `/Users/khadah/Documents/ChatGPT/Skills`, med skills under `skills/<navn>/`. Første commit er `85af197`. Repoet har ingen GitHub-remote.

Tilgjengelighetsskillen ligger i `skills/tilgjengelighetserklaering/`. Den eksisterende installasjonen under `~/.codex/skills/tilgjengelighetserklaering/` er beholdt. Videre endringer i repo-kopien og den installerte kopien synkroniseres ikke automatisk.

Katalogmetadata ligger i `src/content/resources.ts`. Søk i `resource-search.ts` bruker tittel, beskrivelse og nøkkelord; skillen finnes med blant annet «tilgjengelighet», «tilgjengelighetserklaering», «WCAG» og «uustatus». Portalens katalog og RAG bruker bare beskrivende metadata, ikke filer fra Skills-repoet.

Tilgjengelighetsskill 0.3.0 lagrer nye testgjennomganger i målprosjektets `docs/tilgjengelighet/ÅÅÅÅ-MM-DD/<kjørings-id>/`, med råresultater, metadata og foreløpige rapporter. Etter vurdering skal kodeassistenten oppdatere eksisterende rapporter og lokal erklæring med lenke til kjøringen. Skriptet alene overskriver ikke slike hoveddokumenter. Eldre kontrollmapper fra 6.–7. november er beholdt som historisk evidens, og er ikke nye kjøringer av lagringsverktøyet.
