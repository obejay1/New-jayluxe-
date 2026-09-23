"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type WishlistState = {
  slugs: string[];
  toggle: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
};

const WishlistContext = createContext<WishlistState | null>(null);
const WISH_KEY = "jlx-wish-v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        setSlugs(JSON.parse(window.localStorage.getItem(WISH_KEY) ?? "[]") as string[]);
      } catch {
        setSlugs([]);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(WISH_KEY, JSON.stringify(slugs));
    } catch {
      /* storage unavailable */
    }
  }, [slugs, hydrated]);

  const toggle = useCallback((slug: string) => {
    setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const isWishlisted = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return (
    <WishlistContext.Provider value={{ slugs, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within <WishlistProvider>");
  return ctx;
}