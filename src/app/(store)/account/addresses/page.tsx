import type { Metadata } from "next";
import { AddressBook } from "@/components/account/AddressBook";

export const metadata: Metadata = {
  title: "Addresses",
  robots: { index: false },
};

export default function AddressesPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-xl font-medium">Saved addresses</h2>
        <p className="mt-1 text-sm text-taupe">Used for faster checkout at delivery.</p>
      </div>
      <AddressBook />
    </div>
  );
}