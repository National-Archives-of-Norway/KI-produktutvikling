// Isolated test fixture; actual PricingFreshness bundle unchanged.
(() => {
 const callbacks=[];const originalInterval=window.setInterval.bind(window);const originalTimeout=window.setTimeout.bind(window);
 let now=1794857941169-1000;const originalNow=Date.now;Date.now=()=>now;
 window.setInterval=(fn,ms,...args)=>{if(ms===3600000)callbacks.push(()=>fn(...args));return originalInterval(fn,ms,...args);};
 originalTimeout(()=>{now=1794857941169+1000;callbacks.forEach(fn=>fn());window.fixturePhase='after';document.documentElement.dataset.fixturePhase='after';document.documentElement.dataset.fixtureNow=String(now);},30000);
 window.fixturePhase='before';document.documentElement.dataset.fixturePhase='before';document.documentElement.dataset.fixtureNow=String(now);window.fixtureNote='Synthetic threshold/tick, not real 7-day waiting or production clock';
})();