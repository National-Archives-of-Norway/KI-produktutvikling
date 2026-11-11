# Kildesøk: forslag, handlinger og enklere rangering

11. november 2026 · Codex (OpenAI), uten underagenter. Lokal Node 24.22.1. Ingen modell-, priskilde- eller andre eksterne kall.

## Grunnlag og før/etter

Førmålingen ble gjort med den eksisterende algoritmen før kodeendring. «Riktig» betyr forventet kilde på forventet plass (først hvis ikke annet er angitt), eller ingen kilder for negative spørsmål. Alle gamle evalueringsforventninger er uendret.

| Sett                                              |                   Før |                 Etter |
| ------------------------------------------------- | --------------------: | --------------------: |
| Eksisterende utviklingssett                       |                 26/26 |                 26/26 |
| Historisk heldOutEvaluation, kjent regresjonssett |                 20/20 |                 20/20 |
| Chatforslag fra begge komponentene                |                   5/6 |                   6/6 |
| Oppgitte eksempelspørsmål                         |                   1/5 |                   5/5 |
| Samlet, unike spørsmål                            |        48/52 (92,3 %) |         52/52 (100 %) |
| blindEvaluation, menneskeskrevet                  | 0 spørsmål, ikke målt | 0 spørsmål, ikke målt |

Settene overlapper, og delsummer skal ikke summeres. Begge tidligere sett er kjente. Utvikling og regelvurdering brukte deres union med oppgitte feil og UI-forslag: 52 unike spørsmål. Dette utvidede utviklingsgrunnlaget er **ikke en blind måling av generalisering**. Nye blindspørsmål skal skrives av et menneske som ikke justerer søket. Filen er tom, med skjema/instruksjoner; rapporttesten gir diagnostikk, men har ingen terskel som stopper bygget. Manglende/ugyldig grunnlag meldes som ikke målbart. Dette innebærer ingen ny godkjenning av tjenesten.

## Bekreftede eksempelspørsmål

Kildene står i rangert rekkefølge; `[]` betyr ingen treff.

| Spørsmål                                                  | Før                                  | Etter                                                                       |
| --------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| Hvordan gir jeg KI god kontekst?                          | kom-i-gang, om                       | tydelig-kontekst, kom-i-gang, priser                                        |
| Hvordan gir jeg KI kontekst?                              | tydelig-kontekst, kom-i-gang, priser | tydelig-kontekst, kom-i-gang, priser                                        |
| Hvordan gir jeg god kontekst til en KI-assistent?         | kom-i-gang, om, personvernerklaering | tydelig-kontekst, godkjente-ki-assistenter, informasjonskapsler-og-samtykke |
| Hvor lagres spørsmålene mine?                             | []                                   | personvern, informasjonskapsler                                             |
| Hva gjør dere med spørsmålene etter at jeg har sendt dem? | funksjonalitet, ki-prat, om          | personvern, informasjonskapsler                                             |

## Forslag og forventet kilde

Koblingene ligger i `src/features/rag/suggestions.ts`. Velkomst, oppfølgingsforslag og testen bruker samme konstant; algoritmen bruker den ikke. Ingen spørsmålsstreng eller bestemt kilde-ID avgjør rangeringen.

| Forslag                                | Forventet kilde først      | Før, første kilde          | Etter, første kilde        |
| -------------------------------------- | -------------------------- | -------------------------- | -------------------------- |
| Hvordan gjennomgår jeg en kodeendring? | kodegjennomgang            | kodegjennomgang            | kodegjennomgang            |
| Hvordan gir jeg KI god kontekst?       | tydelig-kontekst           | kom-i-gang                 | tydelig-kontekst           |
| Hvordan utforsker jeg brukerbehov?     | brukerbehov                | brukerbehov                | brukerbehov                |
| Hvordan tester jeg tilgjengeligheten?  | tilgjengelighetserklaering | tilgjengelighetserklaering | tilgjengelighetserklaering |
| Hva er KI-prat?                        | ki-prat                    | ki-prat                    | ki-prat                    |
| Hvilke retningslinjer gjelder for KI?  | retningslinjer             | retningslinjer             | retningslinjer             |

## Regelvurdering

Én regel ble fjernet/erstattet om gangen fra den fungerende kandidatmodellen. Tabellen viser treffsikkerhet uten regelen på det gamle utviklingssettet og på det utvidede kjente grunnlaget. Referansen er 26/26 og 52/52. Etterpå ble de seks tapsfrie fjerningene prøvd samlet, også 52/52. En regel beholdes ved målbart bidrag til det samlede kjente grunnlaget, selv om det gamle 26-spørsmålssettet alene ikke skiller variantene. Dette er en eksplisitt kompatibilitetsbegrensning, ikke uavhengig validering.

| Fjernet regel / forsøkt alternativ           | Gamle utviklingssett | Samlet | Beslutning                |
| -------------------------------------------- | -------------------: | -----: | ------------------------- |
| Stamming                                     |                24/26 |  38/52 | Beholdt opprinnelig regel |
| Sammensetningstreff i tittel/navn            |                25/26 |  49/52 | Beholdt opprinnelig regel |
| Tittelbonus                                  |                15/26 |  30/52 | Beholdt opprinnelig regel |
| Innledningsbonus                             |                24/26 |  49/52 | Beholdt opprinnelig regel |
| Vekt for sjeldne ord (IDF)                   |                26/26 |  51/52 | Beholdt opprinnelig regel |
| Dempet termfrekvens                          |                25/26 |  50/52 | Beholdt opprinnelig regel |
| Normalisering for tekstlengde                |                25/26 |  50/52 | Beholdt opprinnelig regel |
| Dekningsfaktor i poengsum                    |                25/26 |  51/52 | Beholdt opprinnelig regel |
| Minst 50 % vektet dekning                    |                26/26 |  51/52 | Beholdt opprinnelig regel |
| Langord-unntak for enkeltstående treff       |                26/26 |  52/52 | Fjernet                   |
| Frekvenstak for sterke enkeltstående treff   |                26/26 |  52/52 | Fjernet                   |
| Minstelengde for enkeltord-unntak            |                26/26 |  51/52 | Beholdt opprinnelig regel |
| Unntak for sjeldent enkeltord                |                26/26 |  51/52 | Beholdt opprinnelig regel |
| Frekvenskrav for enkeltord-unntak            |                26/26 |  50/52 | Beholdt opprinnelig regel |
| Tittelantall som eget nivå ved poenglikhet   |                26/26 |  52/52 | Fjernet                   |
| Første ord i faktisk tittel ved poenglikhet  |                26/26 |  51/52 | Beholdt opprinnelig regel |
| Dekning som eget nivå ved poenglikhet        |                26/26 |  52/52 | Fjernet                   |
| Linjestart som eget nivå ved poenglikhet     |                26/26 |  52/52 | Fjernet                   |
| Kortere tekst som eget nivå ved poenglikhet  |                26/26 |  52/52 | Fjernet                   |
| Full vekt 1 for handlinger i stedet for 0,25 |                26/26 |  50/52 | Beholdt opprinnelig regel |

De fire fjernede poenglikhetsnivåene ga ingen målbar gevinst; nå sorteres det på poengsum, hovedemnet (første ord i faktisk tittel), deretter stabil corpusrekkefølge. Gamle enhetstester som krevde de fjernede sorteringsleddene er erstattet med testen av den enklere kontrakten. Ingen forventet kilde/rang i de to evalueringssettene ble endret. Langord-unntak og frekvenstak for sterke treff var også overflødige. Stamming, tittel-/innledningsvekt, IDF, dekningskrav og avgrenset enkeltord-unntak er beholdt fordi fjerning mistet riktige svar.

Den gamle rangeringskjeden prioriterte ofte en kort omtale av spørsmål framfor personvernsidens lagringsforklaring. Kandidaten legger derfor til dempet termfrekvens (0,5 × log2(1 + forekomster)) og moderat lengdenormalisering for brødtekst (0,75 + 0,25 × lengde/gjennomsnitt). Titteltreff normaliseres ikke. Poengsummen multipliseres med andelen treffende emneord. Hvert av disse leddene bidrar målbart i tabellen, men øker også kompleksiteten og må følges opp med menneskeskrevne blindspørsmål.

## Språk og indeks

- Stoppordene er samlet etter spørsmål/pronomen, hjelpeverb, relasjoner, konjunksjoner og vurderende småord. Det dekker blant annet «gir», «god», «etter», «eller» og «sendt». Portalemner står ikke i stoppordlisten. «Kommer» er fortsatt ikke et stoppord.
- Handlinger beholder vekt 0,25 i poeng og dekning. De kan skille kilder innen samme emne, men kan aldri gi kilde uten et treffende emneord. Tester dekker handlinger alene og lagring mot deling av samme emne. Dette er bevisst svak vekting, ingen full grammatisk analyse.
- Minst halvparten av den vektede spørringen må dekkes. Ett emnetreff trenger tittel-/linjestarttreff eller det avgrensede sjeldne enkeltord-unntaket. Vanlige brødtekstord alene åpner ikke alle kilder.
- Aksenter normaliseres som i katalogsøket (NFD og fjerning av kombinerende tegn); æ/ø beholdes. Den eksisterende avgrensede norske suffiksstammingen er bevart.
- Kildeord, titler, innledning, linjestart, frekvenser og tekstlengde beregnes én gang når modulindeksen bygges. `createRetriever` gir isolerte indekser for tester uten mutasjon av standardkorpuset. En getter-test bekrefter at kildeteksten ikke leses på nytt for hvert spørsmål.
- Content-sync starter RAG-prosessen på nytt ved kildeendring og bygger dermed ny indeks. Reell watch-/helsekontroll inngår i `pnpm test`; produksjon må fortsatt utrulles med samme innholdsrevisjon.

## Kontroller og begrensninger

`pnpm test` bestod med **187/187 Node-tester**, **3/3 Python-tester**, faktisk watch-/innholdssynk og **131 relative filmål** i åtte dokumenter. `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestod. Én rapport er lagret; variantkjøringenes standardlogger er bare midlertidige og ikke arkivert som bevis. Ingen eksisterende bevismapper er endret, og ingen generell lagringsregel er innført. Ingen nye avhengigheter, embeddings eller endret API-kontrakt. Ingen ny bygg-, Docker/Node 22-, nettleser- eller ekte modellkontroll er påstått.
