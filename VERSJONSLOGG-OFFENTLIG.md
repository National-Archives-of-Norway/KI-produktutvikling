# Versjonslogg

Her finner du daterte endringer i KI-Produktutvikling: nye funksjoner, innhold, rettinger, kvalitetsarbeid og endrede beslutninger. Nyeste dato står først.

**Sist oppdatert: 18. november 2026.** Datoene er arbeids-/kontrolldatoer fra prosjektets historikk, ikke bekreftede publiseringsdatoer. Ingen offentlig release er bekreftet. Funksjoner kan være implementert og prøvd lokalt uten å være godkjent for offentlig drift.

Se [utviklingsplanen](UTVIKLINGSPLAN-OFFENTLIG.md) for prioriteringer og [funksjonalitetsoversikten](/funksjonalitet/) for dagens funksjoner og begrensninger.

## 18. november 2026 – historikk og dokumentstruktur

- Endringshistorikken er kartlagt mot alle 138 daterte loggoppføringer, planhistorikken fra 30. oktober og 75 lokale commits frem til gjennomgangen. Det tidligere tematiske sammendraget er erstattet av denne daterte historikken.
- Utviklingsplanen viser fremtidige oppgaver, avklaringer og datert beslutningshistorikk. Funksjonalitetsoversikten viser bare det som finnes nå, med status og forbehold.
- Rene gjentatte lokale Docker-ombygginger og rå testlogger beholdes som tekniske bevis i arbeidsdokumentasjonen. De er ikke nye produktversjoner. Vesentlige tekniske rettinger, feilfunn og verifiseringer er med nedenfor. Ingen Git-historikk eller opprinnelig logg er slettet.

## 17. november 2026

- Offentlige utgaver av versjonsloggen og utviklingsplanen er opprettet. Interne arbeids- og driftsnotater beholdes separat.

- Retningen er endret fra lukket pilot til offentlig nettsted uten innlogging. Innholdsreview og vern mot misbruk må fortsatt være på plass før åpning.

- Lanseringskravene er konkretisert i en sjekkliste som skiller lokale oppgaver fra faglige og administrative avklaringer. Den opprinnelige pilotsjekklisten er senere tilpasset offentlig tilgang.

- Feilen som rammet Kom i gang og Om etter oppgradering er rettet ved omstart og fornyet utviklingscache. Feilsøking etter oppgradering er dokumentert.

- Next.js er oppgradert fra 16.4.3 til 16.4.6, og avhengigheter i testverktøykjeden er sikkerhetsoppdatert. Lokal avhengighetskontroll fant ingen kjente funn etter rettingen; dette er ikke en samlet sikkerhetsgodkjenning.

- Forsideanimasjonen står ved siden av de to overskriftslinjene på smale skjermer og følger tekstens høyde. Plassering, tastaturbetjening og fravær av vannrett rulling er prøvd ved flere skjermbredder.

- Søketester kjøres automatisk ved relevante innholdsendringer i lokal utvikling. Testene inngår også i den ordinære kontrollrekken; faktisk modellgenerering vurderes separat.

- Kildevalget for spørsmål om Copilot-genererte tester er rettet. Modellen får et avgrenset kildegrunnlag med bevarte forbehold, slik at unødvendig lang kontekst reduseres. De fem berørte modellspørsmålene er prøvd på nytt.

- Teknisk drift: 12 registrerte lokale Docker-ombygginger og helsekontroller er bevart i den detaljerte loggen. Disse er ikke offentlige publiseringer eller separate funksjonsleveranser.

## 16. november 2026

- Fem faktiske modellprøver avdekket tidsavbrudd, modellfeil og ett feil kildevalg. Resultatene er bevart som feilgrunnlag; oppfølgingen er beskrevet 17. november.

- Retningslinjer for GitHub Copilot har fått egen side med sikkerhet, personvern, kvalitet, oppdateringer og praktiske bruksområder, lenket fra de øvrige retningslinjene og assistentoversikten.

- Faktiske modellprøver av MCP-spørsmål bekreftet kildehenvisninger og skillet mellom godkjente, planlagte og ennå ikke godkjente integrasjoner.

- Logorama MCP og Prometheus MCP er lagt til som godkjente etter opplysninger fra innholdseier. Atlassian beholder ROS-analyse pågår og Slack beholder Planlagt. Statusinformasjon gir ikke i seg selv en aktiv tilkobling.

- Rulling til svarstart er prøvd ved 320 pikslers bredde og i forsidens chatbot, med faktiske modellsvar og nye innsendinger. Dette er avgrensede prøver, ikke en full tilgjengelighetsgodkjenning.

- Spør KI ruller til starten av det nyeste svaret. Retur av tastaturfokus til tekstfeltet trekker ikke lenger visningen ned forbi svaret.

- Løpende CI og støttekrav er samlet på Node 24. Historiske kontroller med Node 22 beholdes som bevis for sine daværende revisjoner.

- En blokkering i det delte CI-miljøet er avklart som et oppsettsforhold før testene starter. Godkjent drifts- og kjøreoppsett må fortsatt avklares; lokale tester gjør ikke den delte kontrollen grønn.

- Første opplasting av kildekoden er bekreftet. Feil i automatisk kontroll ble avgrenset til uthenting av kildekoden, mens kontrollene bestod lokalt. Dette var ingen publisering av nettstedet.

- Hele den lokale kvalitetskontrollen og begge byggvariantene er prøvd før første opplasting. Sjekklisten skiller teknisk kontroll fra innholds- og lanseringsgodkjenning.

- Årsaken til treg lokal Qwen-generering er undersøkt med sammenlignbare prøver. Fire CPU-tråder erstatter automatisk trådvalg i Docker-oppsettet; kald og varm modell er retestet uten å øke tidsgrensen.

- En ren installasjonsprøve bekreftet modellnedlasting, helse og gjenbruk av modellvolum, men modellgenerering traff tidsgrensen. Feilen er bevart og fulgt opp med rettingen av trådvalg.

- README har fått en trinnvis oppskrift for Docker, modellnedlasting, helsesjekk, Spør KI, omstart og feilsøking. Modellvolumet kan gjenbrukes ved ombygging.

- En ny kontroll av dagens filer og lagrede bevis er dokumentert. Ingen bekreftede nøkkelverdier ble funnet i det undersøkte utvalget; gjenværende innholds- og historikkavklaringer er ikke lukket.

- Unødvendig generert nøkkelmateriale er sladdet i et lagret byggbevis. Endringen gjelder dagens fil og fjerner ikke tidligere Git-objekter eller roterer aktive nøkler.

- Fem brutte bildereferanser i historiske erklæringskopier er rettet. Opprinnelige vurderinger, testdatoer og bilder er bevart.

- Teknisk drift: 3 registrerte lokale Docker-ombygginger og helsekontroller er bevart i den detaljerte loggen. Disse er ikke offentlige publiseringer eller separate funksjonsleveranser.

## 13. november 2026

- Skjermbildebevis er ryddet etter et godkjent utvalg: representative bevis er beholdt, historikk arkivert og byte-identiske ekstra kopier fjernet. Referanser og flyttelogg er oppdatert uten omskriving av Git-historikken.

- Et filvis forslag til hvilke skjermbilder som skal beholdes, arkiveres og regnes som identiske kopier er laget før opprydding. Forslaget er senere gjennomført etter godkjenning.

- Git-historikk og lagrede rapporter/bilder er gjennomgått før deling. Funn og begrensninger er dokumentert uten å vise nøkkelverdier. Gjennomgangen er ikke en generell godkjenning av alt innhold.

- Prosjektet har fått en prosess for å registrere vesentlige kunnskapshull og vurdere oppfølging. Vanlig undersøkelse og oppgavens egne funn skal ikke registreres som friksjon.

- Instruksen «Add friction triage process to Agents.md» er lagt i ressurskatalogen med full instruksjon, brukssteg og søkeord.

- Den flytende etiketten i spørsmålsfeltet er gjeninnført etter presisering av ønsket oppførsel. Den løftes ved fokus eller innhold, og rammen er fjernet bak etikettteksten.

- En overlappende etikett i spørsmålsfeltet ble først rettet med fast etikett og testet på smal og bred skjerm. Denne løsningen ble samme dag erstattet av den flytende etiketten; begge endringene beholdes i historikken.

## 12. november 2026

- Spør KI kan finne en samlet skill-oversikt. Navn, antall, beskrivelser og skille mellom pakker og eksempler avledes av den samme ressurskatalogen.

- Docker Compose med portal, separat Ollama-tjeneste og Qwen3:4b er etablert. Modellen lagres i et eget volum utenfor Git; faktiske lokale svar med kilder er prøvd. Lokal utprøving er ikke godkjenning for offentlig modellbruk.

- Teknisk drift: én registrert lokal Docker-ombygging med helsekontroll er bevart i den detaljerte loggen. Disse er ikke offentlige publiseringer eller separate funksjonsleveranser.

## 11. november 2026

- Send-knappen beholder tastaturfokus under venting. Etter svar eller avbrudd går fokus tilbake til spørsmålsfeltet bare når det ikke stjeler fokus fra en annen valgt kontroll.

- Søkenøkkelord er lagt til for tydelig kontekst og personvern, slik at blant annet prompt, instrukser, lagring og tømming av chat kan gjenfinnes. Søkeordene er metadata og vises ikke som modellens kildeinnhold.

- Norsk stamming håndterer flere verbformer. Spørsmål med to ulike, tydelig støttede temaer kan få en kilde per tema når vanlig søk ikke gir treff.

- Blindmåling er skilt fra den ordinære testpakken og bruker et menneskeforvaltet eksternt sett. Standardrapporten viser bare samlet resultat; testspørsmål og fasit skal ikke brukes til søketilpasning.

- Oversikt-lenken er fjernet fra bunnmenyen. Siden er fortsatt tilgjengelig fra hovedmenyen.

- Første lokale Docker-forhåndsvisning er bygget og startet som eget miljø, med portal og RAG uten modellgenerering. Den eksisterende lokale utviklingsserveren er beholdt separat.

- Skill-kortene er forenklet ved å fjerne den lange teksten om manglende menneskelig gjennomgang. Beta-etiketten og statusinformasjonen på detaljsidene beholdes.

- Dokumentasjonen er avstemt mot den aktuelle implementasjonen. En dokumentasjonsoversikt skiller gjeldende beskrivelser, historiske kontrollbevis, utkast og lagringsforslag.

- Hele kontrollrekken, inkludert begge bygg, er verifisert i Docker/Linux med de daværende Node 22- og Node 24-versjonene. Dette bekrefter de testede revisjonene, ikke senere endringer eller GitHub-kjøring.

- CI fikk eksplisitt versjonsmatrise, SHA-låste actions, ukentlige oppdateringsforslag og en sjekkliste for første push. Matrisen er senere forenklet til Node 24; sikkerhets- og reviewprinsippene beholdes.

- Datoer og årstall vises som avsnitt fremfor nummererte listepunkter. Send og Avbryt er separate knapper, og portverdier tolkes likt av portal og RAG-server.

- Forslagsspørsmål er samlet i én kilde og regresjonstestet. Kildesøket har fått samlet stoppliste, lavere vekt for handlingsord, færre spesialregler og en indeks som bygges én gang ved innlasting.

- Genererte Python-cachefiler ignoreres av Git for å holde arbeidskopien ryddig.

- Avbrudd, ny innsending og listenummerering er prøvd i Docker/Linux med simulert modelltransport. Resultatene er lagret som datert teknisk kontrollgrunnlag.

- Spør KI har fått en Avbryt-knapp, varsel når innlimt tekst kuttes og tegnvisning nær grensen. Lister med gjentatte «1.» nummereres fortløpende; bevisste nummerhopp beholdes.

- Prisparseren tåler irrelevante ugyldige tabeller og avgrensede fotnoter uten å godta tvetydige priser. Tomme RAG-verdier behandles likt, og port 0 avvises ved vanlig oppstart.

- Kildesøket har fått enkel norsk stamming og krav til dekning av meningsbærende ord. Rangeringen er forbedret og negative spørsmål uten støtte regresjonstestes.

- Format, typer, Node-/Python-tester, innholdssynk, lenkekontroll og bygg er samlet i en kontrollflyt. CI for endringer og manuell kjøring er klargjort, og README er forkortet uten å slette historikken.

- En manglende delt modul i kopien til innholdssynktesten er rettet. Oppstart av RAG fra den isolerte kildekopien testes også, slik at nye delte moduler følger med.

- Utviklingsplan, funksjonsregister og versjonslogg er avstemt. Nyere lokale tester og eldre kontrollresultater skilles, og åpne produksjonskrav er videreført.

- Svarparseren håndterer nummererte lister over tomme linjer, fortsettelseslinjer og kildehenvisninger i fet tekst. Spørsmålslengden teller brukeropplevde tegn, inkludert sammensatte emoji. Statisk demohenting lastes bare i demovarianten.

- Tidsgrenser og avbrudd er prøvd gjennom klient, proxy og RAG-server i Docker/Linux med simulert transport. Lange forespørsler og avbrudd er kontrollert uten bruk av en faktisk ekstern modell.

## 10. november 2026

- Modell, proxy og klient har fått samordnede tidsgrenser. Avbrudd sendes videre, kapasitet er konfigurerbar, og modellfeil bevarer kildene. Ollama-stier og svar som ikke er JSON håndteres tydeligere.

- Hele den daværende testpakken, typekontrollen, innholdssynk og produksjonsbygget er prøvd i Docker/Linux med prisfixturer og uten leverandørkall.

- Prisrettingene er testet i Docker/Linux med eksisterende fixturer og lokal simulering av prisarbeidsflyten, uten kall til priskilder.

- Prisoppdateringen skiller reelle pris-/statusendringer fra tidsstempler og gjenbruker én oppdateringsgren og PR. Tabell- og tallparsing er strammet inn, og loggoppføringer legges under eksisterende «Ikke utgitt».

- HTTP-rettingene er stressprøvd i Docker/Linux med store avviste forespørsler etterfulgt av nye kall. De undersøkte kallene bestod uten etterfølgende tilkoblingsfeil.

- HTTP-rettingene er prøvd med Node 22 på macOS, inkludert store avviste forespørsler og etterfølgende kall. Det gjelder dette historiske testmiljøet; gjeldende støtte er senere endret til Node 24.

- RAG-API-et har fått validerte tillatte origins, robust Content-Type-tolking og kontrollert avvisning av for store forespørsler. Klientfeil og interne feil har ulike statuskoder, med nøytrale feilmeldinger.

- Falske treff og feil rangering i kildesøket er rettet med evalueringssett, mer avgrenset prefikssøk og deterministisk sortering. Rangeringen er senere videreutviklet 11. november.

- Norsk språkmerking i PDF-vedlegget er rettet uten å endre innholdets utseende. Varsel om gamle prisdata oppdateres ikke lenger automatisk mens siden står åpen.

- En ny tilgjengelighetsgjennomgang med oppdatert skill avklarte lokale fokusforhold og avdekket PDF-språk og prisvarselets tidsoppførsel. Funnene er bevart og retestet etter retting.

- Kontrast for nødvendig grafikk og kontrollmarkeringer, inkludert PDF-diagrammet, er vurdert. En overgang som svekket markering av valgt ressursfilter er rettet og retestet.

- Kontrast er undersøkt i faktiske interaktive tilstander og i PDF-en. Resultatene viderefører avgrensede vurderinger og er ingen full samsvarsgodkjenning.

- De 86 uavklarte kontrastforekomstene fra axe er undersøkt nærmere. Beregninger og vurderinger er dokumentert uten å likestille automatisk skann med full manuell vurdering.

- Cookie-siden og cookie-skillens detaljside er tatt med i tilgjengelighetskontrollen med tastatur-, responsivitets-, axe- og HTML-prøver.

- En selvstendig skill for informasjonskapsler og samtykke er lagt til, og portalen har fått cookie-side basert på kartlegging. Samtykkebanner ble ikke innført for det undersøkte oppsettet; behovet må vurderes på nytt ved endret lagring eller sporing.

- En kravvis plan beskriver hva som trengs av verktøy, hjelpemidler og dokumentasjon for å avklare de daværende 15 uavklarte tilgjengelighetskravene. Antallet er historisk.

- Tilgjengelighetserklæringen skiller tydelig mellom kjente brudd og forhold som ikke er ferdig vurdert. Uavklarte krav har fått brukerrettede forklaringer.

- Flere lokale tilgjengelighetskontroller er gjennomført for tastatur, chat, katalog, tekstavstand og kontrast. Gjenstående manuelle prøver er dokumentert.

- Lokale testverktøy for axe og HTML-validering er installert og kjørt. Automatiske resultater og manuelle vurderinger holdes adskilt.

- PDF-lister og tekstkontrast er rettet, og feilsiden har fått norsk språk og beskrivende tittel. Vedleggets øvrige struktur og innhold er bevart og retestet.

- Tilgjengelighetsskill 0.5.0 er kjørt på portalens sider og chatforløp. Nye PDF-/språkfunn og manglende testverktøy er dokumentert før senere retting og installasjon.

## 9. november 2026

- Katalogen er oppdatert til tilgjengelighetsskill 0.5.0 med automatisert deltesting og en tydelig manuell restliste for alle 48 krav.

- Alle 48 testprosedyrer er gjennomgått mot portalen. To nye PDF-avvik ble bekreftet; de står som historiske funn frem til rettingene 10. november.

- Tilgjengelighetsskill 0.4.0 har fått konkrete testprosedyrer for alle 48 krav, med fremgangsmåte, verktøy, forventet resultat og dokumentasjon.

- Tilgjengelighetserklæringen er ryddet slik at omfang, samsvar, begrensninger og kontakt vises uten interne test- og arbeidsdetaljer. Utkaststatus er beholdt.

- PDF-vedlegget har fått semantiske overskrifter og en beskrivende norsk dokumenttittel. Tekst og visuell fremstilling er bevart.

- Lokale PDF- og tastaturprøver avdekket manglende overskriftsroller og generisk dokumenttittel i vedlegget. Funnene ble fulgt opp med retting samme dag.

- Prisvilkår genereres på norsk fra kjente kildefelt. Ukjent format avvises fremfor å kopiere inn ny engelsk tekst; oppdateringsflyten er regresjonstestet.

- Lagrede prisdata er oppdatert fra offisielle kilder, med kilde og kontrolltidspunkt. Automatisk innhenting er ikke kontroll av virksomhetens avtaler.

- En ny tilgjengelighetskontroll omfatter sider og forsideanimasjon. Resultater og manuelle begrensninger er dokumentert, og språkavviket i prisvilkårene ble fulgt opp.

- Forsideillustrasjonen er gjort klikkbar for pause og start, med tastaturstøtte og navn som beskriver neste handling. Den separate pauseknappen er fjernet.

- Forsideillustrasjonen har fått rolig bevegelse i datapunkter og ring. Redusert bevegelse gir statisk visning.

- MCP-oversikten er opprettet med Atlassian MCP som ROS-analyse pågår og Slack MCP som Planlagt. Ingen av oppføringene var godkjent eller aktivert ved opprettelsen.

- Direktelenken til Priser er fjernet fra bunnteksten. Siden finnes fortsatt via Oversikt og nettstedskartet.

- Oversikten over godkjente KI-utviklingsassistenter er opprettet med Copilot, Claude AI og Codex etter opplysninger fra innholdseier. Dette gir ikke generell godkjenning av alle modeller, kontoer eller datatyper.

- «Utforsk ressursene» hopper til katalogankeret også ved gjentatte klikk når ankeret allerede finnes i adressen.

- Verktøykatalog er omdøpt til Ressurskatalog. «Finn en ressurs» er beholdt som overskrift, med tydelig beskrivelse av skills, instrukser og prompter.

- Oversikt er opprettet som inngang til priser og abonnement. Modelloversikt og forbruk er vist som fremtidige utvidelser, uten simulerte bruksdata.

- En prisside for Copilot, Claude og Codex skiller abonnement fra direkte API-priser og tokenpriser. Kilde, kontrolltidspunkt og vilkår vises, med bevaring av tidligere priser ved kildefeil og varsel om gamle data.

- En tidligere oppdatering av prisgrunnlaget samme dag er bevart separat i kildeloggen. Begge prisoppdateringene er historiske og bekrefter ikke dagens prisnivå.

- Personvernerklæring er opprettet som utkast etter kartlegging av faktisk lokal behandling, og lenket fra bunnteksten. Nettsiden og Spør KI bruker samme kilde.

- Personvernskillen er lagt til biblioteket og ressurskatalogen med egen beskrivelse og begrensninger. Ressursdetaljene er tilpasset ulike skill-typer.

- Prototypeteksten er fjernet fra bunnteksten. Dette endrer ikke faktisk modenhet eller produksjonskrav.

- Utviklingsplanen har fått egen side og lenke fra bunnteksten. Plan og logg bruker en felles dokumentvisning med overskrifter, lister og tabeller.

- Åtte utviklingsfaser og krav P1–P10 er avstemt mot leveransene. Første delte miljø ble da endret til lukket pilot; dette historiske valget er erstattet av beslutningen om offentlig tilgang 17. november.

- Menyrekkefølgen er endret slik at oppstart og retningslinjer kommer før ressurser og Spør KI. Kom i gang har fått en tydelig henvisning til retningslinjene.

- KI-prat har fått invitasjon for dem som arbeider med produktutvikling eller utvikling av løsninger i Nasjonalarkivet, med kontakt via AI enablement-teamet.

- Forsidens snarveier er tydeliggjort, og «Utforsk et brukerbehov» er valgt som prøveoppgave. Anbefalingen bruker samme ressursinnhold som katalogen.

- Funksjonalitetsoversikt og nettstedskart avledes av ett register, med status og begrensninger. Spør KI bruker det samme grunnlaget.

- Versjonsloggen har fått egen side og lenke fra bunnteksten og nettstedskartet.

- Tjenesten er klargjort for eksternt OpenAI-kompatibelt modell-API. URL, modell og nøkkel konfigureres på serveren; ekstern modelltransport er prøvd med simulering.

- Kom i gang, Om, KI-prat og Retningslinjer er samlet i felles innholdskilder for nettsidene og Spør KI, slik at tekst og forbehold ikke vedlikeholdes i separate kopier.

- Spør KI viser lesbar veiledning med introduksjon, steg, forbehold og kildelenker. Uten modell merkes veiledningen som hentet innhold, ikke et individuelt generert svar.

- Retningslinjesiden er opprettet med veiledning om verktøy, arkivmateriale, kvalitet og agenttilgang, tydelig merket som arbeidsutkast.

- Et mandatforslag for AI enablement-teamet er lagt ved på Om-siden med filtype og størrelse. Vedlegg krever egen innholds- og tilgjengelighetsvurdering.

- KI-prat er omtalt på Om-siden med møterytme og erfaringsdeling, tilpasset som varig informasjon fremfor invitasjon til ett enkelt møte.

- Skills har fått Beta-etikett og statusinformasjon på kort og detaljsider. Den lange forklaringen på kortene er senere fjernet, mens Beta-merkingen beholdes.

- Erklæringsgrunnlag og WCAG-kontroll er samlet med testhistorikken, og berørte dokumentlenker er oppdatert.

## 7. november 2026

- Vedlikeholdsregler krever at vesentlige endringer føres i riktig versjonslogg for portal og Skills-bibliotek.

- Tilgjengelighetsskill 0.3.0 lagrer kjøringer og bevis i daterte mapper i prosjektet som testes, med bevaring av tidligere resultater.

- Tilgjengelighetsskill 0.2.0 er utvidet fra erklæringsutforming til testing, prioriterte rettingsforslag og retest, med skille mellom kandidater, bekreftede funn og uavklarte forhold.

- Skillens installasjons- og brukerveiledning er gjort generell for ulike maskiner og kodeassistenter.

- Et separat lokalt Skills-bibliotek er opprettet, og tilgjengelighetsskillen er gjort gjenfinnbar i ressurskatalogen.

- Tilgjengelighetserklæringens utkast er tilpasset skillens mal og vurderingsgrunnlag, med presisert omfang og alternative veier til innholdet.

## 6. november 2026

- En vurderingsmatrise for 48 tilgjengelighetskrav, tilgjengelighetsside og nettstedskart er opprettet. Lokale tastatur-, mobil- og tekstavstandsprøver er dokumentert; samlet samsvar er ikke bekreftet.

- Hopp til innhold flytter tastaturfokus riktig, fokusmarkeringer og treffområder er forbedret, og chatdialogen har entydig tittel. Kvalitetsrapport, utviklingsplan og første versjonslogg er etablert.

- Første lokale versjon 0.1.0 er lagret i Git. Den samler portal, MUI-tema, arklogo/favicon, ressurskatalog, veiledningssider, Spør KI, Ollama-adapter og statisk kildesøk. Arbeidet var i hovedsak dokumentert 30. oktober; dette er datoen for første commit, ikke en offentlig release.

## 30. oktober 2026 – arbeid dokumentert før første commit

- Utviklingsplanen ble opprettet med åtte faser og fire MVP-er, og lokalmiljøet ble etablert.
- Digitalarkivets publiserte MUI-tema ble integrert og tilpasset et futuristisk uttrykk, med romslig forside, mørke flater, rutenett og lys-/gradienteffekter.
- Arklogo og favicon ble implementert. Forsideillustrasjonen fikk arklogo i sentrum; opprinnelige kryssende ringer ble gjeninnført med mindre logo etter visuell tilbakemelding.
- Første ressurskatalog, veiledningssider og lokal RAG-tjeneste ble utviklet. Spør KI fikk egen side og chatbot på forsiden med kildeutdrag, spørsmålseksempler og samtalehistorikk i minnet.
- Chatlogikk, svarflyt, HTTP, modelladapter, stiler og designverdier ble delt i moduler. Første tester og arkitekturbeskrivelse ble etablert.
- Dette er datoen i planens arbeidsnotater. Første lagring i Git var 6. november; visuell nettleserkontroll av flere av disse leveransene ble først gjennomført da.
