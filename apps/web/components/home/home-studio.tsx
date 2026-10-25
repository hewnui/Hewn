import { studio } from "@/components/home/content-product";
import { HomeStudioDeferred } from "@/components/home/home-studio-deferred";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

export function HomeStudio() {
  return (
    <section id="theme-studio" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[20ch]">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {studio.eyebrow}
            </p>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-tighter text-balance md:text-5xl">
              {studio.headline}
            </h2>
          </div>
          <Link
            href={studio.cta.href}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-[var(--kp-radius-md)] bg-accent px-5 text-sm font-medium text-accent-foreground shadow-[var(--kp-shadow-surface)] transition-transform active:scale-[0.96] md:mb-1"
          >
            {studio.cta.label}
            <ArrowRightIcon aria-hidden className="size-4" weight="bold" />
          </Link>
        </div>
        <p className="mt-6 max-w-[62ch] text-pretty text-muted-foreground">
          {studio.support}
        </p>
      </div>

      <div className="mt-12">
        <p className="mx-auto mb-3 max-w-[1400px] px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:px-8">
          {studio.ladderLabel}
        </p>
        <HomeStudioDeferred />
      </div>

      <div className="mx-auto mt-14 max-w-[1400px] px-4 md:px-8">
        <ol className="grid gap-8 md:grid-cols-[0.9fr_1.15fr_0.95fr] md:gap-0">
          {studio.steps.map((step, index) => (
            <li
              key={step.id}
              className="md:not-last:border-r md:not-last:border-border/70 md:not-first:pl-8 md:not-last:pr-8 lg:not-first:pl-12 lg:not-last:pr-12"
            >
              <p className="font-mono text-xs tabular-nums text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-xl font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-pretty text-muted-foreground">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
