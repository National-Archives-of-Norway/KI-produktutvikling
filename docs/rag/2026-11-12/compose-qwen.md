# Lokal Qwen3:4b i Docker Compose

12. november 2026 · Codex (OpenAI), uten underagenter. Grunnlag: commit 6c304b3 og endringene i denne arbeidsøkten. Ingen blindsett eller test:blind. Reelle modellprøver dokumenteres separat fra simulerte tester.

## Oppsett

Portal (Next + RAG) og Ollama er separate tjenester. model-init laster ned til volumet ki-produktutvikling_ollama-models før inferens starter. Bare init har utgående nedlastingsnettverk. Inferensserveren ligger på internt nettverk uten vertsporter/egress, skyfunksjoner er av, og portalen publiserer bare 127.0.0.1:3005. RAG tillater nøyaktig http://ollama:11434 i tillegg til eksisterende loopback. Modellvekter er ikke i Git eller portalbildet.

8192 token kontekst, think=false, temperatur 0,1, inntil 700 genererte tokens. Dagens 60/65/70 s-frister og kildebevaring beholdes. Docker Desktop har 18 CPU-er og omtrent 7,75 GiB tilgjengelig minne; ingen GPU er konfigurert. Bildene er låst til verifiserte offisielle digester i Dockerfile/compose.yaml. Ollama 0.40.16 er brukt. Modell qwen3:4b: størrelse 2 497 293 931 byte, digest 359d7dd4bcdab3d86b87d73ac27966f4dbb9f5efdfcc75d34a8764a09474fae7. Modelldigest beholdes ved vanlig oppstart; eksisterende volum gjenbrukes uten automatisk oppdatering. Eksplisitt OLLAMA_FORCE_PULL=1 brukes bare når inferensserveren er stoppet.

Første modellprøve med bare think=false ga engelsk tenketekst og brukte 700 tokens uten ferdig svar/kildehenvisning. /no_think og assistentprefiks var heller ikke tilstrekkelig i den nedlastede templaten. Den endelige Qwen3-grenen bruker Ollamas JSON-skjema med ett answer-felt; bare validert norsk svartekst sendes videre i eksisterende API-kontrakt. Andre Ollama-modeller beholder tekstformatet. done_reason=length avvises før visning; ugyldig JSON, feil type, tom tekst og ekstra felter avvises. Det er ingen generisk garanti for korrekt innhold; dette avgrenser formatet.

Init-prosessen fikk først syntaksfeil fordi det bindmonterte skriptet ble oppdatert under nedlastingen. Modellnedlastingen var allerede vellykket. Init kopierer nå skriptet til en stabil intern fil før kjøring, og ny kjøring gjenbrukte modellen og avsluttet med kode 0. Volumet ble bevart hele tiden. Gamle manuelle portalcontainere er stoppet og bevart for tilbakeføring; aktiv portal kommer fra Compose.

## Faktisk prøve gjennom portalproxy

scripts/check-rag-model.mjs kaller http://127.0.0.1:3005/api/rag med korrekt Origin. Kildene er offentlig eksempelinnhold, ingen hemmeligheter eller interne dokumenter. Tider viser to vellykkede kjøringer, før og etter siste ombygging, med tidligere oppvarmet modell; det er ikke belastningsmåling eller garanti.

| Spørsmål                           | Modus / forventet kilde            |        Målt tid | Resultat                  |
| ---------------------------------- | ---------------------------------- | --------------: | ------------------------- |
| Hvordan skriver jeg en god prompt? | generated / tydelig-kontekst først |   5,051–7,826 s | Norsk svar med [1]        |
| Hvordan utforsker jeg brukerbehov? | generated / brukerbehov først      | 12,808–13,339 s | Norsk svar med [1] og [2] |
| Hvem er statsministeren?           | sources / ingen treff              |         0,005 s | Ingen modellgenerering    |

De to positive prøvene består format-, ikke-tomt-svar-, forventet-kilde- og kildehenvisningskontroll. Svaret om prompt har noe gjentakelse og mindre språkfeil; dette er en beta, ikke en full faglig evaluering. Ingen tenketekst eller rå JSON vises i det returnerte svaret. Metadatafelt for søkenøkkelord inngår ikke i modellgrunnlaget.

Helse: generationEnabled=true, portal/ollama friske. Docker-nettverket model er kontrollert med Internal=true; Ollama har ingen vertsporter. Kjørende modell brukte omtrent 3,92 GiB og portal omtrent 162 MiB ved én etterfølgende måling. Modellen er fysisk i et navngitt Docker-volum; appbildet monterer ikke dette volumet, Git-mappe eller Docker-socket.

## Kontroller

Ny konfigurasjonstest feilet før endring fordi Compose-adressen ble avvist. Etter endring består den avgrensede konfigurasjons-/modellpakken 20/20, inkludert avvisning av andre verter, porter, credentials og stier samt payload med think=false og num_ctx=8192. Etter endelig adapterretting bestod **270/270 Node-tester**, **3/3 Python-tester**, faktisk innholdssynk og lenkekontroll. Typekontroll bestod. Tre av Node-testene kjører init-skriptet med syntetisk Ollama og prøver tomt volum, gjenbruk og eksplisitt oppdatering, uten nettverk. Andre nye tester dekker strukturerte svar og avkutting. Docker Compose-konfigurasjonen og Next-produksjonsbygget bestod. Én eksisterende forventning i features.test.ts er endret fra setup til beta fordi lokale modellsvar nå faktisk er prøvd. Testen krever også at forbeholdet om bare simulert eksternt API beholdes; dette er en tilsiktet modenhetsendring, ikke en tilpasning av søkets forventninger. Sluttkontroll etter register-/innholdsoppdatering bestod med 270/270 Node-tester, 3/3 Python-tester og faktisk innholdssynk. pnpm typecheck, pnpm format:check, git diff --check og 195 relative filmål i 11 dokumenter bestod. Begge Compose-tjenester er friske og init avsluttet med kode 0.

Dette er lokal utprøving med offentlig eksempelinnhold, ikke faglig godkjenning av alle svar, virksomhetsgodkjenning av modellen, full tilgjengelighetskontroll eller delt produksjonsdrift.

## Primærkilder

- [Ollama: strukturerte svar](https://docs.ollama.com/capabilities/structured-outputs).
- [Ollama: offisielt Docker-oppsett](https://docs.ollama.com/docker).
- [Qwen: modell og tenkemodus](https://github.com/QwenLM/Qwen3).
- [Compose: avhengigheter og oppstartsrekkefølge](https://docs.docker.com/compose/how-tos/startup-order/).
