# KI-Produktutvikling

## Oppfølging av ikke-tekstlig kontrast – 10. november 2026

Siste [rapport](docs/tilgjengelighet/2026-11-10/160352-a02d77cb2734/testrapport.md), [klassifisering](docs/tilgjengelighet/2026-11-10/160352-a02d77cb2734/raw/classification.json) og [48-kravsrestliste](docs/tilgjengelighet/2026-11-10/160352-a02d77cb2734/manuell-oppfolging.md). Nødvendige feltgrenser, ikoner, fokus-, valg-, meny- og trekkspillmarkeringer er vurdert. A11Y-07 i filterets 0,25s fargeovergang er rettet med samtidig tekst-/bakgrunnsskifte; 16 umiddelbare retester med tastatur/peker ved 1280/320 bestod. Øvrige prøvde nødvendige markeringer minst 3,392300:1. Alle 157 PDF-primitiver er klassifisert; 19 nødvendige/konservativt prøvde deler minst 4,191671:1. Svake perifere ellipseomriss er supplerende etter begrunnet informasjonsvurdering, ikke overskrevet til pass. PDF uendret.

**1.4.11 U → K i lokalt utvalg; 24 K / 11 I / 13 U / 0 B.** 1.4.3 beholdes K med ny filtertekst-retest. 35 krav har samlet maskinelt delgrunnlag, 34 har bredere manuell rest, 11 har ingen lokal utløsende innholdstype og tre har fullført lokalt manuelt utvalg. Dette er ikke samlet/formelt samsvar. PDF-alternativer/struktur/språk og faktisk skjermleser/zoom/enhet/pilot er fortsatt uavklart. Erklæringen viser alle 13 gjenværende U-krav. Tidligere avsnitt er datert historikk.

Avsluttende [native-regresjon](docs/tilgjengelighet/2026-11-10/162215-native-1eb13e38/native-manifest.json) etter bygg: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu gir 0 feil / 207 info-noter. Motorstatus er bevart, med separat manuell kontrastvurdering. 53 Node- og tre Python-tester samt produksjonsbygg bestod.

## Kontrastoppfølging av tilstander og PDF – 10. november 2026

Siste vurderte resultat: [rapport](docs/tilgjengelighet/2026-11-10/145250-bd1373c8699b/testrapport.md) og [48-kravsrestliste](docs/tilgjengelighet/2026-11-10/145250-bd1373c8699b/manuell-oppfolging.md). 23 faktiske UI-tilstander / 694 tekstmålinger, inklusive hover/valg, validering og kontrollert lasting/tjenestefeil, gir minst 5,209084:1 for aktuelle tekster. Den eneste svakere målingen gjelder inaktiv Tøm chat under lasting. Alle 2694 synlige tegn på syv PDF-sider er målt mot riktig bakgrunn og kontrollert i render: minst 4,932072:1. Ingen ny bekreftet kontrastfeil og ingen design-/PDF-retting nødvendig. Testresponsen er identisk tilbakeført; PDF-hash er uendret.

**1.4.3 U → K i prøvd lokalt HTML/PDF-utvalg. 23 K / 11 I / 14 U / 0 B**, ikke formelt samsvar. 27 feltkant-/ikon-/fokusmålinger gir minst 3,421389:1, men full klassifisering av nødvendig grafisk informasjon under 1.4.11 står U. 35 bredere manuelle oppfølginger, 11 uten utløsende innholdstype og to fullførte lokale manuelle utvalg videreføres. Faktisk skjermleser/zoom/enhet/pilot er ikke nytestet. Erklæringen lister alle 14 gjenstående U-krav; tidligere avsnitt er datert historikk.

Avsluttende [native-regresjon](docs/tilgjengelighet/2026-11-10/150658-native-bf6961aa/native-manifest.json) etter bygg: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 noder, 0 Nu-feil / 207 info-noter. Motorstatus er bevart; den vurderte kontrastkonklusjonen er dokumentert separat.

## Målrettet kontrastoppfølging – 10. november 2026

Siste vurderte oppfølging: [rapport med alle 86 forekomster](docs/tilgjengelighet/2026-11-10/135417-d3e318e119fd/testrapport.md) og [48-kravsrestliste](docs/tilgjengelighet/2026-11-10/135417-d3e318e119fd/manuell-oppfolging.md). Alle 86 opprinnelige axe-targets er entydig undersøkt i produksjonseksporten ved 1280/320 px. Konservativ sRGB-/alpha-grense er minst 7,715057:1; 22 faktisk fokuserte kontroller minst 8,655854:1. Ingen bekreftet kontrastfeil i prøvde tilstander, ingen designretting nødvendig. Effekter og gradienter er beholdt. Modellen er ikke eksakt pixelmåling eller full hover-/PDF-godkjenning.

Ny axe på 23 ruter har 0 violations og samme tre incomplete-grupper / 86 noder. Motorens originalresultat er bevart; den separate vurderingen er ikke omskriving til pass. Nu på 25 eksportfiler gir 0 feil / 207 info-noter. Skill 0.5.1 er faktisk kjørt med nettlesermodul og `--auto`. 22 K / 11 I / 15 U / 0 B og uavklart samlet samsvar videreføres. 1.4.3 gjenstår for øvrige tilstander/overlegg og PDF; alle 15 U-krav beholdes i erklæringen. De 86 normalforekomstene er undersøkt, ikke en uutført restliste. Tidligere avsnitt nedenfor beskriver datert historikk.

Lokal Next.js-prototype for kunnskap, veiledninger og verktøy for KI i produktutvikling.

Se [versjonsloggen](VERSJONSLOGG.md) for endringer, kontroller og utførende agent. Tilgjengelighet er dokumentert i [WCAG-kontrollen](docs/tilgjengelighet/WCAG-KONTROLL.md) og [erklæringsgrunnlaget](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md). Lokale sider: `/tilgjengelighet/` og `/nettstedskart/`. Den formelle erklæringen i uustatus.no er ikke opprettet.

## Start lokalt

Forutsetninger: Node.js 22.18.0 eller nyere og pnpm. Installer avhengighetene én gang:

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

Portalen viser tre eksempelressurser og beskrivelser av tilgjengelighets-, personvern- og cookie-skillen i det separate lokale `Skills`-repoet. Eksempelressurser er merket; skillene har egne detaljsider med brukseksempel, versjon og plassering. Selve skill-pakkene importeres ikke i portalen eller publiseres gjennom statisk bygg. Automatisk synkronisering og installasjon er ikke implementert.

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

Tilgjengelighetsskill 0.5.1 lagrer nye testgjennomganger i målprosjektets `docs/tilgjengelighet/ÅÅÅÅ-MM-DD/<kjørings-id>/`, med råresultater, metadata og foreløpige rapporter. Etter vurdering skal kodeassistenten oppdatere rapportene med henvisning til kjøringen og skrive en separat brukerrettet erklæring. Skriptet alene overskriver ikke slike hoveddokumenter. Eldre kontrollmapper fra 6.–7. november er beholdt som historisk evidens, og er ikke nye kjøringer av lagringsverktøyet.

Personvernskill 0.1.0 ligger i `skills/personvernerklaering/` og er også installert under `~/.codex/skills/personvernerklaering/`. Den kartlegger faktisk databehandling og utformer eller oppdaterer personvernerklæringen fra vurdert grunnlag, med unike arbeidsmapper under `docs/personvern/ÅÅÅÅ-MM-DD/<kjørings-id>/` i målprosjektet. Hjelperen `scripts/start_review.py` oppretter bare arbeidsmappen; assistenten utfører kartleggingen og oppdaterer rapporter og eksisterende erklæring. Uavklarte fakta beholdes synlige, og ingen juridisk godkjenning eller publisering skjer automatisk.

Personvernskillen er søkbar med blant annet «personvern», «personvernerklaering», «GDPR», «cookies» og «Datatilsynet». Som andre skills er den merket Beta. Selve skillen er gjenbrukbar; portalens eget erklæringsutkast er beskrevet nedenfor.

## Personvernerklæring for portalen

[Personvernerklæringen](/personvern/) er tilgjengelig fra bunnteksten. Rediger teksten i `src/content/pages/personvern.ts`; samme kilde brukes av nettsiden og Spør KI. Utkaststatus inngår i funksjonsregisteret. Oppdater erklæringen og kartleggingen ved endringer i drift, innlogging, logging, analyse eller modellbruk.

[Kartleggingsrapporten](docs/personvern/PERSONVERN-KARTLEGGING.md) viser avklaringer. Daterte resultater ligger i `docs/personvern/2026-11-09/161600-a3368ac30b20/`, med manifest, behandlingsoversikt, sanitert evidens og et arkivutdrag av erklæringen. `docs/personvern/latest.json` peker til siste kjøring. Arkivutdraget er ikke en ekstra redigerbar hovedkilde.

Kontakt for personvernspørsmål er bekreftet som khadah@nasjonalarkivet.no. Utkastet gjelder lokal utvikling; virksomheten må fortsatt bekrefte ansvar, personvernombud, rettsgrunnlag, leverandører og lagringsrutiner. Nettleserlagring og produksjonsdrift er ikke fullstendig kontrollert.

## Priser for Copilot, Claude og Codex

Prissiden finnes på `/priser/`, med inngang fra Oversikt, nettstedskartet og funksjonsoversikten. Den skiller abonnement fra direkte API-priser og tokenpriser inne i Copilot. Dette er et utvalg, ikke en full modellkatalog eller oversikt over virksomhetens avtaler. Alle beløp er USD; avgifter, valutaomregning og avtalte rabatter beregnes ikke.

- `src/content/pricing/snapshot.json` er felles prisgrunnlag for siden og Spør KI. Hver kildegruppe har kilde-URL, `checkedAt` (siste vellykkede henting og parsing), `attemptedAt` og status.
- `scripts/pricing/sources.mjs` angir de seks offisielle kildene. `parse.mjs` inneholder avgrensede parserregler og utvalget av planer/modeller; nye modeller må vurderes og legges til eksplisitt. Endrede felt eller manglende valgte modeller gir feil, ikke gratispriser.
- Kjør `pnpm pricing:sync` lokalt for å hente nye priser. Krever utgående HTTPS og Node 22.18.0 eller nyere. Ingen modellnøkkel eller GitHub-tilgang brukes av innhentingen. Kontroller diffen og kildestatus før commit. Lokal visning følger innholdsendringer; delt miljø krever nytt bygg og samordnet utrulling av Next.js og RAG.
- Ved HTTP-/parsefeil beholdes tidligere prisrader og vellykket kontrolltidspunkt, siste forsøk registreres, og kommandoen avslutter med feil. Siden viser feilen først når dette snapshotet inngår i miljøets bygg. Ingen vellykket kontroll registreres bare fordi kilden svarte med en side.
- Endrede prisrader gir en automatisk oppføring i `VERSJONSLOGG.md`. Rene tidspunkt/statusendringer trenger ingen ny vesentlig endringsoppføring. Kildeformat, funksjon eller omfang som endres manuelt skal også føres i loggen og avstemmes med utviklingsplanen.
- `pnpm test:pricing` tester parsere og feilhåndtering uten nettverk. `pnpm test:rag` inkluderer også disse testene. Fixture-utdragene er testgrunnlag fra 9. november 2026, ikke en alternativ priskilde.

### Aktivere den daglige oppdateringen senere

`.github/workflows/pricing-sync.yml` er klargjort for hver dag kl. 06:00 UTC og manuell kjøring. Jobben kjører parserregresjonstester, henter kilder og åpner en PR med kun prisfilen og eventuell automatisk versjonslogg. Ved feil foreslås også feilstaten, og jobben markeres mislykket. En allerede åpen pris-PR overskrives ikke; gjennomgå og slå den sammen eller lukk den før neste oppdatering. Kontrolltidspunktene på siden er derfor viktigere enn at en jobb er planlagt daglig.

**Ikke aktivert:** Det lokale repoet har ingen GitHub-remote. Før automatikk kan starte må repoet legges på GitHub, Actions og opprettelse av PR med `GITHUB_TOKEN` tillates, og arbeidsflyten ligge på standardgrenen. Tokenet er kortlivet med `contents:write` og `pull-requests:write` i bare dette repoet; ingen PAT, modellnøkkel eller tilgang til andre repoer trengs. Jobben publiserer ikke nettsiden og slår ikke sammen PR-er automatisk.

Før hver pris-PR slås sammen: kjør hele testsettet og produksjonsbygg. PR-er opprettet med `GITHUB_TOKEN` utløser normalt ikke andre PR-arbeidsflyter. Koble deretter sammenslåtte endringer til valgt utrulling; deploy ved bot-push er ikke konfigurert. Oppdater prissidens aktiveringsstatus og funksjonsregisteret når denne kjeden er reelt testet. Siden viser en advarsel i nettleseren når siste vellykkede kontroll er eldre enn sju dager; dette trenger ikke et nytt serverbygg, men krever JavaScript.

## Oversikt og sidehierarki

`/oversikt/` er inngangen til priser og abonnement, tilgjengelig fra hovedmenyen og bunnteksten. Pristabellene ligger fortsatt på `/priser/`, med brødsmulesti tilbake til Oversikt. Oversikt er aktiv som overordnet menypunkt også på prissiden.

Tekst og planlagte områder vedlikeholdes i `src/content/overview.ts`. Siden, funksjonsregisteret og Spør KI bruker samme definisjoner. Modelloversikt og forbruk er kun planlagt, uten lenker eller simulerte bruksdata. Legg til faktiske datakilder og oppdater status når disse områdene implementeres. Prisene vedlikeholdes fortsatt bare i den felles prisfilen.

Ressurskatalogens navn, overskrift «Finn en ressurs» og introduksjon vedlikeholdes i `src/content/catalog.ts`. Forsiden, hovedmenyen og funksjonsregisteret bruker den felles teksten, som også inngår i Spør KI. Katalogen finnes fortsatt på `/#ressurser`.

Godkjente KI-assistenter ligger på `/oversikt/godkjente-ki-assistenter/`, med inngang fra Oversikt og retningslinjene. Felles innhold i `src/content/pages/godkjente-ki-assistenter.ts` brukes av siden, Oversikt, funksjonsregisteret og Spør KI. Copilot, Claude AI og Codex er registrert som godkjent etter brukerens opplysning 9. november 2026; godkjenningen er ikke utvidet til bestemte modeller, kontoer, datakategorier eller integrasjoner. Slike rammer må legges inn når de er bekreftet.

MCP-oversikten finnes på `/oversikt/godkjente-mcper/`, med inngang fra Oversikt og retningslinjene. Innhold i `src/content/pages/godkjente-mcper.ts` brukes også av Spør KI og funksjonsregisteret. Per 9. november 2026: Atlassian MCP har ROS-analyse pågående, og Slack MCP er planlagt vurdert. Ingen av dem er oppført som godkjent. Oppdater den felles kilden ved bekreftet statusendring; ingen integrasjon eller tilgang aktiveres av oversikten.

### Ny tilgjengelighetskontroll 9. november 2026

Den brede kontrollen ligger i `docs/tilgjengelighet/2026-11-09/201443-73cb0a3e52e0/`. `latest.json` peker til siste oppfølging nedenfor. Mappen inneholder originalmanifest, rå HTML-/kontrastresultater, 60 responsive DOM-kontroller, 40 tekstavstandskontroller, manuelle tester og skjermbilder. Hovedrapportene og `/tilgjengelighet/` er oppdatert etter vurdering, ikke automatisk av skriptet. Ett språkavvik (3.1.2) ble påvist på prissiden i denne brede kontrollen og er lukket i den målrettede retesten nedenfor; samlet samsvar er ikke ferdig vurdert. Tidligere rapporter er bevart.

Gjenta grunnkontrollen etter nytt Pages-bygg med `python3 /sti/til/tilgjengelighetserklaering/scripts/run_checks.py --project-root /sti/til/portalen --html-export out --agent 'Codex (OpenAI)' --project-version <testet-commit>`. Dette starter ingen nettleser og gir ingen samlet WCAG-godkjenning. Nettleser-/hjelpemiddelkontroller må dokumenteres separat. Midlertidig CSS brukt ved tekstavstandstesten er fjernet fra kildekoden.

### Retest av prisvilkår – 9. november 2026

A11Y-01 er rettet og retestet i `docs/tilgjengelighet/2026-11-09/203914-cf2e80bc00f7/`. Tidligere funn og den brede kontrollen er bevart i `201443-73cb0a3e52e0/`. Dette var en målrettet retest; siste status finnes i oppfølgingen nedenfor.

Copilot- og Codex-parserne genererer nå norske vilkårsnoter fra kjente kildefelt. Ingen engelsk kildesetning kopieres direkte inn i disse notene. Ukjent pris-, kreditt- eller tilleggsvilkårsformat gir kildefeil og beholder tidligere kontrollert norsk tekst. Dette er ikke en generell språkdetektor; nye kildeformater krever gjennomgang. `pnpm test:pricing` har åtte tester, inkludert tre språkregresjonstester av faktisk oppdateringsfunksjon og JSON-rundtur. Den eksisterende daglige arbeidsflyten kjører samme testfil; GitHub-jobben er fremdeles ikke aktivert. Faktisk lokal `pnpm pricing:sync` lyktes for alle seks kilder under retesten.

### Videre lokal tilgjengelighetskontroll – 9. november 2026

Historisk oppfølging før PDF-retting: [205326-389241d1fd6e](docs/tilgjengelighet/2026-11-09/205326-389241d1fd6e/testrapport.md). Statusen i dette avsnittet gjaldt før rettingen nedenfor. PDF-ens syv sider, struktur/metadata/tekst, seks kontrastpar, fire tastaturforløp og chatfokus er undersøkt. Råfiler, testprotokoll og skjermbilder ligger i kjøringsmappen. To PDF-funn er åpne: manglende semantiske overskrifter og generisk dokumenttittel. 25 K / 10 I / 11 U / 2 B er arbeidsstatuser, ikke samsvarsprosent. PDF-en er ikke rettet. Faktisk skjermleser, zoom, redusert bevegelse og øvrig testdekning gjenstår; konkrete testinstruksjoner står i rapporten. Tidligere HTML-/tekstavstands-/pristester er bevart, ikke fremstilt som nye.

### PDF-avvik rettet og retestet – 9. november 2026

Målrettet PDF-retest før den nye 48-punktsgjennomgangen: [210420-07c855b7770e](docs/tilgjengelighet/2026-11-09/210420-07c855b7770e/testrapport.md). Statusen i dette avsnittet gjelder denne historiske retesten. PDF-en har nå 27 kartlagte overskriftsroller og en beskrivende norsk tittel i både Info og XMP. Retest bekrefter 229 MCID-koblinger, PDF 1.7 og identisk tekst/sideinnhold/rendering på alle syv sider. Original, reparasjonsskript og uavhengig kontrollskript er bevart i kjøringens `raw/`. Scripts krever pypdf/pdfplumber/PIL fra det bundlede Python-miljøet; de er ikke nye npm-avhengigheter.

A11Y-02 og A11Y-03 er rettet i avgrenset struktur-/metadataomfang. 26 K / 10 I / 12 U / 0 B er arbeidsstatuser, ikke samsvarsprosent. 1.3.1 er fortsatt U for øvrig PDF-semantikk og faktisk hjelpemiddeltest, mens de tidligere 11 U-punktene består. Den redigerbare presentasjonskilden er ikke i prosjektet: ved fremtidig eksport må også kildefilens overskriftsstiler og tittel rettes. PDF-en er reparert direkte, og tekst/visuell utforming er beholdt. Samlet samsvar er ikke ferdig vurdert.

### Erklæring og testdokumentasjon

Den brukerrettede erklæringen ligger på `/tilgjengelighet/` og i `docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md`. Den beskriver tilgjengelighet, vesentlig usikkerhet og hjelp/kontakt, uten intern oppgaveliste eller rettingshistorikk. Testgrunnlag, arbeidsstatuser, åpne avklaringer og retester beholdes i `WCAG-KONTROLL.md`, daterte rapporter og utviklingsplanen. `latest.json` viser siste faktiske testkjøring; tekstlig opprydding endrer ikke testdato eller samsvarsstatus. Skill 0.4.0 i Skills-repoet og den installerte kopien bruker samme skille.

### 48 kravvise testprosedyrer i skill 0.4.0

Tilgjengelighetsskillen har nå egne prosedyrer for alle 48 krav i nettstedsmalen, fordelt på fire prinsippfiler. Hvert krav beskriver utvalg, nødvendig verktøy, fremgangsmåte, forventet resultat og dokumentasjon, med kilde hos Uu-tilsynet og celle i Excel-malen. Les `skills/tilgjengelighetserklaering/references/wcag-testprosedyrer.md` i Skills-biblioteket.

Nye kjøringer av `run_checks.py` får `testplan.json`, et prosedyreøyeblikksbilde i `testprosedyrer/` og 48 uavklarte kriterier i `wcag-grunnlag.json`. Dette utfører ikke automatisk prosedyrene eller gir bestått status. Faktiske tester må gjennomføres og dokumenteres med tilgjengelige verktøy. Portalens tidligere testresultater, siste kjøringspeker og erklæringens samsvarsstatus er ikke endret av denne skill-utvidelsen.

### Gjennomgang med skill 0.4.0 – alle 48 krav

Historisk vurdering: [221027-5ce9daf9d5dc](docs/tilgjengelighet/2026-11-09/221027-5ce9daf9d5dc/testrapport.md), 9. november 2026. `docs/tilgjengelighet/latest.json` viser den nyeste kjøringen. [Testplanen](docs/tilgjengelighet/2026-11-09/221027-5ce9daf9d5dc/testplan.json) har forventet/faktisk resultat, metode, evidens og neste steg for alle 48 krav. At et krav er gjennomgått betyr ikke at all nødvendig testing er fullført.

20 sider er undersøkt med 60 responsive DOM-kontroller, 40 tekstavstandskontroller, 160 Tab-steg og utvalgte dynamiske forløp. PDF-en er undersøkt videre. To nye avvik er åpne: A11Y-04 (listestruktur, PDF-side 7) og A11Y-05 (tekstkontrast, PDF-side 5). Arbeidsstatus er 20 K / 11 I / 15 U / 2 B, ikke samsvarsprosent. Tidligere overskrifts-/tittel-/språkrettinger er bevart. PDF-en er ikke endret i dette testoppdraget. Faktisk skjermleser, zoom og videre dekning gjenstår; konkrete instrukser finnes i planen og prosedyreøyeblikksbildet. Erklæringen beskriver barrierene kort, uten interne testtall og rettingshistorikk.

### Automatisk testflyt i skill 0.5.0

Tilgjengelighetsskillen kjører nå tilgjengelige automatiske deltester som del av testoppdraget. `browser_checks.mjs` brukes gjennom assistentens dokumenterte nettleser-API; `run_checks.py --auto` samler lokale HTML-/PDF-kontroller, tilgjengelig vnu og faktiske nettleser-/axe-resultater. Hver datert kjøring får `automatisk-dekning.json` og `manuell-oppfolging.md` med utførte deler, manglende verktøy og konkrete manuelle steg for alle 48 krav. Se `references/automatisering.md` i skill-pakken. Det er ingen automatisk fullgodkjenning; manglende tester gir fortsatt uavklart status.

Denne utvidelsen endrer skill og katalogbeskrivelse, ikke portalens siste tilgjengelighetsvurdering. `latest.json`, de to åpne PDF-avvikene og den brukerrettede erklæringen beholder sitt faktiske grunnlag. Nettlesermodulen er utviklingstestet i et isolert testoppsett; dette er ikke en ny full revisjon.

### Tilgjengelighetskjøring med skill 0.5.0 – 10. november 2026

Historisk hovedkjøring før retting: [testrapport](docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd/testrapport.md). [Manuell restliste](docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd/manuell-oppfolging.md) viser alle 48 krav med automatisk deldekning, vurdert arbeidsstatus og neste steg. 31 krav har automatiske delresultater; etter vurdering har 37 gjenstående vurdering/retting/retest, mens 11 ikke har utløsende innholdstype i lokalt omfang. Dette er ikke en samsvarsprosent eller full godkjenning.

Skillen er faktisk kjørt: 20 sider, 23 eksportfiler, 60 viewport-kontroller, 160 Tab-steg og tre deklarerte brukerforløp. 2484 tekstforekomster ble kontrastmålt; 75 ble hoppet over og krever vurdering. Axe/vnu manglet og står som blokkert. Bekreftede åpne avvik er PDF-listene, PDF-kontrast og et nytt språkavvik på 404-siden. Tittelelementene på feilsiden krever videre vurdering. Ingen produktfeil er rettet. Nye råresultater, tidligere bevis med opprinnelig dato og kort brukerrettet erklæring er holdt atskilt; `latest.json` viser siste hovedkjøring. Første delkjøring fra 9. november er bevart.

### Retest etter retting – 10. november 2026

Historisk retest før installasjon av motorene: [080757-ffaeb036427a](docs/tilgjengelighet/2026-11-10/080757-ffaeb036427a/testrapport.md). A11Y-04–06 er rettet og målrettet retestet: PDF-lister er kodet som tre lister med tolv punkter, tekstkontrast på side 5 er 6,28:1, og feilsiden har norsk tekst og én beskrivende tittel. Ingen bekreftede åpne avvik i undersøkt utvalg; samlet samsvar er fortsatt uavklart. [Manuell restliste](docs/tilgjengelighet/2026-11-10/080757-ffaeb036427a/manuell-oppfolging.md) beholder øvrige 37 vurderings-/retestpunkter og 11 krav uten utløsende innholdstype lokalt.

HTML-grunnkontrollen avviser nå også tomme og dupliserte sidetitler, inkludert eksporterte feilsider. Kjør `python3 -m unittest discover -s tests -p 'test_html_accessibility.py'` for regresjonstestene og `python3 scripts/check-accessibility.py --root out` etter Pages-bygg. Utrullingsmiljøets faktiske 404-fallback, skjermleser og øvrige manuelle kontroller må fortsatt prøves. PDF-en er 139 kB; tekst/sidegeometri og tidligere overskrifter/tittel er bevart.

### Lokale axe- og HTML-skann

Verktøyene er låst som utviklingsavhengigheter: `@axe-core/cli` 4.14.0, `vnu-jar` 26.11.9 og `chromedriver` 157.0.0. Node må være minst 22.18.0, og Nu krever Java 17 eller nyere. Verktøypakken har installert en lokal Java 17-runtime på denne maskinen. Installer med `pnpm install --frozen-lockfile`. Prosjektets `pnpm-workspace.yaml` tillater bare installasjonsskriptene for chromedriver og vnu-jar og beholder prosjektets lokale pakklager. Driver og Java-runtime lastes ned ved oppsett; ingen global Java-installasjon eller repo-/GitHub-tilgang kreves.

Kjør `pnpm build:pages`, deretter `pnpm test:a11y`. Skriptet starter en midlertidig webserver kun på 127.0.0.1, serverer bare eksporten fra `out/` og kjører axe i separat headless Chrome. Sidene og 404-fallback kommer fra funksjonsregisteret. Nu Html Checker leser eksportfilene lokalt. Innhold lastes ikke opp til en ekstern skanntjeneste, og statisk demo gjør ingen modell-API-kall. Dette tester vanlige sidetilstander i eksportvarianten; åpne dialoger, innlogging, skjermleser og modellgenererte svar krever egne tester.

Chrome/Chromium må finnes lokalt. Sett eventuelt `A11Y_CHROME_PATH` til installert nettleser. Den låste driverens hovedversjon må passe nettleseren; oppdater driveren bevisst hvis Chrome oppgraderes. Faktisk nettleser/viewport og motorversjon bevares i originale axe-resultater. Ingen brukerprofil gjenbrukes.

Hver kjøring oppretter en unik mappe i `docs/tilgjengelighet/ÅÅÅÅ-MM-DD/<tid>-native-<id>/`, med `native-manifest.json`, original `raw/axe.json`, én uendret axe-resultatoppføring per side og vnu-resultat/stdout/stderr. Exit 0 betyr fullført i delomfanget; 1 betyr funn/uavklarte kontroller/validatornoter til vurdering; 2 betyr teknisk feil. Manifestets `overall_conformance` er alltid uavklart. En feilet deltest hindrer ikke forsøk på den andre motoren. Ikke bruk en tom/feilet rapport som bestått skann.

`pnpm test:a11y:smoke` prøver begge faktiske motorene på en egen syntetisk side med manglende alt-tekst. Testen lykkes bare hvis begge finner den tilsiktede feilen. Dette er en verktøytest, ikke et funn i portalen. `node --test tests/a11y-tools.test.mjs` kontrollerer protokollfeil, ufullstendige/dupliserte sideresultater, validatorstatuser og avgrensning av eksportutvalget.

Assistenten vurderer de fullstendige native-resultatene sammen med tilgjengelighetsskillens daterte grunnlag. Skillens nåværende `--axe-report` tar én original axe-resultatoppføring; gi eksempelvis `raw/axe-01.json`, og behold manifest og full `raw/axe.json` som evidens for alle sidene. Import av én oppføring skal aldri beskrives som hele flersideskannet. Kjør skillens Python-hjelper via `pnpm exec python3 ...` slik at prosjektets lokale `vnu` er på PATH. Oppdater deretter kravmatrise og erklæring fra vurderte resultater, ikke automatisk fra antall beståtte regler.

Tidligere vurdert motorgrunnlag: [090740-ca8d9c80ecb6](docs/tilgjengelighet/2026-11-10/090740-ca8d9c80ecb6/testrapport.md), med [full native-kjøring](docs/tilgjengelighet/2026-11-10/090555-native-d984a7c5/native-manifest.json). Axe rapporterte 0 violations, men tre uavklarte kontrastgrupper / 80 elementforekomster; Nu rapporterte 0 HTML-feil og 191 tekniske info-/advarselsnoter. Begge motorer er faktisk kjørt. Samlet samsvar er fortsatt uavklart; [restlisten](docs/tilgjengelighet/2026-11-10/090740-ca8d9c80ecb6/manuell-oppfolging.md) viser alle 48 krav, med 37 bredere vurderings-/retestpunkter og 11 uten utløsende innholdstype lokalt. 34 krav har delgrunnlag fra nye og/eller tidligere automatiske tester; dette er ingen samsvarsprosent.

Minimum Node 22.18.0 dekker også direkte TypeScript-importer i test-/ruteskriptene uten ekstra flagg, se [Node-dokumentasjonen](https://nodejs.org/docs/latest-v22.x/api/typescript.html). Daterte auditmapper er unntatt Prettier fordi originalrapporter, verktøyutskrifter og prosedyreøyeblikksbilder skal bevares; rotens vedlikeholdte rapporter og kildekoden kontrolleres fortsatt.

## Lokal oppfølging av tilgjengelighet – 10. november 2026

Tidligere bred lokal vurdering er [094541-e2907a5c27e2](docs/tilgjengelighet/2026-11-10/094541-e2907a5c27e2/testrapport.md); dette er historikk. Nye nettleser-/tekstavstands-/dynamiske kontroller, konservative kontrastgrenser for 80 forekomster og isolert simulert prisalder er dokumentert. 22 K / 11 I / 15 U / 0 B er arbeidsstatus, ikke samsvarsprosent. 1.4.12 er K for prøvd lokal HTML-versjon. [Restlisten](docs/tilgjengelighet/2026-11-10/094541-e2907a5c27e2/manuell-oppfolging.md) skiller konkrete verktøy-/miljøhindringer fra videre faglig vurdering. Faktisk skjermleser, zoom og enhetsinnstillinger er ikke påstått testet. Native Chrome-tilgang ble avvist automatisk. Midlertidig CSS er tilbakeført med identisk hash; isolert testserver er stoppet. Eksisterende axe/Nu-bevis beholder opprinnelig dato; 80 incomplete-resultater er ikke omskrevet til motorpass.

## Erklæringens vurderingsstatus

`/tilgjengelighet/` og [Markdown-erklæringen](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md) skiller mellom kjente brudd og forhold som ikke er ferdig vurdert. De 15 uavklarte kravene fra siste vurderte matrise er listet med ID, tittel og en kort forklaring. Sidens brukerrettede sammendrag ligger i `src/content/accessibility.ts`; det skal avstemmes med ny vurdert kravmatrise når testgrunnlaget endres. Det er ingen automatisk import av interne rårapporter. Tilgjengelighetsskill 0.5.1 viderefører dette skillet. Testdato og samlet samsvar er uendret; denne oppdateringen er redaksjonell.

## Informasjonskapsler og samtykke

`/informasjonskapsler/` er lenket fra bunnteksten. Innholdet ligger i `src/content/pages/informasjonskapsler.ts` og brukes også av Spør KI og funksjons-/sideoversiktene. [Markdown-utdrag](docs/informasjonskapsler/INFORMASJONSKAPSLER.md) og [vurdert kartlegging](docs/informasjonskapsler/2026-11-10/121354-92b5bf52/rapport.md) dokumenterer lokalt omfang. `docs/informasjonskapsler/latest.json` peker til siste vurdering.

Den selvstendige skillen `informasjonskapsler-og-samtykke` 0.1.0 finnes i Skills-repoet og installert kopi. Den har egne kilder, mal, metadata-probe og standardbibliotekbasert Python-verktøy; ingen andre skills eller tidligere rapporter er påkrevd. Den er søkbar som Beta i katalogen. Nye kartlegginger lagres datert i målprosjektet, uten lagringsverdier eller cookie-verdier. Samtykke implementeres først etter avklart behov og autorisert oppdrag.

27 nettlesersnapshots / 21 sider og 21 dokumentresponser viste ingen lagrede oppføringer/Set-Cookie i lokalt utvalg. Det er ikke påvist behov for banner i dette omfanget; ingen banner er implementert. Dette er ikke en produksjonsgaranti: auth/drift/tredjeparter og mer fullstendig nettverks-/HttpOnly-innsyn gjenstår før pilot. Probeinstrumentering er fjernet; den skal ikke følge sluttbygget. Oppdater både brukerrettet informasjon og vurderingsgrunnlag ved nye integrasjoner.

## Målrettet tilgjengelighetskontroll av cookie-sidene – 10. november 2026

Tidligere vurdert cookie-oppfølging er [rapporten](docs/tilgjengelighet/2026-11-10/133024-18e0f9e56386/testrapport.md). `latest.json` peker nå til kontrastoppfølgingen ovenfor. Cookie-siden og cookie-skill-detaljsiden er prøvd med nettlesermodulen, full kontrollert Tab/Shift+Tab, hopp til innhold og økt tekstavstand ved 320/1280 px. Ingen nye bekreftede åpne brudd. Ny axe på 23 ruter gir 0 violations og 3 incomplete-grupper / 86 noder på eksisterende sider; begge nye sider har 0/0. Nu på 25 eksportfiler gir 0 feil / 207 info-noter. Originale data, teknisk mislykket første Tab-forsøk og vellykket oppfølging er bevart.

Arbeidsstatus 22 K / 11 I / 15 U / 0 B og uavklart samsvar videreføres. Tidligere brede bevis er eksplisitt referert, ikke fremstilt som nykjørt. [Restlisten](docs/tilgjengelighet/2026-11-10/133024-18e0f9e56386/manuell-oppfolging.md) beholder alle 48 krav og viser hjelpemiddel-, faktisk zoom-, enhets-, faglig og pilotavhengig rest. Ingen samtykkebanner er implementert eller testet. Test-CSS er tilbakeført byte for byte. Erklæringen oppgir nytt sideutvalg uten å få intern arbeidslogg.
