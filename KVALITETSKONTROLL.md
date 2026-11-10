# Kravvis gjennomgang med skill 0.4.0 – 9. november 2026

## Målrettet retest etter retting – 10. november 2026

[Ny rapport](docs/tilgjengelighet/2026-11-10/080757-ffaeb036427a/testrapport.md): A11Y-04, A11Y-05 og A11Y-06 er rettet i oppgitt lokalt omfang. Tre PDF-lister/12 punkter, 229 MCID-koblinger, 6,28:1 tekstkontrast på side 5 og norsk 404 med én tittel er verifisert. Ingen bekreftede åpne brudd i gjennomført utvalg; 20 K / 11 I / 17 U / 0 B er fortsatt ikke en full samsvarsvurdering. 21 sidetilstander, 63 viewport-kontroller, 168 Tab-steg og tre deklarerte brukerforløp er retestet. Historiske åpne funn nedenfor beskriver tilstanden før denne rettingen.

## Ny kontroll med skill 0.5.0 – 10. november 2026

Siste resultat: [rapport](docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd/testrapport.md), [manuell restliste for alle 48 krav](docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd/manuell-oppfolging.md). 20 sider / 23 eksportfiler, 60 viewport-kontroller, 160 Tab-steg og tre deklarerte forløp. Ingen kandidat i de navngitte nettleserdelene; 2484 kontrastmålinger og 75 hoppede forekomster. Automatisk samlet kjøringsstatus er delvis fordi axe/vnu mangler.

Tre åpne bekreftede avvik: A11Y-04 PDF-lister, A11Y-05 PDF-kontrast og nytt A11Y-06, engelsk 404-melding uten riktig språkmerking. Tittelelementene på feilsiden er fortsatt uavklart. Arbeidsmatrisen er 19 K / 11 I / 15 U / 3 B; K er avgrenset delomfang, ikke formell samsvarsgodkjenning. Restlisten skiller 37 gjenstående vurderings-/rettings-/retestpunkter fra 11 krav uten utløsende innholdstype lokalt. Skjermleser, faktisk zoom, enhetsinnstillinger, resterende kontrast/tekstavstand/PDF og blokkert fullskann gjenstår. Tidligere resultater nedenfor er historikk, ikke siste status.

Alle 48 prosedyrer er gjennomgått i ny [testrapport og plan](docs/tilgjengelighet/2026-11-09/221027-5ce9daf9d5dc/testrapport.md), med 20 sider, relevante dynamiske forløp og PDF. Gjennomgått betyr ikke ferdig testet: arbeidsfordeling **20 K, 11 I, 15 U, 2 B**, ikke samsvarsprosent. Faktisk skjermleser/zoom/orientering, videre kontrast/fokus/PDF og full lokal HTML-validator gjenstår som angitt per krav.

Nye funn: A11Y-04 (1.3.1, manglende listestruktur på PDF-side 7) og A11Y-05 (1.4.3, utilstrekkelig tekstkontrast på PDF-side 5). Ingen produktretting er utført. De tidligere rettede overskriftene og dokumenttittelen er fortsatt på plass. Nye undersøkelser omfatter 60 responsive DOM-kontroller, 40 tekstavstandskontroller, 160 Tab-steg og utvalgte handlinger i animasjon, katalog, priser og chat. Test-CSS er fjernet med identisk hash. Full dokumentasjon og gjenstående arbeid står i kjøringsmappen; nedenstående rapporter er historiske.

# PDF-avvik rettet og struktur-/metadataretestet – 9. november 2026

A11Y-02 og A11Y-03 er rettet. PDF-en har én H1, seks H2 og 20 H3, og riktig norsk dokumenttittel i Info og XMP. 229 MCID-koblinger er kontrollert gjennom ParentTree; alle syv sider har identisk tekst, innholdsstrøm og rendering før/etter. Ingen faktisk skjermlesertest eller full PDF/UA-validering er utført. 1.3.1 er derfor fortsatt U for øvrig PDF-semantikk. Arbeidsfordeling: **26 K, 10 I, 12 U, 0 B**, ikke en samsvarsprosent. [Ny retest og evidens](docs/tilgjengelighet/2026-11-09/210420-07c855b7770e/testrapport.md).

Nedenfor er historiske resultater før denne rettingen; de åpne PDF-funnene der er ikke dagens feilstatus.

# Lokal oppfølging: PDF, kontrast og tastatur – 9. november 2026

Ny oppfølging mot commit `67108ac`: alle syv PDF-sider rendret og tekst/struktur/metadata undersøkt. A11Y-02 (1.3.1, manglende overskriftsroller) og A11Y-03 (2.4.2, generisk PDF-tittel) er åpne; A11Y-01 er fortsatt lukket. Seks supplerende kontrastpar oppfylte valgte terskler. 40 Tab-steg på fire sider og åtte i chatdialogen er dokumentert; feltfokus ble undersøkt ved 320 px. Dette er ingen full ny web-/hjelpemiddelkontroll.

Gjeldende arbeidsfordeling er **25 K, 10 I, 11 U, 2 B**, ikke en samsvarsprosent. PDF-en er ikke rettet. Faktisk skjermleser, zoom og redusert bevegelse er fortsatt uavklart; zoomsnarveiforsøket endret ikke visningen. Se [rapport og reteststeg](docs/tilgjengelighet/2026-11-09/205326-389241d1fd6e/testrapport.md). Nedenstående rapporter er historiske og kan ha eldre tall.

# Oppfølging: språkavvik rettet – 9. november 2026

A11Y-01 er lukket for prisvilkårene etter faktisk prisoppdatering og nettleserretest av alle seks seksjoner. Vilkårsteksten genereres på norsk. Tre nye regresjonstester beskytter gjentatt oppdatering og ukjent vilkårsformat. Alle 48 prosjekttester bestod. Se [retestrapporten](docs/tilgjengelighet/2026-11-09/203914-cf2e80bc00f7/testrapport.md). Samlet samsvar er fortsatt uavklart med 13 U-punkter. Tidligere rapport nedenfor beskriver funnet før retting, ikke en fortsatt åpen feil.

# Ny tilgjengelighetskontroll – 9. november 2026

Ny kontroll med tilgjengelighetsskill 0.3.0 bygger på commit `c622090`. Den omfatter 20 HTML-sider, inkludert nye oversikter, priser, personvern og forsideanimasjon. Samlet samsvar er fortsatt uavklart; ett språkavvik på prissiden er bekreftet (3.1.2).

- 23 eksportfiler uten kandidater i HTML-grunnkontrollen; 60 normalvisningskontroller uten sidebredde-overflyt, dupliserte ID-er eller umerkede synlige felt.
- 40 tekstavstandskontroller uten sidebredde-overflyt. Midlertidig teststil er fjernet. Dette er ikke full visuell klippe-/zoomkontroll.
- Animasjonen kan pauses/startes med tastatur og forlates med Tab. Katalog, pristabell, utfellbare vilkår, chatvalidering og dialog er prøvd avgrenset.
- Faktisk skjermleser, zoom, PDF, alle kontrast-/fokustilstander, redusert-bevegelse-innstilling og endelig drift gjenstår. Ingen produktretting er utført som del av kontrollen.

Se [testrapporten](docs/tilgjengelighet/2026-11-09/201443-73cb0a3e52e0/testrapport.md), [gjeldende matrise](docs/tilgjengelighet/WCAG-KONTROLL.md) og [oppdatert erklæringsgrunnlag](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md). Eldre tekst nedenfor er historisk, ikke dagens side-/ressursantall eller en ny samsvarsvurdering.

# Kvalitetskontroll – 6. november 2026

Kontrollert lokalt i den integrerte nettleseren. Første kontroll er supplert med vurderingsmatrise for alle 48 krav, flere tastaturtester, tekstavstander og automatiserte grunnkontroller. Samlet samsvar er fortsatt uavklart. Se [WCAG-KONTROLL.md](docs/tilgjengelighet/WCAG-KONTROLL.md) og [grunnlag for erklæringen](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md). Ingen publisering er utført.

## Utført

- Forsiden er visuelt undersøkt ved 320, 390 og 1280 pikslers bredde. Ingen horisontal overflyt på forsiden ved 320 og 1280 piksler.
- Alle seks undersider er åpnet ved 320 piksler: tre ressursdetaljer, Kom i gang, Om og Spør KI. Alle hadde én hovedoverskrift, en beskrivende sidetittel og ingen horisontal overflyt.
- Interne lenkemål fra forsiden og undersidene er gjennomgått. Alle peker til eksisterende sider. Ankeret `#bidra` finnes på Om-siden, og katalogankeret fører til katalogen. Kildelenken i chatten peker til riktig ressurs.
- Katalogsøk uten treff viser tomtilstand. Nullstilling gjenoppretter listen. Skill-filteret gir én ressurs og oppdatert resultattall.
- Chatdialogen er visuelt undersøkt ved 320 piksler. Dialogen er 304 piksler bred og holder seg innenfor skjermen. Skrivefelt, sendeknapp og lukking er tilgjengelige.
- Et spørsmål om kodegjennomgang gir kildeutdrag. Ingen modellgenerering er konfigurert eller verifisert.
- Escape lukker dialogen og returnerer fokus til Spør KI-knappen.
- Tastaturaktivering av Hopp til innhold er kontrollert etter retting: fokus flyttes til `main#innhold`.
- HTML-språk er `nb`. Søke- og spørsmålsskjema har etiketter; filtre har `aria-pressed`; resultatantall og chat har live-regioner.
- Grunnleggende tekstfarger er undersøkt i nettleseren: hvit, grå (#d7d7d7) og aksent (#9df1ad) på mørk bakgrunn (#09151b). Dette dekker ikke alle kombinasjoner, gradienter eller tilstander.
- Redusert bevegelse er støttet i eksisterende CSS; operativsysteminnstillingen er ikke testet manuelt.

## Rettet

- Hovedinnholdet har `tabIndex={-1}` slik at hoppelenken faktisk kan flytte tastaturfokus.
- Fokusmarkering omfatter tekstområder, kildeutdrag og hovedinnhold.
- Duplisert ID mellom MUI DialogTitle og overskriften i chatten er fjernet slik at dialogen får en entydig tittel.
- Menylenker og utfellbare kilder har minst 44 pikslers høyde.
- Bunnteksten har ekstra plass under den flytende chatknappen; en tidligere paddingregel ble overskrevet.
- HTML markerer eksisterende myk rulling med Next.js sin `data-scroll-behavior`-attributt.

## Gjenstår før bred lansering

- Full tastaturgjennomgang av alle kontroller og fokusrekkefølge, særlig ved rulling nær den flytende chatknappen.
- Skjermlesertest av navigasjon, dynamiske søkeresultater og nye chatmeldinger.
- Verifisert 200–400 % nettleserzoom, større tekst og faktisk mobil med skjermtastatur. Liggende viewport og overstyrte tekstavstander er nå kontrollert.
- Full automatisert tilgjengelighetsskanning (for eksempel axe) og måling av resterende kontrastkombinasjoner og tilstander. Egne avgrensede DOM-/HTML-kontroller og to kontrasttester er utført.
- Flere nettlesere, særlig Safari og Firefox.
- Godkjenning av offentlig innhold, skrifter og profilressurser.
- Lenke- og ressurskontroll på publisert Pages-adresse med prosjektsti før demoen godkjennes.

## Tekniske kontroller

- Alle 18 tester bestod etter siste rettinger, inkludert to nye kontrasttester.
- Vanlig produksjonsbygg og statisk Pages-bygg bestod, inkludert TypeScript-kontroll.
- Endringene er lokale og er ikke committet eller publisert.

## Utvidet kontroll og erklæringsutkast

- Ni sider kontrollert ved 320, 844 og 1280 pikslers bredde: 27 grunnkontroller uten horisontal overflyt, manglende kontrollnavn eller dupliserte ID-er i utvalget.
- Tekstavstander overstyrt på åtte sider ved to størrelser. Midlertidig test-CSS er fjernet.
- Svak kantkontrast i chatfeltet rettet; fokustap ved innsending/tømming og manglende tydelig validering forbedret.
- Fastlåst skrivefelt i chatten fjernet slik at det ikke dekker kildeinnhold ved smal visning eller større tekstavstander.
- Nettstedskart og tilgjengelighetsside lagt til og lenket fra bunnteksten.
- Den formelle erklæringen er ikke opprettet. Kontaktadressen er bekreftet av brukeren; godkjenner og endelig nettadresse gjenstår.
- Pages-bygg med prosjektsti bestod grunnkontroll for 12 eksporterte HTML-filer.
- Evidens er lagret i `docs/tilgjengelighet/2026-11-06/`.
