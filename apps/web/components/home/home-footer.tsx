import { HewnLogo } from "@/components/brand/hewn-logo";
import { footer } from "@/components/home/content";
import { HomeGithubLink } from "@/components/home/home-github-link";
import { GITHUB_LICENSE_URL, GITHUB_REPO_URL } from "@/lib/site-links";
import Link from "next/link";

export function HomeFooter() {
  return (
    <footer className="border-t border-border/70 bg-[color-mix(in_oklch,var(--kp-muted)_24%,transparent)]">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr]">
          <div>
            <HewnLogo markClassName="size-7 shrink-0" />
            <p className="mt-5 max-w-[34ch] text-pretty text-muted-foreground">
              {footer.tagline}
            </p>
            <div className="mt-6">
              <HomeGithubLink />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <a
              href={GITHUB_LICENSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {footer.license}
            </a>
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
