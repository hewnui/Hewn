import { readdirSync, statSync } from "fs";
import { join, relative, sep } from "path";

/** Minimal glob matcher — supports `**`, `*`, and `{a,b}` brace sets. */
export function matchGlob(pattern: string, filePath: string): boolean {
  const normalized = filePath.split(sep).join("/");
  const regex = globToRegExp(pattern);
  return regex.test(normalized);
}

export function globToRegExp(pattern: string): RegExp {
  let i = 0;
  let out = "^";
  const p = pattern.replace(/\\/g, "/");
  while (i < p.length) {
    const ch = p[i]!;
    if (ch === "*") {
      if (p[i + 1] === "*") {
        out += ".*";
        i += p[i + 2] === "/" ? 3 : 2;
        continue;
      }
      out += "[^/]*";
      i += 1;
      continue;
    }
    if (ch === "?") {
      out += "[^/]";
      i += 1;
      continue;
    }
    if (ch === "{") {
      const end = p.indexOf("}", i);
      if (end === -1) {
        out += "\\{";
        i += 1;
        continue;
      }
      const body = p.slice(i + 1, end);
      const alts = body.split(",").map((part) => escapeRegex(part)).join("|");
      out += `(?:${alts})`;
      i = end + 1;
      continue;
    }
    out += escapeRegex(ch);
    i += 1;
  }
  out += "$";
  return new RegExp(out);
}

function escapeRegex(value: string): string {
  return value.replace(/[.+^${}()|[\]\\]/g, "\\$&");
}

export function collectFiles(
  cwd: string,
  include: string[],
  ignore: string[],
  explicitPaths: string[],
): string[] {
  const roots =
    explicitPaths.length > 0
      ? explicitPaths.map((p) => (p.startsWith("/") ? p : join(cwd, p)))
      : [cwd];
  const files: string[] = [];

  for (const root of roots) {
    walk(root, (abs) => {
      const rel = relative(cwd, abs).split(sep).join("/");
      if (ignore.some((g) => matchGlob(g, rel) || matchGlob(g, abs))) return;
      if (include.some((g) => matchGlob(g, rel))) files.push(abs);
    });
  }

  return [...new Set(files)].sort();
}

function walk(dir: string, visit: (file: string) => void): void {
  let entries: string[];
  try {
    const st = statSync(dir);
    if (st.isFile()) {
      visit(dir);
      return;
    }
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    if (name === "node_modules" || name === ".git" || name === "dist" || name === ".next") {
      continue;
    }
    walk(join(dir, name), visit);
  }
}
