import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { edits } from "@/lib/data/edits";
import { site } from "@/lib/site";
import { NewsletterForm } from "@/components/store/NewsletterForm";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/ui/BrandIcons";

const SHOP_LINKS = categories.map((c) => ({ label: c.name, href: `/categories/${c.slug}` }));
const EDIT_LINKS = edits.slice(0, 4).map((e) => ({ label: e.title, href: `/collections/${e.slug}` }));

export function StoreFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-champagne/40">
      <div className="container-store py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-serif text-2xl font-medium">jayluexestore</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.34em] text-taupe">
store
            </p>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-taupe">
              A luxury lifestyle store for the modern woman — fashion, beauty, jewelry,
              home, kitchen and gifts. Curated with intention, delivered with care.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { href: site.instagram, label: "Instagram", Icon: InstagramIcon },
                { href: site.tiktok, label: "TikTok", Icon: TikTokIcon },
                { href: "https://facebook.com/jayluxestore", label: "Facebook", Icon: FacebookIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-obsidian transition-all hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <FooterColumn title="Shop" links={SHOP_LINKS} />
            <FooterColumn title="Collections" links={EDIT_LINKS} />
            <div className="col-span-2 sm:col-span-1">
              <FooterColumn
                title="Help"
                links={[
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "FAQ", href: "/faq" },
                  { label: "Shipping & Returns", href: "/shipping-returns" },
                ]}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
              Join the list
            </p>
            <p className="mt-3 text-sm leading-relaxed text-taupe">
              Early access to new drops, private sales and the occasional love letter.
            </p>
            <NewsletterForm className="mt-5" />
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-store flex flex-col items-center justify-between gap-3 py-6 text-xs text-taupe sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-obsidian">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-obsidian">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-obsidian">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-sm text-obsidian transition-colors hover:text-gold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}