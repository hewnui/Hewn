import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import { PEER_RANGES } from "./deps";

const uiPackage = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../../../ui/package.json"),
    "utf8",
  ),
) as { peerDependencies: Record<string, string> };

describe("PEER_RANGES", () => {
  it("matches @hewnui/ui peerDependencies", () => {
    for (const [name, range] of Object.entries(PEER_RANGES)) {
      expect(uiPackage.peerDependencies[name]).toBe(range);
    }
  });
});
