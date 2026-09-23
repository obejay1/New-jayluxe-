"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/types";
import { formatPrice, site } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useToast } from "@/components/ui/Toast";
import { QuantityInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { BadgeFor, Rating } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ProductBuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const { show } = useToast();
  const router = useRouter();

  const [selected, setSelected] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [pending, setPending] = useState<"none" | "cart" | "buy">("none");

  const wished = isWishlisted(product.slug);
  const hasSale = typeof product.salePrice === "number" && product.salePrice < product.price;
  const outOfStock = product.stock === 0;
  const lowStock = !outOfStock && product.stock <= 10;

  const variantsRequired = product.variants.some(
    (v) => !selected[v.name],
  );

  const options = () =>
    product.variants.reduce<Record<string, string>>((acc, v) => {
      if (selected[v.name]) acc[v.name] = selected[v.name];
      return acc;
    }, {});

  const submit = (mode: "cart" | "buy") => {
    if (variantsRequired) {
      show("info", "Choose an option", "Please select an option to add this piece to your bag.");
      return;
    }
    setPending(mode);
    window.setTimeout(() => {
      add(product, quantity, options());
      setPending("none");
      if (mode === "buy") {
        router.push("/checkout");
      } else {
        show("success", "Added to your bag", product.name);
      }
    }, 450);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        {product.badge && <BadgeFor label={product.badge} />}
        {outOfStock ? (
          <BadgeFor label="Sold out" />
        ) : lowStock ? (
          <span className="inline-flex items-center rounded-full bg-warning/10 px-2.5 py-1 text-[11px] font-semibold text-warning uppercase tracking-[0.08em]">
            Low stock
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success uppercase tracking-[0.08em]">
            In stock
          </span>
        )}
      </div>

      <h1 className="mt-3 font-serif text-3xl font-medium leading-tight sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-2">
        <Rating value={product.rating} />
        <a href="#reviews" className="text-[13px] text-taupe underline-offset-4 hover:text-obsidian hover:underline">
          {product.rating} · {product.reviewCount} reviews
        </a>
      </div>

      <div className="mt-4 flex items-baseline gap-2.5">
        <p className="font-serif text-2xl font-medium">
          {formatPrice(product.salePrice ?? product.price)}
        </p>
        {hasSale && (
          <p className="text-base text-taupe line-through">{formatPrice(product.price)}</p>
        )}
        {hasSale && (
          <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold">
            Save {formatPrice(product.price - (product.salePrice as number))}
          </span>
        )}
      </div>

      <p className="mt-4 border-l-2 border-gold pl-4 text-[15px] leading-relaxed text-taupe italic">
        {product.editorNote}
      </p>

      <div className="mt-6 space-y-5">
        {product.variants.map((v) => (
          <fieldset key={v.name}>
            <legend className="mb-2.5 flex items-center justify-between text-[13px] font-medium">
              <span>{v.name}</span>
              <span className="text-taupe">{selected[v.name] ?? "Select an option"}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {v.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelected((prev) => ({ ...prev, [v.name]: opt }))}
                  aria-pressed={selected[v.name] === opt}
                  className={cn(
                    "h-11 min-w-11 rounded-full border px-4 text-sm transition-all",
                    selected[v.name] === opt
                      ? "border-obsidian bg-obsidian text-ivory"
                      : "border-line bg-white text-obsidian hover:border-obsidian",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </fieldset>
        ))}

        <div className="flex flex-wrap items-center gap-3">
          <QuantityInput
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={Math.max(1, product.stock)}
            id="quantity"
            label="quantity"
          />
          {!outOfStock && (
            <p className="text-xs text-taupe">
              {product.stock} available
              {site.freeDeliveryThreshold <= product.price && " · Free delivery"}
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            size="lg"
            isPending={pending === "cart"}
            onClick={() => submit("cart")}
            disabled={outOfStock}
            className="w-full"
          >
            {outOfStock ? "Sold out" : pending === "cart" ? "Adding…" : "Add to bag"}
          </Button>
          {!outOfStock && (
            <Button
              size="lg"
              variant="outline"
              isPending={pending === "buy"}
              onClick={() => submit("buy")}
              className="w-full"
            >
              Buy it now
            </Button>
          )}
          <button
            onClick={() => {
              toggle(product.slug);
              show(
                wished ? "info" : "success",
                wished ? "Removed from wishlist" : "Saved to wishlist",
                wished ? undefined : product.name,
              );
            }}
            className="flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium text-taupe transition-colors hover:text-obsidian"
            aria-pressed={wished}
          >
            <svg
              viewBox="0 0 24 24"
              className={cn("h-4 w-4", wished && "fill-blush text-blush")}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M12 20.5 4.7 13.2a4.8 4.8 0 0 1 0-6.8 4.8 4.8 0 0 1 6.8 0l.5.5.5-.5a4.8 4.8 0 0 1 6.8 0 4.8 4.8 0 0 1 0 6.8L12 20.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {wished ? "Saved to wishlist" : "Add to wishlist"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 divide-x divide-line border-y border-line py-4 text-center">
        {[
          { top: "Delivery", bottom: "2–4 days" },
          { top: "Returns", bottom: "7 days" },
          { top: "Support", bottom: "WhatsApp" },
        ].map((t) => (
          <div key={t.top} className="px-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-taupe">{t.top}</p>
            <p className="mt-0.5 text-[13px] font-medium">{t.bottom}</p>
          </div>
        ))}
      </div>
    </div>
  );
}