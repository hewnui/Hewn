import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MaterialProvider } from "../providers/material-provider";
import { MotionProvider } from "../providers/motion-provider";
import { RadiusProvider } from "../providers/radius-provider";
import { ThemeProvider } from "../providers/theme-provider";

export function renderWithProviders(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <MaterialProvider>
        <RadiusProvider>
          <MotionProvider>{ui}</MotionProvider>
        </RadiusProvider>
      </MaterialProvider>
    </ThemeProvider>,
  );
}
