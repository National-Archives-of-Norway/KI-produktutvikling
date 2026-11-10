from pathlib import Path
import json,hashlib,math,collections
import pdfplumber
from pypdf import PdfReader
from PIL import Image
pdf=Path('public/vedlegg/mandatforslag-ai-enablement-team.pdf');out=Path('/private/tmp/contrast-states-pdf')
def rgb(v):
 if isinstance(v,(float,int)):return [float(v)]*3
 if len(v)==1:return list(v)*3
 assert len(v)==3,v
 return list(v)
def lum(c):return sum((v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4)*w for v,w in zip(c,[.2126,.7152,.0722]))
def contrast(a,b):return (max(lum(a),lum(b))+.05)/(min(lum(a),lum(b))+.05)
def contains(s,c):
 if not (s['x0']<=c['x0']<=c['x1']<=s['x1'] and s['top']<=c['top']<=c['bottom']<=s['bottom']):return False
 if s['object_type']=='curve':
  cx=(s['x0']+s['x1'])/2;cy=(s['top']+s['bottom'])/2;rx=s['width']/2;ry=s['height']/2
  return all(((x-cx)/rx)**2+((y-cy)/ry)**2<=1 for x in [c['x0'],c['x1']] for y in [c['top'],c['bottom']])
 return True
results=[];summary=[]
with pdfplumber.open(pdf) as d:
 for p in d.pages:
  im=Image.open(out/f'page-{p.page_number}.png').convert('RGB');sx=im.width/p.width;sy=im.height/p.height
  shapes=[s for s in p.rects if s.get('fill')]+[s for s in p.curves if s.get('fill') and p.page_number==6 and s['width']>150 and s['height']>45]
  for c in p.chars:
   if not c['text'].strip():continue
   candidates=[s for s in shapes if contains(s,c)]
   assert candidates,(p.page_number,c['text'],c['x0'],c['top'])
   bg=min(candidates,key=lambda x:x['width']*x['height']);fg=rgb(c['non_stroking_color']);back=rgb(bg['non_stroking_color']);ratio=contrast(fg,back)
   # Require rendered background colour close to source fill to actually occur
   # in the glyph bounding box expanded by two raster pixels. Antialias colours
   # are never treated as the intended text foreground.
   box=(max(0,int(c['x0']*sx)-2),max(0,int(c['top']*sy)-2),min(im.width,math.ceil(c['x1']*sx)+2),min(im.height,math.ceil(c['bottom']*sy)+2))
   pixels=list(im.crop(box).getdata());expected=[round(v*255) for v in back]
   bgseen=any(max(abs(v-e) for v,e in zip(px,expected))<=2 for px in pixels)
   results.append({'page':p.page_number,'text':c['text'],'bbox':[c['x0'],c['top'],c['x1'],c['bottom']],'font':c['fontname'],'size_pt':c['size'],'foreground':fg,'background':back,'background_shape':{'type':bg['object_type'],'bbox':[bg['x0'],bg['top'],bg['x1'],bg['bottom']]},'rendered_fill_observed_near_glyph':bgseen,'ratio':ratio,'required':4.5,'below_4_5':ratio<4.5})
  rows=[r for r in results if r['page']==p.page_number];summary.append({'page':p.page_number,'nonspace_characters':len(rows),'minimum_ratio':min(r['ratio'] for r in rows),'below_4_5':sum(r['below_4_5'] for r in rows),'render_fill_missing':sum(not r['rendered_fill_observed_near_glyph'] for r in rows)})
reader=PdfReader(pdf);ext=[]
for i,p in enumerate(reader.pages,1):
 for name,obj in p.get('/Resources',{}).get('/ExtGState',{}).items():
  obj=obj.get_object();ext.append({'page':i,'name':str(name),'state':str(obj)});assert float(obj.get('/ca',1))==float(obj.get('/CA',1))==1,obj
j={'sha256':hashlib.sha256(pdf.read_bytes()).hexdigest(),'pages':summary,'minimum_ratio':min(r['ratio'] for r in results),'nonspace_characters':len(results),'alpha_states':ext,'method':'Source glyph fills against smallest containing filled rectangular background or verified page-6 ellipse, all corners inside. Diagram curves classified visually. Rendered background RGB must occur within two pixels of glyph box (tolerance 2/255). All text conservatively tested at 4.5, without large-text exception. No images in PDF.','limitations':'Not PDF/UA, screen reader, semantic or reading-order validation. Decorative outlines considered separately.','results':results}
(out/'pdf-text-contrast.json').write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n');print(json.dumps({k:v for k,v in j.items() if k not in ['results','alpha_states']},ensure_ascii=False,indent=2))
