/** Public folder for optional real PNG swaps (drop files here). */
export const PRO_PREVIEW_PUBLIC_DIR = "/pro/previews";

/** Expected PNG path for a catalog block — swap placeholders by dropping files. */
export function proBlockPreviewSrc(blockId: string): string {
  return `${PRO_PREVIEW_PUBLIC_DIR}/${blockId}.png`;
}
