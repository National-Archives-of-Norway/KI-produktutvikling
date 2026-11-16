# Lokal Docker-portal oppdatert til ee26bb2

16. november 2026 · Codex (OpenAI), uten underagenter. Eksakt kilde: **ee26bb25d409c287bbb1beb67b7139f4d897461f**. Ren arbeidskopi ved start. Docker-bygget brukte git archive av bare filene som byggkonteksten trenger, uten .git, miljøfiler, testbevis eller modellfiler. Ingen applikasjonskode er endret i denne økten.

## Oppdatering

- Portalbildet ki-produktutvikling:compose ble bygget fra kildecommiten, med org.opencontainers.image.revision satt til hele SHA-en. Bygg med eksisterende dependency-/basecache bestod på ca. 19,53 s. Dette er ikke en ny cachefri installasjon.
- Bare portalcontaineren ble gjenskapt med docker compose up -d --no-deps --no-build portal. Modellserver og init-container beholdt identitet og starttid. Ingen down, volumfjerning eller modellnedlasting ble utført.
- Portalen kjører på http://127.0.0.1:3005/spor, med OLLAMA_NUM_THREAD=4. Containerens commitetikett og SHA-256 for config.ts/ollama.ts er kontrollert mot git show av kildecommiten. Portalhelse og RAG /health er grønne; status=ok og generationEnabled=true.

## Faktiske modellprøver gjennom portalproxy

Det uendrede scripts/check-rag-model.mjs bestod på port 3005. Den separate skill-prøven bestod også. Dette er reell lokal modelltransport, ikke simulering.

| Spørsmål                           | Resultat                                                          |
| ---------------------------------- | ----------------------------------------------------------------- |
| Hvordan skriver jeg en god prompt? | Generert svar med tydelig-kontekst først og [1], 15 830 ms        |
| Hvordan utforsker jeg brukerbehov? | Generert svar med brukerbehov først og kildehenvisning, 35 420 ms |
| Hvem er statsministeren?           | Ingen treff/generering, tom kildeliste på 5 ms                    |
| Hvilke skills har vi?              | HTTP 200/generated med skills først og [1], 10 837 ms             |

[Runner-observasjonene](tradobservasjoner.txt), avgrenset til logger etter portalens nye starttid, viser n_threads=4 og n_threads_batch=4. Rettede forespørsler er altså prøvd mot en runner som faktisk bruker fire tråder, ikke bare en satt miljøvariabel. Modellfristen er fortsatt 60 s.

## Modellvolum bevart

ki-produktutvikling_ollama-models har samme volumobjekt/metadata og opprettelsestid (12. november 2026) som før oppdateringen. Modellmanifestets SHA-256 er uendret. De to modellrelaterte containerne er ikke gjenskapt; bare appcontaineren er byttet. Oppsummering, bilde-/containeridentitet og kildekontrollsummer står i [resultatfilen](resultater.json). Ingen nøkkelverdier eller hemmelig konfigurasjon er lagret.

Dette er lokal ombygging og integrasjonskontroll, ikke produksjonsgodkjenning. Ingen ny skjermleser-/visuell nettleserprøve, full testpakke, Pages-bygg, blindmåling eller eksterne pris-/modellkall er utført. Funksjonsregisterets Beta-status er uendret. [Årsak og tidligere isolert retest](../qwen-threads/rapport.md) beholdes som datert grunnlag.

Rapport-/plan-/loggoppføringen er skrevet etter at bildet ble bygget og inngår ikke i ee26bb2-bildet. Den ligger i arbeidskopien til en senere commit/ombygging. pnpm test:links bestod med 218 filmål i 12 dokumenter; pnpm format:check og git diff --check bestod. Ingen Git-historikkendring eller push er utført.
