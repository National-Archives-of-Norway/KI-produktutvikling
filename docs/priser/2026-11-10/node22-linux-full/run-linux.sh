#!/bin/sh
set -u
node <<'JS'
const fs = require('node:fs'), os = require('node:os'), cp = require('node:child_process'), crypto = require('node:crypto');
const paths = ['package.json','pnpm-lock.yaml','src/content/pricing/snapshot.json'];
const hashes = Object.fromEntries(paths.map(p => [p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));
fs.writeFileSync('/results/input-hashes.json',JSON.stringify(hashes,null,2)+'\n');
fs.writeFileSync('/results/runtime.json',JSON.stringify({node:process.version,undici:process.versions.undici,platform:process.platform,arch:process.arch,kernel:os.release(),pnpm:cp.execFileSync('pnpm',['--version'],{encoding:'utf8'}).trim(),git:cp.execFileSync('git',['--version'],{encoding:'utf8'}).trim(),python:cp.execFileSync('python3',['--version'],{encoding:'utf8'}).trim(),next:require('next/package.json').version,typescript:require('typescript/package.json').version},null,2)+'\n');
JS
: > /results/exit-codes.txt
run_check() {
  label="$1"
  shift
  "$@" > "/results/$label.txt" 2>&1
  status=$?
  printf '%s=%s\n' "$label" "$status" >> /results/exit-codes.txt
  printf '%s: exit %s\n' "$label" "$status"
}
run_check tests pnpm test:rag
run_check python python3 -m unittest discover -s tests -p 'test_*.py' -v
run_check content-sync pnpm test:content-sync
run_check typegen pnpm exec next typegen
run_check typecheck pnpm typecheck
run_check build pnpm build
node <<'JS'
const fs = require('node:fs'), crypto = require('node:crypto');
const before = JSON.parse(fs.readFileSync('/results/input-hashes.json','utf8'));
const after = Object.fromEntries(Object.keys(before).map(p => [p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));
const unchanged = JSON.stringify(before) === JSON.stringify(after);
const exitCodes = Object.fromEntries(fs.readFileSync('/results/exit-codes.txt','utf8').trim().split('\n').map(line=>{const [name,code]=line.split('=');return [name,Number(code)];}));
const summary = {exitCodes,inputsUnchanged:unchanged,afterHashes:after,buildId:fs.existsSync('.next/BUILD_ID')?fs.readFileSync('.next/BUILD_ID','utf8').trim():null,passed:unchanged&&Object.values(exitCodes).every(code=>code===0)};
fs.writeFileSync('/results/summary.json',JSON.stringify(summary,null,2)+'\n');
for(const file of ['.next/routes-manifest.json','.next/prerender-manifest.json']) if(fs.existsSync(file)) fs.copyFileSync(file,'/results/'+file.split('/').pop());
console.log(JSON.stringify(summary,null,2));
if(!summary.passed)process.exitCode=1;
JS
