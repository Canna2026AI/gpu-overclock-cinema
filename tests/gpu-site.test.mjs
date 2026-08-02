import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("GPU landing page contains the approved story and external destinations", async () => {
  const [page, galleryRail] = await Promise.all([
    source("app/page.tsx"),
    source("app/gallery-rail.tsx"),
  ]);
  const completePage = `${page}\n${galleryRail}`;

  assert.match(completePage, /THE MEME-STOCK ENGINE/i);
  assert.match(completePage, /Bridging Wall Street/i);
  assert.match(completePage, /Power/i);
  assert.match(completePage, /Velocity/i);
  assert.match(completePage, /Culture/i);
  assert.match(completePage, /https:\/\/x\.com\/GPUonBSC/);
  assert.match(
    completePage,
    /https:\/\/dexscreener\.com\/bsc\/0x29271ed4b6b8ff41c326c81ca040fd110a4a047e/,
  );
  assert.match(completePage, /CONCEPT ART — NOT LIVE MARKET DATA/);
  assert.match(completePage, /not affiliated with NVIDIA Corporation/i);
  assert.match(completePage, /rel="noopener noreferrer"/);
  assert.match(completePage, /href="#gpu">GPU/);
  assert.match(completePage, /gallery-grid/);
});

test("GPU landing page references all seven supplied artworks", async () => {
  const page = await source("app/page.tsx");
  const artworks = [
    "hero-city",
    "meme-stock",
    "power-cloud",
    "velocity-truck",
    "culture-workstation",
    "market-concept",
    "yacht",
  ];

  for (const artwork of artworks) {
    assert.match(page, new RegExp(`/gpu/${artwork}\\.webp`));
  }
});

test("GPU theme removes starter metadata and respects reduced motion", async () => {
  const [page, layout, css] = await Promise.all([
    source("app/page.tsx"),
    source("app/layout.tsx"),
    source("app/globals.css"),
  ]);

  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project/);
  assert.match(layout, /GPU — The Meme-Stock Engine/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /scroll-behavior:\s*auto/);
  assert.match(css, /--acid:\s*#c7ff00/i);
  assert.match(css, /scroll-snap-type:\s*inline mandatory/);
  assert.match(css, /\.motion-ready \[data-reveal\]/);
});

test("filmstrip gallery exposes keyboard and button controls", async () => {
  const gallery = await source("app/gallery-rail.tsx");

  assert.match(gallery, /aria-label="Previous frame"/);
  assert.match(gallery, /aria-label="Next frame"/);
  assert.match(gallery, /event\.key === "ArrowLeft"/);
  assert.match(gallery, /prefers-reduced-motion:\s*reduce/);
});
