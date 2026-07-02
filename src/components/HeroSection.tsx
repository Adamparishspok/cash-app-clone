"use client";

import { useEffect, useRef, useState } from "react";
import { GalleryButton } from "@/components/GalleryButton";
import { useStageScroll } from "@/components/ScrollStage";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  active: boolean;
}

const lerp = (from: number, to: number, p: number) => from + (to - from) * p;
const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

/* Phone-silhouette alpha mask, base size from the original (337×724) */
const MASK_W = 337;
const MASK_H = 724;
const PHONE_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='337' height='724'><rect width='337' height='724' rx='46' fill='white'/></svg>`
)}")`;

/*
 * Hero: full-bleed #00E013 panel that morphs into a 334x720 rounded card as
 * the user scrolls toward section 2, while the headline / phone video / copy
 * fade out. All per-frame styles are written directly to refs inside the
 * useStageScroll callback (no setState per frame).
 */
export function HeroSection({ active }: HeroSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!active || entered) return;
    // next frame so the initial hidden state paints and the transition runs
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [active, entered]);

  useStageScroll((scrollTop, viewportH) => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!root || !panel || !content) return;

    /*
     * Exit scrub recovered from the original scroll-manager chunk, driven
     * over the first viewport of scroll (p 0→1), all linear with scroll:
     * - green panel: mask-scale 2×cover → 1 AND translateY 0 → 92% of its
     *   height (it counter-scrolls, staying pinned while it shrinks);
     *   opacity fades over p 0.6→1, hard-hidden at 0.99
     * - content: translateY 0 → 50% + fade out over the first half
     *   (slow parallax exit against the page scroll)
     */
    const p = clamp01(scrollTop / viewportH);
    const coverScale =
      2 * Math.max(root.clientWidth / MASK_W, root.clientHeight / MASK_H);
    const scale = lerp(coverScale, 1, p);
    panel.style.maskSize = `${scale * MASK_W}px ${scale * MASK_H}px`;
    panel.style.webkitMaskSize = panel.style.maskSize;
    panel.style.transform = `translateY(${p * 92}%)`;
    panel.style.opacity =
      p >= 0.99 ? "0" : `${1 - clamp01((p - 0.6) / 0.4)}`;

    const half = clamp01(p / 0.5);
    content.style.transform = `translateY(${half * 50}%)`;
    content.style.opacity = `${1 - half}`;
  });

  const entrance = (delay?: string) =>
    cn(
      "transition-[opacity,transform] duration-600 ease-out",
      delay,
      entered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    );

  return (
    // no overflow clip on the root: the morphing panel counter-scrolls
    // (translateY 92%) and must stay visible while the section scrolls away
    <div ref={rootRef} className="relative h-full">
      <div
        ref={panelRef}
        className="absolute inset-0 bg-[#00E013] [will-change:mask-size]"
        style={{
          maskImage: PHONE_MASK,
          WebkitMaskImage: PHONE_MASK,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "50%",
          WebkitMaskPosition: "50%",
          maskMode: "alpha",
          maskSize: `${MASK_W * 40}px ${MASK_H * 40}px`,
        }}
      />
      {/*
       * Original hero grid: headline cols 1-4, media cols 5-8 (nudged down
       * 10%), description + CTA cols 10-12; content vertically centered,
       * section padding 120px top / 70px bottom.
       */}
      <div
        ref={contentRef}
        className="cash-grid relative z-10 h-full items-center pt-[120px] pb-[70px] [will-change:transform,opacity]"
      >
        <div className="col-span-4 col-start-1 mb-8">
          <h1
            className={cn(
              "text-[3.5em] leading-[0.95] font-normal tracking-[-0.03em]",
              entrance()
            )}
          >
            The way money should work
          </h1>
        </div>
        <div className="col-span-4 col-start-5 flex translate-y-[10%] justify-center">
          <div
            className={cn("aspect-[0.462141] w-full max-w-[437px]", entrance("delay-100"))}
          >
            <video
              autoPlay
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            >
              <source
                src="/videos/hero-alpha.mov"
                type='video/mp4; codecs="hvc1"'
              />
              <source src="/videos/hero-alpha.webm" type="video/webm" />
            </video>
          </div>
        </div>
        <div className="col-span-3 col-start-10 mb-8">
          <div className={entrance("delay-200")}>
            <p className="text-[1.125em] leading-[1.4] tracking-[-0.03em]">
              From getting paid to growing what you&apos;ve got, Cash App makes
              managing your money effortless and instant&mdash;without all the
              fees.
            </p>
            <div className="mt-[clamp(24px,2em,32px)]">
              <GalleryButton
                href="https://cash.app/account/signup"
                variant="filled-white"
                size="sm"
                withArrow
              >
                Get started
              </GalleryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
