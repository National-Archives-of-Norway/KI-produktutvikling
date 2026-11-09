# Kvalitetskontroll – 6. november 2026

Kontrollert lokalt i den integrerte nettleseren. Første kontroll er supplert med vurderingsmatrise for alle 48 krav, flere tastaturtester, tekstavstander og automatiserte grunnkontroller. Samlet samsvar er fortsatt uavklart. Se [WCAG-KONTROLL.md](docs/tilgjengelighet/WCAG-KONTROLL.md) og [grunnlag for erklæringen](docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md). Ingen publisering er utført.

## Utført

- Forsiden er visuelt undersøkt ved 320, 390 og 1280 pikslers bredde. Ingen horisontal overflyt på forsiden ved 320 og 1280 piksler.
- Alle seks undersider er åpnet ved 320 piksler: tre ressursdetaljer, Kom i gang, Om og Spør KI. Alle hadde én hovedoverskrift, en beskrivende sidetittel og ingen horisontal overflyt.
- Interne lenkemål fra forsiden og undersidene er gjennomgått. Alle peker til eksisterende sider. Ankeret `#bidra` finnes på Om-siden, og katalogankeret fører til katalogen. Kildelenken i chatten peker til riktig ressurs.
- Katalogsøk uten treff viser tomtilstand. Nullstilling gjenoppretter listen. Skill-filteret gir én ressurs og oppdatert resultattall.
- Chatdialogen er visuelt undersøkt ved 320 piksler. Dialogen er 304 piksler bred og holder seg innenfor skjermen. Skrivefelt, sendeknapp og lukking er tilgjengelige.
- Et spørsmål om kodegjennomgang gir kildeutdrag. Ingen modellgenerering er konfigurert eller verifisert.
- Escape lukker dialogen og returnerer fokus til Spør KI-knappen.
- Tastaturaktivering av Hopp til innhold er kontrollert etter retting: fokus flyttes til `main#innhold`.
- HTML-språk er `nb`. Søke- og spørsmålsskjema har etiketter; filtre har `aria-pressed`; resultatantall og chat har live-regioner.
- Grunnleggende tekstfarger er undersøkt i nettleseren: hvit, grå (#d7d7d7) og aksent (#9df1ad) på mørk bakgrunn (#09151b). Dette dekker ikke alle kombinasjoner, gradienter eller tilstander.
- Redusert bevegelse er støttet i eksisterende CSS; operativsysteminnstillingen er ikke testet manuelt.

## Rettet

- Hovedinnholdet har `tabIndex={-1}` slik at hoppelenken faktisk kan flytte tastaturfokus.
- Fokusmarkering omfatter tekstområder, kildeutdrag og hovedinnhold.
- Duplisert ID mellom MUI DialogTitle og overskriften i chatten er fjernet slik at dialogen får en entydig tittel.
- Menylenker og utfellbare kilder har minst 44 pikslers høyde.
- Bunnteksten har ekstra plass under den flytende chatknappen; en tidligere paddingregel ble overskrevet.
- HTML markerer eksisterende myk rulling med Next.js sin `data-scroll-behavior`-attributt.

## Gjenstår før bred lansering

- Full tastaturgjennomgang av alle kontroller og fokusrekkefølge, særlig ved rulling nær den flytende chatknappen.
- Skjermlesertest av navigasjon, dynamiske søkeresultater og nye chatmeldinger.
- Verifisert 200–400 % nettleserzoom, større tekst og faktisk mobil med skjermtastatur. Liggende viewport og overstyrte tekstavstander er nå kontrollert.
- Full automatisert tilgjengelighetsskanning (for eksempel axe) og måling av resterende kontrastkombinasjoner og tilstander. Egne avgrensede DOM-/HTML-kontroller og to kontrasttester er utført.
- Flere nettlesere, særlig Safari og Firefox.
- Godkjenning av offentlig innhold, skrifter og profilressurser.
- Lenke- og ressurskontroll på publisert Pages-adresse med prosjektsti før demoen godkjennes.

## Tekniske kontroller

- Alle 18 tester bestod etter siste rettinger, inkludert to nye kontrasttester.
- Vanlig produksjonsbygg og statisk Pages-bygg bestod, inkludert TypeScript-kontroll.
- Endringene er lokale og er ikke committet eller publisert.

## Utvidet kontroll og erklæringsutkast

- Ni sider kontrollert ved 320, 844 og 1280 pikslers bredde: 27 grunnkontroller uten horisontal overflyt, manglende kontrollnavn eller dupliserte ID-er i utvalget.
- Tekstavstander overstyrt på åtte sider ved to størrelser. Midlertidig test-CSS er fjernet.
- Svak kantkontrast i chatfeltet rettet; fokustap ved innsending/tømming og manglende tydelig validering forbedret.
- Fastlåst skrivefelt i chatten fjernet slik at det ikke dekker kildeinnhold ved smal visning eller større tekstavstander.
- Nettstedskart og tilgjengelighetsside lagt til og lenket fra bunnteksten.
- Den formelle erklæringen er ikke opprettet. Kontaktadressen er bekreftet av brukeren; godkjenner og endelig nettadresse gjenstår.
- Pages-bygg med prosjektsti bestod grunnkontroll for 12 eksporterte HTML-filer.
- Evidens er lagret i `docs/tilgjengelighet/2026-11-06/`.
