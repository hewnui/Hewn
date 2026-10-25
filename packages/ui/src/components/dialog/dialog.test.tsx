import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "../button";
import { renderWithProviders } from "../../test/render";
import { Dialog, DialogActions, DialogBody, DialogTrigger } from "./dialog";

afterEach(() => cleanup());

describe("Dialog", () => {
  it("opens from a trigger", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <DialogTrigger>
        <Button>Open</Button>
        <Dialog title="Confirm">
          <DialogBody>Archive this draft?</DialogBody>
          <DialogActions>
            <Button variant="secondary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </DialogTrigger>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog", { name: "Confirm" })).toBeTruthy();
  });
});
