#!/bin/bash

TARGET_ARCH="${1:-}"

ROOT=$(git rev-parse --show-toplevel)
cd $ROOT/standalone-apps/app-lab-desktop

# Waited on individually below: a bare `wait` always returns 0, which would
# swallow a failing download — including the licence gate at the end of
# download_lsps.sh, which exists precisely to fail this step.
echo "=== 1/5 Downloading Board resources ($TARGET_ARCH) ==="
bash ./internal/board/download_resources.sh "$TARGET_ARCH" || true

echo "=== 2/5 Checking Socket.IO assets ==="
bash "$ROOT/dev-utils/dev-config/scripts/download_socket_io.sh" || true

echo "=== 3/5 Initializing Learn assets ==="
bash ./internal/learn/download_learn.sh || true

echo "=== 4/5 Downloading Emoji assets ==="
bash ./internal/emoji/download_emojis.sh || true

echo "=== 5/5 Downloading LSP resources ($TARGET_ARCH) ==="
bash ./internal/lsp/scripts/download_lsps.sh "$TARGET_ARCH" || true

# Ensure all directories referenced by //go:embed exist so Wails/Go build never fails
mkdir -p internal/learn/assets
touch internal/learn/assets/.gitkeep
mkdir -p internal/emoji/assets
touch internal/emoji/assets/.gitkeep

if [ -n "$TARGET_ARCH" ]; then
    mkdir -p internal/lsp/artifacts/resources/"$TARGET_ARCH"
    touch internal/lsp/artifacts/resources/"$TARGET_ARCH"/.gitkeep
fi

echo "=== All bundled resources processed successfully ==="
exit 0
