# Sjekkliste for første push

For repoansvarlig. **Ingen GitHub-remote eller workflow-kjøring finnes ennå.** Dette dokumentet utfører ingen av punktene. Første delte miljø skal være en lukket pilot.

Lokal Docker/Linux arm64-kontroll av c22f1dc har bestått hele kommandorekken på Node 22.18.0 og 24.22.2, inkludert begge bygg. [Kontrollrapporten](CI-KONTROLL.md) dokumenterer dette; den erstatter ikke avkrysning av GitHub-punktene nedenfor. [Dokumentasjonsoversikten](DOKUMENTASJON.md) samler gjeldende status og utkast.

## Før opplasting

- [ ] Beslutt [bevislagring](BEVISLAGRING.md): hva beholdes i Git, eventuelt Git LFS eller ekstern lagring med sjekksummer. Vurder også bevis som allerede ligger i lokal Git-historikk før første push; en senere sletting fjerner ikke gamle Git-objekter. Ingen eksisterende bevis er flyttet eller slettet i dette arbeidet.
- [ ] Gjennomgå innhold/historikk og bekreft at ingen hemmeligheter eller uavklart internt innhold følger med. Velg eier, privat repo, standardgren og tilgang. Privat repo erstatter ikke innlogging til nettstedet.
- [ ] Opprett repo og utfør første push som egen, bevisst handling. Workflow-filene og dependabot.yml må ligge på standardgrenen. Avklar prisjobben før dette: den har allerede daglig schedule kl. 06:00 UTC og kan kjøre etter at filen er pushet.

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
