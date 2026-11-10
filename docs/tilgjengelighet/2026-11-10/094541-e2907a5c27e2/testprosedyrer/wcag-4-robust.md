# Testprosedyrer – Robust

Les [felles testprotokoll](wcag-testprosedyrer.md) før bruk. Prosedyrene er egne praktiske arbeidsprosedyrer, ikke ordrette kopier av Uu-tilsynets testregler. Kilder kontrollert 9. november 2026.

## 4.1.1

**Parsing (oppdeling)**

**Utvalg:** Oppmerkingsbasert innhold i den valgte norske 48-punktsmalen.

**Verktøy:** Lokal HTML-validator, parser og DOM-inspeksjon; ikke send privat HTML til ekstern validator uten tillatelse.

**Fremgangsmåte:**

1. Valider faktisk HTML fra relevante sider og dynamiske tilstander; behold også original kilde når nettleseren har reparert feil.
2. Følg opp feil for ufullstendige tagger, ulovlig nøsting, dupliserte attributter og ID-er mot språkspesifikasjonen.
3. Skill kriterierelevante feil fra andre validatoradvarsler. En teknisk feil i testverktøyet er ikke automatisk en feil på siden.

**Forventet resultat:** Ingen relevante syntaksfeil i disse kategoriene, med spesifikasjonens tillatte tilfeller hensyntatt. Kriteriet er med i den aktuelle norske malen selv om WCAG 2.2 fjernet det; det skal ikke stilletiende utelates.

**Dokumentasjon:** Original/dynamisk HTML-utvalg, validator og versjon, rårapport, linjer/ID-er og begrunnelse for hver feils klassifisering.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/411-parsing-oppdeling-niva/120). Excel: «Liste over krav», D63.

## 4.1.2

**Navn, rolle, verdi**

**Utvalg:** Native og egendefinerte felt, knapper, menyer, dialoger og rammer i alle relevante tilstander.

**Verktøy:** Beregnet tilgjengelighetstre, DOM og faktisk skjermleser med tastatur.

**Fremgangsmåte:**

1. Kontroller beregnet navn, rolle, verdi og tilstand før bruk; undersøk også iframe-navn.
2. Endre verdi, kryss av, utvid, velg og åpne/lukk; sammenlign faktisk oppførsel med eksponerte tilstander.
3. Bruk komponentene med skjermleser og noter annonserte navn/roller/endringer. Et AX-snapshot alene dokumenterer ikke fungerende hjelpemiddelbruk.

**Forventet resultat:** Komponentens navn og rolle kan bestemmes programmatisk; brukerendrede verdier/tilstander er tilgjengelige og endringer kan formidles til brukeragenten. Native HTML er støtte, ikke automatisk full godkjenning.

**Dokumentasjon:** Komponent og tilstandssekvens, beregnede navn/roller/verdier og faktisk skjermleserresultat med OS/verktøyversjon.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/412-navn-rolle-verdi-niva/121). Excel: «Liste over krav», D64.

## 4.1.3

**Statusbeskjeder**

**Utvalg:** Status uten fokusflytting: søkeresultat, lasting, framdrift, feil og nye chatmeldinger.

**Verktøy:** Faktisk skjermleser med logg/lytting, nettleser og DOM-inspeksjon av live-region/rolle.

**Fremgangsmåte:**

1. Utløs statusendring mens fokus står i den naturlige betjeningskontrollen; prøv også null treff, venting, feil og ferdig resultat.
2. Lytt til om meldingen eller nødvendig sammenheng annonseres uten at fokus må flyttes til meldingen.
3. Kontroller riktig rolle/live-egenskap og at hurtige eller gjentatte oppdateringer ikke blir stille eller avbryter unødig. Dokumenter også når fokus faktisk endres, som en separat situasjon.

**Forventet resultat:** Relevante statusbeskjeder kan bestemmes programmatisk og presenteres av hjelpemiddelet uten å motta fokus. En tekst i DOM eller et aria-live-attributt uten faktisk funksjon er bare delbevis.

**Dokumentasjon:** Utløsende handling, fokus før/etter, beskjedens tekst, rolle/live-egenskaper, tidsrekkefølge og faktisk opplesing/logg.

[Kilde: Uu-tilsynets kravside](https://www.uutilsynet.no/wcag-standarden/413-statusbeskjeder-niva-aa/152). Excel: «Liste over krav», D65.

