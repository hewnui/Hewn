import { describe, expect, it } from "vitest";
import { derivePack } from "./derive";
import { exportPackCss, exportTailwindTheme } from "./export-css";
import { exportFigmaVariables } from "./export-figma";
import { exportStyleDictionary } from "./export-style-dictionary";

describe("Pro exporters", () => {
  const pack = (() => {
    const result = derivePack({
      schemaVersion: 2,
      basePackId: "forest",
      accentSeed: "#2f6b4f",
      packId: "export-demo",
      radiusPreset: "rounded",
    });
    if (!result.ok) throw new Error(result.errors.join(", "));
    return result.pack;
  })();

  it("exports Tailwind @theme with mode remap", () => {
    const css = exportTailwindTheme(pack);
    expect(css).toContain("@theme {");
    expect(css).toContain("--color-accent:");
    expect(css).toContain("--radius-md:");
    expect(css).toContain('[data-theme="export-demo"][data-mode="dark"]');
  });

  it("exports Style Dictionary JSON with per-mode colors", () => {
    const json = JSON.parse(exportStyleDictionary(pack)) as {
      color: { accent: { light: { value: string }; dark: { value: string } } };
      meta: { packId: { value: string } };
      radius: { md: { value: string } };
    };
    expect(json.meta.packId.value).toBe("export-demo");
    expect(json.color.accent.light.value).toContain("oklch");
    expect(json.color.accent.dark.value).toContain("oklch");
    expect(json.radius.md.value).toBe("1.15rem");
  });

  it("exports Tokens Studio multi-set document", () => {
    const json = JSON.parse(exportFigmaVariables(pack)) as {
      $themes: Array<{ name: string }>;
      $metadata: { tokenSetOrder: string[] };
      "export-demo/light": { color: { accent: { value: string } } };
      "export-demo/structural": { "radius-md": { value: string } };
    };
    expect(json.$themes).toHaveLength(2);
    expect(json.$metadata.tokenSetOrder).toContain("export-demo/light");
    expect(json["export-demo/light"].color.accent.value).toContain("oklch");
    expect(json["export-demo/structural"]["radius-md"].value).toBe("1.15rem");
  });

  it("keeps free CSS export intact", () => {
    expect(exportPackCss(pack)).toContain('--kp-accent:');
  });
});
