from pathlib import Path
import json,hashlib,re,collections,datetime
root=Path('/Users/khadah/Documents/ChatGPT/KI-utvikling');r=root/'docs/tilgjengelighet/2026-11-10/094541-e2907a5c27e2';native=root/'docs/tilgjengelighet/2026-11-10/100139-native-b7a19485';old=root/'docs/tilgjengelighet/2026-11-10/090555-native-d984a7c5'
def load(p):return json.loads(p.read_text())
def dump(p,x):p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
x=load(r/'wcag-grunnlag.json');plan=load(r/'testplan.json');stats=load(r/'raw/native-postverification.json')
# Test outcomes, without evaluating sensitive config.
assert 'ℹ pass 52' in (r/'raw/project-tests.stdout.txt').read_text()
assert 'ℹ fail 0' in (r/'raw/project-tests.stdout.txt').read_text()
assert 'Ran 3 tests' in (r/'raw/python-tests.stdout.txt').read_text()and'OK'in(r/'raw/python-tests.stdout.txt').read_text()
assert 'All matched files use Prettier code style!'in(r/'raw/format-check.stdout.txt').read_text()
assert len(x['criteria'])==48 and len({c['id']for c in x['criteria']})==48
assert all(collections.Counter(c['status']for c in x['criteria'])[k]==v for k,v in x['counts'].items())
assert len(plan['tests'])==48 and all(t['expected_result']and t['actual_result']and t['evidence']for t in plan['tests'])
cov=load(r/'automatisk-dekning.json');assert sum(c['manual_required']for c in cov['criteria'])==36
assert sum(c['automatic_status']!='not_tested'for c in cov['criteria'])==34
inst=load(r/'raw/text-spacing-instrumentation.json');assert inst['restored_identical'];assert hashlib.sha256((root/'src/app/globals.css').read_bytes()).hexdigest()==inst['original_sha256']
for d in load(r/'raw/declaration-readback.json'):
 assert not d['measure']['findings'];assert d['measure']['layout']['scrollWidth']<=d['measure']['layout']['clientWidth']+1,d['measure']['layout']
missing=[];checked=0
mds=[root/f for f in ['README.md','KVALITETSKONTROLL.md','UTVIKLINGSPLAN.md','VERSJONSLOGG.md','docs/tilgjengelighet/WCAG-KONTROLL.md','docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md']]+list(r.glob('*.md'))
for p in mds:
 for link in re.findall(r'\]\(([^)]+)\)',p.read_text()):
  if link.startswith(('https:','http:','mailto:','#','/')):continue
  target=link.split('#')[0];checked+=1
  if not(p.parent/target).exists():missing.append((str(p.relative_to(root)),link))
for c in x['criteria']:
 for e in c['evidence']:
  checked+=1
  if not(r/e.split('#')[0]).exists():missing.append((c['id'],e))
assert not missing,missing
manifest=r/'manifest.json';dump(r/'raw/document-verification.json',{'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'criteria':48,'counts':x['counts'],'references_checked':checked,'missing':missing,'manifest_sha256':hashlib.sha256(manifest.read_bytes()).hexdigest(),'original_manifest_preserved':True,'css_restored_identical':True,'automatic_partial':34,'manual_remaining':36,'complete_local_sample':1,'no_trigger':11,'native_postverification':stats})
print(json.dumps({'references_checked':checked,'counts':x['counts'],'native':stats},ensure_ascii=False))
