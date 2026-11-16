# Qwen-timeout: årsak, retting og retest

**Etterfølgende lokal oppdatering 16. november:** [Portalen på 3005 er nå bygget fra ee26bb2 og kontrollert med fire faktiske runner-tråder](../docker-ee26bb2/rapport.md). Beskrivelsen av at originalportalen var urørt nedenfor gjelder den tidligere isolerte rettingsprøven.

16. november 2026 · Codex (OpenAI), uten underagenter. Grunnlag: arbeidskopi basert på **7441c70**, med rettingen dokumentert ved kildehash i [resultatfilen](resultater.json). Modell: samme Qwen3:4b-digest som [første Docker-prøve](../readme-clean/rapport.md). Ingen ekstern modell, priskilde eller blindmåling er brukt.

**Den bekreftede årsaken i den målte CPU-profilen var for høyt automatisk inferenstrådtall.** Ollama valgte 18 tråder. Et kontrollert A/B/A-forsøk med identisk forespørsel og modell viste svært treg generering med automatisk valg, rask generering med fire tråder og treg generering igjen da automatisk valg ble gjeninnført. Compose angir nå fire inferenstråder via portalens validerte modellkonfigurasjon. Fem faktiske genererte svar bestod retesten på ca. 7–32 sekunder, med **uendret modellfrist på 60 sekunder**.

Dette retter det reproduserte problemet i Docker/Linux arm64-profilen. Det er ikke en garanti for alle maskiner, modeller, kildeutvalg eller spørsmål, og heller ingen produksjonsgodkjenning.

## Undersøkelse og kontrollert sammenligning

En separat Ollama-instans ble startet med en egen modellkopi. Bare modellkatalogen ble kopiert fra en **skrivebeskyttet** montering av originalvolumet; originalvolumets øvrige filer og nøkler ble ikke kopiert. Den eksisterende modellserveren ble ikke stoppet eller konfigurert på nytt. Begge instanser brukte den pinnede Ollama-versjonen fra Compose og samme modellmanifest.

Docker viste 18 tilgjengelige vCPU-er, CPU-kvote uten begrensning og cpuset 0–17. Runner-loggen bekreftet automatisk n_threads=18, inkludert batchtråder. Det er ikke i seg selv bevis for optimal ytelse. Forespørselen for «Hvordan skriver jeg en god prompt?» ble fanget fra den uendrede adapteren før retting og brukt i alle benchmarkgrenene.

Benchmarken brukte streaming for observasjon, 32 genererte tokens som målebudsjett og samme seed (42) i alle grenene. Modell, kilder, prompt, think=false, JSON-skjema, temperatur og kontekst var like. Bare eksplisitt num_thread ble endret. 30-sekundersvinduet her er en målegrense, ikke en endring av portalens 60-sekundersfrist.

| Gren                       | Observert runner-trådtall | Resultat                                                                                                                    |
| -------------------------- | ------------------------: | --------------------------------------------------------------------------------------------------------------------------- |
| A1: automatisk             |                        18 | Avbrutt ved 30 003 ms; første svarbit etter 9274 ms; 16 ikke-tomme svarbiter, ikke ferdig                                   |
| B: eksplisitt fire         |                         4 | Fullførte 32 tokens på 11 199 ms; innlasting 2748 ms, prompt 7414 ms, generering 1026 ms; 31,19 tokens/s i genereringsdelen |
| A2: tilbake til automatisk |                        18 | Avbrutt ved 30 096 ms; første svarbit etter 9848 ms; 13 ikke-tomme svarbiter, ikke ferdig                                   |

Antall svarbiter i avbrutte strømmer er ikke påstått å være et eksakt tokentall. Det beregnes derfor ingen eksakt hastighetsfaktor fra dem. Det omvendte kontrollforsøket viser at forbedringen ikke kan forklares bare med varm modell eller promptcache. Modellen ble lastet om når trådinnstillingen skiftet.

[Runner-observasjonene](tradobservasjoner.txt) dokumenterer 18 → 4 → 18 og fire tråder i den rettede portalens modellforløp. Den sannsynlige mekanismen er trådoverforbruk i dette virtuelle CPU-oppsettet; lavnivåårsaken i Docker/CPU-scheduleren er ikke undersøkt separat. Den bekreftede praktiske årsaken og rettingen er knyttet til trådvalget, ikke til manglende indeksering, feil modellvekter eller en for kort HTTP-proxyfrist.

Offisiell [Ollama API-kode](https://github.com/ollama/ollama/blob/main/api/types.go) beskriver num_thread som runner-innstilling med runtime-autovalg ved usatt verdi. En [rapportert containerrelatert trådfeil](https://github.com/ollama/ollama/issues/17916) ga en undersøkelseshypotese; den brukes ikke som bevis for at samme eksterne feil nødvendigvis gjelder her. Våre A/B/A-målinger og faktiske runner-logger er grunnlaget for konklusjonen.

## Rettingen

- Ny valgfri **servervariabel OLLAMA_NUM_THREAD**. loadRagConfig krever heltall 1–64 når den settes; tom, ugyldig eller utenfor området gir oppstartsfeil. Usatt verdi lar Ollama velge som før.
- Variabelen følger konfigurasjonen gjennom provider til Ollama-adapteren, som sender options.num_thread. Dette er en portalvariabel, ikke en innebygd miljøvariabel som Ollama-serveren selv leser.
- Compose setter OLLAMA_NUM_THREAD=4 i portalens miljø. Bruk utenfor Compose beholder autovalg når variabelen er usatt. Antallet kan justeres av administrator; fire er en målt, konservativ CPU-profil, ikke en universell ytelsesfasit.
- Modell, digest, temperatur 0,1, num_ctx=8192, num_predict=700, strukturert svar og think=false er uendret. Modell/proxy/klient beholder 60/65/70 s. Ingen API-kontrakt, serverhemmelighet eller offentlig modellnøkkel er endret.
- To nye regresjoner feilet før retting: konfigurering/validering av trådtall og videresending fra serverkonfigurasjon til faktisk modellpayload. De består etter retting. Testen for usatt verdi krever også at num_thread ikke sendes utilsiktet.

## Retest gjennom hele portalens API

Et nytt portalbilde med rettede filer ble bygget og startet i eget Compose-prosjekt på loopback-port 3015. Det brukte den separate modellkopien; originalens containere, volum og appbildetag ble ikke brukt til utrulling. Ny Ollama-prosess startet uten innlastet modell før første produksjonsforespørsel. Kildehash for config.ts og ollama.ts i bildet er kontrollert mot arbeidskopien; runner-loggen viste fire tråder.

| Spørsmål                           | Før retting                        | Etter retting                                                                                     |
| ---------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| Hvordan skriver jeg en god prompt? | 502 ved ca. 60 s både kald og varm | 200/generated med tydelig-kontekst og [1]: kald 13 765 ms, varm 7235 ms                           |
| Hvordan utforsker jeg brukerbehov? | 502 ved 60 019 ms                  | 200/generated med brukerbehov først og kildehenvisninger: 31 353 og 31 531 ms                     |
| Hvilke skills har vi?              | 502 ved 60 025 ms                  | 200/generated, skills først og [1], 10 309 ms. Svaret omtalte alle fire forventede ressurstemaer. |
| Hvem er statsministeren?           | 200 uten kilder/generering         | Samme avgrensning, 200 uten kilder/generering på 5 ms i begge kjøringer                           |

README-skriptet check-rag-model.mjs bestod uten endring to ganger: først med kald modellprosess, deretter med varm modell. Det krever generert tekst, forventet kilde først, [1] og fravær av think-markører; det negative spørsmålet skal ikke genereres. Skill-spørsmålet ble prøvd separat. Ingen frister ble økt, ingen svar ble akseptert som vellykket bare fordi HTTP-transporten fullførte, og ingen kildebasert reserve ble regnet som generert svar.

Dette er reell modell-/HTTP-integrasjon, ikke en ny visuell nettleser-, tastatur- eller skjermleserprøve. Det tidligere nettleserverktøyets forbindelsesproblem er ikke forsøkt omgått. Modellens faglige kvalitet og sikkerhet ved andre kilder krever fortsatt egne vurderinger.

## Regresjon, bygg og dokumentasjon

- Fokuserte Node-tester: 13/15 bestod før retting, med to forventede feil. Etter retting: 15/15 bestod.
- Ordinær lokal testpakke bestod med 278/278 Node-tester og 3/3 Python-tester, samt faktisk innholdssynk. Blindmåling er ikke kjørt.
- Docker/Linux Node 24.22.2: 278/278 Node-tester bestod uten eksternt testnettverk. Første forsøk brukte runtimebildet og ga én verktøyfeil fordi prisjobbens fixture-test trenger git. Retesten brukte et separat engangstestbilde med Debian Git; Git er ikke lagt til portalbildet og ingen prisnettkall ble gjort.
- Rettet Docker-produksjonsbygg og lokalt pnpm build/typecheck bestod. Ingen ny Node 22- eller Pages-byggprøve er påstått.
- README, .env.example, arkitektur, funksjonsbeskrivelse og utviklingsplan beskriver trådprofilen og den lokale retesten. Beta-/pilot-/produksjonsgodkjenning er uendret. Den opprinnelige feilloggen/resultatfilen i readme-clean er beholdt som historikk.

Avsluttende pnpm test bestod på nytt med 278/278 Node-tester, tre Python-tester, faktisk innholdssynk og 216 relative filmål i 12 dokumenter. pnpm typecheck, pnpm format:check og git diff --check bestod. Rapportens lokale vedleggslenker og opplysningene i resultatfilen er kontrollert.

Før-/etterkontroll bekreftet uendrede container-ID-er, bilder, opprettelses-/starttider, omstartstellere og tilstander for de tre eksisterende containerne. Originalvolumets metadata og modellmanifestets SHA-256 er også uendret. Bare egne testcontainere/-nettverk, modellkopivolum og to testbildetagger ble fjernet. Ingen global prune eller endring av Docker-ressurser ble utført. Midlertidig kildekopi/arbeidslogger ryddes etter at kompakte resultater er lagret.

Den eksisterende portalen på port 3005 er ikke ombygd eller konfigurert på nytt. Den verifiserte rettingen ligger i arbeidskopien og ble prøvd på den separate instansen på 3015. En senere oppdatering av den eksisterende portalen er en egen handling. Ingen commit eller push.
