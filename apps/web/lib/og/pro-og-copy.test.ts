import { proCatalogSummary } from "@/lib/pro/blocks-catalog";
import { describe, expect, it } from "vitest";
import { proOgAlt, proOgCopy } from "./pro-og-copy";

describe("proOgCopy", () => {
  it("matches the planned catalog and coming-soon status", () => {
    const catalog = proCatalogSummary();
    const copy = proOgCopy();

    expect(copy.brand).toBe("Hewn UI Pro");
    expect(copy.headline).toMatch(/coming soon/i);
    expect(copy.support).toContain(`${catalog.blockCount} planned blocks`);
    expect(copy.support).toContain(`${catalog.pageCount} planned pages`);
    expect(copy.support).toMatch(/not available yet/i);
    expect(copy.support).not.toMatch(/\$|price|pricing/i);
    expect(copy.footerRight).toContain(`${catalog.blockCount} blocks`);
    expect(copy.footerRight).toMatch(/waitlist/i);
    expect(proOgAlt).toMatch(/coming soon/i);
  });
});
