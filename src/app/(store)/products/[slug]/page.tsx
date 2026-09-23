import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductStory } from "@/components/product/ProductStory";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductRail } from "@/components/product/ProductRail";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.status !== "published") notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="container-store py-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-taupe">
          <li>
            <Link href="/" className="hover:text-obsidian">Home</Link>
          </li>
          <BreadcrumbSep />
          <li>
            <Link href="/shop" className="hover:text-obsidian">Shop</Link>
          </li>
          <BreadcrumbSep />
          <li>
            <Link href={`/categories/${product.categorySlug}`} className="hover:text-obsidian">
              {product.categoryName}
            </Link>
          </li>
          <BreadcrumbSep />
          <li className="text-obsidian" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-24">
          <ProductGallery key={product.slug} images={product.images} name={product.name} />
        </div>
        <div>
          <ProductBuyBox product={product} />
          <ProductStory product={product} />
          <ProductReviews product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 sm:mt-20">
          <SectionHeading eyebrow="You may also love" title="Complete the look" align="left" />
          <div className="mt-8">
            <ProductRail ariaLabel="Related products">
              {related.map((p) => (
                <div key={p.id} className="w-[46vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23.5%]">
                  <ProductCard product={p} />
                </div>
              ))}
            </ProductRail>
          </div>
        </section>
      )}
    </div>
  );
}

function BreadcrumbSep() {
  return <ChevronRight className="h-3 w-3 text-taupe/60" aria-hidden="true" />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.editorNote,
    openGraph: {
      title: product.name,
      description: product.editorNote,
      images: [product.images[0]],
    },
  };
}

export function generateStaticParams() {
  return products.filter((p) => p.status === "published").map((p) => ({ slug: p.slug }));
}