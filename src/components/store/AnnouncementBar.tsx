"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ANNOUNCEMENTS = [
  "Complimentary delivery on orders over ₦150,000",
  "Hand-packaged with care · Delivery across Nigeria in 2–4 days",
  "Welcome gift with every first order — use code JAYLUXE10",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => window.clearInterval(t);
  }, [paused]);

  if (dismissed) return null;

  return (
    <div
      className="relative bg-obsidian text-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-store flex h-9 items-center justify-center px-10 sm:px-14">
        <div className="relative h-9 w-full overflow-hidden text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex h-9 items-center justify-center text-[11px] font-medium tracking-[0.14em] uppercase sm:text-xs"
            >
              {ANNOUNCEMENTS[index]}
            </motion.p>
          </AnimatePresence>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-2 flex h-9 w-9 items-center justify-center text-ivory/60 transition-colors hover:text-ivory"
          aria-label="Dismiss announcement"
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}