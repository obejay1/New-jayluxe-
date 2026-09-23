import type { ReactNode } from "react";
import { StoreProviders } from "@/components/store/StoreProviders";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreFooter } from "@/components/store/StoreFooter";
import { MobileNav } from "@/components/store/MobileNav";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProviders>
      <div className="flex min-h-screen flex-col">
        <AnnouncementBar />
        <StoreHeader />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <StoreFooter />
        <MobileNav />
        <CartDrawer />
      </div>
    </StoreProviders>
  );
}