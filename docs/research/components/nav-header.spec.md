# NavHeader Specification

## Overview
- **Target file:** `src/components/NavHeader.tsx` ("use client")
- **Interaction model:** static bar; colors crossfade 0.3s ease-in-out when section theme changes; hamburger toggles menu overlay
- **Props contract:** `{ theme: "hero" | "light" | "dark"; menuOpen: boolean; onMenuToggle: () => void }`

## DOM Structure
Fixed header spanning viewport top, z-50, pointer-events only on its controls (page scrolls beneath).
- Left: logo link (href "/")
- Right cluster: Sign up pill, Log in pill, hamburger circle button — 5px gaps

## Computed Styles (from getComputedStyle at 1512×798)
### Header container
- position: fixed; top 0; left 0; right 0; height 87px content zone (logo at top:20, height 47)
- padding: 20px (logo rect 20,20,47,47; hamburger rect 1445,20,47,47 → 20px right margin)

### Logo (CashLogoIcon from @/components/icons)
- 47×47.
- theme="hero" (on green): glyph WHITE $ only — render icon with rect fill transparent + path fill white (pass className; implement via a `variant` prop on rendering: hero → only white $ path visible, no green chip). Simplest faithful approach: on hero, wrap icon with CSS filter? NO — render two variants:
  - hero: white $ glyph (use CashLogoIcon with [&_rect]:fill-transparent [&_path]:fill-white)
  - light/dark: standard icon (black rounded chip w/ green $ — the icon's default colors but rect fill #000? Measured: on white sections logo = green $ inside BLACK rounded square). Default icon has green rect + black path. For light/dark theme use [&_rect]:fill-black [&_path]:fill-cash-green.
- transition: 0.3s ease-in-out on fills.

### Sign up button
- 47px tall pill, radius 999px, fontSize 12px, fontWeight 500, padding 0 20.4px
- hero theme: transparent bg, BLACK text (text-only + small ArrowRightIcon 10px)
- light/dark theme: bg #00E013, black text
- Always shows "Sign up" + ArrowRightIcon (10×10, gap 8)
- href: https://cash.app/account/signup

### Log in button
- 72×47 pill, fontSize 12px fontWeight 400, padding 0 20.4px, radius 999px
- hero: bg black, white text. light: bg black, white text. dark: bg black (still), white text (on black page it reads as dark pill — keep bg #000 with border? measured bg rgb(0,0,0) on dark too; on pure black page the pill edge is invisible except text. Keep bg black always.)
- href: https://cash.app/login

### Hamburger button
- 47×47 circle (radius 50%), bg black, icon white (HamburgerIcon 20px)
- When menuOpen: shows CloseIcon instead; keep same circle.
- aria-label "Open menu" / "Close menu"

## States & Behaviors
- All color changes: `transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out`
- Hover: pills opacity 0.8 (transition-opacity 300ms); hamburger opacity 0.9

## Text Content (verbatim)
"Sign up", "Log in"

## Responsive
- Mobile <760: identical cluster, logo persists; Sign up pill may hide text arrow — keep same (fidelity at desktop priority).

## Implementation notes
- Import { CashLogoIcon, ArrowRightIcon, HamburgerIcon, CloseIcon } from "@/components/icons"; cn from "@/lib/utils"; Link from next/link.
- No external doc reads needed. Verify with `npx tsc --noEmit`.
