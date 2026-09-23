import Image from "next/image";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/ui/Motion";
import { InstagramIcon } from "@/components/ui/BrandIcons";

const SOCIAL = [
  {
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop",
    alt: "Styled outfit in warm neutrals",
  },
  {
    src: "https://images.unsplash.com/photo-1521783988139-89397d761dce?q=80&w=600&auto=format&fit=crop",
    alt: "Gold earrings on an ivory backdrop",
  },
  {
    src: "https://images.unsplash.com/photo-1594736797933-d0401da7bface?q=80&w=600&auto=format&fit=crop",
    alt: "Fragrance bottle in golden light",
  },
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
    alt: "A warm, styled living room",
  },
  {
    src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
    alt: "A wrapped gift on a table",
  },
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    alt: "A woman in soft knitwear",
  },
];

export function SocialGallery() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="social-heading">
      <div className="container-store">
        <SectionHeading
          eyebrow="Follow along"
          title="As seen on the gram"
          description={`Tag @${site.name.toLowerCase()} for a chance to be featured.`}
        />
        <FadeUp className="mt-10">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
            {SOCIAL.map((item) => (
              <a
                key={item.src}
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-lg bg-champagne"
                aria-label="Open our Instagram"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-70"
                />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <InstagramIcon className="h-6 w-6 text-ivory drop-shadow" />
                </span>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}