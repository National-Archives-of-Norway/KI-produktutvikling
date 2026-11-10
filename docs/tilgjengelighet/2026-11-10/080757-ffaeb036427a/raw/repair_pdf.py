"""Targeted PDF repair: tagged page-7 lists and page-5 text contrast."""
from pathlib import Path
import json,shutil,hashlib
from pypdf import PdfReader,PdfWriter
from pypdf.generic import DictionaryObject,NameObject,ArrayObject,TextStringObject,FloatObject

base=Path('/private/tmp/a11y-fix-3')
path=Path('public/vedlegg/mandatforslag-ai-enablement-team.pdf')
original=base/'original.pdf'
assert not original.exists(), 'Do not overwrite the original.'
shutil.copyfile(path,original)
r=PdfReader(original);w=PdfWriter(clone_from=r);w.pdf_header=r.pdf_header
slide=w.root_object['/StructTreeRoot']['/K'][6].get_object()
original_kids=list(slide['/K']);lookup={ref.idnum:ref for ref in original_kids}
page=w.pages[6].indirect_reference
# Label/body pairs verified against the visible square bullets and text positions.
groups=[('Kompetanse og erfaringsdeling',485,[(488,543),(491,546),(494,550),(566,510),(569,517),(572,527)]),
        ('Oppsett og guardrails',469,[(473,575),(476,579),(586,589)]),
        ('Retningslinjer og policy',503,[(507,554),(514,558),(524,562)])]
def node(role,parent):
 d=DictionaryObject({NameObject('/Type'):NameObject('/StructElem'),NameObject('/S'):NameObject(role),NameObject('/P'):parent,NameObject('/Pg'):page})
 return w._add_object(d)
removed=set();sections=[];actions=[]
for title,heading_id,items in groups:
 section=node('/Sect',slide.indirect_reference)
 heading=lookup[heading_id];heading.get_object()[NameObject('/P')]=section;removed.add(heading_id)
 listing=node('/L',section)
 listing.get_object()[NameObject('/A')]=DictionaryObject({NameObject('/O'):NameObject('/List'),NameObject('/ListNumbering'):NameObject('/Disc')})
 lis=[]
 for label_id,body_id in items:
  label,body=lookup[label_id],lookup[body_id]
  assert label.get_object()['/S']=='/Figure' and body.get_object()['/S']=='/Textbox'
  item=node('/LI',listing)
  label.get_object()[NameObject('/S')]=NameObject('/Lbl')
  label.get_object()[NameObject('/P')]=item
  label.get_object()[NameObject('/ActualText')]=TextStringObject('\u2022')
  label.get_object().pop(NameObject('/Alt'),None)
  body.get_object()[NameObject('/S')]=NameObject('/LBody')
  body.get_object()[NameObject('/P')]=item
  item.get_object()[NameObject('/K')]=ArrayObject([label,body])
  lis.append(item);removed.update([label_id,body_id])
 listing.get_object()[NameObject('/K')]=ArrayObject(lis)
 section.get_object()[NameObject('/K')]=ArrayObject([heading,listing])
 sections.append(section);actions.append({'section':title,'items':len(items),'label_body_source_ids':items})
# Keep visual decorations, then the page title, each logical focus area and the footer.
kept=[ref for ref in original_kids if ref.idnum not in removed and ref.idnum not in [460,534,540]]
slide[NameObject('/K')]=ArrayObject(kept+[lookup[460]]+sections+[lookup[534],lookup[540]])
assert len(removed)==27
# Content streams and MCID ownership remain untouched on page 7.
p5=w.pages[4];content=p5.get_contents();color_changes=[]
for index,(args,op) in enumerate(content.operations):
 values=[float(v) for v in args] if op in (b'g',b'rg') else []
 target=(op==b'g' and values==[0.847]) or (op==b'rg' and values==[0.365,0.416,0.4])
 if target:
  # These source colors must next paint text, not a graphical background.
  next_paint=next((oper for _,oper in content.operations[index+1:] if oper in (b'Tj',b'TJ',b"'",b'"',b'f',b'f*',b'F',b'S',b'B',b'B*',b'b',b'b*',b'Do')),None)
  assert next_paint in (b'Tj',b'TJ',b"'",b'"'),(index,next_paint)
  new=[FloatObject(1)]*(1 if op==b'g' else 3)
  content.operations[index]=(new,op)
  color_changes.append({'operation':index,'operator':op.decode(),'before':values,'after':[1]*len(new)})
assert color_changes
p5.replace_contents(content)
with path.open('wb') as f:w.write(f)
report={'source_sha256':hashlib.sha256(original.read_bytes()).hexdigest(),'output_sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'lists':actions,'color_changes':color_changes,'note':'Preserves original text, MCIDs, page geometry and prior heading/title fixes. Only page 5 content stream and page 7 structural hierarchy change.'}
(base/'repair-actions.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print({'lists':len(actions),'list_items':sum(x['items'] for x in actions),'color_operations_changed':len(color_changes),'bytes':path.stat().st_size})
