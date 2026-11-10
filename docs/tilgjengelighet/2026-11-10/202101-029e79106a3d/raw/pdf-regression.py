from pathlib import Path
from collections import Counter
import json,hashlib
from pypdf import PdfReader
from pypdf.generic import ContentStream
import pdfplumber
from PIL import Image,ImageChops
work=Path('/private/tmp/portal-a11y-fix-060');before=work/'before.pdf';after=Path('public/vedlegg/mandatforslag-ai-enablement-team.pdf')
r0=PdfReader(before);r1=PdfReader(after)
def structure(r):
 counts=Counter();alts=[];mapping=[]
 def walk(x):
  x=x.get_object() if hasattr(x,'get_object') else x
  if isinstance(x,list):
   for c in x:walk(c)
  elif isinstance(x,dict):
   if '/S' in x:counts[str(x['/S'])]+=1
   if x.get('/Alt'):alts.append((str(x.get('/S')),str(x['/Alt']),str(x.get('/Lang'))))
   if '/K' in x:walk(x['/K'])
 walk(r.trailer['/Root']['/StructTreeRoot']);return dict(counts),alts
c0,alts0=structure(r0);c1,alts1=structure(r1);assert c0==c1
assert r0.metadata.title==r1.metadata.title
assert str(r1.trailer['/Root']['/Lang'])=='nb-NO'
assert len(alts1)==7 and all(x[2]=='en' for x in alts1)
assert [(x[0],x[1]) for x in alts0]==[(x[0],x[1]) for x in alts1]
# Resolve ParentTree independently, then verify source structural language against MCID audit.
parenttree={}
def tree(x):
 x=x.get_object();nums=x.get('/Nums',[])
 for i in range(0,len(nums),2):parenttree[int(nums[i])]=nums[i+1].get_object()
 for c in x.get('/Kids',[]):tree(c)
tree(r1.trailer['/Root']['/StructTreeRoot']['/ParentTree'])
def lang(node):
 while node:
  node=node.get_object()
  if '/Lang' in node:return str(node['/Lang'])
  node=node.get('/P')
 return str(r1.trailer['/Root'].get('/Lang'))
audit=json.loads((work/'pdf-language-after.json').read_text());cross=[]
for page in audit['pages']:
 a=parenttree[int(r1.pages[page['page']-1]['/StructParents'])]
 for span in page['spans']:
  language=lang(a[span['mcid']]);assert language.split('-')[0]=='nb';assert span['language']=='nb-NO'
  cross.append({'page':page['page'],'mcid':span['mcid'],'parenttree_language':language,'inline_language':span['inline_language'],'characters':span['character_count']})
pages=[]
with pdfplumber.open(before) as d0,pdfplumber.open(after) as d1:
 for i,(p0,p1) in enumerate(zip(d0.pages,d1.pages),1):
  fields=['text','x0','x1','top','bottom','fontname','size','non_stroking_color','mcid']
  ch0=[[c.get(f) for f in fields] for c in p0.chars];ch1=[[c.get(f) for f in fields] for c in p1.chars]
  assert ch0==ch1
  diff=ImageChops.difference(Image.open(work/f'before-{i}.png').convert('RGB'),Image.open(work/f'after-{i}.png').convert('RGB')).getbbox();assert diff is None
  def norm(ops):
   result=[]
   for operands,op in ops:
    if op==b'BDC' and len(operands)>1 and isinstance(operands[1],dict):
     operands=list(operands);operands[1]={k:v for k,v in operands[1].items() if k!='/Lang'}
    result.append((str(operands),op))
   return result
  assert norm(ContentStream(r0.pages[i-1].get_contents(),r0).operations)==norm(ContentStream(r1.pages[i-1].get_contents(),r1).operations)
  pages.append({'page':i,'text_geometry_fonts_colours_mcid_identical':True,'operations_except_language_identical':True,'pixel_difference_bbox':diff,'render_dpi':120})
result={'status':'passed','before_sha256':hashlib.sha256(before.read_bytes()).hexdigest(),'after_sha256':hashlib.sha256(after.read_bytes()).hexdigest(),'catalog_language':'nb-NO','visible_text_language_counts':audit['visible_nonblank_characters_by_effective_structural_language'],'structural_roles':c1,'title_preserved':r1.metadata.title,'english_alternatives_preserved':alts1,'pages':pages,'reverse_parenttree_crosscheck':cross,'limits':'No actual PDF-reader speech. Language metadata is validated; remaining PDF semantics/alternatives/reading-order are separate unresolved requirements.'}
(work/'pdf-regression.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print('PASS: seven pixel-identical pages, identical visible text/geometry/colours/roles; 2694 visible characters correctly Norwegian.')
