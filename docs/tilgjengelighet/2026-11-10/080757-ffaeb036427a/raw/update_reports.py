from pathlib import Path
from datetime import datetime
from collections import Counter
import json,shutil,os
root=Path.cwd();run=root/'docs/tilgjengelighet/2026-11-10/080757-ffaeb036427a';prev=root/'docs/tilgjengelighet/2026-11-10/053920-3f1e603bfbcd';tmp=Path('/private/tmp/a11y-fix-3')
now=datetime.now().astimezone().isoformat()
def read(p):return json.loads(p.read_text())
def write(p,v):p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def rel(p):return os.path.relpath(p,run)
for name in ['testplan.json','wcag-grunnlag.json','manual-tests.json','automatisk-dekning.json','manuell-oppfolging.md','testrapport.md']:
 shutil.copyfile(run/name,run/'raw'/('initial-'+name))
for p in tmp.iterdir():
 if not p.is_file() or p.name=='browser.json':continue
 if p.suffix=='.png':
  target=run/'screenshots'/p.name
 elif p.suffix in ['.pdf','.py','.json','.txt']:target=run/'raw'/p.name
 else:continue
 shutil.copyfile(p,target)
old=read(prev/'wcag-grunnlag.json');auto=read(run/'automatisk-dekning.json');plan=read(run/'testplan.json');oldplan={t['criterion_id']:t for t in read(prev/'testplan.json')['tests']}
updates={
'1.3.1':('U','A11Y-04 rettet: Tre logiske L-lister på PDF-side 7 med 12 LI/Lbl/LBody. Riktig gruppe-/kolonnerekkefølge, opprinnelige tekstnoder og alle 229 ParentTree/MCID-eierkoblinger er kontrollert. Øvrig PDF-semantikk og faktisk hjelpemiddelbruk er fortsatt uavklart.','Prøv PDF-listenavigasjon med faktisk skjermleser og vurder øvrige dokumentstrukturer/figurer.'),
'1.4.3':('U','A11Y-05 rettet: Brød-/bunntekst og sidetall på PDF-side 5 er hvite, med 6,284:1 på opprinnelig grønn bakgrunn. 382 tegn og bevarte posisjoner/skrifter er kontrollert. Automatisk HTML-tekstkontrast ga ingen kandidat; resterende sammensatte bakgrunner og tilstander er ikke fulltestet.','Fullfør kontrastvurdering av hoppede tekstforekomster, gradienter, dokumentgrafikk og øvrige tilstander.'),
'2.4.2':('K','Tittelkandidat på feilsiden lukket i lokalt omfang: /404/ har én tittel, Fant ikke siden | KI-Produktutvikling. Det samme er kontrollert i alle tre eksporterte feilfiler. PDF-ens beskrivende Info-/XMP-tittel er bevart.','Prøv faktisk 404-fallback etter utrulling og i øvrige støttede nettlesere.'),
'3.1.2':('U','A11Y-06 rettet: Ny norsk 404-side arver nb korrekt. Norsk feiltekst og fravær av den gamle engelske meldingen er kontrollert i nettleser og alle eksporterte feilfiler. A11Y-01 for prisvilkår forblir rettet. PDF-språk og faktisk opplesing er ikke fullført.','Fullfør PDF-språk og faktisk opplesing; kontroller nye dynamiske/modelldrevne svar og publisert feilside når de er tilgjengelige.')}
criteria=[]
for c in old['criteria']:
 c=json.loads(json.dumps(c));c['previous_assessment']={'run':prev.relative_to(root).as_posix(),'test_date':c.get('test_date'),'observation':c['observation'],'evidence':c['evidence']}
 c['evidence']=[rel(prev/'wcag-grunnlag.json')];c['reviewed_at']=now;c['evidence_base']=run.relative_to(root).as_posix()
 if c['id'] in updates:
  c['status'],c['observation'],c['remaining']=updates[c['id']];c['test_date']='2026-11-10'
  c['evidence']+=['raw/pdf-retest.json'] if c['id'] in ['1.3.1','1.4.3'] else ['raw/404-browser.json','raw/404-export.json']
 c['evidence'].append('raw/auto-01.json');criteria.append(c)
counts=dict(Counter(c['status'] for c in criteria));findings=json.loads(json.dumps(old['findings']))
for f in findings:
 f['historical_record']=rel(prev/'wcag-grunnlag.json')
 if f['id'] in ['A11Y-04','A11Y-05','A11Y-06']:
  f.update(status='fixed',fixed=True,fixed_on='2026-11-10',retest_at=now,retest_run=run.relative_to(root).as_posix(),retest_scope='Målrettet struktur/kontrast/språk/tittel og lokal nettleser/eksport; ingen faktisk skjermleser eller produksjonsmiljø.')
  f['retest_evidence']=['raw/pdf-retest.json','raw/repair-actions.json'] if f['id']!='A11Y-06' else ['raw/404-browser.json','raw/404-export.json']
matrix={'skill_version':'0.5.0','overall_conformance':'not_assessed','scope':'Målrettet retting/retest av A11Y-04–06, 20 registrerte sider og lokal feilside; 23 eksportfiler. Tidligere øvrige vurderinger videreføres med egen dato/evidens.','reviewed_at':now,'base_commit':old['base_commit'],'working_tree':'Lokale, ucommittede rettinger.','manifest':'manifest.json','previous_run':prev.relative_to(root).as_posix(),'status_definitions':old['status_definitions'],'counts':counts,'criteria':criteria,'findings':findings,'note':'Ingen åpne bekreftede brudd i undersøkt utvalg. Uavklart samlet samsvar består; kjente rettinger er ikke en full samsvarsvurdering.'}
write(run/'wcag-grunnlag.json',matrix)
by_id={c['id']:c for c in criteria};by_auto={c['id']:c for c in auto['criteria']}
for t in plan['tests']:
 c=by_id[t['criterion_id']];p=oldplan[t['criterion_id']]
 t.update(status='reviewed_with_remaining_scope' if c['status']!='I' else 'reviewed_no_trigger',criterion_status=c['status'],expected_result=p['expected_result'],actual_result=c['observation'],evidence=c['evidence'],previous_assessment=c['previous_assessment'],reviewed_at=now,tested_at=c.get('test_date'),scope=['Ny automatisk delkontroll: 20 registrerte sider og feilside, eksport og PDF.','Målrettet retting i actual_result; øvrig manuell evidens har tidligere dato.'],tools_used=['browser_checks.mjs / auto_suite.py, avgrensede delkontroller','pypdf / pdfplumber / Poppler ved målrettet PDF-retest','Tidligere vurdering der ny manuell test ikke er gjennomført.'],remaining=c['remaining'],manual_remaining=c['status']!='I')
for a in auto['criteria']:
 c=by_id[a['id']];a.update(reviewed_criterion_status=c['status'],manual_required=c['status']!='I',manual_status='pending_wider_scope' if c['status']=='K' else 'pending' if c['status']=='U' else 'confirmed_no_trigger_in_local_scope',manual_next_step=c['remaining'] if c['status']!='I' else 'Ingen utløsende innholdstype lokalt. Vurder på nytt ved endret innhold/produksjonsomfang.',review_evidence=c['evidence'])
auto['reviewed_at']=now;auto['summary'].update(manual_remaining=37,confirmed_no_trigger_in_local_scope=11)
auto['note']='Vurdert målrettet retest. Alle tre kjente åpne brudd er rettet i oppgitt omfang. Original maskinliste er bevart; 37 krav har fortsatt bredere vurdering/retest, 11 er uten utløsende innholdstype lokalt.'
write(run/'automatisk-dekning.json',auto);write(run/'testplan.json',plan)
manual={'reviewed_at':now,'skill_version':'0.5.0','agent':'Codex (OpenAI)','scope':matrix['scope'],'tests':[{'id':'PDF','actual':'Tre lister, 12 punkter, 229 MCID-koblinger; 27 overskriftsroller og metadata bevart. Side 5 har 6,284:1 tekstkontrast; tekst/sidegeometri uendret på syv sider og seks sider er pikselidentiske.','evidence':'raw/pdf-retest.json'},{'id':'404','actual':'Norsk tekst, én beskrivende tittel i nettleser og alle eksportfiler. Rettslige unntak ikke forutsatt.','evidence':['raw/404-browser.json','raw/404-export.json']},{'id':'browser','actual':'21 sidetilstander, 63 viewport-kontroller, 168 Tab-steg og tre deklarerte forløp uten navngitt kandidat.','evidence':'raw/browser-input.json'}],'limits':['Ingen faktisk skjermleser eller full PDF/UA-validator.','Ingen ny full zoom-/tekstavstands-/enhetskontroll.','Axe/vnu er fortsatt blokkert.','Produksjonsfallback og innlogging er ikke testet.']}
write(run/'manual-tests.json',manual)
rows='\n'.join(f"| {a['id']} {a['title']} | {a['automatic_status']} | {a['reviewed_criterion_status']} | {a['manual_next_step']} [Prosedyre]({a['procedure']}) |" for a in auto['criteria'])
(run/'manuell-oppfolging.md').write_text('''# Gjenstående manuell oppfølging

De tre tidligere åpne bruddene er rettet og målrettet retestet. Det er ingen nye bekreftede åpne brudd i dette utvalget. **Samlet samsvar er fortsatt uavklart.**

37 krav har fortsatt vurdering/retest i bredere omfang; 11 har ingen utløsende innholdstype lokalt. K betyr undersøkt uten funn i oppgitt delomfang, U betyr delvis/uavklart og I betyr ingen utløsende innholdstype i lokalt omfang. Dette er ikke en samsvarsprosent.

## Prioritert videre

- Faktisk skjermleser: navigasjon, feil/status, chat, PDF-listenavigasjon, øvrig leserekkefølge, språk og figur-/diagramalternativer.
- Faktisk 200/400 % tekstforstørring/zoom, fokus og funksjoner i hele oppgaver.
- Resterende kontrast på sammensatte bakgrunner, nødvendige grafiske deler og komponenttilstander.
- Visuell tekstavstandstest av resterende dynamiske tilstander, faktisk enhetsrotasjon/redusert bevegelse og prisaldervarsel.
- Publisert 404-fallback, produksjonsmiljø, øvrige nettlesere og eventuell innlogging/modelldrevne svar når tilgjengelig.

## Blokkert automatikk

Axe og full lokal HTML-validator (vnu) mangler fortsatt. Dette er automatiserbare kontroller som ikke er gjennomført, og ikke manuelle tester som er bestått.

## Alle 48 krav

| Krav | Automatisk delresultat | Vurdert arbeidsstatus | Neste manuelle steg |
| --- | --- | --- | --- |
'''+rows+'\n\nSe [rapport](testrapport.md), [testplan](testplan.json) og [vurdert matrise](wcag-grunnlag.json).\n')
browser=read(run/'raw/browser-input.json');measures=next(c for c in browser['checks'] if c['id']=='browser-contrast')['measurements'];measured=sum(len(m['measured']) for m in measures);skipped=sum(len(m['skipped']) for m in measures)
(run/'testrapport.md').write_text(f'''# Målrettet retting og tilgjengelighetsretest

**10. november 2026 · Codex (OpenAI) · tilgjengelighetserklaering 0.5.0 og PDF-skill.**

Alle tre åpne funn fra [forrige vurdering]({rel(prev/'testrapport.md')}) er rettet og retestet i oppgitt lokalt omfang. **Ingen bekreftede åpne brudd i dette utvalget. Samlet samsvar er fortsatt uavklart.**

## Verifiserte rettinger

| Funn | Retting og faktisk kontroll | Grunnlag |
| --- | --- | --- |
| A11Y-04 / 1.3.1 | PDF-side 7 har tre L-lister, 12 LI med Lbl/LBody og logisk gruppering under tre overskrifter. Alle 229 ParentTree/MCID-koblinger er kontrollert. Side 7 er pikselidentisk med originalen. | [PDF-retest](raw/pdf-retest.json), [endringer](raw/repair-actions.json) |
| A11Y-05 / 1.4.3 | Grå/dunkle tekstfarger på PDF-side 5 er hvite. Tekstkontrast er 6,284:1 mot grønn bakgrunn, over 4,5:1. 382 tegn, skrift/posisjon og alt tekstinnhold er kontrollert. Bare side 5 har visuell forskjell. | [PDF-retest](raw/pdf-retest.json), [side 5](screenshots/after-5.png) |
| A11Y-06 / 3.1.2 | Ny norsk 404-side arver nb korrekt. Den har én beskrivende tittel i nettleser og alle tre eksporterte feilfiler. Tittelkandidaten for 2.4.2 er dermed også lukket lokalt. | [nettleser](raw/404-browser.json), [eksport](raw/404-export.json) |

PDF-tekst, sidegeometri, Info-/XMP-tittel og 27 overskriftsroller er bevart på syv sider. Seks sider er pikselidentiske. Før-versjon: [original.pdf](raw/original.pdf). Reparasjon og uavhengig retest er arkivert i [repair_pdf.py](raw/repair_pdf.py) og [retest_pdf.py](raw/retest_pdf.py). Skriptene viser de faktisk brukte lokale inn-/utdataene og må tilpasses ved gjentakelse utenfor denne arbeidsøkten.

## Regresjon og begrensninger

Skillens faktiske nettlesermodul har undersøkt 20 registrerte sider og feilsiden: **63 viewport-kontroller, 168 Tab-steg og tre deklarerte forløp**, uten kandidat i navngitte nettleserdeler. Automatisk tekstkontrast omfatter {measured} forekomster; {skipped} ble hoppet over med begrunnelse. HTML/PDF-delkontrollene er kjørt på nytt. Den samlede automatiske statusen er fortsatt delvis fordi axe/vnu mangler; exit 2 er ikke godkjenning eller bevis for et nytt brudd.

Arbeidsstatus: **20 K / 11 I / 17 U / 0 B**. 1.3.1, 1.4.3 og 3.1.2 er U for gjenstående dekning selv om de konkrete funnene er rettet. 2.4.2 er K i oppgitt lokalt omfang. Ingen samsvarsprosent beregnes.

Se [manuell restliste for alle 48 krav](manuell-oppfolging.md), [testplan](testplan.json), [vurdert matrise](wcag-grunnlag.json) og [automatisk dekning](automatisk-dekning.json). Tidligere vurderinger har egne datoer og referanser; originaler er bevart i `raw/initial-*`. [Manifest](manifest.json) og rå automatiske resultater er ikke omskrevet.

Ingen faktisk skjermleser, full PDF/UA-validering, verifisert 200/400 % zoom eller produksjonsfallback er gjennomført. Manuell liste-/språk-/opplesingsvurdering og øvrige tidligere uavklarte forhold består. Ingen commit, registrering eller publisering er utført.
''')
(run/'erklaering-utkast.md').write_text('# Grunnlag for oppdatert erklæring\n\nDe tre konkrete åpne bruddene er rettet og målrettet retestet 10. november 2026. Samlet samsvar er fortsatt uavklart. Den brukerrettede erklæringen skal beskrive dagens begrensninger og kontakt; rettingshistorikk holdes i rapporten.\n')
latest=read(root/'docs/tilgjengelighet/latest.json');latest.update(review_status='targeted_repairs_verified_with_remaining_manual_scope',reviewed_at=now,confirmed_findings=0,open_findings=[],fixed_findings=[f'A11Y-0{i}' for i in range(1,7)],counts=counts,previous_run=prev.relative_to(root).as_posix(),review_report=(run/'testrapport.md').relative_to(root).as_posix(),manual_follow_up=(run/'manuell-oppfolging.md').relative_to(root).as_posix());write(root/'docs/tilgjengelighet/latest.json',latest)
p=root/'docs/tilgjengelighet/WCAG-KONTROLL.md';before=p.read_text();history=before[before.index('## Historikk'):];link=run.relative_to(p.parent).as_posix()
text=f'''# WCAG-kontroll av KI-Produktutvikling

**10. november 2026 · Målrettet retting/retest med tilgjengelighetserklaering 0.5.0 og PDF-skill.**

A11Y-04 (PDF-lister), A11Y-05 (PDF-kontrast) og A11Y-06 (404-språk) er rettet i oppgitt omfang. Feilsidens tittelkandidat er også lukket lokalt. Ingen bekreftede åpne brudd i gjennomført utvalg; samlet samsvar er fortsatt uavklart.

[Retestrapport]({link}/testrapport.md), [manuell restliste]({link}/manuell-oppfolging.md), [testplan]({link}/testplan.json), [JSON-grunnlag]({link}/wcag-grunnlag.json).

**20 K / 11 I / 17 U / 0 B**. K = undersøkt uten funn i begrenset omfang; I = ingen utløsende innholdstype lokalt; U = delvis/uavklart; B = bekreftet brudd. Rettede konkrete funn gjør ikke automatisk hele kravet oppfylt.

## Gjenstående kontroller

37 krav har fortsatt bredere vurdering/retest, og 11 er uten utløsende innholdstype lokalt. Prioritert: faktisk skjermleser og PDF-listenavigasjon, 200/400 % forstørring, resterende kontrast/tekstavstand, fysisk orientering/redusert bevegelse og publisert fallback. Axe/vnu er blokkerte automatiske kontroller. [Alle 48 krav med neste steg]({link}/manuell-oppfolging.md).

## Gjeldende 48-punkts arbeidsmatrise

| Krav | Tema | Status | Dato | Observasjon / videre |
| --- | --- | --- | --- | --- |
'''
for c in criteria:text+=f"| {c['id']} | {c['title']} | {c['status']} | {c.get('test_date','')} | {c['observation'].replace('|','/')} Neste: {c['remaining']} [Evidens]({link}/wcag-grunnlag.json) |\n"
p.write_text(text+'\n'+history)
print({'run':str(run),'counts':counts,'contrast_samples':measured,'skipped':skipped})
