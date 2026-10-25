import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach, describe, expect, it } from "vitest";
import { createMemoryCatalog } from "./catalog.js";
import {
  isStubLicenseKey,
  resolveLicenseAccess,
  writeCredentialsFile,
} from "./license.js";
import { PRO_UNAVAILABLE } from "./pro.js";
import {
  getComponent,
  getLicenseStatus,
  listComponents,
  searchComponents,
} from "./tools.js";

const locked = { proUnlocked: false, source: "none" as const };

const catalog = createMemoryCatalog({
  items: [
    {
      name: "button",
      title: "Button",
      description: "Pressable action",
      category: "buttons",
      tier: "free",
      docsPath: "/docs/components/button",
      keywords: ["press"],
    },
    {
      name: "dashboard",
      title: "Dashboard",
      description: "Pro dashboard block",
      category: "layout",
      tier: "pro",
      docsPath: "/docs/components/dashboard",
    },
  ],
  ai: [
    {
      name: "button",
      exportName: "Button",
      importPath: "@hewnui/ui/button",
      props: [],
      variants: [],
      states: ["loading"],
      keyboard: ["Enter activates"],
      tokens: ["--kp-accent"],
      install: {
        npm: "npm install @hewnui/ui",
        cli: "npx hewnui@latest add button",
      },
      examples: [],
      compoundParts: [],
    },
  ],
});

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true });
  }
});

describe("MCP Pro license plumbing", () => {
  it("keeps Pro fail-closed without a key", () => {
    const listed = listComponents(catalog, locked);
    expect(listed.ok).toBe(true);
    if (!listed.ok) return;
    expect(listed.data).toEqual([
      expect.objectContaining({ name: "button", tier: "free" }),
    ]);

    const denied = getComponent(catalog, "dashboard", locked);
    expect(denied.ok).toBe(false);
    if (denied.ok) return;
    expect(denied.error).toContain(PRO_UNAVAILABLE);
  });

  it("never unlocks Pro from stub keys (env or credentials file)", () => {
    expect(isStubLicenseKey("kp_test_1234567890abcdef")).toBe(true);
    expect(isStubLicenseKey("nope")).toBe(false);

    const fromEnv = resolveLicenseAccess({
      envKey: "kp_live_1234567890abcdef",
    });
    expect(fromEnv).toEqual(
      expect.objectContaining({ proUnlocked: false, source: "env" }),
    );

    const dir = mkdtempSync(join(tmpdir(), "kp-license-"));
    tempDirs.push(dir);
    const filePath = join(dir, "credentials.json");
    writeCredentialsFile("kp_test_abcdefghijklmnop", filePath);
    const fromFile = resolveLicenseAccess({ envKey: "", filePath });
    expect(fromFile).toEqual(
      expect.objectContaining({ proUnlocked: false, source: "file" }),
    );

    const denied = getComponent(catalog, "dashboard", fromEnv);
    expect(denied.ok).toBe(false);
  });

  it("reports license status and denies Pro search when locked", () => {
    const status = getLicenseStatus(locked);
    expect(status.ok).toBe(true);
    if (!status.ok) return;
    expect(status.data).toEqual(
      expect.objectContaining({ proUnlocked: false }),
    );
    const proSearch = searchComponents(catalog, "dashboard", locked);
    expect(proSearch.ok).toBe(false);
  });
});
