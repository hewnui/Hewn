import { readFile } from "fs/promises";
import { join } from "path";
import type { AiProp } from "@hewnui/docs-metadata";

export type DocsApiPartDocument = {
  name: string;
  description?: string;
  props: AiProp[];
};

export type DocsApiDocument = {
  name: string;
  exportName: string;
  importPath: string;
  source: "types" | "ai" | "merged" | "tsx";
  props: AiProp[];
  compoundParts: Array<{ name: string; description: string }>;
  partProps?: DocsApiPartDocument[];
  install: {
    npm: string;
    pnpm: string;
    yarn: string;
    bun: string;
    cli: string;
  };
};

const apiRoots = [
  join(process.cwd(), "public/ai/api"),
  join(process.cwd(), "../../packages/docs-metadata/generated/api"),
];

export async function loadDocsApi(
  componentName: string,
): Promise<DocsApiDocument | null> {
  for (const root of apiRoots) {
    try {
      const raw = await readFile(join(root, `${componentName}.json`), "utf8");
      return JSON.parse(raw) as DocsApiDocument;
    } catch {
      // try next root
    }
  }
  return null;
}
