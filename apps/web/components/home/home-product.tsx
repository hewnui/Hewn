import { product } from "@/components/home/content-product";
import { HomeProductDeferred } from "@/components/home/home-product-deferred";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Link from "next/link";

export function HomeProduct() {
  return (
    <section
      id="product"
      className="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-20 md:px-8 md:py-28"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[54ch]">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {product.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {product.headline}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {product.support}
          </p>
        </div>
        <Link
          href={product.cta.href}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 pr-0.5 text-sm font-medium text-accent transition-[color,transform] hover:text-foreground active:scale-[0.96]"
        >
          {product.cta.label}
          <ArrowRightIcon aria-hidden className="size-4" weight="bold" />
        </Link>
      </div>

      <div className="mt-10">
        <HomeProductDeferred />
      </div>
    </section>
  );
}
