# Gjenstående tilgjengelighetskontroller

**10. november 2026 · Skill 0.5.1 · Codex (OpenAI).** Målrettet ny kontroll av cookie-side og cookie-skill-detaljside. Ingen nye bekreftede åpne brudd. 22 K / 11 I / 15 U / 0 B er arbeidsstatuser, ikke samsvarsprosent.

## Utført nå

Se [rapporten](testrapport.md) og [metoder/resultater](manual-tests.json). To sider, seks bredde-/høydemålinger, to Enter-forløp, 16 automatiske Tab-steg og 72 kontrollerte frem-/tilbake-Tab-overganger. Fire tekstavstandsprøver uten innholdstap. Ny axe på 23 ruter og Nu på 25 eksportfiler.

## Ikke utført eller ikke avklart

- Actual screen reader and speech not tested.
- 320px is viewport, not actual 200/400% zoom.
- Physical rotation, OS reduced motion, native hover and other browser combinations not tested. Previous native Chrome access was rejected, not re-requested.
- No consent banner exists; banner keyboard/dialog/choice behavior cannot be tested.
- No authentication, external model API or production deployment in scope.
- PDF structural helper repeated; no new manual PDF or language/reading-order assessment.
- New catalog axe incomplete nodes on homepage require continued manual contrast review.

Faktisk skjermleser/zoom er ikke tilgjengelig gjennom den godkjente IAB-flaten. Ingen ny forespørsel om tidligere avvist native Chrome-tilgang. [Kravvis avklaringsplan](../../WCAG-KONTROLL.md#avklaringsplan-for-de-15-kravene) angir kompetanse, handling og dokumentasjon. 15 U-krav står nedenfor med de øvrige 33; K innebærer fortsatt oppgitt delomfang.

## Alle 48 krav

### 1.1.1 Ikke-tekstlig innhold — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Prøv meningsbærende grafikk og side 6 i faktisk PDF-leser/skjermleser; bekreft at relasjoner/formål formidles og dekor ikke forstyrrer.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.2.1 Bare lyd og video (forhåndsinnspilt) — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.2.2 Teksting (forhåndsinnspilt) — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.2.5 Synstolking (forhåndsinnspilt) — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.3.1 Informasjon og relasjoner — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Prøv PDF-listenavigasjon med faktisk skjermleser og vurder øvrige dokumentstrukturer/figurer.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.3.2 Meningsfylt rekkefølge — U

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Prøv lineær lesing, særlig PDF-side 6–7, med faktisk hjelpemiddel.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.3.3 Sensoriske egenskaper — K

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Les instruksjoner; bekreft at de kan forstås uten bare farge, form, lyd eller plassering.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.3.4 Visningsretning — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Test med fysisk mobil/nettbrett eller dokumentert orienteringsstøtte, begge retninger og kritiske forløp.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.3.5 Identifiser formål med inndata — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.4.1 Bruk av farge — K

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Vurder om farge alene bærer mening i lenker, diagrammer, feil og tilstander.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.4.2 Styring av lyd — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.4.3 Kontrast (minimum) — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart. Full native-regresjon har 86 incomplete-forekomster på forsiden/Spør KI/Oversikt, mot 80 tidligere. Ingen incomplete på de to nye sidene. Den eldre 80-node-modellen er ikke bevis for alle nåværende forekomster.

**Gjenstår:** Fullfør faktisk rendret kontrast for hover/fokus/feil/overlappende skygger og PDF-grafikk; bruk komponent-/bakgrunnsmodellen som støtte, ikke fullskjermgodkjenning. Undersøk de 86 nåværende axe-incomplete-forekomstene i ny eksport, inkludert utvidet katalog.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.4.4 Endring av tekststørrelse — U

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Prøv faktisk 200 % tekstforstørring/zoom i en nettleser som eksponerer funksjonen og gjennomfør representative oppgaver. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.4.5 Bilder av tekst — K

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Undersøk tekst i bilder og om ekte tekst kan brukes; begrunn nødvendige unntak.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.4.10 Dynamisk tilpasning (Reflow) — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Test 400 % med faktisk zoom, effektiv 320 CSS-px og alle kritiske forløp. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.4.11 Kontrast for ikke-tekstlig innhold — U

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Mål nødvendige visuelle deler mot tilstøtende farger i alle relevante tilstander, inkludert PDF.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.4.12 Tekstavstand — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Ingen åpen kandidat i prøvd lokal tekstavstand. Retest øvrige støttede nettlesere og faktisk modellinnhold når de er tilgjengelige. PDF faller utenfor dette markup-kravet.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 1.4.13 Pekerfølsomt innhold eller innhold ved tastaturfokus — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.1.1 Tastatur — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Fullfør alle kritiske oppgaver med tastatur; Tab-spor dekker ikke alle handlinger.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.1.2 Ingen tastaturfelle — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Prøv inn/ut av hver interaktiv komponent, begge retninger og eventuelle instruksjoner.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.1.4 Hurtigtaster som består av ett tegn — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.2.1 Justerbar hastighet — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.2.2 Pause, stopp, skjul — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Faglig vurder om prisaldervarselets tidsstyrte innsetting omfattes av 2.2.2 og i så fall trenger pause/skjul. Test faktisk redusert-bevegelse-innstilling separat; dette er ikke simulert som fullført.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.3.1 Terskelverdi på maksimalt tre glimt — K

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Undersøk alt blinkende innhold; bruk egnet glimtanalysator ved mulig terskelrisiko, unngå risikofylt avspilling.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.4.1 Hoppe over blokker — K

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Bruk hoppelenke/landemerker med tastatur og skjermleser; bekreft at gjentatt innhold faktisk kan hoppes over.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.4.2 Sidetitler — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Prøv faktisk 404-fallback etter utrulling og i øvrige støttede nettlesere.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.4.3 Fokusrekkefølge — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Fullfør fokusrekkefølge ved faktisk forstørring og hjelpemiddel; særlig dynamiske resultater.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.4.4 Formål med lenke (i kontekst) — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Vurder hver lenkes formål i tillatt kontekst, inkludert ikonlenker og lenker i PDF.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.4.5 Flere måter — K

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Bekreft at sider kan finnes på minst to egnede måter, med relevante prosessunntak.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.4.6 Overskrifter og ledetekster — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Les overskrifter og etiketter; vurder om de beskriver emne og formål forståelig.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.4.7 Synlig fokus — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Prøv alle representative kontrolltyper visuelt ved faktisk forstørring og ulike flater. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.5.1 Pekerbevegelse — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.5.2 Pekeravbrytelse — K

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Prøv trykk, flytt ut og slipp, avbryt/angre; bekreft at handlinger ikke utløses utilsiktet.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.5.3 Ledetekst i navn — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Bekreft faktisk tilgjengelig navn mot all synlig tekst, også sammensatte kontroller og talestyring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 2.5.4 Bevegelsesaktivering — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 3.1.1 Språk på siden — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Prøv effektivt PDF-språk i faktisk leser/skjermleser; korriger bare hvis feil språk er bekreftet.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 3.1.2 Språk på deler av innhold — U

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Fullfør PDF-språk og faktisk opplesing; kontroller nye dynamiske/modelldrevne svar og publisert feilside når de er tilgjengelige.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 3.2.1 Fokus — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Fokuser alle kontroller og bekreft at ingen uventet kontekstendring oppstår.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 3.2.2 Inndata — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Endre felt/valg og vurder kontekstendringer og eventuell forhåndsinformasjon.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 3.2.3 Konsekvent navigering — K

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Sammenlign gjentatt navigasjon på tvers av alle relevante sider og tilstander.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 3.2.4 Konsekvent identifikasjon — K

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Sammenlign navn, ikoner og funksjon for gjentatte komponenter, også dynamisk innhold.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 3.3.1 Identifikasjon av feil — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Utløs relevante feil; vurder om felt og feilårsak identifiseres i tekst og leses med skjermleser.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 3.3.2 Ledetekster eller instruksjoner — K

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Vurder forståelige etiketter, obligatoriske felt, formathjelp og instruksjoner før innsending.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 3.3.3 Forslag ved feil — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Utløs feil; vurder konkrete rettingsforslag og relevante sikkerhetsunntak.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 3.3.4 Forhindring av feil (juridiske feil, økonomiske feil, datafeil) — I

Ingen ny kravspesifikk manuell vurdering utenfor de to statiske sidene; tidligere vurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 4.1.1 Parsing (oppdeling) — K

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Prøv aktuell produksjon og relevante dynamiske DOM-tilstander ved endret kode; Nu-valideringen gjelder den bygde eksporten.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 4.1.2 Navn, rolle, verdi — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Prøv kontrolltypene med faktisk skjermleser og dokumenter navn, rolle, verdi og oppdatering.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

### 4.1.3 Statusbeskjeder — U

Nye DOM-/kontrast-/bredde-/tastatur-/tekstavstandsdeler er undersøkt uten bekreftet avvik på de to sidene. Se metode og avgrensninger i manual-tests.json. Global kriteriestatus/videre oppfølging er bevart.

**Gjenstår:** Prøv faktiske statusbeskjeder med skjermleser, også prisaldervarselet dersom det skal formidles uten fokusflytting.

**Tidligere vurdering:** [grunnlag](../094541-e2907a5c27e2/wcag-grunnlag.json). **Ny evidens:** [auto](raw/auto-01.json), [manuelle deler](manual-tests.json).

