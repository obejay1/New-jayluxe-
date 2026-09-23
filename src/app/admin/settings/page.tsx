import type { Metadata } from "next";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false },
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-medium sm:text-3xl">Settings</h1>
        <p className="mt-1.5 text-sm text-taupe">Store profile, delivery and social links.</p>
      </div>

      <SettingsForm />
    </div>
  );
}