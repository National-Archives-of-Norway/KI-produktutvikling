// Controlled-clock regression fixture; production bundle is unchanged.
(()=>{
 const root=document.documentElement;const mode=new URLSearchParams(location.search).get('clock')||'fresh';
 const callbacks=[];const interval=window.setInterval.bind(window);const timeout=window.setTimeout.bind(window);
 let now=1794857941169+(mode==='stale'?1000:-1000);Date.now=()=>now;
 root.dataset.fixturePhase='initial';root.dataset.fixtureMode=mode;root.dataset.fixtureNow=String(now);root.dataset.hourlyCallbacks='0';
 window.setInterval=(fn,ms,...args)=>{if(ms===3600000){callbacks.push(()=>fn(...args));root.dataset.hourlyCallbacks=String(callbacks.length);}return interval(fn,ms,...args);};
 timeout(()=>{now=1794857941169+2000;callbacks.forEach(fn=>fn());root.dataset.fixtureNow=String(now);root.dataset.fixturePhase='crossed';},10000);
})();