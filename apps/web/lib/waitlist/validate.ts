import {
  WAITLIST_EMAIL_MAX,
  type WaitlistSource,
} from "@/lib/waitlist/types";

/** Practical email shape — length + single @ with non-empty local/domain. */
const EMAIL_RE =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;

export function normalizeEmail(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  if (!email || email.length > WAITLIST_EMAIL_MAX) return false;
  if (email.includes("..")) return false;
  return EMAIL_RE.test(email);
}

export function parseSource(raw: unknown): WaitlistSource {
  if (raw === "pro" || raw === "home") return raw;
  return "unknown";
}

export type ValidatedWaitlistInput =
  | { ok: true; email: string; source: WaitlistSource; honeypot: boolean }
  | { ok: false; code: "invalid_email" | "bad_request"; message: string };

export function validateWaitlistInput(input: {
  email?: unknown;
  source?: unknown;
  /** Honeypot — non-empty means bot; callers should fake success. */
  company?: unknown;
}): ValidatedWaitlistInput {
  const honeypot =
    typeof input.company === "string" && input.company.trim() !== "";

  if (input.email !== undefined && typeof input.email !== "string") {
    return {
      ok: false,
      code: "bad_request",
      message: "Email is required.",
    };
  }

  const email = normalizeEmail(input.email);
  if (!isValidEmail(email)) {
    return {
      ok: false,
      code: "invalid_email",
      message: "Enter a valid email address.",
    };
  }

  return {
    ok: true,
    email,
    source: parseSource(input.source),
    honeypot,
  };
}
