import type { Metadata } from "next";
import { ShieldCheck, Smartphone } from "lucide-react";
import { SecurityForm } from "@/components/account/SecurityForm";
import { Enable2FAButton } from "@/components/account/Enable2FAButton";

export const metadata: Metadata = {
  title: "Security",
  robots: { index: false },
};

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-line bg-white p-6">
        <h2 className="font-serif text-xl font-medium">Change password</h2>
        <p className="mt-1 text-sm text-taupe">Use a password you don&apos;t reuse anywhere else.</p>
        <div className="mt-6">
          <SecurityForm />
        </div>
      </section>

      <section className="rounded-xl border border-line bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne">
            <Smartphone className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-serif text-lg font-medium">Two-step verification</h2>
            <p className="text-sm text-taupe">Not turned on</p>
          </div>
        </div>
        <Enable2FAButton />
        <p className="mt-3 flex items-center gap-1.5 text-xs text-taupe">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          Adds an extra layer of protection to your account.
        </p>
      </section>
    </div>
  );
}