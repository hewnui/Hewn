import type { Oklch } from "./types";

const OKLCH_RE =
  /^oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+)%?)?\s*\)$/i;
const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function formatOklch(color: Oklch): string {
  const { l, c, h, alpha } = color;
  const base = `oklch(${round(l)} ${round(c)} ${round(h)}`;
  if (alpha === undefined || alpha >= 1) return `${base})`;
  return `${base} / ${Math.round(alpha * 100)}%)`;
}

export function formatHex(color: Oklch): string {
  const [r, g, b] = oklchToSrgb(color);
  const toByte = (channel: number) =>
    Math.round(Math.min(1, Math.max(0, channel)) * 255);
  return `#${[toByte(r), toByte(g), toByte(b)]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function parseColor(input: string): Oklch | null {
  const trimmed = input.trim();
  const oklch = trimmed.match(OKLCH_RE);
  if (oklch) {
    return {
      l: Number(oklch[1]),
      c: Number(oklch[2]),
      h: Number(oklch[3]),
      ...(oklch[4] !== undefined
        ? {
            alpha:
              Number(oklch[4]) > 1
                ? Number(oklch[4]) / 100
                : Number(oklch[4]),
          }
        : {}),
    };
  }
  const hex = trimmed.match(HEX_RE);
  if (!hex?.[1]) return null;
  return srgbToOklch(hexToSrgb(hex[1]));
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

/** Pick black or white foreground that meets AA (4.5:1) against the background. */
export function contrastForeground(
  background: Oklch,
  prefer: Oklch,
  minRatio = 4.5,
): { color: Oklch; adjusted: boolean } {
  if (contrastRatio(prefer, background) >= minRatio) {
    return { color: prefer, adjusted: false };
  }
  const white: Oklch = { l: 0.99, c: 0, h: background.h };
  const black: Oklch = { l: 0.18, c: 0, h: background.h };
  const whiteRatio = contrastRatio(white, background);
  const blackRatio = contrastRatio(black, background);
  return {
    color: whiteRatio >= blackRatio ? white : black,
    adjusted: true,
  };
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function hexToSrgb(hex: string): [number, number, number] {
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : hex;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
}

/** Compact OKLCH ↔ sRGB (Björn Ottosson). Good enough for contrast floors. */
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
  const l =
    0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const m =
    0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const s =
    0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;
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
