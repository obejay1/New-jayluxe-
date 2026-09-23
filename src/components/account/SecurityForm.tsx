"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function SecurityForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { show } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!current) return setError("Enter your current password.");
    if (next.length < 8) return setError("New password must be at least 8 characters.");
    if (next !== confirm) return setError("New passwords don't match.");
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setCurrent("");
      setNext("");
      setConfirm("");
      show("success", "Password updated", "Use your new password next time you sign in.");
    }, 900);
  };

  return (
    <form onSubmit={submit} className="max-w-md space-y-4" noValidate>
      {error && (
        <p role="alert" className="rounded-md bg-error/5 px-3 py-2.5 text-[13px] text-error">
          {error}
        </p>
      )}
      <Field label="Current password" id="current">
        <Input id="current" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
      </Field>
      <Field label="New password" id="new" hint="At least 8 characters.">
        <Input id="new" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} />
      </Field>
      <Field label="Confirm new password" id="confirm">
        <Input id="confirm" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </Field>
      <Button type="submit" isPending={pending}>
        Update password
      </Button>
    </form>
  );
}