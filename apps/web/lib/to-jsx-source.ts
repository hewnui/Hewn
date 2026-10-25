import "server-only";
import { toJsxSource as registryToJsxSource } from "@hewnui/registry/jsx";

/** Docs-side alias for the registry `jsxFiles` pipeline. */
export function toJsxSource(source: string): string {
  return registryToJsxSource(source);
}
