/**
 * Anti-FOUC appearance restore, inlined into <head> so it runs before paint.
 *
 * MIRROR — these three constants must stay in step with the library:
 *   themeModes   ← `themePacks`   in packages/ui/src/providers/theme-provider.tsx
 *   radiusScales ← `radiusScales` in packages/ui/src/providers/radius-provider.tsx
 *   radiusTokens ← `radiusTokens` in packages/ui/src/providers/radius-provider.tsx
 *
 * Both providers sit behind "use client", so a server component cannot import
 * their values to generate this script — every export crossing that boundary
 * becomes a client reference. Adding a theme pack or radius preset means
 * editing here too, or the restored appearance silently falls back.
 */

const defaults = {
  theme: "forest",
  mode: "light",
  material: "solid",
  radius: "soft",
  motion: "full",
} as const;

const themeModes = {
  forest: ["light", "dark"],
  tide: ["light", "dark"],
  graphite: ["light", "dark"],
  dune: ["light"],
  clay: ["light"],
  ember: ["dark"],
};

const radiusScales = ["sharp", "soft", "rounded", "pill"];

/** `soft` is absent on purpose: it clears the overrides rather than setting them. */
const radiusTokens = {
  sharp: { sm: "0.125rem", md: "0.2rem", lg: "0.3rem", panel: "0.25rem" },
  rounded: { sm: "0.85rem", md: "1.15rem", lg: "1.5rem", panel: "1.25rem" },
  pill: { sm: "9999px", md: "9999px", lg: "1.5rem", panel: "1.15rem" },
};

const radiusVars = [
  "--kp-radius-sm",
  "--kp-radius-md",
  "--kp-radius-lg",
  "--kp-radius-panel",
];

export const appearanceScript = `
try {
  var root = document.documentElement;
  var modes = ${JSON.stringify(themeModes)};
  var scales = ${JSON.stringify(radiusScales)};
  var tokenMap = ${JSON.stringify(radiusTokens)};
  var vars = ${JSON.stringify(radiusVars)};

  var theme = localStorage.getItem("kp-theme") || "${defaults.theme}";
  if (!modes[theme]) theme = "${defaults.theme}";
  var allowed = modes[theme];
  root.dataset.theme = theme;

  var storedMode = localStorage.getItem("kp-mode");
  var mode = storedMode === "dark" || storedMode === "light"
    ? storedMode
    : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.dataset.mode = allowed.indexOf(mode) >= 0 ? mode : allowed[0];
  root.classList.toggle("dark", root.dataset.mode === "dark");
  root.style.colorScheme = root.dataset.mode;

  root.dataset.material =
    localStorage.getItem("kp-material") || "${defaults.material}";

  var radius = localStorage.getItem("kp-radius") || "${defaults.radius}";
  if (scales.indexOf(radius) < 0) radius = "${defaults.radius}";
  root.dataset.radius = radius;

  var tokens = tokenMap[radius];
  if (tokens) {
    root.style.setProperty(vars[0], tokens.sm);
    root.style.setProperty(vars[1], tokens.md);
    root.style.setProperty(vars[2], tokens.lg);
    root.style.setProperty(vars[3], tokens.panel);
  } else {
    for (var i = 0; i < vars.length; i++) root.style.removeProperty(vars[i]);
  }

  var storedMotion = localStorage.getItem("kp-motion") || "${defaults.motion}";
  if (storedMotion === "on") storedMotion = "full";
  if (storedMotion !== "full" && storedMotion !== "reduced" && storedMotion !== "off") {
    storedMotion = "${defaults.motion}";
  }
  var osReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.dataset.motion =
    storedMotion === "off" ? "off" : osReduced ? "reduced" : storedMotion;
} catch {}
`;
