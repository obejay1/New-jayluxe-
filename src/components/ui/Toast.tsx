"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

type ToastKind = "success" | "error" | "info";
type ToastData = { id: number; kind: ToastKind; title: string; message?: string };

const ToastContext = createContext<{
  show: (kind: ToastKind, title: string, message?: string) => void;
} | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const show = useCallback((kind: ToastKind, title: string, message?: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, kind, title, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-line bg-white p-4 shadow-lg"
              role="status"
            >
              {t.kind === "success" && (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              )}
              {t.kind === "error" && (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-error" />
              )}
              {t.kind === "info" && (
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold">{t.title}</p>
                {t.message && <p className="mt-0.5 text-[13px] text-taupe">{t.message}</p>}
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                className="text-taupe transition-colors hover:text-obsidian"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}