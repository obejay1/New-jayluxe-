"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

type Address = {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  isDefault: boolean;
};

const STATES = ["Lagos", "Abuja", "Ogun", "Rivers", "Kano", "Oyo", "Delta", "Anambra", "Other"];

const initialAddresses: Address[] = [
  {
    id: "a1",
    label: "Home",
    name: "Amara Okafor",
    phone: "+234 803 000 0000",
    address: "12 Remi Olowude Street, Lekki Phase 1",
    city: "Lekki",
    state: "Lagos",
    isDefault: true,
  },
];

export function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [editing, setEditing] = useState<Address | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { show } = useToast();

  const emptyForm: Omit<Address, "id"> = {
    label: "Home",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "Lagos",
    isDefault: false,
  };
  const [form, setForm] = useState<Omit<Address, "id">>(emptyForm);

  const startAdd = () => {
    setForm(emptyForm);
    setEditing(null);
    setFormOpen(true);
  };

  const startEdit = (a: Address) => {
    const { ...rest } = a;
    setEditing(a);
    setForm({ ...rest });
    setFormOpen(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, name: form.name || "Amara Okafor" };
    if (!data.address.trim() || !data.city.trim()) {
      show("error", "Almost there", "Please complete the address and city fields.");
      return;
    }
    if (editing) {
      setAddresses((prev) => prev.map((a) => (a.id === editing.id ? { ...a, ...data } : a)));
      show("success", "Address updated");
    } else {
      const id = `a${Date.now()}`;
      setAddresses((prev) => [...(data.isDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev), { ...data, id }]);
      show("success", "Address saved");
    }
    setFormOpen(false);
    setForm(emptyForm);
    setEditing(null);
  };

  const remove = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    show("info", "Address removed");
  };

  return (
    <div className="space-y-5">
      {addresses.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {addresses.map((a) => (
            <li key={a.id} className="rounded-xl border border-line bg-white p-5">
              <div className="flex items-center justify-between">
                <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]", a.isDefault ? "bg-obsidian text-ivory" : "bg-champagne text-taupe")}>
                  {a.label}
                </span>
                <button onClick={() => remove(a.id)} className="text-taupe transition-colors hover:text-error" aria-label={`Delete ${a.label} address`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-sm font-medium">{a.name}</p>
              <p className="mt-0.5 text-sm text-taupe">{a.address}</p>
              <p className="text-sm text-taupe">{a.city}, {a.state}</p>
              <p className="mt-1 text-sm text-taupe">{a.phone}</p>
              <button onClick={() => startEdit(a)} className="mt-4 text-[13px] font-medium text-obsidian underline underline-offset-4 hover:text-gold">
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-line bg-white p-6 text-sm text-taupe">
          No saved addresses yet.
        </p>
      )}

      <Button variant="outline" onClick={startAdd}>
        <Plus className="h-4 w-4" /> Add a new address
      </Button>

      {formOpen && (
        <form onSubmit={save} className="mt-6 rounded-xl border border-line bg-white p-6" aria-label="Address form">
          <h3 className="font-serif text-lg font-medium">{editing ? "Edit address" : "New address"}</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Label" id="addr-label">
              <Select id="addr-label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}>
                {["Home", "Office", "Other"].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </Select>
            </Field>
            <Field label="Recipient name" id="addr-name">
              <Input id="addr-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Amara Okafor" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Street address" id="addr-address">
                <Input id="addr-address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House no., street, area" />
              </Field>
            </div>
            <Field label="City" id="addr-city">
              <Input id="addr-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </Field>
            <Field label="State" id="addr-state">
              <Select id="addr-state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}>
                {STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Phone" id="addr-phone">
                <Input id="addr-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234 800 000 0000" />
              </Field>
            </div>
            <label className="flex items-center gap-2 sm:col-span-2">
              <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} className="h-4 w-4 accent-obsidian" />
              <span className="text-sm">Set as default address</span>
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="submit">Save address</Button>
            <Button variant="ghost" onClick={() => setFormOpen(false)} type="button">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}