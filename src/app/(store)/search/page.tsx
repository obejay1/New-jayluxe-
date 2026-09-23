import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { products } from "@/lib/data/products";
import { SortableProductGrid } from "@/components/product/SortableProductGrid";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();
  const results = query
    ? products.filter((p) => {
        const haystack = `${p.name} ${p.categoryName} ${p.editorNote} ${p.description.join(" ")} ${p.badge ?? ""}`.toLowerCase();
        return haystack.includes(query);
      })
    : [];

  return (
    <div className="container-store py-10 sm:py-14">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Search results</p>
      <h1 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
        {query ? (
          <>
            For <em className="italic">&ldquo;{q}&rdquo;</em>
          </>
        ) : (
          "Start typing to search"
        )}
      </h1>

      {!query ? (
        <EmptySearch />
      ) : results.length === 0 ? (
        <EmptyResults query={q ?? ""} />
      ) : (
        <div className="mt-10 max-w-6xl">
          <p className="text-sm text-taupe">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          <div className="mt-6">
            <SortableProductGrid products={results} />
          </div>
        </div>
      )}
    </div>
  );
}

function EmptySearch() {
  return (
    <div className="mt-12 flex max-w-md flex-col items-start text-start">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-champagne">
        <SearchX className="h-6 w-6 text-taupe" />
      </span>
      <h2 className="mt-5 font-serif text-xl font-medium">Where shall we look?</h2>
      <p className="mt-2 text-sm leading-relaxed text-taupe">
        Use the search icon up top to find a piece by name — try &ldquo;pearl&rdquo;,
        &ldquo;velvet&rdquo; or &ldquo;perfume&rdquo;.
      </p>
      <Link href="/shop" className="mt-5 inline-flex h-11 items-center rounded-full border border-obsidian/25 px-6 text-sm font-medium hover:border-obsidian hover:bg-obsidian hover:text-ivory">
        Browse everything
      </Link>
    </div>
  );
}

function EmptyResults({ query }: { query: string }) {
  return (
    <div className="mt-12 flex max-w-md flex-col items-start text-start">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-champagne">
        <SearchX className="h-6 w-6 text-taupe" />
      </span>
      <h2 className="mt-5 font-serif text-xl font-medium">No matches for &ldquo;{query}&rdquo;</h2>
      <p className="mt-2 text-sm leading-relaxed text-taupe">
        We couldn&apos;t find anything that matches — but the store restocks weekly. Try a
        different word, or browse the full collection.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {["dress", "pearl", "perfume", "bag", "candle", "velvet"].map((t) => (
          <Link
            key={t}
            href={`/search?q=${t}`}
            className="rounded-full border border-line bg-white px-4 py-2 text-[13px] text-taupe transition-colors hover:border-gold hover:text-obsidian"
          >
            {t}
          </Link>
        ))}
      </div>
    </div>
  );
}