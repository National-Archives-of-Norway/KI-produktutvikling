#!/bin/sh
set -eu
cd "$(dirname "$0")/.."

# Bruk vanlig Node.js/pnpm hvis tilgjengelig, ellers Codex sin lokale runtime.
if command -v node >/dev/null 2>&1 && command -v pnpm >/dev/null 2>&1; then
  exec pnpm dev "$@"
fi
runtime_root="${HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies"
if [ -x "$runtime_root/node/bin/node" ] && [ -x "$runtime_root/bin/fallback/pnpm" ]; then
  export PATH="$runtime_root/node/bin:$PATH"
  exec "$runtime_root/bin/fallback/pnpm" dev "$@"
fi
printf '%s\n' 'Installer Node.js 22 eller nyere og pnpm. Se README.md.' >&2
exit 1
