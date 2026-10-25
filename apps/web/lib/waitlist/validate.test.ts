import { describe, expect, it } from "vitest";
import {
  isValidEmail,
  normalizeEmail,
  validateWaitlistInput,
} from "@/lib/waitlist/validate";

describe("normalizeEmail", () => {
  it("trims and lowercases", () => {
    expect(normalizeEmail("  Alex@Example.COM ")).toBe("alex@example.com");
  });
});

describe("isValidEmail", () => {
  it("accepts common addresses", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("dev+pro@example.com")).toBe(true);
  });

  it("rejects empty, overlong, and malformed", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail(`${"a".repeat(250)}@x.com`)).toBe(false);
  });
});

describe("validateWaitlistInput", () => {
  it("normalizes a valid payload", () => {
    const result = validateWaitlistInput({
      email: "  Jo@Example.com ",
      source: "pro",
    });
    expect(result).toEqual({
      ok: true,
      email: "jo@example.com",
      source: "pro",
      honeypot: false,
    });
  });

  it("flags honeypot without failing validation shape", () => {
    const result = validateWaitlistInput({
      email: "bot@example.com",
      company: "Acme Corp",
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.honeypot).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = validateWaitlistInput({ email: "nope" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("invalid_email");
  });
});
