import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { FileUpload } from "./file-upload";

afterEach(() => cleanup());

describe("FileUpload", () => {
  it("renders a labeled drop zone with browse control", () => {
    renderWithProviders(
      <FileUpload label="Brand assets" buttonLabel="Choose files" />,
    );
    expect(screen.getByText("Brand assets")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Choose files" })).toBeTruthy();
  });

  it("lists selected files when provided", () => {
    const file = new File(["preview"], "mark-forest.svg", {
      type: "image/svg+xml",
    });
    renderWithProviders(
      <FileUpload label="Upload" files={[file]} allowsMultiple={false} />,
    );
    expect(screen.getByText("mark-forest.svg")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Remove mark-forest.svg" }),
    ).toBeTruthy();
  });
});
