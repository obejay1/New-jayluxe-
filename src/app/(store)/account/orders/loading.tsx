import { Skeleton } from "@/components/ui/Skeleton";

export default function OrdersLoading() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-3 px-5 py-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}