# Utviklingsplan for KI-Produktutvikling

Sist oppdatert: 6. november 2026

Status: Fungerende lokal prototype. Teknisk grunnmur og design er i hovedsak implementert lokalt. MVP 1 gjenstår å publisere og brukerteste.

Dette er prosjektets levende utviklingsplan. Oppdater oppgaver, beslutninger og ferdigkriterier etter hvert som arbeidet går fremover. Avkryssing betyr at arbeidet er utført og verifisert.

## Mål og rammer

Utvikle en kunnskapsportal inspirert av [KI-produktutvikling i Nav](https://ki-utvikling.nav.no/), med både offentlig og internt innhold og virksomhetens egen designprofil.

- Navn: **KI-Produktutvikling**.
- Teknologisk utgangspunkt: Next.js og TypeScript.
- Utvikling på lokal maskin, med GitHub til samarbeid, versjonering og automatisert publisering.
- Designbibliotek: [nasjonalarkivet/da-mui-theme](https://github.com/nasjonalarkivet/da-mui-theme), tilgjengelig som npm-pakken `@digitalarkivet/mui-theme`. Integrasjonen bruker publisert pakke uten GitHub-repotilgang.
- Futuristisk design utvikles i portalens eget tema og komponentlag.
- Første delte miljø skal være lukket for godkjente GitHub-brukere. Hosting avventer avklaring av abonnement og drift. Pages er foreløpig en statisk byggvariant; offentlig publisering utsettes til portalen er produksjonsklar.
- Innlogging og beskyttet innhold testes og driftes i et miljø med serverstøtte.
- Portalen skal ha avgrensede GitHub-rettigheter og ingen skrivetilgang til andre koderepoer.
- GitHub-organisasjonen antas foreløpig å være `nasjonalarkivet`; dette må bekreftes.
- Driftsplattform og domene er ikke valgt.

## Faseoversikt

| Fase | Leveranse                                        | Status                                |
| ---- | ------------------------------------------------ | ------------------------------------- |
| 1    | Avklaringer og prosjektgrunnlag                  | Delvis avklart                        |
| 2    | Teknisk grunnmur og sikker arbeidsflyt           | Under arbeid                          |
| 3    | Designretning og komponenter                     | Implementert, videre kvalitetssikring |
| 4    | MVP 1: Offentlig demonstrasjon på GitHub Pages   | Lokal demo klar, ikke publisert       |
| 5    | Servermiljø og utrulling                         | Ikke startet                          |
| 6    | MVP 2: Innlogging og internt område              | Ikke startet                          |
| 7    | MVP 3: Distribusjon av skills og andre ressurser | Ikke startet                          |
| 8    | MVP 4: Forvaltning og produksjonslansering       | Ikke startet                          |

Første arbeidsbolk er fase 1–4. Valg av driftsplattform avklares underveis, før innlogging og internt innhold implementeres.

## Fase 1 – Avklaringer og prosjektgrunnlag

**Mål:** Etablere rammer, eierskap og avgrensninger før implementering.

- [ ] Bekrefte målgrupper og hvilke oppgaver portalen skal hjelpe dem med.
- [ ] Definere første innholdsområder: nyheter, veiledninger, skills, agenter, instrukser og prompter.
- [ ] Avklare hva som skal være offentlig og internt.
- [ ] Bekrefte GitHub-organisasjon og hvilke medlemmer eller team som skal få intern tilgang.
- [x] Integrere designbiblioteket gjennom publisert npm-pakke uten privat GitHub-tilgang.
- [ ] Avklare bruksvilkår for eventuelle ekstra profilressurser, særlig Suisse-skriftfiler.
- [ ] Registrere beslutninger om arkitektur, innhold og tilgang.
- [ ] Avklare eiere for portal, innhold og drift.

**Leveranse:** Prosjektbeskrivelse, oppdatert arkitekturskisse og prioritert oppgaveliste.

**Ferdig når:** Første versjon har tydelig omfang, og nødvendige tilganger er avklart.

## Fase 2 – Teknisk grunnmur og sikker arbeidsflyt

**Mål:** Gjøre prosjektet enkelt å utvikle og trygt å publisere.

- [x] Etablere lokal Git-versjonering og første commit (`ed873b7`).
- [ ] Opprette et eget GitHub-repository for portalen.
- [x] Sette opp Next.js, TypeScript og lokal utvikling.
- [x] Etablere separate bygg for statisk Pages-demonstrasjon og senere serverdrift, med felles komponenter.
- [x] Sette opp lokal formatering, typekontroll, tester og begge byggvarianter.
- [ ] Etablere linting og automatiske kontroller i GitHub Actions.
- [ ] Kreve pull requests, godkjenning og beståtte kontroller før endringer går til `main`.
- [ ] Gi GitHub Actions eksplisitte, minimale rettigheter.
- [x] Unngå GitHub-repotilgang for designbiblioteket ved å bruke publisert npm-pakke.
- [ ] Etablere rutiner for avhengighetsoppdateringer og håndtering av hemmeligheter.
- [x] Beskrive hvordan nye utviklere starter prosjektet lokalt.

**Leveranse:** Kjørbart prosjekt med automatiske kontroller.

**Ferdig når:** En utvikler kan følge oppsettveiledningen, starte portalen og få en endring kontrollert gjennom en pull request.

## Fase 3 – Designretning og komponenter

**Mål:** Skape et futuristisk uttrykk med tydelig tilknytning til virksomhetens designprofil.

- [ ] Kartlegge hvilke deler av `da-mui-theme` som kan brukes direkte.
- [x] Lage et eget tema i portalen for farger, typografi, avstander, kanter og effekter.
- [ ] Utforme to retninger: diskret futuristisk og mer markant futuristisk.
- [ ] Prøve retningene på forside, navigasjon og ressurskort.
- [x] Velge designretning.
- [x] Utvikle toppmeny og bunntekst.
- [x] Utvikle knapper, lenker og søkefelt.
- [x] Utvikle ressurskort og typefiltrering.
- [ ] Lage tilgangsmerking når tilgangsmodellen er avklart.
- [x] Utvikle artikkeloppsett og kodeeksempler.
- [ ] Tilpasse mobil, tastaturnavigasjon, kontrast og redusert bevegelse.

Tilpasningene holdes i portalens eget komponentlag. Endringer i det felles designbiblioteket vurderes separat.

**Leveranse:** Valgt designretning og et første sett gjenbrukbare komponenter.

**Ferdig når:** Forside, katalog og artikkelside har et sammenhengende uttrykk som fungerer på mobil og større skjermer.

## Fase 4 – MVP 1: Offentlig demonstrasjon på GitHub Pages

**Mål:** Gjøre konseptet tilgjengelig for vurdering med reelt, offentlig innhold eller tydelig merkede eksempeldata.

- [x] Bygge forside med introduksjon, katalog og snarveier.
- [ ] Avklare behov for siste nytt og særskilt fremhevede ressurser.
- [x] Bygge artikkelsider og enkel navigasjon mellom innholdsområdene.
- [x] Lage verktøykatalog med kategorier og filtrering.
- [x] Lage detaljsider for tre eksempelressurser: skill, instruks og prompt.
- [ ] Legge til faktiske ressurser og eventuelle agenter.
- [ ] Definere metadata: tittel, beskrivelse, type, eier, kategori og gjennomgangsdato.
- [ ] Publisere representative artikler og ressurser.
- [ ] Avklare offentlig bruk av skrifter, bilder og øvrige ressurser fra designbiblioteket.
- [ ] Sette opp automatisk utrulling til GitHub Pages.
- [ ] Sikre at Pages-byggingen bare bruker godkjente offentlige innholdskilder.
- [x] Gjennomføre første manuelle kontroll av interne lenker, mobilvisning og grunnleggende tilgjengelighet; se KVALITETSKONTROLL.md.
- [ ] Gjennomføre utvidet tilgjengelighetskontroll med skjermleser, zoom og flere nettlesere.
- [ ] Samle tilbakemeldinger fra en liten brukergruppe.

**Leveranse:** En klikkbar, offentlig demonstrasjon av KI-Produktutvikling.

**Ferdig når:** Brukere kan finne en artikkel og en relevant ressurs, og redaktører kan publisere gjennom den avtalte arbeidsflyten.

**Avgrensning:** Versjonen demonstrerer design og offentlig innhold. Den har ikke reell beskyttelse av interne sider. Internt innhold, hemmeligheter og private søkeindekser skal ikke følge med i byggingen.

## Fase 5 – Servermiljø og utrulling

**Mål:** Etablere miljøet som kan støtte innlogging og beskyttet innhold.

- [ ] Velge driftsplattform ut fra virksomhetens eksisterende løsninger og krav.
- [ ] Etablere et testmiljø med serverstøtte for Next.js.
- [ ] Konfigurere domene, HTTPS og sikre miljøinnstillinger.
- [ ] Sette opp utrulling fra GitHub med avgrensede rettigheter.
- [ ] Etablere logging, feilrapportering og enkel tilgjengelighetsovervåking.
- [ ] Dokumentere og prøve tilbakeføring til en tidligere versjon.
- [ ] Avgjøre om Pages-demonstrasjonen beholdes som designdemo eller avvikles.

**Leveranse:** Et fungerende testmiljø og en dokumentert utrullingsflyt.

**Ferdig når:** En godkjent endring kan publiseres, verifiseres og tilbakeføres.

## Fase 6 – MVP 2: Innlogging og internt område

**Mål:** Gi godkjente GitHub-brukere tilgang til internt innhold.

- [ ] Opprette en dedikert GitHub-integrasjon med nødvendige leserrettigheter og uten skrivetilgang til kode.
- [ ] Implementere innlogging, sesjonshåndtering og utlogging.
- [ ] Kontrollere organisasjonsmedlemskap på serveren.
- [ ] Definere hvor ofte medlemskap kontrolleres på nytt, slik at fjernet tilgang får virkning.
- [ ] Koble til en separat, privat innholdskilde.
- [ ] Beskytte artikler, ressursdetaljer, vedlegg og nedlastinger.
- [ ] Sørge for at mellomlagring og søk respekterer tilgangsreglene.
- [ ] Lage forståelige sider for manglende tilgang og innloggingsfeil.
- [ ] Teste direkte lenker, utløpte sesjoner, manglende medlemskap og feil i GitHub-kontrollen.
- [ ] Kontrollere at interne data ikke finnes i offentlige bygg eller filer.

**Leveranse:** Én portal med offentlig og internt område i samme design.

**Ferdig når:** Autoriserte brukere får tilgang, og øvrige brukere ikke kan hente internt innhold gjennom sider, søk eller direkte filadresser.

## Fase 7 – MVP 3: Distribusjon av skills og andre ressurser

**Mål:** Gjøre ressursene brukbare i utviklernes egne prosjekter.

- [ ] Standardisere mappestruktur og metadata for installerbare ressurser.
- [ ] Validere `SKILL.md`, støttemateriale og refererte filer.
- [ ] Publisere versjonerte utgaver med endringsbeskrivelse.
- [ ] Vise versjon, eier og installasjonsveiledning i katalogen.
- [ ] Lage en enkel installasjonsmåte for offentlig innhold.
- [ ] Etablere autorisert installasjon av privat innhold gjennom GitHub.
- [ ] Støtte valg av bestemt versjon og kontrollert oppdatering.
- [ ] Håndtere lokale endringer uten utilsiktet overskriving.
- [ ] Prøve installasjon, oppdatering og tilbakeføring med ett pilotteam.

**Leveranse:** Et lite, fungerende bibliotek av installerbare skills og andre ressurser.

**Ferdig når:** Pilotteamet kan installere en valgt versjon og oppdatere den uten å miste egne tilpasninger.

## Fase 8 – MVP 4: Forvaltning og produksjonslansering

**Mål:** Gjøre portalen klar for varig bruk og bidrag fra flere team.

- [ ] Lage bidragsveiledning og maler for nytt innhold.
- [ ] Fordele ansvar for faglig godkjenning og vedlikehold.
- [ ] Innføre oversikt over innhold som trenger gjennomgang.
- [ ] Forbedre søk og filtrering basert på pilotbruk.
- [ ] Gjennomføre samlet kontroll av tilgjengelighet og tilgangsstyring.
- [ ] Avklare driftsansvar, varsling og håndtering av feil.
- [ ] Kontrollere personverninformasjon mot faktisk databehandling.
- [ ] Prøve produksjonsutrulling og tilbakeføring.
- [ ] Lansere for en begrenset målgruppe før bredere bruk.

**Leveranse:** Produksjonsklar portal med navngitte eiere og dokumenterte rutiner.

**Ferdig når:** Både teknisk drift og løpende innholdsvedlikehold har ansvarlige personer og fungerende arbeidsflyter.

## Beslutningspunkter

| Tidspunkt     | Beslutning                                                          | Status                           |
| ------------- | ------------------------------------------------------------------- | -------------------------------- |
| Etter fase 1  | Omfang, tilgangsmodell og innholdsstruktur                          | Åpen                             |
| Etter fase 3  | Designretning                                                       | Futuristisk MUI-tilpasning valgt |
| Etter fase 4  | Endringer etter brukertest og prioritering av intern funksjonalitet | Åpen                             |
| Før fase 6    | Driftsplattform og nødvendige GitHub-rettigheter                    | Åpen                             |
| Etter fase 7  | Om et eget installasjonsverktøy er nødvendig                        | Åpen                             |
| Før lansering | Om løsning, innhold og driftsansvar er klare                        | Åpen                             |

## Løpende oppfølging

### Lokal status – 30. oktober 2026

- En «Om»-side beskriver portalens praktiske formål og AI enablement-teamets foreslåtte rolle. Mandatet brukes som bakgrunn; brukernytte styrer innholdsprioriteringen.

- Node.js fra Codex sin medfølgende runtime benyttes; ingen global installasjon er gjort.
- Next.js, React og TypeScript er installert med låste versjoner og `pnpm-lock.yaml`.
- `sh scripts/dev.sh` starter portalen på `http://127.0.0.1:3000`.
- Vanlig produksjonsbygg og statisk Pages-bygg er verifisert.
- Forside, søk, kategorifiltrering og veiledningsside er prøvd i nettleseren.
- Digitalarkivets MUI-tema 5.1.0 er integrert med MUI 9.5.0 og et eget futuristisk tilpasningslag. Innholdet er fortsatt eksempler.
- Palett, typografi og komponentstiler hentes fra designbiblioteket. Portalens egen arklogo er senere implementert. Godkjente Suisse-skriftfiler gjenstår; reserveskrift brukes foreløpig.
- GitHub-tilgang, innlogging, CI og faktisk publisering er ikke konfigurert.
- Formatering og typekontroll finnes lokalt; øvrig kodekontroll og CI gjenstår.

Ved oppdatering av planen:

1. Kryss av bare oppgaver som er utført og verifisert.
2. Oppdater status i faseoversikten og datoen øverst.
3. Registrer vesentlige beslutninger og endringer nedenfor.
4. Legg til ansvarlige og lenker til GitHub-issues eller pull requests når disse finnes.
5. Juster fremtidige faser ut fra erfaringene, og bevar begrunnelsen for større endringer.

### Neste oppgaver

- [ ] Bekrefte GitHub-organisasjon og ønsket tilgangsmodell.
- [ ] Avklare godkjente Suisse-skriftfiler og logo for full profiltilpasning.
- [ ] Velge første artikler og ressurser, eller godkjenne bruk av eksempelinnhold.
- [ ] Avklare prosjekt- og innholdsansvarlige.

### Endringslogg

| Dato       | Endring                                                     | Begrunnelse                                                                                                                      |
| ---------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-30 | Opprettet planen med åtte faser og fire MVPer.              | Samlet avtalt retning, Pages-demonstrasjon, futuristisk design og avgrenset GitHub-tilgang i et dokument for løpende oppfølging. |
| 2026-10-30 | Etablert lokalmiljø og første prototype.                    | Verifisere lokal kjøring og begge byggvarianter før integrasjon med designbibliotek og GitHub.                                   |
| 2026-10-30 | Integrert publisert Digitalarkivet-tema og MUI-komponenter. | Erstatte midlertidige designverdier med virksomhetens bibliotek uten tilgang til andre GitHub-repoer.                            |

| 2026-10-30 | Forbedret visuell struktur og navigasjon. | Kortere introduksjon, katalog høyere opp, samlet søk/filter, aktiv meny, klikkbare snarveier og egne eksempelsider. Logo og Suisse-filer mangler fortsatt. |
| 2026-10-30 | Gjeninnført romslig, futuristisk forside og tilpasset MUI-uttrykket. | Stor overskrift og KI-illustrasjon, mørke blågrønne flater, diskret rutenett og lys-/gradienteffekter. Katalog, navigasjon og detaljsider beholdes. |
| 2026-10-30 | Implementert valgt arklogo og favicon. | Ren SVG i toppmenyen med samme aksentfarge som overskriften, SVG-favicon, ICO i 16/32/48 piksler og Apple-ikon i 180 piksler. |
| 2026-10-30 | Arklogo erstatter KI-tekst i forsideillustrasjonen. | To dempede ringer, to datapunkter og statisk grønt lys. Kompakt illustrasjon vises også på mobil. |
| 2026-10-30 | Hentet tilbake opprinnelige kryssende ringer. | Mindre arklogo i sentrum, med opprinnelig futuristisk ringuttrykk etter visuell tilbakemelding. |
| 2026-10-30 | Lagt til første lokale RAG-tjeneste og «Spør KI». | Offentlig kildehenting, lokal Ollama-adapter og kildesøk i Pages. Modellvalg, live generering og produksjonstilgang gjenstår. |

## Tillegg – RAG-tjeneste

- [x] Opprette offentlig kildegrunnlag fra tre eksempelressurser.
- [x] Implementere nøkkelordbasert henting og vise kildeutdrag.
- [x] Lage separat lokal API og modelladapter for Ollama.
- [x] Beholde statisk Pages-bygg med kildesøk uten modellkall.
- [x] Verifisere henting, validering og avvisning av fremmed opprinnelse.
- [ ] Bekrefte godkjent modell og konfigurere modellnavn.
- [ ] Verifisere genererte svar, feilsvar og kildebruk mot faktisk modell.
- [x] Visuell kontroll av «Spør KI» i nettleseren ved 320 piksler, inkludert lukking med Escape og retur av fokus (6. november).
- [ ] Utvide kunnskapsgrunnlaget og evaluere søkekvalitet; vurdere embeddings ved behov.
- [ ] Etablere produksjonsdrift, autentisering og ratebegrensning før ekstern lansering.
- [ ] Utforme separat tilgangskontroll for interne kilder før slike kilder legges til.

### Chatbot på forsiden – 30. oktober 2026

- [x] Knapp som åpner chatdialog på forsiden.
- [x] Samtalehistorikk i minnet, kildeutdrag og tømming av chat.
- [x] Gjenbruk av RAG-API og statisk kildesøk.
- [x] Første visuelle nettleserkontroll utført 6. november; se KVALITETSKONTROLL.md.

### Visuell tilpasning av chatbot – 30. oktober 2026

- Portalens arklogo, mørke blågrønne flater, gradienter og grønne lyskanter brukes i chatten.
- Meldinger, kildekort og skrivefelt har felles formspråk.
- Forslag til spørsmål fyller skrivefeltet uten å sende automatisk.
- Visuell nettleserkontroll er fortsatt uverifisert grunnet tidligere avvisning fra nettleserverktøyets URL-policy.

## Teknisk opprydding – 30. oktober 2026

- [x] Skilt grunnstiler, layout, forside, katalog, artikler og chat i egne stilfiler.
- [x] Fjernet overskrevne CSS-deklarasjoner uten å endre eksisterende klassenavn.
- [x] Delt chatbot i logikk, tilstand, API-klient og mindre visningskomponenter.
- [x] Samlet API-typer og validering i en delt kontraktmodul.
- [x] Skilt HTTP, modelladapter, instruksjoner og RAG-svarflyt.
- [x] Samlet gjentatte farger og effekter i tema-/designverdier.
- [x] Lagt til tester for samtaletilstand, API-kontrakt, samtidighet og modellfeil.
- [x] Dokumentert modulgrenser i ARCHITECTURE.md.

Oppdelingen skal bevare eksisterende utseende, kilder og tilgangsbegrensninger. Visuell nettlesersammenligning er foreløpig ikke verifisert på grunn av tidligere blokkering i nettleserverktøyet.

## Statusgjennomgang – 6. november 2026

- Faseoversikt og oppgaver er avstemt mot eksisterende kode og lokal Git-historikk. Tidligere «ikke startet»-status for design og demo var utdatert.
- Lokal Git har første commit. GitHub-remote, CI, publisering og innlogging er fortsatt ikke konfigurert.
- Første nettleserkontroll er nå mulig og gjennomført. Tidligere merknader om blokkering beskriver situasjonen 30. oktober, ikke dagens status.
- Hovedinnholdet er gjort fokuserbart for «Hopp til innhold». Fokusmarkering omfatter også tekstområder og kildeutdrag. Menylenkene har minst 44 pikslers høyde, og bunnteksten har plass under chatknappen.
- Se [kontrollrapporten](KVALITETSKONTROLL.md) for omfang, funn og gjenstående kontroller. Dette er første kvalitetssjekk, ikke en full WCAG-revisjon.
- Prioritert videre: utvidet tilgjengelighetskontroll, godkjent offentlig innhold, eget GitHub-repo og CI, deretter Pages-demo og brukertest.

## Tilgjengelighet og erklæring – 6. november 2026

- [x] Vurdere alle 48 krav i en egen kontrollmatrise, med eksplisitte avgrensninger og uavklarte punkter.
- [x] Utføre utvidet lokal tastatur-, DOM-, mobil-, landskaps- og tekstavstandskontroll og rette funn.
- [x] Legge til kontrasttester, HTML-grunnkontroll, nettstedskart og lokal tilgjengelighetsside.
- [x] Lage erklæringsgrunnlag med bekreftet kontaktadresse, klageadgang og vedlikeholdsrutine.
- [ ] Fullføre skjermleser, verifisert zoom, resterende kontrast-/fokustilstander og flere nettlesere.
- [ ] Avklare ansvarlig godkjenner, juridiske registreringsopplysninger og endelig nettadresse.
- [ ] Registrere og publisere den formelle erklæringen i uustatus.no og lenke den fra portalen før lansering.

Detaljer: [WCAG-kontroll](docs/tilgjengelighet/WCAG-KONTROLL.md), [erklæringsgrunnlag](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md). Fase 3 er ikke ferdig godkjent før de gjenstående manuelle kontrollene er gjennomført.

## Første skill i lokalt bibliotek – 7. november 2026

- [x] Opprettet separat lokalt `Skills`-repo med første commit `85af197` og struktur for flere skills. Ingen GitHub-remote er konfigurert, i tråd med brukerens avklaring.
- [x] Kopiert tilgjengelighetsskillen med arbeidsmal, referanser og agentmetadata til `skills/tilgjengelighetserklaering/`.
- [x] Gjort skillen søkbar i portalens katalog med egen detaljside og tydelig skille mellom lokal skill og eksempelressurser.
- [x] Lagt til tester for søk, nøkkelord, typefilter og kildehenting; 21 tester passerer.
- [ ] Avklare eventuell senere GitHub-publisering, tilgang og distribusjon. Ingen automatisk synkronisering eller installasjon er innført.

Tilgjengelighetskontrollen fra 6. november omfattet ni sider. Den nye skill-detaljsiden utvider portalen til ti sider og må inngå i neste samlede tilgjengelighetsvurdering.
