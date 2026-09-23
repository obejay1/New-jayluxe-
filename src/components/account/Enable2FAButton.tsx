"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

export function Enable2FAButton() {
  const [enabled, setEnabled] = useState(false);
  const { show } = useToast();

  return (
    <>
      <button
        onClick={() => {
          setEnabled(true);
          show("success", "Two-step verification on", "You'll be guided through setup on your next sign-in.");
        }}
        className="mt-5 inline-flex h-11 items-center rounded-full border border-obsidian/25 px-6 text-sm font-medium transition-all hover:border-obsidian hover:bg-obsidian hover:text-ivory"
      >
        Turn on 2FA
      </button>
      {enabled && (
        <p className="mt-3 rounded-md bg-success/10 px-3 py-2 text-[13px] font-medium text-success">
          Two-step verification is now on for your account.
        </p>
      )}
    </>
  );
}