# FeatureSection Specification (generic — powers 6 sections)

## Overview
- **Target files:** `src/components/FeatureSection.tsx` ("use client") + `src/components/featureSections.ts` (data)
- **Interaction model:** entrance animation when `active` flips true; video plays while active (VideoPlayer handles).
- **Props contract:** `{ active: boolean; config: FeatureSectionConfig }` — export the config type from featureSections.ts (may reuse/extend types in `src/types/index.ts`).

## Shared Layout (1512×798 measurements — all sections identical skeleton)
Root: relative h-full. Page bg painted by stage (transparent section).
- **Headline** (h2): left x38, w341, vertically centered. 40px / 44px / -1.2px / 400. Color: #000 on light theme, #fff on dark.
- **Center media**: 295×638 at horizontal center (x608), vertically centered (y80). VideoPlayer (rounded 40px). Radial glow behind on some sections (class `phone-glow` light / `phone-glow-dark` dark, div absolute centered ~756×798 behind video).
- **Right column**: x1113, w381. Contains EITHER paragraph (18px/25.2px) OR bullet list (18px/25.2px, list-disc, padding-left 18px, gap ~0) OR blockquote (18px/21.6px/-0.54px, hanging quote “ before first line, closing ” after). Then CTA (GalleryButton md, 24-32px top margin).
- **Legal link** (if config.legal): absolute bottom-8 left-[38px]: `*See legal disclaimers` — 12px/14.4px/-0.36px, underlined "See legal disclaimers" (the * is superscript-ish preceding). Color follows theme. href="#legal-disclaimers".

## Entrance animation (when active flips false→true)
- Headline, right column children: opacity 0→1, translateY 24px→0, 600ms ease-out, stagger 0/100/200ms. Video frame: opacity 0→1 400ms.
- When inactive: reset to hidden state (so re-entry animates again).

## Section configs (exact content)

### cash-app-green (theme light, bg white)
- headline: "Earn, save, and\ndo more with\nCash App Green" (3 lines: ["Earn, save, and", "do more with", "Cash App Green"])
- paragraph: "It's easier than ever to earn our best benefits yet—higher Borrow limits, up to 3.25% savings interest, free overdraft coverage, and free withdrawals from 40k in-network ATMs."
- CTA: "Learn about Green" outline-black → https://cash.app/green
- video: /videos/cash-green.mp4, poster /images/posters/green-poster.webp
- glow: light. legal: true.

### tags (theme light)
- headline: ["Meet the all-new", "Cash App Tags"]
- paragraph: "It's a more whimsical way to tap to pay. Tags are linked to Cash App Card, and you can lock them anytime for security."
- CTA: "Explore tags" outline-black → https://cash.app/tags
- video: /videos/tags-9x16.mp4, poster /images/posters/tags-poster.webp
- glow: light. legal: true.

### savings (theme light)
- headline: ["Make your money", "go even further"]
- paragraph: "We make it easy to save and grow your money with up to 3.25% interest, automatic savings tools*, and the ability to turn spare change into stocks or bitcoin.**"
- CTA: "Learn how to save and grow" outline-black → https://cash.app/save
- video: /videos/savings.mp4, poster /images/posters/savings-poster.webp
- glow: light. legal: true.

### p2p (theme light)
- headline: ["Sending money", "is fast, free, and", "made for you"]
- bullets: ["Personalize payments with stickers and text", "Collect money from a group with pools*", "Sync your contacts to pay friends easily", "Send money confidently with Security Lock"]
- CTA: "Send money" outline-black → https://cash.app/send-money
- video: /videos/p2p.mp4, poster /images/posters/p2p-poster.webp
- glow: light. legal: false.

### security (theme dark, bg black)
- headline: ["Security built", "into every swipe,", "tap, and send"]
- paragraph: "Since 2020, we've prevented $2 billion+ in scams—while protecting what matters with real-time monitoring, Zero Fraud Liability, and FDIC insurance, subject to terms.*"
- CTA: "Learn about security" outline-white → https://cash.app/security
- video: /videos/security.mp4, poster /images/posters/security-poster.webp
- glow: dark (phone-glow-dark). legal: true.

### reviews (theme light)
- headline: ["The money", "app 59 million+", "people trust"]
- quote: "Cash App makes it so easy to manage everything—I use it for saving, splitting bills, and getting paid. It's all-in-one." (wrap in “ ” with hanging open quote: blockquote text-[18px] leading-[21.6px] tracking-[-0.54px], open quote positioned outside text block left)
- CTA: "Read reviews" outline-black → https://cash.app/reviews
- video: /videos/testimonial.mp4, poster /images/posters/reviews-poster.webp, hasAudio: true
- glow: light. legal: false.

## Notes
- VideoPlayer props: src, poster, active, hasAudio, theme ("light"|"dark" per section), className "w-[295px] h-[638px]".
- Headline lines: render with <br/> between lines.
- Import { GalleryButton }, { VideoPlayer }. cn from "@/lib/utils".
- Verify `npx tsc --noEmit`.
