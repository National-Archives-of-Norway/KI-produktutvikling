# Testprosedyrer – Mulig å oppfatte

Les [felles testprotokoll](wcag-testprosedyrer.md) før bruk. Prosedyrene er egne praktiske arbeidsprosedyrer, ikke ordrette kopier av Uu-tilsynets testregler. Kilder kontrollert 9. november 2026.

## 1.1.1

**Ikke-tekstlig innhold**

**Utvalg:** Bilder, SVG, ikoner, diagrammer, bildeknapper, CAPTCHA og dokumentgrafikk, også dynamisk innhold.

**Verktøy:** Nettleser med DOM/tilgjengelighetstre, faktisk skjermleser; PDF-leser med strukturvisning ved vedlegg.

**Fremgangsmåte:**

1. Kartlegg ikke-tekstlig innhold og skill meningsbærende innhold, funksjonelle bilder og ren dekorasjon.
2. Sammenlign synlig funksjon/budskap med beregnet navn eller tekstalternativ. Prøv bildeknapper og finn full beskrivelse for komplekse diagrammer.
3. Les med skjermleser; kontroller at dekor ikke tilfører støy. For CAPTCHA vurder formålsbeskrivelse og alternativ sansetype uten å løse testen automatisk.

**Forventet resultat:** Meningsbærende innhold har et likeverdig alternativ, funksjonelle bilder har riktig navn/formål, og dekor kan ignoreres. Spesialtilfeller som medier, sanseinntrykk og tester vurderes etter kilden; alt-attributt alene er ikke nok.

**Dokumentasjon:** Element/side, skjermbilde, beregnet navn/alt, alternativets plassering, faktisk opplesing og begrunnet klassifisering som dekor eller meningsbærende.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/111-ikke-tekstlig-innhold-niva/87). Excel: «Liste over krav», D6.

## 1.2.1

**Bare lyd og video (forhåndsinnspilt)**

**Utvalg:** Forhåndsinnspilt lyd alene og video uten lyd, inkludert innbygde tredjepartsspillere.

**Verktøy:** Mediespiller, hodetelefoner, tekstleser og tastatur.

**Fremgangsmåte:**

1. Finn klippene og avklar om de er lyd alene, video alene eller et tydelig merket mediealternativ til eksisterende tekst.
2. Lytt/se gjennom hvert valgt klipp; sammenlign hendelser, tale, viktige lyder og rekkefølge med tekst-/lydalternativet.
3. Finn og åpne alternativet via kontrollen ved klippet; prøv avspilling og stopp med tastatur.

**Forventet resultat:** Lyd alene har en dekkende tekstlig gjengivelse; video alene har et dekkende tekst- eller lydalternativ. Tilgangen er knyttet tydelig til klippet. Eventuelt tekstbasert mediealternativ dokumenteres særskilt.

**Dokumentasjon:** Klipp-ID, publiseringsdato der relevant, tidskoder for sammenligning, alternativets URL og eventuelle informasjonsmangler.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/121-bare-lyd-og-bare-video-forhandsinnspilt-niva/88). Excel: «Liste over krav», D8.

## 1.2.2

**Teksting (forhåndsinnspilt)**

**Utvalg:** Forhåndsinnspilt video med lyd; vurder også opptak av tidligere direktesending.

**Verktøy:** Videospiller med teksting, lyd, tastatur og lesing av eventuelt langt tekstalternativ.

**Fremgangsmåte:**

1. Åpne teksting og spill videoen; prøv på/av og betjening med tastatur.
2. Sammenlign tale, taleridentitet og betydningsfulle lyder med teksten; se etter feil, mangler, dårlig timing og tildekket viktig bildeinnhold.
3. Dersom virksomheten bruker et tekstalternativ etter Uu-tilsynets tolking, kontroller fullstendighet og nærhet til klippet. Avklar publiseringsdato og eventuelle medieunntak mot kilden.

**Forventet resultat:** Korrekt teksting eller et dekkende alternativ som aksepteres etter valgt norsk vurderingsgrunnlag formidler nødvendig lydinformasjon. Automatisk teksting uten kvalitetskontroll er ikke tilstrekkelig bevis.

**Dokumentasjon:** Valgt oppfyllelsesmåte, tekstspor/alternativ, spillerkontroller, publiseringsdato og konkrete tidskoder for feil eller kontrollerte sekvenser.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/122-teksting-forhandsinnspilt-niva/89). Excel: «Liste over krav», D9.

## 1.2.5

**Synstolking (forhåndsinnspilt)**

**Utvalg:** Forhåndsinnspilt video med lyd og visuell informasjon som ikke allerede uttrykkes i lydsporet.

**Verktøy:** Videospiller, lydavspilling/hodetelefoner, tastatur og vurdering av visuell fortelling.

**Fremgangsmåte:**

1. Avklar sektor og tidsmessig virkeområde. Den norske veiledningen omtaler offentlig publiserte opptak fra 1. februar 2024; begrunn eventuelle avgrensninger.
2. Se videoen og noter viktig handling, personer, tekst og sceneendringer som mangler i originallyden.
3. Lytt uten bildet og prøv integrert eller separat synstolking. Kontroller at innholdet forklares i tide og ikke overdøver tale; finn og betjen alternativt spor.

**Forventet resultat:** Nødvendig visuell mening er forståelig gjennom lyd, enten i originalsporet eller synstolking. En transkripsjon alene erstatter ikke synstolking for dette kriteriet.

**Dokumentasjon:** Virkeområde/publiseringsdato, valgt spor eller versjon, betjening og tidskoder som kobler visuelt innhold til lydforklaring.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/125-synstolking-forhandsinnspilt-niva-aa/842). Excel: «Liste over krav», D10.

## 1.3.1

**Informasjon og relasjoner**

**Utvalg:** Overskrifter, lister, tabeller, feltgrupper/instruksjoner, relasjoner og meningsbærende formatering, også i PDF.

**Verktøy:** DOM/tilgjengelighetstre, faktisk skjermleser; PDF-verktøy som viser tagger og kobling til innhold.

**Fremgangsmåte:**

1. Sammenlign den visuelle strukturen med semantikken: overskriftsroller, lister, tabelloverskrifter, etiketter og grupper. Kontroller også sitat, kode og matematikk når slik formatering har betydning.
2. Naviger overskrifter, lister, tabeller og felt med skjermleser. Kontroller at relasjoner og instruksjoner kan forstås uten plassering og utseende.
3. Undersøk PDF-tagging mot faktisk tekst/MCID og lesing; tell ikke bare tagger. Følg opp hver relevant innholdstype, ikke bare hovedoverskriften.

**Forventet resultat:** Informasjon og relasjoner som formidles visuelt er også tilgjengelige programmatisk eller gjennom et egnet tekstalternativ etter kilden. Ingen regel om nøyaktig én h1 innføres som et selvstendig WCAG-krav.

**Dokumentasjon:** Visuell/semantisk sammenstilling per innholdstype, kodereferanse eller PDF-tag, og faktisk hjelpemiddelresultat. Manglende PDF-/tabelltest begrenser konklusjonen.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/131-informasjon-og-relasjoner-niva/90). Excel: «Liste over krav», D12.

## 1.3.2

**Meningsfylt rekkefølge**

**Utvalg:** Innhold der rekkefølge gir mening: kolonner, trinn, dialoger, tabeller og dokumenter.

**Verktøy:** Faktisk skjermleser, DOM-leserekkefølge og eventuelt kontrollert visning uten CSS; PDF-leser.

**Fremgangsmåte:**

1. Finn sekvenser der feil rekkefølge endrer betydningen, særlig kolonner og dynamisk innhold.
2. Les lineært med skjermleser og sammenlign med den meningsfulle visuelle sekvensen; prøv også smal visning.
3. Følg dokumenters struktur og faktisk opplesing. Skill dette fra Tab-rekkefølge, som vurderes separat under 2.4.3.

**Forventet resultat:** Minst én programmatisk bestemt leserekkefølge bevarer mening og forståelige relasjoner. Visuell og kodet rekkefølge trenger ikke være identisk der betydningen er uavhengig av rekkefølgen.

**Dokumentasjon:** Forventet og faktisk sekvens med innholdsreferanser, relevant DOM/PDF-struktur og hjelpemiddel/versjon.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/132-meningsfylt-rekkefolge-niva/91). Excel: «Liste over krav», D13.

## 1.3.3

**Sensoriske egenskaper**

**Utvalg:** Instruksjoner som viser til plassering, form, størrelse, lyd eller retning.

**Verktøy:** Manuell innholdslesing og nettleser; skjermleser som supplerende kontroll.

**Fremgangsmåte:**

1. Finn instruksjoner som «trykk på den grønne/runde knappen», «til høyre» eller «etter lydsignalet».
2. Forsøk å identifisere handlingen uten den nevnte sanseegenskapen, ved navn, tekst eller en tydelig logisk sekvens.
3. Sammenlign med faktisk kontrollnavn og leserekkefølge; kontroller samme instruksjon i smal visning.

**Forventet resultat:** Instruksjonen kan forstås uten å være avhengig bare av sanseegenskaper. Vanlige rekkefølgeord kan brukes når den samme forståelige rekkefølgen er bestemt i innholdet.

**Dokumentasjon:** Instruksjonens ordlyd, kontroll/handling den viser til, alternativ identifikasjon og eventuell tvetydighet.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/133-sensoriske-egenskaper-niva/92). Excel: «Liste over krav», D14.

## 1.3.4

**Visningsretning**

**Utvalg:** Nettsider og brukerforløp på mobil/nettbrett, også dialoger og spillere.

**Verktøy:** Fysisk enhet eller dokumentert orienteringsstøtte i testnettleser; viewport-test er bare delbevis.

**Fremgangsmåte:**

1. Åpne det samme forløpet i stående retning; les og utfør handlinger.
2. Roter til liggende og tilbake uten å miste tilgang til innhold og nødvendige kontroller.
3. Undersøk orienteringslås eller «roter enheten»-sperre. Krev konkret begrunnelse dersom en retning hevdes avgjørende.

**Forventet resultat:** Innhold og betjening er tilgjengelig i begge retninger, med dokumenterte nødvendige unntak. Lik layout er ikke påkrevd. Endret vindusbredde alene beviser ikke at enheten kan roteres.

**Dokumentasjon:** Enhet/OS, retninger, skjermbilder, fullførte handlinger og grunnlag for eventuell låsing.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/134-visningsretning-niva-aa/141). Excel: «Liste over krav», D15.

## 1.3.5

**Identifiser formål med inndata**

**Utvalg:** Felt som samler opplysninger om brukeren selv, og som omfattes av standardiserte inndataformål.

**Verktøy:** DOM-inspeksjon og nettleser med støtte for autofyll; eventuelt hjelpemiddel.

**Fremgangsmåte:**

1. Kartlegg felter for blant annet navn, adresse, e-post og innloggingsopplysninger om den aktuelle brukeren.
2. Sammenlign feltets faktiske formål med gyldig autocomplete-token eller tilsvarende standardisert semantikk.
3. Prøv autofyll uten å lagre reelle personopplysninger. Skill slike felt fra generelt søk, chat og opplysninger om andre personer.

**Forventet resultat:** Relevante felt har programmatisk gjenkjennelig og korrekt inndataformål. En synlig etikett eller type=email alene dokumenterer ikke hele kravet.

**Dokumentasjon:** Feltutvalg, formål, kode/token, testet autofyll og begrunnelse for felt som faller utenfor.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/135-identifiser-formal-med-inndata-niva-aa/142). Excel: «Liste over krav», D16.

## 1.4.1

**Bruk av farge**

**Utvalg:** Lenker, diagrammer, feil, status og markering av valg eller obligatoriske felt.

**Verktøy:** Nettleser, manuell visuell kontroll, eventuelt gråtonevisning og kontrastmåler.

**Fremgangsmåte:**

1. Finn informasjon som uttrykkes med farge; undersøk om tekst, form, mønster eller symbol formidler samme skille.
2. Kontroller lenker i løpende tekst både normalt, ved hover og tastaturfokus.
3. Der bare farge skiller lenken, mål kontrast mot nabotekst og prøv den supplerende markeringen ved hover/fokus etter kildens vilkår.

**Forventet resultat:** Meningsbærende farge har et synlig alternativ. Lenker kan bruke en dokumentert løsning med minst 3:1 mot nabotekst og tilleggskjennetegn ved hover/fokus, eller et permanent annet kjennetegn.

**Dokumentasjon:** Informasjonen som fargen uttrykker, alternativ markering, skjermbilder av tilstandene og relevante målinger.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/141-bruk-av-farge-niva/93). Excel: «Liste over krav», D18.

## 1.4.2

**Styring av lyd**

**Utvalg:** Lyd som begynner uten at brukeren selv har valgt avspilling.

**Verktøy:** Nettleser/mediespiller, lyd og tastatur; tidtaking.

**Fremgangsmåte:**

1. Åpne siden på nytt og noter om hørbar lyd starter automatisk og varer mer enn tre sekunder.
2. Finn pause/stopp eller uavhengig volumregulering og betjen med tastatur. Prøv at lyden faktisk kan dempes eller stanses.
3. Kontroller lett tilgjengelig plassering; ved stopp/pause legger Uu-tilsynet til grunn de fem første Tab-stegene. Ikke bruk systemets hovedvolum som løsning.

**Forventet resultat:** Automatisk lyd over tre sekunder kan stoppes/pauses eller reguleres uavhengig av systemvolumet. Fravær av automatisk lyd dokumenteres gjennom observert bruk, ikke bare søk etter audio-taggen.

**Dokumentasjon:** URL, varighet, startbetingelse, kontrollens navn/plassering, antall Tab-steg og faktisk virkning.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/142-styring-av-lyd-niva/94). Excel: «Liste over krav», D19.

## 1.4.3

**Kontrast (minimum)**

**Utvalg:** Tekst og bilder av tekst i normal-, valgt-, hover-, fokus- og feiltilstand.

**Verktøy:** Kontrastmåler med sRGB/alpha-støtte, nettleserens beregnede stil; bilde-/gradientanalyse ved behov.

**Fremgangsmåte:**

1. Identifiser faktisk tekstfarge og bakgrunn, skriftstørrelse/-vekt og gjennomsiktighet i hver relevant tilstand.
2. Mål forholdet mot den sammensatte bakgrunnen; undersøk svakeste område ved gradient eller bilde.
3. Sammenlign med riktig terskel uten avrunding til bestått. Dokumenter særskilt eventuelle unntak, for eksempel logo eller inaktiv kontroll.

**Forventet resultat:** Vanlig tekst når minst 4,5:1; stor tekst når minst 3:1 når vilkårene gjelder (18 pt eller 14 pt fet, omtrent 24/18,7 CSS-px). Følg kildens særpresisering for bilder av tekst; et par målte grunnfarger beviser ikke alle flater.

**Dokumentasjon:** Fargeverdier/alpha, bakgrunnssammensetning, tekststørrelse/-vekt, målepunkt, uavrundet forhold og valgt terskel.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/143-kontrast-minimum-niva-aa/95). Excel: «Liste over krav», D20.

## 1.4.4

**Endring av tekststørrelse**

**Utvalg:** Tekst, ledetekster, knapper, menyer og feil-/resultattilstander.

**Verktøy:** Nettleser med faktisk tekstforstørring/zoom, dokumentert grunnoppløsning og tastatur.

**Fremgangsmåte:**

1. Noter grunnvisning og testmiljø. Forstørr teksten til 200 % med en støttet nettleserfunksjon.
2. Les og bruk representative forløp, inkludert skjema, dialog, navigasjon og feilmelding.
3. Kontroller klipping, overlapping og utilgjengelige kontroller; prøv fremvisning av trunkert innhold. Nullstill forstørringen etterpå.

**Forventet resultat:** Teksten kan forstørres til 200 % uten bortfall av innhold eller betjening innenfor kriteriets avgrensninger. En smal viewport eller større tekst satt i kildekoden erstatter ikke dokumentert nettleserforstørring.

**Dokumentasjon:** Grunnoppløsning, zoom-/tekstnivå og faktisk mekanisme, skjermbilder før/etter og fullførte handlinger.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/144-endring-av-tekststorrelse-niva-aa/96). Excel: «Liste over krav», D21.

## 1.4.5

**Bilder av tekst**

**Utvalg:** Bannere, knappebilder, illustrasjoner med tekst og skannede dokumenter.

**Verktøy:** Visuell innholdsvurdering, DOM/bildedata; PDF-tekstuttrekk og rendering ved dokumenter.

**Fremgangsmåte:**

1. Finn tekst som kan være lagret som bilde, og avgjør om teksten er hovedinformasjonen eller inngår i et mer sammensatt visuelt motiv.
2. Prøv å endre tekstens visuelle egenskaper; vurder om vanlig tekst kunne formidlet det samme.
3. Dokumenter bare reelle unntak, eksempelvis nødvendig særpresentasjon eller merkevare. Vurder skannet PDF sammen med teksttilgjengelighet og struktur.

**Forventet resultat:** Vanlig informasjon presenteres som faktisk tekst der teknologien tillater det; tillatte bildeunntak er konkret begrunnet. OCR eller markerbar tekst alene beviser ikke at en skannet PDF har tilgjengelig struktur.

**Dokumentasjon:** Bilde/PDF-side, tekstens funksjon, tilpasningsmulighet og dokumentert unntaksgrunnlag eller manglende tekstalternativ.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/145-bilder-av-tekst-niva-aa/97). Excel: «Liste over krav», D22.

## 1.4.10

**Dynamisk tilpasning (Reflow)**

**Utvalg:** Sider og dynamiske forløp, inkludert navigasjon, dialog, skjema og lokalt rullbare tabeller.

**Verktøy:** Nettleser med faktisk 400 % zoom og kontroll av CSS-viewport; tastatur og visuell inspeksjon.

**Fremgangsmåte:**

1. Start med en bredde som gir 320 CSS-px ved 400 % zoom, for eksempel 1280 CSS-px ved 100 %. Bekreft faktisk zoom og effektiv bredde.
2. Les og bruk siden; se etter behov for både vannrett og loddrett siderulling eller innhold som faller bort.
3. Vurder todimensjonale objekter særskilt; en nødvendig tabellrulling fritar ikke resten av siden. For horisontalt flytende språk vurder tilsvarende høyde 256 CSS-px.

**Forventet resultat:** Innholdet flyter om uten tap av informasjon/betjening eller unødvendig rulling i to retninger. Unntak må kreve todimensjonal presentasjon. Viewport 320 alene registreres som responsiv deltest, ikke som faktisk zoom.

**Dokumentasjon:** Zoommekanisme, start-/sluttbredde eller høyde, rulleområder, skjermbilder og begrunnelse for hvert unntak.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/1410-dynamisk-tilpasning-reflow-niva-aa/144). Excel: «Liste over krav», D23.

## 1.4.11

**Kontrast for ikke-tekstlig innhold**

**Utvalg:** Kontrollgrenser, ikoner, valgte/utvidede tilstander og grafiske deler nødvendige for forståelse.

**Verktøy:** Kontrastmåler, beregnet stil/bildeanalyse og nettleser for ulike tilstander.

**Fremgangsmåte:**

1. Finn de visuelle delene som er nødvendige for å kjenne igjen kontrollen, tilstanden eller grafikkens mening.
2. Mål nødvendig informasjon mot tilstøtende farger i normal-, fokus-, feil- og valgt tilstand; ta hensyn til alpha og bildebakgrunn.
3. Avklar eventuelle uendrede nettleserkontroller, inaktive elementer eller avgjørende grafikk etter kilden.

**Forventet resultat:** Nødvendig ikke-tekstlig informasjon når minst 3:1 mot relevante tilstøtende farger. Det kreves ikke automatisk 3:1 mellom en kontrolls tidligere og nye tilstand; mål riktig relasjon.

**Dokumentasjon:** Element og tilstand, hvilke kanter/deler som er nødvendige, tilstøtende farger, målepunkter og ratio med terskel.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/1411-kontrast-ikke-tekstlig-innhold-niva-aa/145). Excel: «Liste over krav», D24.

## 1.4.12

**Tekstavstand**

**Utvalg:** Tekst og kontroller i normale og dynamiske tilstander, også smale sider.

**Verktøy:** Nettleser med tillatt brukerstil-/testoverstyring og visuell kontroll.

**Fremgangsmåte:**

1. Overstyr samtidig linjehøyde til 1,5 ganger skriftstørrelsen, avsnittsavstand til 2 em, bokstavavstand til 0,12 em og ordavstand til 0,16 em.
2. Åpne menyer/dialoger, send ugyldige testverdier og les resultater. Kontroller klipping, overlapping, rulling og betjening ved relevante bredder.
3. Verifiser de faktiske beregnede verdiene og fjern testoverstyringen etterpå. Vurder unntak for språk/teknologi særskilt.

**Forventet resultat:** Brukeren kan øke de fire avstandene uten tap av innhold eller funksjon. Siden trenger ikke bruke disse verdiene som standard. Ingen sidebredde-overflyt alene er ikke nok til å utelukke klipping.

**Dokumentasjon:** Anvendt overstyring, beregnede verdier, skjermbilder og resultater fra både normal og dynamisk visning; bekreft at teststil er fjernet.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/1412-tekstavstand-niva-aa/146). Excel: «Liste over krav», D25.

## 1.4.13

**Pekerfølsomt innhold eller innhold ved tastaturfokus**

**Utvalg:** Egendefinerte verktøytips, nedtrekk og annet ekstra innhold som vises ved hover eller fokus.

**Verktøy:** Mus/peker, tastatur og nettleser; forstørring ved behov.

**Fremgangsmåte:**

1. Utløs innholdet med peker og deretter tastaturfokus; skill fra modale dialoger og uendrede nettlesertips.
2. Flytt pekeren inn på det ekstra innholdet og prøv å lese det. Flytt ikke fokus mens du prøver å lukke med Escape eller oppgitt mekanisme.
3. La innholdet stå fremme lenge nok til å lese og kontroller når det forsvinner. Vurder kildeunntaket for ekstra innhold som ikke skjuler/erstatter annet.

**Forventet resultat:** Der vilkårene gjelder, kan innholdet avvises uten å flytte hover/fokus, pekeren kan føres over det, og det blir stående til utløsende tilstand avsluttes, bruker avviser eller informasjonen blir ugyldig.

**Dokumentasjon:** Utløser, ekstra innhold, pekerbane, lukkemetode og observert varighet/forsvinning i begge betjeningsmåter.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/1413-pekerfolsomt-innhold-eller-innhold-ved-tastaturfokus-niva-aa/147). Excel: «Liste over krav», D26.

