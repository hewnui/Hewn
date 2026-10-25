import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { PasswordField } from "./password-field";

afterEach(() => cleanup());

describe("PasswordField", () => {
  it("renders a labeled password input", () => {
    renderWithProviders(<PasswordField label="Password" />);
    expect(screen.getByLabelText("Password").getAttribute("type")).toBe(
      "password",
    );
  });

  it("toggles visibility", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PasswordField label="Secret" />);
    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(screen.getByLabelText("Secret").getAttribute("type")).toBe("text");
  });
});
