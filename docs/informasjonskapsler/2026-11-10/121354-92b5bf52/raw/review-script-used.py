"""Metadata-only local source/HTTP review. No browser driver or consent decisions."""
import argparse
from datetime import datetime
from zoneinfo import ZoneInfo
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit
from urllib.request import Request, build_opener, HTTPRedirectHandler
from urllib.error import HTTPError, URLError
import hashlib, json, re, uuid

VERSION = '0.1.0'
PATTERNS = {'cookie': r'\bdocument\.cookie\b|\bSet-Cookie\b|\bcookieStore\b',
            'storage': r'\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b|\bcaches\.(?:open|keys)\b',
            'tracking': r'\bsendBeacon\b|\b(?:gtag|analytics|matomo|plausible|siteimprove)\b',
            'integration': r'<iframe\b|<script\b|next/script|\bfetch\s*\('}

def write(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')

def validate_routes(routes):
    if not isinstance(routes,list) or not routes or len(routes)>250: raise ValueError('Expected 1–250 same-origin route paths.')
    for r in routes:
        if not isinstance(r,str) or not r.startswith('/') or r.startswith('//') or any(x in r for x in ['?', '#', '\\', '\r', '\n']) or '..' in r.split('/') or urlsplit(r).netloc:
            raise ValueError('Unsafe route path.')
    return list(dict.fromkeys(routes))

def origin(base):
    u=urlsplit(base)
    if u.scheme not in ['http','https'] or not u.netloc or u.username or u.password or u.query or u.fragment or u.path not in ['', '/']:
        raise ValueError('URL must be an HTTP(S) origin without credentials, path, query or fragment.')
    return urlunsplit((u.scheme,u.netloc,'','',''))

def cookie_metadata(header):
    # Never serialize or return the value in the first name=value field.
    fields=header.split(';');name=fields[0].split('=',1)[0].strip()
    if not re.fullmatch(r'[A-Za-z0-9_!#$%&\x27*+.^`|~-]{1,128}',name): return {'name':'[redacted-invalid-name]'}
    item={'name':name,'value_collected':False}
    for part in fields[1:]:
        key,_,value=part.strip().partition('=');key=key.lower()
        if key in ['secure','httponly']:item[key]=True
        elif key in ['domain','path','max-age','expires','samesite']:item[key]=value[:200]
    return item

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl): return None

def scan_http(base,routes):
    base=origin(base);opener=build_opener(NoRedirect());rows=[]
    for route in validate_routes(routes):
        url=base+route
        try:
            try: response=opener.open(Request(url,headers={'User-Agent':'CookieMetadataReview/0.1.0'}),timeout=15)
            except HTTPError as e:response=e
            with response:
                rows.append({'url':url,'status':response.code,'set_cookies':[cookie_metadata(h)for h in response.headers.get_all('Set-Cookie',[])], 'redirect_followed':False})
        except (URLError,OSError,ValueError):rows.append({'url':url,'status':None,'error':'HTTP request failed; no headers/body retained.'})
    return rows

def scan_source(root):
    files=[]
    for folder in ['src','app','pages','components','scripts']:
        path=root/folder
        if path.is_dir():files.extend(p for p in path.rglob('*')if p.is_file()and p.suffix in ['.ts','.tsx','.js','.jsx','.mjs','.html']and not p.is_symlink()and 'node_modules'not in p.parts)
    files.extend(p for p in root.glob('next.config.*')if p.is_file()and not p.is_symlink())
    rows=[];checked=[]
    for p in sorted(set(files)):
        if not p.resolve().is_relative_to(root.resolve())or p.stat().st_size>2_000_000:continue
        text=p.read_text(encoding='utf-8',errors='replace');checked.append({'file':str(p.relative_to(root)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
        for n,line in enumerate(text.splitlines(),1):
            for kind,pattern in PATTERNS.items():
                if re.search(pattern,line,re.I):rows.append({'file':str(p.relative_to(root)),'line':n,'indicator':kind})
    return {'checked_files':checked,'indicators':rows,'limitations':['Indicators are not confirmed runtime behavior.','Dependencies, backend infrastructure and secrets are not scanned.','Source lines and values are not retained.']}

def load_browser(path):
    x=json.loads(Path(path).read_text(encoding='utf-8'))
    if not isinstance(x,dict)or set(x)!={'observations'}or not isinstance(x['observations'],list):raise ValueError('Expected metadata observations.')
    allowed={'observed_at','url','phase','storage','blocked','resources','scriptOrigins','iframeOrigins','limitations'}
    for o in x['observations']:
        if not isinstance(o,dict)or set(o)-allowed or not {'observed_at','url','phase','storage'}.issubset(o):raise ValueError('Unknown/missing metadata fields; do not supply values or raw logs.')
        u=urlsplit(o['url'])
        if u.scheme not in ['http','https']or not u.netloc or u.query or u.fragment or u.username or u.password:raise ValueError('Browser URL must be redacted.')
        for item in o['storage']:
            if set(item)!={'type','name'}or not all(isinstance(v,str)for v in item.values()):raise ValueError('Storage must contain type/name only.')
        for item in o.get('resources',[]):
            if set(item)!={'origin','pathname','initiatorType'}or not all(isinstance(v,str)for v in item.values()):raise ValueError('Resource metadata only.')
            if '?'in item['pathname']or '#'in item['pathname']:raise ValueError('Resource paths must be redacted.')
    return x

def review(project,base=None,routes=None,browser=None,agent='Codex (OpenAI)'):
    project=Path(project).resolve()
    if not project.is_dir():raise ValueError('Project directory does not exist.')
    if base:origin(base)
    routes=validate_routes(routes or ['/'])
    browser_data=load_browser(browser)if browser else None
    now=datetime.now(ZoneInfo('Europe/Oslo'));parent=project/'docs/informasjonskapsler'
    if not parent.resolve().is_relative_to(project) or parent.is_symlink()or (parent/'latest.json').is_symlink():raise ValueError('Output path must not be a symlink.')
    run=parent/now.strftime('%Y-%m-%d')/(now.strftime('%H%M%S')+'-'+uuid.uuid4().hex[:8])
    if not run.resolve().is_relative_to(project):raise ValueError('Output must remain in target project.')
    run.mkdir(parents=True)
    if not run.resolve().is_relative_to(project):raise ValueError('Output must remain in target project.')
    raw=run/'raw';raw.mkdir();sources=scan_source(project);write(raw/'source.json',sources)
    http=scan_http(base,routes)if base else [];write(raw/'http.json',http)
    if browser_data:write(raw/'browser.json',browser_data)
    missing=[]
    if not base:missing.append('HTTP runtime not supplied')
    if not browser_data:missing.append('Browser storage/requests not supplied')
    if any(x.get('error')for x in http):missing.append('Some HTTP requests failed')
    manifest={'skill':'informasjonskapsler-og-samtykke','version':VERSION,'started_at':now.isoformat(),'agent':agent,'base_url':base,'routes':routes,'status':'partial'if missing else'metadata_collected','missing':missing,'legal_conclusion':'not_assessed','run_directory':str(run.relative_to(project))}
    write(run/'manifest.json',manifest)
    write(run/'inventar.json',{'items':[],'note':'Fill assessed metadata, purpose, supplier, activation, retention, necessity basis, status and evidence. No automatic classification.'})
    write(run/'bannerbeslutning.json',{'status':'uavklart','scope':base,'reason':'Agent assessment required after reading original evidence.','implementation_authorized':False,'evidence':['raw/source.json','raw/http.json']+(['raw/browser.json']if browser_data else[]),'remaining':missing})
    (run/'rapport.md').write_text('# Kartlegging av informasjonskapsler og samtykke\n\nTekniske metadata er samlet; agenten må vurdere formål, varighet, samtykkebehov og rest. Se manifest.json, inventar.json og bannerbeslutning.json. Ingen juridisk godkjenning eller faktisk samtykke er gitt av denne kjøringen.\n',encoding='utf-8')
    write(parent/'latest.json',{'run_directory':str(run.relative_to(project)),'technical_status':manifest['status'],'decision':'uavklart'})
    return run,2 if missing else 0

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--project-root',required=True);p.add_argument('--url');p.add_argument('--routes-file');p.add_argument('--browser-report');p.add_argument('--agent',default='Codex (OpenAI)');a=p.parse_args()
    try:
        routes=json.loads(Path(a.routes_file).read_text())if a.routes_file else ['/'];run,code=review(a.project_root,a.url,routes,a.browser_report,a.agent)
        print(json.dumps({'run_directory':str(run),'exit_code':code}));raise SystemExit(code)
    except (ValueError,OSError,json.JSONDecodeError)as e:
        print(json.dumps({'error':str(e)}));raise SystemExit(2)
