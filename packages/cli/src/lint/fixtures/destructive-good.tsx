export function GoodDelete() {
  return (
    <Dialog title="Delete item?">
      <Button variant="danger" onPress={() => deleteItem()}>
        Delete
      </Button>
    </Dialog>
  );
}

declare function Dialog(props: {
  title?: string;
  children?: unknown;
}): unknown;
declare function Button(props: {
  variant?: string;
  onPress?: () => void;
  children?: unknown;
}): unknown;
declare function deleteItem(): void;
