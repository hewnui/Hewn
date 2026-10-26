import { TypeTable } from "fumadocs-ui/components/type-table";
import type { DocsApiDocument } from "@/lib/docs-api";
import type { AiProp } from "@hewnui/docs-metadata";

function propsToTypeTable(props: AiProp[]) {
  const type: Record<
    string,
    {
      type: string;
      description?: string;
      default?: string;
      required?: boolean;
    }
  > = {};

  for (const prop of props) {
    type[prop.name] = {
      type: prop.type,
      ...(prop.description ? { description: prop.description } : {}),
      ...(prop.default !== undefined ? { default: prop.default } : {}),
      ...(prop.required ? { required: true } : {}),
    };
  }

  return type;
}

export function DocsApiReference({ api }: { api: DocsApiDocument }) {
  const type = propsToTypeTable(api.props);

  return (
    <section className="mt-12" aria-labelledby="docs-api-heading">
      <h2
        id="docs-api-heading"
        className="mb-2 text-xl font-semibold tracking-tight text-balance"
      >
        API reference
      </h2>
      <p className="mb-6 max-w-[60ch] text-sm text-pretty text-muted-foreground">
        Props for{" "}
        <code className="font-mono text-foreground">{api.exportName}</code>
        {" from "}
        <code className="font-mono text-foreground">{api.importPath}</code>
        . Generated from component types — not hand-written.
      </p>

      {api.compoundParts.length > 0 ? (
        <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
          {api.compoundParts.map((part) => (
            <li key={part.name}>
              <code className="font-mono text-foreground">{part.name}</code>
              {part.description ? ` — ${part.description}` : null}
            </li>
          ))}
        </ul>
      ) : null}

      <TypeTable type={type} />

      {api.partProps?.map((part) => (
        <div key={part.name} className="mt-10">
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-balance">
            {part.name}
          </h3>
          {part.description ? (
            <p className="mb-4 max-w-[60ch] text-sm text-pretty text-muted-foreground">
              {part.description}
            </p>
          ) : (
            <p className="mb-4 max-w-[60ch] text-sm text-pretty text-muted-foreground">
              Props for{" "}
              <code className="font-mono text-foreground">{part.name}</code>.
            </p>
          )}
          <TypeTable type={propsToTypeTable(part.props)} />
        </div>
      ))}
    </section>
  );
}
