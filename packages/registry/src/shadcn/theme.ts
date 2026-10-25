import { readFile } from "fs/promises";
import { join } from "path";
import {
  SHADCN_ITEM_SCHEMA,
  type ShadcnCssVars,
  type ShadcnFile,
  type ShadcnItem,
} from "./types";

const PACKS = [
  "forest",
  "tide",
  "graphite",
  "dune",
  "clay",
  "ember",
] as const;

const ROOT_CSS = [
  "tokens.css",
  "motion.css",
  "radius.css",
  "glass.css",
  "glass-buttons.css",
] as const;

function parseCssVarsBlock(source: string, selector: RegExp): Record<string, string> {
  const match = source.match(selector);
  if (!match?.[0]) return {};
  const vars: Record<string, string> = {};
  for (const line of match[0].matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    const name = line[1];
    const value = line[2]?.trim();
    if (name && value) vars[name] = value;
  }
  return vars;
}

export function extractThemeCssVars(forestCss: string, tokensCss: string): ShadcnCssVars {
  const light = parseCssVarsBlock(
    forestCss,
    /:root,\s*\[data-theme="forest"\]\[data-mode="light"\]\s*\{[\s\S]*?\n\}/,
  );
  const dark = parseCssVarsBlock(
    forestCss,
    /\[data-theme="forest"\]\[data-mode="dark"\]\s*\{[\s\S]*?\n\}/,
  );
  const theme = parseCssVarsBlock(tokensCss, /@theme\s+inline\s*\{[\s\S]*?\n\}/);
  return { theme, light, dark };
}

async function readThemeFile(
  themesRoot: string,
  relative: string,
): Promise<ShadcnFile> {
  const content = await readFile(join(themesRoot, relative), "utf8");
  return {
    path: `theme/${relative}`,
    content,
    type: "registry:theme",
    target: `@ui/theme/${relative}`,
  };
}

export async function buildTokensItem(themesRoot: string): Promise<ShadcnItem> {
  const files: ShadcnFile[] = [];
  for (const file of ROOT_CSS) {
    files.push(await readThemeFile(themesRoot, file));
  }
  for (const pack of PACKS) {
    files.push(await readThemeFile(themesRoot, `packs/${pack}.css`));
  }

  const forest = files.find((file) => file.path.endsWith("packs/forest.css"));
  const tokens = files.find((file) => file.path.endsWith("tokens.css"));
  const cssVars =
    forest && tokens
      ? extractThemeCssVars(forest.content, tokens.content)
      : undefined;

  const item: ShadcnItem = {
    $schema: SHADCN_ITEM_SCHEMA,
    name: "tokens",
    type: "registry:theme",
    title: "Hewn tokens",
    description:
      "Semantic OKLCH theme packs, radius scale, glass layers, and Tailwind v4 @theme bridges.",
    files,
    categories: ["themes"],
    docs: "Import @ui/theme/tokens.css (and optionally radius/glass) in your global CSS.",
  };
  if (cssVars) item.cssVars = cssVars;
  return item;
}
