# Personvern – gjeldende kartleggingsgrunnlag

Status: **Uavklart / utkast**, kontrollert 9. november 2026 med personvernerklaering 0.1.0 av Codex (OpenAI).

- [Siste rapport](2026-11-09/161600-a3368ac30b20/kartleggingsrapport.md)
- [Behandlingsoversikt og avklaringer](2026-11-09/161600-a3368ac30b20/behandlingsoversikt.json)
- [Datert erklæringsutkast](2026-11-09/161600-a3368ac30b20/erklaering-utkast.md)
- [Gjeldende innholdskilde](../../src/content/pages/personvern.ts)

Kontakt for personvernspørsmål: khadah@nasjonalarkivet.no. Personvernombud er ikke bekreftet. Ved selve personvernkartleggingen 9. november var modellgenerering deaktivert, og nettleserlagring kunne ikke verifiseres. Den senere avgrensede cookie-kontrollen beskrives nedenfor. Behandlingsansvarlig, rettsgrunnlag, hosting, logger, avtaler og lagring må bekreftes før ferdigstilling. Ingen produksjonsgodkjenning er gitt.

`latest.json` peker til siste arbeidsmappe. Bevar eldre kjøringer. Ikke legg hemmelig konfigurasjon, rå chatspørsmål eller personopplysninger i dokumentasjonen.

## Avgrenset cookie-oppfølging – 10. november 2026

Den selvstendige cookie-skillen har utført en egen [kartlegging og bannerbeslutning](../informasjonskapsler/2026-11-10/121354-92b5bf52/rapport.md). Ingen oppføringer ble observert i undersøkte nettleserlagre, og 21 anonyme dokumentresponser ga ingen Set-Cookie. Ingen banner er innført; behov er ikke påvist i lokalt utvalg, men faktisk drift/innlogging/tredjeparter er fortsatt uavklart. Kildeteksten til personvernsiden er oppdatert med kryssreferanse. Tidligere personvernmanifest, testdato og øvrige uavklarte forhold beholdes; dette er ikke en ny full personvernrevisjon.

## Teknisk dokumentasjonsavstemming – 11. november 2026

Denne oppfølgingen er dokumentasjonsvedlikehold, ikke en ny personvernkartlegging. Kode og [arkitektur](../../ARCHITECTURE.md) beskriver nå gjennomgående avbrudd/tidsgrenser, egen Avbryt-knapp og valgfritt eksternt modell-API med serverlagret nøkkel. Klientens samtalehistorikk er fortsatt midlertidig; brukeravbrudd garanterer ikke at modellleverandøren stanser beregning eller sletter logger. Den [lokale CI-kontrollen](../CI-KONTROLL.md) brukte simulert transport og bekrefter ikke faktisk leverandørbehandling, lagringstid eller driftslogger.

Før delt pilot må faktisk modellbruk, mottakere, logging, rettsgrunnlag og lagring avklares i målmiljøet. Siste fullstendige personvernkartlegging beholder datoen 9. november; cookie-delkartleggingen beholder 10. november. `latest.json`, daterte rapporter og erklæringskilden er ikke omskrevet. Se [dokumentasjonsoversikten](../DOKUMENTASJON.md) for hvilke kilder som er gjeldende utkast.
