import { getHomeCatalog } from "@/components/home/home-catalog-data";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

const catalog = getHomeCatalog();

export function HomeCatalog() {
  return (
    <section
      id="catalog"
      className="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-20 md:px-8 md:py-28"
    >
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-[46ch]">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {catalog.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {catalog.headline}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {catalog.support}
          </p>
        </div>
        <p
          aria-hidden
          className="font-mono text-[5.5rem] font-medium leading-[0.8] tracking-tighter tabular-nums text-accent/75 md:text-[8rem]"
        >
          {catalog.total}
        </p>
      </div>

      <div className="mt-12 border-t border-border/70">
        <ul className="divide-y divide-border/70">
          {catalog.groups.map((group, index) => (
            <li key={group.name}>
              <Link
                href={group.href}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 py-5 transition-colors hover:bg-[color-mix(in_oklch,var(--kp-accent)_5%,transparent)] md:gap-x-8 md:py-6"
              >
                <span className="w-10 font-mono text-xs tabular-nums text-muted-foreground transition-colors group-hover:text-accent md:w-14">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block text-xl font-medium tracking-tight transition-transform group-hover:translate-x-1 md:text-2xl">
                    {group.name}
                  </span>
                  <span className="mt-1 block truncate text-sm text-muted-foreground">
                    {group.items}
                  </span>
                </span>
                <span className="flex items-center gap-4">
                  <span className="font-mono text-lg tabular-nums text-muted-foreground md:text-xl">
                    {group.count}
                  </span>
                  <ArrowRightIcon
                    aria-hidden
                    className="size-4 text-muted-foreground opacity-0 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                    weight="bold"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <Link
          href={catalog.cta.href}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-[color,transform] hover:text-foreground active:scale-[0.96]"
        >
          {catalog.cta.label}
          <ArrowRightIcon aria-hidden className="size-4" weight="bold" />
        </Link>
      </div>
    </section>
  );
}
