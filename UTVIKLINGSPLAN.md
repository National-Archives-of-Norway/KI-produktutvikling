# Utviklingsplan for KI-Produktutvikling

Sist oppdatert: **10. november 2026**. Utførende agent ved denne gjennomgangen: **Codex (OpenAI)**.

**Status: Fungerende lokal prototype; ikke klar for produksjon eller deling av internt innhold.** Lokal funksjonalitet og modelladaptere er implementert. Drift, innlogging, faglig godkjenning og samlet lanseringskontroll gjenstår. Første delte miljø skal være en **lukket pilot**. Offentlig publisering vurderes senere, etter en egen beslutning.

Gjennomgangen bygger på kode, dokumentasjon og lokal Git-base `89b2bd5` med senere ucommittede endringer, supplert med arbeidet med personvernskillen og portalens erklæringsutkast, prisside og Oversikt. Siste samlede dokumenterte kjøring har **53 beståtte Node-tester, tre Python-tester og produksjonsbygg**, samt avgrensede nettleserkontroller. Dette er ikke dokumentasjon på produksjonsdrift, godkjent innhold, full tilgjengelighet eller vellykkede kall mot en faktisk modellleverandør. Se versjonsloggen for kontrollomfanget i hver arbeidsøkt; publisering av en planside er ikke produksjonsgodkjenning.

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

| Område                           | Implementert og dokumentert                                                                                                                                               | Begrensning som fortsatt gjelder                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Forside og navigasjon            | Lær/Prøv/Del, anbefalt oppgave «Utforsk et brukerbehov» fra ressursdata, menyen Kom i gang → Retningslinjer → Ressurskatalog → Oversikt → Spør KI → Om                    | Begrenset intern brukertesting gjenstår                                                                          |
| Innhold og KI-prat               | Felles innholdsfiler for Kom i gang, Om og Retningslinjer, tydelig retningslinjelenke, KI-prat med deltakelsesinvitasjon og mandatforslag som vedlegg                     | Retningslinjer og mandat er utkast; eiere og godkjenning gjenstår                                                |
| Ressurser og Skills              | Seks katalogressurser, separat lokalt Skills-repo, tilgjengelighetsskill 0.5.1 og personvernskill 0.1.0 med kartleggings-/rapportflyt og generell installasjonsveiledning | Skills er Beta og ikke menneskelig gjennomgått; ingen distribusjon fra portalen eller GitHub er etablert         |
| Spør KI                          | Kildebasert veiledning, konkrete steg, kilder, nye spørsmål, forbedret presentasjon av modellsvar og serveradapter for eksternt API                                       | Ingen faktisk modellgenerering er verifisert; hvert spørsmål behandles separat                                   |
| Kontinuerlig innholdsoppdatering | Sider og RAG deler innhold; lokal RAG lastes om ved innholdsendringer; isolert synkroniseringstest finnes                                                                 | I produksjon må Next.js og RAG utrulles fra samme revisjon; gamle chatsvar er historikk                          |
| Oversikter                       | Nettstedskart, versjonsloggside og funksjonalitetsoversikt med bunntekstlenker; byggkontroll for manglende/ukjente sider                                                  | Funksjonenes mening og modenhet må vedlikeholdes i registeret                                                    |
| Tilgjengelighet                  | Avgrensede kontroller, rettinger, WCAG-matrise, lokalt erklæringsutkast og daterte testresultater under `docs/tilgjengelighet/`                                           | De tre kjente avvikene er lokalt rettet; øvrige manuelle kontroller og formell godkjenning/registrering gjenstår |
| Teknisk kvalitet                 | Moduldeling, lokale tester, TypeScript, formatering, produksjonsbygg og test av at en falsk modellnøkkel ikke følger med klientfiler                                      | CI, driftssikkerhet og kontroll i det faktiske utrullingsmiljøet gjenstår                                        |

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

| Fase | Leveranse                                            | Status 10. november 2026                                                            |
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

Arbeidsgrunnlaget for P8 er konkretisert i [avklaringsplanen for de 15 uavklarte kravene](docs/tilgjengelighet/WCAG-KONTROLL.md#avklaringsplan-for-de-15-kravene), oppdatert 10. november 2026. Den angir tester/kompetanse, utstyr, lokale og pilotavhengige kontroller samt dokumentasjon per krav. Planen er ikke en ny test eller en fullført leveranse. Ansvarlig tester og godkjenner må utpekes.

- [x] Integrere `@digitalarkivet/mui-theme` og eget tema uten privat GitHub-tilgang.
- [x] Implementere valgt arklogo/favicon, futuristisk forside, navigasjon, bunntekst, katalog, artikkeloppsett og chat.
- [x] Legge til rolige bevegelser i illustrasjonens punkter og ytre ring, med klikk på selve illustrasjonen for pause/start, tastaturbetjening og statisk visning ved redusert bevegelse.
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
- [x] Utvide skillen til 0.4.0 med konkrete prosedyrer for alle 48 nettkrav og automatisk opprettet, uutfylt testplan. Dette er utvidelse av testverktøyet, ikke gjennomføring av portalens gjenstående tilgjengelighetskontroller.
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

## Lokale testmotorer – 10. november 2026

- [x] Installere låst axe CLI, Nu Html Checker og kompatibel ChromeDriver som utviklingsavhengigheter, med lokal Java-runtime. Ingen ekstern skanntjeneste eller global Java-konfigurasjon.
- [x] Kjøre begge motorene på eksporten: axe på 20 registrerte sider og feilside, vnu på eksportfilene. Originalresultater og tekniske feil bevares. Faktisk negativ verktøytest bekrefter at begge motorene finner manglende alt i en separat testside. Kjøring `090555-native-d984a7c5` og vurdert grunnlag `090740-ca8d9c80ecb6`: 0 axe-violations / 0 HTML-feil, men tre kontrastgrupper (80 forekomster) og tekniske noter er vurdert videre. Arbeidsstatus 21 K / 11 I / 16 U / 0 B; ikke samlet godkjenning.
- [ ] Vurdere de gjenstående kontrastforholdene manuelt og fullføre øvrige hjelpemiddel-/zoom-/produksjonskontroller. Skannene er ingen samlet P8-godkjenning. Første delte miljø er fortsatt lukket pilot.

## Retting av tre tilgjengelighetsavvik – 10. november 2026

- [x] Rette og målrettet reteste A11Y-04–06: PDF-listestruktur, PDF-tekstkontrast og språk/tittel på 404-siden. Ny kjøring: `docs/tilgjengelighet/2026-11-10/080757-ffaeb036427a/`. PDF har tre lister/12 punkter, 229 bevarte MCID-koblinger og 6,28:1 tekstkontrast på side 5. Norsk 404 og én tittel er kontrollert i nettleser/eksport.
- [x] Oppdatere rapporter, restliste, kort erklæring, funksjonsregister og vedleggsstørrelse. Ingen bekreftede åpne avvik i undersøkt utvalg; samlet samsvar er fortsatt uavklart (20 K / 11 I / 17 U / 0 B).
- [ ] Fullføre den brede manuelle restlisten og teste faktisk publisert fallback. Axe/vnu er nå installert og kjørt, se nyere resultater. Rettede lokale avvik fullfører ikke P8 eller produksjonsgodkjenningen.

## Tilgjengelighetskjøring – 10. november 2026

- [x] Kjøre skill 0.5.0 på alle 20 registrerte sider med automatiske HTML/PDF-/nettleserdeler og tre deklarerte forløp. Rapport og kravvis manuell restliste ligger i `docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd/`. Tidligere kjøringer er bevart.
- [x] Oppdatere testplan, vurdert matrise, kort erklæring og lokal side. Tre åpne avvik og fortsatt uavklart samlet samsvar; 31 krav med automatisk deldekning er ikke 31 oppfylte krav.
- [x] Rettet og lokalt retestet 10. november i `080757-ffaeb036427a`; tidligere oppgave A11Y-06: engelsk 404-melding uten riktig språkmerking. Vurdere også sidetittelen og faktisk publisert 404-fallback. De to PDF-avvikene nedenfor er også rettet i den nye retesten; produksjonsfallback gjenstår.
- [ ] Fullføre de 37 gjenstående vurderings-/rettings-/retestpunktene i den manuelle restlisten, særlig faktisk skjermleser, 200/400 % forstørring, enhetsinnstillinger, resterende kontrast, tekstavstand og PDF-semantikk. 11 krav er uten utløsende innholdstype i lokalt omfang og må vurderes på nytt ved endring.
- [x] Gjort lokal axe/full HTML-validator tilgjengelig og kjørt skann 10. november; se nyere motorresultater. Ingen ekstern opplasting er utført. P8 er fortsatt åpent.

## Tilgjengelighetsretest – 9. november 2026

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
