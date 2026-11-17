# Spør KI: prøve av Copilot-retningslinjene

**Oppfølging 17. november:** Alle fem spørsmål fikk innholdsmessig riktige genererte svar og Copilot som første kilde etter retting. Første feilede prøve nedenfor er bevart; se retesten til slutt. Den tidligere interne EOF-feilens underliggende årsak er fortsatt uavklart.

16. november 2026 · Codex (OpenAI), uten underagenter.

**Samlet resultat: ikke bestått.** Én av fem forespørsler ga et generert svar, som var riktig. Fire ga HTTP 502 uten modellsvar. Copilot-siden var første kilde i fire av fem prøver; spørsmålet om genererte tester valgte feil kilder.

## Grunnlag og metode

Testet den kjørende Docker-portalen på http://127.0.0.1:3005 med Ollama/qwen3:4b og OLLAMA_NUM_THREAD=4. Innholdet er den ukommiterte Copilot-leveransen basert på 9034ab2. Hashkontroll bekreftet at kildefil, kunnskapsutvalg og klientens kildevalidering i containeren samsvarte med arbeidskopien.

Fem kjente eksempelspørsmål ble sendt sekvensielt gjennom /api/rag med portalens Origin og 70 s klientgrense. Hver prøve ble utført én gang. Ingen modell-/tidsgrenseinnstilling, innhold eller søkerangering ble endret for å få prøvene til å bestå. Direkte retrieve() ble kontrollert med de samme spørsmålene. Forventninger nedenfor bygger på brukerens retningslinjer, ikke på modellen.

| Spørsmål                                                                    | Forventet innhold                                                                                 | Første kilde   | HTTP / tid    | Resultat                                             |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------- | ------------- | ---------------------------------------------------- |
| Kan jeg åpne sensitive testdata fra produksjon i VS Code når Copilot er på? | Unngå å åpne sensitive produksjons-/testdata når Copilot er på.                                   | github-copilot | 200 / 13.39 s | Bestått: korrekt svar med [1].                       |
| Kan Copilot alene godkjenne sikkerhetskritisk kode?                         | Sikkerhetskritisk kode trenger grundig ekspertgjennomgang; Copilot kan ikke alene godkjenne den.  | github-copilot | 502 / 60.01 s | Ikke bestått: ingen modellbesvarelse.                |
| Må jeg kontrollere tester som Copilot lager?                                | Genererte tester må sjekkes manuelt for riktig og relevant dekning.                               | oversikt       | 502 / 60.02 s | Ikke bestått: feil kilder og ingen modellbesvarelse. |
| Kan jeg stole på at Copilot kjenner den nyeste versjonen av Next.js?        | Ikke stol på at Copilot kjenner nyeste versjon; kontroller mot prosjektets versjonsdokumentasjon. | github-copilot | 502 / 60.02 s | Ikke bestått: ingen modellbesvarelse.                |
| Hvordan godtar jeg ett ord om gangen i et Copilot-forslag i VS Code?        | Cmd + høyrepil på macOS eller Ctrl + høyrepil på Windows/Linux; oppsettet kan være tilpasset.     | github-copilot | 502 / 10.02 s | Ikke bestått: ingen modellbesvarelse.                |

## Faktiske svar og feilhåndtering

> Nei, du kan ikke åpne sensitive testdata fra produksjon i VS Code når Copilot er på. [1]

De øvrige fire svarte: «Modelltjenesten kunne ikke svare akkurat nå. Du kan fortsatt lese veiledningen og kildene nedenfor.» Kildelister ble returnert også ved 502. Tre feil kom etter ca. 60 s, i nærheten av den konfigurerte modellgrensen. Hurtigtastspørsmålet feilet etter ca. 10 s; samme årsak er ikke bekreftet for denne prøven. Ingen besvarelse betyr at retningslinjeinnholdet ikke kunne vurderes i disse fire modellsvarene, ikke at modellen ga fire feilaktige råd.

Spørsmålet «Må jeg kontrollere tester som Copilot lager?» hentet oversikt, priser og funksjonalitet. Copilot-siden manglet helt blant de returnerte kildene. Dette er et eget søkeavvik som må rettes uavhengig av modellfeilene.

Etter prøvene var både portal og Ollama running/healthy med RestartCount=0. Docker rapporterte samtidig State.OOMKilled=true for Ollama og false for portalen. Det finnes ingen førmåling av dette flagget fra denne testøkten, så det er ikke fastslått om observasjonen skyldes disse prøvene eller en eldre hendelse. En grønn helsesjekk beviste ikke fungerende generering i dette utvalget.

## Oppfølging

- Legg spørsmålet om genererte tester inn som kjent utviklingsregresjon og undersøk hvorfor Copilot-retningslinjene faller ut. Ikke bruk eksterne blindsett til justering.
- Undersøk modellfeilene, responstid og eventuell minnebelastning med tidsavgrensede logger og før-/ettermåling. Ikke øk tidsgrenser eller endre innhold/rangering for å skjule feilene.
- Gjenta samme spørsmål etter bekreftede rettinger og bevar disse første resultatene.

## Kildeidentitet

| Fil                                 | SHA-256 i arbeidskopi og container                               |
| ----------------------------------- | ---------------------------------------------------------------- |
| src/content/pages/github-copilot.ts | 5daec174a9b0bcd017ad32f3d1fb7184ee65de08d07f0b403df21eb1baeeb8c0 |
| src/content/knowledge.ts            | a936cedfa8ccd7ed570e4e033af154d3009f4fff5ae7317295f76b770a119c14 |
| src/features/rag/contracts.ts       | a8261f9420243011c40fc02cec5effdc81b1b69f80eab361865a7d1ea66fe3ef |

Dette er en avgrenset faktisk modell-/API-prøve, ikke en nettleserprøve, generell svarkvalitets-, sikkerhets-, personvern- eller produksjonsgodkjenning. Ingen ny full testpakke eller ombygging ble utført i denne økten. Modellen ble ikke lastet ned på nytt, og konfigurasjon/volum ble ikke endret. Tidligere ukommiterte innholdsendringer er bevart. Ingen commit eller push.

Dokumentkontroller: `pnpm test:links` bestått (235 filmål i 12 dokumenter), `pnpm format:check` og `git diff --check` bestått.

## Retting og retest 17. november 2026

Utført av Codex (OpenAI), uten underagenter, mot samme lokale Qwen3:4b og fire CPU-tråder. Arbeidskopien bygger fortsatt på 9034ab2 og inkluderer den ukommiterte Copilot-siden. Ingen blindsett er lest eller kjørt.

### Bekreftede funn og endringer

Før retting feilet to av seks nye regresjoner: kildevalg for genererte tester og kontroll av samlet modellkontekst. «Kontrollere» ble tolket som innholdsord, mens kilden blant annet bruker «Kontroller» og «sjekkes manuelt». Sammen med lavvektede teste/lage falt riktig kilde under dekningsterskelen. Begge generelle kontrollformene inngår nå i samme lavvektede handlingsgruppe som teste/skrive; de slettes ikke fra søket. Ingen kilde-ID, spørsmålsunntak, ny avhengighet eller endret API-kontrakt er innført.

De avgrensede historiske Ollama-loggene viser tre avbrudd under innlesing av henholdsvis 4498, 5872 og 3649 inputtokens, med HTTP 500 fra Ollama og JSON 502 fra portalen ved modellfristen. Alle hele kildeartikler ble sendt til modellen, også lange oversiktssider. Felles modellmeldinger avgrenser nå kildeutdragene til totalt 6000 tegn, normalt opptil 3600 til første kilde og resten til øvrige. Hele relevante linjer velges med felles språkregler og settes tilbake i opprinnelig rekkefølge; svært lange linjer deles ved setningsgrenser. Forbehold reserveres, kildenumre beholdes og utelatelser merkes. Fulle kilder er fortsatt tilgjengelige i API-et og chatten. Begge modelladapterne bruker dette, mens modell-/proxy-/klientfristene fortsatt er 60/65/70 s.

EOF-feilen 16. november kl. 21:36:20 UTC kom fra Ollamas interne completion-forbindelse etter et promptcache-lagringsforsøk (3438 tokens, rapportert 483,509 MiB). Dette beviser ikke at cachelagring eller OOM var årsaken. En direkte prøve med **uendret** adapter 17. november ga gyldig hurtigtastsvar på 18,8 s, HTTP 200, 1384 inputtokens og 97 genererte tokens. Feilen er ikke reprodusert og det er ikke lagt inn automatisk retry som skjuler den.

### Samme fem spørsmål før og etter

Én sekvensiell HTTP-prøve per spørsmål gjennom portalens /api/rag etter retting. Ingen mislykkede retestforsøk er forkastet. Samme spørsmål og innholdsforventninger som første prøve.

| Spørsmål                                                                    | Før: HTTP / sekunder | Etter: HTTP / sekunder | Første kilde før → etter        | Innhold etter    |
| --------------------------------------------------------------------------- | -------------------- | ---------------------- | ------------------------------- | ---------------- |
| Kan jeg åpne sensitive testdata fra produksjon i VS Code når Copilot er på? | 200 / 13.39          | 200 / 12.59            | github-copilot → github-copilot | Riktig, med [1]. |
| Kan Copilot alene godkjenne sikkerhetskritisk kode?                         | 502 / 60.01          | 200 / 29.30            | github-copilot → github-copilot | Riktig, med [1]. |
| Må jeg kontrollere tester som Copilot lager?                                | 502 / 60.02          | 200 / 29.84            | oversikt → github-copilot       | Riktig, med [1]. |
| Kan jeg stole på at Copilot kjenner den nyeste versjonen av Next.js?        | 502 / 60.02          | 200 / 28.10            | github-copilot → github-copilot | Riktig, med [1]. |
| Hvordan godtar jeg ett ord om gangen i et Copilot-forslag i VS Code?        | 502 / 10.02          | 200 / 2.92             | github-copilot → github-copilot | Riktig, med [1]. |

| Måling                                               | Før | Etter |
| ---------------------------------------------------- | --: | ----: |
| Genererte svar med riktig innhold og kildehenvisning | 1/5 |   5/5 |
| Copilot som første kilde                             | 4/5 |   5/5 |
| HTTP 502                                             | 4/5 |   0/5 |

Dette er en avgrenset retest, ikke blind evaluering eller en generell oppetids-/svarkvalitetsgaranti. Den siste raske prøven hadde nesten full promptcache: én inputtoken ble evaluert på nytt. Tidene er derfor ikke en ren A/B-ytelsesmåling. Budsjettet er i tegn, ikke en eksakt tokenteller.

### Faktiske retestsvar

1. **Kan jeg åpne sensitive testdata fra produksjon i VS Code når Copilot er på?**

   > Nei, du kan ikke åpne sensitive testdata fra produksjon i VS Code når Copilot er på. [1]

2. **Kan Copilot alene godkjenne sikkerhetskritisk kode?**

   > Nei, Copilot kan ikke alene godkjenne sikkerhetskritisk kode. Sikkerhetskritisk kode bør alltid gjennomgås grundig av eksperter, som er angitt i retningslinjene for GitHub Copilot i Nasjonalarkivet [1].

3. **Må jeg kontrollere tester som Copilot lager?**

   > Ja, du må kontrollere tester som Copilot lager. Forslagene må alltid gjennomgås før de godtas, spesifikt for å sikre at testene de det som faktisk må testes. [1]

4. **Kan jeg stole på at Copilot kjenner den nyeste versjonen av Next.js?**

   > Nei, Copilot kjenner ikke nødvendigvis den nyeste versjonen av Next.js. [1]

5. **Hvordan godtar jeg ett ord om gangen i et Copilot-forslag i VS Code?**

   > For å godta ett ord i et Copilot-forslag i VS Code, trykk Cmd + høyrepil på macOS eller Ctrl + høyrepil på Windows/Linux. Forslag må alltid gjennomgås før de godtas, så se på variabelnavn og andre navn for å sikre at forslagene er korrekte. [1]

Svaret om tester har den språklige feilen «testene de det»; men rådet om å kontrollere at testene faktisk tester det nødvendige er riktig. Ingen modelltekst er språkvasket i beviset.

### Kontekst og drift

| Spørsmål nr. | Fulle kilder, tegn | Sendte utdrag, tegn | Inputtokens i Ollama-loggen |
| ------------ | -----------------: | ------------------: | --------------------------: |
| 1            |               3030 |                3030 |                        1384 |
| 2            |              12606 |                5994 |                        2392 |
| 3            |              11498 |                5939 |                        2419 |
| 4            |              10084 |                5939 |                        2342 |
| 5            |               3030 |                3030 |                        1384 |

Bare portalcontaineren ble bygget og gjenskapt. Ollama hadde samme container-ID/starttid, RestartCount=0 og OOMKilled=true før/etter. Cgroup oom_kill var 2 før og 2 etter; ingen nye slike hendelser ble registrert under prøvene. Volumets navn/opprettelsestid og modellmanifestets SHA-256 var uendret (31d9857b5705086d352d4d6db04e86c5d0f6a2b5d59a4dc7ce5cdb271ccf9141). Ingen ny nedlasting eller modellendring. Portalen er healthy og /health ga 200, status=ok, generationEnabled=true. Den aller første helsesjekken ble gjort for tidlig etter oppstart og fikk ECONNREFUSED; ny sjekk etter oppstart og modellprøvene bestod.

Kontrollsummer i kjørende container samsvarer med arbeidskopien:

| Fil                                 | SHA-256                                                          |
| ----------------------------------- | ---------------------------------------------------------------- |
| src/features/rag/search-language.ts | 6a17fa783fdbf469ad8d2573f3da2daf3bc375711821335d6092340460c8b1b7 |
| src/server/rag/context.ts           | d355dcfc4ddf74ff4d13ed3059609acfa64e2193613db3cb3b346a053bf7125f |
| src/server/rag/messages.ts          | 2d6520fd236bd45d0fd33a098fa95d3b0c240f84a369e943bfe11772e9a6349c |
| src/content/pages/github-copilot.ts | 5daec174a9b0bcd017ad32f3d1fb7184ee65de08d07f0b403df21eb1baeeb8c0 |

### Kontroller og gjenstående risiko

- pnpm test bestod: 289/289 Node-tester, 3/3 Python-tester, reell innholdssynk og lenkekontroll (235 filmål før sluttnotatene, 236 ved sluttkontroll). Utviklingssettet (36/36), kjent held-out (20/20) og forslagstestene bestod uten endrede forventninger. Ingen ekstern blindmåling eller priskildekall.
- pnpm typecheck, pnpm format:check og Docker-produksjonsbygg bestod. Nye tester dekker alle fem kildesøk, kontekstbudsjett, hele relevante linjer, forbehold, nummerering, korte uendrede kilder og fravær av mutasjon. Første fulle kjøring i restriktiv sandbox hadde EPERM ved loopback-binding; sluttkjøringen med nødvendig lokal nettverkstilgang bestod. En ny syntetisk test avdekket dessuten at guide.note manglet når hele teksten fikk plass; rettingen inkluderer nå også slike forbehold.
- Ingen ny nettleser-/skjermleser-, ekstern modell-, GitHub Actions- eller produksjonsgodkjenning. Det gjenstår å følge opp interne EOF-feil dersom de gjentar seg, og å prøve kontekstutvalget på et bredere faglig utvalg før delt pilot. Budsjettet kan utelate relevant tekst; modellen må holde seg til mottatte utdrag, mens brukeren fortsatt har hele kilden.
- Utviklingsplan og versjonslogg er avstemt. Sluttførte dokumentresultater er skrevet etter Docker-bygget; de er ikke påstått å inngå i det kjørende bildet. Ingen commit eller push.
