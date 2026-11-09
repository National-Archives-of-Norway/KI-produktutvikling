# Versjonslogg

Endringer i KI-Produktutvikling føres her, med dato, utførende agent, kontrollresultat og Git-referanse. Nyeste endringer står først. Loggen beskriver prosjektversjoner; en oppføring betyr ikke at nettstedet er publisert.

«Agent» betyr kodeassistenten som utførte arbeidet. Git-forfatteren registreres separat av Git og kan være personen som oppretter commiten. Eksakt modellvariant er ikke registrert for tidligere arbeid og oppgis derfor ikke. Ingen underagenter ble brukt til kvalitetskontrollen eller opprettelsen av denne loggen.

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
