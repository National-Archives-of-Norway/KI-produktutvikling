# Testprosedyrer – Mulig å betjene

Les [felles testprotokoll](wcag-testprosedyrer.md) før bruk. Prosedyrene er egne praktiske arbeidsprosedyrer, ikke ordrette kopier av Uu-tilsynets testregler. Kilder kontrollert 9. november 2026.

## 2.1.1

**Tastatur**

**Utvalg:** Alle funksjoner, fra navigasjon og skjema til spillere, filtre og egendefinerte komponenter.

**Verktøy:** Fysisk tastatur eller dokumentert tastaturinngang i testnettleser; hjelpemiddel ved behov.

**Fremgangsmåte:**

1. Utfør hver valgt brukeroppgave uten mus med Tab/Shift+Tab, Enter, mellomrom, piltaster og Escape etter komponenttypen.
2. Åpne/lukk dialoger og menyer, velg, rediger, rull og send testdata. Prøv alternativer til draoperasjoner der slike finnes.
3. Noter funksjoner som krever bestemte tastetrykktider; vurder bare avgrensede unntak der selve bevegelsesbanen er nødvendig.

**Forventet resultat:** All relevant funksjon er mulig gjennom tastaturgrensesnitt uten særskilt timing, eller har et likeverdig tastaturalternativ. Et klikk sendt av et automatiseringsverktøy teller ikke som tastaturtest.

**Dokumentasjon:** Oppgave, nøyaktig tastsekvens, komponenter og resultat, inkludert alternativ metode og begrunnede unntak.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/211-tastatur-niva/98). Excel: «Liste over krav», D28.

## 2.1.2

**Ingen tastaturfelle**

**Utvalg:** Alle fokuserbare komponenter, særlig dialoger, innbygde rammer og redigeringsfelt.

**Verktøy:** Tastatur og nettleser med observasjon av faktisk aktivt element.

**Fremgangsmåte:**

1. Naviger inn i komponenten, og prøv å gå frem og tilbake med standardtaster.
2. I en modal dialog kan Tab holdes inne; prøv Escape eller en tastaturtilgjengelig lukkekontroll og fortsett utenfor.
3. Hvis utgang krever en uvanlig tastmetode, kontroller at metoden forklares til brukeren før den trengs.

**Forventet resultat:** Fokus kan forlate komponenten ved tastatur. En fungerende modal fokusløkke er ikke i seg selv en felle dersom dialogen kan lukkes og videre navigasjon er mulig.

**Dokumentasjon:** Inn-/utgangssekvens, aktivt element før/etter, lukkekontroll og eventuell synlig veiledning om spesialtaster.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/212-ingen-tastaturfelle-niva/99). Excel: «Liste over krav», D29.

## 2.1.4

**Hurtigtaster som består av ett tegn**

**Utvalg:** Snarveier utløst av én bokstav, tall, tegn eller symbol uten modifiseringstast.

**Verktøy:** Tastatur, snarveisinnstillinger og eventuelt hendelses-/kodeinspeksjon.

**Fremgangsmåte:**

1. Kartlegg dokumenterte og observerte enkelttast-snarveier; prøv dem utenfor tekstfelt og uten komponentfokus.
2. Prøv å slå dem av, endre dem til en kombinasjon med modifiseringstast eller begrense aktivering til komponentfokus.
3. Prøv funksjonen igjen etter endring. Skill egendefinerte snarveier fra nettleserens og native listefelters vanlige oppførsel.

**Forventet resultat:** Hver relevant enkelttast-snarvei kan deaktiveres eller omkonfigureres, eller virker bare når den aktuelle komponenten har fokus. At ingen snarvei tilfeldigvis ble utløst beviser ikke fravær.

**Dokumentasjon:** Snarvei, virkeområde, alternativ innstilling og resultat både med og uten komponentfokus.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/214-hurtigtaster-som-bestar-av-ett-tegn-niva/782). Excel: «Liste over krav», D30.

## 2.2.1

**Justerbar hastighet**

**Utvalg:** Tidsfrister satt av innholdet: sesjon, skjema, lesetid, automatisk navigasjon og forsvinnende handlingsmuligheter.

**Verktøy:** Nettleser, tidtaking og et avtalt testmiljø med kontrollerbare tidsfrister.

**Fremgangsmåte:**

1. Kartlegg hver frist og noter varsel, handling ved utløp og brukerens reelle reaksjonstid.
2. Prøv minst én tillatt løsning: slå av på forhånd, justere til minst ti ganger standard, eller forlenge etter varsel med minst 20 sekunder til reaksjon og minst ti forlengelser.
3. Verifiser reell virkning og avklar eventuell sanntid, avgjørende frist eller varighet over 20 timer etter kilden. Skill systemtimeout fra en frist brukeren må rekke.

**Forventet resultat:** En relevant tidsbegrensning kan håndteres gjennom en av kriteriets tillatte løsninger, eller et dokumentert unntak gjelder. Et varsel uten mulighet til reell forlengelse er ikke nok.

**Dokumentasjon:** Fristlengde, varslings-/utløpstid, handling og antall prøvde forlengelser, konfigurasjon og eventuelt unntaksgrunnlag.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/221-justerbar-hastighet-niva/100). Excel: «Liste over krav», D32.

## 2.2.2

**Pause, stopp, skjul**

**Utvalg:** Automatisk bevegelse/blinking/rulling og automatisk oppdatert informasjon som vises sammen med annet innhold.

**Verktøy:** Nettleser, tastatur, tidtaking og observasjon av animasjon/oppdatering.

**Fremgangsmåte:**

1. Observer automatisk innhold i mer enn fem sekunder, inkludert korte løkker; kartlegg også informasjonsoppdateringer, som ikke har samme femsekundersgrense.
2. Finn og bruk pause/stopp/skjul eller styring av oppdateringshyppighet; prøv med peker og tastatur.
3. Flytt fokus og vent: innholdet må ikke bare være stanset mens kontrollen har fokus. Kontroller gjenopptakelse og begrunn eventuelt avgjørende unntak.

**Forventet resultat:** Relevant bevegelse over fem sekunder kan pauses, stoppes eller skjules; automatiske oppdateringer kan styres etter kriteriet. Redusert bevegelse kan supplere, men dokumenterer ikke alene all nødvendig brukerkontroll.

**Dokumentasjon:** Startbetingelse, varighet, løkke-/oppdateringsform, tastsekvens, faktisk stanset aktivitet og resultat etter fokus flyttes.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/222-pause-stopp-skjul-niva/101). Excel: «Liste over krav», D33.

## 2.3.1

**Terskelverdi på maksimalt tre glimt**

**Utvalg:** Videoer, animasjoner og annet innhold med raske lys- eller fargeendringer.

**Verktøy:** Analyseverktøy for glimt/luminans/rødt der det trengs, tidskodet opptak og kvalifisert vurdering.

**Fremgangsmåte:**

1. Kartlegg kandidater gjennom egenskaper og kontrollerte opptak; unngå å eksponere testpersoner for mistenkt skadelig blinking.
2. Analyser antall glimt i glidende ettsekundsintervaller og relevante terskler for areal, luminans og rødt med et egnet verktøy.
3. Sammenhold resultatet med valgt norsk tolking og W3Cs glimtdefinisjoner. Behold U hvis bare en animasjonsvarighet eller visuell gjetning er tilgjengelig.

**Forventet resultat:** Ingen risikofylt blinking forekommer, eller det er dokumentert at den holder seg innenfor relevante hyppighets-/glimtterskler. Pausemulighet alene opphever ikke dette kravet. Mer enn tre glimt krever vurdering av de normative tersklene.

**Dokumentasjon:** Analysert klipp, tidsintervall, verktøy/versjon, oppløsning, måleinnstillinger, analyseresultat og eventuelt behov for ekspertvurdering.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/231-terskelverdi-pa-maksimalt-tre-glimt-niva/102). Excel: «Liste over krav», D35.

[Tilleggskilde: W3Cs glimtdefinisjoner og terskler](https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html). Ikke bruk WCAG 2.2 som et automatisk tillegg til den norske malen.

## 2.4.1

**Hoppe over blokker**

**Utvalg:** Gjentatte navigasjonsblokker på sider i samme nettsted; relevante dokumenter.

**Verktøy:** Tastatur, faktisk skjermleser og observasjon av aktivt element.

**Fremgangsmåte:**

1. Fra sidens begynnelse finn hoppelenke, landemerker, overskriftsnavigasjon eller annen aktuell mekanisme.
2. Aktiver den med riktig betjeningsmåte og kontroller at hovedinnholdet kan nås uten å gå gjennom alle gjentatte kontroller.
3. For en hoppelenke: trykk Tab etter aktivering og kontroller funksjonelt fokus, ikke bare at siden har rullet.

**Forventet resultat:** Det finnes en fungerende måte å hoppe forbi gjentatt innhold. En visuelt riktig ankerlenke som etterlater tastaturbrukeren øverst gir ikke tilstrekkelig bevis.

**Dokumentasjon:** Valgt mekanisme, tast-/skjermlesersekvens, målelement og faktisk neste fokuspunkt.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/241-hoppe-over-blokker-niva/103). Excel: «Liste over krav», D37.

## 2.4.2

**Sidetitler**

**Utvalg:** Alle sidetyper, dynamiske ruter, feilsider og tilgjengelige dokumenter.

**Verktøy:** Nettlesertittel/DOM og PDF-egenskaper/metadata med PDF-leser ved dokumenter.

**Fremgangsmåte:**

1. Les sidetittelen i nettleseren på hver valgt side og i ulike rutetilstander.
2. Sammenlign med sidens faktiske tema eller oppgave. Undersøk dokumenttittel i Info/XMP og visning i aktuell dokumentleser.
3. Verifiser at tittelen oppdateres ved navigasjon der det er nødvendig; skill title fra synlig h1.

**Forventet resultat:** Korrekt kodet tittel beskriver sidens eller dokumentets formål. Et generisk produktnavn alene er utilstrekkelig når sidens egen oppgave ikke fremgår.

**Dokumentasjon:** URL/rute og faktisk tittel, relevant kode/metadata, dokumentleser og forklaring av samsvar med temaet.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/242-sidetitler-niva/104). Excel: «Liste over krav», D38.

## 2.4.3

**Fokusrekkefølge**

**Utvalg:** Sekvensielle forløp, dynamisk innhold, menyer og dialoger.

**Verktøy:** Tastatur, aktivt-element-observasjon og visuell kontroll, også ved forstørring.

**Fremgangsmåte:**

1. Noter forventede logiske fokussekvenser og gå gjennom med Tab/Shift+Tab.
2. Åpne/lukk komponenter og legg til eller fjern innhold. Kontroller hvor fokus går ved endringer og etter lukking.
3. Gjenta kritiske sekvenser i omflytt/smal visning; undersøk positive tabindex-verdier og CSS-omrekkefølge som mulige årsaker.

**Forventet resultat:** Fokusrekkefølgen bevarer mening og gjør oppgaven mulig. Mer enn én logisk rekkefølge kan være gyldig; den trenger ikke følge hver piksel i det visuelle oppsettet.

**Dokumentasjon:** Trinnvis fokusliste før/etter dynamisk endring, forventet sammenheng, skjermbilder og relevante tabindex-/DOM-funn.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/243-fokusrekkefolge-niva/105). Excel: «Liste over krav», D39.

## 2.4.4

**Formål med lenke (i kontekst)**

**Utvalg:** Tekstlenker, bildelenker, ikonlenker og gjentatte «les mer»-lenker.

**Verktøy:** Nettleser, beregnet tilgjengelig navn og faktisk skjermleser.

**Fremgangsmåte:**

1. Les lenkens navn sammen med den konteksten som faktisk er programmatisk knyttet til lenken.
2. Kontroller lenkemål og at samme formulering ikke skjuler helt forskjellige formål uten tilstrekkelig kontekst.
3. Prøv bildelenker og ikonlenker med skjermleser; ikke krev at alle lenker må forstås isolert når gyldig kontekst finnes.

**Forventet resultat:** Brukeren kan forstå lenkens formål fra teksten alene eller tillatt programmatisk kontekst. En tilfeldig tekst et annet sted på siden er ikke nødvendigvis lenkekontekst.

**Dokumentasjon:** Lenketekst, beregnet navn, relevant kontekststruktur, mål og faktisk hjelpemiddelgjengivelse.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/244-formal-med-lenke-i-kontekst-niva/106). Excel: «Liste over krav», D40.

## 2.4.5

**Flere måter**

**Utvalg:** Innholdssider som inngår i et sett av nettsider.

**Verktøy:** Nettleser, tastatur og nettstedets navigasjon/søk/nettstedskart.

**Fremgangsmåte:**

1. Velg sider fra ulike deler av nettstedet, inkludert nye og dyptliggende sider.
2. Finn hver side gjennom to uavhengige navigasjonsmåter, eksempelvis meny og nettstedskart eller internt søk.
3. Kontroller at metodene faktisk leder til innholdet; begrunn eventuelle sider som bare er trinn/resultat i en bestemt prosess.

**Forventet resultat:** Minst to fungerende måter gjør relevante sider i settet gjenfinnbare. To lenker med samme rute er ikke automatisk to forskjellige navigasjonsmåter; prosessunntak vurderes konkret.

**Dokumentasjon:** Valgte målsider, de to gjennomførte stiene og grunnlag for eventuelle prosessunntak.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/245-flere-mater-niva-aa/107). Excel: «Liste over krav», D41.

## 2.4.6

**Overskrifter og ledetekster**

**Utvalg:** Eksisterende overskrifter, feltetiketter og grupperingsnavn.

**Verktøy:** Manuell innholdsvurdering, nettleser og skjermleser som støtte.

**Fremgangsmåte:**

1. Les overskrifter og etiketter uten resten av brødteksten og vurder hva brukeren forventer under dem.
2. Sammenlign med innholdet og hva feltet ber om; prøv gjentatte og generiske overskrifter i sin kontekst.
3. Hold innholdets beskrivende kvalitet adskilt fra korrekt semantisk koding som kontrolleres under 1.3.1.

**Forventet resultat:** Overskrifter og etiketter som finnes gir en relevant og forståelig beskrivelse av tema eller formål. Kriteriet innfører ikke alene krav om at enhver tekstblokk må ha en overskrift.

**Dokumentasjon:** Utvalg av ordlyd og tilhørende innhold/felt, vurdert kontekst og konkrete misvisende eksempler.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/246-overskrifter-og-ledetekster-niva-aa/108). Excel: «Liste over krav», D42.

## 2.4.7

**Synlig fokus**

**Utvalg:** Alle komponenter som nås med tastatur i relevante visninger og tilstander.

**Verktøy:** Tastatur og visuell inspeksjon; skjermbilder, forstørring og kontrastverktøy som støtte.

**Fremgangsmåte:**

1. Naviger med tastatur, uten å starte med museklikk på kontrollen, og lokaliser fokus ved hvert trinn.
2. Kontroller felt, lenker, menyer, tabellrulleområder og dialoger også ved zoom og over andre flater.
3. Sammenlign fokus før/etter tilstandsendring; undersøk tildekket eller avklippet markering og skjemafeltets tekstmarkør.

**Forventet resultat:** Brukeren kan se hvilket element som har tastaturfokus. Ikke gjør et bestemt pikselmål eller WCAG 2.2s strengere fokuskrav til en automatisk del av denne 48-punktslisten; vurder kontrast separat der relevant.

**Dokumentasjon:** Tastaturutløst tilstand, skjermbilde, komponent/bakgrunn og tilfeller der fokus er vanskelig eller umulig å se.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/247-synlig-fokus-niva-aa/109). Excel: «Liste over krav», D43.

## 2.5.1

**Pekerbevegelse**

**Utvalg:** Flerfingerhandlinger og bevegelser der en bestemt bane er nødvendig, eksempelvis pinch og sveip.

**Verktøy:** Berøringsenhet eller dokumentert berøringsinngang; alternativ enkeltpekerbetjening.

**Fremgangsmåte:**

1. Kartlegg funksjoner som krever flere samtidige kontaktpunkter eller en bestemt bevegelsesbane.
2. Utfør samme oppgave med én peker uten banekrav, for eksempel knapper for zoom eller forrige/neste.
3. Sammenlign resultat og tilgjengelig innhold. Vurder avgjørende unntak, som nødvendig signatur; vanlig dra/slipp er ikke automatisk en stibasert gest.

**Forventet resultat:** De aktuelle funksjonene har en likeverdig enkel pekerhandling, med mindre gesten er nødvendig. Tastaturalternativ alene beviser ikke et enkeltpekeralternativ.

**Dokumentasjon:** Gesttype, testet enhet, oppgave, alternativ enkeltpekersekvens og eventuell unntaksbegrunnelse.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/251-pekerbevegelser-niva/148). Excel: «Liste over krav», D45.

## 2.5.2

**Pekeravbrytelse**

**Utvalg:** Handlinger utført med én peker, også klikk, berøring og dra/slipp.

**Verktøy:** Mus eller berøringsenhet; observasjon av down/up-hendelser som støtte.

**Fremgangsmåte:**

1. Trykk ned på kontrollen og undersøk om virkningen allerede oppstår før slipp.
2. Flytt ut mens pekeren holdes nede, slipp utenfor og prøv avbrytelse eller angre i avtalt testmiljø.
3. Dersom handling skjer på nedtrykk, vurder reversering ved slipp eller et konkret avgjørende unntak. Bruk testdata ved konsekvensfulle handlinger.

**Forventet resultat:** En tillatt mekanisme forebygger feilaktivering: handling først ved slipp med avbrytelse/angre, reversering av nedtrykk ved slipp, eller et dokumentert nødvendig nedtrykk. Hendelsesnavn alene avgjør ikke resultatet.

**Dokumentasjon:** Nedtrykk, bevegelse, slipp, avbrytelse/angre og faktisk sideeffekt før/etter.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/252-pekeravbrytelse-niva/149). Excel: «Liste over krav», D46.

## 2.5.3

**Ledetekst i navn**

**Utvalg:** Betjeningskomponenter med synlig tekst eller bilde av tekst som etikett.

**Verktøy:** Nettleserens beregnede tilgjengelige navn; eventuelt faktisk stemmestyring/skjermleser.

**Fremgangsmåte:**

1. Noter synlig etikett nøyaktig og hent komponentens beregnede tilgjengelige navn.
2. Sammenlign teksten i normal og dynamisk tilstand; kontroller særlig aria-label som kan overstyre synlig tekst.
3. Prøv stemmestyring når verktøy finnes; dokumenter dette separat fra navnesammenligningen.

**Forventet resultat:** Det tilgjengelige navnet inneholder den synlige etikettens tekst etter kriteriets regler. Navnet kan gi ekstra kontekst; en ikonknapp uten synlig tekst vurderes ellers under 4.1.2.

**Dokumentasjon:** Synlig etikett, beregnet navn og navnekilde, dynamiske varianter og eventuell stemmestyringssekvens.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/253-ledetekst-i-navn-niva/150). Excel: «Liste over krav», D47.

## 2.5.4

**Bevegelsesaktivering**

**Utvalg:** Funksjoner som utløses ved risting, vipping eller kamera-/brukerbevegelse.

**Verktøy:** Fysisk enhet med relevante sensorer eller dokumentert sensortest; alternative kontroller.

**Fremgangsmåte:**

1. Finn sensor-/bevegelsesutløste funksjoner og prøv dem på egnet enhet.
2. Utfør samme funksjon med ordinære kontroller og slå av bevegelsesaktiveringen.
3. Beveg enheten på nytt og kontroller at utilsiktet aktivering er borte. Skill hjelpemiddelgrensesnitt og nødvendige bevegelsesmålinger fra vanlig appbetjening.

**Forventet resultat:** Relevante bevegelser har både et grensesnittalternativ og en måte å hindre bevegelsesaktivering på, med de avgrensede unntakene i kriteriet.

**Dokumentasjon:** Sensor/enhet, utløsende bevegelse, alternativ betjening, av-innstilling og faktisk resultat etter deaktivering.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/254-bevegelsesaktivering-niva/151). Excel: «Liste over krav», D48.

