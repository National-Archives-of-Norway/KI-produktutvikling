# Sjekkliste for første push

For repoansvarlig. **Oppdatert 16. november 2026 av Codex (OpenAI), uten underagenter.** Første push er gjennomført av brukeren via GitHub Desktop. Lokal origin peker til nasjonalarkivet/KI-produktutvikling; brukerens GitHub-skjermbilde viser privat repo og commit 8a14484 på main. Innstillinger og effektiv tilgang er ikke inspisert. Første delte miljø skal være en lukket pilot.

Historisk lokal Docker/Linux arm64-kontroll av c22f1dc har bestått hele kommandorekken på Node 22.18.0 og 24.22.2, inkludert begge bygg. [Kontrollrapporten](CI-KONTROLL.md) dokumenterer dette; den erstatter ikke avkrysning av GitHub-punktene nedenfor. [Dokumentasjonsoversikten](DOKUMENTASJON.md) samler gjeldende status og utkast.

## Gjeldende Node-oppsett – 16. november 2026

CI er forenklet til én jobb: **Node 24**. engines.node er >=24.0.0 <25.0.0, prisjobben bruker allerede 24 og Docker beholder sitt låste Node 24-bilde. Tidligere kontroller av Node 22/24 nedenfor er historikk, ikke gjeldende krav om to jobber. Endringen løser ikke IP-blokkeringen.

## Etter første push – bekreftet blokkering i IP-listen

- [x] Lokal remote og tracking er kontrollert: main følger origin/main på 8a14484. Brukerens skjermbilder bekrefter opplasting. Ingen ny push, fetch, grenbytte eller historikkendring er utført i denne undersøkelsen.
- [ ] **CI er ikke grønn:** ved første push feilet begge jobbene i den daværende matrisen før Node-oppsett/tester. Ny Node 24-jobb er ikke kjørt på GitHub. Loggfilen lest lokalt 16. november bekrefter tre fetch-forsøk med HTTP 403: repo-eierens IP allow list tillater ikke runnerens IP. Workflowene bruker ubuntu-latest; Node-versjonen er ikke årsaken til denne checkout-feilen.
- [x] Lest det vedlagte checkout-utdraget lokalt uten å kopiere råloggen til repoet eller gjengi nøkler, autorisasjonshoder eller IP-adresser. Den tidligere manglende feilmeldingen er nå funnet; se [kontrollrapporten](CI-KONTROLL.md#bekreftet-checkout-blokkering--16-november-2026).
- [ ] **Organisasjons-/runneradministrator:** avklar en godkjent Linux-runner med tillatt utgående IP og tilgang til dette repoet. Alternativer er organisasjonens self-hosted runner eller større GitHub-hosted runner med statiske IP-er der abonnement/oppsett støtter det. En runner-gruppes tilgang styres for repoer/workflows; personlig medlemskap i gruppen er ikke løsningen på den påviste IP-avvisningen. Be om eksakt gruppe og labels/navn.
- [ ] Oppdater runs-on i både ci.yml og pricing-sync.yml til den avklarte runneren, og få administrator til å kontrollere nødvendige IP-regler. Ikke gjett labels, slå av IP-listen eller tillat alle GitHub-hosted adresser. Prisjobben har samme runner-valg og samme risiko, men ingen faktisk prisjobbfeil er dokumentert av dette loggutdraget. [GitHubs veiledning om IP-listen og Actions](https://docs.github.com/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/managing-allowed-ip-addresses-for-your-organization).

- [x] Gjennomgått kildekoden til actions/checkout ved workflowens låste d23441a48e516b6c34aea4fa41551a30e30af803. [Fetch bruker vanlig kommandoutskrift](https://github.com/actions/checkout/blob/d23441a48e516b6c34aea4fa41551a30e30af803/src/git-command-manager.ts); [Removing auth ligger i finally](https://github.com/actions/checkout/blob/d23441a48e516b6c34aea4fa41551a30e30af803/src/git-source-provider.ts), og kjøres ved feil når persist-credentials er false. Oppryddingslinjen beviser derfor ikke at tokenet ble fjernet før fetch. contents:read og persist-credentials:false beholdes; ingen PAT, økte rettigheter eller bytte av action-versjon uten årsaksgrunnlag.
- [x] Ny lokal kontroll av 8a14484 på macOS arm64, Node 24.22.1, pnpm 11.25.0 og Python 3.9.6: pnpm check bestod med 278/278 Node-tester, 3/3 Python-tester, faktisk innholdssynk, 224 filmål i 12 dokumenter, format, typer og produksjonsbygg. pnpm build:pages bestod også, begge med 28 genererte sider. Dette reproduserer ikke GitHub-checkout og er ikke en ny kontroll på Node 22/Linux. Ingen ekte pris-/modellkall eller blindmåling.
- [ ] Etter godkjent runner-/IP-konfigurasjon: verifiser checkout og hele Node 24-jobben på riktig commit ved en separat godkjent push/kjøring. Lokale appkontroller verifiserer ikke organisasjonens IP-regler. Ingen runner-/GitHub-innstilling er endret her.
- [ ] Kontroller den separate initialcommiten på master og avklar standardgren. Skjermbildet viste main 50 commits foran og én bak master; ingen fletting, sletting eller endring av standardgren er utført.

Den lokale kontrollen ovenfor er utført før denne dokumentoppdateringen. Den tidligere før-push-kontrollen nedenfor beholdes med sin opprinnelige revisjon og sitt testomfang.

## Klart lokalt – kontrollert 16. november 2026

Kontrollgrunnlag: ren arbeidskopi ved start, commit `a762ac14dae8d6337b3ee9641ff34f96f3e81e7f`. Kjørt på macOS arm64 med Node 24.22.1, pnpm 11.25.0 og Python 3.9.6, med eksisterende avhengigheter. Dette er ikke en ny Linux-/Node 22-, sikkerhets- eller GitHub-kontroll.

- [x] `pnpm check` bestod med exit 0: format, typekontroll, **278/278 Node-tester**, **3/3 Python-tester**, faktisk innholdsomlasting (også søkenøkkelord), **218 relative filmål i 12 dokumenter** og Next-produksjonsbygg (28 genererte sider).
- [x] `pnpm build:pages` bestod med exit 0: statisk eksport av 28 sider og `out/.nojekyll`. Ingen publisering er utført. Spør KI i Pages-varianten er statisk demo, ikke modellgenerering.
- [x] Testene brukte prisfixturer og simulert modelltransport; ingen `pricing:sync`, ekte modellprøve eller `test:blind` ble kjørt. Første `check` stoppet med `listen EPERM` fordi sandkassen blokkerte lokale testporter; hele kommandoen bestod ved ny kjøring med nødvendig tilgang. En `url.parse()`-deprekasjonsadvarsel ble skrevet ut uten testfeil.
- [x] Organisasjonsrepo er opprettet, ifølge brukeren. Dette bekrefter ikke synlighet, tilgang eller innhold på GitHub.

Dokumentoppdateringene i denne økten er skrevet etter byggene. Etterkontroll: 224 relative filmål i 12 dokumenter, pnpm format:check og git diff --check bestod. Byggets genererte endring i next-env.d.ts er tilbakeført til kildebasen. Funksjonskode og workflows er uendret; ingen nye produksjonskrav er godkjent. Docker-portalen og modellvolumet er ikke endret av disse kontrollene.

## Må avklares før første push

- [ ] Bekreft URL, at repoet er **privat**, hvem som har tilgang (inkludert organisasjonens standardtilgang), og om virksomheten godkjenner dette lagringsstedet. Kontroller om repoet allerede inneholder commits før lokal historikk kobles til; ikke bruk force-push for å erstatte dem.
- [ ] Innholdseier må godkjenne mandat-/deltakeropplysninger i PDF-er og arkiverte bilder, kontakt-/forfatteropplysninger og lokale stier. Gjennomgå både dagens filer og historikken som skal deles. [Sikkerhetsrapporten](sikkerhet/2026-11-16/status-for-github.md) angir filsteder og begrensninger; den gjelder en eldre revisjon (`1258176`) og er ikke kjørt på nytt her.
- [ ] Ta stilling til de to historiske Next.js-preview-verdiene: sladding i dagens fil fjerner dem ikke fra tidligere commits. Historikkrensing er et separat valg, ikke gjennomført eller automatisk besluttet her. Blindsettets eier må selv vurdere eventuelle historiske blinddata; kodeassistenten skal ikke lese dem.
- [ ] Avklar øvrig [bevislagring](BEVISLAGRING.md). Den godkjente skjermbildeoppryddingen er gjennomført, men arkivering i repoet begrenser ikke tilgangen ved push, og eldre objekter følger fortsatt historikken.
- [ ] Bestem om prisjobben skal kjøre fra start. Den har daglig tidsplan kl. **06:00 UTC** og kan opprette/oppdatere PR-er. Skal den vente, fjern tidsplanen lokalt før push eller deaktiver Actions i GitHub-repoet før opplasting. Ingen av delene er endret her.

## Før opplasting

- [ ] Beslutt [bevislagring](BEVISLAGRING.md): hva beholdes i Git, eventuelt Git LFS eller ekstern lagring med sjekksummer. Vurder også bevis som allerede ligger i lokal Git-historikk før første push; en senere sletting fjerner ikke gamle Git-objekter. Skjermbildeoppryddingen er dokumentert i bevislagringsnotatet; ingen nye bevis er flyttet eller slettet i denne kontrolløkten.
- [ ] Gjennomgå innhold/historikk og bekreft at ingen hemmeligheter eller uavklart internt innhold følger med. Velg eier, privat repo, standardgren og tilgang. Privat repo erstatter ikke innlogging til nettstedet.
- [x] Koble lokal Git og utføre første push til main (brukerens GitHub Desktop/skjermbilder, 16. november). Dette krysser ikke av innholds-/tilgangsgodkjenningene over.
- [ ] Kontroller at workflow-filene og dependabot.yml ligger på den besluttede standardgrenen. Prisjobben har daglig schedule kl. 06:00 UTC; faktisk aktivering/kjøring er ikke verifisert.

## Actions og branch protection

- [ ] I **Settings → Actions → General**, tillat de fire SHA-låste action-repoene som er listet i [CI-kontrollen](CI-KONTROLL.md). Bekreft at organisasjonens policy og runner tillater dem.
- [ ] Behold standard **Workflow permissions** med lesetilgang. Prisjobben ber eksplisitt om contents:write og pull-requests:write i samme repo. Tillat **Allow GitHub Actions to create and approve pull requests** der policy tillater det; jobben oppretter/redigerer PR-er, men godkjenner eller fletter dem ikke. Ingen PAT eller tilgang til andre repoer skal innføres.
- [ ] Beskytt standardgrenen med ruleset/branch protection: krev PR, minst én uavhengig godkjenning og at nye endringer må vurderes på nytt. Blokker force-push og sletting av standardgrenen; avklar eventuelle administrative unntak.
- [ ] Etter første vellykkede CI-kjøring med nytt oppsett: gjør **Node 24** påkrevd i branch protection/ruleset. Fjern et eventuelt gammelt krav til Node 22.18.0, slik at en jobb som ikke lenger finnes ikke blokkerer PR-er. Velg det faktiske sjekknavnet GitHub viser og GitHub Actions som forventet kilde. Prøv med en PR at feil/manglende status hindrer fletting.
- [ ] Prisjobben bruker force-with-lease på sin reserverte `codex/pricing-sync`-gren. Et generelt force-push-forbud for alle grener må ikke utilsiktet hindre dette; avgrens regelen til standardgrenen eller vedta en annen prisflyt. Ikke gi prisjobben bypass på standardgrenen.
- [ ] Kontroller ukentlig Dependabot for github-actions. Oppdaterings-PR-er skal gjennom samme review/CI. Ikke aktiver automatisk fletting eller en botregel som fletter dem.

## Første manuelle kjøringer på GitHub

- [ ] **Actions → CI → Run workflow**, velg standardgrenen. Kontroller nøyaktig commit-SHA, én Node 24-jobb, faktisk 24-versjon og pnpm fra packageManager i loggen. Format, typer, hele testpakken, serverbygg og Pages-bygg skal lykkes. Ingen prissynk eller ekte modell skal kjøres av CI.
- [ ] **Actions → Oppdater priser → Run workflow**, med standardgrenen valgt. Dette **henter ekte offentlige priskilder** og kan skrive prisgren/PR. Kontroller kilde-/feilstatus, ingen PR ved bare datostøy, én opprettet/oppdatert PR ved reell endring, bare snapshot/versjonslogg i diff og ingen endringer på standardgrenen. Ved kildefeil skal gamle priser bevares og jobben melde feil. Observer senere oppdatering eller uendret kjøring uten å lage kunstige live-prisendringer; lokal fixture-test dekker disse grenene.
- [ ] For en pris-PR: kjør **CI → Run workflow på codex/pricing-sync**, fordi hendelser fra GITHUB_TOKEN normalt ikke utløser ny CI. Prisjobben henter alltid standardgrenen, uansett hvilken gren som ble valgt i dispatch-menyen. Bekreft at CI-resultatene og påkrevde sjekker gjelder **PR-ens nåværende head-SHA** etter siste automatiske oppdatering; kjør på nytt ved ny commit. Ikke flett uten bestått Node 24-sjekk og menneskelig review.
- [ ] Registrer lenker, SHA-er, faktiske runtime-versjoner og resultater i utviklingsplan/versjonslogg. Først da kan GitHub-verifisering krysses av. Avklar P1–P10 separat før produksjon.

GitHub-veiledning: [Actions-rettigheter](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository), [beskyttede grener](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) og [Dependabot for actions](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/auto-update-actions).

## Før nettstedet deles

- [ ] Avklar drift, HTTPS og faktisk innlogging/autorisasjon for lukket pilot. Privat repo sikrer ikke automatisk nettsiden. Ikke aktiver Pages som lukket pilot uten å kontrollere planens støtte for privat publisering. Docker/Ollama og RAG-serveren trenger et kjøremiljø utover statisk Pages.
- [ ] Avstem P1–P10 i [utviklingsplanen](../UTVIKLINGSPLAN.md), inkludert modell-/innholdsgodkjenning og uavklarte tilgjengelighetskrav. Disse punktene blokkerer ikke nødvendigvis kildeopplasting, men et grønt bygg er ingen godkjenning av delt drift.
