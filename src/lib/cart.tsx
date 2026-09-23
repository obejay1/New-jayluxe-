"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/types";
import { getProductBySlug } from "@/lib/data/products";

export type CartLine = {
  key: string;
  productSlug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  optionLabels: string;
};

export const WELCOME_PROMO_CODE = "JAYLUXE10";
const PROMO_RATE = 0.1;

type CartState = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  promo: string | null;
  discount: number;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  add: (product: Product, quantity?: number, options?: Record<string, string>) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartState | null>(null);

const CART_KEY = "jlx-cart-v1";
const PROMO_KEY = "jlx-promo-v1";

function loadCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return parsed.filter((l) => getProductBySlug(l.productSlug) !== undefined);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [promo, setPromo] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setLines(loadCart());
      try {
        const stored = window.localStorage.getItem(PROMO_KEY);
        if (stored && stored.toUpperCase() === WELCOME_PROMO_CODE) setPromo(stored.toUpperCase());
      } catch {
        /* storage unavailable */
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
      if (promo) window.localStorage.setItem(PROMO_KEY, promo);
      else window.localStorage.removeItem(PROMO_KEY);
    } catch {
      /* storage unavailable */
    }
  }, [lines, promo, hydrated]);

  const add = useCallback(
    (product: Product, quantity = 1, options: Record<string, string> = {}) => {
      const optionLabels = Object.entries(options)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" · ");
      const key = optionLabels
        ? `${product.slug}__${Object.values(options).join("-")}`
        : product.slug;

      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        const actualPrice = product.salePrice ?? product.price;
        if (existing) {
          return prev.map((l) =>
            l.key === key ? { ...l, quantity: Math.min(99, l.quantity + quantity) } : l,
          );
        }
        const line: CartLine = {
          key,
          productSlug: product.slug,
          name: product.name,
          price: actualPrice,
          image: product.images[0],
          quantity,
          optionLabels,
        };
        return [...prev, line];
      });
      setIsOpen(true);
    },
    [],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(99, quantity) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized !== WELCOME_PROMO_CODE) return false;
    setPromo(normalized);
    return true;
  }, []);

  const removePromo = useCallback(() => setPromo(null), []);

  const { count, subtotal } = useMemo(
    () => ({
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    }),
    [lines],
  );

  const discount = promo ? Math.round(subtotal * PROMO_RATE) : 0;

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        lines,
        count,
        subtotal,
        promo,
        discount,
        applyPromo,
        removePromo,
        add,
        setQuantity,
        remove,
        clear,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}