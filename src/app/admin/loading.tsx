import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-9 w-52" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-line bg-white p-5">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="mt-4 h-6 w-24" />
            <Skeleton className="mt-2 h-4 w-20" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-white">
        <div className="border-b border-line px-5 py-4">
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="space-y-4 p-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}