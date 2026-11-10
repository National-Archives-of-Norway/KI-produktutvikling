import json,sys,runpy
from pathlib import Path
# Import the versioned calculator without executing its CLI section.
s=Path('/private/tmp/contrast-states-pdf/interactive_bounds.py').read_text();ns={};exec(s[:s.index('rows=[]')],ns)
raw=json.load(open('/private/tmp/contrast-interactive-states.json'));cal=json.load(open('/private/tmp/contrast-states-pdf/interactive-contrast.json'));assert sum(len(g['rows'])for g in raw)==len(cal['results'])
rows=[];pos=0
for g in raw:
 for n in g['rows']:
  r=cal['results'][pos];pos+=1
  if n['disabled'] or not any('MuiButton-root' in str(a['cls']) for a in n['chain']):continue
  color=ns['colors'](next(a['color'] for a in n['chain'] if 'MuiButton-root' in str(a['cls'])))[0]
  assert color[3]==1
  lo,hi=ns['paint'](r['background_lower_bound'],r['background_upper_bound'],[(*color[:3],0),(*color[:3],.3)])
  value=ns['ratio'](r['foreground'][:3],lo,hi)
  rows.append({'state':g['name'],'text':n['text'],'ratio_bound_with_0_to_0_3_ripple':value})
result={'method':'Conservative currentColor ripple covering entire text background at every alpha from 0 to .3, source maximum in installed MUI TouchRipple. Text foreground unchanged. Analytical guard, not observation of held mouse-down.','source':'node_modules/@mui/material/ButtonBase/TouchRipple.mjs','rows':len(rows),'minimum_bound':min(r['ratio_bound_with_0_to_0_3_ripple']for r in rows),'below_4_5':[r for r in rows if r['ratio_bound_with_0_to_0_3_ripple']<4.5],'results':rows};Path('/private/tmp/contrast-states-pdf/ripple-contrast.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print({k:v for k,v in result.items()if k!='results'})
