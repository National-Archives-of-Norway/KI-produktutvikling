# HTTP-grensen: førtest og retting

Dato: 10. november 2026. Utførende agent: Codex (OpenAI), ingen underagenter. Baseline: `e6d8457`. Node: 24.22.1.

De fire første testene i `tests/rag-http.test.ts` ble skrevet og kjørt mot uendret produktkode før retting. Alle servere i testene bruker `listen(0, "127.0.0.1")` og lukkes i `finally`, også ved feil. Første forsøk var blokkert av sandkassen (`listen EPERM`); faktisk før-/etterkjøring ble utført med tillatelse til lokale porter.

| Funn                                   | Før retting                                                                                                                              | Etter retting                                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Tillatte origins er hardkodet          | Både `http://127.0.0.1:3005` og `https://pilot.example.test` fikk 403 selv med konfigurert liste                                         | Begge får 200 med eksplisitt liste; utelatte/fremmede origins og `null` får 403                  |
| JSON-medietype er bokstavsensitiv      | `Application/JSON` ga 415                                                                                                                | Blandet/store bokstaver og charset godtas; `text/plain` og `application/jsonx` avvises med 415   |
| For stor kropp og forbindelsesgjenbruk | Tre 2 MB-avvisninger ga 413 med `Connection: keep-alive`. Alle tolv etterfølgende fetch-kall ga 200. **ECONNRESET ble ikke reprodusert** | Tre 2 MB-avvisninger gir 413 med `Connection: close`; alle tolv etterfølgende fetch-kall gir 200 |
| Feil i søk eller `service.ask`         | Begge ga 400 med «Forespørselen kunne ikke leses.»                                                                                       | Begge gir 500 med «Tjenesten kunne ikke svare akkurat nå.»; interne feildetaljer eksponeres ikke |

Reset-funnet fra Node 22 er ikke bekreftet i dette miljøet og påstås ikke løst som reprodusert avvik. Den separat bekreftede feilaktige keep-alive-håndteringen og de uttrykkelig bestilte 413-endringene er rettet. Node 22 var ikke tilgjengelig og er ikke testet.

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
