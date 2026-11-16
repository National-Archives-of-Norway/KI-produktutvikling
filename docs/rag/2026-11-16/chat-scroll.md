# Spør KI: svarstart og fokus uten uønsket rulling

16. november 2026 · Codex (OpenAI), uten underagenter. Kilde: arbeidskopi basert på 2771c90 med rettingen i denne økten. Testet i den lokale Docker-portalen på port 3005; ingen commit eller push.

## Feil og retting

ChatComposer ga tekstfeltet vanlig focus() etter at forespørselen var ferdig. Ved et langt svar rullet nettleseren dermed til skjemaet og forbi starten på svaret. ChatTranscript brukte dessuten hele siste tur, inkludert spørsmålet, som rulleanker.

Fokusreturen er fortsatt begrenset til Send/body, men restoreFocusAfterRequest bruker preventScroll:true. En annen valgt kontroll beholder fokus. ChatTranscript ruller til siste chat-response, slik at ventestatus og deretter svarstart er målet. Ingen endring i modelltransport, spørsmålsgrenser, avbryt-flyt eller API.

## Kontrollgrunnlag

| Kontroll                    | Resultat                                                                                             |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| Fokus-/composerregresjoner  | 9/9 bestod; fokusretur uten rulling, bevaring av annen kontroll, dobbel aktivering og separat Avbryt |
| pnpm test                   | 279/279 Node-tester og 3/3 Python-tester, innholdssynk og 228 filmål i 12 dokumenter bestod          |
| pnpm typecheck              | Bestod                                                                                               |
| Docker Compose build portal | Produksjonsbygg bestod; bare portalcontaineren ble gjenskapt                                         |
| Portalhelse                 | healthy                                                                                              |
| Modellmiljø                 | Volummetadata og Ollama-containerens ID/starttid uendret; ingen modellnedlasting                     |

Den nye fokusregresjonen kaller samme fokusfunksjon som komponenten og kontrollerer preventScroll samt at andre fokuserte kontroller ikke påvirkes. Dette er ingen DOM-simulering eller ny full hjelpemiddelkontroll.

## Faktisk nettleserprøve

Samme eksempelspørsmål, «Hvordan utforsker jeg brukerbehov?», ble sendt ved å klikke Send på /spor før og etter retting, med faktiske Qwen-svar. Nettleseren beholdt sin normale viewport (625 × 762 ved retesten); ingen størrelsesoverstyring. Modelltekstene varierer, så dette er en kontroll av plassering og fokus, ikke av identisk svarinnhold.

| Observasjon etter ferdig svar           |                             Før |             Etter |
| --------------------------------------- | ------------------------------: | ----------------: |
| Svarboksens topp relativt til viewport  | −499,08 px (utenfor synsfeltet) | 23,92 px (synlig) |
| Tekstfeltets topp relativt til viewport |                       319,42 px |         864,92 px |
| Aktivt element                          |                        TEXTAREA |          TEXTAREA |

[Skjermbildet etter retting](chat-scroll.png) viser svarstarten og kildene. Ett bilde er lagret. I den opprinnelige prøven var skjermleser, 320 px, separat dialogprøve og ny full WCAG-kontroll ikke utført. Mobil-/dialogoppfølgingen nedenfor utvider dette testgrunnlaget. Testene/verifiseringen er lokale; ingen GitHub-/produksjonsgodkjenning. Nye dokumentoppføringer etter Docker-bygget krever senere ombygging for å vises i containerens dokumentasjonssider.

Etter dokumentoppdatering bestod pnpm format:check, pnpm test:links (230 filmål i 12 dokumenter) og git diff --check.

## Oppfølging på ba5aee0: 320 px og forsidens dialog

16. november 2026 · Codex (OpenAI), uten underagenter. Ingen kodeendring var nødvendig. Testet eksisterende Docker-portal på port 3005. SHA-256 for composer-focus.ts og chat-transcript.tsx i containeren samsvarer med de committede filene i ba5aee0; portalhelse er healthy. Ingen ny ombygging, modellnedlasting eller volumendring.

### Fremgangsmåte og resultat

- Spør KI-siden ble lastet ved 320 × 762 CSS-piksler. «Hvordan utforsker jeg brukerbehov?» ble sendt med Enter på Send. Etter generert svar ble «Hva er KI-prat?» sendt på samme måte, for å kontrollere at rulleankeret følger nyeste tur.
- Forsidens dialog ble åpnet via Spør KI-knappen i en separat testfane. «Hvordan utforsker jeg brukerbehov?» ble sendt med klikk på Send ved 1280 × 720, med 460 px bred dialog.
- Dialogen ble satt til 320 × 762. Samtalen ble tømt med Tøm chat og samme spørsmål sendt på nytt med Enter på Send. Denne prøven målte en ny fullført forespørsel, ikke bare ombrekking av et allerede vist svar.
- Alle fire forespørslene ga faktiske Qwen-svar med kilder. Plassering og aktivt element ble målt etter at ventingen var ferdig. Ingen nettleser-/modelltransport ble simulert. En ekstra avbruddsaktivering rakk ikke å treffe fordi svaret allerede var ferdig; den regnes ikke som en utført avbruddsprøve.

| Prøve                  | Viewport   | Svarboksens topp | Synlig rulleflate starter | Aktivt element | Horisontal overflyt    | Resultat |
| ---------------------- | ---------- | ---------------: | ------------------------: | -------------- | ---------------------- | -------- |
| /spor, første spørsmål | 320 × 762  |         23,84 px |                      0 px | TEXTAREA       | Nei, dokumentet        | Bestått  |
| /spor, neste spørsmål  | 320 × 762  |         23,94 px |                      0 px | TEXTAREA       | Nei, dokumentet        | Bestått  |
| Forsidens dialog       | 1280 × 720 |        116,78 px |                 116,59 px | TEXTAREA       | Nei, dialogens innhold | Bestått  |
| Forsidens dialog, smal | 320 × 762  |        156,66 px |                 156,79 px | TEXTAREA       | Nei, dialogens innhold | Bestått  |

Posisjonene er viewport-koordinater, også for dialogen. Forskjellen mellom dialogens rulleflate og svarboksens topp er under 0,2 px; svarteksten ligger synlig innenfor boksens padding og skjules ikke bak dialogoverskriften. I den smale dialogen er selve dialogen 304 px bred. På /spor lå tekstfeltet henholdsvis 1008,44 og 933,23 px fra viewporttoppen etter svar, mens svarstarten forble synlig. Fokusreturen trakk dermed ikke visningen ned til tekstfeltet.

[Én ny representativ skjermdump](chat-scroll-dialog-320.png) viser den smale dialogen med synlig svarstart og fast overskrift. Den opprinnelige skjermdumpen er beholdt. Midlertidig viewport-overstyring er nullstilt og testfanen lukket etter prøven.

### Avgrensning

Dette er responsiv nettleserprøve med faktiske modellforespørsler, ikke fysisk mobil, skjermtastatur, skjermleser, zoom eller full WCAG-vurdering. Ingen ny full testpakke eller produksjonsgodkjenning. Tidligere automatiske tester/bygg ovenfor gjelder den committede rettingen. Bare rapport, versjonslogg, plan og ett nytt testbilde oppdateres; Docker-miljøet beholdes, og dokumentoppdateringen er ikke bygget inn på nytt. Ingen commit eller push.

Etter oppfølgingen bestod pnpm test:links (231 filmål i 12 dokumenter), pnpm format:check og git diff --check.
