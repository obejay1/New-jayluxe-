import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <div>
      <section className="border-b border-line bg-champagne/40">
        <div className="container-store py-10 sm:py-14">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-12 w-72 max-w-full" />
          <Skeleton className="mt-4 h-4 w-96 max-w-full" />
        </div>
      </section>
      <div className="container-store py-8">
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
}