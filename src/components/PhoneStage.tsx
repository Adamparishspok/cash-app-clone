"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useStageScroll } from "@/components/ScrollStage";
import { PauseIcon, PlayIcon, SpeakerIcon } from "@/components/icons";

export interface PhoneStageItem {
  /** section identifier this video belongs to */
  id: string;
  /** section index inside the scroll stage (100vh sections) */
  index: number;
  src: string;
  poster?: string;
  hasAudio?: boolean;
  glow: "light" | "dark";
  theme: "light" | "dark";
}

interface PhoneStageProps {
  activeId: string;
  items: PhoneStageItem[];
}

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

/* Phone-silhouette alpha mask (337×724 base, from the original bundle) */
const PHONE_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='337' height='724'><rect width='337' height='724' rx='46' fill='white'/></svg>`
)}")`;

/*
 * Viewport-locked phone frame, scroll-scrubbed like the original portals.
 * Each section's video animates over its 2-viewport traversal:
 *   intro (section entering, first viewport): WIPE — the video blinks in at
 *     2% progress, then a top-inset clip slides from the section's real
 *     scroll offset down to 0, revealing the video in place.
 *   exit (section leaving, second viewport): FADE — opacity 1 → 0.
 * Everything is driven per-frame from scrollTop, so the feel follows the
 * quad.inOut snap tween exactly, including direction reversals.
 */
export function PhoneStage({ activeId, items }: PhoneStageProps) {
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

  const active = items.find((item) => item.id === activeId);

  const portalIndices = new Set(items.map((item) => item.index));

  useStageScroll((scrollTop, viewportH) => {
    for (const item of items) {
      const el = videoRefs.current.get(item.id);
      if (!el) continue;
      const top = item.index * viewportH;
      /*
       * Entering (and settled): the video rises INSIDE the shared frame,
       * clipped by its own phone mask sliding up from the section's scroll
       * offset — over the previous video, which stays put and dims in
       * place. The slide-out exit (mask keeps travelling up, leaving the
       * bottom rounded cap as a sliver) only happens when the NEXT section
       * has no phone; between two phone sections the exit is a fade.
       */
      const offset = Math.round(top - scrollTop);
      let maskY: number;
      let alpha: number;
      if (offset >= 0) {
        maskY = offset;
        alpha = offset < viewportH * 0.97 ? 1 : 0;
      } else if (portalIndices.has(item.index + 1)) {
        maskY = 0;
        alpha = 1 - clamp01(-offset / viewportH / 0.6);
      } else {
        maskY = offset;
        alpha = -offset < viewportH * 0.97 ? 1 : 0;
      }
      el.style.opacity = `${alpha}`;
      el.style.maskPosition = `0px ${maskY}px`;
      el.style.webkitMaskPosition = `0px ${maskY}px`;
      el.style.visibility = alpha > 0 ? "visible" : "hidden";
    }
  });

  useEffect(() => {
    for (const [id, video] of videoRefs.current) {
      if (id === activeId && !paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [activeId, paused]);

  const controlColor = active?.theme === "dark" ? "text-white" : "text-black/60";

  return (
    <div
      aria-hidden={!active}
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
    >
      {/* white halo behind the frame on dark sections */}
      <div
        className={cn(
          "absolute h-full w-[756px] transition-opacity duration-500",
          active?.glow === "dark" ? "phone-glow-dark opacity-100" : "opacity-0"
        )}
      />

      {/*
       * Frame geometry + shadow from the original bundle: height 80vh,
       * aspect-ratio 0.462141, drop-shadow(0 4px 100px) at 10% black (20% on
       * dark sections). The shadow tracks the videos' alpha, so an empty
       * frame renders nothing.
       */}
      <div
        className="relative"
        style={{
          filter:
            active?.theme === "dark"
              ? "drop-shadow(0 4px 100px rgba(0,0,0,0.2))"
              : "drop-shadow(0 4px 100px rgba(0,0,0,0.1))",
        }}
      >
        {/* frame clip stays phone-shaped so a travelling mask edge never
            exposes square corners */}
        <div
          className="relative h-[80dvh] overflow-hidden"
          style={{ aspectRatio: "0.462141", borderRadius: "5dvh" }}
        >
          {items.map((item) => (
            <video
              key={item.id}
              ref={(el) => {
                if (el) videoRefs.current.set(item.id, el);
                else videoRefs.current.delete(item.id);
              }}
              src={item.src}
              poster={item.poster}
              muted={item.hasAudio ? muted : true}
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover opacity-0 [will-change:mask-position,opacity]"
              style={{
                maskImage: PHONE_MASK,
                WebkitMaskImage: PHONE_MASK,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskMode: "alpha",
              }}
            />
          ))}
        </div>

        {active ? (
          <div className="pointer-events-auto">
            <button
              type="button"
              aria-label={paused ? "Play video" : "Pause video"}
              onClick={() => setPaused((p) => !p)}
              className={cn(
                "absolute -right-8 size-6 cursor-pointer opacity-80 transition-opacity hover:opacity-100",
                active.hasAudio ? "bottom-11" : "bottom-2",
                controlColor
              )}
            >
              {paused ? (
                <PlayIcon className="size-full" />
              ) : (
                <PauseIcon className="size-full" />
              )}
            </button>
            {active.hasAudio ? (
              <button
                type="button"
                aria-label={muted ? "Unmute video" : "Mute video"}
                onClick={() => setMuted((m) => !m)}
                className={cn(
                  "absolute -right-8 bottom-2 size-6 cursor-pointer opacity-80 transition-opacity hover:opacity-100",
                  controlColor
                )}
              >
                <SpeakerIcon muted={muted} className="size-full" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
