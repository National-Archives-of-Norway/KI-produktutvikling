from pathlib import Path
import json,os
root=Path.cwd();run=root/'docs/tilgjengelighet/2026-11-10/193339-7e408d0c78ed';old=root/'docs/tilgjengelighet/2026-11-10/160352-a02d77cb2734';p=run/'wcag-grunnlag.json';d=json.loads(p.read_text());base=json.loads((old/'wcag-grunnlag.json').read_text());repairs=[]
for row in d['criteria']:
 if row['id']=='1.4.3':
  row['evidence']=[ref.replace('../145250-bd1373c8699b/raw/filter-retest-results.json','../160352-a02d77cb2734/raw/filter-retest-results.json') for ref in row['evidence']]
  repairs.append({'id':'1.4.3','note':'Mixed evidence base: filter retest actually belongs to 160352, while other contrast evidence belongs to 145250.'})
locations={'A11Y-01':('2026-11-09/203914-cf2e80bc00f7',['raw/pricing-language-after-refresh.json','raw/live-refresh.json','raw/project-tests.stdout.txt','screenshots/pricing-language-fixed.png']),'A11Y-02':('2026-11-09/210420-07c855b7770e',['raw/pdf-retest.json']),'A11Y-03':('2026-11-09/210420-07c855b7770e',['raw/pdf-retest.json']),'A11Y-04':('2026-11-10/080757-ffaeb036427a',['raw/pdf-retest.json','raw/repair-actions.json']),'A11Y-05':('2026-11-10/080757-ffaeb036427a',['raw/pdf-retest.json','raw/repair-actions.json']),'A11Y-06':('2026-11-10/080757-ffaeb036427a',['raw/404-browser.json','raw/404-export.json'])}
for f in d['findings']:
 if f['id'] in locations:
  original=next(x for x in base['findings'] if x['id']==f['id']);folder,refs=locations[f['id']]
  targets=[root/'docs/tilgjengelighet'/folder/ref for ref in refs];assert all(p.is_file() for p in targets)
  f['legacy_retest_evidence']=original.get('retest_evidence');f['retest_evidence']=[os.path.relpath(p,run) for p in targets]
  f['legacy_retest_instruction']=original['retest'];f['retest']='Tidligere dokumentert lokal rettingskontroll bevares med opprinnelig dato; se de faktiske daterte retestfilene. Ingen ny hjelpemiddelprøve påstås.'
  repairs.append({'id':f['id'],'original':original.get('retest_evidence'),'normalized':f['retest_evidence'],'note':'Actual original files verified; old pointer base and string/list schema normalized in new assessment only. Legacy runs unchanged.'})
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n');(run/'raw/reference-repairs.json').write_text(json.dumps(repairs,ensure_ascii=False,indent=2)+'\n')
