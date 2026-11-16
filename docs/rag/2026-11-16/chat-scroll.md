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

[Skjermbildet etter retting](chat-scroll.png) viser svarstarten og kildene. Ett bilde er lagret. Skjermleser, 320 px, separat dialogprøve og ny full WCAG-kontroll er ikke utført. Dialogen bruker samme komponenter, men er ikke visuelt retestet i denne økten. Testene/verifiseringen er lokale; ingen GitHub-/produksjonsgodkjenning. Nye dokumentoppføringer etter Docker-bygget krever senere ombygging for å vises i containerens dokumentasjonssider.

Etter dokumentoppdatering bestod pnpm format:check, pnpm test:links (230 filmål i 12 dokumenter) og git diff --check.
