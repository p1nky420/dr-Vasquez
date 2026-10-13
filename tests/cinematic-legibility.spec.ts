import { expect, test, type Page } from "@playwright/test";

type Zone = { x: number; y: number; w: number; h: number };
type Frame = { subject: Zone; dim: number; settled: boolean };

/** Text that must never sit under the pieces once it has finished entering. */
const TEXT = [
  "h1", "h2", ".epic-kicker", ".epic-description", ".epic-link", ".epic-final-cta",
  ".epic-principle", ".epic-support", ".epic-practice-note", ".epic-endgame-caption",
].map((s) => `.epic-site ${s}`).join(",");
const MAX_OVERLAP = 0.12;

/** Scrolls, then waits for a fresh frame in which the scene has come to rest. */
async function scrollAndSettle(page: Page, top: number) {
  await page.evaluate((y) => {
    delete (window as Window & { __epicFrame?: Frame }).__epicFrame;
    window.scrollTo({ top: y, behavior: "instant" });
  }, top);
  await page.waitForFunction(
    () => (window as Window & { __epicFrame?: Frame }).__epicFrame?.settled === true,
    undefined,
    { timeout: 45_000 },
  );
}

async function measure(page: Page) {
  return page.evaluate((selector) => {
    const frame = (window as Window & { __epicFrame?: Frame }).__epicFrame;
    const canvas = document.querySelector<HTMLElement>(".epic-canvas");
    if (!frame || !canvas) return [];
    const presence = Number(getComputedStyle(canvas).opacity);
    if (presence < 0.35 || frame.dim > 0.5) return [];
    const W = innerWidth, H = innerHeight;
    const s = {
      left: frame.subject.x * W, top: frame.subject.y * H,
      right: (frame.subject.x + frame.subject.w) * W, bottom: (frame.subject.y + frame.subject.h) * H,
    };
    const opaque = (el: Element) => {
      for (let n: Element | null = el; n; n = n.parentElement)
        if (Number(getComputedStyle(n).opacity) < 0.6) return false;
      return true;
    };
    return Array.from(document.querySelectorAll(selector)).flatMap((el) => {
      // Measure glyph boxes rather than the block, which may be wider than its text.
      const range = document.createRange();
      range.selectNodeContents(el);
      const r = range.getBoundingClientRect();
      // Sections with their own opaque backdrop hide the world behind them.
      if (r.width < 2 || r.bottom < 0 || r.top > H || !opaque(el) || el.closest("[data-occludes]")) return [];
      const ix = Math.max(0, Math.min(r.right, s.right) - Math.max(r.left, s.left));
      const iy = Math.max(0, Math.min(r.bottom, s.bottom) - Math.max(r.top, s.top));
      const overlap = (ix * iy) / (r.width * r.height);
      return overlap > 0 ? [{ text: (el.textContent ?? "").trim().slice(0, 40), overlap: +overlap.toFixed(3) }] : [];
    });
  }, TEXT);
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("analytics-consent", "rejected"));
});

test("the pieces never cover finished copy while scrolling the whole home", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".epic-canvas")).toHaveAttribute("data-ready", "true", { timeout: 20_000 });
  const { total, height } = await page.evaluate(() => ({
    total: document.documentElement.scrollHeight,
    height: innerHeight,
  }));
  const failures: string[] = [];
  for (let y = 0; y <= total - height; y += Math.round(height / 3)) {
    await scrollAndSettle(page, y);
    for (const hit of await measure(page))
      if (hit.overlap > MAX_OVERLAP) failures.push(`y=${y}: "${hit.text}" ${Math.round(hit.overlap * 100)}%`);
  }
  expect(failures, failures.join("\n")).toEqual([]);
});

test("final call to action is high contrast and reachable", async ({ page }) => {
  await page.goto("/#consulta-rapida", { waitUntil: "networkidle" });
  const cta = page.locator(".epic-final-cta");
  await cta.scrollIntoViewIfNeeded();
  await expect(cta).toBeVisible();
  const ratio = await cta.evaluate((el) => {
    const parse = (c: string) => c.match(/[\d.]+/g)!.slice(0, 3).map(Number);
    const lum = ([r, g, b]: number[]) => {
      const f = (v: number) => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const style = getComputedStyle(el);
    const [a, b] = [lum(parse(style.color)), lum(parse(style.backgroundColor))].sort((x, y) => y - x);
    return (a + 0.05) / (b + 0.05);
  });
  expect(ratio).toBeGreaterThanOrEqual(7);
  const box = (await cta.boundingBox())!;
  expect(box.height).toBeGreaterThanOrEqual(44);
});

test("one h1, no horizontal overflow, no script errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("h1")).toHaveCount(1);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});
