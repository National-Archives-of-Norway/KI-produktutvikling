# Informasjonskapsler og nettleserlagring

Her finner du hva vi har undersøkt om cookies og annen lagring i KI-Produktutvikling, og hva som må avklares før delt drift.

Utkast, kontrollert 10. november 2026 i den lokale utviklingsutgaven. Dette er ikke en bekreftet oversikt over en framtidig produksjonstjeneste.

## Bruk av cookies og behov for samtykke

Det ble ikke observert informasjonskapsler eller oppføringer i localStorage, sessionStorage, IndexedDB eller Cache Storage i det undersøkte lokale utvalget. Anonyme HTTP-kontroller av 21 sidestier viste heller ingen Set-Cookie-headere. Vi undersøkte navigasjon og blant annet katalogsøk, filtrering, pause av animasjonen, et chatspørsmål, prisvilkår og ny innlasting.

- Informasjonskapsler: ingen navn observert i nettleseren eller i de undersøkte dokumentresponsene.
- localStorage og sessionStorage: ingen lagrede nøkler observert.
- IndexedDB og Cache Storage: ingen databaser eller cache-navn observert.
- Eksternt innhold: ingen eksterne script-/iframe-origins eller eksterne ressursorigins ble registrert i dette utvalget. Dette er ikke en full nettverksanalyse.

Siden vi ikke fant aktive lagringsoppføringer i utvalget, har vi ingen bekreftede cookie-navn, leverandører eller lagringstider å oppgi for disse oppføringene. Vi oppgir ikke eksempelkapsler eller en standard varighet som om de var i bruk hos oss.

## Trenger portalen et samtykkebanner?

Det er ikke påvist behov for et samtykkebanner i den kontrollerte lokale utgaven. Vi har derfor ikke lagt inn et banner. Dette gjelder de undersøkte funksjonene og miljøet; behovet skal vurderes på nytt før delt drift og ved nye integrasjoner.

Dersom samtykkepliktig lagring eller sporing innføres, må bruken vente på et gyldig samtykke. Da må brukerne få forståelige valg, enkel avvisning og mulighet til å trekke samtykket tilbake. Teknologi som omfattes av unntakene skal vurderes ut fra faktisk formål. Se [Datatilsynets veiledning om samtykke](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/bruk-av-informasjonskapsler-og-andre-sporingsteknologier/?print=true) og [Nkoms veiledning](https://nkom.no/internett/informasjonskapsler-cookies).

## Hva kontrollen ikke avklarer

Nettleserkontrollen viser metadata fra et eksisterende lokalt testmiljø. Den gir ikke full tilgang til HttpOnly- eller tredjepartslagring i alle tilstander. Utviklingsverktøy og avhengigheter kan oppføre seg annerledes enn en produksjonsutgave. Innlogging, framtidig driftsplattform, proxy/CDN, analyseverktøy og innebygde tjenester må undersøkes i det miljøet som faktisk skal tas i bruk.

## Søk og Spør KI

Katalogvalg og chatvisning bruker midlertidig tilstand mens siden er åpen. Ved kontrollen ga det syntetiske chatspørsmålet kildebasert veiledning uten språkmodell. Serverbehandling, eventuelle logger og framtidig modellbruk er andre forhold enn cookies. Les mer i [personvernerklæringen](/personvern/).

## Spørsmål og oppdatering

Ta kontakt på [khadah@nasjonalarkivet.no](mailto:khadah@nasjonalarkivet.no) hvis du har spørsmål om kartleggingen. Oversikten må oppdateres når innlogging, drift, analyse, innebygget innhold eller nettleserlagring endres.
