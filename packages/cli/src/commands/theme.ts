import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";

export function themeCommand(args: string[] = []): number {
  const [subcommand] = args;

  if (subcommand === "export") {
    return themeExportCommand();
  }

  if (subcommand) {
    console.error(`Unknown theme subcommand: ${subcommand}`);
    console.error("Usage: hewn theme [export]");
    return 1;
  }

  return themeListCommand();
}

function themesRoot(): string | null {
  const candidates = [
    join(process.cwd(), "node_modules/@hewnui/themes"),
    join(process.cwd(), "packages/themes"),
  ];
  return candidates.find((dir) => existsSync(dir)) ?? null;
}

function themeListCommand(): number {
  const root = themesRoot();
  if (!root) {
    console.error(
      "@hewnui/themes is not installed — install it to inspect theme packs.",
    );
    return 1;
  }

  const packsDir = join(root, "src/packs");
  if (!existsSync(packsDir)) {
    console.error("Theme packs directory not found under @hewnui/themes.");
    return 1;
  }

  const packs = readdirSync(packsDir)
    .filter((file) => file.endsWith(".css"))
    .sort();

  for (const file of packs) {
    const content = readFileSync(join(packsDir, file), "utf8");
    const modes = [
      ...new Set(
        [...content.matchAll(/\[data-mode="([^"]+)"\]/g)].map((match) => match[1]),
      ),
    ];
    const name = file.replace(/\.css$/, "");
    console.log(
      `${name}: ${modes.length > 0 ? modes.join(", ") : "no modes declared"}`,
    );
  }
  return 0;
}

function themeExportCommand(): number {
  const root = themesRoot();
  const kitDir = root ? join(root, "figma") : null;
  const hasKit =
    Boolean(kitDir) &&
    existsSync(join(kitDir!, "hewn.tokens.json")) &&
    existsSync(join(kitDir!, "sticker-sheet.svg"));

  console.log("hewn theme export — Figma kit groundwork\n");
  if (hasKit && kitDir) {
    console.log(`Tokens Studio JSON: ${join(kitDir, "hewn.tokens.json")}`);
    console.log(`Sticker sheet SVG:  ${join(kitDir, "sticker-sheet.svg")}`);
  } else {
    console.log(
      "Kit files not found locally. Generate with: pnpm --filter @hewnui/themes generate",
    );
    console.log(
      "Or download from /docs/themes/figma-kit once the docs site is running.",
    );
  }
  console.log("\nImport: Tokens Studio → Import → hewn.tokens.json");
  return 0;
}
