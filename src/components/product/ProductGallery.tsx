"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!fullscreen) return;
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    if (fullscreen) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen, images.length]);

  const scrollTo = useCallback((i: number) => {
    setIndex(i);
    const el = trackRef.current;
    if (el) {
      const child = el.children[i] as HTMLElement | undefined;
      child?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
    }
  }, [reduce]);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let nearestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const cr = (child as HTMLElement).offsetLeft + (child as HTMLElement).clientWidth / 2;
      const dist = Math.abs(cr - center);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });
    setIndex(nearest);
  }, []);

  const mainImage = useMemo(() => images[index] ?? images[0], [images, index]);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-champagne">
        <Image
          key={mainImage + "-" + (fullscreen ? "full" : "main")}
          src={mainImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <button
          onClick={() => setFullscreen(true)}
          className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 shadow-sm backdrop-blur transition-transform hover:scale-105"
          aria-label="View fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-obsidian" : "w-3 bg-obsidian/30",
              )}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <button
            key={img + i}
            onClick={() => scrollTo(i)}
            className={cn(
              "relative aspect-[4/5] w-16 shrink-0 snap-start overflow-hidden rounded-md bg-champagne sm:w-20",
              i === index
                ? "ring-2 ring-obsidian ring-offset-2"
                : "opacity-70 hover:opacity-100",
            )}
            aria-label={`View image ${i + 1} of ${name}`}
            aria-current={i === index}
          >
            <Image src={img} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-obsidian/95 p-4"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduce ? 1 : 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${name} fullscreen gallery`}
          >
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory hover:text-obsidian"
              aria-label="Close fullscreen"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute top-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-ivory" : "w-3 bg-ivory/40",
                  )}
                  aria-label={`Show image ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex w-full max-w-3xl items-center gap-3">
              <FullscreenArrow dir="left" onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)} />
              <div className="relative aspect-[4/5] max-h-[85vh] w-full overflow-hidden rounded-lg">
                <Image
                  key={mainImage}
                  src={mainImage}
                  alt={name}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <FullscreenArrow dir="right" onClick={() => setIndex((i) => (i + 1) % images.length)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FullscreenArrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory hover:text-obsidian sm:flex"
      aria-label={dir === "left" ? "Previous image" : "Next image"}
    >
      <svg viewBox="0 0 24 24" className={dir === "left" ? "h-5 w-5 rotate-180" : "h-5 w-5"} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}