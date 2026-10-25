import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { TextArea } from "./text-area";

afterEach(() => cleanup());

describe("TextArea", () => {
  it("renders a labeled multiline field", () => {
    renderWithProviders(
      <TextArea label="Notes" placeholder="Add context" />,
    );
    expect(screen.getByLabelText("Notes")).toBeTruthy();
  });

  it("shows an error message when invalid", () => {
    renderWithProviders(
      <TextArea
        label="Bio"
        isInvalid
        errorMessage="Bio is required."
      />,
    );
    expect(screen.getByText("Bio is required.")).toBeTruthy();
  });
});
