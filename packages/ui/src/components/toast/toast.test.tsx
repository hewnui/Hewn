import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "../button";
import { renderWithProviders } from "../../test/render";
import { ToastProvider, useToast } from "./toast";

function Trigger() {
  const { toast } = useToast();
  return (
    <Button
      onPress={() =>
        toast({ title: "Saved", description: "Draft synced.", tone: "success" })
      }
    >
      Notify
    </Button>
  );
}

afterEach(() => cleanup());

describe("Toast", () => {
  it("shows a toast from the provider", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Notify" }));
    expect(screen.getByText("Saved")).toBeTruthy();
  });
});
