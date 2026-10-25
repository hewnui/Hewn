import type {
  CheckoutProvider,
  CheckoutSessionInput,
  CheckoutSessionResult,
} from "@/lib/checkout/types";

/**
 * Demo checkout — never charges. Used when PRO_MODE=preorder and a price
 * display is configured, until a live Stripe provider is wired.
 */
export function createDemoCheckoutProvider(): CheckoutProvider {
  return {
    id: "demo",
    async createCheckoutSession(
      _input: CheckoutSessionInput,
    ): Promise<CheckoutSessionResult> {
      return {
        kind: "demo",
        message:
          "Pre-order checkout is not live yet. No charge was made — join the waitlist instead.",
      };
    },
  };
}
