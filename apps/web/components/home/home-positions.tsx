import { HomePositionsDeferred } from "@/components/home/home-positions-deferred";

export function HomePositions() {
  return (
    <section className="relative overflow-hidden border-y border-border/70">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_20%_40%,color-mix(in_oklch,var(--kp-accent)_14%,transparent),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <div>
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            House rules
          </p>
          <HomePositionsDeferred />
        </div>
      </div>
    </section>
  );
}
