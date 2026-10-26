"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTrigger,
} from "@hewnui/ui";

/** Non-destructive confirm — avoids alertdialog/outside-click conflict on Archive. */
export function DialogDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <DialogTrigger>
        <Button>Export report</Button>
        <Dialog title="Export Northwind report?">
          <DialogBody>
            Downloads a CSV of the active workspace metrics. You can export again
            any time.
          </DialogBody>
          <DialogActions>
            <Button variant="secondary" slot="close">
              Cancel
            </Button>
            <Button slot="close">Export</Button>
          </DialogActions>
        </Dialog>
      </DialogTrigger>
    </div>
  );
}
