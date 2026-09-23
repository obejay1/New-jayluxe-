import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function CollectionLoading() {
  return (
    <div>
      <section className="border-b border-line bg-champagne/50">
        <div className="container-store py-10 sm:py-14">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-4 h-12 w-80 max-w-full" />
          <Skeleton className="mt-4 h-4 w-[30rem] max-w-full" />
        </div>
      </section>
      <div className="container-store max-w-6xl py-8 sm:py-12">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}