# Versjonslogg

Endringer i KI-Produktutvikling føres her, med dato, utførende agent, kontrollresultat og Git-referanse. Nyeste endringer står først. Loggen beskriver prosjektversjoner; en oppføring betyr ikke at nettstedet er publisert.

«Agent» betyr kodeassistenten som utførte arbeidet. Git-forfatteren registreres separat av Git og kan være personen som oppretter commiten. Eksakt modellvariant er ikke registrert for tidligere arbeid og oppgis derfor ikke. Ingen underagenter ble brukt til kvalitetskontrollen eller opprettelsen av denne loggen.

## Ikke utgitt

### 17. november 2026 – Copilot-søk og avgrenset modellkontekst

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet feil kildevalg for spørsmål om Copilot-genererte tester med regresjonstest før retting. Kontrollere/kontroller er nå generelle lavvektede handlinger på linje med teste og skrive; ingen kilde-ID eller spørsmålsunntak er lagt i søket. Fem Copilot-spørsmål og et samlet kontekstbudsjett er regresjonstestet.
- Modelloggen fra første prøve viser tre avbrudd under lesing av 3649–5872 inputtokens og en intern completion-EOF etter 10 s. Kort EOF-feil ble ikke reprodusert i dagens uendrede adapterprøve (riktig svar etter 18,8 s). OOMKilled var allerede true før dagens prøver; dette beviser ikke årsaken. Ingen automatisk retry eller økt tidsgrense er innført.
- Felles modellmeldinger bruker nå maksimalt 6000 tegn kildeutdrag med relevante hele linjer/setninger, bevarte forbehold, nummerering og merking av utelatelser. Fulle API-kilder beholdes. Arkitektur og funksjonsregister er oppdatert. Retest mot nybygd Docker-portal: alle fem spørsmål ga HTTP 200/generated, riktige første kilder og innholdsmessig riktige svar med [1] på 2,9–29,8 s. Svaret om tester har en språklig feil som er bevart i [rapporten](docs/rag/2026-11-16/copilot-retningslinjer.md). 289/289 Node-/tre Python-tester, innholdssynk, 236 filmål ved sluttkontroll, typekontroll, formatering og Docker-produksjonsbygg bestod. Utviklingssett 36/36 og kjent held-out 20/20 uten endrede forventninger. Modellcontainer/starttid, modellmanifest og volum er bevart; oom_kill var 2 før/etter. Utviklingsplanen skiller rettet søk/stor kontekst fra fortsatt uavklart intern EOF. Rapport-/sluttnotater er skrevet etter bildet. Ingen blindmåling, commit eller push.

### 16. november 2026 – Copilot-prøver avdekker modellfeil og ett søkeavvik

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Kjørte fem faktiske Qwen3:4b-prøver gjennom /api/rag på 3005 mot de nye, fortsatt ukommiterte Copilot-retningslinjene. Bare sensitive-testdata-spørsmålet ga generert svar (HTTP 200, riktig svar med [1], 13,39 s). Sikkerhetskritisk kode, genererte tester og Next.js-versjon ga HTTP 502 etter ca. 60 s; hurtigtastspørsmålet ga 502 etter ca. 10 s. Kilder er bevart. Samlet prøve er ikke bestått; fire manglende besvarelser er ikke regnet som riktige modellsvar.
- Copilot-siden var første kilde for fire av fem spørsmål. «Må jeg kontrollere tester som Copilot lager?» hentet Oversikt/priser/funksjonalitet og manglet Copilot-kilden. Ingen innhold-/modell-/søkejustering eller retest er gjort for å skjule funnene. [Rapport med alle prøver og kildehashverdier](docs/rag/2026-11-16/copilot-retningslinjer.md) skiller kildevalg, HTTP-resultat og innholdsvurdering.
- Portal og Ollama var running/healthy med null omstarter etter prøvene. Ollama rapporterte OOMKilled=true uten førmåling; sammenheng med disse feilene er ikke bevist. Utviklingsplanen har åpne oppfølgingspunkter for kildesøk og modellfeil. Kontroller: `pnpm test:links` bestått (235 filmål i 12 dokumenter), `pnpm format:check` og `git diff --check` bestått. Ingen ny full testpakke, konfigurasjons-/volumendring, ombygging, commit eller push.

### 16. november 2026 – retningslinjer for GitHub Copilot

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Lagt brukerens oppgitte Copilot-retningslinjer på egen underside /retningslinjer/github-copilot/, lenket fra Retningslinjer og Godkjente KI-assistenter. Innholdet dekker sikkerhet, sensitive produksjons-/testdata, kvalitet og formatering, versjonsbevissthet, innstillinger/oppdateringer og fire praktiske bruksområder. Generell KI-veiledning beholder utkaststatus; ingen nye godkjenninger for andre verktøy eller datakategorier er innført.
- Språkvasket teksten og presisert VS Code-hurtigtasten for neste ord til Cmd/Ctrl + høyrepil. Bibliotek-/rammeverksvalg beskrives gjennom prosjektinstruksjoner og kontekst; tilpasning av forslag avgrenses til editorens faktiske støtte. Tekniske veiledninger er lenket som støtte, uten å erstatte virksomhetens føringer.
- Registrert siden i felles innholdskilde med RAG-utvalg og eksplisitt tillatt den nye interne kildelenken i klientvalideringen; funksjonsregister og nettstedskart avledes automatisk uten kopier av prosa. Utviklingsplanen er avstemt. pnpm typecheck, 279 Node-/tre Python-tester, innholdssynk og Docker-produksjonsbygg bestod. Første testrunde fant fire følgefeil av at den nye kildelenken manglet i isSources; etter eksplisitt ruteregistrering bestod alle. Tre eksempelspørsmål finner Copilot-siden først. Fire lokale HTTP-sider bekrefter nytt innhold, inngangslenker og nettstedskart. Docker-portalen er oppdatert; modellvolummetadata og Ollama-ID/starttid er bevart. Pages-byggets første kjøring kompilerte 29 sider, men avsluttet med SecurityFatalError/oppgraderingsvarsel for Next.js 16.4.3 (exit 1). Uendret ny kjøring bestod (exit 0); ingen kontroll er slått av og ingen avhengigheter oppdatert. Varselet må undersøkes separat før delt drift, og er registrert i planen. Generert next-env.d.ts-endring er tilbakeført. Etterkontroll med pnpm format:check, pnpm test:links (233 filmål i 12 dokumenter) og git diff --check bestod. Sluttførte kontroll-/driftsnotater er skrevet etter Docker-bygget. Ingen faktisk modellgenerering eller ny full tilgjengelighetsprøve. Ingen commit eller push.

### 16. november 2026 – faktiske Spør KI-svar om MCP-godkjenning kontrollert

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Testet fire spørsmål gjennom /api/rag på Docker-portalen fra 88cc33a med faktisk Qwen3:4b. Samlet liste og separate spørsmål bekrefter Logorama/Prometheus som godkjent. Atlassian oppgis som under ROS-analyse/ikke godkjent, og Slack som planlagt/ikke godkjent. Alle fire ga HTTP 200/generated, riktig første kilde og gyldige kildehenvisninger. Svartider 23,77–49,56 s; ingen frister eller modellinnstillinger endret.
- [Kort rapport med faktiske svar](docs/rag/2026-11-16/godkjente-mcper.md) dokumenterer forventninger, målinger og avgrensning. Direkte kildesøk ga MCP-oversikten først for alle spørsmål. Portal healthy, Ollama/qwen3:4b og konfigurert firetrådsprofil er kontrollert. Planen er avstemt; ingen kode-, funksjonsstatus- eller produksjonsgodkjenning endret. pnpm test:links bestod med 233 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Ingen ny full testpakke, ombygging, modellnedlasting, modell-/volumkonfigurasjon, commit eller push.

### 16. november 2026 – Docker-portal oppdatert fra 452b0c5

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bygget ki-produktutvikling:compose fra ren git archive av 452b0c599cfab3b89be7c2d3a4d01fdabaf5f782, med commitetikett og gjenbruk av byggcache. Bygg bestod på 10.24 s; bare portalcontaineren ble gjenskapt med --no-deps --no-build. Bildets commitetikett og SHA-256 for MCP-innhold, kunnskapsutvalg, versjonslogg og utviklingsplan samsvarer med kildecommiten. Bilde-ID: sha256:0ac71390262530712aab944dfc813beb9f69ad8d2a7b13326d90261bb0ff618d.
- MCP-siden, versjonsloggen, Oversikt, utviklingsplanen og /spor ga HTTP 200. MCP-oppføringene for Logorama/Prometheus og den tilhørende loggoppføringen er bekreftet i de bygde sidene. Portal healthy og RAG status=ok/generationEnabled=true. Dette er helse-/innholdskontroll, ikke en ny modellgenererings- eller nettleserprøve.
- Modellvolummetadata og modellmanifestets SHA-256 er uendret. Ollama og init-container beholdt samme ID/starttid; ingen ny modellnedlasting eller volumfjerning. Ingen ny full testpakke, funksjons-/produksjonsstatusendring, commit eller push. Driftsnotatet og ny planoppføring er skrevet etter bildet og inngår ikke i 452b0c5-bildet. pnpm test:links bestod med 231 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod.

### 16. november 2026 – Logorama og Prometheus i MCP-oversikten

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Lagt til Logorama MCP og Prometheus MCP som godkjent etter brukerens opplysning. Begge vises først på Godkjente MCP-er. Oppdatert innledning, statusforklaring og dato; Atlassian beholder ROS-analyse pågår og Slack beholder Planlagt.
- Oppdatert felles kunnskapsutvalg med de to nye statusblokkene. Oversikt og funksjonsregister avleder beskrivelsen fra MCP-siden, så navn/status kopieres ikke inn i separate definisjoner. Utviklingsplanen er avstemt. Ingen nye integrasjonstilkoblinger eller rettigheter er opprettet, og teknisk Beta-/produksjonsstatus er uendret. pnpm typecheck og pnpm test bestod: 279 Node-/tre Python-tester, innholdssynk og 231 filmål i 12 dokumenter. Direkte retrieve-kontroll gir MCP-oversikten først og ny godkjenningsstatus for begge navn, også i Docker-kildegrunnlaget. Docker-bygg og oppstart av bare portalcontaineren bestod; MCP-siden, Oversikt og funksjonalitetsoversikten ga HTTP 200 med begge navn. Modellvolummetadata og Ollama-ID/starttid er uendret. Ingen ny modellgenererings-/nettleserprøve. Etterkontroll med pnpm format:check, pnpm test:links (231 filmål) og git diff --check bestod. Nye driftsresultater er skrevet etter bildet. Ingen commit eller push.

### 16. november 2026 – Docker-portal oppdatert fra a4b12d3

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bygget ki-produktutvikling:compose fra ren git archive av a4b12d33e3220f0233a91f07c0ff567683f708d7, med commitetikett og gjenbruk av byggcache. Bygg og portaloppstart bestod på ca. 11 s. Bare portalcontaineren ble gjenskapt med --no-deps --no-build; ingen modellinit eller modellserver ble startet på nytt.
- Verifisert healthy portal og RAG status=ok/generationEnabled=true. Forside, /spor, /versjonslogg og /utviklingsplan ga HTTP 200. De to dokumentasjonssidene inneholder de nye mobil-/dialogtestoppføringene. SHA-256 for versjonslogg, plan, funksjonsregister, fokusfunksjon og transkript i containeren samsvarer med kildecommiten. Bildets commitetikett er kontrollert; bilde-ID er sha256:3501c83828da06b3f4899db600499ba91226b2c8a3842f650e8793da3e1af60f.
- Eksisterende modellvolums metadata og modellmanifestets SHA-256 er uendret; Ollama-/init-containerne har samme ID/starttid. Ingen ny modellnedlasting eller volumfjerning. Ingen funksjons-/produksjonsstatusendring, ny full testpakke, faktisk genererings-/nettleserprøve eller push. Helsekontrollen bekrefter modelloppsett, ikke ny svarkvalitetsevaluering. Dette driftsnotatet og planoppføringen er skrevet etter bildet og inngår ikke i a4b12d3-bildet. pnpm test:links bestod med 231 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Ingen commit.

### 16. november 2026 – rullerettingen prøvd ved 320 px og i forsidens chatbot

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Testet ba5aee0-rettingen i eksisterende Docker-portal på 3005: første og neste spørsmål på /spor ved 320 × 762, samt forsidens dialog ved 1280 × 720 og en ny innsending ved 320 × 762. Fire faktiske Qwen-svar med kilder; ingen simulert transport. Synlig svarstart, feltfokus og ingen horisontal overflyt i målte rulleflater i alle fire prøver. Sideankeret lå ca. 24 px fra toppen; dialogankeret lå ved toppen av dialogens egen rulleflate, uten å skjules bak overskriften.
- Oppdatert [testresultatene](docs/rag/2026-11-16/chat-scroll.md) med mål, fremgangsmåte, ett nytt representativt dialogbilde og begrensninger. Tidligere testgrunnlag/bilde er bevart. Containerens fokus-/transkriptfiler samsvarer med de committede filene ved SHA-256; portalhelse healthy. Ingen kode-/funksjonsstatusendring, ombygging, modellnedlasting eller volumendring. Planen henviser til utvidet testgrunnlag.
- pnpm test:links bestod med 231 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Ingen ny full testpakke, fysisk mobil-/skjermtastatur-/skjermleser-/zoomprøve, full WCAG- eller produksjonsgodkjenning. Midlertidig viewport-overstyring er nullstilt og testfanen lukket. Ingen commit eller push.

### 16. november 2026 – Spør KI beholder starten på svaret synlig

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Rettet samspillet mellom svarrulling og fokus: retur fra Send/body til spørsmålsfeltet bruker preventScroll:true. Tastaturfokus bevares uten å dra visningen ned til skjemaet. Rulleankeret er flyttet fra siste spørsmål til starten av siste svar. Fokus på en annen valgt kontroll stjeles fortsatt ikke.
- Oppdatert funksjonsregister, arkitektur og utviklingsplan. Regresjonen prøver fokusretur uten rulling og bevaring av valgt kontroll. 9/9 fokuserte tester, hele pnpm test med 279 Node-/tre Python-tester og innholdssynk, pnpm typecheck og Docker-produksjonsbygg bestod. Bare portalcontaineren på 3005 er gjenskapt; Ollama-ID/starttid og modellvolummetadata er uendret. Faktisk Qwen-/nettleserprøve bekrefter synlig svarstart på 23,92 px (før −499,08 px), med feltfokus beholdt. [Kort rapport og ett skjermbilde](docs/rag/2026-11-16/chat-scroll.md) viser omfanget; skjermleser, 320 px og dialog er ikke manuelt retestet. Etter dokumentoppdatering bestod pnpm format:check, pnpm test:links (230 filmål i 12 dokumenter) og git diff --check. Dette er ikke en ny full WCAG-/skjermleser- eller produksjonsgodkjenning. Ingen commit eller push.

### 16. november 2026 – CI og versjonskrav samlet på Node 24

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Erstattet CI-matrisen med én jobb, Node 24, og satt engines.node til >=24.0.0 <25.0.0. Node 22 utgår fra løpende støtte. Prisjobben bruker allerede 24; Docker beholder sitt bevisst låste Node 24-bilde. Jobbinnhold, action-SHA-er, minst mulige rettigheter og persist-credentials:false er beholdt.
- Avstemt README, arkitektur, kvalitets-/CI-kontroll, første-push-sjekkliste, dokumentasjonsoversikt og utviklingsplan. Historiske tester/bevis for Node 22 er bevart. Sjekklisten krever nå Node 24 og forklarer at et eventuelt gammelt Node 22-statuskrav må fjernes etter GitHub-verifisering. Funksjonsregister og produksjonsstatus er uendret.
- Lokalt på macOS arm64, Node 24.22.1/pnpm 11.25.0/Python 3.9.6: pnpm check bestod med 278 Node-/tre Python-tester, innholdssynk, 227 filmål i 12 dokumenter, format, typer og serverbygg. pnpm build:pages bestod også; begge bygg genererte 28 sider. Frossen offline-installasjonskontroll med ignore-scripts og eksisterende avhengigheter bestod uten endret låsefil. Ruby YAML/JSON-kontroll bekreftet én CI-jobb uten matrise og konsistente versjonsvalg. Ingen ny Docker-/GitHub-/actionlint-kjøring; url.parse()-deprekasjonsadvarsel uten testfeil. Generert next-env.d.ts-endring er tilbakeført. Etter dokumentoppdatering bestod pnpm test:links (228 filmål i 12 dokumenter), pnpm format:check og git diff --check. IP-blokkeringen er fortsatt en separat administratoravklaring; ingen godkjent runner er gjettet eller GitHub-innstilling endret. Ingen priskilde-/modell-/blindkjøring, commit eller push.

### 16. november 2026 – rotårsak til CI-feilen bekreftet: IP-liste

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Lest brukerens vedlagte checkout-logg lokalt: tre git fetch-forsøk gir HTTP 403 med eksplisitt avvisning fra repo-eierens IP allow list. Den tidligere uavklarte exit 128 har dermed en bekreftet nettverks-/organisasjonsårsak før Node-oppsett. Rålogg, nøkler, autorisasjonshoder og IP-adresser er ikke kopiert til repoet eller gjengitt. Linjereferanser og kildehash står i CI-kontrollen; separat full logg fra den andre matrisejobben er ikke lest.
- Oppdatert første-push-sjekkliste, CI-kontroll og utviklingsplan med nødvendig administratoravklaring: godkjent Linux-runner, gruppe/labels, repoets tilgang og tillatt utgående IP. Begge workflows bruker ubuntu-latest og må avstemmes når faktisk runner er kjent. Ingen labels er gjettet; ingen IP-regler, tokenrettigheter, abonnement eller workflows er endret. Årsaken er funnet, men faktisk driftsretting og grønn GitHub-CI gjenstår.
- Tidligere beståtte lokale appkontroller på 8a14484 beholdes som datert grunnlag (278 Node-/tre Python-tester og begge bygg på macOS Node 24.22.1). Ingen ny full testpakke, Node 22/Linux-, modell-/priskilde- eller blindkjøring i denne loggvurderingen. pnpm test:links bestod med 226 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Funksjonsmodenhet og produksjonsstatus er uendret. Ingen commit eller push.

### 16. november 2026 – tidligere undersøkelse: CI-feil avgrenset til checkout

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Brukerens GitHub-skjermbilder bekrefter første push av 8a14484 til main i privat organisasjonsrepo. Lokal origin/tracking er kontrollert. Begge CI-jobbene feiler; innsendt loggutdrag viser git exit 128 under actions/checkout → Fetching the repository, før Node-oppsett, installasjon og tester. Sluttkoden alene bekrefter ikke årsaken. Mottatt sladdet debug-utdrag viser repository/ref og et maskert token, men mangler fortsatt git fetch-kommando/stderr/fatal-linjer; loggarkiv er nødvendig for årsaksdiagnose. Private CI-logger er utilgjengelige direkte her grunnet manglende CLI-innlogging og blokkert nettlesertilgang. Kontroll av offisiell kildekode ved låst checkout-SHA viser at fetch normalt logger kommandoen, og at Removing auth er finally-opprydding etter suksess eller feil. Ingen dokumentert feil i persist-credentials:false er påvist; innstilling og contents:read beholdes.
- Lokal kontroll er gjentatt etter mottatt debug-utdrag: pnpm check og pnpm build:pages på macOS arm64, Node 24.22.1, pnpm 11.25.0 og Python 3.9.6 bestod med exit 0: 278 Node-/tre Python-tester, innholdssynk, 224 filmål i 12 dokumenter, format, typer og begge bygg med 28 genererte sider. url.parse()-deprekasjonsadvarsel uten testfeil. Dette er ikke reproduksjon av GitHub-checkout eller ny Node 22/Linux-kontroll. Generert next-env.d.ts-endring er tilbakeført til kildebasen.
- Oppdatert første-push-sjekkliste og utviklingsplan med faktisk opplasting, feilsted og åpne logg-/gren-/tilgangsavklaringer. Ingen årsaksretting eller workflow-/rettighetsendring er gjort uten bekreftet feilmelding. Funksjonsstatus og produksjonsgodkjenning er uendret. Etter dokumentoppdatering bestod pnpm test:links (224 filmål i 12 dokumenter), pnpm format:check og git diff --check. Ingen nye ekte modell-/priskildekall, blindmåling, Docker-/modellvolumendring, commit eller push.

### 16. november 2026 – samlet lokal kontroll før første push

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Kjørte pnpm check og pnpm build:pages på ren kildebase a762ac1, macOS arm64, Node 24.22.1, pnpm 11.25.0 og Python 3.9.6 med eksisterende avhengigheter. Begge bestod med exit 0: format, typer, 278/278 Node-tester, 3/3 Python-tester, innholdssynk inkludert søkenøkkelord, 218 relative filmål i 12 dokumenter og begge bygg med 28 genererte sider. Første check-forsøk ble blokkert av sandkassens lokale lytteportforbud (EPERM); full kjøring med nødvendig tilgang bestod. url.parse()-deprekasjonsadvarsel uten testfeil.
- Oppdatert [første-push-sjekklisten](docs/FORSTE-PUSH.md) med lokale resultater og at organisasjonsrepo er opprettet ifølge brukeren. URL/synlighet/tilgang og GitHub-innstillinger er ikke kontrollert. Avklaringer om innhold/historikk, historiske preview-verdier, bevislagring, prisjobb og etterfølgende CI/review er tydelig skilt fra krav til lukket nettstedspilot. Utviklingsplanen er avstemt uten produksjonsgodkjenning eller endret funksjonsstatus.
- Ingen priskildekall, ekte modellprøve, blindmåling, ny sikkerhetsskanning, Docker-/modellvolumendring, remote, GitHub-innstilling, historikkendring, commit eller push. Dokumentoppdateringene er skrevet etter byggene; etterkontroll av dokumentene bestod med 224 relative filmål i 12 dokumenter, pnpm format:check og git diff --check. Byggenes genererte ruteimportendring i next-env.d.ts er tilbakeført til kildebasen, uten annen kodeendring.

### 16. november 2026 – aktiv Docker-portal oppdatert til ee26bb2

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bygget ki-produktutvikling:compose fra ren git archive av ee26bb25d409c287bbb1beb67b7139f4d897461f, med commitetikett og kontrollert kildehash for RAG-config/adapter. Produksjonsbygg bestod på ca. 19,53 s med gjenbruk av avhengighets-/basecache. Bare portalcontaineren ble gjenskapt; ingen modellserver-/init-omstart eller volumfjerning.
- Aktiv portal på 127.0.0.1:3005 bruker OLLAMA_NUM_THREAD=4. Helse og uendret README-modelltest bestod: prompt 15,8 s, brukerbehov 35,4 s og irrelevant spørsmål uten treff/generering på 5 ms. Skill-spørsmålet bestod separat med riktig kilde og [1] på 10,8 s. Runner-logger etter ny portalstart bekrefter fire inferens-/batchtråder, med uendret 60 s-grense.
- Eksisterende modellvolums metadata/opprettelsestid og modellmanifestets SHA-256 er verifisert uendret. Modellserver/init beholdt samme container-ID og starttid. Ingen ny modellnedlasting. [Rapport og kontrollmetadata](docs/rag/2026-11-16/docker-ee26bb2/rapport.md) er lagret, og utviklingsplanen viser aktiv lokal oppdatering uten produksjonsgodkjenning.
- pnpm test:links bestod med 218 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Ingen appkode, funksjonsstatus eller Git-historikk endret. Nye dokumentoppføringer er skrevet etter bildet og er ikke del av kildecommiten. Ingen full testpakke, Pages-, visuell nettleser-/skjermleserprøve, priskilde-/eksternt modellkall, blindmåling, commit eller push i denne økten.

### 16. november 2026 – rettet Qwen-timeout ved for høyt automatisk trådtall

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Kontrollert A/B/A med samme modell/prompt viste treg generering ved automatisk 18 tråder (13–16 svarbiter på 30 s), fullført 32-tokenmåling på ca. 11,2 s med fire tråder (31,19 tokens/s i genereringsdelen), og treg generering igjen ved automatisk valg. Faktiske runner-logger bekrefter 18 → 4 → 18. Ingen frister er økt.
- Lagt til valgfri servervariabel OLLAMA_NUM_THREAD med heltallsvalidering 1–64; tom/ugyldig verdi gir oppstartsfeil. Adapteren sender options.num_thread når konfigurert. Compose setter fire tråder i portalens miljø; ellers beholdes autovalg ved usatt verdi. Dette er en portalvariabel, ikke en innebygd Ollama-miljøvariabel. Modell, 8192 kontekst, 700-tokenbudsjett, strukturert svar og 60/65/70 s-frister er uendret.
- Reell retest i eget Docker-miljø bestod to uendrede README-skriptkjøringer: prompt 13,8/7,2 s kald/varm og brukerbehov 31,4/31,5 s. Skill-spørsmålet ga generert svar med riktig kilde og [1] på 10,3 s; irrelevant spørsmål ga ingen treff/generering. Fem genererte svar bestod. [Rapport og resultatfil](docs/rag/2026-11-16/qwen-threads/rapport.md) bevarer årsakskontroll og avgrensninger, med henvisning fra den opprinnelige feilrapporten.
- Oppdatert README, miljøeksempel, arkitektur, funksjonsregister og utviklingsplan. Beta-status og alle produksjonsavklaringer består. To regresjoner feilet før retting; 15/15 fokuserte tester består etterpå. Ordinær testpakke bestod 278 Node-/tre Python-tester og innholdssynk. Linux Node 24.22.2 bestod 278/278 uten eksternt testnettverk etter at Git ble installert i eget testbilde; første forsøk manglet Git for prisjobbfixturen. Appbildet er ikke utvidet med testverktøy. Typekontroll og produksjonsbygg lokalt/Docker bestod.
- Sluttkontroll: pnpm test bestod på nytt med 278 Node-/tre Python-tester, innholdssynk og 216 relative filmål i 12 dokumenter; pnpm typecheck, pnpm format:check og git diff --check bestod. Eksisterende container-ID/bilde/starttid/omstarter/tilstand og originalvolummetadata/manifesthash er verifisert uendret også etter opprydding. Bare egne testressurser er fjernet. Originalportalen på 3005 er ikke ombygd; rettingen er prøvd separat på 3015. Ingen ny modellnedlasting var nødvendig: samme modellvekter ble kopiert fra skrivebeskyttet originalvolum til eget volum. Ingen priskildekall, eksternt modell-API, blindmåling, Git-historikkendring, commit eller push.

### 16. november 2026 – ren Docker-prøve: infrastruktur bestod, modellgenerering feilet

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Prøvd README-oppskriften fra ren kildekopi av 7441c70, uten verts-node_modules, .env.local eller .next. Eget Compose-prosjekt/appbilde og loopback-port 3015, med verifisert tomt eget modellvolum. Produksjonsbygg uten app-/avhengighetslagcache bestod på ca. 42,83 s; Qwen3:4b ble faktisk lastet ned/verifisert på ca. 76,93 s. Node 24.22.2, Docker/Linux arm64 og Compose 5.5.1. Delte basebilder/daemon er ikke en ny maskin eller helt kald Docker-cache.
- Helse, modellinformasjon, forside-/Spør KI-responser med ressurser, intern modellisolasjon og omstart med modellgjenbruk bestod. Fire faktiske genereringsforsøk ga 502 ved 60 s, også varm modell, med riktige kilder bevart. Irrelevant spørsmål ga 200 uten treff/generering. De to README-skriptkjøringene avsluttet med exit 1 på første spørsmål og omtales ikke som bestått. Årsak er ikke fastslått, og innstillinger er ikke endret for å skjule feilen.
- [Kompakt rapport, resultatfil og feillogg](docs/rag/2026-11-16/readme-clean/rapport.md) dokumenterer både vellykkede trinn og timeoutene. README viser den delvise verifiseringen; utviklingsplanen får et åpent oppfølgingspunkt uten endret produksjonsgodkjenning. Ingen ny funksjonalitet eller endring av Beta-status. Nettleserforbindelsen feilet før avlesning; ingen visuell test/skjermleserprøve påstås.
- Eksisterende tre containeres ID/bilde/starttid/omstarter og modellvolummetadata/manifesthash er verifisert uendret, også etter opprydding. Bare nye testressurser ble fjernet; originalt miljø beholdes. Ingen priskildekall, eksternt modell-API, blindsett, Git-historikkendring, commit eller push. pnpm test:links bestod med 212 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Resultatfil og datert rapport er avstemt mot den delvise statusen i README/plan.

### 16. november 2026 – stegvis Docker-oppskrift i README

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Utvidet README med lokal Docker-oppskrift: forutsetninger, prosjektmappe, Compose-validering, oppstartsrekkefølge, modellnedlasting/volum, helsesjekk, nettleseradresse, eksempelspørsmål, valgfri reell modellprøve, stopp/ombygging og eksplisitt modelloppdatering. Feilsøking skiller søk uten treff, modellfeil, kapasitet, origin, porter og gammel kode.
- Presisert at Docker setter modellkonfigurasjonen uten .env.local/vertsinstallert Ollama, og at valgfri modellskripttest krever Node på verten fordi skriptet ikke finnes i runtimebildet. Helse viser adapteroppsett, ikke bevis for faktisk generering. Lokal utprøving er ikke et delt pilotmiljø. Ingen funksjon, fase eller produksjonsstatus endret; eksisterende ukommiterte sikkerhetsdokumenter er bevart.
- Kontroller: Compose-konfigurasjon, eksisterende tjenestestatus, RAG-helse og installert qwen3:4b er kontrollert lokalt. Den dokumenterte node scripts/check-rag-model.mjs bestod mot eksisterende Docker/Linux arm64-miljø: to faktiske Qwen-svar med forventet kilde og [1] på ca. 5,8/9,5 s, samt irrelevant spørsmål uten treff/generering. Compose 5.5.1, portal/ollama healthy og model-init Exited (0) er observert. pnpm test:links bestod med 209 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Dette er ikke en ren førstegangsinstallasjon, ny skjermleser-/nettleserkontroll eller full testpakke. Ingen ny installasjon, modellnedlasting, ombygging eller oppdatering er utført i denne dokumentasjonsøkten. Ingen commit eller push.

### 16. november 2026 – ny sikkerhetsskanning av dagens filer

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Skannet 1551 sporede filer ved 1258176 med lokal Gitleaks 8.30.1, ny OCR/PDF-ekstraksjon og skann av 20 arkivlogger. Fire kandidater ble verifisert som filkontrollsummer; ingen bekreftede nøkkelverdier er funnet i utvalget. Preview-feltene er fortsatt [REDACTED]. Medieuttrekk og arkivlogger ga null kandidater; 118/118 bilde-/PDF-ekstraksjoner fullførte uten feil.
- [Oppdatert sikkerhetsrapport](docs/sikkerhet/2026-11-16/status-for-github.md) med gjenværende avklaringer: repo-eier/tilgang, mandat-/deltakeropplysninger i PDF-er og arkivbilder, kontakt-/stitekniske metadata, øvrig bevislagring, prisjobb og unntatte blinddata. Ikke avgrenset til personlig konto. Originalrapporten fra 13. november bevares med ny oppfølgingslenke; utviklingsplanen viser dagens status uten å lukke P7/P9.
- Denne kjøringen gjelder dagens filer, ikke en ny historikkskann eller generell sikkerhetsgodkjenning. Ingen nøkkelverdier er vist, eksterne skannetjenester brukt, funksjonalitet endret eller Git-historikk omskrevet. Eksterne blindsett og test:blind er ikke brukt; den sporede blindfixturen er utelatt. pnpm test:links bestod med 209 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Nye rapportfiler ga null Gitleaks-kandidater. 1548 øvrige skannede filer og HEAD er uendret. Egne midlertidige prosjekt-/mediekopier er ryddet; redigerte logger/omfang er bevart utenfor Git. Ingen commit eller push.

### 16. november 2026 – sladdet preview-nøkler i historisk byggbevis

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Erstattet previewModeSigningKey og previewModeEncryptionKey med [REDACTED] i docs/priser/2026-11-10/node22-linux-full/prerender-manifest.json. Dette er et lagret testbevis, ikke portalens aktive byggmanifest. Feltstruktur, previewModeId og øvrige data er beholdt; filen skal ikke gjenbrukes som et kjørbart manifest.
- Nøkkelverdiene er ikke vist. Dette fjerner unødvendig generert nøkkelmateriale fra dagens fil, men roterer ingen aktive nøkler og fjerner ikke verdier fra tidligere commits. Eldre kontrollsummer beskriver originalbeviset; sladdingen er ikke en ny kjøring av testen. Funksjonalitet, utviklingsfaser og produksjonsstatus er uendret.
- Kontroller: programmatisk sammenligning bekrefter at bare de to verdiene er endret og at originalverdiene er fraværende fra den redigerte filen. Prettier-kontroll av manifest/versjonslogg og git diff --check bestod. Ingen appbygg eller funksjonstester nødvendig for sladding av et dokumentasjonsbevis. Ingen Git-historikk omskrevet, commit eller push.

### 16. november 2026 – rettet fem historiske bildelenker

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Rettet fem relative bildelenker i de to erklæringsutkastene fra 9. november (201443/203914) og tre kopier av previous-TILGJENGELIGHETSERKLAERING.md (203914/205326/210420). Lenkene til engelske/rettede prisvilkår beregnes nå fra kopienes faktiske mapper og peker til de opprinnelige beholdte testbevisene.
- Bare bildelenkemål er endret i historiske erklæringskopier; tekst, vurderinger, testdatoer og bilder er uendret. Ingen ny tilgjengelighetskontroll eller endring i funksjonalitet, fase eller produksjonsstatus. Tidligere daterte rapporter/hashes beskriver fortsatt sine opprinnelige dokumentversjoner.
- Kontroller: alle 190 relative Markdown-bildelenker under docs er kontrollert, med null brutte mål. pnpm test:links bestod med 208 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Ingen appbygg eller funksjonstester gjentatt for dokumentasjonsrettingen. Ingen Git-historikk er omskrevet; ingen commit eller push.

### 13. november 2026 – gjennomført skjermbildeopprydding og vedlikeholdsregel

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Gjennomført brukerens godkjente utvalg: 38 aktive testbevis beholdes på opprinnelige steder, 75 historikkbilder er flyttet til docs/arkiv/skjermbilder med opprinnelig mappestruktur og 29 byte-identiske kopier er fjernet fra arbeidskopien. Ingen Git-historikk er omskrevet; ingen rålogger, PDF-er eller andre bevis er fjernet.
- Oppdatert 177 bildehenvisninger i 27 Markdown-/JSON-filer til arkivet eller identisk motstykke. Opprinnelig utvalg og sikkerhetskartlegging bevares som daterte snapshots; [gjennomføringsrapport og flyttelogg](docs/bevis/2026-11-13/skjermbildeopprydding.md) knytter gamle stier til beholdt fil og kontrollsum. Historiske hashes/resultater er ikke erstattet av nye testpåstander.
- AGENTS.md krever løpende rydding av egne midlertidige/genererte filer, representative bildebevis, hashverifisering før deduplisering, arkiv/proveniens og fungerende referanser. Større endring av eksisterende bevis krever et konkret godkjent utvalg; Git-historikk ryddes ikke automatisk. README og bevislagringsdokumentet skiller den godkjente bildeoppryddingen fra øvrige uavklarte lagringsforslag.
- Kun dokumentasjon/bevisplassering og arbeidsinstruksjoner er endret; ingen ny portal- eller fasestatus. Tidligere ukommiterte sikkerhets-/plandokumenter er bevart. Kontroller: 142/142 stirelasjoner og bildehash er verifisert, alle 177 oppdaterte henvisninger kan løses, og bare bildestier er endret i de 14 JSON-bevisfilene. 190 rekursive Markdown-bildelenker ga null nye brudd og fem eksisterende snapshot-lenker. pnpm test:links bestod med 208 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. HEAD er uendret. Ingen applikasjonstester eller bygg gjentatt; ingen commit eller push.

### 13. november 2026 – foreslått mindre skjermbildeutvalg

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Gjennomgått 142 eksisterende skjermbildefiler med 113 unike innhold. Forslaget beholder 38 representative testbevis (ca. 2,00 MiB), klassifiserer 75 som historikk utenfor aktivt utvalg og 29 som byte-identiske ekstra kopier. Samlet er bildene ca. 10,93 MiB; dette er ikke en beregning av Git-/dokumentasjonsarkivets størrelse.
- [Rapport med filvis vurdering](docs/bevis/2026-11-13/skjermbildevurdering.md) og maskinlesbar liste viser begrunnelse, hash, dimensjoner, filbytes, identiske motstykker og avgrensede Markdown-referanser. Viktige før-/etterpar, chatforløp, tekstavstand og fokus beholdes i forslaget. Gjentatte erklæringsbilder, eldre UI og PDF-rendringer skilles fra måle-/strukturbevis.
- Bare et forslag, uavhengig av konto/publisering. Ingen bilder, gamle rapporter, manifest eller Git-historikk er slettet, flyttet eller omskrevet. Tidligere sikkerhetskontroll og ukommiterte endringer er bevart. Ingen ny lagringsregel, funksjons-/faseendring eller tilgjengelighetsvurdering; plan og funksjonsregister trenger ingen ny oppføring.
- Kontroller: 142/142 bilders SHA-256 og filbytes er uendret, alle 29 duplikatrelasjoner er verifisert, kategoriene samsvarer med listen og 144 lokale rapportlenker finnes. pnpm test:links bestod med 205 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Ingen appbygg eller funksjonstester gjentatt. Ingen commit eller push.

### 13. november 2026 – sikkerhets- og innholdskontroll før første push

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Undersøkt 43 lokale commits, nåbare Git-objekter, rapporttekst, 114 unike bilder, fire PDF-versjoner og et arkiv med 20 logger. Lokal Gitleaks 8.30.1 og supplerende innholdskontroll fant to genererte Next-preview-nøkler i historisk byggbevis; fire øvrige Gitleaks-kandidater ble verifisert som filkontrollsummer. Verdiene er ulike dagens lokale og kjørende Docker-bygg. Ingen aktiv leverandørnøkkel er påvist; ingen verdier gjengis.
- Bekreftet deltakernavn/organisatoriske opplysninger i mandat og bilde-/PDF-kopier, samt arbeidskontakt, Git-identitet og lokale brukerstier. Før push til personlig konto må innholds-/lagringstillatelse og håndtering av historisk nøkkelmateriale avklares. [Rapport med omfang og begrensninger](docs/sikkerhet/2026-11-13/forste-push-kontroll.md) er lagret uten rå sensitiv tekst.
- Utviklingsplanen peker til kontrollen uten å lukke P7/P9. Funksjonsregister og agentregler er uendret. Ingen eksisterende bevis, Git-historikk eller filer er slettet/omskrevet, og ingen commit/push eller nøkkeltilbakekalling er utført. Blindfixturens to historiske blobber og eksterne blindsett er ikke lest.
- Kontroller: Git-skann ga seks kandidater som vurdert ovenfor; siste lokale OCR/PDF-ekstraksjon fullførte 118/118 filer uten feil. Medieuttrekk og arkivlogger ga null Gitleaks-kandidater. pnpm test:links bestod med 204 relative filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Ingen nye applikasjonstester eller bygg.

### 13. november 2026 – friksjonsprosess innført i prosjektet

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Innført instruksjonskortets prosess i AGENTS.md og opprettet FRICTION.md med oppføringsmal og tom seksjon for åpne oppføringer. Innledningen er tilpasset portalens eksisterende vedlikeholdsregler, som beholdes. Ingen tidligere feil eller brukerpreferanser er omklassifisert til friksjon.
- Prosessen skiller varige kunnskapshull fra oppgavens funn, krever varsling ved registrering og etterprøvbar triage av alle oppføringer. Tiltak foreslås uten automatisk gjennomføring, og vurderte oppføringer fjernes først etter menneskets bekreftelse. README og dokumentasjonsoversikten peker til loggen.
- Bare arbeidsinstruksjoner og dokumentasjon er endret; ingen ny portalvisning eller endring av funksjonsregister, fase eller produksjonsstatus. Utviklingsplanen får ingen kunstig ny oppføring.
- Kontroller: pnpm test:links bestod med 202 relative filmål i 12 dokumenter. pnpm format:check og git diff --check bestod. Ingen funksjonskode er endret; testpakke og bygg er derfor ikke kjørt på nytt. Ingen commit eller push.

### 13. november 2026 – instruksjonskort for friksjonslogg og triage

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Lagt til «Add friction triage process to Agents.md» som Instruks i den felles ressurskilden, med brukerens fulle engelske tekst, norsk beskrivelse, brukssteg og søkeord. Kortet og detaljsiden avledes av eksisterende katalog; teksten er også tilgjengelig for Spør KI. Ingen nye føringer er lagt til portalens AGENTS.md, og ingen friksjonslogg er opprettet.
- Oppdatert funksjonsregisteret. Dette er nytt kataloginnhold innen eksisterende omfang, uten endret fase eller produksjonsstatus; utviklingsplanen får ingen kunstig ny oppføring. Tidligere ukommiterte endringer bevares.
- Kontroller: pnpm test bestod med 276/276 Node-tester, 3/3 Python-tester, faktisk innholdssynk og 199 relative filmål. pnpm typecheck, pnpm format:check og git diff --check bestod. Første testforsøk ble blokkert av sandboxens lokale portbegrensning; ny kjøring med tilgang til lokale testporter bestod. Docker-produksjonsbygg og omstart bestod; HTTP 200 og tittel/slutten av instruksjonsteksten er kontrollert på detaljsiden ved port 3005. Ingen ny visuell kontroll eller modellprøve. Ingen commit eller push.

### 13. november 2026 – beholdt flytende etikett, fjernet linjen bak teksten

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Korrigert misforståelsen i forrige etikettendring etter brukerens presisering. Den faste etiketten/CSS-en er fjernet, og MUI-etiketten er tilbake: inne i tomt felt uten fokus, løftet ved fokus eller innhold. Bare den løftede etiketten får feltets bakgrunnsfarge som dekker en eventuell rammelinje bak teksten; posisjon, overgang og øvrig feltutforming beholdes.
- Tilbakestilt funksjonsbeskrivelsens påstand om fast etikett. Den eksisterende gjengivelsestesten er endret til å kreve en tilknyttet flytende MUI-etikett, siden dette er ønsket oppførsel. Forrige rapport/skjermbilde bevares som historikk, ikke som gjeldende løsning. Ingen ny utviklingsfase eller endret produksjonsstatus.
- Kontroller: pnpm test bestod med 276/276 Node-tester, 3/3 Python-tester, faktisk innholdssynk og 198 relative filmål. Typekontroll, formatkontroll og git diff --check bestod. Docker-produksjonsbygg og omstart bestod. Nettleserkontroll i Docker ved 1280 og 320 px bekreftet etikett inne i tomt felt uten fokus og løftet ved fokus/innhold, med bakgrunnsmaske bare når løftet og uten horisontal overflyt. [Kort rapport](docs/rag/2026-11-13/chat-label-floating.md) bevarer resultatet. Ingen skjermleserkontroll eller ny samlet tilgjengelighetsvurdering. Tidligere ukommiterte endringer er bevart; ingen commit eller push.

### 13. november 2026 – rettet overlappende etikett i Spør KI

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet i nettleser at den flytende etiketten «Skriv et spørsmål» krysset feltets øvre ramme ved fokus. Erstattet den med en fast, synlig label over MUI-feltet, koblet med htmlFor/id. Fargeprofil, fokusmarkering, input-/avbruddslogikk og hjelpe-/feilmeldinger beholdes. Samme komponent brukes i chattsiden og forsidechatten.
- Kontrollert tomt/fokusert/utfylt felt og valideringsfeil ved desktopbredde, og tomt/fokusert/utfylt felt ved 320 px. Etiketten har 8 px klaring til rammen; etikettklikk gir feltfokus og ingen horisontal overflyt ble observert. Ny gjengivelsesregresjon kontrollerer én synlig etikett med korrekt feltkobling i vanlig og busy-tilstand.
- Oppdatert funksjonsbeskrivelsen uten endret modenhet. Ingen endring i utviklingsfaser, avhengigheter eller produksjonsstatus, så utviklingsplanen får ingen kunstig ny oppføring. [Avgrenset visuell rapport](docs/rag/2026-11-13/chat-label.md) føres med kontroller og skjermbilde. Tidligere ukommiterte Compose-/katalogendringer er bevart; eksisterende Next-generert next-env.d.ts-endring er ikke tilbakestilt.
- Fokuserte komponent-/fokustester 8/8, pnpm typecheck, pnpm test med 276/276 Node-tester og 3/3 Python-tester, faktisk innholdssynk og lenkekontroll bestod. Docker-produksjonsbygg og omstart bestod; den rettede etiketten er også visuelt kontrollert i Docker ved 320 px og i forsidechatten ved 1280 px. pnpm format:check, git diff --check og 198 relative filmål i 11 dokumenter bestod etter dokumentoppdatering. Ingen ny modell-, skjermleser- eller full tilgjengelighetsgodkjenning; ingen blindsett eller test:blind, commit eller push.

### 12. november 2026 – Spør KI finner den samlede skill-oversikten

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Gjenskapte brukerens «Hvilke skills har vi?» som ingen treff i den kjørende Docker-indeksen. Enkeltressurser var registrert, men en samlet skill-katalog manglet. To nye utviklingsforventninger feilet før endring.
- Lagt til getSkillCatalogSource, avledet direkte fra samme resources som katalogkortene. Navn, beskrivelser, antall og skille mellom registrerte skill-pakker og eksempler oppdateres ved indeksbygging, uten manuelt vedlikeholdt liste eller spørsmålsspesifikke rangeringer. Fire Skill-ressurser vises: tre med pakkemetadata og ett kodegjennomgangseksempel. Indeksen har nå 18 offentlige kilder, uten innlesing av andre repoer eller private filer.
- Tillater det konkrete interne katalogankeret /#ressurser i kildevalideringen, fortsatt uten ukjente ankre/eksterne adresser. Vis/vise/viser klassifiseres som lavvektede handlinger på linje med finn/skriv; de gir ikke treff alene. Ny kilde, dynamiske antall, avgrensning til Skill, eksempelstatus og ankergrenser er regresjonstestet. Eksisterende heldOutEvaluation og øvrige forventninger er bevart.
- Faktisk Qwen-svar ga først riktig liste uten inline-henvisning; generell JSON-svarinstruksjon er tydeliggjort til å kreve minst én kildehenvisning. Etter ombygging svarte modellen på brukerens nøyaktige spørsmål med alle fire oppføringer, skille 3 pakker/1 eksempel og [1], HTTP 200 og kilden skills, på 6,124 sekunder i én prøve. Modellinstruksjonen garanterer ikke fremtidig svarkvalitet.
- Oppdatert funksjonsregister, arkitektur og utviklingsplan. [Kort rapport](docs/rag/2026-11-12/skill-oversikt.md) dokumenterer årsak, retting og faktisk modellprøve. Docker er bygget/startet på nytt med samme modellvolum; klienten må lastes på nytt for det nye kildeankeret. Kildeantallet avledes i kode, ikke av en ny vektordatabase.
- Kontroller: pnpm test bestod med **275/275 Node-tester**, **3/3 Python-tester**, faktisk watch-/innholdssynk og lenkekontroll. pnpm typecheck og Next-produksjonsbygg i Docker bestod. pnpm format:check, git diff --check og 197 relative filmål i 11 dokumenter bestod etter dokumentoppdatering. Ingen blindsett, test:blind, eksterne modell-/priskildekall, nye avhengigheter, ny Node 22-/Pages-/nettleser-/skjermleserkontroll, commit eller push. Foregående Compose-arbeid er bevart og alle produksjonsavklaringer videreføres.

### 12. november 2026 – lokal Qwen3:4b med Docker Compose

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Lagt til Dockerfile, avgrenset .dockerignore, Compose og prosessoppstart for Next/RAG. Portal og Ollama er separate tjenester, og engangstjenesten model-init laster modellvektene til eget navngitt volum utenfor Git. Node-/Ollama-bilder er låst til verifiserte offisielle digester; installasjon bruker låsefil, uten postinstall-nedlasting av testverktøy. Modeller og miljøfiler tas ikke med i portalbildet.
- Kjørende Ollama har bare internt nettverk uten egress/vertsporter og skyfunksjoner av. Kun init har utgående nedlastingsnettverk; portalen publiseres på 127.0.0.1:3005. RAG tillater nøyaktig http://ollama:11434 i tillegg til loopback, fortsatt uten redirects, credentials, sti/query/fragment eller andre verter/porter. Modellen gjenbrukes ved omstart; oppdatering krever eksplisitt valg mens inferens er stoppet.
- Førtest bekreftet at Compose-adressen ble avvist. Reell Qwen-prøve avslørte tenketekst med think=false i publisert modelltemplate. Endelig adapter ber Qwen3 om JSON med bare answer og validerer før svartekst returneres; avkuttede eller ugyldige modellutdata avvises og tjenesten kan beholde kildene. API-kontrakten er uendret. Init kopierer skriptet ved start for å tåle endringer i arbeidskopien under en lang nedlasting.
- Faktisk modell: Qwen3:4b digest 359d7dd4bcdab3d86b87d73ac27966f4dbb9f5efdfcc75d34a8764a09474fae7, Ollama 0.40.16 i Docker/Linux arm64. To norske svar med forventede kilder og henvisninger bestod gjennom portalens /api/rag, omtrent 5,1 og 12,8 sekunder i én varm prøve. Irrelevant spørsmål ga ingen treff og ingen generering. Helse rapporterer generering aktivert. Dette er format-/integrasjonskontroll med offentlig eksempelinnhold, ikke bred svarkvalitets- eller virksomhetsgodkjenning.
- Oppdatert README/konfigurasjon, arkitektur, funksjonsregister/modellstatus til Beta, lokal personvernbeskrivelse og utviklingsplan. [Én kontrollrapport](docs/rag/2026-11-12/compose-qwen.md) dokumenterer både de innledende feilene og endelige resultater. scripts/check-rag-model.mjs er en eksplisitt prøve mot ekte modell og inngår aldri i test/CI. Modellfiler ignoreres av Git.
- pnpm test bestod med **270/270 Node-tester**, **3/3 Python-tester**, faktisk watch-/innholdssynk og lenkekontroll. pnpm typecheck, pnpm format:check, git diff --check, 195 relative filmål i 11 dokumenter, Compose-konfigurasjon og Next-produksjonsbygg i Docker bestod. Modellstatus-forventningen er tilsiktet endret fra setup til beta etter faktisk lokal verifisering; forbehold om eksternt API beholdes. Ordinære tester bruker fixtures/simulering og syntetiske init-filer; reelle lokale modellprøver er kjørt separat. Ingen blindsett, test:blind, eksterne modell-/priskildekall, ny Node 22-/Pages-/nettleser-/skjermleserkontroll, commit eller push. P1–P10 og godkjenning for delt miljø videreføres.

### 12. november 2026 – oppdatert lokal Docker-utgave til d2f6ba3

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bygget fra ren git archive av commit `d2f6ba3e6655b2e35722537a74a443b5523387b8`, uten arbeidskopifiler eller .env. Det eksisterende lokale bildet ble brukt som avhengighetsbase etter kontroll av identisk pnpm-lock.yaml. Bygget kjørte uten nettverk med installert Next build direkte (samme byggkommando som pnpm build); pnpm-wrapperen forsøkte først unødvendig installasjon i en skrivebeskyttet cache. Kjøring er fortsatt som node-bruker.
- Opprettet `ki-produktutvikling:d2f6ba3` og oppdatert `ki-produktutvikling:local` til samme bilde. Image-ID: `sha256:4cd6fed5f2c9570a388c59d848d2e621719fc850e23757fcb9f5dc956bbf997f`. Commit er registrert i image-label. Ny container `ki-produktutvikling-local` kjører på `http://127.0.0.1:3005` med restart unless-stopped. Den gamle containeren er stoppet og bevart som `ki-produktutvikling-backup-20261112` for tilbakeføring.
- Next-produksjonsbygg og **124/124 fokuserte søke-, språk-, metadata- og chatfokustester** bestod i Docker/Linux arm64 med Node 24.22.2. Helsesjekk gir HTTP 200 og generationEnabled=false. Kontrollsummer for retrieval.ts og chat-composer.tsx er identiske med kildecommiten.
- **12/12 kontrollspørsmål** bestod via faktisk portalproxy `/api/rag` på port 3005 med korrekt Origin: prompt/instrukser finner tydelig-kontekst først; lagring, tømming, samtale og sletting finner personvern; prisoppdatering finner priser; spørsmålet om arkivmateriale/personopplysninger finner både retningslinjer og personvern. De fire oppgitte irrelevante spørsmålene gir ingen kilder. Metadata vises ikke i API-svaret. Chattsiden gir HTTP 200.
- Modellgenerering er fortsatt deaktivert; ingen leverandør-/priskildekall, blindsett eller test:blind. Ingen ny nettleser-/skjermleser-, full testpakke-, Pages- eller Node 22-kontroll i denne ombyggingen. Dette er lokal oppdatering, ikke produksjonsgodkjenning eller delt pilot. Dokumentasjonsoppføringen er gjort etter bygget og ligger bare i arbeidskopien inntil neste commit/bygg; ingen commit eller push utført.

### 11. november 2026 – tastaturfokus ved sending og avbrudd i chat

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet fokusfallet før retting: ny test av faktisk ChatComposer feilet på native disabled, og nettleser viste BUTTON «Send spørsmål» → BODY ved Enter. Historisk chat-dates-port-rapport er bevart.
- Send beholder fokus med aria-disabled under venting, synlig kant/tekst og sperret standardaktivering. controller.current-sperren i useChat er beholdt. Avbryt er fortsatt egen type=button etter Send. Ved busy→idle flyttes fokus til feltet bare fra Send/body; valgt fokus på andre kontroller beholdes. Rene shouldIgnoreSend/focusTargetAfterRequest og komponenttester prøver gjentatt Enter/klikk, fokuserbarhet, separate knapper og fokusavgjørelser uten nye avhengigheter.
- Avgrenset nettleserkontroll ved 320 × 800 og 1280 × 900 med isolert prosjektkopi og simulert transport: Enter/dobbel Enter beholder Send; Tab når Avbryt; avbrudd og ferdig svar fra Send gir feltfokus; ny innsending virker og valgt personvernlenke beholdes ved svar i etterprøvingen. Ekte dobbeltklikk ved desktopbredde avbrøt ikke. Rapporten dokumenterer også en ikke-reprodusert mobilobservasjon av MAIN-fokus og et første forsøk før hydrering; disse er ikke regnet som beståtte prøver. Beregnet tekst-/kantkontrast er minst 11,47:1 mot målte mørke flater, og mobilvisningen har ingen horisontal overflyt.
- Oppdatert funksjonsregister, arkitektur og utviklingsplan. [Én fokusrapport](docs/rag/2026-11-11/chat-focus.md) inneholder document.activeElement etter stegene og ett skjermbilde. Skjermleser er ikke testet. Ingen full tilgjengelighets- eller produksjonsgodkjenning; P8 og øvrige åpne krav videreføres.
- pnpm test bestod med **263/263 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og lenkekontroll. pnpm typecheck og pnpm build bestod. Etter dokumentoppdatering bestod pnpm format:check, git diff --check og 190 relative filmål i 11 dokumenter. Ingen nye avhengigheter, API-endring, blindsett, test:blind, ekte modell-/priskildekall, Docker/Node 22, Pages-bygg, commit eller push. Tidligere ukommiterte endringer er bevart.

### 11. november 2026 – søkenøkkelord for innhold i Spør KI

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Skrev fem nye utviklingsforventninger før endring og bekreftet bommene: prompt ga ingen kilder i denne arbeidskopien, instrukser ga Kom i gang/Om, to lagrings-/tømmespørsmål ga ingen kilder og samtalespørsmålet ga brukerbehov. Utvikling var 29/34; uendret heldOutEvaluation 20/20 og chatforslag 6/6.
- Lagt til valgfrie keywords på ContentPage og SourceSelection. Den bestilte listen ligger på tydelig-kontekst-ressursen og personvernsiden. Prosa vedlikeholdes fortsatt bare i side-/ressursfilene. Ingen ekstra aliaser foreslås; listen med tekstbegrunnelser skal gjennomgås av et menneske før fletting.
- Indekserer nøkkelord separat med samme språkregler, tre grunnpoeng og sterkt feltfeste. Beste feltbidrag beholdes uten dobbelttelling; metadata inngår ikke i source.text, eksportert corpus, API-svar eller modellgrunnlag. Eksisterende ressursaliaser bruker også dette feltet. Bare ved spørsmål med minst to søkestammer og ingen andre temaord kan en lavvektet handling bli tema gjennom eksplisitt nøkkelord i den aktuelle kilden; ett isolert handlingsord er fortsatt for uklart. Ingen API-kontraktendring eller regler for enkeltspørsmål.
- Tester avviser tomme, dupliserte, stoppordbaserte og overflødige tittelaliaser på nye sider/seksjoner. Nye ressursaliaser testes med samme validator; eldre katalogmetadata beholdes kompatible. Egne tester dekker rangering, normalisering, seksjonsavgrensning og at metadata ikke vises. Reell watch-kontroll prøver tilføying og fjerning av alias i midlertidig prosjektkopi, i tillegg til prosaomlasting.
- Oppdatert arkitektur, funksjonsregister og utviklingsplan. [Rapporten](docs/rag/2026-11-11/sokenokkelord.md) har listen, sitater fra eksisterende innhold og alle før-/etterrader. Utvikling er **34/34**, uendret heldOutEvaluation **20/20**, chatforslag **6/6** og øvrige spørsmålsregresjoner **5/5**; ingen eksisterende forventning er endret.
- pnpm test bestod med **258/258 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk (inkludert nøkkelord) og lenkekontroll. Etter dokumentoppdatering bestod **187 relative filmål i 11 dokumenter**, pnpm typecheck, pnpm format:check og git diff --check. Ingen blindsett er lest/brukt eller pnpm test:blind kjørt. Ingen ekte modell-/priskildekall, nye avhengigheter, Docker-/nettleser-/byggkontroll, commit eller push. Foregående ukommiterte arbeid er bevart; Beta og P1–P10 videreføres.

### 11. november 2026 – norske verbstammer og kilder til to temaer

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet før endring at seks verbfamilier fikk ulike stammer, frekvensord ble stående og de tre oppgitte spørsmålene feilet. Med de tre nye forventningene skrevet først var utvikling 26/29; heldOutEvaluation var 20/20, chatforslag 6/6 og øvrige eksisterende spørsmålsregresjoner 5/5.
- Utvidet den felles stammingen med lengst endelse først, liten unntaksliste, genitiv-s, e-fjerning og avgrenset dobbelkonsonantforenkling. Begrunnede avvik beskytter -sikt/-ment, beholder -er i -ert, tillater korte l-stammer for delt/deling og skiller kom/kommer. Frekvensord er samlet i egen stoppgruppe. ActionTerms bruker samme nye stammer; endre/oppdatere/slette inngår som lavvektede innholdsforvaltningshandlinger.
- Beholdt det ordinære filteret først. Bare ved null treff prøves sjeldne enkeltord med sterkt felt-/eksakt langt stammetreff, minst to støttede temaer, én beste kilde per tema, avduplisering og maks tre. Grensen for sjeldne ord avrundes til hele dokumenter, og reservens konkrete omtale lengdenormaliseres ikke. Små emnetillegg for tittelhovedord/linjestart bevarer direkte emner framfor tilfeldige omtaler. Ingen spørsmålsstrenger eller kilde-ID-er inngår i rangeringen.
- Oppdatert funksjonsregister, arkitektur og utviklingsplan. [Én kort rapport](docs/rag/2026-11-11/stamming-og-to-temaer.md) har tabeller før/etter for alle 29 utviklingsspørsmål og de 20 uendrede heldOut-spørsmålene, ordgrupper og eksplisitte avvik fra forslaget. Ingen eksisterende evalueringsforventning er endret; heldOut-arrayet er SHA-256-kontrollert identisk. Foregående ukommiterte blindrapportendringer er bevart.
- pnpm test bestod med **242/242 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og **184 relative filmål** i 11 dokumenter. pnpm typecheck, pnpm format:check og git diff --check bestod. De 101 fokuserte språk-/RAG-testene inngår i Node-pakken. Utvikling er 29/29 mot 26/29 før; uendret heldOutEvaluation 20/20, chatforslag 6/6 og øvrige eksisterende spørsmålsregresjoner 5/5. Ingen blinde testsett er lest eller brukt, og pnpm test:blind er ikke kjørt i denne oppgaven. Ordinære tester bruker bare sine egne syntetiske rapportfiler. Ingen nye avhengigheter, embeddings, API-endring, ekte modell-/priskildekall, Docker-/nettleser-/byggkontroll, commit eller push; Beta og P1–P10 videreføres.

### 11. november 2026 – ekstern blindmåling uten spørsmål i standardlogger

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Rapporttesten leser filvalg bare fra RAG_BLIND_FILE. Uten variabel gis den oppgitte ikke-målt-diagnostikken og testen består. Oppgitt sti inne i repoet avvises før lesing, og realpath av fil/reporot hindrer ekstern symbolsk lenke i å omgå grensen. Sti i repoet som peker ut av repoet avvises også; søskenkataloger håndteres med kataloggrenser.
- Standardutskrift er bare riktige/totalt, prosent, bom med forventet kilde og falske treff uten forventet kilde. Spørsmål, kilde-ID-er og filstier logges ikke. Bare eksakt RAG_BLIND_VERBOSE=1 viser rader, dokumentert kun for menneskelig vurdering og aldri for den som justerer søket eller tuning. Tom/ugyldig/uleselig fil gir ikke målt uten rå feiltekst; ingen poenggrense feiler bygget.
- Lagt til separat test:blind. test:node bruker nå et lite filutvalgsskript som utelater selve blindmålingen, også via test:rag, pnpm test og CI. Syntetiske kontrolltester for rapporten inngår fortsatt; underprosesser fjerner arvet filvalg/verbose før egne testverdier settes. Malens skjema og tomme liste er beholdt; instruksjonene sier at ekte data holdes utenfor repoet.
- Oppdatert README, arkitektur og utviklingsplan. Søkealgoritme, kilder, funksjonsregister/modenhet og produksjonsstatus er uendret. Ingen blinde testsett utenfor repoet er søkt etter, åpnet eller lest; bare egne syntetiske tempfiler er brukt. Ingen ekte blindmåling eller spørsmål/innhold er etterspurt.
- Kontroller: pnpm test bestod med 216/216 Node-tester (inkludert 13 syntetiske blindrapportkontroller), 3/3 Python-tester, faktisk innholdssynk og 181 relative filmål i 11 dokumenter. pnpm typecheck, pnpm format:check og git diff --check bestod. Separat test:blind ble bare kjørt med RAG_BLIND_FILE/RAG_BLIND_VERBOSE eksplisitt fjernet og ga eksakt ikke-målt-melding; ingen ekte blindmåling er kjørt. Ingen nye avhengigheter, ekte modell-/priskildekall, Docker-/nettleser-/byggkontroll, commit eller push. Tidligere bevis og tom mal er ikke fylt med ekte spørsmål.

### 11. november 2026 – fjernet Oversikt fra bunnmenyen

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Fjernet lenken Oversikt fra bunnmenyen etter ønske. Oversikt er fortsatt tilgjengelig fra hovedmenyen; sidene og funksjonaliteten er beholdt. Funksjonsregister og utviklingsplan er vurdert og videreføres uten endret modenhet eller produksjonsstatus.
- Oppdatert den lokale Docker-forhåndsvisningen på port 3005 fra arbeidskopien (ffca8a1 med denne ukommiterte endringen). Linux-produksjonsbygget og HTML-kontroll bestod: HTTP 200, ingen Oversikt-lenke i footer og fortsatt Oversikt i header. Prettier-kontroll av de berørte filene og git diff --check bestod. Forrige Docker-loggføring er bevart; ingen commit, push eller ekstern publisering.

### 11. november 2026 – oppdatert lokal Docker-forhåndsvisning

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Fant ingen eksisterende portalcontainer eller Compose-prosjekt; port 3000/3001 var lokale Node-prosesser. Bygget derfor ki-produktutvikling:local fra commit ffca8a1 i en midlertidig byggkontekst, med Node 24.22.2 og avhengigheter kontrollert mot uendret package.json/låsefil. Linux-produksjonsbygget bestod uten nettverk. Ingen .env.local, host node_modules, Git-metadata eller modellnøkler ble kopiert.
- Startet container ki-produktutvikling-local med lokal binding 127.0.0.1:3005 til Next på containerport 3000; RAG kjører på intern loopback 3001 med MODEL_PROVIDER=none. Den eksisterende Node-siden er ikke stoppet eller rekonfigurert. Dette er en lokal forhåndsvisning, ikke et nytt produksjons-/Compose-oppsett i repoet.
- Kontrollert HTTP 200 for forsiden og RAG-proxyen; syntetisk kontekstspørsmål ga kildebasert svar med tydelig-kontekst først. Gammel korttekst finnes ikke i forsidens HTML. Nettleserkontroll bekrefter skill-kort uten underteksten og med Beta-etikett; den oppdaterte ressurskatalogen er åpnet på port 3005. Ingen priskilder eller ekte modell er kalt.
- Funksjonsregister og utviklingsplan er vurdert og videreføres uten nye funksjoner, modenhetsendring eller produksjonsgodkjenning. Ingen commit, push eller ekstern publisering. Prettier-kontroll av versjonsloggen og git diff --check bestod etter loggføringen.

### 11. november 2026 – enklere skill-kort

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Fjernet underteksten «Ennå ikke gjennomgått av et menneske» fra skill-kortene i ressurskatalogen. Beta-etiketten beholdes; øvrige ressurskort beholder Eksempel-teksten. Statusinformasjon på detaljsidene er fortsatt tilgjengelig.
- Oppdatert katalogbeskrivelsen i funksjonsregisteret. Beta-status og utviklingsplanens leveranse-/produksjonsstatus videreføres; denne tekstjusteringen krever ingen ny planoppgave. Ingen endring i Skills-repoet eller skill-innholdet.
- Kontroller: 75/75 kildesøk-/RAG-regresjoner, pnpm typecheck, pnpm format:check og git diff --check bestod. Ingen ny nettleser-, Docker- eller byggkontroll for denne avgrensede tekstjusteringen. Ingen commit eller publisering.

### 11. november 2026 – samlet avstemming av Markdown-dokumentasjonen

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Kartlagt 186 eksisterende Markdown-filer og opprettet [dokumentasjonsoversikt](docs/DOKUMENTASJON.md) som skiller gjeldende innganger, historiske rapporter, utkast, lagringsforslag og fixtures. Gjennomgangen omfatter nå 187 filer; antallene er et datert øyeblikksbilde, ikke automatisk filsynk.
- Avstemt README, arkitektur, kvalitetskontroll, utviklingsplan, CI-/første-push-dokumenter og rullerende pristestrapport mot kildecommit c22f1dc og siste Docker/Linux-kontroll. Gjeldende teknisk sammendrag viser Node 22.18.0/24.22.2, 206 Node-/tre Python-tester, innholdssynk og begge bygg. Eldre 132/133/135-resultater er tydelig historikk med bevart dato/omfang. Dokumentert støttefilnedlasting ved ny installasjon og videreført at selve testene bruker fixtures uten leverandørkall.
- Lagt til avgrensede vedlikeholdsnotater i personvernkartlegging, cookie-dokumentet og WCAG-kontrollen. Siste faktiske vurderingsdatoer, åtte uavklarte tilgjengelighetskrav, bannerbeslutning og manglende personvern-/driftsavklaringer er ikke endret. Ingen ny audit eller lov-/samsvarskonklusjon. Selve erklæringsutkastet og offentlige innholdskilder er urørt.
- 166 daterte rapport-/bevisfiler og fem fixtures bevares, sammen med AGENTS, arkivert README, bevislagringsforslaget og tilgjengelighetserklæringen: 175 Markdown-filer kontrolleres byte for byte med SHA-256. Ingen masseformatering av gamle bevis. Funksjonsregisteret er gjennomgått og beholdt; ingen brukerfunksjon eller modenhet endres.
- Kontroller: pnpm format:check, pnpm test:links (180 filmål i 11 dokumenter), utvidet lenkekontroll av alle 16 gjeldende dokumenter (242 relative filmål, ingen feil), SHA-256-sammenligning av 175 bevarte Markdown-filer og git diff --check bestod. Nettadresser, portalruter og fragmenter er ikke lenkevalidert; daterte bevis og fixtures er ikke omskrevet. Ingen ny full test- eller byggrunde i denne dokumentasjonsrunden. Denne runden endrer bare Markdown; forrige ukommiterte Docker-resultater er bevart. Ingen ny modell-/prisinnhenting, GitHub-kjøring, tilgjengelighets-/personvern-/cookie-test, commit, push eller publisering. Beta og P1–P10 videreføres.

### 11. november 2026 – hele CI-rekken testet i Docker/Linux på Node 22 og 24

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Testet commit c22f1dc med Node **22.18.0** og **24.22.2** på Linux arm64 / Debian 12.11, pnpm 11.25.0 og Python 3.11.2. Begge bestod format, typekontroll, **206/206 Node-tester**, **3/3 Python-tester**, faktisk watch-/innholdssynk, 144 relative filmål og både serverbygg og Pages-bygg. Ingen Node-feil/hoppede tester; Pages-artefakter og serverens RAG-rewrite er kontrollert.
- Førsteforsøket med en helt ny nettverksløs installasjon på 22.18.0 feilet fordi ChromeDriver/Java-støttefiler trengte nettverk; de påfølgende pnpm-kommandoene forsøkte installasjon igjen og fikk også exit 1 uten å utføre produktkontrollene. Oppsettet ble korrigert ved å kjøre uendret pnpm install --frozen-lockfile i egne bildeoppsett med nettverk, uten ignore-scripts. Begge nye installasjoner bestod. Den komplette seksstegsrekken, inkludert gjenbrukt install-steg, bestod deretter uten nettverk på begge Node-versjoner. Ingen priskilder eller ekte modell er kalt.
- Isolerte kildekopier fra git archive; ingen host-secrets, host node_modules eller publiserte porter. Bare pnpm-cachen ble gjenbrukt før ny installasjon. Begge testcontainere er fjernet, lokale bilder beholdt for gjenbruk. package.json, låsefil og pris-snapshot er SHA-256-kontrollert uendret i containerne og på verten.
- Oppdatert [kontrollrapport](docs/CI-KONTROLL.md) og utviklingsplan. Én JSON-oppsummering og én komprimert loggpakke inkluderer begge runtime-varianter, oppsett og førsteforsøket; manifest, bilde-/kildeidentitet og brukte Dockerfiler/kjøreskript følger med under docs/ci/2026-11-11/docker-matrix/. Ingen gamle bevismapper er endret. Funksjonsregisteret er vurdert og beholdt siden dette er verifisering uten brukerrettede endringer.
- Etter dokumentoppdateringen bestod pnpm format:check, pnpm test:links (149 filmål i ti dokumenter) og git diff --check på verten. Arkiverte logg-/beviskontrollsummer og inputhashene er verifisert. Dette er lokal Linux arm64-verifisering, ikke GitHub Actions/ubuntu-latest x64 eller faktisk leverandør-/tilgjengelighets-/produksjonsgodkjenning. GitHub-matrisen, rettigheter og hendelses-/PR-flyt gjenstår. Ingen commit, remote, push eller publisering. Beta og P1–P10 videreføres.

### 11. november 2026 – eksplisitt CI-matrise og SHA-låste actions før første push

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Verifisert mot offisiell setup-node-dokumentasjon/kilde at package.json sitt åpne engines-intervall ikke garanterer minsteversjonen; runnercache/nedlasting avgjør. CI kjører nå hele kontrollrekken på eksakt Node 22.18.0 og Node 24 med fail-fast=false. Prisjobben bruker også 24; begge bruker check-latest og deaktivert automatisk pakkecache. pnpm leses fortsatt fra packageManager, installasjonen bruker frozen-lockfile og CI viser verktøyversjonene i loggen.
- Låst alle fire eksterne actions til fullstendige commit-SHA-er med versjonskommentar, verifisert gjennom offisielle GitHub-ref-API-er og action.yml ved samme SHA. Beholdt CI-hovedversjonene; prisjobben bruker samme checkout/setup-node som CI. contents:read, begrensede skriverettigheter i prisjobben og persist-credentials=false er bevart. Ingen PAT, ny hemmelighet eller automatisk fletting; Dependabot er konfigurert ukentlig for github-actions.
- Lagt til [kort sjekkliste for første push](docs/FORSTE-PUSH.md), med beslutning om bevislagring før opplasting, branch protection/begge CI-statuskrav, Actions-/PR-rettigheter, force-with-lease på prisgrenen og manuell verifisering av begge workflows/aktuell PR-head. [Lokal kontroll og SHA-kilder](docs/CI-KONTROLL.md) skiller lokale resultater fra alt som gjenstår på GitHub. README, arkitektur og utviklingsplan er avstemt; funksjonsregisteret er vurdert og beholdt fordi portalens brukerfunksjoner/modenhet er uendret.
- Actionlint 1.7.12 fra offisiell utgivelse, SHA-256-verifisert og kjørt fra /tmp uten ny prosjektavhengighet: 0 feil i begge workflows. ShellCheck/Pyflakes er ikke installert, så de valgfrie integrasjonene ble ikke kjørt. `pnpm test` bestod lokalt på Node 24.22.1 med **206/206 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og **144 relative filmål** i ti dokumenter. Dette inkluderer fixture-simulering av prisjobbens run-steg. `pnpm format:check` og `git diff --check` bestod. Prisjobbens run-steg er uendret og prøves av eksisterende fixture-simulering; ingen ekte priskilder eller modell er kalt.
- Repoet har fortsatt ingen remote og ingen workflow er kjørt på GitHub. Ingen GitHub-innstillinger, bevislagringsbeslutning, gamle bevismapper, commit, push eller publisering er endret/utført. Tidligere ukommiterte endringer er bevart. Beta og P1–P10 videreføres; faktisk Actions, bot-PR-status, Dependabot og branch protection gjenstår.

### 11. november 2026 – datoer i svar, separate chatknapper og felles porttolking

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet dato-/årstallsfeilen, knappens Send→Avbryt-bytte og manglende aria-busy, samt ulik behandling av tomme/blanke/ugyldige og mellomromsomgitte RAG_PORT-verdier med tester før retting. Gamle parserens årstall er også etterprøvd isolert. Norske månedsnavn og vanlige forkortelser avviser ordnet markør; fire eller flere siffer blir avsnitt. Vanlige punkter, gjentatt nummerering, start og bevisste hopp beholdes.
- Send beholder navn, plassering og submit-type og deaktiveres under venting; Avbryt er en egen button. Ingen 500 ms-sperre eller skiftende knappbetydning. Tastatur-/skjermleserbruk får separate navn og roller; avbrudd flytter fokus til feltet. Gjeninnført aria-busy på skjemaet og tilpasset disabled-stilen til native disabled. Samtalelogg og generell ventestatus ligger fortsatt utenfor skjemaet.
- Felles, miljøfri parseRagPort brukes av Next og loadRagConfig, med standard bare når usatt, trimming, intervall 1–65535 og identiske feilmeldinger. Next importerer tidsbudsjett fra den miljøfrie modulen. Pages har ingen RAG-rewrite. Tester sammenligner faktisk Next-rewrite og serverkonfigurasjon for 13 verdier; ingen testbibliotek eller annen avhengighet er lagt til.
- Kort nettleserkontroll med tastatur og dobbeltklikk ved 320 × 800 px bestod: ingen utilsiktet avbryt, tilgjengelig separat Avbryt, fokus tilbake i feltet, ny innsending, datoer som avsnitt og listenumre 1/3/10. Ingen horisontal overflyt. Brukte isolert Next-kopi med simulert transport; begge testservere/kopien er fjernet og viewport nullstilt. Ingen virkelig modell, faktisk skjermleser eller full tilgjengelighetskontroll.
- Oppdatert README, arkitektur, funksjonsregister og utviklingsplan; Beta og P1–P10 videreføres. Én [rapport](docs/rag/2026-11-11/chat-dates-port.md) og ett lite skjermbilde dokumenterer arbeidet. `pnpm test` bestod med **206/206 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og **133 relative filmål** i åtte dokumenter. `pnpm typecheck`, `pnpm format:check`, `pnpm build` og `git diff --check` bestod. Tidligere ukommiterte endringer er bevart; ingen commit eller publisering.

### 11. november 2026 – felles chatforslag og forenklet indeksert kildesøk

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet dagens feil før endring: 1/5 oppgitte eksempelspørsmål og 5/6 forslag var riktige, mens de kjente settene bestod 26/26 og 20/20. Samlet forslagene med kildeforventning i én konstant brukt av begge komponentene og testene.
- Samlet stoppord etter bokmåls-kategorier og beholdt handlinger med vekt 0,25 i score/dekning i stedet for å fjerne dem. Handlinger kan ikke gi treff alene. Kildeord og felt bygges i en modulindeks én gang; tester lager egne indekser i stedet for å mutere standardkorpuset. Content-sync bygger ny indeks ved prosessomstart.
- Prøvd 20 regelvarianter mot 52 unike, allerede kjente utviklings-/regresjonsspørsmål. Fjernet langord-unntak, frekvenstak for sterke treff og fire unødvendige nivåer ved lik score. Beholdt målbare bidrag og innført dempet termfrekvens/lengdenormalisering, slik at rik emneomtale og korte oversikter balanseres. Sorteringen har nå tre nivåer. Ingen spørsmålsstrenger eller kilde-ID-er er hardkodet i søket.
- Opprettet tom blindEvaluation med skjema/instruksjoner i tests/fixtures/rag-blind.json. Den skal fylles av et menneske som ikke justerer søket. Rapporttesten har ingen treffsikkerhetsgrense og rapporterer tomt/ugyldig grunnlag uten å feile bygget. Begge tidligere sett behandles som kjente regresjoner; forventningene deres er bevart. Enhetstester for de fire fjernede tie-reglene er erstattet av testen av den enklere sorteringskontrakten.
- Oppdatert funksjonsregister, arkitektur og utviklingsplan. Før-/ettertabeller, forslag/kilde-koblinger, ablasjoner og begrensninger lagres i én [kort oppsummering](docs/rag/2026-11-11/retrieval-suggestions.md), uten gjentatte logger eller endring i gamle bevis. `pnpm test` bestod med **187/187 Node-tester**, **3/3 Python-tester**, faktisk watch-/innholdssynk og **131 relative filmål** i åtte dokumenter. `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestod. Ingen nye avhengigheter, embeddings, API-kontraktendring, commit eller publisering. Beta og P1–P10 videreføres.

### 11. november 2026 – ignorer genererte Python-cachefiler

**Utførende agent:** Codex (OpenAI).

- Lagt til `__pycache__/` og `*.pyc` i .gitignore, slik at Python-cache ikke vises som usporede filer. Kontrollert med `git check-ignore` og `git status --short`; `git diff --check` bestod. Ingen endring i portalens funksjoner eller produksjonsstatus.

### 11. november 2026 – chatrettinger testet i Docker/Linux med Node 22

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Testet commit `065b654` med Node 22.18.0 / Undici 6.21.2, Next 16.4.3 på Debian 12.11 / Linux arm64. Hele Node-pakken bestod **172/172**, uten feil/hoppede tester, inkludert de **24 chattestene** for nummerering, inputgrense, avbrudd, ny innsending og sene svar.
- Tilleggsprøve med simulert transport bestod **100/100** deterministiske avbrudds-/gjeninnsendingssekvenser: 50 med sent gammelt svar før nytt svar og 50 etter. Gammel fullføring/finally påvirket ikke ny tur. **4/4** listevarianter bestod, inkludert gjentatte markører, eksplisitt hopp og egen start etter avsnitt. Ingen ekte modell eller priskilde ble brukt.
- Kjørte med network none, ingen publiserte porter og skrivebeskyttet rot. Gjenbrukte eksisterende frosne Linux-avhengigheter; dependency-felt/låsefil er kontrollert. Et første bildeoppsett med lokal ID feilet ved register-metadataoppslag; lokal tagg fungerte uten installasjon. Begge logger er bevart. Containerens fravær er kontrollert; eksisterende appservere er ikke endret.
- Oppdatert [testrapport](docs/rag/2026-11-11/chat-controls.md) og utviklingsplan med scope og begrensninger. Nye bevis, runtime, bilde-/kildeidentitet, kontrollsummer og kjøreskript ligger i `docs/rag/2026-11-11/node22-chat-controls/`. package.json, låsefil og pris-snapshot er uendret. Funksjonsregisteret er gjennomgått og beholdt; oppfølgingen endrer ikke funksjon eller modenhet.
- Lokal `pnpm format:check`, `pnpm test:links` (129 filmål i åtte dokumenter) og `git diff --check` bestod. Ingen ny typekontroll, bygg, Python-/watch-synk-, nettleser-/tilgjengelighets- eller virkelig modellverifisering i Linux. Tidligere resultater beholder dato/omfang. Ingen produktkodeendring, commit eller publisering; Beta og P1–P10 videreføres.

### 11. november 2026 – avbryt chat, tydelig feltgrense og fortløpende lister

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet listenummereringsfeilen med to førtester. Ikke-stigende markører normaliseres nå fortløpende fra første nummer; strengt stigende sekvenser beholder hopp. ol start styrer start og li value brukes bare ved faktiske hopp. Dette følger vanlig Markdown-bruk med gjentatte 1-markører, uten å fjerne eksplisitt stigende nummerhopp eller start etter avsnitt.
- Innført tilgjengelig melding om kutting ved 1000 grafemer, og løpende teller fra 900. Permanent polite-status ligger i feltets helpertekst; generelt aria-busy på skjemaet er fjernet slik at kontrollene og meldingene er tilgjengelige under venting. IME begrenses fortsatt etter komposisjon.
- Avbryt-knappen bruker forespørselens AbortController, markerer turen «Forespørselen ble avbrutt.» og flytter fokus til feltet. Aktiv forespørsel frigjøres umiddelbart; identitetskontroll i ren request-control-modul og aktiv tur-ID i reducer hindrer sene svar/finally fra å endre en ny tur. Klienten avviser også sene svar når signalet er avbrutt.
- Lagt til rene tester for inputtilbakemelding, nummerering, avbrudd, ny innsending og sen fullføring. Oppdatert funksjonsregister, arkitektur og utviklingsplan. Ingen nye avhengigheter eller endret HTTP-kontrakt.
- Kort nettleserkontroll med tastatur ved 320 px er gjennomført i isolert kopi med simulert transport: faktisk innliming viste kuttemelding/teller, Avbryt ga riktig status og fokus i synlig felt, ny innsending virket og 1/1/1 ble vist som 1/2/3 uten li value. Backend observerte avbrutt forbindelse. [Rapport og skjermbilder](docs/rag/2026-11-11/chat-controls.md) er lagret; viewport er nullstilt og testservere/kopi ryddet. Automatiske kontroller: `pnpm test` **172/172 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og Markdown-lenker, samt `pnpm typecheck`, `pnpm format:check`, `pnpm build` og `git diff --check` bestått. IME og faktisk skjermleser er ikke manuelt testet. Ingen ekte modell- eller full tilgjengelighetsverifisering, commit eller publisering. Beta og P1–P10 videreføres.

### 11. november 2026 – avgrenset prisparsing og entydig RAG-konfigurasjon

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet funnene med nye førtester: ugyldig uvedkommende tabell og generaliserte Claude-fotnoter feilet; RAG-port godtok tom verdi og 0. Kontrolltestene for ugyldig faktisk pristabell og strengt tallformat bestod allerede.
- tables markerer ugyldig celleantall i stedet for å kaste for alle tabeller. Parserne velger ut fra alle nødvendige kolonner; bare valgt ugyldig tabell gir cellefeil, og ukjent prisformat er fortsatt feil. Gammel tables-test er oppdatert til markørkontrakten, med egen test av synlig feil i valgt tabell.
- Claude godtar ett fotnotesiffer (1–9), vanlig eller hevet, etter MTok i alle fem priskolonner. HTML-sup med ett siffer blir samme avgrensede format etter rensing. money er fortsatt streng og avviser blant annet $1 500; flere markører eller fotnote utenfor enheten godtas ikke. Tidligere test som avviste fotnote 3 er endret fordi det er den tilsiktede utvidelsen.
- RAG_PORT, RAG_MAX_CONCURRENT og RAG_ALLOWED_ORIGINS bruker standard bare når variabelen er usatt; eksplisitt tom/blank verdi er feil. Dette følger de utfylte RAG-eksemplene i .env.example og gjør driftsfeil synlige. Miljøport må være 1–65535. startRagServer kan få en eksplisitt injisert testkonfigurasjon med port 0, og oppstartsregresjonen er tilpasset uten å åpne port 0 via miljøet.
- Gjennomgått hele pricing-sync.yml. Eksakte sync-, PR- og feil-shell er testet med fixture-fetch, lokalt Git-remote og gh-stub, inkludert outputfelt, datostøy, én PR, oppdatering, foreldelse, kildefeil og gjenoppretting. Første workflow-kommando er den faktisk kjørte pristestfilen; den kjøres ikke rekursivt i simuleringen. YAML-innstillinger og shellsyntaks er kontrollert. actionlint finnes ikke lokalt; ingen ny avhengighet installert. Workflowen er uendret og må fortsatt prøves med workflow_dispatch på GitHub.
- Oppdatert README, arkitektur, utviklingsplan, funksjonsregister og [testrapport](docs/priser/TESTRAPPORT.md). Kontroller: `pnpm test:pricing` **24/24**, `pnpm test` **164/164 Node-tester**, **3/3 Python-tester**, faktisk innholdsomlasting og Markdown-lenker, samt `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestått. Manifest og råresultater ligger i `docs/priser/2026-11-11/parser-config/`. Kontrollsummer bekrefter uendret pris-snapshot, fixtures, package.json og låsefil. Ingen ekte priskilder eller modell er kalt; ingen nye prisdata, avhengigheter, commit eller publisering. Beta og P1–P10 videreføres.

### 11. november 2026 – norsk stamming og emneorddekning i kildesøket

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Reprodusert alle sju oppgitte feil før algoritmeendring. Delt evalueringen i eksisterende utviklingssett (26) og 20 nye låste spørsmål, inkludert åtte negative. Førresultatene var 26/26 og 3/20. Ingen forventninger i det nye settet er endret.
- Innført symmetrisk suffiksstamming, avgrensede sammensetningstreff bare i tittel/ressursnavn, 50 % orddekning med ekstra krav til enkeltstående treff, og vekting av tittel/innledning og sjeldne ord. Generelle handlinger er ikke emneord; «kommer» er fjernet fra stoppordene. Lik score avgjøres av tittel, dekning, linjestart og kildefokus før corpusrekkefølge. Ingen nye avhengigheter, embeddings eller endret API-kontrakt.
- Sluttresultat er 26/26 og 20/20; alle nye negative avvises og modelloversikten er først. Metodebegrensning: første etterprøving av det nye settet ga 13/20, og det ble målt igjen etter generelle rettinger. Sluttresultatet er derfor ikke en uavhengig holdout-test. Ingen regler er knyttet til spørsmålsstrenger eller bestemte kilde-ID-er; et nytt uavhengig sett gjenstår.
- Strammet modelloversiktens maxRank fra 3 til 1. En syntetisk poenglikhetstest prøver nå sorteringskontrakten direkte fordi stamming endret fixture-poengsummen; forventningen om tittelprioritet er beholdt. Oppdatert funksjonsregister, arkitektur, utviklingsplan og [evaluering med før-/ettertabell](docs/rag/2026-11-11/relevans-boyninger.md), samt maskinlesbare resultater. Tidligere CI-/dokumentasjonsendringer er bevart.
- Kontroller: `pnpm test` bestod med **157/157 Node-tester**, **3/3 Python-tester**, faktisk innholdsomlasting og Markdown-lenker. `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestod. Sluttkontrollen av Markdown fant 123 gyldige filmål. Ingen ny bygg-, Docker/Node 22-, tilgjengelighets-, GitHub- eller virkelig modellverifisering, commit eller publisering. Beta og P1–P10 videreføres.

### 11. november 2026 – samlet kontrollflyt, CI og kortere README

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Innført `test:node` for alle Node-tester, beholdt `test:rag` som alias, og lagt til Python-, Markdown-lenke- og samlet testkommando. `pnpm check` kjører nå format, typer, hele testløpet og bygg, slik at innholdssynk ikke blir glemt.
- Klargjort CI for push, pull requests og manuell kjøring, med read-only repositorytilgang, versjoner fra package.json, frozen-lockfile og begge bygg. Ingen PAT, prosjektsecrets, automatisk deploy eller priskildekall. Bot-PR-er krever menneskelig oppfølging; dokumentert dispatch på prisgrenen og GitHubs mulige godkjenningsventing. Faktisk GitHub-kjøring gjenstår.
- Kortet README til bruksveiledning og bevart hele tidligere tekst i `docs/HISTORIKK.md`, med justerte relative lenker. Oppdatert arkitektur, kvalitetskontroll og utviklingsplan; P1–P10 videreføres. Funksjonsregisteret er vurdert og beholdt siden dette endrer utviklerkontroller, ikke portalens brukerfunksjoner eller modenhet.
- Lagt til testbar offline-kontroll av relative filmål i rot-Markdown og direkte docs/*.md, inkludert referanselenker og bilder, med kodeeksempler utelatt. Fragmenter, nettadresser og portalruter er utenfor omfanget. Eksisterende bevismapper endres ikke.
- Målt store docs-mapper og foreslått alternativer for nye bevis og repeterte logger i `docs/BEVISLAGRING.md`. Ingen ny lagringsregel, sletting, flytting eller LFS-oppsett er innført; dette krever brukerens beslutning.
- Kontroller: `pnpm check` bestod på Node 24.22.1: format, typer, **135/135 Node-tester**, **3/3 Python-tester**, faktisk watch-synk, 120 relative filmål i åtte Markdown-dokumenter og serverbygg. `pnpm build:pages` bestod også. Full tidligere README er verifisert bevart med bare flyttede lenkemål; SHA-256 for alle 1 345 eksisterende daterte bevisfiler er uendret. Faktisk CI og ny Node 22-/Docker-kjøring er ikke utført. Ingen ny modell-/produksjons-/tilgjengelighetsgodkjenning, commit eller publisering.

### 11. november 2026 – komplett kildekopi for innholdssynkronisering

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet at `pnpm test:content-sync` feilet med `ERR_MODULE_NOT_FOUND` for `src/config/rag.ts`. Ny rask oppstartstest feilet også mot den gamle mappelisten før retting.
- Samlet kopiering i `scripts/lib/content-sync-fixture.mjs`, brukt av både watch-kontrollen og regresjonstesten. Kopierer hele `src/` unntatt `src/app/` fremfor å vedlikeholde en liste over dagens importer; nye delte kildemapper følger dermed med. Ingen node_modules, .env eller andre rotfiler kopieres; bare serverens oppstartsskript og en minimal package.json legges til.
- Ny test starter faktisk RAG fra kopien uten watch på tilfeldig port og krever HTTP 200 fra `/health` med modellgenerering av. Server og midlertidig mappe ryddes også ved feil. Testen inngår i eksisterende `pnpm test:rag`.
- Gjennomgått chatdiffen som allerede ligger i `46f449e`, inkludert parser, grafemvalidering, 64 KiB-grense, demo-import, tester og dokumentasjon. De to tidligere loggoppføringene dekker den. Skillversjon 0.6.0 er tilsiktet og bekreftet i Skills-repoets metadata. Beholder denne commiten som chatleveransen; ingen omskriving av historikk.
- Oppdatert README, utviklingsplan og [testrapport](docs/rag/2026-11-11/content-sync.md). Funksjonsregisteret er gjennomgått og beholdt: dette retter en utviklingskontroll, uten ny brukerfunksjon eller endret modenhet. P1–P10 er fortsatt åpne.
- Kontroller: `pnpm test:content-sync` og `pnpm test:rag` **133/133** bestått på Node 24.22.1; `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestått. Ingen ekte modell, priskilde, ny Docker-/Node 22-kjøring eller nytt bygg. Ingen push eller publisering.

### 11. november 2026 – samlet avstemming av plan, funksjonsregister og versjonslogg

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Avstemt leveransestatus mot kode, logghistorikk og daterte kontrollresultater. Planen skiller nå siste lokale 132-testgrunnlag på Node 24 fra Node 22-kjøringene med 119 og 105 tester på eldre revisjoner. Nyere chatendringer er ikke fremstilt som Linux- eller tilgjengelighetsverifisert.
- Tatt med cookie-/samtykkeskill, Oversikt og nyere RAG-rettinger i sammendraget. Merket tidligere tilgjengelighetsrestlister som historikk; gjeldende grunnlag har åtte uavklarte krav og ni rettede funn, uten samlet samsvarsvurdering. P1–P10 og krav om lukket pilot videreføres.
- Presisert i funksjonsregisteret at virkelig modelltilkobling ikke er verifisert og at kontrolltid alene ikke utløser prisforslag. Rettet katalogens foreldede skill-versjon fra 0.5.1 til 0.6.0 etter kontroll mot metadata i lokalt Skills-repo. Ingen endring i Skills-repoet eller modenhetsstatusene.
- Kontroller ved denne avstemmingen: `node --test tests/features.test.ts tests/rag.test.ts` **48/48**, `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestått. Ingen ny modell-, pris-, Docker-, bygg- eller tilgjengelighetskjøring; tidligere kontroller beholder dato og omfang. Ingen commit eller publisering.

### 11. november 2026 – rettet chatsvar, grafemlengde og demo-import

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Flyttet svarparsing til ren parseAnswer-funksjon med blokker og inline-deler. Nummererte punkter slås sammen over tomme linjer, eksplisitt start/nummerhopp og fortsettelseslinjer bevares. Kildehenvisninger i fet tekst blir lenker; ukjente numre og modellens HTML/URL-er forblir tekst. Ingen React-testbibliotek eller nye avhengigheter.
- Felles validering teller grafemer med Intl.Segmenter på klient/server. Fjernet native UTF-16-maxLength og bruker kontrollert grafemgrense på 1000, med støtte for IME-komposisjon. To emoji avvises som for kort; 1000 sammensatte emoji godtas uten oppdeling. Økt HTTP-grense fra 8192 til 65536 byte, slik at 1000 familie-emoji passer; ekstreme kombinasjonssekvenser møter fortsatt en separat bytegrense. Eksisterende HTTP-grensetester bruker nå den nye grensekonstanten, med samme testhensikt.
- Retrieval lastes med await import bare i demo, bak byggkonstant. Serverbyggets klient-JavaScript mangler de kontrollerte retrieval-/kildemarkørene; Pages-bygget har dem som positiv motprøve. Offentlig kataloginnhold er fortsatt nødvendig klientdata. Demolastefeil får forståelig melding uten feil API-kall.
- Kort visuell kontroll i nettleseren på produksjonsbygg med simulert modell: liste 1/2 og senere 4, fortsettelse i samme punkt, lenke inne i strong, [99]/HTML-lignende tekst som tekst og korrekt grafemgrense. Ingen ekte modell brukt; IME er implementert, ikke manuelt prøvd. Skjermbilde, DOM-bevis og byggkontroller er lagret med [testrapport](docs/rag/2026-11-11/chat-client.md). Alle testprosesser er stoppet; vanlig serverbygg er gjenopprettet uten testport etter Pages-/visuell prøve.
- Oppdatert README, arkitektur, funksjonsregister og utviklingsplan. Kontroller: pnpm test:rag **132/132**, pnpm typecheck, pnpm build, pnpm build:pages, pnpm format:check og git diff --check bestått. Ingen ny Docker/Node 22-kjøring eller full tilgjengelighetsvurdering. Ingen prisdata, commit eller publisering.

### 11. november 2026 – RAG-frister og avbrudd testet i Docker/Linux med Node 22

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Testet commit `7ebbab3` med Node 22.18.0 / Undici 6.21.2 og Next 16.4.3 på Debian/Linux arm64. Hele Node-pakken bestod **119/119**. De 23 HTTP-/proxy-/livsløpstestene ble gjentatt i 20 nye prosesskjøringer: **460/460**, uten feil eller hoppede tester. Dekker samtidighetsgrense, 429 med kilder, avbrudd, frigjøring av kapasitet og 502 med kilder for begge modelladaptere.
- Verifisert faktiske produksjonsfrister 60/65/70 s med simulert modelltransport gjennom klientfunksjonen, Next-proxy og RAG-HTTP: simulert Ollama-svar ga HTTP 200 etter **35 029 ms**; et simulert eksternt 90 s-kall ble avbrutt og ga JSON 502 etter **60 017 ms**, med tre bevarte kilder. Etterfølgende kall ga 200 i begge tilfeller. Ingen ekte modellgenerering eller leverandørstopp påstås.
- Kontrollcontainerne hadde deaktivert nettverk og skrivebeskyttet rotfilsystem. Eksisterende låste Linux-avhengigheter ble gjenbrukt uten installasjon/endring. Første pnpm-omslag ble blokkert av SQLite-skriving i skrivebeskyttet lager; identisk underliggende Node-testkommando ble deretter kjørt direkte og bestod. Første feilutskrift og alle resultater er bevart.
- Oppdatert [testrapporten](docs/rag/2026-11-10/lifecycle.md) og fase 5s kontrollgrunnlag. Råresultater, tidsmålinger, kjøreskript, bildeidentitet og kildehash er lagret i `docs/rag/2026-11-11/node22-lifecycle/`. Kontrollsummer bekrefter uendret package.json, låsefil og pris-snapshot. Testservere er lukket og containere fjernet; eksisterende tjenester er ikke endret.
- Lokal `pnpm format:check` og `git diff --check` er kontrollert. Ingen ny typekontroll, produksjonsbygg eller Docker-rewrite-byggprøve er utført; tidligere kontroller beholder opprinnelig omfang/dato. Ingen ekte modell, priskilde, GitHub, produktkode-/avhengighetsendring, commit eller publisering. Beta-status og produksjonskrav videreføres.

### 10. november 2026 – samordnede RAG-frister, avbrudd og modellkapasitet

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet 30 s proxydefault i installert Next 16.4.3-kode mot 60 s modell og 70 s klient. Fem førtester av signal/kapasitet, ikke-JSON, Ollama-sti og trimming feilet mot gammel kode. Lest installert dokumentasjon, konfigurasjonsschema, runtime og manifestkode før next.config.ts ble endret.
- Samlet felles miljøfritt tidsbudsjett (modell/proxy/klient 60/65/70 s), reeksportert av serverkonfigurasjonen; klienten importerer ingen servervariabler/secrets. Satt verifisert experimental.proxyTimeout eksplisitt. Avbrudd videresendes fra lukket klient/proxy via tjenesten til fetch med AbortSignal.any. Lokal kapasitet frigjøres i finally også ved timeout eller adapter som ignorerer avbrudd.
- Erstattet busy med konfigurert modellkapasitet RAG_MAX_CONCURRENT (1–8, standard 1), per prosess uten kø. Full kapasitet gir 429 med kilder; modelltimeout gir 502 med kilder. Klienten gir forståelig feil ved ikke-JSON, beholder validerte kilder og avbryter ved avmontering. Ollama-svar trimmes; sti/query/fragment i OLLAMA_URL avvises ved oppstart.
- Bekreftet rewrite-antakelsen med faktisk produksjonsbygg og Next start mot to simulerte backender: byggport A traff A selv med annen runtime-port B (A=1/B=0). RAG_PORT ved bygg må samsvare med faktisk tjenesteport. Alle testprosesser er stoppet, og et vanlig bygg uten testport er kjørt etterpå. Ingen ekte modell eller priskilde er brukt.
- Oppdatert README, .env.example, arkitektur, funksjonsregister og utviklingsplan. Bevis og [testrapport](docs/rag/2026-11-10/lifecycle.md) beskriver omfang og begrensninger; ingen produksjonsgodkjenning, leverandørberegningsstopp eller ny Node 22/Docker-verifisering påstås. Tidligere rapporter bevares.
- Kontroller: `pnpm test:rag` **119/119**, `pnpm typecheck`, `pnpm build`, `pnpm format:check` og `git diff --check` bestått. Testene bruker korte frister/simulert transport, samt faktisk lokal Next-proxy; ingen ende-til-ende-prøve mot en ekte modell. Ingen nye avhengigheter, prisdata, commit eller publisering.

### 10. november 2026 – full testpakke og produksjonsbygg i Linux med Node 22

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Verifisert Git-revisjon `e6b5b42` i separat Docker/Linux arm64-bilde med Node 22.18.0, pnpm 11.25.0, TypeScript 5.9.3 og Next.js 16.4.3. Låste Linux-avhengigheter ble installert med frozen-lockfile og deaktiverte livssyklusskript; ingen .env, secrets eller verts-cache ble brukt.
- Kjørte alle kontrollene uten nettverk: **105/105 Node-tester** (inkludert 19 pristester), **3/3 Python-tester**, faktisk innholdssynk i isolert kopi, Next-typegenerering, **pnpm typecheck** og **pnpm build** bestod. Produksjonsbygget genererte 27/27 byggsider. Testene brukte fixtures/mocktransport/lokal loopback; ingen priskilder, modellleverandør eller GitHub ble kontaktet.
- Kontrollsummene bekrefter uendret package.json, pnpm-lock.yaml og pris-snapshot før/etter. Klargjøringen brukte Debian og pakkeregister, mens selve kontrollcontaineren hadde deaktivert nettverk og ingen publiserte porter. Containeren ble fjernet etterpå; eksisterende apptjenester ble ikke endret.
- Oppdatert [testrapporten](docs/priser/TESTRAPPORT.md), README og utviklingsplanens aktuelle kontrollgrunnlag. Utskrifter, manifest, versjoner, bildeidentitet, Dockerfile og kjøreoppsett ligger i `docs/priser/2026-11-10/node22-linux-full/`. Ingen produktkode eller avhengighet er endret; Beta-status og alle produksjonskrav videreføres. Verken Pages-bygg, utrulling, faktisk GitHub-jobb eller ny nettleser-/tilgjengelighetsskanning er utført.
- Lokal `pnpm format:check` og `git diff --check` er kontrollert. Ingen nye prisdata, commit eller publisering.

### 10. november 2026 – prisretting testet med Node 22 i Docker/Linux

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Testet commit `e4e580a` med faktisk Node 22.18.0 på Debian 12/Linux arm64, Git 2.39.5 og Bash 5.2.15. Alle **19/19 pristester** bestod, inkludert filflyt og workflowens faktiske shell mot lokalt bare-repo og simulert gh.
- Testcontaineren hadde deaktivert nettverk, skrivebeskyttet kode/rotfilsystem og ingen `.env`, secrets eller virkelige prisdata montert. Kun eksisterende fixtures ble brukt; ingen nettverkskall til priskilder eller GitHub. Git ble installert fra Debian i et separat testbilde før offline-kjøringen. Ingen prosjektavhengighet eller produktkode er endret.
- Første kjøring ga 18/19 fordi Docker sin midlertidige /tmp ikke tillot kjøring av gh-stubben. Retest av uendret kode med exec på tmpfs ga 19/19; begge utskrifter er bevart. Testcontaineren er fjernet, og ingen appcontainer ble endret.
- Opprettet [testrapport for prisinnhentingen](docs/priser/TESTRAPPORT.md), med raw-resultater, runtime-/bildeidentitet, manifest, Dockerfile og kjøreskript i `docs/priser/2026-11-10/node22-linux/`. README peker til rapporten. Virkelig GitHub-jobb, AMD64, live prisdata og utrulling er fortsatt ikke verifisert; funksjonsregister, Beta-status og produksjonskrav videreføres.
- Kontroller: 19/19 i Linux/Node 22, lokal `pnpm format:check` og `git diff --check`. Prosjektets snapshot.json er uendret. Hele RAG-pakken, TypeScript og produksjonsbygg er ikke kjørt på nytt i denne dokumentasjonsoppfølgingen. Ingen commit eller publisering.

### 10. november 2026 – robust prisinnhenting og én fast pris-PR

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet med fixtures at like rader likevel endrer snapshot når kontrolltidene endres. Førtester av ekstratall, manglende siste linjeskift og escapede pipes feilet på gammel parser. Ingen nettverkskall eller faktisk `pricing:sync` mot leverandørkilder er utført.
- Skilt innholdsendring fra kontrolltid: rader, kildemetadata, status og feil teller; checkedAt/attemptedAt alene gjør ikke det. Workflowen vedlikeholder én reservert gren `codex/pricing-sync`, oppdaterer samme PR ved endret innhold og lar et likt forslag stå urørt. Et foreldet forslag lukkes dersom kildene igjen samsvarer med standardgrenen. Lease-beskyttet push, `persist-credentials: false` og bare contents/pull-requests-rettigheter i samme repo beholdes. Ingen automatisk sammenslåing/utrulling.
- Eksportert testbar `main()` med filstier, fetcher og tidspunkt som parametre. Validerer loggens eksakte `## Ikke utgitt` før snapshot/tempfiler skrives. Automatisk oppføring legges som underoverskrift i seksjonen med dato, utførende skript, kontroll og begrensninger. Tidligere logghistorikk er bevart; ingen ny automatisk toppnivåoverskrift.
- Strammet inn money(): løse ekstratall og feil tusengruppering avvises. Fixture-kilden viser markør 2 etter MTok i Claudes cache-kolonne; bare dette kjente formatet støttes der, ikke generelt i money(). Tabellenes sluttrad beholdes uten sluttlinjeskift, CRLF og escapede pipes støttes, og ulikt celleantall gir nøytral feil.
- Oppdatert README, funksjonsregister og utviklingsplan. Forklart at kontrolltid på nettsiden kan bli gammel når bare tidspunkter endres i Actions; det opprettes ikke en PR bare for å fornye dato. Beta og gjenstående GitHub-/produksjonsverifisering beholdes.
- Kontroller: `pnpm test:pricing` 19/19, `pnpm test:rag` 105/105, `pnpm format:check` og `git diff --check` bestått. PR-stegets faktiske shell er testet med lokalt bare-repo og simulert gh: ett forslag opprettes, datostøy gir ingen push, ny pris oppdaterer samme forslag, og tilbakeføring lukker det. Ingen leverandørtekst i feil og ingen nye prisdata i prosjektets snapshot. Workflowen er ikke kjørt på GitHub. Ingen commit eller publisering.

## Ikke utgitt – HTTP-retting verifisert i Docker/Linux med Node 22 – 10. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Testet HTTP-rettingen i faktisk Docker/Linux med Node 22.18.0 / Undici 6.21.2, Debian 12 og arm64. Offisielt Node-bilde låst med digest; kode fra Git-snapshot `8aa422f` med uendret HTTP-implementasjon fra `2e5411a`. Docker Desktop måtte startes. Testcontaineren hadde ingen publiserte porter eller ekstern nettverkstilgang, og kun en skrivebeskyttet kodekopi uten `.env`, secrets eller installerte prosjektavhengigheter.
- Alle **9/9 HTTP-/konfigurasjonstester** bestod. Samme stressforløp som på macOS, på tre isolerte servere: **300/300** 2 MB-kropper ga 413 med Connection: close og **1200/1200** etterfølgende fetch-kall ga 200. 150 Content-Length- og 150 chunked-opplastinger; også 300/300 vellykkede oppvarmingskall. **Ingen ECONNRESET, EPIPE eller andre forespørselsfeil**, og ingen automatisk retry lagt til. Alle servere ble lukket; containeren ble automatisk fjernet og fraværet kontrollert.
- Oppdatert [testrapporten](docs/rag/2026-11-10/http-grense.md) og lagret originalutskrifter, JSON-resultater, runtime-/bildeidentitet, manifest og containerens kjøreskript i `docs/rag/2026-11-10/node22-linux-http/`. Den gamle implementasjonen, AMD64, andre patchversjoner, samtidighet og produksjonsproxy er ikke testet. Hele 94-testpakken, TypeScript og API-skriptet er ikke kjørt på nytt i Linux.
- Formatering og `git diff --check` er kontrollert lokalt. Ingen produkt- eller avhengighetsendring; funksjonsregister, Beta-status og produksjonskrav videreføres. Ingen eksisterende appcontainer ble stoppet eller rekonfigurert. Ingen commit eller publisering.

## Ikke utgitt – HTTP-retting verifisert med Node 22 – 10. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Testet rettingen i commit `2e5411a` med faktisk Node 22.18.0 / Undici 6.21.2 på macOS arm64. Hentet offisiell binærpakke til midlertidig mappe og verifisert SHA-256 mot Node-distribusjonens sjekksum. Ingen endring i systemets Node eller prosjektets avhengigheter.
- Hele testkommandoen bak `pnpm test:rag`, kjørt direkte med Node 22, bestod: **94/94**, inkludert de ni HTTP-/konfigurasjonstestene. Utvidet stresstest på tre isolerte servere: **300/300** 2 MB-kropper ga 413 med Connection: close, **1200/1200** etterfølgende fetch-kall og 300/300 oppvarmingskall ga 200. Halvparten av opplastingene brukte Content-Length og halvparten chunked. **Ingen ECONNRESET, EPIPE eller andre forespørselsfeil**. Alle testservere ble lukket.
- Oppdatert [testrapporten](docs/rag/2026-11-10/http-grense.md) med runtime, omfang, resultattabell og begrensninger. Lagret original testutskrift, gjentakbart stresskript og maskinlesbare resultater i `docs/rag/2026-11-10/node22-http/`.
- Gammel kode er ikke retestet med Node 22; opprinnelig feilreproduksjon på denne versjonen påstås fortsatt ikke. Andre patchversjoner, Docker/Linux, samtidige opplastinger og delt proxy er ikke verifisert. API-kontrollskriptet er ikke kjørt på nytt; tjenesten på port 3001 ble ikke endret. Ingen produktendring; funksjonsregister, Beta-status og produksjonskrav videreføres.
- Dokumentasjonens formatering og `git diff --check` er kontrollert. Ingen commit eller publisering.

## Ikke utgitt – rettet HTTP-grense for RAG – 10. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Skrev og kjørte førtester mot uendret produktkode: konfigurerte dev-/delte origins ga 403, `Application/JSON` ga 415, og både søkefeil og kast fra `service.ask` ga 400. Tre 2 MB-kropper ga 413 med feilaktig keep-alive, men ECONNRESET ble ikke reprodusert: alle tolv etterfølgende kall lyktes på tilgjengelig Node 24.22.1. Node 22 er ikke testet; ingen påstand om bekreftet reset-retting. Se [før-/etter-rapport](docs/rag/2026-11-10/http-grense.md).
- Lagt til servervariabelen `RAG_ALLOWED_ORIGINS` med validering ved oppstart og dagens to loopback-origins som standard. Oppstartsskriptet sender listen til HTTP-serveren. En eksplisitt liste erstatter standardene; tomme/ugyldige elementer avvises. Ingen `NEXT_PUBLIC_`-variabel eller serverkonfigurasjon i offentlig funksjonsregister.
- JSON-medietype sammenlignes uten hensyn til bokstavstørrelse/parametre. Beholdt 400/413/415 for klientfeil og skilt uventede søke-/tjenestefeil til nøytral 500 uten interne detaljer. Modelladapterens eksisterende feilsvar beholdes.
- For høy Content-Length avvises før buffering; chunked kropp har fortsatt bytegrense. 413 sendes straks med Connection: close og kontrollert forkasting/lukking innen ett sekund. Strømiteratoren ødelegger ikke socketen ved tidlig retur. Første forsøk med umiddelbar lukking ga EPIPE i testen; rettet variant består 2 MB- og etterfølgende forespørsler.
- Oppdatert `.env.example`, README, arkitekturens testforutsetninger, funksjonsregister og fase 5/P3. Tillatte origins er lokalt implementert, mens faktisk delt HTTPS-drift, intern ruting, autorisering og produksjonsgodkjenning gjenstår. Beta-status beholdes.
- Kontroller: `pnpm test:rag` 94/94, `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestått. Ni nye tester, inkludert HTTP-kontroller på midlertidige loopback-servere med opprydding. API-kontrollskriptet bestod mot eksisterende tjeneste på 3001; revisjonen der er ikke verifisert. Separat oppstart på samme port ga EADDRINUSE; eksisterende tjeneste ble ikke endret. Ingen ny avhengighet, commit eller publisering.

## Ikke utgitt – rettet relevans i RAG-kildesøket – 10. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Bekreftet de fire innmeldte relevansfeilene med faktisk `retrieve()` før produktendring. Lagt til et fast evalueringssett med 26 spørsmål før retting: de fire feilene, eksisterende forventninger og åtte nye realistiske spørsmål. Resultatet gikk fra 20/26 til 26/26 uten endrede forventninger; [hele før-/etter-tabellen og råresultater](docs/rag/2026-11-10/relevans.md) er lagret.
- Prefiks går nå bare fra kildeord til lengre spørsmålsord og krever minst fem tegn. Minstesum to avviser ett svakt brødtekstprefiks; minst åtte tegn gir et sterkere brødteksttreff. Unike spørsmålsord hindrer at gjentakelser omgår terskelen.
- Lik poengsum avgjøres med titteltreff, antall treffende ord og direkte emneangivelse ved linjestart før corpusrekkefølge. Ingen kilde-ID har særbehandling. Fjernet virkningsløse korte stoppord og utvidet med vanlige spørreord/fyllord. NFD-/aksentnormalisering følger ressurskatalogen; æ/ø beholdes, og stoppord normaliseres likt.
- Oppdatert funksjonsregisterets Spør KI-beskrivelse og fase 4 i utviklingsplanen. Beta og gjenstående pilot-/modellkontroller videreføres. Ingen nye avhengigheter eller endret API-kontrakt; ingen modell/embeddings eller nye sider.
- Kontroller: `pnpm test:rag` 85/85, inkludert seks tester av prefiksretning, terskel, rangering og normalisering. `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestått. Eksisterende tester er beholdt. Avgrenset ordsøk er ikke en generell garanti for semantisk relevans. Ingen commit eller publisering.

## Ikke utgitt – rettet PDF-språk og varsel om gamle prisdata – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.6.0 og PDF-skillen. Ingen underagenter.

- Rettet A11Y-08: PDF-katalogen har nå nb-NO, og 36 feilmerkede norske innholdsspenn er endret fra en-US til nb-NO. Alle 2694 ikke-blanke synlige tegn har korrekt norsk språk. Syv engelske alternativtekster har eksplisitt en. ParentTree og mest lokal BDC-merking er kontrollert; ingen faktisk opplesing påstås.
- Rendret alle syv PDF-sider før/etter ved 120 dpi: null pixelavvik. Tekst/geometri/skrifter/farger/MCID, strukturroller, tittel og tegne-/tekstoperasjoner unntatt Lang er bevart. Tidligere kontrastvurderinger videreføres med ny hash og dokumentert visuell identitet.
- Rettet A11Y-09: fjernet timeintervallet fra PricingFreshness. Alder vurderes ved åpning eller nytt checkedAt-grunnlag, uten tidsstyrt innsetting under lesing. Kontrollert klokke mot ny produksjonseksport: 0 varsler før/etter senere terskelpassering, 6 ved åpning med gamle data og 0 time-callbacks; også prøvd ved 320 px. Ingen endring i systemklokke eller lagrede priser. Funksjonsregisterets beskrivelse er oppdatert; Beta-status beholdes.
- Retestet hero-pause/start og relevante nettleserdeler. A11Y-08/A11Y-09 er lukket; 3.1.1/3.1.2/2.2.2 B → K i lokalt utvalg. **29 K / 11 I / 8 U / 0 B**. Oppdatert brukerrettet erklæring/side, rapporter, README, arbeidsmatrise, latest og utviklingsplan. Bevis, førversjon, verktøy og retester er lagret i `docs/tilgjengelighet/2026-11-10/202101-029e79106a3d/`. Skillens avstemming består; ingen samlet tilgjengelighetsgodkjenning.
- Åtte øvrige krav, faktisk hjelpemiddel-/zoom-/enhetsprøving og P8 er fortsatt åpne. Ingen endring i Skills-repoet, commit eller publisering.

- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Ny native-kjøring `203306-native-1c441fbd`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu 0 feil / 207 info-noter. Original motorstatus er bevart. Erklæringen er lest tilbake ved 320/1280 med nøyaktig åtte U-ID-er og ingen kjente åpne brudd. Bevisreferanser, lokale dokumentlenker, dokumentavstemming, formatering og Git-diff er kontrollert. Den midlertidige testfanen/serveren er lukket/stoppet og viewport er gjenopprettet.

## Ikke utgitt – lokal oppfølging med tilgjengelighetsskill 0.6.0 – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.6.0 og PDF-skillen. Ingen underagenter.

- Kjørt oppdatert skill med faktisk testmulighetskartlegging, avslutningsvilkår for alle 48 krav, nettlesermodul, `--auto` og ny axe/Nu-kjøring. Gjennomført 65 fokussnapshots og målrettede tastatur-/statusforløp i katalog, dialog, chatside, kilder og seks pristabeller. 2.4.3 og 2.4.7 U → K i oppgitt lokalt utvalg; faktisk zoom/skjermleser er ikke påstått utført.
- Bekreftet A11Y-08: PDF-ens norske hovedinnhold har engelsk katalogspråk, og 709 av 2694 ikke-blanke synlige tegn ligger i eksplisitt engelske spenn på side 4–6. Uavhengig ParentTree-oppslag og mest lokal BDC-merking er sammenholdt med synlig norsk tekst. 3.1.1 og 3.1.2 U → B. PDF uendret; ingen uttaletest er oppfunnet.
- Bekreftet A11Y-09: uendret priskomponent setter automatisk inn seks varsler uten pause/skjul/frekvenskontroll ved passert terskel. Kontrollert klokke og reelle time-callbacks er prøvd i isolert eksport, uten endring av produktkilde/systemklokke. 2.2.2 U → B; hero-pause vedvarer etter fokusflytting og består separat.
- Oppdatert kort brukerrettet erklæring/side med tre bruddkrav og åtte uavklarte krav. Oppdatert rapporter, gjeldende oppsummering, arbeidsmatrise/restplan, README, utviklingsplan og latest. Samlet **26 K / 11 I / 8 U / 3 B**. Funn/rettingsforslag, bevis og konkret bistand er lagret i `docs/tilgjengelighet/2026-11-10/193339-7e408d0c78ed/`. Ingen funksjons-/PDF-retting er utført i dette testoppdraget.
- Den nye avstemmingen fanget en feil i første Markdown-sammenstilling og gamle brudd på retesthenvisninger; dette er rettet i den nye vurderingen, med datert originalgrunnlag og normalisert skjema. Avstemmingen består uten omskriving av råmotorstatus eller gamle kjøringer. Faktisk native Chrome-tilgang ble blokkert av manglende Computer Use-tillatelse. Zoom, skjermleser/PDF-leser, fysisk rotasjon og OS-innstilling er ikke gjennomført. Ingen endring i Skills-repoet, commit eller publisering.

- Sluttverifisering: 53 Node-tester og tre Python-tester bestod, sammen med Pages-produksjonsbygg/TypeScript/ruteregister og HTML-grunnkontroll av 25 filer. Ny native-kjøring `195227-native-1d4e7aee`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu 0 feil / 207 info-noter. Rendrert erklæring viser nøyaktig tre B-krav og åtte U-krav ved 320/1280 uten overflyt. PDF og funksjonskomponentene er identiske med HEAD. Formatering, Git-diff og lokale bevis-/dokumentlenker er kontrollert. Testfanen er lukket, viewport gjenopprettet og den isolerte loopback-serveren stoppet.

## Ikke utgitt – fullført lokal 1.4.11-vurdering – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.1 og PDF-skillen. Ingen underagenter.

- Vurdert nødvendig grafikk/kontrollmarkeringer i dagens portal og alle syv PDF-sider mot kontrollerte Uu-/W3C-kilder. Klassifisert alle 157 PDF-primitiver med begrunnelse; 19 nødvendige/konservativt prøvde deler minst 4,191671:1. Syv svake perifere ellipseomriss er supplerende innramming etter konkret informasjonsvurdering. PDF uendret; ingen blanket dekor-/Alt-fritak eller påstått skjermleserprøve.
- Funnet og rettet A11Y-07: MUI-filterets 0,25s bakgrunns-/fargeovergang svekket valgtmarkering og tekst. Førmålinger/funn bevares. Filtertekst og valgt bakgrunn skifter nå samtidig; 16 umiddelbare tastatur-/pekerretester ved 1280/320 gir minst 10,922731:1 for valgt flate og 12,538164:1 for tekst. Stabil palett og forsideanimasjon er beholdt. Funksjonsregisterets katalogbeskrivelse er oppdatert; Beta-status er uendret.
- Øvrige prøvde nødvendige markeringer minst 3,392300:1, med faktiske hover/fokus/feil/valg, tre kilde- og seks prismarkører og seks tabellfokus. Visuelt aria-hidden feltgrenser er eksplisitt målt etter at en generell DOM-filterregel utelot dem. Kombinert råfil bevarer 32 før- og to ekstra etter-tilstander; dette presenteres ikke som 34 feilfrie etter-retting-tilstander.
- Lagret vurdert 48-matrise/testplan/restliste, klassifiseringer, målrettede beregnere, funn/retest og PDF-/nettleserbevis i `docs/tilgjengelighet/2026-11-10/160352-a02d77cb2734/`. Oppdatert latest, rapporter, README, utviklingsplan, erklæring/portalside. **1.4.11 U → K i lokalt utvalg; 24 K / 11 I / 13 U / 0 B.** 1.4.3 K beholdes med ny filterretest. Samlet samsvar og øvrig hjelpemiddel/zoom/PDF-semantikk/pilot er fortsatt uavklart. Ingen endring i Skills-repoet eller publisering.

- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Ny avsluttende native-kjøring `162215-native-1eb13e38`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu gir 0 feil / 207 tekniske info-noter om avsluttende skråstrek. Original motorstatus er bevart. Erklæringen er lest tilbake ved 1280/320 uten overflyt med nøyaktig de 13 U-ID-ene fra matrisen. PDF-en er identisk med HEAD. Lokale dokumentlenker, formatering og Git-diff er kontrollert.

## Ikke utgitt – interaktive kontrasttilstander og PDF – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.1 og PDF-skillen. Ingen underagenter.

- Undersøkt 23 faktiske UI-tilstander / 694 tekstmålinger, med verifisert :hover, filtervalg, placeholder-alpha, tomt søk/nullstilling, dialog-/sidechat, åpne kilder, validering og seks åpne prisvilkår. Aktuelle tekster har minst 5,209084:1. Eneste svakere måling gjelder native disabled Tøm chat under lasting; aktiv status-/feiltekst er ikke unntatt. Kontrollert 20-sekunders last-/feilrespons i eksisterende adapter er fjernet byte for byte; dette er ikke en test av faktisk nettverksbrudd eller ekstern modell.
- Rendret og visuelt undersøkt alle syv PDF-sider ved 120 dpi. Alle 2694 synlige ikke-blanke tegn målt mot riktig opaque fill og bakgrunn bekreftet i render; minst 4,932072:1. PDF-en er uendret. Første feilaktige valg av underliggende hvit bakgrunn ble avvist ved pixelkontroll og er bevart med forklaring; ingen dokumentfeil ble påstått fra denne beregningen.
- 27 representative feltkant-/ikon-/fokusmålinger gir minst 3,421389:1. MUI-ripplehypotese er avvist som ikke gjeldende: installert tema har disableRipple og DOM ingen ripple-røtter. Ingen hypotetisk effekt er registrert som brudd. Ingen nye bekreftede avvik eller design-/PDF-retting nødvendig.
- Lagret ny vurdert matrise/testplan/restliste, råstiler/beregnere, PDF-tegn-/renderbevis og rapport i `docs/tilgjengelighet/2026-11-10/145250-bd1373c8699b/`. Oppdatert latest, WCAG-/kvalitetskontroll, README, utviklingsplan og offentlig erklæring/side. 1.4.3 U → K i lokalt utvalg: **23 K / 11 I / 14 U / 0 B**. Full 1.4.11-klassifisering, faktisk hjelpemiddel/zoom/enhet/pilot og samlet samsvar er fortsatt uavklart. Ingen endring i Skills-repoet, commit eller publisering.

- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Ny avsluttende native-kjøring `150658-native-bf6961aa`: 23 ruter / 0 axe-violations / 3 incomplete-grupper / samme 86 noder, og 0 Nu-feil / 207 info-noter. Original motorstatus er bevart. Erklæringen er lest tilbake ved 1280/320 uten overflyt, med 14 U-ID-er avstemt mot matrisen. Adapter/PDF/fargestiler er uendret mot HEAD; lokale lenker, formatering og Git-diff er kontrollert.

## Ikke utgitt – vurdering av 86 kontrastforekomster – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.1. Ingen underagenter.

- Undersøkt alle 86 opprinnelige axe-incomplete-targets entydig i lokal produksjonseksport ved 1280/320 px. Dokumentert faktisk forgrunn, font, bakgrunnslag, gradient/alpha, pseudo-geometri og tekstglød; konservativ beregnet sRGB-grense minst 7,715057:1. 22 kontroller er faktisk fokusert med tastatur og målt på nytt, minst 8,655854:1. Ingen bekreftet kontrastfeil i prøvde tilstander, ingen designretting nødvendig. Ingen produktfarger eller effekter er endret.
- Kjørt skillens nettlesermodul på tre sider: ni viewport-prøver, 24 Tab-steg og Enter-pauseforløp, uten kandidater. Ny native axe på 23 ruter: 0 violations / samme 3 incomplete-grupper / 86 noder. Nu på 25 HTML-filer: 0 feil / 207 tekniske info-noter. `run_checks.py --auto` er kjørt med faktisk nettleserdata og original forside-axe; flersideskannet er separat vurdert. Motorenes incomplete-/exitstatus er bevart, ikke omskrevet til pass.
- Lagret ny vurdert 48-kravsmatrise, testplan, restliste, per-forekomsttabell, råstiler, reproduserbar beregner, skjermbilder og rapport i `docs/tilgjengelighet/2026-11-10/135417-d3e318e119fd/`. Første ufullstendige dev-selektorkartlegging og forklaring av sandbox-blokkert serveroppstart er bevart; autorisert localhost-server ga nøyaktig ett treff per produksjonselement. Oppdatert latest-peker, WCAG-/kvalitetskontroll, README, utviklingsplan og kort erklæring/portalside.
- 22 K / 11 I / 15 U / 0 B og uavklart samlet samsvar videreføres. De 86 normalforekomstene er undersøkt; øvrige faktiske hover-/dynamiske effekter og PDF-kontrast gjenstår under 1.4.3. Modellgrenser er ikke eksakt pixelmåling eller hjelpemiddel-/zoom-/produksjonsgodkjenning. Tidligere funn/rettinger bevares. Ingen endring i Skills-repoet, commit eller publisering.

- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Første bygg fant at en arkivert TypeScript-kildekopi ble typekontrollert; arkivkopiene fikk .txt-suffiks, og nytt bygg bestod uten endring i produktlogikk. Erklæringen er lest tilbake ved 1280/320 px, 15 U-ID-er og 86 rapportlinjer er avstemt, og lokale dokument-/evidenslenker, formatering og Git-diff er kontrollert.

## Ikke utgitt – tilgjengelighetskontroll av cookie-sider – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.1. Ingen underagenter.

- Kjørt skillens nettlesermodul og `run_checks.py --auto` på cookie-siden og den nye cookie-skill-detaljsiden. Seks viewport-prøver, to Enter-forløp, 16 automatiske Tab-steg, 72 kontrollerte frem-/tilbake-Tab-overganger med hopp til innhold og fire tekstavstandsprøver ved 320/1280 px. Ingen ny bekreftet åpen feil. Test-CSS er tilbakeført byte for byte. Første for lange Tab-kjøring feilet teknisk; råfeil, vellykket kortere kjøring og separat full gjennomgang er bevart.
- Ny lokal axe-regresjon på 23 ruter: 0 violations / 3 incomplete-grupper / 86 nodeforekomster. Begge nye sider har 0 violations og 0 incomplete. Nu på 25 HTML-filer: 0 feil / 207 info-noter om avsluttende skråstrek. Tidligere modell for 80 gradientforekomster er historisk delbevis og brukes ikke som automatisk godkjenning av det utvidede utvalget.
- Lagret vurdert grunnlag i `docs/tilgjengelighet/2026-11-10/133024-18e0f9e56386/`, med uendret originalmanifest, raw/initial-filer, vurdert 48-kravsmatrise/testplan, nye bevis, rapport og restliste. Oppdatert latest-peker, erklæringen/portalsiden, README, WCAG-kontroll, kvalitetskontroll og utviklingsplan. Tidligere rapporter/rettede funn er bevart med dato/omfang.
- 22 K / 11 I / 15 U / 0 B og uavklart samlet samsvar videreføres. Faktisk skjermleser, 200/400 % zoom, fysisk enhet, videre faglig vurdering og produksjon er ikke testet nå. Ingen banner finnes og ingen bannerkontroll påstås. Ingen produktrettinger, endringer i Skills-repoet, commit eller publisering.

- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 eksportfiler bestod. Erklæringen er lest tilbake ved 1280/320 px uten sideoverflyt; kravlisten er avstemt mot 15 U-rader. Lokale dokument-/evidenslenker, CSS-gjenoppretting, formatering og Git-diff er kontrollert.

## Ikke utgitt – selvstendig cookie-skill og cookie-side – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator` og den nye `informasjonskapsler-og-samtykke` 0.1.0. Ingen underagenter.

- Opprettet selvstendig skill i Skills-repoet og installert kopi, med egne kilder, kartleggingsveiledning, erklæringsmal, Python-kilde-/HTTP-kontroll og valgfri lokal metadata-probe. Ingen andre skills eller tidligere rapporter kreves. Bibliotekets README og versjonslogg er oppdatert separat.
- Brukt skillens faktiske verktøy og probe på portalen: 27 nettlesersnapshots på 21 eksisterende sider/tilstander og 21 anonyme dokumentresponser (20 HTTP 200, én 404). Ingen oppføringer i fem undersøkte lagertyper eller Set-Cookie-headere; ingen eksterne ressurs-/script-/iframe-origins i utvalget. Syntetisk chatspørsmål ga kildebasert svar uten modell og en lokal API-request. MUI-temalagringsstøtte er kildeundersøkt, uten observerte persistente nøkler. Ingen lagringsverdier eller hemmeligheter er lagret.
- Beslutning: ikke påvist behov for banner i testet lokalt omfang; ingen banner er implementert. Produksjon/auth/proxy/CDN/tredjeparts-/fullstendig nettverksinnsyn er uavklart. Ingen global «cookie-fri» eller juridisk godkjenning er påstått. Første sandbox-blokkerte HTTP-forsøk og redirect-delkjøring er bevart; faktisk oppfølging bruker observerte dokumentstier.
- Lagret vurdert grunnlag i `docs/informasjonskapsler/2026-11-10/121354-92b5bf52/`, med inventar, redigerte rådata, rapport og bannerbeslutning. Midlertidig probe ble fjernet med identisk gjenoppretting av layout før permanente produktendringer. Daterte tilgjengelighets-/personvernresultater er bevart.
- Lagt til `/informasjonskapsler/` med footerlenke, felles innhold for nettside/Spør KI, automatisk registrering i funksjons-/sideoversikten og ny selvstendig Beta-skill i katalogen. Oppdatert personvernkryssreferanse, Markdown-utdrag, README og utviklingsplan. Nye sider må også inngå i neste brede tilgjengelighetskontroll; dette er ikke en full ny WCAG-vurdering.

- Rettet integrasjonen med Spør KI ved å tillate den konkrete cookie-ruten i RAG-kontrakten. Første testkjøring fant tre feil knyttet til rutelisten; etter retting bestod 53 portaltester, inkludert regresjon for cookie-kilden og fortsatt avvisning av ukjente ruter. Ordlyden i kildens overskrift gjør at vanlige spørsmål om cookies/banner finner riktig side først. Ingen generell åpning av URL-valideringen.
- Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 eksportfiler bestod. Begge nye sider er lest tilbake ved 1280/320 px uten sideoverflyt eller probe. Footer, katalogsøk/Beta-detaljer og faktisk Spør KI-svar er verifisert. Skillens 45 Python-/åtte Node-tester bestod, og isolert pakke med bare egne filer bestod ti Python-/to Node-prøver og CLI-prøve med forventet delstatus. Quick_validate kunne ikke starte uten PyYAML; dette er dokumentert. Daterte cookie-bevis er unntatt fra Prettier for å bevare originaldata; rot-/produktdokumenter formateres fortsatt.

## Ikke utgitt – avklaringsplan for 15 tilgjengelighetskrav – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.1. Ingen underagenter.

- Oppdatert `docs/tilgjengelighet/WCAG-KONTROLL.md` med konkrete forutsetninger og kravvis plan for alle 15 U-krav: kompetanse, skjermleser-/nettleser-/mobil-/PDF-/kontrastoppsett, handlinger, forventet resultat og nødvendig dokumentasjon. Skilt lokale undersøkelser, faglige vurderinger og kontroller som trenger beskyttet pilot. Ingen verktøy er installert, ingen systeminnstillinger eller tilganger er endret.
- Beskrevet kriterier for ny vurdering, retest og oppdatering av rapporter/erklæring, med bevarte historiske bevis og uavklart status. Godkjenner/tester er ikke utpekt. Supplerende redusert bevegelse er skilt fra kravet til kontroll over automatisk innhold; støttematrise og verktøyvalg er anbefalinger, ikke et påstått lovpålagt produktvalg.
- Lenket planen fra kvalitetskontroll og fase 3/P8 i utviklingsplanen; rettet dagens skill-versjon i planoversikten til 0.5.1. Testdato, 22 K / 11 I / 15 U / 0 B, `latest.json`, offentlig erklæring og daterte testresultater er uendret. Dette er dokumentasjons-/planarbeid, ikke en ny tilgjengelighetsrevisjon eller produksjonsgodkjenning.

- Kontroll: Alle 15 planlagte krav er avstemt mot U-radene i siste vurderte matrise, med alle fire planfeltene til stede. 34 lokale dokumentlenker er kontrollert. Eksisterende testgrunnlag, latest-peker og erklæring er verifisert uendret mot Git HEAD. Formatering og `git diff --check` er kontrollert. Ingen nettleser-/hjelpemiddel-/produkttester er utført i denne dokumentasjonsoppgaven; ingen nye testresultater påstås.

## Ikke utgitt – kjente brudd og uavklarte krav i erklæringen – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` og `skill-creator`. Ingen underagenter.

- Delt tilgjengelighetserklæringen og portalsiden i «Kjente brudd» og «Forhold som ikke er ferdig vurdert». Alle 15 U-krav fra siste vurderte matrise er listet med ID, tittel og kort brukerforklaring, gruppert etter WCAG-prinsipp. Ingen bekreftede åpne brudd i det undersøkte utvalget; samlet samsvar og faktisk testdato er bevart.
- Lagt sidens offentlige kravsammendrag i `src/content/accessibility.ts`, oppdatert funksjonsbeskrivelse og katalogmetadata til tilgjengelighetsskill 0.5.1. Private rapportfiler importeres ikke i nettsiden. Oppdatert README. Ingen ny full tilgjengelighetsrevisjon eller endring i produksjonsgodkjenning.
- Oppdatert skillens instruksjoner og erklæringsmal, vurderings-/lagringsveiledning, README og versjonslogg i Skills-repoet samt installert kopi. Uavklarte krav holdes tydelig atskilt fra bekreftede brudd; teknisk arbeidshistorikk blir fortsatt i rapportene. Skill-versjonering og kildeindeks er avstemt.

- Verifisering: 52 portaltester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll for 23 eksportfiler bestod. Krav-ID-ene er avstemt mot de 15 U-radene i siste vurderte matrise. Siden er lest tilbake med 15 krav og uten sideoverflyt ved 1280/320 px. Skillens 35 Python- og seks Node-tester bestod; standard quick_validate kunne ikke starte uten PyYAML. Formatering og Git-diff kontrolleres før levering. Testdato/samsvarsstatus og daterte auditresultater er ikke endret; dette er validering av innhold og verktøyversjon, ikke en ny full tilgjengelighetskontroll.

## Ikke utgitt – gjenstående lokale tilgjengelighetskontroller – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.0 og PDF-skillen. Ingen underagenter.

- Gjennomført ny lokal skill-kjøring og målrettet oppfølging i `docs/tilgjengelighet/2026-11-10/094541-e2907a5c27e2/`: 21 sidetilstander, 63 viewport-kontroller, 168 Tab-steg, tre deklarerte forløp og 42 tekstavstandsmålinger. Prøvd null treff/valgt filter, chatfeil/lasting/kildebasert svar/tømming/fokusretur og seks åpne pristabeller med tastaturrulling. Midlertidig CSS er tilbakeført byte for byte. Ingen nye bekreftede åpne brudd; 1.4.12 U → K i prøvd lokalt HTML-utvalg.
- Dokumentert konservative sRGB-bakgrunnsgrenser for alle 80 axe-incomplete-forekomster: minst 8,207:1. Resultatet gjelder lagmodellen, ikke alle faktiske hover/overlagringer eller PDF. Opprinnelige axe-resultater er bevart. Tre CSS-animasjoner er bekreftet paused/running, også pause etter Tab ut. Faktisk prisalderkomponent er prøvd isolert før/ved/etter sju dager og ved gjentatt simulert timekontroll/avmontering; ingen OS-klokkeendring eller permanent komponentendring.
- Kontrollert PDF-struktur og syv eksisterende renderinger ved identisk hash: 61 Figure etter tidligere listeomkoding, ikke det eldre antallet 73. Faktisk skjermleser, effektivt språk, leserekkefølge og full likeverdig diagramformidling er fortsatt uavklart. PDF-en er ikke endret.
- Oppdatert 48-kravsmatrise/testplan, rapporter, restliste, latest-peker, kort brukerrettet erklæring/side, README, kvalitetskontroll og utviklingsplan. Arbeidsstatus 22 K / 11 I / 15 U / 0 B; 34 krav har automatisk delgrunnlag. 36 har bredere rest, 11 ingen utløsende innholdstype og ett fullført lokalt manuelt utvalg. Dette er ikke en samsvarsprosent.
- Begrensninger: Automatisk godkjenningskontroll avviste `cua.getApp('Google Chrome')` («Computer Use was not approved to use Google Chrome»). Ingen omgåelse eller påstått faktisk zoom/hover/OS-preferansetest. Skjermleser, fysisk enhet, videre faglige vurderinger, innlogging, faktisk modell og publisert miljø er særskilt ført i restlisten. Prisalder er simulert; tidligere native axe/Nu gjenbrukes med original dato. Ingen hemmeligheter lest, ingen produktretting, commit, registrering eller publisering.

- Sluttverifisering: 52 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll for 23 eksportfiler bestod. Ny avsluttende native-kjøring `100139-native-b7a19485` på oppdatert eksport ga 0 axe-violations / 3 incomplete-grupper (samme 80 noder) og 0 Nu-feil / 191 tekniske noter. Oppdatert erklæring er lest tilbake ved 1280/320 px uten sideoverflyt eller ny DOM-kandidat. Formatering, dokument-/evidenslenker og `git diff --check` er kontrollert. Dette er ikke samlet samsvarsgodkjenning.

## Ikke utgitt – lokal axe og Nu HTML-validering – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.0. Ingen underagenter.

- Låst `@axe-core/cli` 4.14.0, `vnu-jar` 26.11.9 og `chromedriver` 157.0.0 som utviklingsavhengigheter. Node-minimum er 22.18.0, slik at direkte TypeScript-import også støttes uten ekstra flagg. Prosjektlokal pnpm-konfigurasjon tillater installasjonsskripter bare for driver/validator og beholder eksisterende lokalt lager. Java-runtime installeres i node_modules; ingen globale innstillinger, andre repoer eller GitHub-rettigheter endres.
- Lagt til `pnpm test:a11y`: midlertidig server på loopback, axe CLI i separat headless Chrome mot bygde sider og Nu-validering av lokale eksportfiler. Ingen opplasting av portalinnhold. Resultater får unik datert mappe, original JSON per side, rå stdout/stderr, verktøyversjoner og tydelig teknisk feilstatus. Den andre motoren forsøkes også hvis én feiler. Koden avviser tomme/dupliserte/manglende axe-resultater og motstridende validatorstatuser. CI aktiveres ikke automatisk.
- Lagt til faktisk negativ verktøytest (`pnpm test:a11y:smoke`) og fire protokoll-/omfangstester. Begge faktiske motorer fant tilsiktet manglende alt på syntetisk testside; denne er ikke portalinnhold. Første axe-kjøring avdekket at ventemeldinger bryter CLI-ens JSON-stdout. Feilen er bevart som teknisk feil; løsningen bruker nå verktøyets egen JSON-fil og er retestet.
- Endelig motorresultat: Native-kjøring `docs/tilgjengelighet/2026-11-10/090555-native-d984a7c5/` omfatter 20 registrerte sider og feilside i lokal eksport. Axe ga 0 violations, men tre uavklarte color-contrast-grupper / 80 elementforekomster. Nu validerte 23 eksportfiler med 0 HTML-feil og 191 tekniske info-/advarselsnoter om slash på tomme elementer. Ingen nye bekreftede WCAG-brudd; øvrige kontrastforhold beholdes som manuell rest.
- Faktisk skill-kjøring og vurdert grunnlag er lagret i `docs/tilgjengelighet/2026-11-10/090740-ca8d9c80ecb6/`, med null blokkerte/teknisk feilede deltester. Skillens import av én original axe-oppføring er tydelig skilt fra det fullstendige native-skannet og en kravvis analyse av alle 21 resultater. Tidligere nettleserdata er referert med opprinnelig tidspunkt og hash, ikke fremstilt som en ny CUA-kjøring. Arbeidsstatus er 21 K / 11 I / 16 U / 0 B; 37 krav har fortsatt bredere vurdering/retest og 11 er uten utløsende innholdstype lokalt.
- Kontroll: 52 Node-tester, tre Python-regresjonstester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll for 23 filer bestod. Nyttig negativ motorprøve og protokolltester skiller feilet/tom kjøring fra faktisk utført kontroll. Ingen full skjermleser-/zoom-/produksjonsvurdering er påstått.
- Oppdatert dokumentasjon, utviklingsplan og erklæringens korte metode-/begrensningstekst. Ingen produktavvik rettes i dette testoppdraget. Tidligere PDF-/språkrettinger og manuelle uavklarte forhold beholdes. Samlet tilgjengelighetssamsvar er fortsatt uavklart. Ingen commit, registrering eller publisering.

- Avgrenset verktøyprosessene fra globale Selenium remote-/server-/nettleserinnstillinger og implisitte driverstier, slik at den avtalte lokale kjøringen ikke omdirigeres til en annen server. Regresjonstest bekrefter avgrensningen uten å endre foreldreprosessens miljø.

- Unntatt daterte auditmapper fra Prettier for å bevare originalrapporter, råutskrifter og prosedyreøyeblikksbilder. Rotrapporter og kildekode formateres fortsatt.

- Sluttkontroll: Hele prosjektets `pnpm format:check` og `git diff --check` bestod. Erklæringssiden er lest tilbake på stor skjerm og 320 px uten sideoverflyt eller DOM-kandidat. Krav-/status-/evidensfordeling og relative dokumentlenker er avstemt; originalt manifest og motordata er bevart. Ny negativ motorprøve etter miljøavgrensningen bestod også.

## Ikke utgitt – rettet PDF-lister, PDF-kontrast og 404-språk – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.0 og PDF-skillen. Ingen underagenter.

- Rettet A11Y-04 ved å kode tre PDF-lister med tolv LI/Lbl/LBody og gruppere dem under tilhørende overskrifter. Opprinnelige tekstnoder, 229 ParentTree/MCID-eierkoblinger, 27 overskriftsroller, dokumenttittel og sidegeometri er bevart. Side 7 og fem øvrige sider er pikselidentiske med før-versjonen.
- Rettet A11Y-05 ved å gjøre aktuell brød-/bunntekst og sidetall på PDF-side 5 hvite, med 6,284:1 kontrast mot grønn bakgrunn. Retest bekrefter 382 endrede teksttegn, uendret tekst/skrift/posisjon og visuell endring bare på side 5. Original, reparasjons-/retestskript og rendering er arkivert i `docs/tilgjengelighet/2026-11-10/080757-ffaeb036427a/`.
- Rettet A11Y-06 med norsk `not-found.tsx`, beskrivende metadata og lenker videre. Én norsk sidetittel er kontrollert i faktisk lokal feilside og alle tre eksporterte feilfiler, slik at tittelkandidaten for 2.4.2 også lukkes lokalt. Feilsiden er registrert som funksjon; den er ingen ordinær ny siderute. HTML-grunnkontrollen avviser tom/duplisert tittel, med tre regresjonstester.
- Oppdatert rapporter/testplan/matrise, manuell restliste, latest-peker, kort brukerrettet erklæring, README, kvalitetskontroll, utviklingsplan og vedleggsstørrelse (139 kB) i felles Om-innhold. Ingen bekreftede åpne avvik i undersøkt utvalg. Arbeidsstatus 20 K / 11 I / 17 U / 0 B er ikke en samsvarsprosent; 1.3.1, 1.4.3 og 3.1.2 beholder U for øvrig dekning. Tidligere kjøringer og rettingshistorikk er bevart.
- Sluttverifisering: Alle 48 eksisterende prosjekttester, tre nye Python-regresjonstester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll for 23 eksportfiler bestod. Status-/restfordeling og kravvis evidens er avstemt. Norsk feilside er lest tilbake ved 320 px uten sideoverflyt, og tastaturlenken til forsiden er bekreftet etter fullført navigasjon. Oppdatert erklæring er lest tilbake og skjermbilder er lagret. Formatering og `git diff --check` er kontrollert. PDF-en er reparert direkte; ved ny eksport fra en redigerbar kildefil må også de underliggende stil-/kontrast-/listeinnstillingene oppdateres.
- Kontrollgrunnlag: Uavhengig PDF-retest og de tre nye HTML-regresjonstestene bestod. Faktisk skill-kjøring på 20 registrerte sider og feilside ga 63 viewport-kontroller, 168 Tab-steg og tre deklarerte forløp uten kandidat i navngitte nettleserdeler. Axe/vnu mangler fortsatt; ingen faktisk skjermleser, full PDF/UA-validering, verifisert zoom eller produksjonsfallback er påstått. Ingen commit, registrering eller publisering.

## Ikke utgitt – tilgjengelighetskjøring med skill 0.5.0 – 10. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.5.0. Ingen underagenter.

- Kjørt den oppdaterte skillen på portalen, med ny hovedkjøring `docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd/`. Første delkjøring 9. november og tidligere gjennomganger er bevart. Faktisk nettlesermodul og `run_checks.py --auto` er brukt; ikke bare testplan eller tekstlig skill-henvisning.
- Utført 20 sider, 23 eksportfiler, 60 viewport-kontroller, 160 Tab-steg, tre deklarerte forløp og supplerende chat/pris-/404-kontroller. 2484 tekstforekomster kontrastmålt, 75 hoppet over med begrunnelse. Axe og vnu mangler, og kjøringen er derfor delvis (exit 2). Ingen fullskann-/skjermleser-/zoomgodkjenning er påstått.
- Bekreftet nytt A11Y-06: den engelske 404-meldingen arver norsk språk. PDF-listene (A11Y-04) og PDF-kontrast (A11Y-05) består ved identisk PDF-hash; tidligere rettede A11Y-01–03 beholdes i opprinnelig omfang. De tre tittelelementkandidatene på eksporterte feilsider er fortsatt uavklart, ikke automatisk registrert som brudd. Ingen produktfeil er rettet.
- Oppdatert rapporter, kravmatrise/testplan, latest-peker, README, utviklingsplan, funksjonsbeskrivelse og kort brukerrettet erklæring/side. Kravvis restliste viser 37 gjenstående vurderings-/rettings-/retestpunkter og 11 krav uten utløsende innholdstype lokalt. 31 krav har automatiske delresultater; arbeidsstatus 19 K / 11 I / 15 U / 3 B er ikke en samsvarsprosent. Tidligere bevis beholder dato og opprinnelig plassering; maskinproduserte originaler er bevart i raw/initial-*.
- Verifisering etter dokument-/sideendring: Alle 48 prosjekttester og Pages-produksjonsbygg med TypeScript bestod. HTML-grunnkontrollen bestod for 23 eksportfiler. Alle 48 planrader har forventet/faktisk resultat, metode og eksisterende evidens; statusfordeling, 37 manuelle restpunkter og 129 relative dokumentlenker er avstemt uten mangler. Oppdatert erklæring er lest tilbake på desktop og 320 px, uten sideoverflyt eller ny kandidat i DOM-delkontrollen; skjermbilder og råresultater er lagret. Formatering og `git diff --check` er kontrollert. Bygg/enhetstester er utviklingsverifisering, ikke samlet tilgjengelighetsgodkjenning.
- Begrensninger: Faktisk skjermleser, verifisert 200/400 % zoom, fysisk rotasjon/redusert bevegelse, full tekstavstand-/tilstandsgjennomgang og produksjon/innlogging/modellgenerering er ikke utført. Syntetisk chatspørsmål ga veiledning uten språkmodell. Eier og frister er ikke avklart. Ingen hemmeligheter er lest, ingen registrering, commit eller publisering utført.

## Ikke utgitt – automatisk deltesting og manuell 48-kravsrestliste – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator` og `tilgjengelighetserklaering`. Ingen underagenter.

- Oppdatert katalogen til tilgjengelighetsskill 0.5.0 med automatisk testflyt og tydelig manuell oppfølging for alle 48 krav. Det separate Skills-repoet og installert kopi har utvidede HTML-/PDF-kontroller, nettlesermodul, valgfri lokal validator og import av faktisk axe-resultat. Funn og manglende verktøy vises kravvis, uten automatisk samsvarsgodkjenning.
- Oppdatert README og utviklingsplan. Katalog/Spør KI bruker fortsatt samme metadata. Ingen nye produktruter eller endret modenhetsstatus; funksjonsregisterets eksisterende katalogdefinisjon gjelder fortsatt. Siste portalvurdering, latest.json, erklæringen og de to åpne PDF-avvikene er bevart.
- Kontroll: 35 Python- og seks Node-tester for skill-pakken bestod. Isolert integrasjonstest ga automatisk delresultat for 27 av 48 krav og konkret manuell rest for alle 48; axe/vnu var blokkert. Nettlesermodulen er prøvd på faktisk lokal forside med DOM/kontrast, tre størrelser, fire Tab-steg og pause/start. Dette er utviklingsverifisering av verktøyet, ikke ny full tilgjengelighetsrevisjon av portalen. Alle 48 portaltester og Pages-produksjonsbygg med TypeScript bestod. Skillens strukturelle quick_validate kunne ikke kjøre uten PyYAML; lokale referanser, navn/versjon og egne regresjonstester er kontrollert. Ingen commit eller publisering.

## Ikke utgitt – kravvis tilgjengelighetsgjennomgang med skill 0.4.0 – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.4.0 og PDF-verktøy. Ingen underagenter.

- Gjennomgått alle 48 prosedyrer på lokal portal med forventet/faktisk resultat, verktøy, evidens og gjenstående test per krav. Ny kjøring `docs/tilgjengelighet/2026-11-09/221027-5ce9daf9d5dc/` bevarer originalmanifest og prosedyreøyeblikksbilde. Utført 60 responsive DOM-kontroller og 40 tekstavstandskontroller på alle 20 sider, 160 Tab-steg samt utvalgte handlinger i hoppelenke, animasjon, katalog, priser og chat. Midlertidig test-CSS er fjernet med identisk originalhash.
- Bekreftet to nye PDF-avvik: A11Y-04 / 1.3.1 (visuelle punktlister uten kodet listestruktur på side 7) og A11Y-05 / 1.4.3 (ca. 4,41:1 for vanlig grå brød-/bunntekst og 1,11:1 for sidetall på grønn bakgrunn på side 5). Tiltak og retest er dokumentert; PDF-en er ikke rettet. Tidligere A11Y-01–03 beholdes som rettet i sine opprinnelige omfang.
- Oppdatert testplan/resultater, full matrise, kort brukerrettet erklæring og lokal side, funksjonsregister, README, kvalitetskontroll og utviklingsplan. Status 20 K / 11 I / 15 U / 2 B er arbeidsfordeling, ikke samsvarsprosent. Flere tidligere delkontroller er nå eksplisitt U fordi fysisk orientering, full kodevalidering, PDF-språk og automatisk prisaldervarsel ikke er ferdig vurdert.
- Begrensning: Ingen faktisk skjermleser, verifisert 200/400 % zoom, fysisk orienterings-/redusert-bevegelse-test, full lokal HTML-validator, modellgenerert svar, innlogging eller produksjonsmiljø. Et testspørsmål ga kildebasert veiledning uten språkmodell. Ingen miljøhemmeligheter er lest, ingen produktfeil er rettet og ingen registrering, publisering eller commit er utført. Samlet samsvar er fortsatt uavklart.
- Kontroll av dokument-/sideoppdateringen: Alle 48 prosjekttester og Pages-produksjonsbygg med TypeScript bestod. Etterkontroll av 23 eksporterte HTML-filer ga ingen kandidater i delomfanget. Alle 48 testplanrader har forventet/faktisk resultat og eksisterende evidens; statusfordeling og relative dokumentlenker er kontrollert. Oppdatert erklæring er lest tilbake på desktop og 320 px, uten sidebredde-overflyt; bilde er lagret. Prettier og `git diff --check` gjelder dokument-/kildefilene; rålogger er bevart med opprinnelige terminalkontrolltegn. Bygg-/enhetstester er separat utviklingsverifisering, ikke tilgjengelighetsgodkjenning.

## Ikke utgitt – testprosedyrer for alle 48 krav i tilgjengelighetsskillen – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator` og regnearksskillen. Ingen underagenter.

- Oppdatert katalogmetadata til tilgjengelighetsskill 0.4.0. Skillen har nå konkrete prosedyrer for alle 48 krav i nettstedsmalen, med kilde/cellereferanse, verktøy, handlinger, forventet resultat og dokumentasjon. Prosedyrene og maskinlesbar indeks ligger i det separate Skills-repoet, med samme installerte kopi.
- Nye skill-kjøringer lager en plan med alle krav som ikke testet, et eget prosedyreøyeblikksbilde og 48 uavklarte rader i kravgrunnlaget. HTML/kontrast gir fortsatt bare delresultater; dette er ingen automatisk fulltest eller godkjenning. Endringen er dokumentert i Skills-repoets egen versjonslogg.
- Oppdatert README og utviklingsplan. Tidligere portaltester, siste testkjøring og samlet uavklart samsvarsstatus er ikke endret. Den korte brukerrettede erklæringen beholdes.
- Kontroll: Skills-repoets 25 tester bestod, inkludert fire nye tester for dekning, ærlig planstatus, historikk og ugyldig kravindeks. Alle 48 ID-er, celler og opprinnelige URL-er er sammenlignet med brukerens Excel-mal; kildesidene er kontrollert. Portalens 48 prosjekttester og Pages-produksjonsbygg med TypeScript bestod. Katalogsiden er lest tilbake i nettleser med versjon 0.4.0 og beskrivelse av 48 prosedyrer. Kildepakken og installert kopi er like; formatering og `git diff --check` er kontrollert. Ingen ny tilgjengelighetsrevisjon, commit, registrering eller publisering.

## Ikke utgitt – ryddigere tilgjengelighetserklæring – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator` og `tilgjengelighetserklaering` 0.3.1. Ingen underagenter.

- Forenklet lokal erklæringsside og Markdown-erklæring til omfang, samsvar, relevante begrensninger/alternativer, kontakt, klage og kort vurderings-/oppdateringsinformasjon. Fjernet testtall, funn-ID-er, kjøringsreferanser, agentdetaljer og historikk over rettede feil fra den brukerrettede teksten. Teknisk evidens og historikk er bevart i eksisterende rapporter og Git.
- Beholdt utkaststatus, bekreftet kontakt, vesentlig usikkerhet og faktisk vurderingsdato. Dette er redaksjonell opprydding, ikke ny tilgjengelighetsrevisjon eller høyere samsvarsstatus. Siste faktiske testkjøring og 12 uavklarte vurderinger er uendret.
- Oppdatert skillens instruksjoner/mal/lagringsveiledning til 0.3.1 i Skills-repoet og installert kopi, med egen logg der. Oppdatert katalogmetadata, funksjonsregister, README og utviklingsplan.
- Kontroll: 48 prosjekttester og Pages-produksjonsbygg med TypeScript bestod. Skills-repoets 21 eksisterende tester bestod; endrede skill-filer og lokale referanser er kontrollert, og kilde/installerte kopi er like. `quick_validate.py` kunne ikke kjøre uten PyYAML; dette er dokumentert i Skills-loggen. Utkaststatus, kontakt, klage og vurderingsdato er bevart; historisk evidens er urørt. Prettier, `git diff --check` i begge repoer og nettleservisning er kontrollert. Ingen commit, formell registrering eller publisering.

## Ikke utgitt – rettet PDF-overskrifter og dokumenttittel – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.3.0 og PDF-skillen. Ingen underagenter.

- Rettet A11Y-02 ved å gi de kartlagte PDF-overskriftene reelle roller: én H1, seks H2 og 20 H3. Eksisterende tekst-/MCID-koblinger er beholdt. Rettet A11Y-03 med beskrivende norsk tittel i både Info og XMP og beholdt visning av dokumenttittel. PDF 1.7, sideinnhold, tekst og visuell utforming er bevart; filstørrelsen i felles Om-innhold er oppdatert til 127 kB.
- Ny datert retest: `docs/tilgjengelighet/2026-11-09/210420-07c855b7770e/`. Uavhengig kontroll bekrefter 27 overskriftsroller, 229 MCID-koblinger, riktig tittel begge steder og pikselidentisk rendering/tekst/innholdsstrøm på alle syv sider. Original PDF, reparasjonsskript, retestskript og råresultater er arkivert. Et første ugyldig XMP-skriveforsøk ble fanget, dokumentert og korrigert før endelig retest.
- Oppdatert kravmatrise, testresultater, erklæringsutkast og portalens erklæringsside, funksjonsregister, README, kvalitetskontroll og utviklingsplan. Begge konkrete PDF-avvik er rettet og struktur-/metadataretestet. Ny arbeidsfordeling: 26 K / 10 I / 12 U / 0 B, ikke samsvarsprosent. 1.3.1 er B→U fordi øvrig PDF-semantikk og faktisk skjermleserbruk fortsatt er uavklart; 2.4.2 er B→K. Tidligere 11 U-punkter er bevart.
- Begrensning: Ingen faktisk skjermlesernavigasjon, full PDF/UA-validering, produksjonsgodkjenning, registrering, publisering eller commit. Redigerbar presentasjonskilde finnes ikke i prosjektet; ved ny eksport må også kildens overskriftsstiler/tittel rettes.
- Kontroll av side-/dokumentoppdateringen: 48 prosjekttester, Pages-produksjonsbygg med TypeScript og HTML-grunnkontroll av 23 eksportfiler bestod uten kandidater i delomfanget. Den eksporterte PDF-en er byteidentisk med den reparerte kildefilen. 48 unike kriterier, statusfordeling og 82 relative dokumentlenker er kontrollert. Oppdatert erklæring er lest tilbake i nettleser og skjermbilde lagret. Prettier og `git diff --check` er kontrollert for endrede dokument-/kildefiler; rå bygglogger er bevart med opprinnelige terminalkontrolltegn. Bygg-/enhetstester er utviklingsverifisering, ikke tilgjengelighetsgodkjenning.

## Ikke utgitt – videre lokal tilgjengelighetskontroll – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.3.0 og PDF-skillen. Ingen underagenter.

- Lagret ny oppfølging mot commit `67108ac` i `docs/tilgjengelighet/2026-11-09/205326-389241d1fd6e/`. Undersøkt syv PDF-sider med rendering, struktur-/metadata-/tekstuttrekk, seks supplerende kontrastpar, 40 Tab-steg på fire sider og åtte i chat, samt chatfeltfokus ved 320 px. Alle valgte kontrastterskler er oppfylt; ingen nye bekreftede webfunn i dette delomfanget.
- Bekreftet to PDF-avvik: A11Y-02 / 1.3.1 (synlige overskrifter uten semantiske overskriftsroller) og A11Y-03 / 2.4.2 (generisk dokumenttittel). Rettingsforslag, konsekvenser og reteststeg er dokumentert; PDF-en er ikke endret. Tidligere språkavvik A11Y-01 forblir lukket.
- Oppdatert testprotokoll, full 48-punkts matrise, erklæringsutkast, lokal erklæringsside, funksjonsregister, README, kvalitetskontroll og utviklingsplan. Tidligere evidens og manifest er bevart. Ny arbeidsfordeling er 25 K / 10 I / 11 U / 2 B, ikke en samsvarsprosent. 1.4.5 er undersøkt også i PDF-en; 1.3.1 og 2.4.2 inkluderer nå PDF-funn.
- Begrensning: Zoomsnarveien endret ikke målt visning. Ingen faktisk skjermleser, verifisert 200/400 % zoom, systeminnstilling for redusert bevegelse eller full automatisk WCAG-skanning. OS-innstillinger er ikke endret; viewport er nullstilt. Samlet samsvar er fortsatt uavklart. Ingen publisering, registrering eller commit.
- Kontroll av dokument- og sideendringene: 48 prosjekttester bestod; Pages-produksjonsbygg med TypeScript bestod. Ny HTML-grunnkontroll av 23 eksportfiler ga ingen kandidater. Prettier og `git diff --check` bestod for de endrede dokument-/kildefilene; 48 unike kriterier, statusfordeling og 73 relative dokumentlenker er kontrollert. Erklæringen er lest tilbake i nettleser og skjermbilde lagret. Bygg-/enhetstester er utviklingsverifisering, ikke tilgjengelighetsgodkjenning. Rå bygglogg er bevart med opprinnelige terminalkontrolltegn.

## Ikke utgitt – rettet språkavvik i prisoppdateringen – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.3.0 for retest og erklæringsoppdatering. Ingen underagenter.

- Rettet A11Y-01 ved å generere norske vilkår fra kjente Copilot-/Codex-felt i innhentingsparseren. Minstekrav til brukere, kredittall, fra-pris og betalingsintervall bevares. Ukjent vilkårsformat avvises, og oppdateringsflyten beholder tidligere norsk tekst i stedet for å kopiere nye engelske setninger inn på siden.
- Kjørt virkelig prisoppdatering mot alle seks kilder: 26 rader, uendrede numeriske priser og oppdaterte kontrolltidspunkter. Retestet alle seks utvidede vilkårsseksjoner i nettleser. Tre nye regresjonstester kontrollerer gjentatt oppdatering/JSON-lagring, endrede kildetall og ukjent format. De kjøres også av den eksisterende prisarbeidsflyten.
- Lagret ny målrettet retest i `docs/tilgjengelighet/2026-11-09/203914-cf2e80bc00f7/`, med tidligere funn bevart i den brede kjøringen. Oppdatert matrise og erklæring viser avviket som rettet og retestet; øvrige 13 U er videreført. Arbeidsfordeling: 25 K, 10 I, 13 U og 0 B, ikke en samsvarsprosent.
- Oppdatert lokal erklæringsside, funksjonsregister, README, kvalitetskontroll og utviklingsplan. Samlet samsvar er fortsatt uavklart. Ingen faktisk skjermleseropplesing, GitHub-kjøring, registrering, publisering eller commit er utført.
- Kontroll: Alle 48 prosjekttester (inkludert åtte prisparsertester), produksjonsbygg med TypeScript, Pages-bygg, skillens HTML-grunnkontroll, Prettier og `git diff --check` bestod. Bygget prisside og erklæring, 48 unike kriterier og 30 relative dokumentlenker er kontrollert. Prisarbeidsflytens testkommando er kjørt lokalt med åtte beståtte tester; ingen GitHub-kjøring er påstått.

## Ikke utgitt – oppdaterte prisdata – 9.11.2026

**Utførende:** Prisoppdateringsskriptet (pricing:sync).

- Oppdatert lagrede prisrader fra offisielle kilder; kilde og tidspunkt følger hver gruppe. Mislykkede kilder beholder forrige kontrollerte rader.
- Automatisk parsing er utført, ikke faglig godkjenning eller kontroll av en virksomhetsavtale. Se kildestatus på prissiden.

## Ikke utgitt – ny tilgjengelighetskontroll og erklæringsoppdatering – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `tilgjengelighetserklaering` 0.3.0. Ingen underagenter.

- Gjennomført ny avgrenset kontroll mot commit `c622090`, inkludert alle 20 HTML-sider og animasjonen. Lagret råresultater, originalmanifest, skjermbilder og etterfølgende manuelle observasjoner i `docs/tilgjengelighet/2026-11-09/201443-73cb0a3e52e0/`. Tidligere resultater er bevart.
- 23 HTML-eksportfiler uten kandidater i skillens grunnkontroll; 60 responsive DOM-kontroller og 40 tekstavstandskontroller uten sidebredde-overflyt. Utvalgte tastaturforløp, pristabeller, animasjon, dialog/validering og tre kontrastpar er undersøkt. En etikettkandidat ble avvist som et skjult MUI-målefelt etter inspeksjon. Midlertidig test-CSS er fjernet.
- Dokumentert ett bekreftet brudd, A11Y-01 / 3.1.2: engelske prisvilkår mangler språkmerking. Ingen produktfeil er rettet; rettingsforslag og retestinstruksjon er lagret. Tidligere «ikke relevant» for 2.2.2 er erstattet av faktisk pause-/starttest.
- Oppdatert hovedrapport, 48-punkts matrise, erklæringsgrunnlag, lokal erklæringsside, funksjonsregister, README, kvalitetskontroll og utviklingsplan. Ny arbeidsfordeling er 24 K, 10 I, 13 U og 1 B; dette er ikke en samsvarsprosent. Juridiske virksomhetsopplysninger/godkjenner er fortsatt uavklart. Bekreftet kontakt beholdes.
- Samlet samsvar er ikke ferdig vurdert. Faktisk skjermleser, zoom, PDF, flere nettlesere, alle kontrast-/fokustilstander og redusert-bevegelse-innstilling gjenstår. Ingen axe/Lighthouse, faktisk modellgenerering, registrering, publisering eller commit er utført i testoppdraget.
- Kontroll av dokumentoppdateringen: Alle 45 prosjekt-/parser-/RAG-tester, produksjonsbygg med TypeScript, Pages-bygg, Prettier og `git diff --check` bestod. 48 unike kriterier, statusfordeling, lagrede resultater og fjernet test-CSS er kontrollert. Oppdatert erklæring er lest tilbake i nettleseren. Bygg-/enhetstester er separat utviklingsverifisering, ikke en tilgjengelighetsgodkjenning.

## Ikke utgitt – styr animasjonen ved klikk på illustrasjonen – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Fjernet den synlige pause-/startknappen og gjort selve illustrasjonen til en knapp som veksler mellom pause og start. Skjermlesernavnet beskriver neste handling, og Enter/mellomrom støttes gjennom en vanlig HTML-knapp. Redusert bevegelse respekteres fortsatt.
- Fjernet kontrollens ekstra avstand og oppdatert funksjonsregister og utviklingsplan.
- Kontroll: Lokal nettleser bekreftet pause og start ved gjentatte klikk, med animation-play-state paused/running. Mellomrom pauset og Enter startet igjen. Klikkflaten ligger over de dekorative tekstflatene. Produksjonsbygg med TypeScript, Prettier og `git diff --check` bestod.

## Ikke utgitt – rolig animasjon i forsideillustrasjonen – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Lagt til rolige bevegelser frem og tilbake for de to lyspunktene langs ytterkanten, og svært langsom rotasjon av den stiplede ringen. Logo og hovedringer beholder sin plassering.
- Flyttet illustrasjonen til en egen komponent med pause-/startknapp. Ved redusert bevegelse slås animasjonen av og kontrollen skjules. Animasjonen bruker CSS-transformasjoner; ingen eksterne ressurser eller avhengigheter.
- Oppdatert funksjonsregister og utviklingsplan.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Lokal nettleser viste aktive transformasjoner; pauseknappen satte både punkter og ring til paused og kunne starte dem igjen. Regelen for redusert bevegelse er kontrollert i CSS, ikke med endret systeminnstilling. Ingen full tilgjengelighetsrevisjon er utført.

## Ikke utgitt – MCP-oversikt under Oversikt – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Opprettet `/oversikt/godkjente-mcper/` med Atlassian MCP som «ROS-analyse pågår» og Slack MCP som «Planlagt», basert på brukerens opplysning. Ingen av dem er merket godkjent, og ingen tilkobling eller tilgang er aktivert.
- Lagt til inngang fra Oversikt og retningslinjene. Nettsiden, Spør KI og funksjonsregisteret bruker felles innhold; nettstedskartet tar med ruten. README og utviklingsplan er oppdatert.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Bygget HTML er kontrollert for begge statuser og lenken fra Oversikt. Prettier og `git diff --check` bestod. Ingen ROS-analyse, full tilgjengelighetsrevisjon eller utrulling er utført.

## Ikke utgitt – fjernet Priser fra bunnteksten – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Fjernet den direkte Priser-lenken fra bunnteksten. Prissiden finnes fortsatt via Oversikt og nettstedskartet. README er avstemt med den nye navigasjonen.
- Kontroll: Lenkeendringen er lest tilbake. Prettier og `git diff --check` bestod. Ingen funksjonalitet eller produksjonsstatus er endret.

## Ikke utgitt – Godkjente KI-assistenter under Oversikt – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Opprettet `/oversikt/godkjente-ki-assistenter/` med Copilot, Claude AI og Codex som godkjente assistenter i Nasjonalarkivet etter brukerens opplysning. Ingen bestemt konto, lisens, modell, integrasjon eller datakategori er gitt godkjenning på dette grunnlaget.
- Lagt inngang under Oversikt etter priser og abonnement, og oppdatert aktiv overordnet navigasjon, retningslinjer, nettstedskart, Spør KI, README og utviklingsplan. Beskrivelser og godkjenningsstatus vedlikeholdes i felles innholdskilde.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Bygget HTML er kontrollert for de tre godkjente assistentene, inngang fra Oversikt og aktivt overordnet menypunkt. Prettier og `git diff --check` bestod. Ingen ny full tilgjengelighetsrevisjon eller utrulling.

## Ikke utgitt – pålitelig ankerlenke til ressurskatalogen – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Endret PortalButton til å bruke nettleserens vanlige anker for lenker til en seksjon på samme side. «Utforsk ressursene» hopper dermed til ressurskatalogen også når `#ressurser` allerede står i adressen. Lenker til andre sider bruker fortsatt Next.js Link.
- Kontroll: Gjentatt klikk med `#ressurser` allerede i adressen er kontrollert i lokal nettleser: siden startet på toppen, og katalogen endte 48 px fra toppen av visningen. Produksjonsbygg med TypeScript, Prettier og `git diff --check` bestod. Ingen full tilgjengelighetsrevisjon er utført.

## Ikke utgitt – Ressurskatalog og tydeligere introduksjon – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Endret Verktøykatalog til Ressurskatalog i meny, katalogmerking, funksjonsregister og henvisninger fra øvrige sider. Nettstedskart og Spør KI følger registeret og felles innhold.
- Satt seksjonsoverskriften til «Finn en ressurs», med beskrivelsen «Skills, instruksjoner og prompter som hjelper deg å bruke KI i produktutviklingen.» Navn og introduksjon ligger i felles `src/content/catalog.ts`. Forsidens handlingslenke heter nå «Utforsk ressursene».
- Beholdt nettadresse og søk/filtrering. Oppdatert README og utviklingsplan; historiske rapporter og tidligere loggoppføringer er bevart.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Navn, overskrift og beskrivelse er kontrollert i bygget HTML; tekstsøk finner ingen rester av Verktøykatalog i gjeldende `src`-innhold. Prettier og `git diff --check` bestod.

## Ikke utgitt – Oversikt som inngang til priser – 9. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Opprettet `/oversikt/` med priser og abonnement som første del, og modelloversikt og forbruk som tydelig planlagte utvidelser. Prisene beholdes på `/priser/`; ingen priskopier eller simulerte bruksdata er innført.
- Lagt Oversikt mellom Verktøykatalog og Spør KI i hovedmenyen og i bunnteksten. På prissiden markeres Oversikt som overordnet menypunkt, med brødsmulesti tilbake.
- Siden, Spør KI og funksjonsregisteret henter beskrivelser og planlagt status fra felles innhold. README og utviklingsplan er oppdatert.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Byggkontrollen validerer den nye ruten mot funksjonsregisteret. Ingen ny full tilgjengelighetskontroll eller utrulling er gjennomført.

## Ikke utgitt – prisside og automatisk prisinnhenting – 9. november 2026

**Utførende agent:** Codex (OpenAI), med OpenAI Docs for offisielle Codex-kilder. Ingen underagenter.

- Opprettet `/priser/` i portalens design, med abonnement og tydelig separate direkte API-priser og Copilot-tokenpriser. Viser utvalgte planer/modeller, kontekst, cache-satser, vilkår, kilde og siste vellykkede kontroll. Fra-pris og årsbetaling er særskilt markert. Siden er lenket i bunnteksten og registrert som Beta.
- Hentet seks offisielle kilder 9. november 2026 og lagret felles prisgrunnlag for nettsiden og Spør KI. HTTP-/parsefeil bevarer gamle rader og vellykket dato, med ny feilstatus og forsøksdato. Gamle kontroller varsles etter sju dager i nettleseren.
- Klargjort daglig GitHub Actions-jobb med parserregresjonstester og PR for prisfil og eventuell automatisk versjonslogg. Bare dette repoets kortlivede token brukes; ingen modellnøkler eller tilgang til andre repoer. Eksisterende åpen pris-PR overskrives ikke. Oppdateringsskriptet loggfører endrede prisrader.
- Oppdatert README, utviklingsplan, funksjonsregister og felles RAG-kilde. Testkommandoen inkluderer nå prisparserne.
- Kontroll: Alle 45 tester og produksjonsbygg med TypeScript bestod. Reell kildeinnhenting lyktes for alle seks grupper. Lokal nettleser viser seks tabeller, kilde/dato, bunntekstlenke og fungerende seksjonssnarvei; ingen sidebredde-overflyt observert ved 523 px. Ingen full tilgjengelighetsrevisjon er utført.
- Begrensning: Repoet har ingen remote; arbeidsflyten er ikke kjørt på GitHub og ingen automatisk utrulling er aktivert. Oppdateringer krever gjennomgang/sammenslåing og nytt bygg/utrulling. Dette er listepriser, ikke virksomhetsavtaler eller verktøygodkjenninger. Nye modeller legges ikke til automatisk.

## Ikke utgitt – oppdaterte prisdata – 9.11.2026

**Utførende:** Prisoppdateringsskriptet (pricing:sync).

- Oppdatert lagrede prisrader fra offisielle kilder; kilde og tidspunkt følger hver gruppe. Mislykkede kilder beholder forrige kontrollerte rader.
- Automatisk parsing er utført, ikke faglig godkjenning eller kontroll av en virksomhetsavtale. Se kildestatus på prissiden.

## Ikke utgitt – personvernerklæring for portalen – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `personvernerklaering` 0.1.0. Ingen underagenter.

- Kartlagt katalog, chat, valgfri modellkobling og lokale nettleserobservasjoner. Lagret manifest, behandlingsoversikt, sanitert evidens, rapport og datert erklæringsutkast i `docs/personvern/2026-11-09/161600-a3368ac30b20/`. Ingen hemmelige miljøverdier eller rå chatspørsmål er innhentet.
- Opprettet `/personvern/` med lenke i bunnteksten og bekreftet personvernkontakt khadah@nasjonalarkivet.no. Nettsiden og Spør KI bruker samme innholdskilde. Funksjonsregister og nettstedskart viser siden, med eksplisitt utkaststatus.
- Gitt felles innholdssider et statusfelt og støtte for e-postlenker i artikkelvisningen. Retningslinjenes eksisterende utkaststatus er bevart. Oppdatert README og utviklingsplan; P9 er fortsatt åpent.
- Lokal helseside viste deaktivert modellgenerering. Nettleserlagring kunne ikke undersøkes fullstendig; dette er ikke bevis for fravær av cookies eller logger. Behandlingsansvarlig, personvernombud, rettsgrunnlag, leverandøravtaler, overføringer og lagring må bekreftes. Primærveiledning fra Datatilsynet og Nkom er brukt, med Digdir som strukturinspirasjon. Ingen juridisk godkjenning eller publisering.
- Kontroll: Alle 39 portaltester og produksjonsbygg med TypeScript bestod. Bygget HTML har riktig tittel, utkastmerking, e-postlenke og lenke fra forsiden. Prettier og `git diff --check` bestod. Ingen ny full tilgjengelighetsrevisjon, visuell nettleserkontroll av erklæringssiden eller produksjonskontroll er utført.

## Ikke utgitt – personvernskill i bibliotek og katalog – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator`. Ingen underagenter.

- Opprettet personvernerklaering 0.1.0 i Skills-biblioteket og installert en lik kopi i assistentens skill-katalog. Samme hovedoppsett som tilgjengelighetsskillen: instrukser, agentmetadata, maler, faglige referanser og datert lagring i målprosjektet.
- Lagt til Beta-ressursen «Kartlegg personvern og utform erklæring», søkbar i katalogen og Spør KI. Detaljsidene henter nå skillenes egne beskrivelser og begrensninger fra ressursdata, slik at personvern ikke får tilgjengelighetsspesifikk tekst.
- Oppdatert README og utviklingsplanen. Kildegrunnlaget omfatter Digdirs eksempel, Datatilsynets veiledning og Nkom. Skillen bevarer uavklarte opplysninger og gir ingen automatisk juridisk godkjenning.
- Hjelpeskriptet oppretter bare en arbeidsmappe og foreløpige filer, ikke en ferdig kartlegging eller publisert erklæring. Ingen personvernerklæring for portalen er utformet som del av dette oppdraget.
- Kontroll: Skill-validering bestod for kilde og installasjon; alle ti pakkefiler er identiske, og lokale referanser finnes. Alle 21 bibliotekstester (inkludert seks nye), 38 portaltester og produksjonsbygg med TypeScript bestod. Bygget detaljside har riktig versjon/Beta-status og egne begrensninger, uten feil omtale av WCAG/uustatus.

## Ikke utgitt – fjernet prototypetekst i bunnteksten – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Fjernet «Lokal prototype · under utprøving» fra den felles bunnteksten etter ønske. Dette endrer ikke funksjonsstatus eller produksjonskrav i utviklingsplanen.
- Kontroll: Prettier og `git diff --check` bestod.

## Ikke utgitt – utviklingsplan i bunnteksten – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til Utviklingsplan i bunnteksten, nettstedskartet og funksjonsregisteret, med en lesbar side på `/utviklingsplan/`.
- Siden bygges direkte fra `UTVIKLINGSPLAN.md`. Planen og versjonsloggen bruker en felles dokumentvisning med overskrifter, lister, lenker, oppgavestatus og tabeller som kan rulles på smale skjermer. Ingen separat plankopi vedlikeholdes.
- Oppdatert README og planen med hvor nettsiden finnes og når endringer blir synlige.
- Kontroll: Alle 36 tester og produksjonsbygg med TypeScript bestod. Bunntekstlenke, hovedoverskrifter for begge dokumentene og fem tabeller med samsvarende kolonnetall er kontrollert i bygget HTML. Ingen ny full tilgjengelighetsrevisjon er utført.

## Ikke utgitt – avstemt utviklingsplan og produksjonskrav – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Oppdatert utviklingsplanens leveranser og åtte faser mot kode, dokumentasjon og commit `e93e5f9`, inkludert felles innhold, Spør KI, eksternt modell-API, Skills-bibliotek, oversikter og forside/navigasjon.
- Endret første delte leveranse fra offentlig Pages-demo til lukket pilot. Tydeliggjort krav P1–P10 for tilgang, drift, produksjonsruting/Origin, CI, modellverifisering, API-vern, innhold, tilgjengelighet og forvaltning.
- Skilt mellom implementert kode, simulerte tester, reelt verifisert drift og produksjonsgodkjenning. Tidligere datostemplet historikk er bevart som historikk.
- Lagt til vedlikeholdsregel i AGENTS.md og README om oppdatering av plan, berørte faser og produksjonskrav i samme arbeidsøkt som vesentlige endringer. Ingen periodisk jobb eller automatisk produksjonsgodkjenning er innført.
- Kontroll: 13 lokale dokumentlenker, produksjonskrav P1–P10, bevart historikk og uendrede Next.js-instruksjoner er kontrollert. Prettier og `git diff --check` bestod. Dette er en dokumentasjonsoppdatering; ingen nye funksjonstester eller utrullinger er gjennomført.

## Ikke utgitt – menyrekkefølge og lenke til retningslinjer – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Endret hovedmenyen til Kom i gang → Retningslinjer → Verktøykatalog → Spør KI → Om, slik at oppstart og rammer kommer før verktøy og assistent.
- Lagt til en tydelig «Før du begynner»-henvisning tidlig i Kom i gang, med lenke til retningslinjene og presisering av utkaststatus. Teksten ligger i felles innholdskilde og inngår også i RAG-grunnlaget.
- Kontroll: TypeScript, Prettier og `git diff --check` bestod. Rekkefølgen, aktivt menypunkt og henvisningen er kontrollert i lokal nettleser. Lokalmiljøet ble startet for forhåndsvisningen.

## Ikke utgitt – invitasjon til KI-prat – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til en invitasjon i den felles Om-teksten for dem som jobber med produktutvikling eller utvikling av løsninger i Nasjonalarkivet, med oppfordring om å kontakte AI enablement-teamet for å delta.
- Samme avsnitt brukes i Spør KIs veiledning om KI-prat. Ingen ubekreftet e-postadresse eller Teams-lenke er lagt til.
- Kontroll: Alle åtte tester av felles innhold og funksjonsregister, Prettier og `git diff --check` bestod.

## Ikke utgitt – tydeligere innganger og anbefalt prøveoppgave – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Endret Lær/Prøv/Del til «Kom i gang med KI», «Finn en ressurs til oppgaven» og «Del erfaringer i KI-prat», med lenker til oppstartsveiledningen, katalogen og KI-prat.
- Erstattet det gjentakende Første steg-feltet med «Prøv i praksis» og ressursen «Utforsk et brukerbehov». Tittel, beskrivelse og lenke hentes fra ressurskilden; valget av anbefaling og snarveiene ligger i `src/content/home.ts`.
- Gjort ressursens felles beskrivelse mer konkret om intervjuspørsmål og brukerinnsikt. Samme tekst brukes på forside, i katalogen, på detaljsiden og i Spør KI.
- Redusert luft og høyde i anbefalingsfeltet, bevart portalens uttrykk og oppdatert funksjonsregisteret og README. En anbefaling til en manglende ressurs gir feil ved oppstart/bygging.
- Kontroll: Alle 36 tester og produksjonsbygg med TypeScript bestod. De tre inngangene, anbefalingens tekst og lenke og det mer kompakte feltet er kontrollert i lokal nettleser. Ingen ny full tilgjengelighetsrevisjon er utført.

## Ikke utgitt – automatisk funksjonalitetsoversikt – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Opprettet `/funksjonalitet/` med lenke fra bunnteksten og nettstedskartet, og tydelig skille mellom tilgjengelig funksjonalitet, Beta/utkast, modelloppsett og uimplementert tilgangsstyring.
- Samlet funksjonsdefinisjoner i `src/content/features.ts`. Oversikten, nettstedskartet og Spør KI bruker samme register; ressursantall, KI-prat og beskrivelser av innholdssidene avledes av gjeldende innholdsdata.
- Lagt til kontroll i Next.js-konfigurasjonen ved oppstart og bygging som avviser uregistrerte eller slettede sider, duplisering og ukjente rutelenker. Dokumentert at meningsendringer og modenhetsstatus må vurderes når funksjoner endres; dette kan ikke utledes automatisk av all kode.
- Oppdatert README og AGENTS.md med vedlikeholdsregler og regresjonstester. Oversikten viser ikke hemmelig konfigurasjon eller sanntidsstatus for modelltjenesten.
- Kontroll: Alle 36 tester, TypeScript og produksjonsbygg bestod. Siden, statusene og bunntekstlenken er kontrollert i lokal nettleser. Dette er ikke en ny full tilgjengelighetsrevisjon.

## Ikke utgitt – versjonslogg i bunnteksten – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til «Versjonslogg» i den felles bunnteksten og nettstedskartet, med en lesbar side på `/versjonslogg/`.
- Siden bygges direkte fra denne filen, slik at endringer ikke trenger å vedlikeholdes i en separat kopi. Neste bygg/utrulling tar med den oppdaterte loggen.
- Kontroll: Produksjonsbygg med TypeScript bestod. Bunntekstlenken ble funnet på alle 13 sider med felles layout; Next.js sin separate globale feilside inngår ikke. Versjonsloggsiden har riktig hovedoverskrift. `git diff --check` bestod.

## Ikke utgitt – klargjort eksternt modell-API – 9. november 2026

**Utførende agent:** Codex (OpenAI), med `openai-docs` for kontroll av API-format og nøkkelhåndtering.

- Lagt til valg mellom veiledning uten modell, lokal Ollama og et eksternt OpenAI-kompatibelt Chat Completions-API. Serveren konfigureres med `MODEL_PROVIDER`, `MODEL_API_URL`, `MODEL_NAME` og `MODEL_API_KEY`.
- Ekstern adapter bruker full konfigurert HTTPS-adresse og Bearer-header. Nøkkelen leses bare i serveroppsettet og inngår ikke i modellens meldinger, API-svar eller oppstartslogger. Ufullstendig oppsett og utrygge URL-formater avvises uten å vise innlagte verdier.
- Modellkall har timeout, følger ikke videresendinger og skjuler rå leverandør-/transportfeil. Veiledning og kilder bevares ved feil. Ollama og ekstern adapter bruker samme kildebaserte meldingsgrunnlag.
- Oppdatert `.env.example`, README og isolert synkroniseringstest. Beskrevet server-secrets, omstart, støttet API-format og begrensninger. Ingen ekstern URL, virkelig nøkkel eller leverandør er aktivert.
- Kontroll: Alle 31 tester, TypeScript, produksjonsbygg og Prettier bestod. En falsk testnøkkel satt ved bygging og variabelnavnet `MODEL_API_KEY` ble ikke funnet i 84 klient-/statiske sidefiler. HTTP-tester verifiserte at nøkkel, API-adresse og rå leverandørfeil ikke returneres til nettleseren. Isolert test av automatisk innholdsomlasting bestod. Eksterne modellkall er bare testet med simulert transport, ikke en virkelig leverandør.

## Ikke utgitt – felles innholdskilde for sider og Spør KI – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Flyttet innholdet for Kom i gang, Om (inkludert KI-prat) og Retningslinjer til `src/content/pages/`. Sidekomponentene viser innholdet gjennom en felles renderer som bevarer overskrifter, avsnitt, lister, forbehold og lenker til vedlegg.
- `knowledge.ts` avleder RAG-kilder og veiledning fra samme innhold, med referanser til avsnitts-ID-er i stedet for kopiert tekst. Manglende referanser gir feil ved bygging/testing. Om-sidens øvrige innhold inngår nå også i grunnlaget. Ressurskatalogen bruker fortsatt `resources.ts`.
- Lokalmiljøet kjører RAG med automatisk omlasting når importerte innholdsfiler endres. I produksjon skal nettsiden bygges og RAG-tjenesten startes fra samme revisjon; gamle chatmeldinger beholdes som historikk.
- Dokumentert hvor teksten vedlikeholdes og hvordan endringer kontrolleres. Lagt til regresjonstester for endret innhold, forbehold og ugyldige referanser, samt `test:content-sync` for automatisk API-omlasting i en isolert prosjektkopi.
- Kontroll: 26 tester og produksjonsbygg bestod. Alle 47 titler, ingresser og innholdsblokker ble funnet i de ferdigbygde sidene. Isolert integrasjonstest bekreftet at en endring i innholdsfilen automatisk oppdaterer RAG-tekst og veiledning. Ingen modellgenerering eller ny full tilgjengelighetsrevisjon er utført.

## Ikke utgitt – mer nyttige svar i Spør KI – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Erstatter visningen av lange kildeutdrag med en lesbar introduksjon, konkrete steg, forbehold og en direkte lenke til den mest relevante veiledningen. Uten språkmodell merkes dette tydelig som hentet veiledning, ikke et individuelt generert svar.
- Utvidet det eksplisitte kunnskapsgrunnlaget med Kom i gang, KI-prat og retningslinjeutkastet. Beta-status sendes også til en eventuell modell. Ingen private repoer eller dokumenter leses.
- Modellsvar kan vise avsnitt, lister, utheving og klikkbare kildehenvisninger uten å tolke HTML eller vilkårlige lenker. Forbedret instruksen for korte, kildebaserte svar med forbehold.
- Lagt til spørsmålsknapper, bedre veiledning ved manglende treff og rulling til starten av siste svar fremfor bunnen. Spørsmål behandles fortsatt separat.
- Oppdatert README og tester for relevante treff, Beta-/utkaststatus og validering av kildeformat og lenker. Lokal språkmodell er fortsatt ikke konfigurert; reell generering mot Ollama er ikke testet.
- Kontroll: Alle 23 tester, TypeScript, produksjonsbygg og formateringskontroll bestod. Kontrollert svar om KI-prat og verktøygodkjenning i lokal nettleser; sistnevnte beholder uavklart godkjenningsstatus. Dette er ikke en full tilgjengelighetsrevisjon. Lokalmiljøet er startet på nytt med oppdaterte kilder.

## Ikke utgitt – retningslinjeside – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Opprettet `/retningslinjer/` med veiledning om verktøy, arkivmateriale, kvalitet og agenttilgang, inspirert av NAVs side og tilpasset portalens målgruppe og design.
- Merket innholdet som arbeidsutkast, med avklaringspunkter for eierskap, godkjenninger og oppfølging. NAVs interne tillatelser er ikke overført til Nasjonalarkivet.
- Lagt til siden i hovedmenyen og nettstedskartet. Siden inngår ennå ikke i den dokumenterte tilgjengelighetsgjennomgangen eller RAG-kildene.
- Kontroll: TypeScript og `git diff --check` bestod, og de berørte kodefilene er formatert med Prettier. Ingen visuell nettleserkontroll er utført.

## Ikke utgitt – mandatforslag som vedlegg – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til den opprinnelige `ai-enablement-team.pdf` som vedlegg under omtalen av AI enablement-teamet på Om-siden, tydelig merket som mandatforslag med filtype og størrelse.
- PDF-en er kopiert uendret til `public/vedlegg/mandatforslag-ai-enablement-team.pdf` og følger nettstedet ved bygging. Ingen publisering eller ny tilgjengelighetsvurdering av PDF-en er utført.
- Kontroll: Filkopien er sammenlignet med originalen uten forskjeller. Prettier og `git diff --check` bestod.

## Ikke utgitt – KI-prat på Om-siden – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til omtale av KI-prat under «Om», basert på invitasjonsteksten: erfaringsdeling om KI, Teams-møter annenhver torsdag i opptil én time og videre diskusjon i Teams-kanalen.
- Tilpasset invitasjonen til varig informasjon på portalen; omtalen av det første møtet er utelatt.
- Presisert at KI-prat er for alle som jobber med produktutvikling i Nasjonalarkivet.
- Kontroll: Prettier og `git diff --check` bestod. Ingen funksjonalitet er endret.

## Ikke utgitt – Beta-merking av skills – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt til en synlig «Beta»-etikett på skill-kortene i ressurskatalogen, med forklaring om at de ennå ikke er gjennomgått av et menneske.
- Viser samme status og forklaring på skillenes detaljsider for å gjøre modenheten tydelig også ved direkte lenking.
- Kontroll: TypeScript, Prettier for de berørte filene og `git diff --check` bestod. Ingen visuell nettleserkontroll er utført i denne endringen.

## Ikke utgitt – samlet tilgjengelighetsdokumentasjon – 9. november 2026

**Utførende agent:** Codex (OpenAI).

- Flyttet erklæringsgrunnlaget og WCAG-kontrollen fra prosjektroten til `docs/tilgjengelighet/`, sammen med den daterte testhistorikken, for å samle dokumentasjonen og rydde prosjektroten.
- Oppdatert lenkene i README, kvalitetskontrollen og utviklingsplanen, samt WCAG-kontrollens relative lenker til testresultatene. Nettsidens URL og vurderinger er uendret.
- Kontroll: Lokale Markdown-lenker i de berørte dokumentene er kontrollert mot filsystemet, og `git diff --check` er kjørt uten feil. Ingen ny tilgjengelighetstest eller publisering er utført.

## Ikke utgitt – regler for versjonslogg – 7. november 2026

**Utførende agent:** Codex (OpenAI).

- Lagt inn krav i portalens `AGENTS.md` om å oppdatere loggen ved vesentlige endringer. Next.js-instruksjonene er bevart.
- Tilsvarende regler er lagt i Skills-repoet og tilgjengelighetsskillen, med tydelig ansvar for riktig repo-/prosjektlogg.
- Oppføringer skal dokumentere endring, begrunnelse, agent/person, kontroller og begrensninger. Dette er instruksjoner, ikke en automatisk Git-kontroll.
- Kontroll: Instruksjonene er lest tilbake, og `git diff --check` er kjørt uten feil i begge repoene.

## Ikke utgitt – tilgjengelighetsskill 0.3.0 – 7. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator`. Ingen underagenter.

- Standardisert lagring av testgjennomganger i det testede prosjektets daterte mapper, med unik kjørings-ID og bevaring av tidligere evidens.
- Nytt kjøringsverktøy lagrer rådata, feil, exitkoder, tidsstempler, agent og versjon, samt foreløpige rapporter med uavklart samlet status.
- Skillen skal etter vurdering oppdatere prosjektets eksisterende rapporter, lokale erklæring, README og versjonslogg med sporbarhet til kjøringen. Ingen blind automatisk overskriving av tidligere vurderinger.
- Oppdatert bibliotekets README, lagrings-/testveiledning, maler og versjonslogg. Portalens beskrivelse og brukseksempel viser versjon 0.3.0.
- Alle 15 regresjonstester av hjelpeverktøyene bestod i isolerte testprosjekter. Dette er ikke en ny full WCAG-revisjon av portalen.

## Ikke utgitt – tilgjengelighetsskill 0.2.0 – 7. november 2026

**Utførende agent:** Codex (OpenAI), med `skill-creator`. Ingen underagenter.

- Utvidet skillen i Skills-repoet fra erklæringsutforming til testing med tilgjengelige verktøy, dokumenterte funn, prioriterte rettingsforslag, retest og erklæringsgrunnlag.
- Lagt til testveiledning, rapportmal og lokale Python-hjelpere for avgrenset HTML-grunnkontroll og kontrastberegning. Kandidater, bekreftede brudd og uavklarte tester skilles fra hverandre.
- Kodeendringer i et testet nettsted krever at dette er del av brukerens oppdrag. Ingen automatisk sertifisering eller publisering innføres.
- Oppdatert portalens tittel, beskrivelse, brukssteg, søkeord, eksempel og versjonsmerking til 0.2.0. Instruksjonene er generelle for alle brukere.
- Hjelperne er kontrollert med åtte regresjonstester og prøvd mot portalens lokale HTML-eksport. Dette validerer hjelpeverktøyene, ikke full tilgjengelighet eller agentens samlede vurdering.
- Justert kildehenting slik at eksakte tittelord rangeres høyere enn prefikstreff; den utvidede skill-beskrivelsen skal ikke fortrenge kodegjennomgang for spørsmål om kodeendringer.
- Alle 21 portaltester og begge byggvariantene bestod. Beskrivelsen og versjon 0.2.0 er kontrollert i nettleseren. Skill-repoet og den installerte kopien er identiske.

## Ikke utgitt – generell brukerveiledning – 7. november 2026

**Utførende agent:** Codex (OpenAI).

- Omskrevet skillens installasjonsveiledning for alle brukere, uten antakelser om en bestemt maskin, assistent eller eksisterende installasjon.
- Brukseksemplet ber om navn eller nettadresse til brukerens nettsted.
- Erstattet «Lokal skill» med «Under utprøving» og presisert at distribusjon ennå ikke er satt opp. Ingen nedlasting eller GitHub-lenke er lovet som tilgjengelig.

## Ikke utgitt – lokalt Skills-bibliotek og katalog – 7. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

- Opprettet separat lokalt `Skills`-repo i `/Users/khadah/Documents/ChatGPT/Skills`, med første commit `85af197`. GitHub-tilkobling er ikke konfigurert; brukeren avklarte at repoet skulle være lokalt.
- Lagt tilgjengelighetsskillen i `skills/tilgjengelighetserklaering/`, med README og bidragsveiledning for flere skills. Den installerte Codex-kopien er beholdt.
- Lagt til søkbar katalogressurs og detaljside med versjon, brukseksempel og lokal repo-plassering.
- Katalogen søker også på nøkkelord, skill-navn og flere søkeord, uavhengig av store/små bokstaver og aksenter.
- Skilt lokale skills fra eksempelressurser i visningen. Bare godkjent beskrivende innhold inngår i klient- og RAG-data; selve skill-pakken følger ikke med i nettstedet.
- 21 tester passerer, inkludert nye søke- og kildehentingstester. Begge byggvariantene og HTML-grunnkontrollen for 13 filer bestod.
- Søk på fire relevante ord og åpning av skillens detaljside er kontrollert i nettleseren. Utviklingsmiljøet er startet på nytt for å laste nye statiske ruter og kilder.

## Ikke utgitt – oppdatert erklæringsutkast – 7. november 2026

**Utførende agent:** Codex (OpenAI), med skillen `tilgjengelighetserklaering`. Ingen underagenter.

**Status:** Lokale endringer; ikke committet eller publisert.

- Tilpasset tilgjengelighetssiden og erklæringsgrunnlaget til skillens arbeidsmal og kontrollert veiledning hos Uu-tilsynet.
- Presisert hvilke ni sider testgrunnlaget gjelder, alternative veier til innholdet og kontaktoppfølging som fortsatt må avklares.
- Skilt testdato 6. november fra tekstoppdatering og kildekontroll 7. november. Ingen ny WCAG-revisjon eller nye testresultater er påstått.
- Dokumentert de åtte uavklarte kriteriene og betydningen av arbeidskodene K/I/U. Utkastet er ikke klart til formell registrering.
- Kontaktadressen fra prosjekteier er beholdt. Juridiske registreringsopplysninger, endelig nettadresse og godkjenner er fortsatt uavklart.
- Produksjonsbygg bestod. Den oppdaterte siden er kontrollert visuelt; skjermbilde ligger i `docs/tilgjengelighet/2026-11-07/`. Dette er tekst-/visningskontroll, ikke en ny full WCAG-test.

## Ikke utgitt – utvidet tilgjengelighetskontroll – 6. november 2026

**Utførende agent:** Codex (OpenAI). Ingen underagenter.

**Status:** Lokale endringer på grunnlag av `f055757`. Ikke committet eller publisert.

- Vurderingsmatrise for 48 WCAG-krav med avgrensede kontroller og uavklarte punkter.
- Tilgjengelighetsside og nettstedskart med lenker fra alle siders bunntekst.
- Grunnlag for formell erklæring i uustatus.no, kontaktadressen oppgitt av brukeren og informasjon om klage. Ingen formell erklæring registrert.
- Forbedret kantkontrast, feilmeldinger, tastaturfokus og kildevisning i chatten. Bedre linjebryting og støtte for redusert bevegelse.
- To kontrasttester og grunnkontroll av eksportert HTML. Alle 18 tester, begge byggvarianter og HTML-kontrollen bestod.
- Ni sider kontrollert ved tre skjermstørrelser, tekstavstander prøvd på åtte sider og chat. Evidens i `docs/tilgjengelighet/2026-11-06/`.
- Samlet samsvar kan ikke bekreftes før gjenstående skjermleser-, zoom- og manuelle kontroller er utført.

## Dokumentasjon og tilgjengelighetsrettinger – 6. november 2026

**Status:** Committet lokalt som `f055757`; ikke publisert.

**Utførende agent:** Codex (OpenAI), i prosjektets eksisterende chat.

### Endret

- Oppdatert utviklingsplanens faseoversikt og oppgaver mot faktisk implementasjon og lokal Git-historikk.
- Opprettet `KVALITETSKONTROLL.md` med utførte kontroller, funn og gjenstående arbeid.
- Opprettet denne versjonsloggen og lenket den fra README.

### Rettet

- «Hopp til innhold» flytter nå tastaturfokus til hovedinnholdet.
- Utvidet fokusmarkering til tekstområder, utfellbare kilder og hovedinnhold.
- Fjernet duplisert ID i chatdialogen, slik at dialogens tittel identifiseres entydig.
- Gitt menylenker og utfellbare kilder minst 44 pikslers høyde.
- Reservert plass i bunnteksten under den flytende chatknappen.
- Markert eksisterende myk rulling med Next.js-attributtet `data-scroll-behavior`.

### Kontrollert

- Forsiden visuelt ved 320, 390 og 1280 pikslers bredde; alle seks undersider kontrollert for horisontal overflyt ved 320 piksler.
- Interne lenkemål, katalogsøk, tomtilstand, nullstilling og typefilter.
- Chat med kildeutdrag, kildelenke, Escape-lukking, retur av fokus og entydig dialogtittel.
- Alle 16 eksisterende tester, vanlig produksjonsbygg, Pages-bygg og formateringskontroll bestod etter kodeendringene.
- Skjermleser, zoom, full kontrastkontroll og flere nettlesere gjenstår. Se [kontrollrapporten](KVALITETSKONTROLL.md).

**Git-referanse:** `f055757`, bygger på `ed873b7`.

## 0.1.0 – første lokale versjon – 6. november 2026

**Status:** Lagret i lokal Git. Ikke publisert. Versjonsnummeret følger `package.json`.

**Utførende agent:** Codex (OpenAI), basert på arbeid dokumentert i prosjektets chat og utviklingsplan.

**Git-referanse:** `ed873b7` – «Første versjon av KI-Produktutvikling».

Implementasjonen ble i hovedsak dokumentert 30. oktober 2026; 6. november er datoen for den første commiten.

### Lagt til

- Lokal Next.js-portal med TypeScript og separat statisk Pages-bygg.
- Digitalarkivets MUI-tema med portalens eget futuristiske uttrykk, arklogo og favicon.
- Forside, verktøykatalog med søk og filtre, tre ressursdetaljer, Kom i gang og Om.
- Chat på forsiden og egen spørreside, offentlig nøkkelordbasert kildehenting og lokal Ollama-adapter.
- Statisk kildesøk uten modellkall i Pages-varianten.
- Moduldeling av chat, RAG-server, stiler og designverdier.
- Tester og dokumentasjon for oppstart, arkitektur og videre utvikling.

### Begrensninger

- Innholdet består av offentlige eksempler. Faktiske installasjonspakker, innlogging og internt innhold er ikke implementert.
- Ingen GitHub-remote, CI eller automatisk publisering er konfigurert.
- Generering med en faktisk modell er ikke verifisert.

## Slik vedlikeholdes loggen

- Før nye endringer under «Ikke utgitt», med dato og faktisk utførende agent eller person. Ved flere agenter oppgis hvem som gjorde hvilke deler.
- Beskriv endringen, hvorfor den ble gjort, hva som er kontrollert og eventuelle begrensninger.
- Ved versjonering: opprett en datert versjonsoppføring og oppgi faktisk commit eller tag. Ikke merk en versjon som publisert før utrullingen er verifisert.
- Git-forfatter, agent og versjonsnummer skal ikke antas å være det samme. Ikke oppgi en modellvariant uten at den er kjent.
