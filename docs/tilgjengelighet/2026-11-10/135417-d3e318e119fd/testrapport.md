# Kontrastoppfølging av 86 axe-forekomster

**10. november 2026 · Codex (OpenAI) · tilgjengelighetsskill 0.5.1 · grunnversjon 7d8123a.** Ingen underagenter. Lokal statisk produksjonseksport; ingen offentlig publisering eller commit.

## Konklusjon

Alle **86** opprinnelige kontrastforekomster er undersøkt, fordelt på forsiden (62), Spør KI (6) og Oversikt (18). Ingen bekreftet tekstkontrastfeil i prøvde normal-/fokustilstander. Ingen produktfarger eller gradienter er endret: det er ikke påvist en feil som krever en designretting.

**22 K / 11 I / 15 U / 0 B** videreføres. 1.4.3 står fortsatt U for øvrige interaktive tilstander, effekter og PDF. Dette er ikke en full kontrast-/WCAG-godkjenning. A11Y-01–06 beholder tidligere dokumentert rettet-status uten ny full manuell retest.

## Metode og reproduksjon

1. Originale targets/HTML fra [forrige axe](../132206-native-5c65230c/raw/axe.json) er bevart. Første forsøk mot utviklingsserveren manglet treff for genererte produksjonsklasser/React-ID-er; denne delkartleggingen ligger i raw/contrast86-styles.json og brukes ikke som et komplett resultat.
2. Samme eksport ble servert midlertidig bare på 127.0.0.1:4175. Første oppstart var sandbox-blokkert; autorisert lokal server ble deretter brukt. Alle 86 opprinnelige selektorer ga **nøyaktig ett treff** ved begge bredder. Ingen heuristisk remapping av produksjonselementene.
3. Forgrunn, skriftstørrelse/-vekt, alle ancestor-bakgrunner/gradienter, alpha, pseudo-elementer, filter/mix/opacity, tekstglød og rektangler er lest via tillatt read-only DOM. Alle relevante opacity var 1, mix normal og filter/backdrop none. Fargene ble vurdert i den sammensatte bakgrunnen.
4. [Reproduserbar beregner](raw/contrast86-bounds.py) gir konservative per-kanal sRGB-/alpha-grenser for alle gradientstopp, hero-grid ved full maskdekkning og tekstglød ved oppgitt alpha. Én hel 8-bit-kanalverdi er lagt til som avrundingsmargin. Opaque child-bakgrunn dekker tidligere lag; Beta-tekst vurderes dermed mot egen grønne flate. Toppstreken på kort utelates bare når geometri bekrefter positiv avstand fra hele tekstboks til 1px-streken. Både laveste og høyeste luminansgrense vurderes; ingen avrunding til bestått.
5. Skjermbilder av alle tre sider ved 1280/320 er kontrollert visuelt for tekst/effekt-overlapp. Modellen er ikke eksakt pixelmåling eller et bevis for enhver tilfeldig scroll-/overleggstilstand. Ingen fjerning av tekst/effekter eller test-CSS er brukt.
6. 22 eksisterende native lenker/knapper/tekstfelt ble faktisk fokusert med tastatur (ArrowLeft uten aktivering). activeElement og :focus-visible er bekreftet for alle 22; farger ble lest og beregnet på nytt. Dette er ikke faktisk native hover eller full fokus-/zoomgodkjenning.

Beregneren har kalibreringsassert for sort/hvitt (21:1 begge veier) og 50 % alpha, samt en-til-en-, antalls-, effekt- og geometriassert. Den sammenligner konservativt **alle** tekstforekomster mot 4,5:1, også stor tekst som kan ha lavere terskel. Dette innfører ikke et nytt rettslig krav.

## Målinger

| Utvalg | Antall | Laveste beregnede grense | Under 4,5:1 |
| --- | ---: | ---: | ---: |
| Forside normal | 62 | 7,715057:1 | 0 |
| Spør KI normal | 6 | 11,345224:1 | 0 |
| Oversikt normal | 18 | 8,085980:1 | 0 |
| Alle, gjentatt ved 320px | 86 | 7.715057:1 | 0 |
| Faktisk tastaturfokus | 22 | 8.655854:1 | 0 |

Laveste grense er «Bygg med KI.» med konservativ tekstglød/grid. JSON beholder uavrundede verdier, RGB/alpha, størrelse, vekt, selektor og begrunnelse per forekomst. [Normal](raw/contrast86-bounds.json), [320px](raw/contrast86-bounds-320.json), [fokus](raw/contrast86-focus-bounds.json), [manuell protokoll](manual-tests.json).

## Ny regresjon og skill-kjøring

[Ny native-kjøring](../135353-native-2147a40e/native-manifest.json): axe på **23 ruter**, **0 violations / 3 incomplete-grupper / samme 86 forekomster**. Identiske targets/HTML er sammenlignet med originalene. Nu på **25 HTML-filer** gir **0 feil / 207 info-noter**, alle om avsluttende skråstrek på void-elementer. Exit 1 betyr fortsatt behov for vurdering, ikke en teknisk motorfeil.

Skillens nettlesermodul fullførte DOM-/kontrast-/reflow-/tastatur-/tilstandsdeler på de tre sidene uten funnkandidat: ni viewport-prøver, 24 Tab-steg og faktisk Enter-pause av illustrasjonen. Den enklere kontrastdelen hopper fortsatt over gradienter; det er den særskilte 86-vurderingen som følger dem opp. `run_checks.py --auto` fullførte med faktisk import av **kun forsiden** (axe-01.json), HTML/Nu/PDF-struktur og nettleserdata. Full 23-ruteskann er separat gjennomgått. Originalmanifest, axe-incomplete og automatisk restliste før vurdering er bevart; ingen motorresultater er omskrevet til pass.

29 krav har nytt automatisk delgrunnlag; 34 har samlet delgrunnlag når tidligere bredere tester er eksplisitt inkludert. 36 bredere manuelle oppfølginger, 11 uten utløsende innholdstype og ett fullført lokalt tekstavstandsutvalg videreføres. Ingen samsvarsprosent.

## Hva gjenstår?

De 86 normalforekomstene er ikke lenger en urørt kontrastrestliste. Faktisk native hover, andre dynamiske interaksjonstilstander/overlegg og PDF-kontrast gjenstår under 1.4.3. Skjermleser, 200/400 % zoom, fysisk enhet, språk/rekkefølge/PDF og pilot-/produksjonsforhold er ikke nytestet. Ingen faktisk native Chrome-tilgang er forsøkt omgått. Modellberegning og visuell kontroll er ikke full hjelpemiddel- eller rettslig godkjenning.

[Alle 48 krav og konkret rest](manuell-oppfolging.md), [vurdert grunnlag](wcag-grunnlag.json), [testplan](testplan.json), [automatisk deldekning](automatisk-dekning.json), [forrige oppfølging](../133024-18e0f9e56386/testrapport.md). Offentlig erklæring oppdateres kort om avklart gradientomfang; 15 U-krav beholdes. Øvrig historie og tidligere bevis er uendret.

## Alle 86 vurderinger

| Nr. | Side | Tekst | Laveste grense | Vurdering i prøvd normaltilstand |
| ---: | --- | --- | ---: | --- |
| 1 | / | Spør KI | 9.929467:1 | Ingen bekreftet feil |
| 2 | / | KUNNSKAP SOM BLIR TIL PRAKSIS | 11.233711:1 | Ingen bekreftet feil |
| 3 | / | Utvikle ideer.Bygg med KI. | 15.103749:1 | Ingen bekreftet feil |
| 4 | / | Bygg med KI. | 7.715057:1 | Ingen bekreftet feil |
| 5 | / | Et felles sted for kunnskap, metoder og verktøy. Utforsk hvordan kunstig intelligens kan støtte god produktutvikling. | 10.494120:1 | Ingen bekreftet feil |
| 6 | / | Kom i gang ↗ | 12.421097:1 | Ingen bekreftet feil |
| 7 | / | Utforsk ressursene ↓ | 9.390063:1 | Ingen bekreftet feil |
| 8 | / | ↓ | 9.390063:1 | Ingen bekreftet feil |
| 9 | / | Finn en ressurs | 10.070291:1 | Ingen bekreftet feil |
| 10 | / |  | 18.349621:1 | Ingen bekreftet feil |
| 11 | / | Ressurstype | 10.070291:1 | Ingen bekreftet feil |
| 12 | / | Skill | 10.780012:1 | Ingen bekreftet feil |
| 13 | / | Instruks | 10.780012:1 | Ingen bekreftet feil |
| 14 | / | Prompt | 10.780012:1 | Ingen bekreftet feil |
| 15 | / | Skill | 15.524920:1 | Ingen bekreftet feil |
| 16 | / | Beta | 12.421097:1 | Ingen bekreftet feil |
| 17 | / | Ennå ikke gjennomgått av et menneske | 9.558515:1 | Ingen bekreftet feil |
| 18 | / | Test tilgjengelighet og utform erklæring | 13.757172:1 | Ingen bekreftet feil |
| 19 | / | Kjør automatiske tilgjengelighetskontroller, se hva som gjenstår manuelt for alle 48 krav, og få rapporter, rettingsforslag og tilgjengelighetserklæring fra vur | 9.558515:1 | Ingen bekreftet feil |
| 20 | / | Se skill ↗ | 10.232168:1 | Ingen bekreftet feil |
| 21 | / | Skill | 15.524920:1 | Ingen bekreftet feil |
| 22 | / | Beta | 12.421097:1 | Ingen bekreftet feil |
| 23 | / | Ennå ikke gjennomgått av et menneske | 9.558515:1 | Ingen bekreftet feil |
| 24 | / | Kartlegg informasjonskapsler og samtykke | 13.757172:1 | Ingen bekreftet feil |
| 25 | / | Undersøk cookies, annen nettleserlagring og sporing, avklar behovet for samtykke og utform cookie-informasjon fra faktiske funn. | 9.558515:1 | Ingen bekreftet feil |
| 26 | / | Se skill ↗ | 10.232168:1 | Ingen bekreftet feil |
| 27 | / | Skill | 15.524920:1 | Ingen bekreftet feil |
| 28 | / | Beta | 12.421097:1 | Ingen bekreftet feil |
| 29 | / | Ennå ikke gjennomgått av et menneske | 9.558515:1 | Ingen bekreftet feil |
| 30 | / | Kartlegg personvern og utform erklæring | 13.757172:1 | Ingen bekreftet feil |
| 31 | / | Kartlegg faktisk databehandling, lagre vurderingsgrunnlaget i prosjektet og opprett eller oppdater personvernerklæringen med tydelige uavklarte forhold. | 9.558515:1 | Ingen bekreftet feil |
| 32 | / | Se skill ↗ | 10.232168:1 | Ingen bekreftet feil |
| 33 | / | Skill | 15.524920:1 | Ingen bekreftet feil |
| 34 | / | Beta | 12.421097:1 | Ingen bekreftet feil |
| 35 | / | Ennå ikke gjennomgått av et menneske | 9.558515:1 | Ingen bekreftet feil |
| 36 | / | Gjennomgå en kodeendring | 13.757172:1 | Ingen bekreftet feil |
| 37 | / | Et utgangspunkt for strukturert gjennomgang av kvalitet, feilscenarier og tester. | 9.558515:1 | Ingen bekreftet feil |
| 38 | / | Se skill ↗ | 10.232168:1 | Ingen bekreftet feil |
| 39 | / | Instruks | 15.524920:1 | Ingen bekreftet feil |
| 40 | / | Eksempel | 9.558515:1 | Ingen bekreftet feil |
| 41 | / | Gi KI tydelig kontekst | 13.757172:1 | Ingen bekreftet feil |
| 42 | / | Beskriv mål, rammer og forventet resultat før du starter en oppgave. | 9.558515:1 | Ingen bekreftet feil |
| 43 | / | Les instruksen ↗ | 10.232168:1 | Ingen bekreftet feil |
| 44 | / | Prompt | 15.524920:1 | Ingen bekreftet feil |
| 45 | / | Eksempel | 9.558515:1 | Ingen bekreftet feil |
| 46 | / | Utforsk et brukerbehov | 13.757172:1 | Ingen bekreftet feil |
| 47 | / | Beskriv en situasjon du vil forstå bedre. Få forslag til åpne intervjuspørsmål, og vurder hvilke dere vil prøve med brukere. | 9.558515:1 | Ingen bekreftet feil |
| 48 | / | Se prompten ↗ | 10.232168:1 | Ingen bekreftet feil |
| 49 | / | 01 / LÆR | 10.327385:1 | Ingen bekreftet feil |
| 50 | / | Kom i gang med KI → | 14.863774:1 | Ingen bekreftet feil |
| 51 | / | → | 11.055225:1 | Ingen bekreftet feil |
| 52 | / | 02 / PRØV | 10.327385:1 | Ingen bekreftet feil |
| 53 | / | Finn en ressurs til oppgaven → | 14.863774:1 | Ingen bekreftet feil |
| 54 | / | → | 11.055225:1 | Ingen bekreftet feil |
| 55 | / | 03 / DEL | 10.327385:1 | Ingen bekreftet feil |
| 56 | / | Del erfaringer i KI-prat → | 14.863774:1 | Ingen bekreftet feil |
| 57 | / | → | 11.055225:1 | Ingen bekreftet feil |
| 58 | / | PRØV I PRAKSIS | 11.055225:1 | Ingen bekreftet feil |
| 59 | / | Utforsk et brukerbehov | 14.863774:1 | Ingen bekreftet feil |
| 60 | / | Beskriv en situasjon du vil forstå bedre. Få forslag til åpne intervjuspørsmål, og vurder hvilke dere vil prøve med brukere. | 10.327385:1 | Ingen bekreftet feil |
| 61 | / | Se oppgaven → | 9.238613:1 | Ingen bekreftet feil |
| 62 | / | → | 9.238613:1 | Ingen bekreftet feil |
| 63 | /spor/ | Hvordan gjennomgår jeg en kodeendring? | 16.953022:1 | Ingen bekreftet feil |
| 64 | /spor/ | Hvordan gir jeg KI god kontekst? | 16.953022:1 | Ingen bekreftet feil |
| 65 | /spor/ | Hvordan utforsker jeg brukerbehov? | 16.953022:1 | Ingen bekreftet feil |
| 66 | /spor/ |  | 18.349621:1 | Ingen bekreftet feil |
| 67 | /spor/ | Ikke skriv personopplysninger eller internt innhold. | 11.345224:1 | Ingen bekreftet feil |
| 68 | /spor/ | Send spørsmål | 12.421097:1 | Ingen bekreftet feil |
| 69 | /oversikt/ | 01 / UTFORSK PRISER | 8.085980:1 | Ingen bekreftet feil |
| 70 | /oversikt/ | Priser og abonnement | 11.637814:1 | Ingen bekreftet feil |
| 71 | /oversikt/ | Sammenlign abonnement for Copilot, Claude og Codex. Se direkte API-priser og tokenpriser i Copilot, med kilde og sist kontrollert dato. | 8.085980:1 | Ingen bekreftet feil |
| 72 | /oversikt/ | Abonnement per bruker | 8.085980:1 | Ingen bekreftet feil |
| 73 | /oversikt/ | API og tokenbruk | 8.085980:1 | Ingen bekreftet feil |
| 74 | /oversikt/ | Se priser og abonnement → | 8.655854:1 | Ingen bekreftet feil |
| 75 | /oversikt/ | → | 8.655854:1 | Ingen bekreftet feil |
| 76 | /oversikt/ | Offentlige listepriser. Se kildestatus og vilkår på prissiden. | 8.085980:1 | Ingen bekreftet feil |
| 77 | /oversikt/ | 02 / GODKJENTE ASSISTENTER | 8.085980:1 | Ingen bekreftet feil |
| 78 | /oversikt/ | Godkjente KI-assistenter | 11.637814:1 | Ingen bekreftet feil |
| 79 | /oversikt/ | Copilot, Claude AI og Codex er godkjente KI-utviklingsassistenter for dem som jobber med produktutvikling og utvikling av løsninger i Nasjonalarkivet. | 8.085980:1 | Ingen bekreftet feil |
| 80 | /oversikt/ | Se godkjente KI-assistenter → | 8.655854:1 | Ingen bekreftet feil |
| 81 | /oversikt/ | → | 8.655854:1 | Ingen bekreftet feil |
| 82 | /oversikt/ | 03 / MCP-STATUS | 8.085980:1 | Ingen bekreftet feil |
| 83 | /oversikt/ | Godkjente MCP-er | 11.637814:1 | Ingen bekreftet feil |
| 84 | /oversikt/ | Følg arbeidet med vurdering og godkjenning av MCP-integrasjoner i Nasjonalarkivet. Atlassian MCP er under ROS-analyse, og Slack MCP er planlagt vurdert. Ingen a | 8.085980:1 | Ingen bekreftet feil |
| 85 | /oversikt/ | Se MCP-status → | 8.655854:1 | Ingen bekreftet feil |
| 86 | /oversikt/ | → | 8.655854:1 | Ingen bekreftet feil |

## Sluttverifisering

53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Første bygg tok med en arkivert TypeScript-kildekopi; kopiene er lagret som .txt og nytt bygg bestod. Produktets farger/stilkilder er uendret. Erklæringen er lest tilbake ved 1280/320 uten sideoverflyt og med alle 15 U-krav. [Verifikasjon](raw/postverification.json), [første byggefeil](raw/build-first-attempt.txt).
