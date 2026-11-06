# Versjonslogg

Endringer i KI-Produktutvikling føres her, med dato, utførende agent, kontrollresultat og Git-referanse. Nyeste endringer står først. Loggen beskriver prosjektversjoner; en oppføring betyr ikke at nettstedet er publisert.

«Agent» betyr kodeassistenten som utførte arbeidet. Git-forfatteren registreres separat av Git og kan være personen som oppretter commiten. Eksakt modellvariant er ikke registrert for tidligere arbeid og oppgis derfor ikke. Ingen underagenter ble brukt til kvalitetskontrollen eller opprettelsen av denne loggen.

## Ikke utgitt – 6. november 2026

**Status:** Lokale endringer, ikke committet eller publisert.

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

**Git-referanse:** Bygger på `ed873b7`. Ny commit-referanse føres inn etter at endringene er committet.

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
