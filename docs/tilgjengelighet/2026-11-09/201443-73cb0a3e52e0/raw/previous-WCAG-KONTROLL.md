# Tilgjengelighetskontroll av KI Produktutvikling

Dato: 6. november 2026. Utførende agent: Codex (OpenAI). Grunnlag: commit `f055757` med lokale endringer i denne arbeidsøkten. Ingen innlogging eller faktisk modellgenerering inngår i testen.

## Samlet status

Kontrollen dekker alle 48 krav som vurderingspunkter, men dokumenterer ikke full etterlevelse. **K** betyr undersøkt uten funn i angitt omfang, **I** betyr at den utløsende innholdstypen eller funksjonen ikke finnes nå, og **U** betyr uavklart eller delvis kontrollert. K skal ikke overføres ukritisk til «oppfylt» i uustatus.no. Virksomheten må bekrefte vurderingene og fullføre U-punktene.

Kravutvalget er kontrollert mot [Uu-tilsynets oversikt](https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86). Beskrivelsene nedenfor er korte arbeidstitler, ikke gjengivelse av hele kravteksten.

## Metode og bevis

- Lokal integrert nettleser: ni sider ved 320 × 740, 844 × 390 og 1280 × 900. 27 DOM-kontroller uten overflyt, navnløse kontroller, dupliserte ID-er eller manglende etikettmål i det avgrensede settet med kontroller. Dette er egne grunnkontroller, ikke axe, Lighthouse eller en full WCAG-skanner.
- Åtte sider ved to størrelser med midlertidig WCAG-tekstavstandsstil; stilen er fjernet etter testen. Visuell kontroll av forside, erklæringsside og chat. Se [visningsdata](2026-11-06/visningskontroll.json) og [tekstavstandsdata](2026-11-06/tekstavstand.json).
- Tastaturhandlinger prøvd med Enter, Space, Tab, Shift+Tab og Escape. Tilgjengelighetstreet er undersøkt, men er ikke en skjermlesertest.
- To kontrasttester beregner luminans og blanding av kantfargen. Hvitt, grått og grønt på bakgrunn: 18,51:1, 12,86:1 og 13,76:1. På grunnflaten: 16,51:1, 11,47:1 og 12,28:1. Dette dokumenterer grunnfargene, ikke alle pikselkombinasjoner eller gradienter.
- `scripts/check-accessibility.py` kontrollerer eksportert HTML for sidespråk, h1/main, ID-er, etikett-/ARIA-referanser, bildeattributter og lokale lenkemål. Pages-eksporten med `/ki-produktutvikling` bestod for 12 HTML-filer, inkludert generert feilside/eksportfiler.
- Alle 18 tester, vanlig produksjonsbygg og Pages-bygg bestod. Ingen publisering utført.

## Vurdering per krav

| Krav   | Tema                                | Status | Observasjon og avgrensning                                                                                                                                                               |
| ------ | ----------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1.1  | Tekstalternativer                   | K      | Logo er dekorativ SVG med aria-hidden og tilhørende synlig navn. Ingen andre meningsbærende bilder.                                                                                      |
| 1.2.1  | Lyd eller video alene               | I      | Ingen lyd- eller videoklipp i dagens innhold.                                                                                                                                            |
| 1.2.2  | Teksting av opptak                  | I      | Ingen video med lyd.                                                                                                                                                                     |
| 1.2.5  | Synstolking                         | I      | Ingen forhåndsinnspilt video.                                                                                                                                                            |
| 1.3.1  | Semantikk                           | U      | Landemerker, etiketter og overskrifter kontrollert. Skjermleservurdering gjenstår.                                                                                                       |
| 1.3.2  | Leserekkefølge                      | K      | DOM og visuell rekkefølge er vurdert for sidemalene og chatten.                                                                                                                          |
| 1.3.3  | Forståelige instruksjoner           | K      | Handlinger beskrives med tekst, ikke bare plassering, form eller lyd.                                                                                                                    |
| 1.3.4  | Orientering                         | K      | Ni sider kontrollert ved 320 × 740 og 844 × 390; ingen orienteringslås.                                                                                                                  |
| 1.3.5  | Personrelaterte skjemafelt          | I      | Ingen felt for personens navn, adresse eller andre definerte personopplysninger.                                                                                                         |
| 1.4.1  | Farge som signal                    | K      | Valgt filter har tekst, form og aria-pressed. Navigasjon har også understreking og vekt.                                                                                                 |
| 1.4.2  | Automatisk lyd                      | I      | Ingen automatisk lyd.                                                                                                                                                                    |
| 1.4.3  | Tekstkontrast                       | U      | Grunnflater og knapper har beregnede forhold over 4,5:1. Alle tilstander og gradienter er ikke målt.                                                                                     |
| 1.4.4  | Tekstforstørring                    | U      | Nettleserens zoomkommando endret ikke målt viewport. 200 % zoom er ikke bekreftet.                                                                                                       |
| 1.4.5  | Tekst som bilde                     | K      | Brødtekst og overskrifter er ekte tekst. Arklogoen er et symbol.                                                                                                                         |
| 1.4.10 | Omflyting                           | K      | Ni sider uten horisontal overflyt ved 320 CSS-piksler; chatdialogen holder seg innenfor skjermen. Faktisk 400 % nettleserzoom gjenstår.                                                  |
| 1.4.11 | Kontrollkontrast                    | U      | Chatfeltets kant er forbedret fra ca. 1,96:1 til 5,57:1 på bakgrunnen. Øvrige kontrolltilstander må vurderes samlet.                                                                     |
| 1.4.12 | Tekstavstander                      | K      | Åtte sider testet med 1,5 linjehøyde, 2 em avsnittsavstand, 0,12 em bokstavavstand og 0,16 em ordavstand, samt chat ved 320 piksler. Nettstedskartet ble lagt til etter denne særtesten. |
| 1.4.13 | Ekstrainnhold ved peker eller fokus | I      | Ingen egne verktøytips eller menyer som åpnes bare ved hover eller fokus.                                                                                                                |
| 2.1.1  | Tastaturhandlinger                  | K      | Hoppelenke, katalog, nullstilling, filter, chatåpning, spørsmålsforslag, innsending, kildeutdrag og lukking testet med tastatur. Ikke en full gjennomgang av alle kombinasjoner.         |
| 2.1.2  | Utgang fra dialog                   | K      | Fokus holdes i dialogen; Escape lukker og returnerer fokus. Tastatur kan fortsatt brukes.                                                                                                |
| 2.1.4  | Enkelttegnsnarveier                 | I      | Ingen egne hurtigtaster med bare ett tegn.                                                                                                                                               |
| 2.2.1  | Brukerfrister                       | I      | Ingen tidsfrist for å fylle ut eller lese innhold. Modelltimeout gjelder et systemkall.                                                                                                  |
| 2.2.2  | Automatisk oppdatering              | I      | Ingen karusell eller automatisk løpende innholdsoppdatering. Bakgrunnsillustrasjonen er statisk.                                                                                         |
| 2.3.1  | Blinking                            | K      | Ingen blinkende innhold funnet i kode eller visuell kontroll.                                                                                                                            |
| 2.4.1  | Snarvei til innhold                 | K      | Hoppelenken flytter fokus til main#innhold.                                                                                                                                              |
| 2.4.2  | Sidetitler                          | K      | Ni sider har beskrivende titler. Den automatiske 404-siden inngår i eksportkontrollen.                                                                                                   |
| 2.4.3  | Fokusflyt                           | U      | Vanlige handlinger og dialogsyklus kontrollert. Full fokusrekkefølge ved zoom og med hjelpemidler gjenstår.                                                                              |
| 2.4.4  | Lenkeforståelse                     | K      | Beskrivende navigasjon og ressursnavn. E-post- og klagelenke har forståelig navn.                                                                                                        |
| 2.4.5  | Alternativ navigasjon               | K      | Nettstedskart med sidene og ressursene, samt global navigasjon og katalog.                                                                                                               |
| 2.4.6  | Beskrivende overskrifter            | K      | Én h1 per side og beskrivende h2/h3. Skjemafeltene har etiketter.                                                                                                                        |
| 2.4.7  | Fokusmarkering                      | U      | Synlig fokus finnes på lenker, knapper, felt og summary. Alle kombinasjoner, høy kontrast og zoom må fortsatt verifiseres.                                                               |
| 2.5.1  | Enkel pekerbruk                     | K      | Ingen handlinger krever flerfingerbevegelse, tegning eller sveipesti.                                                                                                                    |
| 2.5.2  | Avbryte pekerhandling               | K      | Handlinger er bundet til klikk, ikke til pointerdown eller mousedown.                                                                                                                    |
| 2.5.3  | Synlig og kodet navn                | K      | Navngitte felt og knapper; ressurslenkenes kodede navn inneholder synlig tekst.                                                                                                          |
| 2.5.4  | Enhetsbevegelse                     | I      | Ingen funksjoner som utløses ved risting eller annen enhetsbevegelse.                                                                                                                    |
| 3.1.1  | Sidespråk                           | K      | Alle kontrollerte sider arver lang=nb.                                                                                                                                                   |
| 3.1.2  | Språkskifter                        | K      | Dagens sammenhengende innhold er norsk. Egennavn, kode og enkeltstående faguttrykk er ikke egne engelske avsnitt.                                                                        |
| 3.2.1  | Fokus uten navigasjon               | K      | Fokus alene utløser ingen innsending eller navigasjon.                                                                                                                                   |
| 3.2.2  | Inndata uten overraskelser          | K      | Søk og filtre endrer bare listen; spørsmålsforslag fyller feltet uten å sende.                                                                                                           |
| 3.2.3  | Stabil navigasjon                   | K      | Samme felles layout og lenkerekkefølge på alle sider.                                                                                                                                    |
| 3.2.4  | Lik funksjon og navn                | K      | Felles komponenter og konsistente navn for navigasjon og chat.                                                                                                                           |
| 3.3.1  | Feilmelding                         | K      | Tom innsending gir norsk tekst, aria-invalid og alert knyttet til spørsmålsfeltet.                                                                                                       |
| 3.3.2  | Skjemaveiledning                    | K      | Søk og spørsmål har etiketter; feltet har instruksjon om innhold og personopplysninger.                                                                                                  |
| 3.3.3  | Hjelp ved feil                      | K      | Validering oppgir 3–1000 tegn; søk uten treff tilbyr nullstilling.                                                                                                                       |
| 3.3.4  | Konsekvensfulle innsendinger        | I      | Ingen juridiske, økonomiske eller vedvarende brukerdataendringer i prototypen.                                                                                                           |
| 4.1.1  | Kode og ID-er                       | K      | Ingen dupliserte ID-er eller ugyldige etikett-/ARIA-referanser i de utførte DOM- og eksportkontrollene. Ingen full HTML-validator kjørt.                                                 |
| 4.1.2  | Tilgjengelige kontrollnavn          | U      | Etiketter, roller og tilstander kontrollert i DOM og tilgjengelighetstreet. Faktisk hjelpemiddeltest gjenstår.                                                                           |
| 4.1.3  | Statusmeldinger                     | U      | Resultattall, chatlogg og status bruker live-regioner. Opplesing og rekkefølge må prøves med skjermleser.                                                                                |

## Gjenstående godkjenning

1. En kompetent tester prøver VoiceOver med Safari eller NVDA med en støttet nettleser, inkludert logg, feil og dynamiske søkeresultater.
2. Verifiser faktisk 200 % tekstforstørring og 400 % nettleserzoom, samt mobil med skjermtastatur. Smal viewport er ikke bevis for at nettleserzoom er testet.
3. Fullfør kontrast- og fokusvurdering av feiltilstander, hover, valgte kontroller og gradienter. Kjør gjerne axe eller tilsvarende som supplement.
4. Vurder nye påloggingssider og privat innhold når de finnes. Kontroller den endelige URL-en etter utrulling.
5. Ansvarlig i Nasjonalarkivet godkjenner samsvarsvurderingen og registrerer den formelle erklæringen i uustatus.no.

Ingen brudd er erklært unntatt på grunn av uforholdsmessig byrde. Uavklart teststatus er ikke et slikt unntak.

## Bruk i erklæringsutkastet 7. november 2026

Matrisen er brukt som testgrunnlag med skillen `tilgjengelighetserklaering`. Fordelingen er 29 K, 11 I og 8 U. Dette er arbeidsstatus innenfor dokumentert omfang, ikke formelle registreringssvar eller en samsvarsprosent. Vurderingene og testdatoen 6. november er beholdt; tekstlig gjennomgang 7. november er ikke en ny test. Se erklæringsgrunnlaget for de åtte uavklarte punktene.
