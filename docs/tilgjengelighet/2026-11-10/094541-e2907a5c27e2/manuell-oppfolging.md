# Gjenstående tilgjengelighetskontroller

**10. november 2026.** Ny lokal oppfølging er gjennomført, inkludert tekstavstand/dynamiske forløp, gradientbakgrunner, faktisk CSS-pause/start og simulert prisalder. Ingen nye bekreftede åpne brudd. **22 K / 11 I / 15 U / 0 B**, ingen samsvarsprosent.

## Utført nå

42 tekstavstandsmålinger uten sideoverflyt; representative dynamiske tilstander prøvd. 80 axe-incomplete-noder har minst 8,207:1 i en konservativ bakgrunnsmodell. Alle seks pristabeller ruller med tastatur. Animasjon pauser også etter Tab ut. Prisaldervarselets før/ved/etter-terskel og opprydding er prøvd med simulert klokke. Dette er avgrensede resultater, ikke full hjelpemiddel-/hover-/zoomgodkjenning.

## Blokkert av verktøy eller manglende miljø

- Faktisk skjermleser/tale og PDF-navigasjon: ingen verifiserbar hjelpemiddeløkt tilgjengelig.
- Faktisk 200/400 % forstørring: IAB eksponerer ikke bekreftet zoom; native Chrome-tilgang ble avvist automatisk («Computer Use was not approved to use Google Chrome»). Viewport er ikke zoom.
- Fysisk orientering og faktisk redusert bevegelse: ingen styrbar enhet/godkjent OS-preferanseøkt.
- Native pekerhover og øvrige støttede nettlesere: mangler godkjent styringsflate.
- Innlogging, faktisk modell og publisert fallback: aktuelt miljø finnes ikke i testomfanget.

## Krever fortsatt faglig vurdering

Fullstendig diagramalternativ/PDF-rekkefølge og språk, resterende ikke-tekstlig kontrast/overlagringer/tilstander, og om tidsstyrt prisvarsel trenger pause/skjul. Dette er ikke axe-/Nu-blokkeringer. 1.4.12 er K i prøvd lokal HTML-versjon; det er én fullført lokal manuell delvurdering, 36 krav med bredere rest og 11 uten utløsende innholdstype. Nye nettlesere/produksjon krever retest. Se [rapport](testrapport.md) for konkrete metoder og hindringer.

## Alle 48 krav

| Krav | Automatisk delstatus | Arbeidsstatus | Neste steg |
| --- | --- | --- | --- |
| 1.1.1 Ikke-tekstlig innhold | partial_tested | U | Prøv meningsbærende grafikk og side 6 i faktisk PDF-leser/skjermleser; bekreft at relasjoner/formål formidles og dekor ikke forstyrrer. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#111) |
| 1.2.1 Bare lyd og video (forhåndsinnspilt) | partial_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#121) |
| 1.2.2 Teksting (forhåndsinnspilt) | partial_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#122) |
| 1.2.5 Synstolking (forhåndsinnspilt) | partial_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#125) |
| 1.3.1 Informasjon og relasjoner | partial_tested | U | Prøv PDF-listenavigasjon med faktisk skjermleser og vurder øvrige dokumentstrukturer/figurer. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#131) |
| 1.3.2 Meningsfylt rekkefølge | not_tested | U | Prøv lineær lesing, særlig PDF-side 6–7, med faktisk hjelpemiddel. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#132) |
| 1.3.3 Sensoriske egenskaper | not_tested | K | Les instruksjoner; bekreft at de kan forstås uten bare farge, form, lyd eller plassering. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#133) |
| 1.3.4 Visningsretning | partial_tested | U | Test med fysisk mobil/nettbrett eller dokumentert orienteringsstøtte, begge retninger og kritiske forløp. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#134) |
| 1.3.5 Identifiser formål med inndata | partial_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#135) |
| 1.4.1 Bruk av farge | partial_tested | K | Vurder om farge alene bærer mening i lenker, diagrammer, feil og tilstander. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#141) |
| 1.4.2 Styring av lyd | partial_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#142) |
| 1.4.3 Kontrast (minimum) | candidates | U | Fullfør faktisk rendret kontrast for hover/fokus/feil/overlappende skygger og PDF-grafikk; bruk komponent-/bakgrunnsmodellen som støtte, ikke fullskjermgodkjenning. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#143) |
| 1.4.4 Endring av tekststørrelse | partial_tested | U | Prøv faktisk 200 % tekstforstørring/zoom i en nettleser som eksponerer funksjonen og gjennomfør representative oppgaver. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#144) |
| 1.4.5 Bilder av tekst | not_tested | K | Undersøk tekst i bilder og om ekte tekst kan brukes; begrunn nødvendige unntak. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#145) |
| 1.4.10 Dynamisk tilpasning (Reflow) | partial_tested | U | Test 400 % med faktisk zoom, effektiv 320 CSS-px og alle kritiske forløp. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#1410) |
| 1.4.11 Kontrast for ikke-tekstlig innhold | not_tested | U | Mål nødvendige visuelle deler mot tilstøtende farger i alle relevante tilstander, inkludert PDF. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#1411) |
| 1.4.12 Tekstavstand | partial_tested | K | Ingen åpen kandidat i prøvd lokal tekstavstand. Retest øvrige støttede nettlesere og faktisk modellinnhold når de er tilgjengelige. PDF faller utenfor dette markup-kravet. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#1412) |
| 1.4.13 Pekerfølsomt innhold eller innhold ved tastaturfokus | not_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-1-oppfatte.md#1413) |
| 2.1.1 Tastatur | partial_tested | K | Fullfør alle kritiske oppgaver med tastatur; Tab-spor dekker ikke alle handlinger. [Prosedyre](testprosedyrer/wcag-2-betjene.md#211) |
| 2.1.2 Ingen tastaturfelle | partial_tested | K | Prøv inn/ut av hver interaktiv komponent, begge retninger og eventuelle instruksjoner. [Prosedyre](testprosedyrer/wcag-2-betjene.md#212) |
| 2.1.4 Hurtigtaster som består av ett tegn | not_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-2-betjene.md#214) |
| 2.2.1 Justerbar hastighet | partial_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-2-betjene.md#221) |
| 2.2.2 Pause, stopp, skjul | partial_tested | U | Faglig vurder om prisaldervarselets tidsstyrte innsetting omfattes av 2.2.2 og i så fall trenger pause/skjul. Test faktisk redusert-bevegelse-innstilling separat; dette er ikke simulert som fullført. [Prosedyre](testprosedyrer/wcag-2-betjene.md#222) |
| 2.3.1 Terskelverdi på maksimalt tre glimt | not_tested | K | Undersøk alt blinkende innhold; bruk egnet glimtanalysator ved mulig terskelrisiko, unngå risikofylt avspilling. [Prosedyre](testprosedyrer/wcag-2-betjene.md#231) |
| 2.4.1 Hoppe over blokker | partial_tested | K | Bruk hoppelenke/landemerker med tastatur og skjermleser; bekreft at gjentatt innhold faktisk kan hoppes over. [Prosedyre](testprosedyrer/wcag-2-betjene.md#241) |
| 2.4.2 Sidetitler | partial_tested | K | Prøv faktisk 404-fallback etter utrulling og i øvrige støttede nettlesere. [Prosedyre](testprosedyrer/wcag-2-betjene.md#242) |
| 2.4.3 Fokusrekkefølge | partial_tested | U | Fullfør fokusrekkefølge ved faktisk forstørring og hjelpemiddel; særlig dynamiske resultater. [Prosedyre](testprosedyrer/wcag-2-betjene.md#243) |
| 2.4.4 Formål med lenke (i kontekst) | partial_tested | K | Vurder hver lenkes formål i tillatt kontekst, inkludert ikonlenker og lenker i PDF. [Prosedyre](testprosedyrer/wcag-2-betjene.md#244) |
| 2.4.5 Flere måter | not_tested | K | Bekreft at sider kan finnes på minst to egnede måter, med relevante prosessunntak. [Prosedyre](testprosedyrer/wcag-2-betjene.md#245) |
| 2.4.6 Overskrifter og ledetekster | partial_tested | K | Les overskrifter og etiketter; vurder om de beskriver emne og formål forståelig. [Prosedyre](testprosedyrer/wcag-2-betjene.md#246) |
| 2.4.7 Synlig fokus | partial_tested | U | Prøv alle representative kontrolltyper visuelt ved faktisk forstørring og ulike flater. Faktisk Chrome-tilgang ble avvist av automatisk godkjenningskontroll; IAB-viewport er ikke zoom. [Prosedyre](testprosedyrer/wcag-2-betjene.md#247) |
| 2.5.1 Pekerbevegelse | not_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-2-betjene.md#251) |
| 2.5.2 Pekeravbrytelse | not_tested | K | Prøv trykk, flytt ut og slipp, avbryt/angre; bekreft at handlinger ikke utløses utilsiktet. [Prosedyre](testprosedyrer/wcag-2-betjene.md#252) |
| 2.5.3 Ledetekst i navn | partial_tested | K | Bekreft faktisk tilgjengelig navn mot all synlig tekst, også sammensatte kontroller og talestyring. [Prosedyre](testprosedyrer/wcag-2-betjene.md#253) |
| 2.5.4 Bevegelsesaktivering | not_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-2-betjene.md#254) |
| 3.1.1 Språk på siden | partial_tested | U | Prøv effektivt PDF-språk i faktisk leser/skjermleser; korriger bare hvis feil språk er bekreftet. [Prosedyre](testprosedyrer/wcag-3-forstaelig.md#311) |
| 3.1.2 Språk på deler av innhold | partial_tested | U | Fullfør PDF-språk og faktisk opplesing; kontroller nye dynamiske/modelldrevne svar og publisert feilside når de er tilgjengelige. [Prosedyre](testprosedyrer/wcag-3-forstaelig.md#312) |
| 3.2.1 Fokus | partial_tested | K | Fokuser alle kontroller og bekreft at ingen uventet kontekstendring oppstår. [Prosedyre](testprosedyrer/wcag-3-forstaelig.md#321) |
| 3.2.2 Inndata | partial_tested | K | Endre felt/valg og vurder kontekstendringer og eventuell forhåndsinformasjon. [Prosedyre](testprosedyrer/wcag-3-forstaelig.md#322) |
| 3.2.3 Konsekvent navigering | not_tested | K | Sammenlign gjentatt navigasjon på tvers av alle relevante sider og tilstander. [Prosedyre](testprosedyrer/wcag-3-forstaelig.md#323) |
| 3.2.4 Konsekvent identifikasjon | not_tested | K | Sammenlign navn, ikoner og funksjon for gjentatte komponenter, også dynamisk innhold. [Prosedyre](testprosedyrer/wcag-3-forstaelig.md#324) |
| 3.3.1 Identifikasjon av feil | partial_tested | K | Utløs relevante feil; vurder om felt og feilårsak identifiseres i tekst og leses med skjermleser. [Prosedyre](testprosedyrer/wcag-3-forstaelig.md#331) |
| 3.3.2 Ledetekster eller instruksjoner | partial_tested | K | Vurder forståelige etiketter, obligatoriske felt, formathjelp og instruksjoner før innsending. [Prosedyre](testprosedyrer/wcag-3-forstaelig.md#332) |
| 3.3.3 Forslag ved feil | partial_tested | K | Utløs feil; vurder konkrete rettingsforslag og relevante sikkerhetsunntak. [Prosedyre](testprosedyrer/wcag-3-forstaelig.md#333) |
| 3.3.4 Forhindring av feil (juridiske feil, økonomiske feil, datafeil) | not_tested | I | Ingen utløsende innholdstype i undersøkt lokalt omfang. Vurder på nytt ved endring. [Prosedyre](testprosedyrer/wcag-3-forstaelig.md#334) |
| 4.1.1 Parsing (oppdeling) | partial_tested | K | Prøv aktuell produksjon og relevante dynamiske DOM-tilstander ved endret kode; Nu-valideringen gjelder den bygde eksporten. [Prosedyre](testprosedyrer/wcag-4-robust.md#411) |
| 4.1.2 Navn, rolle, verdi | partial_tested | U | Prøv kontrolltypene med faktisk skjermleser og dokumenter navn, rolle, verdi og oppdatering. [Prosedyre](testprosedyrer/wcag-4-robust.md#412) |
| 4.1.3 Statusbeskjeder | partial_tested | U | Prøv faktiske statusbeskjeder med skjermleser, også prisaldervarselet dersom det skal formidles uten fokusflytting. [Prosedyre](testprosedyrer/wcag-4-robust.md#413) |
