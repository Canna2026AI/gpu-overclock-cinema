import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../wordpress-theme/gpu-overclock/", import.meta.url);

test("WordPress theme ships the current site and attempts soundtrack autoplay", async () => {
  const index = await readFile(new URL("index.php", root), "utf8");

  assert.match(index, /hero-yacht\.webp/);
  assert.match(index, /THE MEME-STOCK ENGINE/);
  assert.match(index, /SIGNAL[\s\S]*TIMELINE/);
  assert.match(index, /2083916931472691223/);
  assert.match(index, /2083894735920570783/);
  assert.match(index, /0x9dbef6496134c151b9f9855cc5a1ee77f0324444/);
  assert.match(index, /audio\/gpu-overclock\.mp3/);
  assert.match(index, /autoplay/i);

  const script = await readFile(new URL("assets/site.js", root), "utf8");
  assert.match(script, /audio\.play\(\)/);
  assert.match(script, /Play GPU soundtrack/);
});

test("WordPress signal cards have distinct official post destinations", async () => {
  const index = await readFile(new URL("index.php", root), "utf8");
  const carouselLinks = [...index.matchAll(/data-signal-url="(https:\/\/x\.com\/GPUonBSC\/status\/\d+)"/g)]
    .map((match) => match[1]);

  assert.equal(carouselLinks.length, 2);
  assert.equal(new Set(carouselLinks).size, 2);
});
