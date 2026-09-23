import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jayluxestore.com"),
  title: {
    default: "Jayluexestore — Luxury Lifestyle Store",
    template: "%s · Jayluexestore",
  },
  description:
    "A premium single-seller store for the modern woman — fashion, beauty, jewelry, home, kitchen and gifts, curated with intention.",
  keywords: ["luxury lifestyle store", "feminine fashion", "kitchen ware", "lifestyle store", "jayluexestore"],
  openGraph: {
    title: "Jayluexestore — Luxury Lifestyle Store",
    description:
      "A premium single-seller store for the modern woman — fashion, beauty, jewelry, home, kitchen and gifts, curated with intention.",
    type: "website",
    locale: "en_NG",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ivory text-obsidian">{children}</body>
    </html>
  );
}