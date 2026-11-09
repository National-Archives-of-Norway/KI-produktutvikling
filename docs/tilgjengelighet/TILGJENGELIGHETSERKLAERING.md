# Tilgjengelighetserklæring for KI-Produktutvikling

**Utkast – samlet samsvar er ikke ferdig vurdert. Tidligere språkavvik A11Y-01 er rettet og retestet. PDF-avvikene A11Y-02 og A11Y-03 er rettet og struktur-/metadataretestet. Ingen åpne bekreftede brudd står igjen i arbeidsgrunnlaget, men 12 vurderinger er fortsatt uavklart. Ikke klart til registrering i uustatus.no.** Lokal informasjon på `/tilgjengelighet/` erstatter ikke virksomhetens formelle erklæring.

Siste test, kildegjennomgang og tekstoppdatering: **9. november 2026**. Siste oppfølging bygger på commit `67108ac`, med lokal tilgjengelighetsoppfølging, PDF-retting og dokumentasjonsoppdatering. Tidligere HTML-/språkresultater beholder sine opprinnelige versjonsreferanser. Utført av Codex (OpenAI), med tilgjengelighetserklaering 0.3.0. Første utkast/test: 6. november 2026; tekstlig oppdatering 7. november bevares som historikk.

## Nettsted og ansvar

| Felt                         | Opplysning                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| Nettsted                     | KI-Produktutvikling                                                                   |
| Virksomhet                   | Nasjonalarkivet; juridisk navn og organisasjonsnummer må bekreftes ved registrering   |
| Nettadresse                  | Endelig adresse ikke valgt; testet lokalt på http://127.0.0.1:3000/                   |
| Kontakt                      | khadah@nasjonalarkivet.no, tidligere bekreftet for tilgjengelighet i dette prosjektet |
| Godkjenner/oppfølgingsansvar | Ikke avklart; e-postbekreftelsen er ikke godkjenning eller fullmakt                   |
| Formell erklæring            | Ikke opprettet/publisert; ingen registrering utført av agenten                        |

## Omfang og undersøkelse

20 nåværende HTML-sider er undersøkt, inkludert Oversikt, Godkjente KI-assistenter, Godkjente MCP-er, priser, personvern, funksjonalitetsoversikt, utviklingsplan, versjonslogg, de fem ressursdetaljene og eksisterende sider/chat. Det lenkede PDF-vedleggets syv sider er rendret, og tekst, tagging og metadata er undersøkt. De påviste avvikene med overskriftsroller og dokumenttittel er rettet og struktur-/metadataretestet. Full leserekkefølge, diagramalternativer og faktisk skjermleserbruk gjenstår. Innlogging, privat innhold og svar fra en faktisk modellleverandør er ikke testet.

Bred kontroll før retting: [testrapport](2026-11-09/201443-73cb0a3e52e0/testrapport.md), [manifest](2026-11-09/201443-73cb0a3e52e0/manifest.json), [arbeidsmatrise](2026-11-09/201443-73cb0a3e52e0/wcag-grunnlag.json), [manuelle resultater](2026-11-09/201443-73cb0a3e52e0/manual-tests.json). Referanse: **201443-73cb0a3e52e0**. Skillens HTML-delkontroll omfattet 23 eksportfiler. Nettleser: 60 DOM-kontroller ved tre størrelser og 40 tekstavstandskontroller ved to bredder. Utvalgte tastaturhandlinger, kontrollnavn, rullbare tabeller, dialog, feil og kontrastpar er undersøkt. Midlertidig test-CSS er fjernet.

Tidligere målrettet retest: [retestrapport](2026-11-09/203914-cf2e80bc00f7/testrapport.md), [grunnlag](2026-11-09/203914-cf2e80bc00f7/wcag-grunnlag.json). A11Y-01 ble lukket etter faktisk prisoppdatering og nettleserretest. Øvrige vurderinger er videreført, ikke retestet.

## Tidligere lokale oppfølging før PDF-retting

[Rapport](2026-11-09/205326-389241d1fd6e/testrapport.md), [48-punkts grunnlag](2026-11-09/205326-389241d1fd6e/wcag-grunnlag.json), [testprotokoll](2026-11-09/205326-389241d1fd6e/manual-tests.json). Referanse **205326-389241d1fd6e**. Nytt: syv PDF-sider, seks kontrastpar, fire avgrensede tastaturforløp og chatfokus ved 320 px. Tidligere HTML-, tekstavstands- og språkretest er videreført med sine datoer, ikke kjørt på nytt i sin helhet.

## Rettede PDF-avvik og siste retest

[Mandatforslag for AI enablement-team](../../public/vedlegg/mandatforslag-ai-enablement-team.pdf) er rettet og retestet 9. november 2026. Ny [retestrapport](2026-11-09/210420-07c855b7770e/testrapport.md), [kravmatrise](2026-11-09/210420-07c855b7770e/wcag-grunnlag.json) og [protokoll](2026-11-09/210420-07c855b7770e/manual-tests.json). Referanse **210420-07c855b7770e**.

- **A11Y-02 / 1.3.1:** De kartlagte visuelle overskriftene har nå 27 kodede overskriftsroller: én H1, seks H2 og 20 H3. Strukturelementene er koblet til eksisterende tekst, og 229 MCID-koblinger til ParentTree er kontrollert. Dette retter det konkrete overskriftsavviket, men er ikke en faktisk skjermlesertest av navigasjonen.
- **A11Y-03 / 2.4.2:** Dokumenttittelen er nå «Mandatforslag – AI enablement-team i Nasjonalarkivet» i både Info og XMP; DisplayDocTitle er true. Begge metadatafeltene er lest tilbake fra den ferdige PDF-en.

Alle syv sider er rendret på nytt og er pikselidentiske med originalen. Sideinnholdsstrømmer og tekstuttrekk er også identiske; innhold og visuell utforming er beholdt. Den tidligere PDF-en og råfunnene er bevart i testarkivet. PDF-en er reparert direkte fordi den redigerbare presentasjonskilden ikke finnes i prosjektet; fremtidig eksport må også rette kildefilens overskriftsstiler og tittel.

Ingen åpne bekreftede brudd står igjen i dette arbeidsgrunnlaget. **1.3.1 er fortsatt uavklart**, fordi øvrig PDF-semantikk, lister/diagram, leserekkefølge og faktisk skjermleserbruk ikke er ferdig vurdert. 2.4.2 er undersøkt uten funn i oppgitt omfang. Dette forklarer at det nå er 12 U-punkter: de tidligere 11, pluss 1.3.1 som er flyttet fra bekreftet brudd til uavklart samlet vurdering. Det er ikke påvist et nytt brudd.

Om-siden er ikke et kontrollert fullstendig alternativ til vedlegget. Be om hjelp eller annet tilgjengelig format via **khadah@nasjonalarkivet.no**. Ingen unntak er påberopt. [W3Cs PDF9 om overskriftsmerking](https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF9) og [PDF18 om dokumenttittel](https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF18) ble kontrollert 9. november 2026 som vurderingsstøtte; teknikkene er ikke egne nye lovkrav.

## Kravgrunnlag og samsvar

Arbeidslisten tar utgangspunkt i [Uu-tilsynets 48 krav for offentlig sektor](https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86), kontrollert 9. november 2026. Virksomheten må bekrefte virkeområde og formell erklæring etter [veiledningen](https://www.uutilsynet.no/tilgjengelighetserklaering/korleis-lage-og-oppdatere-tilgjengelegheitserklaering/1131). Ingen ny selvstendig lovtolkning eller myndighetsgodkjenning er gjort.

Samlet samsvar er ikke ferdig vurdert. [WCAG-kontrollen](WCAG-KONTROLL.md) har 26 K, 10 I, 12 U og 0 B. K er undersøkt uten funn i oppgitt delomfang, I er historisk fravær av utløsende HTML-innhold, U er uavklart/delvis, B er bekreftet brudd. Tallene er ikke en samsvarsprosent eller automatisk Ja/Nei-grunnlag for registrering. Noen historiske vurderinger beholdes med dato 6. november, ikke ny testdato.

## Rettet avvik: A11Y-01, språk i prisvilkår

Opprinnelig brudd på [3.1.2](https://www.uutilsynet.no/wcag-standarden/312-sprak-pa-deler-av-innhold-niva-aa/111): engelske vilkårssetninger på `/priser/#codex-subscription` arvet norsk språk uten merking. Dette kunne gi feil uttale i skjermleser. [Opprinnelig bevis](2026-11-09/201443-73cb0a3e52e0/raw/pricing-language.json) er bevart.

**Rettet og retestet 9. november 2026.** Copilot- og Codex-notene genereres nå på norsk fra kjente kildefelt. Alle seks prisseksjoner er undersøkt i nettleser etter faktisk prisoppdatering; tidligere engelske setninger er borte. Tre nye regresjonstester bekrefter at gjentatt oppdatering/JSON-lagring bevarer norsk tekst, kildetall oppdaterer forklaringen og ukjent vilkårsformat gir feil uten å erstatte tidligere norske data. Det er ingen generell automatisk språkdetektor.

[Retestbevis](2026-11-09/203914-cf2e80bc00f7/raw/pricing-language-after-refresh.json), [faktisk innhenting](2026-11-09/203914-cf2e80bc00f7/raw/live-refresh.json) og [skjermbilde](2026-11-09/203914-cf2e80bc00f7/screenshots/pricing-language-fixed.png). Ingen faktisk skjermleseropplesing er testet, og lukking av dette avviket betyr ikke fullstendig samsvar. Kontaktadressen er fortsatt tilgjengelig for hjelp til prisvilkår.

## Animasjon og andre testresultater

Forsideillustrasjonen starter automatisk. Klikk eller Tab til illustrasjonen og bruk mellomrom/Enter for pause/start. Tastaturtesten dokumenterte paused/running på begge punkter og halo, synlig fokus og Tab videre til søkefeltet. Dette erstatter den gamle vurderingen av statisk illustrasjon under 2.2.2. Redusert-bevegelse-regelen er kodekontrollert, men ikke testet med faktisk system-/nettleserinnstilling.

60 normalvisningskontroller og 40 økte tekstavstandskontroller viste ingen sidebredde-overflyt. Pristabellen kunne rulles med høyrepil ved 320 px. Tom chat viste norsk alert/aria-invalid, og Escape returnerte fokus til chatåpneren. Grunnfargenes kontrast ble beregnet til 18,51:1, 12,86:1 og 13,76:1. Dette gjelder ikke alle flater, tilstander eller gradienter. Tidligere dokumentasjon av rettet chatfeltkant beholdes; den er ikke fremstilt som en full ny kontrastretest.

## Hva må avklares og testes videre?

Faktisk skjermleserbruk av navigasjon, tabeller, feil, søkeresultater og chat; faktisk 200 % tekstforstørring og 400 % nettleserzoom; mobil med skjermtastatur; gjenstående PDF-struktur, diagramalternativer og leserekkefølge; alle relevante fokus-/kontrasttilstander; redusert bevegelse i faktisk innstilling; flere nettlesere og utestede dynamiske tilstander. axe/Lighthouse er ikke kjørt. DOM/AX, smal viewport og byggetester erstatter ikke disse kontrollene. Uavklart testing er ikke i seg selv et dokumentert brudd eller rettslig unntak.

## Hjelp, tilbakemelding og klage

Ressursene kan leses fra katalog og nettstedskart uten chatten. Brukeren kan be om hjelp eller alternativt format på **khadah@nasjonalarkivet.no**. Virksomheten må avklare ansvar for oppfølging, fravær og levering før lansering. Ikke lov ubekreftede rettingsfrister. [Uu-tilsynets brukerveiledning](https://www.uutilsynet.no/tilgjengelighetserklaering/hva-betyr-det-brukeren/1129) omtaler tilbakemelding og vanlig svar innen tre uker. Klageinformasjon: [Diskrimineringsnemnda](https://www.diskrimineringsnemnda.no/klage). Sistnevnte URL svarte med JavaScript-applikasjon ved kildekontrollen; innholdet ble ikke fullstendig lest i web-verktøyet.

## Ferdigstilling og vedlikehold

Følg opp eventuelle nye avvik og kildeendringer, fullfør uavklarte kontroller, og bekreft juridiske virksomhetsopplysninger, endelig URL og godkjenner. En autorisert representant må håndtere den formelle erklæringen i uustatus.no. Ingen innlogging, innsending eller publisering er utført. Oppdater ved relevante endringer og følg myndighetens vedlikeholdsveiledning; ingen påminnelse er opprettet. Ingen unntak basert på uforholdsmessig byrde er vurdert.

## Historikk

Tidligere grunnlag er bevart i [historisk erklæringsutkast](2026-11-09/201443-73cb0a3e52e0/raw/previous-TILGJENGELIGHETSERKLAERING.md) og eldre kjøringer. De gamle tallene 29 K / 11 I / 8 U gjelder ikke dagens utvidede kontroll. Ingen tidligere bekreftet feil er fjernet uten evidens; nye mangler og større usikkerhet er synliggjort.

## Retesthistorikk 9. november 2026

Den brede kontrollen fant ett språkavvik. Den etterfølgende målrettede rettingen og retesten lukket A11Y-01. De 13 U-punktene ble da bevart. Senere lokal oppfølging er dokumentert nedenfor. Tidligere erklæring før retting er arkivert i [retestmappen](2026-11-09/203914-cf2e80bc00f7/raw/previous-TILGJENGELIGHETSERKLAERING.md).

## Lokal oppfølgingshistorikk 9. november 2026

PDF-struktur, metadata og faktisk tekst er nå undersøkt. 1.4.5 endres U→K i nåværende innholdsutvalg; 1.3.1 endres U→B og 2.4.2 K→B når PDF-en nå er vurdert. Nye målte webfarger og tastaturforløp er undersøkt uten nye bekreftede webfunn i dette omfanget. Åtte Tab-steg i chat viser en fungerende fokusløkke. Et forsøk med zoomsnarvei endret ikke målbar visning og er derfor ikke dokumentert som en zoomtest. Faktisk redusert bevegelse kunne ikke testes med nettleserens tilgjengelige innstillinger. Ingen OS-innstillinger er endret. Dette var status før PDF-rettingen; siste retest og dagens 12 uavklarte vurderinger er beskrevet ovenfor.

## Retesthistorikk for PDF 9. november 2026

A11Y-02 og A11Y-03 er rettet og struktur-/metadataretestet. De konkrete funnene beholdes med status rettet i JSON-grunnlaget. Faktisk skjermlesertest av PDF-overskrifter og videre PDF-vurdering gjenstår, derfor er 1.3.1 fortsatt U. Samlet samsvar er ikke ferdig vurdert. Ingen formell registrering eller publisering.
