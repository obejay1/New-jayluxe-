import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { edits } from "@/lib/data/edits";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

export const metadata: Metadata = {
  title: "Collections",
  description: "Curated edits from Jayluexestore — The Everyday Edit, Under ₦50,000, gifts, evening and more.",
};

export default function CollectionsPage() {
  return (
    <div>
      <section className="border-b border-line bg-champagne/40">
        <div className="container-store py-10 sm:py-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
            Curated edits
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Collections</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-taupe">
            Small, considered edits — put together the way you&apos;d dress a friend.
          </p>
        </div>
      </section>

      <div className="container-store py-10 sm:py-14">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {edits.map((edit) => (
            <StaggerItem key={edit.slug}>
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
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/65 via-obsidian/10 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                      {edit.subtitle}
                    </p>
                    <p className="mt-1.5 font-serif text-xl font-medium text-ivory sm:text-2xl">{edit.title}</p>
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
    </div>
  );
}