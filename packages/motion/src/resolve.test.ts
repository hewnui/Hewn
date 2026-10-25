import { afterEach, describe, expect, it, vi } from "vitest";
import {
  coerceMotionMode,
  motionConfigReduced,
  parseMotionPreference,
  resolveMotionMode,
} from "./resolve";

describe("resolveMotionMode", () => {
  it("passes preference through when OS allows full motion", () => {
    expect(resolveMotionMode("full", false)).toBe("full");
    expect(resolveMotionMode("reduced", false)).toBe("reduced");
    expect(resolveMotionMode("off", false)).toBe("off");
  });

  it("never elevates above reduced when OS prefers reduced motion", () => {
    expect(resolveMotionMode("full", true)).toBe("reduced");
    expect(resolveMotionMode("reduced", true)).toBe("reduced");
    expect(resolveMotionMode("off", true)).toBe("off");
  });
});

describe("parseMotionPreference", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("migrates legacy on and rejects unknown values", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(parseMotionPreference("on")).toBe("full");
    expect(warn).toHaveBeenCalled();
    expect(parseMotionPreference("full")).toBe("full");
    expect(parseMotionPreference("reduced")).toBe("reduced");
    expect(parseMotionPreference("off")).toBe("off");
    expect(parseMotionPreference("maybe")).toBeNull();
    expect(parseMotionPreference(null)).toBeNull();
  });

  it("coerceMotionMode accepts on as full", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(coerceMotionMode("on")).toBe("full");
    expect(coerceMotionMode("full")).toBe("full");
    expect(coerceMotionMode("nope", "off")).toBe("off");
  });
});

describe("motionConfigReduced", () => {
  it("maps effective modes onto MotionConfig reducedMotion", () => {
    expect(motionConfigReduced("full")).toBe("never");
    expect(motionConfigReduced("reduced")).toBe("always");
    expect(motionConfigReduced("off")).toBe("always");
  });
});
