# Kontroll av isolert innholdssynkronisering

Dato: 11. november 2026. Utførende: Codex (OpenAI), uten underagenter.
Grunnlag: `46f449e` med content-sync-retting i arbeidskopien. Node 24.22.1 på macOS arm64.

## Før retting

- `pnpm test:content-sync` feilet etter ventefristen: `ERR_MODULE_NOT_FOUND`, manglende `src/config/rag.ts` fra serverkonfigurasjonen.
- Ny `tests/content-sync.test.mjs` med gammel kopieringsliste feilet på samme modul ved faktisk oppstart uten watch (omtrent 89 ms).

## Valg og regresjonsvern

`copyContentSyncFixture()` kopierer `src/` unntatt Nexts `src/app/`, serverens oppstartsskript og en minimal ESM-package.json. Det er enklere og mindre sårbart enn å tolke dagens importgraf eller vedlikeholde tre håndvalgte mapper. Nye delte moduler i kildetreet følger med. Testen bekrefter runtime-importene som faktisk brukes ved modellfri oppstart; den er ikke en statisk garanti for alle betingede importer eller fremtidige eksterne avhengigheter.

Samme funksjon brukes av watch-kontrollen og den raske regresjonen. Regresjonen starter serveren uten watch med `RAG_PORT=0`, leser faktisk tildelt loopback-port og krever HTTP 200 og `{status: "ok", generationEnabled: false}` fra `/health`. Den kontrollerer også at `src/app/` er utelatt. Prosess og mappe ryddes i finally. Testprosessen får ingen arvet modellkonfigurasjon eller nøkler.

## Resultater

| Kontroll                 | Resultat                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `pnpm test:content-sync` | Bestått: faktisk watch-omlasting av endret KI-prat-tekst og veiledning i isolert kopi     |
| `pnpm test:rag`          | 133/133 bestått, ingen hoppede; oppstartsregresjonen tok omtrent 241 ms i denne kjøringen |
| `pnpm typecheck`         | Bestått                                                                                   |
| `pnpm format:check`      | Bestått                                                                                   |

Ingen ekte modell eller priskilde er kalt. Ingen ny Docker/Node 22-, Next-bygg-, visuell eller tilgjengelighetskontroll er utført. Produksjonsstatus er uendret.

## Gjennomgang av chatleveransen

Arbeidstreet var rent ved oppstart; de oppgitte chatfilene og dokumentasjonen ligger allerede i `46f449e`. Parser og visning henger sammen via kildeantall og sikre inline-deler. Klient/server deler grafemvalidering; bytegrensen er separat og dekket av HTTP-tester. Demo-importen er begrenset av byggkonstanten. Tidligere bundle-/visuelle bevis bevares i [chatrapporten](chat-client.md), og de er ikke gjentatt i denne økten. Loggen dekker både chatrettingene og avstemmingen. Katalogversjon 0.6.0 stemmer med metadata i lokalt Skills-repo og er tilsiktet. Ingen ny endring i chatkode eller Skills-repo.
