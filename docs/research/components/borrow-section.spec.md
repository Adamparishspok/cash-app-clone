# BorrowSection Specification

## Overview
- **Target file:** `src/components/BorrowSection.tsx` ("use client")
- **Interaction model:** entrance stagger on activation; first card is an autoplaying video.
- **Props contract:** `{ active: boolean }`
- Theme: DARK — page bg black, text white.

## Layout (1512×798 measured)
- Content container: px-9 (x36, w1440).
- Headline h2 (single line): "Access cash when you need it" — 40px/44px/-1.2px/400 white at y168.
- Subtitle p: "Explore our flexible ways to bridge the gap between payday and bill pay." — 18px/25.2px white, below headline (y~245).
- CTA top-right: GalleryButton "Learn more" outline-white → https://cash.app/borrow — measured rect (1366,209,110,48) i.e. right-aligned at container right edge, vertically aligned with subtitle.
- Card grid: 4 cols, y329, full width 1440, card w345, gap 20px, h329 total (media 345×271 + caption).

## Cards (media 345×271, border-radius ~43px [measured 12.5%/16%], object-cover)
1. video /videos/overdraft.mp4 (VideoPlayer, rounded false + custom radius class rounded-[43px], theme dark, active prop) — caption: "Get free overdraft coverage up to $200*"
2. img /images/card-grid/borrow.webp — caption: "Borrow up to $500 with no credit check**"
3. img /images/card-grid/afterpay.webp — caption: "Pay over time at top brands with Afterpay***"
4. img /images/card-grid/paychecks.webp — caption: "Get your paycheck up to 2 days early"

- Caption: 16px/1.4 white, margin-top 12px, max-w ~276px, wraps 2 lines. Asterisks render as superscript-ish small marks — plain text acceptable (match original glyphs exactly: `$200*`, `check**`, `Afterpay***`).
- Legal bottom-left: `*See legal disclaimers` 12px/14.4px white underline link, absolute bottom-8 left-9, href="#legal-disclaimers".

## Entrance
- Headline/subtitle/CTA fade+rise 600ms; cards stagger 0/80/160/240ms fade+rise 24px.

## Notes
- VideoPlayer from "@/components/VideoPlayer" for card 1 (its pause button: position adjusts inside card — pass className; place control inside bottom-left of media per original screenshot (pause pill at left of first card, x349 y567 → bottom-left area)). If VideoPlayer's fixed control position doesn't fit, render plain <video autoPlay muted loop playsInline> + small overlay pause button styled: 24px circle, white bg 80% opacity, dark pause glyph, absolute bottom-4 right-[-16px]… (match screenshot: control floats at card's bottom-right edge). Choose plain video + custom button for exactness.
- Import { GalleryButton }; cn.
- Verify `npx tsc --noEmit`.
