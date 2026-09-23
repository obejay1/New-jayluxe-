import type { Metadata } from "next";
import { FaqAccordion } from "@/components/store/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about delivery, payments, returns, orders and products at Jayluexestore.",
};

export default function FaqPage() {
  return (
    <div className="container-store py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Good to know</p>
        <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-taupe">
          Delivery, payments, returns and everything in between. Can&apos;t find your answer?{" "}
          <a href="/contact" className="text-obsidian underline underline-offset-4 hover:text-gold">
            Talk to us
          </a>
          .
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <FaqAccordion />
      </div>
    </div>
  );
}