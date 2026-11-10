from pathlib import Path
from datetime import datetime,timezone
from collections import Counter
import json,copy,os,shutil
root=Path.cwd();run=root/'docs/tilgjengelighet/2026-11-10/202101-029e79106a3d';previous=root/'docs/tilgjengelighet/2026-11-10/193339-7e408d0c78ed';work=Path('/private/tmp/portal-a11y-fix-060');skill=Path('/Users/khadah/.codex/skills/tilgjengelighetserklaering');now=datetime.now(timezone.utc).isoformat()
def load(p):return json.loads(p.read_text())
def save(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
for name in ['wcag-grunnlag.json','testplan.json','automatisk-dekning.json','manuell-oppfolging.md','testrapport.md','erklaering-utkast.md','testmuligheter.json']:
 shutil.copyfile(run/name,run/'raw'/('initial-'+name))
for p in work.iterdir():
 if p.is_file() and p.name!='repaired.pdf':shutil.copyfile(p,run/('screenshots' if p.suffix=='.png' else 'raw')/p.name)
for p in (skill/'references').glob('*.md'):
 if not (run/'testprosedyrer'/p.name).exists():shutil.copyfile(p,run/'testprosedyrer'/p.name)
shutil.copyfile(work/'fixture/a11y-clock.js',run/'raw/a11y-clock.js')
shutil.copyfile(root/'src/components/pricing-freshness.tsx',run/'raw/source-pricing-freshness.tsx.txt')
shutil.copyfile(root/'src/content/features.ts',run/'raw/source-features.ts.txt')
pdf=load(work/'pdf-regression.json');assert pdf['status']=='passed' and pdf['visible_text_language_counts']=={'nb-NO':2694}
clock=load(work/'clock-retest.json');fresh=next(x for x in clock if x['label']=='fresh-initial');after=next(x for x in clock if x['label']=='fresh-after-threshold');stale=next(x for x in clock if x['label']=='stale-on-open');mobile=next(x for x in clock if x['label']=='stale-open-320')
assert fresh['phase']=='initial' and after['phase']=='crossed' and not after['warnings'] and not fresh['warnings']
assert all(x['hourlyCallbacks']=='0' for x in clock);assert len(stale['warnings'])==6 and len(mobile['warnings'])==6 and mobile['width']==320 and mobile['scrollWidth']==320
save(run/'raw/clock-verdict.json',{'status':'passed','fresh_initial_warnings':0,'fresh_after_threshold_warnings':0,'hourly_callbacks_registered':0,'stale_on_open_warnings':6,'stale_320_warnings':6,'limits':'Synthetic page clock, no system clock change or seven-day wait. Same component bundle as production export.'})
m=copy.deepcopy(load(previous/'wcag-grunnlag.json'));m.update(skill_version='0.6.0',reviewed_at=now,base_commit='05d1b80 + lokale rettinger av A11Y-08 og A11Y-09',previous_run=str(previous.relative_to(root)),manifest='manifest.json',scope='Målrettet retting/retest av A11Y-08 (PDF-språk, 3.1.1/3.1.2) og A11Y-09 (varsel om gamle prisdata, 2.2.2). Øvrige vurderinger videreføres med opprinnelig bevis og dato; ingen ny full manuell revisjon.',overall_conformance='not_assessed');m.pop('native_postverification',None)
for c in m['criteria']:
 for key in ['evidence','focused_evidence']:
  if key in c:c[key]=[os.path.relpath(previous/ref,run) for ref in c[key]]
 c['previous_automatic_status']=c.get('automatic_status');c['automatic_status']=next(x['automatic_status'] for x in load(run/'automatisk-dekning.json')['criteria'] if x['id']==c['id'])
for f in m['findings']:
 for key in ['evidence','retest_evidence']:
  if key in f:f[key]=[os.path.relpath(previous/ref,run) for ref in f[key]]
new={
'3.1.1':('PDF-ens hovedspråk er nå nb-NO. Alle 2694 ikke-blanke synlige tegn er koblet til norske språkspenn; ParentTree-arving er kontrollert uavhengig. Syv engelske alternativtekster har eksplisitt en. A11Y-08 er rettet; faktisk opplesing er ikke testet.',['raw/pdf-regression.json','raw/pdf-language-after.json','raw/pdf-repair.json']),
'3.1.2':('De 36 feilmerkede norske innholdsspennene er endret fra en-US til nb-NO, mens engelske alternativtekster er bevart med eksplisitt engelsk språk. Norsk synlig innhold og programmatisk språk samsvarer i prøvd dokument. Dette er metadata-/innholdskontroll, ikke faktisk uttale.',['raw/pdf-regression.json','raw/pdf-language-after.json','raw/pdf-repair.json']),
'2.2.2':('Prisdata vurderes ved åpning/nytt checkedAt-grunnlag uten tidsstyrte innsettinger. Kontrollert klokke: 0 varsler før/etter terskel i åpen fersk side, 6 ved åpning med gamle data, ingen registrerte time-callbacks. Hero-pause/start er retestet med tastatur. A11Y-09 er lukket i prøvd lokalt utvalg.',['raw/clock-verdict.json','raw/clock-retest.json','raw/fixture-metadata.json','raw/browser.json','raw/source-pricing-freshness.tsx.txt'])}
for c in m['criteria']:
 if c['id'] in new:
  old=copy.deepcopy(c);obs,evidence=new[c['id']];c.update(status='K',test_date='2026-11-10',reviewed_at=now,observation=obs,evidence=evidence,evidence_base=str(run.relative_to(root)),remaining='Ingen åpen oppgave for dette kravet i det målrettet prøvde lokale utvalget. Gjenta ved relevante innholds-/komponentendringer eller utrulling.',previous_assessment_in_this_run=old)
 if c['id'] in ['1.4.3','1.4.11']:
  c['evidence'].append('raw/pdf-regression.json');c['evidence_reuse_note']='PDF-hash er endret bare for språk. Samtlige syv 120-dpi-renderinger er pikselidentiske, og tekst/geometri/farger/operasjoner unntatt Lang er identiske. Tidligere kontrastklassifisering og mål gjelder fortsatt.'
 if c['id']=='4.1.3':c['remaining']='Prøv faktiske søkeresultat-, validerings-, ventings-, svar- og relevante feilbeskjeder med skjermleser og naturlig fokus. Prisvarselet er nå innledende sideinnhold; faktisk opplesing er fortsatt ikke prøvd.'
for f in m['findings']:
 if f['id'] in ['A11Y-08','A11Y-09']:
  f['previous_open_finding']=copy.deepcopy(f);f.update(status='fixed',fixed=True,fixed_on='2026-11-10',retest_date='2026-11-10',retest_run=str(run.relative_to(root)))
  if f['id']=='A11Y-08':f.update(retest=new['3.1.1'][0]+' Alle syv sider er pikselidentiske ved 120 dpi; synlig tekst, geometri, farger, roller og tittel er bevart.',retest_evidence=new['3.1.1'][1])
  else:f.update(retest=new['2.2.2'][0],retest_evidence=new['2.2.2'][1])
m['counts']={k:sum(c['status']==k for c in m['criteria']) for k in ['K','I','U','B']};assert m['counts']=={'K':29,'I':11,'U':8,'B':0};save(run/'wcag-grunnlag.json',m)
plan=load(run/'testplan.json');oldplan={t['criterion_id']:t for t in load(previous/'testplan.json')['tests']};mi={c['id']:c for c in m['criteria']}
for t in plan['tests']:
 cid=t['criterion_id'];c=mi[cid];t['completion']=copy.deepcopy(oldplan[cid]['completion']);t['criterion_status']=c['status'];t['inherited_assessment']={'run':str(previous.relative_to(root)),'test_date':c.get('test_date'),'evidence':c['evidence'],'note':'Bare oppgitte rettinger og tilhørende regresjon er nye tester.'}
 if cid in new:
  t.update(status='completed_local_manual_sample',scope=['PDF side 1–7'] if cid.startswith('3.') else ['/','/priser/'],tested_at='2026-11-10',actual_result=c['observation'],evidence=c['evidence'],tools_used=['pypdf/pdfplumber/Poppler/PIL' if cid.startswith('3.') else 'Documented CUA keyboard/viewport with controlled-clock fixture'])
  t['completion'].update(execution='local_now',blocker=None,capability_ids=['pdf_structure'] if cid.startswith('3.') else ['browser_keyboard','dynamic_test_service'],next_step=c['remaining'])
 if cid=='4.1.3':t['completion']['next_step']=c['remaining']
coverage=load(run/'automatisk-dekning.json');coverage['initial_automatic_summary']=coverage['summary'].copy();coverage['summary']['manual_remaining']=8;coverage['note']='Vurdert status er separat fra automatisk deldekning; åtte U-krav krever oppgitt bistand. Ingen samsvarsprosent.'
for c in coverage['criteria']:
 r=mi[c['id']];c['criterion_status']=r['status'];c['manual_required']=r['status']=='U';c['manual_status']='needs_assistance' if r['status']=='U' else 'no_local_trigger' if r['status']=='I' else 'assessed_local_sample';c['manual_next_step']=next(t['completion']['next_step'] for t in plan['tests'] if t['criterion_id']==c['id'])
save(run/'testplan.json',plan);save(run/'automatisk-dekning.json',coverage)
cap=load(previous/'testmuligheter.json');cap['scope']='Målrettet retting/retest av PDF-språk og ferskhetsvarsel. Tidligere blokkerte hjelpemiddel-/zoom-/enhetsprøver er ikke forsøkt på nytt.'
for c in cap['capabilities']:
 c['evidence']=[os.path.relpath(previous/ref,run) for ref in c.get('evidence',[])]
 if c['id'] in ['browser_keyboard','pdf_structure','dynamic_test_service']:
  c['checked_at']=now;c['evidence']={'browser_keyboard':['raw/browser.json'],'pdf_structure':['raw/pdf-language-after.json','raw/pdf-regression.json'],'dynamic_test_service':['raw/clock-retest.json','raw/fixture-metadata.json']}[c['id']]
save(run/'testmuligheter.json',cap)
save(run/'manual-tests.json',{'date':now,'agent':'Codex (OpenAI)','skill_version':'0.6.0','scope':m['scope'],'new_results':{cid:{'status':'K','result':obs,'evidence':refs} for cid,(obs,refs) in new.items()},'pdf_regression':'raw/pdf-regression.json','clock_regression':'raw/clock-verdict.json','previous_run':str(previous.relative_to(root)),'limits':['No actual screen-reader speech','No actual browser zoom or physical rotation','Clock test is synthetic','No actual external model/auth/published pilot test']})
shutil.copyfile(root/'docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md',run/'erklaering-utkast.md')
print(m['counts'])
