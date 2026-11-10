# Kartlegging av informasjonskapsler og samtykke

**10. november 2026 · Codex (OpenAI) · informasjonskapsler-og-samtykke 0.1.0.** Lokal utviklingsutgave på `http://127.0.0.1:3000`, uten innlogging. Base `89b2bd5` med ucommittet arbeid. Ingen juridisk godkjenning, commit eller publisering.

## Bannerbeslutning

**Ikke påvist behov for samtykkebanner i det testede lokale utvalget.** Ingen banner er implementert. Produksjons-/pilotbehov er fortsatt uavklart til faktisk identitet, drift, proxy/CDN, integrasjoner og behandling er kartlagt. Et banner er ikke valgt som standardreaksjon på usikkerhet. Ingen nødvendighetsunntak er oppfunnet for ukjente cookies.

[Vurdert beslutning](bannerbeslutning.json) og [inventar](inventar.json) viser grunnlag og avgrensninger. Vurderingen tar utgangspunkt i [Nkom](https://nkom.no/internett/informasjonskapsler-cookies) og [Datatilsynet](https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/bruk-av-informasjonskapsler-og-andre-sporingsteknologier/?print=true), kontrollert 10. november 2026. Samtykkepliktig bruk skal vente på gyldig valg; det er ikke identifisert slik bruk i dette utvalget. Et senere nytt formål krever ny vurdering.

## Faktiske undersøkelser

- Skillens egen `review.py` er kjørt, ikke bare en plan skrevet. Kildesøk lagrer fil/linje/type/hash, ikke rå kodelinjer eller verdier. Egen kode viser ikke direkte storage-/cookie-/analyse-API-er. Indikatorer gjelder kontroll-/prisinnhentingsskript og er vurdert som CLI-aktiviteter, ikke integrert klientsporing. [Første kildeøyeblikksbilde](raw/source.json), [etter innholdsendringene](raw/source-final.json).
- **27 faktiske nettlesersnapshots på 21 eksisterende sider/sidetilstander**, med initialvisning, navigasjon, katalogsøk, valgt filter/null treff, pause av animasjon, syntetisk serverchat, reload og seks åpne prisdetaljer. [Metadata](raw/browser.json). Alle fem undersøkte lagertyper var tomme i snapshottene: document.cookie-navn, localStorage-/sessionStorage-nøkler, IndexedDB-databasenavn og Cache Storage-navn. Ingen blokkerte lagertypelesinger ble rapportert av proben.
- Den observerte chatforespørselen var et syntetisk «Hva er KI-prat?» til samme origin `/api/rag` og viste kildebasert veiledning **uten språkmodell**. Ingen faktiske personopplysninger eller API-nøkler ble brukt/lest. Dette er ikke testing av aktiv modellleverandør.
- **21 anonyme GET-responser på faktisk observerte dokumentstier:** 20 med 200 og én lokal 404. Ingen Set-Cookie-headere. [HTTP-metadata](raw/http.json). HTTP-delen følger ikke redirect; første teknisk fullførte delkjøring viste 20 slash-redirects og ble fulgt opp med de faktisk observerte dokumentstiene. Første sandbox-blokkerte forsøk og redirect-kjøringen er bevart som egne mapper.
- Registrerte ressurs-, script- og iframe-origins var bare lokal origin / ingen iframes. Resource Timing er et utvalg, ikke full nettverksinspeksjon. Ingen ekstern analyseløsning eller innebygd medietjeneste ble identifisert i aktuell kilde og runtime. Eksterne vanlige lenker er ikke behandlet som innebygde tjenester.
- MUI-provider og utvalgt avhengighetskode er undersøkt: pakken har støtte for lesing/skriving av temapreferanser. Ingen lagrede nøkler ble observert; dette er ikke bevis for null oppslag av fraværende nøkler. Ingen temavelger er konfigurert i den undersøkte portalen. [Avhengighetsnotat](raw/dependency-review.json).

## Metode og instrumentering

Nettleserverktøyet eksponerer ikke full lagrings-/nettverksinspeksjon. Derfor er skillens egen, **midlertidige lokale metadata-probe** montert gjennom eid kildekode, med synlig knapp. Den leser navn/metadata, setter ingen cookies, leser ingen lagrede verdier og sender ingen data. Ingen browser-evaluate-injeksjon, egen browserdriver eller omgåelse av avvist native tilgang er brukt. Probeavhengige ressurser inngår i observasjonene og regnes ikke som permanent portalintegrasjon.

Layouten ble gjenopprettet byte for byte før permanente innholdsendringer, og begge midlertidige komponentfiler er fjernet. [Instrumenteringsprotokoll](raw/cookie-audit-instrumentation.json). Endelig bygg og eksport skal være uten proben. Cookie-siden og den nye skill-detaljsiden ble lagt til etter snapshottene; de bruker eksisterende innholdsmal uten nye lagrings-/sporingstjenester, og kontrolleres separat ved sluttbygg og nettleserlesing.

## Begrensninger og neste kontroll

- Eksisterende testprofil er brukt; ingen brukercookies eller brukerlagre er slettet for å lage en ren profil. Snapshotter fanger ikke nødvendigvis kortvarig lagring mellom prøver.
- HttpOnly er dekket bare gjennom de undersøkte dokumentresponsene; det er ikke full inventering av alle ressurs-/POST-/innloggingsresponser. Cross-origin storage og all nettverkstrafikk/WS/server-til-server er ikke kontrollert av proben. Anonym HTTP-kontroll er ikke en innlogget sesjon.
- Lokal utvikling er ikke produksjon. Next.js-utviklingsverktøy og avhengigheter kan ha annen praksis ved andre tilstander. Ingen framtidig CDN/SSO/driftsleverandør er klassifisert som nødvendig eller cookie-fri.
- Samtykkevalgene avvis/godta/formål/tilbaketrekking er **ikke tilgjengelige og ikke testet** i dagens UI. De skal testes hvis behov senere blir avklart og samtykke implementert.
- Før lukket pilot: kartlegg faktisk URL, identitet, driftsleverandører, eventuell analyse og innebygd innhold; bestem formål/varighet/leverandør og nødvendighet for nye oppføringer, og oppdater beslutning og brukerrettet informasjon.

## Leveranser

[Cookie-informasjon](../../INFORMASJONSKAPSLER.md) og `/informasjonskapsler/` med footerlenke, oppdatert personvernkryssreferanse og en selvstendig Beta-skill i ressurskatalogen. Samme innholdsfil brukes av nettsiden, funksjonsregisteret/sidekartet og Spør KI. Ingen av de andre skillene ble kjørt som forutsetning. [Vurderingsmetadata](raw/assessment.json). Opprinnelig manifest og automatiske utkast beholdes som rågrunnlag; den faglige beslutningen er skrevet etter lesing av data.

## Sluttverifisering av leveransen

Alle **53 Node-tester** i portalen og tre Python-regresjonstester bestod. Pages-produksjonsbygg med TypeScript og rute-/registerkontroll bestod; HTML-grunnkontroll omfatter nå 25 eksportfiler. Sluttbygget har cookie-siden og skill-detaljsiden. Probekontroll/-komponent er ikke med i produktkoden eller eksporten.

Første testkjøring avdekket tre feil fordi den nye innholdssiden ikke var lagt til RAG-kontraktens eksakte ruteliste. Dette er rettet ved å tillate bare den konkrete nye siden; vern mot ukjente/eksterne ruter beholdes. En regresjonstest dekker siden og at spørsmål om portalens cookies/banner finner relevant side først. Live Spør KI viste samme kildebaserte beslutning og lenke. [Første tester](raw/portal-tests-first.stdout.txt), [sluttester](raw/portal-tests-final.stdout.txt), [nettleserlesing](raw/cookie-rag-readback.txt).

Footerlenke, cookie-siden, søk etter cookie-skillen og detaljsidens Beta-/selvstendighetsinformasjon er lest tilbake i den faktiske portalen. Begge nye sider er prøvd ved 1280 og 320 px uten sideoverflyt eller midlertidig probe. Ny dynamisk ressursrute fikk først en gammel utviklingscache/404; rekompilering og reload viste riktig side, uten endring i rutekode. [Råkontroll](raw/new-pages-readback.json), [skjermbilder](screenshots/cookie-decision-desktop.png).

Skill-bibliotekets **45 Python- og åtte Node-tester** bestod. Den nye cookie-pakken er også prøvd isolert med bare sin egen mappe og egne tester: ti Python- og to Node-prøver, samt CLI-kildekartlegging med forventet delstatus uten HTTP/nettleser. Ingen testverdi ble lagret. [Isolasjonsbevis](raw/standalone-verification.json). Standard skill-creator-validator ble forsøkt, men kunne ikke starte fordi PyYAML mangler; den er ikke ført som bestått. Skillens kartleggingsverktøy trenger ikke PyYAML eller andre skills.

Utviklingskontrollene er ikke en full ny WCAG-/personvernrevisjon. Gjeldende tilgjengelighetsstatus og daterte gamle vurderinger er bevart. Nye sider må inngå i neste brede tilgjengelighetsutvalg. [Avsluttende kildeøyeblikksbilde](raw/source-verification.json). Ingen commit, publisering, samtykkeinnhenting eller sporing er utført automatisk.
