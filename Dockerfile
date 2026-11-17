# Verifisert offisielt Node 24-bilde. Oppdater digest bevisst.
FROM node:24-bookworm-slim@sha256:01d566e8d94d8c619591d78652babfccd3c6992a3dffa9ed5ab39e11cf6c70e9 AS dependencies
WORKDIR /work
RUN npm install --global --ignore-scripts pnpm@11.25.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Nettleser/HTML-validator trengs ikke for appbygg; ingen postinstall-nedlastinger.
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM dependencies AS builder
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1 RAG_PORT=3001
RUN node node_modules/next/dist/bin/next build

FROM node:24-bookworm-slim@sha256:01d566e8d94d8c619591d78652babfccd3c6992a3dffa9ed5ab39e11cf6c70e9 AS runtime
WORKDIR /work
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 RAG_PORT=3001
COPY --from=builder --chown=node:node /work/node_modules ./node_modules
COPY --from=builder --chown=node:node /work/.next ./.next
COPY --from=builder --chown=node:node /work/src ./src
COPY --from=builder --chown=node:node /work/public ./public
COPY --from=builder --chown=node:node /work/scripts/rag-server.mjs ./scripts/rag-server.mjs
COPY --from=builder --chown=node:node /work/scripts/start-portal.mjs ./scripts/start-portal.mjs
COPY --from=builder --chown=node:node /work/package.json /work/next.config.ts /work/tsconfig.json /work/VERSJONSLOGG.md /work/UTVIKLINGSPLAN.md ./
# Eierskap lar Next håndtere sin lokale runtime-cache uten root.
RUN chown node:node /work
USER node
EXPOSE 3000
CMD ["node", "scripts/start-portal.mjs"]
