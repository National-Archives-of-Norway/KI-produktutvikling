# Fra testresultat til erklæringsgrunnlag

## Arbeidsstatus

Bruk disse betydningene når du tolker egen matrise eller Uu-tilsynets sjekkliste:

| Arbeidsstatus | Nødvendig grunnlag | Bruk i erklæringen |
| --- | --- | --- |
| Oppfylt / Ja | Relevant innhold og prosess er vurdert med egnede metoder i oppgitt omfang | Kan foreslås som Ja når virksomheten har dekkende grunnlag. Avgrenset kodekontroll alene er ikke nok. |
| Brudd / Nei | Etterprøvbart funn på en side eller prosess | Registrer bruddet med konsekvens og årsak, selv om andre punkter er uavklart. |
| Ingen slik innholdstype | Det er faktisk kontrollert at det utløsende innholdet ikke finnes innenfor hele erklæringens omfang | Ikke bruk fordi funksjonen ikke kunne åpnes, ikke er testet eller ligger bak innlogging. |
| Ikke sjekket / Uavklart | Test mangler, er foreldet eller dekker bare deler av vurderingen | Behold i arbeidslisten. Ikke erstatt med et formelt Ja, Nei eller et unntak for å fylle skjemaet. |

Koder som K, I og U i en leverandørrapport har ikke universell betydning. Les definisjonene før de oversettes. Skil også mellom «kravet gjelder ikke for denne løsningstypen» og «vi har ikke denne typen innhold»: riktig appmal kan utelate kriterier som fortsatt står i nettstedsmalen.

## Bevar sporbarhet

For hvert kriterium: ID/navn, gjeldende kravkilde, status, testdato, miljø/versjon, utvalg, metode, evidens og vurdering. Et funn bør i tillegg ha konkret lokasjon, konsekvens, årsak, tilgjengelig alternativ, tiltak og ansvarlig. Be om frist dersom den er viktig, men sett den ikke selv.

Tredjepartsinnhold er ikke automatisk utenfor regelverket. Uforholdsmessig byrde krever en konkret dokumentert virksomhetsvurdering; tidspress, ukjent status og en feil i et innkjøpt bibliotek er ikke selvstendige unntak. Knytt alle foreslåtte unntak til aktuelt innhold og gjeldende rettslig grunnlag. Legg virksomhetens begrunnelse til grunn, ikke agentens antakelser.

## Samlet vurdering

Kontroller fullstendigheten mot gjeldende kriterieliste og faktisk løsningsomfang før en samlet status foreslås. Tell ikke bare krav uten registrerte feil: utestede krav er uavklarte. Ikke regn en prosentandel «tilgjengelig» fra antall beståtte skannregler.

Når datagrunnlaget er ufullstendig, kan du fortsatt lage nyttig tekst om verifiserte avvik, kontakt og klage. Bruk utkaststatus og si at samlet samsvar ikke er ferdig vurdert. Når grunnlaget er dekkende, foreslå den samsvarskategorien som faktisk følger av gjeldende skjema og resultatene; ikke lag egne terskler for «delvis» eller «ikke i samsvar».

## Oppdatering

Sammenlign nytt testgrunnlag med tidligere erklæring. Fjern et kjent brudd først når rettingen er verifisert; dokumenter endringen. Eldre testresultater kan gjenbrukes bare når de fortsatt beskriver aktuell løsning. Registrer reell vurderingsdato, kildekontrolldato og eventuell publiseringsdato hver for seg. Foreslå årlig oppfølging og ny gjennomgang ved relevante endringer uten å opprette automatiske påminnelser på eget initiativ.

## Eksempler på avgjørelser

- Ingen funn i en automatisk test, men skjermleser/kontrast utestet: skriv avgrenset resultat og uavklart samlet samsvar.
- Video finnes, men er ikke åpnet: status ukjent; ikke fravær av videoinnhold.
- Bekreftet tastaturfeil og øvrige tester mangler: beskriv bruddet og hold samlet status åpen.
- Siden krever GitHub-innlogging: avklar intra-/ekstranett og gjeldende omfang; ikke anta fritak.

## To deler i den brukerrettede erklæringen

«Kjente brudd» bygger på bekreftede åpne funn. «Forhold som ikke er ferdig vurdert» bygger på uavklart/delvis samlet kriterievurdering og lister alle disse kravene med WCAG-ID, tittel og kort brukerforklaring, gruppert etter prinsipp. Avstem begge listene mot samme vurderte grunnlag. En automatisk kandidat er ikke et bekreftet brudd, og et bestått automatisk delskann avslutter ikke nødvendigvis kriterievurderingen. Et krav kan ha både et bekreftet avvik og uavklart øvrig omfang; beskriv da omfangene uten å skjule noen av dem. Detaljerte testoppgaver beholdes i rapporten. Ved ren strukturendring bevares faktisk testdato og samsvarsstatus.

## Avslutningsvilkår og avstemming

Vurder hvilke bevis som er nødvendige for **det konkrete kravet og innholdet**. Faktisk opplesing er vesentlig når man vurderer annonsering og hjelpemiddelbetjening; språkmerking kan ofte avklares fra effektiv språkarving og innhold, med opplesing som støtte. Ikke krev et bestemt antall nettlesere eller en produksjonssetting uten begrunnet betydning for omfanget. Avtal støttede kombinasjoner og dokumenter begrensninger.

Bruk [testmuligheter og avslutning](testmuligheter-og-avslutning.md) til å gjøre U-status handlingsrettet, og [avstemming](avstemming.md) til å kontrollere at sluttvurderingen gjengis likt. En konsistent rapport kan fortsatt ha feil faglige avgjørelser eller uavklart samlet samsvar.
