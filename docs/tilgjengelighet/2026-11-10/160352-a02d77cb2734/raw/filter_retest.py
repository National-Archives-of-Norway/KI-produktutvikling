from pathlib import Path
import json
from color_math import colors,lum
root=Path(__file__).resolve().parent
# Recorded catalogue-gradient sRGB endpoints from the actual computed chain.
backgrounds=[[9/255,21/255,27/255],[.0903922,.170196,.186667]]
def contrast(a,b):return (max(lum(a),lum(b))+.05)/(min(lum(a),lum(b))+.05)
before=[]
for x in json.loads((root/'filter-transition-before.json').read_text()):
 f=colors(x['background'])[0];text=colors(x['color'])[0]
 pairs=[([f[i]*f[3]+b[i]*(1-f[3])for i in range(3)],b)for b in backgrounds]
 before.append(x|{'fill_ratio_min':min(contrast(fill,b)for fill,b in pairs),'text_ratio_min':min(contrast(text[:3],fill)for fill,b in pairs)})
after=[]
for x in json.loads((root/'filter-after-fix.json').read_text()):
 f=colors(x['background'])[0];text=colors(x['color'])[0]
 pairs=[([f[i]*f[3]+b[i]*(1-f[3])for i in range(3)],b)for b in backgrounds]
 fill=min(contrast(a,b)for a,b in pairs);txt=min(contrast(text[:3],a)for a,b in pairs)
 assert fill>=3 and txt>=4.5 and x['pressedCount']==1,x
 after.append(x|{'fill_ratio_min':fill,'text_ratio_min':txt})
out={'baseline_note':'Colour/alpha transition on selected filter is an actual computed sequence with rendered screenshots, not simulated hover. Adjacent catalogue gradient endpoints measured in browser-states.','before':before,'after':after,'retests':len(after),'all_after_pass':True,'min_after_fill_ratio':min(x['fill_ratio_min']for x in after),'min_after_text_ratio':min(x['text_ratio_min']for x in after)}
(root/'filter-retest-results.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print({k:v for k,v in out.items()if k not in ['before','after']});print('before ratios',[(x['fill_ratio_min'],x['text_ratio_min'])for x in before])
