import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const freeIndexPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../registry/generated/index.free.json",
);

/** Live free-component census from the generated registry index. */
export function freeComponentCount(
  indexPath: string = freeIndexPath,
): number {
  const raw = readFileSync(indexPath, "utf8");
  const parsed = JSON.parse(raw) as { items?: unknown[] };
  return Array.isArray(parsed.items) ? parsed.items.length : 0;
}
