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

## Friction logging and triage

Prefer discovering conventions and architecture from the repository and available documentation. If a competent agent could find the answer by reading the code, tests, or existing docs, it does not belong in AGENTS.md or FRICTION.md. The existing maintenance and Next.js rules above remain in effect.

Record significant friction in FRICTION.md when:

- you searched for information needed to proceed and could not find it;
- available sources are ambiguous or contradictory;
- you must make a consequential assumption — one that affects behavior visible outside this change;
- a human corrects something you had reasonable grounds to believe was correct, and the correction depended on knowledge you had no way to discover — as opposed to an ordinary review preference or a plain bug. This is the highest-value entry: it surfaces things you were confidently wrong about.
  Do not record routine investigation or easily resolved questions.

Do not record the questions a task exists to answer. When designing a feature or writing a spec with a human, open questions, the owner's decisions and their corrections to your proposals are the work: record them in the spec. From that work, record friction only for a gap that a different, later task would also hit. That means an existing fact about the repositories or environment that the task would need and could not find, whether or not someone has since answered it.

Mistakes you find in working documents, such as reviews, drafts or handoff notes, are findings for the task, not friction.

Entry format:

```
### <short title>
Date: <YYYY-MM-DD>
Agent: <tool + model/version>
Task: <what you were doing>
Observation: <what was ambiguous, contradictory, or surprising>
Action taken: <what you did, and why>

```

Keep an entry to the friction and what you did about it; track task progress elsewhere. Add a dated follow-up only when a human resolves or corrects the entry. Resolutions that show up in the repositories, such as a merged fix, are for triage to find.

If the friction concerns another repository, still log it here — tag it cross-repo: <other-repo-name> rather than splitting the same observation across multiple files.

Call out a new entry to the user at the point you record it, not only in an end-of-session summary.

Do not turn friction findings into new rules in this file automatically.
When asked to triage FRICTION.md, go through every entry. For each, propose a primary disposition plus any follow-ups it needs. Do not act on the proposals unless asked.

For each entry:

- Understand the issue and check it against the relevant sources: the current state, or the pinned version where one applies.
  - Fetch remotes where access permits, but don't pull or switch branches.
  - State the commit, ref or tag you reviewed, and any freshness limits.
  - Entries go stale: the issue may have been fixed, merged elsewhere, or settled by a later decision.
- Consider which agent recorded the entry and in what environment. Missing tools, checkouts, or services may describe that agent's sandbox rather than the developer's machine.
- Separate verified facts from reported evidence and inferred causes. An unproven cause is a hypothesis: it can justify an investigation, but does not by itself justify a fix.
- Check for existing tickets and documents before proposing new ones. If you can't search the issue tracker, say so and mark the proposed tickets as unchecked; don't conclude that none exist.
- Prefer the action that removes the cause over one that only records it:
  - Close: nothing further is needed for this entry. Either the uncertainty is resolved, or the remaining work is tracked elsewhere; name where. Closing does not mean the entry was wrong or that the linked work is done.
  - Ticket: tech debt or a bug that caused the confusion, such as stale cluster configuration, outdated Python version bounds, or a half-finished tooling migration. Fixing it makes the fact inferable.
  - Documentation: architecture, roadmap, or ownership that belongs in an existing README, spec, or design record.
  - AGENTS.md change: only for durable guidance that applies across tasks and has no better home in existing documentation. Do not copy discoverable repository facts or task-specific decisions here.
  - Developer setup: friction caused by the agent's environment, such as sandbox mounts, stale local checkouts, or network allow lists.
  - Question: a fact owned by another team or person. Name who to ask.
    Report a summary table with one row per entry, giving the verdict and the proposed action. Follow it with the evidence behind each verdict (commits, files, or command output) so a reviewer can check it.

When the human confirms the triage is done, remove the triaged entries from FRICTION.md; their value now lives elsewhere. Before asking for that confirmation, list each entry's follow-ups and where each is recorded: a ticket, a document, a pull request, or the triage report. The human decides whether that is enough; don't file tickets yourself unless asked.
