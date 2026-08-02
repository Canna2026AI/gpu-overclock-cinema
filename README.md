# GPU — The Meme-Stock Engine

GPU is a cinematic, single-page brand site for the `$GPU` Meme × Stock narrative. The site combines full-bleed imagery, a black/gold/acid-green visual system, responsive storytelling, and lightweight motion.

## Live site

- Production: [gpu-overclock-cinema.vercel.app](https://gpu-overclock-cinema.vercel.app)
- X: [@GPUonBSC](https://x.com/GPUonBSC)
- DexScreener: [GPU/NVDAB](https://dexscreener.com/bsc/0x29271ed4b6b8ff41c326c81ca040fd110a4a047e)

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm test
```

`npm test` runs a production build and the site regression tests.

## Project structure

```text
app/                 Next.js page, layout, styles, and interactions
public/gpu/          Optimized brand artwork
tests/               Content and rendered-output regression tests
docs/                Product requirements and contributor documentation
deploy-static/       Lightweight static fallback build
wordpress-theme/     WordPress fallback theme package
```

## Contributing

The repository is public so collaborators can fork it, edit a branch, and submit a Pull Request. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the exact workflow.

## Product boundaries

This is a visual presentation site. It does not include a wallet connection, trading interface, live price feed, database, or financial advice. Artwork that contains a market dashboard is explicitly labeled as concept art.

## License

Source code and written documentation are available under the [MIT License](./LICENSE). GPU names, marks, and visual artwork in `public/gpu/`, `public/og.jpg`, `deploy-static/`, and `wordpress-theme/` remain project assets and are not separately licensed for unrelated reuse.

`$GPU` is an independent meme token and is not affiliated with NVIDIA Corporation. Digital assets involve risk.
