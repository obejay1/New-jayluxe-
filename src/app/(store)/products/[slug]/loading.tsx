import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <div className="container-store py-6 sm:py-10">
      <Skeleton className="h-4 w-40" />
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <Skeleton className="aspect-[4/5] w-full rounded-lg" />
          <div className="mt-3 flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] w-20 rounded-md" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-4 h-20 w-full" />
          <div className="flex gap-4 pt-2">
            <Skeleton className="h-11 w-20 rounded-full" />
            <Skeleton className="h-11 w-40 rounded-full" />
          </div>
          <Skeleton className="mt-8 h-64 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}