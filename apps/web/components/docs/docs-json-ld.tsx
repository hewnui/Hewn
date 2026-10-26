import { siteName, siteUrl } from "@/lib/site";

type DocsJsonLdProps = {
  title: string;
  description?: string;
  url: string;
};

/** TechArticle + BreadcrumbList JSON-LD for docs pages. */
export function DocsJsonLd({ title, description, url }: DocsJsonLdProps) {
  const absolute = new URL(url, siteUrl).toString();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: title,
        name: `${title} · ${siteName}`,
        ...(description ? { description } : {}),
        url: absolute,
        isPartOf: {
          "@type": "WebSite",
          name: siteName,
          url: siteUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Docs",
            item: new URL("/docs", siteUrl).toString(),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: absolute,
          },
        ],
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
