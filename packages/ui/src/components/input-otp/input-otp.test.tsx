import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { InputOtp } from "./input-otp";
import { inputOtpSlotClassName, inputOtpSlotsClass } from "./input-otp.styles";

afterEach(() => cleanup());

describe("InputOtp", () => {
  it("keeps digit slots in a constrained horizontal row", () => {
    expect(inputOtpSlotsClass).toContain("flex-row");
    expect(inputOtpSlotClassName()).toContain("max-w-11");
    expect(inputOtpSlotClassName()).toContain("basis-11");
  });

  it("renders labeled digit slots", () => {
    renderWithProviders(<InputOtp label="Verification code" length={4} />);
    expect(screen.getByText("Verification code")).toBeTruthy();
    expect(screen.getByLabelText("Digit 1 of 4")).toBeTruthy();
  });

  it("advances focus while typing", async () => {
    const user = userEvent.setup();
    renderWithProviders(<InputOtp label="Code" length={4} />);
    await user.type(screen.getByLabelText("Digit 1 of 4"), "9");
    expect(screen.getByLabelText("Digit 2 of 4")).toBe(
      document.activeElement,
    );
  });
});
