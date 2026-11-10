# Testing og rettingsforslag

## Velg omfang og bevar testdata

Avklar mål-URL eller lokal eksport, versjon, sektor/løsningstype, tillatt miljø og viktige oppgaver. Ta med startside, navigasjon, innhold, skjema, søk, dialog og relevante feil-/lastetilstander; native apper trenger egnede plattformverktøy. Ikke test innlogging eller eksterne innsendingsforløp uten relevant autorisasjon. Bruk syntetiske data og unngå reelle innsendinger når tilsvarende test kan gjøres i et testmiljø.

Logg dato, nettleser/OS, viewport, verktøy/versjon, teststeg og begrensninger. Lagre råresultater og nødvendige skjermbilder lokalt, uten hemmeligheter eller unødvendige personopplysninger. En kilde- eller tekstoppdatering får sin egen dato, ikke en ny påstått testdato.

Resultater lagres etter [resultatlagring.md](resultatlagring.md). Bruk kjøringsverktøyet nedenfor som standard; de enkelte kontrollskriptene er byggeklosser og skriver ikke filer på egen hånd.

## Planlegg alle krav

Bruk [48-kravsprosedyrene](wcag-testprosedyrer.md) og de fire prinsippfilene som detaljert testgrunnlag. Før hvert relevant krav med verktøy, handling, forventet/faktisk resultat og evidens. Nye kjøringer får en separat testplan og alle krav som uavklart; dette er planlegging, ikke utførte tester.

## Automatiske delkontroller

Følg [automatisering.md](automatisering.md): kjør nettlesermodulen og `run_checks.py --auto` som standard. Restlisten skal omfatte alle 48 krav, også de som ikke har maskinelle resultater. Kommandoene under uten `--auto` er fortsatt tilgjengelige som avgrensede byggeklosser.

Bruk eksisterende axe, Lighthouse eller tilsvarende hvis de er tilgjengelige og passende. Oppgi verktøy, innstillinger og skannet sidetilstand. Manglende verktøy gir uavklart dekning, ikke en tom rapport med «ingen brudd». Følg miljøets nettleser-API-er og sikkerhetsgrenser; ikke bruk andre nettverksveier for å omgå en avvist nettleserhandling. Ikke send private sider til en ekstern skanntjeneste uten autorisasjon.

Medfølgende skript krever Python 3.9 eller nyere og kan brukes uten installasjon av pakker. Kjør dem fra skill-mappen, eller bruk absolutt sti til skriptene:

```sh
python3 scripts/run_checks.py --project-root /sti/til/prosjekt --html-export out --base-path /prosjektsti --agent 'Codex (OpenAI)'
python3 scripts/run_checks.py --project-root /sti/til/prosjekt --contrast '#ffffff' '#09151b' 1 4.5 --contrast '#9df1ad' '#09151b' 0.6 3 --agent 'Codex (OpenAI)'
```

`audit_export.py` leser lokale HTML-filer og gir JSON med grunnkontroll av språk, h1/main, ID-er, etikett-/ARIA-referanser, bildeattributter og lokale lenkemål. Funn er kandidater til vurdering; for eksempel er én h1 en kontrollkonvensjon, ikke et selvstendig WCAG-krav. Skriptet kjører ikke JavaScript, beregner ikke komplette kontrollnavn og kan ikke bevise faktisk brukbarhet. Exit 0 betyr ingen kandidater i disse delkontrollene, 1 betyr funn til vurdering, 2 betyr at testen ikke kunne kjøres.

`contrast.py` beregner WCAG-kontrast for to solide sRGB-hex-farger, eventuelt med gjennomsiktig forgrunn. Velg terskel ut fra krav og kontekst; 4,5 er standard for vanlig tekst, 3 kan være relevant for stor tekst eller ikke-tekstlig innhold. Exit 0/1 gjelder bare den valgte kontrasttesten, ikke hele kriteriet eller nettstedet. Exit 2 er ugyldig input. Gradienter, bilder, CSS-opacity og feiltilstander må undersøkes separat.

## Praktisk nettleser- og hjelpemiddeltest

| Område                   | Handling og observasjon                                                                                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tastatur og fokus        | Bruk Tab/Shift+Tab gjennom forløpet, Enter/Space på handlinger og Escape på dialog. Kontroller rekkefølge, synlig fokus, retur etter lukking og at ingen nødvendige handlinger krever peker.                         |
| Skjema og status         | Test tomt/ugyldig innhold, feilmelding, retting, lasting, resultat og tømming. Kontroller etikett, sammenheng mellom feil og felt, og varsling av dynamiske endringer.                                               |
| Forstørring og omflyting | Prøv faktisk 200 % tekstforstørring og 400 % nettleserzoom. Kontroller innhold og funksjoner ved 320 CSS-piksler og begge orienteringer. Smal viewport alene bekrefter ikke nettleserzoom.                           |
| Tekstavstand             | Overstyr linjehøyde 1,5, avsnitt 2 em, bokstavavstand 0,12 em og ordavstand 0,16 em med tillatte testverktøy. Se etter klipping, overlapping og utilgjengelige kontroller. Fjern midlertidige overstyringer etterpå. |
| Kontrast og alternativer | Mål faktisk forgrunn/bakgrunn også i fokus, feil og valgte tilstander. Vurder bilder, symboler, medier og deres alternativer der de finnes.                                                                          |
| Skjermleser              | Gjennomfør faktiske handlinger med tilgjengelig skjermleser og oppgi verktøy/OS. Kontroller navn/roller, overskrifter, leserekkefølge, feil, status og logg. Et DOM-snapshot er bare støttebevis.                    |
| Native app               | Bruk egnede OS-verktøy og aktuell appmal. Web-HTML-skriptet gir ingen dekning for native kontroller.                                                                                                                 |

Hvis en handling ikke kan verifiseres, dokumenter hindringen og hva en tester må gjøre videre. Ikke finn på opplesing, zoomnivå, skjermbilder eller retester.

## Prioriter rettingsforslag

Prioriter etter konsekvens og omfang, ikke bare antall skannfunn. En blokkert hovedoppgave uten alternativ har høy prioritet. Beskriv alvorlighet med konkret brukergruppe/oppgave, relevant kriterium og evidens. Estimater, eiere og tidsfrister skal være bekreftet eller tydelig merket som forslag.

Et forslag skal angi element/side eller kildefil når kjent, konkret teknisk eller redaksjonell endring, forventet virkning og hvordan den testes. Unngå generelle «forbedre tilgjengelighet»-oppgaver. Mistenkte brudd må merkes som kandidater. Mål utover gjeldende lovkrav merkes som forbedringsforslag.

## Retest og erklæring

Hvis brukeren har bedt om retting, test samme handling og relevante naboer etter endringen, i det aktuelle miljøet. Bevar opprinnelig funn, dokumenter retestdato/resultat, og merk det som rettet bare når effekten er verifisert. Også et mislykket testkall skal bli stående som uavklart, ikke bestått.

Bruk siste verifiserte status som grunnlag for erklæringen. Åpne brudd beholdes; utestet innhold beholdes som uavklart. Knyt hvert avvik i erklæringen til rapporten, konsekvens, årsak og alternativ der det finnes. Samlet status krever dekkende vurdering; ingen delkontroll gir en automatisk godkjenningsprosent.

Etter vurdering og eventuell retest: oppdater kjøringsrapporten, prosjektets vedvarende kravmatrise og lokale erklæring etter lagringsveiledningen. Oppgi hvilke resultater som er nye, hvilke som er gjenbrukt og hvorfor de fortsatt gjelder. Skillen skal ikke stoppe ved terminalutskrift hvis oppdraget omfatter en testgjennomgang med dokumentasjon.

## Tilstander, overganger og nødvendig grafikk

Ved relevante farge-/animasjonsoverganger: prøv også tidsrommet mellom de stabile tilstandene. Registrer faktisk brukerhandling, tidspunkt/varighet, valgt/fokusert tilstand og samtidige tekst-/bakgrunnsfarger. En separat fokusramme erstatter ikke nødvendigvis valgt-markeringen. Fang før- og etterbevis i atskilte filer og retest handlingene som utløste problemet. Tilfeldige snapshots alene beviser ikke at en hel overgang er fri for feil.

For 1.4.11: kartlegg grafikk og kontrollmarkeringer etter hvilken informasjon/funksjon de bærer. Registrer nødvendig del, faktisk tilstøtende farge/bakgrunn, tilstand, beregningsmetode og måleusikkerhet. For PDF: bruk både render og dokumentets farger/geometri. En strukturrolle, `aria-hidden`, tom Alt eller lav kontrast avgjør ikke alene om en synlig del er nødvendig. Begrunn eventuelle dekorative/supplerende deler med hva som fortsatt formidler informasjonen uten dem; skill en faglig vurdering fra en faktisk utført borttaksprøve. Kontrastvurderingen avgjør ikke tekstalternativ, struktur eller leserekkefølge.
