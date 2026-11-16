# Sjekkliste for første push

For repoansvarlig. **Oppdatert 16. november 2026 av Codex (OpenAI), uten underagenter.** Brukeren har opprettet et repo på organisasjonskontoen. Repoets URL, synlighet, tilgang og innstillinger er ikke kontrollert her. Lokal Git har fortsatt ingen remote, og ingen GitHub-kjøring er verifisert. Første delte miljø skal være en lukket pilot.

Historisk lokal Docker/Linux arm64-kontroll av c22f1dc har bestått hele kommandorekken på Node 22.18.0 og 24.22.2, inkludert begge bygg. [Kontrollrapporten](CI-KONTROLL.md) dokumenterer dette; den erstatter ikke avkrysning av GitHub-punktene nedenfor. [Dokumentasjonsoversikten](DOKUMENTASJON.md) samler gjeldende status og utkast.

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
- [ ] Koble lokal Git til det opprettede repoet etter avklaringene over, og utfør første push som egen, bevisst handling. Workflow-filene og dependabot.yml må ligge på standardgrenen. Avklar prisjobben før dette: den har allerede daglig schedule kl. 06:00 UTC og kan kjøre etter at filen er pushet.

## Actions og branch protection

- [ ] I **Settings → Actions → General**, tillat de fire SHA-låste action-repoene som er listet i [CI-kontrollen](CI-KONTROLL.md). Bekreft at organisasjonens policy og runner tillater dem.
- [ ] Behold standard **Workflow permissions** med lesetilgang. Prisjobben ber eksplisitt om contents:write og pull-requests:write i samme repo. Tillat **Allow GitHub Actions to create and approve pull requests** der policy tillater det; jobben oppretter/redigerer PR-er, men godkjenner eller fletter dem ikke. Ingen PAT eller tilgang til andre repoer skal innføres.
- [ ] Beskytt standardgrenen med ruleset/branch protection: krev PR, minst én uavhengig godkjenning og at nye endringer må vurderes på nytt. Blokker force-push og sletting av standardgrenen; avklar eventuelle administrative unntak.
- [ ] Etter første CI-kjøring: gjør **begge** faktiske sjekker påkrevd: jobbnavnene er `Node 22.18.0` og `Node 24` i workflowen CI. Velg de navnene GitHub faktisk viser og GitHub Actions som forventet kilde. Prøv med en PR at feil/manglende status hindrer fletting.
- [ ] Prisjobben bruker force-with-lease på sin reserverte `codex/pricing-sync`-gren. Et generelt force-push-forbud for alle grener må ikke utilsiktet hindre dette; avgrens regelen til standardgrenen eller vedta en annen prisflyt. Ikke gi prisjobben bypass på standardgrenen.
- [ ] Kontroller ukentlig Dependabot for github-actions. Oppdaterings-PR-er skal gjennom samme review/CI. Ikke aktiver automatisk fletting eller en botregel som fletter dem.

## Første manuelle kjøringer på GitHub

- [ ] **Actions → CI → Run workflow**, velg standardgrenen. Kontroller nøyaktig commit-SHA, begge matrisejobber, faktisk Node 22.18.0/24 og pnpm fra packageManager i loggen. Format, typer, hele testpakken, serverbygg og Pages-bygg skal lykkes. Ingen prissynk eller ekte modell skal kjøres av CI.
- [ ] **Actions → Oppdater priser → Run workflow**, med standardgrenen valgt. Dette **henter ekte offentlige priskilder** og kan skrive prisgren/PR. Kontroller kilde-/feilstatus, ingen PR ved bare datostøy, én opprettet/oppdatert PR ved reell endring, bare snapshot/versjonslogg i diff og ingen endringer på standardgrenen. Ved kildefeil skal gamle priser bevares og jobben melde feil. Observer senere oppdatering eller uendret kjøring uten å lage kunstige live-prisendringer; lokal fixture-test dekker disse grenene.
- [ ] For en pris-PR: kjør **CI → Run workflow på codex/pricing-sync**, fordi hendelser fra GITHUB_TOKEN normalt ikke utløser ny CI. Prisjobben henter alltid standardgrenen, uansett hvilken gren som ble valgt i dispatch-menyen. Bekreft at CI-resultatene og påkrevde sjekker gjelder **PR-ens nåværende head-SHA** etter siste automatiske oppdatering; kjør på nytt ved ny commit. Ikke flett uten begge sjekker og menneskelig review.
- [ ] Registrer lenker, SHA-er, faktiske runtime-versjoner og resultater i utviklingsplan/versjonslogg. Først da kan GitHub-verifisering krysses av. Avklar P1–P10 separat før produksjon.

GitHub-veiledning: [Actions-rettigheter](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository), [beskyttede grener](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) og [Dependabot for actions](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/auto-update-actions).

## Før nettstedet deles

- [ ] Avklar drift, HTTPS og faktisk innlogging/autorisasjon for lukket pilot. Privat repo sikrer ikke automatisk nettsiden. Ikke aktiver Pages som lukket pilot uten å kontrollere planens støtte for privat publisering. Docker/Ollama og RAG-serveren trenger et kjøremiljø utover statisk Pages.
- [ ] Avstem P1–P10 i [utviklingsplanen](../UTVIKLINGSPLAN.md), inkludert modell-/innholdsgodkjenning og uavklarte tilgjengelighetskrav. Disse punktene blokkerer ikke nødvendigvis kildeopplasting, men et grønt bygg er ingen godkjenning av delt drift.
