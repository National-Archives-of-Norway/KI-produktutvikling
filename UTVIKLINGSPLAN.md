# Utviklingsplan for KI-Produktutvikling

Sist oppdatert: **17. november 2026**. Utførende agent ved denne gjennomgangen: **Codex (OpenAI)**.

**Status: Fungerende lokal prototype; ikke klar for produksjon eller deling av internt innhold.** Lokal funksjonalitet og modelladaptere er implementert. Drift, faglig godkjenning og samlet lanseringskontroll gjenstår. **Beslutning fra brukeren 17. november 2026: nettstedet skal være offentlig uten innlogging eller annen autentiseringsmekanisme.** Dette erstatter tidligere krav om lukket pilot. Bare offentlig godkjent innhold skal publiseres; misbruksvern for Spør KI og beskyttelse av modell-/driftsgrensesnitt gjenstår. Beslutningen om retning er ikke en utført publisering.

**Før GitHub – oppfølging 16. november:** [Ny kontroll av dagens filer](docs/sikkerhet/2026-11-16/status-for-github.md) fant ingen bekreftede nøkkelverdier; fire skannerkandidater ble verifisert som filkontrollsummer. Preview-nøklene er sladdet i dagens manifest, mens gammel historikk er bevart og ikke skannet på nytt. Skjermbildeutvalget er ryddet, men PDF-er og arkiverte bilder inneholder fortsatt navn/mandatopplysninger. Godkjent repo-eier/tilgang, innholdstillatelse, identifiserende metadata, øvrig bevislagring og valg av prisjobb må avklares før opplasting til valgt GitHub-miljø. Ingen personlig konto forutsettes. Blinddata er unntatt. Dette følger første-push-sjekklisten og P7/P9 uten å lukke produksjonskrav eller innholdsgodkjenninger.

Den opprinnelige gjennomgangen bygde på kode, dokumentasjon og lokal Git-base `89b2bd5`, med senere arbeid med personvern, priser og Oversikt. Det tidligere samlede grunnlaget hadde 53 Node-tester, tre Python-tester og produksjonsbygg samt avgrensede nettleserkontroller; dette er historikk.

**Gjeldende kontrollgrunnlag, avstemt 17. november 2026:** Kontrollene gjelder ulike revisjoner og skal ikke summeres til én produksjonsgodkjenning.

| Grunnlag                                                                    | Dokumentert resultat                                                                                                                                                                                                                                                                                  | Avgrensning                                                                                                                                                                                                    |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lokal sikkerhetsoppgradering, arbeidskopi basert på 3899c18d (17. november) | Next 16.4.6 og målrettet get-uri/basic-ftp-retting. Godkjent npm-audit gikk fra fire kjente funn til null; sju Next-meldinger er versjonskontrollert separat. pnpm check (292 Node/tre Python), Pages, frossen installasjon og Docker-bygg/HTTP-helse bestod.                                         | Ikke GitHub-verifisering, ny modell-/nettleserprøve eller produksjonsgodkjenning. Modellvolum beholdt. Arbeidskopi med tidligere ukommiterte driftsnotater, ikke en ny commit.                                 |
| Aktiv lokal Docker, 3899c18d (17. november)                                 | Rent commitbygg og portaloppstart bestod. Etikett og fem kilde-/dokumenthashverdier samsvarer; fire HTTP-sider bekrefter siste committede driftsnotat i versjonslogg/plan og responsiv forside. Helse bestod; modellcontainer, volum og manifest er bevart.                                           | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, Pages, nettleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotatet er skrevet etter bildet.                                              |
| Aktiv lokal Docker, 70f4c42d (17. november)                                 | Rent commitbygg og portaloppstart bestod. Etikett og fem kilde-/dokumenthashverdier samsvarer; fire HTTP-sider bekrefter siste committede driftsnotat i versjonslogg/plan og responsiv forside. Helse bestod; modellcontainer, volum og manifest er bevart.                                           | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, Pages, nettleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotatet er skrevet etter bildet.                                              |
| Aktiv lokal Docker, b4bda7c4 (17. november)                                 | Rent commitbygg og portaloppstart bestod. Etikett og fem kilde-/dokumenthashverdier samsvarer; fire HTTP-sider bekrefter siste committede driftsnotat i versjonslogg/plan og responsiv forside. Helse bestod; modellcontainer, volum og manifest er bevart.                                           | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, Pages, nettleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotatet er skrevet etter bildet.                                              |
| Aktiv lokal Docker, 966765fb (17. november)                                 | Rent commitbygg og portaloppstart bestod. Etikett og fem kilde-/dokumenthashverdier samsvarer; fire HTTP-sider bekrefter siste committede driftsnotat i versjonslogg/plan og responsiv forside. Helse bestod; modellcontainer, volum og manifest er bevart.                                           | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, Pages, nettleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotatet er skrevet etter bildet.                                              |
| Aktiv lokal Docker, 842739da (17. november)                                 | Rent commitbygg og portaloppstart bestod. Etikett og fem kilde-/dokumenthashverdier samsvarer; fire HTTP-sider bekrefter siste committede driftsnotat i versjonslogg/plan og responsiv forside. Helse bestod; modellcontainer, volum og manifest er bevart.                                           | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, Pages, nettleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotatet er skrevet etter bildet.                                              |
| Aktiv lokal Docker, d7b69ced (17. november)                                 | Rent commitbygg og portaloppstart bestod. Etikett/fem kildehashverdier, fire HTTP-sider og helse bekrefter siste responsive leveranse. Nettlesermål ved 320/560/950 px viser illustrasjonen ved tolinjet overskrift med samme høyde, uten vannrett rulling. Modellcontainer/volum/manifest er bevart. | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, Pages, skjermleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotater er skrevet etter bildet.                                            |
| Aktiv lokal Docker, 2b7908cc (17. november)                                 | Rent commitbygg og portaloppstart bestod. Etikett og fem kilde-/dokumenthashverdier samsvarer; fem HTTP-sider bekrefter siste committede driftsnotat i versjonslogg/plan og Copilot-innhold. Helse bestod; modellcontainer, volum og manifest er bevart.                                              | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, Pages, nettleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotatet er skrevet etter bildet.                                              |
| Aktiv lokal Docker, 5ffe263c (17. november)                                 | Rent commitbygg og portaloppstart bestod. Etikett og fem kilde-/dokumenthashverdier samsvarer; fem HTTP-sider bekrefter siste committede driftsnotat i versjonslogg/plan og Copilot-innhold. Helse bestod; modellcontainer, volum og manifest er bevart.                                              | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, Pages, nettleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotatet er skrevet etter bildet.                                              |
| Aktiv lokal Docker, bf311ed5 (17. november)                                 | Rent commitbygg og portaloppstart bestod. Etikett og fem kilde-/dokumenthashverdier samsvarer; fem HTTP-sider bekrefter siste committede driftsnotat i versjonslogg/plan og Copilot-innhold. Helse bestod; modellcontainer, volum og manifest er bevart.                                              | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, Pages, nettleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotatet er skrevet etter bildet.                                              |
| Aktiv lokal Docker, 9446009e (17. november)                                 | Rent commitbygg og portaloppstart bestod. Etikett og fem kilde-/dokumenthashverdier samsvarer; fem HTTP-sider bekrefter committet driftsnotat i versjonslogg/plan og Copilot-innhold. Helse bestod; modellcontainer, volum og manifest er bevart.                                                     | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, Pages, nettleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotatet er skrevet etter bildet.                                              |
| Aktiv lokal Docker, 632dc664 (17. november)                                 | Rent commitbygg og portaloppstart bestod. Commitetikett og fem kilde-/dokumenthashverdier samsvarer; fem HTTP-sider bekrefter oppdatert søkekontroll-dokumentasjon og Copilot-innhold. Helse bestod, modellcontainer/volum/manifest er bevart.                                                        | Ikke ny full testpakke, modellgenerering, Pages, nettleserprøve eller delt drift/produksjonsgodkjenning. Driftsnotatet er skrevet etter bildet.                                                                |
| Aktiv lokal Docker, 452b0c5 (16. november)                                  | Rent commitbygg og portaloppstart bestod. MCP-oversikt og versjonslogg inneholder siste MCP-oppdatering; commitetikett og fire kilde-/dokumenthashverdier er verifisert. Fem HTTP-sider og helse bestod. Modellvolum/manifest og modellcontainere er bevart.                                          | Cache gjenbrukt. Ingen ny full testpakke, modellgenerering, nettleserprøve eller delt drift/produksjonsgodkjenning.                                                                                            |
| Aktiv lokal Docker, a4b12d3 (16. november)                                  | Rent commitbygg og portaloppstart bestod; dokumentasjonssidene viser siste mobil-/dialogoppfølging. Commitetikett og fem kilde-/dokumenthashverdier samsvarer. Helse og fire HTTP-sider bestod; modellvolum/manifest og modellcontainere er bevart.                                                   | Cache gjenbrukt. Ingen ny full testpakke, genererings-/nettleserprøve eller delt drift/produksjonsgodkjenning.                                                                                                 |
| Lokal før-push-kontroll, a762ac1 (16. november)                             | pnpm check bestod: 278 Node-/tre Python-tester, innholdssynk, 218 filmål, format, typer og serverbygg. Pages-bygg bestod også. [Kontroll og åpne avklaringer](docs/FORSTE-PUSH.md).                                                                                                                   | macOS Node 24.22.1, eksisterende avhengigheter; ingen ny Linux-/Node 22-, sikkerhets-, GitHub- eller produksjonsgodkjenning.                                                                                   |
| Aktiv lokal Docker, ee26bb2 (16. november)                                  | Portal bygget fra ren kildecommit og startet på 3005. Commitetikett/kildehash, faktisk fire runner-tråder, helse og tre genererte svar med kilder er verifisert. Modellvolum og modellcontainere er bevart. [Rapport](docs/rag/2026-11-16/docker-ee26bb2/rapport.md).                                 | Lokal oppdatering, ikke delt drift eller produksjonsgodkjenning. Ingen ny full testpakke, Pages- eller visuell kontroll.                                                                                       |
| Lokal CPU-retting, arbeidskopi basert på 7441c70 (16. november)             | A/B/A bekreftet tregt automatisk 18-trådsvalg. Fire tråder ga fem genererte svar under 60 s; 278 Node-tester lokalt og Docker/Linux, tre Python-tester, innholdssynk og bygg bestod. [Retest](docs/rag/2026-11-16/qwen-threads/rapport.md).                                                           | Målt lokal CPU-profil; ikke universell ytelsesgaranti, ny maskin, delt drift eller produksjonsgodkjenning. Originalt miljø beholdes.                                                                           |
| Ren Docker-/modellprøve, commit 7441c70 (16. november)                      | Bygg uten appcache, tomt modellvolum, ny 2,5 GB nedlasting, helse, sider og omstart med modellgjenbruk bestod. Eksisterende miljø er verifisert bevart. [Rapport](docs/rag/2026-11-16/readme-clean/rapport.md).                                                                                       | Fire faktiske genereringsforsøk ga 502 ved 60 s, også varm modell. Årsak ikke fastslått; modellgenerering er ikke ende-til-ende-godkjent av denne prøven. Ingen visuell nettleserkontroll.                     |
| Lokal Compose/Qwen, arbeidskopi etter 6c304b3 (12. november)                | Faktiske norske Qwen3:4b-svar med kilder via /api/rag, to positive prøver og ett spørsmål uten treff; modell gjenbrukt fra eget volum. [Rapport](docs/rag/2026-11-12/compose-qwen.md).                                                                                                                | Lokal CPU-utprøving. Ikke bred svarkvalitetsevaluering, modell-/virksomhetsgodkjenning, eksternt modell-API eller delt produksjonsdrift.                                                                       |
| Tidligere lokal Docker-utgave, commit d2f6ba3 (12. november)                | Nytt Next-produksjonsbygg, 124/124 fokuserte søke-/chatfokustester og 12/12 faktiske API-kontroller på port 3005, Docker/Linux arm64 Node 24.22.2. Helse og kildekontrollsummer bekreftet.                                                                                                            | Modellgenerering er deaktivert. Ingen ny full testpakke, Node 22, Pages, nettleser-/skjermleserkontroll eller produksjonsgodkjenning. Kilden er eksakt d2f6ba3; senere dokumentasjonsnotater er ikke i bildet. |
| Hele CI-rekken, commit c22f1dc (11. november)                               | **206/206 Node-tester og 3/3 Python-tester på begge Node 22.18.0 og 24.22.2**, frosne installasjoner, format, typer, innholdssynk/lenker, serverbygg og Pages-bygg i Docker/Linux arm64. [Kontrollrapport](docs/CI-KONTROLL.md).                                                                      | Installasjonsavvik er dokumentert; de endelige kontrollrekkene kjørte uten nettverk. Ikke GitHub Actions/ubuntu-latest x64, faktisk modell eller produksjonsgodkjenning.                                       |
| Siste avgrensede chatprøve, senere samlet i c22f1dc (11. november)          | Tastatur, dobbel aktivering, avbrudd/ny innsending, datoer og listenumre ved 320 px med simulert svar. [Rapport](docs/rag/2026-11-11/chat-dates-port.md).                                                                                                                                             | Ikke faktisk skjermleser, IME eller ny full tilgjengelighetsvurdering.                                                                                                                                         |
| Historisk chatprøve, committet som `46f449e` (11. november)                 | **132/132 Node-tester**, typekontroll, serverbygg, Pages-bygg og formatering bestod på Node 24.22.1. Visuell chatprøve med simulert modell og kontroll av klientpakken. [Rapport](docs/rag/2026-11-11/chat-client.md).                                                                                | Den visuelle prøven gjelder denne eldre revisjonen. Senere automatiske chatregresjoner inngår i c22f1dc-kontrollen ovenfor; ingen ny full tilgjengelighetskontroll. IME er ikke manuelt prøvd.                 |
| RAG-frister og avbrudd, `7ebbab3` (11. november)                            | **119/119 Node-tester**, **460/460 gjentatte fokusprøver** og faktiske 35-/60-sekundersforløp med simulert transport på Node 22.18.0 i Docker/Linux arm64. [Rapport](docs/rag/2026-11-10/lifecycle.md).                                                                                               | Omfatter ikke de nyere chatendringene. Ingen ny typekontroll eller Linux-bygg i denne kjøringen.                                                                                                               |
| Tidligere samlede Linux-kontroller, `e6b5b42` (10. november)                | **105/105 Node-tester, 3/3 Python-tester**, innholdssynk, typekontroll og produksjonsbygg på Node 22.18.0 i Docker/Linux arm64. [Rapport](docs/priser/TESTRAPPORT.md).                                                                                                                                | Historisk bygggrunnlag; ikke en verifisering av senere rettinger.                                                                                                                                              |
| Siste vurderte tilgjengelighetsgrunnlag (10. november)                      | **29 K / 11 I / 8 U / 0 B**, ni rettede funn og ingen bekreftede åpne brudd i undersøkt versjon. [Gjeldende peker](docs/tilgjengelighet/latest.json).                                                                                                                                                 | Åtte krav er uavklart; samlet samsvar er ikke vurdert. Senere chatendringer trenger relevant tilgjengelighetsretest.                                                                                           |

**Historisk etableringskontroll, tidligere 11. november:** Samlet kontrollflyt ble utvidet med alle Node-tester (`test:rag` er alias), Python, faktisk innholdssynk og Markdown-lenker. CI er klargjort, ikke GitHub-verifisert. README er kortet ned; hele tidligere tekst er bevart i [historikken](docs/HISTORIKK.md). Bevislagringsforslaget er ikke vedtatt. `pnpm check` bestod lokalt på Node 24.22.1 med 135/135 Node-tester, 3/3 Python-tester, faktisk innholdsomlasting, 120 relative filmål i åtte Markdown-dokumenter, typer, format og serverbygg. `pnpm build:pages` bestod også. Dette er ikke en Actions- eller ny Node 22-kjøring.

**Historisk oppfølging, tidligere 11. november:** content-sync-feilen er rettet og faktisk watch-omlasting kontrollert på nytt. Hele Node-pakken bestod da med **133/133**, inkludert ny oppstartsregresjon. Se [avgrenset testrapport](docs/rag/2026-11-11/content-sync.md). Tidligere bygg- og Linux-grunnlag ovenfor beholder sitt omfang.

De historiske kontrollene over dokumenterer ikke produksjonsdrift eller godkjent innhold. Den nye Compose-kontrollen omfatter faktiske lokale Qwen-modellkall, men ingen eksterne modell- eller priskildekall. P1–P10 nedenfor er fortsatt åpne.

## Slik brukes og vedlikeholdes planen

Denne filen er den gjeldende utviklingsplanen. [Dokumentasjonsoversikten](docs/DOKUMENTASJON.md) viser øvrige gjeldende dokumenter og bevarte historiske grunnlag. Faseoversikten og produksjonskravene nedenfor viser dagens status. Avsnittet med historikk bevarer tidligere vurderinger; eldre testantall, oppgaver og prioriteringer der beskriver den aktuelle datoen, ikke dagens løsning.

- Les relevante faser før vesentlig arbeid. Oppdater fremdrift, gjenstående arbeid, avhengigheter og dato i samme arbeidsøkt som endringen, før ferdigmelding eller commit.
- Kryss av bare arbeid som er utført og verifisert. Skill mellom «implementert lokalt», «testet med simulert tjeneste», «verifisert i delt miljø» og «godkjent for produksjon».
- Oppdater både planen og [versjonsloggen](VERSJONSLOGG.md) ved endringer i omfang, leveranser, prioriteringer eller produksjonskrav. Funksjonsbeskrivelser vedlikeholdes i `src/content/features.ts`.
- Oppgi faktisk kontrollgrunnlag, kjente begrensninger og commit/issue når de finnes. Navngitt eier eller frist skal ikke oppfinnes; bruk «ikke avklart» og oppgi hvilken rolle som må avklares.
- Før en utrulling gjennomgås alle aktuelle krav i tabellen nedenfor, også når bygg og tester består. Et grønt bygg betyr ikke at alle lanseringskrav er oppfylt.

Reglene er også lagt i `AGENTS.md`, og gjelder fremtidig agentarbeid i prosjektet. Planen er ikke en automatisk tolkning av kode eller en periodisk jobb: meningen med endringer og godkjenninger må fortsatt vurderes av personen eller agenten som utfører arbeidet. Generell CI er nå konfigurert som én Node 24-jobb i `.github/workflows/ci.yml`. Den tidligere matrisen er kjørt på GitHub ifølge brukerens skjermbilder: begge matrisejobber feiler i checkout, før Node-oppsett/tester. Vedlagt logg bekrefter HTTP 403 fra organisasjonens IP-liste; godkjent runner/IP-oppsett må avklares før retting og GitHub-retest. Fast review og obligatoriske statuskontroller må fortsatt etableres. En egen daglig prisjobb er klargjort lokalt, men ikke aktivert på GitHub.

## Mål og rammer

- **Målgruppe:** De som jobber med produktutvikling eller utvikling av løsninger i Nasjonalarkivet. Portalen skal gjøre det enklere å lære, prøve og dele nyttige arbeidsmåter med KI.
- **Omfang nå:** Oppstartsveiledning, retningslinjeutkast, ressurskatalog, Spør KI, Oversikt med assistenter/MCP-status/priser, informasjon om teamet og KI-prat, tilgjengelighets-, personvern- og cookie-utkast, versjonslogg og funksjonalitetsoversikt. Nyheter og egne agenter er mulige senere tillegg, ikke et krav til første pilot.
- **Teknologi:** Next.js, TypeScript, MUI og `@digitalarkivet/mui-theme`, med portalens eget futuristiske komponent-/designlag. Publisert npm-pakke brukes uten tilgang til designbibliotekets private GitHub-repo.
- **Utvikling og versjonering:** Lokal utvikling og Git er etablert. Portalrepoets origin peker til nasjonalarkivet/KI-produktutvikling, og main følger origin/main. Brukerens skjermbilder bekrefter privat repo og første push av 8a14484 (16. november). Begge CI-jobbene stopper i checkout/fetch; vedlagt logg bekrefter HTTP 403 fordi runnerens IP ikke er tillatt. Godkjent runner/IP-oppsett avventer administratoravklaring. Tilgangsregler, standardgren og utrulling er ikke godkjent.
- **Drift:** Driftsplattform, domene og ansvar er ikke valgt. Dagens løsning starter Next.js og RAG på lokal loopback. Pages finnes som statisk byggvariant, ikke som besluttet offentlig driftsplattform; modellgenerering krever server.
- **Tilgang:** Offentlig nettsted uten autentisering er besluttet av brukeren 17. november. Ingen medlemskontroll eller innlogging skal innføres; bare offentlig godkjente kilder og vedlegg skal deles.
- **GitHub-rettigheter:** Portalen skal ikke ha skrivetilgang til andre koderepoer. Nettstedet trenger ingen GitHub-medlemskontroll.
- **Innhold:** Felles innholdsdata brukes av sider, katalog, anbefalinger og RAG. Dette sikrer teknisk samsvar, men innebærer ikke faglig godkjenning. Internt materiale skal ikke legges i klientdata, `public/`, offentlige bygg eller dagens RAG-korpus.
- **Modell:** Lokal Ollama og eksternt OpenAI-kompatibelt Chat Completions-API er støttet i kode. Qwen3:4b er konfigurert i lokal Docker Compose og prøvd med faktiske kildebaserte svar. Virksomhetsgodkjenning og eksternt modell-API er fortsatt ikke avklart/verifisert. API-nøkkelen skal bare være en serverhemmelighet.

## Samlet leveransestatus – 11. november 2026

| Område                           | Implementert og dokumentert                                                                                                                                      | Begrensning som fortsatt gjelder                                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Forside og navigasjon            | Lær/Prøv/Del, anbefalt oppgave «Utforsk et brukerbehov» fra ressursdata, menyen Kom i gang → Retningslinjer → Ressurskatalog → Oversikt → Spør KI → Om           | Begrenset intern brukertesting gjenstår                                                                                                 |
| Innhold og KI-prat               | Felles innholdsfiler for Kom i gang, Om og Retningslinjer, tydelig retningslinjelenke, KI-prat med deltakelsesinvitasjon og mandatforslag som vedlegg            | Generell KI-veiledning og mandat er utkast; Copilot-retningslinjer er lagt inn fra brukerens tekst. Øvrig eierskap/godkjenning gjenstår |
| Ressurser og Skills              | Seks katalogressurser, separat lokalt Skills-repo, tilgjengelighetsskill 0.6.0, personvernskill 0.1.0 og selvstendig cookie-/samtykkeskill 0.1.0 med rapportflyt | Skills er Beta og ikke menneskelig gjennomgått; ingen distribusjon fra portalen eller GitHub er etablert                                |
| Spør KI                          | Relevansstyrt kildesøk, kildebevaring ved modellfeil, frister/avbrudd og modellkapasitet, liste-/kildevisning, grafemvalidering og demo uten modell              | Lokal Qwen3:4b-generering er prøvd; hvert spørsmål behandles separat, og ekstern modell/delt drift gjenstår                             |
| Kontinuerlig innholdsoppdatering | Sider og RAG deler innhold; lokal RAG lastes om ved innholdsendringer; isolert synkroniseringstest finnes                                                        | I produksjon må Next.js og RAG utrulles fra samme revisjon; gamle chatsvar er historikk                                                 |
| Oversikter                       | Oversikt med priser, godkjente assistenter og MCP-vurderingsstatus; nettstedskart, versjonslogg, utviklingsplan og avledet funksjonalitetsoversikt               | Funksjonenes mening og modenhet må vedlikeholdes i registeret                                                                           |
| Tilgjengelighet                  | Avgrensede kontroller, rettinger, WCAG-matrise, lokalt erklæringsutkast og daterte testresultater under `docs/tilgjengelighet/`                                  | Ni funn er rettet i siste vurderte utvalg; åtte krav, retest av nyere chat og formell godkjenning/registrering gjenstår                 |
| Teknisk kvalitet                 | Moduldeling, lokale tester, TypeScript, formatering, produksjonsbygg og test av at en falsk modellnøkkel ikke følger med klientfiler                             | CI-definisjon er klar; faktisk Actions-kjøring, driftssikkerhet og kontroll i utrullingsmiljøet gjenstår                                |

Referanser: [versjonsloggen](VERSJONSLOGG.md) og kontrollgrunnlaget ovenfor. Chatendringene og avstemmingen er samlet i `46f449e`. Content-sync-rettingen nedenfor er kontrollert som arbeidskopi basert på denne commiten. Skill-versjonene er kontrollert mot metadata i det lokale Skills-repoet; repoene har separate logger og historikk.

## Hva gjenstår før produksjonssetting?

Ingen av kravene nedenfor er ferdig godkjent. Alle eiere er foreløpig **ikke avklart**; rolleangivelsene viser hvem som må utpekes. Nettstedet skal være offentlig uten autentisering. P2 er omdefinert til offentlig innholdsgrense; det tidligere innloggingskravet er trukket tilbake, ikke implementert.

| ID  | Prioritet / tidspunkt          | Gjenstående leveranse og ferdigkriterium                                                                                                                                                                                                                                                                                                                                                                          | Rolle som må avklares                                |
| --- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| P1  | Før offentlig lansering        | Beslutte driftsplattform, domene, målgruppe, offentlig omfang og ansvar. Ingen innlogging skal innføres.                                                                                                                                                                                                                                                                                                          | Prosjekteier og plattform/drift                      |
| P2  | Før offentlig lansering        | Verifisere at alle publiserte sider, vedlegg, søkekilder og byggutdata tåler offentlig tilgang. Internt innhold skal ikke publiseres eller skjules bare i brukergrensesnittet. Ingen autentisering planlegges.                                                                                                                                                                                                    | Teknisk ansvarlig og innholdseier                    |
| P3  | Før offentlig lansering        | Etablere drift for Next.js og RAG med HTTPS, intern ruting og prosessovervåking. RAGs tillatte origins er nå konfigurerbare og lokalt testet; Next.js sin interne RAG-adresse peker fortsatt på loopback. Test fra faktisk nettadresse med korrekte tillatte origins og interne tjenesteadresser.                                                                                                                 | Plattform/drift                                      |
| P4  | Før offentlig lansering        | Organisasjonsrepo er opprettet og første push er bekreftet av brukeren; verifiser tilgang, standardgren, PR-/review-regler og CI som kjører relevante tester, format, typer og bygg. `pnpm check` inkluderer nå hele testløpet, og CI-definisjonen er klargjort; faktisk Actions-kjøring, bot-PR-kontroll og obligatoriske statuskrav må verifiseres. Gi utrullingen minimale rettigheter og bruk server-secrets. | Teknisk ansvarlig og repoansvarlig                   |
| P5  | Før offentlig modellgenerering | Velge godkjent leverandør/modell, avklare databehandling og konfigurere URL/modell/nøkkel. Test faktiske svar, kildestøtte, manglende treff, timeout og leverandørfeil. Hvis dette utsettes, må lanseringen uttrykkelig lanseres som kildebasert veiledning uten modellgenerering.                                                                                                                                | Produkteier, modellansvarlig og personvern/sikkerhet |
| P6  | Før offentlig Spør KI          | Innføre anonymt misbruksvern, rate-/kostnadsgrenser og avklart kapasitet ved app eller gateway. Origins og prosessgrense erstatter ikke ratebegrensning. Modell-/administrasjonsgrensesnitt skal ikke eksponeres; servernøkler og rå leverandørfeil skal ikke lekke.                                                                                                                                              | Teknisk ansvarlig og drift                           |
| P7  | Før innhold publiseres         | Godkjenne første innhold, vedlegg og profilressurser, og utpeke innholdsansvarlige. Behold utkast-/Beta-merking til faktisk gjennomgang er gjort. Suisse-filer skal bare brukes hvis rettighetene er avklart; reserveskrift kan beholdes.                                                                                                                                                                         | Fag-/innholdseier og profilansvarlig                 |
| P8  | Før produksjonsgodkjenning     | Fullføre skjermleser, faktisk tekstforstørring/zoom, kontrast-/fokustilstander og relevante nettlesere på dagens sider og chat. Oppdatere testgrunnlag/erklæring, avklare godkjenner og endelig URL og ferdigstille formell erklæring etter virksomhetens prosess.                                                                                                                                                | Tilgjengelighetsansvarlig og godkjenner              |
| P9  | Før produksjonsgodkjenning     | Verifisere overvåking, feilhåndtering, logg-/lagringsrutiner, hendelsesansvar og tilbakeføring i faktisk miljø. Gjennomføre sikkerhets-/avhengighetskontroll og kontrollere personverninformasjon mot reell databehandling.                                                                                                                                                                                       | Drift, sikkerhet og personvern                       |
| P10 | Før offentlig lansering        | Gjennomføre representativ brukertest, rette prioriterte funn og dokumentere lanseringsbeslutning. Åpen tilgang er valgt; dato, omfang og faktisk publisering må fortsatt godkjennes.                                                                                                                                                                                                                              | Prosjekteier med fag- og driftsansvarlige            |

Tilgjengelighetsgrunnlag og konkrete uavklarte punkter finnes i [WCAG-kontrollen](docs/tilgjengelighet/WCAG-KONTROLL.md) og [erklæringsutkastet](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md). Disse dokumentene skal oppdateres fra nye resultater; denne planoppdateringen er ikke en ny tilgjengelighetsrevisjon.

## Sjekkliste for offentlig lansering – 17. november 2026

Arbeidsgrunnlag: commit 34623a1 og de daterte kontrollene ovenfor. Sjekklisten konkretiserer P1–P10; den er ikke en lanseringsgodkjenning. Ingen ansvarlig person, dato for oppstart eller beslutning om driftsplattform er fastsatt her. Rolleforslagene under må bekreftes og erstattes med faktiske navn. Avkrysning krever lenke til resultat eller beslutning, testet revisjon/miljø og hvem som godkjente.

### 1. Lokalt arbeid mens vi venter

- [ ] **P1 – Lag lanseringsbeskrivelsen:** beskriv målgruppe, konkrete arbeidsoppgaver, foreslått deltakergruppe, tillatt testinnhold og hva lanseringen skal lære oss. Legg frem alternativene med og uten modellgenerering for beslutning.
- [ ] **P2 – Kontroller offentlig innholdsgrense:** gjennomgå sider, vedlegg, RAG-kilder og byggutdata for innhold som ikke skal være offentlig. Test anonym tilgang og bekreft at serverhemmeligheter og interne data ikke følger med. Innlogging og medlemskap er ute av omfanget.
- [ ] **P3 – Lag utrullingsoppskriften:** dokumenter konfigurasjon, porter, helsesjekker og stopp/start for valgt plattform når den er avklart. Next.js og RAG skal komme fra samme revisjon; byggport og tjenesteport må samsvare. Modellfiler og hemmeligheter skal holdes utenfor Git og appbildet.
- [ ] **P4 – Kontroller lanseringskandidaten:** kjør pnpm check og pnpm build:pages på revisjonen som skal deles. Bruk prisfixturer og simulert modell i automatiske tester. Registrer resultat, faktisk Node-/pnpm-versjon og commit; tidligere grønne kontroller gjelder sine egne revisjoner. Ikke kjør ekte prisjobb eller blindsett som del av dette.
- [ ] **P5 – Lag modellprøven:** velg representative spørsmål om skills, Copilot-retningslinjer, godkjente MCP-er og personvern, samt spørsmål uten støtte. Definer forventet kilde og nødvendige forbehold før modelltesten. Skill søketreff fra faktisk generert svar. Lokal Qwen-prøve er teknisk bevis, ikke modellgodkjenning.
- [ ] **P6 – Forbered API-vernet:** lag tester og foreslå rategrense egnet for anonyme brukere, maksimal kapasitet og håndtering av overbelastning. Dagens prosessgrense erstatter ikke ratebegrensning. Kontroller avbrudd, timeout, 429 og at feilsvar ikke inneholder nøkler eller rå leverandørfeil; endelige grenser må besluttes.
- [ ] **P7 – Lag innholdsutvalget:** list lanseringens sider, skills, vedlegg og profilressurser, med foreslått eier, godkjenningsstatus og siste gjennomgang. Marker uavklart innhold for faglig beslutning; ikke fjern Beta-/utkaststatus som om review er utført. Ved innholdsendringer: kjør test:search og relevant test:content-sync.
- [ ] **P8 – Gjennomfør aktuelle lokale restkontroller:** bruk de åtte uavklarte kravene i gjeldende WCAG-kontroll, test faktisk skjermleser og zoom der verktøy finnes, og retest senere chat-/animasjonsendringer. Dokumenter det som fortsatt ikke kan testes; oppdater rapport og erklæring fra resultatene. Dette punktet er ikke krysset av av tidligere deltester.
- [ ] **P9 – Forbered drifts- og personverngrunnlaget:** beskriv hvilke logger, spørsmål, kildeutdrag og modellforespørsler som kan oppstå, hvem som får tilgang og foreslått sletting. Lag prosedyre for hendelser, sikkerhetsoppdatering og tilbakeføring til forrige bilde. Reell plattform-/identitetslogging må bekreftes i delt miljø.
- [ ] **P10 – Lag brukertestplanen:** velg oppgaver for å finne en ressurs, forstå retningslinjer og bruke Spør KI. Avtal hvordan funn meldes og prioriteres, og foreslå kriterier for å fortsette, stoppe eller utvide lanseringen. Ikke samle inn chatinnhold eller andre personopplysninger uten avklart behov og behandling.

### 2. Administrator og fagansvarlige må avklare

Alle avklaringer nedenfor er åpne. Rollen er et forslag til mottaker, ikke en tildelt oppgave eller en bekreftet godkjenning.

| Krav | Avklaring som må tas                                                                                                                                                | Rolle som må utpekes                               | Dokumentasjon som trengs                                                                                                                                     |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P1   | Velg plattform, offentlig adresse, omfang, eier og driftsansvar.                                                                                                    | Prosjekteier og plattform/drift                    | Datert beslutning med ansvarlige og lanseringsomfang.                                                                                                        |
| P2   | Godkjenn hva som kan være offentlig i sider, vedlegg, RAG-kilder og bygg. Ingen identitetsleverandør eller medlemskontroll skal etableres.                          | Innholdseier og teknisk ansvarlig                  | Innholdsreview og kontroll av publiseringsartefakter, uten internt innhold.                                                                                  |
| P3   | Avklar HTTPS/domene, sertifikater, tjenestenett, ressursrammer og hvor portal, RAG og eventuell modell kjører.                                                      | Plattform/drift                                    | Driftsbeskrivelse og nettverks-/utrullingsoppsett. Pages leverer statiske sider; modellgenerering krever egen serverdrift.                                   |
| P4   | Avklar godkjent runner-gruppe og eksakte labels, tillatt utgående IP, tilgang til repoet, standardgren og review-/statuskrav. Avgjør om prisjobben skal være aktiv. | GitHub-/runneradministrator og repoansvarlig       | Bekreftede runner-/IP-regler, grønn CI / Node 24 på lanseringskandidaten og dokumentert PR-/rettighetskontroll. Se første-push-sjekklisten.                  |
| P5   | Godkjenn modell, driftssted og databruk, eller beslutt uttrykkelig kildebasert lansering uten generering. Gratis/lokal modell er ikke automatisk godkjent.          | Produkteier, modellansvarlig, sikkerhet/personvern | Omfangsbeslutning og eventuell modell-/leverandørvurdering; nøkkel bare på server hvis API brukes.                                                           |
| P6   | Beslutt rate-/kostnadsgrenser og kapasitet for anonyme besøkende; velg app-/gatewayvern.                                                                            | Teknisk ansvarlig og drift                         | Testet misbruksvern, overbelastning og beskyttelse av interne modellgrensesnitt.                                                                             |
| P7   | Godkjenn innhold, vedlegg, opplysninger om personer, skill-status og rettigheter til profil/font. Utpek innholdsansvarlige.                                         | Fag-/innholdseier og profilansvarlig               | Review av det konkrete lanseringsutvalget; uavklart innhold holdes utenfor til det er godkjent.                                                              |
| P8   | Utpek tilgjengelighetsansvarlig/godkjenner, avklar gjenstående hjelpemiddeltester og behandling av dokumenterte barrierer før lansering.                            | Tilgjengelighetsansvarlig og prosjekteier          | Oppdatert testgrunnlag, kjent restliste og beslutning om lanseringsomfang. Formell erklæring og samlet produksjonsgodkjenning gjenstår etter opprinnelig P8. |
| P9   | Avklar faktisk logging, lagring/sletting, behandlingsansvar og eventuelle avtaler; utpek hendelsesansvarlig og godkjenn driftsberedskap.                            | Drift, sikkerhet og personvern                     | Verifisert dataflyt, oppdatert personvern-/cookieinformasjon og drifts-/tilbakeføringsprøve. Lokal audit uten funn erstatter ikke dette.                     |
| P10  | Velg brukertestgruppe, støttekanal, lanseringskriterier og ansvar for stopp/tilbakeføring.                                                                          | Prosjekteier med fag- og driftsansvarlige          | Brukertestrapport og dokumentert beslutning om offentlig lansering.                                                                                          |

### 3. Felles kontroll i faktisk driftsmiljø – før offentlig åpning

Disse punktene kan forberedes lokalt, men må bekreftes på riktig adresse og revisjon i det valgte miljøet.

- [ ] **P1/P2:** navngitt prosjekteier har besluttet lanseringsomfanget. Sider, vedlegg og det tiltenkte offentlige API-et virker uten innlogging og inneholder bare godkjente offentlige data. Modellserver, administrasjon og interne driftsgrensesnitt kan ikke nås direkte fra internett.
- [ ] **P3/P4:** HTTPS, intern ruting, portal-/RAG-helse, samme revisjon og korrekte origins er kontrollert. GitHub-checkout og hele Node 24-CI er grønne på riktig kandidat. Repo-/workflowrettigheter og valgt prisflyt er verifisert. IP-/runnerblokkeringen er ikke lukket før faktisk kjøring lykkes.
- [ ] **P5/P6:** bekreft ved API- og nettleserprøve at valgt modus faktisk gjelder. Ved generering: godkjent modell gir kildebaserte svar og tåler ingen treff, feil, timeout, avbrudd og forventet samtidighet. Uten generering: adapteren er deaktivert og brukergrensesnittet beskriver kildebasert veiledning. Misbruks-/ratevern og nøkkelbeskyttelse er prøvd i begge tilfeller der relevant.
- [ ] **P7/P8:** lanseringsinnholdet er faglig gjennomgått; navigering, tastatur, fokus, chat, animasjon og vedlegg er kontrollert på kandidatversjonen. Tilgjengelighetsfunn og begrensninger er dokumentert og behandlet av ansvarlig; lanseringsbeslutningen erstatter ikke lovkrav eller formell tilgjengelighetsvurdering.
- [ ] **P9:** faktisk nettleser-/serverlogging, lagring og databehandling stemmer med informasjonen til brukeren. Overvåking, hendelseskontakt og tilbakeføring er prøvd. Ta ny sikkerhets-/avhengighetskontroll av lanseringskandidaten; den daterte 17. november-kontrollen er et tidligere grunnlag.
- [ ] **P10:** prosjekteier og utpekte fag-/driftsansvarlige har registrert en uttrykkelig beslutning om å åpne nettstedet offentlig. Registrer adresse, revisjon/bildereferanse, ansvarlige, testlenker, åpne forhold, tiltak og godkjent omfang. Ukjente forhold skal ikke fremstilles som akseptert risiko.

**Stopp før offentlig åpning** hvis internt innhold eller serverhemmeligheter eksponeres, databehandlingen mangler nødvendig avklaring, modellen brukes uten godkjenning, eller driften mangler ansvar og håndtering av feil. Tilgjengelighet, sikkerhet og personvern må vurderes for det faktiske offentlige miljøet.

### 4. Etter offentlig lansering

- [ ] **P10:** gjennomfør brukertestene, registrer faktisk nytte og barrierer, og rett prioriterte funn med retest.
- [ ] **P7–P9:** oppdater innhold, testgrunnlag, erklæringer og driftsrutiner når faktiske funn krever det.
- [ ] **P1–P10:** avstem alle krav på nytt før produksjonsgodkjenning eller utvidelse. Utvidet innhold eller modellbruk krever ny vurdering av berørte krav.

**Løpende vedlikehold:** oppdater denne sjekklisten sammen med faseoppgaver og versjonslogg når en beslutning eller kontroll faktisk foreligger. Bevar daterte bevis og før hvem/hva/hvor/revisjon.

## Faseoversikt

| Fase | Leveranse                                    | Status 17. november 2026                                                                                                                   |
| ---- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Omfang, ansvar og tilgangsvalg               | Offentlig tilgang uten innlogging besluttet; eierskap, driftsplattform og lanseringsomfang gjenstår                                        |
| 2    | Teknisk grunnmur og arbeidsflyt              | Lokal Next.js-sikkerhetspatch og søkeregresjon kontrollert; CI blokkeres av IP-listen. Godkjent runner, grønn CI og review-regler gjenstår |
| 3    | Design og tilgjengelighet                    | Design og avgrensede kontroller utført; samlet tilgjengelighetsgodkjenning gjenstår                                                        |
| 4    | MVP 1: lokal portal og offentlig lansering   | Lokal leveranse klar; P1–P10 gjelder offentlig lansering uten innlogging. Drift, innholdsreview og brukertest gjenstår                     |
| 5    | Servermiljø, modellkobling og utrulling      | Adaptere/frister/kapasitet simulert testet; lokal Qwen prøvd; delt drift og godkjenning gjenstår                                           |
| 6    | Offentlig innholdsgrense (tidligere MVP 2)   | Innloggingskravet trukket tilbake 17. november; offentlig innholdsgrense må verifiseres                                                    |
| 7    | MVP 3: versjonerte skills og distribusjon    | Lokalt bibliotek og katalogintegrasjon på plass; review og distribusjon gjenstår                                                           |
| 8    | MVP 4: forvaltning og produksjonsgodkjenning | Ikke godkjent; produksjonskrav P1–P10 følges opp                                                                                           |

Fase 5 og kontrollen av offentlig innholdsgrense må fullføres før deling. Fase 7 kan utvikles parallelt, men full automatisk skill-installasjon er ikke et krav til første pilot med lesbart innhold. Pages beholdes foreløpig som bygg-/demovariant; det er ikke en beslutning om offentlig hosting.

## Fase 1 – Avklaringer og prosjektgrunnlag

- [x] Definere målgruppe og portalens praktiske formål.
- [x] Velge første innholdsområder og eget futuristisk design basert på publisert MUI-tema.
- [x] Avklare retningen: brukeren besluttet 17. november offentlig nettsted uten autentisering. Tidligere lukket pilot er erstattet; publisering er ikke utført.
- [ ] Utpeke prosjekteier, teknisk ansvarlig, innholdsansvarlige og driftsansvarlig.
- [ ] Bekrefte GitHub-organisasjon/team, tilgangsmodell og egnet abonnement/oppsett uten å anta at et privat repo beskytter nettstedet.
- [ ] Velge driftsplattform og domene, og avklare hvilke data og verktøy første pilot kan bruke.
- [ ] Avklare faglig godkjenning og rettigheter for innhold, vedlegg og eventuelle ekstra profilressurser.

**Ferdig når:** P1 er besluttet og eiere er navngitt. Avklaringer registreres her med faktisk beslutningsgrunnlag.

## Fase 2 – Teknisk grunnmur og sikker arbeidsflyt

- [x] Etablere lokal Git, Next.js, TypeScript, modulgrenser og dokumentert oppstart.
- [x] Ha lokal formatering, tester, typekontroll og byggvarianter for server og statisk eksport.
- [x] Implementere felles innholdskilde for sider, anbefalinger og RAG, med kontroll av innholdsreferanser.
- [x] Implementere automatisk lokal omlasting av RAG og isolert test av innholdssynkronisering.
- [x] Starte modellfrie søketester ved pnpm dev og kjøre på nytt ved importerte innholds-/søkeendringer (17. november). Egne test:search/test:search:watch-kommandoer og instruks om nye emnespørsmål. Isolert grønn → rød → grønn-prøve, faktisk modellfri utviklingsoppstart/-avslutning, 125 søketester og samlet testpakke med 291 Node-/tre Python-tester bestod; samme testfiler inngår i CI. Dette gjelder lokal utvikling, ikke Docker-runtime eller godkjent Actions-kjøring.
- [x] Rette isolert content-sync-kopi etter innføring av delt `src/config/` (11. november): kopier hele `src/` unntatt `src/app/`, og bruk samme kopieringsfunksjon i rask oppstarts-/health-regresjon uten watch. Førtesten feilet med manglende modul; retest av synk og 133/133 Node-tester bestod på Node 24.22.1. Se [rapport](docs/rag/2026-11-11/content-sync.md). Ingen ny Linux-, bygg- eller produksjonsverifisering.
- [x] Etablere funksjonsregister med automatisk avledet oversikt og nettstedskart, og kontroll av sideregistrering ved oppstart/bygg.
- [x] Etablere versjonslogg og agentinstruksjoner for vedlikehold av logg og funksjonsregister; og vedlikehold av utviklingsplanen.
- [x] Opprette organisasjonsrepo (opplyst av brukeren 16. november; ikke inspisert på GitHub).
- [x] Tilknytte origin og laste opp main: lokal tracking og brukerens GitHub-skjermbilder bekrefter 8a14484 (16. november).
- [ ] Kontrollere effektiv privat tilgang, avklare standardgren og avtale branch-/PR-/review-regler. Avklare godkjent runner med tillatt utgående IP, repo-/gruppetilgang og eksakte labels. Checkout-loggen bekrefter IP-listens HTTP 403. Oppdatere begge workflows og reteste på GitHub etter administratoravklaringen. Se [oppdatert første-push-sjekkliste](docs/FORSTE-PUSH.md).
- [x] Forenkle CI til én Node 24-jobb og avgrense engines.node til >=24.0.0 <25.0.0 (16. november). Prisjobb og Docker bruker samme hovedversjon. Node 22 utgår fra løpende støtte; eldre testhistorikk beholdes. Lokal pnpm check bestod på Node 24.22.1 med 278 Node-/tre Python-tester og innholdssynk; begge bygg bestod. [Kontrollgrunnlag](docs/CI-KONTROLL.md). Ny jobb må verifiseres på GitHub etter runner-/IP-avklaring, og påkrevde sjekker avstemmes til Node 24.
- [x] Samle Node-/Python-/innholdssynk-/Markdown-lenketester i `pnpm test` og utvide `pnpm check` med test før bygg. Klargjøre CI for push/PR/manuell kjøring med format, typer, test og begge bygg, uten priskildekall eller prosjektsecrets.
- [x] Klargjøre CI-matrise for Node 22.18.0 og 24, samkjøre prisjobb på 24, låse actions til offisielt verifiserte commit-SHA-er og konfigurere ukentlig Dependabot for actions uten automatisk fletting (11. november). [Første push](docs/FORSTE-PUSH.md) og [lokal kontroll](docs/CI-KONTROLL.md) beskriver manuell etablering og hva som bare kan verifiseres på GitHub. `pnpm test` bestod lokalt på Node 24.22.1 med **206/206 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og **144 relative filmål** i ti dokumenter. Dette inkluderer fixture-simulering av prisjobbens run-steg. `pnpm format:check` og `git diff --check` bestod. Ingen remote, push, GitHub-innstilling eller produksjonsgodkjenning.
- [x] Teste hele CI-kommandorekken for commit c22f1dc i lokal Docker/Linux arm64 med Node 22.18.0 og 24.22.2 (11. november): nye frosne installasjoner bestod etter separat støttefilnedlasting; deretter bestod install-gjenbruk, format, typer, 206 Node-/tre Python-tester, innholdssynk/lenker og begge bygg uten nettverk på begge. Første nettverksløse installasjonsfeil er dokumentert i [kontrollrapporten](docs/CI-KONTROLL.md). Dette lukker ikke GitHub-verifisering, ubuntu-latest x64, P4 eller andre produksjonskrav; ingen produkt-/funksjonsendring, commit eller push.
- [ ] Verifisere CI på GitHub, inkludert manuell kjøring på pris-PR-grenen, og konfigurere review/obligatorisk statuskontroll. Lokal actionlint-kontroll er utført uten valgfrie ShellCheck/Pyflakes; faktisk Actions og kontroll av publiserte artefakter gjenstår.
- [x] Undersøke og rette Next.js-sikkerhetsvarselet (17. november): 16.4.3 er oppgradert til eksakt 16.4.6. Sju utgivermeldinger gjelder førversjonen og er rettet fra 16.4.5; CLI-ens kortvarige retry forklarer hvorfor uendret nytt bygg kunne bestå. Supplerende audit fant tre basic-ftp-funn i testverktøykjeden; målrettet get-uri-patch gir endelig audit uten funn. pnpm check (292 Node-/tre Python-tester) og Pages-bygg bestod. [Vurdering, forutsetninger og kontroller](docs/sikkerhet/2026-11-17/nextjs.md). P9 og godkjenning av delt drift er fortsatt åpne.
- [x] Starte lokal utvikling på nytt etter Next-oppgraderingen (17. november): gammel 16.4.3-prosess og generert devcache er erstattet med 16.4.6. Kom i gang/Om er verifisert med HTTP og nettlesernavigering/omlasting uten module-factory-feil; automatisk søkekontroll bestod 126/126. README og sikkerhetsrapport har feilsøking og kontrollgrunnlag. Docker og modellvolum er uendret i oppfølgingen. Ingen endring i pilot-/produksjonsgodkjenning.
- [ ] Etablere rutiner for avhengigheter, serverhemmeligheter, nøkkelrotasjon og minste privilegium for CI/utrulling.

**Ferdig når:** P4 er verifisert gjennom en faktisk pull request og kontrollert utrulling. Lokale kontroller alene lukker ikke fasen.

## Fase 3 – Design, komponenter og tilgjengelighet

Arbeidsgrunnlaget for P8 er konkretisert i [avklaringsplanen for de 8 uavklarte kravene](docs/tilgjengelighet/WCAG-KONTROLL.md#avklaringsplan-for-de-gjenstaende-kravene), oppdatert 10. november 2026. Den angir tester/kompetanse, utstyr, lokale og pilotavhengige kontroller samt dokumentasjon per krav. Planen er ikke en ny test eller en fullført leveranse. Ansvarlig tester og godkjenner må utpekes.

- [x] Integrere `@digitalarkivet/mui-theme` og eget tema uten privat GitHub-tilgang.
- [x] Implementere valgt arklogo/favicon, futuristisk forside, navigasjon, bunntekst, katalog, artikkeloppsett og chat.
- [x] Plassere forsideanimasjonen ved siden av den tolinjede overskriften ved opptil 950 px (17. november), med samme høyde og skalert logo/ringer. Nettlesermål ved 320/375/560/768/950/1024/1440 px bekrefter plassering og fravær av vannrett rulling; tastaturpause/-start bestod. [Lokal kontroll](docs/design/2026-11-17/hero-responsive.md). Docker fra d7b69ced er senere bygget og kontrollert ved 320/560/950 px på 3005; ingen ny samlet tilgjengelighetsgodkjenning.
- [x] Legge til rolige bevegelser i illustrasjonens punkter og ytre ring, med klikk på selve illustrasjonen for pause/start, tastaturbetjening og statisk visning ved redusert bevegelse.
- [x] Tilpasse grunnleggende responsivitet, fokus, kontrast og redusert bevegelse, og utføre avgrensede kontroller med dokumenterte rettinger.
- [x] Opprette WCAG-matrise, testhistorikk og lokalt erklæringsgrunnlag med bekreftet kontaktadresse.
- [ ] Gjennomføre resterende manuelle kontroller, inkludert dagens nye sider, innhold og chatvisning.
- [ ] Prøve anonym navigering, API-feil og kapasitetsvarsler med tastatur, hjelpemidler og mobil; innlogging er tatt ut av omfanget.
- [ ] Ferdigstille tilgjengelighetsvurdering og erklæring med navngitt godkjenner og faktisk nettadresse.

**Ferdig når:** P8 er dokumentert for den aktuelle leveransen. Tidligere delkontroller er ikke full samsvarsgodkjenning.

## Fase 4 – MVP 1: lokal portal og offentlig lansering

- [x] Implementere forside med katalog, Lær/Prøv/Del og anbefalt ressurs fra felles innhold.
- [x] Implementere oppstartsveiledning med retningslinjelenke, retningslinjeutkast og Om med KI-prat og mandatvedlegg.
- [x] Implementere søk/filter, ressursdetaljer, Beta-/eksempelmerking og generell bruksveiledning.
- [x] Implementere Spør KI med kildebasert veiledning og forberedt modellgenerering.
- [x] Rette gjentatte listemarkører, varsle ved kuttet tekst og vise grafemteller nær grensen, samt legge til Avbryt med umiddelbar frigjøring og vern mot sene svar (11. november). Rene parser-/input-/klient-/reducer-/kontrolltester er lagt til. Full test, bygg og avgrenset nettleserkontroll med tastatur ved 320 px er utført med simulert transport; se [rapport](docs/rag/2026-11-11/chat-controls.md). Oppfølging på commit `065b654` i Docker/Linux med Node 22.18.0: 172/172 Node-tester, 100/100 simulerte avbrudd/ny innsending og fire listevarianter bestod. Ingen ny Linux-bygg- eller nettleserkontroll. Dette er ikke ekte modell- eller full tilgjengelighetsgodkjenning.
- [x] Skille norske datoer/årstall fra listemarkører, bruke separate Send-/Avbryt-knapper med aria-busy og felles miljøfri portvalidering i Next/RAG (11. november). Førtester bekreftet feilene; separat knapp hindrer dobbel aktivering i å avbryte. Tastatur, dobbeltklikk, avbrudd/ny innsending og datovisning er kontrollert ved 320 px med simulert transport uten horisontal overflyt. [Rapport](docs/rag/2026-11-11/chat-dates-port.md). `pnpm test` bestod med **206/206 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og **133 relative filmål** i åtte dokumenter. `pnpm typecheck`, `pnpm format:check`, `pnpm build` og `git diff --check` bestod. Dette er ikke full tilgjengelighets-, modell- eller produksjonsgodkjenning.
- [x] Rette svarvisning, grafemlengde og demo-import (11. november 2026): ren testbar parser for lister/fet tekst/kildehenvisninger, felles grafemvalidering og 64 KiB kroppsgrense, og demokilder fjernet fra normalt klientbygg. Server- og Pages-bygg samt kort visuell prøve med simulert svar er kontrollert; dette er ikke full tilgjengelighets- eller modellverifisering.
- [x] Knytte alle seks chatforslag til felles spørsmål/kildeforventning og rette kontekst-/lagringsspørsmål (11. november). Indeksen bygges ved modulinnlasting, og handlingsord beholdes med lav vekt. Ablasjoner på kjente spørsmål fjernet seks unødvendige rangeringsledd. Et eget menneskeutfylt blindsett er opprettet tomt, med rapportering uten bygggrense. [Rapport](docs/rag/2026-11-11/retrieval-suggestions.md). `pnpm test` bestod med **187/187 Node-tester**, **3/3 Python-tester**, faktisk watch-/innholdssynk og **131 relative filmål** i åtte dokumenter. `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestod; ingen virkelig modell- eller produksjonsgodkjenning.
- [x] Videreutvikle kildesøket med norsk stamming, emneorddekning og deterministisk rangering (11. november). Utviklingssettet består 26/26 og nytt låst sett 20/20; første etterprøving ga 13/20, så sluttmålingen er ikke en uavhengig holdout-test. Modelloversikten kreves først. Se [evaluering](docs/rag/2026-11-11/relevans-boyninger.md). Hele testløpet består med 157 Node-tester og tre Python-tester; ingen ny modell-, drift- eller produksjonsgodkjenning.
- [x] Skille ekte blindmåling fra testpakken/CI (11. november): repoet har bare tom mal; mennesket holder settet utenfor repoet og velger fil med RAG_BLIND_FILE ved separat test:blind. Realpath-kontroll avviser repofiler og symbolske omveier. Standardrapporten røper ingen spørsmål eller kilde-ID-er; verbose=1 er kun for mennesker og aldri tuning. Syntetiske regresjoner prøver sti-/utskriftsreglene uten ekte data. Dette er verifisering av rapportverktøyet, ikke en ny måling av søkets generalisering.
- [x] Samle verb-/substantivbøyninger og filtrere frekvensord; prøve en avgrenset tokildersreserve bare etter null ordinære treff og med minst to støttede sjeldne temaer (11. november). Utviklingssettet er utvidet til 29 kjente spørsmål; heldOutEvaluation og øvrige forventninger er bevart. [Før-/etterrapport](docs/rag/2026-11-11/stamming-og-to-temaer.md) forklarer stamme-/terskelavvik og kontroller. Ingen ekte blindsett brukes; uavhengig evaluering og produksjonsgodkjenning gjenstår.
- [x] Legge til søkenøkkelord som metadata på sider/seksjonsvalg og bruke ressursenes keywords i eget indeksfelt (11. november). De fem nye kjente spørsmålene og falske treff kontrolleres; aliasene inngår ikke i kildetekst/API-/modellgrunnlag. [Rapport](docs/rag/2026-11-11/sokenokkelord.md) dokumenterer bestilt liste, tekstgrunnlag og før/etter. Ingen ekstra nøkkelord foreslås eller flettes automatisk; menneskelig gjennomgang før fletting og videre uavhengig evaluering gjenstår.
- [x] Beholde tastaturfokus på Send under venting med aria-disabled og sperret aktivering; returnere fokus til feltet ved avslutning bare fra Send/body (11. november). Rene fokus-/aktiveringstester og avgrenset tastaturprøve ved 320/1280 px bruker simulert transport. [Fokusrapport](docs/rag/2026-11-11/chat-focus.md) skiller dette fra full skjermleser-/tilgjengelighets- og produksjonsgodkjenning; P8 videreføres.
- [x] Rette samspillet mellom tastaturfokus og svarrulling (16. november): retur til spørsmålsfeltet bruker preventScroll, og siste svar er rulleanker. [Lokal kontroll](docs/rag/2026-11-16/chat-scroll.md): 279 Node-/tre Python-tester, typer, Docker-bygg og faktisk Qwen-/nettleserprøve med synlig svarstart bestod. Oppfølging på ba5aee0 ved 320 px (første/neste spørsmål) og i forsidens dialog ved normal/smal bredde bestod med fire faktiske Qwen-svar og synlig svarstart. Ingen ny kodeendring. Modellmiljøet er bevart. Ingen ny full tilgjengelighetsgodkjenning.
- [x] Legge til samlet skill-katalog i kunnskapsgrunnlaget fra de eksisterende ressursdataene (12. november). Bekreftet at «Hvilke skills har vi?» før ga ingen treff. Oversikten teller og skiller registrerte skill-pakker og øvrige Skill-eksempler automatisk; enkeltressursene beholdes. Regresjon og faktisk Qwen-prøve dokumenteres i [rapporten](docs/rag/2026-11-12/skill-oversikt.md). Dette leser ikke andre repoer eller private skill-filer.
- [ ] Verifisere søkets generalisering på et nytt uavhengig spørsmålssett og i oppgavebasert brukertest før bredere pilotbruk.
- [x] Rette og regresjonsteste relevansen i det lokale kildesøket (10. november 2026): 26 spørsmål med positive og negative forventninger, retningsbestemt prefiks, relevansterskel og deterministisk rangering. Se [før-/etter-evalueringen](docs/rag/2026-11-10/relevans.md). Dette erstatter ikke oppgavebasert brukertesting eller verifisering av faktisk modellgenerering.
- [x] Implementere nettstedskart, tilgjengelighetsside, versjonslogg og funksjonalitetsoversikt.
- [ ] Faglig gjennomgå og godkjenne representativt pilotinnhold, inkludert skill-beskrivelse og PDF.
- [ ] Publisere offentlig uten innlogging først når drift, offentlig innholdsgrense og aktuelle krav P1–P10 er dokumentert håndtert.
- [ ] Gjennomføre oppgavebasert brukertest og prioritere forbedringer.

**Ferdig når:** En avgrenset, autorisert brukergruppe kan finne en veiledning og en ressurs, få forståelig hjelp og melde problemer. Lokal funksjonalitet er klar, men pilotleveransen er ikke fullført.

**Avgrensning:** Ingen offentlig publisering nå. Statisk Pages-eksport skal fortsatt bare inneholde offentlig beskrivende data; den er ikke i seg selv et beskyttet miljø eller en modellserver.

## Fase 5 – Servermiljø, modellkobling og utrulling

- [x] Samordne tomme RAG-miljøverdier og portgrenser (11. november): bare usatte verdier gir standard; tom/blank verdi avvises. Miljøport 0 avvises; isolerte tester injiserer konfigurasjon med dynamisk port eksplisitt.
- [x] Sette opp lokal portal/Ollama i Compose med separat modellvolum, intern nettverksadresse og faktisk Qwen3:4b-svar (12. november). Strukturerte svar løser observert tenketekst fra modelltemplaten; avkuttede/ugyldige svar avvises med bevarte kilder. [Rapport](docs/rag/2026-11-12/compose-qwen.md). Dette fullfører ikke P3/P5/P6/P9 i et delt miljø.
- [x] Implementere separat RAG-HTTP-tjeneste og serverkonfigurasjon med valgene `none`, `ollama` og `openai-compatible`.
- [x] Implementere ekstern adapter med HTTPS, serverlagret Bearer-nøkkel, timeout, avvist videresending og nøytrale feilmeldinger.
- [x] Teste adaptere og HTTP-kontrakt med simulert transport, inkludert feil, manglende innstillinger og at hemmeligheter ikke returneres.
- [ ] Etablere drift av Next.js og RAG og intern ruting som passer den valgte plattformen.
- [x] Gjøre RAGs tillatte origins konfigurerbare med servervariabelen `RAG_ALLOWED_ORIGINS`, validering ved oppstart og bevarte loopback-standarder (10. november 2026). Lokale HTTP-integrasjonstester dekker annen devport, simulert delt origin, medietype, 413 og 500; dette verifiserer ikke delt drift.
- [x] Samordne modell-/proxy-/klientfrister (60/65/70 s), videresende avbrudd til transport og frigjøre modellkapasitet, samt gi 429 med kilder ved full konfigurerbar kapasitet. Lokale tester bruker simulerte modeller og faktisk Next-proxy. Oppfølging 11. november med Node 22.18.0/Docker Linux: 119/119 tester, 460/460 gjentatte fokusprøver og faktiske 35-/60-sekundersforløp bestod; se [rapport](docs/rag/2026-11-10/lifecycle.md). Ingen ekte modellverifisering eller nytt Linux-produksjonsbygg påstås.
- [x] Bekrefte at RAG_PORT i Next-rewrite låses ved bygg i 16.4.3, med lagret manifest og lokal produksjonsprøve: ulik runtime-port endrer ikke målet. Dokumentert krav om samsvar mellom byggport og faktisk tjenesteport.
- [ ] Gjøre intern RAG-adresse konfigurerbar og verifisere endepunktet fra faktisk HTTPS-adresse med riktig origin-liste.
- [ ] Velge modell/leverandør og avklare databehandling, før virkelige server-secrets legges inn.
- [x] Undersøke og rette den lokale genereringstimeouten fra 16. november: kontrollert A/B/A viste ytelsestap ved automatisk 18 tråder. Validert OLLAMA_NUM_THREAD og Compose-profil med fire tråder ga fem reelle genererte svar på 7–32 s i isolert Docker, med samme modell, kontekst, tokenbudsjett og 60-sekundersgrense. To README-skriptkjøringer bestod kald/varm, og skill-spørsmålet bestod. [Rapport](docs/rag/2026-11-16/qwen-threads/rapport.md). Dette lukker det lokale timeout-funnet, ikke P5/P9, modellgodkjenning eller delte ytelses-/belastningskrav.
- [ ] Utvide den innledende lokale Qwen-prøven til reell generering med representative spørsmål, kildestøtte og utilstrekkelig grunnlag, samt feil, treghet og kostnads-/kapasitetsgrenser.
- [ ] Etablere ratebegrensning, logger uten hemmeligheter, helsesjekker, alarmer og en dokumentert tilbakeføringsprøve.
- [ ] Bygge og utrulle nettside og RAG fra samme revisjon med kontroll av innhold og hemmeligheter i artefaktene.

**Ferdig når:** P3, P5 (eller eksplisitt avgrensning til veiledning uten modell), P6 og relevante deler av P9 er testet i det delte miljøet. Pages alene leverer ikke disse serverfunksjonene.

## Fase 6 – Offentlig innholdsgrense (tidligere innlogging)

Brukerbeslutning 17. november 2026: innlogging, sesjoner og medlemskontroll er tatt ut av omfanget. Dette er et trukket krav, ikke en ferdig implementert funksjon. Bare innhold som kan deles offentlig skal inngå i nettstedet og RAG.

- [ ] Gjennomgå sider, vedlegg, kildegrunnlag og byggutdata for offentlig publisering (P2/P7).
- [ ] Kontrollere at nøkler, interne filer og modell-/administrasjonsgrensesnitt ikke eksponeres (P2/P6/P9).
- [ ] Teste anonym bruk på endelig adresse og faktisk vern mot misbruk av Spør KI.

**Ferdig når:** offentlig innholdsgrense og anonym bruk er kontrollert på lanseringskandidaten. Faglig godkjenning og driftsvern gjenstår til dette er dokumentert.

<details>
<summary>Tidligere plan for innlogging – trukket tilbake 17. november 2026</summary>

## Fase 6 – Offentlig innholdsgrense (tidligere MVP 2)

- [ ] Velge identitets-/tilgangsløsning og avgrenset GitHub-medlemskontroll uten skriverettigheter til andre repoer.
- [ ] Implementere innlogging, sikre sesjoner og utlogging, og kontrollere tilgang på serveren.
- [ ] Beskytte hele pilotmiljøet etter avtalt målgruppe, inkludert `/api/rag` og vedlegg; beskytte det senere interne området før internt innhold legges til.
- [ ] Definere ny medlemskontroll, fjernet tilgang, utløp og oppførsel når identitetstjenesten feiler.
- [ ] Teste direkte lenker, ressursnedlasting, manglende/fjernet medlemskap, utløpte sesjoner og uautorisert API-bruk.
- [ ] Før private kilder innføres: etablere tilgangsfiltrert henting, søk og mellomlagring, og kontrollere at private data ikke følger med offentlig bygg.

**Ferdig når:** P2 er verifisert og uautoriserte brukere ikke kan hente beskyttet innhold eller bruke beskyttede API-er. Dette er en forutsetning for første deling, ikke en oppgave som utsettes til etter piloten.

</details>

## Fase 7 – MVP 3: skills og distribusjon

- [x] Opprette separat lokalt Skills-repo med struktur for flere skills og egen versjonslogg.
- [x] Utvide tilgjengelighetsskillen til testing, rettingsforslag og erklæringsutforming, med daterte resultater i målprosjektet.
- [x] Utvide skillen til 0.4.0 med konkrete prosedyrer for alle 48 nettkrav og automatisk opprettet, uutfylt testplan. Dette er utvidelse av testverktøyet, ikke gjennomføring av portalens gjenstående tilgjengelighetskontroller.
- [x] Videreutvikle tilgjengelighetsskillen til 0.6.0 med kartlegging av testmuligheter, avslutningsvilkår og dokumentavstemming; brukt i siste lokale oppfølging. Portalens katalogversjon er avstemt mot skillens metadata.
- [x] Opprette selvstendig cookie-/samtykkeskill 0.1.0 og lokal cookie-side med datert kartlegging. Kartleggingen begrunnet at samtykkebanner ikke trengs i undersøkt lokal versjon; nytt miljø eller nye integrasjoner må vurderes på nytt.
- [x] Opprette personvernskill 0.1.0 med kartlegging, arbeidsmaler, faglige referanser og datert resultatlagring, installere lik lokal kopi og registrere Beta-beskrivelsen i katalogen og Spør KI. Seks tester av lagringsverktøyet bestod i isolerte prosjekter; dette er ingen juridisk godkjenning.
- [x] Validere pakke/metadata og teste lagringsverktøyene; tidligere dokumenterte 15 regresjonstester bestod i isolerte prosjekter.
- [x] Gjøre skillen gjenfinnbar i katalog og Spør KI med versjon, plassering og generell bruksveiledning.
- [ ] Få skillen gjennomgått av et menneske, og avklare eier/godkjenner før Beta-status eventuelt endres.
- [ ] Avklare om/når Skills-repoet skal få GitHub-remote og hvilke ressurser som kan distribueres.
- [ ] Etablere versjonerte utgaver og faktisk nedlasting/installasjon, med autorisasjon for private ressurser.
- [ ] Prøve bestemt versjon, oppdatering og tilbakeføring med et pilotteam, uten å overskrive lokale endringer utilsiktet.

**Ferdig når:** Et godkjent bibliotek kan installeres og oppdateres etter en testet prosess. Dagens katalogbeskrivelse betyr ikke at portalen allerede distribuerer skill-pakken.

## Ressurskatalog – navngiving oppdatert 9. november 2026

- [x] Rette «Utforsk ressursene» til et vanlig ankerhopp på samme side, inkludert gjentatte klikk når ankeret allerede står i adressen.

- [x] Endre meny- og katalognavn til Ressurskatalog, bruke «Finn en ressurs» som overskrift og presisere innholdet som skills, instruksjoner og prompter. Felles tekst brukes på forsiden, i menyen og i funksjonsregisteret/Spør KI. Henvisninger på detaljsider, Om og erklæringssider er avstemt. Nettadressen `/#ressurser` beholdes.

## Oversikt – levert lokalt 9. november 2026

- [x] Opprette Godkjente MCP-er under Oversikt med Atlassian MCP (ROS-analyse pågår) og Slack MCP (planlagt). Ingen av dem oppgis som godkjent. Status deles med Spør KI og retningslinjene peker til oversikten.
- [x] Legge til Logorama MCP og Prometheus MCP som godkjent etter brukerens opplysning (16. november). Felles sideinnhold og veiledningsutvalg brukes av Oversikt, funksjonsregister og Spør KI; Atlassian-/Slack-status beholdes. Ingen tilkobling eller nye rettigheter opprettes.
- [x] Kontrollere Spør KI mot MCP-statusene med faktisk Qwen3:4b (16. november): fire spørsmål på portalen fra 88cc33a ga riktige godkjenninger for Logorama/Prometheus og korrekt skille mot Atlassian/Slack, med kildehenvisninger. [Svar og målinger](docs/rag/2026-11-16/godkjente-mcper.md). Dette er et avgrenset eksempelsett, ikke generell svarkvalitets- eller produksjonsgodkjenning.
- [ ] Oppdatere MCP-status etter bekreftede vurderinger og beslutninger, med godkjent bruksomfang når dette foreligger. ROS-arbeidet er ikke gjennomført av portalen.

- [x] Legge inn Nasjonalarkivets oppgitte Copilot-retningslinjer på /retningslinjer/github-copilot/ (16. november), med lenker fra Retningslinjer og assistentoversikten. Felles innhold brukes av Spør KI og avledet funksjonsregister/nettstedskart. Generell KI-veiledning beholder utkaststatus.
- [x] Rette Copilot-testspørsmålets kildevalg og avgrense modellkonteksten (17. november). Samme fem spørsmål ga 5/5 riktige første kilder og genererte svar, HTTP 200 på 2,9–29,8 s med uendret modellfrist. 289 Node-/tre Python-tester, innholdssynk, typekontroll, formatering og Docker-bygg bestod. [Første prøve og retest](docs/rag/2026-11-16/copilot-retningslinjer.md).
- [ ] Følge opp interne Ollama-EOF-feil ved gjentakelse og utvide faglig prøveutvalg for avgrenset modellkontekst før delt pilot. Tidligere EOF er verifisert i loggen, men årsak er uavklart og feilen ble ikke reprodusert 17. november. OOM-teller var 2 før/etter retesten; ingen nye hendelser. Lokal 5/5-prøve er ikke en generell driftsgodkjenning.
- [x] Legge til Godkjente KI-assistenter under Oversikt, med Copilot, Claude AI og Codex som godkjent etter brukerens opplysning 9. november 2026. Siden og Spør KI deler innhold; retningslinjene viser til listen.
- [ ] Supplere assistentoversikten med bekreftede konto-/lisensrammer, modeller, integrasjoner og tillatte datakategorier. Assistentgodkjenningen er ikke en avklaring av disse forholdene eller portalens produksjonskrav.

- [x] Opprette `/oversikt/` som inngang med priser og abonnement som første del. Hovedmeny og bunntekst er oppdatert; `/priser/` beholder adressen og har brødsmulesti til Oversikt.
- [x] Dele beskrivelsene mellom siden, funksjonsregisteret og Spør KI. Modelloversikt og forbruk er merket planlagt, uten falske data eller døde lenker. Alle 45 tester og produksjonsbygg bestod.
- [ ] Utvide med modelloversikt når egenskaper, kilder og innholdsansvar er avklart.
- [ ] Utvide med faktisk forbruk først etter avklart datatilgang, personvern, autorisering og kilde. Ingen innhenting av bruksdata er implementert.

## Prisoversikt – levert lokalt 9. november 2026

- [x] Opprette `/priser/` med abonnement for Copilot/Claude/Codex, separate direkte API-tabeller og Copilot-tokenpriser, offisielle kilder og kontrolltidspunkt. Registrert som Beta, opprinnelig med lenke i bunnteksten; inngangen går nå via Oversikt.
- [x] Hente og formatkontrollere alle seks kilder; samme snapshot brukes av siden og Spør KI. HTTP-/parsefeil bevarer forrige vellykkede data og gir synlig feilstatus ved neste bygg. Prisutvalget er eksplisitt og omfatter ikke alle planer/modeller.
- [x] Lage lokale parser-/feilhåndteringstester, foreldelsesvarsel og daglig GitHub-arbeidsflyt som foreslår prisdata og versjonslogg i PR. Alle 45 tester og lokalt produksjonsbygg bestod.
- [x] Rette prisparser og lagringsflyt, og klargjøre én fast prisgren som reagerer på rader/kildemetadata/status/feil, ikke tidspunkter alene (10. november 2026). Lokale fixture-tester og simulert PR-flyt dekker oppretting, oppdatering, datostøy og tilbakeført prisforslag. Ingen live prisinnhenting eller GitHub-verifisering utført i denne rettingen.
- [x] Rette parseravgrensning og Claude-fotnoter (11. november): bare den valgte pristabellens strukturfeil skal feile; ett avgrenset fotnotesiffer kan stå etter MTok i alle priskolonner. Faktiske sync-/PR-/feil-shell fra workflowen er lokalt simulert med fixtures, bevarte priser ved kildefeil og gjenoppretting. [Rapport](docs/priser/TESTRAPPORT.md). Dette er ikke faktisk Actions, leverandørkontroll eller utrulling.
- [ ] P4: Legge repoet på GitHub, tillate nødvendige Actions-/PR-rettigheter og prøve planlagt/manuell jobb. Bare samme repo får skriverettigheter; ingen andre repoer eller modellnøkler brukes.
- [ ] Koble sammenslått prisgrunnlag til faktisk utrulling av både nettside og RAG, og teste feilkilder/varsling i det delte miljøet. Automatisk produksjonsoppdatering er ikke aktiv. Avklare hvem som gjennomgår åpne pris-PR-er og vedlikeholder utvalget; aktiveringsstatus på siden skal oppdateres først etter verifisering.

## Datert kontrollhistorikk – 9.–10. november 2026

Avsnittene frem til fase 8 bevarer tidligere kjøringer og deres daværende restlister. Tall som 37 restpunkter og 15 uavklarte krav er historiske, ikke dagens restantall. Bruk kontrollgrunnlaget øverst og [gjeldende WCAG-kontroll](docs/tilgjengelighet/WCAG-KONTROLL.md) for oppfølging av de åtte uavklarte kravene. Tidligere avkrysninger endres ikke uten ny evidens.

### Lokale testmotorer – 10. november 2026

- [x] Installere låst axe CLI, Nu Html Checker og kompatibel ChromeDriver som utviklingsavhengigheter, med lokal Java-runtime. Ingen ekstern skanntjeneste eller global Java-konfigurasjon.
- [x] Kjøre begge motorene på eksporten: axe på 20 registrerte sider og feilside, vnu på eksportfilene. Originalresultater og tekniske feil bevares. Faktisk negativ verktøytest bekrefter at begge motorene finner manglende alt i en separat testside. Kjøring `090555-native-d984a7c5` og vurdert grunnlag `090740-ca8d9c80ecb6`: 0 axe-violations / 0 HTML-feil, men tre kontrastgrupper (80 forekomster) og tekniske noter er vurdert videre. Arbeidsstatus 21 K / 11 I / 16 U / 0 B; ikke samlet godkjenning.
- [ ] Vurdere de gjenstående kontrastforholdene manuelt og fullføre øvrige hjelpemiddel-/zoom-/produksjonskontroller. Skannene er ingen samlet P8-godkjenning. Første delte miljø er fortsatt lukket pilot.

### Retting av tre tilgjengelighetsavvik – 10. november 2026

- [x] Rette og målrettet reteste A11Y-04–06: PDF-listestruktur, PDF-tekstkontrast og språk/tittel på 404-siden. Ny kjøring: `docs/tilgjengelighet/2026-11-10/080757-ffaeb036427a/`. PDF har tre lister/12 punkter, 229 bevarte MCID-koblinger og 6,28:1 tekstkontrast på side 5. Norsk 404 og én tittel er kontrollert i nettleser/eksport.
- [x] Oppdatere rapporter, restliste, kort erklæring, funksjonsregister og vedleggsstørrelse. Ingen bekreftede åpne avvik i undersøkt utvalg; samlet samsvar er fortsatt uavklart (20 K / 11 I / 17 U / 0 B).
- [ ] Fullføre den brede manuelle restlisten og teste faktisk publisert fallback. Axe/vnu er nå installert og kjørt, se nyere resultater. Rettede lokale avvik fullfører ikke P8 eller produksjonsgodkjenningen.

### Tilgjengelighetskjøring – 10. november 2026

- [x] Kjøre skill 0.5.0 på alle 20 registrerte sider med automatiske HTML/PDF-/nettleserdeler og tre deklarerte forløp. Rapport og kravvis manuell restliste ligger i `docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd/`. Tidligere kjøringer er bevart.
- [x] Oppdatere testplan, vurdert matrise, kort erklæring og lokal side. Tre åpne avvik og fortsatt uavklart samlet samsvar; 31 krav med automatisk deldekning er ikke 31 oppfylte krav.
- [x] Rettet og lokalt retestet 10. november i `080757-ffaeb036427a`; tidligere oppgave A11Y-06: engelsk 404-melding uten riktig språkmerking. Vurdere også sidetittelen og faktisk publisert 404-fallback. De to PDF-avvikene nedenfor er også rettet i den nye retesten; produksjonsfallback gjenstår.
- [ ] Fullføre de 37 gjenstående vurderings-/rettings-/retestpunktene i den manuelle restlisten, særlig faktisk skjermleser, 200/400 % forstørring, enhetsinnstillinger, resterende kontrast, tekstavstand og PDF-semantikk. 11 krav er uten utløsende innholdstype i lokalt omfang og må vurderes på nytt ved endring.
- [x] Gjort lokal axe/full HTML-validator tilgjengelig og kjørt skann 10. november; se nyere motorresultater. Ingen ekstern opplasting er utført. P8 er fortsatt åpent.

### Tilgjengelighetsretest – 9. november 2026

- [x] Utvide skillen til 0.5.0 med automatiske deltester og kravvis manuell restliste for alle 48 krav. HTML/PDF, rendret DOM, beregnbar kontrast, omflyting, fokus og deklarerte forløp støttes; lokal validator og faktisk axe-rapport brukes når tilgjengelig. Manglende verktøy blir synlig blokkert. Utvidelsen endrer ikke siste portalvurdering eller åpne avvik.

- [x] Gjennomgå alle 48 prosedyrer med skill 0.4.0 og dokumentere faktisk resultat, begrensninger og neste steg per krav. Kjøring `docs/tilgjengelighet/2026-11-09/221027-5ce9daf9d5dc/`: 20 K / 11 I / 15 U / 2 B. Gjennomgått er ikke det samme som ferdig testet.
- [x] Rettet og målrettet retestet A11Y-04 (PDF-side 7, semantiske lister) og A11Y-05 (PDF-side 5, tekstkontrast) 10. november, se `080757-ffaeb036427a`. Øvrig PDF-/hjelpemiddelvurdering gjenstår. De tidligere rettede PDF-overskriftene og tittelen består.

- [x] Rydde den brukerrettede erklæringen og oppdatere tilgjengelighetsskill 0.3.1 slik at tekniske resultater og arbeids-/rettingshistorikk holdes i rapportene. Teststatus og gjenstående kontroller er uendret.

- [x] Kontrollere 20 nåværende HTML-sider, nye oversikter/priser/personvern og animasjonen med skill 0.3.0. Lagre resultatene i `docs/tilgjengelighet/2026-11-09/201443-73cb0a3e52e0/` og oppdatere erklæring og 48-punkts arbeidsmatrise. 23 eksportfiler, 60 responsive DOM-kontroller og 40 tekstavstandskontroller er dokumentert.
- [x] Rette og reteste A11Y-01 (3.1.2) i en egen oppfølging: prisvilkår genereres på norsk, faktisk prisoppdatering og alle seks vilkårsseksjoner er kontrollert. Tre nye regresjonstester dekker gjentatt oppdatering, endrede vilkår og ukjent format. Se `docs/tilgjengelighet/2026-11-09/203914-cf2e80bc00f7/`. P8 er fortsatt åpent grunnet øvrige uavklarte kontroller.
- [x] Fortsette lokale kontroller av syv PDF-sider, supplerende kontrastpar, tastaturflyt på fire nye sider og chatfokus. Ny rapport: `docs/tilgjengelighet/2026-11-09/205326-389241d1fd6e/`. Arbeidsstatus 25 K / 10 I / 11 U / 2 B, ikke en samsvarsprosent.
- [x] Rette og struktur-/metadatareteste A11Y-02 (PDF-overskrifter, 1.3.1) og A11Y-03 (dokumenttittel, 2.4.2). Retest `docs/tilgjengelighet/2026-11-09/210420-07c855b7770e/` bekrefter 27 overskriftsroller, 229 MCID-koblinger, korrekt Info-/XMP-tittel og uendret rendering/tekst på syv sider. Faktisk skjermlesertest er ikke utført. Ny status: 26 K / 10 I / 12 U / 0 B. 1.3.1 forblir U for øvrig PDF-semantikk; P8 er fortsatt åpent.
- [ ] Fullføre de 15 uavklarte vurderingene, inkludert faktisk skjermleser, PDF-alternativer/leserekkefølge/språk, faktisk zoom/orientering, full kontrast/fokus/kodevalidering, redusert bevegelse med faktisk innstilling og vurdering av automatisk prisaldervarsel. K/I-resultater er delgrunnlag, ikke automatisk formell etterlevelse.
- [ ] Bekrefte juridiske virksomhetsopplysninger, endelig URL, oppfølgingsansvar og godkjenner før registrering. P8 er fortsatt åpent; ingen samsvarskategori er ferdig vurdert.

## Fase 8 – MVP 4: forvaltning og produksjonsgodkjenning

- [ ] Utpeke ansvarlige for drift, innhold, tilgjengelighet, modeller og tilgang.
- [ ] Etablere bidragsmaler, faglig review, dato/ansvar for innholdsgjennomgang og vedlikehold av Beta-/utkaststatus.
- [x] Lage lokalt personvernerklæringsutkast på `/personvern/`, lenke i bunnteksten og datert kartlegging i `docs/personvern/2026-11-09/161600-a3368ac30b20/`. Nettsiden og Spør KI bruker felles kilde; kontaktadresse er bekreftet.
- [ ] Ferdigstille personvern-/databehandlingsinformasjon ut fra valgt drift, modell og eventuell logging. P9 er fortsatt åpent: bekreft behandlingsansvarlig, ombud, rettsgrunnlag per aktivitet, leverandøravtaler, overføringer og lagring; gjennomfør nettleser-/nettverkskontroll i faktisk pilotmiljø.
- [ ] Gjennomføre samlet sikkerhets-, tilgjengelighets- og produksjonskontroll og dokumentere avvik/tiltak.
- [ ] Prøve produksjonsutrulling, overvåking, hendelseshåndtering og tilbakeføring.
- [ ] Lukke prioriterte pilotfunn og dokumentere beslutning om lansering.
- [ ] Før offentlig åpning: godkjenne offentlig innhold og kontrollere skillet mot eventuelt internt område på nytt.

**Ferdig når:** De aktuelle kravene P1–P10 er dokumentert håndtert, og prosjekteier og navngitte fag-/driftsansvarlige godkjenner leveransen. Utsatt skill-installasjon eller modellgenerering skal være et eksplisitt omfangsvalg, ikke skjult manglende funksjonalitet.

## Neste arbeidsbolk

Bruk sjekklisten for offentlig lansering ovenfor som arbeidsliste. Lokale forberedelser kan gjøres parallelt med administrator- og fagavklaringer; ingen offentlig åpning før kontrollene i faktisk miljø og oppstartsbeslutningen er dokumentert.

1. **Avklar P1:** Velg ansvarlige, driftsmiljø og offentlig lanseringsomfang. Dette styrer videre implementering.
2. **Gjennomfør P2–P4 og P6:** Kontroller offentlig innholdsgrense og implementer produksjonsruting, CI og anonymt API-vern i det valgte miljøet.
3. **Velg om modellgenerering skal være med ved lansering:** Gjennomfør P5 eller avtal kildebasert veiledning uten generering.
4. **Arbeid parallelt med P7–P8:** Gjennomgå innhold/skill og fullfør tilgjengelighetskontrollen; ikke vent til lanseringsdagen.
5. **Verifiser P9–P10:** Prøv drift/tilbakeføring og gjennomfør lukket brukertest før produksjonsgodkjenning.

## Beslutninger og avklaringer

| Tema                   | Gjeldende retning                                                                                 | Gjenstående beslutning                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Publiseringsrekkefølge | Lokal utvikling → kontrollert offentlig lansering uten innlogging                                 | Offentlig innholdsutvalg, lanseringsdato og misbruksvern                                 |
| GitHub                 | Portalens organisasjonsrepo og første push er bekreftet av brukeren; Skills har separat historikk | Verifisert tilgang/standardgren, runner/IP, grønn CI, PR-regler og utrullingsrettigheter |
| Innhold                | Praktisk nytte, felles kilder og tydelig Beta-/utkaststatus                                       | Navngitte eiere og faglig godkjenning                                                    |
| Modeller               | Lokal eller ekstern adapter; nøkkel kun på server                                                 | Godkjent leverandør/modell, databehandling og om generering inngår i pilot               |
| Drift                  | Next.js og RAG må driftes og utrulles samlet fra samme revisjon                                   | Plattform, domene, intern ruting, overvåking og driftsansvar                             |
| Pages                  | Statisk demo-/byggvariant beholdes lokalt                                                         | Om den får en senere rolle; offentlig demo er ikke prioritert nå                         |
| Forvaltning            | Plan, versjonslogg og funksjonsregister oppdateres i samme arbeidsøkt                             | Roller, PR-prosess og faste gjennomganger når samarbeid etableres                        |

## Endring 9. november 2026

Planen er også tilgjengelig som `/utviklingsplan/` i portalen, med lenke fra bunnteksten, nettstedskartet og funksjonalitetsoversikten. Nettsiden bygges direkte fra denne filen; oppdateringer følger neste bygg/utrulling.

Planen er avstemt med kode, dokumentasjon og commit `e93e5f9`. Fase 4 er endret fra offentlig Pages-demo til lokal portal og lukket pilot, i samsvar med ønsket om å avvente offentlig publisering. Gjennomført arbeid med innhold, RAG, skills og oversikter er registrert, og produksjonskrav P1–P10 er prioritert. De tidligere datostemplede avsnittene nedenfor bevares som historikk.

## Historikk fra tidligere arbeidsøkter

### Lokal status – 30. oktober 2026

- En «Om»-side beskriver portalens praktiske formål og AI enablement-teamets foreslåtte rolle. Mandatet brukes som bakgrunn; brukernytte styrer innholdsprioriteringen.

- Node.js fra Codex sin medfølgende runtime benyttes; ingen global installasjon er gjort.
- Next.js, React og TypeScript er installert med låste versjoner og `pnpm-lock.yaml`.
- `sh scripts/dev.sh` starter portalen på `http://127.0.0.1:3000`.
- Vanlig produksjonsbygg og statisk Pages-bygg er verifisert.
- Forside, søk, kategorifiltrering og veiledningsside er prøvd i nettleseren.
- Digitalarkivets MUI-tema 5.1.0 er integrert med MUI 9.5.0 og et eget futuristisk tilpasningslag. Innholdet er fortsatt eksempler.
- Palett, typografi og komponentstiler hentes fra designbiblioteket. Portalens egen arklogo er senere implementert. Godkjente Suisse-skriftfiler gjenstår; reserveskrift brukes foreløpig.
- GitHub-tilgang, innlogging, CI og faktisk publisering er ikke konfigurert.
- Formatering og typekontroll finnes lokalt; øvrig kodekontroll og CI gjenstår.

Ved oppdatering av planen:

1. Kryss av bare oppgaver som er utført og verifisert.
2. Oppdater status i faseoversikten og datoen øverst.
3. Registrer vesentlige beslutninger og endringer nedenfor.
4. Legg til ansvarlige og lenker til GitHub-issues eller pull requests når disse finnes.
5. Juster fremtidige faser ut fra erfaringene, og bevar begrunnelsen for større endringer.

### Neste oppgaver slik de var formulert 30. oktober

- [ ] Bekrefte GitHub-organisasjon og ønsket tilgangsmodell.
- [ ] Avklare godkjente Suisse-skriftfiler og logo for full profiltilpasning.
- [ ] Velge første artikler og ressurser, eller godkjenne bruk av eksempelinnhold.
- [ ] Avklare prosjekt- og innholdsansvarlige.

### Endringslogg

| Dato       | Endring                                                              | Begrunnelse                                                                                                                                                |
| ---------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-30 | Opprettet planen med åtte faser og fire MVPer.                       | Samlet avtalt retning, Pages-demonstrasjon, futuristisk design og avgrenset GitHub-tilgang i et dokument for løpende oppfølging.                           |
| 2026-10-30 | Etablert lokalmiljø og første prototype.                             | Verifisere lokal kjøring og begge byggvarianter før integrasjon med designbibliotek og GitHub.                                                             |
| 2026-10-30 | Integrert publisert Digitalarkivet-tema og MUI-komponenter.          | Erstatte midlertidige designverdier med virksomhetens bibliotek uten tilgang til andre GitHub-repoer.                                                      |
| 2026-10-30 | Forbedret visuell struktur og navigasjon.                            | Kortere introduksjon, katalog høyere opp, samlet søk/filter, aktiv meny, klikkbare snarveier og egne eksempelsider. Logo og Suisse-filer mangler fortsatt. |
| 2026-10-30 | Gjeninnført romslig, futuristisk forside og tilpasset MUI-uttrykket. | Stor overskrift og KI-illustrasjon, mørke blågrønne flater, diskret rutenett og lys-/gradienteffekter. Katalog, navigasjon og detaljsider beholdes.        |
| 2026-10-30 | Implementert valgt arklogo og favicon.                               | Ren SVG i toppmenyen med samme aksentfarge som overskriften, SVG-favicon, ICO i 16/32/48 piksler og Apple-ikon i 180 piksler.                              |
| 2026-10-30 | Arklogo erstatter KI-tekst i forsideillustrasjonen.                  | To dempede ringer, to datapunkter og statisk grønt lys. Kompakt illustrasjon vises også på mobil.                                                          |
| 2026-10-30 | Hentet tilbake opprinnelige kryssende ringer.                        | Mindre arklogo i sentrum, med opprinnelig futuristisk ringuttrykk etter visuell tilbakemelding.                                                            |
| 2026-10-30 | Lagt til første lokale RAG-tjeneste og «Spør KI».                    | Offentlig kildehenting, lokal Ollama-adapter og kildesøk i Pages. Modellvalg, live generering og produksjonstilgang gjenstår.                              |

## Tillegg – RAG-tjeneste

- [x] Opprette offentlig kildegrunnlag fra tre eksempelressurser.
- [x] Implementere nøkkelordbasert henting og vise kildeutdrag.
- [x] Lage separat lokal API og modelladapter for Ollama.
- [x] Beholde statisk Pages-bygg med kildesøk uten modellkall.
- [x] Verifisere henting, validering og avvisning av fremmed opprinnelse.
- [ ] Bekrefte godkjent modell og konfigurere modellnavn.
- [ ] Verifisere genererte svar, feilsvar og kildebruk mot faktisk modell.
- [x] Visuell kontroll av «Spør KI» i nettleseren ved 320 piksler, inkludert lukking med Escape og retur av fokus (6. november).
- [ ] Utvide kunnskapsgrunnlaget og evaluere søkekvalitet; vurdere embeddings ved behov.
- [ ] Etablere produksjonsdrift, autentisering og ratebegrensning før ekstern lansering.
- [ ] Utforme separat tilgangskontroll for interne kilder før slike kilder legges til.

### Chatbot på forsiden – 30. oktober 2026

- [x] Knapp som åpner chatdialog på forsiden.
- [x] Samtalehistorikk i minnet, kildeutdrag og tømming av chat.
- [x] Gjenbruk av RAG-API og statisk kildesøk.
- [x] Første visuelle nettleserkontroll utført 6. november; se KVALITETSKONTROLL.md.

### Visuell tilpasning av chatbot – 30. oktober 2026

- Portalens arklogo, mørke blågrønne flater, gradienter og grønne lyskanter brukes i chatten.
- Meldinger, kildekort og skrivefelt har felles formspråk.
- Forslag til spørsmål fyller skrivefeltet uten å sende automatisk.
- Visuell nettleserkontroll er fortsatt uverifisert grunnet tidligere avvisning fra nettleserverktøyets URL-policy.

## Teknisk opprydding – 30. oktober 2026

- [x] Skilt grunnstiler, layout, forside, katalog, artikler og chat i egne stilfiler.
- [x] Fjernet overskrevne CSS-deklarasjoner uten å endre eksisterende klassenavn.
- [x] Delt chatbot i logikk, tilstand, API-klient og mindre visningskomponenter.
- [x] Samlet API-typer og validering i en delt kontraktmodul.
- [x] Skilt HTTP, modelladapter, instruksjoner og RAG-svarflyt.
- [x] Samlet gjentatte farger og effekter i tema-/designverdier.
- [x] Lagt til tester for samtaletilstand, API-kontrakt, samtidighet og modellfeil.
- [x] Dokumentert modulgrenser i ARCHITECTURE.md.

Oppdelingen skal bevare eksisterende utseende, kilder og tilgangsbegrensninger. Visuell nettlesersammenligning er foreløpig ikke verifisert på grunn av tidligere blokkering i nettleserverktøyet.

## Statusgjennomgang – 6. november 2026

- Faseoversikt og oppgaver er avstemt mot eksisterende kode og lokal Git-historikk. Tidligere «ikke startet»-status for design og demo var utdatert.
- Lokal Git har første commit. GitHub-remote, CI, publisering og innlogging er fortsatt ikke konfigurert.
- Første nettleserkontroll er nå mulig og gjennomført. Tidligere merknader om blokkering beskriver situasjonen 30. oktober, ikke dagens status.
- Hovedinnholdet er gjort fokuserbart for «Hopp til innhold». Fokusmarkering omfatter også tekstområder og kildeutdrag. Menylenkene har minst 44 pikslers høyde, og bunnteksten har plass under chatknappen.
- Se [kontrollrapporten](KVALITETSKONTROLL.md) for omfang, funn og gjenstående kontroller. Dette er første kvalitetssjekk, ikke en full WCAG-revisjon.
- Prioritert videre: utvidet tilgjengelighetskontroll, godkjent offentlig innhold, eget GitHub-repo og CI, deretter Pages-demo og brukertest.

## Tilgjengelighet og erklæring – 6. november 2026

- [x] Vurdere alle 48 krav i en egen kontrollmatrise, med eksplisitte avgrensninger og uavklarte punkter.
- [x] Utføre utvidet lokal tastatur-, DOM-, mobil-, landskaps- og tekstavstandskontroll og rette funn.
- [x] Legge til kontrasttester, HTML-grunnkontroll, nettstedskart og lokal tilgjengelighetsside.
- [x] Lage erklæringsgrunnlag med bekreftet kontaktadresse, klageadgang og vedlikeholdsrutine.
- [ ] Fullføre skjermleser, verifisert zoom, resterende kontrast-/fokustilstander og flere nettlesere.
- [ ] Avklare ansvarlig godkjenner, juridiske registreringsopplysninger og endelig nettadresse.
- [ ] Registrere og publisere den formelle erklæringen i uustatus.no og lenke den fra portalen før lansering.

Detaljer: [WCAG-kontroll](docs/tilgjengelighet/WCAG-KONTROLL.md), [erklæringsgrunnlag](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md). Fase 3 er ikke ferdig godkjent før de gjenstående manuelle kontrollene er gjennomført.

## Første skill i lokalt bibliotek – 7. november 2026

- [x] Opprettet separat lokalt `Skills`-repo med første commit `85af197` og struktur for flere skills. Ingen GitHub-remote er konfigurert, i tråd med brukerens avklaring.
- [x] Kopiert tilgjengelighetsskillen med arbeidsmal, referanser og agentmetadata til `skills/tilgjengelighetserklaering/`.
- [x] Gjort skillen søkbar i portalens katalog med egen detaljside og tydelig skille mellom lokal skill og eksempelressurser.
- [x] Lagt til tester for søk, nøkkelord, typefilter og kildehenting; 21 tester passerer.
- [ ] Avklare eventuell senere GitHub-publisering, tilgang og distribusjon. Ingen automatisk synkronisering eller installasjon er innført.

Tilgjengelighetskontrollen fra 6. november omfattet ni sider. Den nye skill-detaljsiden utvider portalen til ti sider og må inngå i neste samlede tilgjengelighetsvurdering.

### Lokal tilgjengelighetsoppfølging – 10. november 2026

- [x] Utføre nye nettleser-/tekstavstands-/dynamiske kontroller, konservativ gradientanalyse og isolert simulering av prisaldervarsel. [Rapport og evidens](docs/tilgjengelighet/2026-11-10/094541-e2907a5c27e2/testrapport.md). Midlertidig CSS er identisk tilbakeført. 1.4.12 er K i prøvd lokal HTML-versjon; samlet samsvar er uavklart (22 K / 11 I / 15 U / 0 B).
- [ ] Fullføre faktisk skjermleser, verifisert 200/400 % forstørring, fysisk orientering/redusert bevegelse og avtalte nettlesere. Native Chrome-tilgang ble avvist automatisk; viewport er ikke zoom.
- [ ] Ferdigstille faglig vurdering av PDF-diagram/språk/rekkefølge, øvrig ikke-tekstlig kontrast/tilstander og prisaldervarselets pausebehov. Test innlogging, faktisk modell og publisert fallback i beskyttet pilot når miljøet finnes. P8 er ikke godkjent; første delte miljø skal fortsatt være lukket.

### Informasjonskapsler og selvstendig skill – 10. november 2026

- [x] Opprettet selvstendig cookie-/samtykkeskill 0.1.0 med egne verktøy, kilder og mal i Skills-repoet og installert kopi. Ingen andre skills kreves. Søkbar som Beta i ressurskatalogen.
- [x] Utført lokal kilde-/HTTP-/nettleserkartlegging og dokumentert [bannerbeslutning](docs/informasjonskapsler/2026-11-10/121354-92b5bf52/bannerbeslutning.json): ikke påvist behov i testet lokalt utvalg. Cookie-side, footerlenke, felles innhold/RAG og personvernkryssreferanse er implementert. Ingen banner er innført.
- [ ] Før delt pilot: kartlegg faktisk auth, drift/proxy/CDN, integrasjoner og eventuelt samtykkepliktig bruk på nytt (P2/P3/P9). Godkjenn formål, nødvendighet og varighet for nye oppføringer. Hvis samtykke kreves, planlegg separat implementering og test av før valg/avvisning/formålsvalg/godkjenning/tilbaketrekking.
- [x] Utføre målrettet lokal tilgjengelighetskontroll av cookie-siden og ny skill-detaljside med skill 0.5.1: nettleser, tastatur, tekstavstand og ny axe/Nu-regresjon. [Rapport](docs/tilgjengelighet/2026-11-10/133024-18e0f9e56386/testrapport.md). Ingen nye bekreftede åpne brudd; 15 U-krav består.
- [ ] Ta begge nye sider med i gjenstående skjermleser-/faktisk zoom-/enhets- og pilotkontroller (P8). Lokale delprøver er ikke produksjonsgodkjenning. Første delte miljø er fortsatt lukket.

### Målrettet kontrastoppfølging – 10. november 2026

- [x] Undersøke alle 86 axe-incomplete-forekomster i produksjonseksporten ved 1280/320 px og 22 kontroller med faktisk tastaturfokus. [Rapport og vurderinger](docs/tilgjengelighet/2026-11-10/135417-d3e318e119fd/testrapport.md). Ingen bekreftet feil i prøvde tilstander; ingen designretting nødvendig. Axe-originalene er bevart.
- [ ] Fullføre øvrige faktiske hover-/dynamiske tilstander/overlegg og PDF-kontrast under 1.4.3. De 15 U-kravene og P8 er fortsatt uavklart. Dette endrer ikke krav til lukket pilot eller produksjonsgodkjenning.

### Interaktive kontrasttilstander og PDF – 10. november 2026

- [x] Undersøkt faktiske hover-/valg-/valideringstilstander, kontrollert lasting/tjenestefeil og alle PDF-siders tekstkontrast. [Rapport](docs/tilgjengelighet/2026-11-10/145250-bd1373c8699b/testrapport.md). Ingen bekreftet nytt kontrastbrudd; ingen design-/PDF-retting nødvendig. Testadapter tilbakeført byte for byte.
- [x] Oppdatert 1.4.3 U → K i prøvd lokalt HTML/PDF-utvalg og avstemt erklæringens liste til 14 U-krav. Arbeidsstatus 23 K / 11 I / 14 U / 0 B, ikke samlet samsvar.
- [ ] Fullfør 1.4.11-vurdering av nødvendig grafisk informasjon/markeringer. De 27 målte kontroll-/ikon-/fokusdelene passerer, men full klassifisering gjenstår. Øvrig skjermleser-/zoom-/enhets-/pilotarbeid og P8 er fortsatt åpent.

### Fullført lokal 1.4.11-vurdering – 10. november 2026

- [x] Klassifisere nødvendige kontroll-/grafikkdeler, inkludert alle 157 PDF-primitiver og diagrammets supplerende ellipseomriss. [Rapport](docs/tilgjengelighet/2026-11-10/160352-a02d77cb2734/testrapport.md). Ingen PDF-retting nødvendig.
- [x] Rette A11Y-07: filtervalg skifter tekst/bakgrunn samtidig; 16 umiddelbare tastatur-/pekerretester ved 1280/320 bestod. Katalogens funksjonsbeskrivelse er oppdatert, Beta-status beholdt.
- [x] Oppdatere 1.4.11 U → K i lokalt utvalg og erklæringens liste til 13 U-krav. Arbeidsstatus 24 K / 11 I / 13 U / 0 B, ikke formelt samsvar.
- [ ] Fullføre øvrige 13 U-krav og faktisk hjelpemiddel-/zoom-/enhets-/pilotprøving. Kontrastavklaringen lukker ikke PDF-alternativer/semantikk/språk eller P8; første delte miljø skal fortsatt være lukket.

### Lokal oppfølging med skill 0.6.0 – 10. november 2026

- [x] Kartlagt faktisk testtilgang og fullført tilgjengelige tastatur-/fokus-/metadata-/klokkekontroller, med avslutningsvilkår og automatisk dokumentavstemming. Se [rapport](docs/tilgjengelighet/2026-11-10/193339-7e408d0c78ed/testrapport.md).
- [x] Avklart 2.4.3/2.4.7 i prøvd lokalt utvalg; dokumentert åtte uavklarte krav med konkret bistand. Samlet 26 K / 11 I / 8 U / 3 B.
- [x] Rettet og retestet A11Y-08 (PDF-språk, 3.1.1/3.1.2) og A11Y-09 (varsel om gamle prisdata, 2.2.2), 10. november 2026. Se [retest](docs/tilgjengelighet/2026-11-10/202101-029e79106a3d/testrapport.md). P8 krever fortsatt de øvrige kontrollene.
- [ ] Gjennomfør faktisk skjermleser/PDF-leser, 200/400 % zoom og fysisk rotasjon. Native appkontroll var blokkert i denne økten; viewport-/DOM-prøver er delgrunnlag.

P8 og samlet produksjonsgodkjenning er fortsatt åpne. Første delte miljø er fortsatt lukket pilot; ingen utrulling eller offentlig publisering er utført.

### Retest av PDF-språk og varsel om gamle prisdata – 10. november 2026

- [x] Korrigert norsk PDF-språk og eksplisitte språkspenn, bevart engelske alternativtekster og bekreftet identisk render på alle syv sider.
- [x] Fjernet automatisk timeoppdatering av aldersvarselet og retestet både sideåpning med gamle data og senere terskelpassering.
- [x] Oppdatert erklæring og testgrunnlag til 29 K / 11 I / 8 U / 0 B, med dokumentavstemming. [Rapport](docs/tilgjengelighet/2026-11-10/202101-029e79106a3d/testrapport.md).
- [ ] Fullfør de åtte uavklarte kravene med egnet hjelpemiddel-/zoom-/enhetstilgang. Samlet samsvar, P8 og produksjonsgodkjenning er fortsatt ikke fullført; første delte miljø er lukket pilot.
