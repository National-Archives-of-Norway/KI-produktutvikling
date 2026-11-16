# Ny kontroll av dagens filer før GitHub – 16. november 2026

Utført av Codex (OpenAI), uten underagenter. Kilde: **1258176a0ad3db327b348d43fea635b77a5097f6**, ren arbeidskopi ved start. Ingen remote er konfigurert. Denne gjennomgangen gjelder dagens sporede filer, ikke en ny skanning av tidligere commits. Det forutsettes ikke at målet er en personlig konto.

**Resultat: Ingen bekreftede nøkkelverdier er funnet i det undersøkte nåværende filutvalget.** Fire skannerkandidater er verifisert som SHA-256-kontrollsummer. Dette er en avgrenset hemmelighets-/innholdskontroll, ikke en generell sikkerhetsgodkjenning eller tillatelse til å laste opp virksomhetens materiale.

## Hva er rettet siden forrige kontroll?

| Tidligere funn / forhold                             | Status i dagens filer                                                                                                                                                                                                                                      |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| To Next.js-preview-nøkler i lagret byggmanifest (S1) | Begge felt inneholder [REDACTED], kontrollert på nytt. Ingen preview-nøkkel ble funnet av denne filskanningen. Originalverdier finnes fortsatt i tidligere commits, jf. forrige historikkgjennomgang; historikken er ikke skannet på nytt eller omskrevet. |
| Mange skjermbildekopier                              | Det godkjente utvalget er gjennomført: 38 aktive testbevis, 75 historikkbilder i lokalt arkiv og 29 ekstra kopier fjernet. Arkivering endrer ikke hvem som får innholdet når hele repoet lastes opp.                                                       |
| Fem brutte historiske bildelenker                    | Rettet og kontrollert 16. november, jf. versjonsloggen. Dette er dokumentasjonsvedlikehold, ikke en sikkerhetsgodkjenning.                                                                                                                                 |

[Kontrollen fra 13. november](../2026-11-13/forste-push-kontroll.md) bevares som datert historikk. Denne oppfølgingen erstatter dens beskrivelse av dagens filstatus og resterende GitHub-avklaringer. Den opprinnelige kontoavgrensningen er ikke videreført som en antakelse.

## Hva må fortsatt avklares før prosjektet legges på GitHub?

| Punkt                                                  | Avklaring / handling                                                                                                                                                                                    | Hva kontrollen faktisk viser                                                                                                                                                                                                                       |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Godkjent repo-eier og tilgang                          | Avklar hvilket GitHub-miljø virksomheten tillater, hvem som skal eie repoet og hvem som får tilgang. Bruk et privat repo inntil innhold og publisering er særskilt avklart.                             | Koden inneholder virksomhetsrelatert innhold; skanningen kan ikke godkjenne lagringsstedet. Ingen bestemt konto er valgt her.                                                                                                                      |
| Mandat, navn og organisatorisk innhold (S2/S3)         | Innholdseier må bekrefte at materialet kan lagres i det valgte repoet, eller bestille redigering/utelating. Vurder både dagens filer og tidligere versjoner som følger med Git-historikken.             | Deltakeropplysninger finnes fortsatt i alle fire PDF-filene og fire unike, nå arkiverte bilder. Arkivering er ikke anonymisering. Se filstedene nedenfor.                                                                                          |
| Kontakt-/forfatteropplysninger og lokale stier (S4/S5) | Vurder og bekreft hvilke identifiserende opplysninger og miljødetaljer som er nødvendige. Ikke fjern en bevisst valgt kontaktadresse automatisk.                                                        | Kontaktindikatorer finnes i 141 tekstfiler og seks mediefiler; lokale brukerstier i 141 tekstfiler. Flere treff er gjentakelser eller syntetiske testdata. Git-identitetens innhold er kjent fra forrige kontroll, ikke revidert på nytt her.      |
| Bevislagring og historikk                              | Skjermbildeutvalget er avklart, men bestem hvordan øvrige store rålogger/JSON-/HTML-bevis skal forvaltes. Vurder også gammel historikk før opplasting.                                                  | Dagens undersøkte filer utgjør ca. 594,26 MB, inkludert kode/avhengighetsmetadata/bevis. Største fil er ca. 30,82 MiB. Dette er ikke Git-pakkestørrelse. Ingen generell lagringsløsning er vedtatt.                                                |
| Prisjobb og Actions                                    | Ta et bevisst valg om daglig prissynk skal være aktiv fra start, og godkjenn dens skriverettigheter i samme repo. Sett opp CI/review etter første-push-sjekklisten.                                     | pricing-sync.yml har fortsatt daglig schedule og manuell kjøring, med contents:write og pull-requests:write for prisjobben. CI har contents:read. Dette er ikke et krav om å deaktivere prisjobben. Ingen jobb er kjørt på GitHub her.             |
| Blinddata som ikke er kontrollert                      | Eieren av blindsettet må om nødvendig gjennomgå de unntatte filversjonene før deling av historikken. Assistenten skal ikke lese fasiten.                                                                | tests/fixtures/rag-blind.json er unntatt. Ingen RAG_BLIND_FILE, eksterne blindsett eller test:blind er brukt. Ingen innholdskonklusjon gis for disse dataene.                                                                                      |
| Historiske preview-verdier                             | Behold den dokumenterte vurderingen av om det gamle bygget noen gang har vært delt eller fortsatt brukes et annet sted. Historikkrensing er et separat valg, ikke automatisk krav fra denne skanningen. | Verdiene er sladdet i dagens manifest. Forrige kontroll fant andre verdier i lokalt/aktivt Docker-bygg og ingen bruk av preview i appkoden. Dette er ikke testet på nytt mot kjøremiljøet i denne runden. Ingen ny aktiv nøkkellekkasje er påvist. |

Punktene gjelder opplasting av kilde og dokumentasjon. Krav til innlogging, HTTPS, modellgodkjenning og drift av en lukket pilot må fortsatt håndteres før selve nettstedet deles. Å legge koden i et privat repo er ikke det samme som å publisere eller sikre nettstedet. Ingen av P1–P10 er godkjent gjennom denne skanningen.

## Bekreftede nåværende steder for mandat-/deltakeropplysninger

PDF-filer:

- public/vedlegg/mandatforslag-ai-enablement-team.pdf
- docs/tilgjengelighet/2026-11-09/210420-07c855b7770e/raw/mandatforslag-before.pdf
- docs/tilgjengelighet/2026-11-10/080757-ffaeb036427a/raw/original.pdf
- docs/tilgjengelighet/2026-11-10/202101-029e79106a3d/raw/before.pdf

Arkiverte bilder:

- docs/arkiv/skjermbilder/tilgjengelighet/2026-11-09/210420-07c855b7770e/screenshots/pdf-retested-all-pages.png
- docs/arkiv/skjermbilder/tilgjengelighet/2026-11-10/080757-ffaeb036427a/screenshots/original-2.png
- docs/arkiv/skjermbilder/tilgjengelighet/2026-11-10/202101-029e79106a3d/screenshots/before-2.png
- docs/arkiv/skjermbilder/tilgjengelighet/2026-11-10/202101-029e79106a3d/screenshots/pdf-all-pages.png

Ingen navn, kontaktverdier eller nøkkelverdier er gjengitt i rapporten. De organisatoriske opplysningene er et vurderingspunkt for innholdseier; kontrollen klassifiserer dem ikke automatisk som taushetsbelagte.

## Skannemetode og resultater

- 1551 eksisterende sporede filer ble kopiert til et isolert lokalt utvalg, med én eksplisitt blindfixtur utelatt. Ingen .git-mappe, ignorerte miljøfiler, node_modules, byggcache, modellvolumer eller andre repoer ble kopiert. Kun .env.example er sporet blant de undersøkte miljø-/nøkkelfilnavnene.
- Gitleaks 8.30.1 ble kjørt i filmodus, med standardregler, redigert utskrift og uten undertrykking via gitleaks:allow-kommentarer. Den samme offisielle binæren som ble sjekksumkontrollert 13. november ble gjenbrukt. Ingen ny kontroll av siste tilgjengelige verktøyversjon er gjort. Loggen oppga ca. 584,33 MB skannet tekstmateriale.
- Fire generic-api-key-kandidater: tre verdier i docs/priser/2026-11-11/parser-config/manifest.json og én i docs/tilgjengelighet/2026-11-09/221027-5ce9daf9d5dc/raw/source-inventory.json. Alle fire samsvarer med SHA-256 for filen feltet navngir i dagens utvalg. Skannerens exit 1 skyldes disse kandidatene; den skal ikke beskrives som en automatisk grønn skann uten denne manuelle vurderingen.
- Ny lokal OCR på 114 PNG/JPEG-filer, hvorav 113 under docs og én app-ikonfil. Fire PDF-filer ble ekstrahert med PDFKit, totalt 28 sider. Alle 118 ekstraksjoner fullførte uten feil. Ny Gitleaks-skann av uttrekkene ga null kandidater. Dette er ikke en ny full visuell gjennomgang av alle bilder.
- logs.tar.gz under docs/ci/2026-11-11/docker-matrix ble åpnet lokalt, og alle 20 ordinære medlemmer ble skannet på nytt: null kandidater. Ingen arkiv ble kjørt som program.
- Supplerende mønstersøk fant fortsatt kontakt-/stitekniske metadata. Fire URL-er med credentials ligger i negative testtilfeller i tests/external-model.test.ts, tests/rag-config.test.ts, tests/rag-http.test.ts og tests/rag-service.test.ts. Ingen verdi gjengis. Den avgrensede dato-/kontrollsifferkontrollen fant ingen plausible fødselsnummer-/D-nummerkandidater.
- [Omfang og redigerte funn](omfang.json) inneholder antall og filsteder, uten rå OCR-tekst eller nøkkelverdier. Egne midlertidige prosjektkopier, bildefiler og tekstuttrekk ble ryddet etter kontrollen. Redigerte logger og omfangsmetadata er bevart i /tmp/ki-security-20261116 med mappemodus 700, utenfor Git. Ingen prosjektdata er sendt til en ekstern skannetjeneste.

## Begrensninger og videre kontroll

Dette er en skanning av dagens sporede filer ved oppgitt commit. Den bekrefter ikke at tidligere commits er uten sensitivt innhold. Eldre nøkler og slettede dokumentkopier følger fortsatt med historikken hvis den pushes; den tidligere historikkrapporten er grunnlaget for disse forholdene. Ingen historikk er endret eller nyopprettet remote/push utført.

Regelbasert skanning og OCR finner ikke alle hemmeligheter eller identifiserende kombinasjoner. Ingen påstand gis om generell GDPR-etterlevelse, rettigheter til profil-/vedleggsressurser, avhengighetssårbarheter, ekstern tjenestesikkerhet eller GitHub-innstillinger. Det er ikke utført en ny avhengighetsanalyse, penetrasjonstest, modellprøve, tilgjengelighetskontroll eller appbygg. Disse er ulike kontrolloppgaver.

pnpm test:links bestod med 209 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Den nye rapportmappen ble skannet separat med Gitleaks uten kandidater. 1548 av de 1551 skannede filene er uendret; bare de tre planlagte dokumentoppdateringene er endret i det opprinnelige utvalget. To nye rapport-/omfangsfiler er lagt til. HEAD og manglende remote er uendret. Ingen commit eller push er utført.
