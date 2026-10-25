import { writeFile } from "fs/promises";
import { join } from "path";

export async function patchAfterInstall(appDir: string): Promise<void> {
  await writeFile(
    join(appDir, "app/globals.css"),
    `@import "tailwindcss";
@import "../components/hewn/theme/tokens.css";
@import "../components/hewn/theme/radius.css";
`,
  );

  await writeFile(
    join(appDir, "app/providers.tsx"),
    `"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/hewn/providers/theme-provider";
import { MaterialProvider } from "@/components/hewn/providers/material-provider";
import { RadiusProvider } from "@/components/hewn/providers/radius-provider";
import { MotionProvider } from "@/components/hewn/providers/motion-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="forest" defaultMode="light">
      <MaterialProvider defaultMaterial="solid">
        <RadiusProvider defaultRadius="soft">
          <MotionProvider defaultMotion="full">{children}</MotionProvider>
        </RadiusProvider>
      </MaterialProvider>
    </ThemeProvider>
  );
}
`,
  );

  await writeFile(
    join(appDir, "app/layout.tsx"),
    `import type { ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
`,
  );

  await writeFile(
    join(appDir, "app/page.tsx"),
    `"use client";

import { Button } from "@/components/hewn/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTrigger,
} from "@/components/hewn/dialog";
import { DataTable } from "@/components/hewn/data-table";
import type { ColumnDef } from "@tanstack/react-table";

type Row = { id: string; name: string };
const columns: ColumnDef<Row>[] = [{ accessorKey: "name", header: "Name" }];

export default function Page() {
  return (
    <main className="flex flex-col gap-6 p-8">
      <Button>Save</Button>
      <DialogTrigger>
        <Button variant="secondary">Open</Button>
        <Dialog title="Confirm">
          <DialogBody>Scratch install works.</DialogBody>
          <DialogActions>
            <Button variant="ghost">Cancel</Button>
            <Button>Continue</Button>
          </DialogActions>
        </Dialog>
      </DialogTrigger>
      <DataTable
        aria-label="People"
        columns={columns}
        data={[{ id: "1", name: "Ada" }]}
        getRowId={(row) => row.id}
      />
    </main>
  );
}
`,
  );
}
