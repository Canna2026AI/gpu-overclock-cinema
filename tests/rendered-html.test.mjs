import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("production page has no starter or live-market remnants", async () => {
  const [page, layout, galleryRail] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/gallery-rail.tsx", root), "utf8"),
  ]);
  const completePage = `${page}\n${galleryRail}`;

  assert.match(completePage, /THE MEME-STOCK ENGINE/);
  assert.match(completePage, /CONCEPT ART — NOT LIVE MARKET DATA/);
  assert.doesNotMatch(completePage, /SkeletonPreview|codex-preview|fetch\(|axios|wallet/i);
  assert.match(layout, /openGraph/);
  assert.match(layout, /twitter/);
});

test("all optimized production assets exist", async () => {
  const files = [
    "hero-city.webp",
    "meme-stock.webp",
    "power-cloud.webp",
    "velocity-truck.webp",
    "culture-workstation.webp",
    "market-concept.webp",
    "yacht.webp",
  ];

  for (const file of files) {
    const asset = await readFile(new URL(`public/gpu/${file}`, root));
    assert.ok(asset.byteLength > 10_000, `${file} should contain optimized artwork`);
  }
});
