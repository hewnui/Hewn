import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Progress } from "./progress";

afterEach(() => cleanup());

describe("Progress", () => {
  it("exposes a progressbar with value text", () => {
    renderWithProviders(<Progress label="Sync" value={47} />);
    expect(screen.getByRole("progressbar", { name: "Sync" })).toBeTruthy();
    expect(screen.getByText("47%")).toBeTruthy();
  });
});
