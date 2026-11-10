# Testmuligheter og avslutningsvilkår

Bruk før nye tester og når en restliste skal avklares. Formålet er å velge gjennomførbare tester og vite hvilket bevis som mangler før en kriterievurdering kan avsluttes. Dette er ikke en ekstra WCAG-sjekkliste.

## Kartlegg faktisk betjening

`run_checks.py` oppretter `testmuligheter.json` som mal med `unverified`. Før `scope` og oppdater relevante rader etter faktisk kontroll:

- `available`: funksjonen kan betjenes og resultatet observeres gjennom tillatte verktøy eller en medvirkende tester. Angi miljø/versjon i `environment`, tidspunkt i `checked_at` og lokale bevisreferanser i `evidence`.
- `needs_assistance`: en annen tester må gjennomføre eller observere handlingen. Oppgi konkret behov i `limitation` og neste handling i `next_action`.
- `blocked`: en faktisk forsøkt handling feilet eller nødvendig tilgang/verktøy mangler. Bevar teknisk feil og forklar hva som kan løse blokkeringen.
- `not_needed`: funksjonen er ikke nødvendig for dette avgrensede utvalget; begrunn avgrensningen.
- `unverified`: tilgang er ikke kontrollert. Ikke omtal dette som et feilet testforsøk.

Behold relevante standardrader; nye miljøspesifikke egenskaper kan legges til med unike ID-er. Ikke hent hemmelig konfigurasjon eller inventer hele maskinen. At VoiceOver, Chrome eller en PDF-leser er installert viser ikke at assistenten kan aktivere, høre eller styre dem. Dokumenter eventuelt samarbeid med en menneskelig tester. DOM/tilgjengelighetstre er støttebevis, ikke faktisk tale. CSS-zoom/viewport er ikke nettleserens zoomfunksjon; emulert orientering er ikke fysisk rotasjon. Redusert-bevegelse-emulering er ikke en faktisk OS-innstillingsprøve.

## Gjør hvert krav avsluttbart

Fyll testplanradens `completion` fra den kravvise prosedyren og det faktiske innholdet:

| Felt | Innhold |
| --- | --- |
| `scope` | Sider, dokumenter, komponenter og relevante tilstander. |
| `acceptance_conditions` | Observerbare vilkår som må holde for å kunne konkludere. |
| `required_evidence` | Hvilke målinger, handlinger, leseforløp eller faglige begrunnelser som trengs; dette er en plan, ikke påståtte bevis. |
| `capability_ids` | Relevante ID-er fra testmuligheter.json. Ingen skjult avhengighet til andre skills. |
| `execution` | `local_now`, `needs_assistance`, `later_environment`, `not_applicable` eller `unverified`. |
| `blocker` | Konkret uavklart forutsetning ved bistand/senere miljø. |
| `next_step` | Neste handling, eller begrunnelse for at oppgaven er avsluttet i utvalget. |

Eksempler som må tilpasses:

- **1.4.4:** Utfør faktiske oppgaver ved dokumentert 200 % tekstforstørring, uten tap av nødvendig tekst eller funksjon. Bevis: nettleser/nivå, før-/etterbilder og fullførte handlinger. Ikke krev skjermleser for å avgjøre dette kriteriet.
- **1.4.10:** Prøv nødvendig oppgaveutvalg ved bredde tilsvarende 320 CSS-px, inkludert faktisk nettleserzoom der det gjenstående spørsmålet gjelder forstørring. Begrunn særskilt innhold som trenger todimensjonal visning.
- **3.1.1:** Undersøk faktisk hovedspråk og effektiv språkmerking/arving, også i PDF. Ikke behold kravet uavklart utelukkende fordi opplesing mangler dersom annet egnet grunnlag avgjør spørsmålet. Faktisk uttale kan gi supplerende bevis; feil stemmeoppsett er ikke automatisk en dokumentfeil.
- **4.1.3:** Utløs konkrete statusbeskjeder, registrer naturlig fokus og faktisk annonsering når dette er det manglende beviset. Eksisterende `aria-live` alene viser ikke at riktig melding formidles i forløpet.

En lokal side kan undersøkes før publisering. Bruk `later_environment` bare når spørsmålet faktisk gjelder noe som mangler lokalt, eksempelvis ny identitetsleverandør eller eksternt modellinnhold. En fremtidig funksjon skal ikke holde dagens avgrensede innhold uavklart uten konkret sammenheng. Avtal og dokumenter omfanget; gjenta berørte tester når funksjonen kommer til.

## Fra plan til konklusjon

Planfelter, verktøytilgang og avkryssede oppgaver er ikke testbevis. Før faktisk dato, metode, lokasjon og bevis etter gjennomføringen. Vurder om omfanget er dekkende. K/I/B krever begrunnelse; I krever at fravær av utløsende innhold faktisk er undersøkt. Behold U ved manglende eller tvetydig grunnlag. Hvis et krav har bekreftet brudd og uavklart øvrig omfang, bruk B og `assessment_incomplete: true` i matriseraden slik at begge deler kan fremgå av erklæringen.

Deretter følges [vurdering](vurdering.md) og [avstemming](avstemming.md). Test om mulig flere krav i samme brukerforløp, men skriv en egen begrunnet avgjørelse for hvert krav.
