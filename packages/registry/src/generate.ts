import { existsSync } from "fs";
import { join } from "path";
import { emitFoundation, emitRegistry, type BuiltItem } from "./emit";
import { transformToJsx } from "./jsx";
import {
  isOnDemandShared,
  rewriteSharedComponentImports,
  rewriteSharedImportDepth,
  sharedComponentRefs,
} from "./layout";
import { scanComponents, scanSharedFiles } from "./scan";
import { validateRegistryItem } from "./schema";
import {
  detectNpmDependencies,
  detectTypeDependencies,
} from "./shadcn/deps";
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
  const sharedFiles =
    options.sharedRoots && options.sharedRoots.length > 0
      ? await scanSharedFiles(options.sharedRoots)
      : [];

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


    // The CLI writes <root>/<name>/<file> beside <root>/utils|providers|…,
    // so ../../shared imports from the source tree must become ../shared.
    const installFiles = component.files.map((file) => ({
      ...file,
      content: rewriteSharedImportDepth(file.content),
    }));
    const onDemandDirs = new Set(
      component.derivedShared
        .filter(isOnDemandShared)
        .map((shared) => shared.split("/")[0]),
    );
    const onDemandFiles = sharedFiles.filter((file) =>
      onDemandDirs.has(file.path.split("/")[0]),
    );
    const extraFiles = onDemandFiles.map((file) => ({
      ...file,
      path: `../${file.path}`,
      content: rewriteSharedComponentImports(file.content),
    }));
    // chart/frame.tsx imports ../components/skeleton, so chart users need it.
    const internalDependencies = [
      ...new Set([
        ...(item.internalDependencies ?? []),
        ...component.derivedInternal,
        ...onDemandFiles.flatMap((file) => sharedComponentRefs(file.content)),
      ]),
    ]
      .filter((name) => name !== item.name)
      .sort();
    const usedSharedContents = sharedFiles
      .filter((file) =>
        component.derivedShared.some(
          (shared) => file.path.replace(/\.[cm]?[jt]sx?$/, "") === shared,
        ),
      )
      .map((file) => file.content);
    const dependencies = detectNpmDependencies(
      [
        ...component.files.map((file) => file.content),
        ...usedSharedContents,
        ...extraFiles.map((file) => file.content),
      ],
      item.dependencies ?? [],
    );
    const devDependencies = detectTypeDependencies(dependencies);

    built.push({
      item: {
        ...item,
        ...(dependencies.length > 0 ? { dependencies } : {}),
        ...(devDependencies.length > 0 ? { devDependencies } : {}),
        internalDependencies,
        sharedDependencies: component.derivedShared,
      },
      files: installFiles,
      jsxFiles: transformToJsx(installFiles),
      ...(extraFiles.length > 0
        ? { extraFiles, extraJsxFiles: transformToJsx(extraFiles) }
        : {}),
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
  const foundation = sharedFiles.filter((file) => !isOnDemandShared(file.path));
  if (foundation.length > 0) {
    await emitFoundation(
      options.outDir,
      foundation,
      transformToJsx(foundation),
    );
    foundationFiles = foundation.length;
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
