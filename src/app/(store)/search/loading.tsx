import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function SearchLoading() {
  return (
    <div className="container-store py-10 sm:py-14">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="mt-3 h-12 w-80 max-w-full" />
      <div className="mt-10 max-w-6xl">
        <Skeleton className="h-4 w-24" />
        <div className="mt-6">
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    </div>
  );
}