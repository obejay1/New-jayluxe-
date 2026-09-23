"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import { reviews } from "@/lib/data/reviews";
import { Rating } from "@/components/ui/Badge";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductReviews({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const productReviews = reviews.filter((r) => r.productSlug === product.slug);
  const hasReviews = productReviews.length > 0;

  return (
    <div id="reviews" className="mt-6 overflow-hidden rounded-lg border border-line bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left sm:px-7"
        aria-expanded={open}
        aria-controls="reviews-panel"
      >
        <span className="flex items-center gap-3">
          <span className="font-serif text-2xl font-medium">{product.rating}</span>
          <span>
            <Rating value={product.rating} />
            <span className="mt-0.5 block text-xs text-taupe">
              {product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"}
            </span>
          </span>
        </span>
        <span className="flex items-center gap-2 text-[13px] font-medium text-taupe transition-colors hover:text-obsidian">
          {open ? "Hide reviews" : "Read reviews"}
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")} />
        </span>
      </button>

      {open && (
        <div id="reviews-panel" className="max-h-[26rem] space-y-4 overflow-y-auto border-t border-line p-6 sm:px-7">
          {hasReviews ? (
            productReviews.map((r) => (
              <article key={r.id} className="rounded-lg border border-line p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-champagne text-xs font-semibold">
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-xs text-taupe">{r.location}</p>
                    </div>
                  </div>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified
                    </span>
                  )}
                </div>
                <Rating value={r.rating} className="mt-2.5" />
                <h4 className="mt-1.5 font-medium">&ldquo;{r.title}&rdquo;</h4>
                <p className="mt-1 text-sm leading-relaxed text-taupe">{r.body}</p>
              </article>
            ))
          ) : (
            <div className="text-center py-6">
              <Rating value={product.rating} className="justify-center" />
              <h3 className="mt-3 font-serif text-lg font-medium">Be the first to review</h3>
              <p className="mt-1.5 text-sm text-taupe">
                This piece is still collecting its first stories. Check back soon, or write the one that
                starts it all.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}