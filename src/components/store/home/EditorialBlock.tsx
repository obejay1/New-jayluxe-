import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/ui/Motion";

export function EditorialBlock() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="editorial-heading">
      <div className="container-store">
        <FadeUp>
          <div className="grid overflow-hidden rounded-2xl bg-obsidian lg:grid-cols-2">
            <div className="relative order-2 aspect-[4/3] lg:order-1 lg:aspect-auto lg:min-h-[34rem]">
              <Image
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1600&auto=format&fit=crop"
                alt="A woman in an elegant evening outfit applying perfume before going out"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 flex flex-col justify-center p-7 sm:p-12 lg:order-2 lg:p-16">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                The ritual
              </span>
              <h2 className="mt-4 font-serif text-3xl leading-tight font-medium text-ivory sm:text-4xl">
                Perfume is the
                <br />
                quietest <em className="italic">accessory.</em>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory/80">
                Palermo — our signature — opens with orange blossom and settles into warm musk.
                One spritz before you leave; one more when you remember him.
              </p>
              <div className="mt-8">
                <Link
                  href="/products/palermo-eau-de-parfum"
                  className="inline-flex h-12 items-center rounded-full bg-ivory px-7 text-sm font-medium tracking-wide text-obsidian transition-all duration-300 hover:bg-gold"
                >
                  Discover Palermo
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}