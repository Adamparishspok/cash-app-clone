# Shared Components (built by foreman)

## ScrollStage (`src/components/ScrollStage.tsx`)
Wheel-hijacked section snapper replicating cash.app's smooth-scroll-manager.
- `<ScrollStage sections={StageSection[]} />` where StageSection = { id, background, theme: 'light'|'dark', tall?, content: (active) => ReactNode }
- One wheel gesture (accumulated deltaY ≥ 120) = one section advance; 1000ms easeOutCubic scroll animation; extra snap stop at bottom of tall footer.
- Page bg = active section's background, transition 0.6s ease-in-out (measured on original main.canScroll).
- `useStageScroll(cb)` — subscribe to raw scrollTop for scroll-driven effects (hero morph).

## GalleryButton (`src/components/GalleryButton.tsx`)
Pill CTA. Props: href, variant: filled-white|filled-green|filled-black|outline-black|outline-white, withArrow?, size?: 'sm'(42px)|'md'(48px), className, children.
Measured: radius 100px, 14px/-0.28px label, padding 16/20 (md) or 14/20 (sm), hover opacity .8.

## VideoPlayer (`src/components/VideoPlayer.tsx`)
Props: src, poster?, active, rounded?=true (40px), hasAudio?, theme?: 'light'|'dark', loop?=true, className.
Muted/playsinline; plays when active && !paused. Pause pill 24px at bottom -right-8; mute above it when hasAudio.

## icons (`src/components/icons.tsx`)
CashLogoIcon, ArrowRightIcon, XLogoIcon, InstagramIcon, TikTokIcon, LinkedInIcon, TwitchIcon, PauseIcon, PlayIcon, SpeakerIcon({muted}), HamburgerIcon, CloseIcon — all extracted from live site SVGs, use currentColor.

## Design tokens (globals.css)
- bg-cash-green / text-cash-green → #00E013; cash-gray #999; cash-tile #1a1a1a.
- Utilities: cash-headline (56/53.2/-1.68), no-scrollbar, phone-glow, phone-glow-dark.
- Font: Cash Sans via --font-cash-sans (default font-sans).
