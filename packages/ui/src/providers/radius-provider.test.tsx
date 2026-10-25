import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { RadiusProvider, useRadius } from "./radius-provider";

afterEach(() => cleanup());

function RadiusLabel() {
  const { radius } = useRadius();
  return <span>{radius}</span>;
}

function RadiusToggle() {
  const { setRadius } = useRadius();
  return (
    <button type="button" onClick={() => setRadius("pill")}>
      Make pill
    </button>
  );
}

describe("RadiusProvider", () => {
  it("defaults to soft and applies radius CSS variables", async () => {
    const user = userEvent.setup();
    render(
      <RadiusProvider>
        <RadiusLabel />
        <RadiusToggle />
      </RadiusProvider>,
    );
    expect(screen.getByText("soft")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Make pill" }));
    expect(screen.getByText("pill")).toBeTruthy();
    expect(document.documentElement.dataset.radius).toBe("pill");
    expect(
      document.documentElement.style.getPropertyValue("--kp-radius-md"),
    ).toBe("9999px");
    expect(
      document.documentElement.style.getPropertyValue("--kp-radius-panel"),
    ).toBe("1.15rem");
  });
});
