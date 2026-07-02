# cash.app Homepage — Page Topology

## Layout skeleton
```
<body overflow:hidden>
  #__next
    main.homeFallReleasePage.canScroll   ← paints page bg, transition bg 0.6s
      div.fullBleedGrid
        div.navHeader (sticky, z-1000)
          header  ← logo + signup/login/hamburger (47px tall content, 20px top pad)
          nav (fixed, z-20, fullscreen)  ← menu overlay (hidden until hamburger)
        main.contentWrapper
          div.smoothScrollManager  ← THE scroll container (100vh, overflow-y)
            section[data-identifier=hero]            100vh
            section[data-identifier=cash-app-green]  100vh
            section[data-identifier=cash-app-card]   100vh
            section[data-identifier=borrow]          100vh
            section[data-identifier=tags]            100vh
            section[data-identifier=savings]         100vh
            section[data-identifier=p2p]             100vh
            section[data-identifier=security]        100vh
            section[data-identifier=reviews]         100vh
            footer[data-identifier=footer]           1534px
      (fixed helpers: cookie banner, video controls)
```

## Section order, theme, media
| # | id | bg | text | center media | CTA |
|---|----|----|------|-------------|-----|
| 1 | hero | white page + green full-bleed panel | black | phone alpha-webm 437×946 | Get started (white pill, filled) |
| 2 | cash-app-green | white | black | green phone video 295×638 | Learn about Green (outline black) |
| 3 | cash-app-card | black | white | 6-card fan | Meet Cash App Card (outline white) |
| 4 | borrow | black | white | 4-card grid w/ 1 video | Learn more (outline white, top-right) |
| 5 | tags | white | black | 9:16 video 295×638 | Explore tags (outline black) |
| 6 | savings | white | black | video 295×638 | Learn how to save and grow (outline black) |
| 7 | p2p | white | black | video 295×638 | Send money (outline black) + bullets |
| 8 | security | black | white | video 295×638 + glow | Learn about security (outline white) |
| 9 | reviews | white | black | testimonial video + mute | Read reviews (outline black) + blockquote |
| 10 | footer | black | white | — | Sign up now green card |

## Standard section grid (desktop ≥1024)
- 3 zones on a 1440 max-w grid (36px outer margins @1512): headline left (~x36, w~470, vertically centered ~y320-450), media center (x~608, w~295), desc+CTA right (x~1113, w~345, vertically centered).
- borrow + footer break pattern: full-width headline top-left + card rows.

## Shared components
- GalleryThemedButton: pill button, variants filled-white / filled-green / filled-black / outline-black / outline-white; 42px tall, radius 100px, 14-15px label, some with → arrow.
- SectionScaffold: headline / center-media / desc+CTA 3-zone layout, theme-aware (light/dark).
- PhoneVideo: rounded-rect (r ~40px) 295×638 video + poster + pause btn + optional glow.
- NavHeader + MenuOverlay.
- Cookie banner (optional, skip or static).

## Build plan (components)
1. `NavHeader.tsx` (+ theme adaptation) & `MenuOverlay.tsx`
2. `ScrollStage.tsx` — scroll container, wheel-snap manager, active-index context, bg color driver
3. `HeroSection.tsx` (+ green morph layer)
4. `FeatureSection.tsx` generic (green/tags/savings/p2p/security/reviews configs)
5. `CardFanSection.tsx` (cash-app-card)
6. `BorrowSection.tsx` (4-card grid)
7. `FooterSection.tsx` (stats cards + links + legal)
8. `VideoPlayer.tsx` (poster, pause/play, mute for reviews)
