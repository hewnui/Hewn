import { PACKAGES_PUBLISHED } from "./distribution";

/** Single source of truth for docs install commands. */
export const UI_PACKAGE_NAME = "@hewnui/ui";
export const THEMES_PACKAGE_NAME = "@hewnui/themes";
export const CLI_PACKAGE_NAME = "hewnui";

/**
 * Peer ranges copied from `@hewnui/ui` package.json peerDependencies.
 * install.test.ts asserts these stay in sync — do not guess or drift.
 */
export const UI_PEER_RANGES = {
  react: "^19.2.7",
  "react-dom": "^19.2.7",
  "react-aria-components": "^1.19.0",
  motion: "^12.42.2",
} as const;

/** @deprecated Use UI_PEER_RANGES.motion */
export const MOTION_PEER_RANGE = UI_PEER_RANGES.motion;

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

/** Shell-safe motion pin so zsh/fish keep the caret. */
export function motionPeerSpec(): string {
  return `"motion@${UI_PEER_RANGES.motion}"`;
}

/** Packages needed for CSS `@import "@hewnui/themes/…"`. */
export function packageInstallPackages(): string {
  return `${UI_PACKAGE_NAME} ${THEMES_PACKAGE_NAME}`;
}

/**
 * Canonical Option A install line — root README, `@hewnui/ui` README, and
 * getting-started must paste this exact string (see install.test.ts).
 */
export function fullNpmInstallPackages(): string {
  return `${packageInstallPackages()} react react-dom react-aria-components ${motionPeerSpec()}`;
}

/**
 * Extra packages a specific component's install tab should list.
 * These are often direct deps of `@hewnui/ui` that app code still imports
 * (values/types); pnpm does not hoist them for the app.
 */
export function componentExtraPackages(componentName: string): string[] {
  if (componentName === "date-range-picker") {
    return ["@internationalized/date"];
  }
  return [];
}

export function packageInstallCommand(
  pm: PackageManager,
  options?: { componentName?: string; extraPackages?: string[] },
): string {
  const extras = [
    ...(options?.extraPackages ?? []),
    ...(options?.componentName
      ? componentExtraPackages(options.componentName)
      : []),
  ];
  const unique = [...new Set(extras)];
  const pkgs = [packageInstallPackages(), ...unique].join(" ");
  return maybeLaunchLabel(`${ADD[pm]} ${pkgs}`);
}

/**
 * Full npm-path install used in README / getting-started (packages + peers).
 * Motion is pinned — unpinned `motion` resolves to a newer major outside peers.
 */
export function fullNpmInstallCommand(pm: PackageManager = "pnpm"): string {
  return maybeLaunchLabel(`${ADD[pm]} ${fullNpmInstallPackages()}`);
}

/** Peer-only install when `@hewnui/ui` + `@hewnui/themes` are already listed. */
export function peerInstallCommand(pm: PackageManager = "pnpm"): string {
  return maybeLaunchLabel(
    `${ADD[pm]} react react-dom react-aria-components ${motionPeerSpec()}`,
  );
}

export function cliAddCommand(componentName: string): string {
  return maybeLaunchLabel(
    `npx ${CLI_PACKAGE_NAME}@latest add ${componentName}`,
  );
}

export function installCommands(componentName: string) {
  return {
    packageName: UI_PACKAGE_NAME,
    themesPackage: THEMES_PACKAGE_NAME,
    cliPackage: CLI_PACKAGE_NAME,
    managers: Object.fromEntries(
      PACKAGE_MANAGERS.map((pm) => [
        pm,
        packageInstallCommand(pm, { componentName }),
      ]),
    ) as Record<PackageManager, string>,
    cli: cliAddCommand(componentName),
  };
}
