import { codeSample, ownership } from "@/components/home/content";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

const paths = [
  ["docs", ownership.docs],
  ["cli", ownership.cli],
] as const;

export function HomeOwnership() {
  return (
    <section
      id="ownership"
      className="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-20 md:px-8 md:py-28"
    >
      <div className="max-w-[54ch]">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Ownership
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          One source. Docs first.
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          Canonical TypeScript in one tree. Registry JSON and docs work today;
          npm packages and the CLI publish at launch — same API either way.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        <div>
          <div
            data-kp-surface
            className="overflow-hidden rounded-[calc(var(--kp-radius-lg)+0.7rem)] border shadow-[var(--kp-shadow-surface)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                app/settings/page.tsx
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                TypeScript
              </span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 md:px-6">
              <code className="font-mono text-xs leading-[1.75] text-muted-foreground md:text-[13px]">
                {codeSample}
              </code>
            </pre>
          </div>
        </div>

        <div>
          <ul className="divide-y divide-border/70 border-y border-border/70">
            {paths.map(([key, item]) => (
              <li key={key} className="py-6 first:pt-0 last:pb-0">
                <h3 className="text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[42ch] text-sm text-pretty text-muted-foreground">
                  {item.detail}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-[color,transform] hover:text-foreground active:scale-[0.96]"
                >
                  {item.label}
                  <ArrowRightIcon aria-hidden className="size-4" weight="bold" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
