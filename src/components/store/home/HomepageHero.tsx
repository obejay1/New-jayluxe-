"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProductBySlug } from "@/lib/data/products";
import { formatPrice, site } from "@/lib/site";
import { Marquee } from "@/components/store/home/Marquee";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROMISES = [
  `Free delivery over ${formatPrice(site.freeDeliveryThreshold)}`,
  `2–4 day delivery across Nigeria`,
  "Hand-packaged, always",
  "Easy 7-day returns",
  "Secure payments",
  "WhatsApp concierge",
];

export function HomepageHero() {
  return (
    <section>
      <div className="relative min-h-[82svh] w-full overflow-hidden sm:min-h-[86svh]">
        <KenBurnsImage />
        <div className="absolute inset-0 bg-obsidian/35" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/15 to-obsidian/20"
          aria-hidden="true"
        />

        <div className="container-store absolute inset-x-0 bottom-0 pb-16 sm:pb-20">
          <div className="max-w-2xl">
            <HeroBadge />
            <HeroHeading />
            <HeroSubtext />
            <HeroCtas />
          </div>
        </div>

        <FloatingProductCard />
        <ScrollCue />
      </div>
      <Marquee items={PROMISES} />
    </section>
  );
}

function KenBurnsImage() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      initial={reduce ? false : { scale: 1.12 }}
      animate={reduce ? undefined : { scale: 1.02 }}
      transition={{ duration: 16, ease: "easeOut" }}
    >
      <Image
        src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2000&auto=format&fit=crop"
        alt="A woman in warm neutral tones looking thoughtful in soft sunlight"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-[center_20%]"
      />
    </motion.div>
  );
}

function HeroBadge() {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className="inline-flex items-center rounded-full bg-ivory/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory backdrop-blur"
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : 0.2, duration: 0.6, ease: EASE }}
    >
      {!reduce && (
        <span className="relative mr-2.5 inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-gold" />
          <motion.span
            className="absolute inset-0 rounded-full bg-gold"
            animate={{ opacity: [0.8, 0], scale: [1, 2.6] }}
            transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity }}
          />
        </span>
      )}
      {reduce && <span className="mr-2.5 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />}
      New Season · The Everyday Edit
    </motion.span>
  );
}

function HeroHeading() {
  const reduce = useReducedMotion();

  return (
    <h1 className="mt-6 font-serif text-4xl leading-[1.08] font-medium text-ivory sm:text-6xl lg:text-7xl">
      <RevealLine delay={0.35} reduce={reduce}>
        Elegance for the
      </RevealLine>
      <RevealLine delay={0.5} reduce={reduce}>
        everyday <em className="font-light text-ivory/90 italic">woman.</em>
      </RevealLine>
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="mt-5 block h-[3px] w-28 origin-left rounded-full bg-gold sm:w-36"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
        />
      )}
      {reduce && <span aria-hidden="true" className="mt-5 block h-[3px] w-28 rounded-full bg-gold sm:w-36" />}
    </h1>
  );
}

function RevealLine({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean | null }) {
  if (reduce) return <span className="block">{children}</span>;

  return (
    <motion.span className="block overflow-hidden py-1" aria-hidden="true">
      <motion.span
        className="block"
        initial={{ y: "112%", opacity: 0, filter: "blur(6px)" }}
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

function HeroSubtext() {
  const reduce = useReducedMotion();

  return (
    <motion.p
      className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/90 sm:text-base"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : 0.75, duration: 0.6, ease: EASE }}
    >
      Fashion, beauty, jewelry, home and kitchen — pieces chosen for how they make you feel.
      Thoughtful, feminine, quietly bold.
    </motion.p>
  );
}

function HeroCtas() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="mt-8 flex flex-wrap items-center gap-3"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : 0.9, duration: 0.6, ease: EASE }}
    >
      <Link
        href="/shop"
        className="group inline-flex h-12 items-center gap-2 rounded-full bg-ivory px-7 text-sm font-medium tracking-wide text-obsidian transition-all duration-300 hover:bg-gold hover:text-obsidian"
      >
        Shop new arrivals
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <Link
        href="/collections/the-everyday-edit"
        className="inline-flex h-12 items-center gap-2 rounded-full border border-ivory/60 px-7 text-sm font-medium tracking-wide text-ivory backdrop-blur transition-all duration-300 hover:border-ivory hover:bg-ivory hover:text-obsidian"
      >
        Explore the edit
      </Link>
    </motion.div>
  );
}

function FloatingProductCard() {
  const reduce = useReducedMotion();
  const product = getProductBySlug("palermo-eau-de-parfum");
  if (!product) return null;

  return (
    <motion.div
      className="absolute right-6 bottom-40 hidden w-56 xl:block"
      initial={reduce ? false : { opacity: 0, y: 24, x: 24 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: reduce ? 0 : 1.15, duration: 0.8, ease: EASE }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        className="rounded-2xl border border-ivory/25 bg-ivory/10 p-3 shadow-xl backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
            <Image src={product.images[0]} alt="" fill sizes="56px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">New in</p>
            <p className="truncate font-serif text-sm text-ivory">{product.name}</p>
            <p className="text-xs text-ivory/80">{formatPrice(product.price)}</p>
          </div>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-ivory"
        >
          Shop now <ArrowRight className="h-3 w-3" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

function ScrollCue() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="absolute right-6 bottom-6 hidden flex-col items-center gap-2 text-ivory/80 lg:flex"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: reduce ? 0 : 1.6, duration: 0.8 }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">Scroll</span>
      <motion.span
        animate={reduce ? undefined : { y: [0, 4, 0] }}
        transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.span>
    </motion.div>
  );
}