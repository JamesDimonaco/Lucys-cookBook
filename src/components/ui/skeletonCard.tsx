import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "./card";
import Image from "next/image";

export function SkeletonCard() {
  // return (
  //   <div className="flex flex-col space-y-3">
  //     <Skeleton className="h-4 w-[400px]" />
  //     <div className="space-y-2">
  //       <Skeleton className="h-4 w-20" />
  //       <Skeleton className="h-4 w-20" />
  //       <Skeleton className="h-4 w-20" />
  //       <Skeleton className="h-4 w-20" />
  //     </div>

  //     <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  //     <Skeleton className="h-6 w-24 rounded-xl" />
  //   </div>
  // );

  return (
    <Card>
      <CardContent className="relative flex flex-col gap-4">
        <Skeleton className="absolute top-2 right-2 h-5 w-5" />
        <Skeleton className="aspect-[3/2] rounded-lg overflow-hidden" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}
