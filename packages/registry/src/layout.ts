/**
 * Canonical source lives at packages/ui/src/components/<name>/ and reaches
 * shared code via ../../utils|providers|styles|theme|chart. Both installers
 * (the `hewnui` CLI and shadcn's @ui target) write component folders *beside*
 * the shared folders (<root>/<name>/ next to <root>/utils/ …), so the
 * relative depth for shared imports must become ../ in emitted files.
 */
export const SHARED_DIRS = ["utils", "providers", "styles", "theme", "chart"] as const;

const SHARED_DEPTH_IMPORT = new RegExp(
  String.raw`(from\s+|import\s*\(\s*|import\s+)(["'])\.\.\/\.\.\/(${SHARED_DIRS.join("|")})(\/[^"']*)?\2`,
  "g",
);

export function rewriteSharedImportDepth(content: string): string {
  return content.replace(
    SHARED_DEPTH_IMPORT,
    (_match, lead: string, quote: string, dir: string, rest: string | undefined) =>
      `${lead}${quote}../${dir}${rest ?? ""}${quote}`,
  );
}

/**
 * Shared folders that are NOT part of the `hewn init` foundation because they
 * pull extra npm deps (chart → d3-*). The CLI registry ships them inside each
 * item that needs them, as ../<dir>/<file> paths, so `hewn add area-chart`
 * writes <root>/chart/… beside the component folder.
 */
export const ON_DEMAND_SHARED_DIRS = ["chart"] as const;

export function isOnDemandShared(path: string): boolean {
  const top = path.split("/")[0] ?? "";
  return (ON_DEMAND_SHARED_DIRS as readonly string[]).includes(top);
}

/**
 * Shared source lives at packages/ui/src/<dir>/ and reaches components via
 * ../components/<name>. Installed, components sit beside the shared folder
 * (<root>/<name>/), so the import must become ../<name>.
 */
const SHARED_COMPONENT_IMPORT =
  /(from\s+|import\s*\(\s*|import\s+)(["'])\.\.\/components\/([a-z0-9-]+)(\/[^"']*)?\2/g;

export function rewriteSharedComponentImports(content: string): string {
  return content.replace(
    SHARED_COMPONENT_IMPORT,
    (_match, lead: string, quote: string, name: string, rest: string | undefined) =>
      `${lead}${quote}../${name}${rest ?? ""}${quote}`,
  );
}

/** Component folders (e.g. "skeleton") that a shared file imports. */
export function sharedComponentRefs(content: string): string[] {
  const names = new Set<string>();
  for (const match of content.matchAll(SHARED_COMPONENT_IMPORT)) {
    if (match[3]) names.add(match[3]);
  }
  return [...names].sort();
}

/** Other shared modules (e.g. "utils/cn") that a shared file imports. */
export function sharedModuleRefs(content: string): string[] {
  const refs = new Set<string>();
  const pattern = new RegExp(
    String.raw`(?:from\s+|import\s*\(\s*|import\s+)["']\.\.\/((?:${SHARED_DIRS.join("|")})\/[^"']+)["']`,
    "g",
  );
  for (const match of content.matchAll(pattern)) {
    if (match[1]) refs.add(match[1].replace(/\.[cm]?[jt]sx?$/, ""));
  }
  return [...refs].sort();
}
