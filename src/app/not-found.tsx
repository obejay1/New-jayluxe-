import Link from "next/link";
import { StoreProviders } from "@/components/store/StoreProviders";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreFooter } from "@/components/store/StoreFooter";
import { MobileNav } from "@/components/store/MobileNav";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function NotFound() {
  return (
    <StoreProviders>
      <div className="flex min-h-screen flex-col">
        <AnnouncementBar />
        <StoreHeader />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
          <p className="font-serif text-7xl font-medium text-champagne sm:text-8xl">404</p>
          <h1 className="mt-4 font-serif text-3xl font-medium sm:text-4xl">This page wandered off</h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-taupe">
            The page you&apos;re looking for doesn&apos;t exist — or it&apos;s been moved. Either
            way, the store is still open.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-full bg-obsidian px-7 text-sm font-medium text-ivory transition-colors hover:bg-gold hover:text-obsidian"
            >
              Back home
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-12 items-center rounded-full border border-obsidian/25 px-7 text-sm font-medium transition-colors hover:border-obsidian hover:bg-obsidian hover:text-ivory"
            >
              Shop the collection
            </Link>
          </div>
        </main>
        <StoreFooter />
        <MobileNav />
        <CartDrawer />
      </div>
    </StoreProviders>
  );
}