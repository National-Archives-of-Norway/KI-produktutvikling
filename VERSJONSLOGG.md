# Versjonslogg

Endringer i KI-Produktutvikling føres her, med dato, utførende agent, kontrollresultat og Git-referanse. Nyeste endringer står først. Loggen beskriver prosjektversjoner; en oppføring betyr ikke at nettstedet er publisert.

«Agent» betyr kodeassistenten som utførte arbeidet. Git-forfatteren registreres separat av Git og kan være personen som oppretter commiten. Eksakt modellvariant er ikke registrert for tidligere arbeid og oppgis derfor ikke. Ingen underagenter ble brukt til kvalitetskontrollen eller opprettelsen av denne loggen.

## Ikke utgitt – rettet PDF-overskrifter og dokumenttittel – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.3.0 og PDF-skillen. Ingen underagenter.

- Rettet A11Y-02 ved å gi de kartlagte PDF-overskriftene reelle roller: én H1, seks H2 og 20 H3. Eksisterende tekst-/MCID-koblinger er beholdt. Rettet A11Y-03 med beskrivende norsk tittel i både Info og XMP og beholdt visning av dokumenttittel. PDF 1.7, sideinnhold, tekst og visuell utforming er bevart; filstørrelsen i felles Om-innhold er oppdatert til 127 kB.
- Ny datert retest: `docs/tilgjengelighet/2026-11-09/210420-07c855b7770e/`. Uavhengig kontroll bekrefter 27 overskriftsroller, 229 MCID-koblinger, riktig tittel begge steder og pikselidentisk rendering/tekst/innholdsstrøm på alle syv sider. Original PDF, reparasjonsskript, retestskript og råresultater er arkivert. Et første ugyldig XMP-skriveforsøk ble fanget, dokumentert og korrigert før endelig retest.
- Oppdatert kravmatrise, testresultater, erklæringsutkast og portalens erklæringsside, funksjonsregister, README, kvalitetskontroll og utviklingsplan. Begge konkrete PDF-avvik er rettet og struktur-/metadataretestet. Ny arbeidsfordeling: 26 K / 10 I / 12 U / 0 B, ikke samsvarsprosent. 1.3.1 er B→U fordi øvrig PDF-semantikk og faktisk skjermleserbruk fortsatt er uavklart; 2.4.2 er B→K. Tidligere 11 U-punkter er bevart.
- Begrensning: Ingen faktisk skjermlesernavigasjon, full PDF/UA-validering, produksjonsgodkjenning, registrering, publisering eller commit. Redigerbar presentasjonskilde finnes ikke i prosjektet; ved ny eksport må også kildens overskriftsstiler/tittel rettes.
- Kontroll av side-/dokumentoppdateringen: 48 prosjekttester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll av 23 eksportfiler bestod uten kandidater i delomfanget. Den eksporterte PDF-en er byteidentisk med den reparerte kildefilen. 48 unike kriterier, statusfordeling og 82 relative dokumentlenker er kontrollert. Oppdatert erklæring er lest tilbake i nettleser og skjermbilde lagret. Prettier og `git diff --check` er kontrollert for endrede dokument-/kildefiler; rå bygglogger er bevart med opprinnelige terminalkontrolltegn. Bygg-/enhetstester er utviklingsverifisering, ikke tilgjengelighetsgodkjenning.

## Ikke utgitt – videre lokal tilgjengelighetskontroll – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.3.0 og PDF-skillen. Ingen underagenter.

- Lagret ny oppfølging mot commit `67108ac` i `docs/tilgjengelighet/2026-11-09/205326-389241d1fd6e/`. Undersøkt syv PDF-sider med rendering, struktur-/metadata-/tekstuttrekk, seks supplerende kontrastpar, 40 Tab-steg på fire sider og åtte i chat, samt chatfeltfokus ved 320 px. Alle valgte kontrastterskler er oppfylt; ingen nye bekreftede webfunn i dette delomfanget.
- Bekreftet to PDF-avvik: A11Y-02 / 1.3.1 (synlige overskrifter uten semantiske overskriftsroller) og A11Y-03 / 2.4.2 (generisk dokumenttittel). Rettingsforslag, konsekvenser og reteststeg er dokumentert; PDF-en er ikke endret. Tidligere språkavvik A11Y-01 forblir lukket.
- Oppdatert testprotokoll, full 48-punkts matrise, erklæringsutkast, lokal erklæringsside, funksjonsregister, README, kvalitetskontroll og utviklingsplan. Tidligere evidens og manifest er bevart. Ny arbeidsfordeling er 25 K / 10 I / 11 U / 2 B, ikke en samsvarsprosent. 1.4.5 er undersøkt også i PDF-en; 1.3.1 og 2.4.2 inkluderer nå PDF-funn.
- Begrensning: Zoomsnarveien endret ikke målt visning. Ingen faktisk skjermleser, verifisert 200/400 % zoom, systeminnstilling for redusert bevegelse eller full automatisk WCAG-skanning. OS-innstillinger er ikke endret; viewport er nullstilt. Samlet samsvar er fortsatt uavklart. Ingen publisering, registrering eller commit.
- Kontroll av dokument- og sideendringene: 48 prosjekttester bestod; Pages-produksjonsbygg med TypeScript bestod. Ny HTML-grunnkontroll av 23 eksportfiler ga ingen kandidater. Prettier og `git diff --check` bestod for de endrede dokument-/kildefilene; 48 unike kriterier, statusfordeling og 73 relative dokumentlenker er kontrollert. Erklæringen er lest tilbake i nettleser og skjermbilde lagret. Bygg-/enhetstester er utviklingsverifisering, ikke tilgjengelighetsgodkjenning. Rå bygglogg er bevart med opprinnelige terminalkontrolltegn.

## Ikke utgitt – rettet språkavvik i prisoppdateringen – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.3.0 for retest og erklæringsoppdatering. Ingen underagenter.

- Rettet A11Y-01 ved å generere norske vilkår fra kjente Copilot-/Codex-felt i innhentingsparseren. Minstekrav til brukere, kredittall, fra-pris og betalingsintervall bevares. Ukjent vilkårsformat avvises, og oppdateringsflyten beholder tidligere norsk tekst i stedet for å kopiere nye engelske setninger inn på siden.
- Kjørt virkelig prisoppdatering mot alle seks kilder: 26 rader, uendrede numeriske priser og oppdaterte kontrolltidspunkter. Retestet alle seks utvidede vilkårsseksjoner i nettleser. Tre nye regresjonstester kontrollerer gjentatt oppdatering/JSON-lagring, endrede kildetall og ukjent format. De kjøres også av den eksisterende prisarbeidsflyten.
- Lagret ny målrettet retest i `docs/tilgjengelighet/2026-11-09/203914-cf2e80bc00f7/`, med tidligere funn bevart i den brede kjøringen. Oppdatert matrise og erklæring viser avviket som rettet og retestet; øvrige 13 U er videreført. Arbeidsfordeling: 25 K, 10 I, 13 U og 0 B, ikke en samsvarsprosent.
- Oppdatert lokal erklæringsside, funksjonsregister, README, kvalitetskontroll og utviklingsplan. Samlet samsvar er fortsatt uavklart. Ingen faktisk skjermleseropplesing, GitHub-kjøring, registrering, publisering eller commit er utført.
- Kontroll: Alle 48 prosjekttester (inkludert åtte prisparsertester), produksjonsbygg med TypeScript, Pages-bygg, skillens HTML-grunnkontroll, Prettier og `git diff --check` bestod. Bygget prisside og erklæring, 48 unike kriterier og 30 relative dokumentlenker er kontrollert. Prisarbeidsflytens testkommando er kjørt lokalt med åtte beståtte tester; ingen GitHub-kjøring er påstått.

## Ikke utgitt – oppdaterte prisdata – 9.11.2026

**Utførende:** Prisoppdateringsskriptet (pricing:sync).

- Oppdatert lagrede prisrader fra offisielle kilder; kilde og tidspunkt følger hver gruppe. Mislykkede kilder beholder forrige kontrollerte rader.
- Automatisk parsing er utført, ikke faglig godkjenning eller kontroll av en virksomhetsavtale. Se kildestatus på prissiden.

## Ikke utgitt – ny tilgjengelighetskontroll og erklæringsoppdatering – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.3.0. Ingen underagenter.

- Gjennomført ny avgrenset kontroll mot commit `c622090`, inkludert alle 20 HTML-sider og animasjonen. Lagret råresultater, originalmanifest, skjermbilder og etterfølgende manuelle observasjoner i `docs/tilgjengelighet/2026-11-09/201443-73cb0a3e52e0/`. Tidligere resultater er bevart.
- 23 HTML-eksportfiler uten kandidater i skillens grunnkontroll; 60 responsive DOM-kontroller og 40 tekstavstandskontroller uten sidebredde-overflyt. Utvalgte tastaturforløp, pristabeller, animasjon, dialog/validering og tre kontrastpar er undersøkt. En etikettkandidat ble avvist som et skjult MUI-målefelt etter inspeksjon. Midlertidig test-CSS er fjernet.
- Dokumentert ett bekreftet brudd, A11Y-01 / 3.1.2: engelske prisvilkår mangler språkmerking. Ingen produktfeil er rettet; rettingsforslag og retestinstruksjon er lagret. Tidligere «ikke relevant» for 2.2.2 er erstattet av faktisk pause-/starttest.
- Oppdatert hovedrapport, 48-punkts matrise, erklæringsgrunnlag, lokal erklæringsside, funksjonsregister, README, kvalitetskontroll og utviklingsplan. Ny arbeidsfordeling er 24 K, 10 I, 13 U og 1 B; dette er ikke en samsvarsprosent. Juridiske virksomhetsopplysninger/godkjenner er fortsatt uavklart. Bekreftet kontakt beholdes.
- Samlet samsvar er ikke ferdig vurdert. Faktisk skjermleser, zoom, PDF, flere nettlesere, alle kontrast-/fokustilstander og redusert-bevegelse-innstilling gjenstår. Ingen axe/Lighthouse, faktisk modellgenerering, registrering, publisering eller commit er utført i testoppdraget.
- Kontroll av dokumentoppdateringen: Alle 45 prosjekt-/parser-/RAG-tester, produksjonsbygg med TypeScript, Pages-bygg, Prettier og `git diff --check` bestod. 48 unike kriterier, statusfordeling, lagrede resultater og fjernet test-CSS er kontrollert. Oppdatert erklæring er lest tilbake i nettleseren. Bygg-/enhetstester er separat utviklingsverifisering, ikke en tilgjengelighetsgodkjenning.

## Ikke utgitt – styr animasjonen ved klikk på illustrasjonen – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Fjernet den synlige pause-/startknappen og gjort selve illustrasjonen til en knapp som veksler mellom pause og start. Skjermlesernavnet beskriver neste handling, og Enter/mellomrom støttes gjennom en vanlig HTML-knapp. Redusert bevegelse respekteres fortsatt.
- Fjernet kontrollens ekstra avstand og oppdatert funksjonsregister og utviklingsplan.
- Kontroll: Lokal nettleser bekreftet pause og start ved gjentatte klikk, med animation-play-state paused/running. Mellomrom pauset og Enter startet igjen. Klikkflaten ligger over de dekorative tekstflatene. Produksjonsbygg med TypeScript, Prettier og `git diff --check` bestod.

## Ikke utgitt – rolig animasjon i forsideillustrasjonen – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Lagt til rolige bevegelser frem og tilbake for de to lyspunktene langs ytterkanten, og svært langsom rotasjon av den stiplede ringen. Logo og hovedringer beholder sin plassering.
- Flyttet illustrasjonen til en egen komponent med pause-/startknapp. Ved redusert bevegelse slås animasjonen av og kontrollen skjules. Animasjonen bruker CSS-transformasjoner; ingen eksterne ressurser eller avhengigheter.
- Oppdatert funksjonsregister og utviklingsplan.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Lokal nettleser viste aktive transformasjoner; pauseknappen satte både punkter og ring til paused og kunne starte dem igjen. Regelen for redusert bevegelse er kontrollert i CSS, ikke med endret systeminnstilling. Ingen full tilgjengelighetsrevisjon er utført.

## Ikke utgitt – MCP-oversikt under Oversikt – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Opprettet `/oversikt/godkjente-mcper/` med Atlassian MCP som «ROS-analyse pågår» og Slack MCP som «Planlagt», basert på brukerens opplysning. Ingen av dem er merket godkjent, og ingen tilkobling eller tilgang er aktivert.
- Lagt til inngang fra Oversikt og retningslinjene. Nettsiden, Spør KI og funksjonsregisteret bruker felles innhold; nettstedskartet tar med ruten. README og utviklingsplan er oppdatert.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Bygget HTML er kontrollert for begge statuser og lenken fra Oversikt. Prettier og `git diff --check` bestod. Ingen ROS-analyse, full tilgjengelighetsrevisjon eller utrulling er utført.

## Ikke utgitt – fjernet Priser fra bunnteksten – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Fjernet den direkte Priser-lenken fra bunnteksten. Prissiden finnes fortsatt via Oversikt og nettstedskartet. README er avstemt med den nye navigasjonen.
- Kontroll: Lenkeendringen er lest tilbake. Prettier og `git diff --check` bestod. Ingen funksjonalitet eller produksjonsstatus er endret.

## Ikke utgitt – Godkjente KI-assistenter under Oversikt – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Opprettet `/oversikt/godkjente-ki-assistenter/` med Copilot, Claude AI og Codex som godkjente assistenter i Nasjonalarkivet etter brukerens opplysning. Ingen bestemt konto, lisens, modell, integrasjon eller datakategori er gitt godkjenning på dette grunnlaget.
- Lagt inngang under Oversikt etter priser og abonnement, og oppdatert aktiv overordnet navigasjon, retningslinjer, nettstedskart, Spør KI, README og utviklingsplan. Beskrivelser og godkjenningsstatus vedlikeholdes i felles innholdskilde.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Bygget HTML er kontrollert for de tre godkjente assistentene, inngang fra Oversikt og aktivt overordnet menypunkt. Prettier og `git diff --check` bestod. Ingen ny full tilgjengelighetsrevisjon eller utrulling.

## Ikke utgitt – pålitelig ankerlenke til ressurskatalogen – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Endret PortalButton til å bruke nettleserens vanlige anker for lenker til en seksjon på samme side. «Utforsk ressursene» hopper dermed til ressurskatalogen også når `#ressurser` allerede står i adressen. Lenker til andre sider bruker fortsatt Next.js Link.
- Kontroll: Gjentatt klikk med `#ressurser` allerede i adressen er kontrollert i lokal nettleser: siden startet på toppen, og katalogen endte 48 px fra toppen av visningen. Produksjonsbygg med TypeScript, Prettier og `git diff --check` bestod. Ingen full tilgjengelighetsrevisjon er utført.

## Ikke utgitt – Ressurskatalog og tydeligere introduksjon – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Endret Verktøykatalog til Ressurskatalog i meny, katalogmerking, funksjonsregister og henvisninger fra øvrige sider. Nettstedskart og Spør KI følger registeret og felles innhold.
- Satt seksjonsoverskriften til «Finn en ressurs», med beskrivelsen «Skills, instruksjoner og prompter som hjelper deg å bruke KI i produktutviklingen.» Navn og introduksjon ligger i felles `src/content/catalog.ts`. Forsidens handlingslenke heter nå «Utforsk ressursene».
- Beholdt nettadresse og søk/filtrering. Oppdatert README og utviklingsplan; historiske rapporter og tidligere loggoppføringer er bevart.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Navn, overskrift og beskrivelse er kontrollert i bygget HTML; tekstsøk finner ingen rester av Verktøykatalog i gjeldende `src`-innhold. Prettier og `git diff --check` bestod.

## Ikke utgitt – Oversikt som inngang til priser – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Opprettet `/oversikt/` med priser og abonnement som første del, og modelloversikt og forbruk som tydelig planlagte utvidelser. Prisene beholdes på `/priser/`; ingen priskopier eller simulerte bruksdata er innført.
- Lagt Oversikt mellom Verktøykatalog og Spør KI i hovedmenyen og i bunnteksten. På prissiden markeres Oversikt som overordnet menypunkt, med brødsmulesti tilbake.
- Siden, Spør KI og funksjonsregisteret henter beskrivelser og planlagt status fra felles innhold. README og utviklingsplan er oppdatert.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Byggkontrollen validerer den nye ruten mot funksjonsregisteret. Ingen ny full tilgjengelighetskontroll eller utrulling er gjennomført.

## Ikke utgitt – prisside og automatisk prisinnhenting – 9. november 2026

**Utførende agent:** Codex (OpenAI), med OpenAI Docs for offisielle Codex-kilder. Ingen underagenter.

- Opprettet `/priser/` i portalens design, med abonnement og tydelig separate direkte API-priser og Copilot-tokenpriser. Viser utvalgte planer/modeller, kontekst, cache-satser, vilkår, kilde og siste vellykkede kontroll. Fra-pris og årsbetaling er særskilt markert. Siden er lenket i bunnteksten og registrert som Beta.
- Hentet seks offisielle kilder 9. november 2026 og lagret felles prisgrunnlag for nettsiden og Spør KI. HTTP-/parsefeil bevarer gamle rader og vellykket dato, med ny feilstatus og forsøksdato. Gamle kontroller varsles etter sju dager i nettleseren.
- Klargjort daglig GitHub Actions-jobb med parserregresjonstester og PR for prisfil og eventuell automatisk versjonslogg. Bare dette repoets kortlivede token brukes; ingen modellnøkler eller tilgang til andre repoer. Eksisterende åpen pris-PR overskrives ikke. Oppdateringsskriptet loggfører endrede prisrader.
- Oppdatert README, utviklingsplan, funksjonsregister og felles RAG-kilde. Testkommandoen inkluderer nå prisparserne.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Reell kildeinnhenting lyktes for alle seks grupper. Lokal nettleser viser seks tabeller, kilde/dato, bunntekstlenke og fungerende seksjonssnarvei; ingen sidebredde-overflyt observert ved 523 px. Ingen full tilgjengelighetsrevisjon er utført.
- Begrensning: Repoet har ingen remote; arbeidsflyten er ikke kjørt på GitHub og ingen automatisk utrulling er aktivert. Oppdateringer krever gjennomgang/sammenslåing og nytt bygg/utrulling. Dette er listepriser, ikke virksomhetsavtaler eller verktøygodkjenninger. Nye modeller legges ikke til automatisk.

## Ikke utgitt – oppdaterte prisdata – 9.11.2026

**Utførende:** Prisoppdateringsskriptet (pricing:sync).

- Oppdatert lagrede prisrader fra offisielle kilder; kilde og tidspunkt følger hver gruppe. Mislykkede kilder beholder forrige kontrollerte rader.
- Automatisk parsing er utført, ikke faglig godkjenning eller kontroll av en virksomhetsavtale. Se kildestatus på prissiden.

## Ikke utgitt – personvernerklæring for portalen – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `personvernerklaering` 0.1.0. Ingen underagenter.

- Kartlagt katalog, chat, valgfri modellkobling og lokale nettleserobservasjoner. Lagret manifest, behandlingsoversikt, sanitert evidens, rapport og datert erklæringsutkast i `docs/personvern/2026-11-09/161600-a3368ac30b20/`. Ingen hemmelige miljøverdier eller rå chatspørsmål er innhentet.
- Opprettet `/personvern/` med lenke i bunnteksten og bekreftet personvernkontakt khadah@nasjonalarkivet.no. Nettsiden og Spør KI bruker samme innholdskilde. Funksjonsregister og nettstedskart viser siden, med eksplisitt utkaststatus.
- Gitt felles innholdssider et statusfelt og støtte for e-postlenker i artikkelvisningen. Retningslinjenes eksisterende utkaststatus er bevart. Oppdatert README og utviklingsplan; P9 er fortsatt åpent.
- Lokal helseside viste deaktivert modellgenerering. Nettleserlagring kunne ikke undersøkes fullstendig; dette er ikke bevis for fravær av cookies eller logger. Behandlingsansvarlig, personvernombud, rettsgrunnlag, leverandøravtaler, overføringer og lagring må bekreftes. Primærveiledning fra Datatilsynet og Nkom er brukt, med Digdir som strukturinspirasjon. Ingen juridisk godkjenning eller publisering.
- Kontroll: Alle 39 portaltester og produksjonsbygg med TypeScript bestod. Bygget HTML har riktig tittel, utkastmerking, e-postlenke og lenke fra forsiden. Prettier og `git diff --check` bestod. Ingen ny full tilgjengelighetsrevisjon, visuell nettleserkontroll av erklæringssiden eller produksjonskontroll er utført.

## Ikke utgitt – personvernskill i bibliotek og katalog – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator`. Ingen underagenter.

- Opprettet personvernerklaering 0.1.0 i Skills-biblioteket og installert en lik kopi i assistentens skill-katalog. Samme hovedoppsett som tilgjengelighetsskillen: instrukser, agentmetadata, maler, faglige referanser og datert lagring i målprosjektet.
- Lagt til Beta-ressursen «Kartlegg personvern og utform erklæring», søkbar i katalogen og Spør KI. Detaljsidene henter nå skillenes egne beskrivelser og begrensninger fra ressursdata, slik at personvern ikke får tilgjengelighetsspesifikk tekst.
- Oppdatert README og utviklingsplanen. Kildegrunnlaget omfatter Digdirs eksempel, Datatilsynets veiledning og Nkom. Skillen bevarer uavklarte opplysninger og gir ingen automatisk juridisk godkjenning.
- Hjelpeskriptet oppretter bare en arbeidsmappe og foreløpige filer, ikke en ferdig kartlegging eller publisert erklæring. Ingen personvernerklæring for portalen er utformet som del av dette oppdraget.
- Kontroll: Skill-validering bestod for kilde og installasjon; alle ti pakkefiler er identiske, og lokale referanser finnes. Alle 21 bibliotekstester (inkludert seks nye), 38 portaltester og produksjonsbygg med TypeScript bestod. Bygget detaljside har riktig versjon/Beta-status og egne begrensninger, uten feil omtale av WCAG/uustatus.

## Ikke utgitt – fjernet prototypetekst i bunnteksten – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Fjernet «Lokal prototype · under utprøving» fra den felles bunnteksten etter ønske. Dette endrer ikke funksjonsstatus eller produksjonskrav i utviklingsplanen.
- Kontroll: Prettier og `git diff --check` bestod.

## Ikke utgitt – utviklingsplan i bunnteksten – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til Utviklingsplan i bunnteksten, nettstedskartet og funksjonsregisteret, med en lesbar side på `/utviklingsplan/`.
- Siden bygges direkte fra `UTVIKLINGSPLAN.md`. Planen og versjonsloggen bruker en felles dokumentvisning med overskrifter, lister, lenker, oppgavestatus og tabeller som kan rulles på smale skjermer. Ingen separat plankopi vedlikeholdes.
- Oppdatert README og planen med hvor nettsiden finnes og når endringer blir synlige.
- Kontroll: Alle 36 tester og produksjonsbygg med TypeScript bestod. Bunntekstlenke, hovedoverskrifter for begge dokumentene og fem tabeller med samsvarende kolonnetall er kontrollert i bygget HTML. Ingen ny full tilgjengelighetsrevisjon er utført.

## Ikke utgitt – avstemt utviklingsplan og produksjonskrav – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Oppdatert utviklingsplanens leveranser og åtte faser mot kode, dokumentasjon og commit `e93e5f9`, inkludert felles innhold, Spør KI, eksternt modell-API, Skills-bibliotek, oversikter og forside/navigasjon.
- Endret første delte leveranse fra offentlig Pages-demo til lukket pilot. Tydeliggjort krav P1–P10 for tilgang, drift, produksjonsruting/Origin, CI, modellverifisering, API-vern, innhold, tilgjengelighet og forvaltning.
- Skilt mellom implementert kode, simulerte tester, reelt verifisert drift og produksjonsgodkjenning. Tidligere datostemplet historikk er bevart som historikk.
- Lagt til vedlikeholdsregel i AGENTS.md og README om oppdatering av plan, berørte faser og produksjonskrav i samme arbeidsøkt som vesentlige endringer. Ingen periodisk jobb eller automatisk produksjonsgodkjenning er innført.
- Kontroll: 13 lokale dokumentlenker, produksjonskrav P1–P10, bevart historikk og uendrede Next.js-instruksjoner er kontrollert. Prettier og `git diff --check` bestod. Dette er en dokumentasjonsoppdatering; ingen nye funksjonstester eller utrullinger er gjennomført.

## Ikke utgitt – menyrekkefølge og lenke til retningslinjer – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Endret hovedmenyen til Kom i gang → Retningslinjer → Verktøykatalog → Spør KI → Om, slik at oppstart og rammer kommer før verktøy og assistent.
- Lagt til en tydelig «Før du begynner»-henvisning tidlig i Kom i gang, med lenke til retningslinjene og presisering av utkaststatus. Teksten ligger i felles innholdskilde og inngår også i RAG-grunnlaget.
- Kontroll: TypeScript, Prettier og `git diff --check` bestod. Rekkefølgen, aktivt menypunkt og henvisningen er kontrollert i lokal nettleser. Lokalmiljøet ble startet for forhåndsvisningen.

## Ikke utgitt – invitasjon til KI-prat – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til en invitasjon i den felles Om-teksten for dem som jobber med produktutvikling eller utvikling av løsninger i Nasjonalarkivet, med oppfordring om å kontakte AI enablement-teamet for å delta.
- Samme avsnitt brukes i Spør KIs veiledning om KI-prat. Ingen ubekreftet e-postadresse eller Teams-lenke er lagt til.
- Kontroll: Alle åtte tester av felles innhold og funksjonsregister, Prettier og `git diff --check` bestod.

## Ikke utgitt – tydeligere innganger og anbefalt prøveoppgave – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Endret Lær/Prøv/Del til «Kom i gang med KI», «Finn en ressurs til oppgaven» og «Del erfaringer i KI-prat», med lenker til oppstartsveiledningen, katalogen og KI-prat.
- Erstattet det gjentakende Første steg-feltet med «Prøv i praksis» og ressursen «Utforsk et brukerbehov». Tittel, beskrivelse og lenke hentes fra ressurskilden; valget av anbefaling og snarveiene ligger i `src/content/home.ts`.
- Gjort ressursens felles beskrivelse mer konkret om intervjuspørsmål og brukerinnsikt. Samme tekst brukes på forside, i katalogen, på detaljsiden og i Spør KI.
- Redusert luft og høyde i anbefalingsfeltet, bevart portalens uttrykk og oppdatert funksjonsregisteret og README. En anbefaling til en manglende ressurs gir feil ved oppstart/bygging.
- Kontroll: Alle 36 tester og produksjonsbygg med TypeScript bestod. De tre inngangene, anbefalingens tekst og lenke og det mer kompakte feltet er kontrollert i lokal nettleser. Ingen ny full tilgjengelighetsrevisjon er utført.

## Ikke utgitt – automatisk funksjonalitetsoversikt – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Opprettet `/funksjonalitet/` med lenke fra bunnteksten og nettstedskartet, og tydelig skille mellom tilgjengelig funksjonalitet, Beta/utkast, modelloppsett og uimplementert tilgangsstyring.
- Samlet funksjonsdefinisjoner i `src/content/features.ts`. Oversikten, nettstedskartet og Spør KI bruker samme register; ressursantall, KI-prat og beskrivelser av innholdssidene avledes av gjeldende innholdsdata.
- Lagt til kontroll i Next.js-konfigurasjonen ved oppstart og bygging som avviser uregistrerte eller slettede sider, duplisering og ukjente rutelenker. Dokumentert at meningsendringer og modenhetsstatus må vurderes når funksjoner endres; dette kan ikke utledes automatisk av all kode.
- Oppdatert README og AGENTS.md med vedlikeholdsregler og regresjonstester. Oversikten viser ikke hemmelig konfigurasjon eller sanntidsstatus for modelltjenesten.
- Kontroll: Alle 36 tester, TypeScript og produksjonsbygg bestod. Siden, statusene og bunntekstlenken er kontrollert i lokal nettleser. Dette er ikke en ny full tilgjengelighetsrevisjon.

## Ikke utgitt – versjonslogg i bunnteksten – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til «Versjonslogg» i den felles bunnteksten og nettstedskartet, med en lesbar side på `/versjonslogg/`.
- Siden bygges direkte fra denne filen, slik at endringer ikke trenger å vedlikeholdes i en separat kopi. Neste bygg/utrulling tar med den oppdaterte loggen.
- Kontroll: Produksjonsbygg med TypeScript bestod. Bunntekstlenken ble funnet på alle 13 sider med felles layout; Next.js sin separate globale feilside inngår ikke. Versjonsloggsiden har riktig hovedoverskrift. `git diff --check` bestod.

## Ikke utgitt – klargjort eksternt modell-API – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `openai-docs` for kontroll av API-format og nøkkelhåndtering.

- Lagt til valg mellom veiledning uten modell, lokal Ollama og et eksternt OpenAI-kompatibelt Chat Completions-API. Serveren konfigureres med `MODEL_PROVIDER`, `MODEL_API_URL`, `MODEL_NAME` og `MODEL_API_KEY`.
- Ekstern adapter bruker full konfigurert HTTPS-adresse og Bearer-header. Nøkkelen leses bare i serveroppsettet og inngår ikke i modellens meldinger, API-svar eller oppstartslogger. Ufullstendig oppsett og utrygge URL-formater avvises uten å vise innlagte verdier.
- Modellkall har timeout, følger ikke videresendinger og skjuler rå leverandør-/transportfeil. Veiledning og kilder bevares ved feil. Ollama og ekstern adapter bruker samme kildebaserte meldingsgrunnlag.
- Oppdatert `.env.example`, README og isolert synkroniseringstest. Beskrevet server-secrets, omstart, støttet API-format og begrensninger. Ingen ekstern URL, virkelig nøkkel eller leverandør er aktivert.
- Kontroll: Alle 31 tester, TypeScript, produksjonsbygg og Prettier bestod. En falsk testnøkkel satt ved bygging og variabelnavnet `MODEL_API_KEY` ble ikke funnet i 84 klient-/statiske sidefiler. HTTP-tester verifiserte at nøkkel, API-adresse og rå leverandørfeil ikke returneres til nettleseren. Isolert test av automatisk innholdsomlasting bestod. Eksterne modellkall er bare testet med simulert transport, ikke en virkelig leverandør.

## Ikke utgitt – felles innholdskilde for sider og Spør KI – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Flyttet innholdet for Kom i gang, Om (inkludert KI-prat) og Retningslinjer til `src/content/pages/`. Sidekomponentene viser innholdet gjennom en felles renderer som bevarer overskrifter, avsnitt, lister, forbehold og lenker til vedlegg.
- `knowledge.ts` avleder RAG-kilder og veiledning fra samme innhold, med referanser til avsnitts-ID-er i stedet for kopiert tekst. Manglende referanser gir feil ved bygging/testing. Om-sidens øvrige innhold inngår nå også i grunnlaget. Ressurskatalogen bruker fortsatt `resources.ts`.
- Lokalmiljøet kjører RAG med automatisk omlasting når importerte innholdsfiler endres. I produksjon skal nettsiden bygges og RAG-tjenesten startes fra samme revisjon; gamle chatmeldinger beholdes som historikk.
- Dokumentert hvor teksten vedlikeholdes og hvordan endringer kontrolleres. Lagt til regresjonstester for endret innhold, forbehold og ugyldige referanser, samt `test:content-sync` for automatisk API-omlasting i en isolert prosjektkopi.
- Kontroll: 26 tester og produksjonsbygg bestod. Alle 47 titler, ingresser og innholdsblokker ble funnet i de ferdigbygde sidene. Isolert integrasjonstest bekreftet at en endring i innholdsfilen automatisk oppdaterer RAG-tekst og veiledning. Ingen modellgenerering eller ny full tilgjengelighetsrevisjon er utført.

## Ikke utgitt – mer nyttige svar i Spør KI – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Erstatter visningen av lange kildeutdrag med en lesbar introduksjon, konkrete steg, forbehold og en direkte lenke til den mest relevante veiledningen. Uten språkmodell merkes dette tydelig som hentet veiledning, ikke et individuelt generert svar.
- Utvidet det eksplisitte kunnskapsgrunnlaget med Kom i gang, KI-prat og retningslinjeutkastet. Beta-status sendes også til en eventuell modell. Ingen private repoer eller dokumenter leses.
- Modellsvar kan vise avsnitt, lister, utheving og klikkbare kildehenvisninger uten å tolke HTML eller vilkårlige lenker. Forbedret instruksen for korte, kildebaserte svar med forbehold.
- Lagt til spørsmålsknapper, bedre veiledning ved manglende treff og rulling til starten av siste svar fremfor bunnen. Spørsmål behandles fortsatt separat.
- Oppdatert README og tester for relevante treff, Beta-/utkaststatus og validering av kildeformat og lenker. Lokal språkmodell er fortsatt ikke konfigurert; reell generering mot Ollama er ikke testet.
- Kontroll: Alle 23 tester, TypeScript, produksjonsbygg og formateringskontroll bestod. Kontrollert svar om KI-prat og verktøygodkjenning i lokal nettleser; sistnevnte beholder uavklart godkjenningsstatus. Dette er ikke en full tilgjengelighetsrevisjon. Lokalmiljøet er startet på nytt med oppdaterte kilder.

## Ikke utgitt – retningslinjeside – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Opprettet `/retningslinjer/` med veiledning om verktøy, arkivmateriale, kvalitet og agenttilgang, inspirert av NAVs side og tilpasset portalens målgruppe og design.
- Merket innholdet som arbeidsutkast, med avklaringspunkter for eierskap, godkjenninger og oppfølging. NAVs interne tillatelser er ikke overført til Nasjonalarkivet.
- Lagt til siden i hovedmenyen og nettstedskartet. Siden inngår ennå ikke i den dokumenterte tilgjengelighetsgjennomgangen eller RAG-kildene.
- Kontroll: TypeScript og `git diff --check` bestod, og de berørte kodefilene er formatert med Prettier. Ingen visuell nettleserkontroll er utført.

## Ikke utgitt – mandatforslag som vedlegg – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til den opprinnelige `ai-enablement-team.pdf` som vedlegg under omtalen av AI enablement-teamet på Om-siden, tydelig merket som mandatforslag med filtype og størrelse.
- PDF-en er kopiert uendret til `public/vedlegg/mandatforslag-ai-enablement-team.pdf` og følger nettstedet ved bygging. Ingen publisering eller ny tilgjengelighetsvurdering av PDF-en er utført.
- Kontroll: Filkopien er sammenlignet med originalen uten forskjeller. Prettier og `git diff --check` bestod.

## Ikke utgitt – KI-prat på Om-siden – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til omtale av KI-prat under «Om», basert på invitasjonsteksten: erfaringsdeling om KI, Teams-møter annenhver torsdag i opptil én time og videre diskusjon i Teams-kanalen.
- Tilpasset invitasjonen til varig informasjon på portalen; omtalen av det første møtet er utelatt.
- Presisert at KI-prat er for alle som jobber med produktutvikling i Nasjonalarkivet.
- Kontroll: Prettier og `git diff --check` bestod. Ingen funksjonalitet er endret.

## Ikke utgitt – Beta-merking av skills – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til en synlig «Beta»-etikett på skill-kortene i ressurskatalogen, med forklaring om at de ennå ikke er gjennomgått av et menneske.
- Viser samme status og forklaring på skillenes detaljsider for å gjøre modenheten tydelig også ved direkte lenking.
- Kontroll: TypeScript, Prettier for de berørte filene og `git diff --check` bestod. Ingen visuell nettleserkontroll er utført i denne endringen.

## Ikke utgitt – samlet tilgjengelighetsdokumentasjon – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Flyttet erklæringsgrunnlaget og WCAG-kontrollen fra prosjektroten til `docs/tilgjengelighet/`, sammen med den daterte testhistorikken, for å samle dokumentasjonen og rydde prosjektroten.
- Oppdatert lenkene i README, kvalitetskontrollen og utviklingsplanen, samt WCAG-kontrollens relative lenker til testresultatene. Nettsidens URL og vurderinger er uendret.
- Kontroll: Lokale Markdown-lenker i de berørte dokumentene er kontrollert mot filsystemet, og `git diff --check` er kjørt uten feil. Ingen ny tilgjengelighetstest eller publisering er utført.

## Ikke utgitt – regler for versjonslogg – 7. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt inn krav i portalens `AGENTS.md` om å oppdatere loggen ved vesentlige endringer. Next.js-instruksjonene er bevart.
- Tilsvarende regler er lagt i Skills-repoet og tilgjengelighetsskillen, med tydelig ansvar for riktig repo-/prosjektlogg.
- Oppføringer skal dokumentere endring, begrunnelse, agent/person, kontroller og begrensninger. Dette er instruksjoner, ikke en automatisk Git-kontroll.
- Kontroll: Instruksjonene er lest tilbake, og `git diff --check` er kjørt uten feil i begge repoene.

## Ikke utgitt – tilgjengelighetsskill 0.3.0 – 7. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator`. Ingen underagenter.

- Standardisert lagring av testgjennomganger i det testede prosjektets daterte mapper, med unik kjørings-ID og bevaring av tidligere evidens.
- Nytt kjøringsverktøy lagrer rådata, feil, exitkoder, tidsstempler, agent og versjon, samt foreløpige rapporter med uavklart samlet status.
- Skillen skal etter vurdering oppdatere prosjektets eksisterende rapporter, lokale erklæring, README og versjonslogg med sporbarhet til kjøringen. Ingen blind automatisk overskriving av tidligere vurderinger.
- Oppdatert bibliotekets README, lagrings-/testveiledning, maler og versjonslogg. Portalens beskrivelse og brukseksempel viser versjon 0.3.0.
- Alle 15 regresjonstester av hjelpeverktøyene bestod i isolerte testprosjekter. Dette er ikke en ny full WCAG-revisjon av portalen.

## Ikke utgitt – tilgjengelighetsskill 0.2.0 – 7. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator`. Ingen underagenter.

- Utvidet skillen i Skills-repoet fra erklæringsutforming til testing med tilgjengelige verktøy, dokumenterte funn, prioriterte rettingsforslag, retest og erklæringsgrunnlag.
- Lagt til testveiledning, rapportmal og lokale Python-hjelpere for avgrenset HTML-grunnkontroll og kontrastberegning. Kandidater, bekreftede brudd og uavklarte tester skilles fra hverandre.
- Kodeendringer i et testet nettsted krever at dette er del av brukerens oppdrag. Ingen automatisk sertifisering eller publisering innføres.
- Oppdatert portalens tittel, beskrivelse, brukssteg, søkeord, eksempel og versjonsmerking til 0.2.0. Instruksjonene er generelle for alle brukere.
- Hjelperne er kontrollert med åtte regresjonstester og prøvd mot portalens lokale HTML-eksport. Dette validerer hjelpeverktøyene, ikke full tilgjengelighet eller agentens samlede vurdering.
- Justert kildehenting slik at eksakte tittelord rangeres høyere enn prefikstreff; den utvidede skill-beskrivelsen skal ikke fortrenge kodegjennomgang for spørsmål om kodeendringer.
- Alle 21 portaltester og begge byggvariantene bestod. Beskrivelsen og versjon 0.2.0 er kontrollert i nettleseren. Skill-repoet og den installerte kopien er identiske.

## Ikke utgitt – generell brukerveiledning – 7. november 2026

**Utførende agent:** Codex (OpenAI).

- Omskrevet skillens installasjonsveiledning for alle brukere, uten antakelser om en bestemt maskin, assistent eller eksisterende installasjon.
- Brukseksemplet ber om navn eller nettadresse til brukerens nettsted.
- Erstattet «Lokal skill» med «Under utprøving» og presisert at distribusjon ennå ikke er satt opp. Ingen nedlasting eller GitHub-lenke er lovet som tilgjengelig.

## Ikke utgitt – lokalt Skills-bibliotek og katalog – 7. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Opprettet separat lokalt `Skills`-repo i `/Users/khadah/Documents/ChatGPT/Skills`, med første commit `85af197`. GitHub-tilkobling er ikke konfigurert; brukeren avklarte at repoet skulle være lokalt.
- Lagt tilgjengelighetsskillen i `skills/tilgjengelighetserklaering/`, med README og bidragsveiledning for flere skills. Den installerte Codex-kopien er beholdt.
- Lagt til søkbar katalogressurs og detaljside med versjon, brukseksempel og lokal repo-plassering.
- Katalogen søker også på nøkkelord, skill-navn og flere søkeord, uavhengig av store/små bokstaver og aksenter.
- Skilt lokale skills fra eksempelressurser i visningen. Bare godkjent beskrivende innhold inngår i klient- og RAG-data; selve skill-pakken følger ikke med i nettstedet.
- 21 tester passerer, inkludert nye søke- og kildehentingstester. Begge byggvariantene og HTML-grunnkontrollen for 13 filer bestod.
- Søk på fire relevante ord og åpning av skillens detaljside er kontrollert i nettleseren. Utviklingsmiljøet er startet på nytt for å laste nye statiske ruter og kilder.

## Ikke utgitt – oppdatert erklæringsutkast – 7. november 2026

**Utførende agent:** Codex (OpenAI), med skillen `tilgjengelighetserklaering`. Ingen underagenter.

**Status:** Lokale endringer; ikke committet eller publisert.

- Tilpasset tilgjengelighetssiden og erklæringsgrunnlaget til skillens arbeidsmal og kontrollert veiledning hos Uu-tilsynet.
- Presisert hvilke ni sider testgrunnlaget gjelder, alternative veier til innholdet og kontaktoppfølging som fortsatt må avklares.
- Skilt testdato 6. november fra tekstoppdatering og kildekontroll 7. november. Ingen ny WCAG-revisjon eller nye testresultater er påstått.
- Dokumentert de åtte uavklarte kriteriene og betydningen av arbeidskodene K/I/U. Utkastet er ikke klart til formell registrering.
- Kontaktadressen fra prosjekteier er beholdt. Juridiske registreringsopplysninger, endelig nettadresse og godkjenner er fortsatt uavklart.
- Produksjonsbygg bestod. Den oppdaterte siden er kontrollert visuelt; skjermbilde ligger i `docs/tilgjengelighet/2026-11-07/`. Dette er tekst-/visningskontroll, ikke en ny full WCAG-test.

## Ikke utgitt – utvidet tilgjengelighetskontroll – 6. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

**Status:** Lokale endringer på grunnlag av `f055757`. Ikke committet eller publisert.

- Vurderingsmatrise for 48 WCAG-krav med avgrensede kontroller og uavklarte punkter.
- Tilgjengelighetsside og nettstedskart med lenker fra alle siders bunntekst.
- Grunnlag for formell erklæring i uustatus.no, kontaktadressen oppgitt av brukeren og informasjon om klage. Ingen formell erklæring registrert.
- Forbedret kantkontrast, feilmeldinger, tastaturfokus og kildevisning i chatten. Bedre linjebryting og støtte for redusert bevegelse.
- To kontrasttester og grunnkontroll av eksportert HTML. Alle 18 tester, begge byggvarianter og HTML-kontrollen bestod.
- Ni sider kontrollert ved tre skjermstørrelser, tekstavstander prøvd på åtte sider og chat. Evidens i `docs/tilgjengelighet/2026-11-06/`.
- Samlet samsvar kan ikke bekreftes før gjenstående skjermleser-, zoom- og manuelle kontroller er utført.

## Dokumentasjon og tilgjengelighetsrettinger – 6. november 2026

**Status:** Committet lokalt som `f055757`; ikke publisert.

**Utførende agent:** Codex (OpenAI), i prosjektets eksisterende chat.

### Endret

- Oppdatert utviklingsplanens faseoversikt og oppgaver mot faktisk implementasjon og lokal Git-historikk.
- Opprettet `KVALITETSKONTROLL.md` med utførte kontroller, funn og gjenstående arbeid.
- Opprettet denne versjonsloggen og lenket den fra README.

### Rettet

- «Hopp til innhold» flytter nå tastaturfokus til hovedinnholdet.
- Utvidet fokusmarkering til tekstområder, utfellbare kilder og hovedinnhold.
- Fjernet duplisert ID i chatdialogen, slik at dialogens tittel identifiseres entydig.
- Gitt menylenker og utfellbare kilder minst 44 pikslers høyde.
- Reservert plass i bunnteksten under den flytende chatknappen.
- Markert eksisterende myk rulling med Next.js-attributtet `data-scroll-behavior`.

### Kontrollert

- Forsiden visuelt ved 320, 390 og 1280 pikslers bredde; alle seks undersider kontrollert for horisontal overflyt ved 320 piksler.
- Interne lenkemål, katalogsøk, tomtilstand, nullstilling og typefilter.
- Chat med kildeutdrag, kildelenke, Escape-lukking, retur av fokus og entydig dialogtittel.
- Alle 16 eksisterende tester, vanlig produksjonsbygg, Pages-bygg og formateringskontroll bestod etter kodeendringene.
- Skjermleser, zoom, full kontrastkontroll og flere nettlesere gjenstår. Se [kontrollrapporten](KVALITETSKONTROLL.md).

**Git-referanse:** `f055757`, bygger på `ed873b7`.

## 0.1.0 – første lokale versjon – 6. november 2026

**Status:** Lagret i lokal Git. Ikke publisert. Versjonsnummeret følger `package.json`.

**Utførende agent:** Codex (OpenAI), basert på arbeid dokumentert i prosjektets chat og utviklingsplan.

**Git-referanse:** `ed873b7` – «Første versjon av KI-Produktutvikling».

Implementasjonen ble i hovedsak dokumentert 30. oktober 2026; 6. november er datoen for den første commiten.

### Lagt til

- Lokal Next.js-portal med TypeScript og separat statisk Pages-bygg.
- Digitalarkivets MUI-tema med portalens eget futuristiske uttrykk, arklogo og favicon.
- Forside, verktøykatalog med søk og filtre, tre ressursdetaljer, Kom i gang og Om.
- Chat på forsiden og egen spørreside, offentlig nøkkelordbasert kildehenting og lokal Ollama-adapter.
- Statisk kildesøk uten modellkall i Pages-varianten.
- Moduldeling av chat, RAG-server, stiler og designverdier.
- Tester og dokumentasjon for oppstart, arkitektur og videre utvikling.

### Begrensninger

- Innholdet består av offentlige eksempler. Faktiske installasjonspakker, innlogging og internt innhold er ikke implementert.
- Ingen GitHub-remote, CI eller automatisk publisering er konfigurert.
- Generering med en faktisk modell er ikke verifisert.

## Slik vedlikeholdes loggen

- Før nye endringer under «Ikke utgitt», med dato og faktisk utførende agent eller person. Ved flere agenter oppgis hvem som gjorde hvilke deler.
- Beskriv endringen, hvorfor den ble gjort, hva som er kontrollert og eventuelle begrensninger.
- Ved versjonering: opprett en datert versjonsoppføring og oppgi faktisk commit eller tag. Ikke merk en versjon som publisert før utrullingen er verifisert.
- Git-forfatter, agent og versjonsnummer skal ikke antas å være det samme. Ikke oppgi en modellvariant uten at den er kjent.
