"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, site } from "@/lib/site";
import { QuantityInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { PromoField } from "@/components/cart/PromoField";

export function CartView() {
  const { lines, setQuantity, remove, subtotal, count, discount, promo } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container-store flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-champagne">
          <ShoppingBag className="h-8 w-8 text-taupe" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-medium">Your bag is empty</h1>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-taupe">
          There&apos;s a whole store waiting for you. Start with something you&apos;ll love for years.
        </p>
        <Button href="/shop" className="mt-8">
          Shop the collection <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const free = subtotal >= site.freeDeliveryThreshold;
  const remaining = site.freeDeliveryThreshold - subtotal;

  return (
    <div className="container-store py-8 sm:py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Your selection</p>
          <h1 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
            Shopping bag{" "}
            <span className="text-lg text-taupe">
              ({count} {count === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>
      </div>

      {!free && (
        <div className="mb-8 rounded-lg border border-line bg-white p-4">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-taupe">
              Add <strong className="text-obsidian">{formatPrice(remaining)}</strong> for complimentary delivery
            </span>
            <span className="font-medium">{Math.min(100, Math.round((subtotal / site.freeDeliveryThreshold) * 100))}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-champagne">
            <div
              className="h-full rounded-full bg-gold transition-all duration-500"
              style={{ width: `${Math.min(100, (subtotal / site.freeDeliveryThreshold) * 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-5 py-6">
                <Link href={`/products/${line.productSlug}`} className="shrink-0" aria-label={line.name}>
                  <div className="relative aspect-[4/5] w-24 overflow-hidden rounded-md bg-champagne sm:w-28">
                    <Image src={line.image} alt={line.name} fill sizes="112px" className="object-cover" />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/products/${line.productSlug}`} className="text-[15px] font-medium hover:text-gold">
                        {line.name}
                      </Link>
                      {line.optionLabels && <p className="mt-1 text-xs text-taupe">{line.optionLabels}</p>}
                    </div>
                    <button
                      onClick={() => remove(line.key)}
                      className="text-taupe transition-colors hover:text-error"
                      aria-label={`Remove ${line.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <QuantityInput value={line.quantity} onChange={(q) => setQuantity(line.key, q)} label="quantity" />
                    <div className="text-right">
                      <p className="text-[15px] font-semibold">{formatPrice(line.price * line.quantity)}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-sm text-taupe transition-colors hover:text-obsidian">
            <ArrowLeft className="h-4 w-4" /> Continue shopping
          </Link>
        </div>

        <aside className="h-fit rounded-xl border border-line bg-white p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-xl font-medium">Order summary</h2>
          <PromoField className="mt-4" />
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-taupe">Subtotal</dt>
              <dd className="font-medium">{formatPrice(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <dt>Promo ({promo})</dt>
                <dd className="font-medium">− {formatPrice(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-taupe">Delivery</dt>
              <dd className="font-medium">{free ? "Complimentary" : formatPrice(site.deliveryFee)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base">
              <dt className="font-medium">Total</dt>
              <dd className="font-serif text-xl font-medium">
                {formatPrice(subtotal - discount + (free ? 0 : site.deliveryFee))}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs leading-relaxed text-taupe">
            Delivery estimate: {site.deliveryDays}. Taxes included where applicable.
          </p>
          <Button href="/checkout" size="lg" className="mt-5 w-full">
            Continue to checkout
          </Button>
          <p className="mt-3 text-center text-xs text-taupe">Secure checkout · Paystack / Flutterwave</p>
        </aside>
      </div>
    </div>
  );
}