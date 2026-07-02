"use client";

import { useEffect, useRef, useState } from "react";
import { GalleryButton } from "@/components/GalleryButton";

/*
 * Card fan mechanism recovered from the original bundle:
 * - closed: every card sits at translate(-50%,-50%) rotate(-90deg) — a
 *   single upright portrait stack (card art is landscape 606×382)
 * - open: cards fan to -82.5 / -75 / -60 / -45 / -30 / -15 degrees in DOM
 *   order (last child renders on top at -15°)
 * - transition: transform 0.4s ease-in-out, no stagger, no opacity
 * - trigger: IntersectionObserver with threshold [1] on the fan figure —
 *   opens when fully visible, closes the moment any pixel leaves
 */
const OPEN_ROTATIONS = [-82.5, -75, -60, -45, -30, -15];

/* DOM order matches the live site: glitter, black, pink, white, glow, mood */
const cards = [
  { src: "/images/cards/glitter.webp", alt: "Glitter Cash App Card design" },
  { src: "/images/cards/black.webp", alt: "Black Cash App Card design" },
  { src: "/images/cards/pink.webp", alt: "Pink Cash App Card design" },
  { src: "/images/cards/white.webp", alt: "White Cash App Card design" },
  { src: "/images/cards/glow.webp", alt: "Glow Cash App Card design" },
  { src: "/images/cards/mood.webp", alt: "Holographic Cash App Card design" },
];

const bullets = [
  "No hidden or monthly fees ever",
  "Weekly custom cash back offers",
  "Real-time transaction alerts",
  "Card designs you can fully personalize",
];

export function CardFanSection() {
  const fanRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = fanRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setOpen(entry.intersectionRatio >= 0.99);
      },
      // 0.99 instead of the original's [1]: fractional element heights can
      // make a ratio of exactly 1 unreachable
      { root: null, rootMargin: "0px", threshold: [0.99] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cash-grid relative h-full items-center py-[10vh]">
      <h2 className="col-span-3 col-start-1 text-[2.5em] leading-[1.1] tracking-[-0.03em] font-normal">
        Cash App Card
        <br />
        is the debit card
        <br />
        that works for you
      </h2>

      {/*
       * Fan stage sits in the media columns (5-8) like the original's
       * componentContainer: an 80vh cell, fan square = min(60% of the cell
       * height, cell width) → 48vh on desktop.
       */}
      <div className="col-span-4 col-start-5 flex h-[80vh] max-h-[80vh] items-center justify-center">
        <figure
          ref={fanRef}
          className="relative aspect-square w-[min(48dvh,100%)] select-none"
        >
        {cards.map((card, i) => (
          <img
            key={card.src}
            src={card.src}
            alt={card.alt}
            width={606}
            height={382}
            draggable={false}
            className="absolute top-1/2 left-1/2 max-h-full max-w-full origin-center transition-transform duration-[400ms] ease-in-out"
            style={{
              transform: `translate(-50%,-50%) rotate(${open ? OPEN_ROTATIONS[i] : -90}deg)`,
            }}
          />
        ))}
        </figure>
      </div>

      <div className="col-span-3 col-start-10">
        <ul className="mb-[clamp(24px,2em,32px)] list-disc pl-[1em] text-[1.125em] leading-[1.4] tracking-[-0.03em]">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <GalleryButton
          href="https://cash.app/card"
          variant="outline-white"
          className="border-current text-current"
        >
          Meet Cash App Card
        </GalleryButton>
      </div>

      <p className="absolute bottom-[3vh] left-5 text-[0.75em] leading-[1.2] tracking-[-0.02em]">
        <a href="#legal-disclaimers" className="underline">
          *See legal disclaimers
        </a>
      </p>
    </section>
  );
}
