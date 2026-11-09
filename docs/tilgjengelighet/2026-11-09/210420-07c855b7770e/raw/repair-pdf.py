"""Targeted repair of the archived PDF; preserves page content streams and MCIDs.
Run with the bundled Python runtime (pypdf 6.10.0 and pdfplumber 0.11.9).
"""
from pathlib import Path
import json
import pdfplumber
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject

BASE = Path(__file__).resolve().parent
SOURCE = BASE / 'mandatforslag-before.pdf'
DESTINATION = Path.cwd() / 'public/vedlegg/mandatforslag-ai-enablement-team.pdf'
TITLE = 'Mandatforslag – AI enablement-team i Nasjonalarkivet'
# Visually checked titles and subheadings. Diagram node labels are not headings.
HEADINGS = {
    1: [('Mål og rammer forAI enablement-team', '/H1')],
    2: [('Formalia', '/H2'), ('Eierskap:', '/H3'), ('Deltakere:', '/H3'),
        ('Kapasitet:', '/H3'), ('Avgrensning:', '/H3')],
    3: [('Veier mot målet', '/H2'), ('Kompetanse og erfaringsdeling', '/H3'),
        ('Oppsett og guardrails', '/H3'), ('Retningslinjer og policy', '/H3')],
    4: [('Sånn skal vi jobbe', '/H2'), ('Undersøke praksis', '/H3'),
        ('Utforske muligheter', '/H3'), ('Skape arenaer for deling', '/H3'),
        ('Gi anbefalinger og råd', '/H3'), ('Tilrettelegge, ikke utføre', '/H3')],
    5: [('Dette skal vi ikke gjøre', '/H2'), ('Avgjøre enkeltsaker', '/H3'),
        ('Bestemme policy', '/H3'), ('Være førstelinje-support', '/H3'),
        ('Være NAV for KI i NA', '/H3'), ('Påtvinge KI', '/H3')],
    6: [('Grensesnitt og samarbeid', '/H2')],
    7: [('Forslag til bidrag per fokusområde', '/H2'),
        ('Kompetanse og erfaringsdeling', '/H3'), ('Oppsett og guardrails', '/H3'),
        ('Retningslinjer og policy', '/H3')],
}

def normalize(text):
    return ' '.join(text.split())

reader = PdfReader(SOURCE)
writer = PdfWriter(clone_from=reader)
writer.pdf_header = reader.pdf_header
page_ids = {p.indirect_reference.idnum: i + 1 for i, p in enumerate(writer.pages)}
with pdfplumber.open(SOURCE) as pdf:
    marked_text = []
    for page in pdf.pages:
        text = {}
        for char in page.chars:
            mcid = char.get('mcid')
            if mcid is not None:
                text[mcid] = text.get(mcid, '') + char['text']
        marked_text.append(text)

nodes = []
def visit(obj, page=None):
    if hasattr(obj, 'get_object'):
        obj = obj.get_object()
    if isinstance(obj, list):
        return ''.join(visit(child, page) for child in obj)
    if isinstance(obj, int):
        return marked_text[page - 1].get(obj, '') if page else ''
    if not isinstance(obj, dict):
        return ''
    ref = obj.get('/Pg')
    if ref:
        page = page_ids.get(ref.idnum, page)
    text = visit(obj.get('/K'), page)
    if obj.get('/S'):
        nodes.append((page, normalize(text), obj))
    return text

visit(writer.root_object['/StructTreeRoot'])
changes = []
for page, headings in HEADINGS.items():
    for text, role in headings:
        # Choose the actual P for a single-paragraph heading; page 1 has two P's.
        old_role = '/Textbox' if page == 1 else '/P'
        matches = [node for p, t, node in nodes
                   if p == page and t == text and node.get('/S') == old_role]
        assert len(matches) == 1, (page, text, len(matches))
        node = matches[0]
        node[NameObject('/S')] = NameObject(role)
        if page == 1:
            # The title spans two visual lines, but represents one logical heading.
            # Keep MCID-bearing spans and ParentTree associations unchanged.
            for child in node['/K']:
                paragraph = child.get_object()
                assert paragraph['/S'] == '/P'
                paragraph[NameObject('/S')] = NameObject('/Span')
            node[NameObject('/ActualText')] = TextStringObject(
                'Mål og rammer for AI enablement-team')
        changes.append({'page': page, 'text': text, 'before': old_role, 'after': role})

writer.add_metadata({'/Title': TITLE})
# Update the existing namespace-scoped dc:title in place. The pypdf 6.10.0
# property setter introduced an unbound dc prefix with this source's XMP layout.
from xml.dom.minidom import parseString
metadata = writer.root_object['/Metadata']
xml = parseString(metadata.get_data())
titles = xml.getElementsByTagNameNS('http://purl.org/dc/elements/1.1/', 'title')
assert len(titles) == 1
entries = titles[0].getElementsByTagNameNS(
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#', 'li')
assert len(entries) == 1
entries[0].firstChild.data = TITLE
metadata.set_data(xml.toxml(encoding='utf-8'))
# Already true in the source; explicitly preserve title display.
assert writer.root_object['/ViewerPreferences']['/DisplayDocTitle']
assert len(changes) == 27
with DESTINATION.open('wb') as output:
    writer.write(output)
(BASE / 'repair-actions.json').write_text(json.dumps(
    {'title': TITLE, 'headings': changes, 'page_stream_changes': False,
     'method': 'Retag existing semantic nodes; preserve content MCIDs and page streams'},
    ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'output': str(DESTINATION), 'headings_retagged': len(changes)}, ensure_ascii=False))
