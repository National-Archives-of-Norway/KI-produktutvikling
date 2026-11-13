# Retting og retest av PDF-avvik – 9. november 2026

**Codex (OpenAI)**, tilgjengelighetserklaering 0.3.0 og PDF-skillen. Kjøring **210420-07c855b7770e**. Grunnlag: commit `67108ac` med lokal tilgjengelighetsoppfølging og PDF-retting. Lokal prototype; ikke produksjonsgodkjenning eller formell registrering.

## Resultat og avgrensning

A11Y-02 og A11Y-03 er **rettet og retestet i det avgrensede struktur-/metadataomfanget**. PDF-en har nå reelle overskriftsroller og beskrivende tittel. Samlet samsvar er ikke ferdig vurdert. Ingen faktisk skjermlesernavigasjon eller full PDF/UA-validering er utført.

Ingen åpne bekreftede brudd står igjen i arbeidsgrunnlaget. **26 K, 10 I, 12 U, 0 B** er arbeidsstatuser, ikke en samsvarsprosent. 1.3.1 er B→U, fordi det konkrete overskriftsavviket er rettet mens øvrig PDF-semantikk fortsatt er delvis undersøkt. 2.4.2 er B→K i oppgitt omfang. De tidligere 11 U-punktene er bevart; derfor er antallet nå 12, uten et nytt påvist brudd.

## Hva som er endret

Den eksisterende PDF-en er reparert direkte; redigerbar presentasjonskilde ble ikke funnet i prosjektet. Sideinnhold og MCID-er er bevart. Det opprinnelige dokumentet er arkivert som `raw/mandatforslag-before.pdf`. [Reparasjonsskript](raw/repair-pdf.py) og [endringsliste](raw/repair-actions.json) gjør inngrepet etterprøvbart. Ved ny eksport fra opprinnelig presentasjon må kildefilen også få riktige overskriftsstiler og tittel, ellers kan avvikene komme tilbake.

- **A11Y-02 / 1.3.1:** 27 kartlagte hoved- og underoverskrifter er gitt H1/H2/H3. Forsidetittelen over to linjer er én H1, med fullstendig tekstalternativ på samme strukturelement; de to gamle avsnittsomslagene er nøytrale Span. Seks hovedoverskrifter på de neste sidene er H2; 20 underoverskrifter er H3. Diagrametiketter er ikke gjort om til overskrifter. ParentTree og eksisterende MCID-bærende strukturelementer er bevart.
- **A11Y-03 / 2.4.2:** Info-/Title og XMP dc:title er satt til «Mandatforslag – AI enablement-team i Nasjonalarkivet». Eksisterende DisplayDocTitle=true er beholdt. PDF-versjon 1.7 er bevart.
- Lenket filstørrelse i portalens felles Om-innhold er oppdatert til 127 kB. Både nettsiden og Spør KI bruker denne kilden.

## Retest og evidens

[Uavhengig kontrollskript](raw/retest-pdf.py), [resultat](raw/pdf-retest.json) og [protokoll](manual-tests.json). Verktøy: pypdf 6.10.0, pdfplumber 0.11.9, Poppler-rendering og PIL. Retest er kjørt på den ferdig lagrede PDF-en, ikke bare forfatterobjektet i minnet.

1. Begge tittelfelter samsvarer; XMP kan leses som gyldig XML og DisplayDocTitle er true.
2. H1=1, H2=6, H3=20. Alle syv synlige hovedoverskrifter finnes på riktig side. Rålisten med faktiske teksttilknytninger er sammenholdt med de rendrerte sidene.
3. **229 MCID-koblinger** peker fra ParentTree til riktig eksisterende strukturelement, også etter endret overskriftsrolle. Dette er et sterkere delbevis enn bare å telle H-tagger.
4. Alle **syv sider** er rendret på nytt. Tekstuttrekk, dekodet sideinnholdsstrøm og renderede piksler er identiske før/etter. Ingen synlig endring i layout, tekst, diagram eller farger. [Alle sider etter retting](../../../arkiv/skjermbilder/tilgjengelighet/2026-11-09/210420-07c855b7770e/screenshots/pdf-retested-all-pages.png).
5. SHA-256 før/etter og faktiske testtidspunkter står i JSON-resultatet. Originalen er bevart. Ingen skjermleseropplesing eller reell PDF-leserinteraksjon er simulert.

Første XMP-oppdatering med pypdf-egenskapens setter ga en ugyldig namespace-prefiks og ble fanget av retesten. PDF-en ble regenerert fra den arkiverte originalen med målrettet oppdatering av eksisterende XML-node. Deretter bestod ny retest og rendering. Feilen er bevart i `raw/retest-attempt-01.json`, ikke presentert som bestått kontroll.

## Videre kontroll

1. Faktisk skjermleser i PDF-leser: naviger H1/H2/H3, lytt til overskriftene og kontroller leserekkefølge i lister/kolonner og diagrammet på side 6–7. Verifiser også tittelvisning i aktuell PDF-leser.
2. Vurder resterende PDF-semantikk og dekorativ/meningsbærende grafikk. Dette er årsaken til fortsatt U på 1.3.1; retting av overskrifter alene er ikke en full PDF-godkjenning.
3. Fullfør tidligere uavklarte webkontroller: faktisk skjermleser, 200/400 % zoom, redusert bevegelse, kontrast/fokus/tekstavstand og dynamiske tilstander. Dette oppdraget er ikke en ny full kontroll av portalen.

Kriterietolkning og veiledning er videreført fra [forrige rapport](../205326-389241d1fd6e/testrapport.md), der W3C PDF9/PDF18 og Uu-tilsynets veiledning ble kontrollert 9. november 2026. Ingen nye rettslige påstander eller unntak. Bekreftet kontakt er fortsatt **khadah@nasjonalarkivet.no**. Endelig URL, juridiske registreringsopplysninger og godkjenner er fortsatt uavklart. Ingen publisering, innsending eller commit.

## Sporbarhet

[Manifest](manifest.json) gjelder skillens faste grunnkontrastkontroll; PDF-retesten er dokumentert separat. [Fullt videreført 48-punkts grunnlag](wcag-grunnlag.json) oppgir opprinnelig evidensbase per kriterium. [Tidligere arbeidsmatrise](raw/previous-WCAG-KONTROLL.md), [erklæring før retting](raw/previous-TILGJENGELIGHETSERKLAERING.md) og tidligere brede kontroller er bevart.

## Verifisering av portal og dokumentasjon

48 prosjekttester og Pages-produksjonsbygg med TypeScript bestod. Eksportert PDF er byteidentisk med den reparerte kildefilen, og ny HTML-grunnkontroll av 23 eksportfiler ga ingen kandidater i delomfanget. 48 unike kriterier, arbeidsstatusene og 82 relative dokumentlenker er kontrollert. Den bygde erklæringen inneholder ny kjøringsreferanse, rettet PDF-status og 12 uavklarte vurderinger. Den lokale siden er lest tilbake i nettleser; [skjermbilde](../../../arkiv/skjermbilder/tilgjengelighet/2026-11-09/210420-07c855b7770e/screenshots/updated-declaration.png) og råverifikasjon er bevart. Prettier og `git diff --check` gjelder endrede dokument-/kildefiler; rålogger beholder opprinnelige terminalkontrolltegn. Disse kontrollene er ikke tilgjengelighetsgodkjenning.

For å gjenta PDF-retesten fra prosjektroten, bruk Poppler og Python-miljø med pypdf/pdfplumber/PIL (bundlet runtime ble brukt her):

```sh
mkdir -p /private/tmp/ki-pdf-retest
pdftoppm -scale-to 1100 -png docs/tilgjengelighet/2026-11-09/210420-07c855b7770e/raw/mandatforslag-before.pdf /private/tmp/ki-pdf-retest/before
pdftoppm -scale-to 1100 -png public/vedlegg/mandatforslag-ai-enablement-team.pdf /private/tmp/ki-pdf-retest/after
python3 docs/tilgjengelighet/2026-11-09/210420-07c855b7770e/raw/retest-pdf.py
```

Dette overskriver retestresultatet i denne kjøringsmappen. Ved ny innholdsendring skal det opprettes en ny datert kjøring, slik at historisk evidens ikke erstattes.
