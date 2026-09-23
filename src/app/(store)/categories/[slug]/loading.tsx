import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <div>
      <div className="relative overflow-hidden">
        <Skeleton className="h-64 w-full rounded-none sm:h-80 lg:h-96" />
      </div>
      <div className="container-store max-w-6xl py-8 sm:py-12">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}