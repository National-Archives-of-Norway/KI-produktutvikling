# Faktiske modellsvar om godkjente MCP-er

16. november 2026 · Codex (OpenAI), uten underagenter.

Testet den kjørende Docker-portalen på http://127.0.0.1:3005 med commitetikett 88cc33a9815456bd6ca76e59a5dd84a10429e555. Portalhelse var healthy. Modelloppsettet var Ollama/qwen3:4b med OLLAMA_NUM_THREAD=4. Dette er faktisk modelltransport, ikke simulering.

## Fremgangsmåte og forventning

Fire spørsmål ble sendt sekvensielt via samme /api/rag-endepunkt som chatklienten, med Origin for port 3005. Forventning: bare Logorama og Prometheus oppgis som godkjent; Atlassian beholder ROS-analyse pågår/ikke godkjent, og Slack Planlagt/ikke godkjent. Kildesøket ble også kontrollert direkte med de samme spørsmålene, uten endring av søkereglene.

Alle fire forespørslene ga HTTP 200 og mode=generated. Første kilde var godkjente-mcper, med lenke til /oversikt/godkjente-mcper/. Kildeinnholdet inneholdt de nye godkjenningene. Alle svar viste [1]; samtlige viste kildenumre var innenfor returnert kildeliste.

| Spørsmål                                      | Faktisk svar                                                                                                        |     Tid | Vurdering |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------: | --------- |
| Hvilke MCP-er er godkjent?                    | Logorama MCP og Prometheus MCP er godkjente MCP-er i Nasjonalarkivet [1].                                           | 23.77 s | Bestått   |
| Er Logorama MCP godkjent?                     | Logorama MCP er godkjent i Nasjonalarkivet, som vist i kildene [1] og [2].                                          | 45.99 s | Bestått   |
| Er Prometheus MCP godkjent?                   | Prometheus MCP er godkjent i Nasjonalarkivet, som vist i kildene [1] og [2].                                        | 47.67 s | Bestått   |
| Hva er status for Atlassian MCP og Slack MCP? | Atlassian MCP er under ROS-analyse og ikke godkjent, mens Slack MCP er planlagt vurdert men ikke godkjent ennå. [1] | 49.56 s | Bestått   |

Innholdet er vurdert av utførende agent mot portalens felles MCP-side; dette er ikke en separat menneskelig godkjenning av integrasjonene. Godkjenningsstatusen bygger på brukerens opplysning i MCP-oppdateringen. Kildehenvisninger og transportstatus er kontrollert programmatisk.

## Avgrensning

Fire enkeltprøver med korrekt kilde og svar, ikke en generell garanti for fremtidige modellsvar. Tidsgrensen er uendret; ingen ytelsesjustering eller gjentatt stresstest. Ingen ny nettleserprøve, full testpakke, bygg, modellnedlasting, endring av konfigurasjon/volum, virksomhets-/produksjonsgodkjenning, commit eller push. Kun testresultat, plan og versjonslogg oppdateres; den kjørende containeren bygges ikke på nytt for disse notatene.

Dokumentkontroller: pnpm test:links (233 filmål i 12 dokumenter), pnpm format:check og git diff --check bestod.
