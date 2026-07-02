"use client";

import { useEffect, useRef, useState } from "react";
import { GalleryButton } from "@/components/GalleryButton";
import { useStageScroll } from "@/components/ScrollStage";
import { PauseIcon, PlayIcon } from "@/components/icons";

interface BorrowSectionProps {
  active: boolean;
}

interface BorrowImageCard {
  src: string;
  alt: string;
  caption: string;
}

const imageCards: BorrowImageCard[] = [
  {
    src: "/images/card-grid/borrow.webp",
    alt: "Borrow up to $500 with no credit check",
    caption: "Borrow up to $500 with no credit check**",
  },
  {
    src: "/images/card-grid/afterpay.webp",
    alt: "Pay over time at top brands with Afterpay",
    caption: "Pay over time at top brands with Afterpay***",
  },
  {
    src: "/images/card-grid/paychecks.webp",
    alt: "Get your paycheck up to 2 days early",
    caption: "Get your paycheck up to 2 days early",
  },
];

/*
 * Full-width dark section on the shared grid: header + subtitle left, CTA
 * right-aligned, then a 4-card media row spanning all 12 columns. No
 * opacity entrances — text inherits the page color (0.6s crossfade).
 *
 * Cards parallax with scroll, scrubbed over the section's full 2-viewport
 * traversal (values recovered from the original card-grid code): card i
 * travels from +A to -A where A = ((i - 0.2) / 3) * 280px — the rightmost
 * card sweeps the most, entering low and exiting high.
 */
const SECTION_INDEX = 3;
const cardAmplitude = (i: number) => ((i - 0.2) / 3) * 280;

export function BorrowSection({ active }: BorrowSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [userPaused, setUserPaused] = useState(false);

  useStageScroll((scrollTop, viewportH) => {
    const top = SECTION_INDEX * viewportH;
    const p = Math.min(
      Math.max((scrollTop - (top - viewportH)) / (2 * viewportH), 0),
      1
    );
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transform = `translateY(${cardAmplitude(i) * (1 - 2 * p)}px)`;
    });
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && !userPaused) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, userPaused]);

  return (
    <section className="cash-grid relative h-full content-center py-[10vh]">
      <div className="col-span-8 col-start-1">
        <h2 className="text-[2.5em] leading-[1.1] tracking-[-0.03em] font-normal">
          Access cash when you need it
        </h2>
        <p className="mt-[0.75em] text-[1.125em] leading-[1.4] tracking-[-0.03em]">
          Explore our flexible ways to bridge the gap between payday and bill
          pay.
        </p>
      </div>
      <div className="col-span-2 col-start-11 flex items-end justify-end">
        <GalleryButton
          href="https://cash.app/borrow"
          variant="outline-white"
          className="border-current text-current"
        >
          Learn more
        </GalleryButton>
      </div>

      <div className="col-span-12 col-start-1 mt-[clamp(32px,9vh,84px)] grid grid-cols-4 gap-5">
        <div
          ref={(el) => {
            cardRefs.current[0] = el;
          }}
          className="[will-change:transform]"
        >
          <div className="relative">
            <video
              ref={videoRef}
              src="/videos/overdraft.mp4"
              muted
              loop
              playsInline
              preload="auto"
              className="aspect-[0.863402] w-full rounded-[15.9%/13%] object-cover [@media(max-height:760px)]:aspect-[1.275] [@media(max-height:760px)]:rounded-[12.5%/16%]"
            />
            <button
              type="button"
              onClick={() => setUserPaused((paused) => !paused)}
              aria-label={userPaused ? "Play video" : "Pause video"}
              className="absolute right-4 bottom-4 size-6 rounded-full opacity-80 transition-opacity duration-300 hover:opacity-100 [--control-background-color:#ffffff] [--control-icon-color:#000000]"
            >
              {userPaused ? (
                <PlayIcon className="size-6" />
              ) : (
                <PauseIcon className="size-6" />
              )}
            </button>
          </div>
          <p className="mt-3 max-w-[80%] text-[1.125em] leading-[1.4] tracking-[-0.03em]">
            Get free overdraft coverage up to $200*
          </p>
        </div>
        {imageCards.map((card, i) => (
          <div
            key={card.src}
            ref={(el) => {
              cardRefs.current[i + 1] = el;
            }}
            className="[will-change:transform]"
          >
            <img
              src={card.src}
              alt={card.alt}
              className="aspect-[0.863402] w-full rounded-[15.9%/13%] object-cover [@media(max-height:760px)]:aspect-[1.275] [@media(max-height:760px)]:rounded-[12.5%/16%]"
            />
            <p className="mt-3 max-w-[80%] text-[1.125em] leading-[1.4] tracking-[-0.03em]">
              {card.caption}
            </p>
          </div>
        ))}
      </div>

      <a
        href="#legal-disclaimers"
        className="absolute bottom-[3vh] left-5 text-[0.75em] leading-[1.2] tracking-[-0.02em] underline"
      >
        *See legal disclaimers
      </a>
    </section>
  );
}
