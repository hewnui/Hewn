import { HomeMaterialIsland } from "@/components/home/home-material-island";

export function HomeMaterial() {
  return (
    <section id="material" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="max-w-[52ch]">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Material
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Glass with refraction, not a blur filter.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            One global choice. Pick a half — the whole page changes with it.
            Tint, saturation, an inner edge light, and an opaque fallback when
            the browser can&apos;t blur.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <HomeMaterialIsland />
      </div>
    </section>
  );
}
