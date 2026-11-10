# Fullført lokal vurdering av 1.4.11

**10. november 2026 · Codex (OpenAI) · tilgjengelighetsskill 0.5.1 og PDF-skill · bd8b290 med lokale filterrettinger.** Ingen underagenter. Ingen commit, registrering eller publisering.

## Konklusjon

**1.4.11 U → K i oppgitt eksisterende lokalt portal-/PDF-utvalg.** Det ble funnet og rettet ett overgangsavvik, A11Y-07. Ingen bekreftede åpne avvik etter retest. **24 K / 11 I / 13 U / 0 B** er arbeidsstatus, ikke formell global samsvarsgodkjenning. 1.4.3 K beholdes med supplerende retest fordi filterovergangen også berørte teksten. PDF-en er uendret; ingen PDF-kontrastretting nødvendig.

## Avgrensing og vurderingsregel

Nødvendige feltgrenser, tilstandsmarkeringer og ikoner er vurdert mot **direkte tilstøtende farger**, også i hover/fokus/valg/feil og åpne/lukkede trekkspill. Kontrollens nåværende tilstand må være identifiserbar; det er ikke automatisk krav om 3:1 mellom to farger vist på forskjellige tidspunkt. Tekstlige knapper kan identifiseres ved tydelig tekst uten at enhver dekorativ ramme må nå 3:1. Fokusmarkering vurderes fortsatt separat. Kilde: [Uu-tilsynets veiledning](https://www.uutilsynet.no/veiledning/1411-kontrast-ikke-tekstlig-innhold/1241), kontrollert 10. november 2026.

For grafikk er hver del vurdert etter om den trengs for å forstå innholdet. En svak innramming blir ikke automatisk et brudd dersom navn, gruppering og opplysninger bevares uten den. Dette er en konkret faglig vurdering, ikke et generelt unntak for alle PDF-figurer. Kilder: [Uu-tilsynets krav/tolking](https://www.uutilsynet.no/wcag-standarden/1411-kontrast-ikke-tekstlig-innhold-niva-aa/145) og [W3Cs forklaring](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html), kontrollert 10. november 2026. Ingen nye sektor-/publiseringsopplysninger eller uforholdsmessig-byrde-unntak er antatt.

## Dekning og nødvendige deler

[Familievis klassifisering](raw/classification.json) og [HTML-inventar](raw/html-inventory.json) dekker dagens sidetyper. Inventaret på 25 HTML-filer fant fire statiske SVG-former (logo og ikoner); runtime-close-ikon og native summary-markører er undersøkt særskilt. CSS-orbiter, kanter og markører er klassifisert i tillegg. Ingen skjult graf-/kartfamilie i det lokale innholdet er antatt testet.

| Familie | Nødvendig del / avgrensing | Vurdering |
| --- | --- | --- |
| Text-labelled links/buttons, resource cards, badges and overview panels | Text identifies control/category; focus outline where interactive | Card/button boundaries and type-chip enclosures are supplementary, not sole control identification. Existing scoped 1.4.3 text assessment retained; focus colours measured here. No blanket requirement for every box border. |
| Catalog search and chat input | Field boundary on inner/outer surround, focus/error-state boundary | Required field location measured in normal, hover, focused and validation-error states. aria-hidden on visual fieldset is not a reason to exclude it; explicit visual sampling added. |
| Resource type filters | Selected filled background and keyboard focus outline | A11Y-07: real .25s colour/background transition delayed selected-fill cue and temporarily reduced text contrast. transition:none makes foreground/background change together. 16 immediate keyboard/pointer changes at 1280/320 meet 3:1 mark and 4.5:1 text. |
| Main-menu active item | Current-page underline and focus outline | Accent underline distinguishes location, tested against same dark adjacent background. No requirement to compare current colour to previous time state. |
| Chat close control | X icon is sole visible close identifier; focus outline | Required icon measured normal, actual hover and keyboard focus at broad/narrow widths; lower bound 3.3923:1. Explicit aria-label does not exempt visual icon. |
| Chat launcher, Send, suggestions and next-topic controls | Visible labels identify labelled controls; icons considered conservatively | Glyphs measured even where label repeats function. Inactive controls are excluded only while actually blocked; previously sampled loading/disabled state retained with original date. |
| Source/price disclosure controls | Native triangle position/orientation and focus outline | Three source disclosures and six price disclosures tested closed/open; marker colour measured against local background. Six table-region focus outlines tested individually. |
| Hero illustration | Outer control frame and focus outline; central brand symbol reinforces target | Outer .7-alpha frame measured with worst-case halo bounds, paused/running states identified by current UI. Orbital lines/dots are decoration without axes, values or data. No new animation/assistive-technology conformance claim. |
| Header/footer and resource logos | Wordmarks/labels identify destination; link focus | SVG brand mark repeats portal identity; no information unique to logo. Source/HTML inventory contains four static SVG shapes plus runtime close icon, not a hidden chart family. |
| Tables, callouts, dividers and price-age stripe | Headers, labels, text and control focus where interactive | Separators/shading/stripe reinforce explicit text and spacing, encode no extra values. Age notice explicitly says data are old. No contrast exemption is used for its text. |
| PDF diagram, page 6 | Named partners, explicit collaboration introduction, spatial grouping and central team emphasis | Central dark ellipse measured conservatively. Seven peripheral outlines/fills are supplementary enclosures: no connecting edges, scales, quantitative values or category legend. Seven names/descriptions remain spatially distinct; introduction states collaboration, green node also says it does not exist. Low outline contrast is recorded but not a breach where enclosure can be omitted without losing content. This visual judgement does not settle alt text/reading order. |
| Other PDF graphics | Conservatively measure six icon strokes and twelve list bullets | Icon meanings repeated by headings; coloured strips, backgrounds, koalas, row/footer rules and panel borders encode no independent information. All 157 primitives classified with individual reason and bounding box; no classification solely from PDF Figure role/Alt. |

Klassifiseringen er gjort fra faktisk visning, innhold, kilde og geometri. Visuelt aria-hidden fieldset er målt selv om rammen er skjult for hjelpemidler. En første generell DOM-filterregel utelot disse rammene; eksplisitt feltprøve ble derfor lagt til. Ingen manglende rammemåling ble brukt som bestått. SVG som er aria-hidden fordi en knapp har et tilgjengelig navn, blir heller ikke fritatt fra nødvendig visuell ikonkontrast.

## A11Y-07: valgt filter under fargeovergang

**Før:** Velg Prompt/Skill med tastatur eller peker på forsiden. aria-pressed skifter umiddelbart, men MUI animerte background-color og color over 0,25 sekunder. Første mobilmåling ga transparent valgt-flate (1:1). Fire ytterligere faktiske snapshots med tilhørende renderinger ga valgt-flate 1,017791–2,676374:1; tekst sank til 1,917620:1 i siste registrerte bilde. Det gjelder en kort overgang, ikke den stabile grønnfargen. En separat fokusramme erstatter ikke informasjonen om hvilken ressurstype som er valgt.

**Retting:** Filterknappene har nå transition:none, slik at tekst og valgt bakgrunn skifter samtidig. Ingen endring av stabil palett, katalogfiltrering eller animasjonen på forsiden. Funksjonsregisterets katalogbeskrivelse er oppdatert med umiddelbar valgtmarkering; Beta-status er beholdt.

**Retest:** Alle fire filtertyper er byttet 16 ganger med tastatur og peker ved 1280/320 px, med avlesning rett etter handling og én aria-pressed=true hver gang. Valgt flate er minst **10,922731:1**, tekst minst **12,538164:1**. Ingen fade finnes i de faktiske avlesningene. [Før/etter og beregning](raw/filter-retest-results.json), [før](screenshots/filter-before-0.png), [etter](screenshots/filter-after-fix.png). Funn/reproduksjon/konsekvens/retting ligger også i kravgrunnlagets A11Y-07; historien er bevart selv om funnet nå er lukket.

## Kontrollmarkeringer

32 før-tilstander / 158 målinger er bevart i [førgrunnlaget](raw/ui-before-fix.json), inklusive den bekreftede svake overgangsmålingen. De øvrige nødvendige markeringene har konservativ grense minst **3,392300:1**. Det gjelder blant annet close-ikonets faktiske hover/fokus, inputkanter mot indre og ytre flate, valgt filter, aktiv-meny-strek, animasjonskontrollens ramme/fokus, tre kilde- og seks prismarkører lukket/åpen og alle seks tabellenes fokusrammer. Både normal- og feiltilstand i chatfelt er målt. Mobildekkning er eksplisitt ført i råfilene.

Det kombinerte rågrunnlaget beholder 34 tilstander / 164 målinger: de 32 før-tilstandene og to ekstra etter-tilstander / seks målinger. Den gamle svake overgangen ligger derfor fortsatt i det kombinerte resultatet; den er **ikke** et nytt etter-retting-brudd. Den uavhengige korrigerende retesten er de 16 filterhandlingene. Uendrede øvrige kontrollfarger videreføres med sine opprinnelige målinger i samme økt. Ingen pass påstås ved å filtrere bort et ubearbeidet funn.

Beregningen bygger på faktiske sRGB/alpha-farger og konservative gradientgrenser med én 8-bit avrundingsmargin. Feltkantens alpha males på feltets egen indre bakgrunn, før den sammenlignes også mot ytre flate. Outline med offset måles mot omgivelsene utenfor kontrollen. For hero-kontrollen er halo/radial regnet med konservativ full dekning. Inaktive kontroller og MUI-ripple beholdes med tidligere dokumentert avgrensing: ingen ny påstand om holdt pointer-down, og temaets ripple er deaktivert. [Beregner](raw/measure_ui.py), [matematikk](raw/color_math.py), [samlet måledata](raw/ui-results.json).

## PDF-diagram og øvrig grafikk

Alle syv sider er rendret på nytt ved 120 dpi og visuelt gjennomgått. **Alle 157 vektorprimitiver** har kategori, koordinater og individuell begrunnelse i [PDF-vurderingen](raw/pdf-assessment.json). Dette er ikke det samme som antall semantiske Figure-tagger. PDF-hash er uendret: `ba267d899460e54a911c548c5ddecfd9a83159ec3b6d7b6e30d9d4f34d0c648a`.

| PDF-del | Nødvendighet og resultat |
| --- | --- |
| Sentral ellipse, side 6 | Mørk sentral teamflate måles konservativt som nødvendig for sentral/perifer fremheving; passerer 3:1 mot sideflaten. |
| Syv perifere ellipser, side 6 | Lav kontrast i omrissene er registrert. De er supplerende innramming: innledningen sier at teamet er koblet til fagmiljøene; syv navn/beskrivelser og plasseringen bevares uten omriss/fyll. Ingen forbindelseslinje, skala, verdi eller kategoriforklaring avhenger av dem. Grønn flate er ikke eneste signal for at KI-forvaltningsteamet ennå ikke finnes – dette står i teksten. |
| Seks ikonstreker, side 3 | Betydning gjentas i overskriftene; likevel målt konservativt mot orange/blå/grønne flater, passerer. |
| Tolv listepunkter, side 7 | Målt konservativt mot hvit listeflate, passerer. |
| Kolonnepaneler og fargestriper | Navngitte overskrifter og atskilte tekstlister bærer kategoriene. Panelhøyder/striper er ikke verdier i et diagram. |
| Koala, kantstriper og skillelinjer | Identitets-/layoutdekor uten egen kontroll, tilstand, dataserie eller ekstra relasjon. Begrunnelsene er ført per primitiv. |

19 nødvendige eller konservativt prøvde grafiske deler har minst **4,191671:1**. Syv valgfrie ellipseomriss er også målt og beholder lave verdier i råfilen; de er ikke overskrevet eller «rettet» for å gjøre alle dekorlinjer 3:1. Nødvendighetsvurderingen er en begrunnet visuell informasjonsvurdering, **ikke** en påstått prøve i en redigert PDF der former ble slettet.

Denne avklaringen lukker bare 1.4.11 i oppgitt utvalg. Likeverdige tekstalternativer, faktisk opplesing, relasjoner i strukturtreet, språk og leserekkefølge har egne uavklarte krav og er ikke godkjent ved kontrastmålingen.

## Regresjon og rest

Skillens nettlesermodul er kjørt etter retting på /, /spor/ og /priser/: ni viewport-prøver, 24 Tab-steg og to deklarerte tastaturforløp uten kandidat. `run_checks.py --auto` er kjørt på ny eksport etter filterretting, med faktiske etter-nettleserdata og original forside-axe fra den tidligere daterte 150658-native-bf6961aa-kjøringen. Importen er ikke en påstand om nytt axe-skann. Ny avsluttende motorregresjon føres særskilt etter ferdig bygg.

35 krav har samlet maskinelt delgrunnlag når de nye målrettede 1.4.11-beregningene er lagt til; nødvendighetsklassifiseringen og kriterieavgjørelsen er manuell. 34 bredere manuelle oppfølginger, 11 uten lokal utløsende innholdstype og tre fullførte lokale manuelle utvalg er arbeidskategorier, ikke samsvarsprosent.

Faktisk skjermleser, 200/400 % zoom, fysisk enhet, videre semantikk/PDF-språk/rekkefølge og publisert/auth/modellmiljø er ikke testet her. Nye komponenter/grafikker/overlegg krever ny vurdering. Ingen grunn til å omklassifisere de øvrige 13 U-kravene. Tidligere funn og råmanifest er bevart.

[48-kravsmatrise](wcag-grunnlag.json), [testplan](testplan.json), [restliste](manuell-oppfolging.md), [automatisk deldekning](automatisk-dekning.json), [protokoll](manual-tests.json), [forrige vurdering](../145250-bd1373c8699b/testrapport.md).

## Sluttverifisering

Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Ny avsluttende native-kjøring `162215-native-1eb13e38`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu gir 0 feil / 207 tekniske info-noter om avsluttende skråstrek. Original motorstatus er bevart. Erklæringen er lest tilbake ved 1280/320 uten overflyt med nøyaktig de 13 U-ID-ene fra matrisen. PDF-en er identisk med HEAD. Lokale dokumentlenker, formatering og Git-diff er kontrollert.

[Ny native-kjøring](../162215-native-1eb13e38/native-manifest.json), [vurdering av motorresultater](raw/native-postverification.json) og [samlet verifisering](raw/postverification.json).
