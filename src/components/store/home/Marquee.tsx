"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();

  const Row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-5 font-serif text-[15px] font-medium text-obsidian/85 italic sm:px-7 sm:text-base">
            {item}
          </span>
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-b border-line bg-ivory py-3.5 sm:py-4">
      <div className="flex overflow-hidden">
        {reduce ? (
          <div className="flex flex-wrap justify-center">{Row}</div>
        ) : (
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {Row}
            {Row}
          </motion.div>
        )}
      </div>
    </div>
  );
}