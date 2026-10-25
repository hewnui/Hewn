#!/usr/bin/env bash
# Run Playwright visual tests inside the official Linux image so baselines
# match CI. Usage:
#   pnpm test:visual:docker
#   pnpm test:visual:docker:update
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE="${PLAYWRIGHT_DOCKER_IMAGE:-mcr.microsoft.com/playwright:v1.64.1-jammy}"
UPDATE=0
EXTRA=()

for arg in "$@"; do
  if [[ "$arg" == "--update-snapshots" || "$arg" == "-u" ]]; then
    UPDATE=1
  else
    EXTRA+=("$arg")
  fi
done

DOCKER=(docker)
if ! docker info >/dev/null 2>&1; then
  if command -v sudo >/dev/null 2>&1 && sudo docker info >/dev/null 2>&1; then
    DOCKER=(sudo docker)
  else
    echo "Docker is required to generate/update visual baselines." >&2
    exit 1
  fi
fi

UPDATE_FLAG=""
if [[ "$UPDATE" -eq 1 ]]; then
  UPDATE_FLAG="--update-snapshots"
fi

# Hide host node_modules / .next so the container installs Linux-native deps.
MODULE_MOUNTS=(
  -v /work/node_modules
  -v /work/apps/web/node_modules
  -v /work/apps/web/.next
  -v /work/packages/cli/node_modules
  -v /work/packages/docs-metadata/node_modules
  -v /work/packages/mcp/node_modules
  -v /work/packages/motion/node_modules
  -v /work/packages/registry/node_modules
  -v /work/packages/themes/node_modules
  -v /work/packages/ui/node_modules
  -v /work/packages/tsconfig/node_modules
)

HOST_UID="$(id -u)"
HOST_GID="$(id -g)"

echo "Using image: $IMAGE (uid=${HOST_UID})"
"${DOCKER[@]}" run --rm \
  --ipc=host \
  -v "$ROOT:/work" \
  "${MODULE_MOUNTS[@]}" \
  -w /work \
  -e CI=true \
  -e E2E_PORT=3100 \
  -e HOME=/tmp \
  -e npm_config_cache=/tmp/npm-cache \
  -e PNPM_HOME=/tmp/pnpm \
  -e PLAYWRIGHT_BROWSERS_PATH=/ms-playwright \
  -e PLAYWRIGHT_VISUAL=1 \
  -e TURBO_FORCE=1 \
  "$IMAGE" \
  bash -lc "
    set -euo pipefail
    # Anonymous volumes start as root; match the bind-mount owner before install.
    chown -R ${HOST_UID}:${HOST_GID} /work/node_modules /work/apps /work/packages 2>/dev/null || true
    corepack enable
    corepack prepare pnpm@11.15.1 --activate
    pnpm install --frozen-lockfile --config.confirmModulesPurge=false
    pnpm build
    pnpm --filter web exec playwright test --project=visual ${UPDATE_FLAG} ${EXTRA[*]:-}
    pnpm --filter web visual:contact-sheet
    chown -R ${HOST_UID}:${HOST_GID} /work/apps/web/e2e/visual /work/apps/web/test-results /work/apps/web/playwright-report 2>/dev/null || true
  "
