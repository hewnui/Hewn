import { homeOgAlt, renderHomeOgImage } from "@/lib/og/render-home-og";
import { ogContentType, ogSize } from "@/lib/og/size";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = homeOgAlt;

/** Homepage share card — statically generated with vendored Plex / Space Grotesk. */
export default function OpengraphImage() {
  return renderHomeOgImage();
}
