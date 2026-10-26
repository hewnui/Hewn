import { proCopy } from "@/components/pro/pro-content";
import { PRO_BLOCK_CATALOG } from "@/lib/pro/blocks-catalog";

const SECTIONS = PRO_BLOCK_CATALOG.filter((block) => block.kind === "section");
const PAGES = PRO_BLOCK_CATALOG.filter((block) => block.kind === "page");

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

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <PlannedList
            headingId="pro-planned-blocks"
            title="Planned blocks"
            items={SECTIONS.map((block) => ({
              id: block.id,
              name: block.name,
              description: block.description,
            }))}
          />
          <PlannedList
            headingId="pro-planned-pages"
            title="Planned pages"
            items={PAGES.map((block) => ({
              id: block.id,
              name: block.name,
              description: block.description,
            }))}
          />
        </div>
      </div>
    </section>
  );
}

function PlannedList({
  headingId,
  title,
  items,
}: {
  headingId: string;
  title: string;
  items: readonly { id: string; name: string; description: string }[];
}) {
  return (
    <div>
      <h3
        id={headingId}
        className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
      >
        {title}
      </h3>
      <ul className="mt-4 list-none space-y-3" aria-labelledby={headingId}>
        {items.map((item) => (
          <li key={item.id} className="border-b border-border/50 pb-3 last:border-b-0">
            <p className="text-sm font-medium text-foreground">{item.name}</p>
            <p className="mt-1 text-sm text-pretty text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
