import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ToastProvider } from "@/components/ui/Toast";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-ivory">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-obsidian text-ivory lg:block">
          <AdminSidebar />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
          <AdminTopbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-10">
            <div className="[&_a]:focus-visible:outline-gold">{children}</div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}