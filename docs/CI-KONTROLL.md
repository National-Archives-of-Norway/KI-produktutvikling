# Lokal CI-kontroll – 11. november 2026

Utført av Codex (OpenAI), uten underagenter. Repoet har fortsatt ingen remote; ingen workflow er kjørt på GitHub og ingen innstilling er endret. Tidligere ukommiterte produktendringer er bevart.

## Node-valg

Offisiell [setup-node-dokumentasjon](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/docs/advanced-usage.md#node-version-file) og kildekode ble lest ved den låste SHA-en. package.json leses i rekkefølgen volta.node, devEngines.runtime, engines.node. Her blir spesifikasjonen `>=22.18.0`, ikke den eksakte versjonen 22.18.0.

Med standard check-latest=false prøves først en passende versjon i runnerens verktøycache, deretter nedlasting hvis ingen finnes. Et åpent intervall kan velge en nyere hovedversjon og garanterer **ikke minsteversjonen**. Det er heller ikke et løfte om nyeste globale Node-utgave: resultatet avhenger av cache og tilgjengelige distribusjoner. Ingen faktisk tidligere runner-versjon kan oppgis siden workflowen aldri er kjørt. Se [README](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/README.md#supported-version-syntax) og [versjonsvalg i koden](https://github.com/actions/setup-node/blob/949feb2413d6458794dcd2491c4babbbce0c15c1/src/distributions/base-distribution.ts).

CI kjører nå hele kontrollrekken på eksakt **22.18.0** og **24**. fail-fast=false lar begge fullføre. check-latest=true beholder eksakt minsteversjon og velger nyeste tilgjengelige utgave innen 24-linjen, som også brukes av prisjobben. Sistnevnte installerer ikke prosjektavhengigheter og trenger ikke pnpm. CI leser fortsatt pnpm-versjonen fra packageManager, bruker frozen-lockfile og skriver runtime-versjonene i loggen. Endres engines.node må matrisens minsteversjon oppdateres samtidig.

## Verifiserte action-referanser

Alle SHA-er ble hentet fra GitHubs offentlige Git-ref-API i det offisielle repoet; taggobjektene pekte på commits. README/action.yml ble hentet ved samme SHA. Dette er referanse-/inputverifisering, ikke full sikkerhetsrevisjon av action-koden. Eksisterende CI-hovedversjoner beholdes; prisjobben samkjøres med CI for checkout/setup-node.

| Action               | Versjonskommentar | Verifisert full SHA / offisiell commit                                                                                              |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| actions/checkout     | v6                | [d23441a48e516b6c34aea4fa41551a30e30af803](https://github.com/actions/checkout/commit/d23441a48e516b6c34aea4fa41551a30e30af803)     |
| actions/setup-node   | v7                | [949feb2413d6458794dcd2491c4babbbce0c15c1](https://github.com/actions/setup-node/commit/949feb2413d6458794dcd2491c4babbbce0c15c1)   |
| pnpm/action-setup    | v6                | [73e46992e05b19abd31f2f3c20e0e7370d762115](https://github.com/pnpm/action-setup/commit/73e46992e05b19abd31f2f3c20e0e7370d762115)    |
| actions/setup-python | v6                | [ece7cb06caefa5fff74198d8649806c4678c61a1](https://github.com/actions/setup-python/commit/ece7cb06caefa5fff74198d8649806c4678c61a1) |

Dependabot er konfigurert for github-actions, rotkatalog, ukentlig intervall og inntil fem åpne PR-er. Ingen automatisk fletting er innført. CI har contents:read; prisjobben har bare nødvendige repo-skriverettigheter i sin jobb. persist-credentials=false er beholdt i begge, ingen PAT eller prosjektsecrets er lagt til, og prisjobbens run-steg er uendret. Ingen ekte prissynk er kjørt lokalt.

## Lokale kontroller og grenser

`pnpm test` bestod lokalt på Node 24.22.1 med **206/206 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og **144 relative filmål** i ti dokumenter. Dette inkluderer fixture-simulering av prisjobbens run-steg. `pnpm format:check` og `git diff --check` bestod.

Actionlint **1.7.12**, darwin/arm64, ble hentet fra [offisiell utgivelse](https://github.com/rhysd/actionlint/releases/tag/v1.7.12) til /tmp, uten prosjektavhengighet. Arkivets SHA-256 `aba9ced2dee8d27fecca3dc7feb1a7f9a52caefa1eb46f3271ea66b6e0e6953f` ble sammenlignet med utgivelsens checksums.txt før kjøring. Begge workflowene fikk **0 feil** med actionlint -no-color -verbose. ShellCheck og Pyflakes finnes ikke lokalt, så actionlint meldte disse valgfrie integrasjonene deaktivert. Dette er ikke full shell-/Python-linting, og actionlint validerer ikke Dependabot-konfigurasjonen.

Faktisk installasjon/runner, matriser på GitHub, action-/tokenpolicy, PR-oppretting/oppdatering, obligatoriske sjekker på bot-PR, schedule og Dependabot må verifiseres på GitHub etter [første-push-sjekklisten](FORSTE-PUSH.md). Lokale tester bruker fixtures; offisielle action-/verktøyfiler ble hentet over nett, men ingen priskilder eller modell ble kalt. Ingen ny Node 22-/Docker-matrise, bygg, produksjonsgodkjenning, commit eller publisering er påstått for denne oppfølgingen.
