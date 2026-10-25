import { HomeA11y } from "@/components/home/home-a11y";
import { HomeAi } from "@/components/home/home-ai";
import { HomeAtmosphere } from "@/components/home/home-atmosphere";
import { HomeBackToTopDeferred } from "@/components/home/home-back-to-top-deferred";
import { HomeCatalog } from "@/components/home/home-catalog";
import { HomeClaimStrip } from "@/components/home/home-claim-strip";
import { HomeCta } from "@/components/home/home-cta";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeHero } from "@/components/home/home-hero";
import { HomeIdentity } from "@/components/home/home-identity";
import { HomeJsonLd } from "@/components/home/home-json-ld";
import { HomeMaterial } from "@/components/home/home-material";
import { HomeMotion } from "@/components/home/home-motion";
import { HomeNav } from "@/components/home/home-nav";
import { HomeOwnership } from "@/components/home/home-ownership";
import { HomePositions } from "@/components/home/home-positions";
import { HomeProduct } from "@/components/home/home-product";
import { HomeProTeaser } from "@/components/home/home-pro-teaser";
import { HomeStates } from "@/components/home/home-states";
import { HomeStudio } from "@/components/home/home-studio";
import { siteDescription, siteName } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-clip">
      <HomeJsonLd />
      <HomeAtmosphere />
      <HomeNav />
      <HomeHero />
      <HomeClaimStrip />
      <HomeIdentity />
      <HomeProduct />
      <HomeStudio />
      <HomeAi />
      <HomeCatalog />
      <HomeMotion />
      <HomeMaterial />
      <HomeStates />
      <HomeA11y />
      <HomePositions />
      <HomeOwnership />
      <HomeProTeaser />
      <HomeCta />
      <HomeFooter />
      <HomeBackToTopDeferred />
    </main>
  );
}
