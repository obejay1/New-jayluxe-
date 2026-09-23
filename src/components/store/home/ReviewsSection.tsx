import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { reviews } from "@/lib/data/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Rating } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

export function ReviewsSection() {
  const average = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="bg-champagne/40 py-16 sm:py-24" aria-labelledby="reviews-heading">
      <div className="container-store">
        <SectionHeading
          eyebrow="Kind words"
          title="Loved by our clients"
          description={`${average} average across verified purchases — here's what they say.`}
        />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((r) => (
            <StaggerItem key={r.id}>
              <article className="flex h-full flex-col rounded-xl border border-line bg-white p-6">
                <div className="flex items-center justify-between">
                  <Rating value={r.rating} />
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified purchase
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-serif text-lg font-medium leading-snug">“{r.title}”</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-taupe">{r.body}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  {r.productImage && (
                    <Link
                      href={`/products/${r.productSlug}`}
                      className="relative aspect-[4/5] w-10 shrink-0 overflow-hidden rounded bg-champagne"
                      aria-label={r.productName}
                    >
                      <Image src={r.productImage} alt="" fill sizes="40px" className="object-cover" />
                    </Link>
                  )}
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-taupe">
                      {r.location} ·{" "}
                      <Link href={`/products/${r.productSlug}`} className="hover:text-gold">
                        {r.productName}
                      </Link>
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}