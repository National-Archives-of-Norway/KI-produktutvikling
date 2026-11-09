# Tilgjengelighetskontroll – 9. november 2026

Utført av Codex (OpenAI) med tilgjengelighetserklaering 0.3.0. Grunnlag: commit `c622090`, lokal utvikling på `http://127.0.0.1:3000/`. Etterfølgende endringer i erklæring/dokumentasjon testes som tekst-/byggendring. Ingen produktfeil er rettet i oppdraget. Midlertidig test-CSS er fjernet.

## Samlet vurdering

**Samlet samsvar er ikke ferdig vurdert. Ett bekreftet brudd: A11Y-01 / 3.1.2 språk på deler av innhold.** Automatiske delkontroller gir ingen samlet samsvarsgaranti. Ingen publisering eller registrering er utført.

48-punkts arbeidsmatrise: {'U': 13, 'I': 10, 'K': 24, 'B': 1}. K betyr undersøkt uten funn innenfor angitt omfang, I er historisk fravær av utløsende HTML-innhold, U er uavklart/delvis, B er bekreftet brudd. Dette er ikke registreringssvar eller en samsvarsprosent. De øvrige gamle vurderingene er ikke gjort om til nye beståtte tester.

## Omfang og metode

- Alle 20 nåværende innholdsruter: forside, Kom i gang, retningslinjer, Om, Oversikt, Godkjente KI-assistenter, Godkjente MCP-er, personvern, priser, funksjonalitet, nettstedskart, tilgjengelighet, utviklingsplan, versjonslogg, Spør KI og fem ressurssider. Se full ruteliste i `raw/browser-responsive.json`.
- Skillens `audit_export` kjørte på ny Pages-eksport uten prosjektsti: **23 HTML-filer**, inkludert genererte feil-/eksportfiler, uten kandidater i språk/h1/main/ID/etikett/ARIA/lenkemål-delkontrollene. Eksporten er en separat statisk testvariant, ikke en utrulling av server-/modellfunksjonene. Manifestet er originalprotokollen og beholdes uendret.
- Nettleser: Codex in-app browser (IAB), på denne macOS-maskinen; eksakt nettleserbuild er ikke eksponert. **60 DOM-kontroller**: 20 sider × 1280×900, 320×740 og 844×390. Ingen sidebredde-overflyt, dupliserte ID-er eller manglende etiketter på synlige felt i disse delkontrollene. Dette er ikke axe, Lighthouse, skjermleser eller faktisk nettleserzoom.
- Første 320px-kontroll ga ett etikettkandidatfunn i chatten. Manuell inspeksjon viste et usynlig MUI-målefelt med aria-hidden=true og tabindex=-1. Det synlige feltet har etikett. Originalfunnet er bevart i `raw/browser-layout.json`; avvisningen er dokumentert i `raw/field-candidate-review.json`.
- **40 tekstavstandskontroller**: alle 20 sider ved 320 og 1280 CSS-piksler med faktisk midlertidig kilde-CSS for linjehøyde 1,5, avsnittsavstand 2em, bokstavavstand 0,12em og ordavstand 0,16em. Ingen sidebredde-overflyt. Utvalgt visuell inspeksjon; ikke full kontroll av klipping i alle tilstander. Overstyringen er fjernet og `globals.css` er tilbake til originalt innhold.
- Tastatur: hopp til main; Tab til/fra animasjon; Space pause og Enter start; nulltreff, nullstilling og Skill-filter; rullbar pristabell med høyrepil; Enter åpner vilkår; tom chat gir alert/aria-invalid; Enter/Escape for chatdialog. Se faktiske målinger og tidspunkt i `manual-tests.json`.
- Grunnfarger hentet fra beregnet CSS: hvit/grå tekst på #09151b gir **18,51:1 / 12,86:1**. Fokusfargen #9df1ad mot samme bakgrunn gir **13,76:1**. De tre råfilene gjelder kun disse solide fargeparene, ikke alle gradienter, lag eller tilstander.
- Animasjonen styres med en HTML-knapp. Space ga paused på begge punkter og halo; Enter ga running, og Tab gikk videre til søkefeltet. Fokus har 3px synlig aksentmarkering. Ingen blinkende opacity-animasjon funnet ved CSS-/visuell kontroll. Global prefers-reduced-motion-regel er lest i kode; system-/medieinnstillingen er ikke emulert/testet.

## Bekreftet avvik A11Y-01 – språkmerking

**3.1.2, P2 før produksjonsgodkjenning.** Åpne `/priser/`, finn ChatGPT-abonnement med Codex, og åpne «Vilkår og avgrensninger». Pro- og Business-notene har engelske setninger med arvet `lang=nb` og ingen engelske språkspenn. Dette er sammenhengende setninger, ikke bare egennavn eller faguttrykk. Se `raw/pricing-language.json` og `screenshots/pricing-language.png`.

Konsekvens: skjermleser kan velge norsk uttale av engelske vilkår. Årsak: engelsk kildeutdrag og norsk forklaring ligger i én note uten språkdata. Forslag: del kildeutdrag/forklaring og sett `lang=en` på engelske setninger, eller oversett kvalitetssikret til norsk. Rett også innhentingsformatet slik at neste oppdatering ikke gjeninnfører avviket. Ikke sett hele blandingsavsnittet til engelsk. Retest alle seks vilkårsseksjoner etter oppdatering og med faktisk skjermleser. Ingen retting er utført i testoppdraget. Eier/frist er ikke bekreftet; foreslått ansvar er innholds-/utviklingsansvarlig. Brukeren kan kontakte khadah@nasjonalarkivet.no for hjelp.

## Gjenstående kontroller og begrensninger

1. Faktisk VoiceOver/Safari eller NVDA-test av leserekkefølge, datatabeller, dynamiske søketall, feil og chatlogg. DOM/AX er ikke opplesingstest.
2. Faktisk 200 % tekstforstørring og 400 % nettleserzoom, mobil med skjermtastatur og flere nettlesere. Viewport-testene erstatter ikke dette.
3. Full fokus-/kontrastkontroll av alle flater, tilstander og gradienter; full vurdering av alle kriterier i utvidet omfang. axe/Lighthouse er ikke installert i prosjektets tilgjengelige avhengigheter og er ikke kjørt.
4. `public/vedlegg/mandatforslag-ai-enablement-team.pdf`: tagging, alternativer og leserekkefølge er ikke testet. Ikke anta at dokumentet er tilgjengelig ut fra HTML-testen.
5. Ny redusert-bevegelse-test med faktisk innstilling i en støttet nettleser. Illustrasjonen kan pauses i den testede normaltilstanden.
6. Oppdaterte priskilder i feilstilstand/foreldet tilstand og chat med faktisk modell-/leverandørsvar er ikke nettlesertestet. Enhetstester med simulerte data er separat utviklingsverifisering, ikke tilgjengelighetsbevis for disse tilstandene.
7. Endelig domene, virksomhetens juridiske opplysninger, ansvarlig oppfølging/godkjenner, virkelig drift, innlogging og privat innhold må avklares før fullføring. Bekreftet kontakt beholdes: khadah@nasjonalarkivet.no.

## Historikk og dokumenter

Eldre resultater fra 6.–7. november bevares. Tidligere rapporter ligger også som øyeblikksbilder i `raw/previous-*.md`. Gamle K-/I-vurderinger uten ny dekning har beholdt testdato 6. november. Tidligere I for 2.2.2 er erstattet av ny kontroll av pausemekanismen; tidligere K for 3.1.2 er erstattet av dokumentert B. Noen tidligere K-punkter er nå U fordi nye sider/dokumenter og faktisk zoom ikke er fullstendig kontrollert.

## Primærkilder kontrollert 9. november 2026

- [Fremgangsmåte](https://www.uutilsynet.no/tilgjengelighetserklaering/korleis-lage-og-oppdatere-tilgjengelegheitserklaering/1131)
- [48 WCAG-krav for offentlig sektor](https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86)
- [Sjekklister](https://www.uutilsynet.no/tilgjengelighetserklaering/wcag-sjekklister-utfylling-av-tilgjengelighetserklaering/1333)
- [Pause/stopp](https://www.uutilsynet.no/wcag-standarden/222-pause-stopp-skjul-niva/101)
- [Språk på deler](https://www.uutilsynet.no/wcag-standarden/312-sprak-pa-deler-av-innhold-niva-aa/111)

## Sluttkontroll av dokumentoppdateringen

Alle 45 prosjekt-/parser-/RAG-tester, produksjonsbygg med TypeScript og Pages-bygg bestod. Den oppdaterte erklæringen er lest tilbake i lokal nettleser og lagret i `screenshots/updated-declaration.png`. Matrisen har 48 unike kriterier og samsvarende statusfordeling; test-CSS er fjernet. Se `raw/document-verification.json`. Originalmanifestets automatiske delkontroll er ikke omskrevet til en full revisjon.
