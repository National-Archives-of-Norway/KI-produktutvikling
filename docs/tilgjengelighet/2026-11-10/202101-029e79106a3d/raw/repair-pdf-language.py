from pathlib import Path
import json,hashlib
from pypdf import PdfReader,PdfWriter
from pypdf.generic import ContentStream,NameObject,TextStringObject
p=Path('public/vedlegg/mandatforslag-ai-enablement-team.pdf');before=p.read_bytes();r=PdfReader(p);w=PdfWriter();w.clone_document_from_reader(r)
w.root_object[NameObject('/Lang')]=TextStringObject('nb-NO');alt_changes=[]
def walk(x):
 x=x.get_object() if hasattr(x,'get_object') else x
 if isinstance(x,list):
  for k in x:walk(k)
 elif isinstance(x,dict):
  if str(x.get('/Alt',''))=='Koala with solid fill':
   x[NameObject('/Lang')]=TextStringObject('en');alt_changes.append(str(x['/Alt']))
  if '/K' in x:walk(x['/K'])
walk(w.root_object['/StructTreeRoot']);changes=[]
for i,page in enumerate(w.pages,1):
 stream=ContentStream(page.get_contents(),w);changed=False
 for operands,operator in stream.operations:
  if operator==b'BDC' and len(operands)>1 and isinstance(operands[1],dict) and operands[1].get('/Lang') in ['en-US','en']:
   props=operands[1];changes.append({'page':i,'mcid':int(props['/MCID']) if '/MCID' in props else None,'before':str(props['/Lang']),'after':'nb-NO'})
   props[NameObject('/Lang')]=TextStringObject('nb-NO');changed=True
 if changed:page.replace_contents(stream)
out=Path('/private/tmp/portal-a11y-fix-060/repaired.pdf')
with out.open('wb') as f:w.write(f)
p.write_bytes(out.read_bytes())
report={'before_sha256':hashlib.sha256(before).hexdigest(),'after_sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'catalog_before':str(r.trailer['/Root'].get('/Lang')),'catalog_after':'nb-NO','content_language_changes':changes,'english_alt_labels_explicitly_preserved':len(alt_changes),'scope':'Language metadata/properties only. No text, colour, geometry, list or reading-order edits.'}
Path('/private/tmp/portal-a11y-fix-060/pdf-repair.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print('Changed',len(changes),'content-language spans; preserved',len(alt_changes),'English alt labels.')
