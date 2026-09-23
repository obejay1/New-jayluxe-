"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const { show } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      show("error", "Hmm, that email doesn&apos;t look right", "Please double-check and try again.");
      return;
    }
    setState("loading");
    window.setTimeout(() => {
      setState("done");
      setEmail("");
      show("success", "Welcome to the list", "Your first note is on its way — check your inbox.");
      window.setTimeout(() => setState("idle"), 3500);
    }, 700);
  };

  return (
    <form ref={formRef} onSubmit={submit} className={cn("w-full", className)} noValidate>
      {state === "done" ? (
        <div className="flex h-11 items-center rounded-full bg-obsidian px-5 text-sm text-ivory" role="status">
          You&apos;re on the list — welcome.
        </div>
      ) : (
        <div className="flex h-11 items-center overflow-hidden rounded-full border border-line bg-white">
          <label htmlFor="nl-email" className="sr-only">
            Email address
          </label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm text-obsidian placeholder:text-taupe/60 focus:outline-none"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            aria-busy={state === "loading"}
            className="flex h-11 w-11 shrink-0 items-center justify-center bg-obsidian text-ivory transition-colors hover:bg-gold hover:text-obsidian disabled:opacity-60"
            aria-label="Subscribe"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </form>
  );
}