# Lokal oppfølging av gjenstående tilgjengelighetskontroller

**10. november 2026 · Codex (OpenAI) · tilgjengelighetsskill 0.5.0.** Base `b152e73` med ucommittede endringer. Ingen commit/publisering eller nye produktrettinger.

## Resultat

Ingen nye bekreftede åpne brudd i undersøkt utvalg. **22 K / 11 I / 15 U / 0 B**. K betyr undersøkt uten funn i oppgitt delomfang, ikke formelt «Ja». Samlet samsvar er fortsatt uavklart. Alle 48 krav har vurdering og konkret oppfølging i [matrisen](wcag-grunnlag.json) og [testplanen](testplan.json). 34 har automatisk delgrunnlag; ingen samsvarsprosent beregnes.

1.4.12 er endret fra U til K for den prøvde lokale HTML-versjonen. Øvrige kriteriestatuser er bevart. 36 krav har fortsatt bredere vurdering/retest, 11 har ingen utløsende innholdstype lokalt og ett har fullført lokalt tekstavstandsutvalg. At et krav har en retest før utrulling betyr ikke at hele den lokale deltesten er blokkert.

## Nye utførte kontroller

- **Ordinær skill-kjøring:** 21 sidetilstander, 63 viewport-kontroller, 168 Tab-steg og tre deklarerte brukerforløp. Ingen ny kandidat i de navngitte DOM-, solidkontrast-, omflytings-, tastatur- og tilstandsdelene. [Original nettleserrapport](raw/browser-input.json), [samlet automatikk](raw/auto-01.json). Automatisk status needs_review skyldes ekte uavklarte axe-resultater; ingen motor er teknisk blokkert.
- **Tekstavstand:** 42 side-/størrelsesmålinger (21 sider ved 320 og 1280 px), alle fire WCAG-overstyringer verifisert. Ingen sideoverflyt. Visuelt/tastaturbasert utvalg av null treff, valgt filter, dialogfeil, lasting, kildebasert svar, tømming og åpne prisvilkår. Alle seks tabeller ruller med piltast (40 px). Tekstfelt-/autosize-kandidat undersøkt uten bekreftet innholdstap. Ikke alle 42 sider er påstått visuelt skjermbildegransket. [Sider](raw/text-spacing-pages.json), [tilstander](raw/text-spacing-states.json), [rulling etter oppdatering](raw/price-scroll-settled.json), [identisk gjenopprettet CSS](raw/text-spacing-instrumentation.json).
- **Fokus:** Tab og Shift+Tab innen dialogen; tømming og Escape/retur til åpneknapp. Synlige fokusmarkeringer i prøvde knapper; tekstfelt bruker feltmarkering og må ikke klassifiseres som feil bare fordi textarea selv har outline:none. Full forstørret/hjelpemiddeltest gjenstår. [Fokusspor](raw/focus-extra.json).
- **Animasjon:** Alle tre faktiske CSS-animasjoner skifter paused/running med Space/Enter. Pausen består etter Tab. Dette er ikke en test av operativsystemets redusert-bevegelse-innstilling. [Pause](raw/animation-paused.json), [start](raw/animation-running.json), [etter Tab](raw/animation-pause-after-tab.json).
- **Prisalder:** Den faktiske React-komponenten er transpilert uten kildeendring og kjørt i egen lokal testside. Klokken og intervallet er simulert bare i testfanen: før/ved/etter sju dager, neste tick, flere tick, retur før terskel og avmontering. Meldingen kommer én gang etter terskel, gjentas ikke og intervallet ryddes. Ingen maskinklokke endret. Dette avgjør ikke alene om 2.2.2 krever pause/skjul for akkurat dette varselet. [Steg/snapshot](raw/freshness-threshold.json), [kildehash/metode](raw/freshness-harness-build.json), [testkode](raw/freshness-entry.js).
- **80 uavklarte kontrastforekomster:** Alle er matchet mot lokal DOM, med eksplisitt normalisering av eksportens genererte klasser/lenker. Konservative sRGB-/alfagrenser for de undersøkte lagene gir minimum **8,207:1**, altså over 4,5 også for vanlig tekst. Hero-rutenettet er regnet med full intensitet; kortets 1 px topplinje ligger minst 27,25 px over tekst. Modellen beviser ikke alle faktiske overlagringer, skygger eller hover-tilstander. Axe-originalens incomplete-status endres ikke. [Beregning](raw/gradient-bounds.json), [beregningskode](raw/gradient-bounds.py), [beregnede stiler](raw/gradient-matched-styles.json), [geometri](raw/card-pseudo-geometry.json).
- **PDF:** Struktur telt på nytt: 61 Figure, 27 overskrifter og tre lister med tolv punkter. De 73 Figure som ble nevnt i et eldre vurderingsavsnitt var før omkoding av tolv punktmarkører. Alle syv tidligere renderinger er visuelt vurdert på nytt etter identisk PDF-hash. Hovedspråk en og 120 nb-overstyringer er dokumentert; faktisk opplesing og likeverdig diagramformidling er ikke bekreftet. [Struktur/hash](raw/pdf-structure-followup.json), [visuell sidevis vurdering](raw/pdf-visual-review.json). PDF-en er ikke endret.

## Hva kan ikke gjennomføres med godkjente verktøy og tilgjengelig miljø nå?

| Kontroll | Konkret hindring | Slik fullføres den |
| --- | --- | --- |
| Faktisk skjermleser, også PDF | Ingen verifiserbar tale-/hjelpemiddeløkt tilgjengelig; DOM/AX er bare delbevis | Tester bruker VoiceOver med Safari eller NVDA med støttet nettleser/PDF-leser: overskrifter, rekkefølge, språk, kontrollverdier, feil, status, logg, diagram og lister |
| Faktisk 200 % tekstforstørring / 400 % nettleserzoom | IAB eksponerer viewport, ikke bekreftet zoom. Automatisk godkjenningskontroll avviste `cua.getApp('Google Chrome')`: «Computer Use was not approved to use Google Chrome» | Tillatt native nettleser eller menneskelig tester, dokumentert zoomnivå og kritiske oppgaver med fokus synlig |
| Fysisk mobilrotasjon og faktisk redusert bevegelse | Ingen styrbar fysisk enhet eller godkjent OS-preferanseøkt | Test begge orienteringer på enhet og aktiver faktisk redusert bevegelse; se etter tap og automatisk stopp |
| Faktisk native hover-/hjelpemiddel-/nettlesermatrise | Godkjent DOM-verktøy har ikke pekerhover/native app; én tilgjengelig nettlesermotor er ikke hele støttematrisen | Test hover, fokus og feil i avtalte nettlesere med egnet kontrastverktøy |
| Innlogging, modellgenererte svar og publisert fallback | Ingen slik faktisk utrulling/leverandørøkt i det undersøkte miljøet | Test i beskyttet pilot med avtalt identitet og modell, inkludert feil, timeout og direkte 404-URL |

## Faglige vurderinger som fortsatt kan følges opp lokalt

Dette er **ikke manglende automatiske motorer**: nødvendig ikke-tekstlig kontrast og PDF-diagrammets fullstendige alternativ, samt eventuell pause/skjul for tidsstyrt prisvarsel, trenger en begrunnet innholdsvurdering. Ingen av dem er gjort til et bekreftet brudd utelukkende fra et attributt, en timer eller en mislykket automatisk beregning. Forhold som krever faktisk opplesing eller native hover/zoom må dessuten prøves med verktøyene over. Se [alle 48 krav](manuell-oppfolging.md).

## Gjenbrukt evidens og sporbarhet

[Forrige vurdering](../090740-ca8d9c80ecb6/testrapport.md) og [native axe/Nu-kjøring](../090555-native-d984a7c5/native-manifest.json) beholder opprinnelig dato. Axe hadde 0 violations / 3 incomplete-grupper (80 tekstforekomster); Nu hadde 0 HTML-feil / 191 tekniske slash-noter. Denne kjøringens Python-hjelper importerer én original axe-oppføring; den fullstendige flersidesanalysen er referert fra forrige vurdering, ikke fremstilt som en ny axe-skann. Ingen nye juridiske samsvarspåstander er utformet. W3Cs forklaringer for [tekstavstand](https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html) og [pause/stopp/skjul](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html) er kontrollert 10. november 2026; tidsstyrt innsetting gir ingen femsekundersunntak bare fordi den er sjelden.

Opprinnelige automatisk genererte rapporter er bevart i raw/initial-*. Alle tidligere funn A11Y-01–06 er fortsatt rettet i dokumentert delomfang. Historikk er ikke slettet. [Begrensninger og mislykkede forsøk](raw/execution-limitations.json). Testserver og testfane for simuleringen er avsluttet; midlertidig CSS er tilbakeført byte for byte. Ingen hemmeligheter er lest og ingen brukerdata sendt til eksterne tjenester.

## Sluttverifisering av oppdateringen

En **ny** [native-kjøring etter dokument-/sideoppdateringen](../100139-native-b7a19485/native-manifest.json) skannet 21 sider med axe og validerte 23 eksportfiler med Nu: 0 violations, 3 incomplete-grupper / 80 forekomster og 0 HTML-feil / 191 identiske tekniske slash-noter. De uavklarte målenodene er identiske med dem som gradientmodellen undersøkte. Originalene er bevart. Exit 1 betyr behov for vurdering av incomplete/noter, ikke teknisk motorfeil. [Maskinell avstemming](raw/native-postverification.json).

Alle 52 Node-tester og tre Python-regresjonstester bestod. Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll for 23 eksportfiler bestod. Formatering og `git diff --check` er kontrollert. Den oppdaterte erklæringen er lest tilbake ved 1280 og 320 px uten sideoverflyt eller ny DOM-kandidat; skjermbilder og [råmålinger](raw/declaration-readback.json) er lagret. Disse utviklingskontrollene er ikke samlet WCAG-samsvar eller faktisk skjermleser/zoom.
