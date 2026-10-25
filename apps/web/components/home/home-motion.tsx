import { HomeMotionDeferred } from "@/components/home/home-motion-deferred";

export function HomeMotion() {
  return (
    <section
      id="motion"
      className="relative scroll-mt-20 overflow-hidden border-y border-border/70 bg-[color-mix(in_oklch,var(--kp-foreground)_6%,var(--kp-background))]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_0%,color-mix(in_oklch,var(--kp-accent)_15%,transparent),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, color-mix(in oklch, var(--kp-foreground) 60%, transparent) 1px, transparent 1px)",
          backgroundSize: "88px 100%",
          maskImage:
            "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[36ch]">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Motion
            </p>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-tighter text-balance md:text-5xl lg:text-6xl">
              Presence without noise.
            </h2>
          </div>
          <div className="max-w-[44ch] md:pb-2">
            <p className="text-pretty text-muted-foreground">
              Springs on interaction. Layout moves when order changes. Infinite
              loops stay isolated — and reduced motion always wins.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <HomeMotionDeferred />
        </div>
      </div>
    </section>
  );
}
