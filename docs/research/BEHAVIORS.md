# cash.app Homepage — Behavior Bible

## Global Scroll Architecture (THE critical mechanism)

- `body { overflow: hidden }`. Page does NOT scroll natively.
- Scroller = `div.smoothScrollManager` (100vh, overflow-y auto/scroll, scrollHeight 8716 @ 798vh viewport). All 10 sections stacked inside, each exactly 100vh (footer 1534px).
- **Wheel-hijacked section snap**: small wheel deltas spring back to current section; delta past threshold (~>500px accumulated) animates smooth scroll to next/prev section. One gesture = one section. Eased animation ~0.8–1.2s.
- Scroll positions (100vh steps, vh=798 at 1512×798): hero 0, cash-app-green 798, cash-app-card 1596, borrow 2394, tags 3192, savings 3990, p2p 4788, security 5586, reviews 6384, footer 7182→8716 max (footer taller: 1534px, inner free scroll region at end).
- **Page background**: `main.canScroll` paints bg color, `transition: background-color 0.6s ease-in-out`. JS swaps color class per active section.
- **Theme per section** (bg / text): hero white-page+green-panel / black text; cash-app-green white/black; cash-app-card **black/white**; borrow **black/white**; tags white/black; savings white/black; p2p white/black; security **black/white**; reviews white/black; footer **black/white**.
- Sections' own content animates on activation: title/desc/CTA fade+rise in (~0.4-0.6s, staggered), center media crossfades/moves.
- IMPORTANT clone approach: replicate with a controlled scroll container + wheel/touch handlers + programmatic smooth scrolling to section index; bg color on a wrapper div switches per active index with 0.6s ease-in-out transition.

## Section-Specific Behaviors

### hero → cash-app-green morph (signature effect)
- Hero: full-bleed green panel `rgb(0,224,19)` (div.background, absolute, extends -160px above viewport, h 958). White page behind (36px white gutters visible at left/right edge? no—full width; gutter seen mid-transition).
- Hero phone video: 437×946 @ center (x 538), y 175 (extends below fold). Alpha webm (`fall-release-hero-large-alpha-truncated.webm`), autoplay, poster data-URI webp.
- On advance: green bg CONTRACTS/morphs from full-bleed into a phone-silhouette rounded rect (~334×720, border-radius ~166px? measured mid-morph ~590→923px x-range) centered, while page bg white shows around; then cash-app-green section's phone video (295×638) fades in inside that green shape; section 2 title/desc/CTA fade in.
- Reverse when scrolling up.

### cash-app-green
- White bg, black text. Phone video 295×638 with dark-green Money-app UI (cash-green-3-25-apy mp4, loop, poster green-poster.webp). Radial soft glow behind phone (subtle white/green radial gradient).
- Pause/play pill button bottom-right of video (~x 923, y 705), 24px circle, white bg, opacity ~0.8.

### cash-app-card
- Enters: white→BLACK bg fade (0.6s), text→white. Single card upright (holographic $reesehills card) → fan animation: 6 cards spread behind main card with rotations (~±10-25°, alternating), scale/translate ease-out ~0.8s. Cards: glitter/black/pink/white/glow/mood.webp + main holographic.
- CTA "Meet Cash App Card" outline-white pill fades in last.

### borrow
- Black bg. Headline + subcopy top-left; "Learn more" outline pill top-right (aligned with subcopy row).
- 4-card grid (~365×470 each incl. caption): [overdraft video mp4 loop w/ pause btn] [borrow $$$ webp, white card] [afterpay tote webp] [paychecks notification webp]. Caption 2 lines under each card. Cards animate in staggered (fade/rise) on activation.

### tags
- White bg. 9:16 rounded-corner video (~295×638 desktop uses tags-9x16.mp4; 4x5 variant exists for other widths) centered; radial glow behind. Pause btn.
- Left headline, right desc + "Explore tags" outline pill.

### savings / p2p / security / reviews — same layout family
- Center media ~295×638 rounded video + radial glow; savings/p2p/reviews on white; security on BLACK (white text).
- p2p desc is a bulleted list (4 items) + "Send money" pill. security has paragraph + "Learn about security". reviews has blockquote with hanging “ + "Read reviews" pill; testimonial webm/mp4 + mute button (bottom-right under pause btn).

### footer (1534px tall, black)
- Part 1 "makes money simple": white heading top-left; 4 cards row (~343×343): 3 outline cards (transparent bg, 1px border rgba(255,255,255,~0.2), radius ~24px) with big stat top-left ("5★","9.9m+","4.5★") + small caption bottom-left; 4th card GREEN `rgb(0,224,19)`, "Sign up now" black text + big → arrow bottom-left, black.
- Part 2 links: phone "1 (800) 969-1940 / Available daily / 8AM to 9:30PM ET" left; link列 Careers/Press/Help/Status/Legal/Licenses/Privacy Notice/Your Privacy Choices; social icons X/Instagram/Twitch/TikTok top-right.
- Part 3: legal disclaimer paragraphs (gray, ~12px), several paragraphs with bold inline links.

## Nav (fixed header, z-1000, sticky over everything)
- Left: $ logo. **Logo theme-adapts**: on green hero = white glyph on transparent; on white sections = green glyph in BLACK rounded-square chip (40×40, r~12); on black sections = green glyph in black chip (still visible).
- Right cluster: "Sign up →" pill + "Log in" pill + hamburger circle (44×44).
  - On hero (green bg): Sign up = text-only black, Log in = black pill white text, hamburger = black circle.
  - On white sections: Sign up = GREEN pill (bg 0,224,19, black text), Log in = black pill, hamburger black circle.
  - On black sections: Sign up = green pill, Log in = dark pill (bg #1a1a? white text, subtle), hamburger dark.
- Transition: colors fade 0.3-0.6s with section change.

## Menu overlay (hamburger click)
- Fullscreen black overlay (covers all, z-20 nav). Hamburger morphs to X (white circle outline on dark).
- Content: left 2×3 tile grid (dark #1a1a1a tiles, r~16, title top-left white ~28px) each w/ product image: Bank on your terms ($234 green digits), Order a Cash App Card (card stack), Send money for free ($20 green keypad), Save for your goals ($348 ring card), Know your money is safe (green toggle+lock), Deposit your paychecks (Wed→Fri circled).
- Middle column: 6 rows icon+label (gray icon, white text ~15px): Pay over time with Cash App Afterpay / Save on everyday spending / Buy stocks with no commission fees / Buy and sell bitcoin easily / File your taxes for free / Get a secure debit card for your teens.
- Right column: "Learn more" (gray label) + links Careers, Press, Outsmart scams, No hidden fees, Reviews, Help; below "Stay in Touch" + X, Instagram, TikTok, LinkedIn, Twitch icons (white).
- Entrance: overlay fades/slides in ~0.4s.

## Cookie banner
- Bottom-left white card (~468px wide, r~8, shadow), small text + "Cookie Preferences." underline link + X close (OneTrust). Appears after ~2s on first visit.

## Hover vocabulary (from stylesheets)
- Nav items: opacity 0.7. Video controls & copy buttons: opacity 0.8. Footer locale link: color #666. Locale options/links: underline. Article tags: bg #f4f4f4 border #737373. Buttons: opacity ~0.8 / slight bg shift.

## Breakpoints
- 391 / 760 / 1024 / 1440 / 1680 (min-width). Mobile <760: single column, headline top, media center, desc below; nav keeps logo+pills.
- Could NOT live-test mobile (window resize locked); breakpoints from CSSOM. Tablet 760–1023 keeps stacked-ish layout; desktop ≥1024 = 3-zone rows.

## Video/media notes
- All section videos: muted, playsinline, loop (hero non-loop), poster webp, lazy src-injection on section activation, autoplay on active.
- Videos also have desktop/mobile variants (tags-9x16 vs tags-4x5; overdraft-resized-desktop).
- Reviews video has audio → extra mute/unmute button.

## Typography (measured)
- h1 hero: Cash Sans 56px/53.2px (0.95) w400 ls -1.68px (-0.03em). Section h2s same scale (~56px). Footer "makes money simple" ~56px. Body/desc: 18-20px/1.4 w400. Bullets 18px. Captions 16px. Legal 12px gray #999.
- Font: "Cash Sans", fallback "Helvetica Neue", helvetica, sans-serif. Weights used: 400/500/600/700(/900 declared).
- Buttons: 14-15px w500/600.

## Colors (measured)
- Brand green: rgb(0,224,19) #00E013. Hero panel green #00E013 (screenshots render ~#5FDD3E due to jpeg; trust computed 0,224,19).
- Black #000, White #fff, gray text #999 (legal), #666 (hover), tile dark bg ~#1a1a1a (verify), border rgba(255,255,255,0.2) on black / #e8e8e8 (verify) on white.
