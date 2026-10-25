import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Load OG fonts once at module scope so opengraph-image routes stay static.
 * Satori needs TTF/OTF (not WOFF2) — Latin static faces live under assets/og-fonts.
 */
const fontsDir = join(process.cwd(), "assets/og-fonts");

const [plexSansMedium, plexSansSemiBold, spaceGroteskMedium, plexMonoMedium] =
  await Promise.all([
    readFile(join(fontsDir, "IBMPlexSans-Medium.ttf")),
    readFile(join(fontsDir, "IBMPlexSans-SemiBold.ttf")),
    readFile(join(fontsDir, "SpaceGrotesk-Medium.ttf")),
    readFile(join(fontsDir, "IBMPlexMono-Medium.ttf")),
  ]);

export const ogFonts = [
  {
    name: "IBM Plex Sans",
    data: plexSansMedium,
    style: "normal" as const,
    weight: 500 as const,
  },
  {
    name: "IBM Plex Sans",
    data: plexSansSemiBold,
    style: "normal" as const,
    weight: 600 as const,
  },
  {
    name: "Space Grotesk",
    data: spaceGroteskMedium,
    style: "normal" as const,
    weight: 500 as const,
  },
  {
    name: "IBM Plex Mono",
    data: plexMonoMedium,
    style: "normal" as const,
    weight: 500 as const,
  },
];
