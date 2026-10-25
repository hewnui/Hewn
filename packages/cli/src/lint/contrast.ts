/** OKLCH → sRGB → WCAG relative luminance (Björn Ottosson; themes package parity). */

export type Oklch = { l: number; c: number; h: number; alpha?: number };

const OKLCH_RE =
  /^oklch\(\s*([0-9.]+%?)\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+)%?)?\s*\)$/i;
const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const RGB_RE =
  /^rgba?\(\s*([0-9.]+)\s*,?\s*([0-9.]+)\s*,?\s*([0-9.]+)(?:\s*[,/]\s*([0-9.]+%?))?\s*\)$/i;
const HSL_RE =
  /^hsla?\(\s*([0-9.]+)\s*,?\s*([0-9.]+)%?\s*,?\s*([0-9.]+)%?(?:\s*[,/]\s*([0-9.]+%?))?\s*\)$/i;

export function parseColor(input: string): Oklch | null {
  const trimmed = input.trim();
  const oklch = trimmed.match(OKLCH_RE);
  if (oklch) {
    const lRaw = oklch[1]!;
    const l = lRaw.endsWith("%") ? Number(lRaw.slice(0, -1)) / 100 : Number(lRaw);
    return {
      l,
      c: Number(oklch[2]),
      h: Number(oklch[3]),
      ...(oklch[4] !== undefined ? { alpha: parseAlpha(oklch[4]) } : {}),
    };
  }
  const hex = trimmed.match(HEX_RE);
  if (hex?.[1]) return srgbToOklch(hexToSrgb(hex[1]));
  const rgb = trimmed.match(RGB_RE);
  if (rgb) {
    return srgbToOklch([
      Number(rgb[1]) / 255,
      Number(rgb[2]) / 255,
      Number(rgb[3]) / 255,
    ]);
  }
  const hsl = trimmed.match(HSL_RE);
  if (hsl) {
    return srgbToOklch(
      hslToSrgb(Number(hsl[1]), Number(hsl[2]) / 100, Number(hsl[3]) / 100),
    );
  }
  return null;
}

export function relativeLuminance(color: Oklch): number {
  const [r, g, b] = oklchToSrgb(color);
  const lin = (channel: number) => {
    const c = Math.min(1, Math.max(0, channel));
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrastRatio(a: Oklch, b: Oklch): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseAlpha(raw: string): number {
  const n = Number(raw);
  return n > 1 ? n / 100 : n;
}

function hexToSrgb(hex: string): [number, number, number] {
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : hex.slice(0, 6);
  const n = Number.parseInt(full, 16);
  return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
}

function hslToSrgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = l - c / 2;
  return [r + m, g + m, b + m];
}

function oklchToSrgb(color: Oklch): [number, number, number] {
  const a = color.c * Math.cos((color.h * Math.PI) / 180);
  const b = color.c * Math.sin((color.h * Math.PI) / 180);
  const l_ = color.l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = color.l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = color.l - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function srgbToOklch([r, g, b]: [number, number, number]): Oklch {
  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  const rl = toLinear(r);
  const gl = toLinear(g);
  const bl = toLinear(b);
  const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(A * A + B * B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { l: L, c: C, h: H };
}
