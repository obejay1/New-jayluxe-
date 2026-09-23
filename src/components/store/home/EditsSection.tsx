import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { edits } from "@/lib/data/edits";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

export function EditsSection() {
  return (
    <section className="bg-champagne/50 py-16 sm:py-24" aria-labelledby="edits-heading">
      <div className="container-store">
        <SectionHeading
          eyebrow="Shop the edit"
          title="Curated collections"
          description="Small, considered edits — put together the way you'd dress a friend."
        />
        <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {edits.slice(0, 6).map((edit, i) => (
            <StaggerItem
              key={edit.slug}
              className={i === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <Link
                href={`/collections/${edit.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-champagne"
                aria-label={edit.title}
              >
                <Image
                  src={edit.image}
                  alt={edit.description}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-obsidian/65 via-obsidian/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                      {edit.subtitle}
                    </p>
                    <p className="mt-1.5 font-serif text-xl font-medium text-ivory sm:text-2xl">
                      {edit.title}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory/15 text-ivory backdrop-blur transition-all duration-300 group-hover:bg-gold group-hover:text-obsidian">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}