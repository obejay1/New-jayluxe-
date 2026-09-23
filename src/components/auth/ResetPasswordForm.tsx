"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const { show } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords don't match.");
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setDone(true);
      show("success", "Password updated", "Sign in with your new password.");
    }, 900);
  };

  if (done) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="font-serif text-2xl font-medium">All set</h1>
        <p className="text-sm leading-relaxed text-taupe">Your password has been updated.</p>
        <Button href="/login" className="w-full">
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-medium">Choose a new password</h1>
        <p className="mt-1.5 text-sm text-taupe">Make it strong — at least 8 characters.</p>
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-error/5 px-3 py-2.5 text-[13px] text-error">
          {error}
        </p>
      )}

      <Field label="New password" id="password">
        <Input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>
      <Field label="Confirm password" id="confirm">
        <Input id="confirm" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </Field>

      <Button type="submit" className="w-full" size="lg" isPending={pending}>
        Update password
      </Button>

      <p className="pt-2 text-center text-sm text-taupe">
        <Link href="/login" className="font-medium text-obsidian underline-offset-4 hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}