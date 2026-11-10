# Versjonslogg

Endringer i KI-Produktutvikling føres her, med dato, utførende agent, kontrollresultat og Git-referanse. Nyeste endringer står først. Loggen beskriver prosjektversjoner; en oppføring betyr ikke at nettstedet er publisert.

«Agent» betyr kodeassistenten som utførte arbeidet. Git-forfatteren registreres separat av Git og kan være personen som oppretter commiten. Eksakt modellvariant er ikke registrert for tidligere arbeid og oppgis derfor ikke. Ingen underagenter ble brukt til kvalitetskontrollen eller opprettelsen av denne loggen.

## Ikke utgitt – HTTP-retting verifisert i Docker/Linux med Node 22 – 10. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Testet HTTP-rettingen i faktisk Docker/Linux med Node 22.18.0 / Undici 6.21.2, Debian 12 og arm64. Offisielt Node-bilde låst med digest; kode fra Git-snapshot `8aa422f` med uendret HTTP-implementasjon fra `2e5411a`. Docker Desktop måtte startes. Testcontaineren hadde ingen publiserte porter eller ekstern nettverkstilgang, og kun en skrivebeskyttet kodekopi uten `.env`, secrets eller installerte prosjektavhengigheter.
- Alle **9/9 HTTP-/konfigurasjonstester** bestod. Samme stressforløp som på macOS, på tre isolerte servere: **300/300** 2 MB-kropper ga 413 med Connection: close og **1200/1200** etterfølgende fetch-kall ga 200. 150 Content-Length- og 150 chunked-opplastinger; også 300/300 vellykkede oppvarmingskall. **Ingen ECONNRESET, EPIPE eller andre forespørselsfeil**, og ingen automatisk retry lagt til. Alle servere ble lukket; containeren ble automatisk fjernet og fraværet kontrollert.
- Oppdatert [testrapporten](docs/rag/2026-11-10/http-grense.md) og lagret originalutskrifter, JSON-resultater, runtime-/bildeidentitet, manifest og containerens kjøreskript i `docs/rag/2026-11-10/node22-linux-http/`. Den gamle implementasjonen, AMD64, andre patchversjoner, samtidighet og produksjonsproxy er ikke testet. Hele 94-testpakken, TypeScript og API-skriptet er ikke kjørt på nytt i Linux.
- Formatering og `git diff --check` er kontrollert lokalt. Ingen produkt- eller avhengighetsendring; funksjonsregister, Beta-status og produksjonskrav videreføres. Ingen eksisterende appcontainer ble stoppet eller rekonfigurert. Ingen commit eller publisering.

## Ikke utgitt – HTTP-retting verifisert med Node 22 – 10. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Testet rettingen i commit `2e5411a` med faktisk Node 22.18.0 / Undici 6.21.2 på macOS arm64. Hentet offisiell binærpakke til midlertidig mappe og verifisert SHA-256 mot Node-distribusjonens sjekksum. Ingen endring i systemets Node eller prosjektets avhengigheter.
- Hele testkommandoen bak `pnpm test:rag`, kjørt direkte med Node 22, bestod: **94/94**, inkludert de ni HTTP-/konfigurasjonstestene. Utvidet stresstest på tre isolerte servere: **300/300** 2 MB-kropper ga 413 med Connection: close, **1200/1200** etterfølgende fetch-kall og 300/300 oppvarmingskall ga 200. Halvparten av opplastingene brukte Content-Length og halvparten chunked. **Ingen ECONNRESET, EPIPE eller andre forespørselsfeil**. Alle testservere ble lukket.
- Oppdatert [testrapporten](docs/rag/2026-11-10/http-grense.md) med runtime, omfang, resultattabell og begrensninger. Lagret original testutskrift, gjentakbart stresskript og maskinlesbare resultater i `docs/rag/2026-11-10/node22-http/`.
- Gammel kode er ikke retestet med Node 22; opprinnelig feilreproduksjon på denne versjonen påstås fortsatt ikke. Andre patchversjoner, Docker/Linux, samtidige opplastinger og delt proxy er ikke verifisert. API-kontrollskriptet er ikke kjørt på nytt; tjenesten på port 3001 ble ikke endret. Ingen produktendring; funksjonsregister, Beta-status og produksjonskrav videreføres.
- Dokumentasjonens formatering og `git diff --check` er kontrollert. Ingen commit eller publisering.

## Ikke utgitt – rettet HTTP-grense for RAG – 10. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Skrev og kjørte førtester mot uendret produktkode: konfigurerte dev-/delte origins ga 403, `Application/JSON` ga 415, og både søkefeil og kast fra `service.ask` ga 400. Tre 2 MB-kropper ga 413 med feilaktig keep-alive, men ECONNRESET ble ikke reprodusert: alle tolv etterfølgende kall lyktes på tilgjengelig Node 24.22.1. Node 22 er ikke testet; ingen påstand om bekreftet reset-retting. Se [før-/etter-rapport](docs/rag/2026-11-10/http-grense.md).
- Lagt til servervariabelen `RAG_ALLOWED_ORIGINS` med validering ved oppstart og dagens to loopback-origins som standard. Oppstartsskriptet sender listen til HTTP-serveren. En eksplisitt liste erstatter standardene; tomme/ugyldige elementer avvises. Ingen `NEXT_PUBLIC_`-variabel eller serverkonfigurasjon i offentlig funksjonsregister.
- JSON-medietype sammenlignes uten hensyn til bokstavstørrelse/parametre. Beholdt 400/413/415 for klientfeil og skilt uventede søke-/tjenestefeil til nøytral 500 uten interne detaljer. Modelladapterens eksisterende feilsvar beholdes.
- For høy Content-Length avvises før buffering; chunked kropp har fortsatt bytegrense. 413 sendes straks med Connection: close og kontrollert forkasting/lukking innen ett sekund. Strømiteratoren ødelegger ikke socketen ved tidlig retur. Første forsøk med umiddelbar lukking ga EPIPE i testen; rettet variant består 2 MB- og etterfølgende forespørsler.
- Oppdatert `.env.example`, README, arkitekturens testforutsetninger, funksjonsregister og fase 5/P3. Tillatte origins er lokalt implementert, mens faktisk delt HTTPS-drift, intern ruting, autorisering og produksjonsgodkjenning gjenstår. Beta-status beholdes.
- Kontroller: `pnpm test:rag` 94/94, `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestått. Ni nye tester, inkludert HTTP-kontroller på midlertidige loopback-servere med opprydding. API-kontrollskriptet bestod mot eksisterende tjeneste på 3001; revisjonen der er ikke verifisert. Separat oppstart på samme port ga EADDRINUSE; eksisterende tjeneste ble ikke endret. Ingen ny avhengighet, commit eller publisering.

## Ikke utgitt – rettet relevans i RAG-kildesøket – 10. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet de fire innmeldte relevansfeilene med faktisk `retrieve()` før produktendring. Lagt til et fast evalueringssett med 26 spørsmål før retting: de fire feilene, eksisterende forventninger og åtte nye realistiske spørsmål. Resultatet gikk fra 20/26 til 26/26 uten endrede forventninger; [hele før-/etter-tabellen og råresultater](docs/rag/2026-11-10/relevans.md) er lagret.
- Prefiks går nå bare fra kildeord til lengre spørsmålsord og krever minst fem tegn. Minstesum to avviser ett svakt brødtekstprefiks; minst åtte tegn gir et sterkere brødteksttreff. Unike spørsmålsord hindrer at gjentakelser omgår terskelen.
- Lik poengsum avgjøres med titteltreff, antall treffende ord og direkte emneangivelse ved linjestart før corpusrekkefølge. Ingen kilde-ID har særbehandling. Fjernet virkningsløse korte stoppord og utvidet med vanlige spørreord/fyllord. NFD-/aksentnormalisering følger ressurskatalogen; æ/ø beholdes, og stoppord normaliseres likt.
- Oppdatert funksjonsregisterets Spør KI-beskrivelse og fase 4 i utviklingsplanen. Beta og gjenstående pilot-/modellkontroller videreføres. Ingen nye avhengigheter eller endret API-kontrakt; ingen modell/embeddings eller nye sider.
- Kontroller: `pnpm test:rag` 85/85, inkludert seks tester av prefiksretning, terskel, rangering og normalisering. `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestått. Eksisterende tester er beholdt. Avgrenset ordsøk er ikke en generell garanti for semantisk relevans. Ingen commit eller publisering.

## Ikke utgitt – rettet PDF-språk og varsel om gamle prisdata – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.6.0 og PDF-skillen. Ingen underagenter.

- Rettet A11Y-08: PDF-katalogen har nå nb-NO, og 36 feilmerkede norske innholdsspenn er endret fra en-US til nb-NO. Alle 2694 ikke-blanke synlige tegn har korrekt norsk språk. Syv engelske alternativtekster har eksplisitt en. ParentTree og mest lokal BDC-merking er kontrollert; ingen faktisk opplesing påstås.
- Rendret alle syv PDF-sider før/etter ved 120 dpi: null pixelavvik. Tekst/geometri/skrifter/farger/MCID, strukturroller, tittel og tegne-/tekstoperasjoner unntatt Lang er bevart. Tidligere kontrastvurderinger videreføres med ny hash og dokumentert visuell identitet.
- Rettet A11Y-09: fjernet timeintervallet fra PricingFreshness. Alder vurderes ved åpning eller nytt checkedAt-grunnlag, uten tidsstyrt innsetting under lesing. Kontrollert klokke mot ny produksjonseksport: 0 varsler før/etter senere terskelpassering, 6 ved åpning med gamle data og 0 time-callbacks; også prøvd ved 320 px. Ingen endring i systemklokke eller lagrede priser. Funksjonsregisterets beskrivelse er oppdatert; Beta-status beholdes.
- Retestet hero-pause/start og relevante nettleserdeler. A11Y-08/A11Y-09 er lukket; 3.1.1/3.1.2/2.2.2 B → K i lokalt utvalg. **29 K / 11 I / 8 U / 0 B**. Oppdatert brukerrettet erklæring/side, rapporter, README, arbeidsmatrise, latest og utviklingsplan. Bevis, førversjon, verktøy og retester er lagret i `docs/tilgjengelighet/2026-11-10/202101-029e79106a3d/`. Skillens avstemming består; ingen samlet tilgjengelighetsgodkjenning.
- Åtte øvrige krav, faktisk hjelpemiddel-/zoom-/enhetsprøving og P8 er fortsatt åpne. Ingen endring i Skills-repoet, commit eller publisering.

- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Ny native-kjøring `203306-native-1c441fbd`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu 0 feil / 207 info-noter. Original motorstatus er bevart. Erklæringen er lest tilbake ved 320/1280 med nøyaktig åtte U-ID-er og ingen kjente åpne brudd. Bevisreferanser, lokale dokumentlenker, dokumentavstemming, formatering og Git-diff er kontrollert. Den midlertidige testfanen/serveren er lukket/stoppet og viewport er gjenopprettet.

## Ikke utgitt – lokal oppfølging med tilgjengelighetsskill 0.6.0 – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.6.0 og PDF-skillen. Ingen underagenter.

- Kjørt oppdatert skill med faktisk testmulighetskartlegging, avslutningsvilkår for alle 48 krav, nettlesermodul, `--auto` og ny axe/Nu-kjøring. Gjennomført 65 fokussnapshots og målrettede tastatur-/statusforløp i katalog, dialog, chatside, kilder og seks pristabeller. 2.4.3 og 2.4.7 U → K i oppgitt lokalt utvalg; faktisk zoom/skjermleser er ikke påstått utført.
- Bekreftet A11Y-08: PDF-ens norske hovedinnhold har engelsk katalogspråk, og 709 av 2694 ikke-blanke synlige tegn ligger i eksplisitt engelske spenn på side 4–6. Uavhengig ParentTree-oppslag og mest lokal BDC-merking er sammenholdt med synlig norsk tekst. 3.1.1 og 3.1.2 U → B. PDF uendret; ingen uttaletest er oppfunnet.
- Bekreftet A11Y-09: uendret priskomponent setter automatisk inn seks varsler uten pause/skjul/frekvenskontroll ved passert terskel. Kontrollert klokke og reelle time-callbacks er prøvd i isolert eksport, uten endring av produktkilde/systemklokke. 2.2.2 U → B; hero-pause vedvarer etter fokusflytting og består separat.
- Oppdatert kort brukerrettet erklæring/side med tre bruddkrav og åtte uavklarte krav. Oppdatert rapporter, gjeldende oppsummering, arbeidsmatrise/restplan, README, utviklingsplan og latest. Samlet **26 K / 11 I / 8 U / 3 B**. Funn/rettingsforslag, bevis og konkret bistand er lagret i `docs/tilgjengelighet/2026-11-10/193339-7e408d0c78ed/`. Ingen funksjons-/PDF-retting er utført i dette testoppdraget.
- Den nye avstemmingen fanget en feil i første Markdown-sammenstilling og gamle brudd på retesthenvisninger; dette er rettet i den nye vurderingen, med datert originalgrunnlag og normalisert skjema. Avstemmingen består uten omskriving av råmotorstatus eller gamle kjøringer. Faktisk native Chrome-tilgang ble blokkert av manglende Computer Use-tillatelse. Zoom, skjermleser/PDF-leser, fysisk rotasjon og OS-innstilling er ikke gjennomført. Ingen endring i Skills-repoet, commit eller publisering.

- Sluttverifisering: 53 Node-tester og tre Python-tester bestod, sammen med Pages-produksjonsbygg/TypeScript/ruteregister og HTML-grunnkontroll av 25 filer. Ny native-kjøring `195227-native-1d4e7aee`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu 0 feil / 207 info-noter. Rendrert erklæring viser nøyaktig tre B-krav og åtte U-krav ved 320/1280 uten overflyt. PDF og funksjonskomponentene er identiske med HEAD. Formatering, Git-diff og lokale bevis-/dokumentlenker er kontrollert. Testfanen er lukket, viewport gjenopprettet og den isolerte loopback-serveren stoppet.

## Ikke utgitt – fullført lokal 1.4.11-vurdering – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.1 og PDF-skillen. Ingen underagenter.

- Vurdert nødvendig grafikk/kontrollmarkeringer i dagens portal og alle syv PDF-sider mot kontrollerte Uu-/W3C-kilder. Klassifisert alle 157 PDF-primitiver med begrunnelse; 19 nødvendige/konservativt prøvde deler minst 4,191671:1. Syv svake perifere ellipseomriss er supplerende innramming etter konkret informasjonsvurdering. PDF uendret; ingen blanket dekor-/Alt-fritak eller påstått skjermleserprøve.
- Funnet og rettet A11Y-07: MUI-filterets 0,25s bakgrunns-/fargeovergang svekket valgtmarkering og tekst. Førmålinger/funn bevares. Filtertekst og valgt bakgrunn skifter nå samtidig; 16 umiddelbare tastatur-/pekerretester ved 1280/320 gir minst 10,922731:1 for valgt flate og 12,538164:1 for tekst. Stabil palett og forsideanimasjon er beholdt. Funksjonsregisterets katalogbeskrivelse er oppdatert; Beta-status er uendret.
- Øvrige prøvde nødvendige markeringer minst 3,392300:1, med faktiske hover/fokus/feil/valg, tre kilde- og seks prismarkører og seks tabellfokus. Visuelt aria-hidden feltgrenser er eksplisitt målt etter at en generell DOM-filterregel utelot dem. Kombinert råfil bevarer 32 før- og to ekstra etter-tilstander; dette presenteres ikke som 34 feilfrie etter-retting-tilstander.
- Lagret vurdert 48-matrise/testplan/restliste, klassifiseringer, målrettede beregnere, funn/retest og PDF-/nettleserbevis i `docs/tilgjengelighet/2026-11-10/160352-a02d77cb2734/`. Oppdatert latest, rapporter, README, utviklingsplan, erklæring/portalside. **1.4.11 U → K i lokalt utvalg; 24 K / 11 I / 13 U / 0 B.** 1.4.3 K beholdes med ny filterretest. Samlet samsvar og øvrig hjelpemiddel/zoom/PDF-semantikk/pilot er fortsatt uavklart. Ingen endring i Skills-repoet eller publisering.

- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Ny avsluttende native-kjøring `162215-native-1eb13e38`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu gir 0 feil / 207 tekniske info-noter om avsluttende skråstrek. Original motorstatus er bevart. Erklæringen er lest tilbake ved 1280/320 uten overflyt med nøyaktig de 13 U-ID-ene fra matrisen. PDF-en er identisk med HEAD. Lokale dokumentlenker, formatering og Git-diff er kontrollert.

## Ikke utgitt – interaktive kontrasttilstander og PDF – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.1 og PDF-skillen. Ingen underagenter.

- Undersøkt 23 faktiske UI-tilstander / 694 tekstmålinger, med verifisert :hover, filtervalg, placeholder-alpha, tomt søk/nullstilling, dialog-/sidechat, åpne kilder, validering og seks åpne prisvilkår. Aktuelle tekster har minst 5,209084:1. Eneste svakere måling gjelder native disabled Tøm chat under lasting; aktiv status-/feiltekst er ikke unntatt. Kontrollert 20-sekunders last-/feilrespons i eksisterende adapter er fjernet byte for byte; dette er ikke en test av faktisk nettverksbrudd eller ekstern modell.
- Rendret og visuelt undersøkt alle syv PDF-sider ved 120 dpi. Alle 2694 synlige ikke-blanke tegn målt mot riktig opaque fill og bakgrunn bekreftet i render; minst 4,932072:1. PDF-en er uendret. Første feilaktige valg av underliggende hvit bakgrunn ble avvist ved pixelkontroll og er bevart med forklaring; ingen dokumentfeil ble påstått fra denne beregningen.
- 27 representative feltkant-/ikon-/fokusmålinger gir minst 3,421389:1. MUI-ripplehypotese er avvist som ikke gjeldende: installert tema har disableRipple og DOM ingen ripple-røtter. Ingen hypotetisk effekt er registrert som brudd. Ingen nye bekreftede avvik eller design-/PDF-retting nødvendig.
- Lagret ny vurdert matrise/testplan/restliste, råstiler/beregnere, PDF-tegn-/renderbevis og rapport i `docs/tilgjengelighet/2026-11-10/145250-bd1373c8699b/`. Oppdatert latest, WCAG-/kvalitetskontroll, README, utviklingsplan og offentlig erklæring/side. 1.4.3 U → K i lokalt utvalg: **23 K / 11 I / 14 U / 0 B**. Full 1.4.11-klassifisering, faktisk hjelpemiddel/zoom/enhet/pilot og samlet samsvar er fortsatt uavklart. Ingen endring i Skills-repoet, commit eller publisering.

- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Ny avsluttende native-kjøring `150658-native-bf6961aa`: 23 ruter / 0 axe-violations / 3 incomplete-grupper / samme 86 noder, og 0 Nu-feil / 207 info-noter. Original motorstatus er bevart. Erklæringen er lest tilbake ved 1280/320 uten overflyt, med 14 U-ID-er avstemt mot matrisen. Adapter/PDF/fargestiler er uendret mot HEAD; lokale lenker, formatering og Git-diff er kontrollert.

## Ikke utgitt – vurdering av 86 kontrastforekomster – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.1. Ingen underagenter.

- Undersøkt alle 86 opprinnelige axe-incomplete-targets entydig i lokal produksjonseksport ved 1280/320 px. Dokumentert faktisk forgrunn, font, bakgrunnslag, gradient/alpha, pseudo-geometri og tekstglød; konservativ beregnet sRGB-grense minst 7,715057:1. 22 kontroller er faktisk fokusert med tastatur og målt på nytt, minst 8,655854:1. Ingen bekreftet kontrastfeil i prøvde tilstander, ingen designretting nødvendig. Ingen produktfarger eller effekter er endret.
- Kjørt skillens nettlesermodul på tre sider: ni viewport-prøver, 24 Tab-steg og Enter-pauseforløp, uten kandidater. Ny native axe på 23 ruter: 0 violations / samme 3 incomplete-grupper / 86 noder. Nu på 25 HTML-filer: 0 feil / 207 tekniske info-noter. `run_checks.py --auto` er kjørt med faktisk nettleserdata og original forside-axe; flersideskannet er separat vurdert. Motorenes incomplete-/exitstatus er bevart, ikke omskrevet til pass.
- Lagret ny vurdert 48-kravsmatrise, testplan, restliste, per-forekomsttabell, råstiler, reproduserbar beregner, skjermbilder og rapport i `docs/tilgjengelighet/2026-11-10/135417-d3e318e119fd/`. Første ufullstendige dev-selektorkartlegging og forklaring av sandbox-blokkert serveroppstart er bevart; autorisert localhost-server ga nøyaktig ett treff per produksjonselement. Oppdatert latest-peker, WCAG-/kvalitetskontroll, README, utviklingsplan og kort erklæring/portalside.
- 22 K / 11 I / 15 U / 0 B og uavklart samlet samsvar videreføres. De 86 normalforekomstene er undersøkt; øvrige faktiske hover-/dynamiske effekter og PDF-kontrast gjenstår under 1.4.3. Modellgrenser er ikke eksakt pixelmåling eller hjelpemiddel-/zoom-/produksjonsgodkjenning. Tidligere funn/rettinger bevares. Ingen endring i Skills-repoet, commit eller publisering.

- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Første bygg fant at en arkivert TypeScript-kildekopi ble typekontrollert; arkivkopiene fikk .txt-suffiks, og nytt bygg bestod uten endring i produktlogikk. Erklæringen er lest tilbake ved 1280/320 px, 15 U-ID-er og 86 rapportlinjer er avstemt, og lokale dokument-/evidenslenker, formatering og Git-diff er kontrollert.

## Ikke utgitt – tilgjengelighetskontroll av cookie-sider – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.1. Ingen underagenter.

- Kjørt skillens nettlesermodul og `run_checks.py --auto` på cookie-siden og den nye cookie-skill-detaljsiden. Seks viewport-prøver, to Enter-forløp, 16 automatiske Tab-steg, 72 kontrollerte frem-/tilbake-Tab-overganger med hopp til innhold og fire tekstavstandsprøver ved 320/1280 px. Ingen ny bekreftet åpen feil. Test-CSS er tilbakeført byte for byte. Første for lange Tab-kjøring feilet teknisk; råfeil, vellykket kortere kjøring og separat full gjennomgang er bevart.
- Ny lokal axe-regresjon på 23 ruter: 0 violations / 3 incomplete-grupper / 86 nodeforekomster. Begge nye sider har 0 violations og 0 incomplete. Nu på 25 HTML-filer: 0 feil / 207 info-noter om avsluttende skråstrek. Tidligere modell for 80 gradientforekomster er historisk delbevis og brukes ikke som automatisk godkjenning av det utvidede utvalget.
- Lagret vurdert grunnlag i `docs/tilgjengelighet/2026-11-10/133024-18e0f9e56386/`, med uendret originalmanifest, raw/initial-filer, vurdert 48-kravsmatrise/testplan, nye bevis, rapport og restliste. Oppdatert latest-peker, erklæringen/portalsiden, README, WCAG-kontroll, kvalitetskontroll og utviklingsplan. Tidligere rapporter/rettede funn er bevart med dato/omfang.
- 22 K / 11 I / 15 U / 0 B og uavklart samlet samsvar videreføres. Faktisk skjermleser, 200/400 % zoom, fysisk enhet, videre faglig vurdering og produksjon er ikke testet nå. Ingen banner finnes og ingen bannerkontroll påstås. Ingen produktrettinger, endringer i Skills-repoet, commit eller publisering.

- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 eksportfiler bestod. Erklæringen er lest tilbake ved 1280/320 px uten sideoverflyt; kravlisten er avstemt mot 15 U-rader. Lokale dokument-/evidenslenker, CSS-gjenoppretting, formatering og Git-diff er kontrollert.

## Ikke utgitt – selvstendig cookie-skill og cookie-side – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator` og den nye `informasjonskapsler-og-samtykke` 0.1.0. Ingen underagenter.

- Opprettet selvstendig skill i Skills-repoet og installert kopi, med egne kilder, kartleggingsveiledning, erklæringsmal, Python-kilde-/HTTP-kontroll og valgfri lokal metadata-probe. Ingen andre skills eller tidligere rapporter kreves. Bibliotekets README og versjonslogg er oppdatert separat.
- Brukt skillens faktiske verktøy og probe på portalen: 27 nettlesersnapshots på 21 eksisterende sider/tilstander og 21 anonyme dokumentresponser (20 HTTP 200, én 404). Ingen oppføringer i fem undersøkte lagertyper eller Set-Cookie-headere; ingen eksterne ressurs-/script-/iframe-origins i utvalget. Syntetisk chatspørsmål ga kildebasert svar uten modell og en lokal API-request. MUI-temalagringsstøtte er kildeundersøkt, uten observerte persistente nøkler. Ingen lagringsverdier eller hemmeligheter er lagret.
- Beslutning: ikke påvist behov for banner i testet lokalt omfang; ingen banner er implementert. Produksjon/auth/proxy/CDN/tredjeparts-/fullstendig nettverksinnsyn er uavklart. Ingen global «cookie-fri» eller juridisk godkjenning er påstått. Første sandbox-blokkerte HTTP-forsøk og redirect-delkjøring er bevart; faktisk oppfølging bruker observerte dokumentstier.
- Lagret vurdert grunnlag i `docs/informasjonskapsler/2026-11-10/121354-92b5bf52/`, med inventar, redigerte rådata, rapport og bannerbeslutning. Midlertidig probe ble fjernet med identisk gjenoppretting av layout før permanente produktendringer. Daterte tilgjengelighets-/personvernresultater er bevart.
- Lagt til `/informasjonskapsler/` med footerlenke, felles innhold for nettside/Spør KI, automatisk registrering i funksjons-/sideoversikten og ny selvstendig Beta-skill i katalogen. Oppdatert personvernkryssreferanse, Markdown-utdrag, README og utviklingsplan. Nye sider må også inngå i neste brede tilgjengelighetskontroll; dette er ikke en full ny WCAG-vurdering.

- Rettet integrasjonen med Spør KI ved å tillate den konkrete cookie-ruten i RAG-kontrakten. Første testkjøring fant tre feil knyttet til rutelisten; etter retting bestod 53 portaltester, inkludert regresjon for cookie-kilden og fortsatt avvisning av ukjente ruter. Ordlyden i kildens overskrift gjør at vanlige spørsmål om cookies/banner finner riktig side først. Ingen generell åpning av URL-valideringen.
- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 eksportfiler bestod. Begge nye sider er lest tilbake ved 1280/320 px uten sideoverflyt eller probe. Footer, katalogsøk/Beta-detaljer og faktisk Spør KI-svar er verifisert. Skillens 45 Python-/åtte Node-tester bestod, og isolert pakke med bare egne filer bestod ti Python-/to Node-prøver og CLI-prøve med forventet delstatus. Quick_validate kunne ikke starte uten PyYAML; dette er dokumentert. Daterte cookie-bevis er unntatt fra Prettier for å bevare originaldata; rot-/produktdokumenter formateres fortsatt.

## Ikke utgitt – avklaringsplan for 15 tilgjengelighetskrav – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.1. Ingen underagenter.

- Oppdatert `docs/tilgjengelighet/WCAG-KONTROLL.md` med konkrete forutsetninger og kravvis plan for alle 15 U-krav: kompetanse, skjermleser-/nettleser-/mobil-/PDF-/kontrastoppsett, handlinger, forventet resultat og nødvendig dokumentasjon. Skilt lokale undersøkelser, faglige vurderinger og kontroller som trenger beskyttet pilot. Ingen verktøy er installert, ingen systeminnstillinger eller tilganger er endret.
- Beskrevet kriterier for ny vurdering, retest og oppdatering av rapporter/erklæring, med bevarte historiske bevis og uavklart status. Godkjenner/tester er ikke utpekt. Supplerende redusert bevegelse er skilt fra kravet til kontroll over automatisk innhold; støttematrise og verktøyvalg er anbefalinger, ikke et påstått lovpålagt produktvalg.
- Lenket planen fra kvalitetskontroll og fase 3/P8 i utviklingsplanen; rettet dagens skill-versjon i planoversikten til 0.5.1. Testdato, 22 K / 11 I / 15 U / 0 B, `latest.json`, offentlig erklæring og daterte testresultater er uendret. Dette er dokumentasjons-/planarbeid, ikke en ny tilgjengelighetsrevisjon eller produksjonsgodkjenning.

- Kontroll: Alle 15 planlagte krav er avstemt mot U-radene i siste vurderte matrise, med alle fire planfeltene til stede. 34 lokale dokumentlenker er kontrollert. Eksisterende testgrunnlag, latest-peker og erklæring er verifisert uendret mot Git HEAD. Formatering og `git diff --check` er kontrollert. Ingen nettleser-/hjelpemiddel-/produkttester er utført i denne dokumentasjonsoppgaven; ingen nye testresultater påstås.

## Ikke utgitt – kjente brudd og uavklarte krav i erklæringen – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` og `skill-creator`. Ingen underagenter.

- Delt tilgjengelighetserklæringen og portalsiden i «Kjente brudd» og «Forhold som ikke er ferdig vurdert». Alle 15 U-krav fra siste vurderte matrise er listet med ID, tittel og kort brukerforklaring, gruppert etter WCAG-prinsipp. Ingen bekreftede åpne brudd i det undersøkte utvalget; samlet samsvar og faktisk testdato er bevart.
- Lagt sidens offentlige kravsammendrag i `src/content/accessibility.ts`, oppdatert funksjonsbeskrivelse og katalogmetadata til tilgjengelighetsskill 0.5.1. Private rapportfiler importeres ikke i nettsiden. Oppdatert README. Ingen ny full tilgjengelighetsrevisjon eller endring i produksjonsgodkjenning.
- Oppdatert skillens instruksjoner og erklæringsmal, vurderings-/lagringsveiledning, README og versjonslogg i Skills-repoet samt installert kopi. Uavklarte krav holdes tydelig atskilt fra bekreftede brudd; teknisk arbeidshistorikk blir fortsatt i rapportene. Skill-versjonering og kildeindeks er avstemt.

- Verifisering: 52 portaltester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll for 23 eksportfiler bestod. Krav-ID-ene er avstemt mot de 15 U-radene i siste vurderte matrise. Siden er lest tilbake med 15 krav og uten sideoverflyt ved 1280/320 px. Skillens 35 Python- og seks Node-tester bestod; standard quick_validate kunne ikke starte uten PyYAML. Formatering og Git-diff kontrolleres før levering. Testdato/samsvarsstatus og daterte auditresultater er ikke endret; dette er validering av innhold og verktøyversjon, ikke en ny full tilgjengelighetskontroll.

## Ikke utgitt – gjenstående lokale tilgjengelighetskontroller – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.0 og PDF-skillen. Ingen underagenter.

- Gjennomført ny lokal skill-kjøring og målrettet oppfølging i `docs/tilgjengelighet/2026-11-10/094541-e2907a5c27e2/`: 21 sidetilstander, 63 viewport-kontroller, 168 Tab-steg, tre deklarerte forløp og 42 tekstavstandsmålinger. Prøvd null treff/valgt filter, chatfeil/lasting/kildebasert svar/tømming/fokusretur og seks åpne pristabeller med tastaturrulling. Midlertidig CSS er tilbakeført byte for byte. Ingen nye bekreftede åpne brudd; 1.4.12 U → K i prøvd lokalt HTML-utvalg.
- Dokumentert konservative sRGB-bakgrunnsgrenser for alle 80 axe-incomplete-forekomster: minst 8,207:1. Resultatet gjelder lagmodellen, ikke alle faktiske hover/overlagringer eller PDF. Opprinnelige axe-resultater er bevart. Tre CSS-animasjoner er bekreftet paused/running, også pause etter Tab ut. Faktisk prisalderkomponent er prøvd isolert før/ved/etter sju dager og ved gjentatt simulert timekontroll/avmontering; ingen OS-klokkeendring eller permanent komponentendring.
- Kontrollert PDF-struktur og syv eksisterende renderinger ved identisk hash: 61 Figure etter tidligere listeomkoding, ikke det eldre antallet 73. Faktisk skjermleser, effektivt språk, leserekkefølge og full likeverdig diagramformidling er fortsatt uavklart. PDF-en er ikke endret.
- Oppdatert 48-kravsmatrise/testplan, rapporter, restliste, latest-peker, kort brukerrettet erklæring/side, README, kvalitetskontroll og utviklingsplan. Arbeidsstatus 22 K / 11 I / 15 U / 0 B; 34 krav har automatisk delgrunnlag. 36 har bredere rest, 11 ingen utløsende innholdstype og ett fullført lokalt manuelt utvalg. Dette er ikke en samsvarsprosent.
- Begrensninger: Automatisk godkjenningskontroll avviste `cua.getApp('Google Chrome')` («Computer Use was not approved to use Google Chrome»). Ingen omgåelse eller påstått faktisk zoom/hover/OS-preferansetest. Skjermleser, fysisk enhet, videre faglige vurderinger, innlogging, faktisk modell og publisert miljø er særskilt ført i restlisten. Prisalder er simulert; tidligere native axe/Nu gjenbrukes med original dato. Ingen hemmeligheter lest, ingen produktretting, commit, registrering eller publisering.

- Sluttverifisering: 52 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll for 23 eksportfiler bestod. Ny avsluttende native-kjøring `100139-native-b7a19485` på oppdatert eksport ga 0 axe-violations / 3 incomplete-grupper (samme 80 noder) og 0 Nu-feil / 191 tekniske noter. Oppdatert erklæring er lest tilbake ved 1280/320 px uten sideoverflyt eller ny DOM-kandidat. Formatering, dokument-/evidenslenker og `git diff --check` er kontrollert. Dette er ikke samlet samsvarsgodkjenning.

## Ikke utgitt – lokal axe og Nu HTML-validering – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.0. Ingen underagenter.

- Låst `@axe-core/cli` 4.14.0, `vnu-jar` 26.11.9 og `chromedriver` 157.0.0 som utviklingsavhengigheter. Node-minimum er 22.18.0, slik at direkte TypeScript-import også støttes uten ekstra flagg. Prosjektlokal pnpm-konfigurasjon tillater installasjonsskripter bare for driver/validator og beholder eksisterende lokalt lager. Java-runtime installeres i node_modules; ingen globale innstillinger, andre repoer eller GitHub-rettigheter endres.
- Lagt til `pnpm test:a11y`: midlertidig server på loopback, axe CLI i separat headless Chrome mot bygde sider og Nu-validering av lokale eksportfiler. Ingen opplasting av portalinnhold. Resultater får unik datert mappe, original JSON per side, rå stdout/stderr, verktøyversjoner og tydelig teknisk feilstatus. Den andre motoren forsøkes også hvis én feiler. Koden avviser tomme/dupliserte/manglende axe-resultater og motstridende validatorstatuser. CI aktiveres ikke automatisk.
- Lagt til faktisk negativ verktøytest (`pnpm test:a11y:smoke`) og fire protokoll-/omfangstester. Begge faktiske motorer fant tilsiktet manglende alt på syntetisk testside; denne er ikke portalinnhold. Første axe-kjøring avdekket at ventemeldinger bryter CLI-ens JSON-stdout. Feilen er bevart som teknisk feil; løsningen bruker nå verktøyets egen JSON-fil og er retestet.
- Endelig motorresultat: Native-kjøring `docs/tilgjengelighet/2026-11-10/090555-native-d984a7c5/` omfatter 20 registrerte sider og feilside i lokal eksport. Axe ga 0 violations, men tre uavklarte color-contrast-grupper / 80 elementforekomster. Nu validerte 23 eksportfiler med 0 HTML-feil og 191 tekniske info-/advarselsnoter om slash på tomme elementer. Ingen nye bekreftede WCAG-brudd; øvrige kontrastforhold beholdes som manuell rest.
- Faktisk skill-kjøring og vurdert grunnlag er lagret i `docs/tilgjengelighet/2026-11-10/090740-ca8d9c80ecb6/`, med null blokkerte/teknisk feilede deltester. Skillens import av én original axe-oppføring er tydelig skilt fra det fullstendige native-skannet og en kravvis analyse av alle 21 resultater. Tidligere nettleserdata er referert med opprinnelig tidspunkt og hash, ikke fremstilt som en ny CUA-kjøring. Arbeidsstatus er 21 K / 11 I / 16 U / 0 B; 37 krav har fortsatt bredere vurdering/retest og 11 er uten utløsende innholdstype lokalt.
- Kontroll: 52 Node-tester, tre Python-regresjonstester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll for 23 filer bestod. Nyttig negativ motorprøve og protokolltester skiller feilet/tom kjøring fra faktisk utført kontroll. Ingen full skjermleser-/zoom-/produksjonsvurdering er påstått.
- Oppdatert dokumentasjon, utviklingsplan og erklæringens korte metode-/begrensningstekst. Ingen produktavvik rettes i dette testoppdraget. Tidligere PDF-/språkrettinger og manuelle uavklarte forhold beholdes. Samlet tilgjengelighetssamsvar er fortsatt uavklart. Ingen commit, registrering eller publisering.

- Avgrenset verktøyprosessene fra globale Selenium remote-/server-/nettleserinnstillinger og implisitte driverstier, slik at den avtalte lokale kjøringen ikke omdirigeres til en annen server. Regresjonstest bekrefter avgrensningen uten å endre foreldreprosessens miljø.

- Unntatt daterte auditmapper fra Prettier for å bevare originalrapporter, råutskrifter og prosedyreøyeblikksbilder. Rotrapporter og kildekode formateres fortsatt.

- Sluttkontroll: Hele prosjektets `pnpm format:check` og `git diff --check` bestod. Erklæringssiden er lest tilbake på stor skjerm og 320 px uten sideoverflyt eller DOM-kandidat. Krav-/status-/evidensfordeling og relative dokumentlenker er avstemt; originalt manifest og motordata er bevart. Ny negativ motorprøve etter miljøavgrensningen bestod også.

## Ikke utgitt – rettet PDF-lister, PDF-kontrast og 404-språk – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.0 og PDF-skillen. Ingen underagenter.

- Rettet A11Y-04 ved å kode tre PDF-lister med tolv LI/Lbl/LBody og gruppere dem under tilhørende overskrifter. Opprinnelige tekstnoder, 229 ParentTree/MCID-eierkoblinger, 27 overskriftsroller, dokumenttittel og sidegeometri er bevart. Side 7 og fem øvrige sider er pikselidentiske med før-versjonen.
- Rettet A11Y-05 ved å gjøre aktuell brød-/bunntekst og sidetall på PDF-side 5 hvite, med 6,284:1 kontrast mot grønn bakgrunn. Retest bekrefter 382 endrede teksttegn, uendret tekst/skrift/posisjon og visuell endring bare på side 5. Original, reparasjons-/retestskript og rendering er arkivert i `docs/tilgjengelighet/2026-11-10/080757-ffaeb036427a/`.
- Rettet A11Y-06 med norsk `not-found.tsx`, beskrivende metadata og lenker videre. Én norsk sidetittel er kontrollert i faktisk lokal feilside og alle tre eksporterte feilfiler, slik at tittelkandidaten for 2.4.2 også lukkes lokalt. Feilsiden er registrert som funksjon; den er ingen ordinær ny siderute. HTML-grunnkontrollen avviser tom/duplisert tittel, med tre regresjonstester.
- Oppdatert rapporter/testplan/matrise, manuell restliste, latest-peker, kort brukerrettet erklæring, README, kvalitetskontroll, utviklingsplan og vedleggsstørrelse (139 kB) i felles Om-innhold. Ingen bekreftede åpne avvik i undersøkt utvalg. Arbeidsstatus 20 K / 11 I / 17 U / 0 B er ikke en samsvarsprosent; 1.3.1, 1.4.3 og 3.1.2 beholder U for øvrig dekning. Tidligere kjøringer og rettingshistorikk er bevart.
- Sluttverifisering: Alle 48 eksisterende prosjekttester, tre nye Python-regresjonstester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll for 23 eksportfiler bestod. Status-/restfordeling og kravvis evidens er avstemt. Norsk feilside er lest tilbake ved 320 px uten sideoverflyt, og tastaturlenken til forsiden er bekreftet etter fullført navigasjon. Oppdatert erklæring er lest tilbake og skjermbilder er lagret. Formatering og `git diff --check` er kontrollert. PDF-en er reparert direkte; ved ny eksport fra en redigerbar kildefil må også de underliggende stil-/kontrast-/listeinnstillingene oppdateres.
- Kontrollgrunnlag: Uavhengig PDF-retest og de tre nye HTML-regresjonstestene bestod. Faktisk skill-kjøring på 20 registrerte sider og feilside ga 63 viewport-kontroller, 168 Tab-steg og tre deklarerte forløp uten kandidat i navngitte nettleserdeler. Axe/vnu mangler fortsatt; ingen faktisk skjermleser, full PDF/UA-validering, verifisert zoom eller produksjonsfallback er påstått. Ingen commit, registrering eller publisering.

## Ikke utgitt – tilgjengelighetskjøring med skill 0.5.0 – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.0. Ingen underagenter.

- Kjørt den oppdaterte skillen på portalen, med ny hovedkjøring `docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd/`. Første delkjøring 9. november og tidligere gjennomganger er bevart. Faktisk nettlesermodul og `run_checks.py --auto` er brukt; ikke bare testplan eller tekstlig skill-henvisning.
- Utført 20 sider, 23 eksportfiler, 60 viewport-kontroller, 160 Tab-steg, tre deklarerte forløp og supplerende chat/pris-/404-kontroller. 2484 tekstforekomster kontrastmålt, 75 hoppet over med begrunnelse. Axe og vnu mangler, og kjøringen er derfor delvis (exit 2). Ingen fullskann-/skjermleser-/zoomgodkjenning er påstått.
- Bekreftet nytt A11Y-06: den engelske 404-meldingen arver norsk språk. PDF-listene (A11Y-04) og PDF-kontrast (A11Y-05) består ved identisk PDF-hash; tidligere rettede A11Y-01–03 beholdes i opprinnelig omfang. De tre tittelelementkandidatene på eksporterte feilsider er fortsatt uavklart, ikke automatisk registrert som brudd. Ingen produktfeil er rettet.
- Oppdatert rapporter, kravmatrise/testplan, latest-peker, README, utviklingsplan, funksjonsbeskrivelse og kort brukerrettet erklæring/side. Kravvis restliste viser 37 gjenstående vurderings-/rettings-/retestpunkter og 11 krav uten utløsende innholdstype lokalt. 31 krav har automatiske delresultater; arbeidsstatus 19 K / 11 I / 15 U / 3 B er ikke en samsvarsprosent. Tidligere bevis beholder dato og opprinnelig plassering; maskinproduserte originaler er bevart i raw/initial-*.
- Verifisering etter dokument-/sideendring: Alle 48 prosjekttester og Pages-produksjonsbygg med TypeScript bestod. HTML-grunnkontrollen bestod for 23 eksportfiler. Alle 48 planrader har forventet/faktisk resultat, metode og eksisterende evidens; statusfordeling, 37 manuelle restpunkter og 129 relative dokumentlenker er avstemt uten mangler. Oppdatert erklæring er lest tilbake på desktop og 320 px, uten sideoverflyt eller ny kandidat i DOM-delkontrollen; skjermbilder og råresultater er lagret. Formatering og `git diff --check` er kontrollert. Bygg/enhetstester er utviklingsverifisering, ikke samlet tilgjengelighetsgodkjenning.
- Begrensninger: Faktisk skjermleser, verifisert 200/400 % zoom, fysisk rotasjon/redusert bevegelse, full tekstavstand-/tilstandsgjennomgang og produksjon/innlogging/modellgenerering er ikke utført. Syntetisk chatspørsmål ga veiledning uten språkmodell. Eier og frister er ikke avklart. Ingen hemmeligheter er lest, ingen registrering, commit eller publisering utført.

## Ikke utgitt – automatisk deltesting og manuell 48-kravsrestliste – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator` og `tilgjengelighetserklaering`. Ingen underagenter.

- Oppdatert katalogen til tilgjengelighetsskill 0.5.0 med automatisk testflyt og tydelig manuell oppfølging for alle 48 krav. Det separate Skills-repoet og installert kopi har utvidede HTML-/PDF-kontroller, nettlesermodul, valgfri lokal validator og import av faktisk axe-resultat. Funn og manglende verktøy vises kravvis, uten automatisk samsvarsgodkjenning.
- Oppdatert README og utviklingsplan. Katalog/Spør KI bruker fortsatt samme metadata. Ingen nye produktruter eller endret modenhetsstatus; funksjonsregisterets eksisterende katalogdefinisjon gjelder fortsatt. Siste portalvurdering, latest.json, erklæringen og de to åpne PDF-avvikene er bevart.
- Kontroll: 35 Python- og seks Node-tester for skill-pakken bestod. Isolert integrasjonstest ga automatisk delresultat for 27 av 48 krav og konkret manuell rest for alle 48; axe/vnu var blokkert. Nettlesermodulen er prøvd på faktisk lokal forside med DOM/kontrast, tre størrelser, fire Tab-steg og pause/start. Dette er utviklingsverifisering av verktøyet, ikke ny full tilgjengelighetsrevisjon av portalen. Alle 48 portaltester og Pages-produksjonsbygg med TypeScript bestod. Skillens strukturelle quick_validate kunne ikke kjøre uten PyYAML; lokale referanser, navn/versjon og egne regresjonstester er kontrollert. Ingen commit eller publisering.

## Ikke utgitt – kravvis tilgjengelighetsgjennomgang med skill 0.4.0 – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.4.0 og PDF-verktøy. Ingen underagenter.

- Gjennomgått alle 48 prosedyrer på lokal portal med forventet/faktisk resultat, verktøy, evidens og gjenstående test per krav. Ny kjøring `docs/tilgjengelighet/2026-11-09/221027-5ce9daf9d5dc/` bevarer originalmanifest og prosedyreøyeblikksbilde. Utført 60 responsive DOM-kontroller og 40 tekstavstandskontroller på alle 20 sider, 160 Tab-steg samt utvalgte handlinger i hoppelenke, animasjon, katalog, priser og chat. Midlertidig test-CSS er fjernet med identisk originalhash.
- Bekreftet to nye PDF-avvik: A11Y-04 / 1.3.1 (visuelle punktlister uten kodet listestruktur på side 7) og A11Y-05 / 1.4.3 (ca. 4,41:1 for vanlig grå brød-/bunntekst og 1,11:1 for sidetall på grønn bakgrunn på side 5). Tiltak og retest er dokumentert; PDF-en er ikke rettet. Tidligere A11Y-01–03 beholdes som rettet i sine opprinnelige omfang.
- Oppdatert testplan/resultater, full matrise, kort brukerrettet erklæring og lokal side, funksjonsregister, README, kvalitetskontroll og utviklingsplan. Status 20 K / 11 I / 15 U / 2 B er arbeidsfordeling, ikke samsvarsprosent. Flere tidligere delkontroller er nå eksplisitt U fordi fysisk orientering, full kodevalidering, PDF-språk og automatisk prisaldervarsel ikke er ferdig vurdert.
- Begrensning: Ingen faktisk skjermleser, verifisert 200/400 % zoom, fysisk orienterings-/redusert-bevegelse-test, full lokal HTML-validator, modellgenerert svar, innlogging eller produksjonsmiljø. Et testspørsmål ga kildebasert veiledning uten språkmodell. Ingen miljøhemmeligheter er lest, ingen produktfeil er rettet og ingen registrering, publisering eller commit er utført. Samlet samsvar er fortsatt uavklart.
- Kontroll av dokument-/sideoppdateringen: Alle 48 prosjekttester og Pages-produksjonsbygg med TypeScript bestod. Etterkontroll av 23 eksporterte HTML-filer ga ingen kandidater i delomfanget. Alle 48 testplanrader har forventet/faktisk resultat og eksisterende evidens; statusfordeling og relative dokumentlenker er kontrollert. Oppdatert erklæring er lest tilbake på desktop og 320 px, uten sidebredde-overflyt; bilde er lagret. Prettier og `git diff --check` gjelder dokument-/kildefilene; rålogger er bevart med opprinnelige terminalkontrolltegn. Bygg-/enhetstester er separat utviklingsverifisering, ikke tilgjengelighetsgodkjenning.

## Ikke utgitt – testprosedyrer for alle 48 krav i tilgjengelighetsskillen – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator` og regnearksskillen. Ingen underagenter.

- Oppdatert katalogmetadata til tilgjengelighetsskill 0.4.0. Skillen har nå konkrete prosedyrer for alle 48 krav i nettstedsmalen, med kilde/cellereferanse, verktøy, handlinger, forventet resultat og dokumentasjon. Prosedyrene og maskinlesbar indeks ligger i det separate Skills-repoet, med samme installerte kopi.
- Nye skill-kjøringer lager en plan med alle krav som ikke testet, et eget prosedyreøyeblikksbilde og 48 uavklarte rader i kravgrunnlaget. HTML/kontrast gir fortsatt bare delresultater; dette er ingen automatisk fulltest eller godkjenning. Endringen er dokumentert i Skills-repoets egen versjonslogg.
- Oppdatert README og utviklingsplan. Tidligere portaltester, siste testkjøring og samlet uavklart samsvarsstatus er ikke endret. Den korte brukerrettede erklæringen beholdes.
- Kontroll: Skills-repoets 25 tester bestod, inkludert fire nye tester for dekning, ærlig planstatus, historikk og ugyldig kravindeks. Alle 48 ID-er, celler og opprinnelige URL-er er sammenlignet med brukerens Excel-mal; kildesidene er kontrollert. Portalens 48 prosjekttester og Pages-produksjonsbygg med TypeScript bestod. Katalogsiden er lest tilbake i nettleser med versjon 0.4.0 og beskrivelse av 48 prosedyrer. Kildepakken og installert kopi er like; formatering og `git diff --check` er kontrollert. Ingen ny tilgjengelighetsrevisjon, commit, registrering eller publisering.

## Ikke utgitt – ryddigere tilgjengelighetserklæring – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator` og `tilgjengelighetserklaering` 0.3.1. Ingen underagenter.

- Forenklet lokal erklæringsside og Markdown-erklæring til omfang, samsvar, relevante begrensninger/alternativer, kontakt, klage og kort vurderings-/oppdateringsinformasjon. Fjernet testtall, funn-ID-er, kjøringsreferanser, agentdetaljer og historikk over rettede feil fra den brukerrettede teksten. Teknisk evidens og historikk er bevart i eksisterende rapporter og Git.
- Beholdt utkaststatus, bekreftet kontakt, vesentlig usikkerhet og faktisk vurderingsdato. Dette er redaksjonell opprydding, ikke ny tilgjengelighetsrevisjon eller høyere samsvarsstatus. Siste faktiske testkjøring og 12 uavklarte vurderinger er uendret.
- Oppdatert skillens instruksjoner/mal/lagringsveiledning til 0.3.1 i Skills-repoet og installert kopi, med egen logg der. Oppdatert katalogmetadata, funksjonsregister, README og utviklingsplan.
- Kontroll: 48 prosjekttester og Pages-produksjonsbygg med TypeScript bestod. Skills-repoets 21 eksisterende tester bestod; endrede skill-filer og lokale referanser er kontrollert, og kilde/installerte kopi er like. `quick_validate.py` kunne ikke kjøre uten PyYAML; dette er dokumentert i Skills-loggen. Utkaststatus, kontakt, klage og vurderingsdato er bevart; historisk evidens er urørt. Prettier, `git diff --check` i begge repoer og nettleservisning er kontrollert. Ingen commit, formell registrering eller publisering.

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
