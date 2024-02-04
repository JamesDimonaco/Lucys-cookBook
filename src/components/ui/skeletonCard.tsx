import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-4 w-[400px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>

      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <Skeleton className="h-6 w-24 rounded-xl" />
    </div>
  );
}
