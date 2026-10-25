import { readdir, readFile } from "fs/promises";
import { dirname, join } from "path";
import type { RegistryFileEntry } from "../scan";
import {
  collectRegistryDependencies,
  detectNpmDependencies,
} from "./deps";
import { contentNeedsMotionPresets, rewriteShadcnContent } from "./rewrite";
import {
  SHADCN_ITEM_SCHEMA,
  type ShadcnFile,
  type ShadcnItem,
  type ShadcnItemType,
} from "./types";

const LIB_META: Record<
  string,
  { title: string; description: string; includeTokens?: boolean }
> = {
  utils: {
    title: "Utils",
    description: "Shared className and utility helpers for Hewn UI.",
  },
  providers: {
    title: "Providers",
    description:
      "Theme, material, radius, and motion providers that drive global appearance.",
    includeTokens: true,
  },
  styles: {
    title: "Styles",
    description: "Shared field and overlay style helpers used by form controls.",
  },
  chart: {
    title: "Chart primitives",
    description: "Shared chart axes, scales, and frame helpers.",
  },
};

function toShadcnLibFile(file: RegistryFileEntry): ShadcnFile {
  return {
    path: file.path,
    content: rewriteShadcnContent(file.content),
    type: "registry:lib",
    target: `@ui/${file.path}`,
  };
}

function groupByTopLevel(
  files: RegistryFileEntry[],
): Map<string, RegistryFileEntry[]> {
  const groups = new Map<string, RegistryFileEntry[]>();
  for (const file of files) {
    const top = file.path.split("/")[0];
    if (!top || top === "theme") continue;
    const list = groups.get(top) ?? [];
    list.push(file);
    groups.set(top, list);
  }
  return groups;
}

export async function buildMotionPresetsItem(
  motionEntryPath: string,
): Promise<ShadcnItem> {
  const motionDir = dirname(motionEntryPath);
  const entries = await readdir(motionDir);
  const moduleFiles = entries
    .filter((name) => name.endsWith(".ts") && !name.endsWith(".test.ts"))
    .sort((a, b) => {
      if (a === "index.ts") return -1;
      if (b === "index.ts") return 1;
      return a.localeCompare(b);
    });

  const files: ShadcnFile[] = [];
  for (const name of moduleFiles) {
    const content = await readFile(join(motionDir, name), "utf8");
    files.push({
      path: `motion-presets/${name}`,
      content,
      type: "registry:lib",
      target: `@ui/motion-presets/${name}`,
    });
  }

  return {
    $schema: SHADCN_ITEM_SCHEMA,
    name: "motion-presets",
    type: "registry:lib",
    title: "Motion presets",
    description:
      "Shared Motion springs, tokens, resolve helpers, and LazyMotion loader.",
    dependencies: ["motion"],
    files,
    categories: ["utilities"],
  };
}

export function buildSharedLibItems(
  sharedFiles: RegistryFileEntry[],
  namespace = "hewnui",
): ShadcnItem[] {
  const items: ShadcnItem[] = [];
  for (const [name, files] of groupByTopLevel(sharedFiles)) {
    const meta = LIB_META[name];
    if (!meta) continue;
    const originalContents = files.map((file) => file.content);
    const needsMotion = originalContents.some(contentNeedsMotionPresets);
    const shadcnFiles = files.map(toShadcnLibFile);
    const depInput: Parameters<typeof collectRegistryDependencies>[0] = {
      internal: [],
      shared: name === "styles" ? ["utils/cn"] : [],
      needsMotionPresets: needsMotion,
      namespace,
    };
    if (meta.includeTokens) depInput.includeTokens = true;
    const registryDependencies = collectRegistryDependencies(depInput);
    const item: ShadcnItem = {
      $schema: SHADCN_ITEM_SCHEMA,
      name,
      type: "registry:lib" satisfies ShadcnItemType,
      title: meta.title,
      description: meta.description,
      dependencies: detectNpmDependencies(originalContents),
      files: shadcnFiles,
      categories: ["utilities"],
    };
    if (registryDependencies.length > 0) {
      item.registryDependencies = registryDependencies;
    }
    items.push(item);
  }
  return items.sort((a, b) => a.name.localeCompare(b.name));
}
