import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const memory = new Map<string, string>();

if (typeof globalThis.CSS === "undefined") {
  Object.defineProperty(globalThis, "CSS", { value: {}, writable: true });
}
if (typeof CSS.escape !== "function") {
  CSS.escape = (value: string) =>
    String(value).replace(
      /([\0-\x1f\x7f]|^-?[0-9]|[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g,
      "\\$&",
    );
}

Object.defineProperty(window, "localStorage", {
  value: {
    getItem(key: string) {
      return memory.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      memory.set(key, String(value));
    },
    removeItem(key: string) {
      memory.delete(key);
    },
    clear() {
      memory.clear();
    },
  },
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  }),
});
