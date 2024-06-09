import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "./card";

export function SkeletonCard() {
  return (
    <Card>
      <CardContent className="relative flex flex-col gap-4 w-60">
        <Skeleton className="absolute top-2 right-2 h-5 w-5" />
        <Skeleton className="aspect-[3/2] rounded-lg overflow-hidden" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}
