"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

export interface StageSection {
  id: string;
  /** page background painted while this section is active */
  background: string;
  theme: "light" | "dark";
  /** sections are 100vh; the footer is taller and gets an extra snap stop */
  tall?: boolean;
  content: (active: boolean) => ReactNode;
}

interface StageContextValue {
  /** subscribe to raw scrollTop updates (fires inside the scroll handler) */
  subscribe: (cb: (scrollTop: number, viewportH: number) => void) => () => void;
}

const StageContext = createContext<StageContextValue | null>(null);

export function useStageScroll(cb: (scrollTop: number, viewportH: number) => void) {
  const ctx = useContext(StageContext);
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  const subscribe = ctx?.subscribe;
  useEffect(() => {
    if (!subscribe) return;
    return subscribe((st, vh) => cbRef.current(st, vh));
  }, [subscribe]);
}

/*
 * Constants recovered from the original scroll manager:
 * - wheel deltas under 5px are ignored; anything larger moves exactly one
 *   section per event
 * - the snap tween runs quad.inOut with duration = distance in viewports,
 *   clamped to [0.3s, 2.5s]
 */
const WHEEL_MIN_DELTA = 5;
const quadInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const snapDuration = (distancePx: number, viewportH: number) =>
  Math.max(0.3, Math.min(2.5, distancePx / viewportH)) * 1000;

/*
 * Recreates cash.app's smooth-scroll-manager: body never scrolls; wheel and
 * touch gestures are hijacked and snap one full section per gesture. The
 * page background crossfades (0.6s ease-in-out) as the active section
 * changes. The final snap stop is the bottom of the tall footer section.
 */
export function ScrollStage({
  sections,
  onActiveChange,
  overlay,
}: {
  sections: StageSection[];
  onActiveChange?: (id: string) => void;
  /** viewport-locked layer rendered above the scroller (e.g. PhoneStage) */
  overlay?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  /*
   * bgIndex drives the page background/text theme. Unlike activeIndex (set
   * the moment a snap starts), it flips only when the scroll is ~65% of the
   * way into the next section — the original recolors late in the travel.
   */
  const [bgIndex, setBgIndex] = useState(0);
  const bgRef = useRef(0);
  const lastScrollTop = useRef(0);
  const animRef = useRef<number | null>(null);
  const touchStartY = useRef(0);
  const subscribers = useRef(new Set<(st: number, vh: number) => void>());

  const subscribe = useCallback((cb: (st: number, vh: number) => void) => {
    subscribers.current.add(cb);
    // deliver current position so scrub-driven layers paint before any scroll
    const el = containerRef.current;
    if (el) queueMicrotask(() => cb(el.scrollTop, el.clientHeight));
    return () => {
      subscribers.current.delete(cb);
    };
  }, []);

  const snapTops = useCallback(() => {
    const el = containerRef.current;
    if (!el) return [0];
    const tops = Array.from(el.children).map(
      (child) => (child as HTMLElement).offsetTop
    );
    const max = el.scrollHeight - el.clientHeight;
    // extra stop at the bottom of the tall footer
    if (max > tops[tops.length - 1] + 2) tops.push(max);
    return tops;
  }, []);

  const goTo = useCallback(
    (index: number, force = false) => {
      const el = containerRef.current;
      if (!el) return;
      const tops = snapTops();
      const clamped = Math.max(0, Math.min(tops.length - 1, index));
      if (clamped === activeRef.current && !force) return;
      activeRef.current = clamped;

      const from = el.scrollTop;
      const to = tops[clamped];
      const duration = snapDuration(Math.abs(to - from), el.clientHeight);
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
      /*
       * The clock starts on the first painted frame, and any frame gap
       * beyond 64ms is absorbed into the start time: cold-run jank (layer
       * rasterization, video decode on the session's first scroll) then
       * stretches the tween slightly instead of making the scroll leap
       * to catch up — distance never skips, whatever the frame rate.
       */
      let start: number | null = null;
      let last: number | null = null;
      let committed = false;
      const step = (now: number) => {
        if (start === null) start = now;
        if (last !== null && now - last > 64) start += now - last - 64;
        last = now;
        const t = Math.min(1, (now - start) / duration);
        el.scrollTop = from + (to - from) * quadInOut(t);
        if (!committed) {
          /*
           * Commit the React state flip AFTER the first motion frame is
           * written: the section re-render (the session's priciest commit
           * on a cold run) then lands between animation frames instead of
           * in front of them — no freeze-then-move on the first input.
           */
          committed = true;
          setActiveIndex(clamped);
        }
        if (t < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          animRef.current = null;
        }
      };
      animRef.current = requestAnimationFrame(step);
    },
    [snapTops]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (animRef.current !== null) return;
      if (Math.abs(e.deltaY) < WHEEL_MIN_DELTA) return;
      goTo(activeRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (animRef.current !== null) return;
      const delta = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(delta) > 60) {
        touchStartY.current = e.touches[0].clientY;
        goTo(activeRef.current + (delta > 0 ? 1 : -1));
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        if (animRef.current !== null) return; // input locked while snapping
        goTo(activeRef.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        if (animRef.current !== null) return;
        goTo(activeRef.current - 1);
      }
    };

    /*
     * Fallback snapping for inputs that never fire wheel events (scrollbar
     * drags, touch momentum, synthetic scrolls): after scrolling settles,
     * snap toward the direction of travel relative to the active section —
     * the same behavior the original smooth-scroll-manager exhibits.
     */
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    const settle = () => {
      if (animRef.current !== null) return;
      const tops = snapTops();
      const base = tops[activeRef.current];
      const delta = el.scrollTop - base;
      if (Math.abs(delta) < 8) return;
      let target = activeRef.current + (delta > 0 ? 1 : -1);
      // fast fling past several sections: snap to the nearest boundary ahead
      if (Math.abs(delta) > el.clientHeight) {
        const biased = el.scrollTop + (delta > 0 ? 1 : -1) * el.clientHeight * 0.4;
        let nearest = 0;
        for (let i = 0; i < tops.length; i++) {
          if (Math.abs(tops[i] - biased) < Math.abs(tops[nearest] - biased)) nearest = i;
        }
        target = nearest;
      }
      goTo(target, true);
    };

    const onScroll = () => {
      const st = el.scrollTop;
      const vh = el.clientHeight;
      for (const cb of subscribers.current) cb(st, vh);

      // late theme flip: recolor at ~65% of the travel in either direction
      const goingDown = st >= lastScrollTop.current;
      lastScrollTop.current = st;
      const raw = goingDown ? Math.floor(st / vh + 0.35) : Math.ceil(st / vh - 0.35);
      const idx = Math.max(0, Math.min(sections.length - 1, raw));
      if (idx !== bgRef.current) {
        bgRef.current = idx;
        setBgIndex(idx);
      }

      if (animRef.current === null) {
        if (settleTimer) clearTimeout(settleTimer);
        settleTimer = setTimeout(settle, 120);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      if (settleTimer) clearTimeout(settleTimer);
    };
  }, [goTo, snapTops]);

  const ctx = useMemo(() => ({ subscribe }), [subscribe]);
  const sectionIndex = Math.min(activeIndex, sections.length - 1);
  /* nav theming + page colors follow the late-flipping bgIndex */
  const themed = sections[Math.min(bgIndex, sections.length - 1)];

  const onActiveChangeRef = useRef(onActiveChange);
  useEffect(() => {
    onActiveChangeRef.current = onActiveChange;
  });
  useEffect(() => {
    onActiveChangeRef.current?.(themed.id);
  }, [themed.id]);

  return (
    <StageContext.Provider value={ctx}>
      <div
        className="cash-type-root relative h-dvh"
        style={{
          backgroundColor: themed.background,
          color: themed.theme === "dark" ? "#ffffff" : "#000000",
          transition:
            "background-color 0.6s ease-in-out, color 0.6s ease-in-out",
        }}
        data-theme={themed.theme}
      >
        {overlay}
        {/*
         * overflow HIDDEN, exactly like the original smooth-scroll-manager:
         * programmatic scrollTop still works, but no input path (compositor
         * wheel races on first gesture, non-cancelable momentum events,
         * scrollbars) can ever scroll it natively — only the tween moves it.
         */}
        <div ref={containerRef} className="no-scrollbar relative h-full overflow-hidden">
          {sections.map((section, i) => (
            <section
              key={section.id}
              data-identifier={section.id}
              className={section.tall ? "relative" : "relative h-dvh"}
            >
              {section.content(i === sectionIndex)}
            </section>
          ))}
        </div>
      </div>
    </StageContext.Provider>
  );
}
