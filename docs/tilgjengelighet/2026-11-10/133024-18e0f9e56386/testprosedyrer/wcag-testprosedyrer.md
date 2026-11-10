# Testprosedyrer for de 48 kravene i nettstedsmalen

Dette er skillens egne praktiske arbeidsprosedyrer, basert på brukerens Excel-mal «Mal – WCAG-sjekkliste for utfylling av tilgjengelighetserklæring for nettløsning», revisjon 30.01.26, og lenkede kravsider hos Uu-tilsynet. De er ikke en kopi av myndighetens testregler eller en automatisk sertifiseringsmotor. Excel-filen skal ikke endres uten eget oppdrag.

Kildene ble kontrollert **9. november 2026**. [WCAG-oversikten](https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86) beskriver gjeldende norsk kravutvalg, og [oversikten over testregler](https://www.uutilsynet.no/regelverk/oversikt-over-testregler-nettsteder/709) gir ytterligere underregler. Følg den enkelte kravsidens «Krav til samsvar», tolking og videre testveiledning ved tvil. Denne pakken dekker de 48 ID-ene i den angitte malen, ikke alle kriterier i WCAG 2.2 eller alle native appkrav. Bekreft sektor, løsningstype, tidsmessig virkeområde og aktuelle unntak før en formell vurdering. Kontroller kildene på nytt ved relevant endring; kildedato er ikke et løfte om at lenker aldri endres.

## Finn riktig prosedyre

- [Prinsipp 1 – Mulig å oppfatte](wcag-1-oppfatte.md): 18 krav.
- [Prinsipp 2 – Mulig å betjene](wcag-2-betjene.md): 17 krav.
- [Prinsipp 3 – Forståelig](wcag-3-forstaelig.md): 10 krav.
- [Prinsipp 4 – Robust](wcag-4-robust.md): 3 krav.
- [Maskinlesbar indeks med kilde, Excel-celle og prosedyrelenke](wcag-kriterier.json).

Åpne bare de prinsippfilene som trengs i den aktuelle deltesten. Ved en full gjennomgang skal alle 48 krav få en dokumentert vurdering eller eksplisitt uavklart status. Hver prosedyre beskriver utvalg, verktøy, trinn, forventet resultat og nødvendig evidens. Flere innholdstyper under samme krav må undersøkes; én vellykket knappetest dekker ikke automatisk hele kravet.

## Felles testprotokoll

1. **Definer omfang.** Registrer faktiske sider, maler, prosesser og dokumenter, også tredjeparter, innlogget innhold og feilsituasjoner når de inngår i oppdraget. Bruk et representativt utvalg som inkluderer alle relevante innholdstyper og hele kritiske brukerforløp. Ikke utled antall nødvendige testobjekter fra et fast, vilkårlig minimum.
2. **Kartlegg verktøy.** Noter OS, nettleser, hjelpemiddel og versjon, viewport, zoom-/tekstnivå, inndatametode og relevante innstillinger. Nettleserautomatisering følger miljøets tillatte API-er. Installer ikke verktøy eller endre brukerens systeminnstillinger uten nødvendig autorisasjon. Mangler egnet testmiljø, dokumenter hindringen.
3. **Test relevante tilstander.** Normal, fokus, hover, valgt/utvidet, ugyldig verdi, feil, venting, resultat og tilbakestilling vurderes der de finnes. Ingen ekte sensitive opplysninger eller reelle betalinger/slettinger trengs for å dokumentere et testforløp.
4. **Før faktiske resultater.** Registrer krav-ID, testobjekt, forutsetning, eksakte handlinger, forventet og observert resultat, faktisk testtidspunkt, verktøy og evidens. Bruk nøytrale testdata. Lagre skjermbilder, relevante kode-/metadatauttrekk og råresultater i prosjektets daterte kjøringsmappe. Ikke kopier hemmeligheter eller unødvendige personopplysninger.
5. **Vurder avvik manuelt.** En skannkandidat, manglende testverktøy og et bekreftet kravbrudd er ulike forhold. Kartlegg konsekvens, kriterium og gjenstående dekning før en konklusjon. Teknikkene er mulige oppfyllelsesmåter, ikke obligatoriske implementasjoner.
6. **Retest samme oppgave.** Etter autorisert retting: gjenta opprinnelig reproduksjon og relevante nabotilstander. Bevar før-resultatet. Flytt et konkret funn til rettet bare når virkningen er verifisert; øvrig usikkerhet under samme kriterium kan bestå.

## Status og dokumentasjonskrav

- **Ikke testet:** Ingen faktisk gjennomføring. Starttilstand i `testplan.json`; skal aldri tolkes som bestått.
- **Uavklart / delvis:** Nødvendig metode, tilstand eller innholdstype mangler, eller resultatet kan ikke avgjøres. Behold konkret beskrivelse av hva som gjenstår. I en K/I/U/B-matrise brukes U.
- **Bekreftet brudd:** Reproduserbart avvik med berørt innhold, relevant kriterium, brukerfølge og evidens. B i arbeidsmatrisen.
- **Undersøkt uten funn:** Avgrens metode og utvalg. K i arbeidsmatrisen er ikke automatisk et formelt «Ja» for hele kravet.
- **Ingen slik innholdstype:** Dokumenter faktisk kartlegging av det utløsende innholdet innenfor erklæringens omfang. Ikke bruk I eller formelt «ingen slik innholdstype» bare fordi siden ikke kunne åpnes. Et relevant unntak vurderes og begrunnes separat.

Behold nyanser mellom deltester og samlet kriterium. Hvis én PDF-overskrift er rettet, kan det konkrete funnet være lukket mens hele 1.3.1 fortsatt er uavklart. Ingen prosent «tilgjengelig» beregnes fra antall grønne skannregler.

## Hvilke bevis er ikke tilstrekkelige alene?

- HTML-/ARIA-inspeksjon eller AX-tre er ikke en faktisk skjermlesertest. Ved bruk av slik støtte: noter hvilke kravdeler som er undersøkt og hvilke som ikke er det.
- 320 px viewport alene er ikke dokumentert 200/400 % forstørring. Registrer den faktiske zoom-/tekstmekanismen ved slik testing.
- Et par beregnede fargepar dekker ikke alle bilder, gradienter, komponenter eller tilstander. Uavrundede mål sammenlignes med riktig terskel.
- Tekstuttrekk, OCR og «tagget PDF» beviser ikke riktige alternativer, semantikk eller leserekkefølge. Sammenlign visuell presentasjon, struktur og faktisk bruk.
- Et vellykket bygg, innført testplan eller feilfritt HTML-delkontrollskript betyr ikke at de 48 testprosedyrene er utført.

## Lagring og brukerrettet erklæring

`run_checks.py` oppretter nye kjøringer med `testplan.json`, 48 uavklarte rader i `wcag-grunnlag.json` og et datert øyeblikksbilde av prosedyrene i `testprosedyrer/`. Planen viser metoden som skal brukes; den utfører ikke testene. Automatisk HTML/kontrast endrer ikke kriteriene til bestått eller brudd uten vurdering.

Fyll ut planen eller suppler med `manual-tests.json` når faktiske tester gjennomføres; knytt resultatene sammen med krav-ID og evidens. Ikke endre tidligere kjøringer ved ny revisjon. Bruk `references/resultatlagring.md` i skillen for videre dokumentoppdatering. Erklæringen skal være kort og brukerrettet: beholde åpne barrierer, alternativer, vesentlig usikkerhet og kontakt, mens testplan og rettingshistorikk blir i rapportene.

## Kildeavvik og vedlikehold

Malen har en skrivefeil i URL-en for 1.2.5 (`forhandsinnpilt`). Den opprinnelige Excel-lenken er bevart i indeksen, sammen med den fungerende kravsiden (`forhandsinnspilt`). Alle de øvrige 47 kravsidene kunne åpnes på de oppgitte adressene. Ingen av lenkekontrollene er en testing av et nettsted som bruker skillen. Ved utilgjengelig kilde: oppgi feil og siste bekreftede kilde; ikke oppfinn en testregel eller endre kravlisten uten grunnlag.
