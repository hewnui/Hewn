import { claims } from "@/components/home/content";
import { ArrowDownRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowDownRight";

export function HomeClaimStrip() {
  return (
    <section
      id="claims"
      className="scroll-mt-20 border-y border-border/70 bg-[color-mix(in_oklch,var(--kp-muted)_35%,transparent)]"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          What most libraries skip — each one is proven below
        </p>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {claims.map((claim, index) => (
            <li key={claim.href}>
              <a
                href={claim.href}
                className="group flex items-baseline gap-4 border-b border-border/60 py-5 transition-colors hover:border-accent/50"
              >
                <span className="font-mono text-xs tabular-nums text-muted-foreground transition-colors group-hover:text-accent">
                  0{index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-medium tracking-tight text-balance md:text-xl">
                    {claim.text}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {claim.chapter}
                  </span>
                </span>
                <ArrowDownRightIcon
                  aria-hidden
                  className="size-4 shrink-0 self-center text-muted-foreground transition-[color,transform] group-hover:translate-y-0.5 group-hover:text-accent"
                  weight="bold"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
