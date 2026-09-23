"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatPrice, site } from "@/lib/site";
import { QuantityInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { lines, isOpen, closeCart, setQuantity, remove, subtotal, count, discount, promo } = useCart();
  const reduce = useReducedMotion();
  void reduce;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-obsidian/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl"
            initial={{ x: reduce ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduce ? 0 : "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <h2 className="font-serif text-lg font-medium">
                Your Bag{" "}
                <span className="ml-1 text-sm text-taupe">
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </h2>
              <button
                onClick={closeCart}
                className="flex h-10 w-10 items-center justify-center rounded-full text-taupe transition-colors hover:bg-champagne hover:text-obsidian"
                aria-label="Close cart"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5">
              {lines.length === 0 ? (
                <EmptyCart />
              ) : (
                <ul className="divide-y divide-line">
                  {lines.map((line) => (
                    <li key={line.key} className="flex gap-4 py-5">
                      <Link
                        href={`/products/${line.productSlug}`}
                        onClick={closeCart}
                        className="shrink-0"
                        aria-label={line.name}
                      >
                        <div className="relative aspect-[4/5] w-20 overflow-hidden rounded-md bg-champagne">
                          <Image
                            src={line.image}
                            alt={line.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/products/${line.productSlug}`}
                              onClick={closeCart}
                              className="text-sm font-medium hover:text-gold"
                            >
                              {line.name}
                            </Link>
                            {line.optionLabels && (
                              <p className="mt-0.5 text-xs text-taupe">{line.optionLabels}</p>
                            )}
                          </div>
                          <button
                            onClick={() => remove(line.key)}
                            className="text-taupe transition-colors hover:text-error"
                            aria-label={`Remove ${line.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <QuantityInput
                            value={line.quantity}
                            onChange={(q) => setQuantity(line.key, q)}
                            label="quantity"
                          />
                          <p className="text-sm font-semibold">{formatPrice(line.price * line.quantity)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="shrink-0 border-t border-line bg-white px-5 py-5">
                <div className="flex items-center justify-between text-sm text-taupe">
                  <span>Subtotal</span>
                  <span className="font-medium text-obsidian">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="mt-2 flex items-center justify-between text-sm text-success">
                    <span>Promo ({promo})</span>
                    <span className="font-medium">− {formatPrice(discount)}</span>
                  </div>
                )}
                <p className="mt-2 text-xs text-taupe">
                  {subtotal >= site.freeDeliveryThreshold
                    ? "Complimentary delivery included"
                    : `Add ${formatPrice(site.freeDeliveryThreshold - subtotal)} for complimentary delivery`}
                </p>
                <Button href="/checkout" onClick={closeCart} className="mt-4 w-full" size="lg">
                  Checkout · {formatPrice(subtotal - discount)}
                </Button>
                <button
                  onClick={closeCart}
                  className="mt-3 w-full text-center text-[13px] text-taupe underline-offset-4 hover:text-obsidian hover:underline"
                >
                  or continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function EmptyCart() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-champagne">
        <ShoppingBag className="h-7 w-7 text-taupe" />
      </div>
      <h3 className="font-serif text-xl font-medium">Your bag is empty</h3>
      <p className="text-sm leading-relaxed text-taupe">
        Discover pieces made to be loved for years, not seasons.
      </p>
      <Button variant="outline" href="/shop" onClick={() => void 0}>
        Shop the collection
      </Button>
    </div>
  );
}