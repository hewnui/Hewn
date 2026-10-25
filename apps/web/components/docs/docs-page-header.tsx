import { Badge } from "@hewnui/ui";

export function DocsPageHeader({
  title,
  description,
  status,
  tier,
  eyebrow,
}: {
  title: string;
  description?: string;
  status?: string;
  tier?: string;
  eyebrow?: string;
}) {
  return (
    <header className="not-prose mb-10 border-b border-border/60 pb-9">
      {eyebrow ? (
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-medium tracking-tight text-balance md:text-[2.5rem] md:leading-[1.1]">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {(status || tier) && (
          <div className="flex flex-wrap gap-2 pb-1">
            {status ? (
              <Badge color="accent" variant="outline" size="sm">
                {status}
              </Badge>
            ) : null}
            {tier ? (
              <Badge color="muted" variant="outline" size="sm">
                {tier}
              </Badge>
            ) : null}
          </div>
        )}
      </div>
    </header>
  );
}
