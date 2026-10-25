import { describe, expect, it } from "vitest";
import {
  DEFAULT_SITE_URL,
  FORBIDDEN_SITE_HOSTS,
  hostnameOf,
  LEGACY_VERCEL_SITE_URL,
  SECONDARY_SITE_URL,
  isForbiddenSiteHost,
  resolveCanonicalSiteUrl,
  stripTrailingSlash,
} from "./index.js";

describe("@hewnui/site-url", () => {
  it("defaults to the hewnui.dev brand domain", () => {
    expect(DEFAULT_SITE_URL).toBe("https://hewnui.dev");
    expect(hostnameOf(DEFAULT_SITE_URL)).toBe("hewnui.dev");
    expect(hostnameOf(SECONDARY_SITE_URL)).toBe("hewnui.com");
    expect(hostnameOf(LEGACY_VERCEL_SITE_URL)).toBe("komponents-dev.vercel.app");
  });

  it("rejects the unregistered .dev placeholder host", () => {
    expect(FORBIDDEN_SITE_HOSTS).toContain("komponents.dev");
    expect(isForbiddenSiteHost("komponents.dev")).toBe(true);
    expect(isForbiddenSiteHost("Komponents.DEV.")).toBe(true);
    expect(isForbiddenSiteHost("komponents-dev.vercel.app")).toBe(false);
  });

  it("resolveCanonicalSiteUrl prefers HEWN_SITE_URL then NEXT_PUBLIC_SITE_URL", () => {
    expect(
      resolveCanonicalSiteUrl({
        HEWN_SITE_URL: "https://example.com/",
        NEXT_PUBLIC_SITE_URL: "https://ignored.example",
      }),
    ).toBe("https://example.com");

    expect(
      resolveCanonicalSiteUrl({
        NEXT_PUBLIC_SITE_URL: "https://next.example/",
      }),
    ).toBe("https://next.example");

    expect(
      resolveCanonicalSiteUrl({
        KOMPONENTS_SITE_URL: "https://legacy.example/",
        NEXT_PUBLIC_SITE_URL: "https://ignored.example",
      }),
    ).toBe("https://legacy.example");

    expect(resolveCanonicalSiteUrl({})).toBe(DEFAULT_SITE_URL);
  });

  it("stripTrailingSlash is idempotent", () => {
    expect(stripTrailingSlash("https://a.example///")).toBe("https://a.example");
    expect(stripTrailingSlash(DEFAULT_SITE_URL)).toBe(DEFAULT_SITE_URL);
  });
});
