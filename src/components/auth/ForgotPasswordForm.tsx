"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { show } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setSent(true);
      show("success", "Check your inbox", "We've emailed a reset link if an account exists for that address.");
    }, 900);
  };

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="font-serif text-2xl font-medium">Check your inbox</h1>
        <p className="text-sm leading-relaxed text-taupe">
          We&apos;ve sent a password-reset link to <strong className="text-obsidian">{email}</strong>.
          It expires in 30 minutes. If you don&apos;t see it, check your spam folder.
        </p>
        <Link href="/login" className="mt-2 inline-block text-sm font-medium text-obsidian underline underline-offset-4">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-medium">Forgot your password?</h1>
        <p className="mt-1.5 text-sm text-taupe">
          Enter your email and we&apos;ll send you a secure link to reset it.
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-error/5 px-3 py-2.5 text-[13px] text-error">
          {error}
        </p>
      )}

      <Field label="Email" id="email">
        <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>

      <Button type="submit" className="w-full" size="lg" isPending={pending}>
        Send reset link
      </Button>

      <p className="pt-2 text-center text-sm text-taupe">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-obsidian underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}