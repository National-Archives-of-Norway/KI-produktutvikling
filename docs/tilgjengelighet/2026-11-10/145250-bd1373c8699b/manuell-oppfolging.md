# Gjenstående tilgjengelighetskontroller

**10. november 2026 · Codex (OpenAI) · skill 0.5.1.** 23 K / 11 I / 14 U / 0 B er arbeidsstatus, ikke samsvarsprosent. Samlet samsvar er uavklart.

## Utført nå

1.4.3 er undersøkt uten funn i oppgitt lokalt HTML/PDF-utvalg: 23 UI-tilstander, 694 tekstmålinger, faktisk hover/valg/fokus/validering, kontrollert lasting/tjenestefeil og alle 2694 synlige tegn på syv PDF-sider. Én lav måling gjelder inaktiv Tøm chat; ingen unntak for aktiv status-/feiltekst. 27 felt-/ikon-/fokusmålinger passerer 3:1 i utvalget, men full 1.4.11 står U. Se [rapport](testrapport.md) og [protokoll](manual-tests.json).

## Ikke ferdig testet/vurdert

- 1.4.3 K applies to stated existing local representative sample and carried normal-state evidence; no formal global conformance.
- 1.4.11 remains U for full classification of necessary graphics/states.
- No actual held pointer-down/active capture; ripple source/DOM shows disabled and no custom :active colour found.
- Controlled loading/error fixture tests rendered existing UI, not actual network outage/model generation.
- No screen reader, actual 200/400% zoom, physical device, OS preferences, authentication or production validation.

[Oppdatert kravvis avklaringsplan](../../WCAG-KONTROLL.md#avklaringsplan-for-de-gjenstaende-kravene) skiller reelle hjelpemiddel-/zoom-/miljøtester fra gjennomførte lokale delprøver.

## Alle 48 krav

### 1.1.1 Ikke-tekstlig innhold — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv meningsbærende grafikk og side 6 i faktisk PDF-leser/skjermleser; bekreft at relasjoner/formål formidles og dekor ikke forstyrrer.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.2.1 Bare lyd og video (forhåndsinnspilt) — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.2.2 Teksting (forhåndsinnspilt) — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.2.5 Synstolking (forhåndsinnspilt) — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.3.1 Informasjon og relasjoner — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv PDF-listenavigasjon med faktisk skjermleser og vurder øvrige dokumentstrukturer/figurer.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.3.2 Meningsfylt rekkefølge — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv lineær lesing, særlig PDF-side 6–7, med faktisk hjelpemiddel.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.3.3 Sensoriske egenskaper — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Les instruksjoner; bekreft at de kan forstås uten bare farge, form, lyd eller plassering.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.3.4 Visningsretning — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Test med fysisk mobil/nettbrett eller dokumentert orienteringsstøtte, begge retninger og kritiske forløp.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.3.5 Identifiser formål med inndata — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.4.1 Bruk av farge — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Vurder om farge alene bærer mening i lenker, diagrammer, feil og tilstander.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.4.2 Styring av lyd — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.4.3 Kontrast (minimum) — K

694 faktiske tekstmålinger i 23 UI-tilstander: minst 5,209084:1 for aktive/aktuelle tekster; eneste lavere måling er inaktiv Tøm chat under kontrollert lasting. Alle 2694 synlige PDF-tegn er målt mot riktig opaque bakgrunn og bekreftet i render, minst 4,932072:1. Faktisk :hover, valg, validering, kilder, dialog og sidechat er prøvd. Lasting/tjenestefeil er kontrollert fixture i eksisterende UI, ikke ekte modell-/nettverksprøve. Ingen bekreftet tekstkontrastbrudd; ingen retting nødvendig. Tidligere 86 gradient- og fokusmålinger inngår med dato/omfang.

**Gjenstår:** Ingen åpen tekstkontrastoppgave i dette prøvde lokale innholds-/tilstandsutvalget. Gjenta ved nye komponenter/innhold/modelltilstander eller utrulling; dette erstatter ikke ny vurdering av endret innhold.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.4.4 Endring av tekststørrelse — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv faktisk 200 % tekstforstørring/zoom i en nettleser som eksponerer funksjonen og gjennomfør representative oppgaver. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.4.5 Bilder av tekst — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Undersøk tekst i bilder og om ekte tekst kan brukes; begrunn nødvendige unntak.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.4.10 Dynamisk tilpasning (Reflow) — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Test 400 % med faktisk zoom, effektiv 320 CSS-px og alle kritiske forløp. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.4.11 Kontrast for ikke-tekstlig innhold — U

27 nødvendige/representative feltkant-, ikon- og fokusmålinger har minst 3,421389:1. PDF-symboler/visuell avgrensning er undersøkt på syv renderinger. Full vurdering av hvilke grafiske relasjoner/markeringer som er nødvendige for forståelse er fortsatt uavklart; ikke alle lave dekorlinjer er automatisk brudd.

**Gjenstår:** Fullfør faglig klassifisering og kontrastvurdering av nødvendige grafiske relasjoner/detaljer i diagram og øvrige kontrolltilstander, med alternativ formidling der det trengs. Ikke før PDF-tekstkontrast som en uutført rest; den er målt.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.4.12 Tekstavstand — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen åpen kandidat i prøvd lokal tekstavstand. Retest øvrige støttede nettlesere og faktisk modellinnhold når de er tilgjengelige. PDF faller utenfor dette markup-kravet.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 1.4.13 Pekerfølsomt innhold eller innhold ved tastaturfokus — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.1.1 Tastatur — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Fullfør alle kritiske oppgaver med tastatur; Tab-spor dekker ikke alle handlinger.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.1.2 Ingen tastaturfelle — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv inn/ut av hver interaktiv komponent, begge retninger og eventuelle instruksjoner.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.1.4 Hurtigtaster som består av ett tegn — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.2.1 Justerbar hastighet — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.2.2 Pause, stopp, skjul — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Faglig vurder om prisaldervarselets tidsstyrte innsetting omfattes av 2.2.2 og i så fall trenger pause/skjul. Test faktisk redusert-bevegelse-innstilling separat; dette er ikke simulert som fullført.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.3.1 Terskelverdi på maksimalt tre glimt — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Undersøk alt blinkende innhold; bruk egnet glimtanalysator ved mulig terskelrisiko, unngå risikofylt avspilling.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.4.1 Hoppe over blokker — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Bruk hoppelenke/landemerker med tastatur og skjermleser; bekreft at gjentatt innhold faktisk kan hoppes over.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.4.2 Sidetitler — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv faktisk 404-fallback etter utrulling og i øvrige støttede nettlesere.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.4.3 Fokusrekkefølge — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Fullfør fokusrekkefølge ved faktisk forstørring og hjelpemiddel; særlig dynamiske resultater.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.4.4 Formål med lenke (i kontekst) — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Vurder hver lenkes formål i tillatt kontekst, inkludert ikonlenker og lenker i PDF.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.4.5 Flere måter — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Bekreft at sider kan finnes på minst to egnede måter, med relevante prosessunntak.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.4.6 Overskrifter og ledetekster — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Les overskrifter og etiketter; vurder om de beskriver emne og formål forståelig.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.4.7 Synlig fokus — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv alle representative kontrolltyper visuelt ved faktisk forstørring og ulike flater. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.5.1 Pekerbevegelse — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.5.2 Pekeravbrytelse — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv trykk, flytt ut og slipp, avbryt/angre; bekreft at handlinger ikke utløses utilsiktet.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.5.3 Ledetekst i navn — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Bekreft faktisk tilgjengelig navn mot all synlig tekst, også sammensatte kontroller og talestyring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 2.5.4 Bevegelsesaktivering — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 3.1.1 Språk på siden — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv effektivt PDF-språk i faktisk leser/skjermleser; korriger bare hvis feil språk er bekreftet.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 3.1.2 Språk på deler av innhold — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Fullfør PDF-språk og faktisk opplesing; kontroller nye dynamiske/modelldrevne svar og publisert feilside når de er tilgjengelige.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 3.2.1 Fokus — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Fokuser alle kontroller og bekreft at ingen uventet kontekstendring oppstår.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 3.2.2 Inndata — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Endre felt/valg og vurder kontekstendringer og eventuell forhåndsinformasjon.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 3.2.3 Konsekvent navigering — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Sammenlign gjentatt navigasjon på tvers av alle relevante sider og tilstander.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 3.2.4 Konsekvent identifikasjon — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Sammenlign navn, ikoner og funksjon for gjentatte komponenter, også dynamisk innhold.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 3.3.1 Identifikasjon av feil — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Utløs relevante feil; vurder om felt og feilårsak identifiseres i tekst og leses med skjermleser.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 3.3.2 Ledetekster eller instruksjoner — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Vurder forståelige etiketter, obligatoriske felt, formathjelp og instruksjoner før innsending.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 3.3.3 Forslag ved feil — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Utløs feil; vurder konkrete rettingsforslag og relevante sikkerhetsunntak.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 3.3.4 Forhindring av feil (juridiske feil, økonomiske feil, datafeil) — I

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 4.1.1 Parsing (oppdeling) — K

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv aktuell produksjon og relevante dynamiske DOM-tilstander ved endret kode; Nu-valideringen gjelder den bygde eksporten.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 4.1.2 Navn, rolle, verdi — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv kontrolltypene med faktisk skjermleser og dokumenter navn, rolle, verdi og oppdatering.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

### 4.1.3 Statusbeskjeder — U

Nye kontrastdelprøver; tidligere øvrig kravvurdering og restarbeid videreføres.

**Gjenstår:** Prøv faktiske statusbeskjeder med skjermleser, også prisaldervarselet dersom det skal formidles uten fokusflytting.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../135417-d3e318e119fd/wcag-grunnlag.json).

