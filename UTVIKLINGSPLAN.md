# Utviklingsplan for KI-Produktutvikling

Sist oppdatert: **9. november 2026**. Utførende agent ved denne gjennomgangen: **Codex (OpenAI)**.

**Status: Fungerende lokal prototype; ikke klar for produksjon eller deling av internt innhold.** Lokal funksjonalitet og modelladaptere er implementert. Drift, innlogging, faglig godkjenning og samlet lanseringskontroll gjenstår. Første delte miljø skal være en **lukket pilot**. Offentlig publisering vurderes senere, etter en egen beslutning.

Gjennomgangen bygger på kode, dokumentasjon og lokal Git-historikk til og med `56d6886`, supplert med arbeidet med personvernskillen og portalens erklæringsutkast, prisside og Oversikt. Siste samlede dokumenterte kjøring har **45 beståtte tester og produksjonsbygg**, samt avgrensede nettleserkontroller. Dette er ikke dokumentasjon på produksjonsdrift, godkjent innhold, full tilgjengelighet eller vellykkede kall mot en faktisk modellleverandør. Se versjonsloggen for kontrollomfanget i hver arbeidsøkt; publisering av en planside er ikke produksjonsgodkjenning.

## Slik brukes og vedlikeholdes planen

Denne filen er den gjeldende utviklingsplanen. Faseoversikten og produksjonskravene nedenfor viser dagens status. Avsnittet med historikk bevarer tidligere vurderinger; eldre testantall, oppgaver og prioriteringer der beskriver den aktuelle datoen, ikke dagens løsning.

- Les relevante faser før vesentlig arbeid. Oppdater fremdrift, gjenstående arbeid, avhengigheter og dato i samme arbeidsøkt som endringen, før ferdigmelding eller commit.
- Kryss av bare arbeid som er utført og verifisert. Skill mellom «implementert lokalt», «testet med simulert tjeneste», «verifisert i delt miljø» og «godkjent for produksjon».
- Oppdater både planen og [versjonsloggen](VERSJONSLOGG.md) ved endringer i omfang, leveranser, prioriteringer eller produksjonskrav. Funksjonsbeskrivelser vedlikeholdes i `src/content/features.ts`.
- Oppgi faktisk kontrollgrunnlag, kjente begrensninger og commit/issue når de finnes. Navngitt eier eller frist skal ikke oppfinnes; bruk «ikke avklart» og oppgi hvilken rolle som må avklares.
- Før en utrulling gjennomgås alle aktuelle krav i tabellen nedenfor, også når bygg og tester består. Et grønt bygg betyr ikke at alle lanseringskrav er oppfylt.

Reglene er også lagt i `AGENTS.md`, og gjelder fremtidig agentarbeid i prosjektet. Planen er ikke en automatisk tolkning av kode eller en periodisk jobb: meningen med endringer og godkjenninger må fortsatt vurderes av personen eller agenten som utfører arbeidet. Generell CI og en fast gjennomgang i forbindelse med pull requests er ennå ikke etablert. En egen daglig prisjobb er klargjort lokalt, men ikke aktivert på GitHub.

## Mål og rammer

- **Målgruppe:** De som jobber med produktutvikling eller utvikling av løsninger i Nasjonalarkivet. Portalen skal gjøre det enklere å lære, prøve og dele nyttige arbeidsmåter med KI.
- **Omfang nå:** Oppstartsveiledning, retningslinjeutkast, ressurskatalog, Spør KI, informasjon om teamet og KI-prat, tilgjengelighetsgrunnlag, versjonslogg og funksjonalitetsoversikt. Nyheter og egne agenter er mulige senere tillegg, ikke et krav til første pilot.
- **Teknologi:** Next.js, TypeScript, MUI og `@digitalarkivet/mui-theme`, med portalens eget futuristiske komponent-/designlag. Publisert npm-pakke brukes uten tilgang til designbibliotekets private GitHub-repo.
- **Utvikling og versjonering:** Lokal utvikling og Git er etablert. Portalrepoet har ingen GitHub-remote. Eget organisasjonsrepo, CI og utrulling må avklares og opprettes separat.
- **Drift:** Driftsplattform, domene og ansvar er ikke valgt. Dagens løsning starter Next.js og RAG på lokal loopback. Pages finnes som statisk byggvariant, ikke som besluttet miljø for lukket pilot eller modellgenerering.
- **Tilgang:** Brukerne skal i første delte miljø avgrenses til godkjente GitHub-brukere hos virksomheten. Organisasjon/team, nødvendige abonnementsegenskaper og konkret tilgangsløsning er ikke endelig avklart. Innlogging og autorisering er ikke implementert.
- **GitHub-rettigheter:** Portalen skal ikke ha skrivetilgang til andre koderepoer. En eventuell medlemskontroll skal få et avgrenset formål og minimale nødvendige rettigheter.
- **Innhold:** Felles innholdsdata brukes av sider, katalog, anbefalinger og RAG. Dette sikrer teknisk samsvar, men innebærer ikke faglig godkjenning. Internt materiale skal ikke legges i klientdata, `public/`, offentlige bygg eller dagens RAG-korpus.
- **Modell:** Lokal Ollama og eksternt OpenAI-kompatibelt Chat Completions-API er støttet i kode. Leverandør, modell og virkelig API-tilkobling er ikke konfigurert/verifisert. API-nøkkelen skal bare være en serverhemmelighet.

## Levert siden forrige planoppdatering

| Område                           | Implementert og dokumentert                                                                                                                                              | Begrensning som fortsatt gjelder                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Forside og navigasjon            | Lær/Prøv/Del, anbefalt oppgave «Utforsk et brukerbehov» fra ressursdata, menyen Kom i gang → Retningslinjer → Ressurskatalog → Oversikt → Spør KI → Om                   | Begrenset intern brukertesting gjenstår                                                                                        |
| Innhold og KI-prat               | Felles innholdsfiler for Kom i gang, Om og Retningslinjer, tydelig retningslinjelenke, KI-prat med deltakelsesinvitasjon og mandatforslag som vedlegg                    | Retningslinjer og mandat er utkast; eiere og godkjenning gjenstår                                                              |
| Ressurser og Skills              | Fem katalogressurser, separat lokalt Skills-repo, tilgjengelighetsskill 0.3.0 og personvernskill 0.1.0 med kartleggings-/rapportflyt og generell installasjonsveiledning | Skills er Beta og ikke menneskelig gjennomgått; ingen distribusjon fra portalen eller GitHub er etablert                       |
| Spør KI                          | Kildebasert veiledning, konkrete steg, kilder, nye spørsmål, forbedret presentasjon av modellsvar og serveradapter for eksternt API                                      | Ingen faktisk modellgenerering er verifisert; hvert spørsmål behandles separat                                                 |
| Kontinuerlig innholdsoppdatering | Sider og RAG deler innhold; lokal RAG lastes om ved innholdsendringer; isolert synkroniseringstest finnes                                                                | I produksjon må Next.js og RAG utrulles fra samme revisjon; gamle chatsvar er historikk                                        |
| Oversikter                       | Nettstedskart, versjonsloggside og funksjonalitetsoversikt med bunntekstlenker; byggkontroll for manglende/ukjente sider                                                 | Funksjonenes mening og modenhet må vedlikeholdes i registeret                                                                  |
| Tilgjengelighet                  | Avgrensede kontroller, rettinger, WCAG-matrise, lokalt erklæringsutkast og daterte testresultater under `docs/tilgjengelighet/`                                          | Flere manuelle kontroller og formell godkjenning/registrering gjenstår; nyere sider og chatendringer må inngå i neste kontroll |
| Teknisk kvalitet                 | Moduldeling, lokale tester, TypeScript, formatering, produksjonsbygg og test av at en falsk modellnøkkel ikke følger med klientfiler                                     | CI, driftssikkerhet og kontroll i det faktiske utrullingsmiljøet gjenstår                                                      |

Referanser: Portalcommitene `797cd7b`, `9f27564` og `e93e5f9`, samt [versjonsloggen](VERSJONSLOGG.md). Skills-repoets siste lokale commit er `cf8f6d5`; repoene har separate logger og historikk.

## Hva gjenstår før produksjonssetting?

Ingen av kravene nedenfor er ferdig godkjent. Alle eiere er foreløpig **ikke avklart**; rolleangivelsene viser hvem som må utpekes. «Lukket pilot» betyr også et delt miljø og krever beskyttelse før tilgang gis.

| ID  | Prioritet / tidspunkt        | Gjenstående leveranse og ferdigkriterium                                                                                                                                                                                                                                                   | Rolle som må avklares                                |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| P1  | Før delt pilot               | Beslutte driftsplattform, domene, tilgangsløsning, målgruppe og ansvar. Første miljø skal være lukket; offentlig utrulling skal ikke skje som standard.                                                                                                                                    | Prosjekteier og plattform/drift                      |
| P2  | Før delt pilot               | Implementere og verifisere innlogging og autorisering. Avvis brukere uten tilgang også på direkte sideadresser, vedlegg og `/api/rag`. Test utlogging, utløpt/fjernet medlemskap og feil i identitetskontrollen.                                                                           | Teknisk ansvarlig og identitetsforvaltning           |
| P3  | Før delt pilot               | Etablere drift for Next.js og RAG med HTTPS, intern ruting og prosessovervåking. Erstatte lokale forutsetninger: RAGs Origin-kontroll tillater bare localhost i dag, og Next.js peker på loopback. Test fra faktisk nettadresse med korrekte tillatte origins og interne tjenesteadresser. | Plattform/drift                                      |
| P4  | Før delt pilot               | Etablere eget organisasjonsrepo, PR-/review-regler og CI som kjører relevante tester, format, typer og bygg. `pnpm check` kjører ikke testpakken i dag; testkommandoene må tas med uttrykkelig. Gi utrullingen minimale rettigheter og bruk server-secrets.                                | Teknisk ansvarlig og repoansvarlig                   |
| P5  | Før pilot med genererte svar | Velge godkjent leverandør/modell, avklare databehandling og konfigurere URL/modell/nøkkel. Test faktiske svar, kildestøtte, manglende treff, timeout og leverandørfeil. Hvis dette utsettes, må piloten uttrykkelig lanseres som kildebasert veiledning uten modellgenerering.             | Produkteier, modellansvarlig og personvern/sikkerhet |
| P6  | Før delt pilot               | Innføre tilgangs- og misbruksvern for API-et, rate-/kostnadsgrenser og avklart kapasitet. Dagens enkeltkallslås er ikke ratebegrensning. Bekreft at nøkkel og rå leverandørfeil ikke eksponeres i det utrullede miljøet.                                                                   | Teknisk ansvarlig og drift                           |
| P7  | Før pilotinnhold tas i bruk  | Godkjenne første innhold, vedlegg og profilressurser, og utpeke innholdsansvarlige. Behold utkast-/Beta-merking til faktisk gjennomgang er gjort. Suisse-filer skal bare brukes hvis rettighetene er avklart; reserveskrift kan beholdes.                                                  | Fag-/innholdseier og profilansvarlig                 |
| P8  | Før produksjonsgodkjenning   | Fullføre skjermleser, faktisk tekstforstørring/zoom, kontrast-/fokustilstander og relevante nettlesere på dagens sider og chat. Oppdatere testgrunnlag/erklæring, avklare godkjenner og endelig URL og ferdigstille formell erklæring etter virksomhetens prosess.                         | Tilgjengelighetsansvarlig og godkjenner              |
| P9  | Før produksjonsgodkjenning   | Verifisere overvåking, feilhåndtering, logg-/lagringsrutiner, hendelsesansvar og tilbakeføring i faktisk miljø. Gjennomføre sikkerhets-/avhengighetskontroll og kontrollere personverninformasjon mot reell databehandling.                                                                | Drift, sikkerhet og personvern                       |
| P10 | Før bredere lansering        | Gjennomføre lukket brukertest, rette prioriterte funn og godkjenne leveransen. Offentlig publisering krever en separat vurdering av innhold, tilgangsskille, drift og lanseringskrav.                                                                                                      | Prosjekteier med fag- og driftsansvarlige            |

Tilgjengelighetsgrunnlag og konkrete uavklarte punkter finnes i [WCAG-kontrollen](docs/tilgjengelighet/WCAG-KONTROLL.md) og [erklæringsutkastet](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md). Disse dokumentene skal oppdateres fra nye resultater; denne planoppdateringen er ikke en ny tilgjengelighetsrevisjon.

## Faseoversikt

| Fase | Leveranse                                            | Status 9. november 2026                                                             |
| ---- | ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1    | Omfang, ansvar og tilgangsvalg                       | Målgruppe og første funksjoner avklart; eierskap, drift og tilgangsmodell åpne      |
| 2    | Teknisk grunnmur og arbeidsflyt                      | Lokal implementering klar; GitHub-repo, CI og review-regler gjenstår                |
| 3    | Design og tilgjengelighet                            | Design og avgrensede kontroller utført; samlet tilgjengelighetsgodkjenning gjenstår |
| 4    | MVP 1: lokal portal og forberedelse til lukket pilot | Lokal leveranse klar; ikke delt eller brukertestet som pilot                        |
| 5    | Servermiljø, modellkobling og utrulling              | Adaptere klargjort; driftsmiljø og faktisk modelltilkobling ikke etablert           |
| 6    | MVP 2: innlogging og beskyttet tilgang               | Ikke implementert; nødvendig før første delte pilot                                 |
| 7    | MVP 3: versjonerte skills og distribusjon            | Lokalt bibliotek og katalogintegrasjon på plass; review og distribusjon gjenstår    |
| 8    | MVP 4: forvaltning og produksjonsgodkjenning         | Ikke godkjent; produksjonskrav P1–P10 følges opp                                    |

Fase 5 og 6 må samordnes før MVP 1 deles. Fase 7 kan utvikles parallelt, men full automatisk skill-installasjon er ikke et krav til første pilot med lesbart innhold. Pages beholdes foreløpig som bygg-/demovariant; det er ikke en beslutning om offentlig hosting.

## Fase 1 – Avklaringer og prosjektgrunnlag

- [x] Definere målgruppe og portalens praktiske formål.
- [x] Velge første innholdsområder og eget futuristisk design basert på publisert MUI-tema.
- [x] Beslutte at første delte miljø skal være lukket, og at offentlig publisering utsettes.
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
- [x] Etablere funksjonsregister med automatisk avledet oversikt og nettstedskart, og kontroll av sideregistrering ved oppstart/bygg.
- [x] Etablere versjonslogg og agentinstruksjoner for vedlikehold av logg og funksjonsregister; denne økten utvider regelen til utviklingsplanen.
- [ ] Opprette/tilknytte organisasjonsrepo og avtale branch-/PR-/review-regler.
- [ ] Etablere CI med tester, formatering, typekontroll, relevante bygg og kontroll av offentlige artefakter. Vurdere linting som tillegg.
- [ ] Etablere rutiner for avhengigheter, serverhemmeligheter, nøkkelrotasjon og minste privilegium for CI/utrulling.

**Ferdig når:** P4 er verifisert gjennom en faktisk pull request og kontrollert utrulling. Lokale kontroller alene lukker ikke fasen.

## Fase 3 – Design, komponenter og tilgjengelighet

- [x] Integrere `@digitalarkivet/mui-theme` og eget tema uten privat GitHub-tilgang.
- [x] Implementere valgt arklogo/favicon, futuristisk forside, navigasjon, bunntekst, katalog, artikkeloppsett og chat.
- [x] Tilpasse grunnleggende responsivitet, fokus, kontrast og redusert bevegelse, og utføre avgrensede kontroller med dokumenterte rettinger.
- [x] Opprette WCAG-matrise, testhistorikk og lokalt erklæringsgrunnlag med bekreftet kontaktadresse.
- [ ] Gjennomføre resterende manuelle kontroller, inkludert dagens nye sider, innhold og chatvisning.
- [ ] Prøve innlogging og tilgangsfeil med tastatur, hjelpemidler og mobil når funksjonene finnes.
- [ ] Ferdigstille tilgjengelighetsvurdering og erklæring med navngitt godkjenner og faktisk nettadresse.

**Ferdig når:** P8 er dokumentert for den aktuelle leveransen. Tidligere delkontroller er ikke full samsvarsgodkjenning.

## Fase 4 – MVP 1: lokal portal og lukket pilot

- [x] Implementere forside med katalog, Lær/Prøv/Del og anbefalt ressurs fra felles innhold.
- [x] Implementere oppstartsveiledning med retningslinjelenke, retningslinjeutkast og Om med KI-prat og mandatvedlegg.
- [x] Implementere søk/filter, ressursdetaljer, Beta-/eksempelmerking og generell bruksveiledning.
- [x] Implementere Spør KI med kildebasert veiledning og forberedt modellgenerering.
- [x] Implementere nettstedskart, tilgjengelighetsside, versjonslogg og funksjonalitetsoversikt.
- [ ] Faglig gjennomgå og godkjenne representativt pilotinnhold, inkludert skill-beskrivelse og PDF.
- [ ] Dele via lukket testmiljø først når tilgang, drift og aktuelle krav P1–P9 er håndtert for pilotens omfang.
- [ ] Gjennomføre oppgavebasert brukertest og prioritere forbedringer.

**Ferdig når:** En avgrenset, autorisert brukergruppe kan finne en veiledning og en ressurs, få forståelig hjelp og melde problemer. Lokal funksjonalitet er klar, men pilotleveransen er ikke fullført.

**Avgrensning:** Ingen offentlig publisering nå. Statisk Pages-eksport skal fortsatt bare inneholde offentlig beskrivende data; den er ikke i seg selv et beskyttet miljø eller en modellserver.

## Fase 5 – Servermiljø, modellkobling og utrulling

- [x] Implementere separat RAG-HTTP-tjeneste og serverkonfigurasjon med valgene `none`, `ollama` og `openai-compatible`.
- [x] Implementere ekstern adapter med HTTPS, serverlagret Bearer-nøkkel, timeout, avvist videresending og nøytrale feilmeldinger.
- [x] Teste adaptere og HTTP-kontrakt med simulert transport, inkludert feil, manglende innstillinger og at hemmeligheter ikke returneres.
- [ ] Etablere drift av Next.js og RAG og intern ruting som passer den valgte plattformen.
- [ ] Gjøre produksjonsorigins og intern RAG-adresse konfigurerbare; verifisere endepunktet fra faktisk HTTPS-adresse.
- [ ] Velge modell/leverandør og avklare databehandling, før virkelige server-secrets legges inn.
- [ ] Teste reell generering med representative spørsmål, kildestøtte og utilstrekkelig grunnlag, samt feil, treghet og kostnads-/kapasitetsgrenser.
- [ ] Etablere ratebegrensning, logger uten hemmeligheter, helsesjekker, alarmer og en dokumentert tilbakeføringsprøve.
- [ ] Bygge og utrulle nettside og RAG fra samme revisjon med kontroll av innhold og hemmeligheter i artefaktene.

**Ferdig når:** P3, P5 (eller eksplisitt avgrensning til veiledning uten modell), P6 og relevante deler av P9 er testet i det delte miljøet. Pages alene leverer ikke disse serverfunksjonene.

## Fase 6 – MVP 2: innlogging og beskyttet tilgang

- [ ] Velge identitets-/tilgangsløsning og avgrenset GitHub-medlemskontroll uten skriverettigheter til andre repoer.
- [ ] Implementere innlogging, sikre sesjoner og utlogging, og kontrollere tilgang på serveren.
- [ ] Beskytte hele pilotmiljøet etter avtalt målgruppe, inkludert `/api/rag` og vedlegg; beskytte det senere interne området før internt innhold legges til.
- [ ] Definere ny medlemskontroll, fjernet tilgang, utløp og oppførsel når identitetstjenesten feiler.
- [ ] Teste direkte lenker, ressursnedlasting, manglende/fjernet medlemskap, utløpte sesjoner og uautorisert API-bruk.
- [ ] Før private kilder innføres: etablere tilgangsfiltrert henting, søk og mellomlagring, og kontrollere at private data ikke følger med offentlig bygg.

**Ferdig når:** P2 er verifisert og uautoriserte brukere ikke kan hente beskyttet innhold eller bruke beskyttede API-er. Dette er en forutsetning for første deling, ikke en oppgave som utsettes til etter piloten.

## Fase 7 – MVP 3: skills og distribusjon

- [x] Opprette separat lokalt Skills-repo med struktur for flere skills og egen versjonslogg.
- [x] Utvide tilgjengelighetsskillen til testing, rettingsforslag og erklæringsutforming, med daterte resultater i målprosjektet.
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
- [ ] Oppdatere MCP-status etter bekreftede vurderinger og beslutninger, med godkjent bruksomfang når dette foreligger. ROS-arbeidet er ikke gjennomført av portalen.

- [x] Legge til Godkjente KI-assistenter under Oversikt, med Copilot, Claude AI og Codex som godkjent etter brukerens opplysning 9. november 2026. Siden og Spør KI deler innhold; retningslinjene viser til listen.
- [ ] Supplere assistentoversikten med bekreftede konto-/lisensrammer, modeller, integrasjoner og tillatte datakategorier. Assistentgodkjenningen er ikke en avklaring av disse forholdene eller portalens produksjonskrav.

- [x] Opprette `/oversikt/` som inngang med priser og abonnement som første del. Hovedmeny og bunntekst er oppdatert; `/priser/` beholder adressen og har brødsmulesti til Oversikt.
- [x] Dele beskrivelsene mellom siden, funksjonsregisteret og Spør KI. Modelloversikt og forbruk er merket planlagt, uten falske data eller døde lenker. Alle 45 tester og produksjonsbygg bestod.
- [ ] Utvide med modelloversikt når egenskaper, kilder og innholdsansvar er avklart.
- [ ] Utvide med faktisk forbruk først etter avklart datatilgang, personvern, autorisering og kilde. Ingen innhenting av bruksdata er implementert.

## Prisoversikt – levert lokalt 9. november 2026

- [x] Opprette `/priser/` med abonnement for Copilot/Claude/Codex, separate direkte API-tabeller og Copilot-tokenpriser, offisielle kilder og kontrolltidspunkt. Registrert som Beta, med lenke i bunnteksten.
- [x] Hente og formatkontrollere alle seks kilder; samme snapshot brukes av siden og Spør KI. HTTP-/parsefeil bevarer forrige vellykkede data og gir synlig feilstatus ved neste bygg. Prisutvalget er eksplisitt og omfatter ikke alle planer/modeller.
- [x] Lage lokale parser-/feilhåndteringstester, foreldelsesvarsel og daglig GitHub-arbeidsflyt som foreslår prisdata og versjonslogg i PR. Alle 45 tester og lokalt produksjonsbygg bestod.
- [ ] P4: Legge repoet på GitHub, tillate nødvendige Actions-/PR-rettigheter og prøve planlagt/manuell jobb. Bare samme repo får skriverettigheter; ingen andre repoer eller modellnøkler brukes.
- [ ] Koble sammenslått prisgrunnlag til faktisk utrulling av både nettside og RAG, og teste feilkilder/varsling i det delte miljøet. Automatisk produksjonsoppdatering er ikke aktiv. Avklare hvem som gjennomgår åpne pris-PR-er og vedlikeholder utvalget; aktiveringsstatus på siden skal oppdateres først etter verifisering.

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

1. **Avklar P1:** Velg ansvarlige, driftsmiljø og metode for lukket tilgang. Dette styrer videre implementering.
2. **Gjennomfør P2–P4 og P6:** Implementer tilgang, produksjonsruting, CI og API-vern i det valgte miljøet.
3. **Velg om modellgenerering skal være med i piloten:** Gjennomfør P5 eller avtal at piloten bare gir kildebasert veiledning.
4. **Arbeid parallelt med P7–P8:** Gjennomgå innhold/skill og fullfør tilgjengelighetskontrollen; ikke vent til lanseringsdagen.
5. **Verifiser P9–P10:** Prøv drift/tilbakeføring og gjennomfør lukket brukertest før produksjonsgodkjenning.

## Beslutninger og avklaringer

| Tema                   | Gjeldende retning                                                     | Gjenstående beslutning                                                     |
| ---------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Publiseringsrekkefølge | Lokal utvikling → lukket pilot → eventuell offentlig portal           | Hvem kan få pilottilgang og hvordan den beskyttes                          |
| GitHub                 | Lokale repoer for portal og Skills; ingen remote i portalrepoet       | Organisasjonsrepo, abonnement/oppsett, PR-regler og utrullingsrettigheter  |
| Innhold                | Praktisk nytte, felles kilder og tydelig Beta-/utkaststatus           | Navngitte eiere og faglig godkjenning                                      |
| Modeller               | Lokal eller ekstern adapter; nøkkel kun på server                     | Godkjent leverandør/modell, databehandling og om generering inngår i pilot |
| Drift                  | Next.js og RAG må driftes og utrulles samlet fra samme revisjon       | Plattform, domene, intern ruting, overvåking og driftsansvar               |
| Pages                  | Statisk demo-/byggvariant beholdes lokalt                             | Om den får en senere rolle; offentlig demo er ikke prioritert nå           |
| Forvaltning            | Plan, versjonslogg og funksjonsregister oppdateres i samme arbeidsøkt | Roller, PR-prosess og faste gjennomganger når samarbeid etableres          |

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
