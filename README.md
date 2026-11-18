# KI-Produktutvikling

Portal for å lære, prøve og dele KI i produktutviklingen i Nasjonalarkivet. Next.js/TypeScript, MUI og Digitalarkivets tema brukes med portalens eget designlag. Sidene og Spør KI deler innhold fra `src/content/`.

## Oppstart

Krever **Node.js 24** (`>=24.0.0 <25.0.0` i [package.json](package.json)), pnpm-versjonen fra `packageManager`, og Python 3 til testene. CI, prisjobb og Docker bruker Node 24. Node 22 er ikke lenger en støttet eller løpende testet hovedversjon. Daterte kontrollresultater er bevart i [kontrollrapporten](docs/CI-KONTROLL.md).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

En ny installasjon trenger nettverk også når pnpm-pakkene er cachet: ChromeDriver og vnu-jar kan laste ned støttefiler. Dette er avhengighetsoppsett; testene henter ikke priser eller modellsvar fra leverandører.

Åpne http://127.0.0.1:3000. Next.js og RAG starter på loopback, normalt port 3000 og 3001. `sh scripts/dev.sh` kan bruke Codex-runtime når Node/pnpm mangler på PATH og avhengighetene er installert. Ny devport: `pnpm dev -- -p 3005`; tilpass også tillatte origins.

### Utviklingsfeil etter oppgradering

Etter oppgradering av Next.js eller andre avhengigheter: stopp eksisterende pnpm dev med Ctrl+C og start den på nytt. En gammel prosess kan fortsette å servere chunks fra forrige versjon selv om pakken på disk er oppdatert. Ved «module factory is not available»: stopp utviklingsserveren, fjern bare den genererte utviklingscachen med `rm -rf .next/dev`, og kjør pnpm dev igjen. Last den åpne nettleserfanen helt på nytt (Cmd+Shift+R på Mac). Dette gjelder lokal utvikling på 3000; Docker på 3005 oppdateres med eget bygg som beskrevet nedenfor.

Uten modellkonfigurasjon gir pnpm dev på 3000 kildebasert veiledning og viser «uten språkmodell». Dette er separat fra Docker-portalen på 3005, som konfigurerer Qwen. En fungerende nettside på 3000 betyr ikke at en modell er aktivert der.

## Lokalt testmiljø med Docker, Spør KI og Qwen3:4b

Denne oppskriften starter hele portalen med Next.js, RAG-tjenesten for Spør KI og lokal Qwen3:4b via Ollama. Ingen ekstern modellnøkkel kreves. Miljøet er bare tilgjengelig på maskinen din, uten innlogging; dette er ikke oppsett for et delt testmiljø eller en lukket pilot.

### 1. Klargjør maskinen og prosjektmappen

- Ha Docker Engine eller Docker Desktop med Docker Compose installert og startet. På Mac starter du Docker Desktop før kommandoene nedenfor.
- Ha en kopi av prosjektet med compose.yaml og Dockerfile. Kjør alle kommandoene fra prosjektets rotmappe.
- Første oppstart trenger internett til containerbilder, avhengigheter og omtrent 2,5 GB modellfiler. Sett også av plass til bilder, avhengigheter og byggcache.
- Oppsettet bruker CPU, også på Mac. Tilgjengelig minne og CPU påvirker svartiden. Tidligere prøve brukte ca. 7,75 GiB tilgjengelig Docker-minne; dette er et kontrollgrunnlag, ikke en garanti eller dokumentert minstegrense.

```sh
# Erstatt stien med prosjektmappen på din maskin:
cd /sti/til/KI-utvikling

docker version
docker compose version
docker compose config --quiet
```

Docker version skal vise både klient og server. Config-kommandoen skal avsluttes uten feil; den starter ingen tjenester. Du trenger ikke installere Node, pnpm, Python eller Ollama på vertsmaskinen for Docker-oppsettet. Den valgfrie skripttesten i steg 5 krever Node lokalt.

Du trenger heller ikke opprette .env.local for denne oppskriften: compose.yaml setter MODEL_PROVIDER=ollama, OLLAMA_MODEL=qwen3:4b og OLLAMA_URL=http://ollama:11434 og OLLAMA_NUM_THREAD=4. Miljøvariablene i .env.local brukes ved lokal utvikling utenfor Docker, og overstyrer ikke de faste Compose-verdiene.

### 2. Bygg og start

```sh
docker compose up -d --build
```

Første kjøring kan ta flere minutter. Oppstarten skjer i denne rekkefølgen:

1. **model-init** laster ned Qwen3:4b, eller gjenbruker den hvis den finnes i modellvolumet, og avsluttes.
2. **ollama** starter med modellen tilgjengelig og blir healthy.
3. **portal** starter Next.js og RAG i samme container når modellserveren er klar.

Følg nedlastingen i en annen terminal ved behov:

```sh
docker compose logs -f model-init
```

Ctrl+C avslutter bare loggvisningen; tjenestene som ble startet med -d fortsetter. En eksisterende tjeneste på verts-port 3005 må stoppes før portalen kan ta porten. Se feilsøking nedenfor.

### 3. Kontroller helsen

```sh
docker compose ps -a
docker compose exec ollama ollama show qwen3:4b
docker compose exec portal node -e "fetch('http://127.0.0.1:3001/health').then(r=>r.json()).then(console.log)"
```

Forvent følgende:

| Kontroll         | Forventet resultat                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------- |
| model-init       | Exited (0) er normalt: dette er en engangsjobb, ikke en tjeneste som skal kjøre hele tiden. |
| ollama og portal | Begge kjører og viser healthy når oppstarten er ferdig.                                     |
| ollama show      | Modellinformasjon for qwen3:4b, uten «model not found».                                     |
| RAG /health      | status: 'ok' og generationEnabled: true.                                                    |

RAG-port 3001 finnes inne i portalcontaineren, ikke som en publisert port på vertsmaskinen. Containerens helsesjekk undersøker både RAG og Next-siden /spor. generationEnabled=true betyr at en modelladapter er konfigurert; det beviser ikke alene at modellen kan generere et ferdig svar. Det prøves i steg 5.

### 4. Åpne portalen

- Forsiden: http://127.0.0.1:3005/
- Spør KI: http://127.0.0.1:3005/spor

Bruk port 3005 for Docker-utgaven. En separat pnpm dev-instans på port 3000 er et annet miljø. Nettleseren kaller portalens /api/rag; modellserveren skal ikke åpnes direkte fra nettleseren.

### 5. Prøv Spør KI med modellen

Skriv **«Hvordan skriver jeg en god prompt?»** i Spør KI. Kontroller at du får et modellgenerert svar med kildehenvisning, og at kilden «Gi KI tydelig kontekst» vises. **«Hvilke skills har vi?»** er et annet eksempel for å prøve ressurskatalogen.

**Verifiseringsstatus 16. november 2026:** Første isolerte prøve fant tidsavbrudd ved automatisk CPU-trådvalg. Compose bruker nå fire inferenstråder: kald og varm modell er retestet med samme Qwen-digest, tokenbudsjett og uendret 60-sekundersgrense. Se [retting og retest](docs/rag/2026-11-16/qwen-threads/rapport.md) og [opprinnelig feilgrunnlag](docs/rag/2026-11-16/readme-clean/rapport.md). Grønn helse alene skal fortsatt ikke regnes som bestått modelltest.

Første generering kan ta lengre tid mens modellen lastes inn i minnet. Modellen har 60 sekunders frist; proxy og klient har henholdsvis 65 og 70 sekunder. Hvert spørsmål behandles separat. Bruk portalens eksempelinnhold i testen, uten personopplysninger eller hemmeligheter.

Valgfri automatisert modellprøve, fra prosjektmappen på vertsmaskinen, med Node som tilfredsstiller engines.node i package.json:

```sh
node scripts/check-rag-model.mjs
```

Skriptet spør om prompt og brukerbehov, krever genererte svar med forventet kilde og [1], og kontrollerer at et irrelevant spørsmål gir ingen treff uten generering. Vellykket kjøring avsluttes med «Bestått». Den bruker faktisk lokal modelltransport og inngår aldri i pnpm test/CI. Skriptet er ikke kopiert til portalens runtimebilde og skal derfor ikke kjøres med docker compose exec. Uten lokal Node kan du teste gjennom nettleseren som beskrevet over.

Søket finner bare innhold som finnes i portalen. Ingen treff på et spørsmål utenfor kunnskapsgrunnlaget er forventet, også når modellen er frisk. Modellens svar må fortsatt kontrolleres mot kildene; kildehenvisninger er ikke faglig godkjenning. [Tidligere kontrollrapport](docs/rag/2026-11-12/compose-qwen.md) skiller reelle modellprøver fra automatiske simuleringer.

### 6. Stopp, start og oppdater

```sh
# Stopp og fjern tjenestecontainerne; behold modellvolumet:
docker compose down

# Start igjen, eller bygg oppdatert kode:
docker compose up -d --build
```

Qwen lagres i volumet ki-produktutvikling_ollama-models, utenfor Git og appbildet. Vanlig omstart gjenbruker modellen. **Ikke legg til -v ved vanlig down:** det sletter modellvolumet og krever ny nedlasting. En restart alene bygger ikke endret kildekode; bruk up -d --build etter kodeendringer og last siden på nytt.

Modelloppdatering er en separat, bevisst handling. Vanlig oppstart henter ikke en ny modelltagg når modellen allerede finnes. Hvis du faktisk vil hente modellen på nytt:

```sh
docker compose stop portal ollama
docker compose run --rm -e OLLAMA_FORCE_PULL=1 model-init
docker compose up -d
```

Kontroller at nedlastingen lykkes, registrer ny modelldigest og gjenta steg 3–5 etter modelloppdateringen.

### Feilsøking

Start med status og tjenestelogger:

```sh
docker compose ps -a
docker compose logs --tail=80 model-init ollama portal
```

| Symptom                                          | Hva du bør kontrollere                                                                                                                                                                                                                                                                                |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| «Cannot connect to the Docker daemon»            | Start Docker Desktop/Engine og prøv docker version igjen.                                                                                                                                                                                                                                             |
| «no configuration file provided»                 | Stå i prosjektroten der compose.yaml ligger.                                                                                                                                                                                                                                                          |
| Port 3005 er opptatt                             | Se docker ps for andre containere, eller kontroller andre lokale utviklingsservere. Stopp den aktuelle tjenesten før ny oppstart. Ikke endre bare porten: RAG_ALLOWED_ORIGINS i Compose må samsvare med nettleseradressen.                                                                            |
| model-init kjører lenge eller avsluttes med feil | Les model-init-loggen. Første nedlasting trenger nettverk, tilstrekkelig diskplass og eventuell godkjent nettverkstilgang gjennom virksomhetens proxy. Exited (0) er normalt; Exited med annen kode må undersøkes. Prøv vanlig up -d --build igjen etter at årsaken er rettet, uten å slette volumet. |
| «model not found» eller ollama er unhealthy      | Kontroller nedlastingsloggen og ollama show i steg 3. Modellnavnet er qwen3:4b i init, helsesjekk og RAG-konfigurasjon. Ikke endre bare én av dem.                                                                                                                                                    |
| Nettsiden virker, men du får ingen treff         | Prøv prompt-spørsmålet fra steg 5. Kontroller at du bruker Docker-port 3005. Ingen treff er et søkeresultat, ikke i seg selv en modellfeil.                                                                                                                                                           |
| Du får bare kildeutdrag, ingen generering        | Kontroller generationEnabled i steg 3. Statisk Pages-demo og en lokal server uten modelloppsett kan gi bare utdrag. Compose-oppsettet skal gi true. Ved gammelt bilde: bygg på nytt og last nettleseren på nytt.                                                                                      |
| HTTP 502, avkuttet svar eller tidsavbrudd        | Se portal-/ollama-loggene og docker stats. Kontroller tilgjengelig minne/CPU; prøv én kort forespørsel når modellen er varm. Modellen kan feile selv om health er grønn. Ugyldig/avkuttet modelltekst avvises, og tilgjengelige kilder beholdes.                                                      |
| HTTP 429                                         | Standardgrensen er ett samtidig modellkall. Vent på det aktive kallet eller avbryt det før du prøver igjen.                                                                                                                                                                                           |
| HTTP 403                                         | Bruk http://127.0.0.1:3005 eller http://localhost:3005. Andre porter/vertsnavn krever oppdatert RAG_ALLOWED_ORIGINS og ny opprettelse av portalcontaineren.                                                                                                                                           |
| Kodeendringer vises ikke                         | Kjør docker compose up -d --build og last siden på nytt. Kontroller at du ikke ser en separat dev-instans på port 3000.                                                                                                                                                                               |

Ved minne-/ytelsesproblemer kan docker compose exec ollama ollama ps vise innlastet modell og kontekst. Flere CPU-tråder er ikke automatisk raskere: autovalg av 18 tråder ga timeout i den målte Docker-profilen, mens fire tråder rettet problemet. OLLAMA_NUM_THREAD er en portalvariabel som sendes som options.num_thread. Endre portalens Compose-verdi/overstyring og gjenskap testportalen hvis trådprofilen skal justeres; .env.local overstyrer ikke den faste Compose-verdien. Ikke øk tidsgrensen som første løsning. Ikke bruk sletting av modellvolumet som første feilsøkingstiltak.

Portalen publiseres bare på 127.0.0.1:3005. Den kjørende Ollama-containeren har ikke vertsporter eller utgående internett; bare init-tjenesten laster ned modellen. API-nøkkel, repo eller Docker-socket monteres ikke inn i portalcontaineren. Node-/Ollama-bilder er låst til digester og installasjonen bruker låsefilen. Oppsettet bruker think=false, 8192 token kontekst og strukturert JSON-svar for Qwen3; portalen viser bare det validerte svarfeltet.

Docker-runtimebildet inneholder ikke testpakken. For kodearbeid, typekontroll og automatiske tester følger du «Oppstart» og «Kontroller» i denne README-en; disse krever lokale utviklingsverktøy. Docker-oppskriften over gjelder funksjonell lokal utprøving av den bygde portalen.

## Konfigurasjon

Kopier [.env.example](.env.example) til `.env.local` for lokal utvikling. I drift injiseres servervariablene i RAG-prosessen. Ekte nøkler skal ikke i Git, klientkode eller `NEXT_PUBLIC_*`.

| Variabel                       | Bruk                                                                                                                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MODEL_PROVIDER`               | `none` gir kildebasert veiledning; `ollama` eller `openai-compatible` aktiverer generering.                                                                                                    |
| `MODEL_API_URL`                | Fullt HTTPS Chat Completions-endepunkt, inkludert eventuell gateway-sti. Ingen query, fragment eller påloggingsinformasjon i URL-en.                                                           |
| `MODEL_NAME` / `MODEL_API_KEY` | Modellnavn og serverlagret Bearer-nøkkel. Begge kreves med eksternt API.                                                                                                                       |
| `OLLAMA_MODEL` / `OLLAMA_URL`  | Installert lokal modell og HTTP-loopback-adresse, normalt `http://127.0.0.1:11434`. Bare rotsti tillates; Compose tillater også nøyaktig `http://ollama:11434`.                                |
| `OLLAMA_NUM_THREAD`            | Valgfritt heltall 1–64 for portalens Ollama-kall (options.num_thread). Usatt lar Ollama velge; tom/ugyldig verdi avvises. Compose setter 4 for CPU-kjøring.                                    |
| `RAG_PORT`                     | Tjenesteport 1–65535, normalt 3001. Next og RAG bruker samme validering og trimmer mellomrom. Port 0 avvises som miljøverdi. Next-rewrite låses ved bygg: bygg og kjøring må bruke samme port. |
| `RAG_ALLOWED_ORIGINS`          | Kommaseparerte HTTP(S)-origins. Standard er `http://127.0.0.1:3000,http://localhost:3000`. En satt liste erstatter standardene. Tomme/ugyldige verdier stopper oppstart.                       |
| `RAG_MAX_CONCURRENT`           | Modellkall per prosess, heltall 1–8, standard 1. Ingen kø; full kapasitet gir 429 med kilder.                                                                                                  |
| `PAGES_BASE_PATH`              | Eventuell prosjektsti ved statisk bygg, for eksempel `/ki-produktutvikling`.                                                                                                                   |

For `RAG_PORT`, `RAG_MAX_CONCURRENT` og `RAG_ALLOWED_ORIGINS` gir en usatt variabel standardverdien, mens en eksplisitt tom eller blank verdi stopper oppstart. `.env.example` har gyldige RAG-verdier; fjern variabelen for å bruke standard, ikke sett den tom. Tomme `MODEL_API_*`-eksempelverdier er fortsatt tillatt når ekstern modell ikke er valgt. Port 0 brukes bare som eksplisitt injisert testkonfigurasjon. Serveroppstart fra miljøet avviser 0; testinjeksjonen brukes ikke av Next-rewrite.

Start RAG på nytt etter konfigurasjonsendring. Eksterne modeller mottar spørsmål og relevante utdrag; leverandør og databehandling må godkjennes før bruk. Det støttede formatet er Chat Completions med Bearer-nøkkel og `stream: false`; andre API-formater krever tilpasning. Tidsbudsjettet modell/proxy/klient er 60/65/70 sekunder i `src/config/rag.ts`. Origins er ikke autorisering.

## Kontroller

```sh
pnpm check
pnpm build:pages
```

`check` kjører formatering, typer, hele testløpet og serverbygg, i denne rekkefølgen. `test` kjører alle Node-tester, Python-tester, faktisk innholdsomlasting og Markdown-lenker. Pris- og modelltester bruker fixtures/simulert transport, uten kall til leverandørene. Lokale loopback-porter må være tillatt.

`pnpm dev` kjører også søkeregresjoner ved oppstart og på nytt når importerte innholds-/søkemoduler endres. Resultatene vises i terminalen; feil lar utviklingsserveren fortsette så du kan rette og få ny vurdering. Uten server kan du bruke `pnpm test:search:watch`. For én kontroll bruker du `pnpm test:search`. Dette tester kildevalg og kjente innholdsforventninger, uten modellkall. Nye emner trenger egne testspørsmål etter [AGENTS.md](AGENTS.md). CI kjører de samme testfilene gjennom `pnpm test`; runner-/IP-blokkeringen nedenfor gjelder fortsatt. Docker-produksjonsbildet tester ikke automatisk ved filendring og må bygges på nytt for innholdsoppdateringer.

| Kommando                 | Omfang                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm test:node`         | Ordinære Node-tester, inkludert syntetiske blindrapportkontroller; selve blindmålingen er unntatt. `test:rag` er et kompatibilitetsalias.                    |
| `pnpm test:search`       | Avgrensede søke-, språk-, nøkkelord- og Copilot-regresjoner uten modell eller blindmåling.                                                                   |
| `pnpm test:search:watch` | Samme søketester automatisk på nytt ved filendringer, også inkludert i `pnpm dev`.                                                                           |
| `pnpm test:python`       | Unittest-discover for `tests/test_html_accessibility.py`.                                                                                                    |
| `pnpm test:content-sync` | Isolert RAG-kopi og watch-omlasting etter endring i felles innhold.                                                                                          |
| `pnpm test:links`        | Relative filreferanser i rot-Markdown og direkte `docs/*.md`; ingen nettverkskall eller rekursiv beviskontroll. Fragmenter og portalruter kontrolleres ikke. |
| `pnpm test:pricing`      | Avgrensede parser-/fil-/PR-tester uten priskildekall.                                                                                                        |
| `pnpm test:a11y`         | Separat axe/Nu-kontroll etter Pages-bygg; krever passende Chrome/driver og Java. Er ikke full WCAG-godkjenning.                                              |

Blindmåling kjøres separat med `RAG_BLIND_FILE="<fil utenfor repoet>" pnpm test:blind`. [Repo-filen](tests/fixtures/rag-blind.json) er bare en tom mal; det ekte settet oppbevares og vurderes av et menneske utenfor repoet, aldri av den som justerer søket. Stier i repoet og symbolske omveier inn i repoet avvises. Uten variabel måles ingenting. Standardutskriften viser bare riktige/totalt, prosent, bom med forventet kilde og falske treff uten forventet kilde. `RAG_BLIND_VERBOSE=1` viser detaljer **kun for mennesker; aldri for den som justerer søket eller til tuning**. Målingen har ingen beståttgrense og inngår ikke i `pnpm test` eller CI; ordinære tester bruker bare egne syntetiske data.

[CI](.github/workflows/ci.yml) er klargjort for push, pull requests og manuell kjøring. Én jobb, **Node 24**, kjører hele kontrollrekken. Prisjobben bruker samme 24-linje; check-latest velger nyeste tilgjengelige 24-utgave ved oppsett. Docker-bildet beholder sin bevisst låste Node 24-digest. engines.node avgrenser støtte til 24-linjen; ved bytte av hovedversjon må CI, prisjobb, Docker og versjonskravet avstemmes sammen. pnpm velges fra `packageManager`. Python 3 settes opp separat. Installasjon bruker låsefilen, og CI kjører format, typer, test, serverbygg og Pages-bygg uten prosjektsecrets eller prissynkronisering. Installasjon og verktøyoppsett trenger nettverk; testene henter ikke priser. CI er foreløpig blokkert i checkout av organisasjonens IP-liste; endringen til én Node-versjon løser ikke runner-/IP-tilgangen.

Pris-PR-er fra `GITHUB_TOKEN` starter ikke automatisk CI. GitHub kan vise PR-kjøringer som venter på godkjenning. Bruk **Actions → CI → Run workflow → velg pris-PR-grenen**, for eksempel `codex/pricing-sync`, og kontroller at grenens commit fortsatt samsvarer med den kontrollerte revisjonen før sammenslåing. Workflowen må først finnes på standardgrenen for manuell kjøring. Ingen PAT trengs. Se [GitHubs forklaring av bot-utløste hendelser](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow). Actions er SHA-låst med versjonskommentarer. Dependabot foreslår ukentlige action-oppdateringer uten automatisk fletting. Se [sjekkliste før første push](docs/FORSTE-PUSH.md) og [lokal CI-kontroll og verifiserte SHA-er](docs/CI-KONTROLL.md). Hele kommandorekken er prøvd i lokal Docker/Linux arm64 for commit c22f1dc, med begge bygg. Faktisk Actions-kjøring på ubuntu-latest, rettigheter og obligatoriske statuskontroller er fortsatt ikke verifisert.

## Utrulling og begrensninger

`pnpm build` lager serverbygg; drift krever både Next.js (`pnpm start`) og RAG (`pnpm rag:start`) fra samme revisjon. Drift må håndtere HTTPS, intern ruting, modellsecrets, overvåking og tilgang. `pnpm build:pages` lager `out/` som statisk demo uten modellserver, eventuelt med `PAGES_BASE_PATH`. Dette er ikke en valgt løsning for lukket tilgang. Ingen automatisk utrulling er konfigurert.

Første delte miljø skal være en **lukket pilot**. Innlogging/autorisasjon, brukerbasert rate-/kostnadsvern og ekstern modelltilkobling er ikke ferdig verifisert. Lokal Qwen/Ollama-utprøving har eget Compose-oppsett; det er ikke en virksomhetsgodkjenning. Privat repo beskytter ikke selve nettstedet. Ikke legg internt innhold eller hemmeligheter i prototypen, klientdata eller `public/`. Personvern-, cookie- og tilgjengelighetstekster er lokale utkast; samlet tilgjengelighetssamsvar er uavklart. Skills er Beta og ikke menneskelig gjennomgått.

Prisene vedlikeholdes i `src/content/pricing/snapshot.json`. `pnpm pricing:sync` henter ekte leverandørpriser og kjøres bevisst, separat fra test/CI. [Prisjobben](.github/workflows/pricing-sync.yml) foreslår rader/status/feil på én fast gren; datoendringer alene gir ikke PR. Faktisk GitHub-jobb og publisering er ikke verifisert. [Ny parser-/workflow-kontroll](docs/priser/TESTRAPPORT.md) beskriver lokal fixture-simulering. Uvedkommende ugyldige tabeller påvirker ikke prishentingen; feil i valgt pristabell er fortsatt synlige. Claude-prisfelt tillater ett fotnotesiffer (1–9), vanlig eller hevet, etter MTok-enheten, mens tallformatet ellers er strengt. [Prisforvaltning og tidligere parser-/driftsnotater](docs/HISTORIKK.md#priser-for-copilot-claude-og-codex) er bevart.

## Dokumentasjon

[Dokumentasjonsoversikten](docs/DOKUMENTASJON.md) viser hvilke dokumenter som er gjeldende, historiske eller uavklarte.

- [Arkitektur og modulgrenser](ARCHITECTURE.md), [utviklingsplan og produksjonskrav P1–P10](UTVIKLINGSPLAN.md).
- [Kvalitetskontroll](KVALITETSKONTROLL.md), [WCAG-kontroll](docs/tilgjengelighet/WCAG-KONTROLL.md), [erklæringsgrunnlag](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md).
- [Versjonslogg](VERSJONSLOGG.md), [arkivert README og revisjonshistorikk](docs/HISTORIKK.md), [forslag til bevislagring](docs/BEVISLAGRING.md).

Vesentlige kunnskapshull og motstridende kilder registreres i [FRICTION.md](FRICTION.md) etter kriteriene i AGENTS.md. Triage foreslår tiltak; gjennomføring og sletting av vurderte oppføringer krever bestilling eller bekreftelse.

Nettstedets /versjonslogg/ og /utviklingsplan/ viser [offentlig versjonslogg](VERSJONSLOGG-OFFENTLIG.md) og [offentlig utviklingsplan](UTVIKLINGSPLAN-OFFENTLIG.md). Den offentlige loggen er en datert endringshistorikk, mens planen viser kommende leveranser og beslutninger. Funksjonalitetsoversikten viser dagens tilbud fra registeret. Dokumentene bygges inn ved utrulling. [Historikkartleggingen](docs/HISTORIKK-KARTLEGGING.md) viser fordelingen av bevarte kilder. Detaljert VERSJONSLOGG.md og UTVIKLINGSPLAN.md beholdes som arbeidsgrunnlag; de er ikke kilden til disse offentlige sidene. Skillet gjelder nettsidene og Docker-bildet, ikke tilgang til Git-repoet eller historikken.

Oppdater versjonslogg, relevante planpunkter og funksjonsregister ved vesentlige endringer etter [AGENTS.md](AGENTS.md). Rediger felles innhold og register fremfor kopier i sider/RAG. Historikk er bevart. Det godkjente skjermbildeutvalget er ryddet og arkivert med [flyttelogg](docs/bevis/2026-11-13/skjermbildeopprydding.md); øvrige bevislagringsforslag er ikke innført.
