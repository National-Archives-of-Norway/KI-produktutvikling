# Personvernkartlegging – KI-Produktutvikling

Dato: 9. november 2026. Utført av Codex (OpenAI) med personvernerklaering 0.1.0. Ingen underagenter.
Grunnlag: commit `56d6886` med lokale endringer. Miljø: lokal utvikling, ikke delt pilot eller produksjon.
Status: **Uavklart – erklæringsutkast**. Ingen juridisk godkjenning.

## Gjennomført og dokumentert

- Kildekode for katalog, chattilstand, HTTP-/RAG-tjeneste, modelladaptere og tema er gjennomgått avgrenset. Se `raw/code-review.json` for filer, metode og begrensninger.
- Lokal helseside viste `generationEnabled: false`; se `raw/runtime-health.json`. Ingen eksterne modellkall ble utført.
- DOM-referanser pekte til lokal origin. Dette er ikke en nettverksopptakskontroll. Lagrings-API-ene var ikke tilgjengelige i verktøyet; se `raw/browser-home.json`. Ingen konklusjon om fravær av cookies eller nettleserlagring.
- Brukeren bekreftet khadah@nasjonalarkivet.no som kontakt for personvernspørsmål. Adressen er ikke bekreftet som personvernombud.
- Appkoden viser minnebasert historikk og lokal katalogfiltrering. Utviklingsserveren viser tekniske forespørsler i konsollen. Ingen database-/filskriving av spørsmål ble funnet i undersøkte RAG-funksjoner. Dette sier ikke at rammeverk, proxy eller leverandør aldri logger.

## Avgrensninger

Ingen hemmelige miljøverdier, rå persondata, leverandørlogger eller avtaler ble innhentet. Ingen full nettverks-, cookie-, avhengighets-, sikkerhets- eller DPIA-kontroll. Ingen verifisering av produksjon, samtykkeflyt eller reell sletting hos leverandører. Lovdata/EUR-Lex kunne ikke åpnes i kildearbeidet; rettslige omtaler bygger på myndighetenes veiledning, ikke en full lovtolkning.

## Behandling og prioriterte tiltak

Detaljer, formål og evidens per aktivitet finnes i `behandlingsoversikt.json`. Rettsgrunnlag er ikke valgt på virksomhetens vegne.

- **P0 før delt pilot: Formell behandlingsansvarlig, personvernombud og godkjenner**. Avklares av Virksomhetens ansvarlige ledelse/personvern. Kontroll: Bekreft navn, kontakt og eierskap.
- **P0 før delt pilot: Rettsgrunnlag for hver aktivitet**. Avklares av Behandlingsansvarlig med personvernfaglig støtte. Kontroll: Dokumenter vurdering per aktivitet.
- **P0 før delt pilot: Hosting, leverandører, tilgang, avtaler og overføringer**. Avklares av Drift og behandlingsansvarlig. Kontroll: Kartlegg faktisk pilotmiljø og avtaler.
- **P0 før delt pilot: Loggdata, lagringstid, sletting og e-post/arkivering**. Avklares av Drift og informasjonsforvaltning. Kontroll: Bekreft faktisk konfigurasjon og rutiner.
- **P0 før delt pilot: Nettleserlagring og eventuelt samtykke**. Avklares av Utvikling og personvern. Kontroll: Undersøk cookies inkl. HttpOnly, local/session storage og nettverkskall i rent pilotmiljø.
- **P0 før delt pilot: Modellavtale og faktisk dataflyt før aktivering**. Avklares av Modellansvarlig og personvern. Kontroll: Avklar formål, trening, mottakere, lagring og overføringer; test godkjent oppsett.

## Erklæring og videre vedlikehold

Gjeldende redigerbare kilde er `src/content/pages/personvern.ts`. Nettsiden `/personvern/`, funksjonsoversikten og Spør KI bruker samme kilde. `erklaering-utkast.md` i denne mappen er et datert arkivutdrag, ikke en parallell redigerbar hovedkilde. Utkaststatus videreføres til virksomheten har bekreftet manglende forhold. Oppdater kartlegging og erklæring ved endret drift, innlogging, analyse, lagring eller modellbruk, og før hvert vesentlig arbeid i versjonsloggen og utviklingsplanen.

## Kontrollerte kilder

- [Digdir – strukturinspirasjon](https://www.digdir.no/digdir/personvernerklaering/706) – kontrollert 2026-11-09.
- [Datatilsynet – informasjon](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/informasjon-og-apenhet/hva-skal-virksomheten-gi-informasjon-om/) – kontrollert 2026-11-09.
- [Datatilsynet – behandlingsgrunnlag](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/om-behandlingsgrunnlag/innledning/) – kontrollert 2026-11-09.
- [Datatilsynet – rett til informasjon](https://www.datatilsynet.no/rettigheter-og-plikter/den-registrertes-rettigheter/rett-til-informasjon/) – kontrollert 2026-11-09.
- [Datatilsynet – klage](https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/) – kontrollert 2026-11-09.
- [Nkom – informasjonskapsler](https://nkom.no/internett/informasjonskapsler-cookies) – kontrollert 2026-11-09.

## Implementasjonskontroll

Alle 39 portaltester og produksjonsbygg med TypeScript bestod. Bygget HTML er kontrollert for tittel, utkastmerking, bekreftet e-postlenke og lenke i bunnteksten; se `raw/rendered-page.json`. Dette verifiserer implementasjonen, ikke lovlighet eller full tilgjengelighet.
