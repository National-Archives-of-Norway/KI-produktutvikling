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

## Node 22 i Docker/Linux – 11. november 2026

**Resultat: 119/119 Node-tester og 460/460 gjentatte fokusprøver bestod. Faktiske 35- og 60-sekundersforløp bestod også.** Testet commit: `7ebbab353442004fb2f70f6d948b5c711db0fddd`. Utførende agent: Codex (OpenAI), ingen underagenter.

Runtime var Node 22.18.0 / Undici 6.21.2, Next.js 16.4.3, pnpm 11.25.0 og Git 2.39.5 på Debian 12/Linux arm64, LinuxKit 7.0.14, Docker 29.8.2. Det tidligere Linux-kontrollbildets låste avhengigheter ble gjenbrukt med ny Git-snapshot; ingen pakker ble installert i denne oppfølgingen. Se [runtime](../2026-11-11/node22-lifecycle/runtime.json), [bilde](../2026-11-11/node22-lifecycle/image.json) og [manifest](../2026-11-11/node22-lifecycle/manifest.json).

### Kontroller og resultater

| Kontroll                                                          | Resultat                                                                    |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Hele pakken: `node --test tests/*.test.ts tests/*.test.mjs`       | 119/119, ingen feil eller hoppede tester                                    |
| HTTP-/proxy-/livsløpstestene i 20 nye prosesskjøringer            | 23/23 hver gang, totalt 460/460                                             |
| Treg simulert Ollama, gjennom faktisk Next-proxy og requestAnswer | HTTP 200 etter **35 029 ms**, trimmet modellsvar og tre kilder              |
| Simulert eksternt API som ellers skulle vente 90 s                | Modelltransporten avbrutt; JSON **502 etter 60 017 ms**, tre kilder bevart  |
| Neste kall etter både det trege svaret og timeout                 | HTTP 200 med generert simulert svar; kapasiteten var frigjort               |
| Integritet                                                        | package.json, pnpm-lock.yaml og pris-snapshot hadde identisk hash før/etter |

De 20 fokusprøvene kjørte de uendrede `rag-lifecycle.test.ts`, `rag-proxy.test.ts` og `rag-http.test.ts`: modellfrister for begge adaptere, 502 med kilder, caller-/klient-/proxyavbrudd, kapasitet som frigjøres selv om en adapter ignorerer signal, grense 2 med tredje kall avvist med 429/kilder, forhåndsavbrutt kall, ikke-JSON, Ollama-konfigurasjon/trimming og tidligere HTTP-regresjoner. Gjentakelsene brukte korte skalerte frister. De separate langvarige prøvene brukte uendrede produksjonsstandarder **60/65/70 s** med faktiske timere, ikke en simulert klokke. 35-sekunderssvaret passerte dermed den tidligere problematiske 30-sekundersgrensen.

Langprøvene brukte applikasjonens klientfunksjon, Nexts faktiske `proxyRequest`, RAG-HTTP-tjenesten og modelladapterne med simulert fetch-transport. Vanlig Next-start/rewrite-probe og produksjonsbygg er ikke kjørt på nytt i Docker denne gangen. Det er ingen ekstern modellverifisering: alle svar og transportavbrudd kom fra testdobler. Testene beviser ikke at en virkelig leverandør stopper beregning/fakturering ved avbrudd.

### Isolasjon, første forsøk og opprydding

Alle kontrollcontainerne kjørte med **`--network none`**, uten publiserte porter, med skrivebeskyttet rotfilsystem og midlertidig kjørbar `/tmp`, to CPU-er og 2 GB minne. Koden og avhengighetene lå i et separat bilde; bare testskript/resultatmappe var montert fra verten. Ingen .env, server-secrets eller modellnøkler ble lastet inn. HTTP trafikkerte bare containerens loopback; modeller og prisinnhenting var simulert/fixture-basert. Ingen ekte priskilde, modellleverandør eller GitHub ble kontaktet.

Første hele pakkeforsøk via `pnpm test:rag` startet **ikke** testene: pnpm forsøkte automatisk å åpne/skrive en SQLite-database i det skrivebeskyttede avhengighetslageret. De 20 direkte fokusprøvene bestod i samme oppsett. Den fulle pakken ble deretter kjørt med den identiske underliggende Node-testkommandoen fra package.json, fortsatt skrivebeskyttet og uten nettverk, og bestod 119/119. Ingen avhengighet, test eller produktkode ble endret for å få grønt resultat. [Første pnpm-utskrift](../2026-11-11/node22-lifecycle/initial-pnpm-readonly/full-tests.txt) og den første samlede delstatusen er bevart.

Alle testservere ble lukket. De tre midlertidige kontrollcontainerne ble automatisk fjernet, og fravær ble kontrollert med Docker. Ingen eksisterende apptjeneste ble stoppet eller rekonfigurert. Nye prisdata er ikke hentet eller lagret.

### Bevis og gjenkjøring

- [Full testutskrift](../2026-11-11/node22-lifecycle/full-tests.txt), [samlet resultat med 20 gjentakelser](../2026-11-11/node22-lifecycle/summary.json) og [fokusprøvenes exit-koder](../2026-11-11/node22-lifecycle/repeat-exit-codes.txt). Hver gjentakelse er også bevart som `repeat-1.txt` til `repeat-20.txt` i samme mappe.
- [Faktiske tidsmålinger og resultater](../2026-11-11/node22-lifecycle/realtime-result.json), [original langprøveutskrift](../2026-11-11/node22-lifecycle/realtime-log.txt) og [langprøvens kjøreskript](../2026-11-11/node22-lifecycle/realtime-probe.mjs).
- [Kjøreskript for testpakken/gjentakelsene](../2026-11-11/node22-lifecycle/run-linux.sh), [første kjøreskript](../2026-11-11/node22-lifecycle/initial-run-linux.sh), [Dockerfile](../2026-11-11/node22-lifecycle/Dockerfile), [manifest](../2026-11-11/node22-lifecycle/manifest.json) og [inngangshasher](../2026-11-11/node22-lifecycle/input-hashes.json).

Lokal `pnpm format:check` og `git diff --check` er kontrollert etter dokumentasjonsoppdateringen. Ingen ny typekontroll, produksjonsbygg, nettleser-/tilgjengelighetskontroll eller prøving av ekte ekstern driftsproxy er utført i denne oppfølgingen. AMD64 og andre patchversjoner er ikke testet. Funksjonsregister, Beta-status og produksjonskrav videreføres. Ingen produktkodeendring, commit eller publisering.
