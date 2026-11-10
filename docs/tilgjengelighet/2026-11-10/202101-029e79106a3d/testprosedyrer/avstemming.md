# Automatisk avstemming av vurderte dokumenter

Kjør etter at agenten har vurdert resultatene, og før ferdigmelding. Verktøyet utfører ingen tilgjengelighetstester og oppretter ingen samsvarsgodkjenning. Det bruker bare Python-standardbiblioteket.

## Autoritet og inndata

- `wcag-grunnlag.json` er kilden til vurdert kriteriestatus, dato, begrunnelse og bevis. Originale motorskann har fortsatt egne statuser.
- `testplan.json` har de samme 48 ID-ene i `criterion_id`, separat `criterion_status`, faktisk automatisk delstatus der relevant og de utfylte `completion`-feltene.
- `automatisk-dekning.json`, når den finnes, har separat `criterion_status`. Dette feltet skal ikke erstatte `automatic_status`.
- `testmuligheter.json` beskriver faktisk tilgang. Tilgjengelighetsbevis peker relativt til kjøringsmappen på lokale filer; eksterne regelkilder erstatter ikke lokalt testbevis.
- `findings` i matrisegrunnlaget angir bekreftede funn med `id`, `criterion`, eventuelt `related_criteria` og `status: open` eller `fixed`. Rettede funn har retestbeskrivelse og lokal retestevidens. Kandidater føres som `candidate`, og skal ikke regnes som kjente brudd.
- Erklæringsargumentet skal peke på den faktiske brukerrettede Markdown-teksten. Kontrollen leser WCAG-ID-er i delene «Kjente brudd» og «Forhold som ikke er ferdig vurdert», inkludert underoverskrifter. Andre overskrifter kan oppgis eksplisitt. ID-listene må ikke inneholde løsrevne tekniske kildehenvisninger som mistolkes som brukerrettede krav.

Kjør fra skill-mappen:

```sh
python3 scripts/check_review.py --run /sti/til/kjoring --declaration /sti/til/erklaering.md
```

Standardkjøringen er lesende. Den kontrollerer blant annet:

1. Nøyaktig de samme 48 unike ID-ene som kjøringens prosedyreøyeblikksbilde.
2. Samme vurderte status i matrise, plan, eventuell dekning og restlistens vurderingstabell; samsvarende automatiske delstatuser der de er ført.
3. At oppgitte K/I/U/B-tall stemmer, og at avslutningsvilkår/omfang/dokumentasjonsbehov og gjennomføringskategori er fylt. Bistand/senere miljø må ha konkret årsak.
4. At avsluttede vurderinger viser dato, begrunnelse og eksisterende lokale bevis, og at påstått faktisk testtilgang viser miljø/tidspunkt/bevis.
5. At åpne bekreftede funn og B-status stemmer, og at rettede funn har retestbeskrivelse og evidens.
6. At erklæringen lister alle U-krav og eventuell `assessment_incomplete`, samt krav berørt av åpne bekreftede funn.

Dette verifiserer at bevisfiler finnes, ikke at innholdet er sant, riktig datert, dekkende eller faglig tilstrekkelig. Les bevisene. Kontrollen sammenligner ikke automatisk prosaens betydning, oppgitte antall i fritekst eller den rendrerte nettsidens innhold. Les tilbake faktisk side og avstem antall/listene separat, særlig dersom Markdown og portal har forskjellige publiseringskilder.

## Avledede oppdateringer

Etter faglig vurdering kan følgende oppdatere **kun** avledet `criterion_status` i plan/dekning og regenerere restlisten fra matrise og avslutningsplan:

```sh
python3 scripts/check_review.py --run /sti/til/kjoring --declaration /sti/til/erklaering.md --sync-derived
```

Dette endrer ikke matrise, testbevis, `automatic_status`, originalmanifest eller erklæring. Lesende kontroll kjøres etter oppdateringen og kan fortsatt rapportere avvik. Metoden skriver `manuell-oppfolging.md` på nytt; før vesentlige håndskrevne notater inn i planens `completion` eller rapporten først. Lagre konsollresultatet som et datert tillegg i kjøringens `raw/`, ikke oppå originalfiler. Bevar tidligere kjøringer.

Exit 0 betyr dokumentkonsistens, exit 1 betyr avvik og exit 2 betyr ugyldig/manglende inndata. Det er forventet at nye, uutfylte planer ikke består. Verktøyet fyller ikke avslutningsvilkår eller bevis automatisk. Eldre kjøringer uten de nye feltene trenger eksplisitt komplettering dersom de skal avstemmes med dette formatet; ikke omskriv arkivene for å få en grønn kontroll.
