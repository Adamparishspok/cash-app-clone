# FooterSection Specification

## Overview
- **Target file:** `src/components/FooterSection.tsx` ("use client" only if needed; static is fine — entrance animation optional via `active` prop)
- **Props contract:** `{ active: boolean }`
- Theme: DARK — bg black (stage paints it), white text. Section is TALL (~1534px, not 100vh): part 1 (stats, ~798px) + part 2 (links/legal, ~736px).

## Part 1 — "Cash App makes money simple" (first viewport of footer)
- h2: "Cash App makes\nmoney simple" — **56px/53.2px/-1.68px** w400 white, x36 y76, w467 (2 lines)
- Cards row: y341, 4 cards 345×345, gap 20, x36 start:
  - Cards 1-3 (outline): transparent bg, border 1px solid rgba(255,255,255,0.3), border-radius ~49px (14.3%), padding 32px; big stat top-left; caption bottom-left 16px/1.2 white.
    1. stat "5★" / caption "Editor's Choice\non the App Store"
    2. stat "9.9m+" / caption "Apple App Store and\nGoogle Play reviews"
    3. stat "4.5★" / caption "Rated Excellent\non Trustpilot"
    - Stat: 40px/1 w400 white ("★" rendered as filled star glyph same size).
  - Card 4 (green): bg #00E013, border-radius 49px, black text: "Sign up now" 40px/0.95/-1.2px top-left (padding 32px); big arrow bottom-left: ArrowRightIcon 48px black (measured arrow at y622, x1163). Whole card is <a href="https://cash.app/account/signup">, hover opacity 0.9.

## Part 2 — links + legal (second half, below fold of footer)
Grid (starts ~y860 relative to footer top; content measured at footer-bottom scroll):
- **Left col** x36: phone "1 (800) 969-1940" 18px bold-ish 400 white; "Available daily" ; "8AM to 9:30PM ET" — 3 lines 18px/28px.
- **Middle col** x766 w~400: links stacked 18px white, spacing ~44px: Careers (https://careers.cash.app), Press (/press), Help (https://cash.app/help), Status (https://status.cash.app), Legal (/legal), Licenses (/licenses), Privacy Notice (/legal/us/en-us/privacy), Your Privacy Choices (#)
- **Right** x1130..1290: social icon row (top-aligned with links): XLogoIcon, InstagramIcon, TwitchIcon, TikTokIcon — white 21px, gap 24. hrefs: https://x.com/CashApp, https://www.instagram.com/cashapp, https://www.twitch.tv/cashapp, https://www.tiktok.com/@cashapp
- Link hover: underline / opacity 0.7.

### Legal disclaimers block (id="legal-disclaimers", below links, x36 w~1440, gray #999... measured white at 12px — use rgba(255,255,255,0.85)? Original renders light gray #ccc-ish. Use #b3b3b3.)
- 12px/1.5, paragraphs with 16px gaps, inline <strong>/<a underline> for: "Sutton prepaid card", "Sutton debit flex card", "Bancorp debit flex card", "FINRA/SIPC", "Bitcoin", "Cash App Investing", "House Rules".
- Paragraph 1: "Cash App is a financial services platform, and not an FDIC-insured bank. Prepaid debit cards issued by Sutton Bank, Member FDIC. Cash App Visa® Debit Flex Cards issued by Sutton Bank, Member FDIC, and The Bancorp Bank, N.A., pursuant to a license from Visa U.S.A. Inc. See terms and conditions for the Sutton prepaid card, Sutton debit flex card, and Bancorp debit flex card. Offers provided by Cash App, a Block, Inc. brand. Offers not affiliated with third party merchants."
- Paragraph 2: "Brokerage services provided by Cash App Investing LLC, member FINRA/SIPC, subsidiary of Block, Inc. Bitcoin services provided by Block, Inc. Bitcoin services are not licensable activity in all U.S. states and territories. Block, Inc. operates in New York as Block of Delaware and is licensed to engage in virtual currency business activity by the New York State Department of Financial Services. Investing and bitcoin are non-deposit, non-bank products that are not FDIC insured and involve risk, including monetary loss. Cash App Investing does not trade bitcoin and Block, Inc. is not a member of FINRA or SIPC. For additional information, see the Bitcoin and Cash App Investing disclosures."
- Paragraph 3: "Additional fees for securities may apply such as regulatory fees and fees to transfer securities externally. Please see our House Rules for more information."
- Paragraph 4: "P2P services and Savings are provided by Block, Inc. and not Cash App Investing LLC."
- Paragraph 5: "Tax Filing Preparation services are provided by Cash App Taxes, Inc. and not Cash App Investing LLC."

## Structure note
Root: NOT h-screen — natural height (~1534px): `<div className="flex min-h-dvh flex-col justify-between">` for part 1 sized h-dvh, then part 2 block pb-16.

## Entrance
- Part 1 heading + cards fade+rise on active (600ms stagger 100ms).

## Notes
- Import { GalleryButton } not needed; { ArrowRightIcon, XLogoIcon, InstagramIcon, TwitchIcon, TikTokIcon } from "@/components/icons".
- Verify `npx tsc --noEmit`.
