# Interaktive kontrasttilstander og PDF

**10. november 2026 · Codex (OpenAI) · tilgjengelighetsskill 0.5.1 og PDF-skill · grunnversjon 0ac6bab.** Ingen underagenter. Lokal utviklingsutgave og eksisterende produksjonseksport; ingen commit/publisering eller godkjenning av produksjon.

## Resultat

Ingen nye bekreftede kontrastbrudd i prøvd utvalg. **Ingen design- eller PDF-retting nødvendig.** Midlertidig testrespons i adapteren er fjernet byte for byte før regresjon/bygg. PDF-hash er uendret: `ba267d899460e54a911c548c5ddecfd9a83159ec3b6d7b6e30d9d4f34d0c648a`.

**1.4.3 U → K** for oppgitt eksisterende lokalt HTML/PDF-utvalg. Arbeidsmatrisen blir **23 K / 11 I / 14 U / 0 B**. K er undersøkt uten funn i avgrenset omfang, ikke automatisk formelt Ja. Samlet samsvar er fortsatt uavklart. **1.4.11 står U** for full klassifisering av nødvendig grafisk informasjon; PDF-tekstkontrast er ikke lenger en uutført rest. A11Y-01–06 beholder tidligere dokumentert rettet-status, ikke ny full manuell retest.

## Faktiske UI-prøver

23 navngitte tilstander / 694 synlige tekstmålinger er lagret i [råstiler](raw/interactive-states.json) og [beregnede resultater](raw/interactive-contrast.json). Utvalget dekker kort/knapper/menylenker med faktisk :hover, valgt og uvalgt filter, tomt søkeresultat/nullstilling, placeholder med 0,5 alpha, popup-/sidechat, kildeutvidelse, neste tema, tomt spørsmål/validering, og seks åpne pristabellvilkår. Hover ble verifisert i DOM etter vanlige klikk eller høyreklikk på eksisterende lenker (uten navigasjon). Escape avslutter eventuell konteksthandling. Ingen CSS-forsering av :hover eller omgåelse av avvist native Chrome-tilgang.

Laveste grense for aktive/aktuelle tekster er **5,209084:1**, mot 4,5:1. Den eneste målingen under 4,5 er **Tøm chat** under lasting (**1,580358:1**), med faktisk native `disabled`. Det er ikke et bekreftet brudd: inaktive kontroller er unntatt fra tekstkontrastkravet; dette brukes ikke på ventetekst/feilmeldinger, som er målt og passerer. Se [W3Cs forklaring til 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html), kontrollert 10. november 2026.

Lasting og tjenestefeil ble utløst med et syntetisk spørsmål og en midlertidig 20-sekunders respons i den eksisterende request-adapteren. Faktisk React-UI viste ventetekst, aria-disabled Send og native disabled Tøm, deretter eksisterende feilmelding. Dette er **kontrollert feil-/lastesimulering**, ikke test av faktisk nettverksbrudd, ekstern modell eller produksjon. [Fixture og gjenoppretting](raw/fixture-restoration.json), [venting](../../../arkiv/skjermbilder/tilgjengelighet/2026-11-10/145250-bd1373c8699b/screenshots/loading.png), [feil](../../../arkiv/skjermbilder/tilgjengelighet/2026-11-10/145250-bd1373c8699b/screenshots/error.png).

Beregningen tar med faktiske sRGB-/alpha-bakgrunnslag, konservative gradientgrenser og placeholder-alpha. Én transient bakgrunn ble serialisert i Oklab; den er konvertert til sRGB, med assert på gamut. Metodegrunnlag: [CSS Color 4](https://www.w3.org/TR/css-color-4/#color-conversion-code), kontrollert 10. november 2026. Dette er ikke eksakt pixelmåling av enhver overgang. [Beregner](raw/interactive_bounds.py).

En hypotese om MUI-ripple ved opacity 0,3 ga svake beregningsgrenser, men **gjelder ikke portalen**: Digitalarkivet har `MuiButton`/`MuiIconButton.disableRipple=true`, ingen komponentoverstyring aktiverer den, og DOM viste ingen ripple-røtter. Hypotese og avvisningsgrunnlag er bevart i raw/ripple-*; ingen hypotetisk effekt ble registrert som et faktisk brudd eller «rettet». Ingen faktisk holdt pointer-down er påstått testet.

## PDF: alle sju sider

Alle sider er rendret på nytt med Poppler ved 120 dpi og visuelt vurdert. Dokumentet har ingen rasterbilder. De **2694 ikke-blanke teksttegnene** er målt mot den faktisk synlige fylte bakgrunnen, også diagram-/bunntekster. Glyph-farger kommer fra PDF-kilden; antialiaserte kantpiksler brukes ikke som forgrunn. Bakgrunnsfargen måtte finnes i render innen to rasterpiksler fra glyph-boksen (toleranse 2/255): **2694 av 2694 bekreftet**. Alle tekststørrelser er konservativt sammenlignet med 4,5:1, uten å bruke unntak for stor tekst.

Første bakgrunnsvalg tok en underliggende hvit sideflate foran den senere mint-/grønnflaten. Renderkontrollen avviste dette, og første resultat/kode er bevart. Korrigert valg bruker topmost full-page fill, deretter relevante lokale flater/side-6-ellipser med alle glyph-hjørner innenfor. Ingen feil i dokumentet ble konkludert fra den avviste beregningen. [Kilde/kontrastberegner](raw/audit_pdf.py), [alle målinger](raw/pdf-text-contrast.json).

| PDF-side | Ikke-blanke tegn | Laveste tekstkontrast | Under 4,5:1 |
| ---: | ---: | ---: | ---: |
| 1 | 148 | 5.194027:1 | 0 |
| 2 | 311 | 5.194027:1 | 0 |
| 3 | 292 | 5.194027:1 | 0 |
| 4 | 468 | 5.194027:1 | 0 |
| 5 | 436 | 5.494970:1 | 0 |
| 6 | 453 | 4.932072:1 | 0 |
| 7 | 586 | 5.194027:1 | 0 |

Laveste tekstkontrast, **4,932072:1**, gjelder grå tekst på lysegrønn diagramflate på side 6. Tidligere rettet side-5-tekst er fortsatt lesbar. PDF-en er ikke redigert, nytagget eller nyeksportert. Skjermleser, språk, leserekkefølge og PDF/UA er ikke testet gjennom disse kontrastprøvene.

## Ikke-tekstlig kontrast

27 representative feltkant-/ikon-/fokusmålinger gir minst **3,421389:1**, uten måling under 3:1. Feltkant er vurdert mot indre og ytre bakgrunn. Fokus-outline med offset er målt mot omgivelsen utenfor knappen, ikke feilaktig mot knappens egen grønne flate. Blant ikonene er Lukk chat i faktisk hover. [Stiler](raw/nontext-states.json), [målinger/metode](raw/nontext-contrast.json).

PDF-ikoner på side 3 gjentar navngitte overskrifter; punktene på side 7 følger tydelig tekst. Koala, sidestreker og fargestriper er i hovedsak dekor. De svake ellipseavgrensningene på side 6 er ikke automatisk et brudd bare fordi de har lav kontrast; tekst/luft og mørk sentralnode gir også gruppering. Full vurdering av nødvendige romlige relasjoner/grafiske detaljer er ikke fullført. **1.4.11 og relevante alternativ-/strukturkrav beholdes U**, med konkret faglig rest. Det er ikke brukt et generelt «all grafikk er dekor»-unntak.

## Automatikk, historikk og rest

Skillens nettlesermodul fullførte på /, /spor/, /priser/ og /oversikt/: 12 viewport-prøver, 32 Tab-steg og to deklarerte tastaturforløp (pause og skill-filter), uten kandidat. Den enkle kontrastdelen alene avgjør ikke gradienter. `run_checks.py --auto` er faktisk kjørt med nettleserdata og den tidligere originale forside-axe fra 135353-native-2147a40e; dette er datert import, ikke en påstått ny axe-kjøring. Ny avsluttende motorregresjon føres som separat tillegg etter bygg.

Tidligere [86 normal-/22 fokusforekomster](../135417-d3e318e119fd/testrapport.md) er eksplisitt gjenbrukt med dato og omfang; de er ikke kjørt på nytt i sin helhet. Ingen rådata eller originalmanifest er omskrevet til pass. Automatikkens foreløpige 48-U-grunnlag er bevart i raw/initial-* før vurdering.

35 bredere manuelle oppfølginger, 11 uten lokal utløsende innholdstype og to fullførte lokale manuelle utvalg (1.4.3 og 1.4.12) er arbeidskategorier, ikke samsvarsprosent. Faktisk skjermleser, 200/400 % zoom, fysisk enhet, videre grafisk/semantisk vurdering og autorisert pilot-/produksjonsprøving gjenstår.

[Alle 48 krav og rest](manuell-oppfolging.md), [vurdert matrise](wcag-grunnlag.json), [testplan](testplan.json), [automatisk dekning](automatisk-dekning.json), [manuell protokoll](manual-tests.json). Offentlig erklæring har fortsatt separate deler for kjente brudd og alle 14 uavklarte krav.

## Avsluttende regresjon og kontroll

53 Node-tester, tre Python-tester og Pages-produksjonsbygg med TypeScript/ruteregister bestod. HTML-grunnkontroll bestod for 25 filer. Ny [native-kjøring](../150658-native-bf6961aa/native-manifest.json) etter bygg gir 23 axe-ruter / 0 violations / 3 incomplete-grupper / samme 86 forekomster, og 0 Nu-feil / 207 info-noter. Exit 1 er bevart for uavklarte motorresultater/noter; dette er ikke teknisk feil eller omskrevet motorpass.

Erklæringen er lest tilbake ved 1280/320 uten sideoverflyt og med nøyaktig de 14 U-ID-ene i vurdert matrise. Adapter, PDF og produktets fargestiler er identiske med HEAD. 195 lokale dokument-/evidenslenker er kontrollert. [Verifikasjon](raw/postverification.json), [native-tillegg](raw/native-postverification.json). Ingen formell samlet godkjenning.
