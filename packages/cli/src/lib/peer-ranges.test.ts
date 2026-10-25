import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import { PEER_RANGES, pinnedSpecs } from "./peer-ranges.js";

const uiPackage = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../../../ui/package.json"),
    "utf8",
  ),
) as { peerDependencies: Record<string, string> };

describe("peer ranges", () => {
  it("match @hewnui/ui peerDependencies", () => {
    for (const [name, range] of Object.entries(PEER_RANGES)) {
      expect(uiPackage.peerDependencies[name]).toBe(range);
    }
  });

  it("pins and quotes known peers only", () => {
    expect(pinnedSpecs(["motion", "@hewnui/themes"])).toEqual([
      '"motion@^12.42.2"',
      "@hewnui/themes",
    ]);
  });
});
