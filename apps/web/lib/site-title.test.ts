import { describe, expect, it } from "vitest";
import { siteName, siteTitle } from "./site";

describe("siteTitle", () => {
  it("is descriptive, branded, and within ~80 characters", () => {
    expect(siteTitle.startsWith(siteName)).toBe(true);
    expect(siteTitle).not.toBe(siteName);
    expect(siteTitle.length).toBeLessThanOrEqual(80);
    expect(siteTitle).toContain("React components");
    expect(siteTitle).toMatch(/React Aria/i);
    expect(siteTitle).toMatch(/Tailwind/i);
    expect(siteTitle).toMatch(/Motion/i);
  });
});
