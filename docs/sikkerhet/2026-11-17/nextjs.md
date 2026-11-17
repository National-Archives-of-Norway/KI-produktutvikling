# Next.js-sikkerhetsvarsel og retting

17. november 2026 · Codex (OpenAI), uten underagenter. Kildegrunnlag: HEAD 3899c18d og arbeidskopi med tidligere ukommiterte driftsnotater, som er bevart. Dette er en avgrenset avhengighets-/byggkontroll, ikke samlet produksjonsgodkjenning.

## Konklusjon

Next.js er oppgradert og eksakt låst fra 16.4.3 til **16.4.6**. Utgiverens sju novembermeldinger omfatter 16.4.3 og er rettet fra 16.4.5. Den valgte 16.4.6 er en stabil patch på samme hoved-/underversjon, verifisert som latest i npm-registeret og mot [utgiverens release](https://github.com/vercel/next.js/releases/tag/v16.4.6). React 19.3.1 og prosjektets Next-konfigurasjon er uendret.

En godkjent npm-audit fant dessuten tre basic-ftp-sårbarheter i ChromeDriver/axe-kjeden. En målrettet get-uri-patch tar inn basic-ftp 6.2.6. Endelig audit rapporterer **0 kjente funn**. Dette betyr ikke at alle mulige sikkerhetsfeil eller produksjonskrav er vurdert.

## Hvorfor første bygg feilet og andre kunne bestå

Installert 16.4.3-kode i next/dist/lib/upgrade/nudge.js oppretter SecurityFatalError når sikkerhetsvurderingen ber om oppgradering. allowNudgeRetry kan tillate én ny kjøring innen en femminuttersfrist gjennom en kvittering under byggcachen. prepare-upgrade.js henter sikkerhetsmetadata fra npm. Dette forklarer at en uendret gjentakelse kan slippe gjennom uten patch; det beviser ikke nøyaktig hvilken historisk kvittering som ble brukt. Vi endrer ikke denne logikken, setter ingen omgåelsesflagg og deaktiverer ingen sikkerhetskontroll.

## Utgiverens Next.js-meldinger

[Release 16.4.5](https://github.com/vercel/next.js/releases/tag/v16.4.5) samler meldingene. Versjonsintervaller er hentet fra GitHubs offentlige advisory-API: global metadata for den første, og utgiverens repo-advisory-API for de øvrige. Enkeltstående HTML-visning viste ufullstendig patchinformasjon, så strukturerte utgiverdata er brukt. Semver-sammenligningen normaliserer komma mellom komparatorer til mellomrom og validerer intervallet før sammenligning.

Alle sju har alvorlighet medium/moderate. 16.4.3 er innenfor og 16.4.6 utenfor de oppgitte berørte intervallene. Biblioteket er derfor oppgradert selv der prosjektets nåværende kode ikke oppfyller utnyttelsesvilkårene. Ingen aktiv utnyttelse eller datalekkasjer er påvist i denne kontrollen; det er heller ikke utført en penetrasjonstest.

| Melding / CVE                                                                                                      | Berørt 16.x          | Rettet fra | Før → etter                  | Prosjektrelevans                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------ | -------------------- | ---------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [GHSA-mfr8-8qww-v76h](https://github.com/advisories/GHSA-mfr8-8qww-v76h) / CVE-2026-119790                         | >= 16.3.0, <= 16.4.4 | 16.4.5     | Berørt → utenfor intervallet | Cache mellom root-parametre via unstable_cache. Ingen bruk av use cache/unstable_cache funnet i src/.                                                                                                                              |
| [GHSA-vc7v-qv4w-wrv8](https://github.com/vercel/next.js/security/advisories/GHSA-vc7v-qv4w-wrv8) / CVE-2026-119351 | >= 16.2.0, <= 16.4.4 | 16.4.5     | Berørt → utenfor intervallet | Nestet cache med forsinket metadata. Cache Components/use cache er ikke aktivert i prosjektet.                                                                                                                                     |
| [GHSA-vvgp-ww4w-46vf](https://github.com/vercel/next.js/security/advisories/GHSA-vvgp-ww4w-46vf) / CVE-2026-119350 | >= 16.4.0, <= 16.4.4 | 16.4.5     | Berørt → utenfor intervallet | Forgiftet fallback-cache. Cache Components er ikke aktivert; de beskrevne forutsetningene er ikke etablert.                                                                                                                        |
| [GHSA-rhh4-g77r-r9qj](https://github.com/vercel/next.js/security/advisories/GHSA-rhh4-g77r-r9qj) / CVE-2026-119349 | >= 16.0.0, <= 16.4.4 | 16.4.5     | Berørt → utenfor intervallet | Cache med binære argumenter. Ingen use cache-funksjoner funnet i src/.                                                                                                                                                             |
| [GHSA-pc58-hwjq-p385](https://github.com/vercel/next.js/security/advisories/GHSA-pc58-hwjq-p385) / CVE-2026-119348 | >= 16.0.0, <= 16.4.4 | 16.4.5     | Berørt → utenfor intervallet | Feil innramming av videresendt respons. Ingen egne Next-route-handlere som returnerer upstream Response funnet. RAG bruker rewrite; dette er ikke en påstått reproduksjon av feilen eller en vurdering av fremtidig reverse proxy. |
| [GHSA-7qx7-33qx-rqx2](https://github.com/vercel/next.js/security/advisories/GHSA-7qx7-33qx-rqx2) / CVE-2026-119347 | >= 16.0.0, <= 16.4.4 | 16.4.5     | Berørt → utenfor intervallet | SVG kan passere bildeoptimalisering. Ingen next/image-import funnet, men dette er ikke bevis for at serverens bilde-endepunkt er utilgjengelig.                                                                                    |
| [GHSA-f3mh-rxg3-f5g2](https://github.com/vercel/next.js/security/advisories/GHSA-f3mh-rxg3-f5g2) / CVE-2026-119346 | >= 16.0.0, <= 16.4.4 | 16.4.5     | Berørt → utenfor intervallet | HttpOnly-cookie eksponert i header på Edge-ruter. Ingen Edge-ruter eller NextResponse-cookiehåndtering funnet i src/.                                                                                                              |

## Supplerende audit og verktøykjede

Brukeren godkjente uttrykkelig at pakkenavn/versjoner kunne sendes til registry.npmjs.org. Før denne godkjenningen avviste automatisk godkjenningskontroll audit-kommandoen; den kjøringen ble ikke utført eller omgått. Førmålingen nedenfor ble deretter kjørt i en midlertidig kopi av HEADs package.json og pnpm-lock.yaml, og ettermålingene mot arbeidskopien. Kildekode og API-nøkler ble ikke sendt av audit.

| Låsefiltilstand                               | High | Moderate | Totalt | Exit-kode |
| --------------------------------------------- | ---: | -------: | -----: | --------: |
| Opprinnelig Next 16.4.3 / basic-ftp 5.3.1     |    1 |        3 |      4 |         1 |
| Bare Next 16.4.6 oppdatert                    |    1 |        2 |      3 |         1 |
| Next 16.4.6 / get-uri 8.0.2 / basic-ftp 6.2.6 |    0 |        0 |      0 |         0 |

npm-audit rapporterte bare én av de sju Next.js-meldingene, GHSA-mfr8-8qww-v76h. Utgiverens separate kontroll gir derfor et bredere Next-grunnlag enn audit alene.

De tre øvrige funnene er [GHSA-c475-qrg2-pj4r](https://github.com/advisories/GHSA-c475-qrg2-pj4r) (CPU/DoS, high, rettet fra 6.2.1), [GHSA-5pm8-86m8-9m6r](https://github.com/advisories/GHSA-5pm8-86m8-9m6r) (MLSD-parser/DoS, moderate, rettet fra 6.2.4) og [GHSA-r4jh-29pc-gfqr](https://github.com/advisories/GHSA-r4jh-29pc-gfqr) (CR/LF-relatert prosessfeil, moderate, rettet fra 6.2.3).

Kjeden er chromedriver 157.0.0 og axe/cli 4.14.0 → chromedriver 152.0.3 → proxy-agent 8.0.2 → pac-proxy-agent 9.1.0 → get-uri. Den gamle pac-pakken låser get-uri nøyaktig til 8.0.1; vanlig målrettet update beholdt derfor gammel kjede. pnpm-workspace.yaml overstyrer **bare pac-proxy-agent@9.1.0>get-uri til 8.0.2**, som offisielt krever basic-ftp ^6.2.4; låsefilen løser den til 6.2.6. Ingen ny direkte avhengighet eller global basic-ftp-majoroverstyring er lagt til. Den avgrensede regelen kan fjernes når foreldrekjeden bruker rettet get-uri uten den.

pnpm la til et eksplisitt minimumReleaseAgeExclude for **bare get-uri@8.0.2**, slik at den ferske sikkerhetspatchen kan installeres reproduserbart. Alderskontrollen er ikke slått av generelt. Dockerfile og .dockerignore inkluderer nå pnpm-workspace.yaml, så frossen Docker-installasjon bruker samme override og policy som CI/lokal installasjon. Runtimebildet kopierer også utviklingsavhengigheter; «testverktøykjede» betyr derfor ikke at pakken nødvendigvis er fysisk fraværende i bildet.

## Lokale kontroller

- pnpm install --frozen-lockfile --ignore-scripts bestod; installasjonsskript for ChromeDriver/Nu ble ikke kjørt på nytt.
- pnpm check bestod med endelig avhengighetssett: formatering, typekontroll, **292/292 Node-tester**, **3/3 Python-tester**, reell innholdssynk, 240 filmål og serverbygg på Next.js 16.4.6.
- pnpm build:pages bestod også med endelig sett, uten SecurityFatalError. Generert next-env.d.ts-endring tilbakeføres til den opprinnelige kilden etter bygg.
- pnpm exec axe --version ga 4.14.0; ChromeDriver-pakken er fortsatt 157.0.0. En nettverksfri import-/data-URI-prøve gjennom den faktiske ChromeDriver → proxy → get-uri-kjeden bestod. Dette er ikke en ny full axe-/WCAG-kjøring eller FTP-integrasjonstest.
- Første forsøk på lokal pnpm-verktøykjøring etter workspace-endringen startet policyverifisering i restriktiv sandbox og traff DNS-blokkering. Det ble avbrutt; frossen installasjon og endelige kontroller med nødvendig nettverkstilgang bestod. En tidligere semver-prøve avviste GitHub-formatets komma; korrekt normalisering og validering ga 7 berørte før / 0 etter.
- Fortsatt DEP0169-advarsel fra testløpets proxyavhengighet om eldre url.parse. Dette er ikke et separat bekreftet advisory-funn og skal ikke forveksles med det rettede SecurityFatalError-varselet.

## Endelig Docker-kontroll

Docker/Linux arm64-bygget med frossen låsefil og workspace-konfigurasjon bestod. Bare portalcontaineren ble gjenskapt med --no-deps --no-build. Det kjørende bildet er sha256:5fa36d953cc78ca34e2ea928b05af4f16f16e602dfb07e91d2379fb189b7b5a0, fra den ukommiterte arbeidskopien; det er ikke et rent commitbygg eller en publisert release.

Runtime bekreftet Next.js 16.4.6, Node 24.22.2 og bare get-uri 8.0.2/basic-ftp 6.2.6 i den aktuelle virtuelle pakkekjeden. Forsiden, /spor/, /priser/ og Copilot-retningslinjene ga HTTP 200. RAG-health ga 200, status=ok/generationEnabled=true, og portalcontaineren er healthy. SHA-256 for package.json, RAG-http og felles tidsbudsjett samsvarte mellom vert/container; manifesthash er 396b0c4fea6c380263c9b21b54a9e6a86f8ea14af526f4392998e01e710a9108.

Ollama beholdt ID/starttid og RestartCount=0. Modellvolumet ki-produktutvikling_ollama-models beholdt opprettelsestid 2026-11-12T17:03:27Z og manifesthash 31d9857b5705086d352d4d6db04e86c5d0f6a2b5d59a4dc7ce5cdb271ccf9141. Ingen ny nedlasting eller volumfjerning.

Dette er Docker-bygg-/HTTP-kontroll, ikke en ny full Node-/Python-testpakke i Linux, faktisk modellgenerering eller nettleser-/skjermleserprøve. Den eksisterende lokale utviklingsserveren på 3000 er ikke startet på nytt og kan fortsatt ha gammel Next lastet i prosessen; den oppdaterte Docker-portalen på 3005 er verifisert. Endelige dokumentnotater er skrevet etter bildet.

## Avstemming og begrensninger

Sikkerhetsvarselet og de bekreftede avhengighetsfunnene er rettet i arbeidskopien og kjørende lokal Docker. P9 er fortsatt åpent for faktisk delt drift, overvåking, personvern og lanseringsgodkjenning; en audit uten kjente funn er ingen samlet sikkerhetsgodkjenning. Videre vedlikehold må fjerne det avgrensede override-/release-age-unntaket når foreldrekjeden kan oppdateres normalt. Ingen modell-/priskildekall, blindmåling, GitHub-kjøring, commit eller push. Tidligere ukommiterte driftsnotater er bevart.

Sluttkontroll bestod: pnpm format:check, pnpm test:links (242 filmål i 12 dokumenter), pnpm typecheck etter tilbakeført next-env.d.ts og git diff --check.

## Oppfølging 17. november – utviklingsserverens module-factory-feil

Etter kontrollen over meldte brukeren Runtime Error på Kom i gang og Om, med 16.4.3 i modulstien. Prosess- og HTTP-kontroll bekreftet at prosjektets gamle utviklingsserver på 3000 fortsatt kjørte next-server 16.4.3, mens installert pakke var 16.4.6. HTML og .next/dev inneholdt gamle referanser. Begge sider hadde allerede Cache-Control: no-store; ingen service-worker-registrering ble funnet i applikasjonskoden. Den konkrete feilmeldingen i brukerens eksisterende fane er rapportert av brukeren, ikke separat fanget før restart.

Prosjektets dev-supervisor ble avsluttet kontrollert og portene 3000/3001 frigitt. Bare generert .next/dev ble slettet; pnpm dev startet med Next 16.4.6. Docker-portalen, produksjonsbygget og modellvolumet ble ikke endret i denne oppfølgingen.

| Kontroll                             | Før                                  | Etter                                                                                                                                                         |
| ------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kjørende Next på 3000                | 16.4.3                               | 16.4.6                                                                                                                                                        |
| /kom-i-gang/ og /om/                 | HTTP 200, gamle 16.4.3-referanser    | HTTP 200, 16.4.6-referanser og ingen 16.4.3-referanser                                                                                                        |
| Cache-Control                        | no-store                             | no-store                                                                                                                                                      |
| Nettleser                            | Brukerrapportert module-factory-feil | Begge sider rendret ved menynavigering; ny navigering og omlasting av Kom i gang bestod. Ingen Runtime Error eller module-factory-feil registrert i testfanen |
| Automatisk søkekontroll ved devstart | Ikke kjørt på nytt før restart       | 126/126 bestod                                                                                                                                                |
| Lokal RAG /health                    | Ikke målt i førprøven                | HTTP 200, status=ok/generationEnabled=false uten .env.local                                                                                                   |

README er supplert med omstart og eventuell sletting av bare utviklingscachen etter oppgradering. Ingen brukerfunksjon eller API-kontrakt endres. Ingen ny full testpakke, modellgenerering, skjermleserprøve, commit eller push. Testen gjelder en ny nettleserfane; brukerens gamle fane kan fortsatt trenge full omlasting.
