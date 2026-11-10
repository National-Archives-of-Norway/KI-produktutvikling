# HTTP-grensen: førtest og retting

Dato: 10. november 2026. Utførende agent: Codex (OpenAI), ingen underagenter. Baseline: `e6d8457`. Node: 24.22.1.

De fire første testene i `tests/rag-http.test.ts` ble skrevet og kjørt mot uendret produktkode før retting. Alle servere i testene bruker `listen(0, "127.0.0.1")` og lukkes i `finally`, også ved feil. Første forsøk var blokkert av sandkassen (`listen EPERM`); faktisk før-/etterkjøring ble utført med tillatelse til lokale porter.

| Funn                                   | Før retting                                                                                                                              | Etter retting                                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Tillatte origins er hardkodet          | Både `http://127.0.0.1:3005` og `https://pilot.example.test` fikk 403 selv med konfigurert liste                                         | Begge får 200 med eksplisitt liste; utelatte/fremmede origins og `null` får 403                  |
| JSON-medietype er bokstavsensitiv      | `Application/JSON` ga 415                                                                                                                | Blandet/store bokstaver og charset godtas; `text/plain` og `application/jsonx` avvises med 415   |
| For stor kropp og forbindelsesgjenbruk | Tre 2 MB-avvisninger ga 413 med `Connection: keep-alive`. Alle tolv etterfølgende fetch-kall ga 200. **ECONNRESET ble ikke reprodusert** | Tre 2 MB-avvisninger gir 413 med `Connection: close`; alle tolv etterfølgende fetch-kall gir 200 |
| Feil i søk eller `service.ask`         | Begge ga 400 med «Forespørselen kunne ikke leses.»                                                                                       | Begge gir 500 med «Tjenesten kunne ikke svare akkurat nå.»; interne feildetaljer eksponeres ikke |

Reset-funnet fra Node 22 er ikke bekreftet i dette miljøet og påstås ikke løst som reprodusert avvik. Den separat bekreftede feilaktige keep-alive-håndteringen og de uttrykkelig bestilte 413-endringene er rettet. Node 22 var ikke tilgjengelig i den første arbeidsøkten; den senere Node 22-kontrollen er dokumentert nedenfor.

## Utførelse

- `RAG_ALLOWED_ORIGINS` leses/valideres i serverkonfigurasjonen før oppstart. Manglende variabel bruker dagens to loopback-origins; en eksplisitt liste erstatter dem. Tomme elementer, wildcard, andre protokoller, stier, query, fragment og credentials avvises. Origins normaliseres og dedupliseres. Oppstartsskriptet sender konfigurasjonen til HTTP-serveren. Ingen klienteksponert miljøvariabel eller ny avhengighet.
- Medietypen deles ved semikolon, trimmes og sammenlignes med små bokstaver. Ugyldig JSON/spørsmål eller lesefeil klassifiseres som klientfeil, mens uventede søke-/tjenestefeil gir nøytral 500. Modelladapterens egne feilsvar beholdes.
- `Content-Length` over 8192 byte avvises før buffering. Strømmer uten kjent lengde kontrolleres under lesing. Iteratoren bruker `destroyOnReturn: false` slik at avbrutt lesing ikke ødelegger socketen før svaret sendes.
- 413 har `Connection: close`, eksplisitt responslengde og sendes straks. Resten av opplastingen forkastes uten buffering. Responsen avsluttes og forbindelsen lukkes når innlesingen er ferdig, eller etter maksimalt ett sekund. Et første rettingsforsøk med umiddelbar `res.end()` utløste `EPIPE` i 2 MB-testen på Node 24; den endelige varianten består samme test.
- Fem supplerende tester dekker standard-/normalisert origin-liste, ugyldige lister for alle modellvalg, tidlig avvisning med bare headers og ingen kropp, chunked 2 MB-opplasting og bevarte klientstatuskoder/gyldig kropp på nøyaktig 8192 byte.

Origin-kontrollen er ikke innlogging, autorisering eller automatisk CORS-støtte. Manglende Origin godtas fortsatt for interne/serverbaserte kall. Delt HTTPS-miljø og intern ruting er ikke testet. Funksjonsregisteret, README, arkitekturdokumentet, `.env.example` og fase 5/P3 i utviklingsplanen er oppdatert; Beta-status og produksjonshindringer beholdes.

## Kontroller

- `pnpm test:rag`: 94/94 bestått, inkludert ni nye konfigurasjons-/HTTP-tester. Ingen eksisterende forventninger er endret. Ingen virkelig modell brukes.
- `pnpm typecheck`: bestått.
- `pnpm format:check`: bestått.
- `git diff --check`: bestått.
- `node scripts/check-rag-api.mjs`: bestått mot eksisterende tjeneste på port 3001 (kildehenting, ugyldig JSON og fremmed origin). Forsøk på separat tjeneste på denne porten ble avvist med EADDRINUSE. Eksisterende tjeneste ble ikke stoppet eller rekonfigurert; dens revisjon er ikke verifisert. Kontroll av den endrede koden bruker isolerte testservere på tilfeldige porter.

Ingen commit eller publisering i denne arbeidsøkten.

## Oppfølging med Node 22 – 10. november 2026

**Resultat: ingen ECONNRESET eller EPIPE i den rettede versjonen.** Testet faktisk kode fra commit `2e5411a` med **Node 22.18.0 / Undici 6.21.2 / macOS arm64**, både i HTTP-serveren og fetch-klienten. Versjon 22.18.0 er prosjektets oppgitte minimumsversjon. Binærpakken ble hentet fra `https://nodejs.org/dist/v22.18.0/node-v22.18.0-darwin-arm64.tar.gz` til en midlertidig mappe. SHA-256 ble kontrollert mot Node-distribusjonens `SHASUMS256.txt`: `2c12913cba67af77ded8a399df3fd91c2e7f8628c7079da40bb9ff33bf00dfc0`. Systemets Node, prosjektavhengigheter og den eksisterende tjenesten på port 3001 ble ikke endret.

Hele testkommandoen bak `pnpm test:rag` ble kjørt direkte med den verifiserte Node 22-binæren: `node --test tests/*.test.ts tests/*.test.mjs`. **94/94 bestod**, inkludert alle ni HTTP-/konfigurasjonstestene. Se [original testutskrift](node22-http/test-suite.txt).

En separat, gjentakbar [stresstest](node22-http/stress.mjs) brukte tre nye servere med `listen(0, "127.0.0.1")`. Hver server kjørte 50 runder med Content-Length og 50 runder med chunked-opplasting. Hver runde bestod av et vellykket oppvarmingskall, en kropp på **2 097 152 byte**, og fire påfølgende fetch-kall. Node sin vanlige fetch-forbindelsespool ble brukt, uten manuell lukking eller ny klient mellom kallene. Svarkropper ble lest helt; vellykkede kall ble også kontrollert for forventet kilde. Alle servere og sockets ble lukket i `finally`.

| Variant                 | 2 MB-kall med 413 | Connection: close | Etterfølgende kall med 200 | Forespørselsfeil |
| ----------------------- | ----------------- | ----------------- | -------------------------- | ---------------- |
| Kjent Content-Length    | 150/150           | 150/150           | 600/600                    | 0                |
| Chunked via fetch-strøm | 150/150           | 150/150           | 600/600                    | 0                |
| Totalt                  | 300/300           | 300/300           | 1200/1200                  | 0                |

I tillegg ga alle 300 oppvarmingskall 200. Råresultatet registrerer runtime, tre serverkjøringer, tellere, feilliste og opprydding: [stress-result.json](node22-http/stress-result.json). Feillisten er tom. Det ble ikke gjort automatiske forsøk på nytt etter feil. Kjøring fra prosjektroten med en Node 22-binær:

```sh
node --test tests/*.test.ts tests/*.test.mjs
node docs/rag/2026-11-10/node22-http/stress.mjs /tmp/rag-node22-result.json
```

Dette bekrefter at den rettede koden tåler prøvde 2 MB-avvisninger og etterfølgende kall på Node 22.18.0. Den gamle implementasjonen er ikke kjørt på nytt med Node 22, så resultatet bekrefter ikke den opprinnelige feilens reproduksjon eller alle mulige timingforhold. Andre Node 22-patchversjoner, Linux/Docker, samtidige opplastinger, treg nettverkstrafikk og delt produksjonsproxy er ikke testet i denne oppfølgingen. `check-rag-api.mjs` er ikke kjørt på nytt; den opprinnelige kontrollen ovenfor gjelder eksisterende tjeneste med ukjent revisjon.

Ingen produktkode, funksjon eller modenhetsstatus er endret. Funksjonsregisteret og produksjonskravene i utviklingsplanen videreføres. Rettelsen ovenfor er committet som `2e5411a`; denne testoppfølgingen er ikke committet eller publisert.

## Oppfølging i Docker/Linux med Node 22 – 10. november 2026

**Resultat: ingen ECONNRESET, EPIPE eller andre forespørselsfeil.** Den rettede HTTP-grensen er nå testet også i en faktisk Linux-container, med Node 22.18.0 / Undici 6.21.2 på Debian 12 (bookworm), Linux arm64. Docker-motor: 29.8.2, LinuxKit-kjerne 7.0.14. Både server og fetch-klient kjørte i containeren. Det offisielle bildet `node:22.18.0-bookworm-slim` ble låst til digest `sha256:752ea8a2f758c34002a0461bd9f1cee4f9a3c36d48494586f60ffce1fc708e0e`.

Testen brukte en isolert Git-snapshot fra `8aa422f6718dfa664fb35a280ce4da1203d549ce`. HTTP-koden er uendret fra rettingen i `2e5411a`, som det opprinnelige stresskriptets `testedCommit` viser. [Manifestet](node22-linux-http/manifest.json) registrerer faktisk snapshot, kodehash, kommandoer, bilde og avgrensninger. Snapshoten inneholdt bare `src`, `tests`, `scripts`, `package.json` og det tidligere stresskriptet. Ingen `.env`, `.git`, server-secrets eller modellkonfigurasjon ble montert eller lastet inn. Ingen prosjektavhengigheter ble installert eller endret.

Containeren kjørte med skrivebeskyttet kode og rotfilsystem, separat resultatmappe, midlertidig `/tmp`, fjernede capabilities, `no-new-privileges`, 512 MB minne og to CPU-er. `--network none` tillot bare containerens interne loopback; ingen vertsporter ble publisert. Serverne brukte `listen(0, "127.0.0.1")`. Alle testservere ble lukket og testcontaineren automatisk slettet med `--rm`; fravær av containeren ble kontrollert etterpå. Docker Desktop måtte startes fordi motoren ikke kjørte. Ingen eksisterende apptjeneste eller container ble stoppet eller rekonfigurert av testkjøringen.

| Kontroll i Linux/Node 22                                                  | Resultat                            |
| ------------------------------------------------------------------------- | ----------------------------------- |
| Alle ni HTTP-/konfigurasjonstester (`node --test tests/rag-http.test.ts`) | 9/9 bestått                         |
| Content-Length: 150 kropper à 2 097 152 byte                              | 150/150 ga 413 og Connection: close |
| Etterfølgende fetch-kall etter Content-Length-avvisning                   | 600/600 ga 200                      |
| Chunked via fetch-strøm: 150 kropper à 2 097 152 byte                     | 150/150 ga 413 og Connection: close |
| Etterfølgende fetch-kall etter chunked-avvisning                          | 600/600 ga 200                      |
| Oppvarmingskall                                                           | 300/300 ga 200                      |
| ECONNRESET / EPIPE / øvrige forespørselsfeil                              | 0 / 0 / 0                           |
| Serveropprydding                                                          | 3/3 bekreftet                       |

Stressforløpet var identisk med macOS-prøven: tre friske servere, 50 runder per opplastingsvariant per server, fire nye kall etter hver avvisning, vanlig fetch-forbindelsespool uten manuell klientlukking, full lesing av svar og kontroll av forventet kilde. Ingen automatisk retry ble lagt til. Begge prosesser avsluttet med kode 0.

Bevis: [HTTP-testutskrift](node22-linux-http/http-tests.txt), [maskinlesbart stressresultat](node22-linux-http/stress-result.json), [original stressutskrift](node22-linux-http/stress-log.txt), [runtime](node22-linux-http/runtime.json), [bildeidentitet](node22-linux-http/image.json), [exit-koder](node22-linux-http/exit-codes.json) og [kjøreskript for containeren](node22-linux-http/run-linux.sh). Det eksisterende [stresskriptet](node22-http/stress.mjs) ble brukt uendret.

Dette er avgrenset lokal verifisering i Docker/Linux arm64, ikke produksjonsgodkjenning. AMD64, andre Node-patchversjoner, gamle HTTP-implementasjonens reproduksjon, samtidige opplastinger, treg trafikk og trafikk gjennom Next.js-/produksjonsproxy er ikke undersøkt. Den samlede pakken på 94 tester, TypeScript og API-kontrollskriptet er ikke kjørt på nytt i denne Linux-kjøringen; de ni relevante HTTP-testene og stressforløpet er kjørt. Formatering og `git diff --check` er kontrollert lokalt.

Ingen produktkode, funksjon eller modenhetsstatus er endret. Funksjonsregister og produksjonskrav videreføres. Denne oppfølgingen er ikke committet eller publisert.
