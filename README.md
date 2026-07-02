# Cash App Homepage Clone (AI-Generated)

An AI-generated clone of the [cash.app](https://cash.app) homepage, built **for learning purposes** — to study and understand the quality of Cash App's animation and interaction engineering.

> **Disclaimer:** This project is not affiliated with, endorsed by, or connected to Cash App or Block, Inc. All Cash App trademarks, logos, product videos, card artwork, fonts, and copy belong to Block, Inc. This repository exists purely as an educational exercise in reverse-engineering high-quality web animation. Not for commercial use.

## What's interesting here

The entire scroll experience is rebuilt from scratch in ~200 lines of plain React — no GSAP, no framer-motion, no scroll library — by studying how the production site behaves:

- **Wheel-hijacked section snapping** — one gesture advances exactly one full-viewport section (`quad.inOut`, duration proportional to distance, input locked mid-tween)
- **Viewport-locked phone stage** — a fixed phone frame stays pinned at screen center across six sections while each section's video slides through it behind a phone-silhouette alpha mask, scrubbed per-frame from scroll position
- **Hero morph** — the full-bleed green panel is clipped by a scaling alpha mask that collapses it into a phone shape as you scroll, while the content parallaxes out
- **Late theme flip** — the page background/text color crossfades only when the scroll is ~65% into the next section
- **Scroll-scrubbed parallax staggers** — e.g. the "Access cash" card row, where each card travels a different amplitude tied linearly to scroll
- **Card fan** — six stacked cards at -90° that fan open in 15° steps the moment the figure is fully in view

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 (12-column grid + fluid em-based type scale matching the original)
- Zero animation dependencies — one custom scroll engine (`src/components/ScrollStage.tsx`)

## Running it

```bash
npm install
npm run dev
```

Requires Node.js 20.9+.

## Where everything lives

See [`docs/CUSTOMIZATION.md`](docs/CUSTOMIZATION.md) for a map of every component, config, and design token, and [`docs/research/`](docs/research/) for the behavior notes taken while studying the original site.
