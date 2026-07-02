# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx` ("use client")
- **Interaction model:** scroll-driven morph. The full-bleed green panel contracts into a phone-silhouette rounded rect as the user scrolls to section 2. Uses `useStageScroll` from `@/components/ScrollStage`.
- **Props contract:** `{ active: boolean }`

## Layout (1512×798 measurements)
Section fills 100vh, page bg behind is WHITE; hero paints its own GREEN panel.

### Green background panel (the morph layer)
- At rest (scrollTop 0): absolute, covers full section (inset 0), bg **#00E013**, borderRadius 0. (Original extends -160px above viewport; irrelevant at rest.)
- Morph driven by scroll progress p = scrollTop / viewportH clamped [0,1] (section 1 → 2 transition):
  - width: interpolate from 100% → 334px (centered horizontally)
  - height: 100% → 720px (centered vertically)
  - borderRadius: 0 → 60px
  - Implementation: a div with `will-change: transform` styled via ref inside `useStageScroll` callback (write styles directly on the ref element — no React state per frame). Interpolate left/right/top/bottom via inset calc or width/height + margin auto (absolute inset-0 m-auto + explicit width/height styles).
  - At p=1 fully phone-shaped; fades out (opacity 1→0 over p 0.85→1) so section 2's own video shows.

### Content (z above panel)
- Headline h1: "The way money should work" — 56px / 53.2px / -1.68px / 400 / #000; position left x36, w467, vertically centered (measured y484 for 2 lines); text renders in 2 lines naturally at w467.
- Right column x1131 w345 (measured y449): paragraph 18px/25.2px #000: "From getting paid to growing what you've got, Cash App makes managing your money effortless and instant—without all the fees."
- CTA below paragraph (32px gap): GalleryButton variant "filled-white" size "sm" withArrow, label "Get started", href https://cash.app/account/signup — measured 127×42, white bg black text.
- Phone video center: 437×946 at x538, y175 (extends below fold). Video /videos/hero-alpha.webm (alpha channel, transparent bg over green), autoplay muted playsinline, NO loop, poster none needed. Use plain <video> (not VideoPlayer — no controls shown on hero) with `<source src="/videos/hero-alpha.mov" type='video/mp4; codecs="hvc1"'/>` first then `<source src="/videos/hero-alpha.webm" type="video/webm"/>` for Safari alpha support.
- Phone/content also fades+shrinks slightly as p grows (opacity 1→0 by p 0.5, content moves up with natural scroll).

### Entrance
- On load: headline/desc/cta fade-in rise (opacity 0→1, translateY 24px→0, 0.6s ease, stagger 0/100/200ms).

## Layout implementation
- Root: relative h-full overflow-hidden.
- Flex row: items-center justify-between px-9; left headline block w-[467px]; center video absolute left-1/2 -translate-x-1/2 top-[175px] w-[437px] h-[946px]; right block w-[345px].
- Right block roughly vertically centered (its top at y449 ≈ center minus half its height).

## Text (verbatim)
- H1: "The way money should work"
- P: "From getting paid to growing what you've got, Cash App makes managing your money effortless and instant—without all the fees."
- CTA: "Get started"

## Responsive
- <1024: single column — headline top-left (40px), phone center, desc+CTA below; acceptable approximation, desktop fidelity is priority.

## Notes
- Import { GalleryButton } from "@/components/GalleryButton", { useStageScroll } from "@/components/ScrollStage".
- Verify `npx tsc --noEmit`.
