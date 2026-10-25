import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { TextField } from "../text-field";
import { Form } from "./form";

afterEach(() => cleanup());

describe("Form", () => {
  it("renders fields inside a form landmark", () => {
    renderWithProviders(
      <Form aria-label="Invite">
        <TextField label="Email" name="email" type="email" />
      </Form>,
    );
    expect(screen.getByRole("form", { name: "Invite" })).toBeTruthy();
    expect(screen.getByLabelText("Email")).toBeTruthy();
  });
});
