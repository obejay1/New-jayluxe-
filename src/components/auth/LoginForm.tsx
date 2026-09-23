"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { show } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Your password should be at least 8 characters.");
      return;
    }
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      show("success", "Welcome back", "You're signed in.");
      window.location.href = redirectTo ?? "/account";
    }, 900);
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-medium">Welcome back</h1>
        <p className="mt-1.5 text-sm text-taupe">Sign in to your Jayluexestore account.</p>
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-error/5 px-3 py-2.5 text-[13px] text-error">
          {error}
        </p>
      )}

      <Field label="Email" id="email">
        <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field label="Password" id="password">
        <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>

      <div className="flex items-center justify-between text-[13px]">
        <label className="flex items-center gap-2 text-taupe">
          <input type="checkbox" className="h-4 w-4 accent-obsidian" defaultChecked />
          Remember me
        </label>
        <Link href="/forgot-password" className="text-taupe underline-offset-4 hover:text-obsidian hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" size="lg" isPending={pending}>
        Sign in
      </Button>

      <p className="pt-2 text-center text-sm text-taupe">
        New to the store?{" "}
        <Link href="/register" className="font-medium text-obsidian underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}