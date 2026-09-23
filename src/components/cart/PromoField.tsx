"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/site";
import { Input } from "@/components/ui/Field";

export function PromoField({ className }: { className?: string }) {
  const { promo, discount, applyPromo, removePromo } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (promo) {
    return (
      <div
        className={`flex items-center justify-between rounded-lg border border-success/30 bg-success/5 px-3 py-2.5 ${className ?? ""}`}
      >
        <span className="flex items-center gap-2 text-[13px] font-medium text-success">
          <Tag className="h-3.5 w-3.5" aria-hidden="true" />
          {promo} applied
          {discount > 0 && <span className="font-normal">− {formatPrice(discount)}</span>}
        </span>
        <button
          type="button"
          onClick={removePromo}
          className="text-taupe transition-colors hover:text-error"
          aria-label="Remove promo code"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        if (!code.trim()) return;
        if (applyPromo(code)) {
          setCode("");
          setError(null);
        } else {
          setError("That code isn't valid or has expired.");
        }
      }}
    >
      <label htmlFor="promo-code" className="sr-only">
        Promo code
      </label>
      <div className="flex gap-2">
        <Input
          id="promo-code"
          className="h-10 uppercase"
          placeholder="Promo code"
          autoComplete="off"
          spellCheck={false}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(null);
          }}
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-md border border-obsidian px-4 text-[13px] font-medium text-obsidian transition-colors hover:bg-obsidian hover:text-ivory"
        >
          Apply
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-error">
          {error}
        </p>
      )}
    </form>
  );
}
