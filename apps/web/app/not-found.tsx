import { HewnLogo } from "@/components/brand/hewn-logo";
import { HomeAtmosphere } from "@/components/home/home-atmosphere";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const routes = [
  { href: "/docs/getting-started", label: "Getting started" },
  { href: "/docs/components", label: "Components" },
  { href: "/docs/themes", label: "Themes" },
  { href: "/docs/theme-lab", label: "Theme Lab" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col overflow-x-clip">
      <HomeAtmosphere />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 py-24 md:px-8">
        <Link
          href="/"
          className="inline-flex min-h-10 w-fit items-center transition-transform active:scale-[0.96]"
        >
          <HewnLogo markClassName="size-7 shrink-0" />
        </Link>

        <p className="mt-16 font-mono text-xs uppercase tracking-[0.18em] text-accent">
          404
        </p>
        <h1 className="mt-3 max-w-[18ch] text-4xl font-semibold tracking-tight text-balance md:text-6xl">
          This route was never shipped.
        </h1>
        <p className="mt-5 max-w-[52ch] text-pretty text-muted-foreground">
          The page you asked for does not exist. Here is where most people are
          heading.
        </p>

        <nav aria-label="Popular pages" className="mt-12 border-t border-border/70">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="flex min-h-16 items-center justify-between gap-6 border-b border-border/70 text-lg transition-[color,padding] hover:pl-2 hover:text-accent"
            >
              {route.label}
              <span aria-hidden className="font-mono text-sm text-muted-foreground">
                →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
