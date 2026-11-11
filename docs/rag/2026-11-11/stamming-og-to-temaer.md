# Norsk stamming og spørsmål om to temaer

11. november 2026 · Codex (OpenAI), uten underagenter. Førmålingen er gjort før språk-/rangeringsendringer i arbeidskopien basert på 6b60622. Tidligere ukommiterte endringer i blindrapportverktøyet er bevart. Ingen blindsett er lest/brukt og ingen pnpm test:blind er kjørt i denne oppgaven. Det er ikke gjort leverandør-/modellkall.

## Grunnlag og målemetode

Utviklingssettet har 29 spørsmål: de opprinnelige 26 og tre oppgitte feil, med forventninger skrevet før endring. Ved to temaer må både retningslinjer og personvern være blant de tre første; øvrige positive svar skal være først med mindre en eksisterende maxRank sier noe annet. Negative spørsmål skal gi []. heldOutEvaluation er et kjent regresjonssett, ikke et blindt sett. Dets array er SHA-256-kontrollert identisk før/etter. Ingen eksisterende kilde-/rangforventning er endret.

| Sett                                    |   Før | Etter |
| --------------------------------------- | ----: | ----: |
| Utvikling, inkludert tre nye            | 26/29 | 29/29 |
| heldOutEvaluation, uendret              | 20/20 | 20/20 |
| Chatforslag, eksisterende               |   6/6 |   6/6 |
| Andre eksisterende spørsmålsregresjoner |   5/5 |   5/5 |

De opprinnelige 26 utviklingsspørsmålene bestod også før endring. Settene overlapper; tallene summeres ikke og måler ikke uavhengig generalisering.

## Bekreftede språkfunn

Alle seks verbgrupper feilet den nye tabelltesten med gammel kode. De oppgitte spørsmålene ga henholdsvis [], bare funksjonalitet og [] før endring. «Ofte» ga stammen «oft» og ingen av de nye frekvensordene ble samlet filtrert bort. Etter endring er frekvensfrasens tokenliste tom, og actionTerms inneholder samme beregnede stammer som variantene av alle seks verbgruppene.

| Verbgruppe                                                    | Stammer før, i samme rekkefølge                            | Felles stamme etter |
| ------------------------------------------------------------- | ---------------------------------------------------------- | ------------------- |
| slette / sletter / slettet / sletting                         | slet / slett / slett / sletting                            | slet                |
| oppdatere / oppdaterer / oppdateres / oppdatert / oppdatering | oppdater / oppdater / oppdateres / oppdatert / oppdatering | oppdater            |
| lagre / lagrer / lagres / lagret / lagring                    | lagr / lagr / lagres / lagr / lagring                      | lagr                |
| dele / deler / deles / delt / deling                          | del / del / deles / delt / deling                          | del                 |
| bruke / bruker / brukes / brukt                               | bruk / bruk / brukes / brukt                               | bruk                |
| teste / tester / testes / testet / testing                    | test / test / testes / test / testing                      | test                |

## Regler og begrunnede avvik fra forslaget

- Normalisering er uendret (NFD, kombinerende tegn fjernes, æ/ø beholdes). Kort unntaksliste: ting, ring, kring, mening, regning, test og kom. -het/-itet beskyttes, i tillegg til substantivendelsene -sikt/-ment: uten disse blir oversikt/dokument fratatt t mens oversikten/dokumentet beholder den. Egne tabelltester prøver også modelloversikt/modelloversikten.
- Genitiv-s etter bøyning fjernes, deretter én endelse, lengste først, så avsluttende e og dobbelkonsonant. De foreslåtte endelsene er brukt. -ert beholder -er og fjerner bare t; full fjerning ville gitt oppdatert→oppdat mot oppdatere→oppdater. -t og -ing-avledninger tillater en tretegns l-stamme for delt/deling→del; ellers gjelder minst fire tegn for disse og -te, tre for øvrige endelser. Dette løser motstriden mellom de foreslåtte minstegrensene og den påkrevde dele-gruppen.
- Dobbelkonsonant forenkles bare når minst fire tegn blir igjen. Det hindrer at kommer→komm blir kom. test beskyttes mot tes. Dette er fortsatt en begrenset norsk heuristikk, ikke full lemmatisering.
- En samlet frekvensgruppe fjerner aldri, alltid, ofte, sjelden, ganske, veldig og noen ganger før stamming. Innholdsforvaltningens generelle handlinger endre/oppdatere/slette er lagt til den eksisterende lavvektsgruppen; actionTerms beregnes fortsatt med samme tokenisering/stamming. Dette gjør tematisk «pris» sterkere enn den generelle handlingen «oppdatere» uten spørsmålsregler.
- Det vanlige filteret kjøres først med samme 50 %-dekning, krav til enkeltstående treff og maks tre kilder. Bare ved null kilder og minst to innholdsord prøves en reserve: sjeldne ord, beste kilde per ord, deretter avduplisering og samme deterministiske sortering.
- Grensen for sjeldne ord avrundes opp til hele dokumenter: df ≤ 2 eller df ≤ ceil(N/6). I faktisk corpus er N=17 og personopplysninger finnes i tre kilder; den strenge 2,83-grensen ville utelatt temaet. Det er et eksplisitt avvik for små korpus, ikke en kilde-ID-/spørsmålsregel.
- Reserven krever **minst to støttede temaord**, ikke bare to ord i spørsmålet. Uten dette ga ett sjeldent «koster» i innledningen falske treff for pizza/togbillett og én anbefalingsomtale ga restauranttreff. De opprinnelige negative forventningene er beholdt.
- Sterkt reservefeste er tittel/navn, første linje, linjestart eller eksakt stammetreff i brødtekst med **minst seks tegn i stammen** (bevisst konservativt). Enkeltordsreserven bruker samme felt-/frekvenspoeng, men uten lengdenormalisering, så en kort advarsel ikke automatisk slår en lengre forklaring med flere konkrete omtaler.
- Stamming gav flere ekte, men generelle, bodytreff. Rangeringen gir derfor +1 for eksakt hovedord i faktisk tittel og +1 for ikke-titteltreff ved linjestart, sistnevnte utenfor brødtekstens lengdenormalisering. Øvrig tittel-/innledningsvekt, IDF, dempet termfrekvens, dekning og tretrinns poenglikhet er beholdt. Ingen ny rangering er knyttet til bestemte spørsmålsstrenger eller kilde-ID-er.

Kildeord og felt bygges fortsatt én gang per modulinnlasting. Content-sync bygger ny indeks ved prosessomstart. API-kontrakten er uendret, uten nye avhengigheter eller embeddings.

## Utviklingssett – før og etter

Rangerte kilde-ID-er er vist; — betyr ingen treff. Tabellen er kjente utviklingsdata, ikke blinddata.

| Spørsmål                                                   | Forventning                      | Før                                                                   | Etter                                                             |
| ---------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Hvem er statsministeren?                                   | []                               | —                                                                     | —                                                                 |
| Hva er været i Oslo i morgen?                              | []                               | —                                                                     | —                                                                 |
| Hva koster Claude?                                         | priser først                     | priser, funksjonalitet, godkjente-ki-assistenter                      | priser, funksjonalitet, godkjente-ki-assistenter                  |
| Når kommer modelloversikten?                               | oversikt først                   | oversikt, funksjonalitet                                              | oversikt, funksjonalitet                                          |
| kodeendring tester                                         | kodegjennomgang først            | kodegjennomgang, tilgjengelighetserklaering, personvernerklaering     | kodegjennomgang, tilgjengelighetserklaering, personvernerklaering |
| værmelding bananer                                         | []                               | —                                                                     | —                                                                 |
| Hva er KI?                                                 | []                               | —                                                                     | —                                                                 |
| Hvordan tester jeg tilgjengeligheten?                      | tilgjengelighetserklaering først | tilgjengelighetserklaering                                            | tilgjengelighetserklaering                                        |
| Hva er KI-prat?                                            | ki-prat først                    | ki-prat, om, retningslinjer                                           | ki-prat, om, funksjonalitet                                       |
| Hvordan kommer jeg i gang med KI?                          | kom-i-gang først                 | kom-i-gang, om                                                        | kom-i-gang, om                                                    |
| Hvilke retningslinjer gjelder for KI?                      | retningslinjer først             | retningslinjer, godkjente-ki-assistenter, kom-i-gang                  | retningslinjer, godkjente-mcper, godkjente-ki-assistenter         |
| Hvilke verktøy er godkjent?                                | retningslinjer først             | retningslinjer, oversikt, kom-i-gang                                  | retningslinjer, oversikt, kom-i-gang                              |
| tilgjengelighet                                            | tilgjengelighetserklaering først | tilgjengelighetserklaering                                            | tilgjengelighetserklaering                                        |
| retningslinjer                                             | retningslinjer først             | retningslinjer, godkjente-mcper, funksjonalitet                       | retningslinjer, godkjente-mcper, funksjonalitet                   |
| tilgjengelighetserklæring                                  | tilgjengelighetserklaering først | tilgjengelighetserklaering, funksjonalitet                            | tilgjengelighetserklaering, funksjonalitet                        |
| personvernerklæring GDPR                                   | personvernerklaering først       | personvernerklaering, personvern, funksjonalitet                      | personvernerklaering, personvern, funksjonalitet                  |
| Trenger portalen et samtykkebanner?                        | informasjonskapsler først        | informasjonskapsler, personvern, om                                   | informasjonskapsler, personvern, om                               |
| Bruker portalen cookies?                                   | informasjonskapsler først        | informasjonskapsler, funksjonalitet, informasjonskapsler-og-samtykke  | informasjonskapsler, personvern, funksjonalitet                   |
| Hvordan blir jeg med på KI-prat?                           | ki-prat først                    | ki-prat, om, retningslinjer                                           | ki-prat, om, funksjonalitet                                       |
| Hva er status for Atlassian MCP?                           | godkjente-mcper først            | godkjente-mcper, oversikt, funksjonalitet                             | godkjente-mcper, oversikt, funksjonalitet                         |
| Hva koster Copilot-abonnement?                             | priser først                     | priser, funksjonalitet, oversikt                                      | priser, funksjonalitet, oversikt                                  |
| Hvordan utforsker jeg brukerbehov?                         | brukerbehov først                | brukerbehov, kom-i-gang, informasjonskapsler                          | brukerbehov, kom-i-gang, informasjonskapsler                      |
| Hvor finner jeg versjonsloggen?                            | funksjonalitet (≤ 3)             | personvernerklaering, informasjonskapsler-og-samtykke, funksjonalitet | funksjonalitet, tilgjengelighetserklaering, personvernerklaering  |
| Hvordan behandles spørsmålene mine og personopplysninger?  | personvern først                 | personvern, brukerbehov, funksjonalitet                               | personvern, brukerbehov, personvernerklaering                     |
| Hvordan installerer jeg tilgjengelighetsskillen?           | tilgjengelighetserklaering først | tilgjengelighetserklaering                                            | tilgjengelighetserklaering                                        |
| Kan du anbefale en restaurant i Bergen?                    | []                               | —                                                                     | —                                                                 |
| Kan jeg slette historikken?                                | personvern først                 | —                                                                     | personvern, personvernerklaering, funksjonalitet                  |
| Hvor ofte oppdateres prisene?                              | priser først                     | funksjonalitet                                                        | priser, oversikt, godkjente-ki-assistenter                        |
| Kan jeg bruke KI på arkivmateriale med personopplysninger? | retningslinjer, personvern (≤ 3) | —                                                                     | retningslinjer, personvern                                        |

## heldOutEvaluation – før og etter

| Spørsmål                                    | Forventning                           | Før                                                              | Etter                                                                      |
| ------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Hvor mye koster en pizza i Oslo?            | []                                    | —                                                                | —                                                                          |
| Hva er Nasjonalarkivet?                     | []                                    | —                                                                | —                                                                          |
| Skriv et dikt om arkiv                      | []                                    | —                                                                | —                                                                          |
| Hva er prisen?                              | priser først                          | priser, oversikt, godkjente-ki-assistenter                       | priser, oversikt, godkjente-ki-assistenter                                 |
| Hvordan tester jeg koden min?               | kodegjennomgang først                 | kodegjennomgang                                                  | kodegjennomgang                                                            |
| Kan jeg dele kode med KI?                   | kodegjennomgang først                 | kodegjennomgang                                                  | kodegjennomgang                                                            |
| Hva koster det?                             | priser først                          | priser, funksjonalitet                                           | priser, funksjonalitet                                                     |
| Hva koster togbilletten til Bergen?         | []                                    | —                                                                | —                                                                          |
| Hvordan tester jeg pizzadeigen?             | []                                    | —                                                                | —                                                                          |
| Hvem vant fotballkampen i går?              | []                                    | —                                                                | —                                                                          |
| Hvor ligger nærmeste bibliotek?             | []                                    | —                                                                | —                                                                          |
| Hva bør jeg lage til middag?                | []                                    | —                                                                | —                                                                          |
| Hvor er prisene?                            | priser først                          | priser, oversikt, godkjente-ki-assistenter                       | priser, oversikt, godkjente-ki-assistenter                                 |
| Hva sier retningslinjene?                   | retningslinjer først                  | retningslinjer, godkjente-mcper, funksjonalitet                  | retningslinjer, godkjente-mcper, funksjonalitet                            |
| Hvordan gjennomfører jeg kodegjennomgangen? | kodegjennomgang først                 | kodegjennomgang                                                  | kodegjennomgang                                                            |
| Hvilke informasjonskapsler lagres?          | informasjonskapsler først             | informasjonskapsler, informasjonskapsler-og-samtykke, personvern | informasjonskapsler, informasjonskapsler-og-samtykke, personvernerklaering |
| Hvordan finner jeg personvernerklæringen?   | personvern først                      | personvern, personvernerklaering, informasjonskapsler            | personvern, funksjonalitet, personvernerklaering                           |
| Hvordan avklarer jeg samtykket?             | informasjonskapsler-og-samtykke først | informasjonskapsler-og-samtykke, informasjonskapsler             | informasjonskapsler-og-samtykke, informasjonskapsler                       |
| Hva skjer på KI-praten?                     | ki-prat først                         | ki-prat, om, funksjonalitet                                      | ki-prat, om, funksjonalitet                                                |
| Hva inneholder modelloversikten?            | oversikt først                        | oversikt, funksjonalitet                                         | oversikt, funksjonalitet                                                   |

## Kontroller og begrensninger

pnpm test bestod med **242/242 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og **184 relative filmål** i 11 dokumenter. pnpm typecheck, pnpm format:check og git diff --check bestod. De 101 fokuserte språk-/RAG-testene inngår i Node-pakken. Utvikling er 29/29 mot 26/29 før; uendret heldOutEvaluation 20/20, chatforslag 6/6 og øvrige eksisterende spørsmålsregresjoner 5/5. I tillegg til ordtabellene prøver syntetiske indekser kravet om to støttede temaer, sjeldne kontra vanlige ord, korte bodyord, konkret omtale framfor bare dokumentlengde, avduplisering og tre-kildersgrensen. Nye fixture-ID-er er emnenøytrale, så de ikke utilsiktet utløser den eksisterende tittelalias-regelen. Eksisterende evalueringsforventninger er bevart.

Én oppsummering er lagret, uten gjentatte logger eller endring i gamle bevis. Ingen test:blind, ekte eksternt blindsett, Docker-/nettleser-/byggkontroll eller reell modellverifisering i denne oppgaven. Ingen commit/push. Funksjonen er fortsatt Beta; videre uavhengig menneskelig evaluering og produksjonsavklaringer gjenstår.
