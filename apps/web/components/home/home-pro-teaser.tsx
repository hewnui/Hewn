import { proCopy } from "@/components/pro/pro-content";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

export function HomeProTeaser() {
  return (
    <section
      id="pro"
      aria-labelledby="home-pro-heading"
      className="border-t border-border/70"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {proCopy.teaserEyebrow}
            </p>
            <h2
              id="home-pro-heading"
              className="max-w-[18ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl"
            >
              {proCopy.teaserHeading}
            </h2>
            <p className="mt-4 max-w-[48ch] text-muted-foreground text-pretty">
              {proCopy.teaserSupport}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/pro#waitlist"
              className="inline-flex min-h-11 items-center gap-2 rounded-[var(--kp-radius-md)] bg-accent px-5 text-sm font-medium text-accent-foreground shadow-[var(--kp-shadow-surface)] transition-transform active:scale-[0.96]"
            >
              {proCopy.teaserCta}
              <ArrowRightIcon aria-hidden className="size-4" weight="bold" />
            </Link>
            <Link
              href="/pro#blocks"
              data-kp-surface
              className="inline-flex min-h-11 items-center rounded-[var(--kp-radius-md)] border px-5 text-sm font-medium transition-[transform,background-color] active:scale-[0.96]"
            >
              Preview blocks
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
