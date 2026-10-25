import { execFileSync } from "child_process";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "fs";
import { tmpdir } from "os";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGES = [
  "packages/ui",
  "packages/motion",
  "packages/themes",
  "packages/cli",
];

const REQUIRED_ROOT_FILES = ["README.md", "LICENSE"] as const;

const LEAK_PATTERNS = [/\.test\.[cm]?[jt]sx?$/, /\.spec\.[cm]?[jt]sx?$/, /^\.env/];

type ExportValue = string | { types?: string; default?: string };

function flattenExports(exports: Record<string, ExportValue>): string[] {
  const files: string[] = [];
  for (const value of Object.values(exports)) {
    if (typeof value === "string") {
      files.push(value);
    } else {
      if (value.types) files.push(value.types);
      if (value.default) files.push(value.default);
    }
  }
  return files;
}

function checkPackage(pkgDir: string, workDir: string): string[] {
  const errors: string[] = [];
  const packed = execFileSync("pnpm", ["pack"], {
    cwd: join(repoRoot, pkgDir),
    encoding: "utf8",
  }).trim();

  const tarball = join(repoRoot, pkgDir, packed.split("\n").pop() ?? packed);
  const extractDir = join(workDir, pkgDir.replace("/", "-"));
  execFileSync("mkdir", ["-p", extractDir]);
  execFileSync("tar", ["-xzf", tarball, "-C", extractDir]);
  rmSync(tarball, { force: true });

  const packageRoot = join(extractDir, "package");
  const pkg = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8")) as {
    name: string;
    exports?: Record<string, ExportValue>;
    publishConfig?: { exports?: Record<string, ExportValue> };
  };

  for (const required of REQUIRED_ROOT_FILES) {
    if (!existsSync(join(packageRoot, required))) {
      errors.push(`${pkg.name}: packed tarball missing ${required}`);
    }
  }

  const exports = pkg.publishConfig?.exports ?? pkg.exports ?? {};
  for (const file of flattenExports(exports)) {
    const target = file.replace(/^\.\//, "");
    if (target === "package.json") continue;
    if (!existsSync(join(packageRoot, target))) {
      errors.push(`${pkg.name}: export target missing from tarball: ${file}`);
    }
  }

  for (const file of listFiles(packageRoot)) {
    if (LEAK_PATTERNS.some((pattern) => pattern.test(file))) {
      errors.push(`${pkg.name}: leaked non-publish path in tarball: ${file}`);
    }
  }
  return errors;
}

function listFiles(root: string, dir = root, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      listFiles(root, full, acc);
    } else {
      acc.push(relative(root, full).split("\\").join("/"));
    }
  }
  return acc;
}

const workDir = mkdtempSync(join(tmpdir(), "hewn-pack-"));
const failures: string[] = [];

try {
  for (const pkgDir of PACKAGES) {
    const errors = checkPackage(pkgDir, workDir);
    if (errors.length === 0) {
      console.log(`ok: ${pkgDir} pack contents verified`);
    } else {
      failures.push(...errors);
    }
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(`pack check failed:\n${failures.join("\n")}`);
  process.exit(1);
}
