from pathlib import Path
import json
from color_math import colors,bg,paint,lum
root=Path(__file__).resolve().parent
samples=json.loads((root/'browser-states.json').read_text());rows=[]
def back(chain):
 lo=hi=[0.,0.,0.]
 for a in reversed(chain):
  assert a['opacity']=='1' and a['mix']=='normal' and a['filter']=='none',a
  lo,hi=bg(lo,hi,a)
  for p in a.get('pseudos',[]):
   if p['content'] in ['normal','none']:continue
   if 'resource-card' in a['cls']:continue # documented 1px top decoration; not around focus link
   assert p['opacity']=='1';lo,hi=bg(lo,hi,p)
 return lo,hi
for sample in samples:
 for item in sample['measurements']:
  lo,hi=back(item['chain'])
  if item['kind']=='illustration-control-frame' or 'animasjonen i forsideillustrasjonen' in item['name']:
   # Conservative full-area halo/radial, though both fade spatially before edge.
   for alpha in [.07,.11]:lo,hi=paint(lo,hi,[(157/255,241/255,173/255,0),(157/255,241/255,173/255,alpha)])
  f=colors(item['fg']);assert len(f)==1,item['fg'];f=f[0]
  underlo,underhi=lo,hi
  if item['kind']=='field-outer-border':
   inner=next(x for x in sample['measurements'] if x['kind']=='field-inner-border' and x['name']==item['name'])
   underlo,underhi=back(inner['chain'])
  flo=[f[i]*f[3]+underlo[i]*(1-f[3])for i in range(3)];fhi=[f[i]*f[3]+underhi[i]*(1-f[3])for i in range(3)]
  lo=[max(0,x-1/255)for x in lo];hi=[min(1,x+1/255)for x in hi]
  lf0,lf1,lb0,lb1=map(lum,[flo,fhi,lo,hi])
  ratio=(lf0+.05)/(lb1+.05) if lf0>lb1 else (lb0+.05)/(lf1+.05) if lf1<lb0 else 1
  rows.append({'state':sample['name'],'kind':item['kind'],'control':item['name'],'foreground_source':item['fg'],'background_lower':lo,'background_upper':hi,'composited_foreground_lower':flo,'composited_foreground_upper':fhi,'ratio_lower_bound':ratio,'threshold':3,'below_3':ratio<3,'hover':item['hover'],'focus':item['focusVisible'],'disabled':item['disabled']})
out={'states':len(samples),'measurements':len(rows),'minimum_bound':min(x['ratio_lower_bound']for x in rows),'below_3':[x for x in rows if x['below_3'] and not x['disabled']],'method':'Actual computed state colours; sRGB/alpha gradient envelopes, one byte background rounding margin. Border alpha painted on input inner background then compared also to outer surround. Focus outline measured outside element. Hero frame includes full .07 and .11 halo bounds.','results':rows}
(root/'ui-results.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print({k:v for k,v in out.items()if k!='results'})
