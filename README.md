# KI-Produktutvikling

Portal for å lære, prøve og dele KI i produktutviklingen i Nasjonalarkivet. Next.js/TypeScript, MUI og Digitalarkivets tema brukes med portalens eget designlag. Sidene og Spør KI deler innhold fra `src/content/`.

## Oppstart

Krever Node.js som tilfredsstiller `engines.node` i [package.json](package.json), pnpm-versjonen fra `packageManager`, og Python 3 til testene.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Åpne http://127.0.0.1:3000. Next.js og RAG starter på loopback, normalt port 3000 og 3001. `sh scripts/dev.sh` kan bruke Codex-runtime når Node/pnpm mangler på PATH og avhengighetene er installert. Ny devport: `pnpm dev -- -p 3005`; tilpass også tillatte origins.

## Konfigurasjon

Kopier [.env.example](.env.example) til `.env.local` for lokal utvikling. I drift injiseres servervariablene i RAG-prosessen. Ekte nøkler skal ikke i Git, klientkode eller `NEXT_PUBLIC_*`.

| Variabel                       | Bruk                                                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MODEL_PROVIDER`               | `none` gir kildebasert veiledning; `ollama` eller `openai-compatible` aktiverer generering.                                                                              |
| `MODEL_API_URL`                | Fullt HTTPS Chat Completions-endepunkt, inkludert eventuell gateway-sti. Ingen query, fragment eller påloggingsinformasjon i URL-en.                                     |
| `MODEL_NAME` / `MODEL_API_KEY` | Modellnavn og serverlagret Bearer-nøkkel. Begge kreves med eksternt API.                                                                                                 |
| `OLLAMA_MODEL` / `OLLAMA_URL`  | Installert lokal modell og HTTP-loopback-adresse, normalt `http://127.0.0.1:11434`. Bare rotsti tillates.                                                                |
| `RAG_PORT`                     | Tjenesteport, normalt 3001. Next-rewrite låses ved bygg: bygg og kjøring må bruke samme port.                                                                            |
| `RAG_ALLOWED_ORIGINS`          | Kommaseparerte HTTP(S)-origins. Standard er `http://127.0.0.1:3000,http://localhost:3000`. En satt liste erstatter standardene. Tomme/ugyldige verdier stopper oppstart. |
| `RAG_MAX_CONCURRENT`           | Modellkall per prosess, heltall 1–8, standard 1. Ingen kø; full kapasitet gir 429 med kilder.                                                                            |
| `PAGES_BASE_PATH`              | Eventuell prosjektsti ved statisk bygg, for eksempel `/ki-produktutvikling`.                                                                                             |

Start RAG på nytt etter konfigurasjonsendring. Eksterne modeller mottar spørsmål og relevante utdrag; leverandør og databehandling må godkjennes før bruk. Det støttede formatet er Chat Completions med Bearer-nøkkel og `stream: false`; andre API-formater krever tilpasning. Tidsbudsjettet modell/proxy/klient er 60/65/70 sekunder i `src/config/rag.ts`. Origins er ikke autorisering.

## Kontroller

```sh
pnpm check
pnpm build:pages
```

`check` kjører formatering, typer, hele testløpet og serverbygg, i denne rekkefølgen. `test` kjører alle Node-tester, Python-tester, faktisk innholdsomlasting og Markdown-lenker. Pris- og modelltester bruker fixtures/simulert transport, uten kall til leverandørene. Lokale loopback-porter må være tillatt.

| Kommando                 | Omfang                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm test:node`         | Alle Node-tester; `test:rag` er et kompatibilitetsalias.                                                                                                     |
| `pnpm test:python`       | Unittest-discover for `tests/test_html_accessibility.py`.                                                                                                    |
| `pnpm test:content-sync` | Isolert RAG-kopi og watch-omlasting etter endring i felles innhold.                                                                                          |
| `pnpm test:links`        | Relative filreferanser i rot-Markdown og direkte `docs/*.md`; ingen nettverkskall eller rekursiv beviskontroll. Fragmenter og portalruter kontrolleres ikke. |
| `pnpm test:pricing`      | Avgrensede parser-/fil-/PR-tester uten priskildekall.                                                                                                        |
| `pnpm test:a11y`         | Separat axe/Nu-kontroll etter Pages-bygg; krever passende Chrome/driver og Java. Er ikke full WCAG-godkjenning.                                              |

[CI](.github/workflows/ci.yml) er klargjort for push, pull requests og manuell kjøring. Node velges fra `engines` via package.json, pnpm fra `packageManager`; det åpne Node-intervallet låser ikke én patchversjon. Python 3 settes opp separat. Installasjon bruker låsefilen, og CI kjører format, typer, test, serverbygg og Pages-bygg uten prosjektsecrets eller prissynkronisering. Installasjon og verktøyoppsett trenger nettverk; testene henter ikke priser.

Pris-PR-er fra `GITHUB_TOKEN` starter ikke automatisk CI. GitHub kan vise PR-kjøringer som venter på godkjenning. Bruk **Actions → CI → Run workflow → velg pris-PR-grenen**, for eksempel `codex/pricing-sync`, og kontroller at grenens commit fortsatt samsvarer med den kontrollerte revisjonen før sammenslåing. Workflowen må først finnes på standardgrenen for manuell kjøring. Ingen PAT trengs. Se [GitHubs forklaring av bot-utløste hendelser](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow). Faktisk Actions-kjøring og obligatorisk statuskontroll må verifiseres på GitHub.

## Utrulling og begrensninger

`pnpm build` lager serverbygg; drift krever både Next.js (`pnpm start`) og RAG (`pnpm rag:start`) fra samme revisjon. Drift må håndtere HTTPS, intern ruting, modellsecrets, overvåking og tilgang. `pnpm build:pages` lager `out/` som statisk demo uten modellserver, eventuelt med `PAGES_BASE_PATH`. Dette er ikke en valgt løsning for lukket tilgang. Ingen automatisk utrulling er konfigurert.

Første delte miljø skal være en **lukket pilot**. Innlogging/autorisasjon, brukerbasert rate-/kostnadsvern og faktisk modelltilkobling er ikke ferdig verifisert. Privat repo beskytter ikke selve nettstedet. Ikke legg internt innhold eller hemmeligheter i prototypen, klientdata eller `public/`. Personvern-, cookie- og tilgjengelighetstekster er lokale utkast; samlet tilgjengelighetssamsvar er uavklart. Skills er Beta og ikke menneskelig gjennomgått.

Prisene vedlikeholdes i `src/content/pricing/snapshot.json`. `pnpm pricing:sync` henter ekte leverandørpriser og kjøres bevisst, separat fra test/CI. [Prisjobben](.github/workflows/pricing-sync.yml) foreslår rader/status/feil på én fast gren; datoendringer alene gir ikke PR. Faktisk GitHub-jobb og publisering er ikke verifisert. [Prisforvaltning og tidligere parser-/driftsnotater](docs/HISTORIKK.md#priser-for-copilot-claude-og-codex) er bevart.

## Dokumentasjon

- [Arkitektur og modulgrenser](ARCHITECTURE.md), [utviklingsplan og produksjonskrav P1–P10](UTVIKLINGSPLAN.md).
- [Kvalitetskontroll](KVALITETSKONTROLL.md), [WCAG-kontroll](docs/tilgjengelighet/WCAG-KONTROLL.md), [erklæringsgrunnlag](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md).
- [Versjonslogg](VERSJONSLOGG.md), [arkivert README og revisjonshistorikk](docs/HISTORIKK.md), [forslag til bevislagring](docs/BEVISLAGRING.md).

Oppdater versjonslogg, relevante planpunkter og funksjonsregister ved vesentlige endringer etter [AGENTS.md](AGENTS.md). Rediger felles innhold og register fremfor kopier i sider/RAG. Historikk er bevart; bevislagringsforslaget er ikke innført.
