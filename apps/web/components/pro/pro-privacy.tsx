import { proCopy } from "@/components/pro/pro-content";
import Link from "next/link";

export function ProPrivacy() {
  return (
    <section
      id="privacy"
      aria-labelledby="pro-privacy-heading"
      className="border-t border-border/70"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-16">
        <h2
          id="pro-privacy-heading"
          className="text-xl font-semibold tracking-tight"
        >
          {proCopy.privacyHeading}
        </h2>
        <p className="mt-3 max-w-[62ch] text-sm text-pretty text-muted-foreground">
          {proCopy.privacyBody}{" "}
          <Link
            href={proCopy.privacyHref}
            className="text-foreground underline underline-offset-4 transition-colors hover:text-accent"
          >
            Full privacy page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
