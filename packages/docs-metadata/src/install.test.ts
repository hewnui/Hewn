import { describe, expect, it } from "vitest";
import { PACKAGES_PUBLISHED } from "./distribution";
import {
  CLI_PACKAGE_NAME,
  MOTION_PEER_RANGE,
  THEMES_PACKAGE_NAME,
  UI_PACKAGE_NAME,
  cliAddCommand,
  fullNpmInstallCommand,
  installCommands,
  packageInstallCommand,
  peerInstallCommand,
} from "./install";

describe("install commands", () => {
  it("keeps package names in one place", () => {
    expect(UI_PACKAGE_NAME).toBe("@hewnui/ui");
    expect(THEMES_PACKAGE_NAME).toBe("@hewnui/themes");
    expect(CLI_PACKAGE_NAME).toBe("hewnui");
    expect(MOTION_PEER_RANGE).toBe("^12.42.2");
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
    expect(packageInstallCommand("pnpm", { componentName: "date-range-picker" })).toBe(
      "pnpm add @hewnui/ui @hewnui/themes @internationalized/date",
    );
    expect(packageInstallCommand("pnpm", { componentName: "button" })).toBe(
      "pnpm add @hewnui/ui @hewnui/themes",
    );
  });
});
