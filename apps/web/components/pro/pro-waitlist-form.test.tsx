import { ProWaitlistForm } from "@/components/pro/pro-waitlist-form";
import { MaterialProvider, MotionProvider, ThemeProvider } from "@hewnui/ui";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

function renderForm(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <MaterialProvider>
        <MotionProvider defaultMotion="off">{ui}</MotionProvider>
      </MaterialProvider>
    </ThemeProvider>,
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ProWaitlistForm", () => {
  it("has no obvious axe violations", async () => {
    const { container } = renderForm(<ProWaitlistForm />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("announces success via aria-live", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => ({ ok: true, alreadyJoined: false }),
      })),
    );

    renderForm(<ProWaitlistForm />);
    await user.type(screen.getByLabelText(/work email/i), "dev@example.com");
    await user.click(
      screen.getByRole("button", { name: /join the pro waitlist/i }),
    );

    await waitFor(() => {
      expect(screen.getByText(/you are on the waitlist/i)).toBeTruthy();
    });
  });

  it("shows error state for unavailable", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 503,
        json: async () => ({
          ok: false,
          code: "unavailable",
          message: "Waitlist temporarily unavailable.",
        }),
      })),
    );

    renderForm(<ProWaitlistForm />);
    await user.type(screen.getByLabelText(/work email/i), "dev@example.com");
    await user.click(
      screen.getByRole("button", { name: /join the pro waitlist/i }),
    );

    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert.textContent).toMatch(/waitlist temporarily unavailable/i);
    });
  });
});
