/**
 * Pre-order price gate. No display amount is hard-coded here.
 * Preorder UI must call `getConfiguredPriceDisplay` and refuse to render
 * when this returns null — so a missing env never shows a price by accident.
 */
export const PRO_PREORDER_PRICE_ENV = "PRO_PREORDER_PRICE_DISPLAY";

/**
 * Returns a configured display price, or null when unset / placeholder-like.
 * Never invents a price.
 */
export function getConfiguredPriceDisplay(
  env: Record<string, string | undefined> = process.env,
): string | null {
  const raw = env[PRO_PREORDER_PRICE_ENV]?.trim();
  if (!raw) return null;
  if (/^(tbd|n\/?a|placeholder|price[_\s-]?tbd|\$?0(\.00)?)$/i.test(raw)) {
    return null;
  }
  return raw;
}

export function canRenderPreorder(
  env: Record<string, string | undefined> = process.env,
): boolean {
  return getConfiguredPriceDisplay(env) !== null;
}
