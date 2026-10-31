import { HomeFooter } from "@/components/home/home-footer";
import { HomeNav } from "@/components/home/home-nav";
import { ProAtmosphere } from "@/components/pro/pro-atmosphere";
import { ProBlocks } from "@/components/pro/pro-blocks";
import { ProHero } from "@/components/pro/pro-hero";
import { ProJsonLd } from "@/components/pro/pro-json-ld";
import { ProPrivacy } from "@/components/pro/pro-privacy";
import { proCopy } from "@/components/pro/pro-content";
import {
  canRenderPreorder,
  getCheckoutProvider,
  getConfiguredPriceDisplay,
} from "@/lib/checkout";
import { getProMode } from "@/lib/pro/mode";
import { proOgCopy } from "@/lib/og/pro-og-copy";
import { siteName } from "@/lib/site";
import type { Metadata } from "next";

const proShare = proOgCopy();

export const metadata: Metadata = {
  title: "Pro",
  description: proCopy.support,
  alternates: { canonical: "/pro" },
  openGraph: {
    type: "website",
    siteName,
    title: `${proShare.brand} · Waitlist`,
    description: proCopy.support,
    url: "/pro",
  },
  twitter: {
    card: "summary_large_image",
    title: `${proShare.brand} · Waitlist`,
    description: proCopy.support,
  },
};

export default function ProPage() {
  const mode = getProMode();
  const priceDisplay = getConfiguredPriceDisplay();
  const provider = getCheckoutProvider();
  const preorder =
    mode === "preorder" && canRenderPreorder() && provider && priceDisplay
      ? { priceDisplay, providerId: provider.id }
      : null;

  return (
    <main className="relative min-h-[100dvh] overflow-x-clip">
      <ProJsonLd />
      <ProAtmosphere />
      <HomeNav />
      <ProHero preorder={preorder} />
      <ProBlocks />
      <ProPrivacy />
      <HomeFooter />
    </main>
  );
}
