import { ProWaitlistForm } from "@/components/pro/pro-waitlist-form";
import { ProPreorder } from "@/components/pro/pro-preorder";
import { proCopy } from "@/components/pro/pro-content";
import type { CheckoutProvider } from "@/lib/checkout/types";

type ProHeroProps = {
  preorder: null | { priceDisplay: string; providerId: CheckoutProvider["id"] };
};

export function ProHero({ preorder }: ProHeroProps) {
  return (
    <section
      aria-labelledby="pro-hero-heading"
      className="relative border-b border-border/70"
      data-visual-pro
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:items-start md:gap-16 md:px-8 md:py-24">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {proCopy.eyebrow}
          </p>
          <p className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {proCopy.brand}
          </p>
          <h1
            id="pro-hero-heading"
            className="mt-4 max-w-[18ch] text-4xl font-semibold tracking-tight text-balance md:text-5xl"
          >
            {proCopy.headline}
          </h1>
          <p className="mt-5 max-w-[46ch] text-base text-pretty text-muted-foreground md:text-lg">
            {proCopy.support}
          </p>
        </div>

        <div
          id="waitlist"
          className="space-y-6 rounded-[var(--kp-radius-lg)] border border-border/70 bg-[color-mix(in_oklch,var(--kp-background)_88%,transparent)] p-5 shadow-[var(--kp-shadow-surface)] md:p-6 scroll-mt-24"
        >
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              {proCopy.waitlistHeading}
            </h2>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">
              {proCopy.waitlistSupport}
            </p>
            <p className="mt-3 text-sm text-pretty text-muted-foreground">
              {proCopy.blocksIntro}
            </p>
          </div>
          <ProWaitlistForm source="pro" />
          {preorder ? (
            <ProPreorder
              priceDisplay={preorder.priceDisplay}
              providerId={preorder.providerId}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
