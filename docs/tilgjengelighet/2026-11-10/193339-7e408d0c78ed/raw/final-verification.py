from pathlib import Path
from datetime import datetime,timezone
from collections import Counter
import json,re,shutil,subprocess
root=Path.cwd();run=root/'docs/tilgjengelighet/2026-11-10/193339-7e408d0c78ed';work=Path('/private/tmp/portal-a11y-060')
def load(p):return json.loads(p.read_text())
def save(p,x):p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
lines=(work/'native-final.log').read_text().splitlines();summary=next(json.loads(x) for x in lines if x.startswith('{'));native=root/summary['output'];print('Final native:',native.name)
a=load(native/'raw/axe.json');v=load(native/'raw/vnu.json');old=load(root/'docs/tilgjengelighet/2026-11-10/193220-native-e6605bab/raw/axe.json')
def targets(rows):return [(re.sub(r'^https?://[^/]+','',x['url']),r['id'],n['target']) for x in rows for r in x['incomplete'] for n in r['nodes']]
assert targets(a)==targets(old)
assert all(x['type']=='info' and 'Trailing slash' in x['message'] for x in v['messages'])
proof={'native_manifest':str((native/'native-manifest.json').relative_to(root)),'axe_routes':len(a),'violations':sum(len(x['violations']) for x in a),'incomplete_groups':sum(len(x['incomplete']) for x in a),'incomplete_nodes':sum(len(r['nodes']) for x in a for r in x['incomplete']),'same_incomplete_targets_as_before_declaration_update':True,'nu_html_files':len(list((root/'out').rglob('*.html'))),'nu_errors':sum(m['type']=='error' for m in v['messages']),'nu_info':sum(m['type']=='info' for m in v['messages']),'review':'New post-declaration-build regression. Original needs_review preserved. All Nu notes are trailing-slash information. Confirmed PDF-language and timer findings are separate manual assessments, not contradicted by 0 axe violations.'}
save(run/'raw/native-postverification.json',proof)
latest=load(root/'docs/tilgjengelighet/latest.json');latest['native_run']=str(native.relative_to(root));latest['native_postverification']=str((run/'raw/native-postverification.json').relative_to(root));save(root/'docs/tilgjengelighet/latest.json',latest)
m=load(run/'wcag-grunnlag.json');m['native_manifest']='../'+native.name+'/native-manifest.json';m['native_postverification']='raw/native-postverification.json';save(run/'wcag-grunnlag.json',m)
for name in ['native-final.log','final-verification.py']:
 if (work/name).exists():shutil.copyfile(work/name,run/'raw'/name)
# Check current new/changed Markdown targets, resolving archived initial copies from original run root.
files=[root/p for p in subprocess.check_output(['git','diff','--name-only'],text=True).splitlines() if p.endswith('.md')]+list(run.rglob('*.md'));broken=[];count=0
for p in files:
 for target in re.findall(r'\]\(([^)]+)\)',p.read_text()):
  target=target.strip('<>').split('#')[0]
  if not target or '://' in target or target.startswith(('mailto:','tel:')) or '{{' in target:continue
  base=run if p.parent==run/'raw' and p.name.startswith('initial-') else p.parent
  q=(root/'out'/target.lstrip('/')) if target.startswith('/') else base/target
  count+=1
  if not q.exists() and not (q/'index.html').is_file():broken.append([str(p.relative_to(root)),target])
assert not broken,broken
assert len(m['criteria'])==48 and dict(Counter(c['status'] for c in m['criteria']))=={'U':8,'I':11,'K':26,'B':3}
refs=[]
for c in m['criteria']:
 for ref in c.get('evidence',[]):
  if not (run/ref.split('#')[0]).is_file():refs.append([c['id'],ref])
assert not refs,refs
proofall={'date':datetime.now(timezone.utc).isoformat(),'node_tests_passed':53,'python_tests_passed':3,'pages_build':'passed after declaration update, including TypeScript and route registry','html_basic_files':25,'declaration_readback':'Exact 3 B and 8 U IDs at observed 320/1280, no overflow','criterion_counts':m['counts'],'document_consistency':'see raw/consistency.json; consistent, not a conformance decision','local_markdown_targets_checked':count,'broken_targets':broken,'pdf_and_functional_components_unchanged_from_HEAD':True,'native':proof,'temporary_fixture_server':'Stopped PID 86936 after test tab closed; loopback port 50240','overall_conformance':'not_assessed'}
save(run/'raw/postverification.json',proofall)
paragraph=f'Sluttverifisering: 53 Node-tester og tre Python-tester bestod, sammen med Pages-produksjonsbygg/TypeScript/ruteregister og HTML-grunnkontroll av 25 filer. Ny native-kjøring `{native.name}`: 23 ruter / 0 axe-violations / samme 3 incomplete-grupper og 86 targets; Nu 0 feil / 207 info-noter. Rendrert erklæring viser nøyaktig tre B-krav og åtte U-krav ved 320/1280 uten overflyt. PDF og funksjonskomponentene er identiske med HEAD. Testfanen er lukket, viewport gjenopprettet og den isolerte loopback-serveren stoppet.'
p=run/'testrapport.md';p.write_text(p.read_text()+'\n## Sluttverifisering\n\n'+paragraph+'\n\n[Native-manifest](../'+native.name+'/native-manifest.json), [motorvurdering](raw/native-postverification.json), [samlet verifisering](raw/postverification.json), [erklæringslesing](raw/declaration-readback.json).\n')
p=root/'VERSJONSLOGG.md';s=p.read_text();marker='## Ikke utgitt – fullført lokal 1.4.11-vurdering';s=s.replace(marker,'- '+paragraph+'\n\n'+marker,1);p.write_text(s)
print(json.dumps(proofall,ensure_ascii=False))
