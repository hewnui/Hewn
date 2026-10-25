import { mkdtemp, readFile, rm } from "fs/promises";
import { tmpdir } from "os";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { registryItemSchema, registrySchema } from "shadcn/schema";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { generateRegistry } from "../generate";
import { extractThemeCssVars } from "./theme";
import {
  collectRegistryDependencies,
  detectNpmDependencies,
} from "./deps";
import { rewriteShadcnContent } from "./rewrite";

const here = dirname(fileURLToPath(import.meta.url));
const fixtures = join(here, "../__fixtures__");
const repoRoot = join(here, "../../../..");

let outDir: string;

beforeEach(async () => {
  outDir = await mkdtemp(join(tmpdir(), "hewn-shadcn-"));
});

afterEach(async () => {
  await rm(outDir, { recursive: true, force: true });
});

describe("shadcn helpers", () => {
  it("rewrites motion package and shared relative imports for @ui layout", () => {
    expect(
      rewriteShadcnContent('import { springSnappy } from "@hewnui/motion";'),
    ).toContain('from "../motion-presets"');
    expect(
      rewriteShadcnContent('import { cn } from "../../utils/cn";'),
    ).toBe('import { cn } from "../utils/cn";');
    expect(
      rewriteShadcnContent(
        'import { useMotionMode } from "../../providers/motion-provider";',
      ),
    ).toBe('import { useMotionMode } from "../providers/motion-provider";');
  });

  it("detects npm and registry dependencies", () => {
    expect(
      detectNpmDependencies(
        ['import { Button } from "react-aria-components";'],
        ["@tanstack/react-table"],
      ),
    ).toEqual(["@tanstack/react-table@8.21.3", "react-aria-components@^1.19.0"]);

    expect(
      collectRegistryDependencies({
        internal: ["spinner"],
        shared: ["utils/cn", "providers/motion-provider"],
        needsMotionPresets: true,
        namespace: "hewnui",
      }),
    ).toEqual([
      "@hewnui/motion-presets",
      "@hewnui/providers",
      "@hewnui/spinner",
      "@hewnui/utils",
    ]);
  });

  it("extracts forest cssVars for light, dark, and @theme", () => {
    const forest = `
:root,
[data-theme="forest"][data-mode="light"] {
  --kp-background: oklch(0.97 0.01 145);
  --kp-accent: oklch(0.49 0.1 148);
}
[data-theme="forest"][data-mode="dark"] {
  --kp-background: oklch(0.18 0.02 145);
}
`;
    const tokens = `
@theme inline {
  --color-background: var(--kp-background);
  --font-sans: var(--kp-font-sans);
}
`;
    const vars = extractThemeCssVars(forest, tokens);
    expect(vars.light?.["kp-background"]).toContain("oklch");
    expect(vars.dark?.["kp-background"]).toContain("oklch");
    expect(vars.theme?.["color-background"]).toBe("var(--kp-background)");
  });
});

describe("shadcn registry emit", () => {
  it("emits schema-valid registry.json and item payloads", async () => {
    const summary = await generateRegistry({
      componentsRoot: join(fixtures, "components"),
      docsContentRoot: join(fixtures, "content"),
      outDir,
      sharedRoots: [
        join(fixtures, "shared/utils"),
        join(fixtures, "shared/providers"),
      ],
      shadcn: {
        themesRoot: join(repoRoot, "packages/themes/src"),
        motionEntryPath: join(repoRoot, "packages/motion/src/index.ts"),
        homepage: "https://example.test",
        registryName: "hewnui",
      },
    });

    expect(summary.shadcnItems).toBeGreaterThan(0);

    const registryJson = JSON.parse(
      await readFile(join(outDir, "shadcn", "registry.json"), "utf8"),
    ) as unknown;
    const registryResult = registrySchema.safeParse(registryJson);
    expect(registryResult.success, JSON.stringify(registryResult.error?.format())).toBe(
      true,
    );

    const alpha = JSON.parse(
      await readFile(join(outDir, "shadcn", "alpha.json"), "utf8"),
    ) as {
      type: string;
      dependencies?: string[];
      registryDependencies?: string[];
      files: { type: string; target?: string; content: string }[];
    };
    expect(alpha.type).toBe("registry:ui");
    expect(alpha.registryDependencies).toEqual(
      expect.arrayContaining(["@hewnui/beta", "@hewnui/utils"]),
    );
    expect(alpha.files[0]?.type).toBe("registry:ui");
    expect(alpha.files[0]?.target).toBe("@ui/alpha/alpha.tsx");
    expect(alpha.files[0]?.content).toContain("cn(");

    const alphaParsed = registryItemSchema.safeParse(alpha);
    expect(alphaParsed.success, JSON.stringify(alphaParsed.error?.format())).toBe(
      true,
    );

    const utils = JSON.parse(
      await readFile(join(outDir, "shadcn", "utils.json"), "utf8"),
    ) as unknown;
    expect(registryItemSchema.safeParse(utils).success).toBe(true);

    const providers = JSON.parse(
      await readFile(join(outDir, "shadcn", "providers.json"), "utf8"),
    ) as {
      type: string;
      registryDependencies?: string[];
      files: { content: string }[];
    };
    expect(providers.type).toBe("registry:lib");
    expect(providers.registryDependencies).toEqual(
      expect.arrayContaining(["@hewnui/tokens"]),
    );
    expect(registryItemSchema.safeParse(providers).success).toBe(true);

    const motionPresets = JSON.parse(
      await readFile(join(outDir, "shadcn", "motion-presets.json"), "utf8"),
    ) as unknown;
    expect(registryItemSchema.safeParse(motionPresets).success).toBe(true);

    const tokens = JSON.parse(
      await readFile(join(outDir, "shadcn", "tokens.json"), "utf8"),
    ) as {
      type: string;
      cssVars?: { light?: Record<string, string> };
      files: { type: string; target?: string }[];
    };
    expect(tokens.type).toBe("registry:theme");
    expect(tokens.cssVars?.light?.["kp-background"]).toBeTruthy();
    expect(tokens.files.some((file) => file.target?.endsWith("tokens.css"))).toBe(
      true,
    );
    expect(tokens.files.some((file) => file.target?.endsWith("motion.css"))).toBe(
      true,
    );
    expect(registryItemSchema.safeParse(tokens).success).toBe(true);

    // Existing Hewn registry shape remains unchanged.
    const legacy = JSON.parse(
      await readFile(join(outDir, "r", "alpha.json"), "utf8"),
    ) as { sharedDependencies?: string[]; files?: unknown };
    expect(legacy.sharedDependencies).toEqual(["utils/cn"]);
    expect(legacy.files).toBeTruthy();
  });
});
