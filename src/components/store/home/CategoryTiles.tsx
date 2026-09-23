import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

export function CategoryTiles() {
  const tiles = categories.slice(0, 6);

  return (
    <section className="py-16 sm:py-24" aria-labelledby="categories-heading">
      <div className="container-store">
        <SectionHeading
          eyebrow="Curated for you"
          title="Shop by category"
          description="Explore the store by category — from fashion and jewelry to the kitchen."
        />
        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {tiles.map((c) => (
            <StaggerItem key={c.slug}>
              <CategoryTile category={c} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function CategoryTile({ category }: { category: (typeof categories)[number] }) {
  const count = getProductsByCategory(category.slug).length;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-champagne"
      aria-label={`Shop ${category.name}`}
    >
      <Image
        src={category.image}
        alt={category.description}
        fill
        sizes="(max-width: 640px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="font-serif text-lg font-medium text-ivory sm:text-xl">{category.name}</p>
        <p className="mt-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory/85 transition-colors group-hover:text-gold">
          {count} {count === 1 ? "style" : "styles"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  );
}