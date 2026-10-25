import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_SITE_URL } from "./default-site-url.js";
import { DEFAULT_REGISTRY_URL, registryBase } from "./registry.js";

describe("registryBase", () => {
  const previous = process.env.HEWN_REGISTRY_URL;

  afterEach(() => {
    if (previous === undefined) {
      delete process.env.HEWN_REGISTRY_URL;
    } else {
      process.env.HEWN_REGISTRY_URL = previous;
    }
  });

  it("defaults to the canonical site URL", () => {
    delete process.env.HEWN_REGISTRY_URL;
    expect(DEFAULT_REGISTRY_URL).toBe(DEFAULT_SITE_URL);
    expect(registryBase()).toBe(DEFAULT_SITE_URL);
  });

  it("prefers HEWN_REGISTRY_URL over the configured flag", () => {
    process.env.HEWN_REGISTRY_URL = "https://env.example/";
    expect(registryBase("https://flag.example")).toBe("https://env.example");
  });

  it("uses the configured flag when env is unset", () => {
    delete process.env.HEWN_REGISTRY_URL;
    expect(registryBase("https://flag.example/")).toBe("https://flag.example");
  });
});
