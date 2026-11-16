# README-oppskrift prøvd med rent modellvolum

**Senere oppfølging 16. november:** [Årsak, retting og retest](../qwen-threads/rapport.md) bekrefter ytelsestap ved automatisk 18-trådsvalg. Compose-profilen er rettet til fire tråder og reelle svar er retestet under samme 60-sekundersgrense. Resultatene nedenfor er den opprinnelige prøven før rettingen, ikke gjeldende feilstatus.

16. november 2026 · Codex (OpenAI), uten underagenter. Testet kilde: **7441c7026c6fa1a158d0b7887976f82b929ef67d** fra git archive. Ingen eksterne modell-API-er, priskilder eller blindsett ble brukt. Modellen kjørte faktisk i lokal Docker/Linux arm64; transporten var ikke simulert.

**Samlet resultat: delvis bestått. Rent bygg, modellnedlasting, helse, nettsider, kildesøk og omstart bestod. Fire genereringsforsøk traff modellens 60-sekundersgrense og ga HTTP 502 med kilder. Oppskriften er derfor ikke verifisert som vellykket ende-til-ende-generering i denne prøven.** Tidligere vellykkede modellprøver fra eksisterende miljø beholdes som historikk og erstatter ikke dette resultatet.

## Isolasjon og hva «rent» betyr

- Kildekopien inneholdt ikke .env.local, node_modules eller .next. Blindfixturen ble utelatt uten å lese innholdet. Originalprosjektet var rent ved start.
- Eget Compose-prosjekt ki-readme-clean-20261116, bilde ki-produktutvikling:readme-clean-7441c70, modellvolum ki-readme-clean-20261116_ollama-models og loopback-port 3015. Ingen eksisterende portal eller modellvolum ble gjenbrukt. Et engangskall med skrivebeskyttet montering og network=none bekreftet null oppføringer i volumet før nedlasting.
- [Test-overstyringen](compose.test.yaml) endret bare appbildets tag, verts-port og tilsvarende RAG_ALLOWED_ORIGINS. Den ble validert med compose config: kun port 3015, eget prosjektvolum og eget appbilde. Ingen kildekode, modellparametre eller tidsgrenser ble endret.
- docker compose build --no-cache --pull portal ble kjørt før oppstart. Appens avhengighetsinstallasjon og bygglag ble laget på nytt; Docker-daemonen og de pinnede base-/Ollama-bildene ble delt med maskinens eksisterende miljø. Dette er ikke en ny maskin, ny Docker-installasjon eller en test uten eksisterende baseimage-cache.
- Node 24.22.2 i container, Compose 5.5.1, Linux arm64, 18 virtuelle CPU-er og 8 317 267 968 byte Docker-minne (ca. 7,75 GiB). Reell ytelse på andre maskiner er ikke prøvd.

## Gjennomføring og resultater

| README-punkt                        | Resultat                        | Grunnlag                                                                                                                                                                                                    |
| ----------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ren installasjon og produksjonsbygg | Bestått, ca. 42,83 s            | Bygg med låsefil og uten app-/avhengighetslagcache, exit 0. Samme Dockerfile og Next-konfigurasjon som kildecommiten.                                                                                       |
| Første modellnedlasting             | Bestått, init ca. 76,93 s       | Tomt volum, faktisk pull, SHA-256-verifisering, manifestskriving og suksess i init-loggen; ingen «Gjenbruker»-melding ved første kjøring.                                                                   |
| Modell                              | qwen3:4b, 2 497 293 931 byte    | Digest 359d7dd4bcdab3d86b87d73ac27966f4dbb9f5efdfcc75d34a8764a09474fae7. Taggens innhold samsvarte med tidligere modell, men ble lastet ned på nytt til eget volum.                                         |
| Oppstartsrekkefølge                 | Bestått                         | model-init Exited (0), deretter ollama healthy og portal startet. Portalen og modellserveren var healthy.                                                                                                   |
| README-helsekommandoer              | Bestått                         | ollama show fant modellen; RAG /health ga status=ok og generationEnabled=true.                                                                                                                              |
| Forside og /spor                    | Bestått på HTTP-nivå            | Begge ga HTTP 200, H1 og en undersøkt statisk ressurs med HTTP 200. Ingen full visuell nettleserkontroll.                                                                                                   |
| Reell modelltest fra README         | Feilet både kald og varm        | node scripts/check-rag-model.mjs http://127.0.0.1:3015 avsluttet med exit 1 på første spørsmål, HTTP 502. Skriptet nådde derfor ikke de to neste spørsmålene i noen av disse kjøringene.                    |
| Øvrige spørsmål, kjørt enkeltvis    | Søket bestod, generering feilet | Tabellen nedenfor viser resultat per spørsmål. Ikke omtalt som bestått bare fordi probeskriptet registrerte svarene uten å kaste.                                                                           |
| Intern modellisolasjon              | Bestått                         | Modellnettverket var Internal=true, ingen vertsporter på Ollama, bare loopback-port 3015 på testportalen, og ingen modellvolummontering i portalen.                                                         |
| down uten -v og up -d --build       | Bestått                         | Testvolumet ble bevart, init bekreftet gjenbruk uten pull, modelldigest/størrelse var uendret og RAG ble frisk etter ca. 9,7 s. Begge tjenester ble healthy igjen. Ingen ny genereringsprøve etter omstart. |

Fordi init ble startet separat for å kontrollere det tomme volumet mens appbygget pågikk, er download-/byggetidene ikke en samlet stoppeklokke for ett up-kall. Deretter ble hele instansen startet med README-kommandoen up -d --build. Den benyttet de nybygde testlagene og ventet på at init skulle fullføre. Omstartsdelen brukte også README-kommandoene, med eget prosjektnavn og overstyring.

### Spør KI gjennom portalens /api/rag

| Spørsmål / kjøring                               | Resultat                                                      | Kilder                                              |
| ------------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------- |
| Hvordan skriver jeg en god prompt? – kald modell | HTTP 502 etter ca. 60 s, ingen generert svartekst             | tydelig-kontekst bevart                             |
| Samme spørsmål – varm modell, én retest          | HTTP 502 etter ca. 60 s, ingen generert svartekst             | tydelig-kontekst bevart                             |
| Hvordan utforsker jeg brukerbehov?               | HTTP 502 etter 60 019 ms                                      | brukerbehov, kom-i-gang, informasjonskapsler bevart |
| Hvilke skills har vi?                            | HTTP 502 etter 60 025 ms                                      | skills bevart                                       |
| Hvem er statsministeren?                         | HTTP 200 på 34 ms, mode=sources, ingen treff eller generering | Tom kildeliste, som forventet                       |

Alle spørsmålene brukte port 3015 og riktig Origin. De fire timeoutene ga nøytral JSON-feil og tilgjengelige kilder, ikke ren tekst eller en falsk påstand om at modellen hadde svart. Ollama-loggen viser ca. 60 sekunders /api/chat-kall og etterfølgende avbrutte oppgaver. Kildesøkets treff og modellens ferdige generering er derfor to forskjellige kontrollresultater.

## Åpent funn og neste steg

**Genereringen må undersøkes videre før oppskriften kan kalles en verifisert førstegangsoppskrift for ferdige modellsvar på denne maskinen.** Varm retest feilet også, så forklaringen kan ikke begrenses til innlasting ved kald oppstart. Ressurs-/kjøretidsforhold og modellens faktiske genereringsforløp må undersøkes; årsaken er ikke fastslått her. Ingen tidsgrense, modell, kontekst eller prompt ble endret for å få et grønt resultat.

Senere feilsøking bør først reprodusere timeouten med samme digest/konfigurasjon og måle innlasting, promptbehandling og tokenproduksjon. Eventuelle endringer i modell-/ytelsesinnstillinger eller frister er en egen rettingsoppgave med før-/etterkontroll. Gjenstående modell-/pilotavklaringer i utviklingsplanen består.

Nettleserverktøyet mistet forbindelsen før første tilstandsavlesning. Ingen tastatur-, mobil-, skjermleser- eller visuell kontroll er derfor utført i denne prøven. HTTP- og faktiske modellkall ovenfor er gjennomført; de skal ikke presenteres som browser-ende-til-ende-test.

## Bevaring og opprydding

Før-/etterkontroll bekreftet samme ID, opprettelsestid, bilde-ID, starttid, status og omstartsteller for de tre eksisterende ki-produktutvikling-containerne. Det eksisterende modellvolumets metadata og modellmanifestets SHA-256 var identiske før og etter prøven og oppryddingen. Ingen kommando stoppet, fjernet eller gjenskapte disse ressursene. At en inaktiv modell naturlig kan lastes ut av minnet er ikke en volumendring.

Bare testprosjektets containere, nettverk, modellvolum og appbildetag ble fjernet etter prøven. Ingen global prune, endring av Docker-ressursinnstillinger, Git-historikk eller push er utført. Vertens delte byggcache/basebilder ble ikke ryddet globalt.

[Resultater og kontrollmetadata](resultater.json) er én samlet oppsummering. [Modellfeilloggen](modellfeil.txt) bevarer de to avbrutte README-skriptkjøringene og relevante Ollama-feillinjer. Standard fremdriftslogger og hele prosjektkopien arkiveres ikke. Det er ikke opprettet nye skjermbilder.

pnpm test:links bestod med 212 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Resultatfilens avvik er avstemt mot rapporten og utviklingsplanen. Ordinær testpakke, Pages-bygg og nye tilgjengelighetstester er ikke kjørt; applikasjonskode er uendret.
