import { join } from "path";
import { detectProject } from "../lib/detect.js";
import { pathExists, readJsonFile, writeFileEnsured } from "../lib/fsx.js";
import { confirm } from "../lib/prompt.js";
import { createRegistryClient, registryBase } from "../lib/registry.js";
import { resolveItems } from "../lib/resolve.js";
import type { CliConfig } from "./init.js";

export async function addCommand(
  names: string[],
  options: { overwrite: boolean; yes: boolean },
): Promise<number> {
  if (names.length === 0) {
    console.error("Usage: hewn add <name...>");
    return 1;
  }

  const project = detectProject(process.cwd());
  if (!project) {
    console.error("No package.json found — run inside a project.");
    return 1;
  }

  const config = await readJsonFile<CliConfig>(
    join(project.root, "hewn.json"),
  );
  if (!config) {
    console.error("hewn.json not found — run `hewn init` first.");
    return 1;
  }

  if (!pathExists(join(project.root, config.root, "utils"))) {
    console.error("foundation files not found — run `hewn init` first.");
    return 1;
  }

  const client = createRegistryClient(registryBase(config.registry));
  const [freeIndex, proIndex] = await Promise.all([
    client.freeIndex(),
    client.proIndex(),
  ]);

  const result = resolveItems(names, freeIndex.items, proIndex.items);
  if (!result.ok) {
    if (result.unknown.length > 0) {
      console.error(`unknown component(s): ${result.unknown.join(", ")}`);
    }
    if (result.pro.length > 0) {
      console.error(
        `pro component(s) not available yet: ${result.pro.join(", ")}`,
      );
    }
    return 1;
  }

  for (const name of result.order) {
    const item = await client.item(name);
    const files = config.tsx ? item.files : item.jsxFiles;
    for (const file of files) {
      const target = join(project.root, config.root, item.name, file.path);
      if (pathExists(target) && !options.overwrite && !options.yes) {
        const replace = await confirm(`${target} exists. Overwrite?`);
        if (!replace) continue;
      }
      await writeFileEnsured(target, file.content);
      console.log(`wrote ${target}`);
    }
    if (item.dependencies && item.dependencies.length > 0) {
      console.log(
        `note: ${item.name} also needs npm package(s): ${item.dependencies.join(" ")}`,
      );
    }
  }
  return 0;
}
