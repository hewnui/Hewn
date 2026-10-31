import { Providers } from "@/components/providers";
import { appearanceScript } from "@/lib/appearance-script";
import { isIndexableDeployment } from "@/lib/deployment-indexing";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  // 400 covers LCP body/prose; 600 covers semibold UI. Skip 500 so the
  // preloaded woff2 stays smaller — font-medium synthesizes from 400/600.
  weight: ["400", "600"],
  variable: "--font-plex-sans",
  // optional: if the face misses the first paint window, keep the fallback for
  // the page lifetime so text LCP is not deferred to Slow-4G font completion.
  display: "optional",
  preload: true,
  adjustFontFallback: true,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
  display: "optional",
  // Mono is secondary chrome; avoid competing with body text for preload slots.
  preload: false,
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-space-grotesk",
  display: "optional",
  // Display face is hero/brand only; still loaded, just not render-blocking.
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  robots: isIndexableDeployment()
    ? { index: true, follow: true }
    : { index: false, follow: false },
  // Do not set alternates.canonical or openGraph.url here — every child route
  // would inherit "/" and tell crawlers to drop non-home pages. Homepage and
  // docs pages set their own canonical / og:url.
  openGraph: {
    type: "website",
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="forest"
      data-mode="light"
      data-material="solid"
      data-radius="soft"
      data-motion="full"
      className={`${plexSans.variable} ${plexMono.variable} ${spaceGrotesk.variable}`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body className={`${plexSans.className} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
