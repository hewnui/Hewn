import { HomeFooter } from "@/components/home/home-footer";
import { HomeNav } from "@/components/home/home-nav";
import { ProAtmosphere } from "@/components/pro/pro-atmosphere";
import { ProBlocks } from "@/components/pro/pro-blocks";
import { ProHero } from "@/components/pro/pro-hero";
import { ProPrivacy } from "@/components/pro/pro-privacy";
import { proCopy } from "@/components/pro/pro-content";
import {
  canRenderPreorder,
  getCheckoutProvider,
  getConfiguredPriceDisplay,
} from "@/lib/checkout";
import { getProMode } from "@/lib/pro/mode";
import { siteName } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pro",
  description: proCopy.support,
  alternates: { canonical: "/pro" },
  openGraph: {
    type: "website",
    siteName,
    title: `${proCopy.brand} · ${siteName}`,
    description: proCopy.support,
    url: "/pro",
  },
  twitter: {
    card: "summary_large_image",
    title: `${proCopy.brand} · ${siteName}`,
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
      <ProAtmosphere />
      <HomeNav />
      <ProHero preorder={preorder} />
      <ProBlocks />
      <ProPrivacy />
      <HomeFooter />
    </main>
  );
}
