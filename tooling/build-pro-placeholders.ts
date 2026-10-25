/**
 * Generates labelled placeholder PNGs for /pro previews when real captures
 * are missing. Safe to re-run; skips files that already exist (so dropping a
 * real PNG into public/pro/previews keeps it).
 */
import { mkdir, access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const BLOCKS = [
  "app-sidebar",
  "app-header",
  "metrics-row",
  "chart-panel",
  "activity-feed",
  "jobs-table",
  "confirm-action",
  "pricing-table",
  "settings-profile",
  "api-keys-manager",
  "team-members-manager",
  "page-dashboard",
  "page-login",
  "page-settings",
] as const;

const root = join(fileURLToPath(import.meta.url), "../..");
const outDir = join(root, "apps/web/public/pro/previews");

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function svgFor(id: string): string {
  const title = id.replace(/-/g, " ");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c2420"/>
      <stop offset="100%" stop-color="#121816"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#g)"/>
  <rect x="48" y="48" width="1184" height="624" rx="18" fill="#1a221e" stroke="#2f3b35" stroke-width="2"/>
  <text x="80" y="110" fill="#6fbf8a" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="22" letter-spacing="3">PREVIEW PLACEHOLDER</text>
  <text x="80" y="170" fill="#e8eee9" font-family="IBM Plex Sans, ui-sans-serif, sans-serif" font-size="42" font-weight="600">${title}</text>
  <text x="80" y="220" fill="#9aa89f" font-family="IBM Plex Sans, ui-sans-serif, sans-serif" font-size="24">Drop ${id}.png here to replace this frame.</text>
  <rect x="80" y="280" width="280" height="140" rx="12" fill="#222c27" stroke="#334039"/>
  <rect x="380" y="280" width="280" height="140" rx="12" fill="#222c27" stroke="#334039"/>
  <rect x="680" y="280" width="280" height="140" rx="12" fill="#222c27" stroke="#334039"/>
  <rect x="80" y="450" width="880" height="16" rx="8" fill="#2a3530"/>
  <rect x="80" y="486" width="640" height="16" rx="8" fill="#24302b"/>
</svg>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const toWrite: string[] = [];
  for (const id of BLOCKS) {
    if (!(await exists(join(outDir, `${id}.png`)))) toWrite.push(id);
  }

  if (toWrite.length === 0) {
    console.log(
      `pro placeholders: all ${BLOCKS.length} present, skip sharp → ${outDir}`,
    );
    return;
  }

  const sharp = (await import("sharp")).default;
  for (const id of toWrite) {
    const target = join(outDir, `${id}.png`);
    await sharp(Buffer.from(svgFor(id))).png().toFile(target);
  }

  console.log(
    `pro placeholders: wrote ${toWrite.length}, skipped ${BLOCKS.length - toWrite.length} → ${outDir}`,
  );
}
main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
