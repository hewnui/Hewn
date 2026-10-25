import {
  BASE_PACK_IDS,
  SCHEMA_VERSION,
  type DensityPreset,
  type GlassOverrides,
  type MotionCharacter,
  type NeutralOverrides,
  type OverrideMap,
  type SemanticOverrides,
  type ShapeOverrides,
} from "./types";

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RADIUS = new Set(["sharp", "soft", "rounded", "pill"]);
const DENSITY = new Set(["compact", "default", "comfortable"]);
const MOTION = new Set(["snappy", "balanced", "soft"]);

export type NormalizeResult =
  | { ok: true; map: OverrideMap }
  | { ok: false; errors: string[] };

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function readNeutrals(
  value: unknown,
  errors: string[],
): NeutralOverrides | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    errors.push("neutrals must be an object");
    return undefined;
  }
  const record = value as Record<string, unknown>;
  const next: NeutralOverrides = {};
  if (record.surfaceShift !== undefined) {
    if (typeof record.surfaceShift !== "number" || Number.isNaN(record.surfaceShift)) {
      errors.push("neutrals.surfaceShift must be a number");
    } else {
      next.surfaceShift = clamp(record.surfaceShift, -0.08, 0.08);
    }
  }
  if (record.chromaScale !== undefined) {
    if (typeof record.chromaScale !== "number" || Number.isNaN(record.chromaScale)) {
      errors.push("neutrals.chromaScale must be a number");
    } else {
      next.chromaScale = clamp(record.chromaScale, 0.5, 1.5);
    }
  }
  return Object.keys(next).length > 0 ? next : undefined;
}

function readSemantic(
  value: unknown,
  errors: string[],
): SemanticOverrides | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    errors.push("semantic must be an object");
    return undefined;
  }
  const record = value as Record<string, unknown>;
  if (record.dangerSeed === undefined) return undefined;
  if (typeof record.dangerSeed !== "string") {
    errors.push("semantic.dangerSeed must be a string");
    return undefined;
  }
  return { dangerSeed: record.dangerSeed };
}

function readShape(
  value: unknown,
  errors: string[],
): ShapeOverrides | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    errors.push("shape must be an object");
    return undefined;
  }
  const record = value as Record<string, unknown>;
  if (record.density === undefined) return undefined;
  if (typeof record.density !== "string" || !DENSITY.has(record.density)) {
    errors.push("shape.density must be compact | default | comfortable");
    return undefined;
  }
  return { density: record.density as DensityPreset };
}

function readGlass(
  value: unknown,
  errors: string[],
): GlassOverrides | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    errors.push("glass must be an object");
    return undefined;
  }
  const record = value as Record<string, unknown>;
  if (record.tintStrength === undefined) return undefined;
  if (typeof record.tintStrength !== "number" || Number.isNaN(record.tintStrength)) {
    errors.push("glass.tintStrength must be a number");
    return undefined;
  }
  return { tintStrength: clamp(record.tintStrength, 0.5, 1.5) };
}

export function normalizeOverrideMap(value: unknown): NormalizeResult {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { ok: false, errors: ["override map must be an object"] };
  }

  const record = value as Record<string, unknown>;
  const errors: string[] = [];
  let schemaVersion =
    typeof record.schemaVersion === "number" ? record.schemaVersion : 0;

  if (schemaVersion < 1) schemaVersion = SCHEMA_VERSION;
  if (schemaVersion > SCHEMA_VERSION) {
    errors.push(
      `unsupported schemaVersion ${schemaVersion} (max ${SCHEMA_VERSION})`,
    );
  }

  if (
    typeof record.basePackId !== "string" ||
    !BASE_PACK_IDS.includes(record.basePackId as (typeof BASE_PACK_IDS)[number])
  ) {
    errors.push(`basePackId must be one of: ${BASE_PACK_IDS.join(", ")}`);
  }

  if (record.packId !== undefined) {
    if (typeof record.packId !== "string" || !KEBAB.test(record.packId)) {
      errors.push("packId must be kebab-case");
    } else if (
      BASE_PACK_IDS.includes(record.packId as (typeof BASE_PACK_IDS)[number])
    ) {
      errors.push(`packId collides with curated pack "${record.packId}"`);
    }
  }

  if (
    record.accentSeed !== undefined &&
    typeof record.accentSeed !== "string"
  ) {
    errors.push("accentSeed must be a string");
  }

  if (
    record.radiusPreset !== undefined &&
    (typeof record.radiusPreset !== "string" ||
      !RADIUS.has(record.radiusPreset))
  ) {
    errors.push("radiusPreset must be sharp | soft | rounded | pill");
  }

  if (
    record.motion !== undefined &&
    (typeof record.motion !== "string" || !MOTION.has(record.motion))
  ) {
    errors.push("motion must be snappy | balanced | soft");
  }

  const neutrals = readNeutrals(record.neutrals, errors);
  const semantic = readSemantic(record.semantic, errors);
  const shape = readShape(record.shape, errors);
  const glass = readGlass(record.glass, errors);

  if (errors.length > 0) return { ok: false, errors };

  const map: OverrideMap = {
    schemaVersion: SCHEMA_VERSION,
    basePackId: record.basePackId as OverrideMap["basePackId"],
  };
  if (typeof record.packId === "string") map.packId = record.packId;
  if (typeof record.accentSeed === "string") map.accentSeed = record.accentSeed;
  if (typeof record.radiusPreset === "string" && RADIUS.has(record.radiusPreset)) {
    map.radiusPreset = record.radiusPreset as NonNullable<
      OverrideMap["radiusPreset"]
    >;
  }
  if (neutrals) map.neutrals = neutrals;
  if (semantic) map.semantic = semantic;
  if (shape) map.shape = shape;
  if (glass) map.glass = glass;
  if (typeof record.motion === "string" && MOTION.has(record.motion)) {
    map.motion = record.motion as MotionCharacter;
  }

  return { ok: true, map };
}
