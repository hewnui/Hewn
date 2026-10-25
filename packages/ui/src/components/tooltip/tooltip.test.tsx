import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "../button";
import { renderWithProviders } from "../../test/render";
import { Tooltip, TooltipTrigger } from "./tooltip";

afterEach(() => cleanup());

describe("Tooltip", () => {
  it("renders tooltip content when open", () => {
    renderWithProviders(
      <TooltipTrigger isOpen delay={0}>
        <Button>Help</Button>
        <Tooltip>Keyboard shortcut</Tooltip>
      </TooltipTrigger>,
    );
    expect(screen.getByRole("tooltip")).toBeTruthy();
    expect(screen.getByText("Keyboard shortcut")).toBeTruthy();
  });
});
