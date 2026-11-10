# Gjenstående tilgjengelighetskontroller

**10. november 2026 · Codex (OpenAI) · skill 0.5.1.** 24 K / 11 I / 13 U / 0 B er avgrenset arbeidsstatus, ikke samsvarsprosent. Samlet samsvar er fortsatt uavklart.

## Fullført nå

1.4.11 er vurdert i oppgitt lokalt utvalg. Nødvendige kontroll-/grafikkdeler er klassifisert, målt og A11Y-07 filterovergang rettet/retestet i 16 handlinger. Alle PDF-ens 157 grafiske primitiver har begrunnet klassifisering. PDF-en er uendret. 1.4.3 K videreføres med ny tekstkontrastretest på filtrene. Se [rapport](testrapport.md), [klassifisering](raw/classification.json) og [retest](raw/filter-retest-results.json).

## Fortsatt utenfor eller ikke ferdig vurdert

- K is a scoped local work assessment, not formal global WCAG/production approval.
- No actual screen reader, 200/400% zoom, physical orientation or production/auth/external-model test.
- PDF visual classification does not resolve 1.1.1/1.3.1/1.3.2 or PDF language/reading order.
- No claim that an edited PDF had objects removed; omission assessment is reasoned from visible content, geometry and explicit labels.
- Actual held pointer-down not separately captured; current MUI ripple is disabled by theme and no author active-colour rules exist.
- New graphics, controls, overlays or deployed authentication require reassessment.

[Avklaringsplan for de 13 gjenstående kravene](../../WCAG-KONTROLL.md#avklaringsplan-for-de-gjenstaende-kravene) er oppdatert. Kontrastavklaring betyr ikke at PDF-alternativer, struktur eller faktisk hjelpemiddelbruk er avklart.

## Alle 48 krav

### 1.1.1 Ikke-tekstlig innhold — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv meningsbærende grafikk og side 6 i faktisk PDF-leser/skjermleser; bekreft at relasjoner/formål formidles og dekor ikke forstyrrer.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.2.1 Bare lyd og video (forhåndsinnspilt) — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.2.2 Teksting (forhåndsinnspilt) — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.2.5 Synstolking (forhåndsinnspilt) — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.3.1 Informasjon og relasjoner — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv PDF-listenavigasjon med faktisk skjermleser og vurder øvrige dokumentstrukturer/figurer.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.3.2 Meningsfylt rekkefølge — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv lineær lesing, særlig PDF-side 6–7, med faktisk hjelpemiddel.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.3.3 Sensoriske egenskaper — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Les instruksjoner; bekreft at de kan forstås uten bare farge, form, lyd eller plassering.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.3.4 Visningsretning — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Test med fysisk mobil/nettbrett eller dokumentert orienteringsstøtte, begge retninger og kritiske forløp.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.3.5 Identifiser formål med inndata — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.4.1 Bruk av farge — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Vurder om farge alene bærer mening i lenker, diagrammer, feil og tilstander.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.4.2 Styring av lyd — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.4.3 Kontrast (minimum) — K

A11Y-07 berørte også tekst under filterovergang. Filterfarger skifter nå samtidig; 16 umiddelbare retester gir tekstkontrast minst 12,538164:1. Tidligere scoped K for HTML/PDF-tekst videreføres med øvrig evidens.

**Gjenstår:** Ingen åpen tekstkontrastoppgave i dette prøvde lokale innholds-/tilstandsutvalget. Gjenta ved nye komponenter/innhold/modelltilstander eller utrulling; dette erstatter ikke ny vurdering av endret innhold.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.4.4 Endring av tekststørrelse — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv faktisk 200 % tekstforstørring/zoom i en nettleser som eksponerer funksjonen og gjennomfør representative oppgaver. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.4.5 Bilder av tekst — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Undersøk tekst i bilder og om ekte tekst kan brukes; begrunn nødvendige unntak.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.4.10 Dynamisk tilpasning (Reflow) — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Test 400 % med faktisk zoom, effektiv 320 CSS-px og alle kritiske forløp. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.4.11 Kontrast for ikke-tekstlig innhold — K

Nødvendige feltgrenser, ikon-/fokus-/valgt-/meny-/trekkspillmarkeringer er klassifisert og målt. Uendrede prøvde markeringer minst 3,392300:1. A11Y-07: valgt filter hadde for svak kontrast i .25s overgang; rettet med samtidig skifte av tekst/bakgrunn. 16 umiddelbare retester gir minst 10,922731:1 for valgt flate. Alle 157 PDF-primitiver klassifisert; 19 nødvendige/konservativt prøvde grafiske deler minst 4,191671:1. Perifere ellipseomriss er supplerende innramming etter begrunnet visuell vurdering; ingen data/relasjon avhenger av omrisset. PDF uendret.

**Gjenstår:** Ingen åpen 1.4.11-oppgave i oppgitt lokalt innholds-/kontrollutvalg. Gjenta ved nye grafiske relasjoner, komponenter eller utrulling. Dette lukker ikke alternative tekster/struktur, faktisk hjelpemiddel/zoom eller produksjonsgodkjenning.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.4.12 Tekstavstand — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen åpen kandidat i prøvd lokal tekstavstand. Retest øvrige støttede nettlesere og faktisk modellinnhold når de er tilgjengelige. PDF faller utenfor dette markup-kravet.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 1.4.13 Pekerfølsomt innhold eller innhold ved tastaturfokus — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.1.1 Tastatur — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Fullfør alle kritiske oppgaver med tastatur; Tab-spor dekker ikke alle handlinger.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.1.2 Ingen tastaturfelle — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv inn/ut av hver interaktiv komponent, begge retninger og eventuelle instruksjoner.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.1.4 Hurtigtaster som består av ett tegn — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.2.1 Justerbar hastighet — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.2.2 Pause, stopp, skjul — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Faglig vurder om prisaldervarselets tidsstyrte innsetting omfattes av 2.2.2 og i så fall trenger pause/skjul. Test faktisk redusert-bevegelse-innstilling separat; dette er ikke simulert som fullført.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.3.1 Terskelverdi på maksimalt tre glimt — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Undersøk alt blinkende innhold; bruk egnet glimtanalysator ved mulig terskelrisiko, unngå risikofylt avspilling.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.4.1 Hoppe over blokker — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Bruk hoppelenke/landemerker med tastatur og skjermleser; bekreft at gjentatt innhold faktisk kan hoppes over.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.4.2 Sidetitler — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv faktisk 404-fallback etter utrulling og i øvrige støttede nettlesere.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.4.3 Fokusrekkefølge — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Fullfør fokusrekkefølge ved faktisk forstørring og hjelpemiddel; særlig dynamiske resultater.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.4.4 Formål med lenke (i kontekst) — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Vurder hver lenkes formål i tillatt kontekst, inkludert ikonlenker og lenker i PDF.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.4.5 Flere måter — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Bekreft at sider kan finnes på minst to egnede måter, med relevante prosessunntak.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.4.6 Overskrifter og ledetekster — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Les overskrifter og etiketter; vurder om de beskriver emne og formål forståelig.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.4.7 Synlig fokus — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv alle representative kontrolltyper visuelt ved faktisk forstørring og ulike flater. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.5.1 Pekerbevegelse — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.5.2 Pekeravbrytelse — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv trykk, flytt ut og slipp, avbryt/angre; bekreft at handlinger ikke utløses utilsiktet.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.5.3 Ledetekst i navn — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Bekreft faktisk tilgjengelig navn mot all synlig tekst, også sammensatte kontroller og talestyring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 2.5.4 Bevegelsesaktivering — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 3.1.1 Språk på siden — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv effektivt PDF-språk i faktisk leser/skjermleser; korriger bare hvis feil språk er bekreftet.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 3.1.2 Språk på deler av innhold — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Fullfør PDF-språk og faktisk opplesing; kontroller nye dynamiske/modelldrevne svar og publisert feilside når de er tilgjengelige.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 3.2.1 Fokus — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Fokuser alle kontroller og bekreft at ingen uventet kontekstendring oppstår.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 3.2.2 Inndata — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Endre felt/valg og vurder kontekstendringer og eventuell forhåndsinformasjon.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 3.2.3 Konsekvent navigering — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Sammenlign gjentatt navigasjon på tvers av alle relevante sider og tilstander.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 3.2.4 Konsekvent identifikasjon — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Sammenlign navn, ikoner og funksjon for gjentatte komponenter, også dynamisk innhold.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 3.3.1 Identifikasjon av feil — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Utløs relevante feil; vurder om felt og feilårsak identifiseres i tekst og leses med skjermleser.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 3.3.2 Ledetekster eller instruksjoner — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Vurder forståelige etiketter, obligatoriske felt, formathjelp og instruksjoner før innsending.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 3.3.3 Forslag ved feil — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Utløs feil; vurder konkrete rettingsforslag og relevante sikkerhetsunntak.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 3.3.4 Forhindring av feil (juridiske feil, økonomiske feil, datafeil) — I

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 4.1.1 Parsing (oppdeling) — K

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv aktuell produksjon og relevante dynamiske DOM-tilstander ved endret kode; Nu-valideringen gjelder den bygde eksporten.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 4.1.2 Navn, rolle, verdi — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv kontrolltypene med faktisk skjermleser og dokumenter navn, rolle, verdi og oppdatering.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

### 4.1.3 Statusbeskjeder — U

Målrettet 1.4.11-vurdering; tidligere øvrige kravbevis/rest videreføres, ikke ny full manuell revisjon.

**Gjenstår:** Prøv faktiske statusbeskjeder med skjermleser, også prisaldervarselet dersom det skal formidles uten fokusflytting.

[Ny protokoll](manual-tests.json), [forrige grunnlag](../145250-bd1373c8699b/wcag-grunnlag.json).

