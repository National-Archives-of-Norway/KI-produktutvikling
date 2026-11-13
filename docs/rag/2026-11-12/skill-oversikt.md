# Skill-oversikt i Spør KI

12. november 2026 · Codex (OpenAI), uten underagenter. Arbeidskopi med foregående Compose-endringer bevart. Ingen blindsett eller test:blind.

## Bekreftet årsak

«Hvilke skills har vi?» ga [] i den kjørende Docker-indeksen. De 17 kildene omfattet enkeltressurser, men ingen samlet katalogkilde. Modellkallet ble derfor ikke startet. Dette er en faktisk innholdsmangel i kunnskapsgrunnlaget, ikke manglende nedlasting av modellen.

## Retting

getSkillCatalogSource bygger en ny offentlig kilde fra resources i src/content/resources.ts. Skill-filtreringen er den samme som i katalogen. Fire Skill-ressurser: tre med registrert pakkemetadata og ett kodegjennomgangseksempel uten registrert pakke. Antall/navn/tekst følger dataene automatisk. Ingen manuell liste eller hardkodet spørsmålsstreng brukes i søket, og ingen private filer eller andre repoer leses. Indeksen har nå 18 kilder.

Kilden peker til /#ressurser. Dette eksakte interne ankeret tillates i klientens kildevalidering; ukjente ankre og eksterne adresser avvises fortsatt. RAG-svarformatet er uendret. Vis/vise/viser er lagt i eksisterende lavvektsgruppe for handlinger, fordi «Vis meg skills i ressurskatalogen» ellers ga poeng til tilfeldig «viser»-omtale i funksjonalitetsoversikten. Handlingene gir fortsatt ingen kilder alene. Ingen eksisterende evalueringsforventninger eller heldOutEvaluation er endret.

| Spørsmål                          | Før                                    | Etter        |
| --------------------------------- | -------------------------------------- | ------------ |
| Hvilke skills har vi?             | Ingen kilder                           | skills først |
| Vis meg skills i ressurskatalogen | Feil første kilde / ingen samlet liste | skills først |

To nye utviklingsforventninger feilet før endring. 93/93 fokuserte søke-/katalogtester bestod etterpå. Nye katalogtester prøver alle Skill-ressurser, utelatelse av andre typer, eksempelstatus, antallsendring ved ny/fjernet ressurs og kjent/ukjent kildeanker.

## Kontroller

pnpm test bestod med **275/275 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og lenkekontroll; typekontroll og Docker Next-produksjonsbygg bestod. Det historiske heldOutEvaluation er bevart og består.

Første faktiske svar etter kildeendringen nevnte alle fire oppføringer korrekt, men utelot inline-henvisning. Den generelle Qwen-instruksjonen krever nå eksplisitt minst én henvisning i answer; payloadtesten dekker denne føringen. Dette er en modellinstruksjon, ikke en garanti for alle fremtidige svar.

Etter ombygging ga nøyaktig «Hvilke skills har vi?» HTTP 200, mode=generated og kilden skills, på 6,124 sekunder. Modellen svarte: «Vi har fire skills i ressurskatalogen: tre med registrert skill-pakke (Test tilgjengelighet og utform erklæring, Kartlegg informasjonskapsler og samtykke, Kartlegg personvern og utform erklæring) og ett eksempel uten registrert skill-pakke (Gjennomgå en kodeendring). [1]» Kontroll av alle fire temaene og [1] bestod. Dette er en lokal faktisk Qwen3:4b-prøve gjennom http://127.0.0.1:3005/api/rag, ikke simulering.

Nettleseren må laste den nye klienten for at det nye kildeankeret skal godtas. Den kjørende Docker-portalen er bygget på nytt med kildeendringen; modellen og modellvolumet er gjenbrukt. Ingen ny nettleser-/skjermleser-, Node 22- eller Pages-kontroll er utført. Etter dokumentoppdatering bestod pnpm format:check, git diff --check og 197 relative filmål i 11 dokumenter. Modellkvalitet er fortsatt Beta; oversikten beskriver hva portalen har registrert, ikke alt som måtte finnes i virksomheten.
