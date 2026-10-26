import { siteUrl } from "@/lib/site";
import { source } from "@/lib/source";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map((page) => ({
    url: new URL(page.url, siteUrl).toString(),
    changeFrequency: "weekly" as const,
    // The docs index outranks individual component pages.
    priority: page.url === "/docs" ? 0.8 : 0.6,
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/pro", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: new URL("/privacy", siteUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...docs,
  ];
}
