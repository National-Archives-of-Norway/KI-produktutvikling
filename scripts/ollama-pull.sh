#!/bin/sh
set -eu
# Kun denne engangsprosessen har utgående nettverk. Modellene lagres i volumet.
export OLLAMA_HOST=127.0.0.1:11434
ollama serve &
server_pid=$!
trap 'kill "$server_pid" 2>/dev/null || true; wait "$server_pid" 2>/dev/null || true' EXIT INT TERM
attempt=0
until ollama list >/dev/null 2>&1; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 60 ]; then echo "Ollama startet ikke." >&2; exit 1; fi
  sleep 1
done
if [ "${OLLAMA_FORCE_PULL:-0}" != "1" ] && ollama show qwen3:4b >/dev/null 2>&1; then
  echo "Gjenbruker nedlastet qwen3:4b fra modellvolumet."
  exit 0
fi
ollama pull qwen3:4b
ollama show qwen3:4b >/dev/null
