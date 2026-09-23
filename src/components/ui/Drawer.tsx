"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  side?: "left" | "right";
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const slideX = side === "right" ? "100%" : "-100%";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-obsidian/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`absolute top-0 flex h-full w-full max-w-sm flex-col bg-ivory shadow-2xl ${
              side === "right" ? "right-0" : "left-0"
            }`}
            initial={{ x: reduce ? 0 : slideX }}
            animate={{ x: 0 }}
            exit={{ x: reduce ? 0 : slideX }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <h2 className="font-serif text-lg font-medium">{title}</h2>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-taupe transition-colors hover:bg-champagne hover:text-obsidian"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}