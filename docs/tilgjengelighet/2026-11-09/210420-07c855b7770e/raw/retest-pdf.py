"""Independent checks of repaired PDF structure, metadata, content and rendering."""
from pathlib import Path
from collections import Counter
import json, hashlib
from datetime import datetime
from PIL import Image, ImageChops, ImageDraw
from pypdf import PdfReader
import pdfplumber
BASE = Path(__file__).resolve().parent
before = PdfReader(BASE / 'mandatforslag-before.pdf')
file = Path.cwd() / 'public/vedlegg/mandatforslag-ai-enablement-team.pdf'
after = PdfReader(file)
assert len(before.pages) == len(after.pages) == 7
assert before.pdf_header == after.pdf_header == "%PDF-1.7"
expected_title = 'Mandatforslag – AI enablement-team i Nasjonalarkivet'
assert after.metadata.title == expected_title
assert after.xmp_metadata.dc_title == {'x-default': expected_title}
assert after.trailer['/Root']['/ViewerPreferences']['/DisplayDocTitle']
assert after.trailer['/Root']['/MarkInfo']['/Marked']
page_ids = {p.indirect_reference.idnum: i + 1 for i, p in enumerate(after.pages)}
with pdfplumber.open(file) as pdf:
    marked = []
    for page in pdf.pages:
        texts = {}
        for c in page.chars:
            if c.get('mcid') is not None:
                texts[c['mcid']] = texts.get(c['mcid'], '') + c['text']
        marked.append(texts)
headings = []
roles = Counter()
mcid_owners = {}
def walk(obj, page=None, owner=None):
    if hasattr(obj, 'get_object'):obj = obj.get_object()
    if isinstance(obj, list):return ''.join(walk(k, page, owner) for k in obj)
    if isinstance(obj, int):
        if page:
            mcid_owners[(page, obj)] = owner
            return marked[page - 1].get(obj, '')
        return ''
    if not isinstance(obj, dict):return ''
    if obj.get('/Pg'):page = page_ids[obj.raw_get('/Pg').idnum]
    role = obj.get('/S')
    if role:
        roles[role] += 1
        owner = obj.indirect_reference.idnum
    text = walk(obj.get('/K'), page, owner)
    if role in ['/H1', '/H2', '/H3']:
        headings.append({'page': page, 'role': role,
                         'text': str(obj.get('/ActualText') or text).strip()})
    return text
walk(after.trailer['/Root']['/StructTreeRoot'])
expected_primary = [
'Mål og rammer for AI enablement-team', 'Formalia', 'Veier mot målet',
'Sånn skal vi jobbe', 'Dette skal vi ikke gjøre', 'Grensesnitt og samarbeid',
'Forslag til bidrag per fokusområde']
for n, text in enumerate(expected_primary, 1):
    matches = [h for h in headings if h['page'] == n and h['role'] in ['/H1', '/H2']]
    assert len(matches) == 1 and matches[0]['text'] == text, matches
assert roles['/H1'] == 1 and roles['/H2'] == 6 and roles['/H3'] == 20
# Check marked content ownership through the PDF ParentTree, not just heading counts.
parents = {}
def number_tree(obj):
    obj = obj.get_object()
    if '/Nums' in obj:
        values = obj['/Nums']
        for i in range(0, len(values), 2):parents[int(values[i])] = values[i + 1].get_object()
    for kid in obj.get('/Kids', []):number_tree(kid)
number_tree(after.trailer['/Root']['/StructTreeRoot']['/ParentTree'])
for (page, mcid), owner in mcid_owners.items():
    key = after.pages[page - 1]['/StructParents']
    assert parents[key][mcid].idnum == owner, (page, mcid, owner)
results=[]
canvas=Image.new('RGB',(1100,7*645),'#ccc')
for n,(old,new) in enumerate(zip(before.pages,after.pages),1):
    unchanged_stream = old.get_contents().get_data() == new.get_contents().get_data()
    unchanged_text = old.extract_text() == new.extract_text()
    assert unchanged_stream and unchanged_text
    a=Image.open(f'/private/tmp/ki-pdf-retest/before-{n}.png').convert('RGB')
    b=Image.open(f'/private/tmp/ki-pdf-retest/after-{n}.png').convert('RGB')
    diff = ImageChops.difference(a,b).getbbox()
    assert diff is None, (n,diff)
    canvas.paste(b,(0,(n-1)*645+25));ImageDraw.Draw(canvas).text((10,(n-1)*645+5),f'PDF side {n}',fill='black')
    results.append({'page':n,'content_stream_identical':unchanged_stream,
                    'extracted_text_identical':unchanged_text,'rendered_pixels_identical':True})
canvas.save(BASE.parent/'screenshots/pdf-retested-all-pages.png')
result={'tested_at':datetime.now().astimezone().isoformat(),'file':str(file),
 'before_sha256':hashlib.sha256((BASE/'mandatforslag-before.pdf').read_bytes()).hexdigest(),
 'after_sha256':hashlib.sha256(file.read_bytes()).hexdigest(),
 'title':after.metadata.title,'xmp_title':after.xmp_metadata.dc_title,
 'display_document_title':True,'tag_counts':dict(roles),'headings':headings,
 'parent_tree_mcid_mappings_verified':len(mcid_owners),'pages':results,
 'result':'All selected structural, metadata and preservation assertions passed',
 'limits':['No actual screen-reader navigation','No full PDF/UA validation','Other PDF semantics and alternatives not fully tested']}
(BASE/'pdf-retest.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'pages':7,'headings':len(headings),'parent_tree_mappings':len(mcid_owners),'visual_difference':False,'result':'passed'},ensure_ascii=False))
