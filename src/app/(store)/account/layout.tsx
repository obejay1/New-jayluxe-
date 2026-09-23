import type { ReactNode } from "react";
import { AccountNav } from "@/components/account/AccountNav";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container-store py-8 sm:py-12">
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">My account</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne font-serif text-lg font-medium">
            A
          </span>
          <div>
            <h1 className="font-serif text-2xl font-medium sm:text-3xl">Amara Okafor</h1>
            <p className="text-sm text-taupe">amara@example.com</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside>
          <AccountNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}