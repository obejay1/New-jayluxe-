import Link from "next/link";
import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/Toast";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="flex flex-col items-center" aria-label="Jayluexestore home">
          <span className="font-serif text-2xl font-medium tracking-[0.02em]">jayluexestore</span>
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.34em] text-taupe">
            store
          </span>
        </Link>
        <div className="mt-8 w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </div>
    </ToastProvider>
  );
}