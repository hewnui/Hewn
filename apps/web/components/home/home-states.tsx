import { HomeStatesDeferred } from "@/components/home/home-states-deferred";

export function HomeStates() {
  return (
    <section
      id="states"
      className="scroll-mt-20 border-y border-border/70 bg-[color-mix(in_oklch,var(--kp-muted)_28%,transparent)]"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[42ch]">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              States
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              The states other sites forget.
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Loading, empty, error, and validation are not docs footnotes —
              they are the product people actually touch.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <HomeStatesDeferred />
        </div>
      </div>
    </section>
  );
}
