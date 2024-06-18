import InfiniteScrollRecipes from "@/components/InfiniteScrollRecipes";
import { getUserById } from "../_data/user";
import { SkeletonCard } from "@/components/ui/skeletonCard";
import { getSession } from "@/utils/auth";
import { fetchPecipes } from "@/actions";

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await getUserById(params.userId);
  const { sessionUser } = await getSession();

  if (!sessionUser || sessionUser.id !== params.userId) {
    return <h1>You are not authorized to view this page</h1>;
  }
  const recipes = await fetchPecipes({ authorId: params.userId });

  if (!recipes) return <SkeletonCard />;

  return (
    <main className="flex flex-col gap-8 p-4 md:p-6 md:col-span-2 lg:col-span-3">
      <InfiniteScrollRecipes initiallRecipes={recipes} userId={params.userId} />
    </main>
  );
}
