"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTrigger,
} from "@hewnui/ui";

export function DialogDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <DialogTrigger>
        <Button>Archive project</Button>
        <Dialog title="Archive Northwind?">
          <DialogBody>
            Archived projects stay searchable but leave the active workspace
            list.
          </DialogBody>
          <DialogActions>
            <Button variant="secondary" slot="close">
              Cancel
            </Button>
            <Button variant="danger" slot="close">
              Archive
            </Button>
          </DialogActions>
        </Dialog>
      </DialogTrigger>
    </div>
  );
}
