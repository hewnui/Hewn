import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

const links = [
  {
    href: "/llms.txt",
    title: "llms.txt",
    detail: "Generated docs index for agents and tools.",
  },
  {
    href: "/ai/index.json",
    title: "AI schema",
    detail: "Structured component contracts for codegen.",
  },
  {
    href: "/docs/mcp",
    title: "MCP server",
    detail: "Coming soon — read-only stdio tools over the registry.",
  },
] as const;

export function HomeAi() {
  return (
    <section
      id="ai"
      className="scroll-mt-20 border-y border-border/70 bg-[color-mix(in_oklch,var(--kp-muted)_22%,transparent)]"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div className="max-w-[42ch]">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              AI-native
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Docs machines can read.
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              llms.txt and a versioned component schema are live today. A
              read-only MCP server is coming soon — so agents will search the
              same source of truth your docs do.
            </p>
          </div>

          <ul className="divide-y divide-border/70 border-y border-border/70">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex min-h-11 items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      {link.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                      {link.detail}
                    </span>
                  </span>
                  <ArrowRightIcon
                    aria-hidden
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                    weight="bold"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
