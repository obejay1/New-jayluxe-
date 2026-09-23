import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { edits } from "@/lib/data/edits";
import { products } from "@/lib/data/products";
import { SortableProductGrid } from "@/components/product/SortableProductGrid";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edit = edits.find((e) => e.slug === slug);
  if (!edit) notFound();

  const collectionProducts = products.filter((p) => edit.productSlugs.includes(p.slug));

  return (
    <div>
      <section className="border-b border-line bg-champagne/50">
        <div className="container-store py-10 sm:py-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
            {edit.subtitle}
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-medium sm:text-5xl">
            {edit.title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-taupe">{edit.description}</p>
        </div>
      </section>

      <div className="container-store py-8 sm:py-12 max-w-6xl">
        <SortableProductGrid products={collectionProducts} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const edit = edits.find((e) => e.slug === slug);
  if (!edit) return {};
  return { title: edit.title, description: edit.description };
}

export function generateStaticParams() {
  return edits.map((e) => ({ slug: e.slug }));
}