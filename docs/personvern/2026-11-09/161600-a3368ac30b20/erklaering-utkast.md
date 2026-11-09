# Personvern i KI-Produktutvikling

Datert arkivutdrag fra src/content/pages/personvern.ts, 2026-11-09.

Her beskriver vi kartlagt bruk av opplysninger i den lokale utviklingsutgaven av portalen, og hva som fortsatt må avklares.

> Utkast, sist oppdatert 9. november 2026. Gjennomgangen gjelder lokalmiljøet, ikke en verifisert produksjonstjeneste. Erklæringen er ikke godkjent av virksomheten. Ansvar, rettsgrunnlag, leverandører og lagringsrutiner må bekreftes før produksjonssetting.

## Ansvar og kontakt

Portalen er utviklet for produktutvikling i Nasjonalarkivet. Formelt navn på behandlingsansvarlig, kontaktopplysninger til virksomheten og kontakt til personvernombudet er foreløpig ikke bekreftet for denne tjenesten.

Spørsmål om personvern i portalen kan sendes til [khadah@nasjonalarkivet.no](mailto:khadah@nasjonalarkivet.no). Dette er bekreftet som kontaktadresse for personvernspørsmål, ikke som adressen til personvernombudet. Unngå sensitive opplysninger i vanlig e-post.

## Når du besøker portalen

Nettleseren henter sider og ressurser fra nettstedet. Den lokale utviklingsserveren viser tekniske forespørsler og feil i konsollen. Hvilke opplysninger en framtidig driftsplattform vil registrere, blant annet IP-adresser, hvem som får tilgang og hvor lenge logger beholdes, er ikke avklart. Vi har ikke funnet analyseintegrasjoner i den gjennomgåtte applikasjonskoden; dette er ikke en full kontroll av avhengigheter eller framtidig drift.

Søk og filtrering i verktøykatalogen skjer i nettleseren for å finne relevante ressurser. Den gjennomgåtte katalogfunksjonen sender ikke søketeksten til et eget søke-API.

## Når du bruker Spør KI

I serverutgaven sendes spørsmålet til portalens RAG-tjeneste for å finne og forklare relevant innhold. Chatvisningen beholder de siste meldingene i minnet mens siden er åpen. Tidligere meldinger sendes ikke med som samtalehistorikk i neste modellforespørsel. I den statiske demonstrasjonsutgaven skjer kildesøket lokalt i nettleseren.

Modellgenerering var deaktivert ved lokal kontroll 9. november 2026. Dersom en modell senere aktiveres, kan spørsmålet og relevante kildeutdrag sendes til den konfigurerte modellen. Leverandør, behandlingssted, eventuell overføring utenfor EØS, lagring og videre bruk av spørsmål må avklares før aktivering. At API-nøkkelen bare finnes på serveren, betyr ikke at spørsmålet forblir lokalt. Ikke skriv personopplysninger, taushetsbelagt informasjon eller hemmeligheter i Spør KI.

Tøm chat fjerner meldingene fra chatvisningen. Historikken starter også på nytt ved ny innlasting av siden. Dette sletter ikke eventuelle server-, drifts- eller modellleverandørlogger. Vi har ikke funnet lagring av spørsmål i database eller filer i de gjennomgåtte RAG-funksjonene. Lagringstid og sletterutiner for øvrig drift er uavklart.

## Informasjonskapsler og lagring i nettleseren

Kartleggingen av informasjonskapsler og annen nettleserlagring er ufullstendig. Nettleserverktøyet ga ikke tilgang til å kontrollere disse lagrene, og avhengigheter og framtidig driftsplattform er ikke fullstendig undersøkt. Vi kan derfor ikke bekrefte at tjenesten er uten informasjonskapsler eller sporing. Før delt drift må faktisk bruk, formål, varighet og behov for samtykke kartlegges. Se [Nkoms veiledning om informasjonskapsler](https://nkom.no/internett/informasjonskapsler-cookies).

## Formål, rettsgrunnlag og mottakere

De kartlagte formålene er å vise innhold, finne ressurser, gi kildebasert hjelp og drive tjenesten. Ved kontakt på e-post er formålet å følge opp henvendelsen. Virksomheten må bekrefte rettsgrunnlag for hver behandling. Det er ikke valgt et rettsgrunnlag i dette utkastet. Se [Datatilsynets veiledning om behandlingsgrunnlag](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/om-behandlingsgrunnlag/innledning/).

Endelig driftsleverandør, databehandlere, tilgangsroller og eventuelle overføringer utenfor EØS er ikke bekreftet. Det samme gjelder lagring og eventuell arkivering av e-posthenvendelser. Avtaler, mottakere og konkrete slettefrister eller kriterier må dokumenteres før denne erklæringen kan ferdigstilles. Lokal kontroll gir ikke grunnlag for løfter om at ingen logger lagres eller at data aldri brukes til modelltrening.

## Dine rettigheter og klageadgang

Kontakt oss hvis du vil vite om vi behandler opplysninger om deg, be om innsyn eller få feil rettet. Retten til sletting, begrensning, protest og dataportabilitet avhenger av behandlingen og rettsgrunnlaget. Eventuelle arkiv- og bevaringsplikter må også vurderes. Uavklarte forhold i dette utkastet må avklares ved behandlingen av henvendelsen. Les om [retten til informasjon](https://www.datatilsynet.no/rettigheter-og-plikter/den-registrertes-rettigheter/rett-til-informasjon/).

Du kan [klage til Datatilsynet](https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/) dersom du mener personopplysningene dine behandles i strid med regelverket. Vi har ikke funnet automatiserte individuelle avgjørelser med rettsvirkning eller tilsvarende betydelig virkning i de gjennomgåtte portalfunksjonene.

## Videre avklaringer og oppdateringer

Før delt pilot må ansvar, faktisk dataflyt, rettsgrunnlag, driftsleverandører, lagring og nettleserlagring vurderes for pilotens omfang. Erklæringen skal oppdateres ved endringer i innlogging, logging, analyse, modellbruk eller leverandører, og kontrolleres mot faktisk drift. En ferdig erklæring krever bekreftelse fra ansvarlig virksomhet.
