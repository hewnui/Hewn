import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const tokensPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../themes/src/tokens.css",
);

/** Theme tokens CSS that wires reduced-motion overrides for skeleton/spinner. */
export function readMotionTokensCss(): string {
  return readFileSync(tokensPath, "utf8");
}

/** Extract the `@media (prefers-reduced-motion: reduce)` block body. */
export function reducedMotionBlock(css: string): string {
  const marker = "@media (prefers-reduced-motion: reduce)";
  const start = css.indexOf(marker);
  if (start === -1) {
    throw new Error("prefers-reduced-motion block missing from tokens.css");
  }

  const braceStart = css.indexOf("{", start);
  if (braceStart === -1) {
    throw new Error("prefers-reduced-motion block is malformed");
  }

  let depth = 0;
  for (let i = braceStart; i < css.length; i += 1) {
    const ch = css[i];
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        return css.slice(braceStart + 1, i);
      }
    }
  }

  throw new Error("prefers-reduced-motion block is unclosed");
}
