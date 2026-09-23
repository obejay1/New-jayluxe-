import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
  description: "How Jayluexestore uses cookies and browser storage on its website.",
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "What we use",
    body: "Jayluexestore keeps things deliberately light. We use browser local storage and a small set of functional cookies to make the store work — nothing more exotic than that.",
  },
  {
    title: "Shopping bag & wishlist",
    body: "Your shopping bag and wishlist are stored in your own browser so they survive a refresh and follow you between pages. They're stored locally on your device and not sent to any advertising network.",
  },
  {
    title: "Strictly necessary only",
    body: "We don't use advertising, social media tracking pixels, or third-party behavioural cookies. The only request these pages make to a third party is loading product photography from an image CDN.",
  },
  {
    title: "Managing storage",
    body: "You can clear your bag, wishlist and any stored preferences at any time by clearing your browser's site data — instructions live in your browser's settings. Clearing it simply empties your bag; nothing about your account is affected.",
  },
];

export default function CookiesPage() {
  return (
    <div className="container-store py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">A short note</p>
        <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Cookies</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-taupe">
          Last updated: September 2026
        </p>
      </div>

      <div className="mt-10 max-w-2xl space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif text-xl font-medium">{s.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-taupe">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}