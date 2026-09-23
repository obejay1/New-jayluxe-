"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductRail({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
      >
        {children}
      </div>
      <div className="mt-4 hidden justify-end gap-2 lg:flex">
        <RailButton label="Scroll left" onClick={() => scrollByAmount(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </RailButton>
        <RailButton label="Scroll right" onClick={() => scrollByAmount(1)}>
          <ChevronRight className="h-4 w-4" />
        </RailButton>
      </div>
    </div>
  );
}

function RailButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-obsidian transition-all hover:border-obsidian hover:bg-obsidian hover:text-ivory"
    >
      {children}
    </button>
  );
}