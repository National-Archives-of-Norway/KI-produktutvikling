# Tilgjengelighetskontroll med skill 0.5.0

**Siste hovedkjøring og vurdering: 10. november 2026. Utførende agent: Codex (OpenAI).**
Supplerende tester og tidligere evidens fra 9. november er merket med sin opprinnelige dato.

20 registrerte sider er undersøkt med skillens faktiske nettlesermodul, og 23 HTML-eksportfiler og PDF er kontrollert med `run_checks.py --auto`.
Automatisk status er **delvis** (exit 2): axe og vnu mangler. Utførte deler er lagret; dette er ikke en full tilgjengelighetsgodkjenning.

## Resultat

- 60 viewport-kontroller, 160 Tab-steg og tre deklarerte forløp (pause/start, filter, chatfeil/lukking) uten kandidater i de navngitte nettleserdelene.
- 2484 tekstforekomster kontrastmålt uten terskelkandidat; 75 forekomster med uklar/sammensatt bakgrunn hoppet over. Ikke alle komponenter, dokumenter eller tilstander er dermed dekket.
- Tre eksporterte feilfiler har tittelkandidat (to title-elementer), fortsatt U etter vurdering. Faktisk feilside er også undersøkt i nettleser.
- **Nytt bekreftet A11Y-06 / 3.1.2:** Engelsk 404-melding arver norsk språk. Ingen produktretting utført.
- **A11Y-04 / 1.3.1 og A11Y-05 / 1.4.3 består:** PDF-lister på side 7 og tekstkontrast på side 5. Identisk PDF-SHA-256 og tidligere visuell evidens/kontrastmålinger er beholdt. Generisk PDF-delkontroll uten funn lukker dem ikke.
- Tidligere A11Y-01–03 beholdes som rettet i sine opprinnelige omfang. Norsk prisinnhold, PDF-tittel og overskriftsroller er ikke automatisk godkjenning av hele kravene.
- Arbeidsmatrise: **19 K / 11 I / 15 U / 3 B**. K er begrenset delomfang; tallene er ingen samsvarsprosent.

## Hva gjenstår manuelt?

Se [manuell oppfølging](manuell-oppfolging.md): alle 48 krav, med 37 gjenstående vurderings-/rettings-/retestpunkter og 11 bekreftede fravær av utløsende innholdstype i lokalt omfang. Faktisk skjermleser, 200/400 % forstørring, redusert bevegelse/orientering, resterende tekstavstand/dynamiske tilstander, kontrast og PDF-semantikk er sentrale restpunkter. Axe/vnu er separat merket som blokkerte automatiske kontroller.

31 krav har automatiske delresultater; 17 har ingen automatisk deltest i dette verktøyutvalget. Et manuelt bekreftet språkavvik kan derfor finnes selv om automatikk ikke gir deldekning for samme kriterium.

## Sporbarhet og gjenbruk

[Originalmanifest](manifest.json), [råresultat](raw/auto-01.json), [nettleserinndata](raw/browser-input.json), [kravvis dekning](automatisk-dekning.json), [testplan](testplan.json), [vurdert matrise](wcag-grunnlag.json), [manuelle resultater](manual-tests.json).

Tidligere 48-punktsvurdering: [221027-5ce9daf9d5dc](../../2026-11-09/221027-5ce9daf9d5dc/testrapport.md).
Første delkjøring og supplerende bevis 9. november: [230452-ae20a84bbc5d](../../2026-11-09/230452-ae20a84bbc5d/manifest.json).
Kilde-/pris-/erklæringsendringer og deres hash er kontrollert i [kildesammenligningen](../../2026-11-09/230452-ae20a84bbc5d/raw/source-comparison.json). Gamle testdatoer er ikke gjort om til nye. Opprinnelige maskinproduserte arbeidsfiler er bevart i `raw/initial-*`; manifest og rå skannresultater er ikke skrevet om.

## Nye og åpne tiltak

1. A11Y-04: Kod PDF-punktlistene semantisk eller tilby fullverdig strukturert HTML-alternativ; retest struktur og faktisk hjelpemiddelbruk.
2. A11Y-05: Øk kontrast på PDF-side 5; mål tekst/sidetall på nytt og kontroller rendering.
3. A11Y-06: Oversett 404-meldingen eller merk engelsk tekst korrekt. Vurder samtidig én beskrivende tittel. Retest også publisert fallback.

Eiere og frister er ikke avklart. Ingen fiktiv rettingsfrist eller godkjenning er satt.

## Kilder og metodebegrensninger

[Uu-tilsynets kravoversikt](https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86), [språk på deler av innhold](https://www.uutilsynet.no/wcag-standarden/312-sprak-pa-deler-av-innhold-niva-aa/111), [sidetitler](https://www.uutilsynet.no/wcag-standarden/242-sidetitler-niva/104) og [erklæringsveiledning](https://www.uutilsynet.no/veiledning/tilgjengelighetserklaering/1127) er kontrollert under gjennomgangen 9.–10. november. Den opprinnelige 1127-adressen ga hentefeil; alternativ veiledningsadresse kunne leses. Ingen juridisk godkjenning er gitt.

Ingen faktisk skjermleser, verifisert zoom, fysisk rotasjon/redusert-bevegelse-innstilling, produksjonsinnlogging eller modellgenerert svar er testet. Et syntetisk spørsmål ga veiledning uten språkmodell. Ingen miljøhemmeligheter er lest. Ingen produktfeil er rettet, ingen registrering eller publisering er utført.

## Etterkontroll av dokument- og sideoppdateringen

Alle 48 prosjekttester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontrollen for 23 eksportfiler bestod. Dette er separate utviklingskontroller. De 129 relative dokumentlenkene, alle 48 planrader og status-/restfordeling er kontrollert uten mangler i [dokumentverifiseringen](raw/document-verification.json). Rålogger: [tester](raw/project-tests-final.stdout.txt), [bygg](raw/build-final.stdout.txt), [HTML](raw/html-final.stdout.txt).

Oppdatert erklæring er lest tilbake på desktop og 320 px, uten sideoverflyt eller ny kandidat i de navngitte DOM-delkontrollene: [desktop](raw/declaration-desktop.json), [320 px](raw/declaration-320.json). Skjermbilder er lagret i [desktopvisning](screenshots/erklaering-desktop.png) og [smal visning](screenshots/erklaering-320.png). Manifest og opprinnelige automatiske råresultater er bevart; senere etterkontroll endrer ikke opprinnelig skannet sidetilstand.
