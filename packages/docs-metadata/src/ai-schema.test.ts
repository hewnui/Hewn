import { describe, expect, it } from "vitest";
import { scaffoldAiMeta } from "./ai-scaffold";
import { validateAiComponent } from "./ai-validate";

describe("AI schema v1", () => {
  it("accepts a scaffolded component meta", () => {
    const meta = scaffoldAiMeta({
      name: "button",
      title: "Button",
      description: "Pressable action",
      states: ["loading", "disabled"],
    });
    const result = validateAiComponent(meta);
    expect(result.ok).toBe(true);
  });

  it("rejects incomplete keyboard/tokens/examples", () => {
    const meta = scaffoldAiMeta({
      name: "button",
      title: "Button",
      description: "Pressable",
    });
    const broken = { ...meta, keyboard: [], tokens: [], examples: [] };
    const result = validateAiComponent(broken);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.some((error) => error.includes("keyboard"))).toBe(
      true,
    );
  });
});
