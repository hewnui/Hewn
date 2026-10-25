import { existsSync } from "fs";
import { join } from "path";
import { emitFoundation, emitRegistry, type BuiltItem } from "./emit";
import { transformToJsx } from "./jsx";
import { scanComponents, scanSharedFiles } from "./scan";
import { validateRegistryItem } from "./schema";
import { emitShadcnRegistry } from "./shadcn/emit";

export type GenerateOptions = {
  componentsRoot: string;
  docsContentRoot: string;
  outDir: string;
  sharedRoots?: string[];
  /** Optional shadcn-schema output rooted at outDir/shadcn */
  shadcn?: {
    themesRoot: string;
    motionEntryPath: string;
    homepage: string;
    registryName?: string;
  };
};

export type GenerateSummary = {
  total: number;
  free: number;
  pro: number;
  filesEmitted: number;
  foundationFiles: number;
  shadcnItems?: number;
  shadcnFilesEmitted?: number;
};

export async function generateRegistry(
  options: GenerateOptions,
): Promise<GenerateSummary> {
  const { found, missingMetadata } = await scanComponents(
    options.componentsRoot,
  );

  const errors: string[] = missingMetadata.map(
    (folder) => `${folder}: missing *.registry.ts metadata file`,
  );
  const names = new Set<string>();
  const built: BuiltItem[] = [];

  for (const component of found) {
    const result = validateRegistryItem(component.metadata);
    if (!result.ok) {
      errors.push(
        ...result.errors.map((error) => `${component.folder}: ${error}`),
      );
      continue;
    }

    const { item } = result;
    if (item.name !== component.folder) {
      errors.push(
        `${component.folder}: metadata name "${item.name}" must match the folder name`,
      );
    }
    if (names.has(item.name)) {
      errors.push(`${item.name}: duplicate registry item name`);
    }
    names.add(item.name);

    if (!existsSync(join(options.docsContentRoot, `${item.docsPath}.mdx`))) {
      errors.push(`${item.name}: docs page missing at ${item.docsPath}.mdx`);
    }

    const internalDependencies = [
      ...new Set([
        ...(item.internalDependencies ?? []),
        ...component.derivedInternal,
      ]),
    ].sort();

    built.push({
      item: {
        ...item,
        internalDependencies,
        sharedDependencies: component.derivedShared,
      },
      files: component.files,
      jsxFiles: transformToJsx(component.files),
    });
  }

  const known = new Set(found.map((component) => component.folder));
  for (const { item } of built) {
    for (const dependency of item.internalDependencies ?? []) {
      if (!known.has(dependency) && dependency !== item.name) {
        errors.push(
          `${item.name}: internalDependencies references unknown item "${dependency}"`,
        );
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Registry generation failed with ${errors.length} error(s):\n${errors.join("\n")}`,
    );
  }

  built.sort((a, b) => a.item.name.localeCompare(b.item.name));
  const emitted = await emitRegistry(built, options.outDir);

  let foundationFiles = 0;
  const sharedFiles =
    options.sharedRoots && options.sharedRoots.length > 0
      ? await scanSharedFiles(options.sharedRoots)
      : [];
  if (sharedFiles.length > 0) {
    await emitFoundation(
      options.outDir,
      sharedFiles,
      transformToJsx(sharedFiles),
    );
    foundationFiles = sharedFiles.length;
  }

  const summary: GenerateSummary = {
    total: built.length,
    free: emitted.freeCount,
    pro: emitted.proCount,
    filesEmitted: emitted.filesEmitted,
    foundationFiles,
  };

  if (options.shadcn) {
    const shadcnOptions = {
      items: built,
      sharedFiles,
      themesRoot: options.shadcn.themesRoot,
      motionEntryPath: options.shadcn.motionEntryPath,
      homepage: options.shadcn.homepage,
      ...(options.shadcn.registryName
        ? { registryName: options.shadcn.registryName }
        : {}),
    };
    const shadcn = await emitShadcnRegistry(
      join(options.outDir, "shadcn"),
      shadcnOptions,
    );
    summary.shadcnItems = shadcn.itemCount;
    summary.shadcnFilesEmitted = shadcn.filesEmitted;
  }

  return summary;
}
