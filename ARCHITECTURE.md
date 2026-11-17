# Kodestruktur

Portalen er én Next.js-applikasjon med en separat RAG-prosess. Oppdelingen følger ansvar, ikke egne pakker eller mikrotjenester. Offentlig eksempelinnhold er tilgjengelig for statisk bygg; servermoduler importeres aldri av klientkomponenter.

Dokumentasjonen er avstemt 11. november 2026 mot kode i c22f1dc og [Linux-kontrollen](docs/CI-KONTROLL.md). [Dokumentasjonsoversikten](docs/DOKUMENTASJON.md) skiller gjeldende beskrivelser fra historiske bevis.

## Hvor endrer jeg hva?

| Behov                                     | Modul                                                 |
| ----------------------------------------- | ----------------------------------------------------- |
| Sider, metadata og ruting                 | `src/app/`                                            |
| Offentlige eksempelressurser              | `src/content/resources.ts`                            |
| Profilfarger, flater og effekter          | `src/theme/`                                          |
| Grunnstiler og sidelayouter               | `src/styles/`                                         |
| Katalogens stil og visning                | `src/components/catalog.css` og `catalog.tsx`         |
| Ren svarparser og grafemvalidering        | `src/features/rag/parse-answer.ts` og `contracts.ts`  |
| Chatvindu, meldinger og skjema            | `src/features/rag/components/`                        |
| Chattilstand og brukerhandlinger          | `src/features/rag/use-chat.ts` og `chat-state.ts`     |
| Avbrudd og eierskap til aktiv forespørsel | `src/features/rag/request-control.ts`                 |
| Grafembasert feltgrense og tilbakemelding | `src/features/rag/question-input.ts`                  |
| Nettleserens RAG-forespørsler             | `src/features/rag/client.ts`                          |
| Felles API-typer og validering            | `src/features/rag/contracts.ts`                       |
| Offentlig kildehenting og modulindeks     | `src/features/rag/retrieval.ts`                       |
| Språkregler, stoppord og handlingsvekt    | `src/features/rag/search-language.ts`                 |
| Chatforslag og forventede kilder          | `src/features/rag/suggestions.ts`                     |
| Miljøfri portvalidering og tidsbudsjett   | `src/config/rag-port.ts` og `src/config/rag.ts`       |
| Modelluavhengig svarflyt                  | `src/server/rag/service.ts`                           |
| Modelladapter og instruksjoner            | `src/server/rag/ollama.ts`, `model.ts` og `prompt.ts` |
| HTTP, grenser og opprinnelseskontroll     | `src/server/rag/http.ts`                              |
| Miljøkonfigurasjon                        | `src/server/rag/config.ts`                            |
| Oppstart, bygg og manuell API-kontroll    | `scripts/`                                            |

## RAG-flyt

```text
Chatvisning → useChat → requestAnswer → /api/rag
                                        ↓
                           HTTP og spørsmålsvalidering
                                        ↓
                             RAG-tjeneste → kildehenting
                                        ↓
                        Valgfri ModelAdapter → Ollama / eksternt modell-API
```

`RagResult` skiller mellom kildeutdrag og genererte svar. `RagError` kan beholde kilder når modellen feiler. Klienten validerer formatet før det brukes i visningen.

`ModelAdapter` tilbyr `generate(question, sources, signal?)`. HTTP-grensen kobler klient-/proxyavbrudd til et AbortSignal, som tjenesten videresender til adapterens fetch sammen med modellfristen via `AbortSignal.any`. Ventingen avgrenses også hvis en adapter ignorerer signalet. Modellplass frigjøres i finally; kildeutdrag bevares i JSON 502/429. Kapasiteten settes med RAG_MAX_CONCURRENT (1–8, standard 1), per prosess, uten kø. Lokal Ollama og eksternt OpenAI-kompatibelt Chat Completions-API er støttet; en ny integrasjon krever egen konfigurasjon og tilgangsvurdering.

I Pages-modus lastes offentlig kildehenting dynamisk i demogrenen, uten nettverkskall til en modell. Den eksplisitte byggkonstanten NEXT_PUBLIC_STATIC_DEMO lar serverbygget fjerne demo-importen helt fra klient-JavaScript. Katalogens egne offentlige ressursdata påvirkes ikke. Ikke legg private kilder i `retrieval.ts` eller andre klientimporterte moduler. Interne kilder krever en separat autorisert serverflyt.

`loadRagConfig` bruker standarder bare når RAG-variabelen er usatt; eksplisitt tom/blank port, samtidighetsgrense eller origin-liste avvises. Den miljøfrie `parseRagPort` i `src/config/rag-port.ts` brukes av både Next-konfigurasjonen og RAG-serveren: standard 3001 bare når usatt, trimming før talltolking og identiske feilmeldinger. Miljøport må være 1–65535. Statisk Pages-bygg har ingen RAG-rewrite og trenger ikke porten. Isolerte oppstartstester kan injisere en ferdig konfigurasjon med port 0 i startRagServer, slik at operativsystemet velger port uten å tillate 0 i driftsmiljøet.

HTTP-grensen får tillatte origins fra den validerte serverkonfigurasjonen (`RAG_ALLOWED_ORIGINS`). Oppstartsskriptet sender konfigurasjonen til HTTP-serveren; klienten leser ikke variabelen. En konfigurert liste erstatter loopback-standardene. Origin-kontroll erstatter ikke autorisering. HTTP-lesefeil/ugyldig input skilles fra uventede søke-/tjenestefeil. For store forespørsler avvises med 413 og eksplisitt lukking etter et begrenset tidsrom for å forkaste gjenværende opplasting uten buffering.

Tidsbudsjettet defineres én gang i den miljøfrie `src/config/rag.ts` og reeksporteres fra serverkonfigurasjonen: modell 60 s, proxy 65 s, klient 70 s. Den offentlige klienten importerer bare denne sikre verdifilen. Nexts experimental.proxyTimeout er kontrollert mot installert 16.4.3-kode/schema og satt eksplisitt. Rewrites lagres i byggmanifestet: RAG_PORT ved bygg må samsvare med tjenestens port ved kjøring; endret miljø ved next start er ikke en runtime-endring av destinasjonen. Lokal produksjonsprøve med to simulerte backender er dokumentert i `docs/rag/2026-11-10/lifecycle.md`.

## Lokal Docker Compose og Ollama

compose.yaml har portal, ollama og en engangstjeneste model-init. Portalcontaineren kjører både Next og RAG med scripts/start-portal.mjs; RAG beholder loopback, så Next-rewrite og felles portvalidering er uendret. Supervision stopper begge hvis én prosess avsluttes. Runtime bruker node-bruker og init-prosess.

loadRagConfig tillater, i tillegg til eksisterende HTTP-loopback, bare hostname ollama med eksplisitt port 11434 og rotsti. Credentials, query, fragment, annen sti/port, host.docker.internal og vilkårlige eksterne/interne verter avvises. Redirects forblir blokkert. Dette er administratorstyrt nettverkskonfigurasjon, aldri klientinput.

model-init laster qwen3:4b ned til navngitt volum og avsluttes. Kjørende ollama starter etter vellykket init, monterer samme volum og har bare internt modellnettverk uten egress eller vertsporter; OLLAMA_NO_CLOUD=1 beholdes. Portal har modellnettverket og et webnettverk med kun loopbackpublisert port 3005. Modellvolumet gjenbrukes ved ombygging/down uten -v. Nedlasting krever nettverk, inferens gjør ikke det. Modelltaggen kan endres hos leverandøren; registrer digest ved faktisk nedlasting og vurder oppdateringer eksplisitt.

Ollama-adapteren kan få numThread fra den validerte servervariabelen OLLAMA_NUM_THREAD (heltall 1–64; tom/ugyldig verdi avvises). Usatt verdi utelater options.num_thread og beholder Ollamas autovalg. Compose setter 4 i portalens miljø, som adapteren videresender per forespørsel; dette er ikke en innebygd miljøvariabel i Ollama-serveren. Målt A/B/A på Docker/Linux arm64 viste kraftig ytelsestap ved automatisk 18-trådsvalg, mens 4 tråder fullførte med samme modell, kontekst og tidsgrense. Tallet er en konservativ testet CPU-profil, ikke en garanti for optimal ytelse på alle maskiner.

Ollama-adapteren sender think=false og num_ctx=8192 sammen med eksisterende temperatur/tokenbegrensning. For Qwen3 ber den om et JSON-skjema med bare answer, og validerer dette før kun svarteksten returneres i den eksisterende API-kontrakten. Faktisk modellprøve viste at API-flagget alene ga tenketekst i den publiserte templaten; strukturert format avgrenser svaret. Avkuttede svar (done_reason=length) avvises slik at tjenesten kan bevare kildene i 502 i stedet for å vise halvferdig tekst. Ingen embeddings eller ny API-kontrakt. Dockerfile/.dockerignore tar ikke med miljøfiler, Git, modeller eller testbevis, og bruker verifiserte image-digester. scripts/check-rag-model.mjs er en eksplisitt ekte modellprøve, ikke en del av pnpm test/CI. [Compose-rapporten](docs/rag/2026-11-12/compose-qwen.md) dokumenterer faktisk miljø og resultater.

Modellmeldinger bygges i messages.ts med context.ts: et samlet budsjett på 6000 tegn for kildeutdrag, normalt opptil 3600 til første kilde og resten til øvrige. Dette er et tegnbudsjett, ikke eksakt tokentelling. Korte kilder beholdes hele; lange kilder velger hele linjer/setninger etter treff med de samme språkreglene og lav handlingsvekt, og setter dem tilbake i original rekkefølge. Uttrykkelige guide.note-forbehold reserveres og beholdes; for store forbehold gir modellfeil fremfor stille kutting. Utelatelser merkes. Kildenumre og titler endres ikke. API-et og kildevisningen beholder fulle RagSource-objekter; begge modelladaptere bruker samme avgrensning. Budsjettet begrenser unødig promptarbeid på lokal CPU, men garanterer ikke svartid eller full dekning av alt innhold.

## Leksikalsk kildesøk

`retrieval.ts` bygger en indeks av offentlige kilder én gang ved modulinnlasting. `search-language.ts` samler begrunnede bokmåls-småord, normalisering og norsk suffiksstamming. Handlingsord beholdes med vekt 0,25; de teller i orddekningen og scoren, men kan ikke gi treff uten et emneord. Kildeord, tittel, innledning, linjestart, ordantall og termfrekvens beregnes ved indeksbygging, ikke per spørsmål.

Scoren skiller tittel/innledning/brødtekst og bruker dokumentfrekvens, dempet termfrekvens og lengdenormalisering. Eksakt hovedord i tittel og linjestart får et lite emnetillegg. Orddekning må være minst halvparten; et enkelt brødteksttreff trenger strengere støtte. Hvis dette gir null kilder ved minst to innholdsord, kan en reserve finne én kilde per sjeldent tema, men bare når minst to temaord har sterk støtte. Sjeldne betyr df ≤ max(2, ceil(N/6)); reserveord trenger tittel/første linje/linjestart eller eksakt body-stamme med minst seks tegn. Reserven normaliserer ikke enkeltordsomtaler etter hele sidens lengde. Resultatet avdupliseres og begrenses til tre. Lik score avgjøres bare av hovedemne i faktisk tittel og deretter corpusrekkefølge. Ingen embeddings eller modell brukes til rangeringen, og HTTP-kontrakten er uendret.

[Stamming og to temaer](docs/rag/2026-11-11/stamming-og-to-temaer.md) dokumenterer endelsesrekkefølge, unntak, lavvektede handlinger, avvik fra de foreslåtte tersklene og før-/etterresultater. Verbformer samles med én endelsesfjerning, e-fjerning og avgrenset dobbelkonsonantforenkling. Frekvensord filtreres før stamming.

Søkenøkkelord er søkehjelp, ikke nytt innhold: sideprosa vedlikeholdes bare i `src/content/pages/*.ts`, og ressurstekst i `src/content/resources.ts`. `ContentPage.keywords` ligger sammen med siden; et `SourceSelection.keywords` i `knowledge.ts` kan beskrive den valgte seksjonen. Sidealiaser arves ikke av seksjonsutdrag. Ressursene bruker sitt eksisterende keywords-felt, også i katalogsøket. Ingen nøkkelord føyes til source.text. Den interne SearchSource-typen er RagSource pluss metadata; createRetriever stripper metadata fra resultatet, og eksportert corpus har bare synlig innhold. HTTP-kontrakten og modellens kildegrunnlag er uendret.

Nøkkelord tokeniseres og stammes ved indeksbygging med samme språkregler som spørsmål og tekst. Eksakt stammetreff gir et sterkt felt med tre grunnpoeng, mellom tittel (fem, eventuelt hovedordstillegg) og brødtekst (to); beste eksisterende feltbidrag beholdes, uten å summere aliaser eller belønne gjentakelse. Dokumentfrekvens inkluderer aliasfeltet. Et spørsmål med bare handlingsord kan få emnestøtte fra et eksplisitt nøkkelord når det har minst to ulike søkestammer. Bare kilden med aliaset får denne støtten; ett isolert handlingsord gir fortsatt ingen kilder. Lav handlingsvekt beholdes. Dette gjør «Lagrer dere det jeg skriver?» søkbart uten å gjøre alle forekomster av lagre i brødtekst til sterke temaer.

Side-/seksjonsaliaser avvises ved tom verdi, bare stoppord/for korte ord, normalisert duplikat og eksakt ord som allerede står i tittelen. Duplikater vurderes før stamming, slik at lagring/lagret kan uttrykke ulike ordformer. Nye ressursaliaser regresjonstestes med samme validator; eksisterende katalogmetadata har også korte katalogforkortelser og tittelord og migreres ikke til strengere forfatterregler. Watch-kontrollen endrer både prosa og et syntetisk alias i en midlertidig sidefil, kontrollerer ny kilde, fravær av metadata i svaret og bortfall av treff når aliaset fjernes. [Nøkkelordrapporten](docs/rag/2026-11-11/sokenokkelord.md) viser listen, innholdsgrunnlaget og før-/etterresultater. Utvidelser utover den bestilte listen skal gjennomgås av et menneske før fletting.

`getSkillCatalogSource` i src/content/catalog.ts bygger en samlet skill-oversikt fra resources, samme data som katalogkortene. Antall, navn, beskrivelser og skille mellom registrert pakkemetadata og eksempler avledes ved indeksbygging; ingen egen skill-liste eller spørsmålsunntak vedlikeholdes. Kilden peker til det eksplisitt tillatte katalogankeret /#ressurser og er en av de offentlige kildene. Enkeltressursene beholdes for detaljerte spørsmål. Vis/vise/viser er lavvektede handlingsord som finn/skriv, slik at et ønske om å vise listen ikke blir et ekstra emneord.

`createRetriever` lar tester lage egne indekser uten å mutere standardkorpuset. Innholdsendring i utvikling starter RAG-prosessen på nytt via watch, og bygger da en ny indeks. I drift må RAG og nettstedet fortsatt utrulles fra samme revisjon.

scripts/rag-search-tests.mjs samler de kjente søke-/språk-/alias-/Copilot-regresjonene. test:search kjører én gang; test:search:watch bruker Nodes test-watch til å kjøre berørte tester på nytt ved endringer i importerte moduler. scripts/dev.mjs starter denne vakten ved siden av RAG og Next, og stopper alle tre ved avslutning. Feil i en test holder vakten og utviklingsserveren åpne for retting; oppstartsfeil/prosessavslutning stopper lokalmiljøet. En isolert integrasjonstest introduserer og retter en syntetisk innholdsfeil i en prosjektkopi og bekrefter grønn → rød → grønn uten manuell omstart. Ingen ekte modell eller ekstern blindmåling inngår; modellen er eksplisitt avskrudd for søkevaktens prosess. De samme testfilene inngår allerede i pnpm test og dermed CI. Filvakten gjelder lokal utvikling, ikke kjørende Docker-produksjon eller endringer i GitHub; nye emner trenger forfatterens relevante testspørsmål etter AGENTS.md.

`chatSuggestions` i `src/features/rag/suggestions.ts` er felles kilde til spørsmål og forventet ressurs i ChatWelcome, ChatTranscript og regresjonstestene. Ingen av disse koblingene brukes som unntak i rangeringen.

[Evaluering og ablasjoner](docs/rag/2026-11-11/retrieval-suggestions.md) dokumenterer forenklingene. Utviklingssettet og historisk heldOutEvaluation er begge kjente regresjoner. `tests/fixtures/rag-blind.json` er bare en tom mal med skjema; den skal ikke fylles i repoet. Det ekte settet holdes utenfor repoet av et menneske som ikke justerer søket. `pnpm test:blind` kjører tests/rag-blind.test.ts eksplisitt, med filvalg fra RAG_BLIND_FILE. Ingen variabel gir bare «ikke målt». Rapporteringshjelperen i tests/rag-blind-report.ts har ingen miljølesing ved import. Den avviser både en oppgitt sti i repoet og en fil hvis realpath ligger under repoets realpath; avgrensningen bruker kataloggrenser, ikke rå strengprefiks. Filinnhold leses først etter stikontrollen.

Standardrapporten har bare antall riktige/totalt, prosent, bom med forventet kilde og falske treff uten forventet kilde. Ingen spørsmålstekst, kilde-ID-er, rå lese-/formatfeil eller filsti logges. RAG_BLIND_VERBOSE=1 er et eksplisitt valg som viser rader kun for menneskelig vurdering, aldri for den som justerer søket eller til tuning. Rapporten har ingen treffsikkerhetsgrense som stopper bygget; tom/ugyldig/uleselig fil betyr ikke målt.

scripts/test-node.mjs velger ordinære .test.ts/.test.mjs-filer og utelater rag-blind.test.ts; dermed inngår ikke den eksterne blindmålingen i pnpm test/test:rag eller CI. tests/rag-blind-controls.test.ts tester bare egne syntetiske filer under os.tmpdir(), inkludert rapportkommandoen i underprosesser med arvede RAG_BLIND_FILE/RAG_BLIND_VERBOSE fjernet. Ingen ekte sett hentes automatisk eller brukes til justering. Norsk stamming er fortsatt en heuristikk.

## Chatkontroller og svarvisning

Den rene request-control-modulen holder én aktiv AbortController. Brukeravbrudd frigjør den med en gang, og identitetskontroll hindrer at et gammelt svar eller finally rydder bort en nyere forespørsel. Reduceren kontrollerer også aktiv tur-ID før complete/cancel. Avbryt bruker samme signal som allerede går til HTTP-/modellflyten; dette garanterer ikke at ekstern leverandør stanser beregning/fakturering.

Composer beholder Send som egen, fokuserbar submit-knapp med aria-disabled under venting. shouldIgnoreSend sperrer klikkets standardhandling mens useChat fortsatt sperrer aktiv forespørsel med controller.current. Avbryt er en separat type=button rett etter Send og bruker samme AbortController. Ved busy→idle avgjør den rene focusTargetAfterRequest i composer-focus.ts om tekstfeltet skal få fokus: bare når aktivt element er Send eller body. Fokus på andre kontroller beholdes; Avbryt som fjernes gir body og dermed retur til feltet. restoreFocusAfterRequest bruker preventScroll:true ved retur til feltet, slik at fokus ikke ruller forbi svaret. ChatTranscript bruker starten av siste chat-response som rulleanker ved ny tur/nytt resultat, også i dialogens rulleflate. Ingen fokusflytting ved første render eller ved start. Venteknappens markerte kant og tekst har verifisert kontrast mot mørk bakgrunn; se [fokusrapport](docs/rag/2026-11-11/chat-focus.md). Et ekstra klikk/Enter på Send kan dermed ikke skifte betydning og avbryte. Ingen tidsbasert sperre eller automatisk fokusflytting til Avbryt brukes. Skjemaet eksponerer aria-busy mens forespørselen pågår; samtaleloggen og den generelle ventestatusen ligger utenfor skjemaet. En permanent polite-status i feltets helpertekst varsler om kutting og viser grafemteller fra 90 % av grensen. IME begrenses etter avsluttet komposisjon. Meldingen og grenseberegningen samt forespørselseierskap kan testes uten React-testavhengigheter.

Parseren gjenkjenner bare ordnede markører med opptil tre siffer og avviser dem når neste ord er et norsk månedsnavn eller en vanlig forkortelse. Datoer og årstall blir dermed avsnitt. Parseren normaliserer hele listen fra første nummer hvis markørene ikke er strengt stigende. Strengt stigende markører beholder hopp. Renderer bruker ol start for startverdien og li value bare ved faktiske hopp; avsnitt starter en separat liste med egen start.

## Stilstruktur

`src/app/globals.css` inneholder bare importrekkefølgen. Grunnstiler, layout, forside, katalog, artikler og chat har egne stilfiler. Eksisterende klassenavn beholdes, og filer importeres sentralt slik at dialogens portal også får stilene.

`portal-theme.ts` bygger på Digitalarkivets MUI-tema. `effects.ts` samler portalens egne farger og effekter for MUI. Felles CSS-variabler eksponeres via temaleverandøren og `tokens.css`. Bruk `accentTint()` i MUI og `color-mix(...var(--accent)...)` i CSS fremfor å gjenta profilens RGB-verdi.

## Kontroller

- `pnpm test:node`: ordinære Node-tester, også priser, innhold, lenkeparser, isolert RAG-oppstart og syntetiske blindrapportkontroller. Den eksterne blindmålingen er eksplisitt utelatt. `test:rag` beholdes som alias for bakoverkompatibilitet.
- `pnpm test:blind`: separat, eksplisitt blindrapport fra ekstern RAG_BLIND_FILE. Ingen ekte sett eller detaljutskrift skal brukes av den som justerer søket. Ikke en del av CI/test.
- `pnpm test:python`: unittest-discover for HTML-tittelregresjonene.
- `pnpm test:content-sync`: reell watch-omlasting i midlertidig prosjektkopi. Kopieringsfunksjonen tar med `src/` unntatt `src/app/`; samme funksjon prøves uten watch i Node-pakken.
- `pnpm test:links`: eksisterende relative filmål i rot-Markdown og direkte `docs/*.md`. Daterte bevismapper skannes ikke rekursivt, og URL-er, portalruter og fragmenter valideres ikke. Skriptet gjør ingen nettverkskall.
- `pnpm test`: Node, Python, innholdssynk og lenkekontroll i rekkefølge; `pnpm check`: format, typer, test og serverbygg.
- `pnpm build:pages`: statisk eksport, separat etter serverbygget.
- `node scripts/check-rag-api.mjs`: kontroll mot en kjørende lokal tjeneste.

HTTP-testene åpner og lukker midlertidige loopback-servere. Modell- og pristester bruker simulert transport/fixtures, ikke ekte leverandører. Python 3 må finnes på PATH. Visuell kontroll, faktiske hjelpemidler og leverandør-/driftsverifisering er separate kontroller.

`.github/workflows/ci.yml` kjører format, typer, samlet test, serverbygg og Pages-bygg ved push/PR eller manuell kjøring. Hele kontrollrekken kjøres i én jobb med navnet Node 24, uten matrise. engines.node er >=24.0.0 <25.0.0, slik at lokal utvikling og CI har samme støttede hovedversjon som Docker. setup-node bruker 24 med check-latest; Docker beholder sin låste 24-digest, så patchversjonene trenger ikke være identiske. Node 22 inngår ikke lenger i støtten eller løpende CI. Prisjobben bruker samme 24-linje og samme SHA-låste checkout/setup-node. pnpm velges fra packageManager; låsefilinstallasjon bruker frozen-lockfile. Alle eksterne actions er låst til verifiserte fullstendige commit-SHA-er med versjonskommentar. Dependabot foreslår github-actions-oppdateringer ukentlig, uten automatisk fletting. Bare contents:read og ingen prosjektsecrets brukes. Prisinnhenting tilhører fortsatt den separate prisjobben. CI-kommandoene er verifisert i Docker/Linux arm64 med Node 22.18.0 og 24.22.2 for c22f1dc, inkludert begge bygg. Avhengighetsoppsettet trengte støttefilnedlasting; selve kontrollrekkene kjørte uten nettverk. Dette er ikke en GitHub-runner eller full innloggings-/driftsverifisering. Første GitHub-kjøring med den tidligere matrisen feilet i checkout på organisasjonens IP-liste. Ny enkeltjobb er ikke prøvd på GitHub, og godkjent runner med tillatt IP må fortsatt avklares; manuell kjøring på botens prisgren og statuskontroll før sammenslåing er forklart i [README](README.md) og [første-push-sjekklisten](docs/FORSTE-PUSH.md). [Lokal kontroll](docs/CI-KONTROLL.md) skiller syntaks-/fixture-testing fra faktisk Actions-kjøring.

Den tidligere README-en er bevart i [historikken](docs/HISTORIKK.md), med relative lenker tilpasset den nye plasseringen. Historiske testresultater er ikke nåværende godkjenning. Forslag til bevislagring ligger i [eget beslutningsgrunnlag](docs/BEVISLAGRING.md); eksisterende bevis er urørt.
