FROM node:24-bookworm-slim AS node24runtime
FROM ki-full-node22-check:local AS common
WORKDIR /work
# Behold bare den frosne pnpm-cachen fra det tidligere Linux-testbildet.
RUN find /work -mindepth 1 -maxdepth 1 ! -name .pnpm-store -exec rm -rf {} +
COPY source/ /work/
ENV MODEL_PROVIDER=none NEXT_TELEMETRY_DISABLED=1 GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 PYTHONDONTWRITEBYTECODE=1
FROM common AS node22
FROM common AS node24
# Samme Debian-verktøy og pnpm; bare Node-binæren byttes fra offisielt bilde.
COPY --from=node24runtime /usr/local/bin/node /usr/local/bin/node
