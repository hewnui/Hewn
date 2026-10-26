import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security-headers";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@hewnui/motion",
    "@hewnui/registry",
    "@hewnui/themes",
    "@hewnui/ui",
  ],
  experimental: {
    // Tree-shake barrel imports from icon / docs UI packages on docs routes.
    optimizePackageImports: [
      "@hewnui/registry",
      "@hewnui/ui",
      "@phosphor-icons/react",
      "fumadocs-ui",
      "fumadocs-core",
    ],
  },
  async redirects() {
    // Secondary brand hosts → canonical https://hewnui.dev. Inert until the
    // domains are attached to the Vercel project; komponents-dev.vercel.app is
    // intentionally not redirected so it keeps serving during the cutover.
    const hostRedirects = ["hewnui.com", "www.hewnui.com", "www.hewnui.dev"].map(
      (host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://hewnui.dev/:path*",
        permanent: true,
      }),
    );
    return [
      ...hostRedirects,
      {
        source: "/docs/installation",
        destination: "/docs/getting-started",
        permanent: true,
      },
      {
        source: "/docs/install",
        destination: "/docs/getting-started",
        permanent: true,
      },
      {
        source: "/docs/theming",
        destination: "/docs/themes",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply to all routes, including prerendered docs and marketing pages.
        source: "/:path*",
        headers: securityHeaders(),
      },
    ];
  },
};

export default createMDX()(config);
