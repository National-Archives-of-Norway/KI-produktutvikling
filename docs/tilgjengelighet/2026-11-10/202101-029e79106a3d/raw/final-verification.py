from pathlib import Path
from datetime import datetime,timezone
from collections import Counter
import json,re,subprocess,shutil,hashlib
root=Path.cwd();run=root/'docs/tilgjengelighet/2026-11-10/202101-029e79106a3d';work=Path('/private/tmp/portal-a11y-fix-060')
def load(p):return json.loads(p.read_text())
def save(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
summary=next(json.loads(s) for s in (work/'native-final.log').read_text().splitlines() if s.startswith('{'));native=root/summary['output'];a=load(native/'raw/axe.json');v=load(native/'raw/vnu.json');prev=load(root/'docs/tilgjengelighet/2026-11-10/195227-native-1d4e7aee/raw/axe.json')
def targets(rows):return [(re.sub(r'^https?://[^/]+','',x['url']),r['id'],n['target']) for x in rows for r in x['incomplete'] for n in r['nodes']]
assert targets(a)==targets(prev)
assert all(x['type']=='info' and 'Trailing slash' in x['message'] for x in v['messages'])
proof={'native_manifest':str((native/'native-manifest.json').relative_to(root)),'axe_routes':len(a),'axe_violations':sum(len(x['violations']) for x in a),'axe_incomplete_groups':sum(len(x['incomplete']) for x in a),'axe_incomplete_nodes':sum(len(r['nodes']) for x in a for r in x['incomplete']),'same_incomplete_targets_as_previous':True,'nu_html_files':len(list((root/'out').rglob('*.html'))),'nu_errors':sum(x['type']=='error' for x in v['messages']),'nu_info':len(v['messages']),'note':'New post-fix, post-declaration-build native run. Original engine needs_review/incomplete retained; all Nu notes are trailing-slash information. Manual contrast evidence is separate.'}
save(run/'raw/native-postverification.json',proof)
m=load(run/'wcag-grunnlag.json');m['native_manifest']='../'+native.name+'/native-manifest.json';m['native_postverification']='raw/native-postverification.json';save(run/'wcag-grunnlag.json',m)
l=load(root/'docs/tilgjengelighet/latest.json');l['native_run']=str(native.relative_to(root));l['native_postverification']=str((run/'raw/native-postverification.json').relative_to(root));save(root/'docs/tilgjengelighet/latest.json',l)
for name in ['native-final.log','final-verification.py']:
 if (work/name).exists():shutil.copyfile(work/name,run/'raw'/name)
rb=load(run/'raw/declaration-readback.json');U={x['id'] for x in m['criteria'] if x['status']=='U'}
for x in rb:assert not x['known']['ids'] and 'ingen bekreftede' in x['known']['text'] and set(x['unresolved']['ids'])==U and x['width']==x['scrollWidth']
assert len(m['criteria'])==48 and dict(Counter(x['status'] for x in m['criteria']))=={'U':8,'I':11,'K':29}
assert [f['id'] for f in m['findings'] if f['status']!='fixed']==[]
assert hashlib.sha256((root/'public/vedlegg/mandatforslag-ai-enablement-team.pdf').read_bytes()).hexdigest()==load(run/'raw/pdf-regression.json')['after_sha256']
# Check every primary evidence reference, including old inherited assessments.
for c in m['criteria']:
 for ref in c.get('evidence',[]):assert (run/ref.split('#')[0]).is_file(),(c['id'],ref)
files=[root/p for p in subprocess.check_output(['git','diff','--name-only'],text=True).splitlines() if p.endswith('.md')]+list(run.rglob('*.md'));broken=[];checked=0
for p in files:
 for target in re.findall(r'\]\(([^)]+)\)',p.read_text()):
  target=target.strip('<>').split('#')[0]
  if not target or '://' in target or target.startswith(('mailto:','tel:')) or '{{' in target:continue
  base=run if p.parent==run/'raw' and p.name.startswith('initial-') else p.parent
  q=root/'out'/target.lstrip('/') if target.startswith('/') else base/target;checked+=1
  if not q.exists() and not (q/'index.html').exists():broken.append([str(p.relative_to(root)),target])
assert not broken,broken
verification={'date':datetime.now(timezone.utc).isoformat(),'node_tests_passed':53,'python_tests_passed':3,'pages_build':'passed incl TypeScript and feature route registry','html_basic_files':25,'consistency':'consistent; see raw/consistency-final.json','criterion_counts':m['counts'],'pdf_regression':'7/7 pixel-identical at 120dpi; text/geometry/fonts/colours/MCID/roles/title preserved; language corrected','clock_regression':'fresh 0 to 0; stale open 6; 0 hourly callbacks; synthetic clock','declaration_readback':'0 known open IDs and exact 8 U IDs at observed 320/1280; no width overflow','screenshot_limits':'declaration-fixed.png was captured during viewport resizing and is not used as proof of stable layout; stale-320.png shows page context, DOM counts carry warning evidence. fresh-after.png and PDF renders have been visually reviewed.','local_markdown_targets_checked':checked,'broken_targets':broken,'native':proof,'temporary_fixture':'test tab closed; server PID 88127 stopped; viewport reset','overall_conformance':'not_assessed'}
save(run/'raw/postverification.json',verification)
paragraph=f'Sluttverifisering: 53 Node-tester, tre Python-tester, Pages-produksjonsbygg med TypeScript/ruteregister og HTML-grunnkontroll for 25 filer bestod. Ny native-kjøring `{native.name}`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu 0 feil / 207 info-noter. Original motorstatus er bevart. Erklæringen er lest tilbake ved 320/1280 med nøyaktig åtte U-ID-er og ingen kjente åpne brudd. Bevisreferanser, lokale dokumentlenker og dokumentavstemming er kontrollert. Den midlertidige testfanen/serveren er lukket/stoppet og viewport er gjenopprettet.'
p=run/'testrapport.md';p.write_text(p.read_text()+'\n## Sluttverifisering\n\n'+paragraph+'\n\nSkjermdumpen declaration-fixed.png ble tatt under viewportovergang og brukes ikke som grunnlag for stabil layout. DOM-tilbakelesingen bærer kravliste-/breddebeviset; bildene fra klokkeprøven er supplerende visning, ikke alene bevis for timing.\n\n[Native-manifest](../'+native.name+'/native-manifest.json), [motorvurdering](raw/native-postverification.json), [samlet verifisering](raw/postverification.json) og [erklæringslesing](raw/declaration-readback.json).\n')
p=root/'VERSJONSLOGG.md';s=p.read_text();marker='## Ikke utgitt – lokal oppfølging med tilgjengelighetsskill 0.6.0';assert marker in s;s=s.replace(marker,'- '+paragraph+'\n\n'+marker,1);p.write_text(s)
print(native.name, 'verified', checked,'links, 29 K /11 I /8 U /0 B')
