# Making It Your Own

The clone reproduces cash.app 1:1 but everything is plain Next.js 16 + React 19 + Tailwind v4 — no GSAP, no framer-motion, no scroll library. One custom scroll engine, config-driven sections. Change data, not components.

## Where everything lives

| What you want to change | File |
|---|---|
| Section copy, CTAs, videos, bullets, quotes | `src/components/featureSections.ts` (one config object per section) |
| Section order / which sections exist / bg color per section | `src/app/page.tsx` (`sections` array) |
| Phone videos in the locked center phone | `src/app/page.tsx` (`phoneStageItems`) + files in `public/videos/` |
| Brand colors | `src/app/globals.css` (`--cash-green`, `--cash-tile`, ...) |
| Font | `src/app/layout.tsx` (`localFont` → swap woff2s in `public/fonts/`) |
| Logo / icons | `src/components/icons.tsx` |
| Nav links + pills | `src/components/NavHeader.tsx` |
| Menu tiles / links / socials | `src/components/MenuOverlay.tsx` (data arrays at top) |
| Hero headline + morph target | `src/components/HeroSection.tsx` |
| Card fan images | `public/images/cards/` + `src/components/CardFanSection.tsx` (`fanCards` array) |
| Borrow card grid | `src/components/BorrowSection.tsx` (data at top) |
| Footer stats / links / legal | `src/components/FooterSection.tsx` |

## The scroll engine (`src/components/ScrollStage.tsx`)

- Body never scrolls; `ScrollStage` owns a hidden-scrollbar container.
- Wheel/touch/keyboard hijack: one gesture = one section, 1s snap with `cubic-bezier(0,.5,.2,1)` (curve lifted from the original bundle). Scroll-settle fallback covers scrollbar drags/momentum.
- Page bg crossfades 0.6s per active section; each section's `content(active)` render-prop gets the active flag for entrance animations.
- `useStageScroll(cb)` exposes raw scrollTop for scroll-driven effects (hero mask morph uses it).
- `overlay` prop renders viewport-locked layers (the `PhoneStage`).

## The locked phone (`src/components/PhoneStage.tsx`)

Viewport-pinned frame (height 80vh, aspect 0.462141, `drop-shadow(0 4px 100px)`) that stays put across sections while per-section videos crossfade/slide inside — mechanism matches the original's `position:fixed` portal. Add a section: append to `phoneStageItems` with the section id.

## Hero morph (`src/components/HeroSection.tsx`)

Green panel is clipped by a phone-silhouette alpha mask (337×724 base, SVG data-URI). Scroll drives `mask-size` from viewport-cover down to the PhoneStage frame. Swap `PHONE_MASK` for any silhouette to change the shape.

## Reference material

`cash-app-homepage/` is an HTTrack mirror of the original (CSS chunks + assets, no JS). Real values already mined from it: easings, phone geometry, mask mechanism, shadows. Keep for reference or delete once the design diverges.

## Known divergences from the original

- Mobile/tablet: breakpoints exist but layouts are approximations; original mobile untested (desktop is pixel-matched).
- Snap thresholds/durations: original's scroll JS wasn't in the mirror; ours is tuned by feel (1000ms, 120px wheel threshold).
- Phone-screen "scroll inside frame" is a video translate+crossfade; original slides an alpha-mask position (`--mask-top`) — visually equivalent.
- Cookie banner (OneTrust) intentionally omitted.
