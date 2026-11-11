# Chatkontroller og listenummerering

Dato: 11. november 2026. Utførende: Codex (OpenAI), uten underagenter. Lokal arbeidskopi basert på `2ecb86c`, Node 24.22.1 / Next.js 16.4.3 på macOS arm64.

## Rettinger og valg

- Førtestene bekreftet at gjentatte markører og ny liste etter avsnitt fikk gjentatte tall. Parseren normaliserer nå hele listen fortløpende fra første nummer når markørene ikke øker strengt. En strengt stigende sekvens beholder eventuelle hopp. Dette er en tydelig regel for vanlig Markdown med gjentatte 1-markører; parseren kan ikke avgjøre modellens hensikt utover dette.
- `ol start` bestemmer startverdien. `li value` settes bare når et nummer faktisk avviker fra forrige nummer + 1. Dermed håndterer nettleseren fortløpende nummerering, mens eksplisitte hopp fortsatt kan vises. Avsnitt avslutter listen og neste liste får egen start.
- Feltet teller grafemer, varsler når tekst kuttes ved 1000 og viser teller fra 900. En permanent polite-status i helperteksten er knyttet til feltet gjennom MUI sin aria-describedby. IME begrenses etter avsluttet komposisjon; dette er ikke manuelt IME-testet.
- Avbryt-knappen bruker den aktive AbortControlleren, frigjør forespørselen umiddelbart og gir turen teksten «Forespørselen ble avbrutt.». Fokus går til skrivefeltet. Gamle svar og finally-blokker kan ikke overstyre en ny forespørsel: både kontrollmodulen og reduceren kontrollerer eierskap/aktiv tur-ID.
- Ren inputlogikk, request-control og reducer/klient testes uten React-testbibliotek eller nye avhengigheter. HTTP-kontrakten er uendret. Avbrudd garanterer ikke at en virkelig leverandør slutter å beregne eller fakturere.

## Kort manuell nettleserkontroll

**Gjennomført med tastatur ved faktisk 320 × 800 px viewport** i den integrerte nettleseren. Testmiljøet var en isolert kopi med samme kildekode og eksisterende node_modules, kjørt med installert Next dev/webpack. Ingen .env-fil ble kopiert. Et separat lokalt HTTP-endepunkt simulerte tregt og raskt svar; ingen virkelig modell ble brukt. Eksisterende server på port 3000 ble ikke stoppet eller brukt til testtrafikken.

| Kontroll               | Observert resultat                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| Innliming av 1001 tegn | Feltet hadde 1000 tegn, synlig melding om kutting og «1000 av 1000 tegn»                                      |
| Teller før grensen     | 900 tegn ga «900 av 1000 tegn», uten gammel kuttemelding                                                      |
| Tastaturinnsending     | Tab fra feltet til Send, deretter Enter; samme knapp viste Avbryt under venting                               |
| Tastaturavbrudd        | Enter på Avbryt; korrekt statusmelding og fokus tilbake i et synlig, redigerbart felt                         |
| Propagering av avbrudd | Simulert backend registrerte lukket forbindelse for første forespørsel                                        |
| Ny innsending          | Nytt spørsmål kunne sendes straks; neste simulerte svar ble vist, og den gamle turen beholdt avbruddsstatusen |
| Liste med 1/1/1        | Tilgjengelighetstreet viste 1/2/3. DOM hadde ol start=1 og ingen li value-attributter                         |
| Smal visning           | Viewport og dokumentbredde var begge 320 px; ingen horisontal overflyt i de prøvde tilstandene                |

[DOM-observasjoner](chat-controls/browser-check.json), [simulert backendlogg](chat-controls/events.jsonl), [kuttemelding](chat-controls/cut-320.png), [Avbryt-knapp](chat-controls/cancel-button-320.png), [avbrutt tur](chat-controls/cancelled-320.png) og [ny innsending](chat-controls/resubmitted-320.png) er bevart. Viewport-overstyringen er nullstilt, begge testserverne er stoppet og den isolerte kopien er fjernet. Ordinært produksjonsbygg peker fortsatt på RAG-port 3001, ikke testporten.

Dette er en avgrenset visuell/tastatur-/DOM-kontroll, ikke faktisk skjermleserbruk eller en ny full tilgjengelighetsvurdering. Ekstern modell, mobil enhet, IME og øvrige nettlesere er ikke manuelt prøvd.

## Automatiske kontroller

`pnpm test` bestod med **172/172 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og Markdown-lenker. `pnpm typecheck`, `pnpm format:check`, `pnpm build` og `git diff --check` bestod. [Manifest med kilde-/beviskontrollsummer](chat-controls/manifest.json), bygglogg og testbevis er bevart under `chat-controls/`. Ingen ny Docker/Node 22-kjøring, Pages-bygg, utrulling eller publisering.
