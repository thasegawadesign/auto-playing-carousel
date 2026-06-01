"use client";

import { CarouselPlaybackButton } from "@/components/carousel-playback-button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { CAROUSEL_SLIDES, slideTitle } from "@/lib/carousel-slides";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useCallback, useEffect, useState } from "react";

const carouselControlButtonClass = cn(
  "flex size-11 cursor-pointer items-center justify-center rounded-full border text-white backdrop-blur-sm",
  "transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
);

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  const slideCount = CAROUSEL_SLIDES.length;
  const activeSlide = CAROUSEL_SLIDES[activeIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const prefersReduced = media.matches;
      setReduceMotion(prefersReduced);
      if (prefersReduced) setIsPlaying(false);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const handleIntervalComplete = useCallback(() => {
    if (!isPlaying || reduceMotion) return;
    goNext();
  }, [goNext, isPlaying, reduceMotion]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="メインビジュアル"
      className="relative min-h-svh w-full overflow-hidden bg-secondary"
    >
      {CAROUSEL_SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden={index !== activeIndex}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1600ms] ease-in-out",
            index === activeIndex ? "opacity-100" : "opacity-0",
            reduceMotion && "transition-none",
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      ))}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
        aria-hidden
      />

      <SiteHeader />

      <div className={cn("absolute inset-x-0 bottom-8 z-20 px-5 md:bottom-10 md:px-10")}>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div
            key={activeIndex}
            className="max-w-4xl min-w-0 space-y-4 text-white md:flex-1 md:space-y-5"
          >
            <h1
              className={cn(
                "hero-copy-enter text-4xl leading-[1.15] font-black tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.1]",
                reduceMotion && "hero-copy-enter-none",
              )}
            >
              {activeSlide.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p
              className={cn(
                "hero-copy-enter hero-copy-enter-delay-1 max-w-xl text-sm leading-relaxed font-bold text-white sm:text-base md:text-lg",
                reduceMotion && "hero-copy-enter-none",
              )}
            >
              {activeSlide.subtitle}
            </p>
            <Link
              href="#"
              className={cn(
                "hero-copy-enter hero-copy-enter-delay-2 inline-flex w-fit max-w-full cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-4",
                reduceMotion && "hero-copy-enter-none",
                "text-sm font-semibold text-white shadow-lg md:text-base",
                "transition-[background-color,box-shadow] duration-200",
                "hover:bg-primary-hover hover:shadow-xl",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              )}
            >
              整備のあるべき姿を見る
              <ChevronRightIcon />
            </Link>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 md:justify-end">
            <div className="flex gap-2 md:hidden" aria-label="スライド操作">
              <CarouselArrowButton label="前のスライド" onClick={goPrev}>
                <ChevronLeftIcon />
              </CarouselArrowButton>
              <CarouselArrowButton label="次のスライド" onClick={goNext}>
                <ChevronRightIcon className="size-5" />
              </CarouselArrowButton>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5" role="tablist" aria-label="スライドを選択">
                {CAROUSEL_SLIDES.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={slide.src}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`${index + 1}枚目: ${slideTitle(slide)}`}
                      onClick={() => goTo(index)}
                      className={cn(
                        "cursor-pointer rounded-full transition-all duration-200",
                        isActive
                          ? "size-2.5 bg-primary shadow-[0_0_0_3px_rgba(255,255,255,0.25)]"
                          : cn(
                              "size-2 bg-white/70",
                              "hover:scale-125 hover:bg-white",
                              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                            ),
                      )}
                    />
                  );
                })}
              </div>

              <CarouselPlaybackButton
                activeIndex={activeIndex}
                isPlaying={isPlaying}
                reduceMotion={reduceMotion}
                onToggle={() => setIsPlaying((playing) => !playing)}
                onIntervalComplete={handleIntervalComplete}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute z-20 hidden flex-col gap-2 md:flex",
          "top-1/2 right-10 -translate-y-1/2 md:flex-col-reverse",
        )}
        aria-label="スライド操作"
      >
        <CarouselArrowButton label="前のスライド" onClick={goPrev}>
          <ChevronLeftIcon />
        </CarouselArrowButton>
        <CarouselArrowButton label="次のスライド" onClick={goNext}>
          <ChevronRightIcon className="size-5" />
        </CarouselArrowButton>
      </div>

      <p className="sr-only" aria-live="polite">
        {activeIndex + 1}枚目 / {slideCount}枚目: {slideTitle(activeSlide)}
        {isPlaying ? "（自動再生中）" : "（一時停止中）"}
      </p>
    </section>
  );
}

function CarouselArrowButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        carouselControlButtonClass,
        "border-white/25 bg-black/35",
        "hover:scale-110 hover:border-primary hover:bg-primary hover:shadow-lg",
        "active:scale-100 active:border-primary-hover active:bg-primary-hover",
      )}
    >
      {children}
    </button>
  );
}
