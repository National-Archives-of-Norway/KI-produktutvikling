# RAG: tidsgrenser, avbrudd og samtidighet

Dato: 10. november 2026. Utførende agent: Codex (OpenAI), ingen underagenter. Grunnlag: commit `3bff340` med de lokale rettingene i denne arbeidsøkten. Runtime for kontrollene: Node 24.22.1, Next.js 16.4.3. Ingen ekte modell, priskilde eller GitHub-tjeneste er kontaktet.

## Bekreftede funn og valg

| Funn             | Før retting                                                                                                                                                        | Rettet / kontrollert                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Frister          | Installert proxy-request.js bruker 30000 ms som standard. Adaptere brukte 60000 ms og klienten 70000 ms. Proxyfeil avsluttes med ren tekst `Internal Server Error` | Felles 60000/65000/70000 ms; konfigurert proxyverdi finnes i faktisk byggkonfigurasjon. Tester gjennom Nexts proxy med skalerte frister gir forventet JSON 502 med kilder før proxyen avbryter   |
| Avbrudd          | Tjenesten videresendte ikke signal til modellen. Førtest viste blokkert neste kall etter klientavbrudd                                                             | HTTP-responsens premature close og request aborted sendes via Web Request og tjenesten til adapterens fetch. AbortSignal.any kombinerer signal og frist. Aktiv modellplass frigjøres ved avbrudd |
| Samtidighet      | Ett busy-flagg avviste alle andre modellforespørsler                                                                                                               | RAG_MAX_CONCURRENT 1–8, standard 1, valideres ved oppstart. Per prosess, uten ventekø. Full kapasitet gir tydelig 429 med kilder. Test med grense 2 tillater to og avviser den tredje            |
| Rewrite ved bygg | Bygg-/runtime-koden skriver og leser rewrites fra routes-manifest.json                                                                                             | Faktisk bygg med port A og Next start med port B traff bare A. Antakelsen er bekreftet; README beskriver krav om samsvar mellom byggport og tjenesteport                                         |
| Ollama           | Retur beholdt ytre mellomrom; OLLAMA_URL med sti ble godkjent selv om /api/chat fjernet stien                                                                      | Svaret trimmes. Konfigurasjonen avviser sti, query, fragment og credentials eksplisitt; rotsti med/uten avsluttende skråstrek er støttet                                                         |
| Klientfeil       | Ikke-JSON ga generell utilgjengelighetsfeil; validerte kilder kunne tapes ved uventet JSON-struktur                                                                | Forståelig formatfeil uten rå proxytekst. Gyldige kilder beholdes i feil/ukjent JSON-format. Kilder som ikke finnes i en ren tekstrespons kan ikke gjenopprettes                                 |

Fem innledende regresjonstester feilet mot gammel kode: signal/kapasitet, konfigurerbar samtidighet, proxytekst, Ollama-sti og trimming. [Førutskrift](lifecycle/before-tests.txt). Alle eksisterende testforventninger er beholdt. Typekontroll fant under arbeidet en for snever inferert literaltype i tidsgrenseparameteren; den fikk eksplisitt number-type før sluttkontrollene.

## Kontrollert Next-versjon og arkitektur

Før endring av next.config.ts ble installert dokumentasjon for rewrites og next CLI lest, sammen med:

- `node_modules/next/dist/server/lib/router-utils/proxy-request.js`: standard 30000, håndtering av proxyfeil og lukket klientforbindelse.
- `node_modules/next/dist/server/config-schema.js` og `config-shared.d.ts`: experimental.proxyTimeout er et støttet ikke-negativt tall i 16.4.3.
- `node_modules/next/dist/server/lib/router-server.js`: sender den konfigurerte proxyTimeout videre.
- `node_modules/next/dist/build/generate-routes-manifest.js`, `build/index.js` og `server/lib/router-utils/filesystem.js`: serialisering ved bygg og bruk av lagrede rewrites i produksjon.

De tre fristene defineres én gang i `src/config/rag.ts`, uten miljøvariabler eller secrets, og reeksporteres av serverkonfigurasjonen. Den separate miljøfrie filen lar klienten bruke samme budsjett uten å importere servermoduler. Next-proxyen bruker serverkonfigurasjonens reeksport. Testene injiserer korte frister; produksjonsstandardene er 60/65/70 sekunder og rekkefølgen har en egen test.

Tjenesten avgrenser også egen venting med signalet dersom en defekt adapter ignorerer avbruddet. Begge grenene av en sen modell-Promise observeres. Dette frigjør lokal kapasitet og avbryter vår transport; det gir ingen garanti om at en ekstern leverandør stopper beregning eller fakturering. Grensen er ikke per bruker eller delt mellom replikaer og erstatter ikke autorisering, rettferdig fordeling eller ratebegrensning. Kildebaserte svar uten modell trenger ingen modellplass.

HTTP-laget lytter på prematur respons-close, ikke vanlig request-close etter ferdig opplasting. Lyttere ryddes bort. Klienten kombinerer valgfritt kallersignal med klientfristen, og chatten avbryter ved avmontering. Ingen ny kø eller avhengighet er innført.

## Tester og produksjonsprøve

**119/119 Node-tester bestått**, inkludert nye tester av begge adapteres timeout med simulert transport, 502 med kilder, kapasitet som frigjøres selv om adapteren ignorerer signal, forhåndsavbrutt kall, klientens format-/kildehåndtering, grensevalidering, lukket HTTP-klient og faktisk Next-proxy mot simulerte modeller. Ingen ekte 30–60-sekunders modellgenerering er prøvd; testene bruker korte skalerte frister. Pristestene bruker fortsatt fixtures uten nettverk.

Faktisk `pnpm build` og kort `next start` med simulerte HTTP-backender verifiserte rewrite-antakelsen:

- Byggport: **54975**. Runtime RAG_PORT: **54976**.
- Manifestdestinasjon: `http://127.0.0.1:54975/api/rag`.
- HTTP 200 fra bygg-backenden; teller **A=1 / B=0**.
- Byggkonfigurasjonen inneholdt proxyTimeout **65000**.

Se [resultat](lifecycle/rewrite-result.json), [byggutskrift](lifecycle/build.txt), [startutskrift](lifecycle/start.txt) og [orchestreringsskript](lifecycle/check-build-rewrite.mjs.txt). Alle prøveservere/prosesser ble lukket i finally. Deretter ble et **vanlig pnpm build uten testport** kjørt slik at den lokale .next-mappen ikke ble stående med testdestinasjonen. [Vanlig bygg](lifecycle/build-restored.txt) og [gjenopprettet rewrite](lifecycle/restored-rewrite.json) dokumenterer dette.

Sluttkontroller: `pnpm test:rag` 119/119, `pnpm typecheck`, `pnpm build`, `pnpm format:check` og `git diff --check`. Utskrifter lagres sammen med denne rapporten. Ingen produksjonsgodkjenning, faktisk modellkvalitet, ekstern driftsproxy eller ny Docker/Node 22-kjøring påstås. README, .env.example, arkitektur, funksjonsregister og utviklingsplan er oppdatert. Ingen commit eller publisering.
