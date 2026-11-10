"""Independent checks of repaired lists, MCID links, contrast and preservation."""
from pathlib import Path
from datetime import datetime
from collections import Counter
import hashlib,json
import pdfplumber
from pypdf import PdfReader
from PIL import Image,ImageChops
base=Path('/private/tmp/a11y-fix-3');file=Path('public/vedlegg/mandatforslag-ai-enablement-team.pdf')
a=PdfReader(base/'original.pdf');b=PdfReader(file)
assert len(a.pages)==len(b.pages)==7 and a.pdf_header==b.pdf_header=='%PDF-1.7'
assert b.metadata.title==a.metadata.title and b.xmp_metadata.dc_title==a.xmp_metadata.dc_title
roles=Counter();owners={};parents={};headings=[];lists=[]
pages={p.indirect_reference.idnum:i+1 for i,p in enumerate(b.pages)}
with pdfplumber.open(file) as doc:
 textmaps=[]
 for p in doc.pages:
  chars={}
  for c in p.chars:
   if c.get('mcid') is not None:chars[c['mcid']]=chars.get(c['mcid'],'')+c['text']
  textmaps.append(chars)
def walk(value,page=None,owner=None):
 value=value.get_object() if hasattr(value,'get_object') else value
 if isinstance(value,int):
  if page:assert (page,value) not in owners;owners[page,value]=owner
  return textmaps[page-1].get(value,'') if page else ''
 if isinstance(value,list):return ''.join(walk(k,page,owner) for k in value)
 if not isinstance(value,dict):return ''
 if value.get('/Pg'):page=pages[value.raw_get('/Pg').idnum]
 role=value.get('/S')
 if role:
  roles[role]+=1;owner=value.indirect_reference.idnum
  kids=value.get('/K',[])
  if isinstance(kids,list):
   for kid in kids:
    obj=kid.get_object() if hasattr(kid,'get_object') else kid
    if isinstance(obj,dict) and obj.get('/S'):assert obj.raw_get('/P').idnum==owner
  if role=='/L':
   assert page==7 and value['/A']['/ListNumbering']=='/Disc'
   entries=[]
   for ref in kids:
    li=ref.get_object();assert li['/S']=='/LI'
    assert [k.get_object()['/S'] for k in li['/K']]==['/Lbl','/LBody']
    assert li['/K'][0].get_object()['/ActualText']=='\u2022'
    entries.append(li)
   lists.append(entries)
 text=walk(value.get('/K'),page,owner)
 if role in ['/H1','/H2','/H3']:headings.append((page,role,str(value.get('/ActualText') or text)))
 return text
walk(b.trailer['/Root']['/StructTreeRoot'])
assert [len(x) for x in lists]==[6,3,3]
assert roles['/LI']==roles['/Lbl']==roles['/LBody']==12
assert (roles['/H1'],roles['/H2'],roles['/H3'])==(1,6,20)
def tree(o):
 o=o.get_object()
 for i in range(0,len(o.get('/Nums',[])),2):parents[int(o['/Nums'][i])]=o['/Nums'][i+1].get_object()
 for k in o.get('/Kids',[]):tree(k)
tree(b.trailer['/Root']['/StructTreeRoot']['/ParentTree'])
for (p,mcid),owner in owners.items():assert parents[b.pages[p-1]['/StructParents']][mcid].idnum==owner
page_results=[]
for n,(old,new) in enumerate(zip(a.pages,b.pages),1):
 assert old.extract_text()==new.extract_text()
 assert old.mediabox==new.mediabox
 same_stream=old.get_contents().get_data()==new.get_contents().get_data()
 assert same_stream == (n!=5)
 oldimg=Image.open(base/f'original-{n}.png').convert('RGB');newimg=Image.open(base/f'after-{n}.png').convert('RGB')
 delta=ImageChops.difference(oldimg,newimg).getbbox()
 assert (delta is None)==(n!=5)
 page_results.append({'page':n,'text_identical':True,'geometry_identical':True,'content_stream_identical':same_stream,'pixel_difference_bbox':delta})
def luminance(rgb):
 linear=[v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4 for v in rgb]
 return sum(v*w for v,w in zip(linear,[.2126,.7152,.0722]))
bg=[.176,.416,.373];ratio=(1.05)/(luminance(bg)+.05)
assert ratio>=4.5
with pdfplumber.open(base/'original.pdf') as oldpdf,pdfplumber.open(file) as newpdf:
 oldchars=oldpdf.pages[4].chars;newchars=newpdf.pages[4].chars
 assert len(oldchars)==len(newchars)
 changed=[]
 for i,(old,new) in enumerate(zip(oldchars,newchars)):
  assert old['text']==new['text'] and old['fontname']==new['fontname'] and old['size']==new['size']
  if old.get('non_stroking_color') in [(0.847,),(.365,.416,.4)]:
   assert new['non_stroking_color'] in [(1,), (1,1,1)]
   changed.append(i)
 assert changed
result={'tested_at':datetime.now().astimezone().isoformat(),'result':'passed','before_sha256':hashlib.sha256((base/'original.pdf').read_bytes()).hexdigest(),'after_sha256':hashlib.sha256(file.read_bytes()).hexdigest(),'roles':dict(roles),'list_lengths':[len(x) for x in lists],'parent_tree_mappings_verified':len(owners),'headings_preserved':len(headings),'changed_text_characters':len(changed),'page5_contrast_ratio':ratio,'minimum':4.5,'pages':page_results,'limitations':['No actual screen-reader test','No full PDF/UA validator','Other PDF semantics/language/alternatives remain outside this targeted repair']}
(base/'pdf-retest.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print({k:result[k] for k in ['result','list_lengths','parent_tree_mappings_verified','page5_contrast_ratio','changed_text_characters']})
