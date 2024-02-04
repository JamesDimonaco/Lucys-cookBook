import { SkeletonCard } from "@/components/ui/skeletonCard";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="p-16 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-5 gap-4 ">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
