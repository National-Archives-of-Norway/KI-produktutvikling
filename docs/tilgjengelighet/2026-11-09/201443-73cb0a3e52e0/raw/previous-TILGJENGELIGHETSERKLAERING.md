# Tilgjengelighetserklæring for KI Produktutvikling

**Status: Utkast med uavklarte vurderinger; ikke klart til registrering i uustatus.no.** Dette er ikke en publisert, formell erklæring. Den lokale informasjonssiden finnes på `/tilgjengelighet/` og er lenket fra alle siders bunntekst.

Sist tekstlig oppdatert og kildekontrollert: 7. november 2026. Tilgjengelighetstestene er fra 6. november 2026. Oppdateringen bruker skillen `tilgjengelighetserklaering` og dens arbeidsmal; den er ikke en ny tilgjengelighetsrevisjon.

## Opplysninger om nettstedet

| Felt                               | Opplysning                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Nettsted                           | KI-Produktutvikling                                                                                            |
| Virksomhet                         | Nasjonalarkivet; juridisk navn og organisasjonsnummer bekreftes av virksomheten ved registrering               |
| Nettadresse                        | Ikke valgt; lokal testing på `http://127.0.0.1:3000/`                                                          |
| Kontakt for tilgjengelighet        | khadah@nasjonalarkivet.no, oppgitt av prosjekteier i chatten                                                   |
| Godkjenner                         | Ikke avklart; kontaktadressen er ikke en dokumentert godkjenning eller fullmakt                                |
| Undersøkelsesdato og første utkast | 6. november 2026                                                                                               |
| Testgrunnlag                       | Lokal kodegjennomgang, tastatur, DOM og tilgjengelighetstre, responsive visninger og avgrensede kontrasttester |
| Utførende agent                    | Codex (OpenAI); ingen ekstern sertifisering                                                                    |
| Publisert formell erklæring        | Ikke opprettet; URL legges til etter registrering                                                              |

## Omfang

Grunnlaget gjelder den lokale nettstedsprototypens ni sider: forside, Kom i gang, Om, Spør kunnskapsbasen, tre eksempelressurser, nettstedskart og tilgjengelighetssiden. Den er en nettløsning, ikke en native app. Det er ikke grunnlag for å inkludere fremtidig innlogging, privat innhold eller generering med faktisk modell i testresultatene. Utvid omfanget og test ved innføring av disse funksjonene.

## Regelgrunnlag

Forskriftens §§ 4b og 4e beskriver kravene for offentlige nettløsninger, erklæring og tilbakemeldingsfunksjon. Erklæringen skal bruke Digdirs sentrale løsning. Den må blant annet redegjøre for utilgjengelig innhold og alternativer, kontaktfunksjon og klageadgang, og oppdateres minst årlig. [Forskriften § 4e](https://lovdata.no/forskrift/2013-06-21-732/§4e)

Dette arbeidet tar utgangspunkt i de 48 WCAG-kravene Uu-tilsynet oppgir for offentlig sektor. At en portal først er lukket, er ikke alene grunn til å unnlate vurdering: reglene omfatter også nye intranett og ekstranett innenfor forskriftens virkeområde. Nasjonalarkivet må bekrefte avgrensningen for sin løsning. [Uu-tilsynets kravoversikt](https://www.uutilsynet.no/wcag-standarden/wcag-standarden/86), [veiledning om erklæringen](https://www.uutilsynet.no/tilgjengelighetserklaering/om-tilgjengelegheitserklaering/1128)

## Samsvar og utilgjengelig innhold

Samlet samsvarsstatus er ikke ferdig vurdert. Ikke velg «i samsvar» eller «delvis i samsvar» i den formelle erklæringen før virksomheten har grunnlag for det. [WCAG-KONTROLL.md](WCAG-KONTROLL.md) angir vurdering og testbegrensninger for alle 48 punkter.

Den påviste svake kanten rundt chatfeltet er rettet: beregnet kontrast på hovedbakgrunnen økte fra ca. 1,96:1 til 5,57:1. Fokus og feilkommunikasjon er også forbedret. Andre manuelle kontroller gjenstår, særlig skjermleser, faktisk zoom og full vurdering av kontraster og fokus. Manglende testing er ikke et dokumentert brudd eller et rettslig unntak.

### Uavklarte vurderinger og utfyllingsgrunnlag

Arbeidsmatrisen har 29 K, 11 I og 8 U. Dette er interne arbeidskoder, ikke 29 bekreftet oppfylte krav eller en samsvarsprosent. K betyr bare undersøkt uten funn i det beskrevne omfanget; I må bekreftes som faktisk fravær av utløsende innhold. Ingen av kodene oversettes automatisk til formelle svar. [Uu-tilsynets spørsmål per kriterium](https://www.uutilsynet.no/tilgjengelighetserklaering/sporsmal-i-tilgjengelegheitserklaeringa/1005)

| Uavklart krav | Hva må dokumenteres før konklusjon?                                       |
| ------------- | ------------------------------------------------------------------------- |
| 1.3.1         | At semantikk og relasjoner også fungerer med skjermleser.                 |
| 1.4.3         | Resterende tekstkontraster og relevante tilstander, inkludert gradienter. |
| 1.4.4         | Faktisk 200 % tekstforstørring uten funksjons- eller innholdstap.         |
| 1.4.11        | Ikke-tekstlig kontrast for alle relevante kontrolltilstander.             |
| 2.4.3         | Full fokusrekkefølge ved zoom og bruk av hjelpemidler.                    |
| 2.4.7         | Synlig fokus i alle relevante kombinasjoner og tilstander.                |
| 4.1.2         | Navn, rolle og verdi ved faktisk hjelpemiddelbruk.                        |
| 4.1.3         | At skjermleser formidler søkeresultater, feil og chatstatus riktig.       |

Ingen av disse åtte punktene får et oppdiktet Ja/Nei-svar i utfyllingsgrunnlaget. Et påvist brudd skal likevel registreres som brudd selv om andre kriterier er uavklart.

### Dokumentasjon av bekreftede brudd

For hvert faktisk brudd som bekreftes før registrering, fylles følgende ut:

- Berørt krav og nøyaktig side/funksjon.
- Hva som ikke fungerer, og hva det betyr for brukeren.
- Årsak, tiltak, ansvarlig og realistisk frist for retting.
- Tilgjengelig alternativ, dersom det finnes, eller hvordan brukeren kan be om hjelp.
- Eventuelt særskilt unntaksgrunnlag, bare dersom virksomheten har vurdert og dokumentert det. Ingen slike unntak er gjort i denne kontrollen.

## Tilgjengelige veier til innhold og hjelp

Ressursenes detaljsider kan nås fra nettstedskartet og katalogen uten chat. Disse er alternative veier til innholdet, ikke dokumenterte erstatninger for ethvert mulig tilgjengelighetsproblem. Ved problemer kan brukeren be om et annet format via kontaktkanalen. Det finnes ikke en bekreftet tjeneste eller en avtalt leveringsfrist for alternative formater ennå.

## Tilbakemelding og alternativt format

Brukerne kan melde feil, be om tilgjengelig innhold og foreslå forbedringer via [khadah@nasjonalarkivet.no](mailto:khadah@nasjonalarkivet.no). Den lokale siden ber om lenke til siden, hva brukeren forsøkte og hva som feilet, uten sensitive opplysninger.

Før lansering må virksomheten avklare hvem som følger opp e-postene, fraværsdekning og hvordan alternative formater leveres. Uu-tilsynets veiledning sier at brukeren skal få svar så snart som mulig, vanligvis innen tre uker. [Veiledning om tilbakemeldinger](https://www.uutilsynet.no/tilgjengelighetserklaering/hva-betyr-det-brukeren/1129)

## Klage

Den lokale siden lenker til [Diskrimineringsnemndas klageinformasjon](https://www.diskrimineringsnemnda.no/klage). Brukeren får informasjon om klage ved utilgjengelig innhold, manglende svar eller et utilfredsstillende svar.

## Ferdigstilling og vedlikehold

1. Fullfør U-punktene i kontrollrapporten, og dokumenter eventuelle faktiske brudd og alternativer.
2. Bekreft navn, organisasjonsnummer, endelig adresse, kontaktansvar og godkjenner.
3. En autorisert representant registrerer vurderingen i uustatus.no og publiserer erklæringen. Kodeassistenten har ikke logget inn eller sendt inn noe.
4. Lenke til den faktiske erklæringen legges på `/tilgjengelighet/`; utkaststatus fjernes først når opplysningene er bekreftet.
5. Kontroller lenke og kontaktfunksjon på den utrullede løsningen, også i lukket testmiljø.
6. Legg inn ansvar for årlig gjennomgang, senest 12 måneder etter faktisk publisering/oppdatering, og ved større endringer. Dette dokumentet oppretter ingen automatisk påminnelse.

Registreringsprosessen og krav til testing er beskrevet i [Uu-tilsynets veiledning](https://www.uutilsynet.no/tilgjengelighetserklaering/korleis-lage-og-oppdatere-tilgjengelegheitserklaering/1131).

## Endring 7. november 2026

Codex (OpenAI) brukte skillen `tilgjengelighetserklaering` til å avstemme nettstedsteksten og dette grunnlaget med arbeidsmalen og Uu-tilsynets veiledning. Omfang, testdato, kildekontrolldato og utkastdato er skilt. Ingen nye testresultater eller unntak er lagt til. Ingen innlogging, registrering eller offentlig publisering er utført.
