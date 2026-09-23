import type { Product } from "@/types";

export function ProductStory({ product }: { product: Product }) {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-line bg-white">
      <section className="px-6 py-5 sm:px-7">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">The story</h2>
        <div className="mt-3 space-y-3">
          {product.description.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-taupe">
              {p}
            </p>
          ))}
        </div>
      </section>
      <section className="border-t border-line px-6 py-5 sm:px-7">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">The details</h2>
        <ul className="mt-3 space-y-2.5">
          {product.details.map((d, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-obsidian/85">
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}