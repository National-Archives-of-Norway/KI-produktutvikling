<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Oppdater versjonsloggen

- Les `VERSJONSLOGG.md` før vesentlige endringer. Oppdater loggen i samme arbeidsøkt og før oppgaven meldes ferdig eller committes.
- Vesentlige endringer omfatter funksjonalitet, feilrettinger, brukerrettet innhold, tilgjengelighet, sikkerhet, bygg/drift, avhengigheter og arbeidsinstruksjoner. Rene skrivefeil og formatering trenger normalt ingen egen oppføring.
- Før opp endringen under «Ikke utgitt», med dato, hva som er endret og hvorfor, utførende agent/person, relevante kontroller og eventuelle begrensninger. Ikke påstå at en kontroll er kjørt eller bestått uten grunnlag.
- Bevar eksisterende historikk. Oppgi versjon, commit, tag og publiseringsstatus bare når de er kjent. Ikke oppfinn en referanse til commiten som ennå ikke er laget.
- Hvis oppgaven også endrer filer i `Skills`-repoet, oppdater versjonsloggen der i tillegg. Portalens logg erstatter ikke Skills-loggen.
- Før levering: kontroller at loggen dekker de vesentlige endringene i diffen. Dette er en arbeidsinstruksjon, ikke en automatisk Git-kontroll, og gir ikke i seg selv tillatelse til commit eller publisering.

## Hold funksjonalitetsoversikten oppdatert

- Ved nye, endrede eller fjernede funksjoner: oppdater definisjon og modenhetsstatus i `src/content/features.ts` i samme arbeidsøkt. Ikke vedlikehold kopier av oversikten i nettsidetekst eller RAG-kilder.
- Nye sider må registreres med riktig rutemønster. Next.js-konfigurasjonen kontrollerer ved oppstart/bygg at sider og register samsvarer. Kontrollen kan finne manglende sider og brutte rutereferanser, men kan ikke avgjøre hva en kodeendring betyr for beskrivelse, godkjenning eller modenhet.
- Funksjonalitetsoversikten, nettstedskartet og Spør KI avledes av registeret. Ressursantall og sidebeskrivelser kommer fra innholdsfilene. Ikke les servernøkler eller bruk faktisk hemmelig konfigurasjon i den offentlige oversikten.

## Hold utviklingsplanen oppdatert

- Les relevante deler av `UTVIKLINGSPLAN.md` før vesentlig arbeid. Når leveranser, omfang, prioriteringer, avhengigheter eller produksjonskrav endres, oppdater planen i samme arbeidsøkt og før ferdigmelding eller commit.
- Oppdater dato, faseoversikt og berørte oppgaver. Skill mellom lokal implementering, simulert test, verifisering i delt miljø og faktisk produksjonsgodkjenning. Kryss av bare arbeid som er utført og verifisert, med relevant grunnlag eller referanse.
- Avstem produksjonskravene P1–P10 før utrulling. Registrer nye hindringer og avklaringer uten å oppfinne ansvarlige, frister eller godkjenninger. Første delte miljø skal være en lukket pilot inntil brukeren beslutter noe annet.
- Avstem planen med versjonsloggen og funksjonsregisteret, og bevar tidligere datostemplet historikk. Ved endringer uten betydning for plan eller produksjonsstatus trenger planen ingen kunstig ny oppføring.
- Dette er en vedlikeholdsregel for den som utfører arbeidet, ikke en automatisk vurdering av kode eller en periodisk jobb. Ikke presenter et bestått bygg som fullført produksjonsgodkjenning.
