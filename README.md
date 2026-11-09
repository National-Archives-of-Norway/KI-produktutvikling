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

Se [utviklingsplanen](UTVIKLINGSPLAN.md) for gjeldende fremdrift, leverte funksjoner og produksjonskrav P1–P10. Neste delte miljø skal være en lukket pilot. Planen skiller mellom lokal implementering, reell modell-/miljøtest og produksjonsgodkjenning.

Planen kan også leses på `/utviklingsplan/`, med lenke fra bunnteksten og nettstedskartet. Nettsiden bygges direkte fra Markdown-filen; oppdateringer følger neste bygg/utrulling uten en separat innholdskopi.

Ved vesentlige endringer oppdateres relevante faser og produksjonskrav i planen i samme arbeidsøkt som kode, versjonslogg og funksjonsregister. Dato og kontrollgrunnlag oppdateres når status endres; tidligere datostemplet historikk beholdes. Dette er en fast arbeidsregel i `AGENTS.md`, ikke automatisk godkjenning eller en periodisk jobb.

## Funksjonalitetsoversikt

Forsidens tre snarveier og valg av anbefalt prøveoppgave ligger i `src/content/home.ts`. Anbefalingen peker på en ressurs med slug; tittel, beskrivelse og lenke avledes av `resources.ts`, slik at forside, katalog, detaljside og Spør KI bruker samme tekst. For å anbefale en annen oppgave endres bare slug-en. En manglende ressurs gir feil ved oppstart/bygging.

`/funksjonalitet/` viser portalens funksjoner og modenhetsstatus, med lenke fra bunnteksten. Oversikten, nettstedskartet og Spør KI bruker samme register i `src/content/features.ts`. Ressursantall og beskrivelser av felles innholdssider hentes fra gjeldende innholdsdata. Det finnes ingen separat kopi som må oppdateres.

Ved en ny eller endret funksjon oppdateres registeret én gang, inkludert status og eventuelt rutemønster. Dette er også pålagt i `AGENTS.md`. Next.js-konfigurasjonen kontrollerer registeret ved lokal oppstart og bygging, også Pages-bygg: en ny uregistrert side, en slettet registrert side eller en lenke til en ukjent side gir feil. Testene dekker disse tilfellene. Kontrollen kan ikke tolke meningen med vilkårlige kodeendringer; funksjonsbeskrivelser og modenhetsstatus krever fortsatt en vurdering.

Siden oppdateres når innholdsdata/registeret endres og nettstedet bygges. Den viser støttede funksjoner og hva som krever oppsett, ikke en sanntidskontroll av modelltilkoblingen. Serverkonfigurasjon, API-nøkler og private dokumenter leses ikke av oversikten.

## RAG: Spør kunnskapsbasen

Åpne chatboten med «Spør KI»-knappen nederst til høyre på forsiden, eller bruk `/spor/` for en egen side. Chatvinduet har tastaturfokus, lukking med Escape, samtalehistorikk og utfellbare kilder. Historikken beholdes mens vinduet lukkes og åpnes på forsiden, men lagres ikke etter sideoppdatering. Hvert spørsmål behandles separat av API-et; tidligere meldinger sendes ikke til modellen. `pnpm dev` / `sh scripts/dev.sh` starter både Next.js (127.0.0.1:3000) og RAG-tjenesten (127.0.0.1:3001). Nettleseren bruker `/api/rag` på portalens adresse, og Next.js videresender lokalt til tjenesten.

Nettsidene og kunnskapsbasen bruker felles innhold fra `src/content/`. Teksten for Kom i gang, Om (inkludert KI-prat) og Retningslinjer ligger i `src/content/pages/`. Sidekomponentene viser dette gjennom `ContentArticle`, og `knowledge.ts` lager RAG-kilder fra de samme avsnittene. Introduksjon, steg og forbehold velges med avsnitts-ID-er; det finnes ingen manuelt kopierte utdrag i `retrieval.ts`. Ressursbeskrivelsene kommer fortsatt direkte fra `resources.ts`.

Rediger teksten i innholdsfilen, ikke i sidekomponenten eller RAG-koden. Bevar avsnitts-ID-er, eller oppdater referansene i `knowledge.ts` hvis strukturen endres. En slettet referanse gir feil ved bygging og i testene. Nye innholdssider registreres eksplisitt i `knowledge.ts` og får en rute; private dokumenter eller vedleggsinnhold leses ikke automatisk. Kun innhold som kan inngå i den offentlige klienten skal registreres her.

I lokalmiljøet oppdaterer Next.js sidene, og Node sin watch-modus starter RAG-tjenesten på nytt når importerte innholdsfiler endres. Oppdater nettleseren for å lese den nye teksten. Allerede viste chatsvar er historikk og skrives ikke om; send spørsmålet på nytt for å få nytt innhold. I produksjon må nettsiden bygges og RAG-tjenesten startes på nytt fra **samme Git-revisjon** ved utrulling. Felles innholdskilde erstatter ikke faglig gjennomgang av teksten.

Hentingen bruker nøkkelordrangering og prefiksmatching, ikke embeddings eller en vektordatabase. Titteltreff vektes høyere. Opptil tre relevante kilder sendes til modellen. Kilder uten treff fører ikke til modellkall.

Kontroller endringer med `pnpm test:rag` og `pnpm build`. `pnpm test:content-sync` tester også automatisk omlasting mot et virkelig RAG-API i en isolert midlertidig prosjektkopi. Den endrer ikke portalens innhold, bruker ingen modell og stopper testserveren etterpå.

Uten konfigurert modell vises en strukturert veiledning fra den best rangerte siden: introduksjon, konkrete steg, status/forbehold og en direkte kildelenke. Dette er kildebasert veiledning, ikke et modellgenerert svar på spørsmålet. Andre treff vises som korte, utfellbare kildebeskrivelser. Ved manglende treff vises avgrensningen og forslag til nye spørsmål. Spørsmålsknappene fyller inn feltet uten å sende automatisk.

Generering velges med `MODEL_PROVIDER`: `none` (standard), `ollama` eller `openai-compatible`. Uten modell brukes fortsatt veiledning fra kildene. Modelltjenesten brukes bare av RAG-serveren; nettleseren sender spørsmål til portalens `/api/rag`.

For et eksternt modell-API kopierer du `.env.example` til `.env.local` for lokal utvikling og fyller inn følgende **på serveren**:

```dotenv
MODEL_PROVIDER=openai-compatible
MODEL_API_URL=https://modell.example.no/v1/chat/completions
MODEL_NAME=modellnavn-fra-leverandoren
MODEL_API_KEY=sett-inn-nokkel-pa-serveren
RAG_PORT=3001
```

Adressen er et eksempel. Bruk leverandørens **fulle Chat Completions-endepunkt**, inkludert eventuell gateway-sti. Koden legger ikke til `/v1` eller `/chat/completions`. Adapteren bruker JSON med `model`, `messages` og `stream: false`, Bearer-autentisering og tekst fra `choices[0].message.content`. Den støtter dermed dette konkrete [Chat Completions-formatet](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create), ikke alle leverandørers API-er. Andre formater, Azure-endepunkter med `api-version`/`api-key`, Responses API og virksomhetsidentitet krever egne tilpasninger.

URL-en må bruke HTTPS og kan ikke inneholde brukernavn, passord, query eller fragment. Ufullstendig konfigurasjon av valgt ekstern modell stopper RAG-serveren med en melding som bare oppgir variabelnavn. Videresendinger følges ikke, og modellkall avbrytes etter 60 sekunder. Rå leverandørfeil, URL-er og konfigurasjon returneres ikke til nettleseren. Ved feil beholdes veiledning og kilder.

I produksjon legges nøkkelen i driftstjenestens secret-lager og injiseres som `MODEL_API_KEY` ved **kjøring av RAG-serveren**. Bruk aldri `NEXT_PUBLIC_`-prefiks eller `next.config.ts` sin `env`-seksjon til nøkkelen. Den skal ikke ligge i React-komponenter, innholdsfiler eller Git. `.env.local` er ignorert av Git; `.env.example` inneholder bare tomme verdier. Ingen reell URL eller nøkkel er konfigurert av dette oppsettet. Se også [API-veiledningen om serverlagrede nøkler](https://developers.openai.com/api/reference/overview).

Start RAG-tjenesten på nytt etter endring av modellvariabler: stopp og start `pnpm dev` i utvikling, eller restart serverprosessen som kjører `pnpm rag:start` i produksjon. Nøkkelen trengs ikke ved bygging av nettstedet. Spørsmål og hentede utdrag sendes til valgt leverandør når ekstern generering er aktivert; velg tjeneste etter virksomhetens avklaringer.

Lokal Ollama er fortsatt støttet. Velg `MODEL_PROVIDER=ollama` og oppgi navnet på en allerede installert modell:

```text
MODEL_PROVIDER=ollama
OLLAMA_MODEL=navnet-på-din-installerte-modell
OLLAMA_URL=http://127.0.0.1:11434
RAG_PORT=3001
```

Ollama-adapteren bruker `/api/chat` og tillater kun lokale loopback-adresser. Portalen installerer eller laster ikke ned modellen. Eldre oppsett med bare `OLLAMA_MODEL` virker fortsatt når `MODEL_PROVIDER` ikke er satt. Spørsmål lagres ikke av appen; valgt modellservers logging og lagring må vurderes separat. Ingen GitHub-tilgang er konfigurert.

Modellsvar presenteres med avsnitt, lister, utheving og klikkbare nummererte kildehenvisninger. Modelltekst blir aldri tolket som HTML eller vilkårlige lenker. Kildelisten viser hentet grunnlag, ikke bevis for at alle genererte påstander er riktige. Ingen automatiske verktøykall eller kjøring av kildeinstruksjoner er aktivert.

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
