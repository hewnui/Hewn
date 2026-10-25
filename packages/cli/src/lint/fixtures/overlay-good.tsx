export function GoodOverlay() {
  return (
    <Dialog title="Confirm">
      <p>Has title</p>
    </Dialog>
  );
}

export function AriaOverlay() {
  return (
    <Modal aria-label="Settings">
      <p>Named</p>
    </Modal>
  );
}

declare function Dialog(props: {
  title?: string;
  children?: unknown;
}): unknown;
declare function Modal(props: {
  "aria-label"?: string;
  children?: unknown;
}): unknown;
