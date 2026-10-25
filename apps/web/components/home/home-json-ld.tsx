import { galleryTotals } from "@/components/docs/docs-gallery-data";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

/** Organization + SoftwareApplication JSON-LD for the marketing homepage. */
export function HomeJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
        description: siteDescription,
      },
      {
        "@type": "SoftwareApplication",
        name: siteName,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        url: siteUrl,
        description: `${siteDescription} ${galleryTotals.components} free components; Pro waitlist at /pro.`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
