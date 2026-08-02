import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("production page has no starter or live-market remnants", async () => {
  const [page, layout, galleryRail, timeline, contract, audio] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/gallery-rail.tsx", root), "utf8"),
    readFile(new URL("app/signal-timeline.tsx", root), "utf8"),
    readFile(new URL("app/contract-copy.tsx", root), "utf8"),
    readFile(new URL("app/audio-experience.tsx", root), "utf8"),
  ]);
  const completePage = `${page}\n${galleryRail}\n${timeline}\n${contract}\n${audio}`;

  assert.match(completePage, /THE MEME-STOCK ENGINE/);
  assert.match(completePage, /CONCEPT ART — NOT LIVE MARKET DATA/);
  assert.doesNotMatch(completePage, /SkeletonPreview|codex-preview|fetch\(|axios|wallet/i);
  assert.match(layout, /openGraph/);
  assert.match(layout, /twitter/);
});

test("all optimized production assets exist", async () => {
  const files = [
    "hero-city.webp",
    "hero-yacht.webp",
    "meme-stock.webp",
    "power-cloud.webp",
    "velocity-truck.webp",
    "culture-workstation.webp",
    "market-concept.webp",
    "yacht.webp",
    "four-racing.webp",
    "four-skydive.webp",
    "meme-pizza.webp",
    "gpu-moon.webp",
    "market-room-v2.webp",
    "logo.png",
  ];

  for (const file of files) {
    const asset = await readFile(new URL(`public/gpu/${file}`, root));
    assert.ok(asset.byteLength > 10_000, `${file} should contain optimized artwork`);
  }

  const soundtrack = await readFile(new URL("public/audio/gpu-overclock.mp3", root));
  assert.ok(soundtrack.byteLength > 1_000_000, "soundtrack should be a complete encoded song");
});
