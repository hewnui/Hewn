/**
 * Stripe-ready checkout shape (mirrors dev-pro PaymentProvider intent).
 * Demo implementation must not charge.
 */
export type CheckoutSessionInput = {
  email?: string;
  successUrl: string;
  cancelUrl: string;
};

export type CheckoutSessionResult =
  | { kind: "redirect"; url: string }
  | { kind: "demo"; message: string }
  | { kind: "denied"; reason: string };

export type CheckoutProvider = {
  id: "demo" | "stripe";
  createCheckoutSession(
    input: CheckoutSessionInput,
  ): Promise<CheckoutSessionResult>;
};
