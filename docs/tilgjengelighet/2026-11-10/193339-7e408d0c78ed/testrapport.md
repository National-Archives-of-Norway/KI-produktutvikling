# Lokal tilgjengelighetsoppfølging med skill 0.6.0

**10. november 2026 · Codex (OpenAI) · kildeversjon 05d1b80.** Ingen underagenter. Skill-kilderepo: 43cbc8b. Etterfølgende portalendringer gjelder erklæring/arbeidsdokumentasjon, ikke komponentenes oppførsel eller PDF-en. Samlet samsvar er ikke ferdig vurdert.

## Resultat og omfang

**26 K / 11 I / 8 U / 3 B.** K er undersøkt uten funn i oppgitt lokalt utvalg, I er fravær av utløsende innhold, U er uavklart og B er bekreftet brudd. De tre B-kravene gjelder to åpne funn. Status er en arbeidsvurdering, ikke en formell registrering eller prosentgodkjenning.

Oppfølgingen gjelder de 13 tidligere U-kravene. 2.4.3 og 2.4.7 er avklart i prøvde kontrollfamilier; 2.2.2, 3.1.1 og 3.1.2 er nå bekreftede brudd. Åtte krav krever videre bistand. De øvrige 35 vurderingene videreføres med opprinnelig dato og evidens; de er ikke manuelt kjørt om igjen i sin helhet. [Forrige vurderte rapport](../160352-a02d77cb2734/testrapport.md).

## Faktisk testtilgang

[Testmuligheter](testmuligheter.json) er fylt etter faktisk bruk. IAB/Playwright gir DOM, tastatur, fokussnapshots og viewport; det annonserer ingen zoom-/skjermleserfunksjon. Et konkret forsøk på native Chrome-tilgang svarte «Computer Use permissions are not granted». Ingen omgåelse via annen driver, ingen faktisk OS-innstilling eller opplesing. [Miljø og blokkering](raw/test-environment.json).

| Gjenstående krav | Hva trengs for å avslutte? | Lokal delkontroll / hindring |
| --- | --- | --- |
| 1.1.1 | Vurder likeverdige alternativer for nødvendig PDF-grafikk, særlig diagrammet på side 6, med faglig innholdsforståelse og faktisk hjelpemiddelbruk. | Grafikkklassifisering fra tidligere løp videreføres; kontrastbevis avgjør ikke tekstalternativ. |
| 1.3.1 | Bruk PDF-leser/skjermleser til å prøve overskrifter, lister, grupper og relasjoner, særlig side 7. | Struktur-/MCID-tilgang finnes; faktisk navigasjon/opplesing mangler. |
| 1.3.2 | Sammenlign faktisk lineær lesing av side 6–7 med meningsfull visuell rekkefølge. | DOM/PDF-uttrekk er støttebevis, ikke utført opplesing. |
| 1.3.4 | Roter fysisk enhet begge veier gjennom katalog, dialog, chat og prisvisning. | 320/1280-layout er undersøkt; fysisk enhetsflate mangler. |
| 1.4.4 | Dokumenter faktisk 200 % tekstforstørring og fullfør kritiske oppgaver uten tap. | Native nettlesertilgang blokkert; viewport er ikke zoom. |
| 1.4.10 | Prøv faktisk 400 % nettleserzoom fra 1280 CSS-px, bekreft effektiv bredde og oppgaver; vurder tabeller særskilt. | Omflyting/oppgaver ved 320 er delbevis, ikke en påstått zoomprøve. |
| 4.1.2 | Betjen kontroller med faktisk skjermleser og registrer navn/rolle/verdi/tilstand før og etter handling. | Aktuelle ARIA-/DOM-tilstander er observert; faktisk hjelpemiddelbetjening mangler. |
| 4.1.3 | Lytt til null treff, validering, venting, svar og relevante feil uten fokusflytting. | Live-/status-/alert-innhold er observert; ingen faktisk tale er registrert. |

Dette kan gjøres mot lokal portal med egnet utstyr og tilgang; offentlig publisering er ikke et generelt vilkår. Ekstern modell, innlogging og pilot er fremtidig/endret omfang og krever egen regresjon når de faktisk finnes. Faktisk redusert-bevegelse-innstilling er en uutført supplerende produktkontroll, ikke alene et ekstra godkjenningsvilkår for hvert krav.

## Nye bekreftede avvik

### A11Y-08 – feil språkmerking i PDF: 3.1.1 og 3.1.2

Norsk hovedinnhold har katalogspråk `en`. Av 2694 ikke-blanke synlige tegn er 1985 i `nb-NO`-spenn og 709 i `en-US`-spenn. Feilene på side 4–6 omfatter blant annet «Vi skal orientere oss i hvilke muligheter som finnes», «Vi skal ikke bestemme reglene for hvordan KI skal brukes i Nasjonalarkivet» og norske diagrametiketter. Dette er ikke bare egennavn eller engelske fagtermer.

Tegn fra pdfplumber er koblet via side/MCID til strukturtaggenes språkarving. En uavhengig omvendt ParentTree-oppslag gir samme strukturspråk. Deretter er de mest lokale BDC-egenskapene lest: de aktuelle norske delene er også eksplisitt `en-US` i innholdsstrømmen. Ingen konklusjon bygger bare på katalogens språk. Første tekniske uttrekk mistet /Pg sin indirekte objektreferanse og ga UNMAPPED; denne avviste kjøringen er bevart og er ikke et produktfunn. Strukturkontrollen alene er separat bevart før BDC-overstyringer ble lagt til.

Dette kan føre til engelsk uttale av norsk tekst. **Faktisk opplesing er ikke testet.** Programmerbar feilmerking er likevel dokumentert. [Språkdata og all sidetekst](raw/pdf-language.json), [uavhengig kontroll](raw/pdf-language-parenttree.json), [beregner](raw/pdf-language.py), [krysskontroll](raw/pdf-crosscheck.py), [side 4](screenshots/pdf-page-4.png), [side 6](screenshots/pdf-page-6.png).

**Foreslått retting:** Korriger norsk hovedspråk og de aktuelle norske spennene i både struktur og innholdsstrøm, med korrekt merking av eventuell bevisst engelsk tekst. Kontroller språkbaner, rendr alle sider på nytt og suppler med opplesing når tilgjengelig. Alternativ nå: be om norsk tekst i et tilgjengelig format. PDF-en er uendret: `ba267d899460e54a911c548c5ddecfd9a83159ec3b6d7b6e30d9d4f34d0c648a`.

### A11Y-09 – prisvarsel uten styring av automatisk oppdatering: 2.2.2

En isolert kopi av den faktiske produksjonseksporten ble gitt kontrollert `Date.now` og avspilling av komponentens reelle time-callbacks. Før terskelen: null varsler. Etter terskelen: seks varseltekster ble satt inn mens prisvilkår var åpne og fokus fortsatt sto på summary. Bare seks vilkårskontroller finnes; ingen pause/skjul eller frekvenskontroll. Det er ingen dokumentert avgjørende grunn til at denne oppdateringen må skje uten brukerkontroll. Femsekundersregelen for bevegelse er ikke brukt som fritak for oppdatert informasjon.

Dette er en tydelig merket **klokkesimulering**, ikke syv dagers sanntidsventing eller faktisk gammel produksjonsdata. Den opprinnelige komponenten, snapshot-priser og systemklokken ble ikke endret. [Før/etter](raw/fixture-states.json), [oppsett/hash](raw/fixture-metadata.json), [testskript](raw/a11y-clock.js), [før](screenshots/price-before.png), [etter](screenshots/price-after.png), [uendret komponent](raw/source-pricing-freshness.tsx.txt).

**Foreslått retting:** Vurder ferskhet innledningsvis/ved brukerens oppdatering, eller legg til tilgjengelig pause/skjul/styring av automatisk oppdatering. Retest ved terskelen med tastatur og kontroller at dato/kilde fortsatt formidles. Alternativ nå: les sist kontrollert-dato og åpne leverandørens prisliste. Hero-animasjonens kontroll er separat og fungerer.

## Fokus og betjening

65 faktiske fokussnapshots og [manuelle tilstander](raw/manual-ui.json) dekker Tab/Shift+Tab, Enter, Space og Escape. Validering, kildelenker, svar, tømming, dialogfelle og fokusretur er observert. Katalogens null treff og nullstilling er prøvd. Alle seks pristabeller og summary-kontroller er fokusert ved bekreftet 320/1280.

Fokusrekkefølgen bevarer mening i prøvde lokale forløp. Etter nullstilling avmonteres knappen; neste Tab begynner ved hoppelenken. Dette kan forbedres ved fokus til søkefeltet, men er ikke alene dokumentert som meningsstridig fokusrekkefølge. Synlig fokus er visuelt bekreftet på representative markeringer og flater, inkludert samlet feltmarkering for textarea. Umiddelbare geometrier kan være utenfor viewport under smooth scrolling; senere sluttgeometri og render er kontrollert. En tidlig «focus-table-320.png» viser startområdet mens rulling pågår; den er ikke brukt som bevis for synlig tabellfokus. Bruk de eksplisitt merkede settled-bildene.

[Alle fokussnapshots](raw/focus-trail.json), [mobil lukking](screenshots/focus-chat-close-320.png), [nullstilling](screenshots/focus-reset-320.png), [textarea](screenshots/focus-textarea-1280.png), [kilde](screenshots/focus-source-1280.png), [tabell 320](screenshots/focus-table-320-settled.png), [tabell 1280](screenshots/focus-table-1280-settled.png).

2.4.3 og 2.4.7 får **K i dette lokale utvalget**. Den tidligere generelle avhengigheten til faktisk zoom/skjermleser er konkretisert: zoomdelen står fortsatt U under 1.4.4/1.4.10, mens faktisk opplesing og hjelpemiddelbetjening står U under relevante semantikk-/statuskrav. Ingen zoom eller skjermleserprøve påstås utført ved denne avklaringen.

## Animasjon og øvrige avgrensninger

Hero-animasjonen pauser med Enter og starter med Space. Etter Tab til ressursfeltet er alle tre animasjoner fortsatt `paused`, med uendret transform etter mer enn åtte sekunder. Dette er faktisk fokusflytting, ikke bare pause mens knappen har fokus. Den delprøven består selv om prisvarselet gjør at 2.2.2 samlet er B. [Bevis](raw/manual-ui.json), [bilde](screenshots/paused-focus-away.png).

To tidlige observasjoner merket «mobile» målte faktisk 1280 fordi viewport-overstyringen lå på en annen åpen testfane. Rådataenes width er bevart. Fysisk 320-bredde ble deretter kontrollert på riktig fane; kun observasjoner med width 320 brukes som smalprøver. Et feilslått summary-oppslag som button og et ikke-støttet Date-oppslag i lesescope ble korrigert gjennom DOM-locator og fixture-dataset; dette er verktøytilpasninger, ikke produktfeil.

## Automatikk, bevisgjenbruk og avstemming

Skillens faktiske nettlesermodul **0.6.0** er kjørt på /, /spor/ og /priser/: ni viewport-prøver, 24 Tab-steg og pause/startforløp uten kandidater. `run_checks.py --auto` er kjørt med faktisk nettleserrapport og den originale forside-axe-filen fra ny native-kjøring 193220-native-e6605bab. Alle ni grupper er kjørt uten tekniske blokkeringer: HTML, validator, PDF, axe og fem nettlesergrupper. 29 krav har automatisk delgrunnlag, 19 mangler slikt delgrunnlag i denne generelle kjøringen. Dette erstatter ikke de målrettede manuelle vurderingene eller eldre kontrastbevis.

Native axe på 23 ruter: 0 violations / 3 incomplete-grupper / 86 kontrastnoder. Nu på 25 HTML-filer: 0 feil / 207 info-noter om avsluttende skråstrek. Dette skannet finner ikke PDF-språkfeilen og erstatter ikke den konkrete vurderingen av prisoppdatering. Motorens `needs_review` og incomplete er bevart. Ny avsluttende regresjon etter erklæringsbygg føres nedenfor.

Den nye konsistenskontrollen avdekket feil i en første Markdown-sammenstilling og gamle referanser som ikke lenger pekte til faktiske retestmapper. Disse er korrigert i den **nye** vurderingen, med [referansereparasjoner](raw/reference-repairs.json); gamle kjøringer og originalmanifest er urørt. Streng/listeskjema for eldre retestbevis er normalisert, med originalfelt beholdt. [Avstemming](raw/consistency.json) viser samme 48 krav/statuser, åtte U-ID-er, tre B-ID-er og ingen konflikter. Den avgjør ikke faglig beviskvalitet eller formelt samsvar.

## Kontrollerte primærkilder

Kildekontroll 10. november 2026. Vurderingene er egne faglige anvendelser, ikke en automatisk myndighetsgodkjenning.

- [Uu-tilsynets kravoversikt](https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86).
- [Uu 2.2.2](https://www.uutilsynet.no/wcag-standarden/222-pause-stopp-skjul-niva/101) og [W3C om pause/stopp/skjul](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html): vurdering av automatisk oppdatering og selvstendig pausekontroll.
- [Uu 3.1.1](https://www.uutilsynet.no/wcag-standarden/311-sprak-pa-siden-niva/110), [Uu 3.1.2](https://www.uutilsynet.no/wcag-standarden/312-sprak-pa-deler-av-innhold-niva-aa/111), [PDF16](https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF16) og [PDF19](https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF19): katalogspråk og lokale språkoverstyringer er undersøkt samlet; faktisk opplesing er en separat metode.

[48-kravsmatrise](wcag-grunnlag.json), [testplan med avslutningsvilkår](testplan.json), [avledet restliste](manuell-oppfolging.md), [automatisk deldekning](automatisk-dekning.json), [manuell protokoll](manual-tests.json), [originalmanifest](manifest.json).

## Sluttverifisering

Sluttverifisering: 53 Node-tester og tre Python-tester bestod, sammen med Pages-produksjonsbygg/TypeScript/ruteregister og HTML-grunnkontroll av 25 filer. Ny native-kjøring `195227-native-1d4e7aee`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu 0 feil / 207 info-noter. Rendrert erklæring viser nøyaktig tre B-krav og åtte U-krav ved 320/1280 uten overflyt. PDF og funksjonskomponentene er identiske med HEAD. Testfanen er lukket, viewport gjenopprettet og den isolerte loopback-serveren stoppet.

[Native-manifest](../195227-native-1d4e7aee/native-manifest.json), [motorvurdering](raw/native-postverification.json), [samlet verifisering](raw/postverification.json), [erklæringslesing](raw/declaration-readback.json).
