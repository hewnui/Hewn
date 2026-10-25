import type { LicenseAccess } from "./license.js";
import type { CatalogItem } from "./types.js";

export const PRO_UNAVAILABLE =
  "Pro access is locked. Payment verification is not enabled yet.";

export function isPro(item: CatalogItem | undefined): boolean {
  return item?.tier === "pro";
}

export function proDenied(
  name: string,
  access?: LicenseAccess,
): { ok: false; error: string } {
  const suffix =
    access?.source === "env" || access?.source === "file"
      ? ` Present key (${access.hint ?? "****"}) does not unlock Pro.`
      : "";
  return {
    ok: false,
    error: `${PRO_UNAVAILABLE} Requested: "${name}".${suffix}`,
  };
}

export function allowPro(
  item: CatalogItem | undefined,
  access: LicenseAccess,
): boolean {
  if (!isPro(item)) return true;
  return access.proUnlocked;
}
