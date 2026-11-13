# Datoer i svar, chatknapper og RAG-port

11. november 2026 · Codex (OpenAI), uten underagenter. Lokal Node 24.22.1 / Next.js 16.4.3 på macOS. Tidligere ukommiterte endringer er bevart.

## Bekreftelse og retting

| Funn                             | Bekreftet med eksisterende kode                                                                                                                       | Retting og regresjonskontroll                                                                                                                                                                                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dato/årstall blir lister         | Parser-testen for «10. november 2026 ble …» feilet. Separat kjøring av original parser bekreftet start 10 og start 2026 for begge oppgitte eksempler. | Maks tre siffer; et norsk månedsnavn eller vanlig forkortelse rett etter markøren avviser den. Begge eksempler blir avsnitt. Alle tolv måneder, forkortelser med/uten punktum, store bokstaver og vanlige lister testes. Eksisterende hopp/fortsettelseslinjer/nummerering beholdes. |
| Send bytter betydning til Avbryt | Test av faktisk ChatComposer, gjengitt med eksisterende TypeScript og ReactDOM/server, bekreftet at Send manglet i busy-tilstand.                     | Send beholder navn/type/plassering og er native disabled under venting. Separat Avbryt har type button. Et dobbeltklikk eller ny Enter på Send kan ikke aktivere Avbryt. Ingen tidssperre som forsinker et ønsket avbrudd.                                                           |
| Manglende aria-busy              | Egen gjengivelsestest feilet på manglende attributt.                                                                                                  | Skjemaet har aria-busy=true mens forespørselen pågår og false ellers. Samtaleloggen og generell ventestatus ligger utenfor skjemaet.                                                                                                                                                 |
| Ulik RAG_PORT-tolking            | Sammenligning av faktisk Next-rewrite og loadRagConfig feilet for mellomrom før/etter port, tom/blank verdi, 0 og andre ugyldige verdier.             | Begge bruker miljøfri parseRagPort: usatt → 3001, trimmet tall → 1–65535, tom/ugyldig → samme feiltekst. Testene sammenligner 13 verdier og gjenoppretter miljøet.                                                                                                                   |

Portvalideringen ligger i src/config/rag-port.ts og leser ikke miljøet selv. Next leser bare RAG_PORT for serverbyggets rewrite; Pages har ingen rewrite eller RAG-portavhengighet. Kravet om samme port ved bygg og kjøring er uendret.

Datoavgrensningen er en bevisst heuristikk for norsk tekst, ikke generell datoforståelse. Renderer gir fortsatt aldri modelltekst HTML eller vilkårlige lenker.

## Kort nettleserkontroll

Gjennomført i integrert nettleser ved **320 × 800 px**, med installert Next dev/webpack i isolert prosjektkopi. Ingen .env ble kopiert; en lokal testserver simulerte langsomme og raske JSON-svar. Ingen ekte modell eller priskilder ble kalt. Vanlig portal på 3000/3001 ble ikke brukt som testtjeneste.

- Tastatur: felt → Tab til Send → to raske Enter. Forespørselen fortsatte; Send var deaktivert og Avbryt var en egen knapp.
- Etter deaktivering falt aktivt fokus fra Send; Tab nådde det skrivebeskyttede feltet, neste Tab nådde Avbryt. Ingen automatisk fokusflytting til Avbryt kunne få andre Enter til å avbryte. Enter på Avbryt ga «Forespørselen ble avbrutt.» og fokus tilbake til feltet.
- Raskt dobbeltklikk på Send i neste tur ga én fortsatt ventende forespørsel, uten utilsiktet avbrudd. Testbackend observerte tilkoblingsavbrudd ved hvert tilsiktet avbrudd.
- Ny innsending med raskt simulert svar virket etter avbrudd. DOM/AX viste dato og årstall i p, én ol med start 1 og bevisste li-hopp til 3 og 10.
- Send, Avbryt og Tøm chat fikk plass med linjebryting ved behov; ingen horisontal overflyt i ventende eller fullført tilstand. aria-busy ble observert som true under venting og false etter avbrudd/svar.

[Skjermbilde av knappene ved 320 px](../../arkiv/skjermbilder/rag/2026-11-11/chat-dates-buttons-320.png). Begge testservere og prosjektkopien er fjernet; viewport er nullstilt og testfanen lukket. Faktisk skjermleser, IME, fysisk mobil og øvrige nettlesere er ikke testet. Dette er ikke full tilgjengelighetsgodkjenning.

## Kontroller

`pnpm test` bestod med **206/206 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og **133 relative filmål** i åtte dokumenter. `pnpm typecheck`, `pnpm format:check`, `pnpm build` og `git diff --check` bestod. Kun denne oppsummeringen og ett lite skjermbilde er lagt til som bevis; midlertidige standardlogger er ikke arkivert. Eksisterende bevismapper er ikke endret. Ingen nye avhengigheter, endret API-kontrakt, Docker/Node 22-kjøring, Pages-bygg, commit eller publisering i denne oppfølgingen.
