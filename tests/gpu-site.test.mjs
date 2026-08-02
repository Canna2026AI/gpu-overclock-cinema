import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("GPU landing page contains the approved story and external destinations", async () => {
  const [page, galleryRail, timeline, contract, audio] = await Promise.all([
    source("app/page.tsx"),
    source("app/gallery-rail.tsx"),
    source("app/signal-timeline.tsx"),
    source("app/contract-copy.tsx"),
    source("app/audio-experience.tsx"),
  ]);
  const completePage = `${page}\n${galleryRail}\n${timeline}\n${contract}\n${audio}`;

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
  assert.match(completePage, /href="#gpu"/);
  assert.match(completePage, /gallery-grid/);
  assert.match(completePage, /0x9dbef6496134c151b9f9855cc5a1ee77f0324444/);
  assert.match(completePage, /2083916931472691223/);
  assert.match(completePage, /2083894735920570783/);
  assert.match(completePage, /Copy CA/i);
  assert.match(completePage, /Enter with sound/i);
});

test("GPU landing page references every supplied artwork", async () => {
  const page = await source("app/page.tsx");
  const artworks = [
    "hero-city",
    "meme-stock",
    "power-cloud",
    "velocity-truck",
    "culture-workstation",
    "market-concept",
    "yacht",
    "four-racing",
    "four-skydive",
    "meme-pizza",
    "gpu-moon",
    "market-room-v2",
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

test("signal timeline and soundtrack provide accessible controls", async () => {
  const [timeline, audio] = await Promise.all([
    source("app/signal-timeline.tsx"),
    source("app/audio-experience.tsx"),
  ]);

  assert.match(timeline, /aria-label="Previous signal"/);
  assert.match(timeline, /aria-label="Next signal"/);
  assert.match(timeline, /event\.key === "ArrowLeft"/);
  assert.match(audio, /aria-modal="true"/);
  assert.match(audio, /aria-pressed=\{soundOn\}/);
  assert.match(audio, /new AudioContextClass/);
  assert.doesNotMatch(audio, /autoPlay/);
});
