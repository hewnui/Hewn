import { PACKAGES_PUBLISHED } from "./distribution";

/** Single source of truth for docs install commands. */
export const UI_PACKAGE_NAME = "@hewnui/ui";
export const CLI_PACKAGE_NAME = "hewnui";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export const PACKAGE_MANAGERS: PackageManager[] = [
  "npm",
  "pnpm",
  "yarn",
  "bun",
];

const ADD: Record<PackageManager, string> = {
  npm: "npm install",
  pnpm: "pnpm add",
  yarn: "yarn add",
  bun: "bun add",
};

function maybeLaunchLabel(command: string): string {
  if (PACKAGES_PUBLISHED) return command;
  return `# Available at launch: ${command}`;
}

export function packageInstallCommand(pm: PackageManager): string {
  return maybeLaunchLabel(`${ADD[pm]} ${UI_PACKAGE_NAME}`);
}

export function cliAddCommand(componentName: string): string {
  return maybeLaunchLabel(
    `npx ${CLI_PACKAGE_NAME}@latest add ${componentName}`,
  );
}

export function installCommands(componentName: string) {
  return {
    packageName: UI_PACKAGE_NAME,
    cliPackage: CLI_PACKAGE_NAME,
    managers: Object.fromEntries(
      PACKAGE_MANAGERS.map((pm) => [pm, packageInstallCommand(pm)]),
    ) as Record<PackageManager, string>,
    cli: cliAddCommand(componentName),
  };
}
