# Søkenøkkelord i Spør KI

11. november 2026 · Codex (OpenAI), uten underagenter. Lokale kjente regresjoner, ingen blindsett, test:blind, leverandørkall eller nettbasert modell. Eksisterende ukommiterte endringer er bevart. Førmålingen er gjort etter at fem nye utviklingsforventninger var skrevet, før endring i søket/metadata.

## Liste til menneskelig gjennomgang før fletting

Bare den bestilte listen er lagt inn. Ingen ekstra nøkkelord foreslås. Sitater nedenfor kommer fra de eksisterende ressurs-/sidefilene; de er dokumentasjon, ikke duplisert prosa i søkeindeksen. Nøkkelord uttrykker måter å spørre om innholdet på, og endrer ikke innholdets status eller personvernforbehold.

| Kilde            | Nøkkelord          | Eksisterende tekst som begrunner aliaset                                                                                          |
| ---------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| tydelig-kontekst | prompt             | «Bruk denne sjekklisten når du formulerer en oppgave til et KI-verktøy.»                                                          |
| tydelig-kontekst | prompting          | «Beskriv mål, rammer og forventet resultat før du starter en oppgave.»                                                            |
| tydelig-kontekst | instruks           | «Bruk denne sjekklisten når du formulerer en oppgave til et KI-verktøy.»                                                          |
| tydelig-kontekst | instruksjon        | «Oppgi relevante rammer, begrensninger og hvilke kilder som skal brukes.»                                                         |
| tydelig-kontekst | ledetekst          | «Mål: …» / «Relevant kontekst: …» / «Ønsket resultat: …»                                                                          |
| tydelig-kontekst | oppgavebeskrivelse | «Beskriv målet og hvem resultatet er til for.»                                                                                    |
| personvern       | lagring            | «Vi har ikke funnet lagring av spørsmål i database eller filer i de gjennomgåtte RAG-funksjonene.»                                |
| personvern       | lagret             | «Chatvisningen beholder de siste meldingene i minnet mens siden er åpen.»                                                         |
| personvern       | slette             | «Tøm chat fjerner meldingene fra chatvisningen.» / «Dette sletter ikke eventuelle server-, drifts- eller modellleverandørlogger.» |
| personvern       | historikk          | «Historikken starter også på nytt ved ny innlasting av siden.»                                                                    |
| personvern       | samtale            | «Tidligere meldinger sendes ikke med som samtalehistorikk i neste modellforespørsel.»                                             |
| personvern       | chathistorikk      | «Chatvisningen beholder de siste meldingene i minnet mens siden er åpen.»                                                         |
| personvern       | tømme              | «Tøm chat fjerner meldingene fra chatvisningen.»                                                                                  |
| personvern       | logg               | «Dette sletter ikke eventuelle server-, drifts- eller modellleverandørlogger.»                                                    |

Vedlikehold: tydelig-kontekst er en ressurs og bruker keywords i src/content/resources.ts; personvern bruker ContentPage.keywords i src/content/pages/personvern.ts. SourceSelection i knowledge.ts støtter seksjonsaliaser uten egen prosa; ingen seksjonsaliaser trengs nå. Hele sidealiaset arves ikke av en seksjon.

## Søkeendring og avgrensning

Indeksen lagrer aliaser som eget felt, med samme normalisering, stoppord og stamming. Eksakt stammetreff har tre grunnpoeng og sterkt feltfeste, mot fem for eksakt tittel og to for brødtekst. Eksisterende IDF, feltbonus og lengde-/frekvensnormalisering påvirker totalscoren. Aliaset setter et gulv på tre før IDF/handlingsvekt og dekning; et bedre eksisterende felt beholdes, ikke dobbelttelles. Aliasenes antall/repetisjon øker ikke scoren. Også ressursenes eksisterende katalogaliaser flyttes ut av source.text til dette feltet; de eksisterende listene beholdes.

Handlinger forblir lavvektede. Bare ved minst to ulike søkestammer og ingen ordinære temaord kan et eksplisitt alias gi handlingen emnestatus, bare i kilden som har aliaset. Dette er nødvendig for «Lagrer dere det jeg skriver?», der lagre/skrive ellers begge er handlinger uten temaord. Ett enkelt «lagres», «teste» eller «dele» er fortsatt for uklart og gir ingen treff. Ingen kilde-ID eller spørsmålsstreng inngår i rangeringen.

SearchSource er intern metadata pluss RagSource. Returnerte kilder og eksportert corpus stripper metadata før API/demo/modell. Sideprosa er uendret. Validatoren avviser tomme aliaser, bare stoppord/for korte ord, normaliserte duplikater og eksakte tittelord på nye sider/seksjoner. Den nye ressurslisten kontrolleres med samme validator; gamle kataloglister har allerede korte forkortelser og tittelord og får ingen ny forfatterregel med tilbakevirkende kraft. Lagret/lagring tillates sammen fordi de er forskjellige ord før stamming.

## Før og etter

Førmålingen bekreftet fem bom. Første spørsmål ga [] i denne arbeidskopien, ikke Kom i gang/Om; øvrige funn ble gjenskapt. Eksisterende heldOutEvaluation og evalueringsforventninger er uendret. Settene er kjente regresjoner og overlapper; de måler ikke uavhengig generalisering.

| Sett                          |   Før | Etter |
| ----------------------------- | ----: | ----: |
| Utvikling (inkludert fem nye) | 29/34 | 34/34 |
| heldOutEvaluation             | 20/20 | 20/20 |
| Chatforslag                   |   6/6 |   6/6 |
| Øvrige eksisterende spørsmål  |   5/5 |   5/5 |

### Utviklingssettet

| Spørsmål                                                   | Forventning                          | Kilder før                                                        | Kilder etter                                                      |
| ---------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| Hvordan skriver jeg en god prompt?                         | tydelig-kontekst (topp 1)            | —                                                                 | tydelig-kontekst                                                  |
| Hvordan skriver jeg gode instrukser?                       | tydelig-kontekst (topp 1)            | kom-i-gang, om                                                    | tydelig-kontekst, kom-i-gang, om                                  |
| Lagrer dere det jeg skriver?                               | personvern (topp 1)                  | —                                                                 | personvern, personvernerklaering                                  |
| Hvordan tømmer jeg chatten?                                | personvern (topp 1)                  | —                                                                 | personvern                                                        |
| Blir samtalen lagret?                                      | personvern (topp 1)                  | brukerbehov                                                       | personvern, brukerbehov                                           |
| Hvem er statsministeren?                                   | []                                   | —                                                                 | —                                                                 |
| Hva er været i Oslo i morgen?                              | []                                   | —                                                                 | —                                                                 |
| Hva koster Claude?                                         | priser (topp 1)                      | priser, funksjonalitet, godkjente-ki-assistenter                  | priser, funksjonalitet, godkjente-ki-assistenter                  |
| Når kommer modelloversikten?                               | oversikt (topp 1)                    | oversikt, funksjonalitet                                          | oversikt, funksjonalitet                                          |
| kodeendring tester                                         | kodegjennomgang (topp 1)             | kodegjennomgang, tilgjengelighetserklaering, personvernerklaering | kodegjennomgang, tilgjengelighetserklaering, personvernerklaering |
| værmelding bananer                                         | []                                   | —                                                                 | —                                                                 |
| Hva er KI?                                                 | []                                   | —                                                                 | —                                                                 |
| Hvordan tester jeg tilgjengeligheten?                      | tilgjengelighetserklaering (topp 1)  | tilgjengelighetserklaering                                        | tilgjengelighetserklaering                                        |
| Hva er KI-prat?                                            | ki-prat (topp 1)                     | ki-prat, om, funksjonalitet                                       | ki-prat, om, funksjonalitet                                       |
| Hvordan kommer jeg i gang med KI?                          | kom-i-gang (topp 1)                  | kom-i-gang, om                                                    | kom-i-gang, om                                                    |
| Hvilke retningslinjer gjelder for KI?                      | retningslinjer (topp 1)              | retningslinjer, godkjente-mcper, godkjente-ki-assistenter         | retningslinjer, godkjente-mcper, godkjente-ki-assistenter         |
| Hvilke verktøy er godkjent?                                | retningslinjer (topp 1)              | retningslinjer, oversikt, kom-i-gang                              | retningslinjer, oversikt, kom-i-gang                              |
| tilgjengelighet                                            | tilgjengelighetserklaering (topp 1)  | tilgjengelighetserklaering                                        | tilgjengelighetserklaering                                        |
| retningslinjer                                             | retningslinjer (topp 1)              | retningslinjer, godkjente-mcper, funksjonalitet                   | retningslinjer, godkjente-mcper, funksjonalitet                   |
| tilgjengelighetserklæring                                  | tilgjengelighetserklaering (topp 1)  | tilgjengelighetserklaering, funksjonalitet                        | tilgjengelighetserklaering, funksjonalitet                        |
| personvernerklæring GDPR                                   | personvernerklaering (topp 1)        | personvernerklaering, personvern, funksjonalitet                  | personvernerklaering, personvern, funksjonalitet                  |
| Trenger portalen et samtykkebanner?                        | informasjonskapsler (topp 1)         | informasjonskapsler, personvern, om                               | informasjonskapsler, personvern, om                               |
| Bruker portalen cookies?                                   | informasjonskapsler (topp 1)         | informasjonskapsler, personvern, funksjonalitet                   | informasjonskapsler, personvern, funksjonalitet                   |
| Hvordan blir jeg med på KI-prat?                           | ki-prat (topp 1)                     | ki-prat, om, funksjonalitet                                       | ki-prat, om, funksjonalitet                                       |
| Hva er status for Atlassian MCP?                           | godkjente-mcper (topp 1)             | godkjente-mcper, oversikt, funksjonalitet                         | godkjente-mcper, oversikt, funksjonalitet                         |
| Hva koster Copilot-abonnement?                             | priser (topp 1)                      | priser, funksjonalitet, oversikt                                  | priser, funksjonalitet, oversikt                                  |
| Hvordan utforsker jeg brukerbehov?                         | brukerbehov (topp 1)                 | brukerbehov, kom-i-gang, informasjonskapsler                      | brukerbehov, kom-i-gang, informasjonskapsler                      |
| Hvor finner jeg versjonsloggen?                            | funksjonalitet (topp 3)              | funksjonalitet, tilgjengelighetserklaering, personvernerklaering  | funksjonalitet, tilgjengelighetserklaering, personvernerklaering  |
| Hvordan behandles spørsmålene mine og personopplysninger?  | personvern (topp 1)                  | personvern, brukerbehov, personvernerklaering                     | personvern, brukerbehov, personvernerklaering                     |
| Hvordan installerer jeg tilgjengelighetsskillen?           | tilgjengelighetserklaering (topp 1)  | tilgjengelighetserklaering                                        | tilgjengelighetserklaering                                        |
| Kan du anbefale en restaurant i Bergen?                    | []                                   | —                                                                 | —                                                                 |
| Kan jeg slette historikken?                                | personvern (topp 1)                  | personvern, personvernerklaering, funksjonalitet                  | personvern, personvernerklaering, funksjonalitet                  |
| Hvor ofte oppdateres prisene?                              | priser (topp 1)                      | priser, oversikt, godkjente-ki-assistenter                        | priser, oversikt, godkjente-ki-assistenter                        |
| Kan jeg bruke KI på arkivmateriale med personopplysninger? | retningslinjer + personvern (topp 3) | retningslinjer, personvern                                        | retningslinjer, personvern                                        |

### Uendret heldOutEvaluation

| Spørsmål                                    | Forventning                              | Kilder før                                                                 | Kilder etter                                                     |
| ------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Hvor mye koster en pizza i Oslo?            | []                                       | —                                                                          | —                                                                |
| Hva er Nasjonalarkivet?                     | []                                       | —                                                                          | —                                                                |
| Skriv et dikt om arkiv                      | []                                       | —                                                                          | —                                                                |
| Hva er prisen?                              | priser (topp 1)                          | priser, oversikt, godkjente-ki-assistenter                                 | priser, oversikt, godkjente-ki-assistenter                       |
| Hvordan tester jeg koden min?               | kodegjennomgang (topp 1)                 | kodegjennomgang                                                            | kodegjennomgang                                                  |
| Kan jeg dele kode med KI?                   | kodegjennomgang (topp 1)                 | kodegjennomgang                                                            | kodegjennomgang                                                  |
| Hva koster det?                             | priser (topp 1)                          | priser, funksjonalitet                                                     | priser, funksjonalitet                                           |
| Hva koster togbilletten til Bergen?         | []                                       | —                                                                          | —                                                                |
| Hvordan tester jeg pizzadeigen?             | []                                       | —                                                                          | —                                                                |
| Hvem vant fotballkampen i går?              | []                                       | —                                                                          | —                                                                |
| Hvor ligger nærmeste bibliotek?             | []                                       | —                                                                          | —                                                                |
| Hva bør jeg lage til middag?                | []                                       | —                                                                          | —                                                                |
| Hvor er prisene?                            | priser (topp 1)                          | priser, oversikt, godkjente-ki-assistenter                                 | priser, oversikt, godkjente-ki-assistenter                       |
| Hva sier retningslinjene?                   | retningslinjer (topp 1)                  | retningslinjer, godkjente-mcper, funksjonalitet                            | retningslinjer, godkjente-mcper, funksjonalitet                  |
| Hvordan gjennomfører jeg kodegjennomgangen? | kodegjennomgang (topp 1)                 | kodegjennomgang                                                            | kodegjennomgang                                                  |
| Hvilke informasjonskapsler lagres?          | informasjonskapsler (topp 1)             | informasjonskapsler, informasjonskapsler-og-samtykke, personvernerklaering | informasjonskapsler, informasjonskapsler-og-samtykke, personvern |
| Hvordan finner jeg personvernerklæringen?   | personvern (topp 1)                      | personvern, funksjonalitet, personvernerklaering                           | personvern, funksjonalitet, personvernerklaering                 |
| Hvordan avklarer jeg samtykket?             | informasjonskapsler-og-samtykke (topp 1) | informasjonskapsler-og-samtykke, informasjonskapsler                       | informasjonskapsler-og-samtykke, informasjonskapsler             |
| Hva skjer på KI-praten?                     | ki-prat (topp 1)                         | ki-prat, om, funksjonalitet                                                | ki-prat, om, funksjonalitet                                      |
| Hva inneholder modelloversikten?            | oversikt (topp 1)                        | oversikt, funksjonalitet                                                   | oversikt, funksjonalitet                                         |

## Kontroller

pnpm test bestod: **258/258 Node-tester**, **3/3 Python-tester**, faktisk watch-/innholdssynk med tilføying/fjerning av alias og ingen metadata i API-svaret, samt lenkekontroll. Etter dokumentoppdatering bestod **187 relative filmål i 11 dokumenter**, pnpm typecheck, pnpm format:check og git diff --check. Ingen ny Docker-, nettleser-, bygge- eller ekte modellkontroll er bestilt. Første delte miljø er fortsatt lukket pilot; listen skal gjennomgås av et menneske før fletting.
