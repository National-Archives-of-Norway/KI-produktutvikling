#!/bin/sh
set -u
node -e 'const fs=require("node:fs"),os=require("node:os");fs.writeFileSync("/results/runtime.json",JSON.stringify({node:process.version,undici:process.versions.undici,platform:process.platform,arch:process.arch,kernel:os.release(),os:fs.readFileSync("/etc/os-release","utf8")},null,2)+"\n")'
node --test tests/rag-http.test.ts > /results/http-tests.txt 2>&1
http_result=$?
node docs/rag/2026-11-10/node22-http/stress.mjs /results/stress-result.json > /results/stress-log.txt 2>&1
stress_result=$?
node -e 'require("node:fs").writeFileSync("/results/exit-codes.json",JSON.stringify({httpTests:Number(process.argv[1]),stress:Number(process.argv[2])},null,2)+"\n")' "$http_result" "$stress_result"
cat /results/runtime.json
cat /results/exit-codes.json
if [ "$http_result" -ne 0 ] || [ "$stress_result" -ne 0 ]; then exit 1; fi
