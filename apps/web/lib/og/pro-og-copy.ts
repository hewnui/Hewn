import { proCatalogSummary } from "@/lib/pro/blocks-catalog";
import { siteHost, siteName } from "@/lib/site";

/** Share-card copy kept in sync with /pro (planned catalog + coming-soon). */
export function proOgCopy() {
  const catalog = proCatalogSummary();
  return {
    brand: "Hewn UI Pro",
    headline: "Application blocks and pages — coming soon",
    support: `${catalog.blockCount} planned blocks and ${catalog.pageCount} planned pages on the free components and themes. Join the waitlist — Pro is not available yet.`,
    footerLeft: siteHost,
    footerRight: `${catalog.blockCount} blocks · ${catalog.pageCount} pages · Waitlist`,
  } as const;
}

export const proOgAlt = `${siteName} Pro — coming soon, join the waitlist`;
