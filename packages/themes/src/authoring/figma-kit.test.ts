import { describe, expect, it } from "vitest";
import {
  exportCuratedFigmaKit,
  exportCuratedStickerSheet,
} from "./figma-kit";

describe("curated Figma kit", () => {
  it("includes all six packs and dual-mode themes", () => {
    const json = JSON.parse(exportCuratedFigmaKit()) as {
      $themes: Array<{ id: string }>;
      $metadata: { tokenSetOrder: string[] };
      "forest/light": { color: { accent: { value: string } } };
      "ember/dark": { color: { accent: { value: string } } };
    };
    expect(json.$metadata.tokenSetOrder).toContain("forest/structural");
    expect(json.$metadata.tokenSetOrder).toContain("dune/light");
    expect(json.$themes.some((theme) => theme.id === "forest-light")).toBe(
      true,
    );
    expect(json.$themes.some((theme) => theme.id === "ember-dark")).toBe(true);
    expect(json["forest/light"].color.accent.value).toContain("oklch");
    expect(json["ember/dark"].color.accent.value).toContain("oklch");
  });

  it("exports a sticker sheet SVG with pack labels", () => {
    const svg = exportCuratedStickerSheet();
    expect(svg).toContain("<svg");
    expect(svg).toContain("forest");
    expect(svg).toContain("Button");
    expect(svg).toContain("Input");
  });
});
