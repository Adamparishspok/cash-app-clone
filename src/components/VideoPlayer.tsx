"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon, SpeakerIcon } from "@/components/icons";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  active: boolean;
  /** show rounded phone-frame corners (default true) */
  rounded?: boolean;
  hasAudio?: boolean;
  className?: string;
  /** controls color scheme against the section background */
  theme?: "light" | "dark";
  loop?: boolean;
}

/*
 * Section video: muted/playsinline/loop, plays only while its section is
 * active. Pause pill sits at the bottom-right corner outside the frame,
 * matching the original's floating control (24px circle, opacity 0.8 hover).
 */
export function VideoPlayer({
  src,
  poster,
  active,
  rounded = true,
  hasAudio = false,
  className,
  theme = "light",
  loop = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && !paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, paused]);

  const controlColor = theme === "dark" ? "text-white" : "text-black/60";

  return (
    <div className={cn("relative", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        className={cn("h-full w-full object-cover", rounded && "rounded-[40px]")}
      />
      <button
        type="button"
        aria-label={paused ? "Play video" : "Pause video"}
        onClick={() => setPaused((p) => !p)}
        className={cn(
          "absolute -right-8 size-6 cursor-pointer opacity-80 transition-opacity hover:opacity-100",
          hasAudio ? "bottom-11" : "bottom-2",
          controlColor
        )}
      >
        {paused ? <PlayIcon className="size-full" /> : <PauseIcon className="size-full" />}
      </button>
      {hasAudio ? (
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
  );
}
