#!/bin/sh
set -u
node -e 'const fs=require("node:fs"),os=require("node:os"),cp=require("node:child_process");fs.writeFileSync("/results/runtime.json",JSON.stringify({node:process.version,platform:process.platform,arch:process.arch,kernel:os.release(),git:cp.execFileSync("git",["--version"],{encoding:"utf8"}).trim(),bash:cp.execFileSync("bash",["--version"],{encoding:"utf8"}).split("\n")[0],os:fs.readFileSync("/etc/os-release","utf8")},null,2)+"\n")'
node --test tests/pricing.test.mjs > /results/tests.txt 2>&1
result=$?
node -e 'require("node:fs").writeFileSync("/results/result.json",JSON.stringify({command:"node --test tests/pricing.test.mjs",exitCode:Number(process.argv[1])},null,2)+"\n")' "$result"
cat /results/runtime.json
cat /results/result.json
tail -15 /results/tests.txt
exit "$result"
