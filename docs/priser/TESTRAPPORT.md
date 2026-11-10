# Testrapport for prisinnhenting

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
