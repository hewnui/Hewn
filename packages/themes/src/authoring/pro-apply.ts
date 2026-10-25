import { contrastForeground, parseColor } from "./oklch";
import { statusColors } from "./status-ramps";
import type {
  GlassOverrides,
  ModeColorTokens,
  MotionCharacter,
  NeutralOverrides,
  Oklch,
  OverrideMap,
  SemanticOverrides,
  ShapeOverrides,
  StructuralTokens,
  ThemeMode,
} from "./types";

const DENSITY: Record<NonNullable<ShapeOverrides["density"]>, number> = {
  compact: 0.85,
  default: 1,
  comfortable: 1.15,
};

const MOTION: Record<
  Exclude<MotionCharacter, "balanced">,
  Pick<StructuralTokens, "motionDuration" | "motionStiffness" | "motionDamping">
> = {
  snappy: {
    motionDuration: "180ms",
    motionStiffness: 480,
    motionDamping: 32,
  },
  soft: {
    motionDuration: "340ms",
    motionStiffness: 220,
    motionDamping: 26,
  },
};

function clampL(color: Oklch, delta: number): Oklch {
  return { ...color, l: Math.min(0.99, Math.max(0.05, color.l + delta)) };
}

function scaleC(color: Oklch, scale: number): Oklch {
  return { ...color, c: Math.max(0, color.c * scale) };
}

function biasNeutral(color: Oklch, n: NeutralOverrides): Oklch {
  let next = color;
  if (n.surfaceShift !== undefined) next = clampL(next, n.surfaceShift);
  if (n.chromaScale !== undefined) next = scaleC(next, n.chromaScale);
  return next;
}

export function applyNeutrals(
  colors: ModeColorTokens,
  neutrals: NeutralOverrides | undefined,
  mode: ThemeMode,
  adjustments: string[],
): ModeColorTokens {
  if (!neutrals) return colors;
  if (
    neutrals.surfaceShift === undefined &&
    neutrals.chromaScale === undefined
  ) {
    return colors;
  }

  const next = {
    ...colors,
    background: biasNeutral(colors.background, neutrals),
    surface: biasNeutral(colors.surface, neutrals),
    surfaceRaised: biasNeutral(colors.surfaceRaised, neutrals),
    muted: biasNeutral(colors.muted, neutrals),
    border: biasNeutral(colors.border, neutrals),
  };

  const fg = contrastForeground(next.background, colors.foreground);
  if (fg.adjusted) {
    next.foreground = fg.color;
    adjustments.push(
      `${mode} foreground adjusted after neutral bias to meet WCAG AA`,
    );
  } else {
    next.foreground = colors.foreground;
  }

  const mutedFg = contrastForeground(next.muted, colors.mutedForeground, 3);
  next.mutedForeground = mutedFg.color;

  return next;
}

export function applySemantic(
  colors: ModeColorTokens,
  semantic: SemanticOverrides | undefined,
  mode: ThemeMode,
  adjustments: string[],
): ModeColorTokens | { error: string } {
  if (!semantic?.dangerSeed) return colors;
  const seed = parseColor(semantic.dangerSeed);
  if (!seed) return { error: `invalid danger seed: "${semantic.dangerSeed}"` };

  const danger: Oklch =
    mode === "dark"
      ? { ...seed, l: Math.min(0.78, Math.max(0.58, seed.l + 0.08)) }
      : { ...seed, l: Math.min(0.62, Math.max(0.48, seed.l)) };

  if (danger.l !== seed.l) {
    adjustments.push(
      `${mode} danger lightness clamped to ${danger.l.toFixed(2)}`,
    );
  }

  const status = statusColors(mode, danger, {
    success: colors.success.h,
    warning: colors.warning.h,
    info: colors.info.h,
  });
  return {
    ...colors,
    danger,
    dangerForeground: status.dangerForeground,
    dangerSubtle: status.dangerSubtle,
    dangerBorder: status.dangerBorder,
  };
}

export function applyGlass(
  colors: ModeColorTokens,
  glass: GlassOverrides | undefined,
): ModeColorTokens {
  if (!glass?.tintStrength || glass.tintStrength === 1) return colors;
  const base = colors.glassTint.alpha ?? 1;
  return {
    ...colors,
    glassTint: {
      ...colors.glassTint,
      alpha: Math.min(0.55, Math.max(0.08, base * glass.tintStrength)),
    },
  };
}

export function applyShape(
  structural: StructuralTokens,
  shape: ShapeOverrides | undefined,
): StructuralTokens {
  if (!shape?.density || shape.density === "default") return structural;
  return { ...structural, density: DENSITY[shape.density] };
}

export function applyMotion(
  structural: StructuralTokens,
  motion: OverrideMap["motion"],
): StructuralTokens {
  if (!motion || motion === "balanced") return structural;
  return { ...structural, ...MOTION[motion] };
}
