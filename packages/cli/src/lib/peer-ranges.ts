/**
 * Peer ranges Hewn components are built and tested against. Must match
 * packages/ui/package.json peerDependencies (peer-ranges.test.ts enforces it).
 * Unpinned `motion` resolves to a newer major that Hewn does not support.
 */
export const PEER_RANGES = {
  "react-aria-components": "^1.19.0",
  motion: "^12.42.2",
} as const;

/** Shell-safe `name@range` specs (quoted so ^ survives zsh/fish). */
export function pinnedSpecs(names: string[]): string[] {
  return names.map((name) => {
    const range = (PEER_RANGES as Record<string, string>)[name];
    return range ? `"${name}@${range}"` : name;
  });
}
