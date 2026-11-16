# Tilgjengelighetserklæring for KI-Produktutvikling

**Utkast – samlet samsvar er ikke ferdig vurdert. Ett bekreftet brudd er dokumentert. Ikke klart til registrering i uustatus.no.** Lokal informasjon på `/tilgjengelighet/` erstatter ikke virksomhetens formelle erklæring.

Siste test, kildegjennomgang og tekstoppdatering: **9. november 2026**. Grunnlag: commit `c622090`, med etterfølgende dokumentasjonsoppdatering. Utført av Codex (OpenAI), med tilgjengelighetserklaering 0.3.0. Første utkast/test: 6. november 2026; tekstlig oppdatering 7. november bevares som historikk.

## Nettsted og ansvar

| Felt                         | Opplysning                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| Nettsted                     | KI-Produktutvikling                                                                   |
| Virksomhet                   | Nasjonalarkivet; juridisk navn og organisasjonsnummer må bekreftes ved registrering   |
| Nettadresse                  | Endelig adresse ikke valgt; testet lokalt på http://127.0.0.1:3000/                   |
| Kontakt                      | khadah@nasjonalarkivet.no, tidligere bekreftet for tilgjengelighet i dette prosjektet |
| Godkjenner/oppfølgingsansvar | Ikke avklart; e-postbekreftelsen er ikke godkjenning eller fullmakt                   |
| Formell erklæring            | Ikke opprettet/publisert; ingen registrering utført av agenten                        |

## Omfang og undersøkelse

20 nåværende HTML-sider er undersøkt, inkludert Oversikt, Godkjente KI-assistenter, Godkjente MCP-er, priser, personvern, funksjonalitetsoversikt, utviklingsplan, versjonslogg, de fem ressursdetaljene og eksisterende sider/chat. PDF-vedlegget er lenket fra portalen, men dets tagging, alternativer og leserekkefølge er ikke ferdig undersøkt. Innlogging, privat innhold og svar fra en faktisk modellleverandør er ikke testet.

Ny kjøring: [testrapport](2026-11-09/201443-73cb0a3e52e0/testrapport.md), [manifest](2026-11-09/201443-73cb0a3e52e0/manifest.json), [arbeidsmatrise](2026-11-09/201443-73cb0a3e52e0/wcag-grunnlag.json), [manuelle resultater](2026-11-09/201443-73cb0a3e52e0/manual-tests.json). Referanse: **201443-73cb0a3e52e0**. Skillens HTML-delkontroll omfattet 23 eksportfiler. Nettleser: 60 DOM-kontroller ved tre størrelser og 40 tekstavstandskontroller ved to bredder. Utvalgte tastaturhandlinger, kontrollnavn, rullbare tabeller, dialog, feil og kontrastpar er undersøkt. Midlertidig test-CSS er fjernet.

## Kravgrunnlag og samsvar

Arbeidslisten tar utgangspunkt i [Uu-tilsynets 48 krav for offentlig sektor](https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86), kontrollert 9. november 2026. Virksomheten må bekrefte virkeområde og formell erklæring etter [veiledningen](https://www.uutilsynet.no/tilgjengelighetserklaering/korleis-lage-og-oppdatere-tilgjengelegheitserklaering/1131). Ingen ny selvstendig lovtolkning eller myndighetsgodkjenning er gjort.

Samlet samsvar er ikke ferdig vurdert. [WCAG-kontrollen](WCAG-KONTROLL.md) har 24 K, 10 I, 13 U og 1 B. K er undersøkt uten funn i oppgitt delomfang, I er historisk fravær av utløsende HTML-innhold, U er uavklart/delvis, B er bekreftet brudd. Tallene er ikke en samsvarsprosent eller automatisk Ja/Nei-grunnlag for registrering. Noen historiske vurderinger beholdes med dato 6. november, ikke ny testdato.

## Utilgjengelig innhold: A11Y-01, språk i prisvilkår

- **Krav:** [3.1.2 Språk på deler av innhold](https://www.uutilsynet.no/wcag-standarden/312-sprak-pa-deler-av-innhold-niva-aa/111).
- **Sted:** `/priser/#codex-subscription`, åpne «Vilkår og avgrensninger». Engelske Pro-/Business-vilkårssetninger arver norsk `lang=nb` uten språkspenn.
- **Konsekvens:** Skjermlesere kan bruke feil uttale og gjøre vilkårene vanskeligere å forstå.
- **Årsak:** Automatisk hentet engelsk tekst og norsk forklaring lagres i én note uten språkdata.
- **Tiltak foreslått:** Skill kildeutdrag og forklaring, merk engelsk med `lang=en`, eller gi kvalitetssikret norsk oversettelse. Retest alle vilkårsseksjoner etter ny synkronisering og med skjermleser.
- **Tilgjengelig alternativ:** Pristabell og norske forklaringer finnes fortsatt; kontakt khadah@nasjonalarkivet.no for hjelp til vilkårene.
- **Status/eier/frist:** Bruddet er ikke rettet. Ansvar og frist er ikke bekreftet. Foreslått rolle er innholds-/utviklingsansvarlig; ingen person er utpekt.
- **Evidens:** [språkdata](2026-11-09/201443-73cb0a3e52e0/raw/pricing-language.json), [skjermbilde](../../201443-73cb0a3e52e0/screenshots/pricing-language.png).

## Animasjon og andre testresultater

Forsideillustrasjonen starter automatisk. Klikk eller Tab til illustrasjonen og bruk mellomrom/Enter for pause/start. Tastaturtesten dokumenterte paused/running på begge punkter og halo, synlig fokus og Tab videre til søkefeltet. Dette erstatter den gamle vurderingen av statisk illustrasjon under 2.2.2. Redusert-bevegelse-regelen er kodekontrollert, men ikke testet med faktisk system-/nettleserinnstilling.

60 normalvisningskontroller og 40 økte tekstavstandskontroller viste ingen sidebredde-overflyt. Pristabellen kunne rulles med høyrepil ved 320 px. Tom chat viste norsk alert/aria-invalid, og Escape returnerte fokus til chatåpneren. Grunnfargenes kontrast ble beregnet til 18,51:1, 12,86:1 og 13,76:1. Dette gjelder ikke alle flater, tilstander eller gradienter. Tidligere dokumentasjon av rettet chatfeltkant beholdes; den er ikke fremstilt som en full ny kontrastretest.

## Hva må avklares og testes videre?

Faktisk skjermleserbruk av navigasjon, tabeller, feil, søkeresultater og chat; faktisk 200 % tekstforstørring og 400 % nettleserzoom; mobil med skjermtastatur; PDF-vedlegg; alle relevante fokus-/kontrasttilstander; redusert bevegelse i faktisk innstilling; flere nettlesere og utestede dynamiske tilstander. axe/Lighthouse er ikke kjørt. DOM/AX, smal viewport og byggetester erstatter ikke disse kontrollene. Uavklart testing er ikke i seg selv et dokumentert brudd eller rettslig unntak.

## Hjelp, tilbakemelding og klage

Ressursene kan leses fra katalog og nettstedskart uten chatten. Brukeren kan be om hjelp eller alternativt format på **khadah@nasjonalarkivet.no**. Virksomheten må avklare ansvar for oppfølging, fravær og levering før lansering. Ikke lov ubekreftede rettingsfrister. [Uu-tilsynets brukerveiledning](https://www.uutilsynet.no/tilgjengelighetserklaering/hva-betyr-det-brukeren/1129) omtaler tilbakemelding og vanlig svar innen tre uker. Klageinformasjon: [Diskrimineringsnemnda](https://www.diskrimineringsnemnda.no/klage). Sistnevnte URL svarte med JavaScript-applikasjon ved kildekontrollen; innholdet ble ikke fullstendig lest i web-verktøyet.

## Ferdigstilling og vedlikehold

Rett og retest bekreftet avvik, fullfør uavklarte kontroller, og bekreft juridiske virksomhetsopplysninger, endelig URL og godkjenner. En autorisert representant må håndtere den formelle erklæringen i uustatus.no. Ingen innlogging, innsending eller publisering er utført. Oppdater ved relevante endringer og følg myndighetens vedlikeholdsveiledning; ingen påminnelse er opprettet. Ingen unntak basert på uforholdsmessig byrde er vurdert.

## Historikk

Tidligere grunnlag er bevart i [historisk erklæringsutkast](2026-11-09/201443-73cb0a3e52e0/raw/previous-TILGJENGELIGHETSERKLAERING.md) og eldre kjøringer. De gamle tallene 29 K / 11 I / 8 U gjelder ikke dagens utvidede kontroll. Ingen tidligere bekreftet feil er fjernet uten evidens; nye mangler og større usikkerhet er synliggjort.
