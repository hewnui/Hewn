import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { themeModeMatrix } from "./matrix";

const here = path.dirname(fileURLToPath(import.meta.url));
const snapshotsDir = path.join(here, "visual.spec.ts-snapshots");
const outDir = path.join(here, "artifacts");
const outFile = path.join(outDir, "theme-mode-contact-sheet.png");

const CELL_W = 480;
const CELL_H = 320;
const LABEL_H = 28;
const COLS = 3;

function snapshotName(theme: string, mode: string) {
  // Project name in playwright.config is `visual` → `-visual-linux` suffix.
  return `gallery-${theme}-${mode}-1440-visual-linux.png`;
}

export async function buildContactSheet() {
  await mkdir(outDir, { recursive: true });

  const files = await readdir(snapshotsDir).catch(() => [] as string[]);
  const tiles: { label: string; buffer: Buffer }[] = [];

  for (const pair of themeModeMatrix) {
    const name = snapshotName(pair.theme, pair.mode);
    if (!files.includes(name)) {
      throw new Error(`Missing snapshot for contact sheet: ${name}`);
    }
    const raw = await readFile(path.join(snapshotsDir, name));
    const resized = await sharp(raw)
      .resize(CELL_W, CELL_H, { fit: "cover", position: "top" })
      .png()
      .toBuffer();
    tiles.push({ label: `${pair.theme} / ${pair.mode}`, buffer: resized });
  }

  const rows = Math.ceil(tiles.length / COLS);
  const width = COLS * CELL_W;
  const height = rows * (CELL_H + LABEL_H);

  const composites: sharp.OverlayOptions[] = [];
  const labelSvgs: { input: Buffer; top: number; left: number }[] = [];

  tiles.forEach((tile, index) => {
    const col = index % COLS;
    const row = Math.floor(index / COLS);
    const left = col * CELL_W;
    const top = row * (CELL_H + LABEL_H);
    composites.push({ input: tile.buffer, left, top: top + LABEL_H });

    const svg = Buffer.from(
      `<svg width="${CELL_W}" height="${LABEL_H}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#111"/>
        <text x="12" y="18" fill="#eee" font-size="12" font-family="IBM Plex Mono, monospace">${tile.label}</text>
      </svg>`,
    );
    labelSvgs.push({ input: svg, left, top });
  });

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 17, g: 17, b: 17 },
    },
  })
    .composite([...labelSvgs, ...composites])
    .png()
    .toFile(outFile);

  const ciCopy = path.join(here, "../../test-results/visual-contact-sheet.png");
  await mkdir(path.dirname(ciCopy), { recursive: true });
  await writeFile(ciCopy, await readFile(outFile));

  return outFile;
}

const isDirectRun = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isDirectRun) {
  buildContactSheet()
    .then((file) => {
      console.log(`Contact sheet written to ${file}`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
