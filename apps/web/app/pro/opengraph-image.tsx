import { proOgAlt, renderProOgImage } from "@/lib/og/render-pro-og";
import { ogContentType, ogSize } from "@/lib/og/size";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = proOgAlt;

export default function ProOpengraphImage() {
  return renderProOgImage();
}
