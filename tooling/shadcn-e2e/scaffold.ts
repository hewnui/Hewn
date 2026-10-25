import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export async function scaffoldApp(
  appDir: string,
  registryPort: number,
): Promise<void> {
  await mkdir(join(appDir, "app"), { recursive: true });
  await mkdir(join(appDir, "components/hewn"), { recursive: true });

  await writeFile(
    join(appDir, "package.json"),
    `${JSON.stringify(
      {
        name: "hewn-shadcn-e2e",
        private: true,
        type: "module",
        scripts: { build: "next build" },
        dependencies: {
          next: "16.2.10",
          react: "19.2.7",
          "react-dom": "19.2.7",
        },
        devDependencies: {
          "@tailwindcss/postcss": "4.3.3",
          "@types/node": "22.15.3",
          "@types/react": "19.2.17",
          "@types/react-dom": "19.2.3",
          tailwindcss: "4.3.3",
          typescript: "6.0.3",
        },
      },
      null,
      2,
    )}\n`,
  );

  await writeFile(
    join(appDir, "tsconfig.json"),
    `${JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: false,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "preserve",
          incremental: true,
          plugins: [{ name: "next" }],
          paths: { "@/*": ["./*"] },
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
        exclude: ["node_modules"],
      },
      null,
      2,
    )}\n`,
  );

  await writeFile(
    join(appDir, "next.config.ts"),
    `import type { NextConfig } from "next";\nconst nextConfig: NextConfig = {};\nexport default nextConfig;\n`,
  );
  await writeFile(
    join(appDir, "postcss.config.mjs"),
    `const config = { plugins: { "@tailwindcss/postcss": {} } };\nexport default config;\n`,
  );
  await writeFile(
    join(appDir, "next-env.d.ts"),
    `/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n`,
  );

  await writeFile(
    join(appDir, "components.json"),
    `${JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: true,
        tsx: true,
        tailwind: {
          config: "",
          css: "app/globals.css",
          baseColor: "neutral",
          cssVariables: true,
        },
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
          ui: "@/components/hewn",
          lib: "@/lib",
          hooks: "@/hooks",
        },
        registries: {
          "@hewnui": `http://127.0.0.1:${registryPort}/{name}.json`,
        },
      },
      null,
      2,
    )}\n`,
  );

  await writeFile(join(appDir, "app/globals.css"), `@import "tailwindcss";\n`);
  await writeFile(
    join(appDir, "app/layout.tsx"),
    `import type { ReactNode } from "react";
import "./globals.css";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="forest" data-mode="light">
      <body>{children}</body>
    </html>
  );
}
`,
  );
  await writeFile(
    join(appDir, "app/page.tsx"),
    `export default function Page() {
  return <main className="p-8">Hewn shadcn e2e</main>;
}
`,
  );
}
