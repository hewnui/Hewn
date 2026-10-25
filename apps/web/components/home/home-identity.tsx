import { HomeIdentityIsland } from "@/components/home/home-identity-island";

export function HomeIdentity() {
  return (
    <section
      id="identity"
      className="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-20 md:px-8 md:py-28"
    >
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Identity
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Themes with a point of view.
          </h2>
          <p className="mt-4 max-w-[48ch] text-muted-foreground">
            Six curated packs. Compatible modes only. No fake dark mode bolted
            onto a light palette.
          </p>
        </div>
        <HomeIdentityIsland />
      </div>
    </section>
  );
}
