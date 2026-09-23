import type { Metadata } from "next";
import { ShopView } from "@/components/store/shop/ShopView";
import { categories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full Jayluexestore collection — fashion, beauty, jewelry, home and gifts for the modern woman.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string }>;
}) {
  const { sort, category } = await searchParams;

  return (
    <div>
      <section className="border-b border-line bg-champagne/40">
        <div className="container-store py-10 sm:py-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
            The store
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Shop everything</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-taupe">
            Every piece, in one place. Filter, sort and take your time.
          </p>
        </div>
      </section>
      <ShopView categories={categories} initialSort={sort} initialCategory={category} />
    </div>
  );
}