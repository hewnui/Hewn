export type WaitlistSource = "pro" | "home" | "unknown";

export type WaitlistEntry = {
  email: string;
  joinedAt: string;
  source: WaitlistSource;
};

export type WaitlistResult =
  | { ok: true; alreadyJoined: boolean }
  | { ok: false; code: WaitlistErrorCode; message: string };

export type WaitlistErrorCode =
  | "invalid_email"
  | "rate_limited"
  | "unavailable"
  | "bad_request";

export const WAITLIST_HASH_KEY = "waitlist:pro";
export const WAITLIST_RATE_PREFIX = "waitlist:rl:";

/** Max submissions per IP window. */
export const WAITLIST_RATE_LIMIT = 5;
/** Rate window in seconds (1 hour). */
export const WAITLIST_RATE_WINDOW_SEC = 60 * 60;

export const WAITLIST_EMAIL_MAX = 254;
