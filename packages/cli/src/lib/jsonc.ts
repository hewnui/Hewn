/**
 * Minimal JSONC parse for tsconfig/jsconfig: strips line and block comments
 * outside of strings, then JSON.parse. No full JSON5 support.
 */
export function parseJsonc<T = unknown>(raw: string): T {
  return JSON.parse(stripJsonc(raw)) as T;
}

export function stripJsonc(input: string): string {
  let out = "";
  let i = 0;
  let inString = false;
  let stringQuote: '"' | "'" | null = null;
  let escaped = false;

  while (i < input.length) {
    const ch = input[i]!;
    const next = input[i + 1];

    if (inString) {
      out += ch;
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === stringQuote) {
        inString = false;
        stringQuote = null;
      }
      i += 1;
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = true;
      stringQuote = ch;
      out += ch;
      i += 1;
      continue;
    }

    if (ch === "/" && next === "/") {
      i += 2;
      while (i < input.length && input[i] !== "\n") i += 1;
      continue;
    }

    if (ch === "/" && next === "*") {
      i += 2;
      while (i < input.length && !(input[i] === "*" && input[i + 1] === "/")) {
        i += 1;
      }
      i += 2;
      continue;
    }

    out += ch;
    i += 1;
  }

  return out;
}
