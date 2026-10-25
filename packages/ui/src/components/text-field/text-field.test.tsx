import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { TextField } from "./text-field";

afterEach(() => cleanup());

describe("TextField", () => {
  it("renders a labeled input", () => {
    renderWithProviders(<TextField label="Email" placeholder="you@studio.dev" />);
    expect(screen.getByLabelText("Email")).toBeTruthy();
  });
});
