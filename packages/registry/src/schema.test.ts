import { describe, expect, it } from "vitest";
import { validateRegistryItem, type RegistryItem } from "./schema";

const validItem: RegistryItem = {
  name: "button",
  type: "component",
  tier: "free",
  category: "buttons",
  title: "Button",
  description: "Pressable action control with variants, sizes, and loading state.",
  states: ["loading", "disabled"],
  keywords: ["press", "action"],
  docsPath: "/docs/components/button",
};

describe("validateRegistryItem", () => {
  it("accepts a valid item", () => {
    const result = validateRegistryItem(validItem);
    expect(result).toEqual({ ok: true, item: validItem });
  });

  it("accepts optional dependency fields", () => {
    const result = validateRegistryItem({
      ...validItem,
      dependencies: ["@tanstack/react-table"],
      internalDependencies: ["popover", "tooltip"],
    });
    expect(result.ok).toBe(true);
  });

  it("accepts the pro tier", () => {
    expect(validateRegistryItem({ ...validItem, tier: "pro" }).ok).toBe(true);
  });

  it("rejects non-objects", () => {
    expect(validateRegistryItem(null).ok).toBe(false);
    expect(validateRegistryItem("button").ok).toBe(false);
    expect(validateRegistryItem([validItem]).ok).toBe(false);
  });

  it("rejects non-kebab-case names", () => {
    for (const name of ["Button", "button_group", "buttonGroup", "-button"]) {
      const result = validateRegistryItem({ ...validItem, name });
      expect(result.ok).toBe(false);
    }
  });

  it("rejects unknown enum values", () => {
    expect(validateRegistryItem({ ...validItem, type: "widget" }).ok).toBe(false);
    expect(validateRegistryItem({ ...validItem, tier: "enterprise" }).ok).toBe(false);
    expect(validateRegistryItem({ ...validItem, category: "inputs" }).ok).toBe(false);
    expect(validateRegistryItem({ ...validItem, states: ["focused"] }).ok).toBe(false);
  });

  it("rejects empty title and description", () => {
    expect(validateRegistryItem({ ...validItem, title: "  " }).ok).toBe(false);
    expect(validateRegistryItem({ ...validItem, description: "" }).ok).toBe(false);
  });

  it("rejects docsPath outside /docs/", () => {
    expect(validateRegistryItem({ ...validItem, docsPath: "components/button" }).ok).toBe(false);
    expect(validateRegistryItem({ ...validItem, docsPath: "/components/button" }).ok).toBe(false);
  });

  it("rejects malformed dependency entries", () => {
    expect(
      validateRegistryItem({ ...validItem, dependencies: ["Not A Package"] }).ok,
    ).toBe(false);
    expect(
      validateRegistryItem({ ...validItem, internalDependencies: ["Popover"] }).ok,
    ).toBe(false);
  });

  it("collects multiple errors instead of failing fast", () => {
    const result = validateRegistryItem({ name: "Button", tier: "gold" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThan(3);
    }
  });
});
