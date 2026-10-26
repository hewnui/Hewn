import { join } from "path";
import { detectProject } from "../lib/detect.js";
import { pathExists, writeFileEnsured } from "../lib/fsx.js";
import { confirm } from "../lib/prompt.js";
import { pinnedSpecs } from "../lib/peer-ranges.js";
import { createRegistryClient, registryBase } from "../lib/registry.js";

export type CliConfig = {
  root: string;
  tsx: boolean;
  registry?: string;
};

export async function initCommand(options: {
  root?: string | undefined;
  yes: boolean;
}): Promise<number> {
  const project = detectProject(process.cwd());
  if (!project) {
    console.error("No package.json found — run `hewn init` inside a project.");
    return 1;
  }

  const configPath = join(project.root, "hewn.json");
  if (pathExists(configPath) && !options.yes) {
    const overwrite = await confirm("hewn.json already exists. Overwrite?");
    if (!overwrite) {
      console.log("Aborted.");
      return 0;
    }
  }

  const root = options.root ?? "components/hewn";
  const config: CliConfig = { root, tsx: project.tsx };
  await writeFileEnsured(configPath, `${JSON.stringify(config, null, 2)}\n`);

  const client = createRegistryClient(registryBase());
  const foundation = await client.foundation();
  const files = project.tsx ? foundation.files : foundation.jsxFiles;
  for (const file of files) {
    await writeFileEnsured(join(project.root, root, file.path), file.content);
  }

  const install =
    project.packageManager === "npm"
      ? "npm install"
      : `${project.packageManager} add`;

  console.log(`\nwrote hewn.json (${project.tsx ? "TypeScript" : "JavaScript"} project)`);
  console.log(`wrote ${files.length} foundation files to ${root}/`);
  console.log("\nnext steps:");
  const packages = pinnedSpecs([
    "react-aria-components",
    "motion",
    "@hewnui/motion",
    "@hewnui/themes",
  ]);
  console.log(`  1. ${install} ${packages.join(" ")}`);
  console.log('  2. import "@hewnui/themes/tokens.css" in your global css');
  console.log("  3. npx hewnui@latest add <name> to add components");
  return 0;
}
