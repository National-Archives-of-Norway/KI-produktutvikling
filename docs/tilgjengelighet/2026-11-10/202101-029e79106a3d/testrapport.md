# Retest: PDF-språk og varsel om gamle prisdata

**10. november 2026 · Codex (OpenAI) · tilgjengelighetsskill 0.6.0 og PDF-skillen.** Ingen underagenter. Git-base 05d1b80 med tidligere lokale dokumentendringer og disse rettingene; ingen ny commit eller utrulling. [Forrige vurdering](../193339-7e408d0c78ed/testrapport.md) og dens to åpne funn er bevart.

## Resultat

**29 K / 11 I / 8 U / 0 B.** A11Y-08 og A11Y-09 er rettet og retestet. 3.1.1, 3.1.2 og 2.2.2 går B → K i oppgitt lokalt utvalg. Ingen kjente åpne brudd er igjen i det vurderte utvalget. Samlet samsvar er fortsatt ikke ferdig vurdert fordi åtte krav gjenstår. K er en avgrenset arbeidsvurdering, ikke en formell godkjenning.

Nye bevis gjelder språkmerking og prisvarsel, med relevant nettleser-/PDF-regresjon. Øvrige krav videreføres fra tidligere vurderinger med opprinnelig testdato/omfang; de er ikke manuelt prøvd på nytt i sin helhet. [48-kravsmatrise](wcag-grunnlag.json), [testplan](testplan.json), [testmuligheter](testmuligheter.json), [manuell restliste](manuell-oppfolging.md).

## A11Y-08: språkmerking rettet

PDF-katalogen er endret fra `en` til `nb-NO`. De 36 feilmerkede norske BDC-spennene er endret fra `en-US` til `nb-NO`. Alle 2694 ikke-blanke synlige tegn har nå norsk språk etter kobling mellom side/MCID, mest lokal innholdsmerking og strukturtagger. ParentTree er kontrollert uavhengig via revers oppslag og /P-arving. Tidligere 709 tegn i engelske spenn har ikke lenger feil språk. Syv engelske alternativtekster «Koala with solid fill» er bevart, med eksplisitt `en`, slik at endret hovedspråk ikke feilmerker dem som norske.

[Rettingsprotokoll](raw/pdf-repair.json), [språk etter retting](raw/pdf-language-after.json), [retest og uavhengig kontroll](raw/pdf-regression.json), [språkverktøy](raw/pdf-language-audit.py), [regresjonsverktøy](raw/pdf-regression.py), [arkivert førversjon](raw/before.pdf).

Før-hash: `ba267d899460e54a911c548c5ddecfd9a83159ec3b6d7b6e30d9d4f34d0c648a`. Etter-hash: `8b068da112df40b70a4c9e5c16f268ea3eff6996ad08d6eff2b9c1bb1ad14713`.

### Visuell og strukturell regresjon

Alle syv sider er rendret før og etter ved 120 dpi. Pixel-diff er null på hver side. Tekst, tegngeometri, skrifter, farger og MCID-koblinger er identiske. Tegne-/tekstoperasjoner er identiske når bare Lang-egenskapene tas ut av sammenligningen. Rolleantall, liste-/overskriftsstruktur, dokumenttittel og engelske alternativtekster er bevart. [Samlet render](screenshots/pdf-all-pages.png); hvert før-/etterbilde er også arkivert i denne kjøringen.

Dette gir grunnlag for å videreføre tidligere kontrast-/grafikkmålinger under 1.4.3/1.4.11 til den nye PDF-hashen, med dokumentert uendret visuelt innhold. Faktisk opplesing er **ikke** testet. PDF-alternativer, faktisk hjelpemiddelbetjening og meningsfull leserekkefølge har fortsatt egne uavklarte krav.

## A11Y-09: varsel om gamle prisdata rettet

`PricingFreshness` vurderer nå alder når siden åpnes, eller når checkedAt-grunnlaget endres. Det registreres ikke lenger et timeintervall som kan sette inn nye varsler under lesing. Sist kontrollert-dato, kilde og selve varselteksten er beholdt. Funksjonsregisterets prisbeskrivelse er oppdatert; Beta-status er uendret.

En isolert kopi av den nye produksjonseksporten er prøvd med syntetisk klokke og avspilling av eventuelle reelle time-callbacks. Systemklokken og kildenes prisdata er ikke endret.

| Retest | Faktisk resultat |
| --- | --- |
| Åpne med ferske data før terskelen | 0 varsler; 0 registrerte time-callbacks. |
| Behold siden åpen med prisvilkår åpne, kryss terskelen | Fortsatt 0 varsler; fokus beholdes på summary; 0 time-callbacks. |
| Åpne med data eldre enn sju dager | 6 varsler, ett per tabell. |
| Behold gamle data og prøv 320 CSS-px | Fortsatt 6 varsler, ingen sidebredde-overflyt. Dette er viewport, ikke nettleserzoom. |

[Observerte tilstander](raw/clock-retest.json), [vurdert resultat](raw/clock-verdict.json), [oppsett og kildehash](raw/fixture-metadata.json), [kontrollert klokke](raw/a11y-clock.js), [før-kilde](raw/pricing-freshness-before.tsx.txt), [rettet kilde](raw/source-pricing-freshness.tsx.txt), [fersk side etter terskel](screenshots/fresh-after.png), [varsel med gamle data på smal skjerm](screenshots/stale-320.png).

Dette er en eksplisitt klokkesimulering, ikke syv dagers sanntidsventing. At React kan foreta en innledende klientvurdering ved sideåpning betyr ikke at et varsel senere settes inn av en løpende timer. Testen kontrollerer begge situasjonene. Ingen fremtidig leverandør-/modelloppdatering er simulert.

Hero-animasjonens pause og start er retestet med Enter/Space. Den tidligere dokumenterte vedvarende pausen etter fokusflytting videreføres for den uendrede illustrasjonskomponenten. Sammen med rettet prisvarsel gir dette K for 2.2.2 i prøvd utvalg; faktisk OS-innstilling for redusert bevegelse er fortsatt ikke prøvd.

## Automatikk og avstemming

Skillens faktiske nettlesermodul 0.6.0 er kjørt på /, /spor/ og /priser/, med ni viewport-prøver, 24 Tab-steg og pause/startforløp. Alle fem nettlesergrupper fullførte uten kandidater. `run_checks.py --auto` er kjørt med den nye eksporten og faktisk nettleserrapport. Den importerte forside-axe-filen kommer fra forrige daterte `195227-native-1d4e7aee`-kjøring; dette er ikke omtalt som et nytt skann. Ny avsluttende flersides axe-/Nu-regresjon etter oppdatert erklæringsbygg føres særskilt nedenfor. Råmanifest og originalresultater bevares.

[Avstemming](raw/consistency.json) bekrefter at matrise, plan, dekning, restliste og faktisk Markdown-erklæring har samme statuser og åtte U-ID-er, uten åpne funn. Konsistens er ikke vurdering av bevisenes faglige kvalitet eller formelt samsvar. Rendrert side leses også tilbake.

## De åtte gjenstående kravene

| Krav | Nødvendig neste kontroll |
| --- | --- |
| 1.1.1 | Vurder likeverdige alternativer til nødvendig PDF-grafikk, særlig diagrammet, med innholdsfaglig vurdering og faktisk hjelpemiddelbruk. |
| 1.3.1 | Prøv PDF-overskrifter, lister og relasjoner i egnet PDF-leser/skjermleser. |
| 1.3.2 | Prøv faktisk lineær lesing av PDF-side 6–7 og sammenlign med meningsfull visuell rekkefølge. |
| 1.3.4 | Roter fysisk mobil/nettbrett under katalog-, chat- og prisforløp. |
| 1.4.4 | Dokumenter faktisk 200 % tekstforstørring og fullfør kritiske oppgaver. |
| 1.4.10 | Prøv faktisk 400 % nettleserzoom og vurder omflyting, oppgaver og avgrensede tabellrulleområder. |
| 4.1.2 | Betjen kontroller med faktisk skjermleser og dokumenter navn, rolle, verdi og tilstand. |
| 4.1.3 | Lytt til søk, validering, venting, svar og relevante feil med naturlig fokus. |

Tidligere dokumentert begrensning i native appkontroll videreføres med opprinnelig tidspunkt; det er ikke gjort et nytt tilgangsforsøk. Ingen faktisk skjermleser, zoom, fysisk rotasjon, OS-innstilling, ekstern modell eller pilot er testet i denne rettingsøkten. Disse forholdene er ikke skjult av at de to konkrete funnene nå er lukket.

## Regelgrunnlag

Samme kontrollerte kilder fra 10. november 2026 som forrige vurdering: [Uu 2.2.2](https://www.uutilsynet.no/wcag-standarden/222-pause-stopp-skjul-niva/101), [Uu 3.1.1](https://www.uutilsynet.no/wcag-standarden/311-sprak-pa-siden-niva/110), [Uu 3.1.2](https://www.uutilsynet.no/wcag-standarden/312-sprak-pa-deler-av-innhold-niva-aa/111), [PDF16](https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF16) og [PDF19](https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF19). Ingen formell registrering eller virksomhetsgodkjenning er utført.

## Sluttverifisering

Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Ny native-kjøring `203306-native-1c441fbd`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu 0 feil / 207 info-noter. Original motorstatus er bevart. Erklæringen er lest tilbake ved 320/1280 med nøyaktig åtte U-ID-er og ingen kjente åpne brudd. Bevisreferanser, lokale dokumentlenker og dokumentavstemming er kontrollert. Den midlertidige testfanen/serveren er lukket/stoppet og viewport er gjenopprettet.

Skjermdumpen declaration-fixed.png ble tatt under viewportovergang og brukes ikke som grunnlag for stabil layout. DOM-tilbakelesingen bærer kravliste-/breddebeviset; bildene fra klokkeprøven er supplerende visning, ikke alene bevis for timing.

[Native-manifest](../203306-native-1c441fbd/native-manifest.json), [motorvurdering](raw/native-postverification.json), [samlet verifisering](raw/postverification.json) og [erklæringslesing](raw/declaration-readback.json).
