"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", topic: "Orders & delivery", message: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { show } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Tell us your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Enter a valid email address.");
    if (form.message.trim().length < 10) return setError("A few more words would help us help you.");
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setForm({ name: "", email: "", topic: "Orders & delivery", message: "" });
      show("success", "Message sent", "We reply within a few hours — usually faster.");
    }, 900);
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      {error && (
        <p role="alert" className="rounded-md bg-error/5 px-3 py-2.5 text-[13px] text-error">
          {error}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" id="c-name">
          <Input id="c-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Field>
        <Field label="Email" id="c-email">
          <Input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
      </div>
      <Field label="Topic" id="c-topic">
        <Select id="c-topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
          {["Orders & delivery", "Returns & exchanges", "Gift wrapping", "Product question", "Something else"].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
      </Field>
      <Field label="How can we help?" id="c-message">
        <Textarea id="c-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us everything — order numbers help too." />
      </Field>
      <Button type="submit" size="lg" isPending={pending}>
        Send message
      </Button>
    </form>
  );
}