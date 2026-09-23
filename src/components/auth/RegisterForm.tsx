"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { show } = useToast();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please tell us your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      show("success", "Account created", `Welcome to Jayluexestore, ${name.split(" ")[0]}.`);
      router.push("/account");
    }, 900);
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-medium">Join the store</h1>
        <p className="mt-1.5 text-sm text-taupe">
          A faster checkout, saved wishlist and your orders in one place.
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-error/5 px-3 py-2.5 text-[13px] text-error">
          {error}
        </p>
      )}

      <Field label="Full name" id="name">
        <Input id="name" autoComplete="name" placeholder="Amara Okafor" value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Email" id="email">
        <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field label="Password" id="password" hint="At least 8 characters.">
        <Input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>

      <Button type="submit" className="w-full" size="lg" isPending={pending}>
        Create account
      </Button>

      <p className="pt-2 text-center text-sm text-taupe">
        Already a member?{" "}
        <Link href="/login" className="font-medium text-obsidian underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}