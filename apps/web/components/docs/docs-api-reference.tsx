import { TypeTable } from "fumadocs-ui/components/type-table";
import type { DocsApiDocument } from "@/lib/docs-api";

function propsToTypeTable(doc: DocsApiDocument) {
  const type: Record<
    string,
    {
      type: string;
      description?: string;
      default?: string;
      required?: boolean;
    }
  > = {};

  for (const prop of doc.props) {
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
  const type = propsToTypeTable(api);

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
    </section>
  );
}
