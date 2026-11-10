# Foreløpig testrapport

Testtidspunkt: 2026-11-10T05:39:20.419183+01:00 (Europe/Oslo). Skill-versjon: 0.5.0.
Utførende agent/person: Codex (OpenAI). Prosjektversjon/revisjon: 83b87f3925db1198c9df43896bb020c57fd3b201 + ucommittede lokale endringer.
Automatisk kjøringsstatus: **automatic_checks_partial**. Samlet WCAG-samsvar: **ikke vurdert**.

Grunnlag: [manifest.json](manifest.json). Kjøring: `docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd`.

| Kontroll | Delresultat | Exitkode | Råresultat |
| --- | --- | --- | --- |
| auto_suite | partial | 2 | [raw/auto-01.json](raw/auto-01.json) |

## Videre vurdering

Bekreft kandidater manuelt, dokumenter brukerkonsekvens og rettingsforslag, og fyll ut
[testplanen med 48 prosedyrer](testplan.json), [manuelle tester](manual-tests.json) og [kravgrunnlaget](wcag-grunnlag.json).
Prosedyre- og kildeøyeblikksbilde er lagret under `testprosedyrer/`.
[Automatisk dekning](automatisk-dekning.json) og [gjenstående manuelle kontroller for alle 48 krav](manuell-oppfolging.md) viser utførte deler, blokkeringer og neste steg.
Skjermbilder lagres under `screenshots/`. Se stderr-filene ved tekniske feil.
Ingen skjermleser, nettleserzoom eller full tilgjengelighetsrevisjon er kjørt av dette verktøyet.

## Oppdater prosjektets dokumenter

Kodeassistenten skal etter vurderingen oppdatere rapporter og kravmatrise med lenke til denne
kjøringen, og skrive en separat brukerrettet erklæring fra vurdert grunnlag. Tekniske resultater,
kjøringsreferanser og arbeidshistorikk hører hjemme i rapportene. Bevar tidligere funn der,
og behold bekreftede kontaktopplysninger i erklæringen.
Manglende dekning eller tekniske feil må ikke tolkes som at tidligere brudd er rettet.
