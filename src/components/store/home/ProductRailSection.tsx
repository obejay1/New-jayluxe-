import type { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductRail } from "@/components/product/ProductRail";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProductRailSection({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref?: string;
}) {
  return (
    <section className="py-16 sm:py-20" aria-labelledby={`rail-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <div className="container-store">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={
            viewAllHref ? (
              <a
                href={viewAllHref}
                className="mt-2 inline-flex h-11 items-center rounded-full border border-obsidian/25 px-6 text-sm font-medium transition-all duration-300 hover:border-obsidian hover:bg-obsidian hover:text-ivory"
              >
                View all
              </a>
            ) : undefined
          }
        />
        <div className="mt-9">
          <ProductRail ariaLabel={title}>
            {products.map((p) => (
              <div key={p.id} className="w-[46vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23.5%]">
                <ProductCard product={p} />
              </div>
            ))}
          </ProductRail>
        </div>
      </div>
    </section>
  );
}