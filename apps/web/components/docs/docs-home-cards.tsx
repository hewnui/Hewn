import { galleryTotals } from "@/components/docs/docs-gallery-data";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

const paths = [
  {
    href: "/docs/theme-lab",
    label: "Theme Lab",
    detail: "One pack at a time — mode, glass, radius, motion",
    index: "01",
  },
  {
    href: "/docs/theme-studio",
    label: "Theme Studio",
    detail: "Author accent + radius, export a drop-in CSS pack",
    index: "02",
  },
  {
    href: "/docs/themes",
    label: "Themes",
    detail: "Forest, Tide, Graphite, Dune, Clay, Ember",
    index: "03",
  },
  {
    href: "/docs/motion",
    label: "Motion",
    detail: "Tokens, full / reduced / off, transform-only rules",
    index: "04",
  },
] as const;

export function DocsHomeCards() {
  const count = String(galleryTotals.components).padStart(2, "0");
  const categories = String(galleryTotals.categories).padStart(2, "0");

  return (
    <div className="not-prose mt-10 space-y-14">
      <div className="grid gap-12 md:grid-cols-[1.35fr_1fr] md:gap-16">
        <Link
          href="/docs/components"
          className="group block border-t border-accent/40 pt-5 transition-transform active:scale-[0.99]"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            Gallery
          </span>
          <span className="mt-3 block font-display text-3xl font-medium tracking-tight text-balance md:text-4xl">
            Browse components
          </span>
          <span className="mt-3 block max-w-[42ch] text-sm leading-relaxed text-pretty text-muted-foreground">
            {count} specimens across {categories} categories. Open a control,
            then change theme from the sidebar.
          </span>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
            Open gallery
            <ArrowRightIcon
              aria-hidden
              weight="bold"
              className="size-3.5 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-1"
            />
          </span>
        </Link>

        <div className="border-t border-border/70 pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Continue
          </p>
          <ul className="mt-3 divide-y divide-border/60">
            {paths.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-3 py-3.5 transition-transform active:scale-[0.995]"
                >
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                    {item.index}
                  </span>
                  <span>
                    <span className="block text-sm font-medium tracking-tight group-hover:text-accent">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {item.detail}
                    </span>
                  </span>
                  <ArrowRightIcon
                    aria-hidden
                    weight="bold"
                    className="size-3.5 text-muted-foreground opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 pt-6">
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
          6 packs · glass · motion · npm + registry
        </p>
        <p className="mt-2 max-w-[52ch] text-xs leading-relaxed text-muted-foreground">
          Canonical TypeScript source. Material and reduced motion are global —
          every specimen follows the active appearance.
        </p>
      </div>
    </div>
  );
}
