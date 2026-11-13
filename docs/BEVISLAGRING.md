# Forslag til bevislagring – ikke vedtatt

Kartlagt 11. november 2026 av Codex (OpenAI). Dette er alternativer for senere beslutning, ingen ny lagringsregel. Eksisterende bevismapper er ikke slettet, flyttet, formatert eller endret.

## Avgrenset beslutning om skjermbilder – 13. november 2026

Brukeren har godkjent oppryddingen av det konkrete utvalget på 142 skjermbilder: 38 aktive bevis beholdes, 75 historikkbilder arkiveres lokalt under docs/arkiv/skjermbilder og 29 identiske ekstra kopier fjernes. Se [gjennomføring og flyttelogg](bevis/2026-11-13/skjermbildeopprydding.md). Git-historikken bevares. Dette vedtar ikke lagringsalternativene eller den foreslåtte regelen for gjentatte loggkjøringer nedenfor. De eldre målingene og forslagene beholdes som datert grunnlag.

## Største mapper

Målt med `du -k -d 3 docs` på lokal maskin før nye dokumenter ble ferdigstilt. Tallene er allokert diskplass, avrundet til MiB (1024 KiB); overordnede og underordnede mapper overlapper og skal ikke summeres.

| Mappe                                                  |   MiB |
| ------------------------------------------------------ | ----: |
| `docs/` totalt                                         | 570,1 |
| `docs/tilgjengelighet/`                                | 568,1 |
| `docs/tilgjengelighet/2026-11-10/`                     | 513,6 |
| `docs/tilgjengelighet/2026-11-10/094541-e2907a5c27e2/` |  87,2 |
| `docs/tilgjengelighet/2026-11-10/080757-ffaeb036427a/` |  82,6 |
| `docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd/` |  80,1 |
| `docs/tilgjengelighet/2026-11-09/`                     |  54,2 |
| `docs/tilgjengelighet/2026-11-09/230452-ae20a84bbc5d/` |  51,1 |
| `docs/tilgjengelighet/2026-11-10/145250-bd1373c8699b/` |  31,6 |
| `docs/informasjonskapsler/`                            |  0,88 |
| `docs/rag/`                                            |  0,59 |
| `docs/priser/`                                         |  0,18 |

De store tilgjengelighetsmappene betyr langt mer for lagringsbehovet enn de 20 `repeat-N.txt`-filene i RAG-kjøringen.

## Foreslått regel for nye gjentatte kjøringer

Behold én full representativ logg, og lag en maskinlesbar oppsummering per serie med testet commit/kildehash, kommando, runtime/plattform, antall repetisjoner, start/slutt, antall bestått/feilet/hoppet og **exit-kode for hver repetisjon**. Behold dessuten komplette avvikende logger og alle feillogger, også når en senere retest består. Ikke regn kun ulike tidsmålinger som avvik; normalisering for sammenligning må være dokumentert og originalene bevares frem til avgjørelsen.

Manifestet bør gi SHA-256 og filstørrelse for loggene som bevares, samt forklare hvilke standardlogger som ikke ble arkivert. Det skal ikke påstås at en logg er bevart når bare exit-koden finnes. Dette gjelder eventuelt fremtidige kjøringer, ikke omskriving av dagens bevis eller Git-historikk. Forslaget innføres først etter brukerens beslutning.

## Lagringsalternativer

| Alternativ                       | Fordel                                                                                                          | Kostnad og begrensning                                                                                                                                                                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vanlige Git-commits              | Enkel revisjon, relative lenker og tilgang sammen med koden; godt for små rapporter/manifest og utvalgte logger | Store binærfiler og gjentatte skjermbilder øker klone- og historikkstørrelsen. Sletting senere fjerner ikke gamle objekter.                                                                                                                   |
| Git LFS                          | Pekere i Git, store binærfiler hentes separat; samme revisjon kan peke på bestemte bevis                        | Krever LFS i utvikling/CI, kvote-/kostnadsavklaring og bevaring av LFS-objekter. Lenker må prøves i faktisk visningsmiljø. Eksisterende historikk flyttes ikke uten eget vedtak.                                                              |
| Ekstern lagring + manifest i Git | Passer store kjøringsarkiv; separat tilgang og oppbevaring kan styres                                           | Krever varig objektadresse/ID, tilgangsstyring, backup og eier. Manifest må inneholde SHA-256, størrelse, testet revisjon og hentemåte; sjekksum beviser integritet, ikke at objektet fortsatt finnes. Unngå utløpende signerte URL-er i Git. |

Anbefaling for vurdering: behold små rapporter, manifest og sentrale logger i Git, og vurder ekstern virksomhetsstyrt lagring for nye store binærbevis. LFS er et alternativ hvis alt bør følge samme repo og kvotene passer. Ingen løsning eller oppbevaringsfrist er valgt, og ingen flytting eller LFS-oppsett er utført.
