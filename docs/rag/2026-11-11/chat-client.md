# Chatklient: svarformat, grafemer og demopakke

Dato: 11. november 2026. Utførende agent: Codex (OpenAI), ingen underagenter. Grunnlag: `f15c89b` med rettingene i denne arbeidsøkten. Kontrollene bruker lokal Node 24.22.1 og installert Next.js 16.4.3. Ingen ekte modell eller prisinnhenting er brukt.

## Rettet atferd

`AnswerContent` bruker nå den rene `parseAnswer(text, sourceCount)` fra `parse-answer.ts`. Den returnerer avsnitt, ordnede/uordnede lister og inline-deler. Tomme linjer mellom nummererte punkter starter ikke nye lister. Original startverdi og nummerhopp bevares med ol start og li value. Innrykkede fortsettelseslinjer blir tekst i samme punkt. Fet tekst kan inneholde kildehenvisninger; bare kildenummer i området 1–antall kilder blir lenker, og lenkemålet kommer fra den validerte kildelisten. Modellen kan ikke opprette HTML, script, bilde eller vilkårlige URL-er. Dette er et avgrenset tekstformat, ikke en full Markdown-parser med nestede lister.

`validateQuestion` bruker samme `Intl.Segmenter`-baserte grafemlengde i klient og server, med grense 3–1000 brukeropplevde tegn. Emoji, flagg, sammensatte aksenter, hudtoner og familie-emoji er testet. Tekstfeltets native maxLength er fjernet fordi det teller UTF-16; kontrollert onChange og avsluttet IME-komposisjon bruker samme grafemgrense uten å dele et tegn. IME er implementert, ikke manuelt prøvd.

HTTP-kroppsgrensen er økt fra 8192 til 65536 byte. 1000 familie-emoji gir omtrent 25 KB JSON og godtas. Grafemer har ikke en endelig maksimal bytelengde, så den separate transportgrensen består: en ekstrem kombinasjonssekvens kan ha tre grafemer, men mer enn 64 KiB, og får 413. Eksisterende HTTP-testforventninger ved den gamle bytegrensen er derfor flyttet til MAX_BODY-konstanten; testhensikten om eksakt grense/overstørrelse beholdes.

## Bygg og klientpakke

Klienten har ikke lenger en statisk retrieval-import. await import brukes kun i demo, bak den bygginnsatte NEXT_PUBLIC_STATIC_DEMO-konstanten. Serverbygget fjerner hele demo-importen, ikke bare tidspunktet for nedlasting. Node-testene uten byggkonstant kan fortsatt prøve demogrenen; feilaktig demo-kall i et serverbygg gir en forståelig melding uten API-kall. Feil ved lasting av demokilden håndteres også.

Faktiske produserte JavaScript-filer er undersøkt som en negativ/positiv motprøve. Søkemarkørene er de samme i begge bygg: fetchUrl, copilotPlans, codexTokens og retrieval-eksporten. De er fraværende i normalt serverbygg og finnes i Pages-eksporten. Se [serverkontroll](chat-client/server-bundle.json) og [Pages-kontroll](chat-client/pages-bundle.json), med alle matchede filnavn. Dette viser fjerning av chatens samlede RAG-grunnlag; offentlig ressursinnhold som katalogen trenger er fortsatt klientdata, og innholdssidene publiseres fortsatt som HTML/RSC.

`pnpm build:pages` bestod. Etter den visuelle prøven ble vanlig `pnpm build` kjørt uten testport, slik at .next ikke blir stående som Pages- eller mockserverbygg. [Byggmanifestkontrollen](chat-client/server-bundle.json) registrerer også ordinær rewrite-destinasjon.

## Kort visuell kontroll

Gjennomført i den innebygde nettleseren mot vanlig produksjonsbygg på tilfeldige lokale porter, med RAG-tjeneste som returnerte et simulert modellsvar. Ingen ekstern modell ble kontaktet.

- Synlig liste viste 1 og 2 selv med tom linje mellom punktene; separat liste startet korrekt på 4. Fortsettelseslinjen ble i punkt 1.
- DOM bekreftet én kildelenke inne i strong, to kildelenker totalt, og null script-elementer i svaret. Ukjent [99], HTML-lignende tekst og fri URL var vanlig tekst.
- To emoji ga valideringsmeldingen om 3–1000 tegn. Feltet ble fylt med 1000 familie-emoji pluss et ekstrategn; resultatet var nøyaktig de 1000 familiene, 11000 UTF-16-enheter, og ingen native maxlength-attributt. Dette ble kontrollert ved sammenligning av faktisk feltverdi, ikke antakelse om UTF-16.

[Skjermbilde](chat-client/chat.jpg) og [DOM-/feltbevis](chat-client/visual.json). Kontroll av grafemtallet i nettleserverktøyets read-only eval ble først blokkert fordi Intl ikke er eksponert der; faktisk feltverdi ble deretter lest og sammenlignet med den kjente strengen. Dette var en verktøybegrensning, ikke en feil i nettstedets Intl.Segmenter. Prøven er avgrenset til desktop; ingen ny skjermleser-/mobil-/WCAG-godkjenning påstås. Testprosessene ble stoppet etterpå.

## Kontroller

- `pnpm test:rag`: **132/132**, inkludert rene parsertester uten React-testbibliotek, emoji-/kombinasjonstegn, demogren og HTTP-bytebudsjett.
- `pnpm typecheck`, `pnpm build`, `pnpm build:pages`, `pnpm format:check` og `git diff --check`: bestått.
- Byggutskrifter, testutskrift og metadata er bevart i samme mappe som skjermbildet. Ingen nye avhengigheter eller prisdata. Ingen Docker/Node 22-kjøring i denne oppfølgingen.

README, arkitektur, funksjonsregister, utviklingsplan og versjonslogg er oppdatert. Ingen commit eller publisering.
