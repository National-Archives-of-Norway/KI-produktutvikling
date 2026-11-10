# Tilgjengelighetskontroll med axe og Nu Html Checker

**10. november 2026 · Codex (OpenAI) · tilgjengelighetserklaering 0.5.0.**

Begge tidligere blokkerte motorer er installert og kjørt lokalt. Ingen portalinnhold er lastet opp til ekstern skanntjeneste. Ingen nye bekreftede åpne WCAG-brudd er påvist. **Samlet samsvar er fortsatt uavklart.**

## Faktisk skannomfang og resultat

| Verktøy                     | Omfang                                                                                            | Resultat                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Axe CLI / axe-core 4.14.0   | 20 registrerte sider og 404-siden, faktisk headless Chrome, vanlig sidetilstand i statisk eksport | 0 violations; 3 color-contrast incomplete-grupper, 80 elementforekomster |
| Nu Html Checker 26.11.9     | Alle 23 eksporterte HTML-filer                                                                    | 0 HTML-feil; 191 info-/advarselsnoter om skråstrek på tomme elementer    |
| Faktisk negativ verktøytest | Separat syntetisk HTML med manglende alt                                                          | Begge motorer fant den tilsiktede feilen; dette er ikke portalinnhold    |

Faktisk viewport fra axe-resultatene er **756 × 413 CSS-piksler**, ikke 1280 px eller en zoomtest. Chrome og driver bruker separat profil. Statisk demo gjør ingen modell-API-kall. PDF-vedlegg blir ikke WCAG-validert av axe eller Nu; tidligere PDF-kontroller beholdes separat.

Axe-CLI-ens første stdout-baserte innlesing feilet fordi verktøyet skriver ventemeldinger foran JSON. [Det tekniske forsøket](../085540-native-12ab7654/native-manifest.json) er bevart. Den ferdige integrasjonen leser verktøyets egen lagrede JSON-fil, validerer at hver forespurte side har faktisk resultat og bevarer også feilkoder og råutskrifter. [Vellykket negativ motorprøve](../tools-smoke-8f01447c/smoke-result.json).

## Vurdering av funn og manuell rest

Kontrast på gradient-/pseudoelementbakgrunner er fortsatt uavklart på forsiden, Spør KI og Oversikt. Dette er beregningsbegrensninger, ikke målte terskelbrudd. 1.4.3 forblir U. De 191 Nu-meldingene har samme tekniske karakter (trailing slash på void-elementer) og er vurdert som noter, ikke bekreftede WCAG-brudd. 4.1.1 er nå K for den validerte eksporten; tidligere dynamisk utvalg har fortsatt egne datoer og begrensninger.

**21 K / 11 I / 16 U / 0 B** er arbeidsstatus, ikke en samsvarsprosent. Alle tidligere A11Y-01–06 beholdes som rettet i sine opprinnelige omfang. Ingen nye produktrettinger er utført i dette oppdraget. [Restliste for alle 48 krav](manuell-oppfolging.md) skiller faktiske motorresultater fra øvrige hjelpemiddel-/zoom-/innholds-/produksjonskontroller.

## Evidens og importgrenser

- [Fullt native-manifest](../090555-native-d984a7c5/native-manifest.json), [alle 21 originale axe-resultater](../090555-native-d984a7c5/raw/axe.json) og [alle Nu-meldinger](../090555-native-d984a7c5/raw/vnu.json). Originalresultatene oppgir motor, tid, URL og faktisk nettlesermiljø.
- [Kravvis native-dekning](raw/native-coverage.json) knytter regler fra alle sider til relevante krav; regler utenfor den norske 48-kravslisten er ikke omgjort til nye norske lovkrav.
- [Skill-manifest](manifest.json), [automatiske råresultater](raw/auto-01.json), [automatisk dekning](automatisk-dekning.json), [testplan](testplan.json), [vurdert kravmatrise](wcag-grunnlag.json) og [manuell vurdering](manual-tests.json).
- Skillens `--axe-report` støtter én original oppføring. Den importerte forsiderapporten beskrives derfor ikke som hele flersideskannet. De øvrige 20 originale oppføringene er vurdert gjennom det separate native-grunnlaget ovenfor.
- Nettleser-/tastatur-/PDF-evidens fra [forrige kjøring](../080757-ffaeb036427a/testrapport.md) beholder sitt faktiske tidspunkt. Den refererte nettleserrapporten er komprimert til metadata/funn med peker og SHA-256 til opprinnelige målinger; dette er ingen ny CUA-kjøring av alle sidene.

## Verifisering og begrensninger

52 Node-tester, tre Python-regresjonstester, produksjonsbygg med TypeScript og HTML-grunnkontroll bestod etter oppsettet. Rålogger er lagret under `raw/project-*`. Verktøyenes exit 1 betyr her uavklarte kontrastkontroller/noter til vurdering, ikke teknisk feil; begge motorene har prosessexit 0 i portalskannet. Skill-kjøringen har null blokkerte eller teknisk feilede deltester.

Ingen faktisk skjermleser, verifisert 200/400 % zoom, fysisk enhetsinnstilling, full PDF/UA-validering eller faktisk produksjonsmiljø er kontrollert av disse motorene. Ingen commit, publisering eller uustatus-registrering er utført.

Sluttkjøring av enhetstestene etter avgrensning av globale Selenium-innstillinger er lagret i [project-tests-final.stdout.txt](raw/project-tests-final.stdout.txt). [Opprinnelig testlogg](raw/project-tests.stdout.txt) har 51 tester; den nye miljøavgrensningstesten gir 52. Testlogger er ikke skrevet om for å skjule den forskjellen.

## Tilbakeavlesning og bevaring

Den oppdaterte erklæringen er lest tilbake på stor skjerm og ved 320 px uten sideoverflyt eller ny kandidat i DOM-delkontrollen: [tilbakeavlesning](raw/declaration-readback.json), [skjermbilde](screenshots/declaration-desktop.png). Dette er en ny kontroll bare av erklæringssiden, ikke av alle sider. Rådata fra øvrige tidligere nettlesertester beholder sitt opprinnelige tidspunkt.

Etter avgrensning av globale Selenium-innstillinger ble den faktiske negative motorprøven gjentatt og [bestod på nytt](../tools-smoke-14ee8e37/smoke-result.json). Begge motorer fant tilsiktet alt-feil. Hele prosjektets [formatkontroll](raw/format-final.stdout.txt) bestod; daterte auditmapper unntas slik at originale motordata og prosedyreøyeblikksbilder ikke endres av formatering. [Integritetskontroll](raw/document-verification.json) avstemmer krav, status, evidens og dokumentlenker.
