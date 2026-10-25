import { canRenderPreorder } from "@/lib/checkout/config";
import { createDemoCheckoutProvider } from "@/lib/checkout/demo";
import type { CheckoutProvider } from "@/lib/checkout/types";
import { getProMode } from "@/lib/pro/mode";

export {
  canRenderPreorder,
  getConfiguredPriceDisplay,
  PRO_PREORDER_PRICE_ENV,
} from "@/lib/checkout/config";
export { createDemoCheckoutProvider } from "@/lib/checkout/demo";
export type {
  CheckoutProvider,
  CheckoutSessionInput,
  CheckoutSessionResult,
} from "@/lib/checkout/types";

/**
 * Resolve checkout provider for preorder mode.
 * Returns null when preorder must not render (wrong mode or no price).
 */
export function getCheckoutProvider(
  env: Record<string, string | undefined> = process.env,
): CheckoutProvider | null {
  if (getProMode(env) !== "preorder") return null;
  if (!canRenderPreorder(env)) return null;
  return createDemoCheckoutProvider();
}
