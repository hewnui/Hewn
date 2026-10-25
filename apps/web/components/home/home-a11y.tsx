import { keys } from "@/components/home/content";
import { HomeA11yDeferred } from "@/components/home/home-a11y-deferred";

export function HomeA11y() {
  return (
    <section
      id="accessibility"
      className="mx-auto max-w-[1400px] scroll-mt-20 px-4 py-20 md:px-8 md:py-28"
    >
      <div className="max-w-[54ch]">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Accessibility
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Keyboard is a first-class surface.
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          React Aria owns behavior. Hewn keeps focus visible, hit targets
          honest, and reduced motion respected — not a late audit checklist.
        </p>
      </div>

      <div className="mt-12">
        <dl className="grid grid-cols-2 border-t border-border/70 md:grid-cols-3 lg:grid-cols-6">
          {keys.map((item) => (
            <div
              key={item.key}
              className="border-b border-border/70 py-6 pr-6 lg:not-first:pl-5 lg:not-last:border-r lg:not-last:pr-5"
            >
              <dt className="font-mono text-sm font-medium tracking-tight tabular-nums text-foreground">
                {item.key}
              </dt>
              <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {item.action}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12">
        <HomeA11yDeferred />
      </div>
    </section>
  );
}
