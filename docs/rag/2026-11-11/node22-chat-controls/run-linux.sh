#!/bin/sh
set -u
node <<'JS'
const fs=require('node:fs'), os=require('node:os'), cp=require('node:child_process'), crypto=require('node:crypto'), assert=require('node:assert/strict');
const installed=JSON.parse(fs.readFileSync('/installed-contract.json','utf8')), pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
assert.deepEqual(pkg.dependencies,installed.dependencies);
assert.deepEqual(pkg.devDependencies,installed.devDependencies);
assert.equal(hash('pnpm-lock.yaml'),installed.lock);
fs.writeFileSync('/results/runtime.json',JSON.stringify({node:process.version,undici:process.versions.undici,platform:process.platform,arch:process.arch,kernel:os.release(),next:require('next/package.json').version,git:cp.execFileSync('git',['--version'],{encoding:'utf8'}).trim(),debian:fs.readFileSync('/etc/debian_version','utf8').trim(),dependenciesAndLockMatch:true},null,2)+'\n');
fs.writeFileSync('/results/input-hashes.json',JSON.stringify(Object.fromEntries(['package.json','pnpm-lock.yaml','src/content/pricing/snapshot.json'].map(p=>[p,hash(p)])),null,2)+'\n');
JS
setup=$?
if [ "$setup" -ne 0 ]; then exit "$setup"; fi
node --test tests/*.test.ts tests/*.test.mjs > /results/tests.txt 2>&1
full=$?
node /probe.mjs > /results/probe.txt 2>&1
probe=$?
printf 'node-tests=%s\nlate-response-probe=%s\n' "$full" "$probe" > /results/exit-codes.txt
node <<'JS'
const fs=require('node:fs'),crypto=require('node:crypto');
const text=fs.readFileSync('/results/tests.txt','utf8');
const count=k=>Number(text.match(new RegExp('^# '+k+' (\\d+)','m'))?.[1]??-1);
const exits=Object.fromEntries(fs.readFileSync('/results/exit-codes.txt','utf8').trim().split('\n').map(line=>{const[k,v]=line.split('=');return[k,Number(v)];}));
const before=JSON.parse(fs.readFileSync('/results/input-hashes.json','utf8'));
const after=Object.fromEntries(Object.keys(before).map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));
const inputUnchanged=JSON.stringify(before)===JSON.stringify(after);
const result={exitCodes:exits,node:{passed:count('pass'),failed:count('fail'),skipped:count('skipped')},inputUnchanged,afterHashes:after,passed:inputUnchanged&&Object.values(exits).every(c=>c===0)&&count('pass')===172&&count('fail')===0&&count('skipped')===0};
fs.writeFileSync('/results/summary.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));if(!result.passed)process.exitCode=1;
JS
