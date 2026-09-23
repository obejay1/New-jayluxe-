import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}