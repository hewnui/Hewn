import { siteUrl } from "@/lib/site";

/** Renders the namespaced registry URL using the live site origin helper. */
export function DocsShadcnRegistrySnippet() {
  const registryUrl = `${siteUrl}/r/shadcn/{name}.json`;
  const config = {
    registries: {
      "@hewnui": registryUrl,
    },
  };

  return (
    <pre
      tabIndex={0}
      role="region"
      aria-label="shadcn registry config"
      className="overflow-x-auto rounded-[var(--kp-radius-md)] border border-border bg-surface p-4 text-sm text-foreground"
    >
      <code>{JSON.stringify(config, null, 2)}</code>
    </pre>
  );
}

export function DocsShadcnAddExample() {
  return (
    <pre
      tabIndex={0}
      role="region"
      aria-label="shadcn add examples"
      className="overflow-x-auto rounded-[var(--kp-radius-md)] border border-border bg-surface p-4 text-sm text-foreground"
    >
      <code>{`npx shadcn@latest add @hewnui/button
npx shadcn@latest add @hewnui/dialog @hewnui/data-table`}</code>
    </pre>
  );
}
