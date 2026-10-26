import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import { PACKAGES_PUBLISHED } from "./distribution";
import {
  CLI_PACKAGE_NAME,
  MOTION_PEER_RANGE,
  THEMES_PACKAGE_NAME,
  UI_PACKAGE_NAME,
  UI_PEER_RANGES,
  cliAddCommand,
  fullNpmInstallCommand,
  installCommands,
  packageInstallCommand,
  peerInstallCommand,
} from "./install";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "../../..");

const uiPackage = JSON.parse(
  readFileSync(join(repoRoot, "packages/ui/package.json"), "utf8"),
) as { peerDependencies: Record<string, string> };

describe("install commands", () => {
  it("keeps package names in one place", () => {
    expect(UI_PACKAGE_NAME).toBe("@hewnui/ui");
    expect(THEMES_PACKAGE_NAME).toBe("@hewnui/themes");
    expect(CLI_PACKAGE_NAME).toBe("hewnui");
    expect(MOTION_PEER_RANGE).toBe("^12.42.2");
  });

  it("UI_PEER_RANGES match @hewnui/ui peerDependencies exactly", () => {
    for (const [name, range] of Object.entries(UI_PEER_RANGES)) {
      expect(uiPackage.peerDependencies[name]).toBe(range);
    }
  });

  it("builds package-manager and CLI commands from that source", () => {
    const pnpm = packageInstallCommand("pnpm");
    const cli = cliAddCommand("button");
    if (PACKAGES_PUBLISHED) {
      expect(pnpm).toBe("pnpm add @hewnui/ui @hewnui/themes");
      expect(cli).toBe("npx hewnui@latest add button");
    } else {
      expect(pnpm).toBe(
        "# Available at launch: pnpm add @hewnui/ui @hewnui/themes",
      );
      expect(cli).toBe("# Available at launch: npx hewnui@latest add button");
    }
    expect(installCommands("slider").cli).toContain("add slider");
  });

  it("pins motion in full and peer install commands", () => {
    if (!PACKAGES_PUBLISHED) return;
    expect(fullNpmInstallCommand("pnpm")).toBe(
      'pnpm add @hewnui/ui @hewnui/themes react react-dom react-aria-components "motion@^12.42.2"',
    );
    expect(peerInstallCommand("pnpm")).toBe(
      'pnpm add react react-dom react-aria-components "motion@^12.42.2"',
    );
  });

  it("adds @internationalized/date on the DateRangePicker install tab", () => {
    if (!PACKAGES_PUBLISHED) return;
    expect(
      packageInstallCommand("pnpm", { componentName: "date-range-picker" }),
    ).toBe("pnpm add @hewnui/ui @hewnui/themes @internationalized/date");
    expect(packageInstallCommand("pnpm", { componentName: "button" })).toBe(
      "pnpm add @hewnui/ui @hewnui/themes",
    );
  });

  it("keeps root README, @hewnui/ui README, and getting-started install lines identical", () => {
    if (!PACKAGES_PUBLISHED) return;
    const command = fullNpmInstallCommand("pnpm");
    const reactRange = UI_PEER_RANGES.react;
    const reactDomRange = UI_PEER_RANGES["react-dom"];

    const files = [
      join(repoRoot, "README.md"),
      join(repoRoot, "packages/ui/README.md"),
      join(repoRoot, "apps/web/content/docs/getting-started.mdx"),
    ].map((path) => ({
      path,
      text: readFileSync(path, "utf8"),
    }));

    for (const file of files) {
      expect(file.text, file.path).toContain(command);
      expect(file.text, file.path).toContain(`\`react\` | \`${reactRange}\``);
      expect(file.text, file.path).toContain(
        `\`react-dom\` | \`${reactDomRange}\``,
      );
    }
  });
});
