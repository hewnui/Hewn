export function BadDelete() {
  return (
    <Button variant="danger" onPress={() => deleteItem()}>
      Delete
    </Button>
  );
}

declare function Button(props: {
  variant?: string;
  onPress?: () => void;
  children?: unknown;
}): unknown;
declare function deleteItem(): void;
