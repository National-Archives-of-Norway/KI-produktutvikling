#!/bin/sh
set -u
node <<'JS'
const fs=require('node:fs'),os=require('node:os'),cp=require('node:child_process'),crypto=require('node:crypto');
const hashes=Object.fromEntries(['package.json','pnpm-lock.yaml','src/content/pricing/snapshot.json'].map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));
fs.writeFileSync('/results/input-hashes.json',JSON.stringify(hashes,null,2)+'\n');
fs.writeFileSync('/results/runtime.json',JSON.stringify({node:process.version,undici:process.versions.undici,platform:process.platform,arch:process.arch,kernel:os.release(),pnpm:cp.execFileSync('pnpm',['--version'],{encoding:'utf8'}).trim(),next:require('next/package.json').version,git:cp.execFileSync('git',['--version'],{encoding:'utf8'}).trim()},null,2)+'\n');
JS
node --test tests/*.test.ts tests/*.test.mjs > /results/full-tests.txt 2>&1
full_result=$?
printf '%s\n' "$full_result" > /results/full-exit-code.txt
: > /results/repeat-exit-codes.txt
n=1
while [ "$n" -le 20 ]; do
  node --test tests/rag-lifecycle.test.ts tests/rag-proxy.test.ts tests/rag-http.test.ts > "/results/repeat-$n.txt" 2>&1
  result=$?
  printf '%s=%s\n' "$n" "$result" >> /results/repeat-exit-codes.txt
  n=$((n + 1))
done
node <<'JS'
const fs=require('node:fs'),crypto=require('node:crypto');
const count=(text,key)=>Number(text.match(new RegExp('^# '+key+' (\\d+)','m'))?.[1]??-1);
const fullText=fs.readFileSync('/results/full-tests.txt','utf8');
const full={exitCode:Number(fs.readFileSync('/results/full-exit-code.txt','utf8')),passed:count(fullText,'pass'),failed:count(fullText,'fail'),skipped:count(fullText,'skipped')};
const repeats=fs.readFileSync('/results/repeat-exit-codes.txt','utf8').trim().split('\n').map(line=>{const [run,exitCode]=line.split('=');const text=fs.readFileSync(`/results/repeat-${run}.txt`,'utf8');return {run:Number(run),exitCode:Number(exitCode),passed:count(text,'pass'),failed:count(text,'fail'),skipped:count(text,'skipped')};});
const before=JSON.parse(fs.readFileSync('/results/input-hashes.json','utf8'));
const after=Object.fromEntries(Object.keys(before).map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));
const unchanged=JSON.stringify(before)===JSON.stringify(after);
const result={full,repeats,totalRepeatedPasses:repeats.reduce((n,r)=>n+r.passed,0),inputsUnchanged:unchanged,afterHashes:after,passed:unchanged&&full.exitCode===0&&full.passed===119&&full.failed===0&&full.skipped===0&&repeats.length===20&&repeats.every(r=>r.exitCode===0&&r.passed===23&&r.failed===0&&r.skipped===0)};
fs.writeFileSync('/results/summary.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(!result.passed)process.exitCode=1;
JS
