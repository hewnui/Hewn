import { readdir } from "fs/promises";
import { join } from "path";
import { pathToFileURL } from "url";
import { validateAiComponent } from "./ai-validate";
import type { AiComponentMeta } from "./ai-types";

const AI_SUFFIX = ".ai.ts";

export type AiScanResult = {
  found: AiComponentMeta[];
  missing: string[];
  invalid: Array<{ name: string; errors: string[] }>;
};

async function loadAiMeta(filePath: string): Promise<unknown> {
  const module = (await import(pathToFileURL(filePath).href)) as Record<
    string,
    unknown
  >;
  const exports = Object.values(module).filter(
    (value) => typeof value === "object" && value !== null,
  );
  if (exports.length !== 1) {
    throw new Error(
      `${filePath} must export exactly one AI metadata object (found ${exports.length})`,
    );
  }
  return exports[0];
}

/** Scan component folders for co-located name.ai.ts files and validate each. */
export async function scanAiComponents(
  componentsRoot: string,
  expectedNames: string[],
): Promise<AiScanResult> {
  const folders = await readdir(componentsRoot, { withFileTypes: true });
  const found: AiComponentMeta[] = [];
  const invalid: Array<{ name: string; errors: string[] }> = [];
  const present = new Set<string>();

  for (const entry of folders) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    const aiFile = `${name}${AI_SUFFIX}`;
    const aiPath = join(componentsRoot, name, aiFile);
    const files = await readdir(join(componentsRoot, name));
    if (!files.includes(aiFile)) continue;

    present.add(name);
    try {
      const raw = await loadAiMeta(aiPath);
      const result = validateAiComponent(raw);
      if (!result.ok) {
        invalid.push({ name, errors: result.errors });
        continue;
      }
      if (result.meta.name !== name) {
        invalid.push({
          name,
          errors: [`name "${result.meta.name}" must match folder "${name}"`],
        });
        continue;
      }
      found.push(result.meta);
    } catch (error) {
      invalid.push({
        name,
        errors: [error instanceof Error ? error.message : String(error)],
      });
    }
  }

  const missing = expectedNames.filter((name) => !present.has(name));
  return { found, missing, invalid };
}
