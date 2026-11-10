from pathlib import Path
from pypdf import PdfReader
from collections import Counter
import json,hashlib
p=Path('public/vedlegg/mandatforslag-ai-enablement-team.pdf');r=PdfReader(p);root=r.trailer['/Root'];roles=Counter();fig=[];langs=Counter()
pageids={p.indirect_reference.idnum:i+1 for i,p in enumerate(r.pages)}
def obj(x):return x.get_object()if hasattr(x,'get_object')else x
def visit(x,pg=None,lang=None):
 x=obj(x)
 if isinstance(x,list):
  for v in x:visit(v,pg,lang)
 elif isinstance(x,dict):
  page=x.get('/Pg');pg=pageids.get(page.idnum,pg)if hasattr(page,'idnum')else pg
  lang=x.get('/Lang',lang);role=str(x.get('/S',''));roles[role]+=1
  if x.get('/Lang'):langs[str(x['/Lang'])]+=1
  if role=='/Figure':fig.append({'page':pg,'alt':str(x.get('/Alt','')),'effective_lang':str(lang)})
  if '/K'in x:visit(x['/K'],pg,lang)
visit(root['/StructTreeRoot'],None,root.get('/Lang'))
out={'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'pages':len(r.pages),'root_lang':str(root.get('/Lang')),'roles':dict(roles),'languages':dict(langs),'figures':fig,'limit':'Structure and metadata only; not actual screen reader or PDF/UA validation.'}
Path('docs/tilgjengelighet/2026-11-10/094541-e2907a5c27e2/raw/pdf-structure-followup.json').write_text(json.dumps(out,ensure_ascii=False,indent=2));print(json.dumps({k:v for k,v in out.items()if k!='figures'},ensure_ascii=False));print('Page6 figures', [x for x in fig if x['page']==6])
