# Contributing to the GPU website

Thanks for helping improve the GPU website. The safest contribution flow is Fork → Branch → Pull Request.

## 1. Fork and clone

Use GitHub's **Fork** button, then clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/gpu-overclock-cinema.git
cd gpu-overclock-cinema
npm install
```

## 2. Create a branch

```bash
git switch -c feature/short-description
```

Use a focused branch for each change. Do not commit `.env*`, `.vercel/`, API keys, passwords, build caches, or private account information.

## 3. Develop and validate

```bash
npm run dev
npm run lint
npm test
```

Please verify desktop and mobile layouts, keyboard focus, external links, image alt text, and reduced-motion behavior.

## 4. Commit and push

```bash
git add PATHS-YOU-CHANGED
git commit -m "Describe the change"
git push -u origin feature/short-description
```

## 5. Open a Pull Request

Open a Pull Request from your branch to this repository's `main` branch. Include:

- what changed and why;
- screenshots for visual changes;
- the validation commands you ran;
- any remaining tradeoffs or follow-up work.

The repository owner can review the diff and merge approved changes back into `main`. Vercel can then rebuild the public site from the merged source.

## Content guardrails

- Keep the public website in English unless a separate localization is approved.
- Do not add unverified tokenomics, roadmaps, return promises, or market claims.
- Do not add live market data or wallet connectivity without a separately reviewed product scope.
- Keep `CONCEPT ART — NOT LIVE MARKET DATA` visible wherever the market-room artwork appears.
- Keep the NVIDIA non-affiliation statement and digital-asset risk notice.
