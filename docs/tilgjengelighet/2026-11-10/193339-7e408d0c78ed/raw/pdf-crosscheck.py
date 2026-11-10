from pathlib import Path
from pypdf import PdfReader
from pypdf.generic import ContentStream
from collections import Counter
import json
r=PdfReader('public/vedlegg/mandatforslag-ai-enablement-team.pdf');root=r.trailer['/Root'];structure=root['/StructTreeRoot'];parenttree={}
def walktree(n):
 n=n.get_object()
 nums=n.get('/Nums',[])
 for i in range(0,len(nums),2):parenttree[int(nums[i])]=nums[i+1].get_object()
 for k in n.get('/Kids',[]):walktree(k)
walktree(structure['/ParentTree'])
def language(node):
 seen=set()
 while node:
  if hasattr(node,'idnum'):
   if node.idnum in seen:break
   seen.add(node.idnum)
  node=node.get_object()
  if '/Lang' in node:return str(node['/Lang'])
  node=node.get('/P')
 return str(root.get('/Lang'))
proof=[];inline=[]
for i,p in enumerate(r.pages,1):
 arr=parenttree[int(p['/StructParents'])]
 for mcid,n in enumerate(arr):
  if n is not None and hasattr(n.get_object(),'get'):
   proof.append({'page':i,'mcid':mcid,'language':language(n),'node_id':getattr(n,'idnum',None)})
 for operands,op in ContentStream(p.get_contents(),r).operations:
  if op==b'BDC' and len(operands)>1 and isinstance(operands[1],dict) and '/Lang' in operands[1]:inline.append({'page':i,'properties':str(operands[1])})
result={'method':'Independent reverse ParentTree lookup and /P language inheritance, plus direct page BDC language properties','parent_entries':proof,'inline_language_properties':inline}
Path('/private/tmp/portal-a11y-060/pdf-language-parenttree.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
old=json.loads(Path('/private/tmp/portal-a11y-060/pdf-language.json').read_text());lookup={(x['page'],x['mcid']):x['language'] for x in proof}
diff=[(p['page'],s['mcid'],s['language'],lookup.get((p['page'],s['mcid']))) for p in old['pages'] for s in p['spans'] if s['language']!=lookup.get((p['page'],s['mcid']))]
print('Disagreements:',diff);print('Inline language properties:',inline);print('ParentTree languages',Counter(x['language'] for x in proof))
assert not diff
