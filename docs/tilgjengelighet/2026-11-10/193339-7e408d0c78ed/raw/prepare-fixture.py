from pathlib import Path
import shutil,json,hashlib
root=Path.cwd();work=Path('/private/tmp/portal-a11y-060');fixture=work/'fixture'
shutil.copytree(root/'out',fixture,dirs_exist_ok=True)
d=json.loads((root/'src/content/pricing/snapshot.json').read_text())
print('snapshot top',list(d))
from datetime import datetime
checked=min(datetime.fromisoformat(g['checkedAt'].replace('Z','+00:00')).timestamp()*1000 for g in d['groups'] if g.get('checkedAt'))
threshold=int(checked+7*24*60*60*1000)
script='''// Isolated test fixture; actual PricingFreshness bundle unchanged.
(() => {
 const callbacks=[];const originalInterval=window.setInterval.bind(window);const originalTimeout=window.setTimeout.bind(window);
 let now=THRESHOLD-1000;const originalNow=Date.now;Date.now=()=>now;
 window.setInterval=(fn,ms,...args)=>{if(ms===3600000)callbacks.push(()=>fn(...args));return originalInterval(fn,ms,...args);};
 originalTimeout(()=>{now=THRESHOLD+1000;callbacks.forEach(fn=>fn());window.fixturePhase='after';},30000);
 window.fixturePhase='before';window.fixtureNote='Synthetic threshold/tick, not real 7-day waiting or production clock';
})();'''.replace('THRESHOLD',str(threshold))
(fixture/'a11y-clock.js').write_text(script)
p=fixture/'priser/index.html';p.write_text(p.read_text().replace('<head>','<head><script src="/a11y-clock.js"></script>',1))
(work/'fixture-metadata.json').write_text(json.dumps({'source':'src/components/pricing-freshness.tsx','source_sha256':hashlib.sha256((root/'src/components/pricing-freshness.tsx').read_bytes()).hexdigest(),'checkedAt_min_epoch_ms':checked,'threshold_epoch_ms':threshold,'test':'Unchanged exported production component with synthetic Date.now and replayed actual hourly callbacks in isolated temporary export','real_wait_seconds':30},indent=2))
