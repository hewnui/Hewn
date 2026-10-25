import { describe, expect, it } from "vitest";
import { PACKAGES_PUBLISHED } from "./distribution";
import {
  CLI_PACKAGE_NAME,
  UI_PACKAGE_NAME,
  cliAddCommand,
  installCommands,
  packageInstallCommand,
} from "./install";

describe("install commands", () => {
  it("keeps package names in one place", () => {
    expect(UI_PACKAGE_NAME).toBe("@hewnui/ui");
    expect(CLI_PACKAGE_NAME).toBe("hewnui");
  });

  it("builds package-manager and CLI commands from that source", () => {
    const pnpm = packageInstallCommand("pnpm");
    const cli = cliAddCommand("button");
    if (PACKAGES_PUBLISHED) {
      expect(pnpm).toBe("pnpm add @hewnui/ui");
      expect(cli).toBe("npx hewnui@latest add button");
    } else {
      expect(pnpm).toBe("# Available at launch: pnpm add @hewnui/ui");
      expect(cli).toBe("# Available at launch: npx hewnui@latest add button");
    }
    expect(installCommands("slider").cli).toContain("add slider");
  });
});
