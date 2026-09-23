import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function WishlistLoading() {
  return (
    <div>
      <Skeleton className="h-3 w-28" />
      <Skeleton className="mt-3 h-10 w-64 max-w-full" />
      <div className="mt-10">
        <ProductGridSkeleton count={4} />
      </div>
    </div>
  );
}