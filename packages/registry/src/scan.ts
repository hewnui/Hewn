import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { pathToFileURL } from "url";
import type { RegistryFileEntry } from "./types";

export type { RegistryFileEntry } from "./types";

export type ScannedComponent = {
  folder: string;
  metadata: unknown;
  files: RegistryFileEntry[];
  derivedShared: string[];
  derivedInternal: string[];
};

export type ScanResult = {
  found: ScannedComponent[];
  missingMetadata: string[];
};

const REGISTRY_SUFFIX = ".registry.ts";
const SHARED_IMPORT = /from\s+["']\.\.\/\.\.\/(?!test\/)([^"']+)["']/g;
const INTERNAL_IMPORT = /from\s+["']\.\.\/(?!\.\.\/)([a-z0-9-]+)(?:\/[a-z0-9.-]+)*["']/g;

function isRegistrySourceFile(file: string): boolean {
  if (file.endsWith(REGISTRY_SUFFIX)) return false;
  if (file.endsWith(".ai.ts")) return false;
  if (file.includes(".test.")) return false;
  if (file.endsWith(".examples.tsx")) return false;
  return file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".css");
}

function deriveDependencies(contents: string[]): {
  shared: string[];
  internal: string[];
} {
  const shared = new Set<string>();
  const internal = new Set<string>();
  for (const content of contents) {
    for (const match of content.matchAll(SHARED_IMPORT)) {
      if (match[1]) shared.add(match[1]);
    }
    for (const match of content.matchAll(INTERNAL_IMPORT)) {
      if (match[1]) internal.add(match[1]);
    }
  }
  return {
    shared: [...shared].sort(),
    internal: [...internal].sort(),
  };
}

async function loadMetadata(metadataPath: string): Promise<unknown> {
  const module = (await import(pathToFileURL(metadataPath).href)) as Record<
    string,
    unknown
  >;
  const exports = Object.values(module).filter(
    (value) => typeof value === "object" && value !== null,
  );
  if (exports.length !== 1) {
    throw new Error(
      `${metadataPath} must export exactly one registry metadata object`,
    );
  }
  return exports[0];
}

async function walkFiles(dir: string, prefix: string): Promise<string[]> {
  const entries = (await readdir(dir, { withFileTypes: true })).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(join(dir, entry.name), `${prefix}/${entry.name}`)));
    } else if (isRegistrySourceFile(entry.name)) {
      files.push(`${prefix}/${entry.name}`);
    }
  }
  return files;
}

export async function scanSharedFiles(
  roots: string[],
): Promise<RegistryFileEntry[]> {
  const files: RegistryFileEntry[] = [];
  for (const root of roots) {
    const prefix = root.split("/").pop() ?? root;
    for (const relative of await walkFiles(root, prefix)) {
      files.push({
        path: relative,
        content: await readFile(join(root, relative.slice(prefix.length + 1)), "utf8"),
      });
    }
  }
  return files;
}

export async function scanComponents(
  componentsRoot: string,
): Promise<ScanResult> {
  const entries = await readdir(componentsRoot, { withFileTypes: true });
  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const found: ScannedComponent[] = [];
  const missingMetadata: string[] = [];

  for (const folder of folders) {
    const dir = join(componentsRoot, folder);
    const dirFiles = (await readdir(dir)).sort();
    const metadataFile = dirFiles.find((file) =>
      file.endsWith(REGISTRY_SUFFIX),
    );

    if (!metadataFile) {
      missingMetadata.push(folder);
      continue;
    }

    const metadata = await loadMetadata(join(dir, metadataFile));
    const sourceFiles = dirFiles.filter(isRegistrySourceFile);
    const files: RegistryFileEntry[] = [];
    for (const file of sourceFiles) {
      files.push({ path: file, content: await readFile(join(dir, file), "utf8") });
    }
    const { shared, internal } = deriveDependencies(
      files.map((file) => file.content),
    );
    found.push({
      folder,
      metadata,
      files,
      derivedShared: shared,
      derivedInternal: internal.filter((name) => name !== folder),
    });
  }

  return { found, missingMetadata };
}
