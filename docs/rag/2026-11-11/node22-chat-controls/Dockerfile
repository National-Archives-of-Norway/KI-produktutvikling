FROM ki-full-node22-check:local
WORKDIR /work
RUN node -e 'const fs=require("node:fs"),crypto=require("node:crypto"),p=require("./package.json");fs.writeFileSync("/installed-contract.json",JSON.stringify({dependencies:p.dependencies,devDependencies:p.devDependencies,lock:crypto.createHash("sha256").update(fs.readFileSync("pnpm-lock.yaml")).digest("hex")}))'
RUN rm -rf /work/src /work/scripts /work/tests /work/.github /work/.next /work/out /work/docs
COPY source/ /work/
