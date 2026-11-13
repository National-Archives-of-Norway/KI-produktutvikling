# Gjennomført skjermbildeopprydding – 13. november 2026

Utført av Codex (OpenAI), uten underagenter, etter brukerens uttrykkelige godkjenning av [utvalgsforslaget](skjermbildevurdering.md). Kildegrunnlag: arbeidskopi basert på ce43210. Git-historikken er ikke omskrevet. Ingen commit eller push er utført.

## Resultat

| Handling                        | Antall | Filbytes, avrundet MiB | Plassering                                                                                                |
| ------------------------------- | -----: | ---------------------: | --------------------------------------------------------------------------------------------------------- |
| Beholdt aktive testbevis        |     38 |                   2,00 | Opprinnelige stier                                                                                        |
| Arkivert historikk              |     75 |                   6,85 | [docs/arkiv/skjermbilder](../../arkiv/skjermbilder/README.md), med den opprinnelige strukturen under docs |
| Fjernet identiske ekstra kopier |     29 |                   2,08 | Hver gammel sti er koblet til én bevart identisk fil                                                      |

113 bildefiler med 113 unike innhold er igjen i prosjektet. Samlet bildefilstørrelse er ca. **8,85 MiB** mot 10,93 MiB før ryddingen. Arkivering alene frigjør ikke plass; reduksjonen på ca. 2,08 MiB skyldes bare duplikatene. Dette er summen av filbytes, ikke fysisk diskallokering eller redusert Git-historikk.

[Flytteloggen](skjermbildeopprydding.json) inneholder alle 142 opprinnelige stier, nåværende filsti, handling, opprinnelig SHA-256 og filbytes. Hvert fjernet duplikat peker til en fil med identiske bytes. De 38 aktive bevisene er ikke flyttet eller endret, og ingen arkiverte bilder er komprimert eller redigert.

## Lenker og proveniens

177 henvisninger i 27 dokumenter er oppdatert: 124 Markdown-lenker og 53 bildesti-verdier i 14 JSON-filer. Det omfatter utvalgsrapporten, relevante testrapporter og bildereferanser i vurderingsgrunnlag/manuelle protokoller. Loggen viser hver gammel/ny henvisning og før-/etterkontrollsum for de berørte dokumentene.

Bare bildesti-verdier er endret i JSON-bevisene. Resultater, testdatoer, nøkler, vurderinger, liste-/objektstruktur og historiske kontrollsummer i selve dataene er uendret. Endret dokumenthash etter en lenkeretting er dokumentert i flytteloggen, ikke fremstilt som at den gamle testen er kjørt på nytt. De opprinnelige rapportversjonene er fortsatt tilgjengelige i Git-historikken.

Den opprinnelige utvalgslisten og sikkerhetskontrollens omfangsfil er daterte snapshots og beholdes med sine opprinnelige stier. Bruk flytteloggen for dagens plassering. Utvalgsrapportens klikkbare lenker er derimot oppdatert. Reproduksjonsskript som navngir nye skjermbilder er ikke endret; de beskriver testens opprinnelige opptak, ikke pekere til dagens arkiv.

En gjennomgang før flytting fant fem eksisterende brutte bildelenker i eldre kopierte erklæringsutkast/previous-TILGJENGELIGHETSERKLAERING.md. Disse bruker et relativt utgangspunkt som tilhørte originaldokumentet. De er ikke forårsaket av oppryddingen, og tilhørende bildefiler er beholdt. Kopienes tekst er ikke omskrevet. De gjelder de to bildene av engelske/rettede prisvilkår i kjøringene 201443-73cb0a3e52e0 og 203914-cf2e80bc00f7 den 9. november. Ingen nye brutte bildelenker er introdusert.

## Løpende vedlikehold

AGENTS.md har fått en regel om rydding under hver arbeidsøkt: egne midlertidige/genererte filer, et begrunnet utvalg bildebevis, SHA-256 før deduplisering, arkiv med proveniens og kontroll av referanser. Viktige feilbevis skal bevares; usikker verdi er grunnlag for et forslag, ikke automatisk sletting. Større rydding av eksisterende bevis skal ha et konkret godkjent utvalg. Regelen gir ingen automatisk slettejobb eller tillatelse til å omskrive Git-historikk.

[BEVISLAGRING.md](../../BEVISLAGRING.md) og README skiller denne konkrete godkjenningen fra de øvrige uavklarte lagringsforslagene. Portalens funksjoner, modenhetsstatus, tilgjengelighetserklæring og utviklingsfaser er uendret; ingen ny funksjon eller produksjonsgodkjenning følger av filryddingen. Tidligere ukommiterte sikkerhetsrapport-/planendringer er bevart.

## Kontroll

- 38 aktive og 75 arkiverte bilder: kontrollert antall, filbytes og SHA-256.
- Alle 142 gammel/ny-koblinger: nåværende fil finnes med identisk kontrollsum. Alle 29 gamle duplikatstier er fjernet og peker til identisk motstykke.
- 14 endrede JSON-bevisfiler: struktur og alle andre verdier er sammenlignet mot HEAD; bare 53 registrerte bildesti-verdier er endret.
- 190 Markdown-bildelenker er kontrollert rekursivt under docs: null nye brudd, fem uendrede historiske snapshot-lenker som beskrevet ovenfor.
- Alle 177 oppdaterte henvisninger kan løses til eksisterende filer. pnpm test:links bestod med 208 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. HEAD er uendret. Ingen applikasjonskode er endret, så funksjonstester og bygg er ikke gjentatt for dokumentasjonsryddingen.
