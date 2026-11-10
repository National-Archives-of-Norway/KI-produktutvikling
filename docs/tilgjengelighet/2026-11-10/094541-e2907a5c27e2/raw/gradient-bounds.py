import json,re,itertools
from pathlib import Path
root=Path('/Users/khadah/Documents/ChatGPT/KI-utvikling/docs/tilgjengelighet/2026-11-10/094541-e2907a5c27e2/raw')
def colors(s):
 out=[]
 for m in re.finditer(r'rgba?\(([^)]+)\)|color\(srgb ([^)]+)\)',s):
  if m[1]:
   x=[float(z) for z in re.findall(r'[\d.]+',m[1])];out.append(tuple([c/255 for c in x[:3]]+[x[3] if len(x)>3 else 1]))
  else:
   x=[float(z) for z in re.findall(r'[\d.]+',m[2])];out.append(tuple(x[:3]+[x[3] if len(x)>3 else 1]))
 return out

def split(s):
 out=[];start=depth=0
 for i,c in enumerate(s):
  if c=='(':depth+=1
  if c==')':depth-=1
  if c==',' and depth==0:out.append(s[start:i]);start=i+1
 out.append(s[start:]);return out

def paint(lo,hi,cs):
 vals=[[c[i]*c[3]+b*(1-c[3]) for c in cs for b in [lo[i],hi[i]]]for i in range(3)]
 return [min(v) for v in vals],[max(v) for v in vals]

def bg(lo,hi,a):
 lo,hi=paint(lo,hi,colors(a['bg']))
 for layer in reversed(split(a['image'])):
  if layer.strip()=='none':continue
  cs=colors(layer);assert cs,layer
  lo,hi=paint(lo,hi,cs)
 return lo,hi

def lum(c):
 x=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in c]
 return sum(a*b for a,b in zip(x,[.2126,.7152,.0722]))
rows=[]
for group in json.loads((root/'gradient-matched-styles.json').read_text()):
 for n in group['nodes']:
  assert n['matchCount']==1,n['selector']
  lo=hi=[0.,0.,0.];excluded=[]
  for a in reversed(n['chain']):
   assert a['opacity']=='1' and a['mix']=='normal'
   lo,hi=bg(lo,hi,a)
   for q in a['pseudos']:
    if q['content'] in ['none','normal']:continue
    if 'resource-card' in a['cls']:
     excluded.append('resource-card::before: 1 px top border; requires geometry check, not a text background')
     continue
    lo,hi=bg(lo,hi,q)
  f=colors(n['chain'][0]['color'])[0];assert f[3]==1
  lf=lum(f[:3]);l0,l1=lum(lo),lum(hi)
  ratio=1 if l0<=lf<=l1 else min((max(lf,b)+.05)/(min(lf,b)+.05)for b in [l0,l1])
  rows.append({'route':group['route'],'target':n['original'],'mapped_selector':n['selector'],'text':n.get('text'),'minimum_bound_ratio':ratio,'passes_even_normal_text_4_5':ratio>=4.5,'foreground':f[:3],'background_lower':lo,'background_upper':hi,'excluded_pseudo':excluded})
out={'method':'Conservative per-channel sRGB bounds, each layer alpha-composited over ancestor background; all gradient stop bounds, both hero grid layers at full opacity, ignores spatial masks (overestimates bright grid). No pixel/rendered-hover proof, no arbitrary sibling overlap or shadows model. Card 1px top line excluded subject to separate geometry evidence. Existing axe raw unchanged.','nodes':len(rows),'minimum_ratio':min(r['minimum_bound_ratio']for r in rows),'results':rows}
(root/'gradient-bounds.json').write_text(json.dumps(out,indent=2));print(json.dumps({'nodes':len(rows),'minimum_ratio':out['minimum_ratio'],'below_4_5':[r for r in rows if not r['passes_even_normal_text_4_5']]},indent=2))
