import { describe, expect, it } from "vitest";
import { derivePack } from "./derive";
import { exportDesignMd } from "./export-design-md";
import { exportDtcg } from "./export-dtcg";
import {
  THEME_EXPORT_FORMATS,
  renderThemeExport,
  themeExportPublicPath,
} from "./export-formats";
import { exportSkillMd } from "./export-skill";
import { exportTailwindTheme } from "./export-css";
import {
  curatedResolvedPacks,
  exportCuratedThemeFiles,
} from "./figma-kit";
import { BASE_PACK_IDS } from "./types";

function demoPack() {
  const result = derivePack({
    schemaVersion: 2,
    basePackId: "forest",
    packId: "forest",
  });
  if (!result.ok) throw new Error(result.errors.join(", "));
  return result.pack;
}

describe("free theme exporters", () => {
  const pack = demoPack();

  it("exports DESIGN.md with palette roles and design rules", () => {
    const md = exportDesignMd(pack);
    expect(md).toContain("# Forest — Design brief");
    expect(md).toContain("`accent`");
    expect(md).toContain("oklch(");
    expect(md).toContain("## Do");
    expect(md).toContain("## Don't");
    expect(md).toContain("IBM Plex Sans");
    expect(md).toContain("Space Grotesk");
  });

  it("exports DTCG JSON with $value/$type and light+dark modes", () => {
    const json = JSON.parse(exportDtcg(pack)) as {
      $description: string;
      modes: {
        light: { color: { accent: { $type: string; $value: string } } };
        dark: { color: { accent: { $type: string; $value: string } } };
      };
      typography: { fontFamily: { sans: { $type: string } } };
    };
    expect(json.$description).toContain("forest");
    expect(json.modes.light.color.accent.$type).toBe("color");
    expect(json.modes.light.color.accent.$value).toContain("oklch");
    expect(json.modes.dark.color.accent.$value).toContain("oklch");
    expect(json.typography.fontFamily.sans.$type).toBe("fontFamily");
  });

  it("exports Tailwind @theme without Pro labeling", () => {
    const css = exportTailwindTheme(pack);
    expect(css).toContain("@theme {");
    expect(css).toContain("--color-accent:");
    expect(css).not.toContain("Pro export");
  });

  it("exports agent SKILL.md with frontmatter and token table", () => {
    const md = exportSkillMd(pack);
    expect(md).toContain("name: hewn-forest-theme");
    expect(md).toContain("data-theme=\"forest\"");
    expect(md).toContain("--kp-accent");
    expect(md).toContain("Never");
  });

  it("catalog renders every free format", () => {
    expect(THEME_EXPORT_FORMATS.every((f) => f.tier === "free")).toBe(true);
    for (const format of THEME_EXPORT_FORMATS) {
      const body = renderThemeExport(format.id, pack);
      expect(body.length).toBeGreaterThan(40);
      expect(themeExportPublicPath("forest", format.id)).toMatch(
        /^\/themes\/forest\//,
      );
    }
  });

  it("generates static files for all six curated packs", () => {
    const packs = curatedResolvedPacks();
    expect(packs.map((p) => p.id)).toEqual([...BASE_PACK_IDS]);
    const files = exportCuratedThemeFiles();
    expect(files).toHaveLength(BASE_PACK_IDS.length * THEME_EXPORT_FORMATS.length);
    expect(files.some((f) => f.packId === "ember" && f.basename === "SKILL.md")).toBe(
      true,
    );
    const dune = files.find(
      (f) => f.packId === "dune" && f.formatId === "dtcg",
    );
    const duneJson = JSON.parse(dune!.contents) as {
      modes: Record<string, unknown>;
    };
    expect(Object.keys(duneJson.modes)).toEqual(["light"]);

    const ember = files.find(
      (f) => f.packId === "ember" && f.formatId === "dtcg",
    );
    const emberJson = JSON.parse(ember!.contents) as {
      modes: Record<string, unknown>;
    };
    expect(Object.keys(emberJson.modes)).toEqual(["dark"]);
  });
});
