export type IndexEntry = {
  name: string;
  internalDependencies?: string[];
};

export type ResolveResult =
  | { ok: true; order: string[] }
  | { ok: false; unknown: string[]; pro: string[] };

export function resolveItems(
  requested: string[],
  freeIndex: IndexEntry[],
  proIndex: IndexEntry[],
): ResolveResult {
  const freeNames = new Map(freeIndex.map((entry) => [entry.name, entry]));
  const proNames = new Set(proIndex.map((entry) => entry.name));

  const unknown = requested.filter(
    (name) => !freeNames.has(name) && !proNames.has(name),
  );
  const pro = requested.filter(
    (name) => !freeNames.has(name) && proNames.has(name),
  );
  if (unknown.length > 0 || pro.length > 0) {
    return { ok: false, unknown, pro };
  }

  const order: string[] = [];
  const seen = new Set<string>();
  const visit = (name: string): void => {
    if (seen.has(name)) return;
    seen.add(name);
    const entry = freeNames.get(name);
    for (const dependency of entry?.internalDependencies ?? []) {
      visit(dependency);
    }
    order.push(name);
  };
  for (const name of requested) {
    visit(name);
  }
  return { ok: true, order };
}
