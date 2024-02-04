import { SkeletonRecipe } from "@/components/ui/skeletonRecipe";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center">
      <SkeletonRecipe />
    </div>
  );
}
