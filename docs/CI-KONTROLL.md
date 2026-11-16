# CI-kontroll

## Én Node 24-jobb – 16. november 2026

CI er forenklet fra matrisen 22.18.0/24 til én jobb med navnet Node 24. setup-node bruker 24 og check-latest; engines.node er >=24.0.0 <25.0.0. Prisjobben bruker allerede 24, og Docker beholder sitt låste Node 24-bilde. Dette samkjører hovedversjonen, ikke nødvendigvis patchversjonene. Node 22 er ikke lenger støttet eller løpende testet. Historiske Node 22-resultater og bevis nedenfor er bevart.

Jobbens innhold, action-SHA-er, persist-credentials:false, contents:read og manuell dispatch er uendret. Ingen priskilde-/modellkall er lagt til. Branch protection må kreve Node 24 etter en reell vellykket kjøring; et eventuelt gammelt Node 22-krav må fjernes. IP-blokkeringen under checkout består og gjør at ny GitHub-verifisering fortsatt avventer godkjent runner. Lokal kontroll av arbeidskopi basert på 7355ca8 bestod på macOS arm64 med Node 24.22.1, pnpm 11.25.0 og Python 3.9.6:

| Kontroll                                                  | Resultat                                                                                                              |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| pnpm install --frozen-lockfile --offline --ignore-scripts | Exit 0, gjenbruk av eksisterende avhengigheter; låsefil uendret                                                       |
| pnpm check                                                | Exit 0: format, typer, 278/278 Node-tester, 3/3 Python-tester, innholdssynk, 227 filmål i 12 dokumenter og serverbygg |
| pnpm build:pages                                          | Exit 0, statisk eksport og out/.nojekyll; begge bygg genererte 28 sider                                               |
| YAML-/versjonskontroll med Ruby YAML/JSON                 | Én jobb uten strategy/matrise, jobbnavn Node 24, CI/prisjobb velger 24, engines avgrenser til 24                      |

Installasjonskontrollen var ikke en ny nettverksinstallasjon eller kjøring av installasjonsskript. url.parse()-deprekasjonsadvarsel uten testfeil. Byggets genererte next-env.d.ts-endring er tilbakeført. Ingen Docker-/modellvolumendring, faktiske pris-/modellkall, blindmåling eller GitHub-/produksjonsverifisering. Dokumentoppdateringen etter bygg er kontrollert separat: pnpm test:links bestod med 228 filmål i 12 dokumenter, pnpm format:check og git diff --check bestod. Full workflowkjøring på GitHub og actionlint er ikke kjørt i denne økten.

## Bekreftet checkout-blokkering – 16. november 2026

**Rotårsak bekreftet, retting av driftsoppsett gjenstår.** Brukerens vedlagte tekstfil er lest lokalt. Tre git fetch-forsøk blir avvist med HTTP 403 og en eksplisitt melding om at repo-eierens IP allow list ikke tillater runnerens IP. De undersøkte linjene er 161–173; siste exit 128 står på linje 244. Loggens tidsrom er 13:43:28–13:44:00 UTC. Kildens SHA-256 er 71121703021b7cad06ff33885427ddf030dc650c7e0c72847e900802645011b9. Rålogg, IP-adresser, nøkler og autorisasjonshoder er ikke kopiert hit. Utdraget dekker én checkout; brukerens tidligere skjermbilde dokumenterer at begge matrisejobbene feiler. Et separat komplett utdrag fra den andre jobben er ikke undersøkt.

Begge workflows velger ubuntu-latest. Den aktuelle feilen oppstår før setup-node; den skyldes derfor ikke Node 22/24 eller pnpm/testene. contents:read er allerede satt. Mer tokentilgang, PAT, endret persist-credentials eller checkout-versjon er ikke underbygde rettinger på denne feilen.

Ifølge [GitHubs organisasjonsveiledning](https://docs.github.com/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/managing-allowed-ip-addresses-for-your-organization) skal Actions med IP-liste bruke self-hosted runners eller større hosted runners med statiske IP-områder. [Statiske IP-er for større runners](https://docs.github.com/en/actions/how-tos/manage-runners/larger-runners/manage-larger-runners) har egne abonnements-/oppsettskrav; støtte hos virksomheten er ikke verifisert. Vi har ikke endret abonnement eller organisasjonens nettverksregler.

**Tiltak som må avklares:** administrator oppgir godkjent Linux-runner, eksakt gruppe/labels og bekrefter repoets tilgang samt tillatt utgående IP. Først da oppdateres runs-on i begge workflows og checkout/hele CI verifiseres på GitHub. Ingen runnernavn er gjettet, ingen IP-liste er deaktivert eller utvidet, og ingen ny push er utført. Prisjobben deler runner-valget, men er ikke kjørt i undersøkelsen. Se [oppfølgingssjekklisten](FORSTE-PUSH.md).

Lokal pnpm check og pnpm build:pages på samme kildebase 8a14484 bestod i den foregående undersøkelsen: 278 Node-/tre Python-tester, innholdssynk, 224 filmål, format, typer og begge bygg på macOS Node 24.22.1. Ingen funksjons- eller workflowkode er endret siden. Denne loggvurderingen er ikke en ny Node 22/Linux-/Actions-kjøring eller en reproduksjon av IP-reglene. Kun dokumentkontroller kjøres etter denne oppdateringen. De daterte kontrollene fra 11. november nedenfor er historikk og beholder sine opprinnelige begrensninger.

## Historisk lokal kontroll – 11. november 2026

Utført av Codex (OpenAI), uten underagenter. Repoet hadde da ingen remote; ingen workflow er kjørt på GitHub og ingen innstilling er endret. Den opprinnelige lokale kontrollen ble utført før commit c22f1dc; Docker-oppfølgingen nedenfor tester denne commiten.

Gjeldende dokumentasjon finnes i [dokumentasjonsoversikten](DOKUMENTASJON.md); historiske kontrollresultater nedenfor beholder sine opprinnelige revisjoner.

## Node-valg

Offisiell [setup-node-dokumentasjon](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/docs/advanced-usage.md#node-version-file) og kildekode ble lest ved den låste SHA-en. package.json leses i rekkefølgen volta.node, devEngines.runtime, engines.node. Her blir spesifikasjonen `>=22.18.0`, ikke den eksakte versjonen 22.18.0.

Med standard check-latest=false prøves først en passende versjon i runnerens verktøycache, deretter nedlasting hvis ingen finnes. Et åpent intervall kan velge en nyere hovedversjon og garanterer **ikke minsteversjonen**. Det er heller ikke et løfte om nyeste globale Node-utgave: resultatet avhenger av cache og tilgjengelige distribusjoner. Ingen faktisk tidligere runner-versjon kan oppgis siden workflowen aldri er kjørt. Se [README](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/README.md#supported-version-syntax) og [versjonsvalg i koden](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/src/distributions/base-distribution.ts).

CI er konfigurert til å kjøre hele kontrollrekken på eksakt **22.18.0** og **24**. fail-fast=false lar begge fullføre. check-latest=true beholder eksakt minsteversjon og velger nyeste tilgjengelige utgave innen 24-linjen, som også brukes av prisjobben. Sistnevnte installerer ikke prosjektavhengigheter og trenger ikke pnpm. CI leser fortsatt pnpm-versjonen fra packageManager, bruker frozen-lockfile og skriver runtime-versjonene i loggen. Endres engines.node må matrisens minsteversjon oppdateres samtidig.

## Verifiserte action-referanser

Alle SHA-er ble hentet fra GitHubs offentlige Git-ref-API i det offisielle repoet; taggobjektene pekte på commits. README/action.yml ble hentet ved samme SHA. Dette er referanse-/inputverifisering, ikke full sikkerhetsrevisjon av action-koden. Eksisterende CI-hovedversjoner beholdes; prisjobben samkjøres med CI for checkout/setup-node.

| Action               | Versjonskommentar | Verifisert full SHA / offisiell commit                                                                                              |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| actions/checkout     | v6                | [d23441a48e516b6c34aea4fa41551a30e30af803](https://github.com/actions/checkout/commit/d23441a48e516b6c34aea4fa41551a30e30af803)     |
| actions/setup-node   | v7                | [949feb2413d6458794dcd2491c4babbbce0c15c1](https://github.com/actions/setup-node/commit/949feb2413d6458794dcd2491c4babbbce0c15c1)   |
| pnpm/action-setup    | v6                | [73e46992e05b19abd31f2f3c20e0e7370d762115](https://github.com/pnpm/action-setup/commit/73e46992e05b19abd31f2f3c20e0e7370d762115)    |
| actions/setup-python | v6                | [ece7cb06caefa5fff74198d8649806c4678c61a1](https://github.com/actions/setup-python/commit/ece7cb06caefa5fff74198d8649806c4678c61a1) |

Dependabot er konfigurert for github-actions, rotkatalog, ukentlig intervall og inntil fem åpne PR-er. Ingen automatisk fletting er innført. CI har contents:read; prisjobben har bare nødvendige repo-skriverettigheter i sin jobb. persist-credentials=false er beholdt i begge, ingen PAT eller prosjektsecrets er lagt til, og prisjobbens run-steg er uendret. Ingen ekte prissynk er kjørt lokalt.

## Opprinnelig lokal kontroll og grenser

`pnpm test` bestod lokalt på Node 24.22.1 med **206/206 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og **144 relative filmål** i ti dokumenter. Dette inkluderer fixture-simulering av prisjobbens run-steg. `pnpm format:check` og `git diff --check` bestod.

Actionlint **1.7.12**, darwin/arm64, ble hentet fra [offisiell utgivelse](https://github.com/rhysd/actionlint/releases/tag/v1.7.12) til /tmp, uten prosjektavhengighet. Arkivets SHA-256 `aba9ced2dee8d27fecca3dc7feb1a7f9a52caefa1eb46f3271ea66b6e0e6953f` ble sammenlignet med utgivelsens checksums.txt før kjøring. Begge workflowene fikk **0 feil** med actionlint -no-color -verbose. ShellCheck og Pyflakes finnes ikke lokalt, så actionlint meldte disse valgfrie integrasjonene deaktivert. Dette er ikke full shell-/Python-linting, og actionlint validerer ikke Dependabot-konfigurasjonen.

Faktisk installasjon/runner, matriser på GitHub, action-/tokenpolicy, PR-oppretting/oppdatering, obligatoriske sjekker på bot-PR, schedule og Dependabot må verifiseres på GitHub etter [første-push-sjekklisten](FORSTE-PUSH.md). Den opprinnelige lokale kontrollen brukte fixtures; offisielle action-/verktøyfiler ble hentet over nett, men ingen priskilder eller modell ble kalt. Den omfattet ikke Docker-matrisen eller nye bygg. Den senere Docker-kontrollen følger nedenfor.

## Docker/Linux-matrise – oppfølging 11. november 2026

**Hele CI-kontrollrekken bestod på både Node 22.18.0 og Node 24.22.2 for commit `c22f1dcce0fb803eaaad06307a25a8178cb37f73`.** Begge brukte Linux arm64, Debian 12.11, pnpm 11.25.0 fra packageManager, Python 3.11.2 og Next.js 16.4.3. Node 24.22.2 var versjonen i det offisielle node:24-bookworm-slim-bildet hentet til denne kjøringen; bildet og digest er registrert i manifestet.

| CI-kommando                                          | Node 22.18.0                      | Node 24.22.2                      |
| ---------------------------------------------------- | --------------------------------- | --------------------------------- |
| Ny `pnpm install --frozen-lockfile` ved bildeoppsett | Bestått, exit 0                   | Bestått, exit 0                   |
| `pnpm install --frozen-lockfile` i kontrollcontainer | Bestått, gjenbruk, exit 0         | Bestått, gjenbruk, exit 0         |
| `pnpm format:check`                                  | Bestått, exit 0                   | Bestått, exit 0                   |
| `pnpm typecheck`                                     | Bestått, exit 0                   | Bestått, exit 0                   |
| `pnpm test`                                          | 206/206 Node + 3/3 Python, exit 0 | 206/206 Node + 3/3 Python, exit 0 |
| `pnpm build`                                         | Bestått, exit 0                   | Bestått, exit 0                   |
| `pnpm build:pages`                                   | Bestått, exit 0                   | Bestått, exit 0                   |

Ingen Node-tester feilet eller ble hoppet over. Testløpet omfattet også faktisk watch-/innholdssynk, 144 relative filmål i ti dokumenter og fixture-simulering av prisjobbens run-steg. Ingen pricing:sync mot ekte kilder ble kjørt. Serverens byggmanifest hadde RAG-rewrite til 127.0.0.1:3001; eksporten inneholdt out/index.html, out/spor/index.html og .nojekyll i begge miljøer. Byggene ble ikke startet som produksjonstjenester eller åpnet i en nettleser.

### Installasjonsavvik og isolasjon

Første forsøk var en helt ny frossen installasjon på Node 22.18.0 med network none. Alle 192 pakker ble gjenbrukt fra cache uten pakkenedlasting, men ChromeDriver-installasjonene og vnu-jar sin Java-nedlasting trengte nettverk. Installasjonen feilet på ChromeDriver; Java-nedlastingen rapporterte en ikke-fatal feil. Pnpm forsøkte deretter installasjon igjen før de fem øvrige kommandoene, som også fikk exit 1. Disse er **ikke utførte/feilende produkttester**: ingen testtall eller byggresultater kom fram. Førsteforsøket og feilloggene er bevart.

Deretter ble begge miljøene installert fra samme cache med den **uendrede kommandoen `pnpm install --frozen-lockfile`**, uten ignore-scripts, i egne bildeoppsett med nettverk for støttefilene. Disse installasjonene bestod. Hele seksstegsrekken ble så kjørt i hver sin container med **network none**, uten publiserte porter, uten hostens kildekode/node_modules/.env.local og uten modellnøkler. Install-stegene i de endelige kontrollcontainerne brukte den ferdige installasjonen. Ingen priskilder eller modeller kunne kontaktes fra test-/byggcontainerne. Model-provider var none og Next-telemetri deaktivert.

Kildefilene kom fra git archive av den navngitte commiten. Før kopiering ble gamle kildefiler, node_modules og bygg fjernet fra testgrunnlaget, mens bare pnpm-cachen ble beholdt. Bildeoppsettet for 24 brukte den offisielle Node 24-binæren sammen med samme Debian-/Python-/pnpm-verktøy som 22.18.0. Hver testcontainer fikk 2 CPU, 4 GiB minne, droppede capabilities og no-new-privileges. De ble automatisk fjernet; fraværet er kontrollert. Lokale Docker-bilder er beholdt for gjenbruk.

SHA-256 bekrefter at package.json, pnpm-lock.yaml og pris-snapshot var identiske før/etter begge kjøringer og med vertens filer. Ingen produktkode, låsefil, prisdata eller funksjonsmodenhet er endret i oppfølgingen. Funksjonsregisteret er vurdert og beholdt.

### Bevis og hva som gjenstår

[Én maskinlesbar oppsummering](ci/2026-11-11/docker-matrix/result.json) inneholder begge matriseutfall, runtime, tidsstempler, alle exit-koder, førsteforsøket og input-/logghasher. [Manifestet](ci/2026-11-11/docker-matrix/manifest.json) har bilde-/kildeidentitet, isolasjon og kontrollsummer. Dockerfiler og de faktisk brukte kjøreskriptene er bevart sammen med [én komprimert loggpakke](ci/2026-11-11/docker-matrix/logs.tar.gz), inkludert oppsett og avvik. Dette er de to forespurte runtime-variantene, ingen gjentatte stresskjøringer eller endring i gamle bevismapper. Vertskopieringen brukte tar etter at verts-Python ikke støttet extractall(filter=...); dette skjedde før Linux-testene.

Dette verifiserer CI-kommandoene i **lokal Docker/Linux arm64**, ikke GitHubs ubuntu-latest x64, setup-node/setup-python/pnpm-actions, token-/repo-policy, branch protection, bot-PR-status, schedule eller Dependabot. Disse punktene må fortsatt prøves på GitHub etter første-push-sjekklisten. Python-versjonen her er 3.11.2, mens workflowen ber om 3.x. Ingen ny nettleser-/tilgjengelighetskontroll, ekte modell/prisinnhenting, commit, push, utrulling eller produksjonsgodkjenning. Etter dokumentoppdateringen bestod vertens pnpm format:check, pnpm test:links (149 filmål i ti dokumenter) og git diff --check. Kontrollsummer av arkiverte logger/bevis og uendrede inputfiler er verifisert. Linux-resultatene gjelder kildecommiten over.
