import { proCopy } from "@/components/pro/pro-content";
import { siteName, siteUrl } from "@/lib/site";

/** WebPage JSON-LD for /pro — no invented prices or offers. */
export function ProJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${proCopy.brand} · ${siteName}`,
    description: proCopy.support,
    url: new URL("/pro", siteUrl).toString(),
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}