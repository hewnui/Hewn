export function BadOverlay() {
  return (
    <Dialog>
      <p>No label</p>
    </Dialog>
  );
}

declare function Dialog(props: { children?: unknown }): unknown;
