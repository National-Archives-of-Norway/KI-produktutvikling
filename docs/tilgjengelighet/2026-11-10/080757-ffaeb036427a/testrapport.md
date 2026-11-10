# Målrettet retting og tilgjengelighetsretest

**10. november 2026 · Codex (OpenAI) · tilgjengelighetserklaering 0.5.0 og PDF-skill.**

Alle tre åpne funn fra [forrige vurdering](../053920-3f1e603bfbcd/testrapport.md) er rettet og retestet i oppgitt lokalt omfang. **Ingen bekreftede åpne brudd i dette utvalget. Samlet samsvar er fortsatt uavklart.**

## Verifiserte rettinger

| Funn            | Retting og faktisk kontroll                                                                                                                                                                              | Grunnlag                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| A11Y-04 / 1.3.1 | PDF-side 7 har tre L-lister, 12 LI med Lbl/LBody og logisk gruppering under tre overskrifter. Alle 229 ParentTree/MCID-koblinger er kontrollert. Side 7 er pikselidentisk med originalen.                | [PDF-retest](raw/pdf-retest.json), [endringer](raw/repair-actions.json) |
| A11Y-05 / 1.4.3 | Grå/dunkle tekstfarger på PDF-side 5 er hvite. Tekstkontrast er 6,284:1 mot grønn bakgrunn, over 4,5:1. 382 tegn, skrift/posisjon og alt tekstinnhold er kontrollert. Bare side 5 har visuell forskjell. | [PDF-retest](raw/pdf-retest.json), [side 5](screenshots/after-5.png)    |
| A11Y-06 / 3.1.2 | Ny norsk 404-side arver nb korrekt. Den har én beskrivende tittel i nettleser og alle tre eksporterte feilfiler. Tittelkandidaten for 2.4.2 er dermed også lukket lokalt.                                | [nettleser](raw/404-browser.json), [eksport](raw/404-export.json)       |

PDF-tekst, sidegeometri, Info-/XMP-tittel og 27 overskriftsroller er bevart på syv sider. Seks sider er pikselidentiske. Før-versjon: [original.pdf](raw/original.pdf). Reparasjon og uavhengig retest er arkivert i [repair_pdf.py](raw/repair_pdf.py) og [retest_pdf.py](raw/retest_pdf.py). Skriptene viser de faktisk brukte lokale inn-/utdataene og må tilpasses ved gjentakelse utenfor denne arbeidsøkten.

## Regresjon og begrensninger

Skillens faktiske nettlesermodul har undersøkt 20 registrerte sider og feilsiden: **63 viewport-kontroller, 168 Tab-steg og tre deklarerte forløp**, uten kandidat i navngitte nettleserdeler. Automatisk tekstkontrast omfatter 2548 forekomster; 75 ble hoppet over med begrunnelse. HTML/PDF-delkontrollene er kjørt på nytt. Den samlede automatiske statusen er fortsatt delvis fordi axe/vnu mangler; exit 2 er ikke godkjenning eller bevis for et nytt brudd.

Arbeidsstatus: **20 K / 11 I / 17 U / 0 B**. 1.3.1, 1.4.3 og 3.1.2 er U for gjenstående dekning selv om de konkrete funnene er rettet. 2.4.2 er K i oppgitt lokalt omfang. Ingen samsvarsprosent beregnes.

Se [manuell restliste for alle 48 krav](manuell-oppfolging.md), [testplan](testplan.json), [vurdert matrise](wcag-grunnlag.json) og [automatisk dekning](automatisk-dekning.json). Tidligere vurderinger har egne datoer og referanser; originaler er bevart i `raw/initial-*`. [Manifest](manifest.json) og rå automatiske resultater er ikke omskrevet.

Ingen faktisk skjermleser, full PDF/UA-validering, verifisert 200/400 % zoom eller produksjonsfallback er gjennomført. Manuell liste-/språk-/opplesingsvurdering og øvrige tidligere uavklarte forhold består. Ingen commit, registrering eller publisering er utført.

## Sluttverifisering

Alle [48 eksisterende prosjekttester](raw/project-tests.stdout.txt), [tre nye HTML-regresjonstester](raw/html-regression.stderr.txt), [Pages-bygg med TypeScript](raw/build-final.stdout.txt) og [HTML-grunnkontroll for 23 filer](raw/html-final.stdout.txt) bestod. Dette er utviklings-/regresjonskontroller, ikke full tilgjengelighetsgodkjenning.

Norsk 404 er kontrollert ved [320 px](raw/404-320.json) uten sideoverflyt og med [bekreftet tastaturnavigasjon til forsiden](raw/404-keyboard-return.json). En første URL-avlesning var før navigasjonen var bekreftet og er ikke brukt som bestått test; etter venting på faktisk URL ble navigasjonen bekreftet. [Skjermbilde av feilside](screenshots/404-fixed.png). Erklæringen er oppdatert til ingen bekreftede åpne brudd i undersøkt utvalg, med fortsatt vesentlig usikkerhet; [tilbakeavlest resultat](raw/declaration-after.json) og [skjermbilde](screenshots/declaration-after.png) er bevart.

Statusfordeling, alle 48 planrader og lokale dokumentlenker er kontrollert i [dokumentverifiseringen](raw/document-verification.json). PDF-reparasjonen gjelder dette vedlegget direkte; en fremtidig eksport fra redigerbar kilde må bevare korrekt listekoding, metadata og kontrast.
