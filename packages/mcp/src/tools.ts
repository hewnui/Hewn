import { allowPro, isPro, proDenied } from "./pro.js";
import type { LicenseAccess } from "./license.js";
import type { Catalog } from "./types.js";

export type ToolResult =
  | { ok: true; data: unknown }
  | { ok: false; error: string };

function ok(data: unknown): ToolResult {
  return { ok: true, data };
}

function fail(error: string): ToolResult {
  return { ok: false, error };
}

export function listComponents(
  catalog: Catalog,
  access: LicenseAccess,
): ToolResult {
  return ok(catalog.listComponents({ includePro: access.proUnlocked }));
}

export function searchComponents(
  catalog: Catalog,
  query: string,
  access: LicenseAccess,
): ToolResult {
  const item = catalog.findComponent(query.trim());
  if (item && isPro(item) && !access.proUnlocked) {
    return proDenied(item.name, access);
  }
  return ok(
    catalog.searchComponents(query, { includePro: access.proUnlocked }),
  );
}

export function getComponent(
  catalog: Catalog,
  name: string,
  access: LicenseAccess,
): ToolResult {
  const item = catalog.findComponent(name);
  if (!item) return fail(`Unknown component: "${name}"`);
  if (!allowPro(item, access)) return proDenied(name, access);
  const ai = catalog.getAi(name);
  return ok({
    ...item,
    ai: ai ?? null,
  });
}

export function getInstallCommand(
  catalog: Catalog,
  name: string,
  access: LicenseAccess,
): ToolResult {
  const item = catalog.findComponent(name);
  if (!item) return fail(`Unknown component: "${name}"`);
  if (!allowPro(item, access)) return proDenied(name, access);
  const ai = catalog.getAi(name);
  if (!ai?.install) {
    // Keep in sync with packages/docs-metadata/src/distribution.ts
    // (PACKAGES_PUBLISHED). MCP stays dependency-light so this is duplicated.
    return ok({
      npm: "Available at launch: npm install @hewnui/ui",
      cli: `Available at launch: npx hewnui@latest add ${name}. Until then copy from docs or https://hewnui.dev/r/${name}.json`,
    });
  }
  return ok(ai.install);
}

export function getTheme(catalog: Catalog, id?: string): ToolResult {
  if (!id) return ok(catalog.listThemes());
  const theme = catalog.getTheme(id);
  if (!theme) return fail(`Unknown theme pack: "${id}"`);
  return ok(theme);
}

export function getTokens(
  catalog: Catalog,
  opts: { component?: string; theme?: string },
  access: LicenseAccess,
): ToolResult {
  if (opts.component) {
    const item = catalog.findComponent(opts.component);
    if (!item) return fail(`Unknown component: "${opts.component}"`);
    if (!allowPro(item, access)) return proDenied(opts.component, access);
    const ai = catalog.getAi(opts.component);
    return ok({
      source: "component",
      name: opts.component,
      tokens: ai?.tokens ?? [],
    });
  }

  if (opts.theme) {
    const theme = catalog.getTheme(opts.theme);
    if (!theme) return fail(`Unknown theme pack: "${opts.theme}"`);
    return ok({
      source: "theme",
      id: theme.id,
      modes: theme.modes,
      tokens: [
        "--kp-background",
        "--kp-foreground",
        "--kp-surface",
        "--kp-accent",
        "--kp-accent-foreground",
        "--kp-border",
        "--kp-ring",
        "--kp-danger",
        "--kp-success",
        "--kp-warning",
        "--kp-info",
        "--kp-radius-md",
        "--kp-motion-duration",
        "--kp-motion-duration-fast",
        "--kp-motion-duration-slow",
        "--kp-motion-ease-standard",
      ],
    });
  }

  return fail("Provide component or theme");
}

export function getLicenseStatus(access: LicenseAccess): ToolResult {
  return ok({
    proUnlocked: access.proUnlocked,
    source: access.source,
    hint: access.hint ?? null,
    note: access.proUnlocked
      ? "Pro unlocked — payment verification is not live yet."
      : "Pro remains fail-closed until payment verification ships.",
  });
}
