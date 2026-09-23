import type { Metadata } from "next";
import Image from "next/image";
import { FadeUp, Stagger, StaggerItem } from "@/components/ui/Motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jayluexestore is a luxury lifestyle store for the modern woman — founded on the belief that everyday things can feel extraordinary.",
};

const VALUES = [
  {
    title: "Made to be kept",
    body: "We'd rather sell one piece you love for years than ten you discard in a season. Every product is chosen for materials, making and longevity.",
  },
  {
    title: "Considered by people",
    body: "A human hand-wraps your order. A human answers your WhatsApp. Anti-robot, pro-person — always.",
  },
  {
    title: "Honest luxury",
    body: "Luxury without the nonsense — fair prices, real descriptions, no fake scarcity, no fine print that bites.",
  },
  {
    title: "Feminine, not fussy",
    body: "Softness with a spine. Our design language is warm, editorial and confident — never decorative for its own sake.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="relative h-[46vh] min-h-96 w-full">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop"
            alt="A rack of carefully chosen clothes in warm light"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-obsidian/40" aria-hidden="true" />
          <div className="container-store absolute inset-0 flex flex-col justify-end pb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Our story</p>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight font-medium text-ivory sm:text-5xl">
              A small store with a big point of view.
            </h1>
          </div>
        </div>
      </section>

      <section className="container-store py-16 sm:py-24">
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">The why</span>
            <h2 className="mt-4 font-serif text-3xl font-medium sm:text-4xl">
              We started with one question:{" "}
              <em className="italic">why should luxury only live in your wardrobe?</em>
            </h2>
            <div className="mt-6 space-y-4 text-left text-[15px] leading-relaxed text-taupe">
              <p>
                Jayluexestore began on a Lagos dining table with a drawer full of pearls and a
                conviction: the modern woman deserves a store that feels as considered as she is.
                Not loud. Not disposable. Warm, bold and quietly confident — the same way she
                walks into a room.
              </p>
              <p>
                Today that single drawer has grown into a store spanning fashion, beauty,
                jewelry, home and kitchen. Every piece is chosen by hand, photographed with care, and
                packed in ivory paper with a gold ribbon — because how something arrives is the
                first chapter of how it makes you feel.
              </p>
              <p className="font-medium text-obsidian">
                Everything is made to be kept. Gifts for the people you love, and permission
                slips for yourself.
              </p>
            </div>
          </div>
        </FadeUp>

        <FadeUp className="mt-16">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1521783988139-89397d761dce?q=80&w=1200&auto=format&fit=crop"
                alt="Gold jewelry arranged softly on ivory fabric"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
                alt="A woman in softly draped knitwear smiling"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </FadeUp>

        <Stagger className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <StaggerItem key={v.title}>
              <h3 className="font-serif text-xl font-medium">{v.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-taupe">{v.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}