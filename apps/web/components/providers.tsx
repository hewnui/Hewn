"use client";

import {
  MaterialProvider,
  MotionProvider,
  RadiusProvider,
  ThemeProvider,
  ToastProvider,
} from "@hewnui/ui";
import type { ReactNode } from "react";

/** Site-wide theme/material/motion — no Fumadocs (docs wraps its own RootProvider). */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="forest" defaultMode="light">
      <MaterialProvider defaultMaterial="solid">
        <RadiusProvider defaultRadius="soft">
          <MotionProvider defaultMotion="full">
            <ToastProvider>{children}</ToastProvider>
          </MotionProvider>
        </RadiusProvider>
      </MaterialProvider>
    </ThemeProvider>
  );
}
