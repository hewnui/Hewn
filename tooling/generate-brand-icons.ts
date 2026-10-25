/**
 * Regenerates favicon.ico, apple-touch PNGs, and PWA icons from the Hewn mark.
 * Run: pnpm exec tsx tooling/generate-brand-icons.ts
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(fileURLToPath(import.meta.url), "../..");
const web = join(root, "apps/web");

const PLATE =
  "M7 0h18a7 7 0 0 1 7 7v18a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7Z";
const GLYPH =
  "M8 6.8h3.6v18.4H8V6.8ZM20.4 6.8h3.6v18.4h-3.6V6.8ZM13.1 13.9h5.8v4.2h-5.8V13.9Z";

const PLATE_FILL = "#1B212A";
const GLYPH_FILL = "#9BB4D4";

function markSvg(size: number, inset = 0): string {
  const inner = size - inset * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  <rect width="${size}" height="${size}" fill="${PLATE_FILL}"/>
  <svg x="${inset}" y="${inset}" width="${inner}" height="${inner}" viewBox="0 0 32 32">
    <path d="${PLATE}" fill="${PLATE_FILL}"/>
    <path d="${GLYPH}" fill="${GLYPH_FILL}"/>
  </svg>
</svg>`;
}

function glyphOnlySvg(size: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
  <path d="${PLATE}" fill="${PLATE_FILL}"/>
  <path d="${GLYPH}" fill="${GLYPH_FILL}"/>
</svg>`;
}

/** Pack PNG buffers into a multi-size ICO. */
function encodeIco(pngs: Array<{ size: number; data: Buffer }>): Buffer {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries: Buffer[] = [];
  const payloads: Buffer[] = [];
  let offset = 6 + count * 16;

  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    payloads.push(data);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...payloads]);
}

async function pngFromSvg(svg: string, size: number): Promise<Buffer> {
  return sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
}

async function writePng(path: string, svg: string, size: number) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, await pngFromSvg(svg, size));
  console.log("wrote", path.replace(root + "/", ""));
}

async function main() {
  const full = glyphOnlySvg(512);
  const maskable192 = markSvg(192, 19);
  const maskable512 = markSvg(512, 51);

  const sizes = [16, 32, 48] as const;
  const icoPngs = await Promise.all(
    sizes.map(async (size) => ({
      size,
      data: await pngFromSvg(glyphOnlySvg(size), size),
    })),
  );
  const icoPath = join(web, "app/favicon.ico");
  await writeFile(icoPath, encodeIco(icoPngs));
  console.log("wrote apps/web/app/favicon.ico");

  await writePng(join(web, "public/apple-touch-icon.png"), full, 180);
  await writePng(
    join(web, "public/apple-touch-icon-precomposed.png"),
    full,
    180,
  );

  await writePng(join(web, "public/icons/icon-192.png"), full, 192);
  await writePng(join(web, "public/icons/icon-512.png"), full, 512);
  await writePng(
    join(web, "public/icons/icon-maskable-192.png"),
    maskable192,
    192,
  );
  await writePng(
    join(web, "public/icons/icon-maskable-512.png"),
    maskable512,
    512,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
