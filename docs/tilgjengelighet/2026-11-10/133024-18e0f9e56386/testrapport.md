# Målrettet tilgjengelighetskontroll: cookie-side og skill-detaljer

**10. november 2026 · Codex (OpenAI) · tilgjengelighetserklaering 0.5.1 · grunnversjon 0104ae3.** Ingen underagenter. Lokal utviklingsutgave på 127.0.0.1:3000 og statisk eksport. Ingen commit eller publisering.

## Resultat og omfang

Ingen nye bekreftede åpne tilgjengelighetsbrudd i det undersøkte utvalget. **22 K / 11 I / 15 U / 0 B** videreføres; de 15 U-kravene er fortsatt delvis/uavklart. K betyr undersøkt i angitt delomfang, ikke et formelt Ja. Samlet samsvar er ikke ferdig vurdert. A11Y-01–06 beholder tidligere dokumentert rettet-status; ingen ny full manuell retest av dem påstås.

Målrettet lokal nettleser-/tastatur-/tekstavstandskontroll av /informasjonskapsler/ og /ressurser/informasjonskapsler-og-samtykke/. Ny axe-regresjon på 23 ruter og Nu/HTML på 25 eksportfiler. Tidligere vurderinger videreføres med opprinnelig omfang og dato; ingen ny full manuell revisjon av alle sider eller 48 krav.

## Utførte kontroller

- Skillens `browser_checks.mjs`: DOM, kontrast, responsiv bredde, tastatur og to deklarerte Enter-forløp fullført uten funnkandidat. Seks viewport-prøver (1280×800, 320×800 og 800×320 på hver side), 16 automatiske Tab-steg. Personvernlenken går til forventet overskrift; tilbake-lenken går til Finn en ressurs.
- Kontrollert full frem-/tilbake-Tab: 20+20 overganger på cookie-siden og 16+16 på skill-siden; begge hopp-lenker flytter fokus til MAIN#innhold. Ingen felle eller uventet rekkefølge observert. Fokusstil registrert som grønn 3px ramme; full faglig kontrast-/tilstandsvurdering er ikke påstått.
- Økt tekstavstand: fire faktisk målte og visuelt vurderte prøver ved 320/1280×800. 1,5 linjehøyde, 0,12em bokstavavstand, 0,16em ordavstand og 2em avsnittsavstand bekreftet. Ingen sideoverflyt eller bortfall av innhold observert; lange ord/kode bryter linjen. Test-CSS er fjernet med identisk SHA-256.
- H1/H2, lister, lenkeformål, Beta-status og norsk prosa er undersøkt i DOM/visning. Dette er ikke faktisk skjermleserlesing eller godkjenning av all terminologi. Ingen skjema, media eller samtykkebanner på de to sidene.
- Skillens `run_checks.py --auto` fullførte HTML, lokal Nu, PDF-struktur, importert original axe-side og faktiske nettleserdata uten kandidater. Full eksport omfatter 25 HTML-filer. PDF-hjelperen gir strukturelt delgrunnlag, ikke en ny manuell PDF-vurdering.

## Native-regresjon og vurdering

[Original native-manifest](../132206-native-5c65230c/native-manifest.json): axe CLI 4.14.0 på **23 ruter**, **0 violations / 3 incomplete-grupper / 86 nodeforekomster**. Begge fokussider har **0 violations og 0 incomplete**. Importen i skill-hjelperen gjelder bare cookie-sidens originale axe-15.json; resten av skannet er gjennomgått særskilt i [native-review](raw/native-review.json).

De tre incomplete-gruppene gjelder kontrast på forsiden (62), Spør KI (6) og Oversikt (18). Antallet er økt fra tidligere 80 til 86 etter utvidelsen av katalogen; CSS-selektorer/forskyvninger betyr at «ny node» ikke alltid er nytt innhold. Tidligere konservativ 80-node-modell er historisk delbevis, **ikke** godkjenning av alle nåværende forekomster. De 86 er bevart som incomplete og krever videre vurdering under 1.4.3. Ingen av disse er automatisk et bekreftet brudd.

Nu Html Checker 26.11.9: **0 HTML-feil / 207 info-noter**. Alle gjelder unødvendig avsluttende skråstrek på void-elementer i eksporten; ingen annen meldingstype. Ingen automatisk WCAG-godkjenning fra validatoren.

## Teknisk feil og oppfølging

Første 32-Tab-sekvens gikk forbi sidens kontroller og fikk body-locator-timeout på begge sider. Originalen er [bevart](raw/browser-first-attempt.json); den teller ikke som vellykket tastaturtest. Ny 8-stegssekvens og separat kontrollert full frem-/tilbakegang dokumenterer faktisk gjennomført omfang. Ingen teknisk feil er skjult som bestått.

## Gjenstående vurdering

Faktisk skjermleser/tale, 200/400 % nettleserzoom, fysisk rotasjon, OS redusert bevegelse, native hover og øvrige støttede nettlesere er ikke testet nå. Den tidligere avviste native Chrome-tilgangen er ikke forsøkt omgått eller forespurt på nytt. IAB-viewport er ikke zoom.

Videre faglig vurdering av PDF, ikke-tekstlig kontrast, språk/status og prisaldervarsel gjenstår. Innlogging, faktisk modell og produksjonsmiljø er ikke i omfanget. Banner finnes ikke og kan derfor ikke få en påstått bestått dialog-/samtykketest. De nye sidene må også inngå i kommende hjelpemiddel-/zoom-/pilotprøver.

[Alle 48 krav med rest](manuell-oppfolging.md), [vurdert matrise](wcag-grunnlag.json), [testplan](testplan.json), [automatisk dekning](automatisk-dekning.json). Ny automatisk deldekning gjelder 28 krav i dette smale utvalget; 34 har samlet delgrunnlag når tidligere bredere bevis inkluderes eksplisitt. 36 har videre manuell rest, 11 har ingen utløsende innholdstype lokalt og ett har fullført lokalt manuelt tekstavstandsutvalg. Ingen samsvarsprosent.

## Sporbarhet

[Originalmanifest](manifest.json) og raw/auto-01.* er uendret. Første genererte rapporter er bevart som raw/initial-*. Nye kontroller: [browser](raw/focused-browser-original.json), [Tab/skip](raw/focus-walk.json), [tekstavstand](raw/text-spacing.json), [CSS-gjenoppretting](raw/css-restoration.json), [manuell protokoll](manual-tests.json). Skjermbilder ligger i screenshots/. [Forrige vurderte kjøring](../094541-e2907a5c27e2/testrapport.md) beholder dato og tidligere funn/rettinger. Ingen kilder eller formelle registreringsopplysninger er ny juridisk vurdert.

## Sluttverifisering

53 Node-tester og tre Python-tester bestod. Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Erklæringen er lest tilbake ved 1280/320 px uten sideoverflyt og med alle 15 U-krav bevart. CSS er lik HEAD, og lokale dokument-/evidenslenker er kontrollert. [Verifikasjonsoppsummering](raw/postverification.json). Dette er ikke samlet WCAG-godkjenning.
