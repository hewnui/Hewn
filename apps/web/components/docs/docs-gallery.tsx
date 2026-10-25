import {
  galleryCategories,
  galleryTotals,
  type GalleryItem,
} from "@/components/docs/docs-gallery-data";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

function GalleryRow({
  item,
  index,
}: {
  item: GalleryItem;
  index: number;
}) {
  const lead = index === 0;

  return (
    <Link
      href={item.href}
      className="group grid gap-1 py-3.5 transition-[background-color,transform] hover:bg-muted/25 active:scale-[0.995] sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-6 sm:px-1"
    >
      <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span
          className={
            lead
              ? "font-display text-base font-medium tracking-tight group-hover:text-accent"
              : "text-sm font-medium tracking-tight group-hover:text-accent"
          }
        >
          {item.name}
        </span>
        {item.badge ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            {item.badge}
          </span>
        ) : null}
      </span>
      <span className="text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </span>
      <ArrowRightIcon
        aria-hidden
        weight="bold"
        className="mt-1 hidden size-3.5 text-muted-foreground opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-0.5 group-hover:opacity-100 sm:mt-0 sm:block"
      />
    </Link>
  );
}

export function DocsGallery() {
  const count = String(galleryTotals.components).padStart(2, "0");
  const categories = String(galleryTotals.categories).padStart(2, "0");

  return (
    <div className="not-prose mt-8 space-y-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
          Open any specimen with appearance controls handy. Glass, radius, and
          motion rewrite every page.
        </p>
        <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
          {count} · {categories} categories
        </p>
      </div>

      {galleryCategories.map((category) => (
        <section key={category.title} className="scroll-mt-8">
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="font-display text-xl font-medium tracking-tight">
              {category.title}
            </h2>
            <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
              {String(category.items.length).padStart(2, "0")}
            </p>
          </div>
          <p className="max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
            {category.blurb}
          </p>
          <ul className="mt-4 divide-y divide-border/55 border-y border-border/55">
            {category.items.map((item, index) => (
              <li key={item.href}>
                <GalleryRow item={item} index={index} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
