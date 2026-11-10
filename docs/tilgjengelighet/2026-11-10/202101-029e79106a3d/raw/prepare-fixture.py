from pathlib import Path
import shutil,json,hashlib
from datetime import datetime
root=Path.cwd();work=Path('/private/tmp/portal-a11y-fix-060');fixture=work/'fixture';shutil.copytree(root/'out',fixture,dirs_exist_ok=True)
d=json.loads((root/'src/content/pricing/snapshot.json').read_text());threshold=int(min(datetime.fromisoformat(g['checkedAt'].replace('Z','+00:00')).timestamp()*1000 for g in d['groups'] if g.get('checkedAt'))+7*86400000)
script='''// Controlled-clock regression fixture; production bundle is unchanged.
(()=>{
 const root=document.documentElement;const mode=new URLSearchParams(location.search).get('clock')||'fresh';
 const callbacks=[];const interval=window.setInterval.bind(window);const timeout=window.setTimeout.bind(window);
 let now=THRESHOLD+(mode==='stale'?1000:-1000);Date.now=()=>now;
 root.dataset.fixturePhase='initial';root.dataset.fixtureMode=mode;root.dataset.fixtureNow=String(now);root.dataset.hourlyCallbacks='0';
 window.setInterval=(fn,ms,...args)=>{if(ms===3600000){callbacks.push(()=>fn(...args));root.dataset.hourlyCallbacks=String(callbacks.length);}return interval(fn,ms,...args);};
 timeout(()=>{now=THRESHOLD+2000;callbacks.forEach(fn=>fn());root.dataset.fixtureNow=String(now);root.dataset.fixturePhase='crossed';},10000);
})();'''.replace('THRESHOLD',str(threshold))
(fixture/'a11y-clock.js').write_text(script)
p=fixture/'priser/index.html';p.write_text(p.read_text().replace('<head>','<head><script src="/a11y-clock.js"></script>',1))
(work/'fixture-metadata.json').write_text(json.dumps({'threshold_epoch_ms':threshold,'scope':'Unchanged new production export; fresh/stale page-opening modes, synthetic clock crossing plus replay of any actual hourly callbacks','delay_ms':10000,'component_sha256':hashlib.sha256((root/'src/components/pricing-freshness.tsx').read_bytes()).hexdigest(),'expected_hourly_callbacks':0,'expected_fresh_warnings_after_crossing':0,'expected_stale_warnings_on_open':6},indent=2)+'\n')
