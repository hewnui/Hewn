import { describe, expect, it } from "vitest";
import { parseJsonc, stripJsonc } from "./jsonc.js";

describe("stripJsonc", () => {
  it("strips line and block comments", () => {
    const raw = `{
  // next default
  "compilerOptions": {
    /* paths */
    "paths": { "@/*": ["./src/*"] }
  }
}`;
    expect(parseJsonc<{ compilerOptions: { paths: Record<string, string[]> } }>(raw))
      .toEqual({
        compilerOptions: { paths: { "@/*": ["./src/*"] } },
      });
  });

  it("keeps slashes inside strings", () => {
    const raw = `{ "url": "https://example.com/path" /* trail */ }`;
    expect(stripJsonc(raw)).toContain("https://example.com/path");
    expect(parseJsonc<{ url: string }>(raw).url).toBe(
      "https://example.com/path",
    );
  });
});
