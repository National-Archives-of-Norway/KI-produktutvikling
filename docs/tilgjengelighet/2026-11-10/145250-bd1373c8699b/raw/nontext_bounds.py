from pathlib import Path
import json
s=Path('/private/tmp/contrast-states-pdf/interactive_bounds.py').read_text();ns={};exec(s[:s.index('rows=[]')],ns)
rows=[]
for g in json.load(open('/private/tmp/contrast-states-pdf/nontext-states.json')):
 for n in g['rows']:
  scenarios=[('adjacent',n['chain'])]
  if n['kind']=='focus-outline':scenarios=[('outside with outline offset',n['chain'][1:])]
  elif n['kind']=='field-border':scenarios.append(('outer field surround',n['chain'][2:]))
  ratios=[]
  for label,chain in scenarios:
   lo=hi=[0.,0.,0.]
   for a in reversed(chain):lo,hi=ns['bg'](lo,hi,a)
   f=ns['colors'](n['chain'][0]['color'])[0]
   flo=[f[i]*f[3]+lo[i]*(1-f[3]) for i in range(3)];fhi=[f[i]*f[3]+hi[i]*(1-f[3]) for i in range(3)]
   if f[3]==1:ratio=ns['ratio'](f[:3],lo,hi)
   else:ratio=(ns['lum'](flo)+.05)/(ns['lum'](hi)+.05) if ns['lum'](flo)>ns['lum'](hi) else (ns['lum'](lo)+.05)/(ns['lum'](fhi)+.05) if ns['lum'](fhi)<ns['lum'](lo) else 1
   ratios.append({'side':label,'ratio':ratio})
  rows.append({'state':g['name'],'kind':n['kind'],'control':n['text'],'colour':n['chain'][0]['color'],'minimum_ratio':min(r['ratio'] for r in ratios),'scenarios':ratios})
j={'method':'Source border/icon/outline colours over actual computed background layers. Focus outline compared outside button due outline-offset; field border compared with both internal and outer background. No PDF semantic assessment.','results':rows,'measurements':len(rows),'minimum_ratio':min(r['minimum_ratio']for r in rows),'below_3':[r for r in rows if r['minimum_ratio']<3]};Path('/private/tmp/contrast-states-pdf/nontext-contrast.json').write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n');print({k:v for k,v in j.items()if k!='results'})
