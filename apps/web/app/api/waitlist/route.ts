import { clientIpFromHeaders } from "@/lib/waitlist/rate-limit";
import { subscribeToWaitlist } from "@/lib/waitlist/subscribe";
import type { WaitlistResult } from "@/lib/waitlist/types";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  email?: unknown;
  source?: unknown;
  company?: unknown;
};

function statusFor(result: WaitlistResult): number {
  if (result.ok) return 200;
  switch (result.code) {
    case "invalid_email":
    case "bad_request":
      return 400;
    case "rate_limited":
      return 429;
    case "unavailable":
      return 503;
    default:
      return 400;
  }
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "bad_request",
        message: "Expected JSON body.",
      } satisfies WaitlistResult,
      { status: 400 },
    );
  }

  const result = await subscribeToWaitlist({
    email: body.email,
    source: body.source,
    company: body.company,
    ip: clientIpFromHeaders(request.headers),
  });

  return NextResponse.json(result, { status: statusFor(result) });
}
