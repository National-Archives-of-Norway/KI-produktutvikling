# Lokal tilgjengelighetsoppfølging – 9. november 2026

Utført av **Codex (OpenAI)** med tilgjengelighetserklaering 0.3.0 og PDF-skillen. Grunnlag: commit `67108ac`; lokal utvikling på `http://127.0.0.1:3000/`. Kjøring: `205326-389241d1fd6e`. Samlet samsvar er ikke ferdig vurdert. Ingen produktretting, commit, publisering eller registrering.

## Nytt omfang

- Alle **syv sider** i mandatforslaget rendret og visuelt undersøkt, tekst/struktur/metadata hentet med pypdf og farger med pdfplumber. PDF-en er tagget og har reell tekst, men dette er ikke en PDF/UA-validering eller faktisk skjermlesertest.
- **Seks nye kontrastpar** beregnet fra observerte webfarger og utvalgte PDF-farger: valgt filter 12,54:1; filterkant 50 % alpha 4,23:1; chatfeil mot gradientens to endepunkter 12,95 og 14,52:1; PDF-hovedtekst og side 1-bunntekst 13,88 og 5,20:1. Alle valgte terskler bestått. Endepunktberegningen er ikke en pikselmåling av hele gradienten, og PDF-fargene er rundet til nærmeste sRGB-byte. Bare disse parene er kontrollert.
- **40 Tab-steg** etter hopp til innhold på Godkjente MCP-er, Godkjente KI-assistenter, priser og personvern. Åtte Tab-steg i chat holder fokus inne og går rundt til Lukk chat. Fokusert chatfelt er innenfor en 304 px dialog ved 320 px dokumentbredde; skjermtastatur er ikke testet.
- Zoomsnarvei forsøkt uten målbar endring; derfor ingen bekreftet zoomtest. Browser tilbyr viewport og visibility, ikke dokumentert medieemulering. Faktisk redusert-bevegelse-innstilling er fortsatt utestet. Ingen OS-innstilling endret. Midlertidig viewport er nullstilt.

[Manifest](manifest.json) beskriver skillens ene grunnkontrastkontroll, ikke nettlesertestene. Supplerende metoder finnes i [manual-tests.json](manual-tests.json); råfiler og skjermbilder er bevart separat. Dette er en avgrenset oppfølging, ikke ny full testing av alle 20 nettsider. Tidligere bred kontroll og prisretest er fortsatt delgrunnlag.

## Bekreftede funn

### A11Y-02 – PDF-overskrifter mangler semantikk (1.3.1)

**Prioritet: P1, forslag.** Visuelle overskrifter på side 1–7 finnes ikke som H/H1–H6 i strukturtreet. Treets 93 Textbox-elementer mappes til Sect; 102 P og 120 Span brukes, men ingen faktiske overskriftstagger. Ubrukt RoleMap Title→H1 endrer ikke dette. Skjermleserbrukere mangler overskriftsnavigasjon mellom seksjonene. Dette er bekreftet ved sammenligning av visuell presentasjon og PDF-struktur, ikke ved simulert opplesing.

**Tiltak:** Rett overskriftsstiler i kilden og eksporter korrekt H1/H2-struktur, eller tilby hele innholdet som strukturert HTML og følg opp PDF-en. **Retest:** sammenlign alle synlige overskrifter med strukturhierarkiet, og prøv faktisk overskriftsnavigasjon med skjermleser i PDF-leser. Eier og frist er ikke avklart.

Evidens: [struktursammendrag](raw/pdf-summary.json), [fullt uttrekk](raw/pdf-inspection.json), [syv rendrerte sider](screenshots/pdf-all-pages.png).

### A11Y-03 – generisk PDF-tittel (2.4.2)

**Prioritet: P2, forslag.** /Title er «Presentation» og beskriver ikke mandatforslaget. Dette gir dårlig identifikasjon i verktøy som presenterer dokumentmetadata. **Tiltak:** gi dokumentet en beskrivende norsk tittel og konfigurer visning av dokumenttittel ved eksport. **Retest:** les metadata og kontroller faktisk tittelvisning i PDF-leser. Eier og frist er ikke avklart. Evidens: [PDF-uttrekk](raw/pdf-inspection.json).

Be om hjelp eller alternativt format via **khadah@nasjonalarkivet.no**. Om-siden har en kort teamomtale, men er ikke kontrollert som et fullstendig alternativ til PDF-en. PDF-en er ikke endret i dette testoppdraget.

## Kandidater og videre vurdering

PDF-en har 73 Figure-elementer, flere med tom Alt og enkelte «Koala with solid fill». Ikke alle er nødvendigvis meningsbærende. Tom Alt alene er derfor ikke erklært som brudd. Vurder dekorativ merking, diagrammet på side 6, de visuelle listene og leserekkefølgen på side 6–7. Dokumentets hovedspråk er en, mens mange tekstspenn er merket nb; arvet engelsk språk alene er ikke registrert som et nytt språkbrudd uten full vurdering av spennenes dekning.

1.4.5 er flyttet U→K i dette innholdsutvalget: tidligere HTML-tekst og faktisk tekst på alle syv PDF-sider, ingen identifisert bildebasert brødtekst. 1.3.1 er U→B; 2.4.2 er K→B når PDF-en nå inngår i vurderingen. Øvrige U forblir uavklarte, med supplert evidens. **25 K, 10 I, 11 U, 2 B** er arbeidsstatuser, ikke samsvarsprosent.

## Det som fortsatt må testes

1. Faktisk skjermleser: navigasjon/overskrifter, PDF-leserekkefølge og diagramalternativer, tabeller, søketreff, feil og chatstatus/svar. DOM/AX er bare støttebevis.
2. Faktisk 200 % tekstforstørring og 400 % nettleserzoom; les og bruk alle representative sider og dialoger, se etter bortfalt eller tildekket innhold. Smal viewport alene er ikke testen.
3. Slå på redusert bevegelse i et godkjent testmiljø, last forsiden på nytt, og bekreft at punkter og halo står stille og pause/start ikke gjeninnfører bevegelse. Slå av igjen og kontroller vanlig pause/start. Denne systemtesten er ikke utført.
4. Full kontrast-/fokus-/tekstavstandsvurdering, også hover, feil, dynamiske svar, PDF-sider og zoom. Flere nettlesere og mobil med skjermtastatur.
5. Faglig bekreftelse av virksomhetsopplysninger, URL og godkjenner, og kontroll av endelig drifts-/innloggingsmiljø.

## Kilder og vurdering

Kontrollert 9. november 2026: [Uu-tilsynets fremgangsmåte](https://www.uutilsynet.no/tilgjengelighetserklaering/korleis-lage-og-oppdatere-tilgjengelegheitserklaering/1131), [W3C PDF9 om overskriftsmerking](https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF9) og [W3C PDF18 om dokumenttittel](https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF18). Teknikker er eksempler på oppfyllelse, ikke egne nye lovkrav. Eksisterende 48-punkts arbeidsliste beholdes; ingen ny juridisk avgrensning eller unntaksvurdering.

## Historikk

[Bred kontroll](../201443-73cb0a3e52e0/testrapport.md) og [prisretest](../203914-cf2e80bc00f7/testrapport.md) er bevart. A11Y-01 er fortsatt lukket. [Arbeidsmatrise](wcag-grunnlag.json) oppgir evidensbase per kriterium; uendrede vurderinger beholder tidligere dato og evidens. Forrige hovedrapport og erklæring er arkivert i raw/previous-*.md.

## Verifisering etter dokumentoppdatering

48 prosjekttester bestod. Pages-produksjonsbygg med TypeScript bestod. Ny HTML-grunnkontroll av 23 eksportfiler fant ingen kandidater i sitt avgrensede omfang; dette er separat etterkontroll i `raw/html-post-update.json`, ikke en endring av originalmanifestet. 48 unike kriterier, statusfordeling og 73 relative dokumentlenker er kontrollert. Prettier og `git diff --check` bestod for dokument-/kildefilene. Den bygde erklæringen inneholder ny kjøringsreferanse og PDF-funn; den lokale siden er lest tilbake i nettleser, med [skjermbilde](screenshots/updated-declaration.png) og `raw/declaration-browser-verification.json`. Rå bygglogg er bevart med opprinnelige terminalkontrolltegn. Disse utviklingskontrollene er ikke en tilgjengelighetsgodkjenning.

PDF-metadata er også kryssjekket mot XMP: tittelen er Presentation begge steder, og DisplayDocTitle er true. Verktøyversjoner og resultat står i `raw/pdf-metadata-verification.json` (pypdf 6.10.0, pdfplumber 0.11.9). Ingen beskrivende alternativ tittel er funnet i metadata.
