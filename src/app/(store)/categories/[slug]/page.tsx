import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { categories } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { SortableProductGrid } from "@/components/product/SortableProductGrid";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 lg:h-96">
          <Image
            src={category.image}
            alt={category.description}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-obsidian/45" aria-hidden="true" />
          <div className="container-store absolute inset-0 flex flex-col justify-end pb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Category
            </p>
            <h1 className="mt-2 font-serif text-4xl font-medium text-ivory sm:text-5xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ivory/90">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      <div className="container-store py-8 sm:py-12 max-w-6xl">
        <SortableProductGrid products={products} />
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
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}