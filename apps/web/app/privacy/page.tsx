import { HomeAtmosphere } from "@/components/home/home-atmosphere";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNav } from "@/components/home/home-nav";
import { siteName } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

const description =
  "What Hewn collects for the Pro waitlist, where it is stored, and how to ask for removal.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName,
    title: `Privacy · ${siteName}`,
    description,
    url: "/privacy",
  },
  twitter: {
    card: "summary",
    title: `Privacy · ${siteName}`,
    description,
  },
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-clip">
      <HomeAtmosphere />
      <HomeNav />
      <article className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Privacy
        </p>
        <h1 className="mt-3 max-w-[20ch] text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          What we collect
        </h1>
        <p className="mt-5 max-w-[62ch] text-pretty text-muted-foreground">
          This page covers the Pro waitlist on hewnui.dev. It is a short factual
          note, not legal advice.
        </p>

        <div className="mt-12 max-w-[62ch] space-y-8 border-t border-border/70 pt-10 text-sm leading-relaxed text-pretty">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Pro waitlist
            </h2>
            <p className="text-muted-foreground">
              If you join the{" "}
              <Link
                href="/pro#waitlist"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-accent"
              >
                Pro waitlist
              </Link>
              , we collect the email address you submit so we can tell you when
              Pro is ready to try. We also store the time you joined and which
              page you came from (for example the Pro page or the homepage
              teaser).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Where it is stored
            </h2>
            <p className="text-muted-foreground">
              Waitlist entries are stored in Upstash Redis, accessed from the
              site when it runs on Vercel. We use that store for the waitlist
              only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Sharing
            </h2>
            <p className="text-muted-foreground">
              We do not sell waitlist emails. We do not share them for
              advertising.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Removal
            </h2>
            <p className="text-muted-foreground">
              To ask for removal, open a GitHub issue on{" "}
              <a
                href="https://github.com/hewnui/Hewn/issues"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-accent"
                rel="noopener noreferrer"
                target="_blank"
              >
                hewnui/Hewn
              </a>{" "}
              and include the email address you used on the waitlist.
            </p>
          </section>
        </div>
      </article>
      <HomeFooter />
    </main>
  );
}
