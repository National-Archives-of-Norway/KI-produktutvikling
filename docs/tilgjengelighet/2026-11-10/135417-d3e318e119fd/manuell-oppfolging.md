# Gjenstående tilgjengelighetskontroller

**10. november 2026 · Codex (OpenAI) · skill 0.5.1.** 22 K / 11 I / 15 U / 0 B er videreførte arbeidsstatuser, ikke samsvarsprosent.

## Avklart i dette delomfanget

Alle 86 opprinnelige axe-forekomster er undersøkt ved 1280/320 px, og 22 kontroller med faktisk tastaturfokus. Ingen bekreftet tekstkontrastfeil i prøvde tilstander; se [kravvis rapport](testrapport.md) og [målinger](raw/contrast86-bounds.json). Motorens incomplete-status beholdes.

## Ikke ferdig vurdert

- sRGB gradient-stop/alpha envelope is a model, not exact pixel sampling.
- No actual native hover tested; previous unavailable native surface not bypassed.
- No new PDF contrast or full image/diagram assessment.
- No actual screen reader, 200/400% browser zoom, physical device or production/auth/external model tests.
- Axe retains incomplete; no result is rewritten to pass. Full 1.4.3 and all 15 prior U criteria remain unresolved.

[Plan for de 15 U-kravene](../../WCAG-KONTROLL.md#avklaringsplan-for-de-15-kravene) er fortsatt relevant. Skill mellom nye delbevis og tidligere grunnlag; ingen ny skjermleser-/zoom-/pilotøkt.

## Alle 48 krav

### 1.1.1 Ikke-tekstlig innhold — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv meningsbærende grafikk og side 6 i faktisk PDF-leser/skjermleser; bekreft at relasjoner/formål formidles og dekor ikke forstyrrer.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.2.1 Bare lyd og video (forhåndsinnspilt) — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.2.2 Teksting (forhåndsinnspilt) — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.2.5 Synstolking (forhåndsinnspilt) — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.3.1 Informasjon og relasjoner — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv PDF-listenavigasjon med faktisk skjermleser og vurder øvrige dokumentstrukturer/figurer.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.3.2 Meningsfylt rekkefølge — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv lineær lesing, særlig PDF-side 6–7, med faktisk hjelpemiddel.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.3.3 Sensoriske egenskaper — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Les instruksjoner; bekreft at de kan forstås uten bare farge, form, lyd eller plassering.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.3.4 Visningsretning — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Test med fysisk mobil/nettbrett eller dokumentert orienteringsstøtte, begge retninger og kritiske forløp.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.3.5 Identifiser formål med inndata — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.4.1 Bruk av farge — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Vurder om farge alene bærer mening i lenker, diagrammer, feil og tilstander.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.4.2 Styring av lyd — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.4.3 Kontrast (minimum) — U

Alle 86 opprinnelige axe-kontrastforekomster er koblet entydig til produksjonsbygget ved 1280 og 320 px. Konservative sRGB-/alpha-bakgrunnsgrenser inklusive grid og tekstglød gir minst 7,715057:1, også når vanlig tekst kreves 4,5:1. 22 faktisk fokuserte kontroller gir minst 8,655854:1. Geometri/screenshot er vurdert separat; ingen bekreftet feil og ingen designretting. Axe sine tre incomplete-grupper er bevart, ikke omskrevet.

**Gjenstår:** Test øvrige faktiske hover-/dynamiske tilstander og overlappende effekter, og fullfør PDF-tekstkontrast. De 86 normale forekomstene er undersøkt med dokumentert modell og visuell kontroll; dette er ikke lenger en urørt restliste. Samlet 1.4.3 er fortsatt U.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.4.4 Endring av tekststørrelse — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv faktisk 200 % tekstforstørring/zoom i en nettleser som eksponerer funksjonen og gjennomfør representative oppgaver. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.4.5 Bilder av tekst — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Undersøk tekst i bilder og om ekte tekst kan brukes; begrunn nødvendige unntak.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.4.10 Dynamisk tilpasning (Reflow) — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Test 400 % med faktisk zoom, effektiv 320 CSS-px og alle kritiske forløp. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.4.11 Kontrast for ikke-tekstlig innhold — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Mål nødvendige visuelle deler mot tilstøtende farger i alle relevante tilstander, inkludert PDF.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.4.12 Tekstavstand — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen åpen kandidat i prøvd lokal tekstavstand. Retest øvrige støttede nettlesere og faktisk modellinnhold når de er tilgjengelige. PDF faller utenfor dette markup-kravet.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 1.4.13 Pekerfølsomt innhold eller innhold ved tastaturfokus — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.1.1 Tastatur — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Fullfør alle kritiske oppgaver med tastatur; Tab-spor dekker ikke alle handlinger.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.1.2 Ingen tastaturfelle — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv inn/ut av hver interaktiv komponent, begge retninger og eventuelle instruksjoner.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.1.4 Hurtigtaster som består av ett tegn — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.2.1 Justerbar hastighet — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.2.2 Pause, stopp, skjul — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Faglig vurder om prisaldervarselets tidsstyrte innsetting omfattes av 2.2.2 og i så fall trenger pause/skjul. Test faktisk redusert-bevegelse-innstilling separat; dette er ikke simulert som fullført.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.3.1 Terskelverdi på maksimalt tre glimt — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Undersøk alt blinkende innhold; bruk egnet glimtanalysator ved mulig terskelrisiko, unngå risikofylt avspilling.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.4.1 Hoppe over blokker — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Bruk hoppelenke/landemerker med tastatur og skjermleser; bekreft at gjentatt innhold faktisk kan hoppes over.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.4.2 Sidetitler — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv faktisk 404-fallback etter utrulling og i øvrige støttede nettlesere.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.4.3 Fokusrekkefølge — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Fullfør fokusrekkefølge ved faktisk forstørring og hjelpemiddel; særlig dynamiske resultater.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.4.4 Formål med lenke (i kontekst) — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Vurder hver lenkes formål i tillatt kontekst, inkludert ikonlenker og lenker i PDF.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.4.5 Flere måter — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Bekreft at sider kan finnes på minst to egnede måter, med relevante prosessunntak.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.4.6 Overskrifter og ledetekster — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Les overskrifter og etiketter; vurder om de beskriver emne og formål forståelig.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.4.7 Synlig fokus — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv alle representative kontrolltyper visuelt ved faktisk forstørring og ulike flater. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.5.1 Pekerbevegelse — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.5.2 Pekeravbrytelse — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv trykk, flytt ut og slipp, avbryt/angre; bekreft at handlinger ikke utløses utilsiktet.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.5.3 Ledetekst i navn — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Bekreft faktisk tilgjengelig navn mot all synlig tekst, også sammensatte kontroller og talestyring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 2.5.4 Bevegelsesaktivering — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 3.1.1 Språk på siden — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv effektivt PDF-språk i faktisk leser/skjermleser; korriger bare hvis feil språk er bekreftet.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 3.1.2 Språk på deler av innhold — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Fullfør PDF-språk og faktisk opplesing; kontroller nye dynamiske/modelldrevne svar og publisert feilside når de er tilgjengelige.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 3.2.1 Fokus — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Fokuser alle kontroller og bekreft at ingen uventet kontekstendring oppstår.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 3.2.2 Inndata — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Endre felt/valg og vurder kontekstendringer og eventuell forhåndsinformasjon.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 3.2.3 Konsekvent navigering — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Sammenlign gjentatt navigasjon på tvers av alle relevante sider og tilstander.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 3.2.4 Konsekvent identifikasjon — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Sammenlign navn, ikoner og funksjon for gjentatte komponenter, også dynamisk innhold.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 3.3.1 Identifikasjon av feil — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Utløs relevante feil; vurder om felt og feilårsak identifiseres i tekst og leses med skjermleser.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 3.3.2 Ledetekster eller instruksjoner — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Vurder forståelige etiketter, obligatoriske felt, formathjelp og instruksjoner før innsending.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 3.3.3 Forslag ved feil — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Utløs feil; vurder konkrete rettingsforslag og relevante sikkerhetsunntak.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 3.3.4 Forhindring av feil (juridiske feil, økonomiske feil, datafeil) — I

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 4.1.1 Parsing (oppdeling) — K

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv aktuell produksjon og relevante dynamiske DOM-tilstander ved endret kode; Nu-valideringen gjelder den bygde eksporten.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 4.1.2 Navn, rolle, verdi — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv kontrolltypene med faktisk skjermleser og dokumenter navn, rolle, verdi og oppdatering.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

### 4.1.3 Statusbeskjeder — U

Ny kontrastoppfølging og automatiske delprøver; ingen ny full manuell kravvurdering. Tidligere status og restarbeid videreføres.

**Gjenstår:** Prøv faktiske statusbeskjeder med skjermleser, også prisaldervarselet dersom det skal formidles uten fokusflytting.

[Ny protokoll](manual-tests.json), [auto](raw/auto-01.json), [forrige vurdering](../133024-18e0f9e56386/wcag-grunnlag.json).

