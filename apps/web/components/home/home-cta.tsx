import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

export function HomeCta() {
  return (
    <section className="border-t border-border/70">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Next
            </p>
            <h2 className="max-w-[16ch] text-3xl font-semibold tracking-tight text-balance md:text-5xl">
              Build with taste, ship with proof.
            </h2>
            <p className="mt-4 max-w-[48ch] text-muted-foreground">
              Read the docs, stress-test Theme Lab, or jump straight into the
              component gallery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/docs"
              className="inline-flex min-h-11 items-center gap-2 rounded-[var(--kp-radius-md)] bg-accent px-5 text-sm font-medium text-accent-foreground shadow-[var(--kp-shadow-surface)] transition-transform active:scale-[0.96]"
            >
              Explore docs
              <ArrowRightIcon aria-hidden className="size-4" weight="bold" />
            </Link>
            <Link
              href="/docs/theme-lab"
              data-kp-surface
              className="inline-flex min-h-11 items-center rounded-[var(--kp-radius-md)] border px-5 text-sm font-medium transition-[transform,background-color] active:scale-[0.96]"
            >
              Open Theme Lab
            </Link>
            <Link
              href="/docs/components"
              className="inline-flex min-h-11 items-center rounded-[var(--kp-radius-md)] px-5 text-sm font-medium text-muted-foreground transition-[color,transform,background-color] hover:bg-muted/50 hover:text-foreground active:scale-[0.96]"
            >
              Browse components
            </Link>
            <Link
              href="/pro#waitlist"
              className="inline-flex min-h-11 items-center rounded-[var(--kp-radius-md)] px-5 text-sm font-medium text-muted-foreground transition-[color,transform,background-color] hover:bg-muted/50 hover:text-foreground active:scale-[0.96]"
            >
              Pro waitlist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
