"use client";

import { useState } from "react";
import { saveSettings } from "@/lib/admin-db";
import { useToast } from "@/components/ui/Toast";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";

export function SettingsForm() {
  const { show } = useToast();
  const [values, setValues] = useState({
    name: site.name,
    email: site.email,
    phone: site.phone,
    whatsapp: site.whatsapp,
    instagram: site.instagram,
    tiktok: site.tiktok,
    address: site.address,
    freeDeliveryThreshold: String(site.freeDeliveryThreshold),
    deliveryFee: String(site.deliveryFee),
    deliveryDays: site.deliveryDays,
  });
  const [saving, setSaving] = useState(false);

  const set = (key: keyof typeof values, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const save = () => {
    setSaving(true);
    saveSettings({
      ...values,
      freeDeliveryThreshold: Number(values.freeDeliveryThreshold),
      deliveryFee: Number(values.deliveryFee),
    });
    window.setTimeout(() => {
      setSaving(false);
      show("success", "Settings saved", "Store settings were saved locally in demo mode.");
    }, 500);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
      className="space-y-8"
    >
      <section className="rounded-xl border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-medium">Store</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Store name" id="name">
            <Input id="name" value={values.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Support email" id="email" hint="Contact inbox shown across the store">
            <Input id="email" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
          <Field label="Phone" id="phone">
            <Input id="phone" value={values.phone} onChange={(e) => set("phone", e.target.value)} />
          </Field>
          <Field label="WhatsApp" id="whatsapp">
            <Input id="whatsapp" value={values.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
          </Field>
          <Field label="Address" id="address">
            <Input id="address" value={values.address} onChange={(e) => set("address", e.target.value)} />
          </Field>
          <Field label="Delivery estimate" id="deliveryDays">
            <Input id="deliveryDays" value={values.deliveryDays} onChange={(e) => set("deliveryDays", e.target.value)} />
          </Field>
          <Field label="Free delivery threshold (₦)" id="freeDeliveryThreshold">
            <Input
              id="freeDeliveryThreshold"
              inputMode="numeric"
              value={values.freeDeliveryThreshold}
              onChange={(e) => set("freeDeliveryThreshold", e.target.value.replace(/[^\d]/g, ""))}
            />
          </Field>
          <Field label="Standard delivery fee (₦)" id="deliveryFee">
            <Input
              id="deliveryFee"
              inputMode="numeric"
              value={values.deliveryFee}
              onChange={(e) => set("deliveryFee", e.target.value.replace(/[^\d]/g, ""))}
            />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-medium">Social & links</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Instagram" id="instagram">
            <Input id="instagram" value={values.instagram} onChange={(e) => set("instagram", e.target.value)} />
          </Field>
          <Field label="TikTok" id="tiktok">
            <Input id="tiktok" value={values.tiktok} onChange={(e) => set("tiktok", e.target.value)} />
          </Field>
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" isPending={saving}>Save settings</Button>
      </div>
    </form>
  );
}