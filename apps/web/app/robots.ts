import { isIndexableDeployment } from "@/lib/deployment-indexing";
import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/qa/", "/qa/visual"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
