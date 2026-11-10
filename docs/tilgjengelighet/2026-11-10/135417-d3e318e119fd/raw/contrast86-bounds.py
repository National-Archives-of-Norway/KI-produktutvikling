"""Focused conservative sRGB layer-bound review of the original 86 axe candidates.
Usage: python3 contrast86-bounds.py styles.json results.json
No browser execution or editing. Original axe results remain unchanged.
"""
import json,re,sys
from pathlib import Path

def colors(s):
 out=[]
 for m in re.finditer(r'rgba?\(([^)]+)\)|color\(srgb ([^)]+)\)',s):
  x=[float(z) for z in re.findall(r'[\d.]+',m[1] or m[2])]
  out.append(tuple(([c/255 for c in x[:3]] if m[1] else x[:3])+[x[3] if len(x)>3 else 1]))
 return out

def split(s):
 out=[];start=depth=0
 for i,c in enumerate(s):
  if c=='(':depth+=1
  if c==')':depth-=1
  if c==',' and depth==0:out.append(s[start:i]);start=i+1
 out.append(s[start:]);return out

def paint(lo,hi,cs):
 vals=[[c[i]*c[3]+b*(1-c[3]) for c in cs for b in [lo[i],hi[i]]] for i in range(3)]
 return [min(v) for v in vals],[max(v) for v in vals]

def bg(lo,hi,a):
 cs=colors(a['bg']);assert cs,a
 lo,hi=paint(lo,hi,cs)
 for layer in reversed(split(a['image'])):
  if layer.strip()=='none':continue
  cs=colors(layer);assert cs,layer
  # All stop colours and all alpha endpoints; ignores spatial masks/position.
  lo,hi=paint(lo,hi,cs)
 return lo,hi

def lum(c):
 return sum((v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4)*w for v,w in zip(c,[.2126,.7152,.0722]))

def ratio(f,lo,hi):
 lf,l0,l1=lum(f),lum(lo),lum(hi)
 return 1 if l0<=lf<=l1 else min((max(lf,b)+.05)/(min(lf,b)+.05) for b in [l0,l1])
assert ratio([1]*3,[0]*3,[0]*3)==21
assert ratio([0]*3,[1]*3,[1]*3)==21
assert paint([0]*3,[0]*3,[(1,1,1,.5)])==([.5]*3,[.5]*3)
rows=[]
for group in json.loads(Path(sys.argv[1]).read_text()):
 for n in group['nodes']:
  assert n['matchCount']==1,n
  lo=hi=[0.,0.,0.];exclusions=[];effects=[]
  for a in reversed(n['chain']):
   assert a['opacity']=='1' and a['mix']=='normal' and a['filter']=='none' and a['backdrop']=='none',a
   lo,hi=bg(lo,hi,a)
   for q in a['pseudos']:
    if q['content'] in ['none','normal']:continue
    assert q['opacity']=='1' and q['mix']=='normal' and q['filter']=='none',q
    if 'resource-card' in str(a['cls']):
     # Border line lies above the entire target box: no text overlap.
     assert q['position']=='absolute' and q['top']=='0px' and q['height']=='1px',q
     clearance=n['chain'][0]['rect']['y']-(a['rect']['y']+1)
     assert clearance>0,(n['original'],clearance)
     exclusions.append({'pseudo':'resource-card'+q['pseudo'],'text_box_clearance_px':clearance})
     continue
    lo,hi=bg(lo,hi,q)
   # Treat every ancestor text glow as fully opaque in spatial extent, but
   # retain its specified colour alpha: overestimates background brightness.
   if a['textShadow']!='none':
    for c in colors(a['textShadow']):lo,hi=paint(lo,hi,[c])
    effects.append(a['textShadow'])
  f=colors(n['chain'][0]['color'])[0];assert f[3]==1
  # Expand bounds by one full 8-bit step to cover serialized colour rounding.
  lo=[max(0,c-1/255) for c in lo];hi=[min(1,c+1/255) for c in hi]
  r=ratio(f[:3],lo,hi)
  rows.append({'route':group['route'],'original_target':n['original'],'text':n['text'],'font_size':n['fontSize'],'font_weight':n['fontWeight'],'foreground':f,'background_lower_bound':lo,'background_upper_bound':hi,'minimum_bound_ratio':r,'required_ratio':4.5,'assessment':'no_violation_in_measured_normal_state' if r>=4.5 else 'needs_manual_review','excluded_nonoverlapping_lines':exclusions,'text_glow_bounds':effects})
assert len(rows)==(int(sys.argv[3]) if len(sys.argv)>3 else 86)
out={'method':'Per-channel sRGB gradient-stop/alpha bounds of actual computed ancestor layers; includes hero grid pseudo at full mask coverage and text glow; opaque child backgrounds occlude prior layers. One byte rounding margin. Resource-card top line excluded only with recorded positive target-box clearance. All targets match original production selectors exactly.','limitations':'Bound model for measured normal state, not pixelwise colour sampling, actual native hover, arbitrary sibling overlap, PDF or full criterion approval. Visual review and source/geometry checks recorded separately.','nodes':len(rows),'minimum_bound_ratio':min(x['minimum_bound_ratio'] for x in rows),'below_4_5':sum(x['minimum_bound_ratio']<4.5 for x in rows),'results':rows}
Path(sys.argv[2]).write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items() if k!='results'},ensure_ascii=False,indent=2))
