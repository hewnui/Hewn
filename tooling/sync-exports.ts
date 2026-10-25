import { readdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const checkMode = process.argv.includes("--check");

type ExportEntry = { types: string; default: string };
type ExportsMap = Record<string, ExportEntry | string>;

function componentNames(): string[] {
  const componentsDir = join(repoRoot, "packages/ui/src/components");
  return readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

/** publishConfig.exports — dist paths for npm. */
function uiPublishExports(): ExportsMap {
  const map: ExportsMap = {
    ".": { types: "./dist/index.d.ts", default: "./dist/index.js" },
  };
  for (const name of componentNames()) {
    map[`./${name}`] = {
      types: `./dist/components/${name}/index.d.ts`,
      default: `./dist/components/${name}/index.js`,
    };
  }
  map["./package.json"] = "./package.json";
  return map;
}

/**
 * Workspace `exports` — src paths so Next can resolve subpaths and
 * optimizePackageImports can rewrite barrel imports without a prior build.
 */
function uiDevExports(): ExportsMap {
  const map: ExportsMap = {
    ".": { types: "./src/index.ts", default: "./src/index.ts" },
  };
  for (const name of componentNames()) {
    map[`./${name}`] = {
      types: `./src/components/${name}/index.ts`,
      default: `./src/components/${name}/index.ts`,
    };
  }
  map["./package.json"] = "./package.json";
  return map;
}

function motionPublishExports(): ExportsMap {
  return {
    ".": { types: "./dist/index.d.ts", default: "./dist/index.js" },
    "./package.json": "./package.json",
  };
}

function motionDevExports(): ExportsMap {
  return {
    ".": { types: "./src/index.ts", default: "./src/index.ts" },
    "./package.json": "./package.json",
  };
}

function themesCssExports(): ExportsMap {
  return {
    "./tokens.css": "./src/tokens.css",
    "./motion.css": "./src/motion.css",
    "./glass.css": "./src/glass.css",
    "./glass-buttons.css": "./src/glass-buttons.css",
    "./radius.css": "./src/radius.css",
    "./packs/clay.css": "./src/packs/clay.css",
    "./packs/dune.css": "./src/packs/dune.css",
    "./packs/ember.css": "./src/packs/ember.css",
    "./packs/forest.css": "./src/packs/forest.css",
    "./packs/graphite.css": "./src/packs/graphite.css",
    "./packs/tide.css": "./src/packs/tide.css",
  };
}

function themesPublishExports(): ExportsMap {
  return {
    ...themesCssExports(),
    "./authoring": {
      types: "./dist/authoring/index.d.ts",
      default: "./dist/authoring/index.js",
    },
    "./figma/hewn.tokens.json": "./figma/hewn.tokens.json",
    "./figma/sticker-sheet.svg": "./figma/sticker-sheet.svg",
    "./package.json": "./package.json",
  };
}

function themesDevExports(): ExportsMap {
  return {
    ...themesCssExports(),
    "./authoring": {
      types: "./src/authoring/index.ts",
      default: "./src/authoring/index.ts",
    },
    "./figma/hewn.tokens.json": "./figma/hewn.tokens.json",
    "./figma/sticker-sheet.svg": "./figma/sticker-sheet.svg",
    "./package.json": "./package.json",
  };
}

const targets: {
  pkgPath: string;
  publishExports: ExportsMap;
  devExports: ExportsMap;
}[] = [
  {
    pkgPath: "packages/ui/package.json",
    publishExports: uiPublishExports(),
    devExports: uiDevExports(),
  },
  {
    pkgPath: "packages/motion/package.json",
    publishExports: motionPublishExports(),
    devExports: motionDevExports(),
  },
  {
    pkgPath: "packages/themes/package.json",
    publishExports: themesPublishExports(),
    devExports: themesDevExports(),
  },
];

let drifted = false;

for (const target of targets) {
  const absolute = join(repoRoot, target.pkgPath);
  const pkg = JSON.parse(readFileSync(absolute, "utf8")) as {
    exports?: unknown;
    publishConfig?: { exports?: unknown };
  };

  const publishCurrent = JSON.stringify(pkg.publishConfig?.exports ?? null);
  const publishNext = JSON.stringify(target.publishExports);
  const devCurrent = JSON.stringify(pkg.exports ?? null);
  const devNext = JSON.stringify(target.devExports);

  if (publishCurrent === publishNext && devCurrent === devNext) {
    console.log(`ok: ${target.pkgPath} exports in sync`);
    continue;
  }

  if (checkMode) {
    if (publishCurrent !== publishNext) {
      console.error(
        `drift: ${target.pkgPath} publishConfig.exports is stale — run pnpm sync:exports`,
      );
    }
    if (devCurrent !== devNext) {
      console.error(
        `drift: ${target.pkgPath} exports (dev/src) is stale — run pnpm sync:exports`,
      );
    }
    drifted = true;
    continue;
  }

  const publishConfig =
    typeof pkg.publishConfig === "object" && pkg.publishConfig !== null
      ? pkg.publishConfig
      : {};
  const updated = {
    ...pkg,
    exports: target.devExports,
    publishConfig: { ...publishConfig, exports: target.publishExports },
  };
  writeFileSync(absolute, `${JSON.stringify(updated, null, 2)}\n`, "utf8");
  console.log(`synced: ${target.pkgPath}`);
}

if (drifted) process.exit(1);
