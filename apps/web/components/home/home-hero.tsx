import { hero } from "@/components/home/content";
import {
  HomeHeroCluster,
  HomeHeroCue,
  HomeHeroFieldMotion,
  HomeHeroThemes,
} from "@/components/home/home-hero-islands";
import { HomeHeroFieldStatic } from "@/components/home/home-hero-field-static";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

/**
 * Hero shell stays a Server Component so above-the-fold JS is limited to the
 * theme scrubber, specimen island, and scroll cue — not the whole billboard.
 */
export function HomeHero() {
  return (
    <section data-visual-hero className="relative isolate min-h-[88dvh] overflow-hidden">
      <HomeHeroFieldStatic />
      <HomeHeroFieldMotion />

      <div className="relative z-10 mx-auto grid min-h-[88dvh] max-w-[1400px] grid-cols-1 items-center gap-14 px-4 py-16 md:grid-cols-12 md:gap-x-8 md:gap-y-0 md:px-8 md:py-20">
        <div className="relative z-10 md:col-span-7 md:col-start-1 md:row-start-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-display text-lg font-medium tracking-tight text-accent md:text-xl">
              {hero.brand}
            </span>
            <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />
            <HomeHeroThemes />
          </div>

          <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(2.75rem,7.4vw,5rem)] font-medium leading-[0.94] tracking-tighter text-balance">
            {hero.headlineLead}{" "}
            <span className="relative whitespace-nowrap text-accent">
              {hero.headlineAccent}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-accent/70 via-accent/30 to-transparent"
              />
            </span>
            .
          </h1>

          <p className="mt-7 max-w-[52ch] text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            {hero.support}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primaryCta.href}
              className="group inline-flex min-h-11 items-center gap-2 rounded-[var(--kp-radius-md)] bg-accent px-5 text-sm font-medium text-accent-foreground shadow-[var(--kp-shadow-surface)] transition-transform active:scale-[0.96]"
            >
              {hero.primaryCta.label}
              <ArrowRightIcon
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
                weight="bold"
              />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              data-kp-surface
              className="inline-flex min-h-11 items-center rounded-[var(--kp-radius-md)] border px-5 text-sm font-medium transition-[transform,background-color] active:scale-[0.96]"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          <p className="mt-5">
            <Link
              href={hero.docsCta.href}
              className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground transition-[color,transform] hover:text-foreground active:scale-[0.96]"
            >
              {hero.docsCta.label}
              <span aria-hidden className="ms-1">
                →
              </span>
            </Link>
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:row-start-1 md:-mr-[5vw] lg:-mr-[8vw]">
          <HomeHeroCluster />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 mx-auto hidden max-w-[1400px] px-4 md:block md:px-8">
        <span className="pointer-events-auto inline-flex">
          <HomeHeroCue />
        </span>
      </div>
    </section>
  );
}
