# Testprosedyrer – Forståelig

Les [felles testprotokoll](wcag-testprosedyrer.md) før bruk. Prosedyrene er egne praktiske arbeidsprosedyrer, ikke ordrette kopier av Uu-tilsynets testregler. Kilder kontrollert 9. november 2026.

## 3.1.1

**Språk på siden**

**Utvalg:** Alle sidetyper og dokumenter med menneskelig språk.

**Verktøy:** DOM-/dokumentmetadata, språklesing og faktisk skjermleser som supplerende brukstest.

**Fremgangsmåte:**

1. Bestem hovedspråket fra faktisk innhold, også på feil- og søkeresultatsider.
2. Kontroller gyldig språkkode på dokumentnivå, for eksempel html lang eller PDF Lang, mot innholdet.
3. Prøv opplesing med egnet språkstøtte der det er mulig. Skill feil dokumentmerking fra manglende stemme i hjelpemiddelet.

**Forventet resultat:** Dokumentets hovedspråk kan bestemmes programmatisk og samsvarer med innholdet. Gyldig merking for bokmål/nynorsk vurderes etter språkstandard og kilde; tilstedeværelse av et vilkårlig lang-attributt er ikke nok.

**Dokumentasjon:** URL/dokument, vurdert hovedspråk, faktisk språkkode, metadata/kode og eventuell opplesing med stemmevalg.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/311-sprak-pa-siden-niva/110). Excel: «Liste over krav», D50.

## 3.1.2

**Språk på deler av innhold**

**Utvalg:** Setninger og avsnitt på et annet språk enn hovedspråket, også innhentet og dynamisk tekst.

**Verktøy:** Manuell språkidentifikasjon, DOM/PDF-spenn og faktisk skjermleser ved opplesingskontroll.

**Fremgangsmåte:**

1. Finn reelle språkskifter i innhold, inkludert tredjepartsvilkår, sitater og modell-/søkeresultater.
2. Kontroller at nærmeste relevante språkmerking dekker nøyaktig dette innholdet; hovedspråk kan overstyres i et underordnet spenn.
3. Prøv opplesing ved behov og vurder unntak for egennavn, etablerte faguttrykk og innlånte ord; ikke kall alle engelske produktnavn brudd.

**Forventet resultat:** Relevante språkpassasjer har riktig, programmatisk bestemt språk. Dokumentert unntak for enkeltord/termer er mulig. Språkdeteksjon alene avgjør ikke semantiske unntak.

**Dokumentasjon:** Tekstutdrag, lokasjon/tilstand, hovedspråk, arvet og lokal språkkode, eventuell opplesing og begrunnede unntak.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/312-sprak-pa-deler-av-innhold-niva-aa/111). Excel: «Liste over krav», D51.

## 3.2.1

**Fokus**

**Utvalg:** Kontroller som får fokus med tastatur eller tilsvarende grensesnitt.

**Verktøy:** Tastatur, nettleser og observasjon av fokus, URL og vinduer.

**Fremgangsmåte:**

1. Flytt fokus gjennom siden uten å aktivere kontrollene.
2. Observer uventet navigasjon, nye vinduer, innsending, fokushopp eller vesentlig omlegging av hovedinnhold.
3. Skill vanlig visning av ekstra informasjon fra en reell kontekstendring; kontroller både første fokus og tilbakeføring.

**Forventet resultat:** Fokus alene utløser ikke en uventet kontekstendring. Et lite verktøytips eller en lokal beskrivelse er ikke automatisk det samme som en ny kontekst.

**Dokumentasjon:** Fokustrinn, URL/vindu/aktivt element før og etter og forklaring av eventuell kontekstendring.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/321-fokus-niva/112). Excel: «Liste over krav», D53.

## 3.2.2

**Inndata**

**Utvalg:** Felter, valg, filtre og innstillinger der en verdi endres.

**Verktøy:** Nettleser, tastatur/peker og observasjon av rute, fokus og hovedinnhold.

**Fremgangsmåte:**

1. Les eventuell forhåndsinformasjon, endre deretter verdi, avkryssing, radiovalg og nedtrekk uten å trykke en sendeknapp.
2. Observer navigasjon, innsending eller andre reelle kontekstendringer, også etter blur eller kort venting.
3. Kontroller at eventuell kontekstendring var tydelig forklart før bruk. Skill forventet lokal filtrering fra vesentlig kontekstskifte.

**Forventet resultat:** Verdiendring gir ikke automatisk kontekstendring uten forhåndsinformasjon. En oppdatering av et resultatfelt er ikke alltid en kontekstendring, men kan kreve statusmelding etter 4.1.3.

**Dokumentasjon:** Felt/verdi, forhåndsvarsel slik det var før bruk, utløsende hendelse og observerte endringer i side/fokus.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/322-inndata-niva/114). Excel: «Liste over krav», D54.

## 3.2.3

**Konsekvent navigering**

**Utvalg:** Gjentatte navigasjonsmekanismer på minst to sider i samme nettsted.

**Verktøy:** Nettleser, tastatur og sammenligning av DOM/visuell rekkefølge.

**Fremgangsmåte:**

1. Åpne representative sider og registrer rekkefølgen på meny, søk, logo og annen gjentatt navigasjon.
2. Sammenlign samme mekanismer ved samme skjermbredde, og kontroller også konsistens innen mobilvisningen.
3. Undersøk avvik og om brukeren selv har valgt en endret rekkefølge; tillegg av et lokalt undermenypunkt endrer ikke nødvendigvis den relative hovedrekkefølgen.

**Forventet resultat:** Gjentatte navigasjonselementer beholder sin relative rekkefølge, med tillatte brukerinitierte endringer. Lik posisjon i absolutt antall piksler er ikke et krav.

**Dokumentasjon:** Sideutvalg, navigasjonssekvenser per bredde, skjermbilder og årsak til eventuelle forskjeller.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/323-konsekvent-navigering-niva-aa/113). Excel: «Liste over krav», D55.

## 3.2.4

**Konsekvent identifikasjon**

**Utvalg:** Komponenter med samme funksjon på ulike sider, inkludert ikoner og tilgjengelige navn.

**Verktøy:** Visuell sammenligning, beregnede navn/roller og faktisk hjelpemiddel ved behov.

**Fremgangsmåte:**

1. Lag en liste over funksjoner som gjentas, for eksempel søk, lagring, nedlasting og lukking.
2. Sammenlign synlig navn/symbol og programmatisk identifikasjon der funksjonen er den samme.
3. Vurder om forskjeller forklares av faktisk annen funksjon eller nødvendig kontekst; ikke krev samme navn på ulike oppgaver.

**Forventet resultat:** Tilsvarende funksjoner identifiseres konsekvent slik at brukeren gjenkjenner dem, både visuelt og via hjelpemidler. Identisk grafikk bør ikke gi skjult forskjellig funksjon.

**Dokumentasjon:** Funksjonsgruppe, sider/komponenter, synlige og beregnede navn, symboler og begrunnet vurdering av ulikheter.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/324-konsekvent-identifikasjon-niva-aa/115). Excel: «Liste over krav», D56.

## 3.3.1

**Identifikasjon av feil**

**Utvalg:** Automatisk oppdagede inndatafeil, også når deaktivert innsending hindrer videre fremdrift.

**Verktøy:** Nettleser, tastatur, testdata og faktisk skjermleser for hjelpemiddelgjengivelse.

**Fremgangsmåte:**

1. Send tomme obligatoriske felt og verdier med feil format, lengde eller område i et avtalt testmiljø.
2. Finn tekst som identifiserer feilen og hvilket felt den gjelder; undersøk koblingen i DOM og med skjermleser.
3. Kontroller om en deaktivert sendeknapp blokkerer brukeren uten forklaring. Ikke forveksle server-/nettverksfeil med ugyldig brukerdata.

**Forventet resultat:** Automatisk avdekkede inndatafeil er forståelig beskrevet i tekst, og berørt felt er identifisert. Farge, ikon eller deaktivert knapp alene er ikke en tilstrekkelig feilbeskrivelse.

**Dokumentasjon:** Testverdi, valideringstrigger, feilmeldingens ordlyd, feltkobling og faktisk opplesing der den er prøvd.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/331-identifikasjon-av-feil-niva/116). Excel: «Liste over krav», D58.

## 3.3.2

**Ledetekster eller instruksjoner**

**Utvalg:** Alle felt der brukeren skal oppgi informasjon, inkludert valg og feltgrupper.

**Verktøy:** Nettleser, tastatur og innholdsvurdering; DOM/skjermleser som supplerende kontroll.

**Fremgangsmåte:**

1. Finn synlig etikett og nødvendige instruksjoner om påkrevd verdi, format og feltgruppe før utfylling.
2. Fokuser feltet og skriv; kontroller at veiledningen fortsatt er tilgjengelig når den trengs, og at placeholder ikke er eneste etikett.
3. Sammenlign instruksjonen med faktisk akseptert innhold og kontroller plassering ved radio-/avkryssingsgrupper.

**Forventet resultat:** Brukeren får tilstrekkelig og synlig veiledning til å oppgi riktig informasjon. Kun et skjult aria-label løser ikke nødvendigvis dette synlige informasjonskravet; kodet etikett vurderes også under 1.3.1/4.1.2.

**Dokumentasjon:** Feltutvalg, etikett/instruksjon, krav til verdier og skjermbilder før og under skriving.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/332-ledetekster-eller-instruksjoner-niva/117). Excel: «Liste over krav», D59.

## 3.3.3

**Forslag ved feil**

**Utvalg:** Automatisk avdekkede feil der en trygg korrigeringsmåte er kjent.

**Verktøy:** Nettleser, testdata og tastatur; hjelpemiddel ved kontroll av tilgjengelighet.

**Fremgangsmåte:**

1. Fremprovoser de samme feilene som under 3.3.1, for eksempel ugyldig e-post eller verdi utenfor området.
2. Verifiser at meldingen forklarer en brukbar korrigering, og prøv denne korrigeringen.
3. Ved sikkerhets-/formålsunntak vurder hva som trygt kan forklares uten å røpe hemmeligheter, og dokumenter begrunnelsen.

**Forventet resultat:** Kjent og trygg hjelp til å rette feilen blir gitt og virker i praksis. «Ugyldig verdi» alene gir normalt ikke nok hjelp når riktig format eller område er kjent.

**Dokumentasjon:** Feil og verdi, foreslått korrigering, resultat ved nytt forsøk og konkret grunnlag for eventuelt unntak.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/333-forslag-ved-feil-niva-aa/118). Excel: «Liste over krav», D60.

## 3.3.4

**Forhindring av feil (juridiske feil, økonomiske feil, datafeil)**

**Utvalg:** Innsending med juridiske/økonomiske følger, endring/sletting av lagrede brukerdata og innsending av testsvar.

**Verktøy:** Sikkert testmiljø med testkonto/-data, nettleser og tastatur.

**Fremgangsmåte:**

1. Kartlegg konsekvensfulle handlinger og avtal hvor de kan testes uten reell betaling, sletting eller forpliktelse.
2. Prøv en tillatt beskyttelse: reversering etter innsending, kontroll med mulighet til korrigering, eller gjennomgang/bekreftelse før innsending.
3. Bekreft at beskyttelsen faktisk virker og at brukeren kan rette opplysninger. Registrer manglende sikkert testmiljø som uavklart, ikke som fravær av funksjonen.

**Forventet resultat:** Minst én av de tre tillatte feilforebyggende løsningene beskytter hver relevant prosess. Ingen av dem krever at agenten utfører en reell irreversibel handling uten særskilt autorisasjon.

**Dokumentasjon:** Prosess og konsekvens, testmiljø, beskyttelsesmetode, tastsekvens og reverserings-/korrigeringsresultat med anonymiserte testdata.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/334-forhindring-av-feil-juridiske-feil-okonomiske-feil-datafeil-niva-aa/119). Excel: «Liste over krav», D61.

