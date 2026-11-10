# Automatisk testkjøring og manuell restliste

Ved et testoppdrag skal agenten kjøre alle relevante medfølgende deltester som miljøet tillater. Start ikke med å fylle 48 rader manuelt. Kartlegg prosjektets eksisterende lokale tilgjengelighetstester, HTML-eksport, dokumenter, sidetyper og viktige forløp; bruk eksisterende skannintegrasjon når den er tilgjengelig. Registrer verktøy som mangler eller ikke kan brukes innenfor oppdraget. Ingen automatikk kan dekke alle sider av WCAG; se [W3Cs verktøyveiledning](https://www.w3.org/WAI/test-evaluate/tools/selecting/) (kontrollert 9. november 2026).

## 1. Kjør nettleserdelene automatisk når nettleser er tilgjengelig

`scripts/browser_checks.mjs` er en gjenbrukbar modul for kodeassistentens dokumenterte nettleser-API. Importer den i nettleserverktøyets JavaScript-miljø. Den starter ingen egen nettleser/CDP-forbindelse, injiserer ingen skannkode og krever ingen npm-installasjon. Les miljøets API-dokumentasjon først. Bruk bare den dokumenterte adapteren; mangler kompatibelt API, dokumenter blokkeringen og kjør de øvrige delene.

Velg ruter fra prosjektets faktiske ruter/eksport/nettstedskart og relevante sidetilstander. Ikke gjett nettadresser eller kryp inn i andre nettsteder. Bruk en egen midlertidig fane. Modulen begrenser ruter til samme origin, men autoriserer ikke tilgang eller innsendinger.

Eksempel i et miljø med `browser.tabs`, `tab.playwright` og dokumentert viewport-capability:

```js
const { runBrowserChecks } =
  await import("/absolutt/sti/til/skill/scripts/browser_checks.mjs");
const tab = await browser.tabs.new();
const viewport = await browser.capabilities.get("viewport");
// Les viewport-dokumentasjonen før bruk. Utelat adapteren hvis den ikke støttes.
const report = await runBrowserChecks({
  tab,
  baseUrl: "http://127.0.0.1:3000/",
  routes: ["/", "/kom-i-gang/"], // erstatt med faktisk, representativt ruteutvalg
  viewport,
  tabSteps: 8,
  flows: [], // fyll for løsningens relevante dialoger, skjema, filtre og animasjon
});
// Lagre JSON med tillatt filverktøy i en midlertidig lokal fil.
// Send stien til --browser-report nedenfor; originalen kopieres til raw/.
```

Modulen kjører automatisk:

- rendret DOM: språk/tittel, duplikate ID-er, bilder, ARIA-referanser, felt-/kontrollnavn og kandidater for synlig tekst i navn;
- tekstkontrast med faktisk skriftstørrelse/-vekt og beregnbar solid sRGB-bakgrunn, med råmålinger og liste over hoppede elementer;
- omflyting/sidebredde ved 1280 × 800, 320 × 800 og 800 × 320 når viewport støttes;
- et konfigurert antall Tab-steg, med faktisk fokus, posisjon, outline/box-shadow og URL;
- deklarerte brukerforløp med tastatur/fylling/klikk og konkrete forventninger til synlig kontroll/attributt.

Konfigurer forløp ut fra faktisk observert grensesnitt. Hvert forløp må angi relevante kriterier i `criteria`; ikke knytt en pauseknapp til skjema-/statuskrav som ikke er testet. Bruk syntetiske data i autorisert testmiljø. Ikke send kontakt, kjøp, sletting eller andre reelle handlinger bare for et skann. Eksempel på ett steg i et pauseforløp:

```js
{
  route: '/', name: 'Pause animasjon', criteria: ['2.1.1', '2.2.2'],
  steps: [{
    role: 'button', name: 'Pause animasjonen', action: 'press', value: 'Enter',
    expect: { role: 'button', name: 'Start animasjonen' },
  }],
}
```

Tillatte kriterier for deklarerte tilstander finnes i modulens `groups['browser-states']`. Ikke kopier eksempelets navn til en annen løsning. Feil i en rute hindrer ikke forsøk på andre ruter. Tekniske feil og uoppfylte forventninger beholdes som feil, også når andre deler fullføres. Viewport tilbakestilles etter kjøringen. Manglende forløp/viewport blir blokkert, ikke bestått.

Dette er **ikke** en axe-motor eller full beregning av tilgjengelig navn. Kandidater trenger vurdering. Kontrast over gradienter, effekter, uavklarte bakgrunner og faste overlegg hoppes over med begrunnelse. Pseudo-elementer, overlappende lag, shadow DOM og iframe-innhold må undersøkes særskilt. Viewport er ikke faktisk zoom eller fysisk rotasjon; Tab-spor er ikke full tastaturtest eller skjermleser.

## 2. Kjør samlet lagring og lokale deltester

```sh
python3 /sti/til/skill/scripts/run_checks.py --auto \
  --project-root /sti/til/prosjekt \
  --browser-report /sti/til/midlertidig-nettleserrapport.json \
  --agent 'Kodeassistentens faktiske navn'
```

`--auto` finner HTML i `out/` eller `dist/`, leser PDF-er i `public/` og forsøker lokal `vnu`-validering hvis kommandoen er installert. Oppgi `--html-export <mappe>` ved annet oppsett, `--base-path /prosjektsti` ved behov og `--pdf <prosjektrelativ-fil>` (kan gjentas) for dokumentutvalg. Verktøyet bygger ikke prosjektet og leter ikke i `.env`, kildehemmeligheter eller andre repoer. Avstem eksport og nettleser mot samme testede revisjon; en gammel eksport må bygges på nytt med prosjektets etablerte kommando før testing når det er innenfor oppdraget.

Python-basisen har ingen tredjepartskrav. PDF-kontrollen bruker `pypdf` hvis installert: tittel, språk, strukturtre, rollefordeling og SHA-256. Manglende pakke gir blokkert test. Den utfører ikke PDF/UA-validering eller visuell kontrast-/leserekkefølgeanalyse. En PDF uten funn her kan fortsatt ha utilgjengelige lister eller tekst. Ingen pakker, nettlesere eller eksterne tjenester installeres/aktiveres automatisk.

Lokal [Nu Html Checker](https://github.com/validator/validator) brukes med JSON-format og bevart råutskrift når tilgjengelig. Ikke bruk en ekstern valideringstjeneste for privat innhold. Behandle HTML-feil som kandidater til relevant kriterievurdering.

Hvis prosjektet har en tilgjengelig, autorisert axe-integrasjon, kjør den også på relevante sider/tilstander gjennom miljøets tillatte verktøy og oppgi `--axe-report <original-json>`. Importen støtter original [axe-core JSON](https://www.deque.com/axe/core-documentation/api-documentation/) med motor/versjon, tidspunkt, URL, `violations`, `incomplete`, `passes` og `inapplicable`. Den kjører ikke en ny axe-skann. Funn og uavklarte verktøyresultater bevares; bestått regel er bare deldekning. `inapplicable` på én side gir aldri automatisk I-status for hele nettstedet. Manglende axe rapporteres som blokkert; ikke påstå at den enklere DOM-testen er axe. Kildedato for verktøyformatene: 9. november 2026.

`--contrast` kan fortsatt gjentas for eksplisitte kontrastpar. Uten `--auto` beholdes gammel, avgrenset HTML-/kontrastmodus for kompatibilitet. Skillens vanlige testflyt skal bruke `--auto`.

## 3. Les restlisten og fullfør vurderingen

Kjøringen lagrer:

- `automatisk-dekning.json`: alle 48 ID-er med faktisk kontrollstatus, utvalg, målinger, evidens, funn og blokkeringsårsaker;
- `manuell-oppfolging.md`: lesbar tabell over alle 48 krav, automatiske delresultater og konkret neste manuelle steg med lenke til full prosedyre;
- `testplan.json`: samlet kravvurdering starter fortsatt som ikke testet, med separate felter for automatisk deldekning/evidens og manuell oppfølging;
- `raw/auto-01.json` og rå stdout/stderr, samt kopier av oppgitte nettleser-/axe-rapporter;
- eksisterende manifest, prosedyreøyeblikksbilde, manuelle tester, kravgrunnlag og kort erklæringsarbeidsgrunnlag.

Exit 0: fullført i valgt automatisk delomfang uten kandidater. Exit 1: kandidater/uavklarte verktøyfunn. Exit 2: teknisk feil eller manglende automatisk grunnlag/verktøy; utførte deler er fortsatt lagret. Blokkert axe/vnu gjør dermed at en ellers vellykket kjøring fortsatt er delvis. Alle 48 beholder U i kriteriegrunnlaget til de er faktisk vurdert. Et krav kan ha automatiske resultater **og** en nødvendig manuell rest.

Bekreft relevante innholdstyper og unntak manuelt. Faktisk skjermleser, zoom, tekstavstand, innholdskvalitet, mediealternativer, glimt, berøring og konsekvensfulle skjema må følges opp etter den kravvise prosedyren. Kjør andre automatiske analyser som prosjektet allerede tilbyr og miljøet tillater; lagre råevidens og før riktig deldekning. Ikke stopp ved de lette kontrollene dersom flere autoriserte verktøy er tilgjengelige.

Oppdater deretter prosjektets rapporter og erklæring fra vurderte resultater etter [resultatlagring.md](resultatlagring.md). Bevar tidligere funn og datoer. Restliste, tekniske feil og måltall hører hjemme i rapportene, ikke som arbeidsstatus i den brukerrettede erklæringen.

## Avslutt med vurderingskontroll

Nye kjøringer oppretter `testmuligheter.json` med status `unverified` og `completion`-felter i testplanen. Dette er uutfylte arbeidsgrunnlag, ikke prøvde verktøy eller kontroller. Fyll dem etter [testmuligheter og avslutning](testmuligheter-og-avslutning.md), og kjør [avstemmingen](avstemming.md). Den automatiske delstatusen skal holdes atskilt fra matriseavgjørelsen i `criterion_status`. Bevar mislykkede forsøk/førmålinger når en korrigerende retest føyes til.
