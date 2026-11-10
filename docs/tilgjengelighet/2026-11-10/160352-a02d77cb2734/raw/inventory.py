from html.parser import HTMLParser
from pathlib import Path
import json,hashlib,collections
class Inventory(HTMLParser):
 def __init__(self):super().__init__();self.counts=collections.Counter();self.svgs=[];self.svg=None;self.depth=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag in ['img','canvas','svg','input','select','textarea','button','summary']:self.counts[tag]+=1
  if tag=='svg':self.svg={'class':a.get('class'),'viewBox':a.get('viewBox',a.get('viewbox')),'label':a.get('aria-label'),'paths':[]};self.depth=1
  elif self.svg is not None:
   if tag=='path':self.svg['paths'].append(a.get('d',''))
 def handle_endtag(self,tag):
  if tag=='svg' and self.svg is not None:
   self.svg['hash']=hashlib.sha256('\n'.join(self.svg['paths']).encode()).hexdigest();self.svgs.append(self.svg);self.svg=None
pages=[];groups={}
for p in sorted(Path('out').rglob('*.html')):
 parser=Inventory();parser.feed(p.read_text());pages.append({'file':str(p),'counts':dict(parser.counts)})
 for svg in parser.svgs:
  h=svg['hash'];groups.setdefault(h,svg|{'pages':[]});groups[h]['pages'].append(str(p))
j={'html_files':len(pages),'pages':pages,'distinct_svg_shapes':list(groups.values()),'note':'Markup inventory, not browser/conformance testing. CSS hero rings/lines and native summary markers classified separately.'};Path('/private/tmp/nontext-1411/html-inventory.json').write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n');print('html',len(pages),'SVG types',len(groups));print([(x['hash'][:10],x['class'],len(x['paths']),len(x['pages']))for x in groups.values()])
