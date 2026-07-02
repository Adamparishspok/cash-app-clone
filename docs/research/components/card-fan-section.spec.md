# CardFanSection Specification

## Overview
- **Target file:** `src/components/CardFanSection.tsx` ("use client")
- **Interaction model:** entrance choreography when `active` flips true: single upright card → 6 cards fan out behind it with rotation; CTA fades in last.
- **Props contract:** `{ active: boolean }`
- Theme: DARK — page bg (stage) black, all text white.

## Layout (1512×798)
Same skeleton as FeatureSection:
- h2 left x38 w341, 40px/44px/-1.2px w400 white: lines ["Cash App Card", "is the debit card", "that works for you"]
- Right column x1113 w381: bullet list (18px/25.2px, white, list-disc pl-[18px]):
  - "No hidden or monthly fees ever"
  - "Weekly custom cash back offers"
  - "Real-time transaction alerts"
  - "Card designs you can fully personalize"
- CTA below bullets (mt 32): GalleryButton "Meet Cash App Card" outline-white → https://cash.app/card
- Legal bottom-left: `*See legal disclaimers` 12px (white), href="#legal-disclaimers"
- Card stack center: main card ~240×380 at center (measured 637,204,240,382 for upright card; fan spreads to ~430×430 zone centered at 756,398)

## Card fan
Images (each a rounded-[16px] card, 240×382, object-cover, subtle shadow):
- Main (front): /images/cards/glitter.webp — the dark holographic $reesehills card (rotates to ~ -18deg in fan state)
- Behind (fan order, z descending): black.webp, pink.webp, white.webp, glow.webp, mood.webp
- Fan rotations (settled state, approximate from screenshot): front -18°, then behind: -38°, -58°, +8°, +34°, +58° — cards splayed like a hand of cards around center, each rotated about center point with transform-origin center.
  Concretely use rotations: [-18, 12, -45, 42, -72, 72] with slight translate offsets so edges peek (e.g. translate(-8px,4px) variants). Aim to visually match screenshot: pink top-left, white top, lime bottom-left, teal/green right, magenta bottom.
- Initial (inactive/entering): all cards stacked upright (rotation 0, translate 0), only front visible (others opacity 0).
- Active: over 800ms ease-out (stagger 40ms each), cards rotate/translate to fan positions and fade in (opacity 1).

## Entrance
- Headline/bullets: fade+rise 600ms stagger (same family as FeatureSection).
- CTA: fades in last (delay 400ms).

## Notes
- Plain <img> elements fine.
- Import { GalleryButton } from "@/components/GalleryButton"; cn from "@/lib/utils".
- Verify `npx tsc --noEmit`.
