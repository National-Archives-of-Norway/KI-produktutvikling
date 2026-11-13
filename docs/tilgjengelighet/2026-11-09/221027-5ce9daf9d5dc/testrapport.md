# Tilgjengelighetsgjennomgang etter alle 48 prosedyrer

**9. november 2026 · Codex (OpenAI) · tilgjengelighetserklaering 0.4.0.** Kjøring **221027-5ce9daf9d5dc**. Grunnlag: commit `83b87f3` med lokale endringer i erklæring, dokumentasjon og skill-metadata. Testet lokalt på `http://127.0.0.1:3000/`, ikke i produksjon.

## Konklusjon

Alle **48 krav** er gjennomgått med prosedyrehenvisning, forventet resultat, faktisk observasjon, metode/verktøy, evidens og eventuell gjenstående test i [testplanen](testplan.json). Dette betyr ikke at alle 48 tester kunne fullføres. Arbeidsfordeling: **20 K, 11 I, 15 U og 2 B**. Ingen samsvarsprosent er beregnet. Samlet samsvar er ikke ferdig vurdert.

To nye PDF-avvik er bekreftet: **A11Y-04 / 1.3.1** (visuelle punktlister mangler listestruktur) og **A11Y-05 / 1.4.3** (for lav kontrast på side 5). Tidligere rettede A11Y-01, A11Y-02 og A11Y-03 beholdes som rettet i sitt opprinnelige omfang. Ny oppdagelse av andre feil under samme kriterium opphever ikke den dokumenterte rettingen av PDF-overskrifter eller tittel.

## Testomfang og nye resultater

- Alle **20 nåværende sider** er åpnet ved 1280×900, 320×740 og 844×390: **60 DOM-/layoutkontroller** uten sidebredde-overflyt, dupliserte ID-er eller manglende påviste etiketter på synlige felt. Alle hadde én h1/main og lang=nb. Det er støttebevis, ikke full HTML-/WCAG-validering.
- **160 Tab-steg**: åtte trinn etter hopp til innhold på hver av de 20 sidene. Utvalgte faktiske tastaturhandlinger på hoppelenke, animasjon, filter, nullstilling, chat og seks prisdetaljer er undersøkt. Hovedmeny/bunntekst og nettstedskart er kartlagt. Ikke alle mulige fokussekvenser og hjelpemidler er testet.
- Animasjonen pauser alle tre bevegelige deler med mellomrom, forblir pauset når fokus flyttes, og starter igjen med Enter. Faktisk redusert-bevegelse-innstilling er ikke prøvd.
- Ressurssøk uten treff viste tomtilstand; nullstilling gjenopprettet ressursene og Skill-filter endret utvalget. Et pekerforsøk med eksplisitt nullstilt starttilstand bekreftet at slipp utenfor ikke aktiverte filteret, mens vanlig klikk gjorde det.
- Chat: tomt spørsmål og to tegn viste feilmelding og feltkobling; et korrigert, syntetisk spørsmål ga ventetilstand og kildebasert veiledning **uten språkmodell**. Modal Tab-løkke og retur etter Escape er prøvd. Faktisk skjermleserannonsering er ikke verifisert. Ekstern modell, innlogging og privat innhold er ikke testet.
- Alle seks prisdetaljer er åpnet med tastatur og teksten er lest tilbake. Pristabellen rullet med høyrepil ved 320 px. Priskilder er ikke hentet på nytt i dette testoppdraget.
- **40 tekstavstandskontroller**: alle 20 sider ved to bredder med linjehøyde 1,5, avsnitt 2 em, bokstavavstand 0,12 em og ordavstand 0,16 em. Ingen sidebredde-overflyt eller maskinelle klippekandidater; utvalgte bilder og stabil chat/feiltilstand er visuelt undersøkt. Alle utfoldede pristilstander er ikke visuelt vurdert med overstyring. Test-CSS er fjernet, med identisk originalhash dokumentert. Den første chatcapture viser en pågående overgang; stabil capture med opacity=1 er lagret separat og brukt i vurderingen.
- Ny HTML-grunnkontroll av **23 eksportfiler** ga ingen kandidater i delomfanget. Ingen full lokal HTML-validator eller axe/Lighthouse var tilgjengelig. Nettleserzoom ble forsøkt uten målbar endring, og er derfor ikke rapportert som en bestått zoomtest.
- PDF-ens **syv sider** er tekst-/strukturundersøkt; side 5 og 7 er rendret på nytt. De 27 rettede overskriftsrollene og beskrivende Info-/XMP-tittel består. Øvrig PDF-leserekkefølge, alternativer og språkarv krever videre vurdering/hjelpemiddeltest.

[Originalmanifest](manifest.json) beskriver skillens automatiske HTML-/grunnkontrastkontroller. Senere nettleser-, kilde-, PDF- og supplerende kontrastkontroller er separat dokumentert i [manual-tests.json](manual-tests.json) og `raw/`. [Prosedyreøyeblikksbildet](testprosedyrer/wcag-testprosedyrer.md) og kildeindeksen er bevart fra 0.4.0.

## Bekreftede avvik og rettingsforslag

### A11Y-04 – punktlister uten semantisk listestruktur

**Krav 1.3.1, PDF-side 7. Prioritet P1, forslag.** Tre visuelle grupper inneholder punktlister, men taggtreet har ingen L/LI/Lbl/LBody eller tilsvarende listerollemapping. De aktuelle tekstene er separate P/Span/tekstbokser; gruppetitlene står ikke i en likeverdig listestruktur. Liste-/grupperelasjonen i presentasjonen er ikke programmatisk representert eller forklart som tilsvarende strukturert tekst. Dette vanskeliggjør listeidentifikasjon og navigasjon for skjermleserbrukere. Det er bekreftet gjennom sammenligning av visuell side og struktur, ikke en simulert opplesing.

**Tiltak:** bruk reelle lister og grupper i kildedokumentet og eksporter korrekt tagget PDF; alternativt tilby et fullstendig strukturert HTML-alternativ. **Retest:** sammenlign hvert punkt og tilhørende gruppe med kodingen og naviger/les listene med faktisk skjermleser i PDF-leser. Eier og frist er ikke avklart.

Evidens: [struktur for side 7](raw/pdf-page7-structure.json), [samlet PDF-inspeksjon](raw/pdf-inspection.json), [rendret side 7](../../../arkiv/skjermbilder/tilgjengelighet/2026-11-09/221027-5ce9daf9d5dc/screenshots/pdf-page-7.png).

### A11Y-05 – utilstrekkelig tekstkontrast

**Krav 1.4.3, PDF-side 5. Prioritet P1, forslag.** Vanlig grå brødtekst og bunntekst har omtrent 4,41:1 mot grønn bakgrunn (#d8d8d8/#2d6a5f), under 4,5:1. Sidetallet har omtrent 1,11:1 (#5d6a66 mot samme bakgrunn). Brødtekst er ca. 10,1 pt, bunntekst/sidetall ca. 7,22 pt; terskel for stor tekst kan ikke brukes. Fargeverdiene fra PDF-en er kryssjekket mot rendrerte piksler. Avrundede hexverdier brukes i beregningen, med rå PDF-verdier bevart. Den store marginen for sidetallet og brødtekstens mål under 4,5 er ikke avrundet til bestått.

**Tiltak:** endre farger slik at all berørt vanlig tekst når minst 4,5:1. **Retest:** eksporter/rendre på nytt og mål faktiske farger for brødtekst, bunntekst og sidetall. Eier og frist er ikke avklart.

Evidens: [tekst-/størrelsesgrupper](raw/pdf-page5-text-groups.json), [PDF-farger](raw/pdf-page5-colors.json), [pikselkontroll](raw/pdf-page5-pixels.json), [kontrastberegninger](raw/contrast-supplement.json), [rendret side 5](../../../arkiv/skjermbilder/tilgjengelighet/2026-11-09/221027-5ce9daf9d5dc/screenshots/pdf-page-5.png). [Beregning med rå PDF-fargeverdier](raw/pdf-contrast-confirmed.json) bekrefter også at begge ligger under terskelen; elementene er navngitt i resultatet.

Det finnes ikke et verifisert fullstendig tilgjengelig alternativ til vedlegget. Be om hjelp eller annet format på **khadah@nasjonalarkivet.no**. Om-siden er bare en kort omtale og ikke et kontrollert fullstendig alternativ. PDF-en er ikke endret i dette oppdraget.

## Uavklarte tester og kandidater

De **15 U-punktene** er: 1.1.1, 1.3.2, 1.3.4, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 2.2.2, 2.4.3, 2.4.7, 3.1.1, 3.1.2, 4.1.1, 4.1.2 og 4.1.3. Kravvise retestinstruksjoner står i testplanens `remaining` og prosedyreøyeblikksbildet.

- **Faktisk skjermleser**: webnavigasjon, tabeller, felt, status/chat og PDF-alternativer/leserekkefølge. DOM/AX er støttebevis. Bruk aktuell skjermleser og dokument-/nettleser; registrer faktisk navn/rolle/opplesing og endringer.
- **Faktisk 200/400 % forstørring**: utfør relevante brukerforløp ved dokumentert zoom/tekstnivå. Native zoomsnarvei endret ikke målt viewport/pixelRatio her. 320 px er ikke et zoombevis.
- **Orientering og redusert bevegelse**: prøv en fysisk enhet eller dokumentert orienteringsfunksjon, og en godkjent testinnstilling for redusert bevegelse. Ingen brukerinnstillinger er endret i dette oppdraget.
- **PDF-språk og grafikk**: katalogen har en, mange tekstspenn har nb, og H1 har ActualText uten egen språkmerking. Vurder effektivt språk og opplesing; dette er ikke registrert som nytt språkbrudd alene. Dekor/meningsbærende figurer og diagramalternativer er ikke ferdig vurdert.
- **Automatisk prisaldervarsel**: kildekoden kan vise et varsel ved passering av sju dager, kontrollert hver time. Relevansen/betjeningen under 2.2.2 er uavklart og ikke testet ved tidsgrensen. Ingen bekreftet feil er utledet bare fra setInterval.
- **Full kode-/kontrast-/visuell kontroll**: lokal HTML-validator mangler; øvrige PDF-/webflater, alle relevante tilstander og tekstavstandsvarianter må fullføres. Et testverktøys manglende støtte er ikke i seg selv et kravbrudd.

## Hvorfor statusfordelingen er endret

Tidligere 26 K / 10 I / 12 U / 0 B var delgrunnlag før denne kravvise gjennomgangen. Nye funn flytter 1.3.1 og 1.4.3 fra U til B. Mer detaljerte prosedyrer gjør 1.3.4, 2.2.2, 3.1.1, 3.1.2 og 4.1.1 uavklart i samlet aktuelt omfang. 2.5.1 er nå I fordi det ikke finnes flerfinger-/stibaserte appfunksjoner, i stedet for tidligere K. Dette er en presisering av dekning, ikke en prosentvis måling av forbedring eller forverring. Tidligere bekreftede rettinger og opprinnelige råfiler er bevart.

## Kilder, omfang og ansvar

[Uu-tilsynets kravoversikt](https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86), [vurdering og erklæring](https://www.uutilsynet.no/tilgjengelighetserklaering/korleis-lage-og-oppdatere-tilgjengelegheitserklaering/1131), [informasjon og relasjoner](https://www.uutilsynet.no/wcag-standarden/131-informasjon-og-relasjoner-niva/90) og [kontrast](https://www.uutilsynet.no/wcag-standarden/143-kontrast-minimum-niva-aa/95) ble kontrollert 9. november 2026. Øvrige kravvise kilder er videreført fra skillens kildekontroll samme dag; se [kildekontroll](raw/source-checks.json) og snapshotindeksen. Ingen ny juridisk avgrensning eller unntak basert på uforholdsmessig byrde er gjort.

Nettlesermiljøet er macOS/IAB og lokal Next.js-utvikling. Utviklingsindikatoren er ikke regnet som en produktfunksjon; Pages-eksporten er kontrollert separat. Juridiske registreringsopplysninger, endelig nettadresse, godkjenner og oppfølgingsansvar er fortsatt uavklart. Kontaktadressen er tidligere bekreftet. Ingen innlogging, faktisk produksjon, ekstern modellgenerering, registrering, publisering eller commit er utført.

## Historikk

[Forrige PDF-retest](../210420-07c855b7770e/testrapport.md), [tidligere matrise](raw/previous-WCAG-KONTROLL.md), [tidligere erklæring](raw/previous-TILGJENGELIGHETSERKLAERING.md). Se også [full kravmatrise](wcag-grunnlag.json) og [faktiske manuelle observasjoner](raw/manual-interactions.json). Den korte brukerrettede erklæringen oppdateres med åpne barrierer og vesentlig usikkerhet; tekniske testtall og arbeidshistorikk blir i rapportene.

## Etterkontroll av dokument- og sideoppdatering

48 prosjekttester og Pages-produksjonsbygg med TypeScript bestod. Ny HTML-grunnkontroll av 23 eksportfiler ga ingen kandidater. Alle 48 planrader har forventet/faktisk resultat og eksisterende evidens, og statusfordelingen er kontrollert. Relative dokumentlenker er kontrollert i `raw/document-consistency.json`. Den bygde og levende erklæringen viser de to PDF-barrierene, kontakt og uavklart samsvar uten interne funn-/kjørings-ID-er. Desktop og 320 px visning er lest tilbake; ingen sidebredde-overflyt på den nye erklæringssiden. [Skjermbilde](../../../arkiv/skjermbilder/tilgjengelighet/2026-11-09/221027-5ce9daf9d5dc/screenshots/updated-declaration.png) og `raw/declaration-browser-verification.json` er lagret.

Prettier og `git diff --check` er brukt på endrede dokument-/kildefiler; rålogger beholder terminalkontrolltegn. PDF-ens SHA-256 er uendret gjennom oppdraget, og den midlertidige tekstavstandsoverstyringen er fjernet. Ingen av utviklingskontrollene er en tilgjengelighetsgodkjenning.
