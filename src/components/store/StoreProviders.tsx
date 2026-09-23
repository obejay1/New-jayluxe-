"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import { ToastProvider } from "@/components/ui/Toast";

export function StoreProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}