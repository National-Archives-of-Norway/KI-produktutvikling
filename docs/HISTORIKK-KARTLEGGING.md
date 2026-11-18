# Kartlegging og fordeling av utviklingshistorikken

Gjennomført **18. november 2026** av **Codex (OpenAI)**, uten underagenter. Grunnlag: lokal commit **5f936870**, alle 75 commits nåbare fra denne, detaljert VERSJONSLOGG.md og hele UTVIKLINGSPLAN.md slik de forelå ved start. Arbeidstreet var rent. Tre ytterligere metadataoppføringer i øvrige lokale refs (separat initialcommit og GitHub Desktop-lagringstilstand) er registrert som teknisk historikk, uten å lese gamle filinnhold. Ingen fetch, push, historikkendring, lesing av eksterne blindsett eller endring i Skills-repoet.

## Fordeling etter formål

| Innhold                                                         | Primærplassering                                                                               | Hva som bevares andre steder                                                                                              |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Hva som ble lagt til, rettet, endret eller trukket tilbake      | [Offentlig versjonslogg](../VERSJONSLOGG-OFFENTLIG.md), i daterte avsnitt                      | Full opprinnelig tekst og evidensreferanser i detaljert logg.                                                             |
| Prioriteringer, avhengigheter, åpne P1–P10-krav og beslutninger | [Offentlig utviklingsplan](../UTVIKLINGSPLAN-OFFENTLIG.md)                                     | Datert beslutningshistorikk skiller gamle og gjeldende valg. Teknisk arbeidsplan bevares.                                 |
| Hva som finnes nå, bruk og begrensninger                        | [Funksjonsregister](../src/content/features.ts), avledet til /funksjonalitet/ og Spør KI       | Fremtidige leveranser vedlikeholdes i planen og eksisterende fremtidsomtale under Oversikt, ikke som dagens funksjoner.   |
| Rene gjentatte Docker-ombygginger og rå testlogger              | [Detaljert versjonslogg](../VERSJONSLOGG.md) og eksisterende daterte rapporter                 | Antall driftsoppføringer per dato omtales offentlig; konkrete bilder, kontrollsummer og maskinopplysninger kopieres ikke. |
| Kontrollhistorikk og tidligere feil                             | Daterte offentlige kontroll-/feiloppføringer der vesentlig; originalbevis i arbeidsdokumentene | Bestått lokal test fremstilles ikke som produksjonsgodkjenning. Feil før retting beholdes.                                |

## Fullstendig inventar og dekning

Det [maskinlesbare inventaret](historikk/kartlegging-2026-11-18.json) har en rad per opprinnelig datert loggpost, planseksjon og commit. H001–H138 følger rekkefølgen i kildeloggen ved kartleggingen. Hver loggpost har kildeoverskrift, SHA-256 av hele posten, valgt hovedplassering, offentlig sammendrag der relevant og oppfølgingskobling til funksjon/krav. Alle commits er koblet til konkrete loggposter; dette er en redaksjonell krysskobling, ikke påstand om at hver commit bare inneholder ett tema.

| Kilde                            | Antall           | Håndtering                                                                                                                                                        |
| -------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Daterte poster i detaljert logg  | 138              | 122 er omskrevet redaksjonelt som offentlige endrings-/kontrolloppføringer. 16 rene driftsoppføringer beholdes i detaljloggen, med datert gruppeomtale offentlig. |
| Planseksjoner på nivå 2/3        | 48               | Alle registrert. Gjeldende krav/avklaringer følger planen; tidligere leveranser står i endringsloggen, historiske kontroll- og beslutningsnotater bevares datert. |
| Lokale commits                   | 75               | Alle registrert med faktisk commitdato, tittel og kildeposter. Ingen nye eller fiktive referanser.                                                                |
| Arbeidsnotater før første commit | 30. oktober 2026 | Oppstart, MUI, design, logo/favicon, RAG/chat og moduldeling er tatt med i offentlig logg, tydelig skilt fra Git-starten 6. november.                             |

De tre ekstra ref-oppføringene er ikke dokumenterte portalutgivelser og regnes ikke som tre nye produktendringer. Ingen stash, gren eller annen Git-ref er endret eller slettet.

## Vesentlige endringsområder som nå er med

- **Oppstart og design:** prototype, MUI-tema, logo/favicon, forsideillustrasjon, moduldeling, animasjon/pause og senere responsive justeringer.
- **Innhold og navigering:** ressurskatalog/navneendring, Beta-merking og senere kortforenkling, KI-prat, mandatvedlegg, retningslinjer, Copilot-side, meny/ankerlenker og endringer i bunnteksten.
- **Skills og erklæringer:** tilgjengelighetsskillens dokumenterte versjonsutvidelser, personvern- og cookie-skill, selvstendig kjøring, katalogkobling, rapportlagring og erklæringsstruktur. Dette beskriver portalens dokumenterte opplysninger om Skills, ikke en ny gjennomgang av det separate repoet.
- **Tilgjengelighet:** innledende fokus-/tastaturrettinger, 48-kravsvurderinger, alle daterte PDF-/kontrast-/språk-/filter-/prisvarselrettinger, testverktøy og uavklarte manuelle kontroller. Historiske antall uavklarte krav er ikke dagens samsvarsstatus.
- **Spør KI:** felles kilder, lesbar veiledning, ekstern adapter, HTTP-rettinger, tidsgrenser/samtidighet/avbrudd, svarparser, grafemer, chatfokus/rulling, flere søkeforbedringer, samlet skill-kilde, Qwen/Docker, trådvalg og faktisk modellprøving med både feil og retest.
- **Oversikter og priser:** abonnement/API, automatiske prisforslag og parserrettinger, KI-assistenter, MCP-status og senere Logorama/Prometheus. Godkjenningsopplysninger fra innholdseier er ikke en generell sikkerhetsgodkjenning av integrasjoner eller data.
- **Kvalitet og sikkerhet:** samlet kontrollrekke, innholdssynk, historiske Node-/Linux-prøver, sikrede Actions, senere Node 24-valg, dokumentopprydding, friksjonsprosess, nøkkelsladding, sikkerhetsoppgraderinger og utviklingsmiljøretting.
- **Retning:** tidligere lukket pilot og senere offentlig nettsted uten innlogging er begge datert. Det siste valget gjelder nå; ingen offentlig release er bekreftet.

## Bevaring og begrensninger

De opprinnelige 138 loggpostene beholdes i samme rekkefølge og med samme innhold; nye oppføringer legges foran. Kontrollsummer i inventaret gjelder postene før denne oppgaven og brukes til å kontrollere bevaringen. Ingen rålogger, skjermbilder, nøkkelverdier eller historiske bevis er flyttet eller slettet. Historiske planavkrysninger får en tydelig historikkmerking, fremfor å slettes eller presenteres som nåværende godkjenninger.

Gjennomgangen gjelder bevarte dokumenter, dagens funksjonsregister og Git-metadata, ikke lesing av alle gamle filversjoner eller hvert enkelt bilde/testbevis. Udokumentert arbeid kan ikke gis konstruerte datoer eller resultater. Både opprinnelige feil og senere retting beholdes, for eksempel midlertidig fast chatetikett før gjeninnført flytende etikett. To like prisoppdateringsposter er ikke slått sammen uten grunnlag.

Automatiske regresjonstester kontrollerer at hver kartlagt loggpost er bevart, at alle 122 offentlige sammendrag finnes, at hver commit har gyldig kildekobling og at dagens funksjonsoversikt ikke inneholder de to fremtidige oversiktsfunksjonene. Dette er dekning/sporbarhet, ikke automatisk vurdering av om en redaksjonell oppsummering har med alle nyanser.

## Kontroller i denne arbeidsøkten

- pnpm check bestod med 298 Node-tester, tre Python-tester, faktisk innholdssynk, lenker, format, typer og produksjonsbygg.
- pnpm test:search bestod 128/128, inkludert to nye naturlige spørsmål om funksjonalitetsoversikten og utviklingsplanen. Eksisterende negative spørsmål og held-out-forventninger er uendret.
- De fire nye bevarings-/fordelingstestene er samlet i eksisterende tests/features.test.ts; alle 11 funksjons-/historikktester bestod etter samlingen. Kartleggingen er datert og utvides ikke automatisk med nye commits.
- Endelig serverbygg og Pages-bygg bestod. Ferdigbygd HTML i begge varianter inneholder alle 122 offentlige sammendrag og relevante datoseksjoner, P1–P10 og lenker mellom logg, plan og funksjonsoversikt. Fremtidige funksjoner vises ikke som eksisterende funksjonsseksjoner. Ingen undersøkte interne markører ble funnet i de tre HTML-sidene; dette er ikke en generell skann av alle filer i eksporten.
- Ingen nettleser-/skjermleserprøve, faktisk modellgenerering, ny tilgjengelighetsrevisjon, Docker-ombygging, commit, push eller offentlig publisering. Kjørende miljø er ikke oppdatert av disse byggene.
