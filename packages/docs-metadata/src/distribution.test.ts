import { describe, expect, it } from "vitest";
import {
  PACKAGES_PUBLISHED,
  cliAddCommand,
  installCommandsForComponent,
  llmsIntro,
  npmUiCommand,
  registryFetchCommand,
  SITE_TAGLINE,
} from "./distribution";

describe("distribution copy", () => {
  it("does not claim a licence in the site tagline", () => {
    expect(SITE_TAGLINE).not.toMatch(/\bMIT\b/i);
    expect(SITE_TAGLINE).not.toMatch(/open[\s-]source/i);
    expect(SITE_TAGLINE).toMatch(/React Aria/);
  });

  it("labels unpublished install commands until PACKAGES_PUBLISHED", () => {
    if (PACKAGES_PUBLISHED) {
      expect(npmUiCommand()).toBe("pnpm add @hewnui/ui");
      expect(cliAddCommand("button")).toBe(
        "npx hewnui@latest add button",
      );
      return;
    }
    expect(npmUiCommand()).toMatch(/Available at launch/i);
    expect(cliAddCommand("button")).toMatch(/Available at launch/i);
    expect(registryFetchCommand("button")).toMatch(
      /hewnui\.dev\/r\/button\.json/,
    );
    expect(llmsIntro()).not.toMatch(/Install via/);
    const install = installCommandsForComponent("button");
    expect(install.npm).toMatch(/Available at launch/i);
    expect(install.cli).toMatch(/add button/);
  });
});
