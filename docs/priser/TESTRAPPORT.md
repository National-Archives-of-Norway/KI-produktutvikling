# Testrapport for prisinnhenting

## Parseravgrensning, fotnoter og workflow – 11. november 2026

Utførende: Codex (OpenAI), uten underagenter. Lokal arbeidskopi basert på `f2ec93f`, Node 24.22.1 på macOS arm64. Tidligere Linux-/Node 22-resultater nedenfor beholder dato og omfang.

### Førtester og rettinger

| Funn                                                   | Før retting                                       | Etter retting                                                                       |
| ------------------------------------------------------ | ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Ekstra ugyldig fotnotetabell etter Claude-pristabellen | Feilet med celleantall-feil                       | Uvedkommende tabeller markeres; tabellen med alle nødvendige kolonner velges        |
| Fotnote 3/hevet siffer i alle Claude-priskolonner      | Feilet med ukjent prisformat                      | Ett siffer 1–9 etter MTok godtas, også hevet eller HTML-sup                         |
| Feil i faktisk pristabell / ekstratall som $1 500      | Allerede avvist                                   | Fortsatt synlig feil; money er ikke gjort mer tolerant                              |
| Tom RAG_PORT mot tom RAG_MAX_CONCURRENT                | Ny likhetskontroll feilet; porten brukte standard | Usatt gir standard; eksplisitt tom/blank port, kapasitet eller origin-liste er feil |
| RAG_PORT=0                                             | Ny avvisningstest feilet                          | Miljøport må være 1–65535; 0 tillates kun via eksplisitt testinjeksjon              |

Alle funnene i punkt 1–4 ble testet før produktkode ble endret. Den gamle tabelltesten som krevde global kasting er erstattet med kontroll av invalid-markør, og en egen test krever feil i valgt pristabell. Fotnote-3-testen er tilsiktet endret fra avvisning til aksept. Eksisterende fixtures er ikke endret.

### Hele workflowen: hva er faktisk kontrollert?

| Del av pricing-sync.yml                                  | Lokal kontroll                                                                                                                                              | Hva gjenstår                                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Schedule, dispatch, standardgren, concurrency og timeout | Innstillinger lest og testet mot YAML                                                                                                                       | Faktisk planlegging og GitHub-eventer                                                |
| Checkout / Node 24 / rettigheter                         | Konfigurasjon kontrollert, persist-credentials false og avgrensede contents/PR-rettigheter bevart                                                           | Actions-runtime, faktisk checkout og token-/repo-/branch-regler                      |
| Test innhenting uten nettverk                            | Eksakt run-kommando er node --test tests/pricing.test.mjs; den kjøres av test:pricing                                                                       | Ingen rekursiv invokasjon inne i sin egen test; GitHub-runneren er ikke prøvd        |
| Hent og kontroller offisielle priser                     | Eksakt shell/heredoc kjørt med fixture-fetch for alle seks kilder; changed/failed leses fra ekte midlertidig GITHUB_OUTPUT-fil                              | Levende leverandørformater, HTTP og runner-outputmekanismen                          |
| Opprett/oppdater pris-PR                                 | Eksakt shell, faktisk Git mot lokalt bare-repo og simulert gh: opprett, samme forslag ved ny pris, ingen ny push ved bare nye tider, lukk ved tilbakeføring | Ekte gh-autentisering, PR-oppretting/redigering/lukking og konkurrerende GitHub-push |
| Kildefeil og gjenoppretting                              | Feilforslag beholder gamle rader og vellykket dato uten leverandørtekst. Gjentatt feil endrer ikke forslaget. Gjenoppretting til standardgrenen lukker det  | Faktisk synlighet/status i GitHub og leverandørutfall                                |
| Meld mislykket kildekontroll                             | Eksakt shell gir exit 1 etter feilforslaget. Det kjører ikke når failed er false i den lokale simuleringen                                                  | GitHubs evaluering av if-uttrykket og samlet jobbutfall                              |

Alle fire run-steg er syntakskontrollert med bash -n; rekkefølge og forventet antall steg er testet. actionlint er ikke installert, og ingen ny prosjektavhengighet er innført. Dette er en lokal simulering og konfigurasjonsgjennomgang, ikke full Actions-verifisering. Under utvikling av testen ble en escape-feil i fixture-hooken og et manglende blanklinjeskille mellom to testtabeller rettet før bestått retest; disse var testoppsettfeil, ikke nye leverandør- eller produktfunn.

### Må prøves med workflow_dispatch på GitHub

Når repoet og workflowen finnes på GitHub: kontroller faktisk standardgren/Node-oppsett, kortlivet token og tillatelse til å opprette PR-er, synlige changed/failed-outputs, én fast prisgren og riktig jobbutfall ved kildefeil. Før sammenslåing kjøres CI manuelt på gjeldende pris-PR-gren og revisjonen kontrolleres. Ingen PAT, automatisk sammenslåing eller deploy er innført. Den virkelige prisjobben henter leverandører; ingen slik kjøring er gjort i denne oppgaven.

### Sluttkontroller

`pnpm test:pricing` **24/24**, `pnpm test` **164/164 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og Markdown-lenker bestod. `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestod. [Manifest og kontrollsummer](2026-11-11/parser-config/manifest.json) og råresultater ligger under `2026-11-11/parser-config/`. Ingen endring av portalens pris-snapshot, låsefil eller fixtures. Ingen ny Linux/Node 22-, bygg-, nettleser-/tilgjengelighets- eller virkelig modellkontroll.

## Full testpakke, typekontroll og produksjonsbygg – 10. november 2026

**Resultat: alle kjørte kontroller bestod på Node 22.18.0 i Docker/Linux arm64.** Utførende agent: Codex (OpenAI), ingen underagenter. Testet Git-revisjon: `e6b5b426d59dac66e3fc6138519db04c55e7c984`. Denne kjøringen utvider den tidligere prisavgrensede Linux-kontrollen nedenfor.

| Kontroll i containeren                                    | Resultat                                                                                             |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `pnpm test:rag` – hele Node-testpakken                    | **105/105 bestått**, inkludert alle 19 pristestene og HTTP-integrasjonstestene; ingen hoppet over    |
| `python3 -m unittest discover -s tests -p 'test_*.py' -v` | **3/3 bestått**                                                                                      |
| `pnpm test:content-sync`                                  | Bestått; lokal watch-tjeneste viste faktisk oppdatert innhold fra isolert testkopi                   |
| `pnpm exec next typegen`                                  | Bestått; genererte rutetyper før separat typekontroll i ren byggmappe                                |
| `pnpm typecheck`                                          | Bestått                                                                                              |
| `pnpm build`                                              | Bestått; Next.js 16.4.3/Turbopack kompilerte, typekontrollerte og genererte alle **27/27** byggsider |
| Integritet før/etter                                      | package.json, pnpm-lock.yaml og pris-snapshot hadde identiske SHA-256-hasher                         |

### Miljø og offline-avgrensning

Runtime: Node 22.18.0 / Undici 6.21.2, pnpm 11.25.0, TypeScript 5.9.3, Next.js 16.4.3, Git 2.39.5 og Python 3.11.2 på Debian 12/Linux arm64 (LinuxKit 7.0.14). Docker-motor: 29.8.2. [Runtime](2026-11-10/node22-linux-full/runtime.json) og [manifest](2026-11-10/node22-linux-full/manifest.json) angir de faktiske versjonene, revisjon, bildeidentitet og kommandoer.

Et separat kontrollbilde ble bygget fra hele den sporede Git-revisjonen, uten vertens node_modules, .next, .env, .git eller secrets. Det eksisterende Node 22/Git-bildet ble utvidet med Python, pnpm 11.25.0 og prosjektavhengigheter installert med **`pnpm install --frozen-lockfile --ignore-scripts`**. Klargjøringen kontaktet Debian og pakkeregisteret; den hentet ingen priskilder. Avhengighetslivssyklusskript ble deaktivert slik at verktøy som ChromeDriver og Nu ikke lastet ned egne ekstra binærer. Ingen låsefil eller prosjektavhengighet på verten ble endret.

**Alle seks kontrollene i tabellen kjørte deretter med `--network none`**, uten publiserte porter og med telemetri deaktivert. HTTP-testene og innholdssynkroniseringen brukte bare containerens loopback. Pristestene brukte eksisterende fixtures og simulert gh med lokalt bare-repo. Modelladapterne brukte simulert transport. Produksjonsbygget leste det allerede lagrede prisgrunnlaget og hentet ingen nye priser. `pricing:sync` ble ikke kjørt.

Containeren hadde to CPU-er, 4 GB minne, fjernede capabilities, `no-new-privileges` og en midlertidig, kjørbar `/tmp`. Koden og Linux-avhengighetene lå i et eget bilde; byggfiler ble skrevet i containerens midlertidige overlegg, ikke i brukerens prosjekt. Bare resultatmappen var montert skrivbart fra verten. Docker-containeren ble automatisk fjernet med `--rm`, og fravær ble kontrollert. Ingen eksisterende apptjeneste ble stoppet eller rekonfigurert.

### Bevis og begrensninger

- [Node-testutskrift](2026-11-10/node22-linux-full/tests.txt), [Python](2026-11-10/node22-linux-full/python.txt) og [innholdssynk](2026-11-10/node22-linux-full/content-sync.txt).
- [Typegenerering](2026-11-10/node22-linux-full/typegen.txt), [typekontroll](2026-11-10/node22-linux-full/typecheck.txt) og [produksjonsbygg](2026-11-10/node22-linux-full/build.txt).
- [Samlede exit-koder, integritet og bygg-ID](2026-11-10/node22-linux-full/summary.json), [innledende kontrollsummer](2026-11-10/node22-linux-full/input-hashes.json), [bildeidentitet](2026-11-10/node22-linux-full/image.json) og [manifest](2026-11-10/node22-linux-full/manifest.json).
- [Dockerfile for kontrollbildet](2026-11-10/node22-linux-full/Dockerfile), [logg fra klargjøringen](2026-11-10/node22-linux-full/prepare-image.txt) og [kjøreskript](2026-11-10/node22-linux-full/run-linux.sh).

Det kalde bygget varslet om manglende byggcache; dette var informasjon, ikke feil. Alle kontrollkommandoer avsluttet med kode 0. Lokal `pnpm format:check` og `git diff --check` er også kontrollert etter dokumentasjonsoppdateringen.

Dette er et vanlig `pnpm build`, ikke et Pages-bygg eller en utrulling. Ingen faktisk modell, live prisinnhenting, GitHub Actions/API, native nettleser-/axe-/Nu-skanning eller testing fra et delt HTTPS-miljø er utført. AMD64 og andre Node-patchversjoner er ikke undersøkt. Resultatene erstatter ikke tilgjengelighetsvurdering, tilgangskontroll eller produksjonsgodkjenning. Produktkode, prisdata og avhengigheter er uendret; funksjonsregisterets Beta-status videreføres. Utviklingsplanens aktuelle kontrollgrunnlag er oppdatert uten å lukke produksjonskrav. Ingen commit eller publisering i denne oppfølgingen.

## Docker/Linux med Node 22 – 10. november 2026

**Resultat: 19/19 bestått, ingen feil eller hoppede tester.** Utførende agent: Codex (OpenAI), ingen underagenter. Testet commit `e4e580ab1e2af2a672284aa3cb36403cf0240396`, som inneholder rettingen av prisparser, filflyt og prisworkflow. Ingen produktkode er endret i denne testoppfølgingen.

Miljø: Node 22.18.0, Debian GNU/Linux 12 (bookworm), Linux arm64 med kjerne 7.0.14-linuxkit, Git 2.39.5 og Bash 5.2.15. Docker-motor: 29.8.2. Offisielt Node-bilde er låst til `node@sha256:752ea8a2f758c34002a0461bd9f1cee4f9a3c36d48494586f60ffce1fc708e0e`. Det slanke bildet manglet Git; et separat testbilde installerte Git fra Debian før kjøringen. Bildebyggingen kontaktet Debian-pakkekilder, ikke priskilder. Ingen prosjektavhengigheter ble installert.

Den faktiske testkommandoen bak `pnpm test:pricing` ble kjørt direkte med containerens Node 22:

```sh
node --test tests/pricing.test.mjs
```

Containeren kjørte med **`--network none`** og uten publiserte porter. En skrivebeskyttet Git-snapshot inneholdt bare prisverktøy, eksisterende fixtures, pristestene, workflowfilen og package.json. Prosjektets virkelige snapshot.json, versjonslogg, `.env`, Git-repo og secrets ble ikke montert. Rotfilsystemet var skrivebeskyttet, med separat resultatmappe og midlertidig `/tmp`, fjernede capabilities, `no-new-privileges`, 512 MB minne og to CPU-er. Priskilder og GitHub ble ikke kontaktet av testene. Filtester brukte egne mapper; workflow-testen brukte et lokalt bare-repo og en simulert gh-kommando.

### Prøvd funksjonalitet

| Område                            | Kontroll og resultat                                                                                                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eksisterende parsere              | Alle seks fixtures parses med de eksisterende forventningene til beløp, valuta/enheter, kontekst og norske vilkår                                                                  |
| Streng money()                    | Løse ekstratall og feil tusenskille avvises; korrekt kommagruppering godtas; kjent Claude-markør 2 tillates bare i cache-kolonnen                                                  |
| Markdown-tabeller                 | Siste rad beholdes uten sluttlinjeskift; CRLF og escapede pipes håndteres; feil celleantall avvises                                                                                |
| Endringsdefinisjon                | Kontrolltidspunkter alene ignoreres; endrede rader, status, feil og kildemetadata oppdages                                                                                         |
| Filflyt                           | Uendrede priser gir ingen loggendring; endrede priser gir én underoppføring; ny identisk kjøring gir ingen ekstra oppføring                                                        |
| Innsettingspunkt                  | Manglende `## Ikke utgitt` gir feil før snapshot eller midlertidige filer skrives                                                                                                  |
| Kildesvikt                        | Forrige rader og vellykkede dato beholdes; feilteksten er nøytral; identisk gjentatt feil gir ingen ny loggoppføring, mens gjenoppretting gjør det                                 |
| Faktisk PR-shell, med simulert gh | Ett forslag opprettes på fast gren; bare ny dato gir ingen push; ny pris oppdaterer samme forslag; tilbakeført pris lukker foreldet forslag; bare generert snapshot og logg endres |

### Første forsøk og retest

Første kjøring ga **18 bestått / 1 feilet**. Docker-monteringen av `/tmp` tillot ikke kjøring av testens genererte gh-stub: `Permission denied`, exit 126 inne i Bash. Dette var en begrensning i testcontaineren. Med eksplisitt `exec` på den midlertidige tmpfs-monteringen bestod samme uendrede kode **19/19**. Nettverket forble deaktivert og rettighetene ellers uendret. Første utskrift og exit-kode er bevart; den er ikke omskrevet til bestått.

### Dokumentasjon og bevis

- [Original vellykket testutskrift](2026-11-10/node22-linux/tests.txt) og [exit-kode](2026-11-10/node22-linux/result.json).
- [Første feilede testutskrift](2026-11-10/node22-linux/initial-noexec/tests.txt) og [første exit-kode](2026-11-10/node22-linux/initial-noexec/result.json).
- [Runtime](2026-11-10/node22-linux/runtime.json), [bildeidentitet](2026-11-10/node22-linux/image.json) og [manifest med commit, kildehash og isolasjon](2026-11-10/node22-linux/manifest.json).
- [Testbildets Dockerfile](2026-11-10/node22-linux/Dockerfile) og [kjøreskriptet](2026-11-10/node22-linux/run-linux.sh).

Testcontaineren ble automatisk fjernet med `--rm`, og fravær ble kontrollert etter kjøringen. Ingen eksisterende appcontainer ble stoppet eller rekonfigurert. Prosjektets faktiske prisdata er uendret. Lokal `pnpm format:check` og `git diff --check` består.

Dette bekrefter fixture-basert prislogikk og den simulerte PR-flyten på Node 22.18.0/Linux arm64. Ingen live prisinnhenting, GitHub Actions-/API-kjøring eller utrulling er utført. Andre patchversjoner og AMD64, hele RAG-pakken, TypeScript og produksjonsbygg er ikke kjørt på nytt i denne oppfølgingen. GitHub- og produksjonsgodkjenning gjenstår; funksjonsregister og utviklingsplanens leveransestatus videreføres. Ingen commit eller publisering i denne arbeidsøkten.
