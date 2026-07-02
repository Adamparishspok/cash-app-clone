# MenuOverlay Specification

## Overview
- **Target file:** `src/components/MenuOverlay.tsx` ("use client")
- **Interaction model:** fullscreen overlay; opens on hamburger; fade+rise entrance 0.4s
- **Props contract:** `{ open: boolean }` (NavHeader's hamburger renders above overlay and toggles it; overlay itself has no close button)

## Layout (1512×798, from live measurements)
Fullscreen fixed overlay, z-40 (below NavHeader z-50), bg #000, white text.
Three zones:
1. **Tile grid** left: 3 cols × 2 rows, tiles 284×284, first at (36,88), gap ~17px (cols x: 36/337/637; rows y: 88/389)
2. **Icon links** middle column x≈1004, w≈227, first row y88, ~6 rows spaced ~62px
3. **Right rail** x≈1298 w≈178: "Learn more" gray label, links below (15.3px, y121 first, spacing ~34px); then "Stay in Touch" label + social icon row

## Tiles (each an <a>)
- 284×284, border-radius 20.45px, bg #1a1a1a
- Title: white, fontSize 20.45px, weight 400, top-left with 24px padding
- Product image bottom area (contain, positioned bottom-left w/ padding, height ~55%)
- Hover: slight opacity 0.9
- Data (title / image / href):
  1. "Bank* on your terms" / /images/nav/nav-bank.png / https://cash.app/bank
  2. "Order a Cash App Card" / /images/nav/nav-card.png / https://cash.app/card
  3. "Send money for free" / /images/nav/nav-send.png / https://cash.app/send-money
  4. "Save for your goals" / /images/nav/nav-save.png / https://cash.app/save
  5. "Know your money is safe" / /images/nav/nav-security.png / https://cash.app/security
  6. "Deposit your paychecks" / /images/nav/nav-paychecks.png / https://cash.app/paychecks

## Icon links (middle column, <a> rows: icon 24px + label, gap 12)
- Label white 15px, icon = <img> 24×24
  1. /images/nav/icon-afterpay.svg — "Pay over time with Cash App Afterpay" → /afterpay
  2. /images/nav/icon-offers.svg — "Save on everyday spending" → /offers
  3. /images/nav/icon-stocks.svg — "Buy stocks with no commission fees" → /stocks
  4. /images/nav/icon-bitcoin.svg — "Buy and sell bitcoin easily" → /bitcoin
  5. /images/nav/icon-taxes.svg — "File your taxes for free" → /taxes
  6. /images/nav/icon-family.svg — "Get a secure debit card for your teens" → /family
- Row height 37px, vertical gap ~25px; text wraps to 2 lines for long labels (column w 227)

## Right rail
- "Learn more" — gray #999, 15.3px, mb 12
- Links (white 15.3px, spacing 34px): Careers → https://careers.cash.app; Press → /press; Outsmart scams → /outsmart-scams; No hidden fees → /no-hidden-fees; Reviews → /reviews; Help → https://cash.app/help
- "Stay in Touch" — gray #999 15.3px, mt 44, mb 16
- Social icons (white, 21px, gap 16, two rows in original: X+Instagram / TikTok+LinkedIn / Twitch): use XLogoIcon, InstagramIcon, TikTokIcon, LinkedInIcon, TwitchIcon from @/components/icons; grid 2 cols, gap 20.
  hrefs: https://x.com/CashApp, https://www.instagram.com/cashapp, https://www.tiktok.com/@cashapp, https://www.linkedin.com/company/cash-app, https://www.twitch.tv/cashapp

## States & Behaviors
- open=false: pointer-events-none, opacity 0
- open=true: opacity 1, content translateY 12px→0, transition 0.4s ease
- Overlay covers viewport; body behind doesn't scroll (page has overflow hidden already)

## Hover
- Links: opacity 0.7 (0.3s)

## Implementation notes
- next/image or plain img for tile/icon images (plain <img> fine, images unoptimized local).
- Verify `npx tsc --noEmit`.
