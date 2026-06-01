"use client";

import { PauseIcon, PlayIcon } from "@/components/icons";
import { CAROUSEL_INTERVAL_MS } from "@/lib/carousel-slides";
import { cn } from "@/lib/utils";

const BUTTON_SIZE = 44;
const STROKE_WIDTH = 2;
const RADIUS = (BUTTON_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type CarouselPlaybackButtonProps = {
  activeIndex: number;
  isPlaying: boolean;
  reduceMotion: boolean;
  onToggle: () => void;
  onIntervalComplete: () => void;
};

export function CarouselPlaybackButton({
  activeIndex,
  isPlaying,
  reduceMotion,
  onToggle,
  onIntervalComplete,
}: CarouselPlaybackButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group relative size-11 cursor-pointer rounded-full text-white",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
      )}
      aria-label={isPlaying ? "スライドショーを一時停止" : "スライドショーを再生"}
      aria-pressed={isPlaying}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          "origin-center transform-gpu will-change-transform",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover:scale-110 group-active:scale-100",
          "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        )}
      >
        {!reduceMotion && (
          <svg
            className="pointer-events-none absolute inset-0 size-full -rotate-90"
            viewBox={`0 0 ${BUTTON_SIZE} ${BUTTON_SIZE}`}
            aria-hidden
          >
            <circle
              key={activeIndex}
              cx={BUTTON_SIZE / 2}
              cy={BUTTON_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="butt"
              className="text-white"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              style={{
                animation: `carousel-ring-progress ${CAROUSEL_INTERVAL_MS}ms linear forwards`,
                animationPlayState: isPlaying ? "running" : "paused",
              }}
              onAnimationEnd={(event) => {
                if (event.animationName !== "carousel-ring-progress" || !isPlaying) return;
                onIntervalComplete();
              }}
            />
          </svg>
        )}
        <span className="relative z-10">{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
      </span>
    </button>
  );
}
