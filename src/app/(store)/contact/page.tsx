import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/store/ContactForm";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Jayluexestore — WhatsApp, email or the contact form. We reply fast.",
};

export default function ContactPage() {
  return (
    <div className="container-store py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">We&apos;re here</p>
        <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Talk to a human</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-taupe">
          Order questions, styling advice, gift dilemmas — message us and a real person replies,
          usually within a few hours.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl font-medium">Send a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-5">
          <a
            href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-all hover:border-gold"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">WhatsApp us</p>
              <p className="text-sm text-taupe">{site.phone} · fastest reply</p>
            </div>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-all hover:border-gold"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">Email us</p>
              <p className="text-sm text-taupe">{site.email}</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">Hours</p>
              <p className="text-sm text-taupe">Mon–Sat, 9am–7pm WAT</p>
            </div>
          </div>
          <div className="rounded-2xl bg-obsidian p-6 text-ivory">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Visit us</p>
            <p className="mt-2 text-sm leading-relaxed text-ivory/85">{site.address}</p>
            <Link href="/faq" className="mt-4 inline-block text-sm text-ivory underline underline-offset-4 hover:text-gold">
              Read the FAQ instead →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}