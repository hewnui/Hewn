import { getCheckoutProvider } from "@/lib/checkout";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe-ready session endpoint. Demo provider never charges.
 * Refuses when PRO_MODE is not preorder or price is not configured.
 */
export async function POST(request: Request) {
  const provider = getCheckoutProvider();
  if (!provider) {
    return NextResponse.json(
      {
        kind: "denied",
        reason:
          "Pre-order is not available. Join the waitlist on /pro instead.",
      },
      { status: 403 },
    );
  }

  let body: { email?: string; successUrl?: string; cancelUrl?: string } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    body = {};
  }

  const origin = new URL(request.url).origin;
  const result = await provider.createCheckoutSession({
    ...(typeof body.email === "string" ? { email: body.email } : {}),
    successUrl: body.successUrl?.startsWith("/")
      ? `${origin}${body.successUrl}`
      : `${origin}/pro`,
    cancelUrl: body.cancelUrl?.startsWith("/")
      ? `${origin}${body.cancelUrl}`
      : `${origin}/pro`,
  });

  return NextResponse.json(result, {
    status: result.kind === "denied" ? 403 : 200,
  });
}
