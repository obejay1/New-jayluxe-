import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import { edits } from "@/lib/data/edits";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Categories",
  robots: { index: false },
};

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-medium sm:text-3xl">Categories</h1>
        <p className="mt-1.5 text-sm text-taupe">How your catalogue is organised.</p>
      </div>

      <section className="overflow-hidden rounded-xl border border-line bg-white">
        <h2 className="border-b border-line px-5 py-4 font-serif text-lg font-medium">
          Categories <span className="text-sm text-taupe">({categories.length})</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] font-semibold uppercase tracking-[0.14em] text-taupe">
                <th scope="col" className="px-5 py-3 font-semibold">Category</th>
                <th scope="col" className="px-5 py-3 font-semibold">Products</th>
                <th scope="col" className="px-5 py-3 font-semibold">Inventory value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {categories.map((c) => {
                const items = products.filter((p) => p.categorySlug === c.slug);
                const value = items.reduce((s, p) => s + (p.salePrice ?? p.price) * p.stock, 0);
                return (
                  <tr key={c.slug}>
                    <td className="px-5 py-3.5">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-taupe">{c.slug} · <span className="max-w-[36ch]">{c.description}</span></p>
                    </td>
                    <td className="px-5 py-3.5 text-taupe">{items.length}</td>
                    <td className="px-5 py-3.5 font-medium">{formatPrice(value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-line bg-white">
        <h2 className="border-b border-line px-5 py-4 font-serif text-lg font-medium">
          Collections <span className="text-sm text-taupe">({edits.length})</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] font-semibold uppercase tracking-[0.14em] text-taupe">
                <th scope="col" className="px-5 py-3 font-semibold">Collection</th>
                <th scope="col" className="px-5 py-3 font-semibold">Subtitle</th>
                <th scope="col" className="px-5 py-3 font-semibold">Products</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {edits.map((e) => (
                <tr key={e.slug}>
                  <td className="px-5 py-3.5">
                    <p className="font-medium">{e.title}</p>
                    <p className="text-xs text-taupe">{e.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 text-taupe">{e.subtitle}</td>
                  <td className="px-5 py-3.5 text-taupe">{e.productSlugs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}