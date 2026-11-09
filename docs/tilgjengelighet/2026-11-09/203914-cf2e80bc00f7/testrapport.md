# Retest av språkavvik A11Y-01 – 9. november 2026

Utført av Codex (OpenAI), med tilgjengelighetserklaering 0.3.0. Grunnlag: commit `c622090` med lokale parser-/data- og dokumentrettinger. Lokal portal på `http://127.0.0.1:3000/`; ingen publisering eller registrering.

## Resultat

**A11Y-01 (3.1.2 på prissiden) er rettet og retestet.** Ingen åpne bekreftede brudd står igjen i dette arbeidsgrunnlaget, men **samlet samsvar er fortsatt uavklart**. De 13 U-punktene fra den brede kontrollen er ikke lukket av denne målrettede retesten. K betyr bare undersøkt uten funn i oppgitt omfang, ikke formelt Ja. Ny arbeidsfordeling: 25 K, 10 I, 13 U og 0 B.

## Hva er rettet?

Tidligere ble engelske kildevilkår satt direkte inn i norske avsnitt uten språkmerking. Parserne for Copilot og Codex lager nå norske forklaringer fra avgrensede kildefelt. Copilot beholder kredittall og informasjon om gratis lisens for enkelte brukere; Codex beholder fra-pris, minstekrav til brukere og års-/månedsbetaling. Det er ikke brukt KI-oversettelse. Norske forklaringer krever ikke engelske språkspenn. Egennavn og etablerte modell-/API-termer er beholdt.

Ukjente pris-/kreditt-/tilleggsvilkår feiler parsing i stedet for å bli kopiert ukritisk til norsk innhold. Den eksisterende oppdateringsflyten beholder da forrige kontrollerte tekst og dato for den aktuelle kilden. Dette er en formatregel, ikke en generell automatisk språkdetektor. Nye kildeformater krever vedlikehold og gjennomgang.

## Utførte kontroller

1. **Virkelig prisoppdatering:** `node scripts/pricing/sync.mjs` ble kjørt mot alle seks offisielle kilder og avsluttet med exit 0. Totalt 26 pris-/vilkårsrader ble regenerert. Numeriske priser er uendret fra forrige snapshot; se `raw/live-refresh.json`.
2. **Nettleserretest etter oppdatering:** Alle seks «Vilkår og avgrensninger» ble åpnet med Enter og de faktiske notene lest i DOM/AX. De tidligere engelske setningene i Codex og Copilot er borte. De nye vilkårsnotene er norske og passer dokumentets `lang=nb`. Se `raw/pricing-language-after-refresh.json`, `raw/pricing-expanded-ax.txt` og `screenshots/pricing-language-fixed.png`.
3. **Regresjonstest av gjentatt oppdatering:** To `refresh`-runder med JSON-lagring/innlasting kontrollerer at kjente engelske vilkår ikke kommer tilbake i notene. Ingen virkelige leverandørdata sendes til en modell.
4. **Regresjonstest av endrede kildetall:** Simulert endring fra 2 til 5 brukere og fra 25 til 27 USD gir oppdatert norsk tekst og riktig tall, ikke hardkodede gamle vilkår.
5. **Regresjonstest av ukjent format:** Simulerte nye engelske tilleggsvilkår i Copilot og Codex gir feilstatus og bevarer forrige norske tekst, prisrader og vellykkede kontrolldato.
6. Alle **48 prosjekttester**, inkludert **8 prisparsertester**, bestod. De tre nye språkregresjonstestene inngår i `tests/pricing.test.mjs`, som den daglige GitHub-jobben allerede kjører. Se `raw/project-tests.stdout.txt`.
7. Ny Pages-eksport og skillens HTML-grunnkontroll: 23 HTML-filer uten kandidater i de avgrensede reglene. Se originalt `manifest.json` og `raw/html-01.json`. Dette er ikke en full WCAG-godkjenning.

## Avgrensning og videreført usikkerhet

Retesten gjelder språkavviket i de kontrollerte prisnotene og oppdateringsveien. Den er ikke en ny 20-siders revisjon eller faktisk skjermlesertest. Skjermleser, faktisk zoom, PDF, alle kontrast-/fokustilstander, redusert bevegelse med systeminnstilling og utestede dynamiske tilstander gjenstår som tidligere. Den daglige jobben er ikke aktivert/kjørt på GitHub fordi repoet fortsatt er lokalt; samme innhentingsskript er kjørt lokalt, og jobbens eksisterende parserkommando dekker de nye testene. Ingen hemmelige nøkler eller andre repoer er brukt.

Tidligere funn og råresultater bevares i `../201443-73cb0a3e52e0/`, blant annet originalt språkbevis. Øvrige kriterier i dette retestgrunnlaget har `evidence_base` til tidligere kjøring; ikke gi dem en ny testdato. Bruk den brede rapporten for opprinnelig omfang og tidligere teststeg.

## Kilde

[Uu-tilsynets veiledning til 3.1.2](https://www.uutilsynet.no/wcag-standarden/312-sprak-pa-deler-av-innhold-niva-aa/111) er åpnet på nytt 9. november 2026. Rettingen fjerner de engelske setningene gjennom norske forklaringer; ingen ny formell samsvarskategori er fastsatt.

## Sluttkontroll av dokumentoppdateringen

Produksjonsbygg med TypeScript og Pages-bygg bestod. Bygget HTML viser de norske vilkårene, og erklæringen beskriver avviket som rettet/retestet. 48 kriterier, 13 videreførte U-punkter og 30 relative dokumentlenker er kontrollert. Se `raw/rendered-verification.json`. Prisjobben sin nøyaktige testkommando er også kjørt lokalt: `raw/pricing-workflow-command.stdout.txt`. Dette er ikke en faktisk GitHub Actions-kjøring.
