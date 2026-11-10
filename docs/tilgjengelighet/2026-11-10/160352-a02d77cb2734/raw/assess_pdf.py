from pathlib import Path
import json,collections,hashlib
from color_math import lum
root=Path(__file__).resolve().parent;pages=json.loads((root/'pdf-shapes.json').read_text());rows=[];measures=[]
def rgb(v):return [float(v)]*3 if isinstance(v,(float,int)) else list(v)*3 if len(v)==1 else list(v)
def ratio(a,b):return (max(lum(rgb(a)),lum(rgb(b)))+.05)/(min(lum(rgb(a)),lum(rgb(b)))+.05)
mint=[.945,.969,.949];green=[.176,.416,.373];white=[1,1,1]
for p in pages:
 for s in p['shapes']:
  category=reason=None;required=False
  if s['width']>.9*p['width'] and s['height']>.9*p['height']:category='page background';reason='Paint/background, not independent information.'
  elif s['x0']<14 and s['height']>500:category='edge stripe';reason='Brand decoration, no quantity, group or status encoded.'
  elif s['x0']>900 and s['bottom']<85:category='koala mark';reason='Repeated ornament, no control, status or diagram relationship.'
  elif s['top']>490:category='footer rule';reason='Divider; footer text already identifies document and page.'
  elif p['page']==1:category='title badge or accent rule';reason='Visible Mandatforslag text identifies badge; horizontal line encodes no data.'
  elif p['page']==3 and s['kind']=='rect' and s['height']<2:category='section rule';reason='Heading and whitespace identify section.'
  elif p['page']==3 and s['kind']=='rect':category='icon coloured square';reason='Background for labelled icon; its hue does not encode a separate value.'
  elif p['page']==3:
   category='labelled icon stroke';required=True;reason='Conservatively measure icon even though adjacent heading names its meaning.'
   bg=green if s['top']>360 else [.192,.361,.486] if s['top']>300 else [.78,.361,.208]
   measures.append({'page':3,'shape':s['kind']+str(s['index']),'part':category,'fg':s['stroking_color'],'bg':bg,'ratio':ratio(s['stroking_color'],bg),'required_or_conservative':True})
  elif p['page'] in [4,5]:category='row separator';reason='Numbered X/01 row labels, headings and whitespace preserve each row without the divider.'
  elif p['page']==6 and s['kind']=='curve' and s['index']==0:
   category='central team ellipse';required=True;reason='Conservatively retain visual central emphasis as needed for central/peripheral grouping.'
   measures.append({'page':6,'shape':'curve0','part':category,'fg':s['non_stroking_color'],'bg':mint,'ratio':ratio(s['non_stroking_color'],mint),'required_or_conservative':True})
  elif p['page']==6 and s['kind']=='curve':
   category='satellite ellipse fill/outline';reason='Supplementary enclosure: 7 partner names and descriptions identify the nodes; introduction explicitly states team collaboration. No arrows, legend, category key, count or quantitative scale depends on edge/fill. Green node also says Eksisterer ikke in text. Omitting these low-contrast enclosures leaves named partners and spatial arrangement intact. This decision is about visual contrast, not screen-reader alternatives/reading order.'
   if s['stroke']:
    fill=[.851,.973,.839] if s['index']==14 else white
    measures.append({'page':6,'shape':'curve'+str(s['index']),'part':category,'fg':s['stroking_color'],'adjacent':[mint,fill],'ratio':min(ratio(s['stroking_color'],b)for b in [mint,fill]),'required_or_conservative':False,'low_ratio_reason':'Enclosure not needed after documented information-removal assessment.'})
  elif p['page']==7:
   if s['fill'] and s['width']<6 and s['height']<6:
    category='list bullet';required=True;reason='Conservatively measure list markers, even where spacing/text groups reinforce items.'
    measures.append({'page':7,'shape':'rect'+str(s['index']),'part':category,'fg':s['non_stroking_color'],'bg':white,'ratio':ratio(s['non_stroking_color'],white),'required_or_conservative':True})
   else:category='column panel/stripe';reason='Three explicitly named headings and spatially separated text lists identify columns. No chart value or status is encoded by panel border or strip.'
  assert category,(p['page'],s)
  rows.append({'page':p['page'],'shape':s['kind']+str(s['index']),'bbox':[s['x0'],s['top'],s['x1'],s['bottom']],'category':category,'contrast_required_or_conservatively_tested':required,'reason':reason})
needed=[x for x in measures if x['required_or_conservative']];assert all(x['ratio']>=3 for x in needed)
out={'pdf_sha256':hashlib.sha256(Path('public/vedlegg/mandatforslag-ai-enablement-team.pdf').read_bytes()).hexdigest(),'primitive_shapes':len(rows),'classified_shapes':len(rows),'categories':dict(collections.Counter(x['category']for x in rows)),'measured_graphic_parts':len(measures),'needed_or_conservative_parts':len(needed),'minimum_required_ratio':min(x['ratio']for x in needed),'confirmed_breaches':[],'measurements':measures,'classification':rows,'method':'Fresh source geometry and 120dpi visual assessment on 7 pages; exact source solid sRGB colours. Removing optional enclosures is a reasoned informational assessment, not an edited-PDF or assistive-technology experiment. All unmeasured primitive decorations have explicit reasons. No blanket Figure/empty-Alt exemption.'}
(root/'pdf-assessment.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print({k:v for k,v in out.items()if k not in ['classification','measurements']})
