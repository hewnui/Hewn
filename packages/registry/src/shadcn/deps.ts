const IMPORT_RE = /from\s+["']([^"']+)["']/g;

/**
 * Keep these in sync with packages/ui/package.json peerDependencies (a test
 * enforces it). Unpinned "motion" resolves to a major Hewn doesn't support.
 */
export const PEER_RANGES = {
  motion: "^12.42.2",
  "react-aria-components": "^1.19.0",
} as const;

const PACKAGE_MAP: Record<string, string> = {
  "react-aria-components": `react-aria-components@${PEER_RANGES["react-aria-components"]}`,
  "motion/react": `motion@${PEER_RANGES.motion}`,
  motion: `motion@${PEER_RANGES.motion}`,
  // Pin v8 — v9 renames useReactTable and breaks our DataTable source.
  "@tanstack/react-table": "@tanstack/react-table@8.21.3",
  "@internationalized/date": "@internationalized/date",
  "d3-array": "d3-array",
  "d3-scale": "d3-scale",
  "d3-shape": "d3-shape",
};

const SKIP_PACKAGES = new Set([
  "react",
  "react-dom",
  "react/jsx-runtime",
  "@hewnui/motion",
  "@hewnui/registry",
  "@hewnui/themes",
  "@hewnui/ui",
]);

const SHARED_PREFIX_TO_ITEM: Record<string, string> = {
  utils: "utils",
  providers: "providers",
  styles: "styles",
  chart: "chart",
  theme: "theme",
};

function normalizeDeclared(name: string): string {
  const bare = name.replace(/(?!^)@.*$/, "");
  return PACKAGE_MAP[bare] ?? name;
}

export function detectNpmDependencies(
  contents: string[],
  declared: string[] = [],
): string[] {
  const found = new Set(declared.map(normalizeDeclared));
  for (const content of contents) {
    for (const match of content.matchAll(IMPORT_RE)) {
      const spec = match[1];
      if (!spec || spec.startsWith(".") || spec.startsWith("@/")) continue;
      if (SKIP_PACKAGES.has(spec)) continue;
      const mapped = PACKAGE_MAP[spec];
      if (mapped) {
        found.add(mapped);
        continue;
      }
      if (spec.startsWith("@hewnui/")) continue;
      if (!spec.startsWith("@") && !spec.includes("/")) {
        found.add(spec);
      } else if (spec.startsWith("@")) {
        const parts = spec.split("/");
        if (parts.length >= 2) found.add(`${parts[0]}/${parts[1]}`);
      }
    }
  }
  return [...found].sort();
}

/** Packages that ship no types and need @types/* for a TypeScript install. */
const UNTYPED_PACKAGES = new Set(["d3-array", "d3-scale", "d3-shape"]);

export function detectTypeDependencies(dependencies: string[]): string[] {
  return dependencies
    .map((dep) => dep.replace(/(?!^)@.*$/, ""))
    .filter((dep) => UNTYPED_PACKAGES.has(dep))
    .map((dep) => `@types/${dep}`)
    .sort();
}

export function sharedPathToRegistryItem(sharedPath: string): string | null {
  const top = sharedPath.split("/")[0];
  if (!top) return null;
  return SHARED_PREFIX_TO_ITEM[top] ?? null;
}

export function collectRegistryDependencies(input: {
  internal: string[];
  shared: string[];
  needsMotionPresets: boolean;
  includeTokens?: boolean;
  /** Namespace prefix so namespaced installs resolve deps locally (e.g. @hewnui). */
  namespace?: string;
}): string[] {
  const deps = new Set<string>();
  for (const name of input.internal) deps.add(name);
  for (const shared of input.shared) {
    const item = sharedPathToRegistryItem(shared);
    if (item) deps.add(item);
  }
  if (input.needsMotionPresets) deps.add("motion-presets");
  if (input.includeTokens) deps.add("tokens");

  const sorted = [...deps].sort();
  const ns = input.namespace?.replace(/^@/, "");
  if (!ns) return sorted;
  return sorted.map((name) =>
    name.startsWith("@") || name.startsWith("http") ? name : `@${ns}/${name}`,
  );
}
