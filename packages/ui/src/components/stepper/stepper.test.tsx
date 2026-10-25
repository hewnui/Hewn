import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Stepper, StepperStep } from "./stepper";
import { useStepper } from "./use-stepper";

afterEach(() => cleanup());

describe("Stepper", () => {
  it("marks the current step with aria-current=step", () => {
    renderWithProviders(
      <Stepper currentIndex={1} aria-label="Checkout">
        <StepperStep>Account</StepperStep>
        <StepperStep>Shipping</StepperStep>
        <StepperStep>Payment</StepperStep>
      </Stepper>,
    );

    const current = screen.getByText("Shipping").closest("li");
    expect(current?.getAttribute("aria-current")).toBe("step");
    expect(screen.getByText("Account").closest("li")?.getAttribute("data-status")).toBe(
      "complete",
    );
    expect(screen.getByText("Payment").closest("li")?.getAttribute("data-status")).toBe(
      "upcoming",
    );
  });

  it("supports vertical orientation and optional/error statuses", () => {
    renderWithProviders(
      <Stepper orientation="vertical" aria-label="Onboarding">
        <StepperStep status="complete">Profile</StepperStep>
        <StepperStep status="error">Verify email</StepperStep>
        <StepperStep status="optional" isOptional>
          Preferences
        </StepperStep>
      </Stepper>,
    );

    expect(screen.getByText("Verify email").closest("li")?.getAttribute("data-status")).toBe(
      "error",
    );
    expect(screen.getAllByText("Optional").length).toBeGreaterThan(0);
    expect(screen.getByRole("navigation", { name: "Onboarding" })).toBeTruthy();
  });

  it("lets completed steps receive keyboard activation when clickable", async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();
    renderWithProviders(
      <Stepper currentIndex={2} onStepChange={onStepChange}>
        <StepperStep>One</StepperStep>
        <StepperStep>Two</StepperStep>
        <StepperStep>Three</StepperStep>
      </Stepper>,
    );

    const first = screen.getByRole("button", { name: /One/i });
    first.focus();
    await user.keyboard("{Enter}");
    expect(onStepChange).toHaveBeenCalledWith(0);
  });
});

describe("useStepper", () => {
  function Wizard() {
    const { currentIndex, isFirst, isLast, next, previous, statusFor } = useStepper({
      count: 3,
      defaultIndex: 0,
    });
    return (
      <div>
        <p>Step {currentIndex + 1}</p>
        <p>{statusFor(1)}</p>
        <button type="button" onClick={previous} disabled={isFirst}>
          Back
        </button>
        <button type="button" onClick={next} disabled={isLast}>
          Next
        </button>
      </div>
    );
  }

  it("advances and clamps within the step count", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Wizard />);

    expect(screen.getByText("Step 1")).toBeTruthy();
    expect(screen.getByText("upcoming")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Step 2")).toBeTruthy();
    expect(screen.getByText("current")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Step 3")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Next" })).toHaveProperty(
      "disabled",
      true,
    );
  });
});
