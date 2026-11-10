from pathlib import Path
import sys
from collections import Counter, defaultdict
import json,hashlib
from pypdf import PdfReader
from pypdf.generic import ContentStream
import pdfplumber
pdf=Path(sys.argv[1]);r=PdfReader(pdf)
page_ids={p.indirect_reference.idnum:i+1 for i,p in enumerate(r.pages)};mapping={};nodes=[]
def obj(x):return x.get_object() if hasattr(x,'get_object') else x
def page_id(p):return page_ids.get(p.idnum) if hasattr(p,'idnum') else None
def walk(x,lang,page,roles):
 x=obj(x)
 if isinstance(x,list):
  for y in x:walk(y,lang,page,roles)
 elif isinstance(x,int):
  mapping[(page,int(x))]={'language':lang,'roles':roles}
 elif isinstance(x,dict):
  lang=str(x.get('/Lang',lang));page=page_id(x.raw_get('/Pg')) if '/Pg' in x else page
  if '/S' in x:
   roles=roles+[str(x['/S'])];nodes.append({'role':str(x['/S']),'language':lang,'page':page,'alt':str(x.get('/Alt',''))})
  if '/MCID' in x:mapping[(page,int(x['/MCID']))]={'language':lang,'roles':roles}
  if '/K' in x:walk(x['/K'],lang,page,roles)
walk(r.trailer['/Root']['/StructTreeRoot'],str(r.trailer['/Root'].get('/Lang')),None,[])
inline={}
for i,p in enumerate(r.pages,1):
 for operands,op in ContentStream(p.get_contents(),r).operations:
  if op==b'BDC' and len(operands)>1 and isinstance(operands[1],dict) and '/Lang' in operands[1] and '/MCID' in operands[1]:
   inline[(i,int(operands[1]['/MCID']))]=str(operands[1]['/Lang'])
pages=[];total=Counter()
with pdfplumber.open(pdf) as d:
 for i,p in enumerate(d.pages,1):
  groups=defaultdict(list)
  for c in p.chars:
   if c['text'].strip(): groups[c.get('mcid')].append(c['text'])
  spans=[]
  for mcid,chars in groups.items():
   info=dict(mapping.get((i,mcid),{'language':'UNMAPPED','roles':[]}));info['structural_language']=info['language'];info['inline_language']=inline.get((i,mcid));info['language']=inline.get((i,mcid),info['language']);total[info['language']]+=len(chars)
   spans.append({'mcid':mcid,'text':''.join(chars),**info,'character_count':len(chars)})
  pages.append({'page':i,'full_text':p.extract_text(),'spans':spans})
result={'sha256':hashlib.sha256(pdf.read_bytes()).hexdigest(),'catalog_language':str(r.trailer['/Root'].get('/Lang')),'visible_nonblank_characters_by_effective_structural_language':dict(total),'nodes':nodes,'pages':pages,'limits':'Structure/content mapping, not actual PDF-reader speech. Text content reviewed separately for language; defaults and overrides are both retained.'}
Path(sys.argv[2]).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(result['visible_nonblank_characters_by_effective_structural_language']);print('nodes',len(nodes));print('non-nb spans',[(p['page'],s['language'],s['text'][:100]) for p in pages for s in p['spans'] if not s['language'].startswith('nb')])
