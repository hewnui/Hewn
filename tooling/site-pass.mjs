#!/usr/bin/env node
/**
 * Site pass across all sitemap routes (plus /):
 * - 320px horizontal overflow
 * - broken internal links
 * - axe serious/critical
 * - missing / duplicate titles and meta descriptions
 *
 * Usage: node tooling/site-pass.mjs --base=http://127.0.0.1:3200
 */
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "../apps/web");
const require = createRequire(join(webRoot, "package.json"));

const baseArg = process.argv.find((a) => a.startsWith("--base="));
const BASE = (baseArg ? baseArg.slice(7) : "http://127.0.0.1:3200").replace(
  /\/$/,
  "",
);
const outArg = process.argv.find((a) => a.startsWith("--out="));
const OUT = outArg ? outArg.slice(6) : "/tmp/site-pass-report.json";

const { chromium } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

function abs(path) {
  if (path.startsWith("http")) return path;
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

function sameOrigin(url) {
  try {
    return new URL(url).origin === new URL(BASE).origin;
  } catch {
    return false;
  }
}

async function collectRoutes(page) {
  const routes = new Set(["/", "/pro"]);
  await page.goto(abs("/sitemap.xml"), { waitUntil: "domcontentloaded" });
  const xml = await page.content();
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      const u = new URL(m[1].trim());
      routes.add(u.pathname || "/");
    } catch {
      /* ignore */
    }
  }
  return [...routes].sort();
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  const routes = await collectRoutes(page);
  const report = {
    base: BASE,
    checkedAt: new Date().toISOString(),
    routes: routes.length,
    overflow320: [],
    brokenLinks: [],
    axe: [],
    titles: [],
    descriptions: [],
    titleDupes: [],
    descriptionDupes: [],
  };

  const titleMap = new Map();
  const descMap = new Map();
  const linkStatus = new Map();

  for (const path of routes) {
    const url = abs(path);
    await page.setViewportSize({ width: 320, height: 720 });
    const res = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    // Let deferred islands + appearance idle mounts settle before axe.
    await page.waitForTimeout(1200);
    if (!res || !res.ok()) {
      report.brokenLinks.push({
        from: "(navigation)",
        href: path,
        status: res ? res.status() : 0,
      });
      continue;
    }

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
      };
    });
    if (overflow.scrollWidth > overflow.clientWidth + 1) {
      report.overflow320.push({
        path,
        scrollWidth: overflow.scrollWidth,
        clientWidth: overflow.clientWidth,
      });
    }

    const meta = await page.evaluate(() => {
      const title = document.title?.trim() || "";
      const desc =
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content")
          ?.trim() || "";
      const hrefs = [...document.querySelectorAll("a[href]")]
        .map((a) => a.getAttribute("href") || "")
        .filter(Boolean);
      return { title, desc, hrefs };
    });

    if (!meta.title) {
      report.titles.push({ path, issue: "missing" });
    } else {
      const list = titleMap.get(meta.title) || [];
      list.push(path);
      titleMap.set(meta.title, list);
    }

    if (!meta.desc) {
      report.descriptions.push({ path, issue: "missing" });
    } else {
      const list = descMap.get(meta.desc) || [];
      list.push(path);
      descMap.set(meta.desc, list);
    }

    for (const href of meta.hrefs) {
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        continue;
      }
      let target;
      try {
        target = new URL(href, url);
      } catch {
        report.brokenLinks.push({ from: path, href, status: "invalid" });
        continue;
      }
      if (!sameOrigin(target.href)) continue;
      if (target.pathname.startsWith("/api/")) continue;

      const key = target.origin + target.pathname;
      if (!linkStatus.has(key)) {
        try {
          const r = await page.request.get(target.href, {
            maxRedirects: 5,
            timeout: 20000,
          });
          linkStatus.set(key, r.status());
        } catch {
          linkStatus.set(key, 0);
        }
      }
      const status = linkStatus.get(key);
      if (!status || status >= 400) {
        report.brokenLinks.push({
          from: path,
          href: target.pathname + target.search,
          status: status ?? 0,
        });
      }
    }

    try {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      if (serious.length) {
        report.axe.push({
          path,
          violations: serious.map((v) => ({
            id: v.id,
            impact: v.impact,
            help: v.help,
            nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
          })),
        });
      }
    } catch (err) {
      report.axe.push({ path, error: String(err) });
    }
  }

  for (const [title, paths] of titleMap) {
    if (paths.length > 1) report.titleDupes.push({ title, paths });
  }
  for (const [description, paths] of descMap) {
    if (paths.length > 1) {
      report.descriptionDupes.push({ description, paths });
    }
  }

  const seen = new Set();
  report.brokenLinks = report.brokenLinks.filter((row) => {
    const key = `${row.from}|${row.href}|${row.status}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  writeFileSync(OUT, JSON.stringify(report, null, 2));
  console.log(
    JSON.stringify(
      {
        out: OUT,
        routes: report.routes,
        overflow320: report.overflow320.length,
        brokenLinks: report.brokenLinks.length,
        axePages: report.axe.length,
        missingTitles: report.titles.length,
        missingDescriptions: report.descriptions.length,
        titleDupes: report.titleDupes.length,
        descriptionDupes: report.descriptionDupes.length,
      },
      null,
      2,
    ),
  );

  await context.close();
  await browser.close();

  const failed =
    report.overflow320.length +
    report.brokenLinks.length +
    report.axe.length +
    report.titles.length +
    report.descriptions.length;
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
