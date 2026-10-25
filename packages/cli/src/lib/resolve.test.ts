import { describe, expect, it } from "vitest";
import { resolveItems } from "./resolve.js";

const freeIndex = [
  { name: "button", internalDependencies: ["spinner"] },
  { name: "spinner" },
  { name: "file-upload", internalDependencies: ["button"] },
];
const proIndex = [{ name: "dashboard" }];

describe("resolveItems", () => {
  it("orders dependencies before dependents", () => {
    const result = resolveItems(["file-upload"], freeIndex, proIndex);
    expect(result).toEqual({
      ok: true,
      order: ["spinner", "button", "file-upload"],
    });
  });

  it("dedupes shared dependencies", () => {
    const result = resolveItems(["button", "file-upload"], freeIndex, proIndex);
    expect(result).toEqual({
      ok: true,
      order: ["spinner", "button", "file-upload"],
    });
  });

  it("reports unknown names", () => {
    const result = resolveItems(["nope"], freeIndex, proIndex);
    expect(result).toEqual({ ok: false, unknown: ["nope"], pro: [] });
  });

  it("reports pro items separately", () => {
    const result = resolveItems(["dashboard"], freeIndex, proIndex);
    expect(result).toEqual({ ok: false, unknown: [], pro: ["dashboard"] });
  });
});
