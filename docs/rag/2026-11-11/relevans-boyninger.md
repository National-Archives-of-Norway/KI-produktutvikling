# Bøyninger og orddekning i kildesøket

Dato: 11. november 2026. Utførende: Codex (OpenAI), uten underagenter. Lokal arbeidskopi; tidligere CI-/dokumentasjonsendringer er bevart. Ingen nye avhengigheter, embeddings eller endret API-kontrakt.

## Resultater

Treffsikkerhet betyr her andel spørsmål med forventet kilde på førsteplass (eller eksplisitt maxRank), og tom liste for negative spørsmål. Det er ikke generell søkepresisjon eller modellkvalitet.

| Sett                                   |            Før | Første nye regelsett | Sluttresultat |
| -------------------------------------- | -------------: | -------------------: | ------------: |
| Utvikling, opprinnelige grenser (26)   |  26/26 (100 %) |        26/26 (100 %) | 26/26 (100 %) |
| Utvikling, med Oversikt på førsteplass | 25/26 (96,2 %) |        26/26 (100 %) | 26/26 (100 %) |
| Nytt sett (20)                         |    3/20 (15 %) |         13/20 (65 %) | 20/20 (100 %) |
| Nye negative spørsmål                  |   3/8 (37,5 %) |         7/8 (87,5 %) |   8/8 (100 %) |
| Nye positive spørsmål                  |     0/12 (0 %) |          6/12 (50 %) | 12/12 (100 %) |

**Metodebegrensning:** De 20 forventningene ble skrevet og låst før algoritmeendring, og er ikke endret. Første etterprøving ga 13/20. Generelle token-/sorteringsregler ble deretter rettet: stamming og sammensetninger må bruke råord og stamme, handlinger skal ikke telle som emneord, og eksakt tittel/hovedemne må skilles fra senere omtale. Neste måling ga 19/20, og generell tittelprioritering ved lik score ga 20/20. Sluttmålingen er derfor **ikke en uavhengig holdout-test**. Ingen spørsmålsstrenger eller bestemte kilde-ID-er er unntak i rangeringen. Et nytt uavhengig sett trengs for å vurdere generalisering.

Alle sju oppgitte førresultater er reprodusert og har ønsket sluttresultat. [Maskinlesbar evaluering](retrieval-evaluation.json) inneholder alle 46 spørsmål, forventninger, førresultater, første etterresultat og sluttresultater.

## Regler og terskelvalg

- Samme aksentnormalisering på spørsmål og kilder: NFD, fjerning av kombinasjonsmerker og norsk småskrift. Æ/ø translittereres ikke.
- Enkel stamming fjerner genitiv-s etter -en/-et/-ene, deretter én av -ene/-en/-et/-er/-te og eventuell avsluttende -e. Minst tre tegn beholdes; -te krever fire for å unngå teste → tes. Ubøyde -het/-itet beskyttes. Dette er en heuristikk, ikke en norsk ordbok; homonymer og uregelmessige bøyninger kan ikke løses sikkert.
- Generell prefiksmatching i brødtekst er fjernet. Brødtekst krever samme stamme. I tittel og stabilt ressursnavn tillates sammensetninger når begge råord har minst fire tegn og det ekstra leddet minst fire stammetegn. Råord hindrer at kode → kod faller under lengdegrensen, mens kom → kommentar avvises.
- «kommer» er fjernet fra stoppordene. Vanlige pronomen/kvantorer er lagt til. Generelle handlingsverb (blant annet test, dele, skrive, installere, lagre) tas ut av spørsmålets emneord.
- Minst **50 %** av ulike emnestammer må treffe. Ved bare ett treff i et flerordsspørsmål kreves tittel-/ressursnavntreff med dokumentfrekvens høyst 50 %, eller et langt emneord (minst åtte stammetegn) i høyst en tredjedel av kildene. Ettordsøk kan også bruke et brødtekstord med minst fire stammetegn i høyst en tredjedel av kildene. Et generelt virksomhetsnavn uten egen emneside gir derfor ingen kilde.
- Dekningsgrensene 50 %, 2/3 og 100 % ga **26/26, 24/26 og 24/26** på utviklingssettet. 50 % beholdes med tilleggskravet til enkeltstående treff. Ingen terskel er valgt for ett konkret holdout-spørsmål.
- Score: eksakt tittel/ressursnavn (5), tittelsammensetning eller innledning (3), ellers brødtekst (2), multiplisert med `1 + log((kildeantall + 1)/(dokumentfrekvens + 1))`. Ved lik score: titteltreff, hovedemne først i faktisk tittel, orddekning, linjestart, kortere kilde og til slutt corpusrekkefølge. Dette prioriterer fokuserte fagkilder foran brede oppramsinger.

## Eksisterende forventninger

Utviklingssettets 26 forventninger er bevart, med ett strengere krav: modelloversikten skal være først (maxRank 1, tidligere 3). En syntetisk poenglikhets-fixture ga flere reelle treff etter stamming og var ikke lenger poenglik. Samme forventning om tittelprioritet testes derfor direkte med den rene compareSources-funksjonen. Den er ikke endret til å godta dårligere rangering. Nye enhetstester dekker stammer, kortord, dekning, linjestart og deterministisk sortering.

## Kontroller

`pnpm test` bestod: **157/157 Node-tester**, **3/3 Python-tester**, faktisk innholdsomlasting og Markdown-lenker. `pnpm typecheck`, `pnpm format:check` og `git diff --check` bestod. Sluttkontrollen av Markdown fant 123 gyldige filmål. Ingen ny Docker/Node 22-, bygg-, tilgjengelighets-, GitHub- eller virkelig modellverifisering. Søket er fortsatt leksikalsk og Beta. Ingen commit eller publisering.
