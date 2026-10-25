import { ProBlockFrame } from "@/components/pro/pro-block-frame";
import { proCopy } from "@/components/pro/pro-content";
import { PRO_BLOCK_CATALOG } from "@/lib/pro/blocks-catalog";

export function ProBlocks() {
  return (
    <section
      id="blocks"
      aria-labelledby="pro-blocks-heading"
      className="border-t border-border/70"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Catalog
        </p>
        <h2
          id="pro-blocks-heading"
          className="max-w-[20ch] text-3xl font-semibold tracking-tight text-balance md:text-4xl"
        >
          {proCopy.blocksHeading}
        </h2>
        <p className="mt-4 max-w-[56ch] text-muted-foreground text-pretty">
          {proCopy.blocksSupport}
        </p>

        <ul className="mt-10 grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {PRO_BLOCK_CATALOG.map((block) => (
            <li key={block.id}>
              <ProBlockFrame
                id={block.id}
                name={block.name}
                description={block.description}
                kind={block.kind}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
