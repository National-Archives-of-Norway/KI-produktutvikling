# Resultatlagring og dokumentoppdatering

## Standardstruktur i prosjektet som testes

```text
docs/tilgjengelighet/
  latest.json
  ÅÅÅÅ-MM-DD/
    TTMMSS-unik-id/
      manifest.json
      raw/
        html-01.json
        html-01.stdout.txt
        html-01.stderr.txt
        contrast-01.json
        contrast-01.stdout.txt
        contrast-01.stderr.txt
      screenshots/
      testplan.json
      testmuligheter.json
      testprosedyrer/
        wcag-kriterier.json
        wcag-testprosedyrer.md
        wcag-1-oppfatte.md
        wcag-2-betjene.md
        wcag-3-forstaelig.md
        wcag-4-robust.md
      automatisk-dekning.json
      manuell-oppfolging.md
      manual-tests.json
      testrapport.md
      wcag-grunnlag.json
      erklaering-utkast.md
```

Hver kjøring har egen mappe og tidssone i metadata. Dato/tid kommer fra kjøringsmiljøets klokke i valgt tidssone, som standard Europe/Oslo. `latest.json` peker til siste forsøk og inneholder status; en peker betyr ikke at kontrollene bestod. Ikke bruk en oppgitt tekstoppdateringsdato som en oppdiktet testdato. Ved rent tekstarbeid: behold referansen til de faktiske tidligere testene.

Ved ordinær testgjennomgang: følg [automatisering.md](automatisering.md), kjør nettleserdelene når mulig og samle med `run_checks.py --auto`. Dette oppretter automatisk deldekning og en manuell restliste for alle 48 krav; kriterievurderingen forblir uavklart. `raw/` inneholder også samlet automatisk resultat og kopier av oppgitte nettleser-/axe-inndata. Exit 2 omfatter her også blokkert automatisk deldekning.

De eldre enkeltkontrollene kan kjøres fra skill-mappen, eller med absolutt sti til skriptet:

```sh
python3 scripts/run_checks.py --project-root /sti/til/prosjekt --html-export out --agent 'Codex (OpenAI)'
python3 scripts/run_checks.py --project-root /sti/til/prosjekt --html-export out --base-path /prosjektsti --contrast '#ffffff' '#09151b' 1 4.5 --agent 'Codex (OpenAI)'
```

`--html-export` er en mappe relativt til målprosjektet eller en absolutt sti. `--contrast` kan gjentas og tar fire verdier: forgrunn, bakgrunn, alpha og terskel. `--output-root` kan velge en annen resultatmappe innenfor målprosjektet. `--timezone` kan overstyre Europe/Oslo. `--project-version` kan angi en bekreftet commit/versjon; uten dette markeres prosjektversjonen som ikke oppgitt. Eksporten leses, prosjektets resultatmappe skrives, og ingen nettside kontaktes av verktøyet. Ikke start eksportkontroll fra en mappe som også inneholder resultatarkivet.

Exit 0 betyr at de valgte automatiske delkontrollene er kjørt uten rapporterte kandidater/terskelbrudd. Exit 1 betyr kandidater eller kontrast under terskel. Exit 2 betyr teknisk feil eller at ingen automatiske kontroller er valgt. Alle tre tilfeller skal ha en kjøringsmappe når lagringsstedet kan opprettes. Ingen exitkode er en samlet samsvarsvurdering.

## Hva skriptet lagrer og hva agenten må gjøre

Skriptet lagrer full standardutskrift, feilutskrift, argumenter og exitkode fra de faste hjelpeverktøyene, samt kjøringens tidspunkt, agentnavn og skill-versjon. Det lager foreløpig testrapport, et avgrenset WCAG-grunnlag og et erklæringsutkast med uavklart samlet status. Det oppretter også plass til skjermbilder og manuelle tester, `testplan.json` med alle 48 krav som ikke testet, 48 U-rader i kravgrunnlaget og et versjonert øyeblikksbilde av kildeindeks og prosedyrer under `testprosedyrer/`. Ingen av disse radene er et nytt testresultat; dato/verktøy/evidens fylles først ved gjennomføring. Det kjører ingen skjermleser eller nettleser, og oppdaterer ikke eksisterende hovedrapporter på egen hånd.

Kodeassistenten skal deretter:

1. Les råresultatene og kontroller tekniske feil og dekning. Bekreft kandidater manuelt før de merkes som brudd.
2. Lagre nye skjermbilder og manuelle resultater i kjøringen. Hvert manuelt resultat skal ha metode/verktøy, faktisk dato, lokasjon, reproduksjon og evidens. Behold manglende tester som uavklart.
3. Oppdater `testrapport.md`, `wcag-grunnlag.json` og kjøringens erklæringsutkast med bare verifiserte resultater. Bevar `manifest.json` og råfilene som kjøringens opprinnelige protokoll; legg senere retester i en ny kjøring eller et tydelig datert tillegg.
4. Finn prosjektets eksisterende rapporter og erklæring. I KI-Produktutvikling er dette blant annet `KVALITETSKONTROLL.md`, `WCAG-KONTROLL.md`, `TILGJENGELIGHETSERKLAERING.md` og den lokale tilgjengelighetssiden. Disse navnene er eksempler, ikke filnavn som skal tvinges på andre prosjekter.
5. Oppdater de vedvarende dokumentene, med lenke til kjøringen og evidens per endret vurdering i rapportene/kravmatrisen. Den brukerrettede erklæringen følger erklæringsmalen med separate deler for kjente brudd og alle krav som ikke er ferdig vurdert. Den siste listen har WCAG-ID, tittel og kort brukerforklaring, avstemt mot vurdert kravmatrise. Tekniske referanser og intern oppgaveliste hører hjemme i arbeidsgrunnlaget. Bevar tidligere brudd til retest bekrefter retting. Gjenbrukt eldre evidens beholder dato/versjon og begrunnelse; manglende resultat er ikke bevis for at et funn er borte.
6. Bevar bekreftet kontakt, eier, juridiske opplysninger, omfang og eventuell lenke til en allerede publisert erklæring. Ikke fjern en gyldig eksisterende samsvarsvurdering bare fordi en ny delkontroll ikke dekker den; marker heller ny dekning og behov for ny samlet vurdering.
7. Oppdater README og versjonslogg når de finnes, og kontroller lenker og at erklæringen samsvarer med den vurderte matrisen. Ikke lov frister eller formell publisering som ikke er bekreftet.

## Begrensninger og personvern

Rapportoppdatering er del av skillens normale testflyt når brukeren har autorisert skriving i målprosjektet; en eksplisitt read-only-bestilling begrenser dette. Avklar eller dokumenter manglende prosjektmappe hvis oppdraget bare oppgir en ekstern nettadresse. Ikke velg Skills-repoet som lagringssted for en annen virksomhets resultater.

Ikke legg råresultater, interne skjermbilder, tokens eller personopplysninger i nettstedets `public/` eller publiseringsmappe. `docs/` er ikke automatisk privat: vurder hva prosjektets Git- og utrullingsoppsett eksponerer før commit eller publisering. Ingen opplasting, commit, tilgangsendring, påminnelse eller uustatus-registrering følger automatisk av at en kjøring lagres.

## Gjeldende oppsummering og historikk

Vedlikehold én gjeldende oppsummering med lenke til siste **vurderte** rapport i prosjektets README/kontrolloversikt. Bevar daterte kjøringer og eksisterende historikk; ikke legg til nesten like «siste resultat»-kapitler for hver kjøring. Skill pekeren til siste forsøk fra siste vurderte grunnlag hvis forsøket feiler. Lagre avstemmingsutskriften som et datert tillegg i kjøringens `raw/`; ikke endre originalmanifest eller råmotorresultat.

Evidensgjenbruk skal angi opprinnelig dato, kildeversjon/hash, berørt komponent/tilstand og begrunnelse for fortsatt gyldighet. Knytt nye rettinger til en konkret retest. Ved sammenligning av axe-forekomster kan genererte CSS-klasser endres; kontroller rute, element, tekst/semantikk og tilstand før forekomster regnes som de samme. Bevar begge originalselektorer.
