import { AppearanceControlsDeferred } from "@/components/appearance-controls-deferred";
import { HewnLogo } from "@/components/brand/hewn-logo";
import { navLinks } from "@/components/home/content";
import { HomeNavMobileDeferred } from "@/components/home/home-nav-mobile-deferred";
import Link from "next/link";

/** Marketing header — links are server-rendered; appearance/mobile are islands. */
export function HomeNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-[color-mix(in_oklch,var(--kp-background)_88%,transparent)] backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_oklch,var(--kp-background)_78%,transparent)]">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2.5 md:gap-4 md:px-8">
        <Link
          href="/"
          className="inline-flex min-h-10 shrink-0 items-center transition-transform active:scale-[0.96]"
        >
          <HewnLogo markClassName="size-7 shrink-0" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 items-center gap-0.5 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-10 shrink-0 items-center rounded-lg px-2.5 text-sm text-muted-foreground transition-[color,transform,background-color] hover:bg-muted/50 hover:text-foreground active:scale-[0.96] md:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-40 ml-auto flex shrink-0 items-center gap-1">
          <AppearanceControlsDeferred className="relative w-fit" />
          <HomeNavMobileDeferred />
        </div>
      </div>
    </header>
  );
}
