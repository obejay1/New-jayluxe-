"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Menu,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/lib/data/categories";
import { edits } from "@/lib/data/edits";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "New In", href: "/shop?sort=newest" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = window.setTimeout(() => {
      setMenuOpen(false);
      setCollectionsOpen(false);
    }, 0);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur">
        <div className="container-store flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-obsidian transition-colors hover:bg-champagne"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <Link href="/" className="group flex flex-col" aria-label="Jayluexestore home">
            <span className="font-serif text-[22px] leading-none font-medium tracking-[0.02em] transition-colors group-hover:text-gold sm:text-2xl">
              jayluexestore
            </span>
            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.34em] text-taupe sm:block">
              store
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map((item) =>
              item.label === "Collections" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setCollectionsOpen(true)}
                  onMouseLeave={() => setCollectionsOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium text-obsidian transition-colors hover:text-gold",
                      collectionsOpen && "text-gold",
                    )}
                    aria-expanded={collectionsOpen}
                    aria-haspopup="true"
                    onClick={() => setCollectionsOpen((v) => !v)}
                  >
                    Collections
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {collectionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full pt-4 -translate-x-1/2"
                      >
                        <div className="w-[36rem] rounded-xl border border-line bg-white p-5 shadow-xl">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
                                Shop by category
                              </p>
                              <ul className="space-y-2">
                                {categories.slice(0, 5).map((c) => (
                                  <li key={c.slug}>
                                    <Link
                                      href={`/categories/${c.slug}`}
                                      className="flex items-center justify-between text-sm text-obsidian transition-colors hover:text-gold"
                                    >
                                      {c.name}
                                      <ArrowRight className="h-3.5 w-3.5 text-taupe" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
                                Curated edits
                              </p>
                              <ul className="space-y-2">
                                {edits.slice(0, 5).map((e) => (
                                  <li key={e.slug}>
                                    <Link
                                      href={`/collections/${e.slug}`}
                                      className="flex items-center justify-between text-sm text-obsidian transition-colors hover:text-gold"
                                    >
                                      {e.title}
                                      <ArrowRight className="h-3.5 w-3.5 text-taupe" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-gold",
                    pathname === item.href && "text-gold",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <HeaderIconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </HeaderIconButton>
            <WishlistButton />
            <CartButton />
            <HeaderIconButton label="Account" href="/account" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </HeaderIconButton>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onSearch={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} reduce={reduce} />
    </>
  );
}

function HeaderIconButton({
  label,
  href,
  onClick,
  children,
  className,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const base = cn(
    "relative flex h-10 w-10 items-center justify-center rounded-full text-obsidian transition-colors hover:bg-champagne",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={base} aria-label={label}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={base} aria-label={label}>
      {children}
    </button>
  );
}

function WishlistButton() {
  const { slugs } = useWishlist();
  return (
    <HeaderIconButton label="Wishlist" href="/wishlist">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M12 20.5 4.7 13.2a4.8 4.8 0 0 1 0-6.8 4.8 4.8 0 0 1 6.8 0l.5.5.5-.5a4.8 4.8 0 0 1 6.8 0 4.8 4.8 0 0 1 0 6.8L12 20.5z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {slugs.length > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-obsidian">
          {slugs.length}
        </span>
      )}
    </HeaderIconButton>
  );
}

function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-obsidian transition-colors hover:bg-champagne"
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
    >
      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-obsidian text-[9px] font-bold text-ivory"
          >
            {count > 99 ? "99" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function MobileMenu({
  open,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-obsidian/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute top-0 left-0 flex h-full w-[82%] max-w-sm flex-col bg-ivory shadow-2xl"
            initial={{ x: reduce ? 0 : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduce ? 0 : "-100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <span className="font-serif text-lg font-medium">jayluexestore</span>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-taupe hover:bg-champagne"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <button
                onClick={() => {
                  onSearch();
                  onClose();
                }}
                className="mb-6 flex h-11 w-full items-center gap-3 rounded-md border border-line bg-white px-4 text-sm text-taupe"
              >
                <Search className="h-4 w-4" />
                Search the store…
              </button>
              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {[{ label: "Home", href: "/" }, ...NAV].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between rounded-md px-3 py-3 font-serif text-lg text-obsidian transition-colors hover:bg-champagne"
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 text-taupe" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="mt-8 mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
                Categories
              </p>
              <ul className="space-y-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/categories/${c.slug}`} className="block rounded-md px-3 py-2.5 text-sm text-obsidian transition-colors hover:bg-champagne">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-8 mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
                Account
              </p>
              <Link href="/account" className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-obsidian transition-colors hover:bg-champagne">
                <User className="h-4 w-4" /> My account
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SearchOverlay({
  open,
  onClose,
  reduce,
}: {
  open: boolean;
  onClose: () => void;
  reduce: boolean | null;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    let reset: number | undefined;
    if (open) {
      reset = window.setTimeout(() => setQuery(""), 0);
      window.setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      if (reset !== undefined) window.clearTimeout(reset);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? products.filter((p) => {
        const haystack = `${p.name} ${p.categoryName} ${p.editorNote} ${p.badge ?? ""}`.toLowerCase();
        return haystack.includes(normalized);
      }).slice(0, 6)
    : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!normalized) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-ivory"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduce ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="container-store pt-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-taupe">
                Search the store
              </span>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-taupe hover:bg-champagne"
                aria-label="Close search"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <form onSubmit={submit} className="mt-6 flex items-center gap-4 border-b-2 border-obsidian pb-3">
              <Search className="h-6 w-6 text-taupe" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent font-serif text-xl text-obsidian placeholder:text-taupe/50 focus:outline-none sm:text-2xl"
                aria-label="Search products"
              />
              {normalized && (
                <button type="submit" className="shrink-0 text-sm font-medium underline-offset-4 hover:underline">
                  See all results
                </button>
              )}
            </form>

            <div className="mt-6 space-y-2" aria-live="polite">
              {results.length > 0 &&
                results.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-md px-2 py-2 transition-colors hover:bg-champagne"
                  >
                    <span className="text-obsidian">{p.name}</span>
                    <span className="text-xs text-taupe">{p.categoryName}</span>
                    <span className="ml-auto text-sm font-medium">
                      {p.salePrice ? (
                        <>
                          <s className="mr-1 text-xs text-taupe">{formatPrice(p.price)}</s>
                          {formatPrice(p.salePrice)}
                        </>
                      ) : (
                        formatPrice(p.price)
                      )}
                    </span>
                  </Link>
                ))}
              {normalized && results.length === 0 && (
                <p className="px-2 py-6 text-sm text-taupe">
                  No matches for “{query.trim()}” — try “dress”, “pearl” or “candle”.
                </p>
              )}
              {!normalized && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {["dress", "pearl", "perfume", "bag", "candle", "velvet"].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setQuery(t);
                        inputRef.current?.focus();
                      }}
                      className="rounded-full border border-line px-4 py-2 text-[13px] text-taupe transition-colors hover:border-gold hover:text-obsidian"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}