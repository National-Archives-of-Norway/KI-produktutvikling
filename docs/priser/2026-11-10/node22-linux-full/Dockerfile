FROM ki-pricing-node22-test:local
RUN apt-get update && apt-get install -y --no-install-recommends python3 && rm -rf /var/lib/apt/lists/*
RUN npm install --global pnpm@11.25.0
WORKDIR /work
COPY source/ ./
ENV NEXT_TELEMETRY_DISABLED=1 GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 PYTHONDONTWRITEBYTECODE=1
RUN pnpm install --frozen-lockfile --ignore-scripts
