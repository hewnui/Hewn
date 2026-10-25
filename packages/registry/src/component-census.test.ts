import { readdirSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";

/**
 * Free component census — homepage catalog and docs gallery must track this
 * count (via galleryCategories / getHomeCatalog), never a hardcoded literal.
 */
const uiComponentsRoot = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../ui/src/components",
);

describe("component census", () => {
  it("counts a registry metadata file per UI component folder", () => {
    const folders = readdirSync(uiComponentsRoot).filter((name) =>
      statSync(join(uiComponentsRoot, name)).isDirectory(),
    );

    const withRegistry = folders.filter((folder) => {
      const files = readdirSync(join(uiComponentsRoot, folder));
      return files.some((file) => file.endsWith(".registry.ts"));
    });

    expect(withRegistry.length).toBe(folders.length);
    expect(withRegistry.length).toBeGreaterThanOrEqual(37);
  });
});
